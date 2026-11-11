import type { Contenu } from "./types";
import { fr } from "./fr";

/* English version. Links, ids and addresses are reused from fr.ts. */
const w = fr.web.projets;
const b = fr.chain.blocs;
const s = fr.chain.side;

export const en: Contenu = {
  lang: "en",
  meta: {
    title: "Cherif Sylla — Blockchain engineer, web developer, AI UGC creator",
    description:
      "Smart contracts in production, websites people want to scroll, and AI-generated video ads. Cherif Sylla's portfolio.",
  },
  nav: { web: "Web 2", ugc: "AI UGC", chain: "Blockchain", net: "Network", contact: "Contact" },
  langue: { label: "FR", href: "/", aria: "Voir le site en français" },

  hero: {
    salut: "Hi, I'm",
    nom: "Cherif Sylla",
    nomComplet: "Ousmane Cherif Sylla",
    roles: ["Blockchain engineer", "Web developer", "AI UGC creator", "Networks & telecoms"],
    lead:
      "I build smart contracts that hold up in production, websites people actually want to scroll, and AI-generated video ads. Four crafts, one habit: connecting everything.",
    ctaTravaux: "See my work",
    ctaContact: "Get in touch",
    noeuds: { web: "Web 2", ugc: "AI UGC", chain: "Blockchain", net: "Network" },
    astuce: "Click a node",
    satellites: { web: ["three.js", "Next.js", "GSAP"], ugc: ["AI video", "Scripts", "Ads"], chain: ["Solidity", "DeFi", "LayerZero"], net: ["Routing", "TCP/IP", "Security"] },
  },

  chiffres: [
    { v: "$46,000", l: "peak TVL across 3 ERC4626 vaults" },
    { v: "$100,000+", l: "trading volume on a cross-chain NFT collection" },
    { v: "134+", l: "transactions on a production ICO contract" },
    { v: "6", l: "website redesigns, live" },
  ],

  web: {
    num: "01",
    titre: "Web 2",
    lead:
      "I take websites from brands everyone knows and rebuild them the way I would have: one strong idea, a common thread, and the same care on mobile as on desktop.",
    labels: {
      constat: "Starting point",
      fait: "What I built",
      site: "Visit the site",
      code: "Code",
      nonOfficiel: "Unofficial concept",
      concept: "Concept",
      ordi: "Desktop",
      tel: "Mobile",
    },
    projets: [
      {
        ...w[0],
        accroche: "Ça glisse. (It slides.)",
        constat: "A decent mobile money site that tells no story. Nothing that makes you want to pay with it.",
        fait: [
          "A 3D penguin, built entirely in code, that slides down the whole page on its belly and strikes a new pose in every section",
          "A 1% fee calculator: the stack of bills on its head grows with the amount",
          "Senegal or Côte d'Ivoire, French or English: bills, agents and app stores adapt",
        ],
        site: "https://concept-wave.vercel.app/?pays=ci&lang=en",
      },
      {
        ...w[1],
        accroche: "Pick your ride.",
        constat: "Africa's ride-hailing giant, with a static site that does the job without taking any risk.",
        fait: [
          "A 3D vehicle carousel (glTF models): spin it, pick your class",
          "Pickup and destination with OpenStreetMap autocomplete, real routes from OSRM",
          "A live price estimate, then “Continue in the app”",
        ],
      },
      {
        ...w[2],
        accroche: "The square.",
        constat: "At least five different sites depending on the country, a dated design and ten things happening at once.",
        fait: [
          "One site for every subsidiary: pick your country and you're done",
          "Everything starts from the Orange square, which opens onto your city as you scroll. One idea per screen",
          "Orange Money explained in five steps, and a Tabaski mode that puts the site in festive mood",
        ],
        stack: ["HTML", "CSS", "JavaScript", "AI images"],
      },
      {
        ...w[3],
        accroche: "From noon to night.",
        constat: "Apartments priced up to nearly a million euros, sold with five lines of capitals and eleven tabs.",
        fait: [
          "Ilios means sun in Greek: as you scroll, the building goes from day to night and lights up",
          "All eleven residences at a glance, with filters",
          "A real page for every residence and apartment, in French and English",
        ],
        stack: ["JavaScript", "CSS", "AI images", "i18n"],
      },
      {
        ...w[4],
        accroche: "From thread to man.",
        constat: "Show a tailoring house's craft, from canvas to finished suit, without a single photo shoot.",
        fait: [
          "A scroll-driven film: each AI-generated shot plays out to the rhythm of the wheel",
          "On mobile, every shot gets its own vertical crop, centred on the subject",
          "An accessories shop, with language and currency switches",
        ],
        stack: ["GSAP", "ScrollTrigger", "AI video", "Node.js"],
      },
      {
        ...w[5],
        accroche: "Skincare for every skin tone.",
        constat: "Turn an AI-generated mockup into a real shop: fast, filterable and pleasant on mobile.",
        fait: [
          "A catalogue with filters, sorting and pagination stored in the URL: every view is shareable",
          "Quick-view product sheets, cart, favourites and skin-tone picker",
          "AI-generated product packshots, CSS compiled with Tailwind",
        ],
        stack: ["Tailwind CSS", "JavaScript", "Node.js", "AI images"],
      },
    ],
  },

  ugc: {
    ...fr.ugc,
    titre: "AI UGC",
    lead:
      "UGC-style video ads, generated with AI: the natural feel of a creator talking to camera, with no shoot. To test more ad angles, faster.",
    cta: "Visit the UGC studio",
    son: "Unmute",
    muet: "Mute",
  },

  chain: {
    ...fr.chain,
    lead:
      "Two and a half years in DeFi, from contract to dashboard. Lead blockchain engineer at Dirac Finance, a DeFi protocol that raised over $1M. Every block below can be checked on-chain or on GitHub.",
    prod: "In production",
    projets: "Open-source projects",
    verifier: "Verify",
    stackTitre: "My stack",
    blocs: [
      {
        ...b[0],
        chiffre: "$46,000",
        chiffreLabel: "combined peak TVL",
        texte:
          "Three upgradeable vaults (UUPS proxy) on mainnet, wired into Stryke, Kodiak, Dolomite, Orderly and Infrared staking, with trading cycles run as a state machine. Then the move to a modular architecture adding Aave and Morpho.",
      },
      {
        ...b[1],
        titre: "Cross-chain NFT",
        chiffre: "$100,000+",
        chiffreLabel: "trading volume",
        texte:
          "A LayerZero ONFT721A collection on Arbitrum, then a custom migration bridge to Berachain that keeps ownership intact. Multi-tier presale, ERC-2981 royalties, affiliate revenue sharing, gas-optimised batch minting.",
      },
      {
        ...b[2],
        titre: "ICO contract",
        chiffreLabel: "on-chain purchases",
        texte:
          "Chainlink oracle pricing, backend authorisation via ECDSA signatures, payment in BNB or ERC20. Two-step admin transfer, separate roles, emergency withdrawal, a vesting module, and the presale dApp.",
      },
    ],
    side: [
      { ...s[0], titre: "Yield-routing vault", texte: "An ERC4626 vault that spreads deposits across several protocols and rebalances towards the best APY without breaking the share price." },
      { ...s[1], titre: "No-loss cross-chain raffle", texte: "Yield from deposits funds the prize while principal stays fully redeemable. Cross-chain aggregation via CCIP, verifiable draws via VRF." },
      { ...s[2], titre: "Nestable NFTs", texte: "ERC-721 characters wearing ERC-1155 gear through ERC-6551 token-bound accounts, with layered image composition." },
      { ...s[3], contexte: "Anti-bot NFT launchpad", texte: "Signature-gated minting, per-wallet quotas and Merkle-proof allowlists." },
      { ...s[4], contexte: "On-chain game · Base", texte: "A fully on-chain idle strategy game: run virtual nodes to earn tokens. Diamond architecture, retro CRT interface.", liens: [s[4].liens[0], { label: "Demo", href: s[4].liens[1].href }] },
    ],
    stack: [
      fr.chain.stack[0],
      fr.chain.stack[1],
      { groupe: "Security & tooling", items: fr.chain.stack[2].items },
      fr.chain.stack[3],
    ],
  },

  net: {
    num: "04",
    titre: "Network",
    lead: "Where it all started: a master's degree in networks and telecommunications.",
    bientot: "Coming soon",
    texte: "This section is on its way. Labs, topologies and configurations, shown with the same care as the rest.",
    points: ["Routing & switching", "Topologies", "Network security"],
  },

  parcours: {
    titre: "Background",
    items: [
      { quand: "2024 — now", quoi: "Lead blockchain engineer", ou: "Dirac Finance" },
      { quand: "2026", quoi: "Freelance blockchain engineer", ou: "STONEFORM" },
      { quand: "2022 — 2023", quoi: "Master's in financial engineering", ou: "Supmanagement" },
      { quand: "2018 — 2019", quoi: "Master's in networks and telecoms", ou: "EPSIEL" },
    ],
    langues: "French (native) · English (fluent) · Remote",
  },

  contact: {
    ...fr.contact,
    titre: "What are we building?",
    lead: "A smart contract, a website or a video campaign: drop me a line, I reply fast.",
    cv: "Download my CV",
    cvHref: "/cv/Cherif-Sylla-CV-EN.pdf",
    rdv: "Book a call",
  },

  piece: {
    intro: "Welcome to my office.",
    astuce: "Click any object in the room to explore.",
    classique: "Classic version",
    fermer: "Close",
    explorer: "Explore",
    sans3d: "Your browser can't display 3D. Here is the classic version.",
    zones: { web: "Web 2 · the screen", ugc: "AI UGC · the camera", chain: "Blockchain · the blocks", net: "Network · the rack", parcours: "Background · the diplomas", contact: "Contact · the neon" },
  },
  pied: "The Wave, Yango, Orange and Ilios redesigns are personal concepts, not affiliated with those brands.",
};
