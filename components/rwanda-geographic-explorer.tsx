"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ResilienceIntelligenceWorkflow,
  type ResilienceWorkflowLabels,
} from "@/components/resilience-intelligence-workflow";

type Position = [number, number, ...number[]];
type PolygonCoordinates = Position[][];
type MultiPolygonCoordinates = PolygonCoordinates[];

type RwandaGeometry =
  | { type: "Polygon"; coordinates: PolygonCoordinates }
  | { type: "MultiPolygon"; coordinates: MultiPolygonCoordinates };

type RwandaBoundaryFeature = {
  type: "Feature";
  properties: {
    shapeName: string;
    shapeISO: string;
    shapeID: string;
    shapeGroup: string;
    shapeType: string;
  };
  geometry: RwandaGeometry;
};

type RwandaBoundaryCollection = {
  type: "FeatureCollection";
  features: RwandaBoundaryFeature[];
};

type IndicatorDomain =
  | "financialInclusion"
  | "financialHealth"
  | "poverty"
  | "socialProtection";

type GeographicExplorerLabels = {
  loading: string;
  loadError: string;
  retry: string;
  search: string;
  searchPlaceholder: string;
  areaFilter: string;
  allAreas: string;
  domainFilter: string;
  domainFilterNote: string;
  allDomains: string;
  domains: Record<IndicatorDomain, string>;
  level: string;
  levelValue: string;
  mapDescription: string;
  zoomIn: string;
  zoomOut: string;
  reset: string;
  legend: string;
  selectedArea: string;
  otherAreas: string;
  areaDetails: string;
  selectArea: string;
  noMatches: string;
  boundarySource: string;
  boundaryYear: string;
  source: string;
  year: string;
  evidenceDomain: string;
  indicator: string;
  definition: string;
  limitation: string;
  limitationDetail: string;
  unavailable: string;
  noIndicators: string;
  noComparison: string;
  navigatorLink: string;
  boundaryOnly: string;
};

const domainMetadata: Record<
  IndicatorDomain,
  { source: string; year: string }
> = {
  financialInclusion: { source: "NISR FinScope 2024", year: "2024" },
  financialHealth: { source: "NISR FinScope 2024", year: "2024" },
  poverty: { source: "NISR EICV7 2023/24", year: "2023/24" },
  socialProtection: {
    source: "NISR EICV7 VUP thematic summary",
    year: "2023/24",
  },
};

const svgWidth = 800;
const svgHeight = 640;
const initialZoom = 1;

function isPosition(value: unknown): value is Position {
  return (
    Array.isArray(value) &&
    value.length >= 2 &&
    typeof value[0] === "number" &&
    Number.isFinite(value[0]) &&
    typeof value[1] === "number" &&
    Number.isFinite(value[1])
  );
}

function isRing(value: unknown): value is Position[] {
  return Array.isArray(value) && value.length >= 4 && value.every(isPosition);
}

function isPolygonCoordinates(value: unknown): value is PolygonCoordinates {
  return Array.isArray(value) && value.length > 0 && value.every(isRing);
}

function isGeometry(value: unknown): value is RwandaGeometry {
  if (
    !value ||
    typeof value !== "object" ||
    !("type" in value) ||
    !("coordinates" in value)
  ) {
    return false;
  }

  const geometry = value as { type: unknown; coordinates: unknown };
  if (geometry.type === "Polygon") {
    return isPolygonCoordinates(geometry.coordinates);
  }
  if (geometry.type === "MultiPolygon") {
    return (
      Array.isArray(geometry.coordinates) &&
      geometry.coordinates.length > 0 &&
      geometry.coordinates.every(isPolygonCoordinates)
    );
  }
  return false;
}

function isBoundaryCollection(value: unknown): value is RwandaBoundaryCollection {
  if (
    !value ||
    typeof value !== "object" ||
    !("type" in value) ||
    !("features" in value)
  ) {
    return false;
  }

  const collection = value as { type: unknown; features: unknown };
  if (
    collection.type !== "FeatureCollection" ||
    !Array.isArray(collection.features) ||
    collection.features.length === 0
  ) {
    return false;
  }

  return collection.features.every((feature: unknown) => {
    if (
      !feature ||
      typeof feature !== "object" ||
      !("properties" in feature) ||
      !("geometry" in feature)
    ) {
      return false;
    }

    const candidate = feature as {
      type?: unknown;
      properties: Record<string, unknown>;
      geometry: unknown;
    };

    return (
      candidate.type === "Feature" &&
      typeof candidate.properties.shapeName === "string" &&
      typeof candidate.properties.shapeISO === "string" &&
      typeof candidate.properties.shapeID === "string" &&
      isGeometry(candidate.geometry)
    );
  });
}

function geometryPolygons(geometry: RwandaGeometry): PolygonCoordinates[] {
  return geometry.type === "Polygon"
    ? [geometry.coordinates]
    : geometry.coordinates;
}

function coordinatesForFeature(feature: RwandaBoundaryFeature) {
  return geometryPolygons(feature.geometry).flatMap((polygon) => polygon.flat());
}

function createMapPaths(features: RwandaBoundaryFeature[]) {
  const latitudeScale = Math.cos((2 * Math.PI) / 180);
  const project = ([longitude, latitude]: Position): [number, number] => [
    longitude * latitudeScale,
    -latitude,
  ];
  const points = features.flatMap(coordinatesForFeature).map(project);

  if (points.length === 0) {
    return [];
  }

  const minX = Math.min(...points.map(([x]) => x));
  const maxX = Math.max(...points.map(([x]) => x));
  const minY = Math.min(...points.map(([, y]) => y));
  const maxY = Math.max(...points.map(([, y]) => y));
  const padding = 34;
  const scale = Math.min(
    (svgWidth - padding * 2) / (maxX - minX),
    (svgHeight - padding * 2) / (maxY - minY),
  );
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const toSvg = ([x, y]: Position) => {
    const projected = project([x, y]);
    return [
      (projected[0] - centerX) * scale + svgWidth / 2,
      (projected[1] - centerY) * scale + svgHeight / 2,
    ] as const;
  };

  return features.map((feature) => {
    const path = geometryPolygons(feature.geometry)
      .flatMap((polygon) =>
        polygon.map((ring) => {
          const points = ring.map(toSvg);
          return `${points
            .map(
              ([x, y], index) =>
                `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`,
            )
            .join(" ")} Z`;
        }),
      )
      .join(" ");

    return { feature, path };
  });
}

function displayAreaName(name: string) {
  return name === "City of Kigali" ? "Kigali City" : name;
}

export function RwandaGeographicExplorer({
  labels,
  intelligenceLabels,
  initialProvince,
}: {
  labels: GeographicExplorerLabels;
  intelligenceLabels: ResilienceWorkflowLabels;
  initialProvince?: string;
}) {
  const [features, setFeatures] = useState<RwandaBoundaryFeature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [areaFilter, setAreaFilter] = useState("all");
  const [domainFilter, setDomainFilter] = useState<IndicatorDomain | "all">("all");
  const [search, setSearch] = useState("");
  const [zoom, setZoom] = useState(initialZoom);

  useEffect(() => {
    const controller = new AbortController();

    async function loadBoundaries() {
      setIsLoading(true);
      setLoadError(null);
      try {
        const response = await fetch("/geography/rwanda-admin1.geojson", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Boundary request failed (${response.status}).`);
        }

        const data: unknown = await response.json();
        if (!isBoundaryCollection(data)) {
          throw new Error("The boundary file did not contain valid Rwanda area features.");
        }
        setFeatures(data.features);
        const initialFeature = data.features.find(
          (feature) =>
            displayAreaName(feature.properties.shapeName) === initialProvince,
        );
        if (initialFeature) {
          setSelectedId(initialFeature.properties.shapeID);
          setAreaFilter(initialFeature.properties.shapeID);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadError(
            error instanceof Error ? error.message : "An unexpected boundary loading error occurred.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadBoundaries();
    return () => controller.abort();
  }, [initialProvince, retryCount]);

  const paths = useMemo(() => createMapPaths(features), [features]);
  const selectedFeature = features.find(
    (feature) => feature.properties.shapeID === selectedId,
  );
  const normalizedSearch = search.trim().toLocaleLowerCase();
  const matchingFeatures = features.filter((feature) => {
    const matchesArea =
      areaFilter === "all" || feature.properties.shapeID === areaFilter;
    const matchesSearch =
      normalizedSearch.length === 0 ||
      displayAreaName(feature.properties.shapeName)
        .toLocaleLowerCase()
        .includes(normalizedSearch);
    return matchesArea && matchesSearch;
  });
  const matchingIds = new Set(
    matchingFeatures.map((feature) => feature.properties.shapeID),
  );
  const hasActiveAreaFilter = areaFilter !== "all" || normalizedSearch.length > 0;

  function selectArea(feature: RwandaBoundaryFeature) {
    setSelectedId(feature.properties.shapeID);
    setAreaFilter(feature.properties.shapeID);
    setSearch("");
  }

  function resetView() {
    setSelectedId(null);
    setAreaFilter("all");
    setDomainFilter("all");
    setSearch("");
    setZoom(initialZoom);
  }

  const selectedDomain =
    domainFilter === "all" ? null : domainMetadata[domainFilter];
  const sources = selectedDomain?.source ??
    "FinScope 2024 and EICV7 2023/24; separate sources and populations.";

  return (
    <div className="rwanda-explorer">
      <div className="rwanda-explorer-controls">
        <label>
          <span>{labels.search}</span>
          <input
            type="search"
            value={search}
            placeholder={labels.searchPlaceholder}
            onChange={(event) => {
              setSearch(event.currentTarget.value);
              setAreaFilter("all");
              setSelectedId(null);
            }}
          />
        </label>
        <label>
          <span>{labels.areaFilter}</span>
          <select
            value={areaFilter}
            onChange={(event) => {
              const nextArea = event.currentTarget.value;
              setAreaFilter(nextArea);
              setSelectedId(nextArea === "all" ? null : nextArea);
              setSearch("");
            }}
          >
            <option value="all">{labels.allAreas}</option>
            {features.map((feature) => (
              <option
                key={feature.properties.shapeID}
                value={feature.properties.shapeID}
              >
                {displayAreaName(feature.properties.shapeName)}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>{labels.domainFilter}</span>
          <select
            value={domainFilter}
            onChange={(event) => {
              const value = event.currentTarget.value;
              setDomainFilter(
                value === "all" || value in domainMetadata
                  ? (value as IndicatorDomain | "all")
                  : "all",
              );
            }}
          >
            <option value="all">{labels.allDomains}</option>
            <option value="financialInclusion">{labels.domains.financialInclusion}</option>
            <option value="financialHealth">{labels.domains.financialHealth}</option>
            <option value="poverty">{labels.domains.poverty}</option>
            <option value="socialProtection">{labels.domains.socialProtection}</option>
          </select>
        </label>
        <p className="rwanda-level-note">
          <strong>{labels.level}:</strong> {labels.levelValue}
        </p>
      </div>

      <p className="rwanda-map-disclaimer">{labels.mapDescription}</p>
      <p className="rwanda-domain-note">{labels.domainFilterNote}</p>

      <div className="rwanda-explorer-layout">
        <section className="rwanda-map-panel" aria-label={labels.levelValue}>
          <div className="rwanda-map-toolbar">
            <span>{labels.legend}</span>
            <div className="rwanda-map-actions">
              <button
                type="button"
                onClick={() => setZoom((value) => Math.min(4, value + 0.4))}
                aria-label={labels.zoomIn}
                disabled={isLoading || Boolean(loadError) || zoom >= 4}
              >
                +
              </button>
              <button
                type="button"
                onClick={() => setZoom((value) => Math.max(1, value - 0.4))}
                aria-label={labels.zoomOut}
                disabled={isLoading || Boolean(loadError) || zoom <= 1}
              >
                −
              </button>
              <button
                type="button"
                onClick={resetView}
                disabled={isLoading || Boolean(loadError)}
              >
                {labels.reset}
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="rwanda-map-message" role="status" aria-live="polite">
              {labels.loading}
            </div>
          ) : loadError ? (
            <div className="rwanda-map-message rwanda-map-error" role="alert">
              <strong>{labels.loadError}</strong>
              <span>{loadError}</span>
              <button
                type="button"
                onClick={() => setRetryCount((count) => count + 1)}
              >
                {labels.retry}
              </button>
            </div>
          ) : (
            <>
              <svg
                className="rwanda-map"
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                role="group"
                aria-label={labels.mapDescription}
              >
                <g
                  transform={`translate(${svgWidth / 2} ${svgHeight / 2}) scale(${zoom}) translate(${-svgWidth / 2} ${-svgHeight / 2})`}
                >
                  {paths.map(({ feature, path }) => {
                    const id = feature.properties.shapeID;
                    const isSelected = selectedId === id;
                    const isDimmed =
                      !matchingIds.has(id) && hasActiveAreaFilter;
                    const name = displayAreaName(feature.properties.shapeName);

                    return (
                      <path
                        key={id}
                        d={path}
                        className={[
                          "rwanda-map-area",
                          isSelected ? "is-selected" : "",
                          isDimmed ? "is-filtered-out" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        role="button"
                        tabIndex={0}
                        aria-label={`${name}. ${labels.boundaryOnly}`}
                        aria-pressed={isSelected}
                        onClick={() => selectArea(feature)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            selectArea(feature);
                          }
                        }}
                      >
                        <title>{`${name} — ${labels.boundaryOnly}`}</title>
                      </path>
                    );
                  })}
                </g>
              </svg>
              <div className="rwanda-map-legend" aria-label={labels.legend}>
                <span>
                  <i className="legend-area-reference" aria-hidden="true" />
                  {labels.otherAreas}
                </span>
                <span>
                  <i className="legend-area-selected" aria-hidden="true" />
                  {labels.selectedArea}
                </span>
              </div>
              {search && matchingFeatures.length === 0 && (
                <p className="rwanda-no-matches" role="status">
                  {labels.noMatches}
                </p>
              )}
            </>
          )}
        </section>

        <aside className="rwanda-area-panel" aria-live="polite">
          <h3>{labels.areaDetails}</h3>
          {selectedFeature ? (
            <>
              <p className="rwanda-selected-area">
                {displayAreaName(selectedFeature.properties.shapeName)}
              </p>
              <dl className="rwanda-area-metadata">
                <div>
                  <dt>{labels.level}</dt>
                  <dd>{labels.levelValue}</dd>
                </div>
                <div>
                  <dt>{labels.boundarySource}</dt>
                  <dd>
                    <a
                      href="https://rwanda.africageoportal.com/datasets/dac12729b2cd4f0db92fddaa6a80460d_0"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Rwanda Geo Portal
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>{labels.boundaryYear}</dt>
                  <dd>2020</dd>
                </div>
                <div>
                  <dt>{labels.evidenceDomain}</dt>
                  <dd>
                    {domainFilter === "all"
                      ? labels.allDomains
                      : labels.domains[domainFilter]}
                  </dd>
                </div>
                <div>
                  <dt>{labels.indicator}</dt>
                  <dd>{labels.unavailable}</dd>
                </div>
                <div>
                  <dt>{labels.definition}</dt>
                  <dd>{labels.noIndicators}</dd>
                </div>
                <div>
                  <dt>{labels.source}</dt>
                  <dd>{sources}</dd>
                </div>
                <div>
                  <dt>{labels.year}</dt>
                  <dd>
                    {selectedDomain?.year ??
                      "2024 and 2023/24 (separate surveys)"}
                  </dd>
                </div>
                <div>
                  <dt>{labels.limitation}</dt>
                  <dd>{labels.limitationDetail}</dd>
                </div>
              </dl>
              <Link
                className="rwanda-navigator-link"
                href={`/pathways?province=${encodeURIComponent(displayAreaName(selectedFeature.properties.shapeName))}`}
              >
                {labels.navigatorLink}
              </Link>
            </>
          ) : (
            <p className="rwanda-select-prompt">{labels.selectArea}</p>
          )}
          <p className="rwanda-comparison-note">
            <strong>{labels.noComparison}</strong>
          </p>
        </aside>
      </div>

      {selectedFeature ? (
        <ResilienceIntelligenceWorkflow
          key={selectedFeature.properties.shapeID}
          province={displayAreaName(selectedFeature.properties.shapeName)}
          labels={intelligenceLabels}
        />
      ) : (
        <p className="intelligence-empty-state" role="status">
          Select a province to open its evidence profile, diagnostic questions,
          potential pathways, and action-plan form.
        </p>
      )}

      <div className="rwanda-boundary-attribution">
        <span>
          <strong>{labels.boundarySource}:</strong>{" "}
          <a
            href="https://www.geoboundaries.org/api/current/gbOpen/RWA/ADM1/"
            target="_blank"
            rel="noreferrer"
          >
            geoBoundaries Open Data
          </a>
          {" · CC BY 4.0"}
        </span>
        <span>{labels.boundaryYear}: 2020. {labels.boundaryOnly}</span>
      </div>
    </div>
  );
}
