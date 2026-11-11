import type { Contenu } from "./types";

/* Tout le texte du site en français. La version anglaise est dans en.ts. */
export const fr: Contenu = {
  lang: "fr",
  meta: {
    title: "Cherif Sylla — Ingénieur blockchain, développeur web, créateur UGC IA",
    description:
      "Smart contracts en production, sites qui se vivent et pubs vidéo générées par IA. Le portfolio de Cherif Sylla.",
  },
  nav: { web: "Web 2", ugc: "UGC IA", chain: "Blockchain", net: "Réseau", contact: "Contact" },
  langue: { label: "EN", href: "/en", aria: "View the site in English" },

  hero: {
    salut: "Salut, moi c'est",
    nom: "Cherif Sylla",
    nomComplet: "Ousmane Cherif Sylla",
    roles: ["Ingénieur blockchain", "Développeur web", "Créateur UGC IA", "Réseaux & télécoms"],
    lead:
      "Je conçois des smart contracts qui tiennent en production, des sites qu'on a envie de faire défiler et des pubs vidéo générées par IA. Quatre métiers, un même réflexe : tout relier.",
    ctaTravaux: "Voir mes projets",
    ctaContact: "Me contacter",
    noeuds: { web: "Web 2", ugc: "UGC IA", chain: "Blockchain", net: "Réseau" },
    astuce: "Clique sur un nœud",
    satellites: { web: ["three.js", "Next.js", "GSAP"], ugc: ["Vidéo IA", "Scripts", "Pubs"], chain: ["Solidity", "DeFi", "LayerZero"], net: ["Routage", "TCP/IP", "Sécurité"] },
  },

  chiffres: [
    { v: "46 000 $", l: "de TVL record sur 3 vaults ERC4626" },
    { v: "100 000 $+", l: "de volume pour une collection NFT cross-chain" },
    { v: "134+", l: "transactions sur un contrat d'ICO en production" },
    { v: "6", l: "refontes de sites, en ligne" },
  ],

  web: {
    num: "01",
    titre: "Web 2",
    lead:
      "Je prends des sites de marques que tout le monde connaît et je les refais comme je les aurais faits : une idée forte, un fil conducteur, et le même soin sur téléphone que sur ordinateur.",
    labels: {
      constat: "Point de départ",
      fait: "Ce que j'ai fait",
      site: "Voir le site",
      code: "Code",
      nonOfficiel: "Concept non officiel",
      concept: "Concept",
      ordi: "Ordinateur",
      tel: "Téléphone",
    },
    projets: [
      {
        id: "wave",
        nom: "Wave",
        accroche: "Ça glisse.",
        constat: "Un site de mobile money correct, mais qui ne raconte rien. Rien qui donne envie de payer avec.",
        fait: [
          "Un pingouin en 3D, construit entièrement en code, qui descend toute la page en glissant sur le ventre et change de pose à chaque section",
          "Un calculateur de frais à 1 % : la pile de billets sur sa tête grandit avec le montant",
          "Sénégal ou Côte d'Ivoire, français ou anglais : factures, agents et boutiques s'adaptent",
        ],
        stack: ["three.js", "JavaScript", "CSS", "Responsive"],
        site: "https://concept-wave.vercel.app/?pays=ci&lang=fr",
        code: "https://github.com/0xSylla/concept-wave",
        nonOfficiel: true,
      },
      {
        id: "yango",
        nom: "Yango",
        accroche: "Choisis ta course.",
        constat: "Le géant du transport en Afrique, avec un site statique qui fait le job sans prendre de risque.",
        fait: [
          "Un carrousel 3D de véhicules (modèles glTF) : on tourne, on choisit sa classe",
          "Départ et destination avec autocomplétion OpenStreetMap, itinéraire réel via OSRM",
          "Un prix estimé en direct, puis « Continuer dans l'appli »",
        ],
        stack: ["three.js", "glTF", "OpenStreetMap", "OSRM"],
        site: "https://concept-yango.vercel.app/choix.html?pays=ci",
        code: "https://github.com/0xSylla/concept-yango",
        nonOfficiel: true,
      },
      {
        id: "orange",
        nom: "Orange",
        accroche: "Le carré.",
        constat: "Au moins cinq sites différents selon le pays, un design daté et dix choses qui se passent en même temps.",
        fait: [
          "Un seul site pour toutes les filiales : tu choisis ton pays, c'est réglé",
          "Tout part du carré Orange, qui s'ouvre sur ta ville au défilement. Une idée par écran",
          "Orange Money expliqué en cinq étapes, et un mode Tabaski qui met le site à l'heure de la fête",
        ],
        stack: ["HTML", "CSS", "JavaScript", "Images IA"],
        site: "https://concept-orange.vercel.app/?pays=ci",
        code: "https://github.com/0xSylla/concept-orange",
        nonOfficiel: true,
      },
      {
        id: "ilios",
        nom: "Ilios Groupe",
        accroche: "De midi à la nuit.",
        constat: "Des appartements jusqu'à près d'un million d'euros, vendus avec cinq lignes en majuscules et onze onglets.",
        fait: [
          "Ilios, c'est le soleil en grec : au défilement, l'immeuble passe du jour à la nuit et s'allume",
          "Les onze résidences visibles d'un coup, avec des filtres",
          "Une vraie page par résidence et par appartement, en français et en anglais",
        ],
        stack: ["JavaScript", "CSS", "Images IA", "i18n"],
        site: "https://concept-ilios.vercel.app/",
        code: "https://github.com/0xSylla/concept-ilios",
        nonOfficiel: true,
      },
      {
        id: "defustel",
        nom: "Defustel",
        accroche: "Du fil à l'homme.",
        constat: "Montrer le travail d'une maison de tailleur, de la toile au costume fini, sans un seul shooting photo.",
        fait: [
          "Un film piloté par le défilement : chaque plan, généré par IA, s'enchaîne au rythme de la molette",
          "Sur téléphone, chaque plan a son propre recadrage vertical, centré sur le sujet",
          "Une boutique d'accessoires, avec langue et devise au choix",
        ],
        stack: ["GSAP", "ScrollTrigger", "Vidéo IA", "Node.js"],
        site: "https://concept-defustel.vercel.app/",
        code: "https://github.com/0xSylla/concept-defustel",
        nonOfficiel: false,
      },
      {
        id: "nubian",
        nom: "Belle Nubian",
        accroche: "Soins pour toutes les carnations.",
        constat: "Transformer une maquette générée par IA en vraie boutique : rapide, filtrable, agréable sur téléphone.",
        fait: [
          "Un catalogue avec filtres, tri et pagination enregistrés dans l'adresse : chaque vue se partage",
          "Fiche produit en aperçu rapide, panier, favoris et choix de carnation",
          "Packshots produits générés par IA, CSS compilé avec Tailwind",
        ],
        stack: ["Tailwind CSS", "JavaScript", "Node.js", "Images IA"],
        site: "https://concept-nubian.vercel.app/",
        code: "https://github.com/0xSylla/concept-nubian",
        nonOfficiel: false,
      },
    ],
  },

  ugc: {
    num: "02",
    titre: "UGC IA",
    lead:
      "Des pubs vidéo au format UGC, générées par IA : le naturel d'un créateur qui parle face caméra, sans tournage. Pour tester plus d'angles publicitaires, plus vite.",
    cta: "Voir le studio UGC",
    ctaHref: "https://cherifsylla.xyz",
    son: "Activer le son",
    muet: "Couper le son",
    clips: ["clip-01", "clip-02", "clip-04", "clip-05", "clip-06", "clip-07", "clip-10", "clip-12"],
  },

  chain: {
    num: "03",
    titre: "Blockchain",
    lead:
      "Deux ans et demi en DeFi, du contrat au tableau de bord. Ingénieur blockchain principal chez Dirac Finance, protocole DeFi qui a levé plus d'un million de dollars. Chaque bloc ci-dessous se vérifie on-chain ou sur GitHub.",
    prod: "En production",
    projets: "Projets open source",
    verifier: "Vérifier",
    stackTitre: "Ma stack",
    blocs: [
      {
        titre: "Vaults ERC4626",
        contexte: "Dirac Finance · Berachain",
        chiffre: "46 000 $",
        chiffreLabel: "de TVL record, cumulée",
        texte:
          "Le problème : sur Berachain, le rendement était éparpillé entre plusieurs protocoles, et il fallait déplacer ses fonds et suivre chaque cycle de trading à la main. La solution : trois vaults évolutifs (proxy UUPS) où l'on dépose une seule fois, branchés sur Stryke, Kodiak, Dolomite, Orderly et le staking Infrared, avec des cycles de trading gérés par une machine à états. Puis une architecture modulaire pour ajouter Aave et Morpho.",
        stack: ["Solidity", "ERC4626", "UUPS", "Foundry"],
        adresse: "0x38e64273826B199cdf301E90989C28D10691A30e",
        liens: [
          { label: "Vault 1", href: "https://berascan.com/address/0x38e64273826B199cdf301E90989C28D10691A30e" },
          { label: "Vault 2", href: "https://berascan.com/address/0xAcbdc07Df88e8E6efF55FB147406c4e089ffa27B" },
          { label: "Vault 3", href: "https://berascan.com/address/0xBD3fA2675C3E79B73C14F80dDdF53894834BEe94" },
        ],
      },
      {
        titre: "NFT cross-chain",
        contexte: "Dirac Finance · Arbitrum → Berachain",
        chiffre: "100 000 $+",
        chiffreLabel: "de volume d'échanges",
        texte:
          "Le problème : faire passer une collection vivante d'Arbitrum à Berachain sans que les détenteurs perdent leurs NFT. La solution : une collection LayerZero ONFT721A et un bridge de migration sur mesure qui garde la propriété intacte. Avec une prévente à plusieurs niveaux, des royalties ERC-2981, un partage de revenus pour les affiliés et un mint par lots optimisé en gas.",
        stack: ["LayerZero", "ERC721A", "ERC-2981", "Bridge"],
        liens: [],
      },
      {
        titre: "Contrat d'ICO",
        contexte: "STONEFORM · BNB Chain · freelance",
        chiffre: "134+",
        chiffreLabel: "achats on-chain",
        texte:
          "Le problème : vendre un token on-chain à un prix juste et à jour, seulement aux acheteurs validés, sans que les investisseurs puissent tout revendre au lancement. La solution : un prix en dollars via oracle Chainlink, une autorisation par signature ECDSA, le paiement en BNB ou en ERC20 et un module de vesting. Côté sécurité : transfert d'admin en deux étapes, rôles séparés, retrait d'urgence. Et la dApp de prévente.",
        stack: ["Chainlink", "ECDSA", "Vesting", "dApp"],
        adresse: "0xc470e8691a9bcdc081db971615060a17b3577543",
        liens: [
          { label: "BscScan", href: "https://bscscan.com/address/0xc470e8691a9bcdc081db971615060a17b3577543#code" },
          { label: "STONEFORM", href: "https://x.com/ICOstoneform" },
        ],
      },
    ],
    side: [
      {
        titre: "Vault à routage de rendement",
        contexte: "Solidity · Foundry",
        chiffre: "", chiffreLabel: "",
        texte: "Résout un problème simple : le meilleur rendement change sans arrêt d'un protocole à l'autre, et on le rate si on ne déplace pas ses fonds soi-même. Ce vault ERC4626 répartit les dépôts et se rééquilibre seul vers le meilleur APY, sans fausser le prix des parts.",
        stack: ["ERC4626", "Foundry"],
        liens: [{ label: "GitHub", href: "https://github.com/0xSylla/ERC4626-Vault-with-Automated-Yield-Routing" }],
      },
      {
        titre: "Tirage cross-chain sans perte",
        contexte: "LayerZero · Chainlink VRF",
        chiffre: "", chiffreLabel: "",
        texte: "Résout le défaut des loteries : presque tout le monde y perd sa mise. Ici, seul le rendement des dépôts finance le lot, le capital reste remboursable, et le tirage est vérifiable (Chainlink VRF). Les dépôts de plusieurs chaînes sont regroupés via CCIP.",
        stack: ["CCIP", "VRF"],
        liens: [{ label: "GitHub", href: "https://github.com/0xSylla/No-Loss-Cross-Chain-Raffle" }],
      },
      {
        titre: "NFT imbriqués",
        contexte: "ERC-6551 · ERC-1155",
        chiffre: "", chiffreLabel: "",
        texte: "Résout un manque des NFT de jeu : un personnage ne peut pas posséder ses objets, qui restent éparpillés dans le wallet. Grâce aux comptes liés ERC-6551, le personnage (ERC-721) porte lui-même ses équipements (ERC-1155) : le vendre, c'est vendre aussi son équipement. Son image se compose en couches.",
        stack: ["ERC-6551", "ERC-1155"],
        liens: [{ label: "GitHub", href: "https://github.com/0xSylla/Nestable-ERC721" }],
      },
      {
        titre: "MintShield",
        contexte: "Launchpad NFT anti-bot",
        chiffre: "", chiffreLabel: "",
        texte: "Un launchpad NFT conçu pour régler le problème des bots pendant les mints, qui raflent l'offre avant les vrais collectionneurs. Mint autorisé par signature, quotas par wallet et liste blanche vérifiée par preuve de Merkle.",
        stack: ["Merkle", "EIP-191"],
        liens: [{ label: "GitHub", href: "https://github.com/0xSylla/MintShield-Scalable_AntiBot_System_For_NFTs_Mints" }],
      },
      {
        titre: "NodePad Terminal",
        contexte: "Jeu on-chain · Base",
        chiffre: "", chiffreLabel: "",
        texte: "Résout le manque de transparence des jeux « crypto » dont les règles tournent sur un serveur. Ici, toute la logique et les récompenses sont on-chain : tu gères des nœuds virtuels pour gagner des tokens. L'architecture Diamond (ERC-2535) permet de dépasser la limite de taille d'un contrat et d'ajouter des fonctions. Interface CRT rétro.",
        stack: ["ERC-2535", "Base"],
        liens: [
          { label: "GitHub", href: "https://github.com/0xSylla/NodePad-DiamondPattern-Version" },
          { label: "Démo", href: "https://nodepad-cyan.vercel.app" },
        ],
      },
    ],
    stack: [
      { groupe: "Smart contracts", items: ["Solidity", "ERC4626", "ERC721A", "ERC1155", "ERC-6551", "UUPS", "Diamond", "OpenZeppelin", "LayerZero", "Chainlink"] },
      { groupe: "DeFi", items: ["Aave", "Morpho", "Dolomite", "Kodiak", "Stryke", "Orderly", "Infrared"] },
      { groupe: "Sécurité & outils", items: ["Foundry", "Hardhat", "Slither", "Fuzzing", "The Graph", "Dune"] },
      { groupe: "Full stack", items: ["Next.js", "React", "TypeScript", "Node.js", "wagmi", "viem", "ethers.js"] },
    ],
  },

  net: {
    num: "04",
    titre: "Réseau",
    lead: "Là où tout a commencé : un master en réseaux et télécommunications.",
    bientot: "Bientôt",
    texte: "Cette partie arrive. Des labs, des topologies et des configurations, présentés avec le même soin que le reste.",
    points: ["Routage & commutation", "Topologies", "Sécurité réseau"],
  },

  parcours: {
    titre: "Parcours",
    items: [
      { quand: "2024 — aujourd'hui", quoi: "Ingénieur blockchain principal", ou: "Dirac Finance" },
      { quand: "2026", quoi: "Ingénieur blockchain freelance", ou: "STONEFORM" },
      { quand: "2022 — 2023", quoi: "Master en ingénierie financière", ou: "Supmanagement" },
      { quand: "2018 — 2019", quoi: "Master réseaux et télécommunications", ou: "EPSIEL" },
    ],
    langues: "Français (natif) · Anglais (courant) · Télétravail",
  },

  contact: {
    titre: "On construit quoi ?",
    lead: "Un smart contract, un site ou une campagne vidéo : écris-moi, je réponds vite.",
    email: "cherifsylla21@gmail.com",
    cv: "Télécharger mon CV",
    cvHref: "/cv/Cherif-Sylla-CV-FR.pdf",
    rdv: "Réserver un appel",
    rdvHref: "https://calendly.com/cherifsylla21/30min",
    liens: [
      { label: "GitHub", href: "https://github.com/0xSylla" },
      { label: "X", href: "https://x.com/0x_orom" },
      { label: "Telegram", href: "https://t.me/OxSylla" },
    ],
  },

  piece: {
    intro: "Bienvenue dans mon bureau.",
    astuce: "Clique sur un objet de la pièce pour explorer.",
    classique: "Version classique",
    fermer: "Fermer",
    explorer: "Explorer",
    sans3d: "Ton navigateur n'affiche pas la 3D. Voici la version classique.",
    zones: { web: "Web 2 · l'écran", ugc: "UGC IA · la caméra", chain: "Blockchain · les blocs", net: "Réseau · la baie", parcours: "Parcours · les diplômes", contact: "Contact · le néon" },
  },
  pied: "Les refontes de Wave, Yango, Orange et Ilios sont des concepts personnels, sans lien avec ces marques.",
};
