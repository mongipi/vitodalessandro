const STRAPI_API_URL = (process.env.REACT_APP_STRAPI_API_URL || "").replace(/\/$/, "");

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
  const response = await fetch(normalizePath(path), fetchOptions);
  return response;
}
