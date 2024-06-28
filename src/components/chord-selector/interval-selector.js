import React from "react";
import { Button, Select, Wrap, WrapItem } from "@chakra-ui/react";

import NOTES from "@/lib/chord-finder/notes";

import "./interval-selector.css";

const IntervalSelector = ({
    currentRoot,
    currentInterval,
    validIntervals,
    selectRoot,
    selectType,
    clearSelection,
    clearSelectionText
}) => {
    let noteSelectors = [];
    noteSelectors.push(
        <option value={-1} key={"base-value"}>
            -
        </option>
    );
    for (const idx in NOTES) {
        noteSelectors.push(
            <option value={NOTES[idx]} key={idx}>
                {NOTES[idx]}
            </option>
        );
    }

    let intervalSelectors = [];
    intervalSelectors.push(
        <option value={-1} key={"base-value"}>
            -
        </option>
    );
    let intervalIdxKeys = Object.keys(validIntervals).sort();
    for (const idx in intervalIdxKeys) {
        intervalSelectors.push(
            <option value={intervalIdxKeys[idx]} key={idx}>
                {intervalIdxKeys[idx]}
            </option>
        )
    }

    return(
        <Wrap className="interval-selector-container">
            <WrapItem>
                    <div className="interval-note-selector">
                    <Select
                        className="custom-select"
                        value={currentRoot}
                        onChange={(event) => selectRoot(event.target.value)}
                    >
                        {noteSelectors}
                   </Select>
                </div>
            </WrapItem>
            <WrapItem>
                <div className="interval-type-selector">
                    <Select
                        className="custom-select"
                        value={currentInterval}
                        onChange={(event) => selectType(event.target.value)}
                    >
                        {intervalSelectors}
                    </Select>
                </div>
            </WrapItem>
            <WrapItem>
                <Button type="reset" onClick={() => clearSelection()}>
                    {clearSelectionText}
                </Button>
            </WrapItem>
        </Wrap>
    );
};

export default IntervalSelector;
