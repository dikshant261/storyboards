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


      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        start: "Start",
        continue: 'Continue',
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

      Question: [
        {
          hour: 5,
          minutes: 15,
          options: [
            {
              text: "Quarter to 5",
              iscorrect: false,
              feedback: "Oops! Check the number the long hand is pointing to.",
            },
            {
              text: "Quarter past 5",
              iscorrect: true,
              feedback: "Well done! That’s correct.",
            },
            {
              text: "Half past 5",
              iscorrect: false,
              feedback: "Oops! Check the number the long hand is pointing to.",
            }

          ],
        },
        {
          hour: 2,
          minutes: 30,
          options: [
            { text: "Quarter past 2", iscorrect: false, feedback: "Oops! Check the minute hand." },
            { text: "Half past 2", iscorrect: true, feedback: "Well done! That’s correct." },
            { text: "Quarter to 2", iscorrect: false, feedback: "Oops! Check the minute hand." }
          ],
        },
        {
          hour: 3,
          minutes: 45,
          options: [
            { text: "Half past 3", iscorrect: false, feedback: "Look carefully at the clock." },
            { text: "Quarter to 4", iscorrect: true, feedback: "Well done! That’s correct." },
            { text: "Quarter past 4", iscorrect: false, feedback: "Look carefully at the clock." }
          ],
        },
        {
          hour: 6,
          minutes: 15,
          options: [
            { text: "Half past 6", iscorrect: false, feedback: "Check the minute hand." },
            { text: "Quarter to 6", iscorrect: false, feedback: "Check the minute hand." },
            { text: "Quarter past 6", iscorrect: true, feedback: "Well done! That’s correct." }
          ],
        },
        {
          hour: 7,
          minutes: 30,
          options: [
            { text: "Quarter past 7", iscorrect: false, feedback: "Observe the minute hand." },
            { text: "Half past 7", iscorrect: true, feedback: "Well done! That’s correct." },
            { text: "Quarter to 7", iscorrect: false, feedback: "Observe the minute hand." }
          ],
        },
        {
          hour: 6,
          minutes: 45,
          options: [
            { text: "Quarter past 6", iscorrect: false, feedback: "Check again." },
            { text: "Quarter to 6", iscorrect: true, feedback: "Well done! That’s correct." },
            { text: "Half past 6", iscorrect: false, feedback: "Check again." }
          ],
        },
        {
          hour: 8,
          minutes: 15,
          options: [
            { text: "Quarter to 8", iscorrect: false, feedback: "Look carefully." },
            { text: "Quarter past 8", iscorrect: true, feedback: "Well done! That’s correct." },
            { text: "Half past 8", iscorrect: false, feedback: "Look carefully." }
          ],
        },
        {
          hour: 8,
          minutes: 30,
          options: [
            { text: "Half past 8", iscorrect: true, feedback: "Well done! That’s correct." },
            { text: "Quarter past 8", iscorrect: false, feedback: "Check the clock hands." },
            { text: "Quarter to 8", iscorrect: false, feedback: "Check the clock hands." }
          ],
        },
        {
          hour: 8,
          minutes: 45,
          options: [
            { text: "Half past 9", iscorrect: false, feedback: "Observe again." },
            { text: "Quarter to 9", iscorrect: true, feedback: "Well done! That’s correct." },
            { text: "Quarter past 9", iscorrect: false, feedback: "Observe again." }
          ],
        },
        {
          hour: 10,
          minutes: 15,
          options: [
            { text: "Quarter past 10", iscorrect: true, feedback: "Well done! That’s correct." },
            { text: "Half past 10", iscorrect: false, feedback: "Check carefully." },
            { text: "Quarter to 10", iscorrect: false, feedback: "Check carefully." }
          ],
        }
      ],
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
          title: "Reading Time",
          mainText:
            "Let’s learn how to read time on a clock!<br/><br/>Tap “Start” to begin!",
        },
        page2: {
          talkBoxText: "What time is the clock showing?",
          instructionText: "Tap the correct option.",
          instructionAfterQuiz: 'Tap » to try another time.',
          finish:'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          quizPanel: {
            quizSubType: "QT3R",
            questionText: '',
            options: [
              {
                text: "5 o’clock",
                iscorrect: true,
                feedback: "Well done! That’s correct.",
              },
              {
                text: "8 o’clock",
                iscorrect: false,
                feedback: "Oops! Check the number the short hand is pointing to.",
              },
              {
                text: "12 o’clock",
                iscorrect: false,
                feedback: "Oops! Check the number the short hand is pointing to.",
              }

            ],
          }
        },
        
        page3: {
          title: "Reading Time",
          mainText:
            "Awesome! We can read time on a <br/>clock now.<br/><br/>Tap “Start Over” to re-do this activity!",
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
          title: "Benda Berat dan Ringan",
          mainText:
            "Ayo belajar tentang <span style='color:#70ACC7'>benda berat</span> dan <br/><span style='color:#70ACC7'>benda ringan</span> bersama Jax dan DeeTee. <br/><br/>Ketuk “Mulai” untuk memulai!",
        },
        page2: {
          talkBoxText:
            "Jax, benda mana yang berat dan mana yang ringan — tas atau penghapus?",
          instructionText: "Ketuk » untuk melihat apa kata Jax.",
        },
        page3: {
          talkBoxText: "Apa itu benda berat dan benda ringan?",
          instructionText: "Ketuk » untuk melihat penjelasan DeeTee.",
        },
        page4: {
          talkBoxText:
            "Baik Jax! Sebelum aku menjelaskan, bisakah kamu mencoba mengangkat tas dan penghapus?",
          instructionText: "Ketuk » untuk melihat apa yang dilakukan Jax.",
        },
        page5: {
          talkBoxText: "Ya! Tentu,<br/> DeeTee.",
          instructionText:
            "Ketuk tombol “Angkat Tas” untuk melihat cara Jax mengangkatnya.",
          liftBag: "Angkat Tas",
          liftEraser: "Angkat Penghapus",
          liftBagText: "Uffff… sulit sekali mengangkatnya!",
          liftEraserText: "Haaa… mudah sekali mengangkatnya!",
          instructionText2: "Ketuk » untuk melihat apa kata DeeTee.",
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
window.Question = Question;
// Make i18n globally available
window.i18n = i18n;
