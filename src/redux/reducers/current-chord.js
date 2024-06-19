import { SELECT_CHORD_ROOT, SELECT_CHORD_TYPE, CLEAR_CHORD_SELECTION } from "../action-types";

let initial_state = {};
initial_state.chord_root = -1;
initial_state.chord_type = -1;

function currentChord(state = initial_state, action) {
    let new_state = {...state};
    switch (action.type) {
        case SELECT_CHORD_ROOT:
            new_state.chord_root = action.payload.value;
            return new_state;
        case SELECT_CHORD_TYPE:
            new_state.chord_type = action.payload.value;
            return new_state;
        case CLEAR_CHORD_SELECTION:
            new_state.chord_root = -1;
            new_state.chord_type = -1;
            return new_state;
        default:
            return state;
    }
}

export default currentChord;
