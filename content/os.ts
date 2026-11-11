/* Textes propres à la version « Cherif OS » (le bureau). Le contenu des parties vient de fr.ts / en.ts. */
export type OsTexte = {
  demarrage: string;
  passer: string;
  verrou: string;
  connexion: string;
  bonjour: string;
  rechercher: string;
  epingles: string;
  liens: string;
  classique: string;
  eteindre: string;
  apps: { web: string; ugc: string; chain: string; net: string; cv: string; contact: string; apropos: string; corbeille: string; navigateur: string };
  fenetre: { reduire: string; agrandir: string; restaurer: string; fermer: string };
  explorateur: { acces: string; elements: string; ouvrir: string };
  navigateur: { apercu: string; direct: string; directNote: string; ordi: string; tel: string };
  lecteur: { playlist: string };
  terminal: { aide: string; inconnu: string; commandes: [string, string][] };
  cmd: { titre: string; bientot: string };
  cv: { telecharger: string; mobile: string };
  mail: { a: string; objet: string; message: string; envoyer: string; placeholderObjet: string; placeholderMessage: string; ailleurs: string };
  apropos: { fichier: string };
  corbeille: { vide: string; ancien: string };
  bienvenue: string;
};

export const osFr: OsTexte = {
  demarrage: "Démarrage",
  passer: "Passer l'intro",
  verrou: "Clique ou appuie sur une touche pour déverrouiller",
  connexion: "Se connecter",
  bonjour: "Bienvenue",
  rechercher: "Rechercher une app",
  epingles: "Épinglées",
  liens: "Liens",
  classique: "Version classique",
  eteindre: "Verrouiller",
  apps: { web: "Web 2", ugc: "UGC IA", chain: "Blockchain", net: "Réseau", cv: "CV.pdf", contact: "Contact", apropos: "a-propos.txt", corbeille: "Corbeille", navigateur: "Navigateur" },
  fenetre: { reduire: "Réduire", agrandir: "Agrandir", restaurer: "Restaurer", fermer: "Fermer" },
  explorateur: { acces: "Accès rapide", elements: "éléments", ouvrir: "Double-clique sur un dossier pour ouvrir le site" },
  navigateur: { apercu: "Aperçu", direct: "Site en direct", directNote: "Le vrai site, chargé ici. Tu peux cliquer et faire défiler.", ordi: "Ordinateur", tel: "Téléphone" },
  lecteur: { playlist: "Playlist" },
  terminal: {
    aide: "Tape « help » pour voir les commandes.",
    inconnu: "commande introuvable",
    commandes: [["help", "liste des commandes"], ["blocks", "mes contrats en production"], ["projects", "mes projets open source"], ["stack", "ma stack"], ["contact", "me contacter"], ["clear", "effacer l'écran"]],
  },
  cmd: { titre: "Invite de commandes", bientot: "Cette partie arrive bientôt." },
  cv: { telecharger: "Télécharger", mobile: "L'aperçu PDF n'est pas disponible ici : télécharge le CV." },
  mail: { a: "À", objet: "Objet", message: "Message", envoyer: "Envoyer", placeholderObjet: "Un projet pour toi", placeholderMessage: "Salut Cherif, …", ailleurs: "Ailleurs" },
  apropos: { fichier: "Fichier   Édition   Affichage" },
  corbeille: { vide: "Presque vide. Il reste juste ça :", ancien: "Mon ancien portfolio (2024)" },
  bienvenue: "Double-clique sur une icône pour l'ouvrir.",
};

export const osEn: OsTexte = {
  demarrage: "Starting up",
  passer: "Skip intro",
  verrou: "Click or press any key to unlock",
  connexion: "Sign in",
  bonjour: "Welcome",
  rechercher: "Search for an app",
  epingles: "Pinned",
  liens: "Links",
  classique: "Classic version",
  eteindre: "Lock",
  apps: { web: "Web 2", ugc: "AI UGC", chain: "Blockchain", net: "Network", cv: "CV.pdf", contact: "Contact", apropos: "about.txt", corbeille: "Recycle bin", navigateur: "Browser" },
  fenetre: { reduire: "Minimise", agrandir: "Maximise", restaurer: "Restore", fermer: "Close" },
  explorateur: { acces: "Quick access", elements: "items", ouvrir: "Double-click a folder to open the site" },
  navigateur: { apercu: "Preview", direct: "Live site", directNote: "The real site, loaded right here. You can click and scroll.", ordi: "Desktop", tel: "Mobile" },
  lecteur: { playlist: "Playlist" },
  terminal: {
    aide: "Type “help” to list the commands.",
    inconnu: "command not found",
    commandes: [["help", "list the commands"], ["blocks", "my contracts in production"], ["projects", "my open-source projects"], ["stack", "my stack"], ["contact", "get in touch"], ["clear", "clear the screen"]],
  },
  cmd: { titre: "Command prompt", bientot: "This section is coming soon." },
  cv: { telecharger: "Download", mobile: "PDF preview isn't available here: download the CV." },
  mail: { a: "To", objet: "Subject", message: "Message", envoyer: "Send", placeholderObjet: "A project for you", placeholderMessage: "Hi Cherif, …", ailleurs: "Elsewhere" },
  apropos: { fichier: "File   Edit   View" },
  corbeille: { vide: "Almost empty. Just this left:", ancien: "My old portfolio (2024)" },
  bienvenue: "Double-click an icon to open it.",
};
