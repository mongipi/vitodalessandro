import { fetchStrapi } from "./client";

export async function getAllArticoli() {
  const now = new Date().toISOString();
  const query = `/api/articolis?populate=*&filters[pubblicato_il][$lte]=${encodeURIComponent(
    now
  )}&filters[publishedAt][$notNull]=true&sort=pubblicato_il:desc`;

  const res = await fetchStrapi(query);

  if (!res.ok) throw new Error("Errore nel recupero articoli");

  return res.json();
}

export async function getArticoloById(id) {
  const res = await fetchStrapi(`/api/articolis/${id}?populate=*`);

  if (!res.ok) throw new Error("Errore nel recupero dell'articolo");

  return res.json();
}

