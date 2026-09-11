# Product

## Register

product

## Users

PalmWatch Mapped POC supports system administrators, executive leaders, plantation heads, area managers, and field staff reviewing three oil-palm survey areas. Users need a consistent path from the current portfolio to a survey map, 8×8 tree layout, and exact active Tree Detail without stale totals or mismatched identities.

The System Administrator may edit geofences, place or remove markers, select marker status, and manage shared workflows or accounts. Other roles review the current data. Role selection is a client-side workflow demonstration, not authentication.

## Product purpose

Provide a dependable proof-of-concept interface for:

- Reviewing live totals derived from Survey Areas 001, 002, and 003.
- Editing an operational survey geofence and placing colour-coded tree markers.
- Keeping map markers, tree selectors, 8×8 grids, Tree Details, alerts, cases, treatments, reports, administration, and settings synchronized by stable Survey and Tree IDs.
- Preserving useful non-map access when Google Maps is unavailable.
- Distinguishing source-backed evidence, nearby image context, user-selected status, and deterministic modelled risk.

Success means every displayed total reconciles with currently active trees, every marker and grid cell opens the same Tree ID, status remains consistent across surfaces, and survey editing cannot create invalid or out-of-bound records.

## Portfolio contract

Mapped POC contains exactly three workspaces:

- Survey Area 001 starts with 27 fixed Infected trees and supports up to 37 additions.
- Survey Area 002 starts with 35 fixed Infected trees and supports up to 29 additions.
- Survey Area 003 starts empty and supports up to 64 additions.

Fresh state has 62 active trees and maximum capacity is 192. Each survey always retains an 8×8 grid; unused cells remain inactive rather than becoming fabricated trees.

## Brand personality

Operational, approachable, precise, and evidence-aware. The interface uses a compact rose visual language and presents health information calmly without disguising uncertainty.

## Design principles

- Current data is the product: all pages derive from the same active survey/tree collection.
- Geography is an interface: map markers, rail items, table rows, selectors, grid cells, and Tree Details resolve the same stable identity.
- Editing is explicit and reversible: draft, validate, save atomically, cancel safely, and preserve prior valid state on failure.
- Status never relies on colour alone: Infected, Suspected, and Healthy labels accompany red, yellow, and green.
- Evidence keeps its provenance: exact source images and nearby contextual images are distinguished; Healthy trees show no image.
- Claims stay bounded: operational coordinates, display geofences, user status, and modelled scores are never presented as legal boundaries or confirmed diagnoses.
- Scope only narrows: hidden controls and direct handlers enforce the same role capability rules.

## Anti-references

Do not turn the product into a generic national dashboard, legal land-boundary tool, automatic diagnostic system, arbitrary marker canvas, or image-upload repository. Do not invent trees for empty grid cells, present nearby imagery as exact evidence, or describe client-side role selection as security.

## Accessibility and inclusion

Target WCAG 2.2 AA. Every map record has an accessible rail, table, selector, or grid equivalent. Focus is visible, controls have explicit names and states, status uses text and colour, errors identify a recovery path, and responsive layouts support desktop, tablet, and mobile use without horizontal overflow. Reduced-motion preferences are respected.
