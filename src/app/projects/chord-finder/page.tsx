'use client'

import React from "react";
import { Provider } from "react-redux";

import ChordBoard from "@/components/chord-selector/chord-board";
import ScaleBoard from "@/components/chord-selector/scale-board";

import store from "@/redux/store";
import "./chord-finder.css";
import { Heading, Text, useBreakpointValue } from "@chakra-ui/react";

const ChordFinderPage = () => {
    const layout = useBreakpointValue(
            {
            base: "vertical",
            md: "horizontal",
        },
        {
            fallback: 'md',
        }
    );

    return (
        <Provider store={store}>
            <Heading>Chord Finder</Heading>
            <Text>
                Select frets on either fretboard to see what chords or scales match your selection.
                You can also select a chord or scale from the dropdowns to highlight all corresponding
                notes.
            </Text>
            <br />
            <Heading size="md">
                Chord Selector
            </Heading>
            <ChordBoard layout={layout} />
            <br />
            <Heading size="md">
                Scale Selector
            </Heading>
            <ScaleBoard layout={layout} />
        </Provider>
    );
};

export default ChordFinderPage;