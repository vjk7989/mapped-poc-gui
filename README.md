# Mapped POC GUI

A standalone static PalmWatch interface for the current Mapped POC survey portfolio.

## Included workflow

- Opens directly to Mapped POC Overview with **CEO / General Manager** selected.
- Keeps Survey Areas 001–003, their current records, 8×8 layouts, tree details, alerts, reports, cases, treatments, administration, and settings.
- Uses Google Satellite Maps for the overview and all survey maps.
- Allows only the **System Administrator** role to edit geofences, markers, shared workflows, or accounts. Role selection is a client-side workflow gate, not authentication.
- Stores subsequent survey edits in the current browser.

## Local maps configuration

Copy `config/maps.local.example.js` to the ignored `config/maps.local.js`, then set the `hyper_maps_key` value to a browser-restricted Google Maps JavaScript API key.

Serve the repository with a static web server and open its root URL. Direct `file:` loading can conflict with browser and API-key origin restrictions.

## Verification

```text
npm test
npm run build
git diff --check
```

## Deployment

The GitHub Pages workflow reads the repository secret `HYPER_MAPS_KEY` and writes a deployment-only `config/maps.local.js`. Restrict that browser key to the Maps JavaScript API and the deployed Pages origin.

Coordinates and geofences are operational display positions; they are not surveyed palm-base locations or legal property boundaries. Ganoderma values are deterministic modelled workflow scores, not field or laboratory diagnoses.
