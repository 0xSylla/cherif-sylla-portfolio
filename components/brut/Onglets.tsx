"use client";
/* Section Projets : 4 boutons (onglets) qui affichent une catégorie à la fois.
   L'onglet choisi est gardé dans l'adresse (#projets-chain…) pour pouvoir partager le lien. */
import { useEffect, useRef, useState } from "react";

export type Onglet = { id: string; label: string; nb?: number; contenu: React.ReactNode };

export default function Onglets({ onglets, titre }: { onglets: Onglet[]; titre: string }) {
  const [actif, setActif] = useState(onglets[0].id);
  const boutons = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const lire = () => { const h = location.hash.replace("#projets-", ""); if (onglets.some(o => o.id === h)) setActif(h); };
    lire(); addEventListener("hashchange", lire);
    return () => removeEventListener("hashchange", lire);
  }, [onglets]);

  const choisir = (id: string, focus = false) => {
    setActif(id);
    history.replaceState(null, "", `#projets-${id}`);
    if (focus) boutons.current[onglets.findIndex(o => o.id === id)]?.focus();
  };
  const clavier = (e: React.KeyboardEvent, i: number) => {
    const n = onglets.length;
    const j = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (j >= 0) { e.preventDefault(); choisir(onglets[j].id, true); }
  };

  return (
    <>
      <div className="b-onglets" role="tablist" aria-label={titre}>
        {onglets.map((o, i) => (
          <button key={o.id} ref={el => { boutons.current[i] = el; }} type="button" role="tab" id={`tab-${o.id}`}
            aria-selected={actif === o.id} aria-controls={`pan-${o.id}`} tabIndex={actif === o.id ? 0 : -1}
            className={"b-boite b-onglet" + (actif === o.id ? " est-actif" : "")}
            onClick={() => choisir(o.id)} onKeyDown={e => clavier(e, i)}>
            {o.label}{o.nb !== undefined && <span className="b-onglet__nb">{o.nb}</span>}
          </button>
        ))}
      </div>
      {onglets.map(o => (
        <div key={o.id} role="tabpanel" id={`pan-${o.id}`} aria-labelledby={`tab-${o.id}`} hidden={actif !== o.id} className="b-panneau-onglet">
          {o.contenu}
        </div>
      ))}
    </>
  );
}
