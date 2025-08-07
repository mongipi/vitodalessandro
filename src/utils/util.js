export function formatDataISO(dataISO)  {
  const date = new Date(dataISO);
  return date.toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
