// data.js - Internationalization data for the Diver Coral Reef Planting Learning Applet
// Contains only the text content that's actually used in the app

const highlightColor1 = "#FFD700";
const highlightColor2 = "#70ACC7";
const highlightColor3 = "#F28283";
const highlightColor4 = "#00FF7F";
const highlightColor5 = "#8A2BE2";

const questionTextSize = "24gc";

const AppData = {
  // Current language setting
  currentLanguage: "en",

  // Text content by language
  translations: {
    en: {
      appInfo: {
        title: "Heavy and Light Objects",
      },
      messages: {
        pageStatesCleared:
          "Page states have been cleared. Reload the page to start fresh?",
        nextButtonPage2: "Dispatched page change event",
        previousButtonPage1: "Dispatched page change event",
        navigationReset: "Resetting to question 1",
        navigationComplete:
          "Complete app reset completed - ready for new question",
        lastPageStartingOver: "Last page - Starting over",
        allStagesCompleted: "All stages completed!",
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        start: "Start",
      },

      common: {
        heavy: "Heavy",
        light: "Light",
        tapAlt: "Tap",
        defaultObjectHeavy: "rock",
        defaultObjectLight: "pencil",
        hardToLift: "Hard to lift",
        easyToLift: "Easy to lift",
        heavyObject: "Heavy Object",
        lightObject: "Light Object",
        hardWord: "Hard",
        easyWord: "Easy",
        toLift: "to lift",
        questionText:
          "Humam is a diver who cares about the environment. One day he and his team will do coral planting to repair damaged coral reefs. Humam's condition is documented as shown in the picture below. If the sea being dived is 20 meters and the bottom is flat. How much area of the seabed can Humam reach to plant coral reefs?",
        questionIcon: "Q",
        informationAnalysis: {
          header: "INFORMATION ANALYSIS",
          facts: "Facts",
          values: "Value",
          toFind: "To Find",
        },
        conceptSummary: {
          header: "CONCEPT SUMMARY",
          given: "Given",
          toFind: "To Find",
          keyConcepts: "Key Concepts",
          importantFormulae: "Calculations",
        },
      },

      components: {
        informationAnalysis: {
          headerText: "INFORMATION ANALYSIS",
          factsTitle: "Facts",
          valueTitle: "Value",
          toFindTitle: "To Find",
        },
        conceptSummary: {
          headerText: "CONCEPT SUMMARY",
          givenTitle: "Given",
          toFindTitle: "To Find",
          keyConceptsTitle: "Key Concepts",
          importantFormulaeTitle: "Calculations",
        },
      },

      pages: {
        page1: {
          title: "<span style='color:gold'>Heavy</span> and <span style='color:aqua'>Light</span> Objects",
          mainText:
            "Let’s learn about<br><span style='color:gold'>heavy</span> object and <span style='color:aqua'>light</span> objects.<br><br>Tap \"Start\" to begin!",
        },
        page2: {
          talkBoxText:
            "Let's see which one is hard and easy to lift.",
          instructionText: "Tap images to see",
          instructionTextContinue: "Tap » to continue",
          instructionTextTryMore: "Tap » to try with more examples.",
          instructionTextWhenBothClicked: "Tap the buttons",
          talkBoxHeavyLabel:
            "Objects that are <span style=\"color: gold\">hard</span> to lift are <span style=\"color: gold\">heavy</span> objects.",
          talkBoxLightLabel:
            "Objects that are <span style=\"color: aqua\">easy</span> to lift are <span style=\"color: aqua\">light</span> objects.",
          talkBoxSuffix:
            "<br><br>Let's see what we call objects that are <span style=\"color: gold\">hard</span> or <span style=\"color: aqua\">easy</span> to lift.",
          talkBoxItemHeavy: "The {name} is <span style=\"color: gold\">hard</span> to lift.",
          talkBoxItemLight: "The {name} is <span style=\"color: aqua\">easy</span> to lift.",
        },
        page3: {
          talkBoxText: "Between the rock and the pencil - which is <span style=\"color: aqua\">easy to lift</span>?",
          instructionText: "Tap the correct image",
          instructionTextContinue: "Tap » to continue",
          instructionTextTryMore: "Tap » to try with more examples.",
          instructionTextWhenBothClicked: "Tap the buttons",
          talkBoxCorrectHeavy: "That's correct! The {name} is <span style=\"color: green\">hard to lift, so it is a heavy object.</span>",
          talkBoxOopsLight: "Oops! The {name} is <span style=\"color: salmon\">easy to lift, so it is a light object.</span>",
          talkBoxOopsHeavy: "Oops! The {name} is <span style=\"color: salmon\">hard to lift</span>.",
          talkBoxGoodJobLight: "Good job! The {name} is <span style=\"color: green\">easy to lift</span>.<br><br>Between the two objects, which is <span style=\"color: gold\">heavy</span>?",
        },
        page4: {
          talkBoxText:
            "<span style=\"color: gold\">Heavy</span> objects are <span style=\"color: gold\">hard</span> to lift.<br><br><span style=\"color: aqua\">Light</span> objects are <span style=\"color: aqua\">easy</span> to lift.",
          instructionText: "Tap » to continue",
          instructionTextContinue: "Tap » to continue",
          instructionTextTryMore: "Tap » to try with more examples.",
          instructionTextWhenBothClicked: "Tap the buttons",
          talkBoxCorrectHeavy: "That's correct! The {name} is <span style=\"color: green\">hard to lift, so it is a heavy object.</span>",
          talkBoxOopsLight: "Oops! The {name} is <span style=\"color: salmon\">easy to lift, so it is a light object.</span>",
          talkBoxOopsHeavy: "Oops! The {name} is <span style=\"color: salmon\">hard to lift</span>.",
          talkBoxGoodJobLight: "Good job! The {name} is <span style=\"color: green\">easy to lift</span>.<br><br>Between the two objects, which is <span style=\"color: gold\">heavy</span>?",
        },
        page5: {
          title: "<span style='color:gold'>Heavy</span> and <span style='color:aqua'>Light</span> Objects",
          mainText:
            "Awesome! Now we know what<br><span style='color:gold'>heavy</span> and <span style='color:aqua'>light</span> objects are.",
          talkBoxText: "Yes! Sure,<br/> DeeTee.",
          instructionText: "Tap “Lift Bag” button to see how Jax lifts.",
          liftBag: "Lift Bag",
          liftEraser: "Lift Eraser",
          liftBagText: "Uffff…it’s hard to lift!",
          liftEraserText: "haaa…it’s easy to lift!",
          instructionText2: "Tap » to see what DeeTee says.",
        },
      },
    },
    id: {
      appInfo: {
        title: "Benda Berat dan Ringan",
      },

      messages: {
        pageStatesCleared:
          "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
        nextButtonPage2: "Event perpindahan halaman telah dikirim",
        previousButtonPage1: "Event perpindahan halaman telah dikirim",
        navigationReset: "Mengatur ulang ke pertanyaan 1",
        navigationComplete:
          "Reset aplikasi selesai – siap untuk pertanyaan baru",
        lastPageStartingOver: "Halaman terakhir – memulai kembali",
        allStagesCompleted: "Semua tahap telah selesai!",
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang",
        start: "Mulai",
      },

      common: {
        heavy: "Berat",
        light: "Ringan",
        tapAlt: "Ketuk",
        defaultObjectHeavy: "batu",
        defaultObjectLight: "pensil",
        hardToLift: "Sulit diangkat",
        easyToLift: "Mudah diangkat",
        heavyObject: "Benda Berat",
        lightObject: "Benda Ringan",
        hardWord: "Sulit",
        easyWord: "Mudah",
        toLift: "diangkat",
        questionText:
          "Humam adalah seorang penyelam yang peduli terhadap lingkungan. Suatu hari, ia dan timnya akan melakukan penanaman karang untuk memperbaiki terumbu karang yang rusak. Kondisi Humam didokumentasikan seperti yang ditunjukkan pada gambar di bawah ini. Jika kedalaman laut yang diselami adalah 20 meter dan dasar lautnya datar, berapa luas area dasar laut yang dapat dijangkau Humam untuk menanam terumbu karang?",
        questionIcon: "P",
        informationAnalysis: {
          header: "ANALISIS INFORMASI",
          facts: "Fakta",
          values: "Nilai",
          toFind: "Yang Dicari",
        },
        conceptSummary: {
          header: "RINGKASAN KONSEP",
          given: "Diketahui",
          toFind: "Yang Dicari",
          keyConcepts: "Konsep Utama",
          importantFormulae: "Perhitungan",
        },
      },

      components: {
        informationAnalysis: {
          headerText: "ANALISIS INFORMASI",
          factsTitle: "Fakta",
          valueTitle: "Nilai",
          toFindTitle: "Yang Dicari",
        },
        conceptSummary: {
          headerText: "RINGKASAN KONSEP",
          givenTitle: "Diketahui",
          toFindTitle: "Yang Dicari",
          keyConceptsTitle: "Konsep Utama",
          importantFormulaeTitle: "Perhitungan",
        },
      },

      pages: {
        page1: {
          title: "<span style='color:gold'>Benda Berat</span> dan <span style='color:aqua'>Ringan</span>",
          mainText:
            "Ayo belajar tentang <span style='color:#70ACC7'>benda berat</span> dan <br/><span style='color:#70ACC7'>benda ringan</span> bersama Jax dan DeeTee. <br/><br/>Ketuk “Mulai” untuk memulai!",
        },
        page2: {
          talkBoxText:
            "Mari kita lihat mana yang sulit dan mudah diangkat.",
          instructionText: "Ketuk gambar untuk melihat",
          instructionTextContinue: "Ketuk » untuk melanjutkan",
          instructionTextTryMore: "Ketuk » untuk mencoba contoh lain.",
          instructionTextWhenBothClicked: "Ketuk tombolnya",
          talkBoxHeavyLabel:
            "Benda yang <span style=\"color: gold\">sulit</span> diangkat adalah <span style=\"color: gold\">benda berat</span>.",
          talkBoxLightLabel:
            "Benda yang <span style=\"color: aqua\">mudah</span> diangkat adalah <span style=\"color: aqua\">benda ringan</span>.",
          talkBoxSuffix:
            "<br><br>Mari kita lihat apa sebutan benda yang <span style=\"color: gold\">sulit</span> atau <span style=\"color: aqua\">mudah</span> diangkat.",
          talkBoxItemHeavy: "{name} <span style=\"color: gold\">sulit</span> diangkat.",
          talkBoxItemLight: "{name} <span style=\"color: aqua\">mudah</span> diangkat.",
        },
        page3: {
          talkBoxText: "Antara batu dan pensil - mana yang <span style=\"color: aqua\">mudah diangkat</span>?",
          instructionText: "Ketuk gambar yang benar",
          instructionTextContinue: "Ketuk » untuk melanjutkan",
          instructionTextTryMore: "Ketuk » untuk mencoba contoh lain.",
          instructionTextWhenBothClicked: "Ketuk tombolnya",
          talkBoxCorrectHeavy: "Benar! {name} <span style=\"color: green\">sulit diangkat, jadi itu benda berat.</span>",
          talkBoxOopsLight: "Ups! {name} <span style=\"color: salmon\">mudah diangkat, jadi itu benda ringan.</span>",
          talkBoxOopsHeavy: "Ups! {name} <span style=\"color: salmon\">sulit diangkat</span>.",
          talkBoxGoodJobLight: "Bagus! {name} <span style=\"color: green\">mudah diangkat</span>.<br><br>Dari dua benda ini, mana yang <span style=\"color: gold\">berat</span>?",
        },
        page4: {
          talkBoxText:
            "<span style=\"color: gold\">Benda berat</span> <span style=\"color: gold\">sulit</span> diangkat.<br><br><span style=\"color: aqua\">Benda ringan</span> <span style=\"color: aqua\">mudah</span> diangkat.",
          instructionText: "Ketuk » untuk melanjutkan",
          instructionTextContinue: "Ketuk » untuk melanjutkan",
          instructionTextTryMore: "Ketuk » untuk mencoba contoh lain.",
          instructionTextWhenBothClicked: "Ketuk tombolnya",
          talkBoxCorrectHeavy: "Benar! {name} <span style=\"color: green\">sulit diangkat, jadi itu benda berat.</span>",
          talkBoxOopsLight: "Ups! {name} <span style=\"color: salmon\">mudah diangkat, jadi itu benda ringan.</span>",
          talkBoxOopsHeavy: "Ups! {name} <span style=\"color: salmon\">sulit diangkat</span>.",
          talkBoxGoodJobLight: "Bagus! {name} <span style=\"color: green\">mudah diangkat</span>.<br><br>Dari dua benda ini, mana yang <span style=\"color: gold\">berat</span>?",
        },
        page5: {
          title: "<span style='color:gold'>Benda Berat</span> dan <span style='color:aqua'>Ringan</span>",
          mainText:
            "Luar biasa! Sekarang kita tahu apa itu<br><span style='color:gold'>benda berat</span> dan <span style='color:aqua'>ringan</span>.",
          talkBoxText: "Ya! Tentu,<br/> DeeTee.",
          instructionText:
            "Ketuk tombol “Angkat Tas” untuk melihat cara Jax mengangkatnya.",
          liftBag: "Angkat Tas",
          liftEraser: "Angkat Penghapus",
          liftBagText: "Uffff… sulit sekali mengangkatnya!",
          liftEraserText: "Haaa… mudah sekali mengangkatnya!",
          instructionText2: "Ketuk » untuk melihat apa kata DeeTee.",
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
        Object.keys(AppData.translations),
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
