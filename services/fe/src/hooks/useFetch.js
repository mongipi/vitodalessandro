import { useState, useEffect } from "react";
import { APIError } from "../api/client";

/**
 * Hook personalizzato per il fetching dei dati
 * Gestisce loading, errori e cache
 * @param {Function} asyncFunction - Funzione asincrona da eseguire
 * @param {Array} dependencies - Array di dipendenze
 * @param {number} cacheTime - Tempo cache in ms (0 = no cache)
 * @returns {Object} { data, loading, error, retry }
 */
export function useFetch(asyncFunction, dependencies = [], cacheTime = 0) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  const [cacheData, setCacheData] = useState(null);
  const [cacheExpiry, setCacheExpiry] = useState(0);

  const fetchData = async () => {
    // Controlla se i dati in cache sono ancora validi
    if (cacheData && Date.now() < cacheExpiry) {
      setState({ data: cacheData, loading: false, error: null });
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const result = await asyncFunction();
      setState({ data: result, loading: false, error: null });

      // Memorizza in cache se abilitato
      if (cacheTime > 0) {
        setCacheData(result);
        setCacheExpiry(Date.now() + cacheTime);
      }
    } catch (err) {
      const errorMessage =
        err instanceof APIError ? err.message : "Si è verificato un errore";
      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { ...state, retry: fetchData };
}

/**
 * Hook per gestire articoli
 */
export function useArticoli() {
  const { getAllArticoli } = require("../api/articoli");
  return useFetch(getAllArticoli, [], 300000); // Cache 5 minuti
}

/**
 * Hook per gestire un articolo specifico
 */
export function useArticoloById(id) {
  const { getArticoloById } = require("../api/articoli");
  return useFetch(() => getArticoloById(id), [id]);
}

/**
 * Hook per gestire categorie
 */
export function useCategorie() {
  const { getAllCategories } = require("../api/categorie");
  return useFetch(getAllCategories, [], 300000);
}

/**
 * Hook per gestire farmacie
 */
export function useFarmacie() {
  const { getAllFarmacie } = require("../api/farmacie");
  return useFetch(getAllFarmacie, [], 600000); // Cache 10 minuti
}

/**
 * Hook per gestire farmacia di turno
 */
export function useFarmaciaTurno() {
  const { getFarmaciaTurno } = require("../api/farmacie");
  return useFetch(getFarmaciaTurno, []);
}

/**
 * Hook per gestire iniziative
 */
export function useIniziative() {
  const { getAllIniziative } = require("../api/iniziative");
  return useFetch(getAllIniziative, [], 300000);
}

/**
 * Hook per gestire santo del giorno
 */
export function useSantoDelGiorno() {
  const { getSantoDelGiorno } = require("../api/santo");
  return useFetch(getSantoDelGiorno, [], 86400000); // Cache 24 ore
}
