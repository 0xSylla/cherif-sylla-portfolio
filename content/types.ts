export type Lien = { label: string; href: string };

export type ProjetWeb = {
  id: string; // fichiers : public/media/web/<id>-d.mp4, <id>-m.mp4 (+ .jpg pour l'affiche)
  nom: string;
  accroche: string;
  constat: string;
  fait: string[];
  stack: string[];
  site: string;
  code: string;
  nonOfficiel: boolean;
};

export type Bloc = {
  titre: string;
  contexte: string;
  chiffre: string;
  chiffreLabel: string;
  texte: string;
  stack: string[];
  adresse?: string; // contrat vérifiable
  liens: Lien[];
};

export type Contenu = {
  lang: "fr" | "en";
  meta: { title: string; description: string };
  nav: { web: string; ugc: string; chain: string; net: string; contact: string };
  langue: { label: string; href: string; aria: string };
  hero: {
    salut: string;
    nom: string;
    nomComplet: string;
    roles: string[];
    lead: string;
    ctaTravaux: string;
    ctaContact: string;
    noeuds: { web: string; ugc: string; chain: string; net: string };
    astuce: string;
    satellites: { web: string[]; ugc: string[]; chain: string[]; net: string[] };
  };
  chiffres: { v: string; l: string }[];
  web: {
    num: string; titre: string; lead: string;
    labels: { constat: string; fait: string; site: string; code: string; nonOfficiel: string; concept: string; ordi: string; tel: string };
    projets: ProjetWeb[];
  };
  ugc: { num: string; titre: string; lead: string; cta: string; ctaHref: string; son: string; muet: string; clips: string[] };
  chain: {
    num: string; titre: string; lead: string;
    prod: string; projets: string; verifier: string; stackTitre: string;
    blocs: Bloc[];
    side: Bloc[];
    stack: { groupe: string; items: string[] }[];
  };
  net: { num: string; titre: string; lead: string; bientot: string; texte: string; points: string[] };
  parcours: { titre: string; items: { quand: string; quoi: string; ou: string }[]; langues: string };
  contact: { titre: string; lead: string; email: string; cv: string; cvHref: string; rdv: string; rdvHref: string; liens: Lien[] };
  pied: string;
  piece: {
    intro: string;
    astuce: string;
    classique: string;
    fermer: string;
    explorer: string;
    sans3d: string;
    zones: { web: string; ugc: string; chain: string; net: string; parcours: string; contact: string };
  };
};
