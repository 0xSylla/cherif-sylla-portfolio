"use client";
/* Petits composants interactifs : rail de progression, apparitions, vidéos qui se lancent à l'écran, mur UGC, rôles qui défilent. */
import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "web", c: "var(--web)" },
  { id: "ugc", c: "var(--ugc)" },
  { id: "chain", c: "var(--chain)" },
  { id: "net", c: "var(--net)" },
  { id: "contact", c: "#fff" },
];

/* Le fil conducteur : une ligne à gauche, un nœud par section, un paquet qui suit le défilement. */
export function Rail({ labels }: { labels: string[] }) {
  const [actif, setActif] = useState(-1);
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const maj = () => {
      const tops = SECTIONS.map(s => document.getElementById(s.id)?.offsetTop ?? 0);
      const y = scrollY + innerHeight * 0.45;
      let i = -1; tops.forEach((t, j) => { if (y >= t) i = j; });
      setActif(i);
      // progression entre deux nœuds, pour placer le paquet
      let p = 0;
      if (i < 0) p = Math.max(0, Math.min(1, y / (tops[0] || 1))) * 0;
      else if (i >= tops.length - 1) p = tops.length - 1;
      else p = i + (y - tops[i]) / Math.max(1, tops[i + 1] - tops[i]);
      setProg(p);
    };
    maj(); addEventListener("scroll", maj, { passive: true }); addEventListener("resize", maj);
    return () => { removeEventListener("scroll", maj); removeEventListener("resize", maj); };
  }, []);
  const couleur = actif >= 0 ? SECTIONS[actif].c : "rgba(255,255,255,.4)";
  return (
    <>
      <nav className={"rail" + (actif >= 0 ? " rail--on" : "")} aria-label="Sections">
        <div className="rail__ligne" />
        <div className="rail__plein" style={{ height: `${(prog / (SECTIONS.length - 1)) * 100}%`, background: couleur }} />
        <span className="rail__paquet" style={{ top: `${(prog / (SECTIONS.length - 1)) * 100}%`, background: couleur, boxShadow: `0 0 14px ${couleur}` }} />
        {SECTIONS.map((s, i) => (
          <a key={s.id} href={`#${s.id}`} className={"rail__noeud" + (i === actif ? " est-actif" : "") + (i < actif ? " est-passe" : "")}
            style={{ top: `${(i / (SECTIONS.length - 1)) * 100}%`, color: s.c }}>
            <span className="rail__point" /><span className="rail__nom">{labels[i]}</span>
          </a>
        ))}
      </nav>
      <div className="barre" aria-hidden="true"><span style={{ width: `${Math.max(0, prog / (SECTIONS.length - 1)) * 100}%`, background: couleur }} /></div>
    </>
  );
}

/* Apparition douce des éléments [data-vu] quand ils entrent à l'écran. */
export function Apparitions() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-vu]");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { els.forEach(e => e.classList.add("vu")); return; }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("vu"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -10% 0px" });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, []);
  return null;
}

/* Les rôles du hero, l'un après l'autre. */
export function Roles({ roles }: { roles: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI(v => (v + 1) % roles.length), 2200);
    return () => clearInterval(t);
  }, [roles.length]);
  return (
    <span className="roles" aria-label={roles.join(", ")}>
      {roles.map((r, j) => <span key={r} aria-hidden="true" className={"roles__r" + (j === i ? " est-actif" : "")}>{r}</span>)}
    </span>
  );
}

/* Ordinateur + téléphone : les deux vidéos se lancent quand le bloc est à l'écran. */
export function Appareils({ id, nom, ordi, tel }: { id: string; nom: string; ordi: string; tel: string }) {
  const boite = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = boite.current; if (!el) return;
    const vids = [...el.querySelectorAll("video")];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => vids.forEach(v => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div className="appareils" ref={boite}>
      <div className="ordi" aria-label={`${nom}, ${ordi}`}>
        <div className="ordi__ecran">
          <span className="ordi__barre"><i /><i /><i /></span>
          <video muted loop playsInline preload="none" poster={`/media/web/${id}-d.jpg`} src={`/media/web/${id}-d.mp4`} />
        </div>
        <div className="ordi__socle" />
      </div>
      <div className="tel" aria-label={`${nom}, ${tel}`}>
        <span className="tel__encoche" />
        <video muted loop playsInline preload="none" poster={`/media/web/${id}-m.jpg`} src={`/media/web/${id}-m.mp4`} />
      </div>
    </div>
  );
}

/* Mur de clips UGC : lecture muette à l'écran, un clic active le son de ce clip seulement. */
export function MurUgc({ clips, son, muet }: { clips: string[]; son: string; muet: string }) {
  const [sonore, setSonore] = useState<number | null>(null);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(es => es.forEach(e => { const v = e.target as HTMLVideoElement; if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }), { threshold: 0.3 });
    vids.current.forEach(v => v && io.observe(v));
    return () => io.disconnect();
  }, []);
  useEffect(() => { vids.current.forEach((v, i) => { if (v) v.muted = i !== sonore; }); if (sonore !== null) vids.current[sonore]?.play().catch(() => {}); }, [sonore]);
  return (
    <div className="mur">
      {clips.map((c, i) => (
        <figure key={c} className={"clip" + (sonore === i ? " est-sonore" : "")} data-vu style={{ transitionDelay: `${(i % 4) * 70}ms` }}>
          <video ref={el => { vids.current[i] = el; }} muted loop playsInline preload="none" poster={`/media/ugc/${c}.jpg`} src={`/media/ugc/${c}.mp4`} />
          <button type="button" className="clip__son" onClick={() => setSonore(sonore === i ? null : i)} aria-pressed={sonore === i}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />{sonore === i ? <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /> : <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}</svg>
            <span>{sonore === i ? muet : son}</span>
          </button>
        </figure>
      ))}
    </div>
  );
}
