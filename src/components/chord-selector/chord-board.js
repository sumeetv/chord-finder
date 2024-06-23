import React, { useState } from "react";
import { connect } from "react-redux";

import { Button, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Select } from "@chakra-ui/react";

import { ChordsForNotes, FindPotentialChords, NotesForChord } from "@/lib/chord-finder/chord";
import NOTES from "@/lib/chord-finder/notes";
import TUNINGS from "@/lib/chord-finder/tunings";

import { selectChordNote, deselectChordNote } from "@/redux/actions";

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
            <option value={tuning_key} key={tuning_key}>
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
            <div key={idx}>
                {potentialChords[idx]}
            </div>
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
                    <Select onChange={(event) => setCurrentTuning(event.target.value)}>
                        {tunings}
                    </Select>
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
                <Modal isOpen={isModalOpen} onClose={ToggleModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            Potential Chords
                        </ModalHeader>
                        <ModalBody>
                            <div className="fretboard-modal">
                                {potentialChordsList}
                            </div>
                        </ModalBody>
                    </ModalContent>
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