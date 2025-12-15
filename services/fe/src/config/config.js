/**
 * Configurazione globale dell'applicazione
 * Centralizza URLs, API endpoints e costanti
 */

// API Strapi
export const STRAPI_API_URL = (process.env.REACT_APP_STRAPI_API_URL || "").replace(/\/$/, "");
export const STRAPI_API_TOKEN = process.env.REACT_APP_STRAPI_TOKEN;

// API Externa - Santo del Giorno
export const SANTO_API_URL = "https://santodelgiorno.mintdev.me/api/v1/santo/data";
export const SANTO_API_TOKEN = process.env.REACT_APP_SANTO_DEL_GIORNO_API_TOKEN;

// Endpoints Strapi
export const ENDPOINTS = {
  ARTICOLI: "/api/articolis",
  CATEGORIE: "/api/categories",
  FARMACIE: "/api/farmacias",
  INIZIATIVE: "/api/iniziatives",
  ORARI: "/api/oraris",
};

// Fetch options
export const FETCH_TIMEOUT = 10000; // 10 secondi
export const FETCH_RETRY_ATTEMPTS = 3;

// Messaggi di errore
export const ERROR_MESSAGES = {
  NETWORK: "Errore di rete. Controlla la tua connessione.",
  SERVER: "Errore del server. Riprova più tardi.",
  TIMEOUT: "La richiesta ha impiegato troppo tempo. Riprova.",
  NOT_FOUND: "Risorsa non trovata.",
  UNAUTHORIZED: "Non autorizzato. Controlla le credenziali.",
  GENERIC: "Si è verificato un errore. Riprova.",
};

// Pagination
export const PAGINATION = {
  PAGE_SIZE: 10,
  DEFAULT_PAGE: 1,
};

export default {
  STRAPI_API_URL,
  STRAPI_API_TOKEN,
  SANTO_API_URL,
  SANTO_API_TOKEN,
  ENDPOINTS,
  FETCH_TIMEOUT,
  FETCH_RETRY_ATTEMPTS,
  ERROR_MESSAGES,
  PAGINATION,
};
