import { afterEach, expect, test, vi } from "vitest";
import { createFretboardEffects } from "@/lib/chord-finder/fretboard-effects";

afterEach(() => vi.restoreAllMocks());

test("an actual null WebGL2 context leaves the host untouched", () => {
  const probe = vi
    .spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockReturnValue(null);
  const host = document.createElement("div");
  expect(createFretboardEffects(host)).toBeNull();
  expect(probe).toHaveBeenCalledWith(
    "webgl2",
    expect.objectContaining({ alpha: true, powerPreference: "low-power" }),
  );
  expect(host.childElementCount).toBe(0);
});
