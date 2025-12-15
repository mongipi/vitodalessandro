import { fetchStrapiJSON, APIError } from "./client";
import { ENDPOINTS, ERROR_MESSAGES } from "../config/config";

/**
 * Recupera tutti gli articoli pubblicati
 * @returns {Promise<Object>} Lista articoli
 * @throws {APIError}
 */
export async function getAllArticoli() {
  try {
    const now = new Date().toISOString();
    const query = `${ENDPOINTS.ARTICOLI}?populate=*&filters[pubblicato_il][$lte]=${encodeURIComponent(
      now
    )}&filters[publishedAt][$notNull]=true&sort=pubblicato_il:desc`;

    return await fetchStrapiJSON(query);
  } catch (error) {
    console.error("Error fetching articoli:", error);
    throw new APIError(ERROR_MESSAGES.SERVER, error.status, error);
  }
}

/**
 * Recupera un articolo specifico per ID
 * @param {string} id - ID dell'articolo
 * @returns {Promise<Object>} Dati articolo
 * @throws {APIError}
 */
export async function getArticoloById(id) {
  try {
    if (!id) {
      throw new APIError("ID articolo non fornito");
    }

    const query = `${ENDPOINTS.ARTICOLI}/${id}?populate=*`;
    return await fetchStrapiJSON(query);
  } catch (error) {
    console.error(`Error fetching articolo ${id}:`, error);
    throw new APIError(ERROR_MESSAGES.SERVER, error.status, error);
  }
}

