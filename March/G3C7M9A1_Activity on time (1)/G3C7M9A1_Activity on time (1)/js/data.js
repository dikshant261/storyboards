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
        title: "Writing Time",
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
        hours: 'hours',

        minutes: 'minutes',
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
          title: "Writing Time",
          mainText: "Let’s try reading and writing time shown in the <br/>clock.<br/><br/>Tap “Start” to begin!"
        },
        page2: {
          instructionText: "Tap » to explore Andi’s daily routine.",
          instructionAfterQuiz: 'Tap » to try another time.',
          routineText: 'Hi! Meet Andi! <br/>Let’s explore his daily routine…'
        },
        page3: {
          instructionText: "Tap to choose the correct option.",
          instructionAfterQuiz: 'Tap » to continue.',
          routineText: 'Andi wakes up early in the morning.',
          quizPanel: {
            quizSubType: "QT2R",
            questionText: 'What is the time shown in the clock when Andi woke up?',
            options: [
              {
                text: "6:05 am",
                iscorrect: true,
                feedback: "Well Done! That's correct!",
              },
              {
                text: "7:05 am",
                iscorrect: false,
                feedback: "Oops! Try again.",
              },


            ],
          }
        },
        page4: {
          instructionText: "Tap to choose the correct option.",
          instructionAfterQuiz: 'Tap » to continue.',
          routineText: 'Andi then does morning chores from 6:05 am for the next 45 minutes. At what time does Andi finish his morning chores?',
          quizPanel: {
            quizSubType: "QT2R",
            questionText: 'How can we find the time when Andi finished his work?',
            options: [

              {
                text: "Add 45 minutes to 6:05 am",
                iscorrect: false,
                feedback: "Oops! Try again.",
              },
              {
                text: "Add 45 minutes to 6:05 am",
                iscorrect: true,
                feedback: "Well Done! That's correct!",
              },

            ],
          }
        },
        page5: {
          instructionText: "Tap using numpad to fill in the highlighted boxes and check.",
          instructionAfterQuiz: 'Tap » to continue.',
          routineText: 'Andi then does morning chores from 6:05 am for the next 45 minutes. At what time does Andi finish his morning chores?',
          numpadInstruction: 'Add 45 minutes to 6:05 am to find the time when Andi finished his chores.',
          feedback: {
            tile3: {
              correct: 'Correct!',
              incorrect: 'Not Correct! Try again!'
            },
            tile2: {
              correct: 'Correct!',
              incorrect: 'Not Correct! Try again!'
            },
            tile1: {
              correct: 'That’s correct. Andi Starts at 6:05 am. 45 minutes later, he finishes his morning  chores at 6:50 am.',
              incorrect: 'That’s not correct. Let’s try adding the time again.',
            }
          }
        },
        page6: {
          andiStarts: 'Andi starts at 6:05 am.',
          instructionText: "Tap » to continue.",

        },
        page7: {
          andiStarts: '45 minutes later, Andi finishes his morning  chores at 6:50 am.',
          instructionText: "Tap » to continue.",

        },
        page8: {
          instructionText: "Tap to choose the correct option.",
          instructionAfterQuiz: 'Tap » to continue.',
          routineText: 'Andi leaves for office at 8:15 am. He takes 20 minutes to reach. At what time will he reached office?',
          quizPanel: {
            quizSubType: "QT2R",
            questionText: 'How can we find the time when Andi reached his office?',
            options: [

              {
                text: "Add 20 minutes to 8:15 am",
                iscorrect: true,
                feedback: "Well Done! That's correct!",
              },
              {
                text: "Subtract 20 minutes from 8:15 am",
                iscorrect: false,
                feedback: "Oops! Try again.",

              },

            ],
          }
        },
        page9: {
          instructionText: "Tap using numpad to fill in the highlighted boxes and check.",
          instructionAfterQuiz: 'Tap » to continue.',
          routineText: 'Andi leaves for office at 8:15 am. He takes 20 minutes to reach. At what time will he reached office?',
          numpadInstruction: 'Add 20 minutes to 8:15 am to find the time when Andi reaches his office.',
          feedback: {
            tile3: {
              correct: 'Correct!',
              incorrect: 'Not Correct! Try again!'
            },
            tile2: {
              correct: 'Correct!',
              incorrect: 'Not Correct! Try again!'
            },
            tile1: {
              correct: 'That’s correct. Andi Starts at 8:15 am. 20 minutes later, he reaches his office at 8:35 am.',
              incorrect: 'That’s not correct. Let’s try adding the time again.',
            }
          }
        },
        page10: {
          andiStarts: 'Andi starts at 8:15 am.',
          instructionText: "Tap » to continue.",
        },
        page11: {
          andiStarts: '20 minutes later, Andi reaches his office at 8:35 am.',
          instructionText: "Tap » to continue.",

        },
        page12: {
          instructionText: "Tap to choose the correct option.",
          instructionAfterQuiz: 'Tap » to continue.',
          routineText: 'Andi started an office work at 10:13 am and finished that work at 11:39 am. How long did Andi take to finish that work?',
          quizPanel: {
            quizSubType: "QT2R",
            questionText: 'How will you find the time taken by Andi to finish his office work?',
            options: [

              {
                text: "Add the times",
                iscorrect: false,
                feedback: "Oops! Try again.",

              },
              {
                text: "Subtract the first time from second time.",
                iscorrect: true,
                feedback: "Well Done! That's correct!",

              },

            ],
          }
        },
        page13: {
          instructionText: "Tap using numpad to fill in the highlighted boxes and check.",
          instructionAfterQuiz: 'Tap » to continue.',
          routineText: 'Andi started an office work at 10:13 am and finished that work at 11:39 am. How long did Andi take to finish that work?',
          numpadInstruction: 'Subtract 10:13 from 11:39 to find the duration of the activity.',
          feedback: {
            tile4: {
              correct: 'Correct!',
              incorrect: 'Not Correct! Try again!'
            },
            tile3: {
              correct: 'Correct!',
              incorrect: 'Not Correct! Try again!'
            },
            tile2: {
              correct: 'Correct!',
              incorrect: 'Not Correct! Try again!'
            },
            tile1: {
              correct: 'That’s correct. Andi Starts at 10:13 am. 1 hour 26 minutes later, he finishes office work at 11:39 am.',
              incorrect: 'That’s not correct. Let’s try subtracting the time again.',
            }
          }
        },
        page14: {
          andiStarts: 'Andi starts at 10:13  am.',
          instructionText: "Tap » to continue.",
        },
        page15: {
          andiStarts: '1 hour 26 minutes later, Andi finishes his office work at 11:39 am.',
          instructionText: "Tap » to continue.",
          hour: '1 hour'
        },
        page16: {
          andiStarts: '1 hour 26 minutes later, Andi finishes his office work at 11:39 am.',
          instructionText: "Tap » to continue.",
          hour: '1 hour',
          minutes: '26<br/>minutes',
          and: '&'
        },
        page17: {
          instructionText: "Tap to choose the correct option.",
          instructionAfterQuiz: 'Tap » to continue.',
          routineText: 'Andi ate his lunch in the afternoon. What can be the possible time?',
          quizPanel: {
            quizSubType: "QT3R",
            questionText: 'Which of these is a lunch time?',
            options: [

              {
                text: "8:30 am",
                iscorrect: false,
                feedback: "Oops! Try again.",

              },
              {
                text: "1:30 pm",
                iscorrect: true,
                feedback: "Well Done! That's correct!",

              },
              {
                text: "7:35 pm",
                iscorrect: false,
                feedback: "Oops! Try again.",

              },

            ],
          }
        },
        page18: {
          instructionText: "Tap to choose the correct option.",
          instructionAfterQuiz: 'Tap » to continue.',
          routineText: 'Andi has a good hobby of book reading. Andi starts reading a book at 8:45 pm and finishes at 9:45 pm. For how long did Andi read the book?',
          quizPanel: {
            quizSubType: "QT2R",
            questionText: 'How can we find how long Andi read the book?',
            options: [

              {
                text: "Add the times",
                iscorrect: false,
                feedback: "Oops! Try again.",

              },
              {
                text: "Subtract the first time from second time.",
                iscorrect: true,
                feedback: "Well Done! That's correct!",

              },

            ],
          }
        },
        page19: {
          instructionText: "Tap using numpad to fill in the highlighted boxes and check.",
          instructionAfterQuiz: 'Tap » to continue.',
          routineText: 'Andi has a good hobby of book reading. Andi starts reading a book at 8:45 pm and finishes at 9:45 pm. For how long did Andi read the book?',
          numpadInstruction: 'Subtract 8:45 from 9:45 to find the duration of the activity.',
          feedback: {

            tile3: {
              correct: 'Correct!',
              incorrect: 'Not Correct! Try again!'
            },
            tile2: {
              correct: 'Correct!',
              incorrect: 'Not Correct! Try again!'
            },
            tile1: {
              correct: 'That’s correct. Andi Starts at 8:45 pm. 1 hour later, he finishes office work at 9:45 pm.',
              incorrect: 'That’s not correct. Let’s try subtracting the time again.',
            }
          }
        },
        page20: {
          andiStarts: 'Andi starts at 8:45 pm.',
          instructionText: "Tap » to continue.",
        },
        page21: {
          andiStarts: '1 hour later, Andi finishes reading his book at 9:45 pm.',
          instructionText: "Tap » to continue.",
          hour: '1 hour'
        },
        page22: {
          title: "Activity on Time",
          mainText: "Andi goes back to sleep at 10:00 pm. Creating a healthy daily routine like Andi keeps you grounded and can make you feel happy and strong."
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
