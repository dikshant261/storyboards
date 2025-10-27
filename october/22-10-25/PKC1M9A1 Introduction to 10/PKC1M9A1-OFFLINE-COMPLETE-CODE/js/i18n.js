// content in english
const appData = {
  en: {
    translation: {
      buttons: {
        next: "NEXT",
        Next: "»",
        previous: "«",
        startOver: "Start\n Over",
      },
      count: "Count the fingers",
      shout: "Shout out loud!",
      letUse: "Let use another hand...",
      afterNine: "WHAT COMES AFTER 9?",
    },
  },
  id: {
    translation: {
      buttons: {
        next: "BERIKUTNYA",
        Next: "»",
        previous: "«",
        startOver: "Mulai\n Lagi",
      },
      count: "Hitung jarinya",
      shout: "Teriakkan dengan keras!",
      letUse: "Mari gunakan tangan yang lain...",
      afterNine: "APA YANG DATANG SETELAH 9?",
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
