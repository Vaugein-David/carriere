import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Accueil from '../pages/Accueil';
import '../styles.css';
import '../pwa';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Accueil />
  </StrictMode>,
);
