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
        title: "High Chance and Low Chance",
      },


      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        start: "Start",
        continue: 'Continue',
        check: 'Check',
        lottieFill: "FILL",
        lottieServe: "SERVE",
        machineFill: "Fill",
        machineServe: "Serve",
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

      questionArray: [
        {
          tubeColor1: "pink",
          tubeColor2: "pink",
          tubeColor3: "orange",
          tubeColor4: "blue",
          questionColor: "pink",
          answer: "someChance",
          maxServe: 1,
          serveColor: "pink",
          feedback_sureChance:
            "No, you can’t be sure, there are other colour slushes too!<br/><br/>Try again!",
          feedback_someChance:
            "Correct! There is some chance of getting Pink slush as it is there in at least one jar, but not in all jars.",
          feedback_noChance:
            "No, you might get Pink slush as it is there in at least one jar.<br/><br/>Try again!",
        },
        {
          tubeColor1: "yellow",
          tubeColor2: "yellow",
          tubeColor3: "orange",
          tubeColor4: "blue",
          questionColor: "yellow",
          answer: "noChance",
          maxServe: 1,
          serveColor: "orange",
          feedback_sureChance:
            "No, there is no jar with pink slush. Try again!",
          feedback_someChance:
            "No, there is no jar with pink slush. Try again!",
          feedback_noChance:
            "Good job! Since there is no jar with pink slush, there is no chance of getting it.",
        },
        {
          tubeColor1: "orange",
          tubeColor2: "orange",
          tubeColor3: "orange",
          tubeColor4: "orange",
          questionColor: "orange",
          answer: "sureChance",
          maxServe: 1,
          serveColor: "orange",
          feedback_sureChance:
            "No, all jars have orange slush. We can’t get anything else! Try again!",
          feedback_someChance:
            "No, all jars have orange slush. We can’t get anything else! Try again!",
          feedback_noChance:
            "Good job! Since all jars have orange slush, we will surely get orange slush.",
        },
        {
          tubeColor1: "pink",
          tubeColor2: "blue",
          tubeColor3: "blue",
          tubeColor4: "blue",
          questionColor: "blue",
          answer: "someChance",
          maxServe: 1,
          serveColor: "pink",
          feedback_sureChance:
            "No, you can’t be sure, there are other colour slushes too! Try again!",
          feedback_someChance:
            "Correct! There is some chance of getting blue slush as it is there in at least one jar, but not in all jars.No, all jars have orange slush. We can’t get anything else! Try again!",
          feedback_noChance:
            "No, you might get blue slush as it is there in at least one jar.Try again!",
        },
        {
          tubeColor1: "pink",
          tubeColor2: "yellow",
          tubeColor3: "blue",
          tubeColor4: "orange",
          questionColor: "pink",
          answer: "noChance",
          maxServe: 1,
          serveColor: "red",
          feedback_sureChance:
            "No, there is no jar with red slush. Try again!",
          feedback_someChance:
            "No, there is no jar with red slush. Try again!",
          feedback_noChance:
            "Good job! Since there is no jar with red slush, there is no chance of getting it.",
        },
        {
          tubeColor1: "pink",
          tubeColor2: "pink",
          tubeColor3: "blue",
          tubeColor4: "orange",
          questionColor: "pink",
          answer: "someChance",
          maxServe: 1,
          serveColor: "blue",
          feedback_sureChance:
            "No, you can’t be sure, there are other colour slushes too! Try again!",
          feedback_someChance:
            "Correct! There is some chance of getting blue slush as it is there in at least one jar, but not in all jars.",
          feedback_noChance:
            "No, you might get blue slush as it is there in at least one jar.Try again",
        },
      ],

      pages: {
        page1: {
          title: "Understanding Chance",
          mainText:
            "You have already heard the words <span style='background-color:#44D57A;padding:2px 6px;border-radius:3px;color:#000;font-weight:700;'>sure chance</span>, <span style='background-color:#FFB74D;padding:2px 6px;border-radius:3px;color:#000;font-weight:700;'>some chance</span>, and <span style='background-color:#D81629;padding:2px 6px;border-radius:3px;color:#000;font-weight:700;'>no chance</span>.<br/><br/>But how do we decide which one to use in a real situation?<br/><br/>In this activity, you will look carefully at what is possible<br/>and use that to decide the chance.",
          tapToBegin: "Tap ‘Start’ to begin.",
        },
        page2: {
          talkBoxText:
            "Welcome to the KAPSUL factory! <br/><br/>Let’s try a kapsul from this machine.",
          talkBoxText2: "<span>See, you got a <span style='background-color:#008DCE; padding:2px'>BLUE</span>  kapsul!<br/><br/>Out of the 4 pills, we can get one of them.</span>",
          instructionText: "Tap ‘Serve’ to get a kapsul.",
          instructionAfterServe: "Tap » to continue.",
        },
        page3: {
          questionChancePromptBefore: "What is the chance of getting the ",
          questionChancePromptAfter: " capsule?",
          instructionText: "Tap ‘Serve’.",
          instructionAfterServe: 'Tap » to understand what this means.',
          instructionAfterServeLast: "Tap » to continue.",
          instructionAfterServeNextTurn: "Tap » for next turn."
        },
        page4: {
          title:'Now you understand chance more clearly.',
          mainText:" <span style='background-color:#3DDC84;padding:4px;'>Sure chance</span> means the event will happen every time because there is no other possible result.<br/><br/> <span style='background-color:#FFB347;padding:4px;'>Some chance</span> means the event may or may not happen because more than one result is possible.<br/><br/> <span style='background-color:#FF6B6B;padding:4px;'>No chance</span> means the event cannot happen because it is not possible at all.<br/><br/> Tap ‘Start Over’ to repeat this activity.",
          sevenOfTenText: "<span style='color:#FFD966'>2 of 10 serves</span><br/>are  <span style='background-color:#D81629;padding:2px;'>RED</span>. kapsuls",
        },
        page5: {
          talkBoxText:
            "Getting a <span style='background-color:#D81629;padding:2px;'>RED</span> kapsul is more likely, but that doesn’t mean we will <span style='color:#FFD966'>always</span> get a <span style='background-color:#D81629;padding:2px;'>RED</span> kapsul.<br/><br/>We can also get <span style='background-color:#44D57A;padding:2px;'>GREEN</span> kapsuls.<br/><br/><span style='color:#FFD966'>More likely does not mean always</span>.",
          instructionText: "Tap » to try a different machine.",
        },
        page6: {
          talkBoxText:
            "Let’s look at another kapsul machine!<br/><br/>It also has <span style='background-color:#D81629;padding:2px;'>RED</span> and <span style='background-color:#44D57A;padding:2px;'>GREEN</span> kapsuls.<br/><br/>Let’s see what happens when we try 10 serves.",
          talkBoxText2:
            '<span>Out of 10 kapsul serves, only 2 are <span style="background-color:#D81629;padding:2px;">RED</span>.<br/><br/>This gives us an idea of how likely getting <span style="background-color:#D81629;padding:2px;">RED</span> is.</span>',
          instructionText: "Tap ‘Serve’ button 10 times.",
          instructionAfterServe: "Tap » to understand what this means.",
          headerAfterQuiz: "What do you notice?",
        },
        page7: {
          mainText:
            "Since there are fewer <span style='background-color:#D81629;padding:2px;'>RED</span> kapsuls inside the machine, we get <span style='background-color:#D81629;padding:2px;'>RED</span> kapsuls only a few times.<br/><br/>So, getting a <span style='background-color:#D81629;padding:2px;'>RED</span> kapsul has <br/><span style='color:#FFD966'>low chance</span>.<br/><br/>In math, we say getting a <span style='background-color:#D81629;padding:2px;'>RED</span> kapsul is <span style='color:#FFD966'>less likely</span>.",
          sevenOfTenText:
            "<span style='color:#FFD966'>2 of 10 serves</span><br/>are <span style='background-color:#D81629;padding:2px;'>RED</span> kapsuls",
          instructionAfterQuiz: "Tap » to continue.",
          conceptSummary: {
            completionText:
              "Fewer RED kapsuls in the machine means drawing RED is less likely.",
          },
        },
        page8: {
          talkBoxText:
            "Getting a <span style='background-color:#D81629;padding:2px;'>RED</span> kapsul is less likely, but that doesn’t mean we will <span style='color:#FFD966'>never</span> get a <span style='background-color:#D81629;padding:2px;'>RED</span> kapsul.<br/><br/><span style='color:#FFD966'>Less likely does not mean never</span>.",
          instructionText: "Tap » to summarize.",
          instructionAfterQuiz: "Tap » to summarize.",
        },
        page9: {
          chanceDependsText:
            "<span style='color:#FFD966'>Chance depends on how many items are present.</span>",
          moreText:
            "More<br/><span style='background-color:#D81629;padding:2px'>RED</span><br/>kapsuls",
          equalSign: "⇒",
          gettingRed1:
            'Getting a <span style="background-color:#D81629;padding:2px">RED</span><br/>kapsul<br/>is <span style="color:#FFD966">more likely</span>.',
          fewerText:
            "Fewer<br/><span style='background-color:#D81629;padding:2px'>RED</span><br/>kapsuls",
          gettingRed2:
            'Getting a <span style="background-color:#D81629;padding:2px">RED</span><br/>kapsul<br/>is <span style="color:#FFD966">less likely</span>.',
          instructionAfterQuiz: "Tap ‘Start Over’ when you want to try the lesson again.",
        },
      },
    },
    id: {
      appInfo: {
        title: "Peluang Tinggi dan Peluang Rendah",
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
        continue: "Lanjut",
        check: "Periksa",
        lottieFill: "ISI",
        lottieServe: "SAJI",
        machineFill: "Isi",
        machineServe: "Saji",
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

      questionArray: [
        {
          tubeColor1: "pink",
          tubeColor2: "pink",
          tubeColor3: "orange",
          tubeColor4: "blue",
          questionColor: "pink",
          answer: "someChance",
          maxServe: 1,
          serveColor: "pink",
          feedback_sureChance:
            "Tidak, kamu tidak bisa memastikan, masih ada slush warna lain juga!<br/><br/>Coba lagi!",
          feedback_someChance:
            "Benar! Ada peluang mendapat slush Pink karena ada di minimal satu toples, tetapi tidak di semua toples.",
          feedback_noChance:
            "Tidak, kamu bisa saja mendapat slush Pink karena ada di minimal satu toples.<br/><br/>Coba lagi!",
        },
      ],

      pages: {
        page1: {
          title: "Memahami Peluang",
          mainText:
            "Kamu sudah pernah mendengar istilah <span style='background-color:#44D57A;padding:2px 6px;border-radius:3px;color:#000;font-weight:700;'>peluang pasti</span>, <span style='background-color:#FFB74D;padding:2px 6px;border-radius:3px;color:#000;font-weight:700;'>ada peluang</span>, dan <span style='background-color:#D81629;padding:2px 6px;border-radius:3px;color:#000;font-weight:700;'>tidak ada peluang</span>.<br/><br/>Tapi bagaimana kita memutuskan mana yang dipakai dalam situasi nyata?<br/><br/>Dalam aktivitas ini, kamu akan mengamati dengan teliti apa yang mungkin terjadi<br/>dan memakainya untuk menentukan peluangnya.",
          tapToBegin: "Ketuk ‘Mulai’ untuk memulai.",
        },
        page2: {
          talkBoxText:
            "Selamat datang di pabrik KAPSUL! <br/><br/>Mari kita coba sebuah kapsul dari mesin ini.",
          talkBoxText2:
            "<span>Lihat, kamu mendapat kapsul <span style='background-color:#008DCE; padding:2px'>BIRU</span>!<br/><br/>Dari 4 kapsul, kita bisa mendapat salah satunya.</span>",
          instructionText: "Ketuk ‘Saji’ untuk mendapatkan sebuah kapsul.",
          instructionAfterServe: "Ketuk » untuk melanjutkan.",
        },
        page3: {
          questionChancePromptBefore: "Berapa peluang mendapat kapsul ",
          questionChancePromptAfter: "?",
          instructionText: "Ketuk ‘Saji’.",
          instructionAfterServe: "Ketuk » untuk memahami maksudnya.",
          instructionAfterServeLast: "Ketuk » untuk melanjutkan.",
          instructionAfterServeNextTurn: "Ketuk » untuk giliran berikutnya.",
        },
        page4: {
          mainText:
            "Mesin kapsul mengeluarkan kapsul secara acak.<br/><br/>Karena ada lebih banyak kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span> di dalam mesin, kita sering mendapat kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span>.<br/><br/>Jadi, mendapat kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span> memiliki <span style='color:#FFD966'>peluang tinggi</span>. Dalam matematika, kita mengatakan mendapat kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span> <span style='color:#FFD966'>lebih mungkin</span> terjadi.",
          sevenOfTenText:
            "<span style='color:#FFD966'>7 dari 10 serve</span><br/>adalah kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span>",
        },
        page5: {
          talkBoxText:
            "Mendapat kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span> lebih mungkin terjadi, tetapi itu tidak berarti kita akan <span style='color:#FFD966'>selalu</span> mendapat kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span>.<br/><br/>Kita juga bisa mendapat kapsul <span style='background-color:#44D57A;padding:2px;'>HIJAU</span>.<br/><br/><span style='color:#FFD966'>Lebih mungkin tidak berarti selalu</span>.",
          instructionText: "Ketuk » untuk mencoba mesin lain.",
        },
        page6: {
          talkBoxText:
            "Mari kita lihat mesin kapsul lain!<br/><br/>Mesin ini juga berisi kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span> dan <span style='background-color:#44D57A;padding:2px;'>HIJAU</span>.<br/><br/>Mari kita lihat apa yang terjadi jika kita melakukan 10 kali serve.",
          talkBoxText2:
            '<span>Dari 10 kali serve, hanya 2 yang <span style="background-color:#D81629;padding:2px;">MERAH</span>.<br/><br/>Ini memberi gambaran seberapa besar peluang mendapat <span style="background-color:#D81629;padding:2px;">MERAH</span>.</span>',
          instructionText: "Ketuk tombol ‘Serve’ 10 kali.",
          instructionAfterServe: "Ketuk » untuk memahami maksudnya.",
          headerAfterQuiz: "Apa yang kamu perhatikan?",
        },
        page7: {
          mainText:
            "Karena ada lebih sedikit kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span> di dalam mesin, kita hanya jarang mendapat kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span>.<br/><br/>Jadi, mendapat kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span> memiliki <br/><span style='color:#FFD966'>peluang rendah</span>.<br/><br/>Dalam matematika, kita mengatakan mendapat kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span> <span style='color:#FFD966'>kurang mungkin</span> terjadi.",
          sevenOfTenText:
            "<span style='color:#FFD966'>2 dari 10 serve</span><br/>adalah kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span>",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          conceptSummary: {
            completionText:
              "Semakin sedikit kapsul MERAH di dalam mesin, semakin kecil peluang mendapat MERAH.",
          },
        },
        page8: {
          talkBoxText:
            "Mendapat kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span> kurang mungkin terjadi, tetapi itu tidak berarti kita akan <span style='color:#FFD966'>tidak pernah</span> mendapat kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span>.<br/><br/><span style='color:#FFD966'>Kurang mungkin tidak berarti tidak pernah</span>.",
          instructionText: "Ketuk » untuk merangkum.",
          instructionAfterQuiz: "Ketuk » untuk merangkum.",
        },
        page9: {
          chanceDependsText:
            "<span style='color:#FFD966'>Peluang bergantung pada seberapa banyak benda yang ada.</span>",
          moreText:
            "Lebih banyak<br/><span style='background-color:#D81629;padding:2px'>MERAH</span><br/>kapsul",
          equalSign: "⇒",
          gettingRed1:
            'Mendapat kapsul <span style="background-color:#D81629;padding:2px">MERAH</span><br/><span style="color:#FFD966">lebih mungkin</span>.',
          fewerText:
            "Lebih sedikit<br/><span style='background-color:#D81629;padding:2px'>MERAH</span><br/>kapsul",
          gettingRed2:
            'Mendapat kapsul <span style="background-color:#D81629;padding:2px">MERAH</span><br/><span style="color:#FFD966">kurang mungkin</span>.',
          instructionAfterQuiz:
            "Ketuk ‘Mulai Ulang’ jika ingin mencoba pelajaran ini lagi.",
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

// Make i18n globally available
window.i18n = i18n;
