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
        title: "Duration of the activity",
      },


      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        start: "Start",
        continue: 'Continue',
        duration: 'Duration',
        startTime: 'Start Time',
        endTime: 'End Time',
        check: 'CHECK',
      },

      messages: {
        pageStatesCleared:
          "Page states cleared. Reload the page to start from the beginning?",
        nextButtonPage2: "Page navigation event sent",
        nextButtonpage2: "Page navigation event sent",
        nextButtonpage3: "Page navigation event sent",
        nextButtonpage4: "Page navigation event sent",
        nextButtonpage5: "Page navigation event sent",
        nextButtonpage6: "Page navigation event sent",
        nextButtonpage7: "Page navigation event sent",
        nextButtonpage8: "Page navigation event sent",
        previousButtonPage1: "Page navigation event sent",
        navigationReset: "Resetting to question 1",
        navigationComplete: "App reset complete – ready for a new question",
        lastPageStartingOver: "Last page – starting over",
        allStagesCompleted: "All stages completed!",
      },
      question: [
        {
          questionText: 'What is the duration from 1 pm to 4 pm?',
          startTime: '1:00 pm',
          endTime: '4:00 pm',
          duration: '3 hours',
        },
        {
          questionText: 'What is the duration from 8 p.m. to 11 p.m.?',
          startTime: '8:00 pm',
          endTime: '11:00 pm',
          duration: '3 hours',
        },
        {
          questionText: 'What is the duration from 6 a.m. to 11 a.m.?',
          startTime: '6:00 am',
          endTime: '11:00 am',
          duration: '5 hours',
        },
        {
          questionText: 'What is the duration from 1:15 a.m. to 6:45 a.m.?',
          startTime: '1:15 am',
          endTime: '6:45 am',
          duration: '5:30 hours',
        },
        {
          questionText: 'What is the duration from 2:20 p.m. to 7:35 p.m.?',
          startTime: '2:20 pm',
          endTime: '7:35 pm',
          duration: '5:15 hours',
        },
        {
          questionText: 'What is the duration from 9:10 a.m. to 9:35 a.m.?',
          startTime: '9:10 am',
          endTime: '9:35 am',
          duration: '0:25 hours',
        },
        {
          questionText: 'What is the duration from 7:35 p.m. to 11:50 p.m.?',
          startTime: '7:35 pm',
          endTime: '11:50 pm',
          duration: '04:15 hours',
        },
      ],
      common: {
        heavy: "Heavy",
        light: "Light",
        tapAlt: "Tap",
        hours: 'hours',
        minutes: 'minutes',
        minusSign: '−',
        digitZero: '0',
        placeholderQuestionMarks: '??',
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
          title: "Duration of the activity",
          mainText: "Let’s explore calculating the duration of activity <br/>by subtraction time.<br/><br/>Tap “Start” to begin!"
        },
        page2: {
          headerText: 'What is the duration from 1 pm to 4 pm?',
          questionText: 'Which of these details do we need to find?',
          talkBoxText: "Read the question and spot ‘given’ and ‘to find’.",
          instructionText: "Choose the correct option.",
          instructionAfterQuiz: 'Tap » to continue.',
          timeOnClock: "TIME ON CLOCK?",
          chooseCorrectOptionLabel: "Choose the correct option:",
          timeOnePmDisplay: "1: 00 pm",
          timeFourPmDisplay: "4: 00 pm",
        },
        page3: {
          headerText: 'How many hours are there from 1 p.m. to 4 p.m.?',
          questionText: 'Which of these details is not given?',
          talkBoxText: "What is the math action we need to take?",
          talkBoxTextCorrect: 'That’s correct! We subtract hours and minutes of start time from end time.',
          instructionText: "Tap the correct option.",
          instructionAfterQuiz: 'Tap » to continue.',
          timeOnClock: "TIME ON CLOCK?",
          clockStartTimeShort: "1:00",
          clockEndTimeShort: "4:00",
          quizPanel: {
            quizSubType: "QT2",
            questionText: 'Which of the following should be done to find the duration?',
            options: [
              {
                text: "End Time + Start time",
                iscorrect: false,
                feedback: "Oops! Try again.Long hand is not pointing at 5.",
              },
              {
                text: "End Time - Start time",
                iscorrect: true,
                feedback: "That’s correct. Long hand is pointing at 3.",
              },


            ],
          }
        },
        page4: {
          headerText: 'What is the duration from 1 pm to 4 pm?',
          talkBoxTextCorrect: 'That’s correct! The duration from 1:00 pm to 4:00 pm is 3 hours.',
          talkBoxTextInCorrect: 'Oops! It does not seems to be correct <br/><br/>Let’s try again.',
          talkBoxText: "Let’s subtract 1 hour 0 minutes from 4 hours 0 minutes to calculate the duration.",
          instructionText: "Tap using numpad to fill the highlighted box.",

          instructionAfterQuiz: 'Tap » for visualise this on a clock.',
          timeOnClock: "TIME ON CLOCK?",
          feedback: {
            emptyFeedback: "Fill the highlighted box before checking",
          },
          numberPad: {
            showHint: "show 💡",
            check: "CHECK",
          },
          subtractionLayout: {
            endHour: "4",
            startHour: "1",
          },
          numpad: {
            tile1: {
              correct: "That’s correct. The duration is 3 hours.",
              inCorrect: "Oops! Try again…"
            },
            tile2: {
              correct: "Well Done! correct",
              inCorrect: "Oops! Try again…"
            },
            tile3: {
              correct: "Well Done! correct",
              inCorrect: "Oops! Try again…"
            }
          }
        },
        page5: {
          startTime: 'Start time = 1:00',
          instructionText: "Tap » to continue"
        },
        page6: {
          startTime: '1 hour',
          instructionText: "Tap » to continue"
        },
        page7: {
          startTime: '2 hours',
          instructionText: "Tap » to continue"
        },
        page8: {
          startTime: '3 hours',
          instructionText: "Tap » to next question.",
          endTime: 'End time = 4:00 Duration from 1:00 to 4:00 is 3 hours.'
        },
        page9: {
          title: "Duration of the activity",
          mainText: "Awesome! We have learnt how to calculate the <br/>duration between two times."
        },
      },
    },
    id: {
      appInfo: {
        title: "Durasi aktivitas",
      },

      question: [
        {
          questionText: 'Berapa durasi dari pukul 1 siang hingga pukul 4 sore?',
          startTime: '1:00 pm',
          endTime: '4:00 pm',
          duration: '3 jam',
        },
        {
          questionText: 'Berapa durasi dari pukul 8 malam hingga pukul 11 malam?',
          startTime: '8:00 pm',
          endTime: '11:00 pm',
          duration: '3 jam',
        }
      ],

      messages: {
        pageStatesCleared:
          "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
        nextButtonPage2: "Event perpindahan halaman telah dikirim",
        nextButtonpage2: "Event perpindahan halaman telah dikirim",
        nextButtonpage3: "Event perpindahan halaman telah dikirim",
        nextButtonpage4: "Event perpindahan halaman telah dikirim",
        nextButtonpage5: "Event perpindahan halaman telah dikirim",
        nextButtonpage6: "Event perpindahan halaman telah dikirim",
        nextButtonpage7: "Event perpindahan halaman telah dikirim",
        nextButtonpage8: "Event perpindahan halaman telah dikirim",
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
        continue: "Lanjut",
        duration: "Durasi",
        startTime: "Waktu mulai",
        endTime: "Waktu selesai",
        check: "PERIKSA",
      },

      common: {
        heavy: "Berat",
        light: "Ringan",
        tapAlt: "Ketuk",
        hours: "jam",
        minutes: "menit",
        minusSign: "−",
        digitZero: "0",
        placeholderQuestionMarks: "??",
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
          title: "Durasi aktivitas",
          mainText:
            "Mari kita menjelajahi cara menghitung durasi aktivitas <br/>dengan mengurangkan waktu.<br/><br/>Ketuk “Mulai” untuk memulai!",
        },
        page2: {
          headerText:
            "Berapa durasi dari pukul 1 siang hingga pukul 4 sore?",
          questionText: "Detail mana dari ini yang perlu kita cari?",
          talkBoxText:
            "Baca pertanyaan dan temukan ‘yang diketahui’ dan ‘yang dicari’.",
          instructionText: "Pilih opsi yang benar.",
          instructionAfterQuiz: "Ketuk » untuk lanjut ke pertanyaan berikutnya.",
          timeOnClock: "WAKTU PADA JAM?",
          chooseCorrectOptionLabel: "Pilih opsi yang benar:",
          timeOnePmDisplay: "1: 00 siang",
          timeFourPmDisplay: "4: 00 sore",
        },
        page3: {
          headerText:
            "Berapa jam dari pukul 1 siang hingga pukul 4 sore?",
          questionText: "Detail mana dari ini yang tidak diberikan?",
          talkBoxText: "Tindakan matematika apa yang perlu kita lakukan?",
          talkBoxTextCorrect:
            "Benar! Kita mengurangkan jam dan menit waktu mulai dari waktu selesai.",
          instructionText: "Ketuk opsi yang benar.",
          instructionAfterQuiz: "Ketuk » untuk lanjut.",
          timeOnClock: "WAKTU PADA JAM?",
          clockStartTimeShort: "1:00",
          clockEndTimeShort: "4:00",
          quizPanel: {
            quizSubType: "QT2",
            questionText:
              "Manakah dari berikut yang harus dilakukan untuk mencari durasi?",
            options: [
              {
                text: "Waktu selesai + Waktu mulai",
                iscorrect: false,
                feedback:
                  "Ups! Coba lagi. Jarum panjang tidak menunjuk ke 5.",
              },
              {
                text: "Waktu selesai − Waktu mulai",
                iscorrect: true,
                feedback: "Benar. Jarum panjang menunjuk ke 3.",
              },
            ],
          },
        },
        page4: {
          headerText:
            "Berapa durasi dari pukul 1 siang hingga pukul 4 sore?",
          talkBoxTextCorrect:
            "Benar! Durasi dari pukul 1:00 siang hingga 4:00 sore adalah 3 jam.",
          talkBoxTextInCorrect:
            "Ups! Sepertinya belum benar <br/><br/>Ayo coba lagi.",
          talkBoxText:
            "Mari kurangkan 1 jam 0 menit dari 4 jam 0 menit untuk menghitung durasi.",
          instructionText:
            "Ketuk numpad untuk mengisi kotak yang disorot.",
          instructionAfterQuiz: "Ketuk » untuk lanjut ke pertanyaan berikutnya.",
          timeOnClock: "WAKTU PADA JAM?",
          feedback: {
            emptyFeedback: "Isi kotak yang disorot sebelum memeriksa",
          },
          numberPad: {
            showHint: "tampilkan 💡",
            check: "PERIKSA",
          },
          subtractionLayout: {
            endHour: "4",
            startHour: "1",
          },
          numpad: {
            tile1: {
              correct: "Benar. Durasinya 3 jam.",
              inCorrect: "Ups! Coba lagi…",
            },
            tile2: {
              correct: "Bagus! Benar",
              inCorrect: "Ups! Coba lagi…",
            },
            tile3: {
              correct: "Bagus! Benar",
              inCorrect: "Ups! Coba lagi…",
            },
          },
        },
        page5: {
          startTime: "Waktu mulai = 1:00",
          instructionText: "Ketuk » untuk lanjut",
        },
        page6: {
          startTime: "1 jam",
          instructionText: "Ketuk » untuk lanjut",
        },
        page7: {
          startTime: "2 jam",
          instructionText: "Ketuk » untuk lanjut",
        },
        page8: {
          startTime: "3 jam",
          instructionText: "Ketuk » untuk lanjut",
          endTime:
            "Waktu selesai = 4:00 Durasi dari 1:00 hingga 4:00 adalah 3 jam.",
        },
        page9: {
          title: "Durasi aktivitas",
          mainText:
            "Luar biasa! Kita telah belajar cara menghitung <br/>durasi antara dua waktu.",
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
window.AppData = AppData;
