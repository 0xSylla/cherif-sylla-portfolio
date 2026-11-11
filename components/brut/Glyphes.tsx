/* Glyphes dessinés pour le site : illustrations des cartes « stack » (rendues en trame de points via un masque CSS)
   et icônes des réseaux. */

const svg = (corps: string) =>
  `url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>${corps}</svg>`)}")`;
// trait noir ; l'épaisseur est passée une seule fois (un attribut en double rend le SVG invalide)
const T = (w = 7) => `fill='none' stroke='#000' stroke-width='${w}' stroke-linejoin='round' stroke-linecap='round'`;

export const GLYPHES: Record<string, string> = {
  solidity: svg(`<path d='M50 6 L74 34 L50 50 L26 34 Z' ${T()}/><path d='M50 50 L74 66 L50 94 L26 66 Z' fill='#000'/><path d='M26 34 L50 50 L26 66' ${T()}/><path d='M74 34 L50 50 L74 66' ${T()}/>`),
  foundry: svg(`<path d='M14 30 H72 C84 30 90 38 92 44 H70 C68 52 62 56 56 58 L60 72 H72 V82 H28 V72 H40 L44 58 C30 56 22 46 14 30 Z' fill='#000'/>`),
  layerzero: svg(`<circle cx='50' cy='50' r='32' ${T(11)}/><path d='M22 78 L78 22' ${T(9)}/>`),
  chainlink: svg(`<path d='M50 8 L86 29 V71 L50 92 L14 71 V29 Z' ${T(11)}/>`),
  nextjs: svg(`<circle cx='50' cy='50' r='40' ${T(8)}/><path d='M36 70 V32 L68 74 M64 32 V56' ${T(8)}/>`),
  threejs: svg(`<path d='M10 88 L50 10 L90 88 Z' ${T()}/><path d='M30 49 L70 49 L50 88 Z' ${T()}/><path d='M40 30 L60 30 M20 68 L40 68 M60 68 L80 68' ${T(5)}/>`),
  typescript: svg(`<rect x='10' y='10' width='80' height='80' rx='10' ${T(8)}/><path d='M24 44 H50 M37 44 V78 M80 48 C76 42 60 41 58 50 C56 60 80 58 80 68 C80 78 62 79 56 72' ${T(8)}/>`),
  ugc: svg(`<rect x='28' y='6' width='44' height='88' rx='9' ${T(7)}/><path d='M42 36 V64 L64 50 Z' fill='#000'/><circle cx='50' cy='82' r='4' fill='#000'/>`),
};

const I = (d: React.ReactNode) => <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">{d}</svg>;
export const RESEAUX: Record<string, React.ReactNode> = {
  X: I(<path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />),
  Telegram: I(<path d="M3 11.5L20.5 4.5 17.5 19.5 11.5 15 8.5 18 8.5 13.5 17 7 7.5 12.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />),
  GitHub: I(<path d="M9 19c-4 1.3-4-2-6-2.5m12 4.5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6.2 0C6.6 2.8 5.6 3.1 5.6 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.2 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />),
  LinkedIn: I(<><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></>),
  Mail: I(<><rect x="3" y="5" width="18" height="14" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M3.5 6l8.5 7 8.5-7" fill="none" stroke="currentColor" strokeWidth="1.8" /></>),
  CV: I(<><path d="M6 3h9l4 4v14H6z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M9 12h7M9 16h7M9 8h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></>),
  Calendly: I(<><rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></>),
};
