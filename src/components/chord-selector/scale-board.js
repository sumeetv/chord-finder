import React, { useState } from "react";
import { connect } from "react-redux";

import { Button, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Select } from "@chakra-ui/react";

import NOTES from "@/lib/chord-finder/notes";
import { FindPotentialScales, NotesForScale, ScalesForNotes } from "@/lib/chord-finder/scale";
import TUNINGS from "@/lib/chord-finder/tunings";

import { selectScaleNote, deselectScaleNote } from "@/redux/actions";

import ScaleSelector from "./scale-selector";
import Fretboard from "./fretboard";

import "./fretboard.css";

const ScaleBoard = ({
    currentScale,
    selectedScaleNotes,
    selectScaleNote,
    deselectScaleNote,
    layout,
}) => {
    const defaultTuning = Object.keys(TUNINGS)[0];
    const [currentTuning, setCurrentTuning] = useState(defaultTuning);
    const [isModalOpen, setModalVisibility] = useState(false);

    let tunings = [];
    for (let tuningKey in TUNINGS) {
        tunings.push(
            <option value={tuningKey} key={tuningKey}>
                {tuningKey}
            </option>
        )
    }

    const selectedScales = ScalesForNotes(selectedScaleNotes);
    const currentScalesText = selectedScales.length ?
        selectedScales.join(", "):
        null;

    // Highlight the selected scale's notes if we have a scale, otherwise highlight all notes that the
    // user has manually selected
    const highlightedNotes = (currentScale.scale_root !== -1) && (currentScale.scale_type !== -1) ?
        NotesForScale(NOTES.indexOf(currentScale.scale_root), currentScale.scale_type) :
        selectedScaleNotes;

    const potentialScales = FindPotentialScales(selectedScaleNotes);
    const potentialScalesList = [];
    for (const idx in potentialScales) {
        potentialScalesList.push(
            <div key={idx}>
                {potentialScales[idx]}
            </div>
        );
    }

    const ToggleModal = () => {
        setModalVisibility(!isModalOpen);
    };

    return (
        <div>
            <div className="fretboard-header">
                <ScaleSelector />
                <div className="fretboard-tuning">
                    <Select onChange={(event) => setCurrentTuning(event.target.value)}>
                        {tunings}
                    </Select>
                </div>
            </div>
            <Fretboard
                highlightedNotes={highlightedNotes}
                currentTuning={currentTuning}
                onSelectNote={selectScaleNote}
                onDeselectNote={deselectScaleNote}
                layout={layout}
            />
            <div>
                <Button onClick={ToggleModal} size="sm">View potential scales</Button>
                <Modal isOpen={isModalOpen} onClose={ToggleModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            Potential Scales
                        </ModalHeader>
                        <ModalBody>
                            <div className="fretboard-modal">
                                {potentialScalesList}
                            </div>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </div>
            <p>
                Selected scale(s): {currentScalesText}
            </p>
        </div>
    );
}

const mapStateToProps = state => ({
    currentScale: state.currentScale,
    selectedScaleNotes: state.selectedScaleNotes,
});
const mapDispatchToProps = dispatch => ({
        selectScaleNote: note => dispatch(selectScaleNote(note)),
        deselectScaleNote: note => dispatch(deselectScaleNote(note)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ScaleBoard);