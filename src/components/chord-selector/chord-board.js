import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, FormSelect, Modal, ModalBody, ModalHeader } from "shards-react";

import { ChordsForNotes, FindPotentialChords, NotesForChord } from "../utils/chord";
import NOTES from "../utils/notes";
import TUNINGS from "../utils/tunings";

import { selectChordNote, deselectChordNote } from "../redux/actions";

import ChordSelector from "./chord-selector";
import Fretboard from "./fretboard";

import "./fretboard.css";

const ChordBoard = ({ currentChord, selectedChordNotes, selectChordNote, deselectChordNote }) => {
    const defaultTuning = Object.keys(TUNINGS)[0];
    const [currentTuning, setCurrentTuning] = useState(defaultTuning);
    const [isModalOpen, setModalVisibility] = useState(false);

    let tunings = [];
    for (let tuning_key in TUNINGS) {
        tunings.push(
            <option value={tuning_key}>
                {tuning_key}
            </option>
        )
    }

    const currentChords = ChordsForNotes(selectedChordNotes);
    const currentChordsText = currentChords.length ?
        currentChords.join(", "):
        null;

    // Highlight the selected chord's notes if we have a chord, otherwise highlight all notes that the
    // user has manually selected
    const highlighted_notes = (currentChord.chord_root !== -1) && (currentChord.chord_type !== -1) ?
        NotesForChord(NOTES.indexOf(currentChord.chord_root), currentChord.chord_type) :
        selectedChordNotes;

    const potentialChords = FindPotentialChords(selectedChordNotes);
    const potentialChordsList = [];
    for (const idx in potentialChords) {
        potentialChordsList.push(
            <div>{potentialChords[idx]}</div>
        );
    }

    const ToggleModal = () => {
        setModalVisibility(!isModalOpen);
    };

    return (
        <div>
            <div className="fretboard-header">
                <ChordSelector />
                <div className="fretboard-tuning">
                    <FormSelect onChange={(event) => setCurrentTuning(event.target.value)}>
                        {tunings}
                    </FormSelect>
                </div>
            </div>
            <Fretboard
                highlightedNotes={highlighted_notes}
                currentTuning={currentTuning}
                onSelectNote={selectChordNote}
                onDeselectNote={deselectChordNote}
            />
            <div>
                <Button onClick={ToggleModal} size="sm">View potential chords</Button>
                <Modal open={isModalOpen} toggle={ToggleModal}>
                    <ModalHeader>
                        Potential Chords
                    </ModalHeader>
                    <ModalBody>
                        <div className="fretboard-modal">
                            {potentialChordsList}
                        </div>
                    </ModalBody>
                </Modal>
            </div>
            <p>
                Selected chord(s): {currentChordsText}
            </p>
        </div>
    );
}

const mapStateToProps = state => ({
    currentChord: state.currentChord,
    selectedChordNotes: state.selectedChordNotes,
});
const mapDispatchToProps = dispatch => ({
        selectChordNote: note => dispatch(selectChordNote(note)),
        deselectChordNote: note => dispatch(deselectChordNote(note)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChordBoard);