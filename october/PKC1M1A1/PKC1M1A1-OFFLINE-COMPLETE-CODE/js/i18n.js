// content in english
const appData = {
  en: {
    translation: {
      buttons: {
        next: "NEXT",
      },
      tapNumbers: "Tap the numbers",
      shoutLound: "Shout Out Loud",
      tapTheNumbers: "Tap the numbers.\n Shout out loud what you\n hear.",
    },
  },
  id: {
  translation: {
    buttons: {
      next: "BERIKUTNYA",
    },
    tapNumbers: "Ketuk angkanya",
    shoutLound: "Bersoraklah dengan keras",
    tapTheNumbers: "Ketuk angkanya.\n Ucapkan dengan keras apa yang kamu\n dengar.",
  },
},

};

// Current language comes from global APP_LANGUAGE set in index.html
const currentLang = window.APP_LANGUAGE || "en";

// Helper: resolve nested keys like "storyOne.optionOne"
function getNested(obj, path) {
  return path.split(".").reduce((acc, key) => {
    return acc && acc[key] !== undefined ? acc[key] : null;
  }, obj);
}

// Translator function
function t(key, params = {}) {
  let text = getNested(appData[currentLang].translation, key) || key;

  // Replace variables if any (like {{count}})
  Object.keys(params).forEach((p) => {
    text = text.replace(`{{${p}}}`, params[p]);
  });

  return text;
}

// Expose globally so all components can use it
window.t = t;
