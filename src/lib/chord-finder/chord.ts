import { GroupingsForNotes, NotesForIntervals, SupersetsForNotes } from "./common";

export const CHORDS: {[key: string]: number} = {
    "major": 0b000010010001,
    "minor": 0b000010001001,
    "maj7": 0b100010010001,
    "m7": 0b010010001001,
    "7": 0b010010010001,
    "7b5": 0b010001010001,
    "7#5": 0b010100010001,
    "m#7": 0b100010001001,
    "m7b5 (half-diminished)": 0b010001001001,
    "7b9": 0b010010010011,
    "b5": 0b000001010001,
    "5": 0b000010000001,
    "6": 0b001010010001,
    "m6": 0b001010001001,
    "69": 0b001010010101,
    "9": 0b010010010101,
    "9b5": 0b010001010101,
    "9#5": 0b000100010101,
    "m9": 0b010010001101,
    "maj9": 0b100010010101,
    "add9": 0b000010010101,
    "7#9": 0b010010011001,
    "11": 0b010010110101,
    "m11": 0b010010101101,
    "13": 0b011000100101,
    "maj13": 0b101010010101,
    "dim": 0b000001001001,
    "aug": 0b000100010001,
    "dim7": 0b001001001001,
    "sus2": 0b000010000101,
    "sus4": 0b000010100001,
    "7sus4": 0b010010100001,
    "9sus4": 0b010010100101,
};

// Returns a dictionary of true booleans keyed by note indices for notes in the input chord
export function NotesForChord(rootNote: number, chordType: string): {[key: number]: boolean} {
    const deltas: number = CHORDS[chordType];

    return NotesForIntervals(rootNote, deltas);
};

export function ChordsForNotes(selectedNotes: number[]): string[] {
    let filteredNotes: number[] = [];
    for (let idx = 0; idx < selectedNotes.length; idx++) {
        if (selectedNotes[idx] > 0) {
            filteredNotes.push(idx);
        }
    }

    return GroupingsForNotes(filteredNotes, CHORDS);
}

export function FindPotentialChords(selectedNotes: number[]) {
    let filteredNotes = [];
    for (let idx = 0; idx < selectedNotes.length; idx++) {
        if (selectedNotes[idx] > 0) {
            filteredNotes.push(idx);
        }
    }

    return SupersetsForNotes(filteredNotes, CHORDS);
}