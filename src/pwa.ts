import { registerSW } from 'virtual:pwa-register';

// Mode hors ligne. Après un déploiement, la nouvelle version remplace
// immédiatement l'ancienne copie en cache et la page se recharge.
registerSW({ immediate: true });
