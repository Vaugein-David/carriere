import { useRef, useState, type CSSProperties } from 'react';
import type { Hotspot, Product, ProductGroup, Route, Rule } from '../types';
import { ui, useT } from '../i18n';
import { IconChevron } from './Icons';

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

export type Leg = 'aller' | 'retour';

/** Menu dépliant : choix d'un produit, puis du sens (aller ou retour) */
export function ProductPicker({
  groups,
  product,
  leg,
  onProduct,
  onLeg,
}: {
  groups: ProductGroup[];
  product: Product | null;
  leg: Leg;
  onProduct: (id: string) => void;
  onLeg: (leg: Leg) => void;
}) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  return (
    <section ref={rootRef} className={`product-picker${product ? ' is-active' : ''}`}>
      <button
        type="button"
        className="product-toggle"
        aria-expanded={open}
        aria-controls="product-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="product-toggle-text">
          <span className="product-toggle-label">{t(ui.productRoute)}</span>
          <span className="product-toggle-value">
            {product ? product.label : t(ui.chooseProduct)}
            {product?.hint && <small> · {t(product.hint)}</small>}
          </span>
        </span>
        <IconChevron />
      </button>

      <div id="product-menu" className="product-menu" hidden={!open}>
        {groups.map((g, i) => (
          <div key={i} className="product-group">
            <h3>{t(g.label)}</h3>
            <ul className="product-grid">
              {g.products.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    className="product-btn"
                    aria-pressed={p.id === product?.id}
                    onClick={() => {
                      onProduct(p.id);
                      setOpen(false);
                      // Le menu se referme : on remonte au choix aller / retour et au plan
                      requestAnimationFrame(() => rootRef.current?.scrollIntoView({ block: 'start' }));
                    }}
                  >
                    {p.label}
                    {p.hint && <small>{t(p.hint)}</small>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {product && !open && (
        <div className="leg-switch" role="group" aria-label={t(ui.legChoice)}>
          {(['aller', 'retour'] as const).map((l) => (
            <button
              key={l}
              type="button"
              className="chip"
              aria-pressed={leg === l}
              onClick={() => onLeg(l)}
              style={{ '--chip-color': product[l].color } as CSSProperties}
            >
              <span className="chip-dot" aria-hidden="true" />
              {t(ui[l])}
            </button>
          ))}
        </div>
      )}
    </section>
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
