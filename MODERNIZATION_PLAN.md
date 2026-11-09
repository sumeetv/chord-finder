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

### 2. Tactile effects — implemented; physical-phone evaluation pending

- [x] Refine spring feedback and result transitions after mobile validation.
- [x] Add a lazy-loaded Three.js visual layer for short string vibrations/ripples, retaining DOM interaction and labels.
- [x] Implement effects that settle to idle, stop off-screen/when hidden, respect reduced motion, and leave controls usable without WebGL.
- [ ] Evaluate comfort and animation performance on the user's physical phone; OS reduced-motion and actual unavailable-WebGL paths still need device/browser emulation.

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
- `npm test` compiles the actual TypeScript music/state modules into a temporary directory and runs thirteen Node tests for duplicate pitches, tuning/undo, independent sessions, clear/undo, preset exit, C-major recognition across positions, all tunings, scale recognition, guarded input/history bounds, and four animation-loop tests (coalescing frames, settling, cancellation/disposal, and restarting). No test dependency was added.
- Manual/browser checks: portrait phone (320, 390, 430px), desktop, landscape, tuning change with selection, repeated pitches, range changes, independent modes, presets, result preview, keyboard, reduced motion.
- Do not claim device performance or browser QA unless actually measured.

## Resume checkpoint

Milestones 1 and 2 implemented on 2026-11-08. Physical-phone evaluation remains pending; milestone 3 is optional scope.

- Active UI: `src/components/guitar-workbench.tsx`; responsive styles: `src/app/chord-finder.css`.
- Follow-up: inset dropdown chevrons 12px from the right using a CSS SVG background and 36px text padding. Browser-checked desktop and 320px layouts and tuning selection. User copy edits retained.
- Authoritative state: `src/lib/chord-finder/workbench.ts` with per-mode sessions and up to 50 undo snapshots. Selected physical positions derive pitch counts; tuning changes keep positions and recalculate pitches. Old Redux/chord-selector components remain available but are unmounted.
- Phone ranges are 0–5, 4–9, 8–13, 10–15, with reversible navigation. At >=1100px, show all 16 positions. At >=1380px, show matches alongside the board; otherwise below it.
- Exact/containing matches, missing-note hints, presets, back-to-manual selection, note/interval labels, clear/undo, and keyboard-operable buttons are implemented. Preset previews keep manual selections intact.
- Device UI fonts replace network-loaded fonts. Dark theme, app identity/metadata, skip link, focus outlines, and CSS reduced-motion rules are implemented. Milestone 1 added no runtime dependencies; milestone 2 adds pinned `three@0.187.0` and development declarations `@types/three@0.187.0`, with the matching lockfile update.
- Validation: all thirteen `npm test` cases pass. Production build passes, including Next's TypeScript/ESLint checks. `git diff --check` passes.
- In-app browser checks: no horizontal page overflow at 320x740, 390x844, 430x932, 844x390, 1280x900, and 1440x1000. Fret targets measured at least 44.5x48px on the narrowest viewport; 96 visible targets on desktop, 36 on mobile.
- Browser interactions verified: manual C/E/G -> C major; mode preservation; C-major scale preview; tuning E -> D with undo; clear/undo; Enter-key toggle; flat-root/minor preview; interval reference; bebop naming; containing-result preview and return; reversible navigation through fret 15.
- Final production-browser check: short and long preset names leave the fretboard at the same vertical position (428.84px at 390px width); long summary text truncates visually while its full text remains available to assistive technology and in the result list. Final screenshots reflect the production build.
- Browser error/warning log was empty. Reduced-motion CSS was inspected; OS motion preferences were not emulated. Physical-phone comfort, touch gestures, and sustained frame rates still need real-device evaluation.
- Screenshots are outside Git in the current Codex visualization directory: `chord-finder-mobile.jpg`, `chord-finder-desktop.jpg`, and `chord-finder-effects-mobile.jpg`. The user's existing dev server on port 3000 was retained. Only the owned production-QA server on 3001 was stopped. Inspect existing listeners before starting another preview.
- Both repositories are on `codex/music-app-modernization`. Mobile foundation/user copy tweaks were committed in Chord Finder as `bf6f0ec`; Tonnetz's initial roadmap was committed as `f4450ab`. Milestone 2 is saved in a subsequent Chord Finder commit; inspect `git log --oneline -3` on resume. No applicable AGENTS.md was found in repository roots or ancestor directories.

### Milestone 2 implementation details

- `src/components/use-fretboard-effects.ts` coordinates the persisted Animated feedback switch, live OS preference, deferred module import, generation guards for in-flight loads, visibility/intersection handling, and disposal.
- `src/lib/chord-finder/fretboard-effects.ts` renders one transparent shader quad with up to six bounded 700ms impulses. A capped 1.5 pixel ratio, low-power WebGL2 context, no lights/textures/post-processing, and explicit GPU cleanup keep the layer small. No canvas is allocated before a fret activation. Unsupported WebGL or module-loading failure leaves the DOM instrument usable.
- `src/lib/chord-finder/effects-loop.ts` schedules one frame at a time and stops when settled. Four added tests verify coalescing, idle state, stop/dispose, and restarting.
- Spring note feedback and short result transitions use CSS transforms/opacity. Both the app preference and the OS reduced-motion rule disable decorative movement. Settings are inside the existing explore disclosure; no new navigation is needed.
- Production browser QA: no canvas before input; exactly one after repeated taps; active -> idle after settling; range changes clear feedback; switching off removes the canvas and leaves note selection/matching usable; off preference persists through reload; switching on recreates a single canvas; keyboard Enter still toggles frets.
- Production canvas checks after ResizeObserver settles: 292 CSS/buffer pixels at a 320px viewport, 330 at 390px, and 968 at 1440px (DPR 1). No page-wide overflow and pointer-events remain disabled on the canvas. Real-device frame rates were not measured.
- Final production checks had no new console warnings/errors. During implementation, adding hook calls caused a development Fast Refresh reload; a fresh production page passed the behavior checks.
- `CHORD_FINDER_DIST_DIR=.next-check npm run build` isolates build output from a running dev server. This directory is ignored; its generated types are included by TypeScript. The final production report shows a 93.9kB first load; Three.js is in a deferred chunk.
- Renderer references: https://threejs.org/docs/pages/WebGLRenderer.html and https://nextjs.org/docs/app/api-reference/config/next-config-js/distDir.

Next action: inspect branch/status/log, read this checkpoint, review the experience on the user's phone, and address concrete feedback. Tonnetz's topology/responsive foundation is the next planned app milestone; see the sibling plan. Optional audio/saving/custom-tuning work remains separate scope.

Keep this file current before ending work. Do not discard existing edits or assume unchecked later phases are complete.
