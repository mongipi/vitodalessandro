export async function getAllArticoli() {
const now = new Date().toISOString();
  const res = await fetch(
`${process.env.REACT_APP_STRAPI_API_URL}/api/articolis?populate=*&filters[pubblicato_il][$lte]=${encodeURIComponent(now)}&filters[publishedAt][$notNull]=true&sort=pubblicato_il:desc`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_STRAPI_TOKEN}`,
      },
    }
  );

  if (!res.ok) throw new Error("Errore nel recupero articoli");

  const response = await res.json();
  return response;
}

export async function getArticoloById(id) {
  const res = await fetch(
    `${process.env.REACT_APP_STRAPI_API_URL}/api/articolis/${id}?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_STRAPI_TOKEN}`,
      },
    }
  );

  if (!res.ok) throw new Error("Errore nel recupero dell'articolo");

  const response = await res.json();
  return response;
}

