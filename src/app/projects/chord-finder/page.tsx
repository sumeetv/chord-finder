'use client'

import React from "react";
import { Provider } from "react-redux";

import ChordBoard from "@/components/chord-selector/chord-board";
import ScaleBoard from "@/components/chord-selector/scale-board";

import store from "@/redux/store";
import "./chord-finder.css";

const ChordFinderPage = () => {
    return (
        <Provider store={store}>
            <h1>Chord Finder</h1>
            <p>
                Select frets on either fretboard to see what chords or scales match your selection.
                You can also select a chord or scale from the dropdowns to highlight all corresponding
                notes.
            </p>
            <h4>Chord Selector</h4>
            <ChordBoard />
            <h4>Scale Selector</h4>
            <ScaleBoard />
        </Provider>
    );
};

export default ChordFinderPage;