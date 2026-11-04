import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Signature from '../pages/Signature';
import '../styles.css';
import '../pwa';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Signature />
  </StrictMode>,
);
