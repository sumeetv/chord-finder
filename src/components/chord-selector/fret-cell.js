import React, { useState } from "react";
import { connect } from "react-redux";

import { selectNote, deselectNote } from "@/redux/actions";

import * as FretCellTypes from "./fret-cell-types"
import "./fret-cell.css"

const FretCell = ({
    cellType,
    note,
    value,
    onSelectNote,
    onDeselectNote
}) => {
    const [isSelected, setSelected] = useState(false);

    const onCellClick = () => {
        // Short circuit for disabled cells
        if (cellType === FretCellTypes.DISABLED) {
            return;
        }

        if (isSelected) {
            onDeselectNote(value);
        } else {
            onSelectNote(value);
        }
        setSelected(!isSelected);
    }

    let class_name;
    if (isSelected === true) {
        class_name = "fret-cell-selected";
    } else if (cellType === FretCellTypes.HIGHLIGHTED) {
        class_name = "fret-cell-highlighted";
    } else if (cellType === FretCellTypes.ROOT) {
        class_name = "fret-cell-root";
    } else if (cellType === FretCellTypes.DISABLED) {
        class_name = "fret-cell-disabled";
    } else {
        class_name = "fret-cell";
    }


    return (
        <div
            className={class_name}
            onClick={onCellClick}
        >
            {note}
        </div>
    );
}

export default FretCell;