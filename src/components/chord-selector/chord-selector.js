import React from "react";
import { connect } from "react-redux";

import { Text } from "@chakra-ui/react";

import { CHORDS } from "@/lib/chord-finder/chord";
import { clearChordSelection, selectChordRoot, selectChordType } from "@/redux/actions";

import IntervalSelector from "./interval-selector";

const ChordSelector = ({
    currentChord,
    selectChordRoot,
    selectChordType,
    clearChordSelection
}) => {
    return(
        <IntervalSelector
            currentRoot={currentChord.chord_root}
            currentInterval={currentChord.chord_type}
            validIntervals={CHORDS}
            selectRoot={selectChordRoot}
            selectType={selectChordType}
            clearSelection={clearChordSelection}
            clearSelectionText={"Clear Chord"}
        />
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