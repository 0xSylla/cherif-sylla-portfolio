/* Icônes de Cherif OS, dessinées pour le site (aucune icône Microsoft). */
export type AppId = "web" | "ugc" | "chain" | "net" | "cv" | "contact" | "apropos" | "corbeille" | "navigateur";

export function Icone({ app, taille = 40 }: { app: AppId | "logo"; taille?: number }) {
  const p = { width: taille, height: taille, viewBox: "0 0 48 48", "aria-hidden": true } as const;
  switch (app) {
    case "logo":
      return (
        <svg {...p}>
          <defs><linearGradient id="lg-logo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4f8cff" /><stop offset=".35" stopColor="#ff5d8f" /><stop offset=".7" stopColor="#2ee59d" /><stop offset="1" stopColor="#ffb03b" /></linearGradient></defs>
          <rect x="4" y="4" width="40" height="40" rx="11" fill="url(#lg-logo)" />
          <text x="24" y="30.5" textAnchor="middle" fontSize="17" fontWeight="800" fill="#0b0c12" fontFamily="system-ui, sans-serif">CS</text>
        </svg>
      );
    case "web":
      return (
        <svg {...p}>
          <defs><linearGradient id="lg-dos" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffd56a" /><stop offset="1" stopColor="#f5a524" /></linearGradient></defs>
          <path d="M4 12a4 4 0 0 1 4-4h11l4 4h17a4 4 0 0 1 4 4v3H4z" fill="#e4931c" />
          <rect x="4" y="16" width="40" height="26" rx="4" fill="url(#lg-dos)" />
          <rect x="15" y="22" width="18" height="12" rx="2" fill="#4f8cff" />
          <path d="M19 26l-2 2 2 2M29 26l2 2-2 2M25 25l-2 6" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "navigateur":
      return (
        <svg {...p}>
          <circle cx="24" cy="24" r="19" fill="#4f8cff" />
          <path d="M5 24h38M24 5c6 6 6 32 0 38M24 5c-6 6-6 32 0 38" stroke="#dbe7ff" strokeWidth="2" fill="none" />
          <circle cx="24" cy="24" r="19" fill="none" stroke="#2f6be0" strokeWidth="2" />
        </svg>
      );
    case "ugc":
      return (
        <svg {...p}>
          <defs><linearGradient id="lg-ugc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff7aa6" /><stop offset="1" stopColor="#e0336f" /></linearGradient></defs>
          <rect x="12" y="4" width="24" height="40" rx="6" fill="url(#lg-ugc)" />
          <rect x="15" y="9" width="18" height="30" rx="3" fill="#2a0c18" />
          <path d="M21 19v10l9-5z" fill="#fff" />
          <circle cx="31" cy="12" r="2" fill="#ff3b3b" />
        </svg>
      );
    case "chain":
      return (
        <svg {...p}>
          <rect x="4" y="8" width="40" height="32" rx="5" fill="#0d1f19" stroke="#2ee59d" strokeWidth="2" />
          <path d="M4 14h40" stroke="#2ee59d" strokeWidth="2" />
          <path d="M11 22l5 4-5 4" stroke="#2ee59d" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 31h10" stroke="#2ee59d" strokeWidth="2.4" strokeLinecap="round" />
          <rect x="31" y="20" width="7" height="7" rx="1.5" fill="none" stroke="#2ee59d" strokeWidth="1.6" /><rect x="35" y="26" width="5" height="5" rx="1" fill="#2ee59d" />
        </svg>
      );
    case "net":
      return (
        <svg {...p}>
          <rect x="4" y="8" width="40" height="32" rx="5" fill="#1d1606" stroke="#ffb03b" strokeWidth="2" />
          <circle cx="24" cy="18" r="4" fill="#ffb03b" /><circle cx="14" cy="32" r="3.5" fill="none" stroke="#ffb03b" strokeWidth="2" /><circle cx="34" cy="32" r="3.5" fill="none" stroke="#ffb03b" strokeWidth="2" />
          <path d="M22 21l-6 8M26 21l6 8M17.5 32h13" stroke="#ffb03b" strokeWidth="2" />
        </svg>
      );
    case "cv":
      return (
        <svg {...p}>
          <path d="M11 4h18l10 10v28a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="#f4f4f6" />
          <path d="M29 4v8a2 2 0 0 0 2 2h8" fill="#d5d6dc" />
          <rect x="6" y="24" width="26" height="12" rx="2.5" fill="#e5484d" />
          <text x="19" y="33" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#fff" fontFamily="system-ui, sans-serif">PDF</text>
        </svg>
      );
    case "contact":
      return (
        <svg {...p}>
          <defs><linearGradient id="lg-mail" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6aa1ff" /><stop offset="1" stopColor="#3a6fe0" /></linearGradient></defs>
          <rect x="4" y="10" width="40" height="28" rx="4" fill="url(#lg-mail)" />
          <path d="M6 13l18 13 18-13" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinejoin="round" />
        </svg>
      );
    case "apropos":
      return (
        <svg {...p}>
          <path d="M11 4h18l10 10v28a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="#eef2fb" />
          <path d="M29 4v8a2 2 0 0 0 2 2h8" fill="#cfd8ec" />
          <path d="M15 20h18M15 26h18M15 32h12" stroke="#7a8db5" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "corbeille":
      return (
        <svg {...p}>
          <path d="M12 14h24l-2.4 26a3 3 0 0 1-3 2.7H17.4a3 3 0 0 1-3-2.7z" fill="#c8d2e6" fillOpacity=".55" stroke="#dfe6f4" strokeWidth="1.6" />
          <rect x="9" y="9" width="30" height="5" rx="2" fill="#dfe6f4" />
          <path d="M20 20v16M28 20v16" stroke="#9fb0cf" strokeWidth="1.8" strokeLinecap="round" />
          <rect x="21" y="16" width="9" height="11" rx="1" fill="#fff" transform="rotate(-12 25 21)" />
        </svg>
      );
  }
}

/* petites icônes système de la barre des tâches */
export const Sys = {
  wifi: <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M2 9a15 15 0 0 1 20 0M5.5 12.5a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" /><circle cx="12" cy="19.5" r="1.4" fill="currentColor" /></svg>,
  son: <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor" /><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" /></svg>,
  batterie: <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect x="2" y="7" width="18" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.6" fill="none" /><rect x="4" y="9" width="12" height="6" rx="1" fill="currentColor" /><rect x="21" y="10" width="1.6" height="4" rx=".8" fill="currentColor" /></svg>,
  recherche: <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6" stroke="currentColor" strokeWidth="2" fill="none" /><path d="M15 15l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>,
  power: <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 3v8M7 6.5a7 7 0 1 0 10 0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>,
  retour: <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>,
};
