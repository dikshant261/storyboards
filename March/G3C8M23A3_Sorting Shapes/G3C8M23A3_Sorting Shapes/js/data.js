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
        title: "Sort the shapes"
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
          title: "Sort the shapes",
          mainText: "We have learnt about a <br/>few quadrilaterals.<br/><br/>Let us sort the shapes."
        },
        page2: {
          headerText: 'Match the names of the shapes',
          footerInstruction: "Drag and drop the correct names for the shapes",
          instructionAfterQuiz: 'Tap ‘»’ to move to the next challenge',
          verticalTextDiagram: 'Vertical Picture Diagram',
          fillBlanks: {
            options: [
              // Option 1
              {
                id: 'opt1',
                text: 'Square',
                image: '',
                blankID: ['blank2'],
                maxDrops: 1,
                feedbackText: 'Well done! This shape is a Square.',
                inCorrectFeeback: 'Incorrect! This shape is not a Square.',
                coordinate: [15, 690, 390, 790],
                buttonColor: '#E08D1B',
              },

              // Option 2
              {
                id: 'opt2',
                text: 'Rhombus',
                image: '',
                blankID: ['blank4'],
                feedbackText: 'Well done! This shape is a Rhombus.',
                inCorrectFeeback: 'Incorrect! This shape is not a Rhombus.',
                coordinate: [410, 690, 790, 790],
                buttonColor: '#E08D1B',
              },

              // Option 3
              {
                id: 'opt3',
                text: 'Parallelogram',
                image: '',
                blankID: ['blank1'],
                maxDrops: 1,
                feedbackText: 'Well done! This shape is a Parallelogram.',
                inCorrectFeeback: 'Incorrect! This shape is not a Parallelogram.',
                coordinate: [810, 690, 1185, 790],
                buttonColor: '#E08D1B',
              },

              // Option 4
              {
                id: 'opt4',
                text: 'Rectangle',
                image: '',
                blankID: ['blank3'],
                maxDrops: 1,
                feedbackText: 'Well done! This shape is a Rectangle.',
                inCorrectFeeback: 'Incorrect! This shape is not a Rectangle.',
                coordinate: [1205, 690, 1585, 790],
                buttonColor: '#E08D1B',
              }
            ]
          }
        },
       page3: {
          headerText: 'Match the names of the shapes',
          footerInstruction: "Drag and drop the correct names for the shapes",
          instructionAfterQuiz: 'Activity Completed! Tap to "Start Over" to re-do this activity.',
          verticalTextDiagram: 'Vertical Picture Diagram',
          fillBlanks: {
            options: [
              // Option 1
              {
                id: 'opt1',
                text: 'Square',
                image: '',
                blankID: ['blank3'],
                maxDrops: 1,
                feedbackText: 'Well done! This shape is a Square.',
                inCorrectFeeback: 'Incorrect! This shape is not a Square.',
                coordinate: [15, 690, 390, 790],
                buttonColor: '#E08D1B',
              },

              // Option 2
              {
                id: 'opt2',
                text: 'Rhombus',
                image: '',
                blankID: ['blank4'],
                feedbackText: 'Well done! This shape is a Rhombus.',
                inCorrectFeeback: 'Incorrect! This shape is not a Rhombus.',
                coordinate: [410, 690, 790, 790],
                buttonColor: '#E08D1B',
              },

              // Option 3
              {
                id: 'opt3',
                text: 'Parallelogram',
                image: '',
                blankID: ['blank2'],
                maxDrops: 1,
                feedbackText: 'Well done! This shape is a Parallelogram.',
                inCorrectFeeback: 'Incorrect! This shape is not a Parallelogram.',
                coordinate: [810, 690, 1185, 790],
                buttonColor: '#E08D1B',
              },

              // Option 4
              {
                id: 'opt4',
                text: 'Rectangle',
                image: '',
                blankID: ['blank1'],
                maxDrops: 1,
                feedbackText: 'Well done! This shape is a Rectangle.',
                inCorrectFeeback: 'Incorrect! This shape is not a Rectangle.',
                coordinate: [1205, 690, 1585, 790],
                buttonColor: '#E08D1B',
              }
            ]
          }
        },

      },
    },
    id: {
      appInfo: {
        title: "Diagram Gambar Vertikal"
      },
      messages: {
        pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
        nextButtonPage2: "Perubahan halaman ke halaman 2 telah dikirim",
        previousButtonPage1: "Perubahan halaman ke halaman 1 telah dikirim"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang",
        start: "Mulai"
      },

      common: {
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
    title: "Kelompokkan bentuk",
    mainText: "Kita telah mempelajari <br/>beberapa segiempat.<br/><br/>Mari kita mengelompokkan bentuk-bentuknya."
  },

  page2: {
    headerText: 'Cocokkan nama-nama bentuk',
    footerInstruction: "Seret dan lepaskan nama yang benar untuk setiap bentuk",
    instructionAfterQuiz: 'Ketuk ‘»’ untuk melanjutkan ke tantangan berikutnya',
    verticalTextDiagram: 'Diagram Gambar Vertikal',
    fillBlanks: {
      options: [
        {
          id: 'opt1',
          text: 'Persegi',
          image: '',
          blankID: ['blank2'],
          maxDrops: 1,
          feedbackText: 'Bagus sekali! Bentuk ini adalah Persegi.',
          inCorrectFeeback: 'Kurang tepat! Bentuk ini bukan Persegi.',
          coordinate: [15, 690, 390, 790],
          buttonColor: '#E08D1B',
        },

        {
          id: 'opt2',
          text: 'Belah Ketupat',
          image: '',
          blankID: ['blank4'],
          feedbackText: 'Bagus sekali! Bentuk ini adalah Belah Ketupat.',
          inCorrectFeeback: 'Kurang tepat! Bentuk ini bukan Belah Ketupat.',
          coordinate: [410, 690, 790, 790],
          buttonColor: '#E08D1B',
        },

        {
          id: 'opt3',
          text: 'Jajar Genjang',
          image: '',
          blankID: ['blank1'],
          maxDrops: 1,
          feedbackText: 'Bagus sekali! Bentuk ini adalah Jajar Genjang.',
          inCorrectFeeback: 'Kurang tepat! Bentuk ini bukan Jajar Genjang.',
          coordinate: [810, 690, 1185, 790],
          buttonColor: '#E08D1B',
        },

        {
          id: 'opt4',
          text: 'Persegi Panjang',
          image: '',
          blankID: ['blank3'],
          maxDrops: 1,
          feedbackText: 'Bagus sekali! Bentuk ini adalah Persegi Panjang.',
          inCorrectFeeback: 'Kurang tepat! Bentuk ini bukan Persegi Panjang.',
          coordinate: [1205, 690, 1585, 790],
          buttonColor: '#E08D1B',
        }
      ]
    }
  },

  page3: {
    headerText: 'Cocokkan nama-nama bentuk',
    footerInstruction: "Seret dan lepaskan nama yang benar untuk setiap bentuk",
    instructionAfterQuiz: 'Aktivitas selesai! Ketuk "Mulai Lagi" untuk mengulangi aktivitas ini.',
    verticalTextDiagram: 'Diagram Gambar Vertikal',
    fillBlanks: {
      options: [
        {
          id: 'opt1',
          text: 'Persegi',
          image: '',
          blankID: ['blank3'],
          maxDrops: 1,
          feedbackText: 'Bagus sekali! Bentuk ini adalah Persegi.',
          inCorrectFeeback: 'Kurang tepat! Bentuk ini bukan Persegi.',
          coordinate: [15, 690, 390, 790],
          buttonColor: '#E08D1B',
        },

        {
          id: 'opt2',
          text: 'Belah Ketupat',
          image: '',
          blankID: ['blank4'],
          feedbackText: 'Bagus sekali! Bentuk ini adalah Belah Ketupat.',
          inCorrectFeeback: 'Kurang tepat! Bentuk ini bukan Belah Ketupat.',
          coordinate: [410, 690, 790, 790],
          buttonColor: '#E08D1B',
        },

        {
          id: 'opt3',
          text: 'Jajar Genjang',
          image: '',
          blankID: ['blank2'],
          maxDrops: 1,
          feedbackText: 'Bagus sekali! Bentuk ini adalah Jajar Genjang.',
          inCorrectFeeback: 'Kurang tepat! Bentuk ini bukan Jajar Genjang.',
          coordinate: [810, 690, 1185, 790],
          buttonColor: '#E08D1B',
        },

        {
          id: 'opt4',
          text: 'Persegi Panjang',
          image: '',
          blankID: ['blank1'],
          maxDrops: 1,
          feedbackText: 'Bagus sekali! Bentuk ini adalah Persegi Panjang.',
          inCorrectFeeback: 'Kurang tepat! Bentuk ini bukan Persegi Panjang.',
          coordinate: [1205, 690, 1585, 790],
          buttonColor: '#E08D1B',
        }
      ]
    }
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
