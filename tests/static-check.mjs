import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const html = read("index.html");
const mappedSource = read("data/mapped-poc-data.js");
const surveyTwoSource = read("data/survey-002-farm-data.js");
const mappingSeedSource = read("data/initial-mapping-state.js");
const mapsLocalExampleSource = read("config/maps.local.example.js");
const workflowSource = read(".github/workflows/deploy-pages.yml");
const gitignore = read(".gitignore");

const mapped = Function(`${mappedSource}\nreturn MAPPED_POC_DATA;`)();
const surveyTwo = Function(`${surveyTwoSource}\nreturn SURVEY_TWO_FARM_DATA;`)();

function balancedBlock(source, declarationPattern) {
  const match = declarationPattern.exec(source);
  assert.ok(match, `Missing inspectable declaration: ${declarationPattern}`);
  const open = source.indexOf("{", match.index);
  assert.ok(open >= 0, "Inspectable declaration must have a block");
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let index = open; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === quote) quote = null;
      continue;
    }
    if (character === '"' || character === "'" || character === "`") {
      quote = character;
      continue;
    }
    if (character === "{") depth += 1;
    if (character === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(open, index + 1);
    }
  }
  assert.fail("Inspectable declaration has an unterminated block");
}

function functionBody(name) {
  const block = balancedBlock(html, new RegExp(`function\\s+${name}\\s*\\(`));
  return block.slice(1, -1);
}

function objectConstant(name) {
  return Function(`return (${balancedBlock(html, new RegExp(`const\\s+${name}\\s*=`))});`)();
}

function evaluateWindowScript(source) {
  const window = {};
  Function("window", source)(window);
  return window;
}

function assertAdminGuard(name) {
  const body = functionBody(name);
  assert.match(body, /adminEditAllowed\s*\(\s*\)/, `${name} must fail closed through the shared administrator guard`);
  const guard = body.indexOf("adminEditAllowed");
  const mutation = body.search(/demoState\.|saveDemoState\s*\(|syncArea|localStorage\./);
  if (mutation >= 0) assert.ok(guard < mutation, `${name} must authorize before changing browser state`);
}

// Standalone shell and startup.
assert.match(html, /<title>Mapped POC \| PalmWatch<\/title>/, "The standalone document must identify Mapped POC directly");
assert.match(html, /let\s+state\s*=\s*\{[^}]*companyId\s*:\s*["']mappedpoc["'][^}]*role\s*:\s*["']ceo["']/s, "Mapped POC must start directly with CEO / General Manager selected");
assert.deepEqual(Object.keys(objectConstant("COMPANY_PROFILE")).sort(), ["accent", "id", "logo", "name", "regionLabel", "shortName", "subtitle"].sort(), "The standalone profile must describe only Mapped POC");
assert.match(html, /const\s+COMPANY_PORTFOLIOS\s*=\s*\{\s*mappedpoc\s*:/, "Exactly one Mapped POC portfolio must be configured");
assert.doesNotMatch(html, /company(?:Picker|Select)|selectCompany\s*\(|COMPANY_PROFILES\b/i, "The standalone UI must not retain company switching code");
assert.doesNotMatch(html, /Godrej Agrovet|Navabharat|NBL|TGOILFED|TG Oilfed/i, "The standalone runtime must not contain another company's identity");
assert.doesNotMatch(html, /leaflet|openstreetmap|L\.map\s*\(|L\.tileLayer\s*\(/i, "The standalone application must not ship Leaflet or OpenStreetMap integration");
const logoNames = readdirSync(new URL("assets/company-logos/", root)).sort();
assert.deepEqual(logoNames, ["mapped-poc.svg"], "Unused company logos must be removed from the standalone repository");

// Authoritative three-survey dataset and fresh-state behavior.
const areaIds = mapped.areas.map((area) => area.id);
assert.deepEqual(areaIds, ["MPOC-SURVEY-001", "MPOC-SURVEY-002", "MPOC-SURVEY-003"], "Mapped POC must expose exactly Survey Areas 001–003 in order");
assert.deepEqual(mapped.areas.map((area) => area.name), ["Survey Area 001", "Survey Area 002", "Survey Area 003"], "Survey display names must match their stable IDs");
assert.equal(surveyTwo.area.id, "MPOC-SURVEY-002", "The Survey 002 replacement snapshot must target only Area 002");

const areaOneAll = mapped.observations.filter((item) => item.areaId === "MPOC-SURVEY-001");
const areaOneFixed = areaOneAll.filter((item) => item.origin === "source-folder");
const areaOneCapacity = areaOneAll.filter((item) => item.origin === "layout-only");
const areaTwoFixed = surveyTwo.observations;
const areaThreeCapacity = mapped.observations.filter((item) => item.areaId === "MPOC-SURVEY-003");
assert.equal(areaOneFixed.length, 27, "Area 001 fresh state must contain 27 fixed trees");
assert.equal(areaTwoFixed.length, 35, "Area 002 fresh state must contain 35 fixed trees");
assert.equal(areaThreeCapacity.length, 64, "Area 003 must reserve one inactive record for every 8×8 position");
assert.equal(areaOneCapacity.length, 37, "Area 001 must reserve exactly 37 optional marker records");
assert.ok(areaOneFixed.every((item) => item.displayStatus === "Infected" && item.severity === "Severe" && item.ganodermaRiskScore > 65), "Every fixed Area 001 tree must remain infected");
assert.ok(areaTwoFixed.every((item) => item.areaId === "MPOC-SURVEY-002" && item.origin === "source-folder" && item.displayStatus === "Infected" && item.severity === "Severe" && item.ganodermaRiskScore > 65), "Every fixed Area 002 tree must remain infected");
assert.ok([...areaOneFixed, ...areaTwoFixed].every((item) => Number.isFinite(item.latitude) && Number.isFinite(item.longitude)), "Every fresh tree must have a finite source coordinate");
assert.ok(areaThreeCapacity.every((item) => item.origin === "layout-only" && item.displayStatus === null && item.latitude === null && item.longitude === null && item.ganodermaRiskScore === null), "Area 003 capacity records must remain inactive until a marker is saved");
assert.deepEqual(areaOneCapacity.map((item) => item.treeId), Array.from({ length: 37 }, (_, index) => `TREE-${String(index + 113).padStart(4, "0")}`), "Area 001 optional IDs must be deterministic");
assert.deepEqual(areaThreeCapacity.map((item) => item.treeId), Array.from({ length: 64 }, (_, index) => `TREE-${String(index + 201).padStart(4, "0")}`), "Area 003 optional IDs must be deterministic");
const freshTrees = [...areaOneFixed, ...areaTwoFixed];
assert.equal(freshTrees.length, 62, "Repository-backed source state must contain exactly 62 fixed trees");
assert.equal(freshTrees.filter((item) => item.displayStatus === "Infected").length, 62, "All 62 fixed trees must be infected");
assert.equal(new Set(freshTrees.map((item) => item.treeId)).size, freshTrees.length, "Fresh tree IDs must be globally unique");
assert.doesNotMatch(`${html}\n${mappedSource}\n${surveyTwoSource}`, /MPOC-SURVEY-00[45]|Survey Area 00[45]/, "Retired Surveys 004–005 must be absent from runtime data and UI");
assert.doesNotMatch(html, /FRM-AP-[A-Z]+-|localFarms|Add a new AP farm|New Farm Preview/, "Standalone routes must not retain unrelated AP farm records or the generic farm builder");

// Google Maps configuration, overview, survey editors, and graceful fallbacks.
for (const [name, source, expectedValue] of [
  ["maps.local.example.js", mapsLocalExampleSource, ""],
]) {
  const config = evaluateWindowScript(source).PALMWATCH_CONFIG;
  assert.deepEqual(Object.keys(config), ["hyper_maps_key"], `${name} must expose exactly hyper_maps_key`);
  assert.equal(config.hyper_maps_key, expectedValue, `${name} must retain its deterministic placeholder value`);
  assert.ok(Object.isFrozen(config), `${name} must freeze the public configuration object`);
}
assert.match(gitignore, /(?:^|\n)config\/maps\.local\.js(?:\r?\n|$)/, "The credential-bearing local configuration must remain ignored");
assert.match(html, /window\.PALMWATCH_CONFIG\?\.hyper_maps_key/, "Google Maps must read only hyper_maps_key");
assert.doesNotMatch(`${html}\n${mapsLocalExampleSource}\n${workflowSource}`, /googleMapsApiKey|AIza[0-9A-Za-z_-]{20,}/, "Tracked configuration and runtime code must not contain an old property or credential-like Google key");
assert.match(workflowSource, /HYPER_MAPS_KEY\s*:\s*\$\{\{\s*secrets\.HYPER_MAPS_KEY\s*\}\}/, "Pages must source the hosted map key from the matching secret");
assert.match(workflowSource, /_site\/config\/maps\.local\.js/, "Pages must create the runtime configuration only inside _site");
assert.match(workflowSource, /printf[^]*hyper_maps_key[^]*>\s*_site\/config\/maps\.local\.js/, "Pages must write exactly the approved property to the generated runtime configuration");
assert.doesNotMatch(`${html}\n${mappedSource}\n${surveyTwoSource}\n${mappingSeedSource}`, /(?:C:|G:|D:\\hio01|D:\\frm02)[\\/]/i, "Standalone browser sources must not depend on external source folders");

const loadGoogle = functionBody("loadGoogleMapsApi");
assert.match(loadGoogle, /hyper_maps_key/, "The shared loader must use the approved config property");
assert.match(loadGoogle, /maps\.googleapis\.com\/maps\/api\/js/, "The shared loader must request the official Maps JavaScript API");
assert.match(loadGoogle, /missing|rejected|billing|network|timeout/i, "The map loader must expose specific failure states");
const overviewMap = functionBody("initMappedPocOverviewGoogleMap");
for (const token of [/loadGoogleMapsApi/, /google\.maps\.Map/, /MapTypeId\.SATELLITE|mapTypeId\s*:\s*["']satellite["']/, /google\.maps\.Polygon/, /google\.maps\.Marker/, /google\.maps\.InfoWindow/, /fitBounds/, /Google Satellite map unavailable/, /survey list[^]*Table view/i]) {
  assert.match(overviewMap, token, "The overview must provide a Satellite map, survey geofences, selectable markers, and a usable fallback");
}
if (/activeCompany\(\)\.baseLat|activeCompany\(\)\.baseLon/.test(overviewMap)) {
  const profile = objectConstant("COMPANY_PROFILE");
  assert.ok(Number.isFinite(profile.baseLat) && Number.isFinite(profile.baseLon), "The Google overview center must never read undefined company coordinates");
}
for (const [name, shape] of [["initAreaOneGoogleMap", /google\.maps\.Rectangle/], ["initAreaTwoGoogleMap", /google\.maps\.Polygon/], ["initAreaThreeGoogleMap", /google\.maps\.Rectangle/]]) {
  const body = functionBody(name);
  assert.match(body, /loadGoogleMapsApi/, `${name} must use the shared Google loader`);
  assert.match(body, /google\.maps\.Map/, `${name} must initialize Google Maps`);
  assert.match(body, /mapTypeId\s*:\s*(?:google\.maps\.MapTypeId\.SATELLITE|["']satellite["'])/, `${name} must use Satellite imagery`);
  assert.match(body, shape, `${name} must render its approved geofence shape`);
  assert.match(body, /Google Satellite map unavailable[^]*grid remains available/is, `${name} must preserve the tree grid when Google Maps fails`);
}

// Browser mapping seed: exact schema, deterministic Area 001 defaults, and area isolation.
const mapping = evaluateWindowScript(mappingSeedSource).MAPPED_POC_INITIAL_MAPPING;
assert.deepEqual(Object.keys(mapping), ["version", "geofenceOverrides", "areaOneTreePositions", "areaTwoTreePositions", "areaThreeTreePositions"], "The initial mapping seed must have the exact standalone schema");
assert.equal(mapping.version, 2, "The standalone mapping seed version must match browser state v2");
assert.deepEqual(Object.keys(mapping.geofenceOverrides), ["MPOC-SURVEY-001"], "Area 001 must start with an explicitly saved geofence so all recovered markers are visible");
assert.deepEqual(mapping.geofenceOverrides["MPOC-SURVEY-001"], { south: 16.912209794, west: 81.169804433, north: 16.912805551, east: 81.169912437 }, "Area 001 must use the approved operational rectangle");
const seededAreaOneEntries = Object.entries(mapping.areaOneTreePositions);
assert.equal(seededAreaOneEntries.length, 37, "Area 001 must start with 37 seeded added markers");
assert.deepEqual(seededAreaOneEntries.map(([treeId]) => treeId), Array.from({ length: 37 }, (_, index) => `TREE-${String(index + 113).padStart(4, "0")}`), "Seeded Area 001 marker IDs must remain stable");
assert.ok(seededAreaOneEntries.every(([, point]) => point.displayStatus === "Infected" && Number.isFinite(point.latitude) && Number.isFinite(point.longitude)), "Seeded Area 001 markers must all be infected and positioned");
assert.ok(seededAreaOneEntries.every(([, point]) => point.latitude >= mapping.geofenceOverrides["MPOC-SURVEY-001"].south && point.latitude <= mapping.geofenceOverrides["MPOC-SURVEY-001"].north && point.longitude >= mapping.geofenceOverrides["MPOC-SURVEY-001"].west && point.longitude <= mapping.geofenceOverrides["MPOC-SURVEY-001"].east), "Seeded Area 001 markers must be inside the saved geofence");
assert.equal(new Set(seededAreaOneEntries.map(([, point]) => `${point.latitude}:${point.longitude}`)).size, 37, "Seeded Area 001 marker coordinates must be unique");
assert.equal(areaOneFixed.length + seededAreaOneEntries.length, 64, "Area 001 must initialize to a full 64-tree grid");
assert.deepEqual(mapping.areaTwoTreePositions, {}, "Area 002 must not start with added markers");
assert.deepEqual(mapping.areaThreeTreePositions, {}, "Area 003 must remain empty until markers are saved");
assert.equal(freshTrees.length + seededAreaOneEntries.length, 99, "Fresh standalone browser state must initialize with 99 active trees");
assert.equal(freshTrees.filter((item) => item.displayStatus === "Infected").length + seededAreaOneEntries.length, 99, "All 99 initial active trees must be infected");
assert.deepEqual({
  "MPOC-SURVEY-001": areaOneFixed.length + seededAreaOneEntries.length,
  "MPOC-SURVEY-002": areaTwoFixed.length + Object.keys(mapping.areaTwoTreePositions).length,
  "MPOC-SURVEY-003": Object.keys(mapping.areaThreeTreePositions).length,
}, {
  "MPOC-SURVEY-001": 64,
  "MPOC-SURVEY-002": 35,
  "MPOC-SURVEY-003": 0,
}, "The standalone seed must resolve to the approved 64/35/0 survey distribution");
for (const key of ["geofenceOverrides", "areaOneTreePositions", "areaTwoTreePositions", "areaThreeTreePositions"]) {
  assert.ok(Object.isFrozen(mapping[key]), `${key} must be immutable seed data`);
}
assert.ok(Object.isFrozen(mapping), "The initial mapping seed must be immutable");
assert.match(html, /data\/initial-mapping-state\.js/, "The browser must load the repository-owned mapping seed");
const defaults = functionBody("defaultDemoState");
assert.match(defaults, /window\.MAPPED_POC_INITIAL_MAPPING/, "Fresh browser state must derive mapping fields from the standalone seed");
for (const key of ["geofenceOverrides", "areaOneTreePositions", "areaTwoTreePositions", "areaThreeTreePositions"]) assert.match(defaults, new RegExp(`${key}\\s*:\\s*structuredClone\\s*\\(\\s*mapping\\.${key}`), `Fresh state must clone ${key} without sharing seed objects`);
assert.match(html, /const\s+DEMO_STATE_VERSION\s*=\s*2\s*;/, "Browser state schema must match the mapping seed version");
assert.match(html, /const\s+ALERT_STATE_KEY\s*=\s*["']mapped-poc-gui\.state\.v2["']/, "Standalone state must use its own v2 storage key");
assert.match(html, /const\s+LEGACY_ALERT_STATE_KEY\s*=\s*["']mapped-poc-gui\.state\.v1["']/, "The v1 storage key must remain available for one-time migration");

const migration = functionBody("migrateDemoState");
assert.match(migration, /Number\s*\(\s*saved\.version\s*\)\s*<\s*DEMO_STATE_VERSION|saved\.version\s*!==\s*DEMO_STATE_VERSION/, "Migration must distinguish older installations from current state");
assert.match(migration, /deliberateSpatial|hasDeliberateSpatial/i, "Migration must explicitly distinguish untouched legacy mapping from deliberate spatial edits");
assert.match(migration, /fallback\.(?:geofenceOverrides|areaOneTreePositions)|defaultDemoState\s*\(/, "Untouched legacy mapping must fall back to the repository-owned 99-tree seed");
for (const key of ["accounts", "cases", "caseActions", "treatments", "administration", "reportHistory", "preferences"]) {
  assert.match(migration, new RegExp(`saved\\.${key}`), `Migration must preserve valid non-spatial ${key} state`);
}
for (const key of ["geofenceOverrides", "areaOneTreePositions", "areaTwoTreePositions", "areaThreeTreePositions"]) {
  assert.match(migration, new RegExp(`saved\\.${key}`), `Migration must inspect and preserve valid deliberate ${key} edits`);
}
const stateLoader = functionBody("loadDemoState");
assert.match(stateLoader, /localStorage\.getItem\s*\(\s*ALERT_STATE_KEY\s*\)/, "State loading must prefer the current v2 namespace");
assert.match(stateLoader, /localStorage\.getItem\s*\(\s*LEGACY_ALERT_STATE_KEY\s*\)/, "State loading must fall back to the legacy v1 namespace");
assert.match(stateLoader, /localStorage\.setItem\s*\(\s*ALERT_STATE_KEY|saveDemoState\s*\(/, "A migrated legacy state must be persisted into the v2 namespace");
for (const [name, areaId, positionsKey] of [
  ["saveAreaOneTreePositions", "AREA_ONE_ID", "areaOneTreePositions"],
  ["saveAreaTwoTreePositions", "AREA_TWO_ID", "areaTwoTreePositions"],
  ["saveAreaThreeTreePositions", "AREA_THREE_ID", "areaThreeTreePositions"],
]) {
  const body = functionBody(name);
  assert.match(body, new RegExp(positionsKey), `${name} must write only its own position collection`);
  for (const other of ["areaOneTreePositions", "areaTwoTreePositions", "areaThreeTreePositions"].filter((key) => key !== positionsKey)) assert.doesNotMatch(body, new RegExp(`demoState\\.${other}\\s*=`), `${name} must not mutate ${other}`);
  const geofenceGetter = areaId === "AREA_TWO_ID" ? "getAreaTwoGeofencePolygon" : areaId === "AREA_ONE_ID" ? "getAreaOneGeofenceBounds" : "getAreaThreeGeofenceBounds";
  assert.match(body, new RegExp(geofenceGetter), `${name} must validate against its own saved boundary`);
}

// Marker, grid, and Tree Details must resolve through the same stable Tree ID.
const cells = functionBody("cellsFor");
assert.match(cells, /id\s*:\s*observation\.treeId/, "Grid cells must use the observation Tree ID as their identity");
assert.match(cells, /observation\.displayStatus/, "Grid colour must derive from the same observation status shown elsewhere");
const mappedFarm = functionBody("renderMappedPocFarm");
assert.match(mappedFarm, /data-tree\s*=\s*["']\$\{cell\.id\}/, "Occupied grid cells must expose their stable Tree ID");
assert.match(mappedFarm, /state\.treeId\s*=\s*button\.dataset\.tree/, "Clicking a grid tree must open that exact Tree ID");
for (const mapFunction of ["initAreaOneGoogleMap", "initAreaTwoGoogleMap", "initAreaThreeGoogleMap"]) {
  const body = functionBody(mapFunction);
  assert.match(body, /marker\.treeId\s*=\s*observation\.treeId/, `${mapFunction} markers must retain the observation Tree ID`);
  assert.match(body, /state\.treeId\s*=\s*observation\.treeId/, `${mapFunction} marker clicks must open the matching Tree ID`);
}
assert.match(functionBody("renderTree"), /item\.id\s*===\s*state\.treeId/, "Tree Details must resolve the same Tree ID used by map and grid navigation");
const treeDetails = functionBody("renderMappedPocTree");
assert.match(treeDetails, /observation\.latitude\.toFixed\s*\(/, "Tree Details must display the selected marker's latitude");
assert.match(treeDetails, /observation\.longitude\.toFixed\s*\(/, "Tree Details must display the selected marker's longitude");

// RBAC: mutators fail closed; non-mutating and personal actions remain usable.
for (const name of [
  "saveAreaOneGeofence", "resetAreaOneGeofence", "saveAreaOneTreePositions",
  "saveAreaTwoGeofence", "resetAreaTwoGeofence", "saveAreaTwoTreePositions",
  "saveAreaThreeGeofence", "resetAreaThreeGeofence", "saveAreaThreeTreePositions",
  "submitCaseAssessment", "applyCaseAction", "progressTreatment", "resetDemoState",
  "updateManagedUserStatus", "updateManagedUserScope", "issuePasswordReset",
]) assertAdminGuard(name);

const farmPage = functionBody("renderMappedPocFarm");
assert.match(farmPage, /const\s+canEdit\s*=\s*state\.role\s*===\s*["']admin["']/, "Survey edit controls must be administrator-only");
for (const toolbar of ["geofenceToolbar", "markerPlacementToolbar", "areaThreeMarkerPlacementToolbar"]) assert.match(farmPage, new RegExp(`const\\s+${toolbar}\\s*=\\s*!canEdit\\s*\\?\\s*["']{2}`), `${toolbar} must be omitted for non-administrators`);
const administrationPage = functionBody("renderAdministration");
assert.match(administrationPage, /const[^;]*canEdit\s*=\s*state\.role\s*===\s*["']admin["']/, "Administration must compute an explicit administrator edit capability");
assert.match(administrationPage, /canEdit\s*\?[^]*data-user-(?:reset|status)/, "Account mutation controls must be omitted for non-administrators");
const settingsPage = functionBody("renderSettings");
assert.match(settingsPage, /state\.role\s*===\s*["']admin["']|adminEditAllowed/, "Workflow reset controls must be rendered only for System Administrator");
assert.match(functionBody("caseActionFor"), /CASE_ACTIONS_BY_ROLE\[state\.role\]/, "Case controls must derive from the current role's permissions");
assert.match(functionBody("canSubmitCaseAssessment"), /state\.role\s*===\s*["']admin["']|\[\s*["']admin["']\s*\]\.includes\s*\(state\.role\)/, "Field-assessment controls must be administrator-only");
assert.match(functionBody("renderTreatmentDetail"), /canProgress\s*=\s*state\.role\s*===\s*["']admin["']/, "Treatment mutation controls must be administrator-only");

for (const name of ["updatePreference", "markAlertRead", "markAllAlertsRead", "recordReportDownload"]) assert.doesNotMatch(functionBody(name), /adminEditAllowed/, `${name} must remain available to its authorized non-administrator users`);
const roles = objectConstant("roles");
for (const roleId of ["ceo", "head", "manager", "staff"]) {
  assert.ok(roles[roleId].nav.includes("Overview") && roles[roleId].nav.includes("Alerts") && roles[roleId].nav.includes("Settings"), `${roles[roleId].name} must retain navigation, alert reading, and personal preferences`);
}
assert.ok(roles.ceo.nav.includes("Reports") && roles.head.nav.includes("Reports") && roles.manager.nav.includes("Reports"), "Authorized non-administrator roles must retain report export navigation");
assert.ok(!roles.staff.nav.includes("Reports"), "Field Staff must not gain report export access");
assert.match(functionBody("downloadReportExcel"), /state\.role\s*===\s*["']staff["']/, "Report export must reject only the non-export Field Staff role");
assert.doesNotMatch(functionBody("downloadReportExcel"), /adminEditAllowed/, "Report export must not require administrator edit permission");
assert.match(functionBody("render"), /roles\[state\.role\]\.nav\.includes\s*\(\s*state\.page\s*\)/, "Route dispatch must fail closed against each role's navigation list");
assert.match(functionBody("renderNav"), /role\.nav\.map/, "Sidebar navigation must be rendered from the active role without company switching");

// Every sidebar page must consume the same current, role-scoped three-survey state.
for (const [name, pattern] of [
  ["renderOverview", /levelData\s*\(\)[^]*flatFarms\s*\(\s*scopedDistricts\s*\(\s*\)\s*\)/],
  ["renderNewFarm", /flatFarms\s*\(\s*scopedDistricts\s*\(\s*\)\s*\)[^]*Survey area management/],
  ["renderAlerts", /scopedAlerts\s*\(\s*\)/],
  ["renderReports", /flatFarms\s*\(\s*scopedDistricts\s*\(\s*\)\s*\)[^]*scopedReportRows/],
  ["renderCasesTreatments", /scopedCases\s*\(\s*\)[^]*scopedTreatments\s*\(\s*\)/],
  ["renderAdministration", /flatFarms\s*\(\s*scopedDistricts\s*\(\s*\)\s*\)[^]*active trees/],
  ["renderSettings", /flatFarms\s*\(\s*scopedDistricts\s*\(\s*\)\s*\)[^]*active trees/],
]) assert.match(functionBody(name), pattern, `${name} must derive its content from current scoped survey data`);
assert.match(functionBody("scopedAlerts"), /derivedAlertRecords[^]*observations[^]*displayStatus/, "Alerts must be derived from current active tree statuses");
assert.match(functionBody("scopedCases"), /derivedCaseRecords[^]*observations[^]*displayStatus/, "Cases must be derived from current active tree statuses");
assert.match(functionBody("scopedTreatments"), /derivedTreatmentRecords\s*\(\s*scopedCases\s*\(\s*\)\s*\)/, "Treatments must be derived from current cases");
assert.match(functionBody("scopedReportRows"), /flatFarms\s*\(\s*scopedDistricts\s*\(\s*\)\s*\)/, "Every report must use the same current scoped survey collection");
assert.match(functionBody("metricStrip"), /observations[^]*Infected[^]*Suspected[^]*Healthy/, "Sidebar and page metrics must reconcile statuses from current observations");

console.log("Standalone Mapped POC contract passed.");
