"use client";

import { useMemo, useReducer, useState } from "react";
import type { CSSProperties, ReactNode, SVGProps } from "react";
import {
  CHORDS,
  ChordsForNotes,
  FindPotentialChords,
  NotesForChord,
} from "@/lib/chord-finder/chord";
import {
  SCALES,
  FindPotentialScales,
  NotesForScale,
  ScalesForNotes,
} from "@/lib/chord-finder/scale";
import NOTES from "@/lib/chord-finder/notes";
import TUNINGS from "@/lib/chord-finder/tunings";
import {
  createWorkbenchState,
  INTERVALS,
  LAST_FRET,
  pitchAt,
  selectedNoteCounts,
  workbenchReducer,
} from "@/lib/chord-finder/workbench";
import type { Mode } from "@/lib/chord-finder/workbench";

function Icon({
  name,
  ...props
}: {
  name: "left" | "right" | "undo" | "clear" | "notes" | "spark";
} & SVGProps<SVGSVGElement>) {
  const paths: Record<string, ReactNode> = {
    left: <path d="m14 6-6 6 6 6" />,
    right: <path d="m10 6 6 6-6 6" />,
    undo: (
      <>
        <path d="M4 6h10a6 6 0 0 1 0 12" />
        <path d="m8 2-4 4 4 4" />
      </>
    ),
    clear: (
      <>
        <path d="m8 8 8 8m0-8-8 8" />
        <circle cx="12" cy="12" r="9" />
      </>
    ),
    notes: (
      <>
        <path d="M8 17V5l12-2v12M8 8l12-2" />
        <ellipse cx="5" cy="18" rx="3" ry="2" />
        <ellipse cx="17" cy="16" rx="3" ry="2" />
      </>
    ),
    spark: (
      <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" />
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

function prettyNote(note: string) {
  return note
    .replace(/([A-G])b/g, "$1♭")
    .replace(/b(?=\d)/g, "♭")
    .replace(/#/g, "♯");
}
function splitMatch(match: string) {
  const [root, ...type] = match.split(" ");
  return { root: NOTES.indexOf(root), type: type.join(" ") };
}
const FRETS = Array.from({ length: LAST_FRET + 1 }, (_, fret) => fret);
const MARKERS = [3, 5, 7, 9, 12, 15];
const PAGE_SIZE = 6;
const RANGE_STARTS = [0, 4, 8, LAST_FRET - PAGE_SIZE + 1];

export default function GuitarWorkbench() {
  const [state, dispatch] = useReducer(
    workbenchReducer,
    undefined,
    createWorkbenchState,
  );
  const [rangeStart, setRangeStart] = useState(0);
  const [intervalLabels, setIntervalLabels] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const session = state.sessions[state.mode];
  const isChords = state.mode === "chords";
  const singular = isChords ? "chord" : "scale";
  const definitions = isChords ? CHORDS : SCALES;
  const notesFor = isChords ? NotesForChord : NotesForScale;
  const manualCounts = useMemo(() => selectedNoteCounts(session), [session]);
  const presetNotes = session.presetType
    ? notesFor(session.root, session.presetType)
    : {};
  const activeCounts = session.presetType
    ? NOTES.map((_, index) => (presetNotes[index] ? 1 : 0))
    : manualCounts;
  const noteIndices = activeCounts.flatMap((count, index) =>
    count > 0 ? [index] : [],
  );
  const exactMatches = noteIndices.length
    ? isChords
      ? ChordsForNotes(activeCounts)
      : ScalesForNotes(activeCounts)
    : [];
  const containingMatches = noteIndices.length
    ? (isChords
        ? FindPotentialChords(activeCounts)
        : FindPotentialScales(activeCounts)
      )
        .filter((match) => !exactMatches.includes(match))
        .sort((a, b) => {
          const first = splitMatch(a),
            second = splitMatch(b);
          return (
            Object.keys(notesFor(first.root, first.type)).length -
              Object.keys(notesFor(second.root, second.type)).length ||
            a.localeCompare(b)
          );
        })
    : [];
  const summary = session.presetType
    ? `${prettyNote(NOTES[session.root])} ${session.presetType}`
    : exactMatches[0]
      ? prettyNote(exactMatches[0])
      : noteIndices.length
        ? "Explore your options"
        : "Start with a few notes";
  const selectionSet = new Set(session.positions);

  function changeMode(mode: Mode) {
    dispatch({ type: "mode", mode });
    setShowAll(false);
  }
  function preview(match: string) {
    const { root, type } = splitMatch(match);
    dispatch({ type: "preset", root, presetType: type });
    setShowAll(false);
  }

  return (
    <div className="cf-workbench">
      <section className="cf-intro" aria-labelledby="workbench-title">
        <div>
          <p className="cf-eyebrow">BASIC PLAYGROUND</p>
          <h1 id="workbench-title">
            Find your next <span>{singular}.</span>
          </h1>
          <p className="cf-subtitle">
            Tap a few frets to get started, see what other chords or scales could fit, and see where you can go on the fretboard.
          </p>
        </div>
        <div className="cf-intro-art" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <span>C</span>
          <span>E</span>
          <span>G</span>
        </div>
      </section>

      <div className="cf-workspace-toolbar">
        <div className="cf-tabs" role="group" aria-label="Instrument mode">
          <button
            type="button"
            aria-pressed={isChords}
            onClick={() => changeMode("chords")}
          >
            Chords
          </button>
          <button
            type="button"
            aria-pressed={!isChords}
            onClick={() => changeMode("scales")}
          >
            Scales
          </button>
        </div>
        <label className="cf-tuning">
          <span>Tuning</span>
          <select
            aria-label="Tuning"
            value={session.tuning}
            onChange={(event) =>
              dispatch({ type: "tuning", tuning: event.target.value })
            }
          >
            {Object.keys(TUNINGS).map((tuning) => (
              <option key={tuning}>{tuning}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="cf-main-grid">
        <section
          className="cf-instrument cf-panel"
          aria-label="Guitar fretboard"
        >
          <div className="cf-board-header">
            <div>
              <p className="cf-eyebrow">YOUR FRETBOARD</p>
              <h2>
                {session.presetType ? "Explore the shape" : "Make it your own"}
              </h2>
            </div>
            <div
              className="cf-label-switch"
              role="group"
              aria-label="Fret labels"
            >
              <button
                type="button"
                aria-pressed={!intervalLabels}
                onClick={() => setIntervalLabels(false)}
              >
                Notes
              </button>
              <button
                type="button"
                aria-pressed={intervalLabels}
                onClick={() => setIntervalLabels(true)}
              >
                Intervals
              </button>
            </div>
          </div>
          <div
            className="cf-result-strip"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="cf-result-icon">
              <Icon name={noteIndices.length ? "notes" : "spark"} />
            </span>
            <div>
              <p className="cf-eyebrow">
                {session.presetType ? "PRESET PREVIEW" : "YOUR SELECTION"}
                {noteIndices.length > 0 &&
                  ` · ${noteIndices.length} NOTE${noteIndices.length === 1 ? "" : "S"}`}
              </p>
              <p className="cf-current-result">{summary}</p>
            </div>
            {session.presetType && (
              <button
                className="cf-back-to-notes"
                type="button"
                onClick={() => dispatch({ type: "preset", presetType: null })}
              >
                Back to my notes
              </button>
            )}
          </div>

          <div className="cf-neck-navigation">
            <span className="cf-mobile-range">
              {rangeStart === 0 ? "Open" : `Fret ${rangeStart}`} <span>—</span>{" "}
              {rangeStart + PAGE_SIZE - 1}
            </span>
            <span className="cf-desktop-range">
              OPEN <span>—</span> 15TH FRET
            </span>
            <div className="cf-range-buttons">
              <button
                type="button"
                className="cf-icon-button"
                aria-label="Previous fret range"
                disabled={rangeStart === 0}
                onClick={() =>
                  setRangeStart(
                    (start) =>
                      RANGE_STARTS[
                        Math.max(0, RANGE_STARTS.indexOf(start) - 1)
                      ],
                  )
                }
              >
                <Icon name="left" />
              </button>
              <button
                type="button"
                className="cf-icon-button"
                aria-label="Next fret range"
                disabled={rangeStart === LAST_FRET - PAGE_SIZE + 1}
                onClick={() =>
                  setRangeStart(
                    (start) =>
                      RANGE_STARTS[
                        Math.min(
                          RANGE_STARTS.length - 1,
                          RANGE_STARTS.indexOf(start) + 1,
                        )
                      ],
                  )
                }
              >
                <Icon name="right" />
              </button>
            </div>
            <span className="cf-interval-reference">
              {intervalLabels
                ? `Intervals from ${prettyNote(NOTES[session.root])}`
                : "STANDARD NOTE NAMES"}
            </span>
          </div>

          <div
            className="cf-neck"
            style={{ "--visible-frets": PAGE_SIZE } as CSSProperties}
          >
            <div className="cf-fret-numbers" aria-hidden="true">
              <span />
              {FRETS.map((fret) => (
                <span
                  key={fret}
                  className={
                    fret < rangeStart || fret >= rangeStart + PAGE_SIZE
                      ? "cf-outside-range"
                      : ""
                  }
                >
                  {fret === 0 ? "○" : fret}
                </span>
              ))}
            </div>
            {TUNINGS[session.tuning]
              .map((_, index, tuning) => tuning.length - index - 1)
              .map((string, row) => (
                <div
                  className="cf-string"
                  key={string}
                  style={
                    {
                      "--string-thickness": `${0.7 + row * 0.35}px`,
                    } as CSSProperties
                  }
                >
                  <span className="cf-string-label" aria-hidden="true">
                    {prettyNote(TUNINGS[session.tuning][string])}
                    <small>{row + 1}</small>
                  </span>
                  {FRETS.map((fret) => {
                    const pitch = pitchAt(session.tuning, string, fret),
                      key = `${string}:${fret}`;
                    const selected = selectionSet.has(key),
                      highlighted = activeCounts[pitch] > 0;
                    const root =
                      (Boolean(session.presetType) || intervalLabels) &&
                      pitch === session.root &&
                      highlighted;
                    return (
                      <button
                        type="button"
                        key={fret}
                        className={[
                          "cf-fret",
                          fret === 0 ? "cf-open-fret" : "",
                          fret < rangeStart || fret >= rangeStart + PAGE_SIZE
                            ? "cf-outside-range"
                            : "",
                          selected ? "is-selected" : "",
                          highlighted ? "is-highlighted" : "",
                          root ? "is-root" : "",
                        ].join(" ")}
                        aria-label={`String ${row + 1}, ${TUNINGS[session.tuning][string]}, ${fret === 0 ? "open" : `fret ${fret}`}, ${NOTES[pitch]}`}
                        aria-pressed={selected}
                        onClick={() =>
                          dispatch({ type: "toggle", string, fret })
                        }
                      >
                        <span className="cf-note-marker">
                          {intervalLabels
                            ? INTERVALS[(pitch - session.root + 12) % 12]
                            : prettyNote(NOTES[pitch])}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            <div className="cf-position-markers" aria-hidden="true">
              <span />
              {FRETS.map((fret) => (
                <span
                  key={fret}
                  className={
                    fret < rangeStart || fret >= rangeStart + PAGE_SIZE
                      ? "cf-outside-range"
                      : ""
                  }
                >
                  {MARKERS.includes(fret) && <i />}
                  {fret === 12 && <i />}
                </span>
              ))}
            </div>
          </div>

          <div className="cf-board-footer">
            <div className="cf-board-legend">
              <span>
                <i className="cf-dot-selected" />
                Selected
              </span>
              <span>
                <i className="cf-dot-related" />
                Same note
              </span>
              {(session.presetType || intervalLabels) && (
                <span>
                  <i className="cf-dot-root" />
                  Root
                </span>
              )}
            </div>
            <div className="cf-board-actions">
              <button
                type="button"
                className="cf-action-button"
                disabled={!session.history.length}
                onClick={() => dispatch({ type: "undo" })}
              >
                <Icon name="undo" />
                Undo
              </button>
              <button
                type="button"
                className="cf-action-button"
                disabled={!session.positions.length && !session.presetType}
                onClick={() => dispatch({ type: "clear" })}
              >
                <Icon name="clear" />
                Clear
              </button>
            </div>
          </div>
          <p className="cf-board-hint">
            {session.presetType
              ? "Tap any fret to return to selecting your own notes."
              : session.positions.length
                ? `${session.positions.length} fret${session.positions.length === 1 ? "" : "s"} selected. Matching notes light up across the neck.`
                : "Tap a note to select it. Tap again to let it go."}
          </p>
          <details className="cf-browse">
            <summary>
              <span>
                <Icon name="notes" />
                Or explore a {singular}
              </span>
              <span className="cf-browse-plus">+</span>
            </summary>
            <div className="cf-browse-controls">
              <label>
                Root / interval reference
                <select
                  aria-label="Root / interval reference"
                  value={session.root}
                  onChange={(event) =>
                    dispatch({ type: "root", root: Number(event.target.value) })
                  }
                >
                  {NOTES.map((note, index) => (
                    <option key={note} value={index}>
                      {prettyNote(note)}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                {isChords ? "Chord" : "Scale"} type
                <select
                  aria-label={isChords ? "Chord type" : "Scale type"}
                  value={session.presetType ?? ""}
                  onChange={(event) =>
                    dispatch({
                      type: "preset",
                      presetType: event.target.value || null,
                    })
                  }
                >
                  <option value="">Your selected notes</option>
                  {Object.keys(definitions)
                    .sort()
                    .map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                </select>
              </label>
            </div>
            <p>
              Choose a root and type to light up the neck. Your selected frets
              stay saved.
            </p>
          </details>
        </section>

        <aside
          className="cf-matches cf-panel"
          aria-label={`${isChords ? "Chord" : "Scale"} matches`}
        >
          <div className="cf-matches-heading">
            <span className="cf-small-icon">
              <Icon name="spark" />
            </span>
            <h2>The possibilities</h2>
          </div>
          <div className="cf-selected-notes">
            <p className="cf-eyebrow">
              {session.presetType ? "PREVIEW NOTES" : "SELECTED NOTES"}
            </p>
            <div>
              {noteIndices.length ? (
                noteIndices.map((index) => (
                  <span className="cf-note-chip" key={index}>
                    {prettyNote(NOTES[index])}
                  </span>
                ))
              ) : (
                <span className="cf-empty-notes">
                  Your notes will appear here
                </span>
              )}
            </div>
          </div>
          {!noteIndices.length ? (
            <div className="cf-empty-state">
              <div className="cf-empty-chord" aria-hidden="true">
                <span />
                <span />
                <span />
                <i />
                <i />
                <i />
              </div>
              <h3>A few notes go a long way.</h3>
              <p>
                Select notes on the fretboard to discover the{" "}
                {isChords ? "chords" : "scales"} they belong to.
              </p>
              <button
                type="button"
                className="cf-example-button"
                onClick={() =>
                  dispatch({
                    type: "preset",
                    root: NOTES.indexOf("C"),
                    presetType: "major",
                  })
                }
              >
                Explore C major <Icon name="right" />
              </button>
            </div>
          ) : (
            <>
              <div className="cf-match-section">
                <div className="cf-section-label">
                  <h3>Exact matches</h3>
                  <span>{exactMatches.length}</span>
                </div>
                {exactMatches.length ? (
                  exactMatches.map((match) => (
                    <button
                      type="button"
                      className="cf-exact-match"
                      key={match}
                      onClick={() => preview(match)}
                    >
                      <span>{prettyNote(match)}</span>
                      <Icon name="right" />
                    </button>
                  ))
                ) : (
                  <p className="cf-no-exact">
                    No exact {singular} yet. Try another note, or explore a
                    match below.
                  </p>
                )}
              </div>
              <div className="cf-match-section">
                <div className="cf-section-label">
                  <h3>Containing these notes</h3>
                  <span>{containingMatches.length}</span>
                </div>
                {containingMatches
                  .slice(0, showAll ? undefined : 6)
                  .map((match) => {
                    const { root, type } = splitMatch(match);
                    const extra = Object.keys(notesFor(root, type))
                      .map(Number)
                      .filter((note) => !activeCounts[note]);
                    return (
                      <button
                        type="button"
                        className="cf-containing-match"
                        key={match}
                        onClick={() => preview(match)}
                      >
                        <span>
                          {prettyNote(match)}
                          <small>
                            +{" "}
                            {extra
                              .map((note) => prettyNote(NOTES[note]))
                              .join(" · ")}
                          </small>
                        </span>
                        <Icon name="right" />
                      </button>
                    );
                  })}
                {!containingMatches.length && (
                  <p className="cf-no-exact">
                    No larger matches in the current library.
                  </p>
                )}
                {containingMatches.length > 6 && (
                  <button
                    type="button"
                    className="cf-show-all"
                    onClick={() => setShowAll((value) => !value)}
                  >
                    {showAll
                      ? "Show fewer"
                      : `Show all ${containingMatches.length} matches`}
                  </button>
                )}
              </div>
            </>
          )}
        </aside>
      </div>
      <footer className="cf-app-footer">
        <span>Built for the moments between chords.</span>
        <span>6 STRINGS. ENDLESS POSSIBILITIES.</span>
      </footer>
    </div>
  );
}
