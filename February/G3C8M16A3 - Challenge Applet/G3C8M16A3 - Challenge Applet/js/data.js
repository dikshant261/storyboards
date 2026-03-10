// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlightColor1 = "#FFD700";
const highlightColor2 = "#70ACC7";
const highlightColor3 = "#EF6AA9";
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
        title: "Ratio - Komodo Distance Comparison"
      },
      messages: {
        pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?",
        nextButtonPage2: "Dispatched page change event to page 2",
        previousButtonPage1: "Dispatched page change event to page 1"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        start: 'Start'
      },

      common: {
        equationButtonText: "Total wingko parts",
        questionText: "Dania has 6 boxes of milk, 12 lollipops, and 24 packets of biscuits. She wants to make the identical parcels so that each parcel has the same number of each item and no items are left over. What is the maximum number of parcels she can make?",
        questionIcon: "Q",
        labels: {
          dropHere: "Drop here"
        },
        milkImageText: '6 Milk Boxes',
        lolliopsImageText: '12 Lollipops',
        biscuitImageText: '24 Packets',
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
          headerText: "Read the statement and select the correct option",

          instruction: "Tap the correct option",
          instructionAfterQuiz: "Tap ‘»’ to move to the next challenge",
          quizPanel: {
            quizSubType: "QT3",
            questionText: 'Intersecting lines are perpendicular.',
            options: [
              {
                text: "Always True",
                iscorrect: false,
                feedback: "Intersecting lines can be perpendicular but it is not always true.",
              },
              {
                text: "Sometimes True",
                iscorrect: true,
                feedback: "Intersecting lines can be perpendicular if they intersect and form right angle.So , this statement is sometimes true.",
              },
              {
                text: "Never True",
                iscorrect: false,
                feedback: "Intersecting lines can be perpendicular if they intersect and form right angle.",
              },
            ],
          }
        },
        page2: {
          headerText: "Read the statement and select the correct option",

          instruction: "Tap the correct option",
          instructionAfterQuiz: "Tap ‘»’ to move to the next challenge",
          quizPanel: {
            quizSubType: "QT3",
            questionText: 'Perpendicular lines make a right angle.',
            options: [
              {
                text: "Always True",
                iscorrect: true,
                feedback: "Perpendicular lines intersect each other at right angle.",
              },
              {
                text: "Sometimes True",
                iscorrect: false,
                feedback: "Incorrect!. Check again!",
              },
              {
                text: "Never True",
                iscorrect: false,
                feedback: "Incorrect!. Check again!",
              },
            ],
          }
        },
        page3: {
          headerText: "Read the statement and select the correct option",

          instruction: "Tap the correct option",
          instructionAfterQuiz: "Tap ‘»’ to move to the next challenge",
          quizPanel: {
            quizSubType: "QT3",
            questionText: 'In rectangle, all corners show perpendicular lines',
            options: [
              {
                text: "Always True",
                iscorrect: true,
                feedback: "The lines at the corners of a rectangle are right angle so they are always perpendicular lines.",
              },
              {
                text: "Sometimes True",
                iscorrect: false,
                feedback: "Incorrect!. Check again!",
              },
              {
                text: "Never True",
                iscorrect: false,
                feedback: "Incorrect!. Check again!",
              },
            ],
          }
        },
        page4: {
          headerText: "Read the statement and select the correct option",

          instruction: "Tap the correct option",
          instructionAfterQuiz: "Tap ‘Start Over’ to begin again",
          quizPanel: {
            quizSubType: "QT3",
            questionText: 'Parallel lines are perpendicular.',
            options: [
              {
                text: "Always True",
                iscorrect: false,
                feedback: "Incorrect!. Check again!",
              },
              {
                text: "Sometimes True",
                iscorrect: false,
                feedback: "Incorrect!. Check again!",
              },
              {
                text: "Never True",
                iscorrect: true,
                feedback: "Parallel lines do not intersect each other, so they cannot be perpendicular.",
              },
            ],
          }
        },
      },
    },
    id: {
      appInfo: {
        title: "Rasio - Perbandingan Jarak Komodo"
      },
      messages: {
        pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
        nextButtonPage2: "Perubahan halaman telah dikirim ke halaman 2",
        previousButtonPage1: "Perubahan halaman telah dikirim ke halaman 1"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang",
        start: "Mulai"
      },

      common: {
        equationButtonText: "Total bagian wingko",
        questionText: "Dania memiliki 6 kotak susu, 12 permen lolipop, dan 24 bungkus biskuit. Ia ingin membuat paket yang sama sehingga setiap paket memiliki jumlah masing-masing barang yang sama dan tidak ada sisa. Berapa jumlah maksimum paket yang dapat dibuatnya?",
        questionIcon: "T",
        labels: {
          dropHere: "Letakkan di sini"
        },
        milkImageText: "6 Kotak Susu",
        lolliopsImageText: "12 Lolipop",
        biscuitImageText: "24 Bungkus",
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
        amountBeniGiveToGrandMother: "Jumlah yang diberikan Beni\n kepada kakeknya.",
        amountOfBika: "Jumlah Bika Ambon\n yang tersisa pada Beni"
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
          headerText: "Baca pernyataan dan pilih opsi yang benar",

          instruction: "Ketuk opsi yang benar",
          instructionAfterQuiz: "Ketuk ‘»’ untuk melanjutkan ke tantangan berikutnya",
          quizPanel: {
            quizSubType: "QT3",
            questionText: "Garis yang berpotongan adalah garis tegak lurus.",
            options: [
              {
                text: "Selalu Benar",
                iscorrect: false,
                feedback: "Garis yang berpotongan bisa saja tegak lurus, tetapi tidak selalu demikian.",
              },
              {
                text: "Kadang-kadang Benar",
                iscorrect: true,
                feedback: "Garis yang berpotongan bisa menjadi tegak lurus jika berpotongan dan membentuk sudut siku-siku. Jadi, pernyataan ini kadang-kadang benar.",
              },
              {
                text: "Tidak Pernah Benar",
                iscorrect: false,
                feedback: "Garis yang berpotongan bisa menjadi tegak lurus jika membentuk sudut siku-siku.",
              },
            ],
          }
        },

        page2: {
          headerText: "Baca pernyataan dan pilih opsi yang benar",

          instruction: "Ketuk opsi yang benar",
          instructionAfterQuiz: "Ketuk ‘»’ untuk melanjutkan ke tantangan berikutnya",
          quizPanel: {
            quizSubType: "QT3",
            questionText: "Garis tegak lurus membentuk sudut siku-siku.",
            options: [
              {
                text: "Selalu Benar",
                iscorrect: true,
                feedback: "Garis tegak lurus berpotongan satu sama lain dan membentuk sudut siku-siku.",
              },
              {
                text: "Kadang-kadang Benar",
                iscorrect: false,
                feedback: "Salah! Periksa kembali!",
              },
              {
                text: "Tidak Pernah Benar",
                iscorrect: false,
                feedback: "Salah! Periksa kembali!",
              },
            ],
          }
        },

        page3: {
          headerText: "Baca pernyataan dan pilih opsi yang benar",

          instruction: "Ketuk opsi yang benar",
          instructionAfterQuiz: "Ketuk ‘»’ untuk melanjutkan ke tantangan berikutnya",
          quizPanel: {
            quizSubType: "QT3",
            questionText: "Pada persegi panjang, semua sudut menunjukkan garis tegak lurus.",
            options: [
              {
                text: "Selalu Benar",
                iscorrect: true,
                feedback: "Garis pada setiap sudut persegi panjang membentuk sudut siku-siku sehingga selalu merupakan garis tegak lurus.",
              },
              {
                text: "Kadang-kadang Benar",
                iscorrect: false,
                feedback: "Salah! Periksa kembali!",
              },
              {
                text: "Tidak Pernah Benar",
                iscorrect: false,
                feedback: "Salah! Periksa kembali!",
              },
            ],
          }
        },

        page4: {
          headerText: "Baca pernyataan dan pilih opsi yang benar",

          instruction: "Ketuk opsi yang benar",
          instructionAfterQuiz: "Ketuk ‘Mulai Ulang’ untuk memulai kembali",
          quizPanel: {
            quizSubType: "QT3",
            questionText: "Garis sejajar adalah garis tegak lurus.",
            options: [
              {
                text: "Selalu Benar",
                iscorrect: false,
                feedback: "Salah! Periksa kembali!",
              },
              {
                text: "Kadang-kadang Benar",
                iscorrect: false,
                feedback: "Salah! Periksa kembali!",
              },
              {
                text: "Tidak Pernah Benar",
                iscorrect: true,
                feedback: "Garis sejajar tidak berpotongan, sehingga tidak mungkin menjadi tegak lurus.",
              },
            ],
          }
        },
      },
    }


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
