// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlight1 = "#FFD700";
const highlight2 = "#70ACC7";
const highlight3 = "#F28283";
const highlight4 = "#70ACC7";

const AppData = {
  // Current language setting
  currentLanguage: "en",

  // Text content by language
  translations: {
    en: {
      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        start: "Start",
        showHint: "Show Hint",
        hideHint: "Hide Hint",
        color: "Color",
        shape: "Shape",
        yes: "Yes",
        no: "No",
      },
      appInfo: {
        title: "Exploring pattern",
      },
      messages: {
        pageStatesCleared:
          "Page states have been cleared. Reload the page to start fresh?",
      },
      common: {
        propertyShowcase: {
          headerText: "Properties of a Parallelogram",
          headerDescription: "Marking Equal Sides",
          propertyNames: {
            sides: "Sides",
            angles: "Angles",
            diagonals: "Diagonals",
            symmetry: "Symmetry",
          },
        },
        labels: {
          dropHere: "Drop Here",
        },
        tapAlt: "Tap",
        oppositeSidesEqualMessage: "Opposite sides are equal!",
      },
      numberPad: {
        feedback: {
          empty: "Fill the highlighted box before checking",
        },
      },
      pages: {

        page1: {
          versus: 'Versus',
          instruction: "Tap » to continue.",
          tile1: 'In',
          tile2: 'Out',
          headerText: "Exploring more position words",

        },
        page2: {
          versus: 'Versus',
          instruction: "Tap » to continue.",
          tile1: 'On',
          tile2: 'Not on',
          headerText: "Exploring more position words",

        },
        page3: {
          versus: 'Versus',
          instruction: "Tap » to continue.",
          tile1: 'above',
          tile2: 'below',
          headerText: "Exploring more position words",

        },
        page4: {
          versus: 'Versus',
          instruction: "Tap » to continue.",
          tile1: 'Top',
          tile2: 'bottom',
          tile3: 'Middle',
          headerText: "Exploring more position words",

        },
        page5: {
          versus: 'Versus',
          instruction: "Tap 'Start Over' to re-do this activity.",
          tile1: 'above',
          tile2: 'on',
          headerText: "Exploring more position words",
        },
      },
    },

    id: {
      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang",
        start: "Mulai",
        showHint: "Tampilkan Petunjuk",
        hideHint: "Sembunyikan Petunjuk",
        color: "Warna",
        shape: "Bentuk",
        yes: "Ya",
        no: "Tidak",
      },

      appInfo: {
        title: "Menjelajahi Pola",
      },

      messages: {
        pageStatesCleared:
          "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
      },

      common: {
        propertyShowcase: {
          headerText: "Sifat-Sifat Jajar Genjang",
          headerDescription: "Menandai Sisi yang Sama",
          propertyNames: {
            sides: "Sisi",
            angles: "Sudut",
            diagonals: "Diagonal",
            symmetry: "Simetri",
          },
        },

        labels: {
          dropHere: "Letakkan di Sini",
        },

        tapAlt: "Ketuk",

        oppositeSidesEqualMessage: "Sisi yang berhadapan sama panjang!",
      },

      numberPad: {
        feedback: {
          empty: "Isi kotak yang disorot sebelum memeriksa",
        },
      },
      pages: {

        page1: {
          versus: 'Versus',
          instruction: "Ketuk » untuk melanjutkan.",
          tile1: 'Di dalam',
          tile2: 'Di luar',
          headerText: "Menjelajahi lebih banyak kata posisi",
        },

        page2: {
          versus: 'Versus',
          instruction: "Ketuk » untuk melanjutkan.",
          tile1: 'Di atas',
          tile2: 'Tidak di atas',
          headerText: "Menjelajahi lebih banyak kata posisi",
        },

        page3: {
          versus: 'Versus',
          instruction: "Ketuk » untuk melanjutkan.",
          tile1: 'Di atas',
          tile2: 'Di bawah',
          headerText: "Menjelajahi lebih banyak kata posisi",
        },

        page4: {
          versus: 'Versus',
          instruction: "Ketuk » untuk melanjutkan.",
          tile1: 'Atas',
          tile2: 'Bawah',
          tile3: 'Tengah',
          headerText: "Menjelajahi lebih banyak kata posisi",
        },

        page5: {
          versus: 'Versus',
          instruction: "Ketuk 'Mulai Lagi' untuk mengulang aktivitas ini.",
          tile1: 'Di atas',
          tile2: 'Di atas',
          headerText: "Menjelajahi lebih banyak kata posisi",
        },

      },
    }


  },
};

// Simple i18n utility functions
const i18n = {
  // Get translated text
  t: (key, params = {}) => {
    const lang = AppData.currentLanguage;
    const translation = AppData.translations[lang];

    // Navigate through nested object using dot notation
    const keys = key.split(".");
    let value = translation;
    let found = true;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        found = false;
        break;
      }
    }

    // If not found in current language, try English fallback
    if (!found) {
      value = AppData.translations.en;
      for (const fallbackKey of keys) {
        if (value && typeof value === "object" && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return `[Missing: ${key}]`;
        }
      }
    }

    // If value is undefined or null, return missing message
    if (value === undefined || value === null) {
      return `[Missing: ${key}]`;
    }

    // Replace parameters in string
    if (typeof value === "string") {
      return value.replace(/\{(\w+)\}/g, (match, param) => {
        return params.hasOwnProperty(param) ? params[param] : match;
      });
    }

    // Return value as-is (could be array, object, number, boolean, etc.)
    return value;
  },

  // Set the current language
  setLanguage: (langCode) => {
    console.log(`🌐 Attempting to set language to: ${langCode}`);
    console.log(`🌐 Available languages:`, Object.keys(AppData.translations));
    console.log(`🌐 Current language before change:`, AppData.currentLanguage);

    if (AppData.translations[langCode]) {
      AppData.currentLanguage = langCode;
      console.log(`✅ Language successfully set to: ${langCode}`);
      console.log(`🌐 Current language after change:`, AppData.currentLanguage);
      return true;
    } else {
      console.warn(
        `❌ Language '${langCode}' not supported. Available languages:`,
        Object.keys(AppData.translations)
      );
      return false;
    }
  },

  // Get the current language
  getCurrentLanguage: () => {
    return AppData.currentLanguage;
  },

  // Initialize language system (placeholder for compatibility)
  initLanguage: () => {
    console.log("🌐 i18n system initialized");
    return true;
  },

  // Helper function to get page data
  getPageData: (pageNumber) => {
    const lang = AppData.currentLanguage;
    const translation = AppData.translations[lang];

    if (translation.pages && translation.pages[`page${pageNumber}`]) {
      return translation.pages[`page${pageNumber}`];
    }

    // Fallback to English
    const enTranslation = AppData.translations.en;
    if (enTranslation.pages && enTranslation.pages[`page${pageNumber}`]) {
      return enTranslation.pages[`page${pageNumber}`];
    }

    return null;
  },
};

// Make i18n globally available
window.i18n = i18n;
