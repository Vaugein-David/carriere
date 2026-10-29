import type { CSSProperties } from 'react';
import type { Hotspot, Route, Rule } from '../types';
import { ui, useT } from '../i18n';

export function RouteChips({
  routes,
  activeId,
  onChange,
}: {
  routes: Route[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  const t = useT();
  if (routes.length < 2) return null;
  return (
    <div className="chips" role="group" aria-label={t(ui.chooseRoute)}>
      {routes.map((r) => (
        <button
          key={r.id}
          type="button"
          className="chip"
          aria-pressed={r.id === activeId}
          onClick={() => onChange(r.id)}
          style={{ '--chip-color': r.color } as CSSProperties}
        >
          <span className="chip-dot" aria-hidden="true" />
          {t(r.label)}
        </button>
      ))}
    </div>
  );
}

export function RouteSteps({ route, current }: { route: Route | undefined; current: number }) {
  const t = useT();
  if (!route || route.steps.length === 0) return null;
  return (
    <section className="card" aria-labelledby="steps-title">
      <h2 id="steps-title">
        <span className="title-swatch" style={{ background: route.color }} aria-hidden="true" />
        {t(route.label)}
      </h2>
      <ol className="steps">
        {route.steps.map((s, i) => (
          <li
            key={`${route.id}-${i}`}
            className={`step${i === current ? ' is-current' : ''}${i < current ? ' is-past' : ''}`}
            aria-current={i === current ? 'step' : undefined}
          >
            <span className="step-num" aria-hidden="true">
              {i + 1}
            </span>
            <span className="step-text">{t(s)}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ZoneList({ hotspots, onSelect }: { hotspots: Hotspot[]; onSelect: (id: string) => void }) {
  const t = useT();
  if (hotspots.length === 0) return null;
  return (
    <section className="card" aria-labelledby="zones-title">
      <h2 id="zones-title">{t(ui.zones)}</h2>
      <ul className="zone-list">
        {hotspots.map((h) => (
          <li key={h.id}>
            <button type="button" className="zone-btn" onClick={() => onSelect(h.id)}>
              <span className="zone-dot" style={{ background: h.color }} aria-hidden="true" />
              {t(h.label)}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SafetyRules({ rules }: { rules: Rule[] }) {
  const t = useT();
  if (rules.length === 0) return null;
  return (
    <section className="card card--rules" aria-labelledby="rules-title">
      <h2 id="rules-title">{t(ui.rules)}</h2>
      <ul className="rules">
        {rules.map((r, i) => (
          <li key={i} className="rule">
            <strong className="rule-title">{t(r.title)}</strong>
            <span className="rule-text">{t(r.text)}</span>
            {r.provisoire && <span className="badge-provisoire">{t(ui.toConfirm)}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}
