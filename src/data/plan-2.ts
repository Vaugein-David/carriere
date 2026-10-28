import type { ProcedureData } from '../types';

/**
 * PAGE 2 — Fonctionnement du poste de chargement.
 * Retranscription fidèle de l'affiche (sources/plan-2-affiche.webp).
 */
export const plan2: ProcedureData = {
  // Comme sur l'affiche : « Fonctionnement » en gras, « Poste de chargement » plus léger
  title: '**Fonctionnement** Poste de chargement',
  description: 'Chargement à la trémie en 6 étapes.',

  steps: [
    'Présenter le **badge** sur le **premier boîtier** qui se trouve **avant la trémie sur votre gauche**, sur le lecteur qui est désigné par une flèche verte avec écrit [[badge]].',
    'Une fois que le **feu passe au vert** et que **l’alarme retentit**, avancer **uniquement en marche avant sous la trémie**.',
    'Appuyez sur le **bouton vert** à votre gauche pour valider le chargement.',
    'Vérifier sur l’**afficheur** que c’est le **bon produit** qui est en cours de chargement.',
    'S’aider du **miroir** et/ou du **poids affiché** sur l’afficheur pour répartir le chargement dans la benne.',
    'Une fois le chargement terminé, l’afficheur indique : **« Chargement terminé. Bonne route. »**',
  ],

  notes: [
    {
      tone: 'info',
      label: 'Info',
      attention: true,
      text: 'L’attente pour la trémie se fait **le long du parking à engins**.',
    },
  ],
};
