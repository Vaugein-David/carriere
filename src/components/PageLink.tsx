import { sig, signatureActive } from '../data/signature';
import { ui, useT } from '../i18n';
import { readSigned } from '../lib/signed';
import { IconChevron } from './Icons';

/** Pages vers lesquelles un texte peut renvoyer avec `[[nom]]` */
const PAGES = {
  'plan-2': { href: 'plan-2/', label: ui.hopperPage },
};

/** Bouton vers la signature sur les plans, ouverts directement par leurs QR codes : masqué une fois signé */
export function SignLink() {
  const t = useT();
  if (!signatureActive() || readSigned()) return null;
  return (
    <a className="page-link" href={`${import.meta.env.BASE_URL}signature/`}>
      <span>{t(sig.homeTitle)}</span>
      <IconChevron />
    </a>
  );
}

/** Texte dont chaque `[[plan-2]]` devient un bouton vers la page correspondante */
export function LinkedText({ text }: { text: string }) {
  const t = useT();
  const parts = text.split(/\s*\[\[(plan-2)\]\]\s*/);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 0) return part;
        const page = PAGES[part as keyof typeof PAGES];
        return (
          <a key={i} className="page-link" href={import.meta.env.BASE_URL + page.href}>
            <span>{t(page.label)}</span>
            <IconChevron />
          </a>
        );
      })}
    </>
  );
}
