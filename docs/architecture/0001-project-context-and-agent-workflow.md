# ADR 0001: Standalone Project Context and Agent Workflow

- Status: Accepted
- Date: 2026-09-11

## Context

This repository is the standalone browser-delivered Mapped POC oil-palm survey interface. It contains exactly Survey Areas 001, 002, and 003 and opens directly to their current portfolio.

The application must remain small, deterministic, usable without its map enhancement, and explicit about the limits of camera coordinates, operational geofences, user-selected health states, and modelled Ganoderma scores.

## Verified architecture

- [`../../index.html`](../../index.html) is the runtime entry point. It contains the application markup, visual tokens, current-data adapter, browser state, renderers, guarded Google Maps integration, and event bindings.
- [`../../data/mapped-poc-data.js`](../../data/mapped-poc-data.js) and [`../../data/survey-002-farm-data.js`](../../data/survey-002-farm-data.js) are repository-owned deterministic snapshots. External source directories are not runtime dependencies.
- The runtime hierarchy is `Mapped POC -> Survey Area -> Tree`. All operational pages derive from the same active three-survey collection after valid browser marker state is synchronized.
- Google Satellite maps enhance Overview and the three survey editors. Accessible rails, tables, selectors, and grids preserve record access when a map cannot load.
- Version-9 browser-local survey state owns independent geofence and marker branches for each Survey ID. Workflow Reset preserves this survey-definition state while clearing page-level operational changes.
- [`../../tests/static-check.mjs`](../../tests/static-check.mjs) is the executable regression contract. `npm test` and `npm run build` both execute it; there is no compilation or application-server step.
- Static assets under [`../../assets/`](../../assets/) provide the application identity and allowlisted tree-evidence derivatives.

Product intent is defined in [`../../PRODUCT.md`](../../PRODUCT.md), visual rules in [`../../DESIGN.md`](../../DESIGN.md), current operational decisions in [`../ARCHITECTURE_RECORD.md`](../ARCHITECTURE_RECORD.md), and continuation context in [`../../HANDOFF.md`](../../HANDOFF.md). Those artifacts should be referenced rather than duplicated.

## Working decisions

1. Keep every project artifact, cache, temporary file, test output, and context document inside `D:\drone-mapping\mapped-poc-gui`. External source directories are read-only and must never become browser runtime dependencies.
2. Apply YAGNI. Implement only the current accepted behavior; avoid speculative services, abstractions, workflows, and persistence layers.
3. Split material work into the smallest practical independently verifiable subtasks. Continue to a dependent area only after its gate is green.
4. Use deterministic commands, fixed inputs, explicit paths, stable identifiers, and reproducible outputs.
5. For coding work, use separate subagents for edge-case test authoring and independent test execution. If a gate fails, a separate failure-analysis agent must provide the smallest repair plan before production or test changes continue.
6. After all gates pass, update the architecture record and handoff with separate context agents. Reference tests, diffs, commits, and source paths instead of copying their contents.
7. Use the codebase-memory graph tools first for code discovery as required by [`../../AGENTS.md`](../../AGENTS.md), falling back to literal search for non-code files or insufficient graph results.
8. Never commit, document, log, or repeat a Google Maps key. Local configuration remains ignored; hosted configuration is injected only into the staged deployment artifact from the repository secret.
9. Preserve status semantics: marker colour is a user designation, the percentage is a deterministic modelled value, coordinates are operational camera/display positions, and none constitutes a confirmed diagnosis or surveyed/legal boundary.

## Decision: standalone extraction and current-data pages

The accepted product boundary is one Mapped POC portfolio with three survey areas. A shared current-data adapter drives Overview, Survey Areas, Alerts, Reports, Cases & Treatments, Administration, and Settings from active trees and valid browser-saved additions. Stable Tree IDs connect map, selector, grid, workflow, export, and Tree Detail surfaces.

Overview and survey maps use the same guarded Google Maps loader. Areas 001 and 003 share a combined Overview marker with distinct accessible actions; Area 002 remains separate. Every map-backed record also has a non-map navigation path.

The System Administrator alone may mutate geofences, markers, shared workflows, or accounts. All role enforcement remains a client-side demonstration workflow gate and must not be described as authentication.

## Consequences

- Most behavior changes remain localized to [`../../index.html`](../../index.html) and [`../../tests/static-check.mjs`](../../tests/static-check.mjs); data changes also update the relevant deterministic snapshot or generator.
- Browser-local persistence and static hosting are intentional current constraints. A backend, authentication boundary, central audit, upload system, or calibrated analytics pipeline requires a separately approved architecture decision.
- Google failure states must preserve the rail, Table view, selector, grid, and exact record navigation.
- Any change to survey capacity, ID allocation, geofence validation, status bands, or evidence rules must update tests and this architecture record in the same green increment.
