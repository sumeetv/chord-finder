import NOTES from "./notes";

function RotateInterval(intervals, numRotations) {
    const highestBit = 1 << NOTES.length;
    const mask = highestBit - 1;

    const higherIntervals = (intervals << numRotations) & mask;
    const lowerIntervals = intervals >> (NOTES.length - numRotations);

    return higherIntervals | lowerIntervals;
}

export function NotesForIntervals(rootNote, intervals) {
    let returnedNotes = {};

    for(let idx = 0; idx < NOTES.length; idx++) {
        if (intervals & (1 << idx)) {
            const curNote = (idx + rootNote) % NOTES.length;
            returnedNotes[curNote] = true;
        }
    }

    return returnedNotes;
};

export function GroupingsForNotes(selectedValues, validGroupings) {
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

        for (const rootNoteVal in NOTES) {
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
export function SupersetsForNotes(selectedValues, validGroupings) {
    let supersets = [];
    let selectedValuesCombined = 0;

    for (let valuesIdx = 0; valuesIdx < selectedValues.length; valuesIdx++) {
        selectedValuesCombined = selectedValuesCombined | (1 << selectedValues[valuesIdx]);
    }

    for (const groupingIdx in validGroupings) {
        const currentGrouping = validGroupings[groupingIdx];
        for (const noteIdx in NOTES) {
            const shiftedInterval = RotateInterval(currentGrouping, noteIdx);
            if ((shiftedInterval | selectedValuesCombined) === shiftedInterval) {
                const rootNoteName = NOTES[noteIdx];
                supersets.push(rootNoteName + " " + groupingIdx);
            }
        }
    }

    return supersets.sort();
};