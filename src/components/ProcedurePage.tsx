import type { ReactNode } from 'react';
import type { ProcedureData } from '../types';
import { IconAttention } from './Icons';

/** Mise en forme légère : **gras** et [[badge]] (étiquette verte de l'affiche) */
function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[\[badge\]\]/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    const i = m.index ?? 0;
    if (i > last) parts.push(text.slice(last, i));
    parts.push(
      m[1] !== undefined ? (
        <strong key={i}>{m[1]}</strong>
      ) : (
        <span key={i} className="badge-tag">
          ← badge
        </span>
      ),
    );
    last = i + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

/** Page simple : retranscription d'une affiche, étape par étape. */
export function ProcedurePage({ data, eyebrow }: { data: ProcedureData; eyebrow: string }) {
  return (
    <>
      <header className="page-header page-header--poster">
        <p className="eyebrow">{eyebrow}</p>
        <h1>
          <RichText text={data.title} />
        </h1>
        <p className="lead">{data.description}</p>
      </header>

      <main className="page-main procedure">
        <ol className="procedure-steps">
          {data.steps.map((step, i) => (
            <li key={i} className="procedure-step">
              <span className="procedure-num" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h2 className="procedure-step-title">Étape {i + 1}</h2>
                <p className="procedure-step-text">
                  <RichText text={step} />
                </p>
              </div>
            </li>
          ))}
        </ol>

        {data.notes.map((n) => (
          <section key={n.label} className={`procedure-note procedure-note--${n.tone}`} aria-label={n.label}>
            <h2>
              {n.attention && <IconAttention />}
              {n.label}
            </h2>
            <p>
              <RichText text={n.text} />
            </p>
          </section>
        ))}
      </main>
    </>
  );
}
