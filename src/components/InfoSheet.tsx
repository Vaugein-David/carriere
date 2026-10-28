import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import gsap from 'gsap';
import type { InfoItem } from '../types';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { IconClose } from './Icons';

interface Props {
  item: InfoItem | null;
  onClose: () => void;
}

/** Panneau d'information en bas d'écran (non modal : le plan reste utilisable). */
export function InfoSheet({ item, onClose }: Props) {
  const reducedMotion = useReducedMotion();
  const [shown, setShown] = useState<InfoItem | null>(item);
  const sheetRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const visible = useRef(false);
  const isOpen = shown !== null;

  if (item && item !== shown) setShown(item);

  // Entrée / sortie animées
  useLayoutEffect(() => {
    const el = sheetRef.current;
    if (!el) {
      visible.current = false;
      return;
    }
    gsap.killTweensOf(el);
    if (item) {
      if (!visible.current) gsap.set(el, { yPercent: 110 });
      visible.current = true;
      gsap.to(el, { yPercent: 0, duration: reducedMotion ? 0 : 0.35, ease: 'power3.out' });
    } else {
      gsap.to(el, {
        yPercent: 110,
        duration: reducedMotion ? 0 : 0.25,
        ease: 'power2.in',
        onComplete: () => {
          visible.current = false;
          setShown(null);
        },
      });
    }
  }, [item, isOpen, reducedMotion]);

  // Focus : sur le bouton fermer à l'ouverture, retour à l'élément d'origine à la fermeture
  useEffect(() => {
    if (!isOpen) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    return () => returnFocus.current?.focus({ preventScroll: true });
  }, [isOpen]);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [item, onClose]);

  if (!shown) return null;

  return (
    <aside
      ref={sheetRef}
      className="info-sheet"
      role="dialog"
      aria-modal="false"
      aria-labelledby="info-sheet-title"
      style={{ '--sheet-color': shown.color } as CSSProperties}
    >
      <div className="info-sheet__bar" aria-hidden="true" />
      <div className="info-sheet__head">
        <h2 id="info-sheet-title">{shown.title}</h2>
        <button ref={closeRef} type="button" className="icon-btn" onClick={onClose} aria-label="Fermer le panneau">
          <IconClose />
        </button>
      </div>
      {shown.provisoire && <p className="badge-provisoire">Information à confirmer</p>}
      {shown.description && <p className="info-sheet__desc">{shown.description}</p>}
      {shown.consigne && (
        <p className="info-sheet__consigne">
          <strong>Consigne :</strong> {shown.consigne}
        </p>
      )}
    </aside>
  );
}
