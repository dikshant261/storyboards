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
        pageStatesCleared:
          "Page states have been cleared. Reload the page to start fresh?",
        nextButtonPage2: "Page navigation event sent",
        previousButtonPage1: "Page navigation event sent",
        navigationReset: "Resetting to question 1",
        navigationComplete: "App reset complete – ready for new questions",
        lastPageStartingOver: "Last page – starting over",
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
          time: '7:00',
          mainImage: 'assets/breakfast.png',
          options: [

            {
              text: "pagi",
              iscorrect: true,
              feedback: "That’s correct!",
            },
            {
              text: "siang",
              iscorrect: false,
              feedback: "Oops! Siang is daytime when we attend the school.",
            },
            {
              text: "sore",
              iscorrect: false,
              feedback: "Oops! Sore is the evening time when we come back from school and play. 7:00 can never be in sore part of the day.",
            },
            {
              text: "malam",
              iscorrect: false,
              feedback: "Oops! Malam is night time, we go to bed at this time. 7:00 can never be in malam part of the day.",
            },
          ],
        },
        {
          time: '11:00',
          mainImage: 'assets/studentStudying.png',
          options: [

            {
              text: "pagi",
              iscorrect: false,
              feedback: "Oops! We wake up, do breakfast during pagi part of the day. 11:00 can never be in pagi part of the day.",
            },
            {
              text: "siang",
              iscorrect: true,
              feedback: "That’s correct!",
            },
            {
              text: "sore",
              iscorrect: false,
              feedback: "Oops! Sore is the evening time when we come back from school and play. 11:00 can never be in sore part of the day.",
            },
            {
              text: "malam",
              iscorrect: false,
              feedback: "Oops! Malam is night time, we go to bed at this time. 11:00 can never be in malam part of the day.",
            },
          ],
        },
        {
          time: '1:00',
          mainImage: 'assets/eatLunch.png',
          options: [

            {
              text: "pagi",
              iscorrect: false,
              feedback: "Oops! We wake up, do breakfast during pagi part of the day. 1:00 can never be in pagi part of the day.",
            },
            {
              text: "siang",
              iscorrect: true,
              feedback: "That’s correct!",
            },
            {
              text: "sore",
              iscorrect: false,
              feedback: "Oops! Sore is the evening time when we come back from school and play. 1:00 can never be in sore part of the day.",
            },
            {
              text: "malam",
              iscorrect: false,
              feedback: "Oops! Malam is night time, we go to bed at this time. 1:00 can never be in malam part of the day.",
            },
          ],
        },
        {
          time: '5:00',
          mainImage: 'assets/playWithFriends.png',
          options: [

            {
              text: "pagi",
              iscorrect: false,
              feedback: "Oops! We wake up, do breakfast during pagi part of the day. 5:00 can never be in pagi part of the day.",
            },
            {
              text: "sore",
              iscorrect: true,
              feedback: "That’s correct!",
            },
            {
              text: "siang",
              iscorrect: false,
              feedback: "Oops! Siang is daytime when we attend the school.",
            },
            {
              text: "malam",
              iscorrect: false,
              feedback: "Oops! Malam is night time, we go to bed at this time. 5:00 can never be in malam part of the day.",
            },
          ],
        },
        {
          time: '7:00',
          mainImage: 'assets/homeWork.png',
          options: [

            {
              text: "pagi",
              iscorrect: false,
              feedback: "Oops! We wake up, do breakfast during pagi part of the day. 7:00 can never be in pagi part of the day.",
            },
            {
              text: "sore",
              iscorrect: false,
              feedback: "Oops! Sore is the evening time when we come back from school and play. 7:00 can never be in sore part of the day.",
            },
            {
              text: "siang",
              iscorrect: false,
              feedback: "Oops! Siang is daytime when we attend the school.",
            },
            {
              text: "malam",
              iscorrect: true,
              feedback: "That’s correct!",
            },
          ],
        },
        {
          time: '1:00',
          mainImage: 'assets/sleep.png',
          options: [

            {
              text: "pagi",
              iscorrect: false,
              feedback: "Oops! We wake up, do breakfast during pagi part of the day. 1:00 can never be in pagi part of the day.",
            },
            {
              text: "sore",
              iscorrect: false,
              feedback: "Oops! Sore is the evening time when we come back from school and play. 1:00 can never be in sore part of the day.",
            },
            {
              text: "siang",
              iscorrect: false,
              feedback: "Oops! Siang is daytime when we attend the school.",
            },

            {
              text: "malam",
              iscorrect: true,
              feedback: "That’s correct!",
            },
          ],
        },
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
          title: "Time at different parts of the day.",
          mainText: "Let’s try adding the correct word after the time to show the part of the day.<br/><br/>Tap “Start” to begin!"
        },
        page2: {
          talkBoxText: "Choose the right word for the given time to show the part of the day.",
          talkBoxOnWrong: 'Oops! We attend school classes during Siang. 7 o’clock can never be in siang.',
          talkBoxOnCorrect: "Well done! We do breakfast at early morning at around 7:00 pagi.",
          instructionText: "Tap the correct option.",
          instructionAfterQuiz: 'Tap » for next challenge',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          quizPanel: {
            quizSubType: "QT4R",
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
          title: "Activities in different parts of the day.",
          mainText:
            "Awesome! We understood adding the<br/> correct word after the time to show the<br/> part of the day."
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

      Question: [
        {
          time: '7:00',
          mainImage: 'assets/breakfast.png',
          options: [

            {
              text: "pagi",
              iscorrect: true,
              feedback: "Benar!",
            },
            {
              text: "siang",
              iscorrect: false,
              feedback: "Ups! Siang adalah waktu ketika kita pergi ke sekolah.",
            },
            {
              text: "sore",
              iscorrect: false,
              feedback: "Ups! Sore adalah waktu ketika kita pulang sekolah dan bermain. 7:00 tidak mungkin termasuk waktu sore.",
            },
            {
              text: "malam",
              iscorrect: false,
              feedback: "Ups! Malam adalah waktu untuk tidur. 7:00 tidak mungkin termasuk waktu malam.",
            },
          ],
        },
        {
          time: '11:00',
          mainImage: 'assets/studentStudying.png',
          options: [

            {
              text: "pagi",
              iscorrect: false,
              feedback: "Ups! Kita bangun dan sarapan pada waktu pagi. 11:00 tidak mungkin termasuk waktu pagi.",
            },
            {
              text: "siang",
              iscorrect: true,
              feedback: "Benar!",
            },
            {
              text: "sore",
              iscorrect: false,
              feedback: "Ups! Sore adalah waktu ketika kita pulang sekolah dan bermain. 11:00 tidak mungkin termasuk waktu sore.",
            },
            {
              text: "malam",
              iscorrect: false,
              feedback: "Ups! Malam adalah waktu untuk tidur. 11:00 tidak mungkin termasuk waktu malam.",
            },
          ],
        },
        {
          time: '1:00',
          mainImage: 'assets/eatLunch.png',
          options: [

            {
              text: "pagi",
              iscorrect: false,
              feedback: "Ups! Kita bangun dan sarapan pada waktu pagi. 1:00 tidak mungkin termasuk waktu pagi.",
            },
            {
              text: "siang",
              iscorrect: true,
              feedback: "Benar!",
            },
            {
              text: "sore",
              iscorrect: false,
              feedback: "Ups! Sore adalah waktu ketika kita pulang sekolah dan bermain. 1:00 tidak mungkin termasuk waktu sore.",
            },
            {
              text: "malam",
              iscorrect: false,
              feedback: "Ups! Malam adalah waktu untuk tidur. 1:00 tidak mungkin termasuk waktu malam.",
            },
          ],
        },
        {
          time: '5:00',
          mainImage: 'assets/playWithFriends.png',
          options: [

            {
              text: "pagi",
              iscorrect: false,
              feedback: "Ups! Kita bangun dan sarapan pada waktu pagi. 5:00 tidak mungkin termasuk waktu pagi.",
            },
            {
              text: "sore",
              iscorrect: true,
              feedback: "Benar!",
            },
            {
              text: "siang",
              iscorrect: false,
              feedback: "Ups! Siang adalah waktu ketika kita pergi ke sekolah.",
            },
            {
              text: "malam",
              iscorrect: false,
              feedback: "Ups! Malam adalah waktu untuk tidur. 5:00 tidak mungkin termasuk waktu malam.",
            },
          ],
        },
        {
          time: '7:00',
          mainImage: 'assets/homeWork.png',
          options: [

            {
              text: "pagi",
              iscorrect: false,
              feedback: "Ups! Kita bangun dan sarapan pada waktu pagi. 7:00 tidak mungkin termasuk waktu pagi.",
            },
            {
              text: "sore",
              iscorrect: false,
              feedback: "Ups! Sore adalah waktu ketika kita pulang sekolah dan bermain. 7:00 tidak mungkin termasuk waktu sore.",
            },
            {
              text: "siang",
              iscorrect: false,
              feedback: "Ups! Siang adalah waktu ketika kita pergi ke sekolah.",
            },
            {
              text: "malam",
              iscorrect: true,
              feedback: "Benar!",
            },
          ],
        },
        {
          time: '1:00',
          mainImage: 'assets/sleep.png',
          options: [

            {
              text: "pagi",
              iscorrect: false,
              feedback: "Ups! Kita bangun dan sarapan pada waktu pagi. 1:00 tidak mungkin termasuk waktu pagi.",
            },
            {
              text: "sore",
              iscorrect: false,
              feedback: "Ups! Sore adalah waktu ketika kita pulang sekolah dan bermain. 1:00 tidak mungkin termasuk waktu sore.",
            },
            {
              text: "siang",
              iscorrect: false,
              feedback: "Ups! Siang adalah waktu ketika kita pergi ke sekolah.",
            },

            {
              text: "malam",
              iscorrect: true,
              feedback: "Benar!",
            },
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
          title: "Waktu di berbagai bagian hari.",
          mainText:
            "Ayo coba menambahkan kata yang benar setelah waktu untuk menunjukkan bagian hari.<br/><br/>Ketuk \"Mulai\" untuk memulai!",
        },
        page2: {
          talkBoxText: "Pilih kata yang benar untuk waktu yang diberikan untuk menunjukkan bagian hari.",
          talkBoxOnWrong: "Ups! Kita bersekolah saat Siang. Jam 7 tidak pernah ada di siang.",
          talkBoxOnCorrect: "Bagus! Kita sarapan di pagi hari sekitar jam 7:00 pagi.",
          instructionText: "Ketuk opsi yang benar.",
          instructionAfterQuiz: "Ketuk » untuk tantangan berikutnya",
          finish: "Ketuk » untuk selesai.",
          timeOnClock: "WAKTU DI JAM?",
          quizPanel: {
            quizSubType: "QT4R",
            questionText: "",
            options: [
              { text: "Jam 5", iscorrect: true, feedback: "Bagus! Benar." },
              { text: "Jam 8", iscorrect: false, feedback: "Ups! Periksa angka yang ditunjuk jarum pendek." },
              { text: "Jam 12", iscorrect: false, feedback: "Ups! Periksa angka yang ditunjuk jarum pendek." },
            ],
          },
        },
        page3: {
          title: "Kegiatan di berbagai bagian hari.",
          mainText:
            "Luar biasa! Kita memahami menambahkan kata yang benar setelah waktu untuk menunjukkan bagian hari.",
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
// Question is accessed via i18n.t("Question") / getI18nText("Question")
// Make i18n globally available
window.i18n = i18n;
