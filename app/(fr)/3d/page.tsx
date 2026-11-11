import type { Metadata } from "next";
import Bureau3D from "@/components/Bureau3D";
import { fr } from "@/content/fr";
export const metadata: Metadata = { title: `${fr.hero.nom} — ${fr.piece.intro}`, alternates: { canonical: "/3d", languages: { fr: "/3d", en: "/en/3d" } } };
export default function Piece() { return <Bureau3D c={fr} />; }
