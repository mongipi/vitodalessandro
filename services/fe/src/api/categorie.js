import { fetchStrapi } from "./client";

export async function getAllCategorie() {
  const res = await fetchStrapi("/api/categories?populate=*");

  if (!res.ok) throw new Error("Errore nel recupero delle categorie");

  return res.json();
}
