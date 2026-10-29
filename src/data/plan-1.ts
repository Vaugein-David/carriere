import image from '../assets/plan-1.webp';
import type { PlanData } from '../types';
import { plan1Annotations } from './plan-1-annotations';

/**
 * PAGE 1 — Plan de circulation de la cour.
 *
 * Coordonnées dans le repère 961 × 667 (src/assets/plan-1.webp est 3 fois plus grande, mêmes proportions).
 * Les positions ont été relevées à l'œil sur le plan fourni : vérifiez-les et
 * ajustez-les avec le mode édition (/carriere/plan-1/?edit).
 *
 * Valeurs PLACEHOLDER : tout ce qui porte `provisoire: true` affiche un badge
 * « À confirmer » dans l'interface. Supprimez le drapeau une fois l'info validée.
 */

const JAUNE = '#FFD400'; // circulation dans la cour (entrée)
const BLEU = '#1F7AE0'; // sortie
const VIOLET = '#A64DD6'; // accès cour après décharge
const VERT = '#00C853'; // accès décharge remblais
const ROUGE = '#E0001B'; // zones interdites
const BLANC = '#FFFFFF';
const ORANGE = '#FF8A00';

export const plan1: PlanData = {
  title: 'Plan de circulation',
  description: 'Itinéraires, zones et consignes de la cour. Respectez le sens de circulation.',
  imageAlt: 'Vue aérienne de la carrière avec les stocks, la trémie, la bascule et les sens de circulation',
  // Orthophoto IGN BD ORTHO® (Licence Ouverte Etalab 2.0), recalée sur le plan d'origine
  // (voir sources/recalage-ign-plan-1.json). Image 2883 × 2001 px pour un repère 961 × 667.
  image,
  imageCredit: '© IGN – BD ORTHO®',
  annotations: plan1Annotations,
  legend: [
    { color: JAUNE, label: 'Circulation dans la cour (entrée)' },
    { color: BLEU, label: 'Sortie' },
    { color: VIOLET, label: 'Accès cour après décharge' },
    { color: VERT, label: 'Accès décharge remblais' },
  ],
  width: 961,
  height: 667,

  hotspots: [
    {
      id: 'tremie',
      label: 'Trémie (poste de chargement)',
      description:
        'Chargement en libre-service par badge. Présentez votre badge sur le premier boîtier avant la trémie, sur votre gauche.',
      consigne: 'Marche avant uniquement sous la trémie. Avancez au feu vert et à l’alarme.',
      shape: 'circle',
      coords: [183, 191, 26],
      color: JAUNE,
    },
    {
      id: 'attente-tremie',
      label: 'Zone d’attente trémie',
      description: 'L’attente pour la trémie se fait le long du parking à engins.',
      consigne: 'Ne stationnez pas sur la piste : attendez votre tour dans la zone jaune.',
      shape: 'polygon',
      coords: [164, 73, 182, 84, 136, 160, 119, 149],
      color: JAUNE,
    },
    {
      id: 'bascule',
      label: 'Bascule N°2',
      description: 'Pesée des camions à l’entrée et à la sortie du site.',
      consigne: 'Arrêt complet sur la bascule. Suivez les indications du ou de la responsable de bascule.',
      shape: 'polygon',
      coords: [886, 308, 922, 308, 922, 398, 886, 398],
      color: BLANC,
    },
    {
      id: 'laveur',
      label: 'Laveur de roues',
      description: 'Passage au laveur avant la sortie du site.',
      shape: 'polygon',
      coords: [886, 252, 922, 252, 922, 302, 886, 302],
      color: BLANC,
    },
    {
      id: 'parking-pl',
      label: 'Parking PL',
      description: 'Stationnement des poids lourds.',
      shape: 'polygon',
      coords: [101, 76, 137, 76, 152, 86, 118, 148, 106, 162, 96, 182, 94, 209, 49, 209, 40, 156, 93, 157, 94, 136, 100, 134],
      color: BLANC,
    },
    {
      id: 'parking-vl',
      label: 'Parking VL et réfectoire',
      description: 'Stationnement des véhicules légers. Le réfectoire se trouve entre les deux parkings.',
      shape: 'polygon',
      coords: [40, 79, 93, 79, 93, 149, 40, 149],
      color: BLANC,
    },
    {
      id: 'centrale-beton',
      label: 'Centrale à béton',
      description: 'Zone de la centrale à béton.',
      consigne: 'Accès interdit sans autorisation.',
      shape: 'polygon',
      coords: [572, 128, 610, 100, 662, 106, 668, 140, 646, 158, 600, 160],
      color: ORANGE,
    },
    {
      id: 'poste-commande',
      label: 'Poste de commande',
      description: 'Poste de pilotage de l’installation.',
      shape: 'polygon',
      coords: [577, 194, 606, 194, 606, 276, 577, 276],
      color: ORANGE,
    },
    {
      id: 'concassage',
      label: 'Installation de concassage',
      description: 'Concasseurs, cribles et convoyeurs de l’installation de traitement.',
      consigne: 'Accès interdit aux camions. Ne stationnez jamais sous un convoyeur.',
      shape: 'polygon',
      coords: [462, 298, 616, 298, 700, 280, 716, 316, 630, 374, 462, 374],
      color: ORANGE,
      provisoire: true, // PLACEHOLDER : consigne d'accès à valider
    },
    {
      id: 'usines-boues',
      label: 'Usines à boues',
      description: 'Installation de traitement des boues.',
      consigne: 'Zone interdite à la circulation des camions.',
      shape: 'polygon',
      coords: [710, 330, 821, 330, 821, 433, 710, 433],
      color: ROUGE,
    },
    {
      id: 'decharge-remblais',
      label: 'Décharge remblais',
      description:
        'Accès à la décharge de remblais par la voie verte, le long de la bascule. Après la décharge, l’accès à la cour se fait par la piste basse (flèche violette).',
      shape: 'polygon',
      coords: [678, 619, 838, 619, 838, 652, 678, 652],
      color: VIOLET,
    },
  ],

  routes: [
    {
      id: 'chargement',
      label: 'Entrée → Trémie',
      color: JAUNE,
      d: 'M 862 667 C 875 600 895 520 903 450 C 908 400 912 330 911 250 L 908 120 C 907 90 887 58 845 58 L 260 64 C 222 66 194 80 170 106 C 148 132 134 165 132 195 C 131 225 148 250 172 260 C 182 264 184 250 184 235 L 184 196',
      steps: [
        'Entrée par la piste d’accès (est)',
        'Passage à la Bascule N°2',
        'Remontée le long de la clôture',
        'Piste du haut vers l’ouest (flèches jaunes)',
        'Attente le long du parking à engins',
        'Sous la trémie, en marche avant uniquement',
      ],
    },
    {
      id: 'sortie',
      label: 'Trémie → Sortie',
      color: BLEU,
      d: 'M 182 196 L 182 130 C 183 108 190 94 208 82 C 224 75 240 74 262 74 L 845 68 C 878 70 900 90 900 122 L 903 250 C 904 330 901 400 896 450 C 889 520 870 600 856 667',
      steps: [
        'Quitter la trémie en marche avant',
        'Rejoindre la piste du haut',
        'Piste du haut vers l’est (flèches bleues)',
        'Descente le long de la clôture, passage au laveur',
        'Pesée à la Bascule N°2',
        'Sortie du site',
      ],
    },
    {
      id: 'acces-decharge',
      label: 'Accès décharge remblais',
      color: VERT,
      d: 'M 905 240 C 888 262 881 290 881 320 C 882 380 882 440 880 490 C 878 540 872 600 868 667',
      steps: [
        'Depuis la cour, prendre la voie verte le long de la bascule',
        'Descendre par la piste d’accès',
        'Continuer vers la décharge remblais',
      ],
    },
    {
      id: 'retour-cour',
      label: 'Accès cour après décharge',
      color: VIOLET,
      d: 'M 846 667 C 852 610 864 540 878 494 C 882 476 874 462 845 458 C 800 452 720 451 640 451 L 566 448',
      steps: [
        'Retour de la décharge remblais par la piste d’accès',
        'Bifurquer avant la bascule (flèche violette)',
        'Piste basse vers l’ouest jusqu’à la cour',
      ],
    },
  ],
  defaultRoute: 'chargement',

  markers: [
    {
      id: 'vous-etes-ici',
      type: 'you-are-here',
      label: 'Vous êtes ici',
      x: 872,
      y: 618,
      description: 'Entrée du site.',
      provisoire: true, // PLACEHOLDER : position du QR code à confirmer
    },
  ],

  rules: [
    {
      title: 'Sens de circulation',
      text: 'Suivez les flèches : jaune pour entrer dans la cour, bleu pour sortir, vert pour aller à la décharge remblais, violet pour revenir dans la cour après décharge.',
    },
    {
      title: 'Zones interdites',
      text: 'Ne franchissez jamais un panneau sens interdit (rond rouge sur le plan).',
    },
    {
      title: 'Vitesse limitée',
      text: '20 km/h maximum dans tout le site.', // PLACEHOLDER : limite à confirmer
      provisoire: true,
    },
    {
      title: 'Priorité aux engins',
      text: 'Les chargeurs et engins de carrière sont toujours prioritaires. Restez hors de leur champ d’action.',
      provisoire: true, // PLACEHOLDER : règle de priorité à valider
    },
    {
      title: 'EPI obligatoires',
      text: 'Hors de la cabine : gilet haute visibilité, chaussures de sécurité et casque.',
      provisoire: true, // PLACEHOLDER : liste des EPI à valider
    },
    {
      title: 'Attente trémie',
      text: 'L’attente pour la trémie se fait le long du parking à engins, jamais sur la piste.',
    },
  ],
};
