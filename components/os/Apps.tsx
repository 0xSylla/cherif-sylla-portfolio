"use client";
/* Le contenu de chaque fenêtre de Cherif OS. */
import { useEffect, useRef, useState } from "react";
import type { Contenu } from "@/content/types";
import type { OsTexte } from "@/content/os";
import { Icone, type AppId } from "./Icones";

export type Ouvrir = (app: AppId, arg?: string) => void;
type P = { c: Contenu; t: OsTexte; ouvrir: Ouvrir; mobile: boolean };

const reduit = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
const court = (a: string) => `${a.slice(0, 6)}…${a.slice(-4)}`;

/* ---------- Explorateur : les 6 sites en dossiers ---------- */
export function Explorateur({ c, t, ouvrir, mobile }: P) {
  const [sel, setSel] = useState<string | null>(null);
  const cotes: [AppId, string][] = [["web", t.apps.web], ["ugc", t.apps.ugc], ["chain", t.apps.chain], ["net", t.apps.net], ["cv", t.apps.cv]];
  return (
    <div className="xp">
      <div className="xp__barre">
        <span className="xp__fleches" aria-hidden="true">←&nbsp;&nbsp;→&nbsp;&nbsp;↑</span>
        <span className="xp__chemin">C:\Users\Cherif\{t.apps.web}</span>
      </div>
      <div className="xp__corps">
        <nav className="xp__cote" aria-label={t.explorateur.acces}>
          <p>{t.explorateur.acces}</p>
          {cotes.map(([a, n]) => (
            <button key={a} type="button" className={a === "web" ? "est-actif" : ""} onClick={() => a !== "web" && ouvrir(a)}><Icone app={a} taille={18} />{n}</button>
          ))}
        </nav>
        <div className="xp__zone">
          <p className="xp__astuce">{t.explorateur.ouvrir}</p>
          <ul className="xp__grille">
            {c.web.projets.map(p => (
              <li key={p.id}>
                <button type="button" className={"dossier" + (sel === p.id ? " est-sel" : "")}
                  onClick={() => (mobile ? ouvrir("navigateur", p.id) : setSel(p.id))} onDoubleClick={() => ouvrir("navigateur", p.id)}
                  onKeyDown={e => { if (e.key === "Enter") ouvrir("navigateur", p.id); }}>
                  <span className="dossier__vignette"><img src={`/media/web/${p.id}-d.jpg`} alt="" loading="lazy" /></span>
                  <span className="dossier__nom">{p.nom}</span>
                  <span className="dossier__sous">{p.nonOfficiel ? c.web.labels.nonOfficiel : c.web.labels.concept}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="xp__statut">{c.web.projets.length} {t.explorateur.elements}</p>
    </div>
  );
}

/* ---------- Navigateur : un site (aperçu vidéo + texte, ou le vrai site en direct) ---------- */
export function Navigateur({ c, t, arg }: P & { arg?: string }) {
  const p = c.web.projets.find(x => x.id === arg) ?? c.web.projets[0];
  const [mode, setMode] = useState<"apercu" | "direct">("apercu");
  const [vue, setVue] = useState<"d" | "m">("d");
  const L = c.web.labels;
  return (
    <div className="nav">
      <div className="nav__barre">
        <div className="nav__onglets" role="tablist">
          <button role="tab" aria-selected={mode === "apercu"} className={mode === "apercu" ? "est-actif" : ""} onClick={() => setMode("apercu")}>{t.navigateur.apercu}</button>
          <button role="tab" aria-selected={mode === "direct"} className={mode === "direct" ? "est-actif" : ""} onClick={() => setMode("direct")}>{t.navigateur.direct}</button>
        </div>
        <div className="nav__adresse"><span aria-hidden="true">🔒</span><span>{p.site.replace("https://", "")}</span></div>
        <a className="nav__ext" href={p.site} target="_blank" rel="noopener" aria-label={L.site}>↗</a>
      </div>
      {mode === "direct" ? (
        <div className="nav__direct">
          <p className="nav__note">{t.navigateur.directNote}</p>
          <iframe src={p.site} title={p.nom} loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
        </div>
      ) : (
        <div className="nav__apercu" style={{ ["--marque" as string]: "var(--web)" }}>
          <div className="nav__media">
            <div className="nav__bascule" role="group">
              <button className={vue === "d" ? "est-actif" : ""} onClick={() => setVue("d")} aria-pressed={vue === "d"}>{t.navigateur.ordi}</button>
              <button className={vue === "m" ? "est-actif" : ""} onClick={() => setVue("m")} aria-pressed={vue === "m"}>{t.navigateur.tel}</button>
            </div>
            <video key={vue} className={"nav__video nav__video--" + vue} src={`/media/web/${p.id}-${vue}.mp4`} poster={`/media/web/${p.id}-${vue}.jpg`} muted loop playsInline autoPlay={!reduit()} controls={reduit()} />
          </div>
          <div className="nav__texte">
            <p className="mono nav__tag">{p.nonOfficiel ? L.nonOfficiel : L.concept}</p>
            <h2>{p.nom}</h2>
            <p className="nav__accroche">{c.lang === "fr" ? `« ${p.accroche} »` : `“${p.accroche}”`}</p>
            <p className="mono nav__lbl">{L.constat}</p>
            <p>{p.constat}</p>
            <p className="mono nav__lbl">{L.fait}</p>
            <ul className="nav__fait">{p.fait.map(f => <li key={f}>{f}</li>)}</ul>
            <ul className="puces">{p.stack.map(s => <li key={s}>{s}</li>)}</ul>
            <div className="nav__liens">
              <a className="bouton" href={p.site} target="_blank" rel="noopener">{L.site} ↗</a>
              <a className="bouton bouton--ligne" href={p.code} target="_blank" rel="noopener">{L.code} ↗</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Lecteur vidéo : les clips UGC ---------- */
export function Lecteur({ c, t }: P) {
  const [i, setI] = useState(0);
  const clips = c.ugc.clips;
  return (
    <div className="lect">
      <div className="lect__ecran">
        <video key={clips[i]} src={`/media/ugc/${clips[i]}.mp4`} poster={`/media/ugc/${clips[i]}.jpg`} controls playsInline autoPlay muted onEnded={() => setI((i + 1) % clips.length)} />
      </div>
      <div className="lect__cote">
        <h2>{c.ugc.titre}</h2>
        <p>{c.ugc.lead}</p>
        <p className="mono lect__lbl">{t.lecteur.playlist}</p>
        <ul className="lect__liste">
          {clips.map((k, j) => (
            <li key={k}><button type="button" className={j === i ? "est-actif" : ""} onClick={() => setI(j)} aria-pressed={j === i}>
              <img src={`/media/ugc/${k}.jpg`} alt="" loading="lazy" /><span>{k.replace("clip-", "UGC #")}</span>
            </button></li>
          ))}
        </ul>
        <a className="bouton" href={c.ugc.ctaHref} target="_blank" rel="noopener">{c.ugc.cta} ↗</a>
      </div>
    </div>
  );
}

/* ---------- Terminal : la partie blockchain ---------- */
type Ligne = { k: number; cmd?: string; corps?: React.ReactNode };
export function Terminal({ c, t, ouvrir }: P) {
  const [lignes, setLignes] = useState<Ligne[]>([]);
  const [saisie, setSaisie] = useState("");
  const [frappe, setFrappe] = useState<string | null>(null);
  const [occupe, setOccupe] = useState(true);
  const fin = useRef<HTMLDivElement>(null);
  const champ = useRef<HTMLInputElement>(null);
  const n = useRef(0);
  const ch = c.chain;

  const sortie = (cmd: string): React.ReactNode => {
    switch (cmd) {
      case "whoami": return <><p className="t-blanc">{c.hero.nomComplet}</p><p>{ch.lead}</p></>;
      case "help": return <>{t.terminal.commandes.map(([k, d]) => <p key={k}><span className="t-vert">{k.padEnd(10, "\u00a0")}</span>{d}</p>)}</>;
      case "blocks": return <>{ch.blocs.map((b, i) => (
        <div key={b.titre} className="t-bloc">
          <p><span className="t-vert">[BLOCK #{String(i + 1).padStart(2, "0")}]</span> <span className="t-blanc">{b.titre}</span> <span className="t-gris">· {b.contexte}</span></p>
          <p className="t-chiffre">{b.chiffre} <span className="t-gris">{b.chiffreLabel}</span></p>
          {b.adresse && <p className="t-gris">contract: {court(b.adresse)}</p>}
          <p>{b.texte}</p>
          <p className="t-gris">stack: {b.stack.join(" · ")}</p>
          {b.liens.length > 0 && <p>{ch.verifier}: {b.liens.map(l => <a key={l.href} href={l.href} target="_blank" rel="noopener">{l.label}↗</a>)}</p>}
        </div>
      ))}</>;
      case "projects": return <>{ch.side.map(b => (
        <div key={b.titre} className="t-bloc">
          <p><span className="t-vert">▸</span> <span className="t-blanc">{b.titre}</span> <span className="t-gris">· {b.contexte}</span></p>
          <p>{b.texte}</p>
          <p>{b.liens.map(l => <a key={l.href} href={l.href} target="_blank" rel="noopener">{l.label}↗</a>)}</p>
        </div>
      ))}</>;
      case "stack": return <>{ch.stack.map(g => <p key={g.groupe}><span className="t-vert">{g.groupe}:</span> {g.items.join(", ")}</p>)}</>;
      case "contact": setTimeout(() => ouvrir("contact"), 300); return <p>{c.contact.email} → <span className="t-vert">mail.app</span></p>;
      default: return <p className="t-rouge">{cmd}: {t.terminal.inconnu}. {t.terminal.aide}</p>;
    }
  };

  const executer = async (cmd: string, anime: boolean) => {
    const propre = cmd.trim().toLowerCase();
    if (anime && !reduit()) { for (let i = 1; i <= cmd.length; i++) { setFrappe(cmd.slice(0, i)); await new Promise(r => setTimeout(r, 45)); } await new Promise(r => setTimeout(r, 180)); }
    setFrappe(null);
    if (propre === "clear") { setLignes([]); return; }
    setLignes(l => [...l, { k: n.current++, cmd, corps: propre ? sortie(propre) : null }]);
  };

  useEffect(() => {
    let vivant = true;
    (async () => {
      for (const cmd of ["whoami", "blocks"]) { if (!vivant) return; await executer(cmd, true); await new Promise(r => setTimeout(r, 250)); }
      if (vivant) { setLignes(l => [...l, { k: n.current++, corps: <p className="t-gris">{t.terminal.aide}</p> }]); setOccupe(false); }
    })();
    return () => { vivant = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { fin.current?.scrollIntoView({ block: "end" }); }, [lignes, frappe]);

  const invite = <span className="t-invite">cherif@chain<span className="t-blanc">:</span><span className="t-bleu">~</span>$</span>;
  return (
    <div className="term" onClick={() => champ.current?.focus()}>
      {lignes.map(l => <div key={l.k}>{l.cmd !== undefined && <p>{invite} {l.cmd}</p>}{l.corps}</div>)}
      {frappe !== null && <p>{invite} {frappe}<span className="t-curseur" /></p>}
      {!occupe && frappe === null && (
        <form onSubmit={e => { e.preventDefault(); const v = saisie; setSaisie(""); executer(v, false); }} className="term__saisie">
          <label>{invite}<input ref={champ} value={saisie} onChange={e => setSaisie(e.target.value)} autoCapitalize="off" autoCorrect="off" spellCheck={false} aria-label="Terminal" /></label>
        </form>
      )}
      <div ref={fin} />
    </div>
  );
}

/* ---------- Invite de commandes : la partie réseau ---------- */
export function Cmd({ c, t }: P) {
  const hops = [...c.parcours.items].reverse();
  const lignes: React.ReactNode[] = [
    <p key="v">Cherif OS [version 2026]</p>,
    <p key="b" />,
    <p key="p">C:\Users\Cherif&gt; ping reseau.cherif</p>,
    ...[0, 1, 2, 3].map(i => <p key={"r" + i}>  Reply from 10.0.0.{i + 1}: bytes=32 time={[4, 3, 5, 3][i]}ms TTL=64</p>),
    <p key="b2" />,
    <p key="tr">C:\Users\Cherif&gt; tracert {c.lang === "fr" ? "carriere" : "career"}</p>,
    ...hops.map((h, i) => <p key={"h" + i}>  {i + 1}    {`<${i + 1} ms`}    {h.ou.padEnd(16, "\u00a0")} {h.quoi} <span className="c-gris">({h.quand})</span></p>),
    <p key="h9">  {hops.length + 1}    *        {c.net.titre.padEnd(16, "\u00a0")} <span className="c-ambre">{t.cmd.bientot}</span></p>,
    <p key="b3" />,
    <p key="l">{c.net.lead}</p>,
    <p key="tx">{c.net.texte}</p>,
    <p key="pt" className="c-ambre">{c.net.points.map(x => `[${x}]`).join("  ")}</p>,
  ];
  const [vu, setVu] = useState(reduit() ? lignes.length : 0);
  useEffect(() => {
    if (vu >= lignes.length) return;
    const id = setTimeout(() => setVu(v => v + 1), vu < 3 ? 250 : 170);
    return () => clearTimeout(id);
  }, [vu, lignes.length]);
  return <div className="cmd">{lignes.slice(0, vu)}{vu < lignes.length && <span className="t-curseur" />}</div>;
}

/* ---------- CV ---------- */
export function Cv({ c, t, mobile }: P) {
  return (
    <div className="pdf">
      <div className="pdf__barre"><span>{c.contact.cvHref.split("/").pop()}</span><a className="bouton bouton--petit" href={c.contact.cvHref} download>{t.cv.telecharger}</a></div>
      {mobile ? <p className="pdf__mobile">{t.cv.mobile}</p> : <iframe src={`${c.contact.cvHref}#view=FitH`} title="CV" />}
    </div>
  );
}

/* ---------- Mail ---------- */
export function Mail({ c, t }: P) {
  const [objet, setObjet] = useState("");
  const [msg, setMsg] = useState("");
  const envoyer = (e: React.FormEvent) => { e.preventDefault(); location.href = `mailto:${c.contact.email}?subject=${encodeURIComponent(objet)}&body=${encodeURIComponent(msg)}`; };
  return (
    <div className="mail">
      <form className="mail__form" onSubmit={envoyer}>
        <h2>{c.contact.titre}</h2>
        <p className="mail__lead">{c.contact.lead}</p>
        <label><span>{t.mail.a}</span><input value={c.contact.email} readOnly /></label>
        <label><span>{t.mail.objet}</span><input value={objet} onChange={e => setObjet(e.target.value)} placeholder={t.mail.placeholderObjet} /></label>
        <label className="mail__msg"><span>{t.mail.message}</span><textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder={t.mail.placeholderMessage} rows={6} /></label>
        <button className="bouton" type="submit">{t.mail.envoyer} ↗</button>
      </form>
      <aside className="mail__cote">
        <p className="mono">{t.mail.ailleurs}</p>
        <a href={c.contact.rdvHref} target="_blank" rel="noopener">📅 {c.contact.rdv}</a>
        {c.contact.liens.map(l => <a key={l.href} href={l.href} target="_blank" rel="noopener">↗ {l.label}</a>)}
        <a href={c.contact.cvHref} download>📄 {c.contact.cv}</a>
      </aside>
    </div>
  );
}

/* ---------- Bloc-notes : à propos ---------- */
export function APropos({ c, t }: P) {
  return (
    <div className="notes">
      <p className="notes__menu">{t.apropos.fichier}</p>
      <div className="notes__texte">
        <p>{c.hero.salut} <strong>{c.hero.nomComplet}</strong>.</p>
        <p>{c.hero.roles.join(" · ")}</p>
        <p>{c.hero.lead}</p>
        <p>—</p>
        {c.chiffres.map(k => <p key={k.l}>• {k.v} {k.l}</p>)}
        <p>—</p>
        <p><strong>{c.parcours.titre}</strong></p>
        {c.parcours.items.map(p => <p key={p.quoi}>{p.quand} · {p.quoi} · {p.ou}</p>)}
        <p>{c.parcours.langues}</p>
        <p>—</p>
        <p>{t.bienvenue}</p>
      </div>
    </div>
  );
}

/* ---------- Corbeille ---------- */
export function Corbeille({ t }: P) {
  return (
    <div className="corb">
      <p>{t.corbeille.vide}</p>
      <a className="dossier dossier--ligne" href="https://github.com/0xSylla/portfolio" target="_blank" rel="noopener">
        <Icone app="web" taille={36} /><span><strong>portfolio-2024</strong><br /><span className="c-gris">{t.corbeille.ancien}</span></span>
      </a>
    </div>
  );
}
