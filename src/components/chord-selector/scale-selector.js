import React from "react";
import { connect } from "react-redux";

import { SCALES } from "../utils/scale";

import { clearScaleSelection, selectScaleRoot, selectScaleType } from "../redux/actions";

import IntervalSelector from "./interval-selector";

const ScaleSelector = ({
    currentScale,
    selectScaleRoot,
    selectScaleType,
    clearScaleSelection
}) => {
    const current_highlight = (currentScale.scale_root === -1) || (currentScale.scale_type === -1) ?
        "selected notes" :
        currentScale.scale_root + " " + currentScale.scale_type;

    return(
        <div>
            <IntervalSelector
                currentRoot={currentScale.scale_root}
                currentInterval={currentScale.scale_type}
                validIntervals={SCALES}
                selectRoot={selectScaleRoot}
                selectType={selectScaleType}
                clearSelection={clearScaleSelection}
                clearSelectionText={"Clear Scale"}
            />
            <p>
                Currently highlighting: {current_highlight}
            </p>
        </div>
    );
};

const mapStateToProps = state => ({
    currentScale: state.currentScale,
});
const mapDispatchToProps = dispatch => ({
    selectScaleRoot: note => dispatch(selectScaleRoot(note)),
    selectScaleType: type => dispatch(selectScaleType(type)),
    clearScaleSelection: () => dispatch(clearScaleSelection()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ScaleSelector);
