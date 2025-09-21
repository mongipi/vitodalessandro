import React from "react";

export default function StrapiImage({ src, alt, className }) {
  if (!src) return null;

  // Trasforma URL relativo in assoluto usando la variabile d'ambiente
  const getUrl = (url) => {
    if (url.startsWith("http")) return url; // già assoluto
    return `${process.env.REACT_APP_STRAPI_API_URL}${url}`; // aggiunge dominio
  };

  const finalUrl = getUrl(src);

  return <img src={finalUrl} alt={alt || ""} className={className} />;
}
