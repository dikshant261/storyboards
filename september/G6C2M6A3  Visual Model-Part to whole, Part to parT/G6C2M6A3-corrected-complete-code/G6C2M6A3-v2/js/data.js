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
        ratiosInVisual: "Ratios in Visual Charts",
        letPractice:
          "Let’s practice reading charts and writing ratios by comparing parts and the whole.",

        activityCompleted: "Activity Completed!",
        youHaveLearned:
          "You’ve learned how to read visual charts and \nexpress the information as ratios. ",
        nowYouCan:
          "Now you can compare parts-to-parts and \nparts-to-whole with confidence!",
        toGoStartOver: "To go over the activity again, tap on ‘Start Over’.",
      },
      buttons: {
        start: "START",
        previous: "«",
        next: "»",
        startOver: "START OVER",
      },
      chartHeading: {
        surveyHeading:
          "Survey results of students’ \nmodes of transport to school",
        car: "Car",
        walk: "Walk",
        bus: "Bus",
      },
      navigations: {
        tapTheRatios: "Tap the option that shows the correct ratio.",
        tapContinue: "Tap Next » to Continue.",
      },
      questionOne: {
        question:
          "What is the ratio of students traveling by car to those traveling by bus?",
      },
      carToBus: {
        success:
          "Excellent! 7 : 12 is the required ratio of students travel by \ncar to bus.",
        errorOne:
          "Oops! This is bus to car ratio, not car to bus. \nTry again.",
        errorTwo: "Not quite! We need car first, then bus. \nTry again.",
        errorThree:
          "Not quite! The number of students travel by bus is not 19. \nTry again.",
      },
      questionTwo: {
        question:
          "What is the ratio of students who walk to those who travel by car?",
      },
      carToWalk: {
        success:
          "Excellent! 17 : 7 is the ratio of students walking to those \ntraveling by car.",
        errorOne:
          "Oops! This shows car to walking ratio, not walking to car. \nTry again!",
        errorTwo:
          "Not quite! The number of students travel by car is not 12.\nTry again.",
        errorThree:
          "Not quite! The number of students go by walking is not 12.\nTry again!",
      },
      questionThree: {
        question:
          "What is the ratio of students who walk to the total number of students?",
      },
      walkToTotal: {
        success:
          "Excellent! 17 : 36 is the ratio of students go by walking to the total students",
        errorOne:
          "Not quite! The total number of students is not 26.\nTry again.",
        errorTwo:
          "Not quite! The number of students go by walking is not 7.\nTry again.",
        errorThree:
          "Not quite! The number of students go by walking is not 7. \nTry again!",
      },
      questionFour: {
        question:
          "What is the ratio of students traveling by bus to total number of students?",
      },
      busToTotal: {
        success:
          "Excellent! 12 : 36 is the ratio of students go by bus to the total students",
        errorOne:
          "Not quite! We need students go by bus first, then total students.Try again.",
        errorTwo:
          "Not quite! The number of students go by bus is not 17.\nTry again.",
        errorThree:
          "Not quite! We need students go by bus first, then total students.\nTry again.",
      },
    },

    id: {
      startEndPage: {
        ratiosInVisual: "Rasio dalam Grafik Visual",
        letPractice:
          "Mari berlatih membaca grafik dan menulis rasio dengan membandingkan bagian dan keseluruhan.",

        activityCompleted: "Aktivitas Selesai!",
        youHaveLearned:
          "Kamu telah belajar bagaimana membaca grafik visual dan \nmenyatakan informasi tersebut sebagai rasio.",
        nowYouCan:
          "Sekarang kamu bisa membandingkan bagian-ke-bagian dan \nbagian-ke-keseluruhan dengan percaya diri!",
        toGoStartOver: "Untuk mengulangi aktivitas lagi, ketuk ‘Mulai Lagi’.",
      },
      buttons: {
        start: "MULAI",
        previous: "«",
        next: "»",
        startOver: "MULAI LAGI",
      },
      chartHeading: {
        surveyHeading:
          "Hasil survei moda transportasi siswa \nuntuk pergi ke sekolah",
        car: "Mobil",
        walk: "Jalan kaki",
        bus: "Bus",
      },
      navigations: {
        tapTheRatios: "Ketuk opsi yang menunjukkan rasio yang benar.",
        tapContinue: "Ketuk Berikutnya » untuk melanjutkan.",
      },
      questionOne: {
        question:
          "Berapa rasio siswa naik mobil dengan yang naik bus?",
      },
      carToBus: {
        success:
          "Bagus sekali! 7 : 12 adalah rasio siswa yang bepergian dengan \nmobil terhadap bus.",
        errorOne:
          "Ups! Itu adalah rasio bus ke mobil, bukan mobil ke bus. \nCoba lagi.",
        errorTwo: "Belum tepat! Kita butuh mobil dulu, lalu bus. \nCoba lagi.",
        errorThree:
          "Belum tepat! Jumlah siswa yang naik bus bukan 19. \nCoba lagi.",
      },
      questionTwo: {
        question:
          "Berapa rasio siswa pejalan kaki dengan yang naik mobil?",
      },
      carToWalk: {
        success:
          "Bagus sekali! 17 : 7 adalah rasio siswa yang berjalan kaki terhadap mereka yang bepergian dengan mobil.",
        errorOne:
          "Ups! Itu adalah rasio mobil ke jalan kaki, bukan jalan kaki ke mobil. \nCoba lagi!",
        errorTwo:
          "Belum tepat! Jumlah siswa yang bepergian dengan mobil bukan 12. \nCoba lagi.",
        errorThree:
          "Belum tepat! Jumlah siswa yang berjalan kaki bukan 12. \nCoba lagi!",
      },
      questionThree: {
        question:
          "Berapa rasio siswa yang berjalan kaki terhadap jumlah total siswa?",
      },
      walkToTotal: {
        success:
          "Bagus sekali! 17 : 36 adalah rasio siswa yang berjalan kaki terhadap jumlah total siswa.",
        errorOne: "Belum tepat! Jumlah total siswa bukan 26. \nCoba lagi.",
        errorTwo:
          "Belum tepat! Jumlah siswa yang berjalan kaki bukan 7. \nCoba lagi.",
        errorThree:
          "Belum tepat! Jumlah siswa yang berjalan kaki bukan 7. \nCoba lagi!",
      },
      questionFour: {
        question:
          "Berapa rasio siswa yang bepergian dengan bus terhadap jumlah total siswa?",
      },
      busToTotal: {
        success:
          "Bagus sekali! 12 : 36 adalah rasio siswa yang naik bus terhadap jumlah total siswa.",
        errorOne:
          "Belum tepat! Kita butuh siswa yang naik bus dulu, baru total siswa. \nCoba lagi.",
        errorTwo:
          "Belum tepat! Jumlah siswa yang naik bus bukan 17. \nCoba lagi.",
        errorThree:
          "Belum tepat! Kita butuh siswa yang naik bus dulu, baru total siswa. \nCoba lagi.",
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

// Independent Scene State Management
const SceneStates = {
  // Each scene has its own completely independent state
  scene1: {
    clickedButtons: [],
    disabledButtons: [],
    answered: false,
    feedbackShown: false,
    feedbackType: '',
    result: '',
    showTap: true,
    showNext: false,
    boxCss: ''
  },
  scene2: {
    clickedButtons: [],
    disabledButtons: [],
    answered: false,
    feedbackShown: false,
    feedbackType: '',
    result: '',
    showTap: true,
    showNext: false,
    boxCss: ''
  },
  scene3: {
    clickedButtons: [],
    disabledButtons: [],
    answered: false,
    feedbackShown: false,
    feedbackType: '',
    result: '',
    showTap: true,
    showNext: false,
    boxCss: ''
  },
  scene4: {
    clickedButtons: [],
    disabledButtons: [],
    answered: false,
    feedbackShown: false,
    feedbackType: '',
    result: '',
    showTap: true,
    showNext: false,
    boxCss: ''
  }
};

// Scene State Management Functions
const SceneStateManager = {
  // Get state for a specific scene
  getSceneState: (sceneName) => {
    const state = SceneStates[sceneName] || { 
      clickedButtons: [], 
      disabledButtons: [], 
      answered: false, 
      feedbackShown: false, 
      feedbackType: '',
      result: '',
      showTap: true,
      showNext: false,
      boxCss: ''
    };
    console.log(`Getting State for ${sceneName}:`, state);
    return state;
  },

  // Update state for a specific scene
  updateSceneState: (sceneName, updates) => {
    if (!SceneStates[sceneName]) {
      SceneStates[sceneName] = { 
        clickedButtons: [], 
        disabledButtons: [], 
        answered: false, 
        feedbackShown: false, 
        feedbackType: '',
        result: '',
        showTap: true,
        showNext: false,
        boxCss: ''
      };
    }
    SceneStates[sceneName] = {
      ...SceneStates[sceneName],
      ...updates
    };
    console.log(`State Updated for ${sceneName}:`, SceneStates[sceneName]);
  },

  // Reset state for a specific scene
  resetSceneState: (sceneName) => {
    SceneStates[sceneName] = {
      clickedButtons: [],
      disabledButtons: [],
      answered: false,
      feedbackShown: false,
      feedbackType: '',
      result: '',
      showTap: true,
      showNext: false,
      boxCss: ''
    };
    console.log(`State Reset for ${sceneName}`);
  },

  // Get scene name from question index
  getSceneName: (questionIndex) => {
    const sceneNames = ['scene1', 'scene2', 'scene3', 'scene4'];
    return sceneNames[questionIndex] || 'scene1';
  }
};

// Make i18n, AppData, and SceneStateManager globally available
window.i18n = i18n;
window.AppData = AppData;
window.SceneStateManager = SceneStateManager;

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
