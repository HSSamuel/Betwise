export const formatDate = (dateString, options) => {
  if (!dateString) return "";
  const defaultOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleString(
    "en-US",
    options || defaultOptions
  );
};
