/**
 * Safely serialize data for JSON-LD script tags.
 * Escapes "</script>" sequences to prevent XSS injection.
 */
export const safeJsonLd = (data) =>
  JSON.stringify(data).replace(/</g, '\\u003c');
