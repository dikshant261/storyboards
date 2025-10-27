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
      count: "Tap the number",
      shout: "Shout out loud!",
      tap: "Tap the numbers.\nShout out loud what you\nhear",
      one: "One",
      two: "Two",
      three: "Three",
      four: "Four",
      five: "Five",
    },
  },
  id: {
    translation: {
      buttons: {
        next: "LANJUT",
        Next: "»",
        previous: "«",
        startOver: "Mulai\n Lagi",
      },
      count: "Ketuk angkanya",
      shout: "Teriakkan dengan keras!",
      tap: "Ketuk angkanya.\nTeriakkan dengan keras apa yang kamu\ndengar",
      one: "Satu",
      two: "Dua",
      three: "Tiga",
      four: "Empat",
      five: "Lima",
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
