export type FrameScheduler = {
  request: (callback: (time: number) => void) => number;
  cancel: (id: number) => void;
};

/** One scheduled frame at a time; render returns false when the effect settles. */
export function createEffectsLoop(
  scheduler: FrameScheduler,
  render: (time: number) => boolean,
  clear: () => void,
) {
  let frame: number | null = null;
  let disposed = false;

  function wake() {
    if (disposed || frame !== null) return;
    frame = scheduler.request((time) => {
      frame = null;
      if (disposed) return;
      if (render(time)) wake();
      else clear();
    });
  }

  function stop() {
    if (frame !== null) scheduler.cancel(frame);
    frame = null;
    clear();
  }

  return {
    wake,
    stop,
    dispose() {
      disposed = true;
      stop();
    },
  };
}
