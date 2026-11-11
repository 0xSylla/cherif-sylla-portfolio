/* Partie « Sécurité » de l'onglet Blockchain : revues d'audit indépendantes.
   Source : Personal Builds/Seeking Job/audits (rapports d'Ousmane). AfriCred exclu (protocole personnel),
   Plether exclu (compétition Immunefi en cours jusqu'au 15/11/2026).
   Règle de publication : les rapports ont été envoyés aux équipes, mais tant qu'une faille n'est pas confirmée corrigée,
   on n'affiche que le type d'impact, jamais la fonction vulnérable ni le mécanisme. Les cibles sous programme de bounty
   (Nado, Pinto) sont anonymisées jusqu'à la clôture. */

type Gravite = "High" | "Medium" | "Low";
type Faille = { nom: string; ou: { fr: string; en: string }; gravites: [Gravite, number][]; impact: { fr: string; en: string }; preuve: { fr: string; en: string }; bounty?: boolean };

const FAILLES: Faille[] = [
  { nom: "VisionBoard", ou: { fr: "HyperEVM · vault de perps", en: "HyperEVM · perps vault" }, gravites: [["High", 1]], impact: { fr: "Insolvabilité du vault", en: "Vault insolvency" }, preuve: { fr: "PoC Foundry", en: "Foundry PoC" } },
  { nom: "NOME", ou: { fr: "Berachain · stablecoin algorithmique", en: "Berachain · algorithmic stablecoin" }, gravites: [["High", 1]], impact: { fr: "Vol de récompenses de staking", en: "Staking reward theft" }, preuve: { fr: "PoC sur fork du réseau", en: "Mainnet-fork PoC" } },
  { nom: "Orion Finance", ou: { fr: "ZK (SP1) · gestion de fonds on-chain", en: "ZK (SP1) · on-chain fund manager" }, gravites: [["High", 1], ["Low", 1]], impact: { fr: "Gel permanent du protocole", en: "Permanent protocol freeze" }, preuve: { fr: "PoC Hardhat", en: "Hardhat PoC" } },
  { nom: "StockFi", ou: { fr: "BNB Chain · CDP sur actions tokenisées", en: "BNB Chain · tokenized-stock CDP" }, gravites: [["High", 2]], impact: { fr: "Prix d'oracle obsolète, vault bloqué", en: "Stale oracle price, bricked vault" }, preuve: { fr: "PoC sur fork du réseau", en: "Mainnet-fork PoC" } },
  { nom: "NFTStrategy (TokenWorks)", ou: { fr: "Ethereum · NFTfi", en: "Ethereum · NFTfi" }, gravites: [["High", 1], ["Medium", 1]], impact: { fr: "Perte de fonds du protocole", en: "Protocol fund loss" }, preuve: { fr: "PoC sur fork du réseau", en: "Mainnet-fork PoC" } },
  { nom: "BakerDAO (BREAD)", ou: { fr: "Berachain · courbe à levier", en: "Berachain · leveraged bonding curve" }, gravites: [["High", 1], ["Low", 3]], impact: { fr: "Désynchronisation du staking (latente)", en: "Staking desync (latent)" }, preuve: { fr: "Vérifié dans le code", en: "Verified in code" } },
  { nom: "Goldilocks", ou: { fr: "Berachain · prêt", en: "Berachain · lending" }, gravites: [["Medium", 1]], impact: { fr: "Intérêts non facturés", en: "Uncharged interest" }, preuve: { fr: "PoC sur fork du réseau", en: "Mainnet-fork PoC" } },
  { nom: "Longinus (Anubis)", ou: { fr: "Fork OlympusDAO", en: "OlympusDAO fork" }, gravites: [["Medium", 1]], impact: { fr: "Plafond de récompenses contourné", en: "Reward cap bypass" }, preuve: { fr: "Vérifié dans le code", en: "Verified in code" } },
  { nom: "FWAV2 (TokenWorks)", ou: { fr: "Ethereum · NFT et RWA", en: "Ethereum · NFT & RWA" }, gravites: [["Medium", 3]], impact: { fr: "Incitations économiques détournables", en: "Gameable economic incentives" }, preuve: { fr: "Vérifié dans le code", en: "Verified in code" } },
  { nom: "FWA Floor Oracle (TokenWorks)", ou: { fr: "Ethereum · oracle", en: "Ethereum · oracle" }, gravites: [["Medium", 3]], impact: { fr: "Manipulation du prix plancher", en: "Floor price manipulation" }, preuve: { fr: "PoC local", en: "Local PoC" } },
  { nom: "FWAV2 Rewards (TokenWorks)", ou: { fr: "Ethereum · récompenses (Uniswap V4)", en: "Ethereum · rewards (Uniswap V4)" }, gravites: [["Low", 1]], impact: { fr: "Répartition des récompenses biaisée", en: "Skewed reward weighting" }, preuve: { fr: "Vérifié dans le code", en: "Verified in code" } },
  { nom: "Arcadia Finance", ou: { fr: "Base · OP · Unichain · marge et prêt", en: "Base · OP · Unichain · margin & lending" }, gravites: [["Low", 1]], impact: { fr: "Validation de signature trop permissive", en: "Over-permissive signature check" }, preuve: { fr: "PoC sur fork du réseau", en: "Mainnet-fork PoC" } },
  { nom: "", ou: { fr: "L2 · DEX de perps", en: "L2 · perps DEX" }, gravites: [["High", 1], ["Medium", 1]], impact: { fr: "Perte de fonds utilisateurs, blocage", en: "User fund loss, liveness" }, preuve: { fr: "PoC sur le bytecode réel", en: "Real-bytecode PoC" }, bounty: true },
  { nom: "", ou: { fr: "L2 · stablecoin", en: "L2 · stablecoin" }, gravites: [["High", 2], ["Medium", 4]], impact: { fr: "Arrêt du protocole (latent)", en: "Protocol halt (latent)" }, preuve: { fr: "PoC", en: "PoC" }, bounty: true },
];

// revues sans faille exploitable, sans piste ouverte (montrent la rigueur sans exposer personne)
const PROPRES = ["Beradrome", "Berafarm", "Bitty Vaults", "Roots", "Neverland", "BrownFi", "Yuzu Money", "HASHCATS", "Revert / Krystal"];

const total = (g: Gravite) => FAILLES.reduce((n, f) => n + f.gravites.filter(([x]) => x === g).reduce((a, [, k]) => a + k, 0), 0);

export default function Securite({ fr }: { fr: boolean }) {
  const L = fr ? "fr" : "en";
  const chiffres = [
    { v: "30", l: fr ? "revues de sécurité indépendantes" : "independent security reviews" },
    { v: String(total("High")), l: fr ? "failles High trouvées" : "High findings" },
    { v: String(total("Medium")), l: fr ? "failles Medium" : "Medium findings" },
    { v: "11", l: fr ? "cibles avec un PoC reproductible" : "targets with a runnable PoC" },
  ];
  const methode = fr
    ? [["Lecture manuelle", "Tout le périmètre, fonction par fonction."], ["12 agents spécialisés", "Chacun attaque sous un angle : oracle, comptabilité, accès, réentrance…"], ["Vérification dans le code", "Chaque piste est confirmée ou écartée à la main."], ["Preuve", "Un test Foundry ou Hardhat qui reproduit la faille, souvent sur un fork du réseau."]]
    : [["Manual review", "The whole scope, function by function."], ["12 specialised agents", "Each attacks from one angle: oracle, accounting, access, reentrancy…"], ["Verification in code", "Every lead is confirmed or ruled out by hand."], ["Proof", "A Foundry or Hardhat test that reproduces the bug, often on a mainnet fork."]];
  return (
    <>
      <h3 className="b-sous">{fr ? "Sécurité · audits indépendants" : "Security · independent audits"}</h3>
      <p className="b-lead">{fr
        ? "Je passe aussi de l'autre côté : je relis des protocoles DeFi en ligne pour y chercher ce qui peut faire perdre de l'argent (vol, insolvabilité, gel), et je le prouve par un test avant de le signaler à l'équipe."
        : "I also work the other side: I review live DeFi protocols looking for anything that can lose money (theft, insolvency, freezes), and prove it with a test before reporting it to the team."}</p>
      <ul className="b-secu-chiffres">{chiffres.map(c => <li key={c.l}><strong>{c.v}</strong><span>{c.l}</span></li>)}</ul>
      <ol className="b-secu-methode">{methode.map(([t, d], i) => <li key={t} className="b-ere-carte"><span className="b-diplome__an">0{i + 1}</span><p className="b-ere-carte__nom">{t}</p><p className="b-ere-carte__desc">{d}</p></li>)}</ol>
      <ul className="b-secu-liste">
        {FAILLES.map((f, i) => (
          <li key={i} className="b-ere-carte b-secu-faille">
            <div className="b-secu-faille__tete">
              <p className="b-ere-carte__nom">{f.bounty ? (fr ? "Protocole sous bounty" : "Protocol under bounty") : f.nom}</p>
              <span className="b-secu-gravites">{f.gravites.map(([g, n]) => <span key={g} className={`b-grav b-grav--${g.toLowerCase()}`}>{n > 1 ? `${n}× ` : ""}{g}</span>)}</span>
            </div>
            <p className="b-ere-carte__role">{f.ou[L]}</p>
            <p className="b-secu-faille__impact">{f.impact[L]}</p>
            <p className="b-secu-faille__pied"><span>{f.preuve[L]}</span><span className="b-secu-statut">{f.bounty ? (fr ? "Signalé · détails après clôture" : "Reported · details after closure") : (fr ? "Signalé à l'équipe" : "Reported to the team")}</span></p>
          </li>
        ))}
      </ul>
      <p className="b-mono b-gris b-secu-propres"><span className="b-rouge">{fr ? "Revues sans faille exploitable :" : "Reviews with no exploitable bug:"}</span> {PROPRES.join(" · ")}</p>
      <p className="b-mono b-gris">{fr
        ? "Par divulgation responsable, le détail technique de chaque faille sera publié une fois corrigée. Rapports complets sur demande."
        : "Under responsible disclosure, the technical details of each finding will be published once fixed. Full reports on request."}</p>
    </>
  );
}
