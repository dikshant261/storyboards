// data.js - Internationalization data for the Ratio Learning Applet
// Contains all text content used in the ratio learning app

const AppData = {
  // Current language setting
  currentLanguage: "id",

  // Available languages
  languages: {
    en: { name: "English", code: "en" },
    id: { name: "Bahasa Indonesia", code: "id" },
  },

  // Text content by language
  translations: {
    en: {
      startEndPage: {
        ExploringRatios: "Exploring Ratios",
        LetPracticeFinding:
          "Let’s practice finding part to part and part to whole ratios!",
        clickStart: "Click ‘Start’ to begin.",

        activityCompleted: "Activity Completed!",
        youHaveIdentified:
          "You have identified the required part-to-part and part-to-whole ratios.",
        tapStartOver: "To go over the activity again, tap on ‘Start Over’.",
      },
      buttons: {
        start: "START",
        previous: "«",
        nextarrow: "»",
        startOver: "START OVER",
      },
      main: {
        representingRation: "Represent the ratio as required.",
        tapTheRatios:
          "Tap one of the ratios given to fill the highlighted box.",
        tapProceed: "Tap ▶ to proceed.",
        tapContinue: "Tap Next ▶ to Continue.",
      },
      error: {
        tryAgain: "Try Again",
      },
      marbleBoxesContent: {
        yellowToGreen: "Yellow to green \nmarbles",
        greenToYellow: "Green to yellow \nmarbles",
        yellowToTotal: "Yellow to total \nmarbles",
      },
      triangleBoxContent: {
        squareToTotal: "Squares to total\nshapes",
        squareToTriangle: "Squares to \ntriangles",
        triangleToTotal: "Triangles to total \nshapes",
      },
      circleBoxContent: {
        rectanglesToCircles: "Rectangles to \ncircles",
        circleToShapes: "Circles to total \nshapes",
        rectangleToShape: "Rectangles to total \nshapes",
      },
      triangleContent: {
        succesOne: "Great! 4 : 10 is the ratio of squares to total shapes.",
        succesTwo: "Excellent! 4 : 6 is the ratio of squares to triangles.",
        succesThree:
          "Well done! 6 : 10 is the ratio of triangles to total shapes.",
      },
      marblesSucces: {
        succesOne: "Great! 3 : 5 is the ratio of yellow to green marbles.",
        succesTwo: "Excellent! 5 : 3 is the ratio of green to yellow marbles.",
        succesThree:
          "Well done! 3 : 8 is the ratio of yellow to total marbles.",
      },
      circleSuccess: {
        succesOne: "Great! 5 : 7 is the ratio of rectangles to circles.",
        succesTwo: "Great! 7 : 12 is the ratio of circles to total shapes.",
        succesThree:
          "Well done! 5 : 12 is the ratio of rectangles to total shapes.",
      },
      chitraContent: {
        question: "Citra has 8 pink beads and 11 blue beads \non her necklace.",

        pinkToTotal: "Pink to total \nbeads",
        blueToTotal: "Blue to total \nbeads",
        blueToPink: "Blue to pink\nbeads",
      },
      chitraSuccess: {
        succesOne: "Great! 8 : 19 is the ratio of pink to total beads.",
        succesTwo: "Great! 11 : 19 is the ratio of blue to total beads.",
        succesThree: "Great! 11 : 8 is the ratio of blue to pink beads.",
      },
    },

    id: {
      startEndPage: {
        ExploringRatios: "Menjelajahi Perbandingan",
        LetPracticeFinding:
          "Mari kita berlatih menemukan perbandingan bagian ke bagian dan bagian ke keseluruhan!",
        clickStart: "Klik ‘Mulai’ untuk memulai.",

        activityCompleted: "Aktivitas Selesai!",
        youHaveIdentified:
          "Anda telah mengidentifikasi perbandingan bagian-ke-bagian dan bagian-ke-keseluruhan yang diperlukan.",
        tapStartOver: "Untuk mengulangi aktivitas, ketuk ‘Mulai Lagi’.",
      },
      buttons: {
        start: "MULAI",
        previous: "«",
        nextarrow: "»",
        startOver: "MULAI LAGI",
      },
      main: {
        representingRation: "Nyatakan perbandingan sesuai yang diminta.",
        tapTheRatios:
          "Ketuk salah satu perbandingan yang diberikan untuk mengisi kotak yang disorot.",
        tapProceed: "Ketuk ▶ untuk melanjutkan.",
        tapContinue: "Ketuk Berikutnya ▶ untuk melanjutkan.",
      },
      error: {
        tryAgain: "Coba Lagi",
      },
      marbleBoxesContent: {
        yellowToGreen: "Kelereng kuning ke hijau",
        greenToYellow: "Kelereng hijau ke kuning",
        yellowToTotal: "Kelereng kuning ke total",
      },
      triangleBoxContent: {
        squareToTotal: "Persegi ke jumlah total bentuk",
        squareToTriangle: "Persegi ke segitiga",
        triangleToTotal: "Segitiga ke jumlah total bentuk",
      },
      circleBoxContent: {
        rectanglesToCircles: "Persegi panjang ke lingkaran",
        circleToShapes: "Lingkaran ke jumlah total bentuk",
        rectangleToShape: "Persegi panjang ke jumlah total bentuk",
      },
      triangleContent: {
        succesOne: "Bagus! 4 : 10 adalah perbandingan persegi ke total bentuk.",
        succesTwo: "Hebat! 4 : 6 adalah perbandingan persegi ke segitiga.",
        succesThree:
          "Kerja bagus! 6 : 10 adalah perbandingan segitiga ke total bentuk.",
      },
      marblesSucces: {
        succesOne: "Bagus! 3 : 5 adalah perbandingan kelereng kuning ke hijau.",
        succesTwo: "Hebat! 5 : 3 adalah perbandingan kelereng hijau ke kuning.",
        succesThree:
          "Kerja bagus! 3 : 8 adalah perbandingan kelereng kuning ke total.",
      },
      circleSuccess: {
        succesOne:
          "Bagus! 5 : 7 adalah perbandingan persegi panjang ke lingkaran.",
        succesTwo:
          "Bagus! 7 : 12 adalah perbandingan lingkaran ke total bentuk.",
        succesThree:
          "Kerja bagus! 5 : 12 adalah perbandingan persegi panjang ke total bentuk.",
      },
      chitraContent: {
        question:
          "Citra memiliki 8 manik-manik merah muda dan 11 manik-manik biru \ndi kalungnya.",

        pinkToTotal: "Merah muda ke jumlah total manik-manik",
        blueToTotal: "Biru ke jumlah total manik-manik",
        blueToPink: "Biru ke merah muda",
      },
      chitraSuccess: {
        succesOne:
          "Bagus! 8 : 19 adalah perbandingan merah muda ke total manik-manik.",
        succesTwo:
          "Bagus! 11 : 19 adalah perbandingan biru ke total manik-manik.",
        succesThree: "Bagus! 11 : 8 adalah perbandingan biru ke merah muda.",
      },
    },

    config: {
      backgroundColor: "#0F4760",
    },
  },
};

// Simple i18n utility functions
const i18n = {
  // Get current language
  getCurrentLanguage: () => AppData.currentLanguage,

  // Set language
  setLanguage: (langCode) => {
    if (AppData.translations[langCode]) {
      AppData.currentLanguage = langCode;
      // Save to localStorage (use consistent key with index.html)
      localStorage.setItem("appLanguage", langCode);
      console.log(`🌐 i18n: Language set to ${langCode}`);
      return true;
    }
    console.warn(`🌐 i18n: Language ${langCode} not supported`);
    return false;
  },

  // Initialize language from localStorage
  initLanguage: () => {
    // Check for forced language first (from APP_CONFIG if available)
    if (
      typeof window.APP_CONFIG !== "undefined" &&
      window.APP_CONFIG.FORCE_LANGUAGE
    ) {
      if (AppData.translations[window.APP_CONFIG.FORCE_LANGUAGE]) {
        AppData.currentLanguage = window.APP_CONFIG.FORCE_LANGUAGE;
        console.log(
          `🌐 i18n: Using forced language: ${window.APP_CONFIG.FORCE_LANGUAGE}`
        );
        return;
      }
    }

    // Otherwise use saved language
    const savedLang = localStorage.getItem("appLanguage");
    if (savedLang && AppData.translations[savedLang]) {
      AppData.currentLanguage = savedLang;
      console.log(`🌐 i18n: Using saved language: ${savedLang}`);
    } else {
      console.log(
        `🌐 i18n: Using default language: ${AppData.currentLanguage}`
      );
    }
  },

  // Get translated text
  t: (key, params = {}) => {
    const lang = AppData.currentLanguage;
    const translation = AppData.translations[lang];

    // Navigate through nested object using dot notation
    const keys = key.split(".");
    let value = translation;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        value = AppData.translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === "object" && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return `[Missing: ${key}]`;
          }
        }
        break;
      }
    }

    // Replace parameters in string
    if (typeof value === "string") {
      return value.replace(/\{(\w+)\}/g, (match, param) => {
        return params.hasOwnProperty(param) ? params[param] : match;
      });
    }

    return value || `[Missing: ${key}]`;
  },

  // Get available languages
  getLanguages: () => AppData.languages,
};

// Make i18n globally available
window.i18n = i18n;

// Legacy compatibility - maintain the old 't' function for existing code
window.t = (key, params = {}) => {
  // Handle legacy flat key structure by checking multiple possible locations
  const possibleKeys = [
    key,
    `main.${key}`,
    `startPage.${key}`,
    `questions.${key}`,
    `headings.${key}`,
    `ratios.${key}`,
    `forms.${key}`,
    `success.${key}`,
    `errors.${key}`,
    `tableErrors.${key}`,
    `marbleErrors.${key}`,
    `appleErrors.${key}`,
    `triangleErrors.${key}`,
    `boyGirlErrors.${key}`,
    `bananaAppleErrors.${key}`,
    `studentErrors.${key}`,
    `completion.${key}`,
    `buttons.${key}`,
  ];

  for (const possibleKey of possibleKeys) {
    const result = i18n.t(possibleKey, params);
    if (result !== `[Missing: ${possibleKey}]` && typeof result === "string") {
      return result;
    }
  }

  // If still not found, try direct access to the current language translations
  const currentLang = AppData.currentLanguage;
  const translations = AppData.translations[currentLang];

  if (translations && translations[key]) {
    let value = translations[key];

    // If it's an object, try to get the default success message
    if (typeof value === "object" && value.success) {
      value = value.success;
    }

    // Replace parameters in string
    if (typeof value === "string") {
      return value.replace(/\{(\w+)\}/g, (match, param) => {
        return params.hasOwnProperty(param) ? params[param] : match;
      });
    }

    return value;
  }

  console.warn(`Translation key not found: ${key}`);
  return `[Missing: ${key}]`;
};
