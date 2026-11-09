import NOTES from "./notes";
import TUNINGS from "./tunings";

export type Mode = "chords" | "scales";
export const LAST_FRET = 15;
export const INTERVALS = [
  "1",
  "♭2",
  "2",
  "♭3",
  "3",
  "4",
  "♭5",
  "5",
  "♭6",
  "6",
  "♭7",
  "7",
];
export type Snapshot = {
  positions: string[];
  tuning: string;
  root: number;
  presetType: string | null;
};
export type Session = Snapshot & { history: Snapshot[] };
export type WorkbenchState = { mode: Mode; sessions: Record<Mode, Session> };
export type Action =
  | { type: "mode"; mode: Mode }
  | { type: "toggle"; string: number; fret: number }
  | { type: "tuning"; tuning: string }
  | { type: "root"; root: number }
  | { type: "preset"; presetType: string | null; root?: number }
  | { type: "clear" }
  | { type: "undo" };

function newSession(): Session {
  return {
    positions: [],
    tuning: "Standard Tuning",
    root: NOTES.indexOf("C"),
    presetType: null,
    history: [],
  };
}
export function createWorkbenchState(): WorkbenchState {
  return {
    mode: "chords",
    sessions: { chords: newSession(), scales: newSession() },
  };
}
export function pitchAt(tuning: string, string: number, fret: number): number {
  return (NOTES.indexOf(TUNINGS[tuning][string]) + fret) % NOTES.length;
}
export function selectedNoteCounts(session: Snapshot): number[] {
  const counts = Array<number>(NOTES.length).fill(0);
  for (const position of session.positions) {
    const [string, fret] = position.split(":").map(Number);
    counts[pitchAt(session.tuning, string, fret)]++;
  }
  return counts;
}
export function workbenchReducer(
  state: WorkbenchState,
  action: Action,
): WorkbenchState {
  if (action.type === "mode") return { ...state, mode: action.mode };
  const session = state.sessions[state.mode];
  if (action.type === "undo") {
    if (!session.history.length) return state;
    return {
      ...state,
      sessions: {
        ...state.sessions,
        [state.mode]: {
          ...session.history[session.history.length - 1],
          history: session.history.slice(0, -1),
        },
      },
    };
  }
  const { history, ...snapshot } = session;
  let next: Snapshot;
  switch (action.type) {
    case "toggle": {
      if (
        action.string < 0 ||
        action.string >= TUNINGS[session.tuning].length ||
        action.fret < 0 ||
        action.fret > LAST_FRET
      )
        return state;
      const key = `${action.string}:${action.fret}`;
      next = {
        ...snapshot,
        presetType: null,
        positions: session.positions.includes(key)
          ? session.positions.filter((position) => position !== key)
          : [...session.positions, key],
      };
      break;
    }
    case "tuning":
      if (!TUNINGS[action.tuning] || action.tuning === session.tuning)
        return state;
      // Retain the physical shape and derive its pitches in the new tuning.
      next = { ...snapshot, tuning: action.tuning };
      break;
    case "root":
      if (
        action.root === session.root ||
        action.root < 0 ||
        action.root >= NOTES.length
      )
        return state;
      next = { ...snapshot, root: action.root };
      break;
    case "preset":
      next = {
        ...snapshot,
        root: action.root ?? session.root,
        presetType: action.presetType,
      };
      if (next.root === session.root && next.presetType === session.presetType)
        return state;
      break;
    case "clear":
      if (!session.positions.length && !session.presetType) return state;
      next = { ...snapshot, positions: [], presetType: null };
      break;
  }
  return {
    ...state,
    sessions: {
      ...state.sessions,
      [state.mode]: { ...next, history: [...history.slice(-49), snapshot] },
    },
  };
}
