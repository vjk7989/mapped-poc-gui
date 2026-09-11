# Mapped POC Design System

## Overview

Mapped POC is a compact operational survey dashboard. Its light rose shell, white working surfaces, restrained pink interaction colour, and green/yellow/red health semantics should feel precise and calm rather than promotional.

## Colour and status

OKLCH tokens are defined in [`index.html`](index.html). Rose is reserved for identity, navigation, selection, and primary actions. Health state always combines colour with text:

- Red + **Infected**.
- Yellow + **Suspected**.
- Green + **Healthy**.
- Charcoal + inactive grid position.

Selected markers and focused controls require an additional visible treatment; colour alone is insufficient.

## Typography

Use the system sans-serif stack for interface copy and the system monospace stack for Tree IDs, compact labels, coordinates, capture metadata, and tabular figures. Headings remain compact. Long identifiers and source names must wrap without crossing their cards or viewport.

## Layout

Desktop uses a fixed left sidebar and a scrollable, shrinkable content column. Tablet may collapse navigation labels. Mobile uses a compact horizontal navigation rail and stacked content. Grid and flex children must allow shrinking so tables, metadata, and map controls do not cause page-level horizontal overflow.

Overview pairs a Google Satellite map with an equivalent survey rail or Table view. Survey Detail pairs its geofence map and controls with the 8×8 tree grid. Tree Detail prioritizes exact identity, status, coordinates, modelled score, provenance, and applicable evidence.

## Core components

- **Sidebar navigation:** one consistent item shape and a strong selected state. For this product the destinations are Overview, Survey Areas, Alerts, Reports, Cases & Treatments, Administration when authorized, and Settings.
- **Metric strip:** totals derive from the active three-survey collection and update after saved marker changes.
- **Google map surface:** Satellite imagery, current geofence, labelled markers, selected-marker treatment, explicit loading/failure state, and no reliance on the map as the only navigation path.
- **Survey rail and Table view:** accessible equivalents for Overview markers; Areas 001 and 003 remain separate even though their map position is combined.
- **Geofence editor:** clear Edit, Save, Cancel, and Reset controls with inspectable bounds or vertices and validation feedback.
- **Marker editor:** accessible Red/Infected, Yellow/Suspected, and Green/Healthy choices; explicit editing state; Undo, Cancel, and atomic Save.
- **Tree selector:** includes every active survey tree and opens the same Tree Detail as its marker or grid cell.
- **8×8 tree grid:** fills sequentially from active stable Tree IDs. Occupied cells show their sequence/status; unused cells are black, disabled, and expose no active Tree ID.
- **Operational tables:** responsive containers, useful empty states, concise columns, and exact current record navigation.

## Map failure and accessibility

Google Maps is an enhancement. If configuration, authorization, billing, timeout, or network loading fails, keep the survey rail, Table view, tree selector, grid, and operational pages usable. Failure copy should identify the problem category and a useful next action without exposing configuration secrets.

Map controls and equivalent record controls must be keyboard reachable, visibly focused, and named for their action. Marker status, validation errors, save results, and selection changes require text announcements.

## Evidence presentation

Show one exact repository-owned image for an eligible source-backed Infected or Suspected record. When an added flagged marker uses the nearest allowlisted survey image, label it as nearby context rather than exact-tree evidence. Healthy trees omit the complete image section.

Coordinates are camera exposure or user-placed operational display positions. Geofences are operational display boundaries. Ganoderma percentages are deterministic modelled workflow scores. Interface copy must not imply a surveyed palm base, ownership, legal property boundary, field-confirmed infection, laboratory diagnosis, or image-derived automated result.

## Responsive and motion rules

- Preserve the full 8×8 relationship while allowing cells and labels to scale down.
- Stack map, rail, detail, and action regions before they become cramped.
- Wrap coordinates, UUIDs, source missions, and button groups.
- Keep minimum touch targets and visible focus at narrow widths.
- Avoid decorative animation. Respect `prefers-reduced-motion` for transitions and scrolling.

Runtime component behavior and exact invariants live in [`index.html`](index.html) and [`tests/static-check.mjs`](tests/static-check.mjs); this file defines visual and interaction intent without duplicating implementation.
