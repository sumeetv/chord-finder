import React from "react";
import { connect } from "react-redux";

import { CHORDS } from "@/lib/chord-finder/chord";

import { clearChordSelection, selectChordRoot, selectChordType } from "@/redux/actions";

import IntervalSelector from "./interval-selector";

const ChordSelector = ({
    currentChord,
    selectChordRoot,
    selectChordType,
    clearChordSelection
}) => {
    const current_highlight = (currentChord.chord_root === -1) || (currentChord.chord_type === -1) ?
        "selected notes" :
        currentChord.chord_root + " " + currentChord.chord_type;

    return(
        <div>
            <IntervalSelector
                currentRoot={currentChord.chord_root}
                currentInterval={currentChord.chord_type}
                validIntervals={CHORDS}
                selectRoot={selectChordRoot}
                selectType={selectChordType}
                clearSelection={clearChordSelection}
                clearSelectionText={"Clear Chord"}
            />
            <p>
                Currently highlighting: {current_highlight}
            </p>
        </div>
    );
};

const mapStateToProps = state => ({
    currentChord: state.currentChord
});
const mapDispatchToProps = dispatch => ({
    selectChordRoot: note => dispatch(selectChordRoot(note)),
    selectChordType: type => dispatch(selectChordType(type)),
    clearChordSelection: () => dispatch(clearChordSelection()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChordSelector);