import {
    SELECT_CHORD_NOTE,
    DESELECT_CHORD_NOTE,
    SELECT_CHORD_ROOT,
    SELECT_CHORD_TYPE,
    CLEAR_CHORD_SELECTION,
    SELECT_SCALE_NOTE,
    DESELECT_SCALE_NOTE,
    SELECT_SCALE_ROOT,
    SELECT_SCALE_TYPE,
    CLEAR_SCALE_SELECTION,
} from "./action-types";

export const selectChordNote = note => ({
    type: SELECT_CHORD_NOTE,
    payload: {
        value: note,
    }
});

export const deselectChordNote = note => ({
    type: DESELECT_CHORD_NOTE,
    payload: {
        value: note,
    }
});

export const selectScaleNote = note => ({
    type: SELECT_SCALE_NOTE,
    payload: {
        value: note,
    }
});

export const deselectScaleNote = note => ({
    type: DESELECT_SCALE_NOTE,
    payload: {
        value: note,
    }
});

export const selectChordRoot = root => ({
    type: SELECT_CHORD_ROOT,
    payload: {
        value: root,
    }
});

export const selectChordType = chord_type => ({
    type: SELECT_CHORD_TYPE,
    payload: {
        value: chord_type,
    }
});

export const clearChordSelection = () => ({
    type: CLEAR_CHORD_SELECTION,
    payload: {}

});
export const selectScaleRoot = root => ({
    type: SELECT_SCALE_ROOT,
    payload: {
        value: root,
    }
});

export const selectScaleType = scale_type => ({
    type: SELECT_SCALE_TYPE,
    payload: {
        value: scale_type,
    }
});

export const clearScaleSelection = () => ({
    type: CLEAR_SCALE_SELECTION,
    payload: {}
});