import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Plan1 from '../pages/Plan1';
import '../styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Plan1 />
  </StrictMode>,
);
