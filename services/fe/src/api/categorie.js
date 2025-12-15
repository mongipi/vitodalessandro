import { fetchStrapiJSON, APIError } from "./client";
import { ENDPOINTS, ERROR_MESSAGES } from "../config/config";

/**
 * Recupera tutte le categorie
 * @returns {Promise<Object>} Lista categorie
 * @throws {APIError}
 */
export async function getAllCategorie() {
  try {
    const query = `${ENDPOINTS.CATEGORIE}?populate=*`;
    return await fetchStrapiJSON(query);
  } catch (error) {
    console.error("Error fetching categorie:", error);
    throw new APIError(ERROR_MESSAGES.SERVER, error.status, error);
  }
}

// Alias per compatibilità
export const getAllCategories = getAllCategorie;
