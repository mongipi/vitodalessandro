export async function getAllCategorie() {
  const res = await fetch(
    `${process.env.REACT_APP_STRAPI_API_URL}/categories?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_STRAPI_TOKEN}`,
      },
    }
  );

  if (!res.ok) throw new Error("Errore nel recupero delle categorie");

  const response = await res.json();
  return response;
}
