import type { Contenu } from "@/content/types";
import Graphe from "./Graphe";
import { Apparitions, Rail, Roles } from "./Client";
import { SectionChain, SectionContact, SectionNet, SectionParcours, SectionUgc, SectionWeb } from "./Sections";

/* La version classique : une page qui défile. */
export default function Page({ c }: { c: Contenu }) {
  const base = c.lang === "fr" ? "" : "/en";
  return (
    <>
      <a className="saut" href="#web">{c.hero.ctaTravaux}</a>
      <header className="entete">
        <a href={base || "/"} className="logo" aria-label={c.hero.nom}>
          <span className="logo__m">CS</span><span className="logo__n">{c.hero.nom}</span>
        </a>
        <nav className="entete__nav" aria-label="Navigation">
          <a href="#web" style={{ ["--c" as string]: "var(--web)" }}>{c.nav.web}</a>
          <a href="#ugc" style={{ ["--c" as string]: "var(--ugc)" }}>{c.nav.ugc}</a>
          <a href="#chain" style={{ ["--c" as string]: "var(--chain)" }}>{c.nav.chain}</a>
          <a href="#net" style={{ ["--c" as string]: "var(--net)" }}>{c.nav.net}</a>
        </nav>
        <div className="entete__fin">
          <a className="langue" href={`${base}/3d`}>3D</a>
          <a className="langue" href={c.langue.href} aria-label={c.langue.aria} hrefLang={c.lang === "fr" ? "en" : "fr"}>{c.langue.label}</a>
          <a className="bouton bouton--petit" href="#contact">{c.nav.contact}</a>
        </div>
      </header>

      <Rail labels={[c.nav.web, c.nav.ugc, c.nav.chain, c.nav.net, c.nav.contact]} />

      <main id="haut">
        <section className="hero">
          <div className="hero__texte">
            <p className="hero__salut mono">{c.hero.salut}</p>
            <h1 className="hero__nom">{c.hero.nom}</h1>
            <p className="hero__roles mono"><span className="hero__prompt">&gt;</span> <Roles roles={c.hero.roles} /></p>
            <p className="hero__lead">{c.hero.lead}</p>
            <div className="hero__cta">
              <a className="bouton" href="#web">{c.hero.ctaTravaux}</a>
              <a className="bouton bouton--ligne" href="#contact">{c.hero.ctaContact}</a>
            </div>
          </div>
          <div className="hero__graphe">
            <Graphe labels={c.hero.noeuds} satellites={c.hero.satellites} portrait="/media/portrait.jpg" nom={c.hero.nomComplet} />
            <p className="hero__astuce mono">{c.hero.astuce} ↗</p>
          </div>
        </section>

        <ul className="chiffres" aria-label="Chiffres clés">
          {c.chiffres.map((k, i) => (
            <li key={k.l} data-vu style={{ transitionDelay: `${i * 80}ms` }}><strong>{k.v}</strong><span>{k.l}</span></li>
          ))}
        </ul>

        <section id="web" className="sec sec--web"><SectionWeb c={c} /></section>
        <section id="ugc" className="sec sec--ugc"><SectionUgc c={c} /></section>
        <section id="chain" className="sec sec--chain"><SectionChain c={c} /></section>
        <section id="net" className="sec sec--net"><SectionNet c={c} /></section>
        <section className="sec sec--parcours" aria-labelledby="parcours"><SectionParcours c={c} /></section>
        <section id="contact" className="sec sec--contact"><SectionContact c={c} /></section>
      </main>

      <footer className="pied">
        <p>© {new Date().getFullYear()} {c.hero.nomComplet}</p>
        <p>{c.pied}</p>
      </footer>
      <Apparitions />
    </>
  );
}
