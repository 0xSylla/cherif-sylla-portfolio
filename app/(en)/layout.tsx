import type { Metadata, Viewport } from "next";
import "../globals.css";
import { titre, mono, brut } from "../fonts";
import "../brut.css";
import { en } from "@/content/en";

export const metadata: Metadata = {
  metadataBase: new URL("https://cherif-sylla.vercel.app"),
  title: en.meta.title,
  description: en.meta.description,
  alternates: { canonical: "/en", languages: { fr: "/", en: "/en" } },
  openGraph: { title: en.meta.title, description: en.meta.description, images: ["/og.jpg"], locale: "en_US", type: "website" },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/favicon.ico", sizes: "32x32" }], apple: "/apple-icon.png" },
};
export const viewport: Viewport = { themeColor: "#07080c" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${titre.variable} ${mono.variable} ${brut.variable}`}><body>{children}</body></html>;
}
