import { fetchStrapiJSON, APIError } from "./client";
import { ENDPOINTS, ERROR_MESSAGES } from "../config/config";

/**
 * Recupera la farmacia di turno per oggi
 * @returns {Promise<Object>} Dati farmacia di turno
 * @throws {APIError}
 */
export async function getFarmaciaTurno() {
  try {
    const today = new Date().toISOString().split("T")[0];
    const query = `${ENDPOINTS.ORARI}?filters[turno][$eq]=${today}&populate=farmacia`;
    return await fetchStrapiJSON(query);
  } catch (error) {
    console.error("Error fetching farmacia turno:", error);
    throw new APIError(ERROR_MESSAGES.SERVER, error.status, error);
  }
}

/**
 * Recupera tutte le farmacie
 * @returns {Promise<Object>} Lista farmacie
 * @throws {APIError}
 */
export async function getAllFarmacie() {
  try {
    const query = `${ENDPOINTS.FARMACIE}?populate=*`;
    return await fetchStrapiJSON(query);
  } catch (error) {
    console.error("Error fetching farmacie:", error);
    throw new APIError(ERROR_MESSAGES.SERVER, error.status, error);
  }
}

