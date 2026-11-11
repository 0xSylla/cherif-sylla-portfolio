import type { Metadata } from "next";
import Bureau3D from "@/components/Bureau3D";
import { en } from "@/content/en";
export const metadata: Metadata = { title: `${en.hero.nom} — ${en.piece.intro}`, alternates: { canonical: "/en/3d", languages: { fr: "/3d", en: "/en/3d" } } };
export default function Room() { return <Bureau3D c={en} />; }
