# Portfolio Ousmane Cherif Sylla : lancer en local

## Lancer

```powershell
cd "C:\Users\DELL02\Desktop\Personal Builds\Portfolio"
npm install        # la première fois seulement
npm run dev
```

Puis ouvrir **http://127.0.0.1:3010/** (français) ou **http://127.0.0.1:3010/en** (anglais).

Sur le téléphone (même Wi-Fi) : `npx next dev -p 3010 -H 0.0.0.0`, puis `http://<adresse IPv4 de l'ordinateur>:3010/`.

## Ce qu'il y a sur la page

Style néo-brutaliste : fond animé en trame de points, cartes à bordure blanche et ombre décalée, rouge corail.

- **Accueil** : « Hi! 👋 I'm », le nom, « Blockchain & AI Advisor/Addict, Network Engineer » (le mot change au survol) et les liens.
- **La stack** : carrousel de cartes en trame animée (glisser, flèches, défilement automatique).
- **Projets** : 4 onglets, AI · Blockchain · Web 2 · Networks. Lien direct vers un onglet : `/#projets-chain`, `/#projets-web`…
- **Expérience** : postes par « ère », rail qui se remplit au défilement.
- **Formation** : diplômes (certificats à ajouter).
- **Contact**.
- La barre du haut se compacte en icônes après le haut de page (toujours en icônes sur téléphone).

## Modifier le contenu

- Textes : `content/fr.ts` et `content/en.ts`.
- Cartes de la stack, postes (Expérience) et diplômes : en haut de `components/brut/Brut.tsx` (`STACK`, `ERES`, `DIPLOMES`).
- Vidéos des sites : `public/media/web/<id>-d.mp4` (ordinateur) et `<id>-m.mp4` (téléphone), avec une image `.jpg` du même nom.
- Clips UGC : `public/media/ugc/` (ajouter `clip-XX` dans `ugc.clips`).
- CV : `public/cv/`. Favicon : `public/icon.svg` (+ `favicon.ico`, `apple-icon.png`).

## Structure

- `components/brut/` : la page (`Brut.tsx`), le fond animé (`Fond.tsx`), le carrousel (`Stack.tsx`), les onglets (`Onglets.tsx`), l'expérience (`Experience.tsx`), la barre et le mot animé (`Vivant.tsx`).
- `app/brut.css` : le style de la page.
- Essais gardés de côté, non reliés à l'accueil : la pièce 3D (`/3d`, `components/piece3d.ts`, `Bureau3D.tsx`), l'ancienne version (`components/Page.tsx`) et Cherif OS (`components/os/`, inachevé).
