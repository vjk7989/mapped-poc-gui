# Standalone Mapped POC Handoff

## Current status

- Repository: `D:\drone-mapping\mapped-poc-gui`; branch `main`; remote `https://github.com/vjk7989/mapped-poc-gui`.
- The standalone application opens directly to Mapped POC with **CEO / General Manager** selected. Only **System Administrator** can mutate shared survey or workflow data.
- The recovered repository-owned default contains 171 positioned trees: Area 001 has 64, Area 002 has 57, and Area 003 has 50. Portfolio status totals are 99 Infected, 10 Suspected, and 62 Healthy.
- All three survey routes use the same farm renderer and the same map-left, 8×8-grid-right workspace. Area-specific data, geofence shape, and editor state remain isolated.
- The current working tree contains the recovered mapping seed, browser-state migration, shared farm-layout parity checks, and test updates. It has not yet been released from this working state.

## Where to continue

- Runtime, rendering, permissions, state loading, and Google Maps: `index.html`.
- Exact recovered geofences, marker IDs, coordinates, and statuses: `data/initial-mapping-state.js`.
- Fixed survey records: `data/mapped-poc-data.js` and `data/survey-002-farm-data.js`.
- Executable acceptance contract: `tests/static-check.mjs`.
- Architecture and decision rationale: `docs/ARCHITECTURE_RECORD.md`.
- Product/design constraints: `PRODUCT.md` and `DESIGN.md`.

Do not duplicate the detailed data, UI, mapping, permission, or provenance rules here; use the referenced files as the authority.

## State and migration facts

- Browser storage is version 3 at `mapped-poc-gui.state.v3`; version 2 is the one-time legacy source.
- Fresh installs and untouched version-2 installs receive the exact recovered 64/57/50 seed.
- Valid deliberate spatial edits from version 2 remain authoritative. Valid accounts, cases, treatments, alert reads, report history, administration data, and preferences are preserved during migration.
- The default distribution is Area 001: 64 Infected; Area 002: 35 fixed Infected plus 10 Suspected and 12 Healthy additions; Area 003: 50 Healthy additions.
- Marker/grid/selector/Tree Detail identity continues to use stable Tree IDs. Mapping changes remain browser-local and survey-isolated.

## Verification and release gate

Before committing or pushing, run the required independent gates:

1. `npm test`
2. `npm run build`
3. `git diff --check`

The tests must confirm the immutable recovered-coordinate hashes, exact 64/57/50 and status totals, v3 migration behavior, shared farm renderer, map/grid/tree identity, role gates, Google Maps fallbacks, and removal of multi-company behavior. If a gate fails, use the dedicated failure-analysis agent before changing implementation.

Then manually open every survey at desktop and narrow widths and confirm the same farm workspace composition, correct 8×8 occupancy, map markers, selector navigation, Tree Details, CEO read-only presentation, and administrator editing. Scan tracked content for credentials and local-drive runtime dependencies before release. The Maps key must remain outside tracked files.

## Continuation rules

- Follow `AGENTS.md`, YAGNI, deterministic processing, and the user-required separated test-author, test-runner, failure-analysis, architecture-record, and handoff roles.
- Keep project outputs on `D:` and do not add runtime reads from source folders.
- Preserve direct Mapped POC startup, CEO default role, administrator-only mutations, accessible non-map fallbacks, and the `hyper_maps_key` configuration contract.
- Treat the source `D:\drone-mapping\oil-palm-1.5-gui\index.html` only as a visual/behavior reference. Do not restore its company selector, other companies, Leaflet, temporary exporter, or local browser state.

## Suggested skills

- `understand-anything:understand-chat` for graph-backed state, route, and data-flow questions.
- `understand-anything:understand-diff` before release.
- `impeccable` for farm-view visual or responsive parity work.
- `computer-use:computer-use` for local and deployed map/UI acceptance checks.

## Next session

Read this file, `docs/ARCHITECTURE_RECORD.md`, and the current diff. Complete the independent verification gate, update only artifacts made stale by the final implementation, then commit, push, and verify GitHub Pages when requested.
