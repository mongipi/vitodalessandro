import { APIError } from "./client";
import { SANTO_API_URL, SANTO_API_TOKEN, ERROR_MESSAGES, FETCH_TIMEOUT } from "../config/config";

/**
 * Recupera il santo del giorno
 * @returns {Promise<Object>} Dati santo
 * @throws {APIError}
 */
export async function getSantoDelGiorno() {
  try {
    const now = new Date();
    const mese = now.getMonth() + 1;
    const giorno = now.getDate();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

    try {
      const response = await fetch(`${SANTO_API_URL}/${mese}/${giorno}`, {
        headers: {
          Authorization: `Bearer ${SANTO_API_TOKEN}`,
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new APIError(
          `HTTP ${response.status}: ${ERROR_MESSAGES.SERVER}`,
          response.status,
          response
        );
      }

      return await response.json();
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error) {
    if (error.name === "AbortError") {
      throw new APIError(ERROR_MESSAGES.TIMEOUT);
    }
    if (error instanceof APIError) {
      throw error;
    }
    console.error("Error fetching santo del giorno:", error);
    throw new APIError(ERROR_MESSAGES.GENERIC, null, error);
  }
}
