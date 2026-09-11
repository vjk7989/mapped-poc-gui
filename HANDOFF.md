# Standalone Mapped POC Handoff

## Current status

- Repository: `D:\drone-mapping\mapped-poc-gui`; branch: `main`; remote: `https://github.com/vjk7989/mapped-poc-gui`.
- The application opens directly to Mapped POC with **CEO / General Manager** selected. There is no company picker, and the product ships only its Mapped POC profile and logo.
- Mapped POC contains only Survey Areas 001–003. Fresh browser state has 62 fixed Infected trees: 27 in Area 001, 35 in Area 002, and none in Area 003. Saved markers can change the active totals, and every sidebar page reads the current role-scoped browser state.
- Google Satellite Maps power the portfolio overview and all three survey maps. Survey geofences, markers, combined Area 001/003 overview selection, accessible list/table equivalents, and map-failure fallbacks remain available as defined in the runtime.
- The independent release runner passed `npm test`, `npm run build`, staged diff hygiene, credential/path scans, retired-code scans, and confirmation that the source repository remained clean.

## Data and browser state

- Runtime and UI: `index.html`.
- Survey snapshots: `data/mapped-poc-data.js` and `data/survey-002-farm-data.js`.
- Initial editable mapping state: `data/initial-mapping-state.js`.
- Browser storage schema is version 1 under `mapped-poc-gui.state.v1`. The repository seed starts with no overrides or added markers; saved geofences and marker collections are isolated for Areas 001, 002, and 003.
- Area 001 reserves optional IDs `TREE-0113…TREE-0149`; Area 002 reserves `TREE-0172…TREE-0200`; empty Area 003 reserves `TREE-0201…TREE-0264`. Only saved positions activate optional records.
- Operational marker coordinates and geofences are not surveyed palm-base locations or legal property boundaries. Ganoderma percentages are deterministic modelled workflow values, not confirmed field or laboratory diagnoses.

## Access and route facts

- Role selection is a client-side workflow gate, not authentication.
- Only **System Administrator** may mutate geofences, markers, cases, treatments, workflow reset state, or accounts. Mutators contain fail-closed administrator checks, and edit controls are omitted for non-administrators.
- Authorized non-administrators retain their permitted navigation, personal display/notification preferences, alert reading, and report export. Field Staff do not receive report export.
- Overview, Survey Areas, Alerts, Reports, Cases & Treatments, Administration, and Settings derive their records and totals from the same active three-survey state. Survey/tree links preserve identity across map pins, grids, alerts, cases, and treatments.
- Account, workflow, report-history, and preference changes are browser-local. Workflow reset preserves saved geofences and tree markers.

## Authoritative references

Do not duplicate these artifacts in future handoffs:

- Architecture decisions and constraints: `docs/ARCHITECTURE_RECORD.md`.
- Product intent and terminology: `PRODUCT.md`.
- Visual and accessibility contract: `DESIGN.md`.
- Executable acceptance contract: `tests/static-check.mjs`.
- Local setup and deployment summary: `README.md`.
- GitHub Pages workflow: `.github/workflows/deploy-pages.yml`.

## Release verification

For every future release, run `npm test`, `npm run build`, and `git diff --check`, then scan tracked text for credentials and retired multi-company code. Verify CEO startup, role switching, every sidebar route, Google overview/survey maps, failure fallbacks, non-admin read-only presentation, and administrator editing/persistence. The local Maps file must remain ignored; deployment receives `hyper_maps_key` only through the `HYPER_MAPS_KEY` repository secret.

## Continuation rules

- Follow `AGENTS.md`, YAGNI, deterministic processing, and the required separated test-author/test-runner/failure-analysis workflow.
- Keep all project output inside this repository on `D:`. Do not introduce runtime reads from external source folders.
- Do not inspect, commit, document, log, or repeat the local Google Maps key.
- Preserve status/provenance distinctions, globally unique Tree IDs, area-isolated mapping state, Google failure fallbacks, and accessible list/table alternatives.

## Suggested skills

- `understand-anything:understand-chat` for graph-backed questions about route, state, or data flow.
- `understand-anything:understand-explain` for mapping-state, RBAC, or Google Maps initialization details.
- `understand-anything:understand-diff` before release or after future changes.
- `impeccable` for responsive UI and accessibility changes.
- `computer-use:computer-use` for local and deployed Google Maps acceptance checks.
- `spreadsheets:Spreadsheets` only when workbook-derived source values change.

## Next session

Read this file and the authoritative references above, verify the current branch and Pages run, then continue from the user's next goal.
