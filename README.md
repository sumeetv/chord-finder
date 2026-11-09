An interactive guitar workbench for finding chords and scales from selected frets, with alternate tunings and preset exploration. Built with Next.js, React, and Chakra UI.

The mobile interface shows six fret positions at a time; use the range arrows to explore the neck. Wide desktop layouts show open strings through fret 15. Chords and Scales retain independent selections. Changing tuning keeps your physical fret selections and recalculates their pitches. Clear and Undo apply to the current mode. Preset previews preserve your manual selection; use **Back to my notes** to return.

The modernization roadmap, decisions, validation results, and resume instructions live in [MODERNIZATION_PLAN.md](MODERNIZATION_PLAN.md).

Quick commands
```bash
npm ci
# run locally
npm run dev
# verify music/state, motion lifecycle, accessibility preferences, and fallback behavior
npm test
# run build script to test for errors
npm run build
```

The active interface is `src/components/guitar-workbench.tsx`; its authoritative selection model is `src/lib/chord-finder/workbench.ts`. Older chord-selector/Redux components remain in the repository but are no longer mounted by the main page.

Fret taps trigger brief Three.js string waves and note ripples. The effects load on fretboard interaction and stop rendering when settled, off-screen, or hidden. Controls and labels stay in the DOM and remain usable without WebGL. Open **Or explore a chord/scale** to toggle **Animated feedback**; the setting is saved locally and respects the device's reduced-motion preference.

`npm test` runs 13 music/state/animation-loop tests plus 10 React and renderer fallback tests. The React tests use a simulated DOM and media preferences; they cover reduced motion, unavailable WebGL, saved settings, pending loads, visibility, and unmount cleanup. Physical-phone comfort and frame rates still need device testing.

To verify a production build while a development server is running, use `CHORD_FINDER_DIST_DIR=.next-check npm run build`. The isolated output directory is ignored by Git.
