export async function getSantoDelGiorno() {
  const now = new Date();
  const mese = now.getMonth() + 1; // numero, es. 3
  const giorno = now.getDate(); // numero, es. 8

  const url = `https://santodelgiorno.mintdev.me/api/v1/santo/data/${mese}/${giorno}`;

    const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_SANTO_DEL_GIORNO_API_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error("Errore nel recupero del santo del giorno");
  }

  return res.json();
}
