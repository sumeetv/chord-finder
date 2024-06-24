import { GroupingsForNotes, NotesForIntervals, SupersetsForNotes } from "./common";

export const SCALES: {[key: string]: number} = {
    "major": 0b101010110101,
    "minor": 0b010110101101,
    "blues minor": 0b010011101001,
    "blues major": 0b001010011101,
    "pentatonic major": 0b001010010101,
    "pentatonic minor": 0b010010101001,
    "bebop major": 0b101110110101,
    "bebop minor": 0b011010111101,
    "dominant / mixolydian bebop": 0b111010110101,
    "super locrian / dominant altered": 0b010101011011,
    "nine tone": 0b101111011101,
    "algerian": 0b100111101101,
    "arabic": 0b010101110101,
    "augmented": 0b100110011001,
    "balinese": 0b000110001011,
    "byzantine / double harmonic": 0b100110110011,
    "chinese": 0b100011010001,
    "diminished / whole-half": 0b101101101101,
    "dominant diminished / diminished blues": 0b011011011011,
    "egyptian": 0b010010100101,
    "eight tone spanish": 0b010101111011,
    "enigmatic major": 0b110101010011,
    "enigmatic minor": 0b110011001011,
    "hawaiian": 0b101010101101,
    "hindu / aeolian dominant": 0b010110110101,
    "hirajoshi": 0b000110001101,
    "hungarian gypsy": 0b100111001101,
    "hungarian major": 0b011011011001,
    "iwato": 0b010001100011,
    "japanese / in sen": 0b010010100011,
    "lydian dominant / bartok": 0b011011010101,
    "neopolitan minor": 0b100110101011,
    "neopolitan major": 0b101010101011,
    "octatonic / half-whole": 0b011011011011,
    "oriental": 0b011001110011,
    "prometheus": 0b011001010101,
    "romanian minor": 0b011011001101,
    "spanish gypsy / phyrgian dominant": 0b010110110011,
    "whole tone": 0b010101010101,
    "yo": 0b001010100101,
};

export function NotesForScale(rootNote: number, scaleType: string): {[key: number]: boolean} {
    const intervals = SCALES[scaleType];

    return NotesForIntervals(rootNote, intervals);
};

export function ScalesForNotes(selectedNotes: number[]): string[] {
    let filteredNotes = [];
    for (let idx = 0; idx < selectedNotes.length; idx++) {
        if (selectedNotes[idx] > 0) {
            filteredNotes.push(idx);
        }
    }

    return GroupingsForNotes(filteredNotes, SCALES);
};

export function FindPotentialScales(selectedNotes: number[]): string[] {
    let filteredNotes = [];
    for (let idx = 0; idx < selectedNotes.length; idx++) {
        if (selectedNotes[idx] > 0) {
            filteredNotes.push(idx);
        }
    }

    return SupersetsForNotes(filteredNotes, SCALES);
}