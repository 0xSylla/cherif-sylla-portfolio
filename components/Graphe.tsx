"use client";
/* Le réseau du haut de page : moi au centre, quatre nœuds (mes métiers) autour,
   des paquets de données qui circulent. Un clic sur un nœud mène à sa section. */
import { useEffect, useRef, useState } from "react";

type Cle = "web" | "ugc" | "chain" | "net";
type Props = { labels: Record<Cle, string>; satellites: Record<Cle, string[]>; portrait: string; nom: string };

const HUBS: { k: Cle; x: number; y: number; c: string }[] = [
  { k: "web", x: 128, y: 150, c: "var(--web)" },
  { k: "ugc", x: 478, y: 128, c: "var(--ugc)" },
  { k: "chain", x: 488, y: 448, c: "var(--chain)" },
  { k: "net", x: 118, y: 462, c: "var(--net)" },
];
const C = { x: 300, y: 300 };

// trois satellites par nœud, placés en éventail vers l'extérieur
function sats(h: (typeof HUBS)[number]) {
  const base = Math.atan2(h.y - C.y, h.x - C.x);
  return [-0.85, 0, 0.85].map((d, i) => ({ x: h.x + Math.cos(base + d) * (i === 1 ? 92 : 78), y: h.y + Math.sin(base + d) * (i === 1 ? 92 : 78) }));
}

export default function Graphe({ labels, satellites, portrait, nom }: Props) {
  const [survol, setSurvol] = useState<Cle | null>(null);
  const paquets = useRef<(SVGCircleElement | null)[]>([]);
  const groupe = useRef<SVGGElement>(null);

  // liste des liens (pour les paquets) : centre → nœud, nœud → satellites, et deux liens croisés
  const liens: { a: { x: number; y: number }; b: { x: number; y: number }; c: string; k: Cle }[] = [];
  HUBS.forEach(h => {
    liens.push({ a: C, b: h, c: h.c, k: h.k });
    sats(h).forEach(s => liens.push({ a: h, b: s, c: h.c, k: h.k }));
  });
  const croises = [[0, 2], [1, 0], [3, 2]] as const;
  croises.forEach(([i, j]) => liens.push({ a: HUBS[i], b: HUBS[j], c: HUBS[i].c, k: HUBS[i].k }));

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const n = paquets.current.length;
    const etat = Array.from({ length: n }, (_, i) => ({ l: (i * 7) % liens.length, t: (i * 0.137) % 1, v: 0.0035 + ((i * 37) % 10) / 2500, sens: i % 2 ? 1 : -1 }));
    let mx = 0, my = 0, px = 0, py = 0;
    const bouge = (e: PointerEvent) => { mx = (e.clientX / innerWidth - 0.5) * 2; my = (e.clientY / innerHeight - 0.5) * 2; };
    addEventListener("pointermove", bouge, { passive: true });
    const tour = () => {
      etat.forEach((p, i) => {
        p.t += p.v;
        if (p.t >= 1) { p.t = 0; p.l = (p.l + 5 + i) % liens.length; p.sens = -p.sens; }
        const L = liens[p.l], t = p.sens > 0 ? p.t : 1 - p.t;
        const el = paquets.current[i];
        if (el) { el.setAttribute("cx", String(L.a.x + (L.b.x - L.a.x) * t)); el.setAttribute("cy", String(L.a.y + (L.b.y - L.a.y) * t)); el.style.fill = L.c; }
      });
      px += (mx - px) * 0.05; py += (my - py) * 0.05;
      if (groupe.current) groupe.current.style.transform = `translate(${px * 8}px, ${py * 8}px)`;
      raf = requestAnimationFrame(tour);
    };
    raf = requestAnimationFrame(tour);
    return () => { cancelAnimationFrame(raf); removeEventListener("pointermove", bouge); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const aller = (k: Cle) => document.getElementById(k)?.scrollIntoView({ behavior: "smooth" });
  const dim = (k: Cle) => (survol && survol !== k ? 0.22 : 1);

  return (
    <svg className="graphe" viewBox="0 0 600 600" role="group" aria-label={nom}>
      <defs>
        <clipPath id="rond"><circle cx={C.x} cy={C.y} r="74" /></clipPath>
        <radialGradient id="halo"><stop offset="0" stopColor="#fff" stopOpacity=".16" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx={C.x} cy={C.y} r="230" fill="url(#halo)" />
      <circle cx={C.x} cy={C.y} r="200" className="graphe__orbite" />
      <circle cx={C.x} cy={C.y} r="132" className="graphe__orbite" />
      <g ref={groupe}>
        {liens.map((l, i) => (
          <line key={i} x1={l.a.x} y1={l.a.y} x2={l.b.x} y2={l.b.y} stroke={l.c} className={i < 4 * 4 ? "graphe__lien" : "graphe__lien graphe__lien--croise"} style={{ opacity: dim(l.k) * (l.a === C ? 0.75 : 0.4) }} />
        ))}
        {HUBS.map(h => sats(h).map((s, i) => (
          <g key={h.k + i} style={{ opacity: dim(h.k), transition: "opacity .3s" }}>
            <circle cx={s.x} cy={s.y} r="5" fill="var(--bg)" stroke={h.c} strokeWidth="2" />
            <text x={s.x} y={s.y + (s.y > h.y ? 20 : -12)} textAnchor="middle" className="graphe__sat">{satellites[h.k][i]}</text>
          </g>
        )))}
        {Array.from({ length: 18 }, (_, i) => <circle key={i} ref={el => { paquets.current[i] = el; }} r="3.2" cx={C.x} cy={C.y} className="graphe__paquet" />)}
        {HUBS.map(h => (
          <g key={h.k} className="graphe__hub" style={{ opacity: dim(h.k), color: h.c }} tabIndex={0} role="link" aria-label={labels[h.k]}
            onMouseEnter={() => setSurvol(h.k)} onMouseLeave={() => setSurvol(null)} onFocus={() => setSurvol(h.k)} onBlur={() => setSurvol(null)}
            onClick={() => aller(h.k)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); aller(h.k); } }}>
            <circle cx={h.x} cy={h.y} r="40" className="graphe__pulse" />
            <circle cx={h.x} cy={h.y} r="30" fill="var(--bg)" stroke="currentColor" strokeWidth="2.5" />
            <circle cx={h.x} cy={h.y} r="8" fill="currentColor" />
            <text x={h.x} y={h.y + (h.y > C.y ? 58 : -46)} textAnchor="middle" className="graphe__label">{labels[h.k]}</text>
          </g>
        ))}
        <circle cx={C.x} cy={C.y} r="80" fill="var(--bg)" stroke="rgba(255,255,255,.25)" strokeWidth="1.5" />
        <image href={portrait} x={C.x - 74} y={C.y - 74} width="148" height="148" clipPath="url(#rond)" preserveAspectRatio="xMidYMid slice" />
      </g>
    </svg>
  );
}
