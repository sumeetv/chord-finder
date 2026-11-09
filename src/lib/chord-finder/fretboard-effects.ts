import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  Vector4,
  WebGLRenderer,
} from "three";
import { createEffectsLoop } from "./effects-loop";

export type FretStrike = {
  x: number;
  y: number;
  left: number;
  right: number;
  time: number;
  color: "mint" | "violet" | "amber";
};
export type FretboardEffects = {
  strike: (strike: FretStrike) => void;
  stop: () => void;
  dispose: () => void;
};

const MAX_STRIKES = 6;
const LIFETIME_MS = 700;
const COLORS = {
  mint: new Vector3(0.34, 0.875, 0.79),
  violet: new Vector3(0.647, 0.604, 1),
  amber: new Vector3(0.949, 0.745, 0.412),
};

/** A single transparent quad, with no lights, textures, or post-processing. */
export function createFretboardEffects(
  host: HTMLElement,
): FretboardEffects | null {
  const canvas = document.createElement("canvas");
  canvas.className = "cf-effects-canvas";
  canvas.setAttribute("aria-hidden", "true");
  canvas.dataset.state = "idle";
  const context = canvas.getContext("webgl2", {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
  });
  if (!context) return null;

  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, context, alpha: true });
  } catch {
    context.getExtension("WEBGL_lose_context")?.loseContext();
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);
  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 2);
  camera.position.z = 1;
  const uniforms = {
    uTime: { value: 0 },
    uResolution: { value: new Vector2() },
    uStrikes: {
      value: Array.from(
        { length: MAX_STRIKES },
        () => new Vector4(0, 0, -10, 0),
      ),
    },
    uBounds: {
      value: Array.from({ length: MAX_STRIKES }, () => new Vector2()),
    },
    uColors: {
      value: Array.from({ length: MAX_STRIKES }, () => new Vector3()),
    },
  };
  const geometry = new PlaneGeometry(2, 2);
  const material = new ShaderMaterial({
    transparent: true,
    depthTest: false,
    depthWrite: false,
    uniforms,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec4 uStrikes[${MAX_STRIKES}];
      uniform vec2 uBounds[${MAX_STRIKES}];
      uniform vec3 uColors[${MAX_STRIKES}];
      void main() {
        vec2 p = vec2(vUv.x, 1.0 - vUv.y) * uResolution;
        vec3 color = vec3(0.0);
        float alpha = 0.0;
        for (int i = 0; i < ${MAX_STRIKES}; i++) {
          float age = uTime - uStrikes[i].z;
          if (age < 0.0 || age > 0.7) continue;
          vec2 center = uStrikes[i].xy;
          float fade = pow(max(0.0, 1.0 - age / 0.7), 2.0);
          float radius = 15.0 + age * 85.0;
          float ringDistance = abs(length(p - center) - radius);
          float ring = (1.0 - smoothstep(0.6, 2.2, ringDistance)) * fade * 0.65;
          float span = max(1.0, uBounds[i].y - uBounds[i].x);
          float along = (p.x - uBounds[i].x) / span;
          float wave = 0.0;
          if (along > 0.0 && along < 1.0) {
            float dx = p.x - center.x;
            float travel = exp(-pow((abs(dx) - age * 650.0) / 100.0, 2.0));
            float displacement = sin(dx * 0.09 - age * 42.0) * 7.0
              * sin(along * 3.14159265) * travel * exp(-age * 4.0);
            float lineDistance = abs(p.y - center.y - displacement);
            wave = (1.0 - smoothstep(0.5, 1.7, lineDistance)) * fade * 0.85;
          }
          float contribution = max(ring, wave);
          color += uColors[i] * contribution;
          alpha += contribution;
        }
        gl_FragColor = vec4(color / max(alpha, 0.0001), min(alpha, 0.8));
      }
    `,
  });
  scene.add(new Mesh(geometry, material));
  host.appendChild(canvas);
  let strikes: FretStrike[] = [];
  let disposed = false;
  let contextLost = false;
  let width = 0;
  let height = 0;

  const loop = createEffectsLoop(
    {
      request: (callback) => requestAnimationFrame(callback),
      cancel: (id) => cancelAnimationFrame(id),
    },
    (time) => {
      if (contextLost || disposed) return false;
      strikes = strikes.filter((strike) => time - strike.time < LIFETIME_MS);
      if (!strikes.length) return false;
      uniforms.uTime.value = time / 1000;
      for (let index = 0; index < MAX_STRIKES; index++) {
        const strike = strikes[index];
        if (strike) {
          uniforms.uStrikes.value[index].set(
            strike.x,
            strike.y,
            strike.time / 1000,
            1,
          );
          uniforms.uBounds.value[index].set(strike.left, strike.right);
          uniforms.uColors.value[index].copy(COLORS[strike.color]);
        } else {
          uniforms.uStrikes.value[index].z = -10;
        }
      }
      renderer.render(scene, camera);
      return true;
    },
    () => {
      strikes = [];
      canvas.dataset.state = contextLost ? "unavailable" : "idle";
      if (!disposed && !contextLost) renderer.clear();
    },
  );

  function resize() {
    if (disposed || contextLost) return;
    if (width === host.clientWidth && height === host.clientHeight) return;
    width = Math.max(1, host.clientWidth);
    height = Math.max(1, host.clientHeight);
    loop.stop();
    renderer.setSize(width, height, false);
    uniforms.uResolution.value.set(width, height);
  }
  resize();
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  function onContextLost(event: Event) {
    event.preventDefault();
    contextLost = true;
    loop.stop();
    canvas.dataset.state = "unavailable";
  }
  canvas.addEventListener("webglcontextlost", onContextLost);
  return {
    strike(strike) {
      if (
        disposed ||
        contextLost ||
        performance.now() - strike.time >= LIFETIME_MS
      )
        return;
      strikes = [...strikes.slice(-(MAX_STRIKES - 1)), strike];
      canvas.dataset.state = "active";
      loop.wake();
    },
    stop: loop.stop,
    dispose() {
      if (disposed) return;
      loop.dispose();
      disposed = true;
      observer.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    },
  };
}
