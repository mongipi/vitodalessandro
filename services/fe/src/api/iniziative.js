import { fetchStrapi } from "./client";

export async function getAllInizative() {
  const query = `/api/iniziatives/?populate=*`

  const res = await fetchStrapi(query);

  if (!res.ok) throw new Error("Errore nel recupero inizative");

  return res.json();
}

export async function getIniziativaById(id) {
  const res = await fetchStrapi(`/api/iniziatives/${id}?populate=*`);

  if (!res.ok) throw new Error("Errore nel recupero dell'articolo");

  return res.json();
}

