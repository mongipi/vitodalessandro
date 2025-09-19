export async function getFarmaciaTurno() {
     const today = new Date().toISOString().split("T")[0]; 
     
    const res = await fetch(
    
    `${process.env.REACT_APP_STRAPI_API_URL}/api/oraris?filters[turno][$eq]=${today}&populate=farmacia`,
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