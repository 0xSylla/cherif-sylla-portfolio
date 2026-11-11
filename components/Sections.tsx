/* Les sections du portfolio, utilisées par la page classique et par les panneaux de la pièce 3D. */
import type { Contenu } from "@/content/types";
import { Appareils, MurUgc } from "./Client";

const COULEURS: Record<string, string> = {
  wave: "#1cb3e8", yango: "#ff2d2d", orange: "#ff7900", ilios: "#c9a96e", defustel: "#d6d0c4", nubian: "#d9a27f",
};

export const Fleche = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true" className="fleche"><path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" /></svg>
);
const court = (a: string) => `${a.slice(0, 6)}…${a.slice(-4)}`;

export function Titre({ num, titre, lead, id }: { num: string; titre: string; lead: string; id: string }) {
  return (
    <header className="sec__tete" data-vu>
      <p className="sec__num"><span>{num}</span><i />{`// ${id}`}</p>
      <h2 className="sec__titre">{titre}</h2>
      <p className="sec__lead">{lead}</p>
    </header>
  );
}

export function SectionWeb({ c }: { c: Contenu }) {
  const W = c.web.labels;
  return (
    <>
      <Titre num={c.web.num} titre={c.web.titre} lead={c.web.lead} id="web" />
      <div className="projets">
        {c.web.projets.map((p, i) => (
          <article key={p.id} className={"projet" + (i % 2 ? " projet--inverse" : "")} style={{ ["--marque" as string]: COULEURS[p.id] }}>
            <div className="projet__texte" data-vu>
              <p className="projet__idx mono">{c.web.num}.{i + 1}<span className={"etiquette" + (p.nonOfficiel ? "" : " etiquette--neutre")}>{p.nonOfficiel ? W.nonOfficiel : W.concept}</span></p>
              <h3 className="projet__nom">{p.nom}</h3>
              <p className="projet__accroche">{c.lang === "fr" ? `« ${p.accroche} »` : `“${p.accroche}”`}</p>
              <p className="projet__lbl mono">{W.constat}</p>
              <p className="projet__constat">{p.constat}</p>
              <p className="projet__lbl mono">{W.fait}</p>
              <ul className="projet__fait">{p.fait.map(f => <li key={f}>{f}</li>)}</ul>
              <ul className="puces">{p.stack.map(s => <li key={s}>{s}</li>)}</ul>
              <div className="projet__liens">
                <a className="bouton" href={p.site} target="_blank" rel="noopener">{W.site} <Fleche /></a>
                <a className="bouton bouton--ligne" href={p.code} target="_blank" rel="noopener">{W.code} <Fleche /></a>
              </div>
            </div>
            <div className="projet__visuel" data-vu>
              <Appareils id={p.id} nom={p.nom} ordi={W.ordi} tel={W.tel} />
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export function SectionUgc({ c }: { c: Contenu }) {
  return (
    <>
      <Titre num={c.ugc.num} titre={c.ugc.titre} lead={c.ugc.lead} id="ugc" />
      <MurUgc clips={c.ugc.clips} son={c.ugc.son} muet={c.ugc.muet} />
      <p className="sec__suite" data-vu><a className="bouton" href={c.ugc.ctaHref} target="_blank" rel="noopener">{c.ugc.cta} <Fleche /></a></p>
    </>
  );
}

export function SectionChain({ c }: { c: Contenu }) {
  return (
    <>
      <Titre num={c.chain.num} titre={c.chain.titre} lead={c.chain.lead} id="chain" />
      <p className="sous-titre mono" data-vu>{c.chain.prod}</p>
      <ol className="chaine">
        {c.chain.blocs.map((b, i) => (
          <li key={b.titre} className="bloc" data-vu>
            <div className="bloc__tete mono">
              <span>BLOCK #{String(i + 1).padStart(2, "0")}</span>
              <span className="bloc__adr">{b.adresse ? court(b.adresse) : "—"}</span>
            </div>
            <div className="bloc__corps">
              <div className="bloc__chiffre"><strong>{b.chiffre}</strong><span>{b.chiffreLabel}</span></div>
              <div>
                <h3 className="bloc__titre">{b.titre}</h3>
                <p className="bloc__ctx mono">{b.contexte}</p>
                <p className="bloc__texte">{b.texte}</p>
                <ul className="puces">{b.stack.map(s => <li key={s}>{s}</li>)}</ul>
                {b.liens.length > 0 && (
                  <p className="bloc__liens"><span className="mono">{c.chain.verifier} :</span>
                    {b.liens.map(l => <a key={l.href} href={l.href} target="_blank" rel="noopener">{l.label} <Fleche /></a>)}
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
      <p className="sous-titre mono" data-vu>{c.chain.projets}</p>
      <ul className="side">
        {c.chain.side.map((b, i) => (
          <li key={b.titre} className="side__carte" data-vu style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
            <p className="bloc__ctx mono">{b.contexte}</p>
            <h3>{b.titre}</h3>
            <p>{b.texte}</p>
            <p className="side__liens">{b.liens.map(l => <a key={l.href} href={l.href} target="_blank" rel="noopener">{l.label} <Fleche /></a>)}</p>
          </li>
        ))}
      </ul>
      <p className="sous-titre mono" data-vu>{c.chain.stackTitre}</p>
      <div className="stack" data-vu>
        {c.chain.stack.map(g => (
          <div key={g.groupe}><p className="mono">{g.groupe}</p><ul className="puces">{g.items.map(s => <li key={s}>{s}</li>)}</ul></div>
        ))}
      </div>
    </>
  );
}

export function SectionNet({ c }: { c: Contenu }) {
  return (
    <div className="net">
      <div>
        <Titre num={c.net.num} titre={c.net.titre} lead={c.net.lead} id="net" />
        <div className="net__bientot" data-vu>
          <span className="etiquette etiquette--net">{c.net.bientot}</span>
          <p>{c.net.texte}</p>
          <ul className="puces">{c.net.points.map(s => <li key={s}>{s}</li>)}</ul>
        </div>
      </div>
      <Topologie />
    </div>
  );
}

export function SectionParcours({ c }: { c: Contenu }) {
  return (
    <>
      <h2 id="parcours" className="sous-titre mono" data-vu>{c.parcours.titre}</h2>
      <ol className="parcours">
        {c.parcours.items.map(p => (
          <li key={p.quoi} data-vu><span className="mono">{p.quand}</span><strong>{p.quoi}</strong><em>{p.ou}</em></li>
        ))}
      </ol>
      <p className="parcours__langues mono" data-vu>{c.parcours.langues}</p>
    </>
  );
}

export function SectionContact({ c }: { c: Contenu }) {
  return (
    <div className="contact" data-vu>
      <h2 className="contact__titre">{c.contact.titre}</h2>
      <p className="contact__lead">{c.contact.lead}</p>
      <a className="contact__mail" href={`mailto:${c.contact.email}`}>{c.contact.email}</a>
      <div className="contact__boutons">
        <a className="bouton" href={c.contact.rdvHref} target="_blank" rel="noopener">{c.contact.rdv} <Fleche /></a>
        <a className="bouton bouton--ligne" href={c.contact.cvHref} download>{c.contact.cv}</a>
      </div>
      <p className="contact__reseaux">{c.contact.liens.map(l => <a key={l.href} href={l.href} target="_blank" rel="noopener">{l.label}</a>)}</p>
    </div>
  );
}

/* Topologie réseau animée (section « Bientôt ») */
function Topologie() {
  const hotes = [[60, 300], [140, 330], [220, 300], [380, 300], [460, 330], [540, 300]];
  return (
    <svg className="topo" viewBox="0 0 600 380" aria-hidden="true" data-vu>
      <path className="topo__lien" d="M300 70 L170 190" /><path className="topo__lien" d="M300 70 L430 190" />
      <path className="topo__lien topo__lien--x" d="M170 190 L430 190" />
      {hotes.map(([x, y], i) => <path key={i} className="topo__lien" d={`M${i < 3 ? 170 : 430} 190 L${x} ${y}`} />)}
      <path className="topo__flux" d="M300 70 L170 190 L60 300" /><path className="topo__flux topo__flux--b" d="M540 300 L430 190 L300 70" />
      <path className="topo__flux topo__flux--c" d="M140 330 L170 190 L430 190 L460 330" />
      <g className="topo__routeur"><circle cx="300" cy="70" r="30" /><path d="M285 70h30M300 55v30M290 60l20 20M310 60l-20 20" /></g>
      {[170, 430].map(x => <g key={x} className="topo__switch"><rect x={x - 34} y="174" width="68" height="32" rx="6" /><path d={`M${x - 20} 186h40M${x - 20} 194h40`} /></g>)}
      {hotes.map(([x, y], i) => <g key={i} className="topo__hote"><rect x={x - 18} y={y - 12} width="36" height="24" rx="3" /><path d={`M${x - 8} ${y + 18}h16`} /></g>)}
    </svg>
  );
}
