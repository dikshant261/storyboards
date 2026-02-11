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
          questionText: "Observe the pattern. What feature of the pattern is repeated?",
          feedback: {
            correct: "All the shapes are circles.The colors change again and <br/>again—<br/><span style='background-color: #4F81BD;'>blue</span>, <span style='background-color: #C0504D;'>red</span>, <span style='background-color: #4F81BD;'>blue</span>, <span style='background-color: #C0504D;'>red</span>.",
            incorrect: "All the shapes are same. But the colors are changing again and again. Try Again!",
            emptyFeedback: "Fill the highlighted box before checking",
          },
        },
        page3: {
          instruction: "Tap » to continue.",
          headerText: "Exploring pattern",
          questionText: "This is a color pattern.",
          summaryText: "In a color pattern, the colors repeat again and again in the same order.",

        },
        page4: {
          instruction: "Tap the correct option.",
          instructionAfter: "Tap » to continue.",
          numberOfVertices: "Number of vertices",
          headerText: "Exploring pattern",
          questionText: "Observe the pattern. What feature of the pattern is repeated?",
          feedback: {
            correct: "All figures are yellow.<br/><br/>The shape change again and again—<br/>triangle-circle-square<br/>triangle-circle-square",
            incorrect: "All the shapes color are same. But the shapes are changing again and again. Try Again!",
            emptyFeedback: "Fill the highlighted box before checking",
          },
        },
        page5: {
          instruction: "Tap » to continue.",
          headerText: "Exploring pattern",
          questionText: "This is a shape pattern.",
          summaryText: "In a shape pattern, the shapes repeat again and again in the same order.",
        },
        page6: {
          instruction: "Tap the correct option.",
          instructionAfter: "Tap » to continue.",
          numberOfVertices: "Number of vertices",
          headerText: "Exploring pattern",
          questionText: "Observe the pattern. What feature of the pattern is repeated?",
          feedback: {
            correct: "Both shape and color repeat again and again. <br/><br/>Orange Triangle-<br/>Blue Circle-<br/>Yellow Square…<br/>Repeats again and again.",
            incorrect: "All the shapes color are same. But the shapes are changing again and again. Try Again!",
            emptyFeedback: "Fill the highlighted box before checking",
          },
        },
        page7: {
          instruction: "Tap 'Start Over' to re-do this activity.",
          headerText: "Exploring pattern",
          questionText: "This is a shape pattern.",
          summaryText: "Patterns can have both colors and shapes repeating. Other features like sound, movement in objects can also make a pattern.",
        },
      },
    },

    id: {
      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang",
        start: "Mulai",
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
          headerText: "Sifat-sifat Jajar Genjang",
          headerDescription: "Menandai Sisi yang Sama Panjang",
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
          title: "Menjelajahi Pola",
          mainText:
            "Hari ini kita akan menjelajahi pola dalam kehidupan nyata.",
          instructionText: "Ketuk ‘Mulai’ untuk memulai pelajaran.",
        },
        page2: {
          instruction: "Ketuk pilihan yang benar.",
          instructionAfter: "Ketuk » untuk melanjutkan.",
          numberOfVertices: "Jumlah titik sudut",
          dayText: "Siang",
          nightText: "Malam",
          headerText: "Menjelajahi Pola",
          questionText:
            "Amati polanya. Fitur apa dari pola tersebut yang berulang?",
          feedback: {
            correct:
              "Semua bentuk adalah lingkaran. Warna berubah lagi dan lagi—<br/><span style='background-color: #4F81BD;'>biru</span>, <span style='background-color: #C0504D;'>merah</span>, <span style='background-color: #4F81BD;'>biru</span>, <span style='background-color: #C0504D;'>merah</span>.",
            incorrect:
              "Semua bentuknya sama. Tetapi warnanya berubah lagi dan lagi. Coba lagi!",
            emptyFeedback: "Isi kotak yang disorot sebelum memeriksa",
          },
        },
        page3: {
          instruction: "Ketuk » untuk melanjutkan.",
          headerText: "Menjelajahi Pola",
          questionText: "Ini adalah pola warna.",
          summaryText:
            "Dalam pola warna, warna berulang lagi dan lagi dalam urutan yang sama.",
        },
        page4: {
          instruction: "Ketuk pilihan yang benar.",
          instructionAfter: "Ketuk » untuk melanjutkan.",
          numberOfVertices: "Jumlah titik sudut",
          headerText: "Menjelajahi Pola",
          questionText:
            "Amati polanya. Fitur apa dari pola tersebut yang berulang?",
          feedback: {
            correct:
              "Semua bangun berwarna kuning.<br/><br/>Bentuk berubah lagi dan lagi—<br/>segitiga-lingkaran-persegi<br/>segitiga-lingkaran-persegi",
            incorrect:
              "Semua warna bangun sama. Tetapi bentuknya berubah lagi dan lagi. Coba lagi!",
            emptyFeedback: "Isi kotak yang disorot sebelum memeriksa",
          },
        },
        page5: {
          instruction: "Ketuk » untuk melanjutkan.",
          headerText: "Menjelajahi Pola",
          questionText: "Ini adalah pola bentuk.",
          summaryText:
            "Dalam pola bentuk, bentuk berulang lagi dan lagi dalam urutan yang sama.",
        },
        page6: {
          instruction: "Ketuk pilihan yang benar.",
          instructionAfter: "Ketuk » untuk melanjutkan.",
          numberOfVertices: "Jumlah titik sudut",
          headerText: "Menjelajahi Pola",
          questionText:
            "Amati polanya. Fitur apa dari pola tersebut yang berulang?",
          feedback: {
            correct:
              "Baik bentuk maupun warna berulang lagi dan lagi.<br/><br/>Segitiga Oranye-<br/>Lingkaran Biru-<br/>Persegi Kuning…<br/>Berulang lagi dan lagi.",
            incorrect:
              "Semua warna bangun sama. Tetapi bentuknya berubah lagi dan lagi. Coba lagi!",
            emptyFeedback: "Isi kotak yang disorot sebelum memeriksa",
          },
        },
        page7: {
          instruction: "Ketuk 'Mulai Ulang' untuk mengulang kegiatan ini.",
          headerText: "Menjelajahi Pola",
          questionText: "Ini adalah pola bentuk.",
          summaryText:
            "Pola dapat memiliki warna dan bentuk yang berulang. Fitur lain seperti suara dan gerakan pada benda juga dapat membentuk pola.",
        },
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
