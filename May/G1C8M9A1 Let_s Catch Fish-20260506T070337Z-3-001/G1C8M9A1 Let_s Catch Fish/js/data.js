// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlightColor1 = "#FFD700";
const highlightColor2 = "#70ACC7";
const highlightColor3 = "#F28283";
const highlightColor4 = "#00FF7F";
const highlightColor5 = '#8A2BE2';

const questionTextSize = '36gc';
const highlightTextSize = "28gc";

const AppData = {
  // Current language setting
  currentLanguage: "en",

  // Text content by language
  translations: {
    en: {
      appInfo: {
        title: "Let’s go fishing!"
      },
      messages: {
        pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?",
        pageChangeEventDispatched: "Dispatched page change event to page {page}",
        navigationDispatchedEvent: "Navigation ({direction}) — dispatched page change event to page {page}",
        lastPageStartingOver: "Last page — starting over",
        navigationReset: "Resetting to question 1",
        navigationComplete: "App reset complete — ready for a new question",
        navDirectionNext: "next",
        navDirectionPrevious: "previous",
        navDirectionUnknown: "unknown"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        start: 'Start'
      },
      fish: {
        green: "Green Fish",
        red: "Red Fish",
        blue: "Blue Fish",
        yellow: "Yellow Fish"
      },
      accessibility: {
        tap: "Tap",
        redFish: "Red fish",
        blueFish: "Blue fish",
        yellowFish: "Yellow fish",
        greenFish: "Green fish"
      },
      feedback: {
        tryAgain: "Try again",
        thatIsCorrect: "All correct!",
        manyStars: "Try again",
        notEnough: "Try again",
        chooseCorrectShape: "Choose the correct item.",
        itemRemoved: "Item removed",
        dropInsideCell: "Drop the fish inside the correct cell.",
        page2: {
          correct1: 'Nice catch!<br/>Keep going!',
          correct2: 'Nice!<br/>Another fish caught! Keep going!',
          correct3: 'You\'re a<br/>great fisher! Catch more!',
          wrongItem: 'Oops!<br/>That\'s not a fish.<br/>Tap only the fish!',
          allCaught: 'Great job!<br/>All the fish are caught!<br/>Let\'s look at them!'
        },
        page4: {
          correct1: "Great Job!<br/>That fish is in the right group!",
          correct2: "Super! You placed it correctly!",
          correct3: "Well done! You chose the right box!",
          wrongGroup: "Oops! That is not the right group.<br/>Try again!",
          allSorted: "Yay! You sorted the fish!"
        },
        page5: {
          correct1: "Great Job!<br/>That fish is in the right group!",
          correct2: "Super! You placed it correctly!",
          correct3: "Well done! You chose the right box!",
          wrongGroup: "Oops! That is not the right group.<br/>Try again!",
          allSorted: "Yay! You sorted the fish!"
        }
      },
      common: {
        tapAlt: "Tap",
        downArrow: "▼",
        equationButtonText: "Amount of Bika Ambon left",
        questionText: "Beni has $ 8 \\frac{1}{8}$ pieces of Bika Ambon. He gave $3 \\frac{5}{8}$ of the Bika Ambon to his grandmother. How much Bika Ambon does Beni still have left?",
        questionIcon: "Q",
        labels: {
          dropHere: "Drop here"
        },
        informationAnalysis: {
          header: "INFORMATION ANALYSIS",
          facts: "Facts",
          values: "Value",
          toFind: "To Find"
        },
        conceptSummary: {
          header: "CONCEPT SUMMARY",
          given: "Given",
          toFind: "To Find",
          keyConcepts: "Key Concepts",
          importantFormulae: "Calculations"
        },
        amountBeniGiveToGrandMother: "Amount Beni gave\n to his grandfather.",
        amountOfBika: "Amount of Bika\n Ambon left with Beni"
      },

      components: {
        informationAnalysis: {
          headerText: "INFORMATION ANALYSIS",
          factsTitle: "Facts",
          valueTitle: "Value",
          toFindTitle: "To Find"
        },
        conceptSummary: {
          headerText: "CONCEPT SUMMARY",
          givenTitle: "Given",
          toFindTitle: "To Find",
          keyConceptsTitle: "Key Concepts",
          importantFormulaeTitle: "Calculations"
        }
      },

      pages: {
        page1: {
          title: "Let’s go fishing!",
          mainText:
            "Some fish are swimming in the sea!<br/><br/>Let’s catch them<br/>and show our data using pictures!",
        },
        page2: {

          feedbackTextboxDefault: "Look! There are fish everywhere!<br/><br/>Can you catch them all?",
          footerInstruction: "Tap the fish to catch them!",
          instructionAfterQuiz: 'Tap  » to see the fish!',
          eachPartText: "Put each part where it belongs in<br/> the vertical picture diagram!",
          verticalTextDiagram: 'Vertical Picture Diagram',

        },
        page3: {
          leftTextBox: "These are the fish you caught! <br/><br/>Let’s sort them by color to show the data!",
          footerInstruction: "Tap  » to start sorting!",
          instructionAfterQuiz: 'Tap » to proceed',
          eachPartText: "Put each part where it belongs in<br/> the vertical picture diagram!",
          verticalTextDiagram: 'Vertical Picture Diagram',

        },
        page4: {
          leftTextBox: "",
          feedbackTextboxDefault: "Sort the fish into 4 color groups.",
          footerInstruction: "Drag and drop each fish into the correct row.",
          instructionAfterQuiz: 'Tap » to summarize.',
          eachPartText: "Put each part where it belongs in<br/> the vertical picture diagram!",
          verticalTextDiagram: 'Vertical Picture Diagram',

        },
        page5: {
          title: "Activity Completed!",
          mainText:
            "You caught all the fish and sorted<br/> them into their colors.",
          mainText2: 'This makes it easy for<br/> everyone to see and <br/>understand our fish data!',

        },

      },
    },
    id: {
      appInfo: {
        title: "Ayo memancing!"
      },
      messages: {
        pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
        pageChangeEventDispatched: "Peristiwa perubahan halaman ke halaman {page} telah dikirim",
        navigationDispatchedEvent: "Navigasi ({direction}) — peristiwa perubahan halaman ke halaman {page} telah dikirim",
        lastPageStartingOver: "Halaman terakhir — memulai ulang",
        navigationReset: "Mengatur ulang ke pertanyaan 1",
        navigationComplete: "Reset aplikasi selesai — siap untuk pertanyaan baru",
        navDirectionNext: "selanjutnya",
        navDirectionPrevious: "sebelumnya",
        navDirectionUnknown: "tidak diketahui"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang",
        start: "Mulai"
      },

      fish: {
        green: "Ikan hijau",
        red: "Ikan merah",
        blue: "Ikan biru",
        yellow: "Ikan kuning"
      },

      accessibility: {
        tap: "Ketuk",
        redFish: "Ikan merah",
        blueFish: "Ikan biru",
        yellowFish: "Ikan kuning",
        greenFish: "Ikan hijau"
      },

      feedback: {
        tryAgain: "Coba lagi",
        thatIsCorrect: "Semua benar!",
        manyStars: "Coba lagi",
        notEnough: "Coba lagi",
        chooseCorrectShape: "Pilih benda yang benar.",
        itemRemoved: "Benda dihapus",
        dropInsideCell: "Letakkan ikan di dalam sel yang benar.",
        page2: {
          correct1: "Tangkapan bagus!<br/>Lanjutkan!",
          correct2: "Bagus!<br/>Ikan lain tertangkap! Lanjutkan!",
          correct3: "Kamu<br/>nelayan hebat! Tangkap lagi!",
          wrongItem: "Ups!<br/>Itu bukan ikan.<br/>Ketuk hanya ikan!",
          allCaught: "Kerja bagus!<br/>Semua ikan tertangkap!<br/>Mari kita lihat!"
        },
        page4: {
          correct1: "Kerja bagus!<br/>Ikan itu ada di kelompok yang benar!",
          correct2: "Hebat! Kamu meletakkannya dengan benar!",
          correct3: "Bagus! Kamu memilih kotak yang tepat!",
          wrongGroup: "Ups! Itu bukan kelompok yang benar.<br/>Coba lagi!",
          allSorted: "Hore! Kamu mengurutkan ikannya!"
        },
        page5: {
          correct1: "Kerja bagus!<br/>Ikan itu ada di kelompok yang benar!",
          correct2: "Hebat! Kamu meletakkannya dengan benar!",
          correct3: "Bagus! Kamu memilih kotak yang tepat!",
          wrongGroup: "Ups! Itu bukan kelompok yang benar.<br/>Coba lagi!",
          allSorted: "Hore! Kamu mengurutkan ikannya!"
        }
      },

      common: {
        tapAlt: "Ketuk",
        downArrow: "▼",
        equationButtonText: "Jumlah Bika Ambon yang tersisa",
        questionText: "Beni memiliki $ 8 \\frac{1}{8}$ potong Bika Ambon. Ia memberikan $3 \\frac{5}{8}$ potong Bika Ambon kepada neneknya. Berapa banyak Bika Ambon yang masih dimiliki Beni?",
        questionIcon: "T",
        labels: {
          dropHere: "Letakkan di sini"
        },
        informationAnalysis: {
          header: "ANALISIS INFORMASI",
          facts: "Fakta",
          values: "Nilai",
          toFind: "Yang Dicari"
        },
        conceptSummary: {
          header: "RINGKASAN KONSEP",
          given: "Diketahui",
          toFind: "Yang Dicari",
          keyConcepts: "Konsep Utama",
          importantFormulae: "Perhitungan"
        },
        amountBeniGiveToGrandMother: "Jumlah yang diberikan Beni\n kepada neneknya.",
        amountOfBika: "Jumlah Bika\n Ambon yang tersisa pada Beni"
      },

      components: {
        informationAnalysis: {
          headerText: "ANALISIS INFORMASI",
          factsTitle: "Fakta",
          valueTitle: "Nilai",
          toFindTitle: "Yang Dicari"
        },
        conceptSummary: {
          headerText: "RINGKASAN KONSEP",
          givenTitle: "Diketahui",
          toFindTitle: "Yang Dicari",
          keyConceptsTitle: "Konsep Utama",
          importantFormulaeTitle: "Perhitungan"
        }
      },

      pages: {
        page1: {
          title: "Ayo memancing!",
          mainText:
            "Beberapa ikan berenang di laut!<br/><br/>Mari tangkap mereka<br/>dan tunjukkan data kita dengan gambar!"
        },
        page2: {
          feedbackTextboxDefault: "Lihat! Ikan ada di mana-mana!<br/><br/>Bisakah kamu menangkap semuanya?",
          footerInstruction: "Ketuk ikan untuk menangkapnya!",
          instructionAfterQuiz: "Ketuk » untuk melihat ikannya!",
          eachPartText: "Letakkan setiap bagian pada tempatnya<br/> di diagram gambar vertikal!",
          verticalTextDiagram: "Diagram Gambar Vertikal"
        },
        page3: {
          leftTextBox: "Ini ikan yang kamu tangkap! <br/><br/>Mari urutkan menurut warna untuk menunjukkan datanya!",
          footerInstruction: "Ketuk » untuk mulai mengurutkan!",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          eachPartText: "Letakkan setiap bagian pada tempatnya<br/> di diagram gambar vertikal!",
          verticalTextDiagram: "Diagram Gambar Vertikal"
        },
        page4: {
          leftTextBox: "",
          feedbackTextboxDefault: "Urutkan ikan ke dalam 4 kelompok warna.",
          footerInstruction: "Seret dan lepas setiap ikan ke baris yang benar.",
          instructionAfterQuiz: "Ketuk » untuk merangkum.",
          eachPartText: "Letakkan setiap bagian pada tempatnya<br/> di diagram gambar vertikal!",
          verticalTextDiagram: "Diagram Gambar Vertikal"
        },
        page5: {
          title: "Aktivitas selesai!",
          mainText:
            "Kamu menangkap semua ikan dan mengurutkannya<br/> menurut warnanya.",
          mainText2:
            "Ini membuat semua orang<br/> mudah melihat dan<br/> memahami data ikan kita!"
        }
      }
    },

  },
};

// Indonesian ('id') translations are defined explicitly above.

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
        Object.keys(AppData.translations)
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
