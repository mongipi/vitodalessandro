import { STRAPI_API_URL, STRAPI_API_TOKEN, FETCH_TIMEOUT, ERROR_MESSAGES } from "../config/config";

/**
 * Normalizza il path dell'endpoint
 * @param {string} path - Path da normalizzare
 * @returns {string} URL completo
 */
function normalizePath(path) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const ensuredLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return `${STRAPI_API_URL}${ensuredLeadingSlash}`;
}

/**
 * Costruisce un URL Strapi completo
 * @param {string} path - Endpoint path
 * @returns {string} URL completo
 */
export function buildStrapiUrl(path) {
  return normalizePath(path);
}

/**
 * Classe per la gestione degli errori API
 */
export class APIError extends Error {
  constructor(message, status = null, originalError = null) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.originalError = originalError;
  }
}

/**
 * Effettua una richiesta fetch Strapi con timeout e error handling
 * @param {string} path - Endpoint path
 * @param {Object} fetchOptions - Opzioni fetch
 * @returns {Promise<Response>}
 * @throws {APIError}
 */
export async function fetchStrapi(path, fetchOptions = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const headers = {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    };

    const response = await fetch(normalizePath(path), {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new APIError(
        `HTTP ${response.status}: ${ERROR_MESSAGES.SERVER}`,
        response.status,
        response
      );
    }

    return response;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new APIError(ERROR_MESSAGES.TIMEOUT);
    }
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(ERROR_MESSAGES.GENERIC, null, error);
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Effettua una richiesta fetch Strapi e restituisce il JSON
 * @param {string} path - Endpoint path
 * @param {Object} fetchOptions - Opzioni fetch
 * @returns {Promise<Object>} Dati JSON
 * @throws {APIError}
 */
export async function fetchStrapiJSON(path, fetchOptions = {}) {
  const response = await fetchStrapi(path, fetchOptions);
  return response.json();
}
