/* Le portfolio, style néo-brutaliste : fond en trame de points, cartes à bordure blanche et ombre décalée. */
import type { Contenu } from "@/content/types";
import Fond from "./Fond";
import { Mot, Nav, Video } from "./Vivant";
import { RESEAUX } from "./Glyphes";
import Stack from "./Stack";
import Onglets from "./Onglets";
import Experience, { type Ere } from "./Experience";

const STACK: { k: string; href: string; nom: string; teinte: string; fr: [string, string]; en: [string, string] }[] = [
  { k: "solidity", href: "https://soliditylang.org", nom: "Solidity", teinte: "#3d7bd9", fr: ["Smart contracts", "Contrats en production"], en: ["Smart contracts", "Contracts in production"] },
  { k: "foundry", href: "https://getfoundry.sh", nom: "Foundry", teinte: "#c9a227", fr: ["Tests", "Tests, fuzzing et déploiement"], en: ["Testing", "Tests, fuzzing and deploys"] },
  { k: "layerzero", href: "https://layerzero.network", nom: "LayerZero", teinte: "#9aa4b8", fr: ["Cross-chain", "NFT et messages entre chaînes"], en: ["Cross-chain", "NFTs and messages across chains"] },
  { k: "chainlink", href: "https://chain.link", nom: "Chainlink", teinte: "#4a6cf7", fr: ["Oracles", "Prix et tirages vérifiables"], en: ["Oracles", "Price feeds and verifiable draws"] },
  { k: "nextjs", href: "https://nextjs.org", nom: "Next.js", teinte: "#d6d6d6", fr: ["Framework", "Sites et dApps"], en: ["Framework", "Websites and dApps"] },
  { k: "threejs", href: "https://threejs.org", nom: "three.js", teinte: "#2ec4b6", fr: ["3D", "Scènes 3D dans le navigateur"], en: ["3D", "3D scenes in the browser"] },
  { k: "typescript", href: "https://www.typescriptlang.org", nom: "TypeScript", teinte: "#3178c6", fr: ["Langage", "Code typé, front et back"], en: ["Language", "Typed code, front and back"] },
  { k: "ugc", href: "https://cherifsylla.xyz", nom: "Vidéo IA", teinte: "#e2574c", fr: ["UGC", "Pubs vidéo générées par IA"], en: ["UGC", "AI-generated video ads"] },
];

/* Postes, regroupés par « ère » (du plus récent au plus ancien). Sources : CV, dépôt du studio UGC (créé en août 2026). */
const BERASCAN = "https://berascan.com/address/0x38e64273826B199cdf301E90989C28D10691A30e";
const BSCSCAN = "https://bscscan.com/address/0xc470e8691a9bcdc081db971615060a17b3577543#code";
const ERES: { fr: Ere[]; en: Ere[] } = {
  fr: [
    { titre: "AI Era", postes: [
      { entreprise: "AI UGC Studio", role: "Fondateur · créateur UGC IA", dates: "août 2026 – aujourd'hui", desc: "Des pubs vidéo au format UGC générées par IA pour les marques : scripts, voix, montage et déclinaisons pour tester plus d'angles, plus vite.", liens: [{ k: "Web", href: "https://cherifsylla.xyz", label: "cherifsylla.xyz" }] },
    ] },
    { titre: "Web3 Era", postes: [
      { entreprise: "Dirac Finance", role: "Ingénieur blockchain principal", dates: "mai 2024 – aujourd'hui", desc: "Conception et déploiement mainnet sur Berachain et Arbitrum : 3 vaults ERC4626 (46 000 $ de TVL record), collection NFT cross-chain LayerZero (100 000 $+ de volume) et son bridge de migration, intégrations DeFi, dApps Next.js et tableaux de bord Dune.", liens: [{ k: "Web", href: "https://dirac.finance", label: "dirac.finance" }, { k: "Scan", href: BERASCAN, label: "Berascan" }] },
      { entreprise: "STONEFORM", role: "Ingénieur blockchain freelance", dates: "janvier 2026", desc: "Contrat d'ICO en production sur BNB Chain : prix via oracle Chainlink, autorisation ECDSA, paiement en BNB ou ERC20, module de vesting et dApp de prévente. 134+ achats on-chain.", liens: [{ k: "X", href: "https://x.com/ICOstoneform", label: "STONEFORM sur X" }, { k: "Scan", href: BSCSCAN, label: "BscScan" }] },
    ] },
  ],
  en: [
    { titre: "AI Era", postes: [
      { entreprise: "AI UGC Studio", role: "Founder · AI UGC creator", dates: "Aug 2026 – now", desc: "AI-generated UGC-style video ads for brands: scripts, voice, editing and variations to test more ad angles, faster.", liens: [{ k: "Web", href: "https://cherifsylla.xyz", label: "cherifsylla.xyz" }] },
    ] },
    { titre: "Web3 Era", postes: [
      { entreprise: "Dirac Finance", role: "Lead Blockchain Engineer", dates: "May 2024 – now", desc: "End-to-end design and mainnet deployment on Berachain and Arbitrum: 3 ERC4626 vaults ($46,000 peak TVL), a LayerZero cross-chain NFT collection ($100,000+ volume) and its migration bridge, DeFi integrations, Next.js dApps and Dune dashboards.", liens: [{ k: "Web", href: "https://dirac.finance", label: "dirac.finance" }, { k: "Scan", href: BERASCAN, label: "Berascan" }] },
      { entreprise: "STONEFORM", role: "Freelance Blockchain Engineer", dates: "Jan 2026", desc: "Production ICO contract on BNB Chain: Chainlink oracle pricing, ECDSA authorisation, BNB or ERC20 payments, a vesting module and the presale dApp. 134+ on-chain purchases.", liens: [{ k: "X", href: "https://x.com/ICOstoneform", label: "STONEFORM on X" }, { k: "Scan", href: BSCSCAN, label: "BscScan" }] },
    ] },
  ],
};

const DIPLOMES = [
  { quand: "2022 — 2023", fr: "Master en ingénierie financière", en: "Master's in Financial Engineering", ecole: "Supmanagement" },
  { quand: "2018 — 2019", fr: "Master réseaux et télécommunications", en: "Master's in Networks and Telecommunications", ecole: "EPSIEL" },
];

const Fl = () => <span className="b-fl" aria-hidden="true">↗</span>;
const court = (a: string) => `${a.slice(0, 6)}…${a.slice(-4)}`;
const Titre = ({ id, children }: { id?: string; children: React.ReactNode }) => <h2 className="b-titre" id={id}>{children}</h2>;

export default function Brut({ c }: { c: Contenu }) {
  const fr = c.lang === "fr";
  const nav = [
    { id: "accueil", label: fr ? "Accueil" : "Home" },
    { id: "projets", label: fr ? "Projets" : "Projects" },
    { id: "experience", label: fr ? "Expérience" : "Experience" },
    { id: "formation", label: fr ? "Formation" : "Background" },
    { id: "contact", label: c.nav.contact },
  ];
  const reseaux = [
    { k: "X", href: "https://x.com/0x_orom", c: "#1d9bf0" },
    { k: "Telegram", href: "https://t.me/OxSylla", c: "#0088cc" },
    { k: "GitHub", href: "https://github.com/0xSylla", c: "#6e40c9" },
    { k: "Mail", href: `mailto:${c.contact.email}`, c: "#e2574c" },
    { k: "Calendly", href: c.contact.rdvHref, c: "#006bff" },
    { k: "CV", href: c.contact.cvHref, c: "#2ee59d" },
  ];
  return (
    <div className="brut">
      <Fond />
      <Nav items={nav} cv={c.contact.cvHref} cvLabel="CV" langue={c.langue} />

      <main>
        {/* ——— Accueil ——— */}
        <section id="accueil" className="b-hero">
          <p className="b-hero__salut">{fr ? "Salut !" : "Hi!"} <span className="b-main" aria-hidden="true">👋🏻</span> {fr ? "Moi c'est" : "I'm"}</p>
          <h1 className="b-hero__nom">{c.hero.nomComplet}</h1>
          <p className="b-hero__role">Blockchain &amp; AI <Mot de="Advisor" vers="Addict" />, Network Engineer</p>
          <ul className="b-reseaux">
            {reseaux.map(r => (
              <li key={r.k}><a className="b-carre" style={{ ["--rs" as string]: r.c }} href={r.href} target={r.k === "Mail" || r.k === "CV" ? undefined : "_blank"} rel="noopener" download={r.k === "CV" ? true : undefined} aria-label={r.k} title={r.k}><span className="b-carre__fond" aria-hidden="true" />{RESEAUX[r.k]}</a></li>
            ))}
          </ul>
        </section>

        {/* ——— Stack ——— */}
        <section className="b-sec" aria-labelledby="t-stack">
          <Titre id="t-stack">{fr ? "La stack" : "The stack"}</Titre>
          <Stack
            outils={STACK.map(o => ({ k: o.k, nom: o.nom, teinte: o.teinte, href: o.href, cat: (fr ? o.fr : o.en)[0], desc: (fr ? o.fr : o.en)[1] }))}
            prec={fr ? "Carte précédente" : "Previous card"} suiv={fr ? "Carte suivante" : "Next card"} />
        </section>

        {/* ——— Projets : 4 onglets ——— */}
        <section id="projets" className="b-sec">
          <Titre>{fr ? "Projets" : "Projects"}</Titre>
          <Onglets titre={fr ? "Catégories de projets" : "Project categories"} onglets={[
            { id: "ai", label: "AI", nb: c.ugc.clips.length, contenu: (<>
          <p className="b-lead">{c.ugc.lead}</p>
          <ul className="b-clips">
            {c.ugc.clips.map(k => (
              <li key={k} className="b-boite b-clip"><Video src={`/media/ugc/${k}.mp4`} poster={`/media/ugc/${k}.jpg`} survol={false} /></li>
            ))}
          </ul>
          <p className="b-suite"><a className="b-boite b-bouton" href={c.ugc.ctaHref} target="_blank" rel="noopener">{c.ugc.cta} <Fl /></a></p>
            </>) },
            { id: "chain", label: "Blockchain", nb: c.chain.blocs.length + c.chain.side.length, contenu: (<>
          <p className="b-lead">{c.chain.lead}</p>
          <h3 className="b-sous">{c.chain.prod}</h3>
          <ul className="b-grille b-grille--3">
            {c.chain.blocs.map((b, i) => (
              <li key={b.titre} className="b-boite b-carte b-carte--bloc">
                <div className="b-carte__tete"><span className="b-mono">BLOCK #{String(i + 1).padStart(2, "0")}</span><span className="b-mono b-gris">{b.adresse ? court(b.adresse) : "—"}</span></div>
                <strong className="b-chiffre">{b.chiffre}</strong>
                <span className="b-carte__txt">{b.chiffreLabel}</span>
                <h4>{b.titre}</h4>
                <p className="b-mono b-gris">{b.contexte}</p>
                <p className="b-carte__txt">{b.texte}</p>
                <div className="b-carte__pied">
                  <ul className="b-puces">{b.stack.map(s => <li key={s}>{s}</li>)}</ul>
                  {b.liens.length > 0 && <span className="b-carte__liens">{b.liens.map(l => <a key={l.href} href={l.href} target="_blank" rel="noopener">{l.label}</a>)}</span>}
                </div>
              </li>
            ))}
          </ul>
          <h3 className="b-sous">{c.chain.projets}</h3>
          <ul className="b-grille">
            {c.chain.side.map(b => (
              <li key={b.titre} className="b-boite b-carte">
                <div className="b-carte__tete"><h4><a href={b.liens[0].href} target="_blank" rel="noopener">{b.titre}<Fl /></a></h4></div>
                <p className="b-carte__txt">{b.texte}</p>
                <div className="b-carte__pied">
                  <ul className="b-puces">{b.stack.map(s => <li key={s}>{s}</li>)}</ul>
                  <span className="b-carte__liens">{b.liens.map(l => <a key={l.href} href={l.href} target="_blank" rel="noopener">{l.label}</a>)}</span>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="b-sous">{c.chain.stackTitre}</h3>
          <div className="b-boite b-panneau b-stacktxt">
            {c.chain.stack.map(g => <p key={g.groupe}><span className="b-rouge">{g.groupe}</span> {g.items.join(" · ")}</p>)}
          </div>
            </>) },
            { id: "web", label: "Web 2", nb: c.web.projets.length, contenu: (<>
          <p className="b-lead">{c.web.lead}</p>
          <ul className="b-grille">
            {c.web.projets.map(p => (
              <li key={p.id} className="b-boite b-carte b-carte--media">
                <div className="b-carte__tete">
                  <h3><a href={p.site} target="_blank" rel="noopener">{p.nom}<Fl /></a></h3>
                  <span className="b-tag">{p.nonOfficiel ? c.web.labels.nonOfficiel : c.web.labels.concept}</span>
                </div>
                <p className="b-carte__accroche">{fr ? `« ${p.accroche} »` : `“${p.accroche}”`}</p>
                <p className="b-carte__txt">{p.constat}</p>
                <div className="b-media">
                  <Video className="b-media__d" src={`/media/web/${p.id}-d.mp4`} poster={`/media/web/${p.id}-d.jpg`} />
                </div>
                <ul className="b-carte__fait">{p.fait.map(f => <li key={f}>{f}</li>)}</ul>
                <div className="b-carte__pied">
                  <ul className="b-puces">{p.stack.map(s => <li key={s}>{s}</li>)}</ul>
                  <span className="b-carte__liens">
                    <a href={p.site} target="_blank" rel="noopener">{c.web.labels.site}</a>
                    <a href={p.code} target="_blank" rel="noopener">{c.web.labels.code}</a>
                  </span>
                </div>
              </li>
            ))}
          </ul>
            </>) },
            { id: "net", label: "Networks", contenu: (<>
          <div className="b-boite b-panneau b-bientot">
            <span className="b-tag b-tag--rouge">{c.net.bientot}</span>
            <p className="b-lead">{c.net.lead}</p>
            <p className="b-carte__txt">{c.net.texte}</p>
            <ul className="b-puces">{c.net.points.map(s => <li key={s}>{s}</li>)}</ul>
          </div>
            </>) },
          ]} />
        </section>

        {/* ——— Expérience (même design que le site d'exemple) ——— */}
        <section id="experience" className="b-sec">
          <Titre>{fr ? "Expérience" : "Experience"}</Titre>
          <Experience eres={fr ? ERES.fr : ERES.en} />
        </section>

        {/* ——— Formation : diplômes et certificats ——— */}
        <section id="formation" className="b-sec">
          <Titre>{fr ? "Formation" : "Background"}</Titre>
          <h3 className="b-sous">{fr ? "Diplômes" : "Degrees"}</h3>
          <ul className="b-diplomes">
            {DIPLOMES.map(d => (
              <li key={d.ecole} className="b-ere-carte b-diplome">
                <span className="b-diplome__an">{d.quand}</span>
                <p className="b-ere-carte__nom">{fr ? d.fr : d.en}</p>
                <p className="b-ere-carte__role">{d.ecole}</p>
              </li>
            ))}
          </ul>
          <p className="b-mono b-gris b-langues">{c.parcours.langues}</p>
        </section>

        {/* ——— Contact ——— */}
        <section id="contact" className="b-sec">
          <div className="b-boite b-panneau b-contact">
            <h2 className="b-contact__titre">{c.contact.titre}</h2>
            <p className="b-carte__txt">{c.contact.lead}</p>
            <a className="b-contact__mail" href={`mailto:${c.contact.email}`}>{c.contact.email}</a>
            <p className="b-contact__boutons">
              <a className="b-boite b-bouton b-bouton--rouge" href={c.contact.rdvHref} target="_blank" rel="noopener">{c.contact.rdv} <Fl /></a>
              <a className="b-boite b-bouton" href={c.contact.cvHref} download>{c.contact.cv}</a>
            </p>
          </div>
        </section>
      </main>

      <footer className="b-pied">
        <p>© {new Date().getFullYear()} {c.hero.nomComplet}</p>
        <p>{c.pied}</p>
      </footer>
    </div>
  );
}
