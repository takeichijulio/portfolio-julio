import { notFound } from "next/navigation";

/** Qualquer rota desconhecida dentro do locale cai na 404 custom. */
export default function CatchAllPage() {
  notFound();
}
