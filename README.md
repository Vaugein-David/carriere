# Carrière : plans interactifs (QR codes)

Site statique de deux pages, avec une page d'accueil qui renvoie vers les deux : un seul QR code suffit (celui de l'accueil). Chaque page garde aussi son propre QR code.

| Page | Contenu | Données | Image |
| --- | --- | --- | --- |
| `/carriere/` | Accueil : deux gros boutons vers les plans | `src/pages/Accueil.tsx` | aucune |
| `/carriere/plan-1/` | Plan de circulation de la cour | `src/data/plan-1.ts` | `src/assets/plan-1.webp` |
| `/carriere/plan-2/` | Poste de chargement (trémie) | `src/data/plan-2.ts` | aucune (texte seul) |

La page 2 est une page simple qui retranscrit l'affiche du poste de chargement : les 6 étapes et l'info sur l'attente. L'affiche d'origine est conservée dans `sources/plan-2-affiche.webp` (non publiée). Les textes se modifient dans `src/data/plan-2.ts` (`**gras**`, `[[badge]]` pour l'étiquette verte).

Stack : Vite (multi-page, sans routeur) + React + TypeScript strict + GSAP. PWA hors ligne via `vite-plugin-pwa`.

## Langues

Toutes les pages existent en **français, anglais, roumain, polonais et portugais** (boutons FR · EN · RO · PL · PT en haut de page). La langue du téléphone est choisie automatiquement ; le choix du visiteur est mémorisé.

Dans `src/data/*.ts`, chaque texte s'écrit `{ fr: '…', en: '…', ro: '…', pl: '…', pt: '…' }`. Une langue absente affiche le français. Les textes de l'interface (boutons, titres de blocs) sont dans `src/i18n.tsx`.

## Développement

```bash
npm install
npm run dev
```

Ouvrir http://localhost:5173/carriere/ (accueil), http://localhost:5173/carriere/plan-1/ et http://localhost:5173/carriere/plan-2/.

## Mode édition (`?edit`)

Ajoutez `?edit` à l'URL du plan 1 : http://localhost:5173/carriere/plan-1/?edit.

- Chaque appui sur le plan affiche les coordonnées **dans le repère de l'image** et les copie (`x, y`).
- Outils : **Point**, **Itinéraire** (tracé point par point, lissé ou droit), **Zone polygone**, **Zone cercle** (centre puis bord).
- **Copier le code** produit un objet prêt à coller dans `routes` ou `hotspots` de `src/data/plan-x.ts`.
- Le zoom et le déplacement restent actifs (pincer, molette, boutons). Le double appui est désactivé dans ce mode.
- Si l'image chargée n'a pas les dimensions déclarées dans le fichier data, un avertissement s'affiche.

## Photo HD du plan 1 (orthophoto IGN)

La photo du plan 1 est l'orthophoto **IGN BD ORTHO®** (Licence Ouverte Etalab 2.0, mention « © IGN – BD ORTHO® » affichée sous le plan, obligatoire). Elle a été tournée et recalée sur l'affiche d'origine, puis exportée à 2883 × 2001 px, soit 3 fois le repère 961 × 667 des fichiers data. Elle reste donc nette quand on zoome.

- L'affiche d'origine est conservée dans `sources/plan-1-affiche.webp` (non publiée).
- Le recalage utilisé (matrice IGN → plan) est dans `sources/recalage-ign-plan-1.json`.
- Sur la photo, les étiquettes des stocks, les flèches de sens, les sens interdits et les textes viennent de [`src/data/plan-1-annotations.ts`](src/data/plan-1-annotations.ts) : modifiez-les là, sans retoucher l'image.
- La photo IGN peut dater de quelques années : des stocks ont pu bouger depuis.

## Annotations du plan 1

Tout ce qui est dessiné sur la photo est dans [`src/data/plan-1-annotations.ts`](src/data/plan-1-annotations.ts), dans le repère 961 × 667 :

- **Stocks et bâtiments** (`areas`) : modifiez `label` (retour à la ligne avec `\n`), la position (`rect: [x, y, largeur, hauteur]`) ou la forme (`polygon: [...]`, à relever avec l'outil « Zone polygone » de `?edit`). La couleur dépend de `kind` : `stock`, `reserve`, `green`, `blue`, `orange`, `navy`, `dark`, `building`, `plant`, `parking`, `tremie`, `wait`.
- **Flèches de sens de circulation** (`arrows`) : un tracé dans le sens de la flèche et sa couleur (outil « Itinéraire » de `?edit`).
- **Panneaux sens interdit** (`noEntry`) et **textes libres** (`labels`).

## Itinéraires vers les produits

Le menu « Itinéraire vers un produit » vient de [`src/data/plan-1-produits.ts`](src/data/plan-1-produits.ts). Les pistes y sont décrites une fois (lignes brisées dans le sens de circulation) ; chaque produit indique son point d'arrêt (`stop`) et les pistes de l'aller et du retour, et le tracé est calculé automatiquement. Le `id` d'un produit est celui de son stock dans `plan-1-annotations.ts`, qui clignote sur le plan quand on le choisit. Les stocks inaccessibles aux camions (barrés sur l'affiche) ne figurent pas dans la liste.

- **Ajouter un produit** : donnez un `id` à son stock dans les annotations, puis ajoutez une ligne dans le bon groupe en copiant un voisin du même secteur et en changeant `stop`.
- **Retirer un produit** : supprimez sa ligne.

## Remplacer une image

1. Exportez le plan en **WebP** (environ 2000 px de large au maximum, qualité 80).
2. Remplacez `src/assets/plan-x.webp`.
3. Vérifiez `width` et `height` dans `src/data/plan-x.ts` : ils définissent le repère des coordonnées. Une image plus grande convient si elle a les mêmes proportions (le mode `?edit` signale un écart).
4. Repositionnez les zones, les marqueurs et les itinéraires avec `?edit`.

## Données à compléter

Les valeurs provisoires sont commentées `PLACEHOLDER` dans `src/data/*.ts`. Les éléments marqués `provisoire: true` affichent un badge « À confirmer » : retirez le drapeau une fois l'information validée.

À renseigner en priorité :

- La vitesse maximale, les EPI et les règles de priorité.

## Build

```bash
npm run build     # vérification TypeScript + build dans dist/
npm run preview   # http://localhost:4173/carriere/plan-1/
```

## Déploiement GitHub Pages

1. Créez un dépôt GitHub nommé **`carriere`**. Le nom doit correspondre à `base` dans `vite.config.ts`.
2. Poussez ce dossier sur la branche `main`.
3. Dans le dépôt, ouvrez **Settings → Pages → Build and deployment → Source : GitHub Actions**.
4. Chaque push sur `main` lance `.github/workflows/deploy.yml` (`npm ci`, `npm run build`, puis publication de `dist`).

URLs finales à mettre dans les QR codes :

- `https://<utilisateur>.github.io/carriere/` : accueil, le QR code unique à afficher
- `https://<utilisateur>.github.io/carriere/plan-1/`
- `https://<utilisateur>.github.io/carriere/plan-2/`

## QR codes

Renseignez `homepage` dans `package.json` (`https://<utilisateur>.github.io/carriere/`), puis :

```bash
npm run qr
```

Vous pouvez aussi passer l'URL directement : `npm run qr -- https://<utilisateur>.github.io/carriere/`.
Le script écrit `qr/accueil.*`, `qr/plan-1.*` et `qr/plan-2.*`, chacun en PNG 2048 px et en SVG (correction d'erreur H). `qr/accueil` est le QR code unique. Utilisez le SVG pour l'impression grand format.

## Liens utiles

- `?focus=<id>` centre la vue sur une zone ou un marqueur au chargement. Exemple : `/carriere/plan-1/?focus=tremie`.
- Hors ligne : après une première visite en ligne, toutes les pages et leurs images restent consultables sans réseau.
