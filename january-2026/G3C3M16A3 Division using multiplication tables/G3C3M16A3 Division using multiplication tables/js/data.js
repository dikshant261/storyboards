// data.js - Internationalization data for the Division Learning Applet
// Contains only the text content that's actually used in the division app

const AppData = {
  // Current language setting
  currentLanguage: "en",

  // Text content by language
  translations: {
    en: {
      appInfo: {
        title: "Interactive Math Learning Applet"
      },
      messages: {
        nextButtonPage2: "Dispatched page change event to page 2",
        previousButtonPage1: "Dispatched page change event to page 1",
        navigationReset: "Resetting to question 1"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over"
      },

      common: {
        tapAnimationAlt: "Tap",
        divisionSymbol: "÷",
        equalsSymbol: "=",
        labels: {
          dividend: "Dividend",
          divisor: "Divisor",
          quotient: "Quotient"
        },
        instructionTemplate: "Tap the {tileName} in the above division sentence.",
        divisionQuestions: [
          { dividend: 24, divisor: 4, quotient: 6, },
          { dividend: 32, divisor: 4, quotient: 8, },
          { dividend: 63, divisor: 7, quotient: 9, },
          { dividend: 18, divisor: 6, quotient: 3, },
          { dividend: 45, divisor: 9, quotient: 5, },
          { dividend: 54, divisor: 6, quotient: 9, },
        ]
      },

      pages: {
        page1: {
          headerText: "Completing the Division sentence using multiplication tables.",
          footerInstruction: "Tap Start.",
          startButtonText: "START"
        },

        page2: {
          headerText: "Choose the multiplication Fact that matches.",
          instructionText: "Tap the multiplication sentences that matches with given division sentences.",
          instructionAfterCheck: "Tap Next",
          instructionAfterQuiz: "Tap » to continue",
          divisionSentenceTitle: "Division Sentence",
          multiplicationSentenceTitle: "Multiplication Sentence",
          multiplicationTableHeader: "Multiplication-table",
          showHint: "Show\nHint",
          hideHint: "Hide\nHint",
          nextButton: "Next",
          hintText: "To divide {dividend} by {divisor}. Tap the multiplication sentence that has both {dividend} and {divisor} in the multiplication table."
        },
        page3: {
          headerText: "Choose the multiplication Fact that matches.",
          instructionText: "Tap the number using numpad to fill in the highlighted box.",
          instructionAfterCheck: "Tap Next for next question.",
          footerInstruction: "Tap Next for the next division sentence",
          footerInstructionLast: "Tap Start Over to start over again",
          instructionAfterQuiz: "Tap » to continue",
          divisionSentenceTitle: "Division Sentence",
          multiplicationSentenceTitle: "Multiplication Sentence",
          multiplicationTableHeader: "Multiplication-table",
          nextButton: "Next",
          startOverButton: "Start Over"
        },
      },

      numberPad: {
        feedback: {
          correct: "Well done!",
          incorrect: "Oops! That is not correct.\nWrite in the form of\ntotal ÷ number of groups = how many in each group.",
          fillAllTiles: "Please fill all tiles before checking.",
          incorrectFromMultiplication: "Ohh that is not right! Use the number from the multiplication sentence.",
          fillHighlightedBox: "Fill the highlighted box before checking"
        },
        showButton: "show 💡",
        checkButton: "CHECK"
      },
      labels: {
        divisionSentence: "Division Sentence",
        multiplicationSentence: "Multiplication Sentence"
      }
    },

    // Indonesian (id) translations
    id: {
      appInfo: {
        title: "Applet Pembelajaran Matematika Interaktif"
      },

      messages: {
        nextButtonPage2: "Peristiwa perpindahan halaman dikirim ke halaman 2",
        previousButtonPage1: "Peristiwa perpindahan halaman dikirim ke halaman 1",
        navigationReset: "Mengatur ulang ke soal 1"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang"
      },

      common: {
        tapAnimationAlt: "Ketuk",
        divisionSymbol: "÷",
        equalsSymbol: "=",
        labels: {
          dividend: "Bilangan yang Dibagi",
          divisor: "Pembagi",
          quotient: "Hasil Bagi"
        },
        instructionTemplate: "Ketuk {tileName} pada kalimat pembagian di atas.",
        divisionQuestions: [
          { dividend: 24, divisor: 4, quotient: 6 },
          { dividend: 32, divisor: 4, quotient: 8 },
          { dividend: 63, divisor: 7, quotient: 9 },
          { dividend: 18, divisor: 6, quotient: 3 },
          { dividend: 45, divisor: 9, quotient: 5 },
          { dividend: 54, divisor: 6, quotient: 9 }
        ]
      },

      pages: {
        page1: {
          headerText: "Melengkapi kalimat pembagian menggunakan tabel perkalian.",
          footerInstruction: "Ketuk Mulai.",
          startButtonText: "MULAI"
        },

        page2: {
          headerText: "Pilih fakta perkalian yang sesuai.",
          instructionText: "Ketuk kalimat perkalian yang sesuai dengan kalimat pembagian yang diberikan.",
          instructionAfterCheck: "Ketuk Berikutnya",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          divisionSentenceTitle: "Kalimat Pembagian",
          multiplicationSentenceTitle: "Kalimat Perkalian",
          multiplicationTableHeader: "Tabel Perkalian",
          showHint: "Tampilkan\nPetunjuk",
          hideHint: "Sembunyikan\nPetunjuk",
          nextButton: "Berikutnya",
          hintText:
            "Untuk membagi {dividend} dengan {divisor}. Ketuk kalimat perkalian yang memiliki {dividend} dan {divisor} pada tabel perkalian."
        },

        page3: {
          headerText: "Pilih fakta perkalian yang sesuai.",
          instructionText: "Ketuk angka menggunakan papan angka untuk mengisi kotak yang disorot.",
          instructionAfterCheck: "Ketuk Berikutnya untuk soal selanjutnya.",
          footerInstruction: "Ketuk Berikutnya untuk kalimat pembagian berikutnya",
          footerInstructionLast: "Ketuk Mulai Ulang untuk memulai kembali",

          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          divisionSentenceTitle: "Kalimat Pembagian",
          multiplicationSentenceTitle: "Kalimat Perkalian",
          multiplicationTableHeader: "Tabel Perkalian",
          nextButton: "Berikutnya",
          startOverButton: "Mulai Ulang"
        }
      },

      numberPad: {
        feedback: {
          correct: "Bagus sekali!",
          incorrect:
            "Ups! Itu belum benar.\nTulis dalam bentuk\ntotal ÷ jumlah kelompok = jumlah di setiap kelompok.",
          fillAllTiles: "Silakan isi semua kotak sebelum memeriksa.",
          incorrectFromMultiplication:
            "Ohh itu belum benar! Gunakan angka dari kalimat perkalian.",
          fillHighlightedBox: "Isi kotak yang disorot sebelum memeriksa"
        },
        showButton: "tampilkan 💡",
        checkButton: "PERIKSA"
      },

      labels: {
        divisionSentence: "Kalimat Pembagian",
        multiplicationSentence: "Kalimat Perkalian"
      }
    }

  }
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
