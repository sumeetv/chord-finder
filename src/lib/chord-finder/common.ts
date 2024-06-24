import NOTES from "./notes";

// Rotates a bit string (number) a certain number of times to get a shifted interval
function RotateInterval(intervals: number, numRotations: number): number {
    const highestBit = 1 << NOTES.length;
    const mask = highestBit - 1;

    const higherIntervals = (intervals << numRotations) & mask;
    const lowerIntervals = intervals >> (NOTES.length - numRotations);

    return higherIntervals | lowerIntervals;
}

// Given an string rootNote and a bit string interval, return a dictionary of true booleans
// keyed by note indices
export function NotesForIntervals(rootNote: number, intervals: number): {[key: number]: boolean} {
    let returnedNotes: {[key: number]: boolean} = {};

    for(let idx = 0; idx < NOTES.length; idx++) {
        if (intervals & (1 << idx)) {
            console.log(idx, rootNote);
            const curNote = (idx + rootNote) % NOTES.length;
            returnedNotes[curNote] = true;
        }
    }

    return returnedNotes;
};

// Given a list of valid bit string groupings, a bit string of selected values, and a named key for each
// grouping (e.g. a list of chords or scales), return all groupings that are sets of the selected values
export function GroupingsForNotes(selectedValues: number[], validGroupings: {[key: string]: number}): string[] {
    if (!selectedValues) {
        return [];
    }

    let matchedGroupings = [];
    let selectedValuesCombined = 0;

    for (let valuesIdx = 0; valuesIdx < selectedValues.length; valuesIdx++) {
        selectedValuesCombined = selectedValuesCombined | (1 << selectedValues[valuesIdx]);
    }

    for (let groupingsIdx in validGroupings) {
        const currentGrouping = validGroupings[groupingsIdx];

        // Short circuit the check for all permutations of a grouping if we don't
        // have the right number of notes
        let numNotes = 0;
        for (let shiftIdx = 0; shiftIdx < NOTES.length; shiftIdx++) {
            if ((1 << shiftIdx) & currentGrouping) {
                numNotes++;
            }
        }
        if (numNotes !== selectedValues.length) {
            continue;
        }

        for (let rootNoteVal = 0; rootNoteVal < NOTES.length; rootNoteVal++) {
            const shiftedInterval = RotateInterval(currentGrouping, rootNoteVal);
            if ((shiftedInterval & selectedValuesCombined) === shiftedInterval) {
                const rootNoteName = NOTES[rootNoteVal];
                matchedGroupings.push(rootNoteName + " " + groupingsIdx);
                break;
            }
        }
    }

    return matchedGroupings.sort();
};

// Returns all elements of validGroupings that are supersets of selectedValues
export function SupersetsForNotes(selectedValues: number[], validGroupings: {[key: string]: number}): string[] {
    let supersets: string[] = [];
    let selectedValuesCombined = 0;

    for (let valuesIdx = 0; valuesIdx < selectedValues.length; valuesIdx++) {
        selectedValuesCombined = selectedValuesCombined | (1 << selectedValues[valuesIdx]);
    }

    let groupingName: string;
    for (groupingName in validGroupings) {
        const currentGrouping = validGroupings[groupingName];
        for (let noteIdx = 0; noteIdx < NOTES.length; noteIdx++) {
            const shiftedInterval = RotateInterval(currentGrouping, noteIdx);
            if ((shiftedInterval | selectedValuesCombined) === shiftedInterval) {
                const rootNoteName = NOTES[noteIdx];
                supersets.push(rootNoteName + " " + groupingName);
            }
        }
    }

    return supersets.sort();
};