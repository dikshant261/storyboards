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
        title: "Reading Minutes",
      },


      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        start: "Start",
        continue: 'Continue',
      },
      numberPad: { feedback: { empty: 'First enter some value' } },
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
          title: "Reading Minutes",
          mainText: "Let’s learn how to read minutes by looking where the long hand is pointing to.<br/><br/>Tap “Start” to begin!"
        },
        page2: {
          talkBoxText: "<span>When long hand is at 12, a new hour starts and clock reads <span style='color:#70ACC7'>0</span> minutes.</span>",
          talkBoxOnWrong: 'Oops! Dinner is done at night. Pagi shows morning time.',
          talkBoxOnCorrect: "Well Done! We write pagi after time to show morning time.We do breakfast in morning hours.",
          instructionText: "Tap » to explore more.",
          instructionAfterQuiz: 'Tap » to try another time.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          clockReads: "Clock reads 6 o’clock."
        },
        page3: {
          talkBoxText: "<span><span style='color:#EBCD52'>6</span> o’clock is written as <span style='color:#EBCD52'>6</span>:<span style='color:#00FFF2'>00</span>. That means <span style='color:#EBCD52'>6</span> hours and <span style='color:#00FFF2'>0</span> minutes.</span>",
          talkBoxOnWrong: 'Oops! Dinner is done at night. Pagi shows morning time.',
          talkBoxOnCorrect: "Well Done! We write pagi after time to show morning time.We do breakfast in morning hours.",
          instructionText: "Tap » to continue.",
          instructionAfterQuiz: 'Tap » to try another time.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          clockReads: "6 : 00"
        },
        page4: {
          talkBoxText: "The long hand has moved from 12 to 1. How many minutes does the clock read?",
          talkBoxOnWrong: 'Oops! Dinner is done at night. Pagi shows morning time.',
          talkBoxOnCorrect: "Well Done! We write pagi after time to show morning time.We do breakfast in morning hours.",
          instructionText: "Tap using numpad to fill the minutes.",
          instructionAfterQuiz: 'Tap » to try another time.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          clockReads: "6 : 00"
        },
        page5: {
          talkBoxText: "The long hand has moved from 12 to 1. How many minutes does the clock read?",
          talkBoxOnWrong: 'Oops! Dinner is done at night. Pagi shows morning time.',
          talkBoxOnCorrect: "Well Done! We write pagi after time to show morning time.We do breakfast in morning hours.",
          instructionText: "Tap using numpad to fill the minutes.",
          instructionAfterQuiz: 'Tap » to try another time.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          clockReads: "6 : 00"
        },
        page6: {
          talkBoxText: "The long hand has moved from 12 to 1. How many minutes does the clock read?",
          talkBoxOnWrong: 'Oops! Dinner is done at night. Pagi shows morning time.',
          talkBoxOnCorrect: "Well Done! We write pagi after time to show morning time.We do breakfast in morning hours.",
          instructionText: "Tap using numpad to fill the minutes.",
          instructionAfterQuiz: 'Tap » to try another time.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          clockReads: "6 : 00"
        },
        page7: {
          talkBoxText: "The long hand has moved from 12 to 1. How many minutes does the clock read?",
          talkBoxOnWrong: 'Oops! Dinner is done at night. Pagi shows morning time.',
          talkBoxOnCorrect: "Well Done! We write pagi after time to show morning time.We do breakfast in morning hours.",
          instructionText: "Tap using numpad to fill the minutes.",
          instructionAfterQuiz: 'Tap » to try another time.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          clockReads: "6 : 00"
        },
        page8: {
          talkBoxText: "The long hand has moved from 12 to 1. How many minutes does the clock read?",
          talkBoxOnWrong: 'Oops! Dinner is done at night. Pagi shows morning time.',
          talkBoxOnCorrect: "Well Done! We write pagi after time to show morning time.We do breakfast in morning hours.",
          instructionText: "Tap using numpad to fill the minutes.",
          instructionAfterQuiz: 'Tap » to try another time.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          clockReads: "6 : 00"
        },
        page9: {
          title: "Reading Minutes",
          mainText: `
<span style="color:#22E6E6; font-weight:600;">Do you observe?</span><br/><br/>

To find minutes when long hand points to a number, we need to do 
<span style="color:#FFD34D; font-weight:700;">REPEATED ADDITION of 5.</span>
<br/><br/>

Can we use multiplication to read minutes?
`,
          instructionText: "Tap » to continue.",

        },
        page10: {
          title: "Reading Minutes",
          mainText: `
<span style="color:#22E6E6; font-weight:600;"> Repeated addition 
of 5 is 
Multiplication by 5.</span><br/><br/>

Multiply the number where long hand points to by 5 to read the minutes shown by the clock.
`,
          instructionText: "Tap » to read minutes when long hand points to 6.",
          fiveMinutes: '1 × 5 = 5 minutes',
          tenMinutes: '2 × 5 = 10 minutes',
          fifteenMinutes: '3 × 5 = 15 minutes',
          twentyMinutes: '4 × 5 = 20 minutes',
          twentyFiveMinutes: '5 × 5 = 25 minutes',

        },
        page11: {
          talkBoxText: "Long hand points at 6. What should we do to read the minutes on the clock?",
          talkBoxOnWrong: 'Oops! Dinner is done at night. Pagi shows morning time.',
          talkBoxOnCorrect: "This is how we read the minutes when long hand points at a number.",
          instructionText: "Tap the correct option.",
          instructionAfterQuiz: 'Tap » to multiply.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          clockReads: "6 : 00",
          quizPanel: {
            quizSubType: "QT3R",
            questionText: '',
            options: [
              {
                text: "Multiply 6 by 5",
                iscorrect: true,
                feedback: "Good Job! To read minutes, we multiply the number the long hand is pointing at by 5.",
              },
              {
                text: "Multiply 6 by 1",
                iscorrect: false,
                feedback: "Oops! Try again. Long hand moving from one number to the next is 5 minutes.",
              },
              {
                text: "Add 6 to 5",
                iscorrect: false,
                feedback: "Oops! Try again. Long hand moving from one number to the next is 5 minutes.",

              }

            ],
          }
        },
        page12: {
          talkBoxText: "Multiply 6 by 5 to read minutes when long hand points at 6",
          talkBoxOnWrong: 'Oops! Dinner is done at night. Pagi shows morning time.',
          talkBoxOnCorrect: "Clock reads 6:30 now.",
          instructionText: "Tap the correct option.",
          instructionAfterQuiz: 'Tap » to multiply.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          clockReads: "6 × 5 = ",
          feedback: {
            correct: 'That’s correct. Clock reads 30 minutes when long hand points at 6.',
            incorrect: 'Oops! Try again. Multiply 6 by 5 to find the answer.',
            empty: 'enter value!'
          }
        },
        page13: {
          title: "Reading Minutes",
          mainText: `
After 6:55, When the long hand moves from 11 to 12. 
The short hand moves to the next number 7. A new hour starts. 

60 minutes past 6 o'clock is 
0 minutes past 7!
<br/>
That's 7 o' clock or 7:00

`,
          instructionText: "Tap » to continue.",

        },
        page14: {
          title: "Reading Minutes",
          mainText: `Awesome! We just explored reading minutes by looking at which number 
the long hand points to.
`
                    
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
