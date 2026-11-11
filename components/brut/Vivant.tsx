"use client";
/* Parties interactives : navigation qui suit la section, vidéos qui se lancent au survol ou à l'écran. */
import { useEffect, useRef, useState } from "react";

/* icônes 16 px de la barre compacte (dessinées pour le site) */
const ic = (d: React.ReactNode) => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>;
const ICONES: Record<string, React.ReactNode> = {
  accueil: ic(<><path d="M3 10.5L12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M10 21v-6h4v6" /></>),
  projets: ic(<><path d="M8 7l-5 5 5 5" /><path d="M16 7l5 5-5 5" /></>),
  experience: ic(<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /><path d="M3 13h18" /></>),
  formation: ic(<><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c3 2.5 9 2.5 12 0v-5" /><path d="M22 9v6" /></>),
  contact: ic(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 6l8.5 7 8.5-7" /></>),
  cv: ic(<><path d="M14 3H6v18h12V7z" /><path d="M14 3v4h4" /><path d="M9 12h6M9 16h6" /></>),
};

export function Nav({ items, cv, cvLabel, langue }: { items: { id: string; label: string }[]; cv: string; cvLabel: string; langue: { label: string; href: string; aria: string } }) {
  const [actif, setActif] = useState(items[0].id);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const maj = () => {
      let a = items[0].id;
      items.forEach(it => { const el = document.getElementById(it.id); if (el && el.getBoundingClientRect().top < innerHeight * 0.4) a = it.id; });
      setActif(a);
      // la barre se compacte en icônes une fois le haut de page dépassé, et revient en haut de page
      setCompact(scrollY > innerHeight * 0.55);
    };
    maj(); addEventListener("scroll", maj, { passive: true }); addEventListener("resize", maj);
    return () => { removeEventListener("scroll", maj); removeEventListener("resize", maj); };
  }, [items]);
  return (
    <nav className={"b-nav" + (compact ? " est-compact" : "")} aria-label="Navigation">
      <div className="b-boite b-nav__groupe">
        {items.map(it => (
          <a key={it.id} href={`#${it.id}`} className={actif === it.id ? "est-actif" : ""} aria-current={actif === it.id ? "true" : undefined} aria-label={it.label} title={it.label}>
            <span className="b-nav__txt" aria-hidden="true">{it.label}</span><span className="b-nav__ico">{ICONES[it.id]}</span>
          </a>
        ))}
      </div>
      <a className="b-boite b-nav__seul" href={cv} download aria-label={cvLabel} title={cvLabel}><span className="b-nav__txt" aria-hidden="true">{cvLabel}</span><span className="b-nav__ico">{ICONES.cv}</span></a>
      <a className="b-boite b-nav__seul b-nav__langue" href={langue.href} aria-label={langue.aria}>{langue.label}</a>
    </nav>
  );
}

/* Vidéo muette : se lance quand la carte est à l'écran (téléphone) ou survolée (ordinateur). */
export function Video({ src, poster, className, survol = true }: { src: string; poster: string; className?: string; survol?: boolean }) {
  const v = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = v.current!; if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const souris = matchMedia("(hover: hover)").matches && survol;
    if (souris) {
      const carte = el.closest("article, li") ?? el;
      const on = () => el.play().catch(() => {}), off = () => el.pause();
      carte.addEventListener("mouseenter", on); carte.addEventListener("mouseleave", off);
      return () => { carte.removeEventListener("mouseenter", on); carte.removeEventListener("mouseleave", off); };
    }
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.5 });
    io.observe(el); return () => io.disconnect();
  }, [survol]);
  return <video ref={v} className={className} src={src} poster={poster} muted loop playsInline preload="none" />;
}

/* Mot qui se « brouille » puis se reconstruit lettre par lettre (survol, focus ou tap) : Advisor ⇄ Addict. */
export function Mot({ de, vers }: { de: string; vers: string }) {
  const [txt, setTxt] = useState(de);
  const [etat, setEtat] = useState(false); // false = « de », true = « vers »
  const minuterie = useRef<number>(0);
  const anime = (cible: string) => {
    clearInterval(minuterie.current);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setTxt(cible); return; }
    const L = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; let n = 0; const C = cible.toUpperCase();
    minuterie.current = window.setInterval(() => {
      n++;
      const fixe = Math.max(0, n - 1); // une lettre de plus se fige à chaque pas, de gauche à droite
      setTxt(C.split("").map((ch, i) => (i < fixe ? ch : L[Math.floor(Math.random() * 26)])).join(""));
      if (fixe >= C.length) { clearInterval(minuterie.current); setTxt(C); }
    }, 60);
  };
  useEffect(() => () => clearInterval(minuterie.current), []);
  const aller = (v: boolean) => { if (v === etat) return; setEtat(v); anime(v ? vers : de); };
  return (
    <span className="b-mot" tabIndex={0} role="button" aria-label={`${de} / ${vers}`}
      onPointerEnter={e => { if (e.pointerType === "mouse") aller(true); }} onPointerLeave={e => { if (e.pointerType === "mouse") aller(false); }}
      onPointerUp={e => { if (e.pointerType !== "mouse") aller(!etat); }}
      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); aller(!etat); } }} onBlur={() => aller(false)}>
      <span aria-hidden="true">{txt}</span>
    </span>
  );
}
