import type { ReactNode } from 'react';

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const IconPlus = () => (
  <Icon>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

export const IconMinus = () => (
  <Icon>
    <path d="M5 12h14" />
  </Icon>
);

export const IconRecenter = () => (
  <Icon>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
    <circle cx="12" cy="12" r="2.5" />
  </Icon>
);

export const IconClose = () => (
  <Icon>
    <path d="M6 6l12 12M18 6L6 18" />
  </Icon>
);

/** Panneau attention (triangle jaune, contour et point d'exclamation noirs) */
export const IconAttention = () => (
  <svg className="icon icon-attention" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
    <path d="M12 2.5 L22.5 20.5 H1.5 Z" fill="#FFD400" stroke="#000" strokeWidth="2" strokeLinejoin="round" />
    <path d="M12 9 V14" stroke="#000" strokeWidth="2.6" strokeLinecap="round" />
    <circle cx="12" cy="17.3" r="1.4" fill="#000" />
  </svg>
);
