import { StrictMode } from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import GuitarWorkbench from "@/components/guitar-workbench";

const gpu = vi.hoisted(() => ({
  create: vi.fn(),
  strike: vi.fn(),
  stop: vi.fn(),
  dispose: vi.fn(),
}));
vi.mock("@/lib/chord-finder/fretboard-effects", () => ({
  createFretboardEffects: gpu.create,
}));

let reduced = false;
let hidden = false;
const mediaListeners = new Set<EventListenerOrEventListenerObject>();
const observers: VisibilityObserver[] = [];

class VisibilityObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  constructor(private callback: IntersectionObserverCallback) {
    observers.push(this);
  }
  intersect(isIntersecting: boolean) {
    this.callback(
      [{ isIntersecting } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
}

beforeEach(() => {
  reduced = false;
  hidden = false;
  observers.length = 0;
  mediaListeners.clear();
  localStorage.clear();
  gpu.create
    .mockReset()
    .mockImplementation(() => ({
      strike: gpu.strike,
      stop: gpu.stop,
      dispose: gpu.dispose,
    }));
  vi.stubGlobal("IntersectionObserver", VisibilityObserver);
  vi.spyOn(document, "hidden", "get").mockImplementation(() => hidden);
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({
      get matches() {
        return reduced;
      },
      media: "(prefers-reduced-motion: reduce)",
      addEventListener: (
        _: string,
        listener: EventListenerOrEventListenerObject,
      ) => mediaListeners.add(listener),
      removeEventListener: (
        _: string,
        listener: EventListenerOrEventListenerObject,
      ) => mediaListeners.delete(listener),
    })),
  );
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function mount() {
  return render(
    <StrictMode>
      <GuitarWorkbench />
    </StrictMode>,
  );
}
function select(name: string) {
  fireEvent.click(screen.getByRole("button", { name, exact: true }));
}
function motionSwitch() {
  // jsdom tests behavior, not the browser's native disclosure rendering.
  return screen.getByRole("switch", {
    name: "Animated feedback",
    hidden: true,
  }) as HTMLButtonElement;
}
function majorShape() {
  select("String 5, A, fret 3, C");
  select("String 4, D, fret 2, E");
  select("String 3, G, open, G");
}
function expectCMajor() {
  expect(screen.getByRole("status").textContent).toContain("C major");
}
async function flushEffects() {
  await act(async () => {});
}
function setReducedMotion(value: boolean) {
  act(() => {
    reduced = value;
    const event = new Event("change");
    mediaListeners.forEach((listener) =>
      typeof listener === "function"
        ? listener(event)
        : listener.handleEvent(event),
    );
  });
}

test("OS reduced motion prevents GPU initialization while chord selection still works", async () => {
  reduced = true;
  localStorage.setItem("chord-finder-motion", "on");
  const { container } = mount();
  expect(motionSwitch().disabled).toBe(true);
  expect(motionSwitch().getAttribute("aria-checked")).toBe("false");
  fireEvent.pointerEnter(container.querySelector(".cf-neck")!);
  majorShape();
  await flushEffects();
  expectCMajor();
  expect(gpu.create).not.toHaveBeenCalled();
});

test("a live reduced-motion change disposes active effects and preserves selected frets", async () => {
  mount();
  select("String 5, A, fret 3, C");
  await waitFor(() => expect(gpu.strike).toHaveBeenCalledTimes(1));
  setReducedMotion(true);
  expect(gpu.dispose).toHaveBeenCalledTimes(1);
  expect(motionSwitch().disabled).toBe(true);
  select("String 4, D, fret 2, E");
  await flushEffects();
  expect(gpu.create).toHaveBeenCalledTimes(1);
  setReducedMotion(false);
  select("String 3, G, open, G");
  await waitFor(() => expect(gpu.create).toHaveBeenCalledTimes(2));
  expectCMajor();
});

test("unavailable WebGL is attempted once and leaves matching, clear, and undo usable", async () => {
  gpu.create.mockReturnValue(null);
  mount();
  select("String 5, A, fret 3, C");
  await waitFor(() => expect(gpu.create).toHaveBeenCalledTimes(1));
  select("String 4, D, fret 2, E");
  select("String 3, G, open, G");
  await flushEffects();
  expectCMajor();
  expect(gpu.create).toHaveBeenCalledTimes(1);
  select("Clear");
  expect(screen.getByRole("status").textContent).toContain(
    "Start with a few notes",
  );
  select("Undo");
  expectCMajor();
});

test("renderer initialization failure cannot interrupt selection or trigger repeated allocation", async () => {
  gpu.create.mockImplementation(() => {
    throw new Error("GPU unavailable");
  });
  mount();
  select("String 5, A, fret 3, C");
  await waitFor(() => expect(gpu.create).toHaveBeenCalledTimes(1));
  select("String 4, D, fret 2, E");
  select("String 3, G, open, G");
  await flushEffects();
  expectCMajor();
  expect(gpu.create).toHaveBeenCalledTimes(1);
});

test("a saved off preference survives remount and can be enabled again", async () => {
  localStorage.setItem("chord-finder-motion", "off");
  const first = mount();
  majorShape();
  await flushEffects();
  expectCMajor();
  expect(gpu.create).not.toHaveBeenCalled();
  fireEvent.click(motionSwitch());
  expect(localStorage.getItem("chord-finder-motion")).toBe("on");
  select("String 1, E, open, E");
  await waitFor(() => expect(gpu.create).toHaveBeenCalledTimes(1));
  fireEvent.click(motionSwitch());
  expect(gpu.dispose).toHaveBeenCalledTimes(1);
  expect(localStorage.getItem("chord-finder-motion")).toBe("off");
  first.unmount();
  mount();
  expect(motionSwitch().getAttribute("aria-checked")).toBe("false");
  select("String 5, A, fret 3, C");
  await flushEffects();
  expect(gpu.create).toHaveBeenCalledTimes(1);
});

test("switching off before lazy initialization completes prevents a late canvas", async () => {
  mount();
  select("String 5, A, fret 3, C");
  fireEvent.click(motionSwitch());
  await flushEffects();
  expect(gpu.create).not.toHaveBeenCalled();
  expect(
    screen
      .getByRole("button", { name: "String 5, A, fret 3, C" })
      .getAttribute("aria-pressed"),
  ).toBe("true");
});

test("a range change invalidates a pending effect without dropping the selection", async () => {
  mount();
  select("String 5, A, fret 3, C");
  select("Next fret range");
  await flushEffects();
  expect(gpu.create).not.toHaveBeenCalled();
  expect(
    screen
      .getByRole("button", { name: "String 5, A, fret 3, C" })
      .getAttribute("aria-pressed"),
  ).toBe("true");
  select("String 1, E, fret 4, Ab");
  await waitFor(() => expect(gpu.create).toHaveBeenCalledTimes(1));
});

test("hidden and off-screen instruments stop effects and reject new strikes", async () => {
  mount();
  select("String 5, A, fret 3, C");
  await waitFor(() => expect(gpu.strike).toHaveBeenCalledTimes(1));
  act(() => observers[observers.length - 1].intersect(false));
  expect(gpu.stop).toHaveBeenCalledTimes(1);
  select("String 4, D, fret 2, E");
  expect(gpu.strike).toHaveBeenCalledTimes(1);
  act(() => {
    hidden = true;
    document.dispatchEvent(new Event("visibilitychange"));
    observers[observers.length - 1].intersect(true);
  });
  expect(gpu.stop).toHaveBeenCalledTimes(2);
  select("String 3, G, open, G");
  expectCMajor();
  expect(gpu.strike).toHaveBeenCalledTimes(1);
  act(() => {
    hidden = false;
    document.dispatchEvent(new Event("visibilitychange"));
  });
  select("String 1, E, open, E");
  expect(gpu.strike).toHaveBeenCalledTimes(2);
  expect(gpu.create).toHaveBeenCalledTimes(1);
});

test("unmount cancels pending loading and releases active effects and listeners", async () => {
  const first = mount();
  select("String 5, A, fret 3, C");
  first.unmount();
  await flushEffects();
  expect(gpu.create).not.toHaveBeenCalled();
  expect(mediaListeners.size).toBe(0);
  const second = mount();
  select("String 5, A, fret 3, C");
  await waitFor(() => expect(gpu.create).toHaveBeenCalledTimes(1));
  second.unmount();
  expect(gpu.dispose).toHaveBeenCalledTimes(1);
  expect(mediaListeners.size).toBe(0);
  expect(
    observers.every((observer) => observer.disconnect.mock.calls.length === 1),
  ).toBe(true);
});
