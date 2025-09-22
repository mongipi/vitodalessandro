import { fetchStrapi } from "./client";

export async function getFarmaciaTurno() {
  const today = new Date().toISOString().split("T")[0];

  const res = await fetchStrapi(
    `/api/oraris?filters[turno][$eq]=${today}&populate=farmacia`
  );

  if (!res.ok) throw new Error("Errore nel recupero delle categorie");

  return res.json();
}

