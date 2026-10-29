import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export const LANGS = ['fr', 'en', 'ro', 'pl'] as const;
export type Lang = (typeof LANGS)[number];

/** Texte traduisible : chaîne simple (identique partout) ou une version par langue, le français étant obligatoire */
export type Txt = string | ({ fr: string } & Partial<Record<Exclude<Lang, 'fr'>, string>>);

const LANG_NAMES: Record<Lang, string> = { fr: 'Français', en: 'English', ro: 'Română', pl: 'Polski' };
const STORAGE_KEY = 'carriere-langue';

export function tr(txt: Txt, lang: Lang): string {
  return typeof txt === 'string' ? txt : (txt[lang] ?? txt.fr);
}

/** Langue choisie précédemment, sinon celle du téléphone, sinon le français */
function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (LANGS as readonly string[]).includes(saved)) return saved as Lang;
  } catch {
    /* stockage indisponible */
  }
  for (const l of navigator.languages ?? [navigator.language]) {
    const code = l.slice(0, 2).toLowerCase();
    if ((LANGS as readonly string[]).includes(code)) return code as Lang;
  }
  return 'fr';
}

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'fr', setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* le choix n'est simplement pas mémorisé */
    }
  }, []);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

/** Fonction de traduction liée à la langue courante */
export function useT() {
  const { lang } = useLang();
  return useCallback((txt: Txt) => tr(txt, lang), [lang]);
}

/** Sélecteur de langue (en-tête des pages) */
export function LangSwitcher() {
  const { lang, setLang } = useLang();
  const t = useT();
  return (
    <div className="lang-switch" role="group" aria-label={t(ui.language)}>
      {LANGS.map((l) => (
        <button key={l} type="button" lang={l} aria-pressed={l === lang} aria-label={LANG_NAMES[l]} onClick={() => setLang(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

/** Textes de l'interface */
export const ui = {
  site: { fr: 'Carrière', en: 'Quarry', ro: 'Carieră', pl: 'Kamieniołom' },
  language: { fr: 'Langue', en: 'Language', ro: 'Limba', pl: 'Język' },
  tip: {
    fr: 'Pincez ou touchez deux fois pour zoomer. Touchez une zone pour plus d’infos.',
    en: 'Pinch or double-tap to zoom. Tap an area for details.',
    ro: 'Ciupiți sau atingeți de două ori pentru zoom. Atingeți o zonă pentru detalii.',
    pl: 'Uszczypnij lub stuknij dwa razy, aby powiększyć. Dotknij strefy, aby zobaczyć szczegóły.',
  },
  aerial: { fr: 'Vue aérienne', en: 'Aerial view', ro: 'Imagine aeriană', pl: 'Zdjęcie lotnicze' },
  legend: { fr: 'Légende des couleurs', en: 'Colour key', ro: 'Legenda culorilor', pl: 'Legenda kolorów' },
  chooseRoute: { fr: 'Choisir un itinéraire', en: 'Choose a route', ro: 'Alegeți un traseu', pl: 'Wybierz trasę' },
  zones: { fr: 'Zones du plan', en: 'Map areas', ro: 'Zonele planului', pl: 'Strefy na planie' },
  rules: { fr: 'Consignes de sécurité', en: 'Safety rules', ro: 'Reguli de siguranță', pl: 'Zasady bezpieczeństwa' },
  toConfirm: { fr: 'À confirmer', en: 'To be confirmed', ro: 'De confirmat', pl: 'Do potwierdzenia' },
  infoToConfirm: {
    fr: 'Information à confirmer',
    en: 'Information to be confirmed',
    ro: 'Informație de confirmat',
    pl: 'Informacja do potwierdzenia',
  },
  instruction: { fr: 'Consigne :', en: 'Instruction:', ro: 'Instrucțiune:', pl: 'Zalecenie:' },
  close: { fr: 'Fermer le panneau', en: 'Close panel', ro: 'Închide panoul', pl: 'Zamknij panel' },
  showInfo: { fr: 'afficher les informations', en: 'show details', ro: 'afișează detaliile', pl: 'pokaż szczegóły' },
  loading: { fr: 'Chargement du plan…', en: 'Loading map…', ro: 'Se încarcă planul…', pl: 'Ładowanie planu…' },
  zoomIn: { fr: 'Zoomer', en: 'Zoom in', ro: 'Mărește', pl: 'Powiększ' },
  zoomOut: { fr: 'Dézoomer', en: 'Zoom out', ro: 'Micșorează', pl: 'Pomniejsz' },
  recenter: { fr: 'Recentrer le plan', en: 'Re-centre the map', ro: 'Recentrează planul', pl: 'Wyśrodkuj plan' },
  viewerHelp: {
    fr: 'Pincez ou utilisez les touches plus et moins pour zoomer, les flèches pour déplacer, 0 pour recentrer.',
    en: 'Pinch or use the plus and minus keys to zoom, the arrow keys to move, 0 to re-centre.',
    ro: 'Ciupiți sau folosiți tastele plus și minus pentru zoom, săgețile pentru deplasare, 0 pentru recentrare.',
    pl: 'Uszczypnij lub użyj klawiszy plus i minus, aby powiększyć, strzałek, aby przesunąć, 0, aby wyśrodkować.',
  },
  step: { fr: 'Étape', en: 'Step', ro: 'Pasul', pl: 'Krok' },
  call: { fr: 'Appeler', en: 'Call', ro: 'Sunați', pl: 'Zadzwoń' },
  productRoute: {
    fr: 'Itinéraire vers un produit',
    en: 'Route to a product',
    ro: 'Traseu către un produs',
    pl: 'Trasa do produktu',
  },
  chooseProduct: { fr: 'Choisir un produit', en: 'Choose a product', ro: 'Alegeți un produs', pl: 'Wybierz produkt' },
  aller: { fr: 'Aller', en: 'There', ro: 'Dus', pl: 'Dojazd' },
  retour: { fr: 'Retour', en: 'Back', ro: 'Întors', pl: 'Powrót' },
  legChoice: { fr: 'Sens du trajet', en: 'Direction', ro: 'Sensul traseului', pl: 'Kierunek' },
} satisfies Record<string, Txt>;
