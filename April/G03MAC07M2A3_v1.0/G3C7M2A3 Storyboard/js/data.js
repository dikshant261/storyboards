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
        title: "Reading Time",
      },

      messages: {
        pageStatesCleared: "Page states have been cleared. Reload the page to start over?",
        nextButtonPage2: "Page change event sent",
        nextButtonPage3: "Page change event sent",
        nextButtonPage4: "Page change event sent",
        previousButtonPage1: "Previous button event sent",
        navigationReset: "Resetting to question 1",
        navigationComplete: "App reset complete – ready for a new question",
        lastPageStartingOver: "Last page – starting over",
        allStagesCompleted: "All stages completed!",
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        start: "Start",
        continue: 'Continue',
        check:'Check'
      },

      common: {
        heavy: "Heavy",
        light: "Light",
        tapAlt: "Tap",
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
          title: "Setting Time",
          mainText:
            "Let’s learn how to set time on a clock!<br/><br/>Tap “Start” to begin!",
        },
        page2: {
          talkBoxText:
            "Hey Jax, can you read the time on this clock?",
          instructionText: "Shout-The-Time-Out-Loud, then tap »",
        },
        page3: {
          talkBoxText: "The <span style='color:#FFD700'>short hand has crossed 5</span><br/> and <span style='color:#70ACC7'>the long hand is at 3</span>. So, it is <br/><span style='color:#70ACC7'>quarter past</span> <span style='color:#FFD700'>5</span>.",
          instructionText: "Tap » for a challenge from DeeTee.",
          positionOf: "<span style='color:#70ACC7'>Quarter past</span> <span style='color:#FFD700'>5</span>"
        },
        page4: {
          talkBoxText: "That’s correct.<br/><br/>Can you set the time to <br/><span style='color:#FFD700'>half past 8?</span>",
          instructionText: "Tap » to help jax set the time correctly.",
          timeOnClock: "TIME ON CLOCK?"
        },
        
        page5: {
          talkBoxText: "Will you help me set the time to half past 8? <span style='color:#FFD700'>Move the short hand between 8 and 9.</span>",
          talkBoxPhase1: "Will you help me set the time to {time}? <span style='color:#FFD700'>Move the short hand between {hour12} and {nextNum}.</span>",
          talkBoxPhase2: "Now, for {time}, point the <span style='color: aqua'>long hand to {minutePos}</span>!",
          talkBoxPhase3: "Yay! Now this clock shows {time}.",
          instructionText: "Rotate the short hand to between 8 and 9, then tap check.",
          instructionPhase1: "Rotate the short hand to between {hour12} and {nextNum}, then tap check.",
          instructionPhase2: "Rotate the long hand to {minutePos}, then tap check.",
          instructionAfterQuiz: "Tap » to move to the next question.",
          instructionAfterLastQuiz: "Tap » to set another time on the clock.",
          instructionAfterQuizStartOver: "Tap » to start over again",
          timeOnClock: "TIME ON CLOCK?",
          feedbackCorrectPhase1: "Well done!<br>The short hand is set correctly.<br><br>Time to set the long hand.",
          feedbackIncorrectPhase1: "Oops! Turn the short hand to point it between {hour12} and {nextNum}",
          feedbackCorrectPhase2: "Well done!<br><br>The time is set to {time}.",
          feedbackIncorrectPhase2: "Oops! Turn the long hand to point it at {minutePos} on the clock.",
        },
        
      },

      questionArray: [
        { hour: 8, minute: 30, text: "half-past 8" },
        { hour: 1, minute: 15, text: "quarter past 1" },
        { hour: 10, minute: 30, text: "half past 10" },
        { hour: 3, minute: 45, text: "quarter to 4" },
        { hour: 7, minute: 15, text: "quarter past 7" },
        { hour: 4, minute: 30, text: "half past 4" },
        { hour: 8, minute: 45, text: "quarter to 9" },
        { hour: 3, minute: 15, text: "quarter past 3" },
        { hour: 6, minute: 30, text: "half past 6" },
        { hour: 6, minute: 45, text: "quarter to 7" },
      ],
    },
    id: {
      appInfo: {
        title: "Membaca Waktu",
      },

      messages: {
        pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
        nextButtonPage2: "Event perpindahan halaman telah dikirim",
        nextButtonPage3: "Event perpindahan halaman telah dikirim",
        nextButtonPage4: "Event perpindahan halaman telah dikirim",
        previousButtonPage1: "Event tombol sebelumnya telah dikirim",
        navigationReset: "Mengatur ulang ke pertanyaan 1",
        navigationComplete: "Reset aplikasi selesai – siap untuk pertanyaan baru",
        lastPageStartingOver: "Halaman terakhir – memulai kembali",
        allStagesCompleted: "Semua tahap telah selesai!",
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang",
        start: "Mulai",
        continue: "Lanjutkan",
        check: "Periksa",
      },

      common: {
        heavy: "Berat",
        light: "Ringan",
        tapAlt: "Ketuk",
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
          title: "Mengatur Waktu",
          mainText: "Mari belajar mengatur waktu pada jam!<br/><br/>Ketuk \"Mulai\" untuk memulai!",
        },
        page2: {
          talkBoxText: "Hei Jax, bisakah kamu membaca waktu pada jam ini?",
          instructionText: "Ucapkan waktunya dengan keras, lalu ketuk »",
        },
        page3: {
          talkBoxText: "<span style='color:#FFD700'>Jarum pendek telah melewati 5</span><br/> dan <span style='color:#70ACC7'>jarum panjang berada di 3</span>. Jadi, waktunya <br/><span style='color:#70ACC7'>seperempat</span> <span style='color:#FFD700'>5</span>.",
          instructionText: "Ketuk » untuk tantangan dari DeeTee.",
          positionOf: "<span style='color:#70ACC7'>Seperempat</span> <span style='color:#FFD700'>5</span>",
        },
        page4: {
          talkBoxText: "Benar.<br/><br/>Bisakah kamu mengatur waktu ke <br/><span style='color:#FFD700'>setengah 9?</span>",
          instructionText: "Ketuk » untuk membantu Jax mengatur waktu dengan benar.",
          timeOnClock: "WAKTU PADA JAM?",
        },
        page5: {
          talkBoxText: "Maukah kamu membantuku mengatur waktu ke setengah 9? <span style='color:#FFD700'>Pindahkan jarum pendek di antara 8 dan 9.</span>",
          talkBoxPhase1: "Maukah kamu membantuku mengatur waktu ke {time}? <span style='color:#FFD700'>Pindahkan jarum pendek di antara {hour12} dan {nextNum}.</span>",
          talkBoxPhase2: "Sekarang, untuk {time}, arahkan <span style='color: aqua'>jarum panjang ke {minutePos}</span>!",
          talkBoxPhase3: "Hore! Sekarang jam ini menampilkan {time}.",
          instructionText: "Putar jarum pendek ke antara 8 dan 9, lalu ketuk periksa.",
          instructionPhase1: "Putar jarum pendek ke antara {hour12} dan {nextNum}, lalu ketuk periksa.",
          instructionPhase2: "Putar jarum panjang ke {minutePos}, lalu ketuk periksa.",
          instructionAfterQuiz: "Ketuk » untuk ke pertanyaan berikutnya.",
          instructionAfterLastQuiz: "Ketuk » untuk mengatur waktu lain pada jam.",
          instructionAfterQuizStartOver: "Ketuk » untuk memulai dari awal lagi",
          timeOnClock: "WAKTU PADA JAM?",
          feedbackCorrectPhase1: "Bagus!<br>Jarum pendek sudah diatur dengan benar.<br><br>Saatnya mengatur jarum panjang.",
          feedbackIncorrectPhase1: "Ups! Putar jarum pendek agar mengarah ke antara {hour12} dan {nextNum}",
          feedbackCorrectPhase2: "Bagus!<br><br>Waktu telah diatur ke {time}.",
          feedbackIncorrectPhase2: "Ups! Putar jarum panjang agar mengarah ke {minutePos} pada jam.",
        },
        page6: {
          talkBoxText:
            "Kita mengatakan bahwa tas adalah benda berat karena sulit diangkat! Ayo coba benda lainnya.",
          instructionText: "Ketuk » untuk mencoba benda lain.",
        },
        page7: {
          talkBoxText:
            "Kerja bagus Jax. Sekarang mari kita coba mengangkat dua benda ini.",
          instructionText: "Ketuk » untuk melihat cara Jax mengangkatnya.",
        },
        page8: {
          talkBoxText: "Ya! Tentu,<br/> DeeTee.",
          instructionText:
            "Ketuk tombol “Angkat Bulu” untuk melihat cara Jax mengangkatnya.",
          liftBag: "Angkat Bulu",
          liftEraser: "Angkat Semangka",
          liftFeatherText: "Haaa… mudah sekali mengangkatnya!",
          liftWatermelonText: "Uffff… sulit mengangkatnya!",
          instructionText2: "Ketuk » untuk melihat apa kata DeeTee.",
        },
        page9: {
          talkBoxText:
            "Kita mengatakan bahwa bulu adalah benda ringan karena mudah diangkat! Ayo coba satu set lagi.",
          instructionText: "Ketuk » untuk mencoba benda lainnya.",
        },
        page10: {
          talkBoxText: "Luar biasa Jax. Terakhir, angkat dua benda ini.",
          instructionText: "Ketuk » untuk melihat cara Jax mengangkatnya.",
        },
        page11: {
          talkBoxText: "Ya! Tentu,<br/> DeeTee.",
          instructionText: "Ketuk tombol untuk melihat cara Jax mengangkatnya.",
          liftStone: "Angkat Batu",
          liftPencil: "Angkat Pensil",
          liftStoneText: "Uffff… sangat sulit mengangkatnya!",
          liftPencilText: "Haaa… mudah sekali mengangkatnya!",
          instructionText2: "Ketuk » untuk melihat apa kata DeeTee.",
        },
        page12: {
          talkBoxText:
            "Kita mengatakan bahwa batu adalah benda berat karena sulit diangkat!",
          instructionText: "Ketuk » untuk merangkum benda berat dan ringan.",
        },
        page13: {
          talkBoxText:
            "Kerja bagus Jax! Sekarang, mari aku jelaskan tentang benda berat dan ringan.",
          instructionText: "Ketuk » untuk memulai kembali.",
          heavyObejects: "Benda Berat",
          lightObjects: "Benda Ringan",
          hardToLift: "<span style='color:#70ACC7'>Sulit</span> diangkat!",
          easyToLift: "<span style='color:#70ACC7'>Mudah</span> diangkat!",
        },
        page14: {
          title: "Benda Berat dan Ringan",
          mainText:
            "Hebat! Sekarang kita tahu apa itu<br/> benda <span style='color:#70ACC7'>berat</span> dan <span style='color:#70ACC7'>ringan</span>.",
        },
      },

      questionArray: [
        { hour: 8, minute: 30, text: "setengah 9" },
        { hour: 1, minute: 15, text: "seperempat 2" },
        { hour: 10, minute: 30, text: "setengah 11" },
        { hour: 3, minute: 45, text: "kurang seperempat 4" },
        { hour: 7, minute: 15, text: "seperempat 8" },
        { hour: 4, minute: 30, text: "setengah 5" },
        { hour: 8, minute: 45, text: "kurang seperempat 9" },
        { hour: 3, minute: 15, text: "seperempat 4" },
        { hour: 6, minute: 30, text: "setengah 7" },
        { hour: 6, minute: 45, text: "kurang seperempat 7" },
      ],
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
