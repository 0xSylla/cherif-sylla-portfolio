"use client";
/* La version 3D : le bureau en plein écran, des repères au-dessus des objets,
   et un panneau qui s'ouvre avec la partie choisie. */
import { useCallback, useEffect, useRef, useState } from "react";
import type { Contenu } from "@/content/types";
import { COULEUR, ZONES, type Zone } from "./piece3d";
import { SectionChain, SectionContact, SectionNet, SectionParcours, SectionUgc, SectionWeb } from "./Sections";

const SITES = ["wave", "yango", "orange", "ilios", "defustel", "nubian"];
const SECTION: Record<Zone, (p: { c: Contenu }) => React.ReactElement> = {
  web: SectionWeb, ugc: SectionUgc, chain: SectionChain, net: SectionNet, parcours: SectionParcours, contact: SectionContact,
};
const CLASSE: Record<Zone, string> = { web: "sec--web", ugc: "sec--ugc", chain: "sec--chain", net: "sec--net", parcours: "sec--parcours", contact: "sec--contact" };

export default function Bureau3D({ c }: { c: Contenu }) {
  const base = c.lang === "fr" ? "" : "/en";
  const toile = useRef<HTMLCanvasElement>(null);
  const piece = useRef<ReturnType<typeof import("./piece3d").creerPiece> | null>(null);
  const pinsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const panneau = useRef<HTMLElement>(null);
  const [survol, setSurvol] = useState<Zone | null>(null);
  const [ouvert, setOuvert] = useState<Zone | null>(null);
  const [pret, setPret] = useState(false);
  const [sans3d, setSans3d] = useState(false);

  const ouvrir = useCallback((z: Zone | null) => {
    setOuvert(z);
    const large = innerWidth > 900;
    piece.current?.focus(z, z && large ? Math.min(innerWidth * 0.56, 760) / 2 : 0);
  }, []);

  useEffect(() => {
    // pas de WebGL : on renvoie vers la version classique
    const essai = document.createElement("canvas");
    if (!(essai.getContext("webgl2") || essai.getContext("webgl"))) { setSans3d(true); return; }
    let vivant = true;
    import("./piece3d").then(({ creerPiece }) => {
      if (!vivant || !toile.current) return;
      piece.current = creerPiece(toile.current, {
        sites: SITES, clips: c.ugc.clips, nom: c.hero.nom,
        reduit: matchMedia("(prefers-reduced-motion: reduce)").matches,
        onSurvol: setSurvol,
        onClic: z => ouvrir(z),
        onPins: pins => pins.forEach((p, i) => { const b = pinsRef.current[i]; if (b) b.style.transform = `translate(${p.x}px, ${p.y}px)`; }),
      });
      setPret(true);
    });
    const vis = () => piece.current?.pause(document.hidden);
    document.addEventListener("visibilitychange", vis);
    return () => { vivant = false; document.removeEventListener("visibilitychange", vis); piece.current?.detruire(); piece.current = null; };
  }, [c, ouvrir]);

  // Échap ferme le panneau ; le panneau prend le focus à l'ouverture
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") ouvrir(null); };
    addEventListener("keydown", k);
    if (ouvert) { panneau.current?.focus(); panneau.current?.scrollTo(0, 0); }
    return () => removeEventListener("keydown", k);
  }, [ouvert, ouvrir]);

  if (sans3d) {
    return (
      <main className="b3d-sans">
        <p>{c.piece.sans3d}</p>
        <a className="bouton" href={base || "/"}>{c.piece.classique}</a>
      </main>
    );
  }

  const Contenu = ouvert ? SECTION[ouvert] : null;
  return (
    <div className={"b3d" + (ouvert ? " b3d--ouvert" : "") + (pret ? " b3d--pret" : "")}>
      <canvas ref={toile} className="b3d__toile" aria-label={c.piece.intro} role="img" />

      <header className="b3d__haut">
        <a href={`${base}/3d`} className="logo" aria-label={c.hero.nom}><span className="logo__m">CS</span><span className="logo__n">{c.hero.nom}</span></a>
        <div className="entete__fin">
          <a className="langue" href={`${c.lang === "fr" ? "/en" : ""}/3d`} aria-label={c.langue.aria}>{c.langue.label}</a>
          <a className="bouton bouton--petit bouton--ligne" href={base || "/"}>{c.piece.classique}</a>
        </div>
      </header>

      {/* repères au-dessus des objets */}
      <div className="b3d__pins" aria-hidden={!!ouvert}>
        {ZONES.map((z, i) => (
          <button key={z} ref={el => { pinsRef.current[i] = el; }} type="button" tabIndex={-1}
            className={"pin" + (survol === z ? " est-survol" : "")} style={{ ["--z" as string]: COULEUR[z] }}
            onClick={() => ouvrir(z)} onMouseEnter={() => setSurvol(z)} onMouseLeave={() => setSurvol(null)}>
            <span className="pin__point" /><span className="pin__nom"><span className="pin__long">{c.piece.zones[z]}</span><span className="pin__court">{c.piece.zones[z].split(" · ")[0]}</span></span>
          </button>
        ))}
      </div>

      <section className="b3d__intro">
        <p className="mono b3d__salut">{c.hero.salut}</p>
        <h1 className="b3d__nom">{c.hero.nom}</h1>
        <p className="b3d__roles mono">{c.hero.roles.join(" · ")}</p>
        <p className="b3d__astuce">{c.piece.astuce}</p>
      </section>

      {/* la même navigation au clavier et pour les lecteurs d'écran */}
      <nav className="b3d__legende" aria-label={c.piece.explorer}>
        {ZONES.map(z => (
          <button key={z} type="button" style={{ ["--z" as string]: COULEUR[z] }} aria-pressed={ouvert === z}
            className={(ouvert === z ? "est-actif" : "") + (survol === z ? " est-survol" : "")}
            onClick={() => ouvrir(ouvert === z ? null : z)} onMouseEnter={() => setSurvol(z)} onMouseLeave={() => setSurvol(null)}>
            <i />{c.piece.zones[z].split(" · ")[0]}
          </button>
        ))}
      </nav>

      <aside ref={panneau} className={"b3d__panneau " + (ouvert ? CLASSE[ouvert] : "")} tabIndex={-1} aria-hidden={!ouvert}
        aria-label={ouvert ? c.piece.zones[ouvert] : undefined} style={{ ["--acc" as string]: ouvert ? COULEUR[ouvert] : "#fff" }}>
        <button type="button" className="b3d__fermer" onClick={() => ouvrir(null)} aria-label={c.piece.fermer}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <div className="b3d__contenu">{Contenu && <Contenu key={ouvert} c={c} />}</div>
      </aside>
    </div>
  );
}
