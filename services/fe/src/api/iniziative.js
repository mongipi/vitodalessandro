import { fetchStrapiJSON, APIError } from "./client";
import { ENDPOINTS, ERROR_MESSAGES } from "../config/config";

/**
 * Recupera tutte le iniziative
 * @returns {Promise<Object>} Lista iniziative
 * @throws {APIError}
 */
export async function getAllIniziative() {
  try {
    const query = `${ENDPOINTS.INIZIATIVE}?populate=*`;
    return await fetchStrapiJSON(query);
  } catch (error) {
    console.error("Error fetching iniziative:", error);
    throw new APIError(ERROR_MESSAGES.SERVER, error.status, error);
  }
}

// Alias per compatibilità
export const getAllInizative = getAllIniziative;

/**
 * Recupera una singola iniziativa per ID
 * @param {string} id - ID della iniziativa
 * @returns {Promise<Object>} Dati iniziativa
 * @throws {APIError}
 */
export async function getIniziativaById(id) {
  try {
    if (!id) {
      throw new APIError("ID iniziativa non fornito");
    }
    const query = `${ENDPOINTS.INIZIATIVE}/${id}?populate=*`;
    return await fetchStrapiJSON(query);
  } catch (error) {
    console.error(`Error fetching iniziativa ${id}:`, error);
    throw new APIError(ERROR_MESSAGES.SERVER, error.status, error);
  }
}

