const { test, after } = require("node:test");
const assert = require("node:assert/strict");
const { mkdtempSync, rmSync } = require("node:fs");
const { tmpdir } = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

// Compile the actual music/state modules into a temporary directory; no test dependency.
const output = mkdtempSync(path.join(tmpdir(), "chord-finder-tests-"));
execFileSync(
  process.execPath,
  [
    require.resolve("typescript/bin/tsc"),
    "src/lib/chord-finder/workbench.ts",
    "src/lib/chord-finder/chord.ts",
    "src/lib/chord-finder/scale.ts",
    "--outDir",
    output,
    "--target",
    "es2020",
    "--module",
    "commonjs",
    "--esModuleInterop",
    "--skipLibCheck",
    "--strict",
  ],
  { cwd: path.join(__dirname, ".."), stdio: "pipe" },
);
after(() => rmSync(output, { recursive: true, force: true }));
const {
  createWorkbenchState,
  workbenchReducer,
  selectedNoteCounts,
  pitchAt,
} = require(path.join(output, "workbench.js"));
const { ChordsForNotes } = require(path.join(output, "chord.js"));
const { ScalesForNotes, NotesForScale } = require(
  path.join(output, "scale.js"),
);
const NOTES = require(path.join(output, "notes.js")).default;
const TUNINGS = require(path.join(output, "tunings.js")).default;
const reduce = (state, ...actions) => actions.reduce(workbenchReducer, state);
const toggle = (string, fret) => ({ type: "toggle", string, fret });
const counts = (state) => selectedNoteCounts(state.sessions[state.mode]);

test("duplicate E pitches remain selected when one physical fret is removed", () => {
  let state = reduce(createWorkbenchState(), toggle(0, 0), toggle(5, 0));
  assert.equal(counts(state)[NOTES.indexOf("E")], 2);
  state = workbenchReducer(state, toggle(0, 0));
  assert.equal(counts(state)[NOTES.indexOf("E")], 1);
  assert.deepEqual(state.sessions.chords.positions, ["5:0"]);
});

test("changing tuning preserves the physical shape, updates pitches, and supports undo", () => {
  const state = reduce(createWorkbenchState(), toggle(0, 0), {
    type: "tuning",
    tuning: "Drop D",
  });
  assert.deepEqual(state.sessions.chords.positions, ["0:0"]);
  assert.equal(counts(state)[NOTES.indexOf("D")], 1);
  assert.equal(counts(state)[NOTES.indexOf("E")], 0);
  const undone = workbenchReducer(state, { type: "undo" });
  assert.equal(undone.sessions.chords.tuning, "Standard Tuning");
  assert.equal(counts(undone)[NOTES.indexOf("E")], 1);
});

test("chord and scale sessions retain independent selections, tuning, and presets", () => {
  const state = reduce(
    createWorkbenchState(),
    toggle(1, 3),
    { type: "mode", mode: "scales" },
    toggle(4, 1),
    { type: "tuning", tuning: "DADGAD" },
    { type: "preset", root: 3, presetType: "major" },
    { type: "mode", mode: "chords" },
  );
  assert.deepEqual(state.sessions.chords.positions, ["1:3"]);
  assert.equal(state.sessions.chords.tuning, "Standard Tuning");
  assert.equal(state.sessions.chords.presetType, null);
  assert.deepEqual(state.sessions.scales.positions, ["4:1"]);
  assert.equal(state.sessions.scales.tuning, "DADGAD");
  assert.equal(state.sessions.scales.presetType, "major");
});

test("clear removes selections and preview; undo restores both", () => {
  const state = reduce(
    createWorkbenchState(),
    toggle(1, 3),
    { type: "preset", root: 3, presetType: "major" },
    { type: "clear" },
  );
  assert.deepEqual(state.sessions.chords.positions, []);
  assert.equal(state.sessions.chords.presetType, null);
  assert.equal(
    counts(state).reduce((a, b) => a + b, 0),
    0,
  );
  const undone = workbenchReducer(state, { type: "undo" });
  assert.deepEqual(undone.sessions.chords.positions, ["1:3"]);
  assert.equal(undone.sessions.chords.presetType, "major");
});

test("preset preview preserves frets and tapping returns to manual selection", () => {
  const state = reduce(
    createWorkbenchState(),
    toggle(1, 3),
    { type: "preset", root: 3, presetType: "major" },
    toggle(2, 2),
  );
  assert.deepEqual(state.sessions.chords.positions, ["1:3", "2:2"]);
  assert.equal(state.sessions.chords.presetType, null);
  assert.equal(counts(state)[NOTES.indexOf("C")], 1);
  assert.equal(counts(state)[NOTES.indexOf("E")], 1);
});

test("physical C, E, G selections produce a C major match across fret ranges", () => {
  const state = reduce(
    createWorkbenchState(),
    toggle(1, 3),
    toggle(2, 2),
    toggle(3, 0),
  );
  assert.ok(ChordsForNotes(counts(state)).includes("C major"));
  // Off-screen selections remain part of the same music calculation.
  const shifted = reduce(state, toggle(1, 3), toggle(1, 15));
  assert.ok(ChordsForNotes(counts(shifted)).includes("C major"));
});

test("all supported tunings/frets resolve to valid pitch classes; octave repeats agree", () => {
  for (const tuning of Object.keys(TUNINGS)) {
    for (let string = 0; string < 6; string++) {
      for (let fret = 0; fret <= 15; fret++)
        assert.ok(
          pitchAt(tuning, string, fret) >= 0 &&
            pitchAt(tuning, string, fret) < 12,
        );
      assert.equal(pitchAt(tuning, string, 0), pitchAt(tuning, string, 12));
    }
  }
});

test("scale matching still recognizes all notes of C major", () => {
  const notes = NotesForScale(NOTES.indexOf("C"), "major");
  assert.ok(
    ScalesForNotes(NOTES.map((_, index) => (notes[index] ? 1 : 0))).includes(
      "C major",
    ),
  );
});

test("invalid frets/tuning and empty undo do not alter state; history stays bounded", () => {
  const initial = createWorkbenchState();
  for (const action of [
    toggle(-1, 0),
    toggle(0, 16),
    { type: "tuning", tuning: "unknown" },
    { type: "undo" },
  ])
    assert.equal(workbenchReducer(initial, action), initial);
  let state = initial;
  for (let index = 0; index < 75; index++)
    state = workbenchReducer(state, toggle(0, 0));
  assert.equal(state.sessions.chords.history.length, 50);
});
