// i18n.js - Translation wrapper for the Equivalent Fractions Learning Applet
// This file provides a simple translation function that works with the data.js structure

// Translator function that works with the new data.js structure
function t(key, params = {}) {
  // Use the i18n system from data.js if available
  if (
    typeof window.i18n !== "undefined" &&
    typeof window.i18n.t === "function"
  ) {
    return window.i18n.t(key, params);
  }

  // Fallback to simple key lookup if i18n system is not available
  console.warn("i18n system not available, using fallback translation");
  return key;
}

// Expose globally so all components can use it
window.t = t;
