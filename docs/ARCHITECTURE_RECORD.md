# Architecture Record

## Current baseline

**Status:** Standalone Mapped POC application verified

**Recorded:** 2026-09-11

**Repository:** `D:\drone-mapping\mapped-poc-gui`

The repository contains one dependency-free static PalmWatch interface for the current Mapped POC survey portfolio. It opens directly to that portfolio. The active hierarchy is:

`Mapped POC -> Survey Area -> Tree`

[`index.html`](../index.html) owns the application shell, runtime state, renderers, Google Maps integration, navigation, and interaction handlers. Repository-owned deterministic snapshots under [`data/`](../data/) provide survey records. [`tests/static-check.mjs`](../tests/static-check.mjs) is the executable regression contract; both `npm test` and `npm run build` execute it.

The Mapped POC behavior in the source `oil-palm-1.5-gui/index.html` was used as the parity reference. The standalone application deliberately excludes its company picker, other-company data, Leaflet integration, and multi-company behavior.

## Decision: recovered three-survey spatial baseline and dynamic capacity

The runtime contains exactly these survey workspaces:

- `MPOC-SURVEY-001`: 27 immutable source-backed trees plus 37 recovered additions, filling its 64-tree capacity; all 64 are Infected.
- `MPOC-SURVEY-002`: 35 immutable source-backed Infected trees plus 22 recovered additions, for 57 active trees.
- `MPOC-SURVEY-003`: 50 recovered additions and no fixed trees.

The repository-owned default in [`data/initial-mapping-state.js`](../data/initial-mapping-state.js) preserves the exact geofences, marker coordinates, IDs, and statuses recovered from the requested `file://` application state. It contains 171 active trees across Areas 001/002/003 as 64/57/50, comprising 99 Infected, 10 Suspected, and 62 Healthy trees. The maximum remains 192. Each survey uses one 8×8 layout. Fixed trees appear first and saved additions follow in stable Tree-ID order. Only active trees occupy cells; unused cells remain black, disabled, and have no active Tree Detail route.

Stable Tree IDs are the identity boundary shared by map markers, selectors, grids, alerts, cases, treatments, reports, and Tree Detail. Area 001 optional IDs are `TREE-0113...TREE-0149`, Area 002 optional IDs are `TREE-0172...TREE-0200`, and Area 003 uses `TREE-0201...TREE-0264`. Removing an optional marker makes the lowest available ID reusable without renumbering surviving trees.

## Decision: one current-data adapter for every page

`mappedPocCurrentData()` combines the immutable snapshot with valid version-3 browser-local marker state. Overview, Survey Areas, Alerts, Reports, Cases & Treatments, Administration, and Settings consume this shared current-data projection rather than independent totals or stale fixtures.

- Overview metrics, rails, and tables use the current three-survey collection.
- Survey Areas lists the three editable workspaces and opens their existing editors; it does not create additional areas.
- Alerts and Cases & Treatments derive stable records from current Infected and Suspected trees and navigate to the exact active Tree ID.
- Reports derives its rows, printable summary, and exports from current survey, tree, coordinate, status, case, and treatment data. Report history is stored only in the standalone Mapped POC state namespace.
- Administration exposes current survey scopes and active-tree access summaries.
- Settings displays current access totals and role-owned preferences.

The adapter is derived after marker-state synchronization, so saving, removing, or recolouring an optional marker updates every dependent surface on the next render.

## Decision: Google Satellite maps with accessible fallbacks

Overview and all three survey editors use Google Maps in Satellite mode through the guarded Maps JavaScript API loader in [`index.html`](../index.html). Loading is an enhancement: the survey rail, Table view, tree selector, and 8×8 grid remain usable when Maps configuration, authorization, billing, timeout, or network loading fails.

Overview draws each current survey geofence and current status totals. Areas 001 and 003 share an operational location, so Overview uses one combined marker with separate accessible actions for opening either survey. Area 002 retains its independent marker. The rail and Table view always keep all three survey identities separate.

Areas 001 and 003 use independent editable `google.maps.Rectangle` instances. Area 002 uses an editable `google.maps.Polygon` based on its source-camera footprint. Editing is explicit. Save validates and atomically persists the candidate, Cancel restores the effective boundary, and Reset restores the deterministic default only when it contains every saved marker. Rectangle and polygon validation rejects non-finite coordinates, zero area, coordinates outside the supported extent, self-intersecting polygons, and boundaries that exclude fixed or saved trees.

Map coordinates and geofences are operational display positions and boundaries. They are not surveyed palm-base coordinates, ownership evidence, acreage measurements, cadastral records, or legal property boundaries.

## Decision: role-gated survey and workflow editing

The System Administrator is the only role allowed to edit geofences, add/remove/recolour markers, mutate shared cases or treatments, or change accounts. CEO / General Manager, Plantation Head, Area Manager, and Field Staff retain read-only access within the interface appropriate to their role. The selected role is a client-side workflow gate, not authentication or a production authorization boundary.

Direct action handlers enforce the same capability checks as visible controls. Hiding a button is not treated as authorization. Unknown or inactive Survey IDs, Tree IDs, cases, and treatments fail closed without exposing a different record.

## Decision: marker status, score, and atomic persistence

Optional markers support three canonical states:

| Marker | Display status | Deterministic modelled Ganoderma score |
| --- | --- | ---: |
| Red | Infected | 66–95% |
| Yellow | Suspected | 35–65% |
| Green | Healthy | 10–34% |

Marker placement accepts only finite, unique coordinates inside the effective survey geofence and within remaining 8×8 capacity. Fixed source markers cannot be moved, removed, or recoloured. Optional-marker editing uses a detached draft: click empty space to add, click an optional marker to remove, Undo restores the complete marker, Cancel discards the draft, and Save validates and replaces the complete optional set atomically.

The selected status drives the marker icon and label, grid colour and label, Tree Detail status, deterministic score band, reports, and portfolio totals. Status is user-designated and the percentage is a deterministic modelled workflow value; neither represents a field- or laboratory-confirmed diagnosis.

## Decision: evidence and Tree Detail

Source-backed records retain their allowed repository-owned image association. Added Infected and Suspected trees use the nearest allowlisted image for their survey and display a clear nearby-context disclosure. Healthy trees show no image section. Area 003 reuses eligible Area 001 imagery for flagged saved markers and owns no duplicate source images.

Tree Detail displays the selected marker's exact stored latitude and longitude, status, modelled score, source/provenance fields, interpretation, and applicable evidence. It does not render a per-tree map or invent a historical trend from a single score.

Source coordinates are camera exposure positions. External source directories and workbooks are read-only derivation inputs; the browser performs no runtime reads from them. Only optimized, repository-owned evidence assets are served.

## Decision: browser-local state and recovered-default migration

Survey editing uses browser-local schema version 3 under `mapped-poc-gui.state.v3`, with separate geofence and marker branches for Areas 001, 002, and 003. Its deterministic seed is the exact recovered 64/57/50 spatial state stored in [`data/initial-mapping-state.js`](../data/initial-mapping-state.js).

The one-time version-2 migration applies the recovered seed when the older installation still matches its untouched default. Valid deliberate geofence or marker edits remain authoritative instead of being overwritten. Accounts, alert reads, cases, treatments, administration data, report history, and preferences are preserved independently. Invalid or unavailable storage falls back to the deterministic state, and marker collections and geofence overrides remain isolated by Survey ID.

Operational Reset clears alert reads, workflow overrides, report history, administration changes, and preferences. It deliberately preserves saved geofences and marker collections because those are survey-definition state, not page-level workflow state.

Persistence is device- and browser-local. It has no backend transaction, multi-user synchronization, server authorization, concurrency control, central backup, or immutable audit trail.

## Decision: configuration and delivery

The browser Maps key is supplied through an ignored local configuration file during local development and through the repository secret used by [`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml) for hosted builds. Tracked files, documentation, snapshots, test output, and messages must never contain the key. The deployment workflow fails closed when its required secret is absent.

The application is static and introduces no server, database, authentication provider, upload feature, analytics service, or runtime source-drive dependency. These remain separate future product decisions.

## Verification record

The standalone current-data increment passed the independent gates on 2026-09-11:

- `npm test`: green.
- `npm run build`: green.
- `git diff --check`: green.
- [`tests/static-check.mjs`](../tests/static-check.mjs) covers the 64/35/0 default, maximum capacity, version-2 state and legacy migration, role-gated mutations, current-data use by every route, stable Survey/Tree navigation, Google Satellite Overview and fallback surfaces, the combined Area 001/003 marker, status/score/image rules, report-history scoping, and Reset preservation of survey state.

## Current limitations

- Role selection is a demonstration control and provides no authenticated security boundary.
- Browser-local changes are not durable operational records and cannot safely coordinate multiple users or devices.
- Google imagery and map interaction require a valid browser key, enabled API, billing, permitted referrer, and network access; accessible non-map navigation remains available without them.
- Coordinates, geofences, marker-selected health states, and modelled Ganoderma scores are operational proof-of-concept data, not legal, ownership, diagnostic, or treatment evidence.
- Automatic tree detection, calibrated image-derived indices, automatic diagnosis, server persistence, audit retention, and authoritative surveyed boundaries are not implemented.
