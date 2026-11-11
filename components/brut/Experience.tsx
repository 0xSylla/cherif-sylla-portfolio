"use client";
/* Expérience : postes regroupés par « ère », reliés par un rail vertical qui se remplit en rouge au défilement.
   Le carré devant chaque carte passe au rouge quand le remplissage l'atteint. */
import { useEffect, useRef } from "react";
import { RESEAUX } from "./Glyphes";

export type Poste = { entreprise: string; role: string; dates: string; desc: string; liens: { k: "X" | "Web" | "Scan"; href: string; label: string }[] };
export type Ere = { titre: string; postes: Poste[] };

const Web = <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>;
const Scan = <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l8 4.5v11L12 22l-8-4.5v-11z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M8 12l3 3 5-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export default function Experience({ eres }: { eres: Ere[] }) {
  const boite = useRef<HTMLDivElement>(null);
  const plein = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = boite.current!, f = plein.current!;
    const noeuds = [...el.querySelectorAll<HTMLElement>(".b-ere-noeud")];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { f.style.transform = "scaleY(1)"; noeuds.forEach(n => n.classList.add("est-atteint")); return; }
    let raf = 0;
    const maj = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const ligne = innerHeight * 0.6; // le remplissage suit une ligne placée à 60 % de l'écran
      const k = Math.min(1, Math.max(0, (ligne - r.top) / r.height));
      f.style.transform = `scaleY(${k})`;
      const y = r.top + k * r.height;
      noeuds.forEach(n => n.classList.toggle("est-atteint", n.getBoundingClientRect().top + 6 <= y));
    };
    const demande = () => { if (!raf) raf = requestAnimationFrame(maj); };
    maj(); addEventListener("scroll", demande, { passive: true }); addEventListener("resize", demande);
    return () => { removeEventListener("scroll", demande); removeEventListener("resize", demande); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="b-eres" ref={boite}>
      <div className="b-eres__rail" aria-hidden="true"><div className="b-eres__plein" ref={plein} /></div>
      {eres.map(e => (
        <section key={e.titre} className="b-ere" aria-label={e.titre}>
          <div className="b-ere__tete"><h3>{e.titre}</h3><span aria-hidden="true" /></div>
          {e.postes.map(p => (
            <div key={p.entreprise} className="b-ere__ligne">
              <span className="b-ere-noeud" aria-hidden="true" />
              <article className="b-ere-carte">
                <p className="b-ere-carte__nom">{p.entreprise}</p>
                <p className="b-ere-carte__role">{p.role} <span>· {p.dates}</span></p>
                <p className="b-ere-carte__desc">{p.desc}</p>
                {p.liens.length > 0 && (
                  <div className="b-ere-carte__liens">
                    {p.liens.map(l => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener" aria-label={l.label} title={l.label}>
                        {l.k === "X" ? RESEAUX.X : l.k === "Web" ? Web : Scan}
                      </a>
                    ))}
                  </div>
                )}
              </article>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
