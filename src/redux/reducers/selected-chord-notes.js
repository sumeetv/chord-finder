import NOTES from "@/lib/chord-finder/notes"

import { SELECT_CHORD_NOTE, DESELECT_CHORD_NOTE } from "@/redux/action-types"

let initial_state = [];
initial_state.length = NOTES.length;
initial_state.fill(0);

function selectedChordNotes(state = initial_state, action) {
    let new_state = [...state];
    switch (action.type) {
        case SELECT_CHORD_NOTE:
            new_state[action.payload.value] = state[action.payload.value] + 1;
            return new_state;
        case DESELECT_CHORD_NOTE:
            new_state[action.payload.value] = state[action.payload.value] - 1;
            return new_state;
        default:
            return state;
    }
}

export default selectedChordNotes;