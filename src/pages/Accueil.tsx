import { useEffect } from 'react';
import { IconChevron } from '../components/Icons';
import { LangProvider, LangSwitcher, ui, useT, type Txt } from '../i18n';

/** Page d'accueil (QR code unique) : renvoie vers les deux plans */
const PAGES: { href: string; num: string; title: Txt; text: Txt }[] = [
  {
    href: 'plan-1/',
    num: '1',
    title: { fr: 'Plan de circulation', en: 'Traffic plan', ro: 'Plan de circulație', pl: 'Plan ruchu', pt: 'Plano de circulação' },
    text: {
      fr: 'Itinéraire vers chaque produit, sens de circulation, zones et consignes de la cour.',
      en: 'Route to each product, direction of traffic, areas and yard rules.',
      ro: 'Traseul către fiecare produs, sensul de circulație, zonele și regulile din incintă.',
      pl: 'Trasa do każdego produktu, kierunek ruchu, strefy i zasady na placu.',
      pt: 'Percurso até cada produto, sentido de circulação, zonas e regras do pátio.',
    },
  },
  {
    href: 'plan-2/',
    num: '2',
    title: {
      fr: 'Poste de chargement (trémie)',
      en: 'Loading point (hopper)',
      ro: 'Punctul de încărcare (buncăr)',
      pl: 'Punkt załadunku (kosz zasypowy)',
      pt: 'Posto de carga (tremonha)',
    },
    text: {
      fr: 'Fonctionnement de la trémie en 6 étapes et numéro de la bascule.',
      en: 'How to use the hopper in 6 steps, and the weighbridge phone number.',
      ro: 'Funcționarea buncărului în 6 pași și numărul cântarului.',
      pl: 'Obsługa kosza w 6 krokach i numer telefonu na wagę.',
      pt: 'Funcionamento da tremonha em 6 passos e número da báscula.',
    },
  },
];

const TITLE: Txt = { fr: 'Plans de la carrière', en: 'Quarry maps', ro: 'Planurile carierei', pl: 'Plany kamieniołomu', pt: 'Planos da pedreira' };
const LEAD: Txt = {
  fr: 'Choisissez la page à afficher.',
  en: 'Choose the page to open.',
  ro: 'Alegeți pagina de afișat.',
  pl: 'Wybierz stronę do wyświetlenia.',
  pt: 'Escolha a página a abrir.',
};

function Accueil() {
  const t = useT();

  useEffect(() => {
    document.title = `${t(TITLE)} — ${t(ui.site)}`;
  }, [t]);

  return (
    <>
      <header className="page-header">
        <LangSwitcher />
        <p className="eyebrow">{t(ui.site)}</p>
        <h1>{t(TITLE)}</h1>
        <p className="lead">{t(LEAD)}</p>
      </header>

      <main className="page-main home">
        <ul className="home-links">
          {PAGES.map((p) => (
            <li key={p.href}>
              <a className="home-link" href={import.meta.env.BASE_URL + p.href}>
                <span className="home-num" aria-hidden="true">
                  {p.num}
                </span>
                <span className="home-text">
                  <strong>{t(p.title)}</strong>
                  <span>{t(p.text)}</span>
                </span>
                <IconChevron />
              </a>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default function AccueilPage() {
  return (
    <LangProvider>
      <Accueil />
    </LangProvider>
  );
}
