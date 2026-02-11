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
        yes: 'Yes',
        no: 'No',
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
          title: "Exploring pattern",
          mainText:
            "Today we will Exploring the real life pattern.",
          instructionText: "Tap ‘Start’ to begin the lesson.",
        },
        page2: {
          instruction: "Tap the correct option.",
          instructionAfter: "Tap » to continue.",
          numberOfVertices: "Number of vertices",
          dayText: "Day",
          nightText: "Night",
          headerText: "Exploring pattern",
          questionText: "Day, then comes night. Is it a pattern?",
          feedback: {
            correct: "Night comes after day. Again day comes after night. Day-Night-Day-Night It keeps on repeating",
            incorrect: "Oops! that's not correct pattern. Try Again!",
            emptyFeedback: "Fill the highlighted box before checking",
          },
        },
        page3: {
          instruction: "Tap the correct option.",
          instructionAfter: "Tap » to continue.",
          numberOfVertices: "Number of vertices",
          headerText: "Exploring pattern",
          questionText: "Is Zebra crossing a pattern?",
          feedback: {
            correct: "Black and white strips repeat in Zebra-Crossing. Black-White-Black-White… Zebra crossing is a pattern.",
            incorrect: "Oops! that's not correct pattern. Try Again!",
            emptyFeedback: "Fill the highlighted box before checking",
          },
        },
        page4: {
          instruction: "Tap the correct option.",
          instructionAfter: "Tap » to continue.",
          numberOfVertices: "Number of vertices",
          headerText: "Exploring pattern",
          questionText: "Do these shapes make a pattern?",
          feedback: {
            correct: "No set of shapes or color is repeating. So, this is not a pattern",
            incorrect: "Oops! that's not make any pattern. Try Again!",
            emptyFeedback: "Fill the highlighted box before checking",
          },
        },
        page5: {
          instruction: "Tap the correct option.",
          instructionAfter: "Tap 'Start Over' to re-do this activity.",
          headerText: "Exploring pattern",
          questionText: "Do music octaves make a pattern?",
          feedback: {
            correct: "There are seven notes. After last note, the full octave is repeated again. Music octaves are a pattern.",
            incorrect: "Oops! that's not correct pattern. Try Again!",
            emptyFeedback: "Fill the highlighted box before checking",
          },
        }
      },
    },

    id: {
      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang",
        start: "Mulai",
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
          headerText: "Sifat-sifat Jajargenjang",
          headerDescription: "Menandai Sisi yang Sama Panjang",
          propertyNames: {
            sides: "Sisi",
            angles: "Sudut",
            diagonals: "Diagonal",
            symmetry: "Simetri",
          },
        },
        labels: {
          dropHere: "Letakkan di sini",
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
          title: "Menjelajahi Pola",
          mainText:
            "Hari ini kita akan menjelajahi pola dalam kehidupan sehari-hari.",
          instructionText: "Ketuk ‘Mulai’ untuk memulai pelajaran.",
        },

        page2: {
          instruction: "Ketuk pilihan yang benar.",
          instructionAfter: "Ketuk » untuk melanjutkan.",
          numberOfVertices: "Jumlah titik sudut",
          dayText: "Siang",
          nightText: "Malam",
          headerText: "Menjelajahi Pola",
          questionText: "Siang, lalu malam. Apakah ini sebuah pola?",
          feedback: {
            correct:
              "Malam datang setelah siang. Lalu siang datang setelah malam. Siang–Malam–Siang–Malam. Ini terus berulang.",
            incorrect: "Ups! Itu bukan pola yang benar. Coba lagi!",
            emptyFeedback: "Isi kotak yang disorot sebelum memeriksa",
          },
        },

        page3: {
          instruction: "Ketuk pilihan yang benar.",
          instructionAfter: "Ketuk » untuk melanjutkan.",
          numberOfVertices: "Jumlah titik sudut",
          headerText: "Menjelajahi Pola",
          questionText: "Apakah zebra cross merupakan sebuah pola?",
          feedback: {
            correct:
              "Garis hitam dan putih berulang pada zebra cross. Hitam–Putih–Hitam–Putih… Zebra cross adalah sebuah pola.",
            incorrect: "Ups! Itu bukan pola yang benar. Coba lagi!",
            emptyFeedback: "Isi kotak yang disorot sebelum memeriksa",
          },
        },

        page4: {
          instruction: "Ketuk pilihan yang benar.",
          instructionAfter: "Ketuk » untuk melanjutkan.",
          numberOfVertices: "Jumlah titik sudut",
          headerText: "Menjelajahi Pola",
          questionText: "Apakah bentuk-bentuk ini membentuk sebuah pola?",
          feedback: {
            correct:
              "Tidak ada bentuk atau warna yang berulang. Jadi, ini bukan sebuah pola.",
            incorrect: "Ups! Ini tidak membentuk pola apa pun. Coba lagi!",
            emptyFeedback: "Isi kotak yang disorot sebelum memeriksa",
          },
        },

        page5: {
          instruction: "Ketuk pilihan yang benar.",
          instructionAfter: "Ketuk 'Mulai Ulang' untuk mengulang aktivitas ini.",
          headerText: "Menjelajahi Pola",
          questionText: "Apakah oktaf musik membentuk sebuah pola?",
          feedback: {
            correct:
              "Ada tujuh nada. Setelah nada terakhir, satu oktaf penuh diulang kembali. Oktaf musik adalah sebuah pola.",
            incorrect: "Ups! Itu bukan pola yang benar. Coba lagi!",
            emptyFeedback: "Isi kotak yang disorot sebelum memeriksa",
          },
        }
      },
    },

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
