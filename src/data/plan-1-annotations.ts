import type { Annotations } from '../types';

const JAUNE = '#FFD400';
const BLEU = '#1F7AE0';
const VIOLET = '#A64DD6';
const VERT = '#00C853';

/**
 * Annotations du plan 1, dessinées par-dessus la photo aérienne
 * (repère 961 × 667, comme le reste de src/data/plan-1.ts).
 *
 * Les stocks changent souvent : modifiez simplement `label` ou la position.
 * Pour une nouvelle forme, utilisez l'outil « Zone polygone » du mode ?edit
 * et collez les coords dans { polygon: [...] }.
 */
export const plan1Annotations: Annotations = {
  areas: [
    // Rangée du haut
    { kind: 'navy', rect: [198, 84, 45, 27], label: 'SUR\nCHARGE' },
    { kind: 'stock', rect: [249, 80, 48, 28], label: '0-10\nR1V' },
    { kind: 'stock', rect: [303, 79, 69, 29], label: '4-20\nR1V' },
    { kind: 'reserve', rect: [378, 79, 69, 31], label: '10-20TLV\nSTOCK' },
    { kind: 'reserve', rect: [455, 79, 68, 31], label: '4-10TLV\nSTOCK' },
    { kind: 'stock', rect: [527, 80, 27, 27], label: '0-4\nOR' },
    // Deuxième rangée
    { kind: 'stock', rect: [314, 130, 58, 28], label: '4-16\nR1V' },
    { kind: 'stock', rect: [382, 130, 59, 28], label: '0-20\nR1V' },
    { kind: 'stock', rect: [500, 140, 30, 23], label: '4-10\nTLV' },
    { kind: 'stock', rect: [535, 140, 30, 23], label: '10-20\nTLV' },
    { kind: 'stock', rect: [220, 165, 28, 23], label: '0-20\nPLV' },

    // Bâtiments et installations
    { kind: 'building', rect: [260, 175, 70, 23], label: 'HANGAR' },
    { kind: 'building', rect: [497, 172, 68, 26], label: 'SILO' },
    { kind: 'tremie', rect: [152, 180, 63, 22], label: 'TRÉMIE' },
    { kind: 'plant', polygon: [575, 128, 610, 100, 662, 106, 668, 140, 646, 158, 600, 160], label: 'Centrale\nà béton' },
    { kind: 'building', rect: [577, 195, 29, 81], label: 'Poste de\ncommande', vertical: true },
    { kind: 'dark', rect: [268, 200, 22, 45], label: '0-4R1V', vertical: true },
    { kind: 'dark', rect: [295, 200, 22, 45], label: '01-HA', vertical: true },
    { kind: 'plant', rect: [710, 330, 111, 103], label: 'Usines\nà boues', fontSize: 15 },
    { kind: 'building', rect: [888, 255, 18, 48], label: 'Laveur', vertical: true },
    { kind: 'building', rect: [891, 310, 21, 82], label: 'Bascule N°2', vertical: true },

    // Parkings et attente trémie
    { kind: 'parking', rect: [40, 79, 53, 56], label: 'Parking\nVL' },
    { kind: 'building', rect: [46, 137, 42, 12], label: 'Réfectoire' },
    // Parking PL : forme en L qui longe la zone d'attente
    { kind: 'parking', polygon: [101, 76, 137, 76, 152, 86, 118, 148, 106, 162, 96, 182, 94, 209, 49, 209, 40, 156, 93, 157, 94, 136, 100, 134], label: 'Parking\nPL', labelAt: [68, 183], fontSize: 12 },
    { kind: 'wait', polygon: [164, 73, 182, 84, 136, 160, 119, 149] },

    // Centre
    { kind: 'green', rect: [403, 205, 44, 77], label: '0-4\nTLV' },
    { kind: 'green', rect: [270, 285, 48, 37], label: '0-4\nSLV' },
    { kind: 'green', rect: [360, 305, 48, 40], label: '4-20\nPLV' },

    // Ouest
    { kind: 'stock', rect: [53, 272, 45, 36], label: '0-4\nTLV' },
    { kind: 'blue', rect: [124, 270, 31, 62], label: '0-1\nBU' },
    { kind: 'stock', rect: [53, 325, 45, 35], label: '0-4\nR1V' },
    { kind: 'stock', polygon: [0, 345, 22, 352, 36, 420, 34, 540, 24, 612, 0, 612], label: '0-80\nPV' },
    { kind: 'stock', polygon: [62, 386, 104, 381, 112, 450, 120, 550, 70, 551, 64, 470], label: '0-20\nR1V' },
    { kind: 'reserve', polygon: [130, 385, 165, 385, 222, 500, 140, 537], label: '4-20\nPLV\nSTOCK' },
    {
      kind: 'stock',
      polygon: [212, 300, 240, 296, 256, 322, 252, 360, 272, 398, 302, 420, 330, 442, 318, 462, 284, 455, 250, 420, 222, 382, 202, 340],
      label: '0-4 PLV',
    },

    // Rangée basse
    { kind: 'stock', rect: [318, 380, 64, 58], label: '0-31.5 SV\nou 0-4 SV' },
    { kind: 'stock', rect: [390, 395, 47, 35], label: '4-20\nPLV*' },
    { kind: 'stock', rect: [447, 398, 47, 40], label: '20-40\nSV*' },
    { kind: 'stock', rect: [508, 396, 96, 40], label: '31.5-63\nSV' },
    { kind: 'stock', rect: [316, 478, 47, 40], label: '0-31.5\nSV' },
    { kind: 'reserve', rect: [368, 478, 47, 40], label: '0-4 SV\nSTOCK' },
    { kind: 'orange', rect: [495, 478, 50, 38], label: 'S.M.D' },
    { kind: 'stock', rect: [551, 478, 50, 40], label: '0-63\nSV' },

    // Stocks du sud
    { kind: 'reserve', polygon: [152, 578, 240, 522, 282, 565, 198, 618], label: '0-4 PLV\nSTOCK' },
    {
      kind: 'reserve',
      polygon: [300, 528, 380, 522, 470, 522, 500, 516, 560, 516, 556, 560, 530, 590, 500, 610, 470, 626, 400, 640, 330, 636, 300, 596],
      label: '0-4 PLV\nSTOCK',
      fontSize: 15,
    },
    { kind: 'reserve', polygon: [597, 562, 640, 542, 660, 572, 655, 606, 605, 606], label: '4-20 PLV\nSTOCK' },
  ],

  // Flèches de sens de circulation, reprises de l'affiche d'origine
  arrows: [
    // Jaune : circulation dans la cour (entrée)
    { color: JAUNE, d: 'M 880 58 L 570 60' },
    { color: JAUNE, d: 'M 520 63 L 245 68' },
    { color: JAUNE, d: 'M 228 73 C 190 81 160 106 146 140 C 137 164 135 184 136 200' },
    { color: JAUNE, d: 'M 140 216 C 146 238 158 252 176 260' },
    { color: JAUNE, d: 'M 192 112 C 200 120 210 124 226 124' },
    { color: JAUNE, d: 'M 238 124 L 282 124' },
    { color: JAUNE, d: 'M 305 123 L 362 123' },
    { color: JAUNE, d: 'M 385 122 L 458 122' },
    { color: JAUNE, d: 'M 196 140 C 215 150 240 162 266 165' },
    { color: JAUNE, d: 'M 285 168 L 345 168' },
    { color: JAUNE, d: 'M 365 168 L 425 168' },
    { color: JAUNE, d: 'M 183 242 L 183 210' },
    { color: JAUNE, d: 'M 182 268 C 200 274 210 277 222 277' },
    { color: JAUNE, d: 'M 232 276 L 288 265' },
    { color: JAUNE, d: 'M 170 288 L 170 330' },
    { color: JAUNE, d: 'M 176 362 L 186 398' },
    { color: JAUNE, d: 'M 206 430 L 246 488' },
    { color: JAUNE, d: 'M 108 335 L 106 278' },
    { color: JAUNE, d: 'M 118 425 L 117 372' },
    { color: JAUNE, d: 'M 124 525 L 124 468' },
    { color: JAUNE, d: 'M 240 513 L 152 556' },
    { color: JAUNE, d: 'M 288 490 L 336 465' },
    { color: JAUNE, d: 'M 354 465 L 410 465' },
    { color: JAUNE, d: 'M 425 465 L 478 465' },
    { color: JAUNE, d: 'M 498 465 L 552 465' },
    { color: JAUNE, d: 'M 872 640 C 882 580 896 510 906 445' },
    // Bleu : sortie
    { color: BLEU, d: 'M 232 77 L 455 77' },
    { color: BLEU, d: 'M 680 58 L 842 54' },
    { color: BLEU, d: 'M 895 92 L 908 242' },
    { color: BLEU, d: 'M 470 142 C 500 136 530 134 548 122 C 570 106 590 82 616 64' },
    { color: BLEU, d: 'M 182 142 L 182 112' },
    { color: BLEU, d: 'M 170 250 L 140 205' },
    { color: BLEU, d: 'M 110 225 L 126 178' },
    { color: BLEU, d: 'M 470 445 L 352 445' },
    { color: BLEU, d: 'M 545 444 L 498 444' },
    { color: BLEU, d: 'M 326 457 L 284 480' },
    { color: BLEU, d: 'M 292 260 L 228 272' },
    { color: BLEU, d: 'M 180 366 L 180 342' },
    { color: BLEU, d: 'M 250 480 L 218 418' },
    { color: BLEU, d: 'M 890 490 C 882 560 871 620 862 662' },
    // Violet : accès cour après décharge (retour de la décharge par la piste basse)
    { color: VIOLET, d: 'M 876 560 L 876 492 C 877 470 870 458 850 454 C 780 450 700 452 640 452 L 568 444' },
    // Vert : accès décharge remblais (descente le long de la bascule)
    { color: VERT, d: 'M 888 308 C 884 360 882 420 881 490 C 880 540 876 600 872 660' },
  ],

  noEntry: [
    [580, 92],
    [630, 195],
    [335, 258],
    [101, 243],
    [685, 432],
    [855, 461],
    [578, 552],
    [293, 598],
    [928, 230],
  ],

  labels: [
    { x: 150, y: 50, text: 'Zone d’attente trémie', size: 12 },
    { x: 856, y: 640, text: 'Vers décharge remblais', size: 13, anchor: 'end' },
    { x: 884, y: 662, text: 'Accès site', size: 12, anchor: 'end' },
  ],
};
