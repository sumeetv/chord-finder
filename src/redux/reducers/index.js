import { combineReducers } from "redux";

import currentChord from "./current-chord";
import currentScale from "./current-scale";
import selectedChordNotes from "./selected-chord-notes";
import selectedScaleNotes from "./selected-scale-notes";

export default combineReducers({
    currentChord: currentChord,
    currentScale: currentScale,
    selectedChordNotes: selectedChordNotes,
    selectedScaleNotes: selectedScaleNotes,
});