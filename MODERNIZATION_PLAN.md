# Chord Finder modernization and resume log

Last updated: 2026-11-08 (America/Los_Angeles).

## User decisions and authorization

- Refresh this existing repository locally. Save a durable plan in each music-app repository, then start Chord Finder's mobile refresh.
- Shared identity with `../tonnetz-graph`: dark, polished music tools with restrained neon accents.
- Prioritize UI and interaction improvements; keep larger music features and architecture upgrades optional.
- Primarily a personal tool, used on both desktop and phone. Phone use while holding a guitar is a first-class workflow.
- User authorized committing the refresh and copy tweaks on a new branch, then proceeding with milestone 2. No publication, deployment, or dependency-wide migration requested.

## Design direction

Pocket guitar workbench: deep blue-black background (#0B0F16), slate panels (#151D2A), soft-white text (#E8EDF5), mint accent (#57DFC9), amber harmonic roots, quiet violet secondary highlights. Crisp sans-serif type and readable note labels. Share visual vocabulary with Tonnetz while keeping this app focused on guitar work.

One primary fretboard with Chords / Scales tabs, independent state retained per mode, exact matches visible near the instrument, and inline expandable containing matches. Clear tuning and browse controls. Explicit distinction between selected frets, repeated pitch classes, preset highlights, and a defined harmonic root.

Mobile: horizontal guitar orientation, approximately six frets at once, overlapping range navigation, fixed string names and clear fret numbers. Comfortable touch targets, no page-wide horizontal overflow, thumb-friendly clear/undo controls. Desktop shows more of the neck and results beside the instrument. Preserve selections when navigating fret ranges and resizing.

## Work sequence and acceptance criteria

### 1. Mobile foundation — current implementation scope

- [x] Replace the stacked chord/scale boards with one responsive, accessible workspace.
- [x] Centralize selected string/fret positions; derive pitch-class counts for existing matching functions. Independent chord/scale sessions, controlled selections, clear, undo, and predictable tuning changes.
- [x] Implement horizontal fretboard with strings, frets, position markers, six-column mobile viewport, and range controls.
- [x] Preserve existing chord/scale/tuning capabilities. Browse a preset or select frets; tapping a fret exits preset preview and returns to manual selection.
- [x] Add exact and containing results inline, sensible empty states, and note/interval labels.
- [x] Replace personal-site branding/metadata and establish shared dark tokens.
- [x] Add short CSS/interface feedback with reduced-motion support.
- [x] Verify meaningful state transitions, TypeScript, production build, and representative phone/desktop layouts where browser tools permit.

Done means: usable at 320–430px portrait widths, no horizontal page overflow, visible focus, comfortable fret targets, accurate results after duplicate pitches/tuning/undo/mode changes, and no layout jumps on selection.

### 2. Tactile effects — follow-up

- [ ] Refine spring feedback and result transitions after mobile validation.
- [ ] Add a lazy-loaded Three.js visual layer for short string vibrations/ripples, retaining DOM interaction and labels.
- [ ] Effects settle and stop rendering at rest, respect reduced motion, degrade gracefully without WebGL, and remain responsive on the user's phone.

### 3. Optional enhancements — separate scope

- Audio audition/strumming (requires octave-aware tuning data), saved shapes, left-handed layout, custom tunings, shareable selections.
- Shared pitch-class/chord definitions with Tonnetz; dependency upgrades after an independent compatibility audit.

## Starting code and known issues

- Next.js 14 / React 18 / Chakra 2 / Redux. Framer Motion is already declared. Preserve the framework and existing `src/lib/chord-finder` matching routines initially.
- At baseline, `src/app/page.tsx` mounted separate chord and scale boards. It now mounts `src/components/guitar-workbench.tsx`.
- Legacy `fret-cell.js` keeps local selected state while Redux counts selected pitch classes. This can become inconsistent through clear/tuning changes; the new workspace must have one authoritative selection model.
- The legacy board exposed positions 0–14 and used a marker at 10. The active board now exposes 0–15 with markers at 3, 5, 7, 9, 12, and 15.
- Removed the per-call `NotesForIntervals` console diagnostic.
- Chord definitions are duplicated in Tonnetz. This repository uses A-based pitch indices and flats; Tonnetz uses C-based indices and sharps. Normalize explicitly before future sharing.

## Validation and commands

- Install with `npm ci` when dependencies are missing.
- `npm run dev` for preview; `npm run build` for production validation; `npx tsc --noEmit` for type checking when installed.
- `npm test` compiles the actual TypeScript music/state modules into a temporary directory and runs nine Node tests for duplicate pitches, tuning/undo, independent sessions, clear/undo, preset exit, C-major recognition across positions, all tunings, scale recognition, and guarded input/history bounds. No test dependency was added.
- Manual/browser checks: portrait phone (320, 390, 430px), desktop, landscape, tuning change with selection, repeated pitches, range changes, independent modes, presets, result preview, keyboard, reduced motion.
- Do not claim device performance or browser QA unless actually measured.

## Resume checkpoint

Milestone 1 implemented on 2026-11-08. Milestones 2–3 remain open.

- Active UI: `src/components/guitar-workbench.tsx`; responsive styles: `src/app/chord-finder.css`.
- Follow-up: inset dropdown chevrons 12px from the right using a CSS SVG background and 36px text padding. Browser-checked desktop and 320px layouts and tuning selection. User copy edits retained.
- Authoritative state: `src/lib/chord-finder/workbench.ts` with per-mode sessions and up to 50 undo snapshots. Selected physical positions derive pitch counts; tuning changes keep positions and recalculate pitches. Old Redux/chord-selector components remain available but are unmounted.
- Phone ranges are 0–5, 4–9, 8–13, 10–15, with reversible navigation. At >=1100px, show all 16 positions. At >=1380px, show matches alongside the board; otherwise below it.
- Exact/containing matches, missing-note hints, presets, back-to-manual selection, note/interval labels, clear/undo, and keyboard-operable buttons are implemented. Preset previews keep manual selections intact.
- Device UI fonts replace network-loaded fonts. Dark theme, app identity/metadata, skip link, focus outlines, and CSS reduced-motion rules are implemented. No new runtime dependencies or lockfile changes.
- Validation: all nine `npm test` cases pass. Production build passes, including Next's TypeScript/ESLint checks. `git diff --check` passes.
- In-app browser checks: no horizontal page overflow at 320x740, 390x844, 430x932, 844x390, 1280x900, and 1440x1000. Fret targets measured at least 44.5x48px on the narrowest viewport; 96 visible targets on desktop, 36 on mobile.
- Browser interactions verified: manual C/E/G -> C major; mode preservation; C-major scale preview; tuning E -> D with undo; clear/undo; Enter-key toggle; flat-root/minor preview; interval reference; bebop naming; containing-result preview and return; reversible navigation through fret 15.
- Final production-browser check: short and long preset names leave the fretboard at the same vertical position (428.84px at 390px width); long summary text truncates visually while its full text remains available to assistive technology and in the result list. Final screenshots reflect the production build.
- Browser error/warning log was empty. Reduced-motion CSS was inspected; OS motion preferences were not emulated. Physical-phone comfort, touch gestures, and sustained frame rates still need real-device evaluation.
- Preview screenshots were saved outside Git in the current Codex visualization directory as `chord-finder-mobile.jpg` and `chord-finder-desktop.jpg`. Local preview servers are stopped at the end of work; run `npm run dev` to resume preview.
- Both repositories were clean at initial inspection. Mobile foundation and user copy tweaks are being checkpointed on `codex/music-app-modernization` before milestone 2. No applicable AGENTS.md was found in repository roots or ancestor directories.

Next action: inspect `git status --short`, read this checkpoint, run `npm run dev`, review the mobile experience on the user's phone, then proceed to milestone 2 (lazy-loaded Three.js vibration/ripples and motion refinement). Keep core controls/labels in the DOM and stop rendering when effects settle. Tonnetz remains planning-only.

Keep this file current before ending work. Do not discard existing edits or assume unchecked later phases are complete.
