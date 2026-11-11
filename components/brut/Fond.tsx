"use client";
/* Fond animé : un « tissu liquide » rendu en trame de points (halftone), en WebGL.
   Sans WebGL ou avec « réduire les animations », une image fixe en CSS prend le relais. */
import { useEffect, useRef } from "react";

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;
const FRAG = `
precision mediump float;
uniform vec2 res; uniform float t; uniform float pas; uniform float defil;
// bruit de valeur + fbm, puis déformation du domaine pour l'effet « soie »
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float v = 0.0, a = 0.5; for(int k=0;k<5;k++){ v += a*n(p); p = p*2.03 + 7.1; a *= 0.5; } return v; }
float tissu(vec2 uv){
  vec2 q = vec2(fbm(uv + 0.05*t), fbm(uv + vec2(5.2, 1.3) - 0.04*t));
  vec2 r = vec2(fbm(uv + 3.0*q + vec2(1.7, 9.2) + 0.03*t), fbm(uv + 3.0*q + vec2(8.3, 2.8)));
  float f = fbm(uv + 3.2*r);
  // plis : on accentue les crêtes
  return smoothstep(0.25, 0.95, 0.5 + 0.5*sin(f*9.0 + r.x*4.0));
}
void main(){
  vec2 px = gl_FragCoord.xy;
  px.y -= defil;
  vec2 cel = floor(px / pas) * pas + pas*0.5;           // centre de la cellule de la trame
  vec2 uv = cel / res.y * 1.6;
  float v = tissu(uv);
  float d = length(px - cel) / (pas*0.5);                // distance au centre (0 → 1)
  float point = 1.0 - smoothstep(v*0.95 - 0.12, v*0.95, d);
  vec3 col = mix(vec3(0.03, 0.018, 0.015), vec3(0.27, 0.115, 0.085), v*v) * point;
  col += vec3(0.02, 0.012, 0.01);                        // fond, jamais tout noir
  gl_FragColor = vec4(col, 1.0);
}`;

export default function Fond() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const gl = c.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl || matchMedia("(prefers-reduced-motion: reduce)").matches) { c.dataset.fixe = "1"; return; }
    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { c.dataset.fixe = "1"; return; }
    gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "res"), uT = gl.getUniformLocation(prog, "t"), uPas = gl.getUniformLocation(prog, "pas"), uDef = gl.getUniformLocation(prog, "defil");
    // résolution réduite : la trame de points n'a pas besoin du plein écran Retina
    const k = Math.min(devicePixelRatio, 1.5);
    const taille = () => { c.width = Math.round(innerWidth * k); c.height = Math.round(innerHeight * k); gl.viewport(0, 0, c.width, c.height); };
    taille(); addEventListener("resize", taille);
    let raf = 0, visible = true; const t0 = performance.now();
    const tour = () => {
      if (visible) {
        gl.uniform2f(uRes, c.width, c.height); gl.uniform1f(uT, (performance.now() - t0) / 1000);
        gl.uniform1f(uPas, 7 * k); gl.uniform1f(uDef, -scrollY * 0.15 * k);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      raf = requestAnimationFrame(tour);
    };
    raf = requestAnimationFrame(tour);
    const vis = () => { visible = !document.hidden; };
    document.addEventListener("visibilitychange", vis);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", taille); document.removeEventListener("visibilitychange", vis); };
  }, []);
  return <canvas ref={ref} className="b-fond" aria-hidden="true" />;
}
