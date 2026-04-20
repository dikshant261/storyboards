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
        pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?",
        nextButtonPage2: "Page change event sent",
        nextButtonpage3: "Next",
        nextButtonpage4: "Next",
        nextButtonpage5: "Next",
        nextButtonpage7: "Next",
        nextButtonpage8: "Next",
        nextButtonpage9: "Next",
        nextButtonpage10: "Next",
        previousButtonPage1: "Previous button clicked",
        navigationReset: "Resetting to question 1",
        navigationComplete: "App reset complete – ready for new question",
        lastPageStartingOver: "Last page - Starting over",
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
          title: "Reading Time",
          mainText:
            "Let’s learn to set time on a clock!<br/><br/>Tap “Start” to begin!",
        },
        page2: {
          talkBoxText:
            "What time is shown on the clock?<br/><br/><span style='color:orange'>SHOUT OUT LOUD!</span>",
          instructionText: "Tap the clock.",
          timeOnClock: "TIME ON CLOCK?",
          timeOnClockDisplay: "<span style='color:#FFD700'>{hour}</span><span class='page2-oclock-clickable' style='color:#00FFFF;cursor:pointer'> o'clock</span>",
          timeOnClockDisplayHourClickable: "<span class='page2-hour-clickable' style='color:#FFD700;cursor:pointer'>{hour}</span><span style='color:#00FFFF'> o'clock</span>",
          timeOnClockDisplayFinal: "<span style='color:#FFD700'>{hour}</span><span style='color:#00FFFF'> o'clock</span>",
          talkBoxAfterClockClick: "Why is it {hour} 'o clock?<br><br><span style='color:#FFD700'>Let's see!</span>",
          talkBoxAfterOclockClick: "When the <span style='color:#00FFFF'>long hand at 12</span>, we say <span style='color:#00FFFF'>o'clock</span>.",
          instructionAfterClockClick: "Tap \"o'clock\"",
          instructionAfterOclockClick: "Tap \"{hour}\"",
          instructionAfterHourClick: "Tap » for something interesting…",
          talkBoxAfterHourClick: "With <span style='color:#00FFFF'>long hand at 12</span> and <span style='color:#FFD700'>short hand at {hour}</span>, the time is <span style='color:#FFD700'>{hour}</span> <span style='color:#00FFFF'>o'clock</span>."
        },
        page3: {
          talkBoxText: "Oh No! The <span style='color:#FFD700'>short hand</span> has moved!<br/><br/>Can you move it back, so the time says <span style='color:#FFD700'>3</span> <span style='color:#70ACC7'>o’ clock?</span>",
          instructionText: "Tap » to set the time correctly",
          positionOf: "Position of the HANDS tell us the time.",
          timeOnClock: "<span style='color:#FFD700'>3</span><span style='color:#00FFFF'> o' clock</span>"
        },
        page4: {
          talkBoxText: "For <span style='color:#FFD700'>3</span> <span style='color:#70ACC7'>o’ clock?</span>, which number should the <span style='color:#FFD700'>short hand</span> point at?<br/><br/><span style='color:orange'>SHOUT OUT LOUD!</span>",
          instructionText: "Tap the correct number.",
          instructionTextAfterCorrect: "Drag and rotate the short hand to 3",
          instructionTextAfterSetTo3: "Tap » to set another time on the clock",
          talkBoxTextAfterCorrect: "<span style='color:#27AE60'>That's correct!</span><br><br>The <span style='color:#FFD700'>short hand</span> should point at <span style='color:#FFD700'>3</span> for the time to say <span style='color:#FFD700'>3</span> <span style='color:#00FFFF'>o' clock</span>!",
          talkBoxTextAfterSetTo3: "<span style='color:orange'>Yay!</span><br><br>Now, you set the time correctly back to <span style='color:#FFD700'>3</span> <span style='color:#00FFFF'>o' clock</span>!",
          timeOnClock: "TIME ON CLOCK?",
          timeOnClockAt3: "<span style='color:#FFD700'>3</span><span style='color:#00FFFF'> o' clock</span>"
        },
        page5: {
          talkBoxText: "Set time to <span style='color:#FFD700'>11</span> <span style='color:#00FFFF'>o'clock</span>.<br><br>Which number should the <span style='color:#FFD700'>short hand</span> point at?",
          _talkBoxTextOld: "Set time to <br/><span style='color:#FFD700'>11</span> <span style='color:#70ACC7'>o’ clock?</span>, which number should the <span style='color:#FFD700'>short hand</span> point at?",
          instructionText: "Tap the correct number.",
          instructionTextAfterCorrect: "Drag and rotate the short hand to 11",
          instructionTextAfterSetTo3: "Tap » to practice setting time on the clock",
          talkBoxTextAfterCorrect: "<span style='color:#27AE60'>That's correct!</span><br><br>The <span style='color:#FFD700'>short hand</span> should point at <span style='color:#FFD700'>11</span> for the time to say <span style='color:#FFD700'>11</span> <span style='color:#00FFFF'>o' clock</span>!",
          talkBoxTextAfterSetTo11: "<span style='color:orange'>Yay!</span><br><br>Now, you set the time correctly back to <span style='color:#FFD700'>11</span> <span style='color:#00FFFF'>o' clock</span>!",
          timeOnClock: "<span style='color:#FFD700'>11</span><span style='color:#00FFFF'> o' clock</span>",
          timeOnClockAt11: "<span style='color:#FFD700'>11</span><span style='color:#00FFFF'> o' clock</span>"
        },
        page6: {
          title: "Reading Time",
          mainText:
            "We have learned to set time on a clock.<br/><br/>Now let’s practice!",
        },
        page7: {
          talkBoxText: "Set the time to 4 o' clock!",
          instructionText: "Rotate the short hand to the correct number, then tap check.",
          instructionTextAfterSetTo3: "Tap » to practice setting time on the clock",
          instructionTextAfterCorrectCheck: "Tap » to set another time.",
          talkBoxTextAfterSetTo4: "<span style='color:#27AE60'>Well done! You set the time to 4 o'clock.</span>",
          talkBoxTextWrongCheck: "<span style='color:#FA8072'>Oops! Point the short hand at 4, for the time to say 4 o' clock!</span>",
          timeOnClock: "TIME ON CLOCK?",
          timeOnClockAt4: "<span style='color:#FFD700'>4</span><span style='color:#00FFFF'> o' clock</span>"
        },
        page8: {
          talkBoxText: "Set the time to 1 o' clock!",
          instructionText: "Rotate the short hand to the correct number, then tap check.",
          instructionTextAfterSetTo3: "Tap » to practice setting time on the clock",
          instructionTextAfterCorrectCheck: "Tap » to set another time.",
          instructionAfterQuiz: "Tap » to set another time.",
          talkBoxTextAfterSetTo1: "<span style='color:#27AE60'>Well done! You set the time to 1 o'clock.</span>",
          talkBoxTextWrongCheck: "<span style='color:#FA8072'>Oops! Point the short hand at 1, for the time to say 1 o' clock!</span>",
          timeOnClock: "TIME ON CLOCK?",
          timeOnClockAt1: "<span style='color:#FFD700'>1</span><span style='color:#00FFFF'> o' clock</span>"
        },
        page9: {
          talkBoxText: "Set the time to 7 o' clock!",
          instructionText: "Rotate the short hand to the correct number, then tap check.",
          instructionTextAfterSetTo3: "Tap » to practice setting time on the clock",
          instructionTextAfterCorrectCheck: "Tap » to set another time.",
          instructionAfterQuiz: "Tap » to set another time.",
          talkBoxTextAfterSetTo7: "<span style='color:#27AE60'>Well done! You set the time to 7 o'clock.</span>",
          talkBoxTextWrongCheck: "<span style='color:#FA8072'>Oops! Point the short hand at 7, for the time to say 7 o' clock!</span>",
          timeOnClock: "TIME ON CLOCK?",
          timeOnClockAt7: "<span style='color:#FFD700'>7</span><span style='color:#00FFFF'> o' clock</span>"
        },
        page10: {
          talkBoxText: "Set the time to 10 o' clock!",
          instructionText: "Rotate the short hand to the correct number, then tap check.",
          instructionTextAfterSetTo3: "Tap » to practice setting time on the clock",
          instructionTextAfterCorrectCheck: "Tap » to set another time.",
          instructionAfterQuiz: "Tap » to summarize.",
          talkBoxTextAfterSetTo10: "<span style='color:#27AE60'>Well done! You set the time to 10 o'clock.</span>",
          talkBoxTextWrongCheck: "<span style='color:#FA8072'>Oops! Point the short hand at 10, for the time to say 10 o' clock!</span>",
          timeOnClock: "TIME ON CLOCK?",
          timeOnClockAt10: "<span style='color:#FFD700'>10</span><span style='color:#00FFFF'> o' clock</span>"
        },
        page11: {
          title: "Setting Time",
          mainText:
            "Awesome! Now we know how to set time<br/> on the clock.<br/><br/>Tap “Start Over” to re-do this activity!",
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
        nextButtonpage3: "»",
        nextButtonpage4: "»",
        nextButtonpage5: "»",
        nextButtonpage7: "»",
        nextButtonpage8: "»",
        nextButtonpage9: "»",
        nextButtonpage10: "»",
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
          title: "Benda Berat dan Ringan",
          mainText:
            "Ayo belajar tentang <span style='color:#70ACC7'>benda berat</span> dan <br/><span style='color:#70ACC7'>benda ringan</span> bersama Jax dan DeeTee. <br/><br/>Ketuk “Mulai” untuk memulai!",
        },
        page2: {
          talkBoxText:
            "Jax, benda mana yang berat dan mana yang ringan — tas atau penghapus?",
          instructionText: "Ketuk » untuk melihat apa kata Jax.",
          timeOnClock: "WAKTU DI JAM?",
          timeOnClockDisplay: "<span style='color:#FFD700'>{hour}</span><span class='page2-oclock-clickable' style='color:#00FFFF;cursor:pointer'> jam</span>",
          timeOnClockDisplayHourClickable: "<span class='page2-hour-clickable' style='color:#FFD700;cursor:pointer'>{hour}</span><span style='color:#00FFFF'> jam</span>",
          timeOnClockDisplayFinal: "<span style='color:#FFD700'>{hour}</span><span style='color:#00FFFF'> jam</span>",
          talkBoxAfterClockClick: "Mengapa {hour} jam?<br><br><span style='color:#FFD700'>Ayo kita lihat!</span>",
          talkBoxAfterOclockClick: "Saat <span style='color:#00FFFF'>jarum panjang di 12</span>, kita bilang <span style='color:#00FFFF'>jam</span>.",
          instructionAfterClockClick: "Ketuk \"jam\"",
          instructionAfterOclockClick: "Ketuk \"{hour}\"",
          instructionAfterHourClick: "Ketuk » untuk sesuatu yang menarik…",
          talkBoxAfterHourClick: "Dengan <span style='color:#00FFFF'>jarum panjang di 12</span> dan <span style='color:#FFD700'>jarum pendek di {hour}</span>, waktunya adalah <span style='color:#FFD700'>{hour}</span> <span style='color:#00FFFF'>jam</span>."
        },
        page3: {
          talkBoxText: "Apa itu benda berat dan benda ringan?",
          instructionText: "Ketuk » untuk melihat penjelasan DeeTee.",
          timeOnClock: "<span style='color:#FA8072'>3</span><span style='color:#00FFFF'> jam</span>",
        },
        page4: {
          talkBoxText:
            "Untuk <span style='color:#FFD700'>3</span> <span style='color:#70ACC7'>jam?</span>, angka berapa yang harus ditunjuk <span style='color:#FFD700'>jarum pendek</span>?<br/><br/><span style='color:orange'>BERTERIAKLAH!</span>",
          instructionText: "Ketuk angka yang benar.",
          instructionTextAfterCorrect: "Tarik dan putar jarum pendek ke 3",
          instructionTextAfterSetTo3: "Ketuk » untuk mengatur waktu lain di jam",
          talkBoxTextAfterCorrect: "<span style='color:#27AE60'>Benar!</span><br><br><span style='color:#FFD700'>Jarum pendek</span> harus menunjuk <span style='color:#FFD700'>3</span> agar waktunya <span style='color:#FFD700'>3</span> <span style='color:#00FFFF'>jam</span>!",
          talkBoxTextAfterSetTo3: "<span style='color:orange'>Hore!</span><br><br>Sekarang, kamu sudah mengatur waktu dengan benar ke <span style='color:#FFD700'>3</span> <span style='color:#00FFFF'>jam</span>!",
          timeOnClock: "WAKTU DI JAM?",
          timeOnClockAt3: "<span style='color:#FFD700'>3</span><span style='color:#00FFFF'> jam</span>",
        },
        page5: {
          talkBoxText: "Atur waktu ke <span style='color:#FFD700'>11</span> <span style='color:#00FFFF'>jam</span>.<br><br>Angka berapa yang harus ditunjuk <span style='color:#FFD700'>jarum pendek</span>?",
          instructionText: "Ketuk angka yang benar.",
          instructionTextAfterCorrect: "Tarik dan putar jarum pendek ke 11",
          instructionTextAfterSetTo3: "Ketuk » untuk berlatih mengatur waktu di jam",
          talkBoxTextAfterCorrect: "<span style='color:#27AE60'>Benar!</span><br><br><span style='color:#FFD700'>Jarum pendek</span> harus menunjuk <span style='color:#FFD700'>11</span> agar waktunya <span style='color:#FFD700'>11</span> <span style='color:#00FFFF'>jam</span>!",
          talkBoxTextAfterSetTo11: "<span style='color:orange'>Hore!</span><br><br>Sekarang, kamu sudah mengatur waktu dengan benar ke <span style='color:#FFD700'>11</span> <span style='color:#00FFFF'>jam</span>!",
          timeOnClock: "<span style='color:#FFD700'>11</span><span style='color:#00FFFF'> jam</span>",
          timeOnClockAt11: "<span style='color:#FFD700'>11</span><span style='color:#00FFFF'> jam</span>",
        },
        page6: {
          title: "Membaca Waktu",
          mainText:
            "Kita sudah belajar mengatur waktu di jam.<br/><br/>Sekarang ayo berlatih!",
          talkBoxText:
            "Kita mengatakan bahwa tas adalah benda berat karena sulit diangkat! Ayo coba benda lainnya.",
          instructionText: "Ketuk » untuk mencoba benda lain.",
        },
        page7: {
          talkBoxText: "Atur waktu ke 4 jam!",
          instructionText: "Putar jarum pendek ke angka yang benar, lalu ketuk periksa.",
          instructionTextAfterSetTo3: "Ketuk » untuk berlatih mengatur waktu di jam",
          instructionTextAfterCorrectCheck: "Ketuk » untuk mengatur waktu lain.",
          talkBoxTextAfterSetTo4: "<span style='color:#27AE60'>Bagus! Kamu sudah mengatur waktu ke 4 jam.</span>",
          talkBoxTextWrongCheck: "<span style='color:#FA8072'>Ups! Arahkan jarum pendek ke 4, agar waktunya 4 jam!</span>",
          timeOnClock: "WAKTU DI JAM?",
          timeOnClockAt4: "<span style='color:#FFD700'>4</span><span style='color:#00FFFF'> jam</span>",
        },
        page8: {
          talkBoxText: "Atur waktu ke 1 jam!",
          instructionText: "Putar jarum pendek ke angka yang benar, lalu ketuk periksa.",
          instructionTextAfterSetTo3: "Ketuk » untuk berlatih mengatur waktu di jam",
          instructionTextAfterCorrectCheck: "Ketuk » untuk mengatur waktu lain.",
          instructionAfterQuiz: "Ketuk » untuk mengatur waktu lain.",
          talkBoxTextAfterSetTo1: "<span style='color:#27AE60'>Bagus! Kamu sudah mengatur waktu ke 1 jam.</span>",
          talkBoxTextWrongCheck: "<span style='color:#FA8072'>Ups! Arahkan jarum pendek ke 1, agar waktunya 1 jam!</span>",
          timeOnClock: "WAKTU DI JAM?",
          timeOnClockAt1: "<span style='color:#FFD700'>1</span><span style='color:#00FFFF'> jam</span>",
        },
        page9: {
          talkBoxText: "Atur waktu ke 7 jam!",
          instructionText: "Putar jarum pendek ke angka yang benar, lalu ketuk periksa.",
          instructionTextAfterSetTo3: "Ketuk » untuk berlatih mengatur waktu di jam",
          instructionTextAfterCorrectCheck: "Ketuk » untuk mengatur waktu lain.",
          instructionAfterQuiz: "Ketuk » untuk mengatur waktu lain.",
          talkBoxTextAfterSetTo7: "<span style='color:#27AE60'>Bagus! Kamu sudah mengatur waktu ke 7 jam.</span>",
          talkBoxTextWrongCheck: "<span style='color:#FA8072'>Ups! Arahkan jarum pendek ke 7, agar waktunya 7 jam!</span>",
          timeOnClock: "WAKTU DI JAM?",
          timeOnClockAt7: "<span style='color:#FFD700'>7</span><span style='color:#00FFFF'> jam</span>",
        },
        page10: {
          talkBoxText: "Atur waktu ke 10 jam!",
          instructionText: "Putar jarum pendek ke angka yang benar, lalu ketuk periksa.",
          instructionTextAfterSetTo3: "Ketuk » untuk berlatih mengatur waktu di jam",
          instructionTextAfterCorrectCheck: "Ketuk » untuk mengatur waktu lain.",
          instructionAfterQuiz: "Ketuk » untuk mengatur waktu lain.",
          talkBoxTextAfterSetTo10: "<span style='color:#27AE60'>Bagus! Kamu sudah mengatur waktu ke 10 jam.</span>",
          talkBoxTextWrongCheck: "<span style='color:#FA8072'>Ups! Arahkan jarum pendek ke 10, agar waktunya 10 jam!</span>",
          timeOnClock: "WAKTU DI JAM?",
          timeOnClockAt10: "<span style='color:#FFD700'>10</span><span style='color:#00FFFF'> jam</span>",
        },
        page11: {
          title: "Mengatur Waktu",
          mainText:
            "Luar biasa! Sekarang kita tahu cara mengatur waktu di jam.<br/><br/>Ketuk \"Mulai Ulang\" untuk mengulang aktivitas ini!",
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

// Make i18n globally available
window.i18n = i18n;
