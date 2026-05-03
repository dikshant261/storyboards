// data.js - Internationalization (en / id) for the Reading Time applet
// All user-visible copy should live here; PageConfig references keys via i18n.

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
        pageStatesCleared:
          "Page states have been cleared. Reload the page to start fresh?",
        nextButtonPage2: "Page change event dispatched",
        previousButtonPage1: "Page change event dispatched",
        navigationReset: "Resetting to question 1",
        navigationComplete: "App reset complete — ready for a new question",
        lastPageStartingOver: "Last page — starting over",
        allStagesCompleted: "All stages completed!",
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
          "Read the time on the clock and tap the answer that matches.",
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
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          hour: 2,
          minutes: 30,
          quizPanel: {
            quizSubType: "QT3R",
            questionText: '',


            options: [
              { text: "Quarter past 2", iscorrect: false, feedback: "Oops! Check the minute hand." },
              { text: "Half past 2", iscorrect: true, feedback: "Well done! That’s correct." },
              { text: "Quarter to 2", iscorrect: false, feedback: "Oops! Check the minute hand." }
            ],

          }
        },
        page3: {
          talkBoxText: "What time is the clock showing?",
          instructionText: "Tap the correct option.",
          instructionAfterQuiz: 'Tap » to try another time.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          hour: 2,
          minutes: 30,
          delayHour: 3,
          delayMinute: 45,
          quizPanel: {
            quizSubType: "QT3R",
            questionText: '',


            options: [
              { text: "Half past 3", iscorrect: false, feedback: "Look carefully at the clock." },
              { text: "Quarter to 4", iscorrect: true, feedback: "Well done! That’s correct." },
              { text: "Quarter past 4", iscorrect: false, feedback: "Look carefully at the clock." }
            ],

          }
        },
        page4: {
          talkBoxText: "What time is the clock showing?",
          instructionText: "Tap the correct option.",
          instructionAfterQuiz: 'Tap » to try another time.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          hour: 3,
          minutes: 45,
          delayHour: 5,
          delayMinute: 15,
          quizPanel: {
            quizSubType: "QT3R",
            questionText: '',
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



          }
        },
        page5: {
          talkBoxText: "What time is the clock showing?",
          instructionText: "Tap the correct option.",
          instructionAfterQuiz: 'Tap » to try another time.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          hour: 5,
          minutes: 15,
          delayHour: 6,
          delayMinute: 15,
          quizPanel: {
            quizSubType: "QT3R",
            questionText: '',
            options: [
              { text: "Half past 6", iscorrect: false, feedback: "Check the minute hand." },
              { text: "Quarter to 6", iscorrect: false, feedback: "Check the minute hand." },
              { text: "Quarter past 6", iscorrect: true, feedback: "Well done! That’s correct." }
            ],
          }
        },
        page6: {
          talkBoxText: "What time is the clock showing?",
          instructionText: "Tap the correct option.",
          instructionAfterQuiz: 'Tap » to try another time.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          hour: 6,
          minutes: 15,
          delayHour: 6,
          delayMinute: 45,
          quizPanel: {
            quizSubType: "QT3R",
            questionText: '',
            options: [
              { text: "Quarter past 6", iscorrect: false, feedback: "Check again." },
              { text: "Quarter to 7", iscorrect: true, feedback: "Well done! That’s correct." },
              { text: "Half past 6", iscorrect: false, feedback: "Check again." }
            ],
          }
        },
        page7: {
          talkBoxText: "What time is the clock showing?",
          instructionText: "Tap the correct option.",
          instructionAfterQuiz: 'Tap » to try another time.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          hour: 6,
          minutes: 45,
          delayHour: 7,
          delayMinute: 30,
          quizPanel: {
            quizSubType: "QT3R",
            questionText: '',
            options: [
              { text: "Quarter past 7", iscorrect: false, feedback: "Observe the minute hand." },
              { text: "Half past 7", iscorrect: true, feedback: "Well done! That’s correct." },
              { text: "Quarter to 7", iscorrect: false, feedback: "Observe the minute hand." }
            ],
          }
        },
        page8: {
          talkBoxText: "What time is the clock showing?",
          instructionText: "Tap the correct option.",
          instructionAfterQuiz: 'Tap » to try another time.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          hour: 7,
          minutes: 30,
          delayHour: 8,
          delayMinute: 15,
          quizPanel: {
            quizSubType: "QT3R",
            questionText: '',
            options: [
              { text: "Quarter to 8", iscorrect: false, feedback: "Look carefully." },
              { text: "Quarter past 8", iscorrect: true, feedback: "Well done! That’s correct." },
              { text: "Half past 8", iscorrect: false, feedback: "Look carefully." }
            ],
          }
        },
        page9: {
          talkBoxText: "What time is the clock showing?",
          instructionText: "Tap the correct option.",
          instructionAfterQuiz: 'Tap » to try another time.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          hour: 8,
          minutes: 15,
          delayHour: 8,
          delayMinute: 30,
          quizPanel: {
            quizSubType: "QT3R",
            questionText: '',
            options: [
              { text: "Half past 8", iscorrect: true, feedback: "Well done! That’s correct." },
              { text: "Quarter past 8", iscorrect: false, feedback: "Check the clock hands." },
              { text: "Quarter to 8", iscorrect: false, feedback: "Check the clock hands." }
            ],
          }
        },
        page10: {
          talkBoxText: "What time is the clock showing?",
          instructionText: "Tap the correct option.",
          instructionAfterQuiz: 'Tap » to try another time.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          hour: 8,
          minutes: 30,
          delayHour: 8,
          delayMinute: 45,
          quizPanel: {
            quizSubType: "QT3R",
            questionText: '',
            options: [
              { text: "Half past 9", iscorrect: false, feedback: "Observe again." },
              { text: "Quarter to 9", iscorrect: true, feedback: "Well done! That’s correct." },
              { text: "Quarter past 9", iscorrect: false, feedback: "Observe again." }
            ],
          }
        },
        page11: {
          talkBoxText: "What time is the clock showing?",
          instructionText: "Tap the correct option.",
          instructionAfterQuiz: 'Tap » to summarize.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          hour: 8,
          minutes: 45,
          delayHour: 10,
          delayMinute: 15,
          quizPanel: {
            quizSubType: "QT3R",
            questionText: '',
            options: [
              { text: "Quarter past 10", iscorrect: true, feedback: "Well done! That’s correct." },
              { text: "Half past 10", iscorrect: false, feedback: "Check carefully." },
              { text: "Quarter to 10", iscorrect: false, feedback: "Check carefully." }
            ],
          }
        },
        page12: {
          title: "Reading Time",
          mainText:
            "Awesome! We can read time on a <br/>clock now.<br/><br/>Tap “Start Over” to re-do this activity!",
        },
      },
    },
    id: {
      appInfo: {
        title: "Membaca Waktu",
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
        continue: "Lanjutkan",
      },

      common: {
        heavy: "Berat",
        light: "Ringan",
        tapAlt: "Ketuk",
        questionText:
          "Baca waktu di jam dan ketuk jawaban yang sesuai.",
        questionIcon: "Q",
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

      Question: [
        {
          hour: 5,
          minutes: 15,
          options: [
            {
              text: "Kurang seperempat jam lima",
              iscorrect: false,
              feedback: "Ups! Perhatikan angka yang ditunjuk jarum panjang.",
            },
            {
              text: "Seperempat lepas jam lima",
              iscorrect: true,
              feedback: "Bagus! Itu benar.",
            },
            {
              text: "Setengah lepas jam lima",
              iscorrect: false,
              feedback: "Ups! Perhatikan angka yang ditunjuk jarum panjang.",
            },
          ],
        },
        {
          hour: 2,
          minutes: 30,
          options: [
            { text: "Seperempat lepas jam dua", iscorrect: false, feedback: "Ups! Perhatikan jarum menit." },
            { text: "Setengah lepas jam dua", iscorrect: true, feedback: "Bagus! Itu benar." },
            { text: "Kurang seperempat jam dua", iscorrect: false, feedback: "Ups! Perhatikan jarum menit." },
          ],
        },
        {
          hour: 3,
          minutes: 45,
          options: [
            { text: "Setengah lepas jam tiga", iscorrect: false, feedback: "Lihat jam dengan teliti." },
            { text: "Kurang seperempat jam empat", iscorrect: true, feedback: "Bagus! Itu benar." },
            { text: "Seperempat lepas jam empat", iscorrect: false, feedback: "Lihat jam dengan teliti." },
          ],
        },
        {
          hour: 6,
          minutes: 15,
          options: [
            { text: "Setengah lepas jam enam", iscorrect: false, feedback: "Perhatikan jarum menit." },
            { text: "Kurang seperempat jam enam", iscorrect: false, feedback: "Perhatikan jarum menit." },
            { text: "Seperempat lepas jam enam", iscorrect: true, feedback: "Bagus! Itu benar." },
          ],
        },
        {
          hour: 7,
          minutes: 30,
          options: [
            { text: "Seperempat lepas jam tujuh", iscorrect: false, feedback: "Perhatikan jarum menit." },
            { text: "Setengah lepas jam tujuh", iscorrect: true, feedback: "Bagus! Itu benar." },
            { text: "Kurang seperempat jam tujuh", iscorrect: false, feedback: "Perhatikan jarum menit." },
          ],
        },
        {
          hour: 6,
          minutes: 45,
          options: [
            { text: "Seperempat lepas jam enam", iscorrect: false, feedback: "Coba lagi." },
            { text: "Seperempat menjelang jam tujuh", iscorrect: true, feedback: "Bagus! Itu benar." },
            { text: "Setengah lepas jam enam", iscorrect: false, feedback: "Coba lagi." },
          ],
        },
        {
          hour: 8,
          minutes: 15,
          options: [
            { text: "Kurang seperempat jam delapan", iscorrect: false, feedback: "Lihat dengan teliti." },
            { text: "Seperempat lepas jam delapan", iscorrect: true, feedback: "Bagus! Itu benar." },
            { text: "Setengah lepas jam delapan", iscorrect: false, feedback: "Lihat dengan teliti." },
          ],
        },
        {
          hour: 8,
          minutes: 30,
          options: [
            { text: "Setengah lepas jam delapan", iscorrect: true, feedback: "Bagus! Itu benar." },
            { text: "Seperempat lepas jam delapan", iscorrect: false, feedback: "Perhatikan kedua jarum jam." },
            { text: "Kurang seperempat jam delapan", iscorrect: false, feedback: "Perhatikan kedua jarum jam." },
          ],
        },
        {
          hour: 8,
          minutes: 45,
          options: [
            { text: "Setengah lepas jam sembilan", iscorrect: false, feedback: "Perhatikan lagi." },
            { text: "Kurang seperempat jam sembilan", iscorrect: true, feedback: "Bagus! Itu benar." },
            { text: "Seperempat lepas jam sembilan", iscorrect: false, feedback: "Perhatikan lagi." },
          ],
        },
        {
          hour: 10,
          minutes: 15,
          options: [
            { text: "Seperempat lepas jam sepuluh", iscorrect: true, feedback: "Bagus! Itu benar." },
            { text: "Setengah lepas jam sepuluh", iscorrect: false, feedback: "Periksa dengan teliti." },
            { text: "Kurang seperempat jam sepuluh", iscorrect: false, feedback: "Periksa dengan teliti." },
          ],
        },
      ],

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
          title: "Membaca Waktu",
          mainText:
            "Ayo belajar membaca waktu di jam!<br/><br/>Ketuk “Mulai” untuk memulai!",
        },
        page2: {
          talkBoxText: "Jam menunjukkan pukul berapa?",
          instructionText: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk mencoba waktu lain.",
          finish: "Ketuk » untuk selesai.",
          timeOnClock: "WAKTU DI JAM?",
          quizPanel: {
            quizSubType: "QT3R",
            questionText: "",
            options: [
              {
                text: "Pukul 5",
                iscorrect: true,
                feedback: "Bagus! Itu benar.",
              },
              {
                text: "Pukul 8",
                iscorrect: false,
                feedback:
                  "Ups! Perhatikan angka yang ditunjuk jarum pendek.",
              },
              {
                text: "Pukul 12",
                iscorrect: false,
                feedback:
                  "Ups! Perhatikan angka yang ditunjuk jarum pendek.",
              },
            ],
          },
        },
        page3: {
          title: "Membaca Waktu",
          mainText:
            "Hebat! Kita sudah bisa membaca waktu di jam.<br/><br/>Ketuk “Mulai Ulang” untuk mengulang aktivitas ini!",
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
