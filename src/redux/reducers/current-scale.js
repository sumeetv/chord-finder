import { SELECT_SCALE_ROOT, SELECT_SCALE_TYPE, CLEAR_SCALE_SELECTION } from "../action-types";

let initial_state = {};
initial_state.scale_root = -1;
initial_state.scale_type = -1;

function currentScale(state = initial_state, action) {
    let new_state = {...state};
    switch (action.type) {
        case SELECT_SCALE_ROOT:
            new_state.scale_root = action.payload.value;
            return new_state;
        case SELECT_SCALE_TYPE:
            new_state.scale_type = action.payload.value;
            return new_state;
        case CLEAR_SCALE_SELECTION:
            new_state.scale_root = -1;
            new_state.scale_type = -1;
            return new_state;
        default:
            return state;
    }
}

export default currentScale;
