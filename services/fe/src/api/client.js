const STRAPI_API_URL = (process.env.REACT_APP_STRAPI_API_URL || "").replace(/\/$/, "");
const STRAPI_API_TOKEN = process.env.REACT_APP_STRAPI_TOKEN; 

function normalizePath(path) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const ensuredLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return `${STRAPI_API_URL}${ensuredLeadingSlash}`;
}

export function buildStrapiUrl(path) {
  return normalizePath(path);
}

export async function fetchStrapi(path, fetchOptions = {}) {
  const headers = {
    ...fetchOptions.headers,
    Authorization: `Bearer ${STRAPI_API_TOKEN}`, // <--- qui il token
  };

  const response = await fetch(normalizePath(path), {
    ...fetchOptions,
    headers,
  });

  return response;
}
