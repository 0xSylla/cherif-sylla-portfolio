/* Le bureau en 3D, vue isométrique. Tout est construit en code (three.js), aucun modèle externe.
 * Chaque zone cliquable mène à une partie du portfolio :
 *   web      → bureau, écran et téléphone (vidéos des sites)
 *   ugc      → trépied, téléphone et ring light (clips UGC)
 *   chain    → blocs flottants reliés en chaîne
 *   net      → baie réseau et routeur, câbles où passent des paquets
 *   parcours → diplômes au mur
 *   contact  → néon à mon nom */
import * as THREE from "three";

export type Zone = "web" | "ugc" | "chain" | "net" | "parcours" | "contact";
export const ZONES: Zone[] = ["web", "ugc", "chain", "net", "parcours", "contact"];
export const COULEUR: Record<Zone, string> = {
  web: "#4f8cff", ugc: "#ff5d8f", chain: "#2ee59d", net: "#ffb03b", parcours: "#c9cbd6", contact: "#ffffff",
};

type Options = {
  sites: string[];  // ids des vidéos de sites (public/media/web/<id>-d.mp4 et -m.mp4)
  clips: string[];  // ids des clips UGC (public/media/ugc/<id>.mp4)
  nom: string;      // texte du néon
  reduit: boolean;  // « réduire les animations »
  onSurvol: (z: Zone | null) => void;
  onClic: (z: Zone) => void;
  onPins: (pins: { z: Zone; x: number; y: number }[]) => void;
};

export function creerPiece(toile: HTMLCanvasElement, o: Options) {
  const rendu = new THREE.WebGLRenderer({ canvas: toile, antialias: true, alpha: false, powerPreference: "high-performance" });
  const mobile = matchMedia("(max-width: 760px)").matches;
  rendu.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 2));
  rendu.outputColorSpace = THREE.SRGBColorSpace;
  rendu.toneMapping = THREE.ACESFilmicToneMapping;
  rendu.toneMappingExposure = 1.05;
  rendu.shadowMap.enabled = true;
  rendu.shadowMap.type = THREE.PCFSoftShadowMap;
  rendu.setClearColor(0x07080c);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x07080c, 34, 60);
  const CIBLE = new THREE.Vector3(5, 1.7, 5);
  const DIR = new THREE.Vector3(1, 0.86, 1).normalize();
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 120);

  /* ---------- matériaux ---------- */
  const std = (c: string | number, r = 0.85, m = 0, e?: string | number, ei = 0) =>
    new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m, emissive: e ?? 0x000000, emissiveIntensity: ei });
  const M = {
    mur: std("#2a3150", 0.95), mur2: std("#323a5c", 0.95), sol: std("#4a3a2e", 0.75), plinthe: std("#141824", 0.7),
    tapis: std("#2f3a5f", 1), tapisBord: std("#4f8cff", 1, 0, "#4f8cff", 0.15),
    bois: std("#7a5638", 0.6), boisFonce: std("#4a3324", 0.7), noir: std("#0d0f15", 0.5, 0.2), metal: std("#59606f", 0.35, 0.7),
    gris: std("#2b303d", 0.7, 0.1), blanc: std("#e9e6df", 0.6), cadre: std("#c9a96e", 0.4, 0.6),
    vert: std("#2f8f4e", 0.8), vertClair: std("#46b46a", 0.8), pot: std("#c46a45", 0.8),
  };

  /* ---------- aides ---------- */
  const zones = {} as Record<Zone, THREE.Group>;
  const ancres = {} as Record<Zone, THREE.Vector3>;
  const halos = {} as Record<Zone, THREE.Mesh>;
  const cliquables: THREE.Object3D[] = [];
  function zone(z: Zone, ancre: [number, number, number], halo: [number, number, number]) {
    const g = new THREE.Group(); g.userData.zone = z; scene.add(g); zones[z] = g; ancres[z] = new THREE.Vector3(...ancre);
    const h = new THREE.Mesh(new THREE.CircleGeometry(halo[2], 48), new THREE.MeshBasicMaterial({ color: COULEUR[z], transparent: true, opacity: 0, depthWrite: false }));
    h.rotation.x = -Math.PI / 2; h.position.set(halo[0], 0.03, halo[1]); scene.add(h); halos[z] = h;
    return g;
  }
  function boite(w: number, h: number, d: number, mat: THREE.Material, x: number, y: number, z: number, parent: THREE.Object3D = scene, ombre = true) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z);
    m.castShadow = ombre; m.receiveShadow = true; parent.add(m); return m;
  }
  function cyl(rt: number, rb: number, h: number, mat: THREE.Material, x: number, y: number, z: number, parent: THREE.Object3D = scene, seg = 24) {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat); m.position.set(x, y, z);
    m.castShadow = true; m.receiveShadow = true; parent.add(m); return m;
  }
  function texteTexture(texte: string, couleur: string, w = 1024, h = 192, taille = 120) {
    const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d")!;
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
    const dessiner = () => {
      // même police que le site (variable posée par next/font)
      const fam = getComputedStyle(document.documentElement).getPropertyValue("--f-titre").trim() || "system-ui, sans-serif";
      x.clearRect(0, 0, w, h);
      x.font = `800 ${taille}px ${fam}`; x.textAlign = "center"; x.textBaseline = "middle";
      x.shadowColor = couleur; x.shadowBlur = 28; x.fillStyle = couleur; x.fillText(texte, w / 2, h / 2 + 6);
      x.shadowBlur = 8; x.fillStyle = "#ffffff"; x.fillText(texte, w / 2, h / 2 + 6);
      t.needsUpdate = true;
    };
    dessiner(); document.fonts?.ready.then(dessiner);
    return t;
  }
  function video(src: string, boucle: boolean) {
    const v = document.createElement("video"); v.src = src; v.muted = true; v.loop = boucle; v.playsInline = true; v.preload = "auto"; v.crossOrigin = "anonymous";
    v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
    const t = new THREE.VideoTexture(v); t.colorSpace = THREE.SRGBColorSpace; t.minFilter = THREE.LinearFilter;
    return { v, t };
  }
  const ecran = (t: THREE.Texture) => new THREE.MeshBasicMaterial({ map: t, toneMapped: false });

  /* ---------- la pièce ---------- */
  boite(10, 0.2, 10, M.sol, 5, -0.1, 5, scene, false);
  // lattes du parquet
  for (let i = 1; i < 10; i++) boite(0.02, 0.005, 10, M.boisFonce, i, 0.002, 5, scene, false);
  boite(10, 6, 0.2, M.mur, 5, 3, -0.1, scene, false);
  boite(0.2, 6, 10, M.mur2, -0.1, 3, 5, scene, false);
  boite(10, 0.18, 0.06, M.plinthe, 5, 0.09, 0.03, scene, false);
  boite(0.06, 0.18, 10, M.plinthe, 0.03, 0.09, 5, scene, false);
  // tapis
  boite(4.6, 0.03, 3.4, M.tapisBord, 5, 0.015, 5.2, scene, false);
  boite(4.4, 0.04, 3.2, M.tapis, 5, 0.02, 5.2, scene, false);

  // fenêtre de nuit sur le mur de gauche
  {
    const c = document.createElement("canvas"); c.width = 256; c.height = 256; const x = c.getContext("2d")!;
    const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, "#0b1030"); g.addColorStop(1, "#2a1f4f"); x.fillStyle = g; x.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 70; i++) { x.fillStyle = `rgba(255,255,255,${Math.random() * 0.8})`; x.fillRect(Math.random() * 256, Math.random() * 150, 1.5, 1.5); }
    x.fillStyle = "#06081a"; for (let i = 0; i < 12; i++) { const w = 14 + Math.random() * 18, h = 40 + Math.random() * 80, px = i * 22; x.fillRect(px, 256 - h, w, h); }
    x.fillStyle = "#ffd27a"; for (let i = 0; i < 60; i++) x.fillRect(Math.random() * 256, 170 + Math.random() * 80, 2, 3);
    x.fillStyle = "#f4f1e0"; x.beginPath(); x.arc(190, 52, 16, 0, Math.PI * 2); x.fill();
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
    const vitre = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 2), new THREE.MeshBasicMaterial({ map: t, toneMapped: false }));
    vitre.rotation.y = Math.PI / 2; vitre.position.set(0.02, 3.2, 7.2); scene.add(vitre);
    // cadre : montants, traverses et croisillon
    for (const z of [6.0, 7.2, 8.4]) boite(0.1, 2.1, 0.08, M.blanc, 0.05, 3.2, z, scene, false);
    for (const y of [2.18, 3.2, 4.22]) boite(0.1, 0.08, 2.48, M.blanc, 0.05, y, 7.2, scene, false);
    boite(0.3, 0.06, 2.6, M.blanc, 0.15, 2.12, 7.2);
  }

  // plante
  {
    cyl(0.32, 0.24, 0.6, M.pot, 9.2, 0.3, 1.0);
    for (let i = 0; i < 9; i++) {
      const f = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 8), i % 2 ? M.vert : M.vertClair);
      const a = i * 0.7; f.scale.set(0.55, 1.4, 0.3); f.position.set(9.2 + Math.cos(a) * 0.22, 1.05 + (i % 3) * 0.22, 1.0 + Math.sin(a) * 0.22);
      f.rotation.set(Math.sin(a) * 0.6, a, Math.cos(a) * 0.6); f.castShadow = true; scene.add(f);
    }
  }

  /* ---------- WEB : bureau, écran, téléphone ---------- */
  const gWeb = zone("web", [5, 2.4, 1.0], [5, 1.7, 2.6]);
  boite(4.6, 0.12, 1.7, M.bois, 5, 1.5, 1.05, gWeb);
  for (const [x, z] of [[2.85, 0.35], [7.15, 0.35], [2.85, 1.75], [7.15, 1.75]]) boite(0.1, 1.44, 0.1, M.noir, x, 0.72, z, gWeb);
  boite(1.1, 0.7, 1.4, M.boisFonce, 6.5, 1.06, 1.05, gWeb); // caisson
  // écran
  boite(0.5, 0.05, 0.35, M.noir, 5, 1.585, 0.55, gWeb);
  boite(0.1, 0.55, 0.08, M.noir, 5, 1.85, 0.5, gWeb);
  boite(2.75, 1.68, 0.1, M.noir, 5, 2.75, 0.55, gWeb);
  const vSite = video(`/media/web/${o.sites[0]}-d.mp4`, false);
  const dalle = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.625), ecran(vSite.t)); dalle.position.set(5, 2.75, 0.606); gWeb.add(dalle);
  // clavier, souris, tasse
  boite(1.5, 0.05, 0.45, M.gris, 4.8, 1.585, 1.35, gWeb);
  for (let r = 0; r < 4; r++) for (let k = 0; k < 13; k++) boite(0.09, 0.03, 0.08, M.noir, 4.2 + k * 0.1, 1.62, 1.2 + r * 0.1, gWeb, false);
  boite(0.16, 0.05, 0.26, M.gris, 5.9, 1.585, 1.35, gWeb);
  cyl(0.13, 0.11, 0.26, M.blanc, 3.3, 1.69, 1.2, gWeb);
  // téléphone sur son support (version mobile du site)
  const vMob = video(`/media/web/${o.sites[0]}-m.mp4`, true);
  const tel = new THREE.Group(); tel.position.set(6.55, 1.62, 1.0); tel.rotation.set(-0.25, -0.35, 0); gWeb.add(tel);
  boite(0.42, 0.86, 0.05, M.noir, 0, 0.44, 0, tel);
  const telEcran = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.82), ecran(vMob.t)); telEcran.position.set(0, 0.44, 0.027); tel.add(telEcran);
  boite(0.3, 0.06, 0.3, M.metal, 0, 0, 0.05, tel);
  // chaise
  {
    const ch = new THREE.Group(); ch.position.set(4.9, 0, 2.6); ch.rotation.y = 0.35; gWeb.add(ch);
    boite(1.0, 0.14, 1.0, M.gris, 0, 0.95, 0, ch);
    boite(1.0, 1.1, 0.14, M.gris, 0, 1.6, 0.48, ch);
    cyl(0.05, 0.05, 0.85, M.metal, 0, 0.45, 0, ch);
    for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2; boite(0.5, 0.05, 0.08, M.noir, Math.cos(a) * 0.25, 0.06, Math.sin(a) * 0.25, ch).rotation.y = -a; }
  }
  // lumière bleue de l'écran
  const lWeb = new THREE.PointLight(COULEUR.web, 9, 7, 2); lWeb.position.set(5, 2.8, 1.6); scene.add(lWeb);

  /* ---------- NET : baie réseau, routeur, câbles ---------- */
  const gNet = zone("net", [0.9, 2.0, 1.0], [0.95, 1.0, 1.25]);
  boite(1.3, 3.2, 1.2, M.noir, 0.85, 1.6, 0.85, gNet);
  const leds: THREE.Mesh[] = [];
  for (let r = 0; r < 7; r++) {
    boite(1.1, 0.32, 0.04, M.gris, 0.85, 0.5 + r * 0.4, 1.46, gNet, false);
    for (let k = 0; k < 6; k++) {
      const c = [COULEUR.chain, COULEUR.net, COULEUR.web][(r + k) % 3];
      const l = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.02), new THREE.MeshBasicMaterial({ color: c, toneMapped: false }));
      l.position.set(0.42 + k * 0.08, 0.5 + r * 0.4, 1.49); gNet.add(l); leds.push(l);
    }
    for (let k = 0; k < 4; k++) boite(0.12, 0.08, 0.02, M.noir, 1.0 + k * 0.1, 0.5 + r * 0.4, 1.49, gNet, false);
  }
  // routeur avec antennes, sur la baie
  boite(0.9, 0.18, 0.6, M.gris, 0.85, 3.31, 0.85, gNet);
  for (const x of [0.5, 1.2]) { const a = cyl(0.03, 0.03, 0.7, M.noir, x, 3.7, 0.65, gNet); a.rotation.z = x < 1 ? 0.2 : -0.2; }
  const lNet = new THREE.PointLight(COULEUR.net, 6, 5, 2); lNet.position.set(1.6, 2.4, 2.2); scene.add(lNet);

  // câbles : baie → écran, baie → trépied, baie → blocs (paquets qui circulent)
  const cables: THREE.CatmullRomCurve3[] = [
    new THREE.CatmullRomCurve3([new THREE.Vector3(1.5, 0.4, 1.2), new THREE.Vector3(2.4, 0.03, 1.4), new THREE.Vector3(3.6, 0.03, 0.6), new THREE.Vector3(4.9, 0.6, 0.45), new THREE.Vector3(5, 1.6, 0.45)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(1.5, 0.3, 1.4), new THREE.Vector3(2.6, 0.03, 3.4), new THREE.Vector3(5.5, 0.03, 7.6), new THREE.Vector3(7.4, 0.03, 7.0), new THREE.Vector3(7.75, 0.4, 6.75)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(1.4, 0.2, 1.5), new THREE.Vector3(1.8, 0.03, 3.6), new THREE.Vector3(2.0, 0.03, 6.0), new THREE.Vector3(2.2, 0.4, 7.0)]),
  ];
  const coulCable = [COULEUR.web, COULEUR.ugc, COULEUR.chain];
  cables.forEach(cb => { const t = new THREE.Mesh(new THREE.TubeGeometry(cb, 60, 0.025, 6, false), M.noir); t.receiveShadow = true; gNet.add(t); });
  const paquets = Array.from({ length: 9 }, (_, i) => {
    const p = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), new THREE.MeshBasicMaterial({ color: coulCable[i % 3], toneMapped: false }));
    scene.add(p); return { p, c: i % 3, t: (i * 0.37) % 1, v: 0.12 + (i % 3) * 0.03 };
  });

  /* ---------- UGC : trépied, téléphone, ring light ---------- */
  const gUgc = zone("ugc", [7.9, 2.3, 6.9], [7.9, 6.9, 1.1]);
  const trep = new THREE.Group(); trep.position.set(7.9, 0, 6.9); trep.rotation.y = Math.PI / 4 + 0.35; gUgc.add(trep);
  for (let i = 0; i < 3; i++) { const a = (i / 3) * Math.PI * 2; const p = cyl(0.025, 0.025, 1.75, M.noir, Math.cos(a) * 0.38, 0.82, Math.sin(a) * 0.38, trep); p.rotation.set(Math.sin(a) * 0.42, 0, -Math.cos(a) * 0.42); }
  cyl(0.04, 0.04, 1.05, M.noir, 0, 2.05, 0, trep);
  const anneau = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.07, 16, 64), new THREE.MeshStandardMaterial({ color: "#ffffff", emissive: "#ffe3ee", emissiveIntensity: 2.2 }));
  anneau.position.set(0, 2.75, 0); trep.add(anneau);
  const vUgc = video(`/media/ugc/${o.clips[0]}.mp4`, false);
  boite(0.42, 0.86, 0.05, M.noir, 0, 2.75, 0.04, trep);
  const ugcEcran = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.8), ecran(vUgc.t)); ugcEcran.position.set(0, 2.75, 0.068); trep.add(ugcEcran);
  const rec = new THREE.Mesh(new THREE.CircleGeometry(0.03, 16), new THREE.MeshBasicMaterial({ color: "#ff3b3b", toneMapped: false })); rec.position.set(0.13, 3.1, 0.07); trep.add(rec);
  // petit tabouret face caméra
  cyl(0.38, 0.38, 0.1, M.gris, 8.95, 0.85, 8.3, gUgc); cyl(0.05, 0.05, 0.8, M.metal, 8.95, 0.4, 8.3, gUgc);
  const lUgc = new THREE.PointLight(COULEUR.ugc, 9, 6, 2); lUgc.position.set(8.3, 2.8, 7.6); scene.add(lUgc);

  /* ---------- CHAIN : blocs reliés ---------- */
  const gChain = zone("chain", [2.3, 2.4, 7.0], [2.3, 7.0, 1.2]);
  cyl(0.75, 0.85, 0.9, M.gris, 2.3, 0.45, 7.0, gChain, 6);
  const blocs: THREE.Group[] = [];
  const faceBloc = new THREE.MeshStandardMaterial({ color: "#0f2b22", emissive: COULEUR.chain, emissiveIntensity: 0.25, transparent: true, opacity: 0.85, roughness: 0.3 });
  const areteBloc = new THREE.LineBasicMaterial({ color: COULEUR.chain });
  const pos: [number, number, number][] = [[1.75, 1.45, 6.7], [2.55, 1.95, 6.55], [2.85, 2.6, 7.35], [2.05, 3.15, 7.55]];
  pos.forEach(([x, y, z]) => {
    const g = new THREE.Group(); g.position.set(x, y, z); gChain.add(g);
    const geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const m = new THREE.Mesh(geo, faceBloc); m.castShadow = true; g.add(m);
    g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), areteBloc));
    blocs.push(g);
  });
  const lienGeo = new THREE.BufferGeometry().setFromPoints(pos.map(p => new THREE.Vector3(...p)));
  const liens = new THREE.Line(lienGeo, new THREE.LineDashedMaterial({ color: COULEUR.chain, dashSize: 0.08, gapSize: 0.06 }));
  liens.computeLineDistances(); gChain.add(liens);
  const lChain = new THREE.PointLight(COULEUR.chain, 8, 6, 2); lChain.position.set(2.6, 2.6, 7.6); scene.add(lChain);

  /* ---------- PARCOURS : diplômes au mur + étagère ---------- */
  const gParc = zone("parcours", [8.6, 3.2, 0.3], [8.6, 0.9, 1.0]);
  const diplome = (x: number, y: number, w: number, h: number) => {
    boite(w, h, 0.06, M.cadre, x, y, 0.04, gParc);
    const p = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.14, h - 0.14), std("#f3efe3", 0.9)); p.position.set(x, y, 0.075); gParc.add(p);
    for (let i = 0; i < 3; i++) boite(w * 0.5, 0.025, 0.01, M.boisFonce, x, y + h * 0.18 - i * 0.12, 0.08, gParc, false);
  };
  diplome(8.0, 3.5, 0.95, 0.7); diplome(9.2, 3.5, 0.95, 0.7); diplome(8.6, 2.65, 0.8, 0.6);
  boite(2.0, 0.08, 0.4, M.bois, 8.6, 1.95, 0.22, gParc);
  [["#4f8cff", 0.5], ["#ff5d8f", 0.42], ["#2ee59d", 0.55], ["#ffb03b", 0.46], ["#c9cbd6", 0.5]].forEach(([c, h], i) =>
    boite(0.12, h as number, 0.3, std(c as string, 0.7), 7.9 + i * 0.14, 1.99 + (h as number) / 2, 0.22, gParc));

  /* ---------- CONTACT : néon ---------- */
  const gContact = zone("contact", [5, 4.1, 0.6], [5, 2.6, 0.01]);
  const neon = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 0.79), new THREE.MeshBasicMaterial({ map: texteTexture(o.nom.toUpperCase(), "#ff5d8f"), transparent: true, toneMapped: false }));
  neon.position.set(5, 4.6, 0.06); gContact.add(neon);
  const neonFond = boite(4.3, 0.95, 0.03, new THREE.MeshStandardMaterial({ color: "#11131c", roughness: 0.4, transparent: true, opacity: 0.6 }), 5, 4.6, 0.015, gContact, false);
  neonFond.userData.zone = "contact";
  const lNeon = new THREE.PointLight("#ff5d8f", 5, 5, 2); lNeon.position.set(5, 4.5, 0.9); scene.add(lNeon);

  /* ---------- lumières générales ---------- */
  scene.add(new THREE.HemisphereLight("#9fb0ff", "#3a2618", 1.25));
  const soleil = new THREE.DirectionalLight("#ffe2c4", 2.1);
  soleil.position.set(12, 14, 10); soleil.target.position.set(4, 0, 4); scene.add(soleil, soleil.target);
  soleil.castShadow = true; soleil.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048);
  Object.assign(soleil.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 1, far: 40 }); soleil.shadow.bias = -0.0008; soleil.shadow.normalBias = 0.02;

  // zones cliquables : chaque maillage connaît sa zone
  ZONES.forEach(z => zones[z].traverse(m => { m.userData.zone = z; if ((m as THREE.Mesh).isMesh) cliquables.push(m); }));

  /* ---------- vidéos : l'écran passe d'un site à l'autre, le téléphone suit ---------- */
  let iSite = 0, iClip = 0;
  const lire = (v: HTMLVideoElement) => { if (!o.reduit) v.play().catch(() => {}); };
  vSite.v.addEventListener("ended", () => {
    iSite = (iSite + 1) % o.sites.length;
    vSite.v.src = `/media/web/${o.sites[iSite]}-d.mp4`; vMob.v.src = `/media/web/${o.sites[iSite]}-m.mp4`; lire(vSite.v); lire(vMob.v);
  });
  vUgc.v.addEventListener("ended", () => { iClip = (iClip + 1) % o.clips.length; vUgc.v.src = `/media/ugc/${o.clips[iClip]}.mp4`; lire(vUgc.v); });
  [vSite.v, vMob.v, vUgc.v].forEach(lire);

  /* ---------- caméra : cadrage, zoom vers une zone ---------- */
  let W = 1, H = 1, zoomCible = 1, focusZone: Zone | null = null, decalage = 0, baseX = 0, baseY = 0;
  const regard = CIBLE.clone(), regardCible = CIBLE.clone();
  let intro = o.reduit ? 1 : 0;
  function taille() {
    W = toile.clientWidth; H = toile.clientHeight; rendu.setSize(W, H, false);
    // au repos, la pièce laisse de la place au texte d'accueil (à gauche sur ordinateur, en haut sur téléphone)
    baseX = W > 900 ? -W * 0.11 : 0; baseY = W > 900 ? 0 : -H * 0.07;
    const a = W / H, F = a < 0.8 ? 12.6 / a : Math.max(12.5, 15.5 / a); // sur téléphone, la pièce remplit la largeur
    cam.left = (-F * a) / 2; cam.right = (F * a) / 2; cam.top = F / 2; cam.bottom = -F / 2;
    cam.updateProjectionMatrix();
  }
  taille();
  const ro = new ResizeObserver(taille); ro.observe(toile);

  /* ---------- souris ---------- */
  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2(-9, -9);
  let survol: Zone | null = null;
  const choisir = (e: PointerEvent): Zone | null => {
    const r = toile.getBoundingClientRect();
    ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, cam);
    const hit = ray.intersectObjects(cliquables, false)[0];
    return (hit?.object.userData.zone as Zone) ?? null;
  };
  const bouge = (e: PointerEvent) => {
    if (focusZone) return;
    const z = choisir(e);
    if (z !== survol) { survol = z; o.onSurvol(z); toile.style.cursor = z ? "pointer" : "default"; }
  };
  let bas: { x: number; y: number } | null = null;
  const appui = (e: PointerEvent) => { bas = { x: e.clientX, y: e.clientY }; };
  const clic = (e: PointerEvent) => {
    if (!bas || Math.hypot(e.clientX - bas.x, e.clientY - bas.y) > 8) return;
    const z = choisir(e); if (z) o.onClic(z);
  };
  toile.addEventListener("pointermove", bouge);
  toile.addEventListener("pointerdown", appui);
  toile.addEventListener("pointerup", clic);
  const sortie = () => { if (survol) { survol = null; o.onSurvol(null); } };
  toile.addEventListener("pointerleave", sortie);

  /* ---------- boucle ---------- */
  const horloge = new THREE.Clock();
  const v3 = new THREE.Vector3();
  let raf = 0, zoom = o.reduit ? 1 : 0.62, dx = 0, dy = 0;
  function tour() {
    const dt = Math.min(horloge.getDelta(), 0.05), t = horloge.elapsedTime;
    if (intro < 1) intro = Math.min(1, intro + dt / 1.8);
    // caméra : orbite légère au repos, zoom vers la zone choisie
    const orb = o.reduit || focusZone ? 0 : Math.sin(t * 0.15) * 0.06;
    const d = DIR.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), orb);
    regard.lerp(regardCible, o.reduit ? 1 : 0.07);
    zoom += (zoomCible - zoom) * (o.reduit ? 1 : intro < 1 ? 0.04 : 0.07);
    cam.position.copy(regard).addScaledVector(d, 40); cam.lookAt(regard);
    cam.zoom = zoom;
    dx += ((focusZone ? decalage : baseX) - dx) * (o.reduit ? 1 : 0.08); dy += ((focusZone ? 0 : baseY) - dy) * (o.reduit ? 1 : 0.08);
    cam.setViewOffset(W, H, dx, dy, W, H);
    cam.updateProjectionMatrix();
    // halos et soulèvement au survol
    ZONES.forEach(z => {
      const actif = z === survol || z === focusZone;
      const m = halos[z].material as THREE.MeshBasicMaterial; m.opacity += ((actif ? 0.32 : 0) - m.opacity) * 0.15;
      zones[z].position.y += ((actif && !focusZone ? 0.08 : 0) - zones[z].position.y) * 0.2;
    });
    if (!o.reduit) {
      blocs.forEach((b, i) => { b.rotation.y = t * 0.5 + i; b.rotation.x = Math.sin(t * 0.7 + i) * 0.25; b.position.y = pos[i][1] + Math.sin(t * 1.3 + i * 1.4) * 0.07; });
      leds.forEach((l, i) => { l.visible = Math.sin(t * (3 + (i % 5)) + i * 1.7) > -0.3; });
      paquets.forEach(p => { p.t = (p.t + dt * p.v) % 1; cables[p.c].getPointAt(p.t, v3); p.p.position.copy(v3).y += 0.04; });
      rec.visible = Math.sin(t * 4) > 0;
      (neon.material as THREE.MeshBasicMaterial).opacity = 0.9 + Math.sin(t * 9) * 0.03 + (Math.random() > 0.995 ? -0.5 : 0);
    } else {
      paquets.forEach(p => { cables[p.c].getPointAt(p.t, v3); p.p.position.copy(v3); });
    }
    // repères au-dessus des zones (projetés à l'écran)
    o.onPins(ZONES.map(z => { v3.copy(ancres[z]); v3.y += zones[z].position.y + 0.9; v3.project(cam); return { z, x: (v3.x * 0.5 + 0.5) * W, y: (-v3.y * 0.5 + 0.5) * H }; }));
    rendu.render(scene, cam);
    raf = requestAnimationFrame(tour);
  }
  raf = requestAnimationFrame(tour);

  return {
    /* zoomer sur une zone ; dx = décalage horizontal en pixels (panneau ouvert à droite) */
    focus(z: Zone | null, dx = 0) {
      focusZone = z; decalage = dx;
      if (z) { regardCible.copy(ancres[z]); zoomCible = mobile ? 1.5 : 1.75; survol = null; o.onSurvol(null); }
      else { regardCible.copy(CIBLE); zoomCible = 1; }
    },
    pause(p: boolean) { [vSite.v, vMob.v, vUgc.v].forEach(v => (p ? v.pause() : lire(v))); },
    detruire() {
      cancelAnimationFrame(raf); ro.disconnect();
      toile.removeEventListener("pointermove", bouge); toile.removeEventListener("pointerdown", appui);
      toile.removeEventListener("pointerup", clic); toile.removeEventListener("pointerleave", sortie);
      [vSite.v, vMob.v, vUgc.v].forEach(v => { v.pause(); v.removeAttribute("src"); v.load(); });
      scene.traverse(m => { const k = m as THREE.Mesh; k.geometry?.dispose(); const mt = k.material as THREE.Material | THREE.Material[] | undefined; (Array.isArray(mt) ? mt : mt ? [mt] : []).forEach(x => x.dispose()); });
      rendu.dispose();
    },
  };
}
