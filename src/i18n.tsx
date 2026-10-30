import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export const LANGS = ['fr', 'en', 'ro', 'pl', 'pt'] as const;
export type Lang = (typeof LANGS)[number];

/** Texte traduisible : chaîne simple (identique partout) ou une version par langue, le français étant obligatoire */
export type Txt = string | ({ fr: string } & Partial<Record<Exclude<Lang, 'fr'>, string>>);

const LANG_NAMES: Record<Lang, string> = { fr: 'Français', en: 'English', ro: 'Română', pl: 'Polski', pt: 'Português' };
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
  site: { fr: 'Carrière', en: 'Quarry', ro: 'Carieră', pl: 'Kamieniołom', pt: 'Pedreira' },
  language: { fr: 'Langue', en: 'Language', ro: 'Limba', pl: 'Język', pt: 'Idioma' },
  tip: {
    fr: 'Pincez ou touchez deux fois pour zoomer. Touchez une zone pour plus d’infos.',
    en: 'Pinch or double-tap to zoom. Tap an area for details.',
    ro: 'Ciupiți sau atingeți de două ori pentru zoom. Atingeți o zonă pentru detalii.',
    pl: 'Uszczypnij lub stuknij dwa razy, aby powiększyć. Dotknij strefy, aby zobaczyć szczegóły.',
    pt: 'Afaste os dedos ou toque duas vezes para ampliar. Toque numa zona para ver os detalhes.',
  },
  aerial: { fr: 'Vue aérienne', en: 'Aerial view', ro: 'Imagine aeriană', pl: 'Zdjęcie lotnicze', pt: 'Vista aérea' },
  legend: { fr: 'Légende des couleurs', en: 'Colour key', ro: 'Legenda culorilor', pl: 'Legenda kolorów', pt: 'Legenda das cores' },
  chooseRoute: { fr: 'Choisir un itinéraire', en: 'Choose a route', ro: 'Alegeți un traseu', pl: 'Wybierz trasę', pt: 'Escolher um percurso' },
  zones: { fr: 'Zones du plan', en: 'Map areas', ro: 'Zonele planului', pl: 'Strefy na planie', pt: 'Zonas do plano' },
  rules: { fr: 'Consignes de sécurité', en: 'Safety rules', ro: 'Reguli de siguranță', pl: 'Zasady bezpieczeństwa', pt: 'Regras de segurança' },
  toConfirm: { fr: 'À confirmer', en: 'To be confirmed', ro: 'De confirmat', pl: 'Do potwierdzenia', pt: 'A confirmar' },
  infoToConfirm: {
    fr: 'Information à confirmer',
    en: 'Information to be confirmed',
    ro: 'Informație de confirmat',
    pl: 'Informacja do potwierdzenia',
    pt: 'Informação a confirmar',
  },
  instruction: { fr: 'Consigne :', en: 'Instruction:', ro: 'Instrucțiune:', pl: 'Zalecenie:', pt: 'Instrução:' },
  close: { fr: 'Fermer le panneau', en: 'Close panel', ro: 'Închide panoul', pl: 'Zamknij panel', pt: 'Fechar o painel' },
  showInfo: { fr: 'afficher les informations', en: 'show details', ro: 'afișează detaliile', pl: 'pokaż szczegóły', pt: 'ver os detalhes' },
  loading: { fr: 'Chargement du plan…', en: 'Loading map…', ro: 'Se încarcă planul…', pl: 'Ładowanie planu…', pt: 'A carregar o plano…' },
  zoomIn: { fr: 'Zoomer', en: 'Zoom in', ro: 'Mărește', pl: 'Powiększ', pt: 'Ampliar' },
  zoomOut: { fr: 'Dézoomer', en: 'Zoom out', ro: 'Micșorează', pl: 'Pomniejsz', pt: 'Reduzir' },
  recenter: { fr: 'Recentrer le plan', en: 'Re-centre the map', ro: 'Recentrează planul', pl: 'Wyśrodkuj plan', pt: 'Centrar o plano' },
  viewerHelp: {
    fr: 'Pincez ou utilisez les touches plus et moins pour zoomer, les flèches pour déplacer, 0 pour recentrer.',
    en: 'Pinch or use the plus and minus keys to zoom, the arrow keys to move, 0 to re-centre.',
    ro: 'Ciupiți sau folosiți tastele plus și minus pentru zoom, săgețile pentru deplasare, 0 pentru recentrare.',
    pl: 'Uszczypnij lub użyj klawiszy plus i minus, aby powiększyć, strzałek, aby przesunąć, 0, aby wyśrodkować.',
    pt: 'Afaste os dedos ou use as teclas mais e menos para ampliar, as setas para deslocar, 0 para centrar.',
  },
  step: { fr: 'Étape', en: 'Step', ro: 'Pasul', pl: 'Krok', pt: 'Passo' },
  call: { fr: 'Appeler', en: 'Call', ro: 'Sunați', pl: 'Zadzwoń', pt: 'Ligar' },
  productRoute: {
    fr: 'Itinéraire vers un produit',
    en: 'Route to a product',
    ro: 'Traseu către un produs',
    pl: 'Trasa do produktu',
    pt: 'Percurso até um produto',
  },
  chooseProduct: { fr: 'Choisir un produit', en: 'Choose a product', ro: 'Alegeți un produs', pl: 'Wybierz produkt', pt: 'Escolher um produto' },
  aller: { fr: 'Aller', en: 'There', ro: 'Dus', pl: 'Dojazd', pt: 'Ida' },
  retour: { fr: 'Retour', en: 'Back', ro: 'Întors', pl: 'Powrót', pt: 'Volta' },
  legChoice: { fr: 'Sens du trajet', en: 'Direction', ro: 'Sensul traseului', pl: 'Kierunek', pt: 'Sentido do trajeto' },
} satisfies Record<string, Txt>;
