import { useCallback, useMemo, useRef, useState } from 'react';
import type { InfoItem, PlanData } from '../types';
import { PlanViewer, type PlanViewerHandle } from './PlanViewer';
import { InfoSheet } from './InfoSheet';
import { RouteChips, RouteSteps, SafetyRules, ZoneList } from './PageSections';

function toInfo(data: PlanData, id: string): InfoItem | null {
  const h = data.hotspots.find((x) => x.id === id);
  if (h) {
    return {
      id,
      title: h.label,
      description: h.description,
      consigne: h.consigne,
      color: h.color,
      provisoire: h.provisoire,
    };
  }
  const m = data.markers.find((x) => x.id === id);
  if (m) {
    return {
      id,
      title: m.label,
      description: m.description,
      color: m.type === 'assembly' ? '#D50000' : '#0057FF',
      provisoire: m.provisoire,
    };
  }
  return null;
}

/** Page complète : en-tête, plan interactif, étapes, zones et consignes. */
export function PlanPage({ data, eyebrow }: { data: PlanData; eyebrow: string }) {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const editMode = params.has('edit');
  const focusId = params.get('focus');

  const viewer = useRef<PlanViewerHandle>(null);
  const [routeId, setRouteId] = useState(data.defaultRoute);
  const [step, setStep] = useState(-1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const route = data.routes.find((r) => r.id === routeId);
  const info = useMemo(() => (selectedId ? toInfo(data, selectedId) : null), [data, selectedId]);

  const changeRoute = (id: string) => {
    setStep(-1);
    setRouteId(id);
  };

  // Lien profond ?focus=<id> : centre la vue sur une zone ou un marqueur
  const onReady = useCallback(() => {
    if (!focusId) return;
    if (!viewer.current?.flashMarker(focusId)) {
      viewer.current?.focusItem(focusId);
      if (toInfo(data, focusId)) setSelectedId(focusId);
    }
  }, [data, focusId]);

  const selectFromList = (id: string) => {
    viewer.current?.focusItem(id);
    setSelectedId(id);
  };

  const closeSheet = useCallback(() => setSelectedId(null), []);

  return (
    <>
      <header className="page-header">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{data.title}</h1>
        <p className="lead">{data.description}</p>
      </header>

      <main className="page-main">
        <RouteChips routes={data.routes} activeId={routeId} onChange={changeRoute} />

        <PlanViewer
          ref={viewer}
          data={data}
          activeRouteId={routeId}
          selectedId={selectedId}
          editMode={editMode}
          onSelect={setSelectedId}
          onStepChange={setStep}
          onReady={onReady}
        />
        {data.legend && (
          <ul className="legend" aria-label="Légende des couleurs">
            {data.legend.map((l) => (
              <li key={l.label}>
                <span className="legend-swatch" style={{ background: l.color }} aria-hidden="true" />
                {l.label}
              </li>
            ))}
          </ul>
        )}
        <p className="viewer-tip">Pincez ou touchez deux fois pour zoomer. Touchez une zone pour plus d'infos.</p>
        {data.imageCredit && <p className="image-credit">Vue aérienne : {data.imageCredit}</p>}

        <div className="sections">
          <div className="sections-col">
            <RouteSteps route={route} current={step} />
            <SafetyRules rules={data.rules} />
          </div>
          <div className="sections-col">
            <ZoneList hotspots={data.hotspots} onSelect={selectFromList} />
          </div>
        </div>
      </main>

      <InfoSheet item={info} onClose={closeSheet} />
    </>
  );
}
