"use client";
/* Carrousel « La stack » : grandes cartes qu'on fait glisser (souris, doigt, flèches, clavier),
   avec défilement automatique, et un fond en trame animée (dithering ordonné) dans la couleur de l'outil.
   Au survol ou au focus, le fond s'éteint et le logo s'allume en trame blanche. */
import { useEffect, useRef, useState } from "react";
import { GLYPHES } from "./Glyphes";

export type Outil = { k: string; nom: string; cat: string; desc: string; teinte: string; href: string };

// matrice de Bayer 4×4 (seuils du dithering)
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + 0.5) / 16);
const CEL = 4; // taille d'un « pixel » de trame, en pixels écran

function hex(c: string) { const n = parseInt(c.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }

function Carte({ o, actif, onSurvol }: { o: Outil; actif: boolean; onSurvol: (v: boolean) => void }) {
  const toile = useRef<HTMLCanvasElement>(null);
  const actifRef = useRef(actif);
  actifRef.current = actif;
  const relancer = useRef<() => void>(() => {});

  useEffect(() => {
    const c = toile.current!; const ctx = c.getContext("2d")!;
    const calme = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, img: ImageData | null = null, masque: Uint8ClampedArray | null = null;
    const [r, g, b] = hex(o.teinte);
    // le logo, rendu à la résolution de la trame, sert de masque
    const logo = new Image();
    logo.src = GLYPHES[o.k].slice(5, -2); // url("…") → …
    const preparer = () => {
      const R = c.getBoundingClientRect(); W = Math.max(1, Math.round(R.width / CEL)); H = Math.max(1, Math.round(R.height / CEL));
      c.width = W; c.height = H; img = ctx.createImageData(W, H);
      if (!logo.complete || !logo.naturalWidth) { masque = null; return; }
      const o2 = document.createElement("canvas"); o2.width = W; o2.height = H; const x2 = o2.getContext("2d")!;
      const lw = W * 0.62, lh = H * 0.5, s = Math.min(lw, lh);
      x2.drawImage(logo, (W - s) / 2, H * 0.14 + (lh - s) / 2, s, s);
      const d = x2.getImageData(0, 0, W, H).data; masque = new Uint8ClampedArray(W * H);
      for (let i = 0; i < W * H; i++) masque[i] = d[i * 4 + 3];
    };
    logo.onload = preparer;
    preparer();
    const ro = new ResizeObserver(preparer); ro.observe(c);

    let k = 0, raf = 0, visible = false;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(tour); }, { rootMargin: "100px" });
    io.observe(c);
    const t0 = performance.now();
    function dessiner(t: number) {
      if (!img) return;
      const p = img.data;
      for (let y = 0; y < H; y++) {
        const fondu = Math.min(1, Math.max(0, (0.97 - y / H) / 0.35)); // la trame s'efface vers le bas
        for (let x = 0; x < W; x++) {
          const i = y * W + x, seuil = BAYER[(y & 3) * 4 + (x & 3)];
          // champ animé : ondes croisées qui glissent lentement
          const v = 0.5 + 0.25 * Math.sin(x * 0.11 + t * 0.9) * Math.cos(y * 0.09 - t * 0.6) + 0.22 * Math.sin((x + y) * 0.05 - t * 0.5);
          const m = masque ? masque[i] / 255 : 0;
          // repos : fond coloré, logo en silhouette sombre ; survol : fond éteint, logo en trame blanche
          const fond = v * 0.85 * fondu * (1 - m) * (1 - k);
          const lum = (0.55 + 0.45 * v) * m * k;
          const j = i * 4;
          if (lum > seuil) { p[j] = 236; p[j + 1] = 232; p[j + 2] = 226; p[j + 3] = 255; }
          else if (fond > seuil) { p[j] = r; p[j + 1] = g; p[j + 2] = b; p[j + 3] = 200; }
          else { p[j + 3] = 0; }
        }
      }
      ctx.putImageData(img, 0, 0);
    }
    function tour(now: number) {
      raf = 0;
      if (!visible) return;
      k += ((actifRef.current ? 1 : 0) - k) * 0.14;
      dessiner(calme ? 0 : (now - t0) / 1000);
      if (!calme || Math.abs((actifRef.current ? 1 : 0) - k) > 0.01) raf = requestAnimationFrame(tour);
    }
    raf = requestAnimationFrame(tour);
    relancer.current = () => { if (!raf && visible) raf = requestAnimationFrame(tour); };
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [o.k, o.teinte]);

  // quand l'état change (survol), relancer le dessin s'il était à l'arrêt
  useEffect(() => { relancer.current(); }, [actif]);

  return (
    <a className={"b-sc" + (actif ? " est-leve" : "")} href={o.href} target="_blank" rel="noopener" draggable={false}
      style={{ ["--ink" as string]: o.teinte }} onMouseEnter={() => onSurvol(true)} onMouseLeave={() => onSurvol(false)} onFocus={() => onSurvol(true)} onBlur={() => onSurvol(false)}>
      <canvas ref={toile} className="b-sc__trame" aria-hidden="true" />
      <span className="b-sc__haut"><span>{o.cat}</span><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M7 17L17 7M7 7h10v10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
      <span className="b-sc__bas"><strong>{o.nom}</strong><span>{o.desc}</span></span>
    </a>
  );
}

export default function Stack({ outils, prec, suiv }: { outils: Outil[]; prec: string; suiv: string }) {
  const vue = useRef<HTMLDivElement>(null);
  const [leve, setLeve] = useState<number | null>(null);
  const [prog, setProg] = useState(0);
  const pause = useRef(0); // horodatage jusqu'auquel le défilement auto est suspendu

  const pas = () => { const el = vue.current!; const carte = el.querySelector<HTMLElement>(".b-sc"); return carte ? carte.offsetWidth + 16 : el.clientWidth * 0.8; };
  const aller = (sens: number, auto = false) => {
    const el = vue.current!; if (!auto) pause.current = performance.now() + 8000;
    const fin = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    if (sens > 0 && fin) el.scrollTo({ left: 0, behavior: "smooth" });
    else el.scrollBy({ left: sens * pas(), behavior: "smooth" });
  };

  useEffect(() => {
    const el = vue.current!;
    const maj = () => setProg(el.scrollWidth > el.clientWidth ? el.scrollLeft / (el.scrollWidth - el.clientWidth) : 0);
    el.addEventListener("scroll", maj, { passive: true }); maj();
    // glisser à la souris
    let bas: { x: number; s: number } | null = null, glisse = false;
    const down = (e: PointerEvent) => { if (e.pointerType !== "mouse") return; bas = { x: e.clientX, s: el.scrollLeft }; glisse = false; };
    const move = (e: PointerEvent) => { if (!bas) return; const dx = e.clientX - bas.x; if (Math.abs(dx) > 5) { glisse = true; el.classList.add("est-glisse"); } el.scrollLeft = bas.s - dx; pause.current = performance.now() + 8000; };
    const up = () => { bas = null; el.classList.remove("est-glisse"); };
    const clic = (e: MouseEvent) => { if (glisse) { e.preventDefault(); e.stopPropagation(); glisse = false; } };
    el.addEventListener("pointerdown", down); addEventListener("pointermove", move); addEventListener("pointerup", up); el.addEventListener("click", clic, true);
    const toucher = () => { pause.current = performance.now() + 8000; };
    el.addEventListener("touchstart", toucher, { passive: true }); el.addEventListener("wheel", toucher, { passive: true });
    // défilement automatique (pas en mode « réduire les animations »)
    const calme = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const auto = calme ? 0 : window.setInterval(() => {
      const r = el.getBoundingClientRect(); const visible = r.top < innerHeight && r.bottom > 0;
      if (visible && performance.now() > pause.current && !el.matches(":hover") && !el.contains(document.activeElement)) aller(1, true);
    }, 3200);
    return () => {
      el.removeEventListener("scroll", maj); el.removeEventListener("pointerdown", down); removeEventListener("pointermove", move); removeEventListener("pointerup", up);
      el.removeEventListener("click", clic, true); el.removeEventListener("touchstart", toucher); el.removeEventListener("wheel", toucher); clearInterval(auto);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="b-stackc">
      <div className="b-stackc__vue" ref={vue} tabIndex={0} aria-roledescription="carousel" aria-label="Stack"
        onKeyDown={e => { if (e.key === "ArrowRight") { e.preventDefault(); aller(1); } if (e.key === "ArrowLeft") { e.preventDefault(); aller(-1); } }}>
        <ul className="b-stackc__piste">
          {outils.map((o, i) => <li key={o.k}><Carte o={o} actif={leve === i} onSurvol={v => setLeve(l => (v ? i : l === i ? null : l))} /></li>)}
        </ul>
      </div>
      <div className="b-stackc__ctrl">
        <button type="button" className="b-boite b-stackc__fl" onClick={() => aller(-1)} aria-label={prec}>←</button>
        <div className="b-stackc__barre" aria-hidden="true"><span style={{ width: `${Math.max(8, prog * 100)}%` }} /></div>
        <button type="button" className="b-boite b-stackc__fl" onClick={() => aller(1)} aria-label={suiv}>→</button>
      </div>
    </div>
  );
}
