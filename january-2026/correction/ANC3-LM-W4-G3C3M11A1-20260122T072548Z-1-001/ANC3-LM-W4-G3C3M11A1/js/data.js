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
              { dividend: 24, divisor: 6, quotient: 4, statement: "24 balloons are shared equally among 6 children." },
              { dividend: 18, divisor: 3, quotient: 6, statement: "18 pencils are divided equally among 3 tables." },
              { dividend: 20, divisor: 4, quotient: 5, statement: "20 stickers are shared equally among 4 friends." },
              { dividend: 30, divisor: 5, quotient: 6, statement: "30 crayons are distributed equally among 5 groups." },
              { dividend: 12, divisor: 4, quotient: 3, statement: "12 cupcakes are shared equally among 4 cousins." },
              { dividend: 21, divisor: 7, quotient: 3, statement: "21 marbles are divided equally among 7 boys." },
              { dividend: 35, divisor: 5, quotient: 7, statement: "35 cards are shared equally among 5 players." }
          ]
      },
      
      pages: {
          page1: {
              headerText: "Write  as Mathematical Sentence for division.",
              footerInstruction: "Tap Start.",
              startButtonText: "START"
          },
          page2: {
              headerText: "Write  as Mathematical Sentence for division.",
              instructionAfterQuiz: "Tap » to continue",
              footerInstruction: "Tap » for the next question",
              footerInstructionLast: "Tap » to start over again",
              instructionText: "Tap the number using numpad to fill in the highlighted box.",
              instructionAfterCorrect: "Tap » to go to next question",
              instructionAfterCorrectLast: "Tap Start Over to restart this activity again."
          },
          page3: {
              headerText: "Write  as Mathematical Sentence for division.",
              instructionAfterQuiz: "Tap » to continue"
          },
          page4: {
              headerText: "Write  as Mathematical Sentence for division.",
              footerInstruction: "Tap » for the next division sentence",
              footerInstructionLast: "Tap » to start over again",
              instructionAfterQuiz: "Tap » to continue"
          },
      },
      
      numberPad: {
          feedback: {
              correct: "Well done!",
              incorrect: "Oops! That is not correct.\nWrite in the form of\ntotal ÷ number of groups = how many in each group.",
              fillAllTiles: "Please fill all tiles before checking."
          }
      }
    },  

    // Indonesian (id) translations
    id: {
      appInfo: {
          title: "Aplet Pembelajaran Matematika Interaktif"
      },
      messages: {
          nextButtonPage2: "Mengirimkan event perubahan halaman ke halaman 2",
          previousButtonPage1: "Mengirimkan event perubahan halaman ke halaman 1",
          navigationReset: "Mengatur ulang ke pertanyaan 1"
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
              dividend: "Bilangan yang dibagi",
              divisor: "Pembagi",
              quotient: "Hasil Bagi"
          },
          instructionTemplate: "Ketuk {tileName} dalam kalimat pembagian di atas.",
          divisionQuestions: [
              { dividend: 24, divisor: 6, quotient: 4, statement: "24 balon dibagikan sama rata kepada 6 anak." },
              { dividend: 18, divisor: 3, quotient: 6, statement: "18 pensil dibagi sama rata kepada 3 meja." },
              { dividend: 20, divisor: 4, quotient: 5, statement: "20 stiker dibagikan sama rata kepada 4 teman." },
              { dividend: 30, divisor: 5, quotient: 6, statement: "30 krayon dibagikan sama rata kepada 5 kelompok." },
              { dividend: 12, divisor: 4, quotient: 3, statement: "12 kue dibagikan sama rata kepada 4 sepupu." },
              { dividend: 21, divisor: 7, quotient: 3, statement: "21 kelereng dibagi sama rata kepada 7 anak laki-laki." },
              { dividend: 35, divisor: 5, quotient: 7, statement: "35 kartu dibagikan sama rata kepada 5 pemain." }
          ]
      },
      
      pages: {
          page1: {
              headerText: "Tulis sebagai Kalimat Matematika untuk pembagian.",
              footerInstruction: "Ketuk Mulai.",
              startButtonText: "MULAI"
          },
          page2: {
              headerText: "Tulis sebagai Kalimat Matematika untuk pembagian.",
              instructionAfterQuiz: "Ketuk » untuk melanjutkan",
              footerInstruction: "Ketuk » untuk pertanyaan berikutnya",
              footerInstructionLast: "Ketuk » untuk memulai lagi",
              instructionText: "Ketuk nomor menggunakan numpad untuk mengisi kotak yang disorot.",
              instructionAfterCorrect: "Ketuk » untuk pertanyaan berikutnya",
              instructionAfterCorrectLast: "Ketuk Mulai Ulang untuk memulai aktivitas ini lagi."
          },
          page3: {
              headerText: "Tulis sebagai Kalimat Matematika untuk pembagian.",
              instructionAfterQuiz: "Ketuk » untuk melanjutkan"
          },
          page4: {
              headerText: "Tulis sebagai Kalimat Matematika untuk pembagian.",
              footerInstruction: "Ketuk » untuk kalimat pembagian berikutnya",
              footerInstructionLast: "Ketuk » untuk memulai lagi",
              instructionAfterQuiz: "Ketuk » untuk melanjutkan"
          },
      },
      
      numberPad: {
          feedback: {
              correct: "Bagus sekali!",
              incorrect: "Ups! Itu tidak benar.\nTulis dalam bentuk\njumlah ÷ jumlah kelompok = berapa banyak di setiap kelompok.",
              fillAllTiles: "Silakan isi semua ubin sebelum memeriksa."
          }
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
