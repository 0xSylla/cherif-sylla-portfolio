import type { Metadata, Viewport } from "next";
import "../globals.css";
import { titre, mono, brut } from "../fonts";
import "../brut.css";
import { fr } from "@/content/fr";

export const metadata: Metadata = {
  metadataBase: new URL("https://cherifsylla.xyz"),
  title: fr.meta.title,
  description: fr.meta.description,
  alternates: { canonical: "/", languages: { fr: "/", en: "/en" } },
  openGraph: { title: fr.meta.title, description: fr.meta.description, images: ["/og.jpg"], locale: "fr_FR", type: "website" },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/favicon.ico", sizes: "32x32" }], apple: "/apple-icon.png" },
};
export const viewport: Viewport = { themeColor: "#07080c" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="fr" className={`${titre.variable} ${mono.variable} ${brut.variable}`}><body>{children}</body></html>;
}
