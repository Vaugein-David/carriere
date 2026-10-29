import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { InfoItem, PlanData } from '../types';
import { PlanViewer, type PlanViewerHandle } from './PlanViewer';
import { InfoSheet } from './InfoSheet';
import { RouteChips, RouteSteps, SafetyRules, ZoneList } from './PageSections';
import { LangSwitcher, ui, useT, type Txt } from '../i18n';

function toInfo(data: PlanData, id: string, t: (x: Txt) => string): InfoItem | null {
  const h = data.hotspots.find((x) => x.id === id);
  if (h) {
    return {
      id,
      title: t(h.label),
      description: t(h.description),
      consigne: h.consigne && t(h.consigne),
      color: h.color,
      provisoire: h.provisoire,
    };
  }
  const m = data.markers.find((x) => x.id === id);
  if (m) {
    return {
      id,
      title: t(m.label),
      description: m.description && t(m.description),
      color: m.type === 'assembly' ? '#D50000' : '#0057FF',
      provisoire: m.provisoire,
    };
  }
  return null;
}

/** Page complète : en-tête, plan interactif, étapes, zones et consignes. */
export function PlanPage({ data }: { data: PlanData }) {
  const t = useT();
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const editMode = params.has('edit');
  const focusId = params.get('focus');

  const viewer = useRef<PlanViewerHandle>(null);
  const [routeId, setRouteId] = useState(data.defaultRoute);
  const [step, setStep] = useState(-1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const route = data.routes.find((r) => r.id === routeId);
  const info = useMemo(() => (selectedId ? toInfo(data, selectedId, t) : null), [data, selectedId, t]);

  useEffect(() => {
    document.title = `${t(data.title)} — ${t(ui.site)}`;
  }, [data.title, t]);

  const changeRoute = (id: string) => {
    setStep(-1);
    setRouteId(id);
  };

  // Lien profond ?focus=<id> : centre la vue sur une zone ou un marqueur
  const onReady = useCallback(() => {
    if (!focusId) return;
    if (!viewer.current?.flashMarker(focusId)) {
      viewer.current?.focusItem(focusId);
      if (data.hotspots.some((h) => h.id === focusId) || data.markers.some((m) => m.id === focusId)) {
        setSelectedId(focusId);
      }
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
        <LangSwitcher />
        <p className="eyebrow">{t(data.eyebrow)}</p>
        <h1>{t(data.title)}</h1>
        <p className="lead">{t(data.description)}</p>
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
          <ul className="legend" aria-label={t(ui.legend)}>
            {data.legend.map((l) => (
              <li key={l.color}>
                <span className="legend-swatch" style={{ background: l.color }} aria-hidden="true" />
                {t(l.label)}
              </li>
            ))}
          </ul>
        )}
        <p className="viewer-tip">{t(ui.tip)}</p>
        {data.imageCredit && (
          <p className="image-credit">
            {t(ui.aerial)} : {data.imageCredit}
          </p>
        )}

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
