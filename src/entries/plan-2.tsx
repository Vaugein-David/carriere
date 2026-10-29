import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Plan2 from '../pages/Plan2';
import '../styles.css';
import '../pwa';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Plan2 />
  </StrictMode>,
);
