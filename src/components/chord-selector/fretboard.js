import React, { useState } from "react";

import NOTES from "@/lib/chord-finder/notes";
import TUNINGS from "@/lib/chord-finder/tunings";

import FretCell from "@/components/chord-selector/fret-cell";
import FretCellTypes from "@/components/chord-selector/fret-cell-types";

const NUM_FRETS = 15;
const FRET_MARKERS = [3, 5, 7, 10, 12, 15];

const GuitarString = ({ base_note_idx, num_frets, highlighted_notes, onSelectNote, onDeselectNote }) => {
    let output = [];

    for (let idx = 0; idx < num_frets; idx++) {
        const cur_note_idx = (base_note_idx + idx) % NOTES.length;

        let cell_type = FretCellTypes.NORMAL;
        if (highlighted_notes[cur_note_idx] > 0) {
            cell_type = FretCellTypes.HIGHLIGHTED;
        } else if (idx === 0) {
            cell_type = FretCellTypes.ROOT;
        }

        output.push(
            <FretCell
                key={idx}
                note={NOTES[cur_note_idx]}
                value={cur_note_idx}
                cellType={cell_type}
                onSelectNote={onSelectNote}
                onDeselectNote={onDeselectNote}
            />
        );
    }
    return (
        <div className="guitar-string">
            {output}
        </div>
    );
};

// Generate a row of fret cells that display fret markers for reference
const MarkerRow = () => {
    let row = [];
    for (let idx = 0; idx < NUM_FRETS; idx++) {
        const visible_note = (FRET_MARKERS.indexOf(idx) === -1) ?
            "":
            idx;
        row.push(
            <FretCell
                key={idx}
                cellType={FretCellTypes.DISABLED}
                note={visible_note}
            />
        )
    }
    return (
        <div className="guitar-string">
            {row}
        </div>
    );
}

const Fretboard = ({ highlightedNotes, currentTuning, onSelectNote, onDeselectNote }) => {
    let strings = [];
    const tuning_deltas = TUNINGS[currentTuning];
    for (let idx = tuning_deltas.length - 1; idx >= 0; idx--) {
        strings.push(
            <GuitarString
                key={idx}
                base_note_idx={NOTES.indexOf(tuning_deltas[idx])}
                num_frets={NUM_FRETS}
                highlighted_notes={highlightedNotes}
                onSelectNote={onSelectNote}
                onDeselectNote={onDeselectNote}
            />
        );
    }

    return (
        <div>
            {MarkerRow()}
            {strings}
        </div>
    );
};

export default Fretboard;