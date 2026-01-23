// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlight1 = "#FFD700";
const highlight2 = "#70ACC7";
const highlight3 = "#F28283";
const highlight4 = "#70ACC7";

const AppData = {
  // Current language setting
  currentLanguage: "en",

  // Text content by language
  translations: {
    en: {
      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        start: "Start",
      },
      appInfo: {
        title: "Types of Lines"
      },
      messages: {
        pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?",
      },

      common: {
        propertyShowcase: {
          headerText: "Properties of a Parallelogram",
          headerDescription: "Notice the lines on the grid.",
          propertyNames: {
            sides: "Sides",
            angles: "Angles",
            diagonals: "Diagonals",
            symmetry: "Symmetry"
          }
        },
        tapAlt: "Tap",
        oppositeSidesEqualMessage: "Opposite sides are equal!",
      },

      pages: {
        page1: {
          title: "Types of Lines",
          mainText: "In this activity, we will learn about different types of lines.",
          instructionText: 'Tap ‘Start’ to begin the activity.',
        },
        page2: {
          instruction: "Tap the correct answer.",
          messageBox: "",
          quizPanel: {
            quizSubtype: "QT2",
            questionText: 'Do the lines form a right angle (90°) where they meet?',
            options: [
              {
                text: "Yes",
                iscorrect: true,
                feedback: "Yes, the lines meet to form a right angle (90°).",
              },
              {
                text: "No",
                iscorrect: false,
                feedback: "Oops! Check the angle marking at the intersection.",
              },
            ],
          }
        },
        page3: {
          instruction: "Tap » to continue.",
          messageBox: "",
          intractionText: "AB and CD are perpendicular lines.\n\nLines are perpendicular if they meet to make a right angle (90°). \n\nWe mark a right angle with a tiny square.",
          abperpendicularcd: "AB ⟂ CD"
        },
        page4: {
          instruction: "Tap the correct answer.",
          messageBox: "",
          quizPanel: {
            quizSubtype: "QT2",
            questionText: 'Do the lines ever intersect at an angle?',
            options: [
              {
                text: "Yes",
                iscorrect: false,
                feedback: "Oops! Check the angle marking at the intersection.",
              },
              {
                text: "No",
                iscorrect: true,
                feedback: "No, the lines do not meet to form a right angle."
              },
            ],
          }
        },
        page5: {
          instruction: "Tap » to continue.",
          messageBox: "",
          intractionText: "PQ and RS are intersecting lines.\n\nTwo straight lines are intersecting if they meet or cross each other at a point, but not at a right angle.",
          abperpendicularcd: "AB ⟂ CD"
        },
        page6: {
          instruction: "Tap the correct answer.",
          messageBox: "",
          quizPanel: {
            quizSubtype: "QT2",
            questionText: 'Do the lines ever intersect at an angle?',
            options: [
              {
                text: "Yes",
                iscorrect: false,
                feedback: "Look carefully at the lines. Do they cross each other anywhere?",
              },
              {
                text: "No",
                iscorrect: true,
                feedback: "Well done! These lines never cross, so they do not form any angle."
              },
            ],
          }
        },
        page7: {
          instruction: "Tap » to continue.",
          messageBox: "",
          intractionText: "KL and MN are parallel lines.\n\nTwo straight lines are parallel if they lie in the same plane and never meet, even if extended.",
          abperpendicularcd: "KL || MN"
        },
        page8: {
          instruction: "Tap the correct answer.",
          messageBox: "",
          quizPanel: {
            quizSubtype: "QT2",
            questionText: 'Do the lines form parallel lines?',
            options: [
              {
                text: "Yes",
                iscorrect: false,
                feedback: "Look closely! Parallel lines stay apart, but these lines overlap.",
              },
              {
                text: "No",
                iscorrect: true,
                feedback: "Correct! These lines lie exactly on top of each other, so they do not form parallel lines."
              },
            ],
          }
        },
        page9: {
          instruction: "Tap » to continue.",
          messageBox: "",
          intractionText: "WX and YZ are coincidental or overlapping lines.\n\nTwo straight lines are coincident (or overlapping) lines if they lie exactly on top of each other and share all their points.",
          abperpendicularcd: ""
        },
        page10: {
          title: "Activity Completed!",
          mainText: "In this activity, we learned about perpendicular lines, intersecting \nlines, parallel lines, and coincident lines.",
          instructionText: 'Tap ‘Start Over’ to restart the activity.',
        },
      },
    },

    id: {
      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang",
        start: "Mulai",
      },

      messages: {
        pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
      },
      common: {
        propertyShowcase: {
          headerText: "Sifat-sifat Jajar Genjang",
          headerDescription: "Jajar genjang adalah <span style='color: #FF9900;'>segi empat</span>- yaitu poligon bersisi 4",
          propertyNames: {
            sides: "Sisi",
            angles: "Sudut",
            diagonals: "Diagonal",
            symmetry: "Simetri"
          }
        },
        tapAlt: "Ketuk",
        oppositeSidesEqualMessage: "Sisi-sisi yang berhadapan sama panjang!",
      },
      pages: {
        page1: {
          title: "Sifat-sifat Jajar Genjang",
          mainText: "Mari kita jelajahi sifat-sifat sisi, sudut, dan diagonal jajar genjang.",
          instructionText: 'Ketuk "Mulai" untuk memulai aktivitas.',
        },
        page2: {
          instruction: "Ketuk » untuk menjelajahi sifat-sifat sisi.",
          messageBox: "Segi empat yang diberikan memiliki empat sisi",
        },
        page3: {
          animationSequence: {
            initialMessage: "Sisi-sisi yang berhadapan sejajar karena mempertahankan jarak yang sama di antara mereka.",
            firstPairProvenMessage: "AB dan CD sejajar satu sama lain",
            secondPairProvenMessage: "BC dan DA sejajar satu sama lain",
            conclusionMessage: "Dua pasang sisi yang berhadapan sejajar",
            propertyDescriptionText: "<span style='color: #FF9900;'>1.</span> <span style='color: #FF9900;'>Dua pasang</span> <span style='color: #FFFFFF;'>sisi yang berhadapan</span> <span style='color: #FF9900;'>sejajar.</span>",
            secondDescriptionText: "<span style='color: #FF9900; font-weight: bold;'>2.</span> <span style='color: #FF9900; font-weight: bold;'>Dua pasang</span> <span style='color: #FFFFFF; font-weight: bold;'>sisi yang berhadapan</span> <span style='color: #FF9900; font-weight: bold;'>sama panjang.</span>",
            instructionText: "Ketuk » untuk menjelajahi sifat-sifat sudut."
          }
        },
        page4: {
          animationSequence: {
            step2DescriptionText: "<span style='color: #FF9900;'>1.</span> <span style='color: #FF9900;'>Dua pasang</span> <span style='color: #FFFFFF;'>sudut yang berhadapan</span> <span style='color: #FF9900;'>sama besar.</span>",
            step3Message: "Kita melihat ada empat sudut interior.",
            step3AnglesDescriptionText: "Jajar genjang memiliki <span style='color: #FF9900; font-weight: bold;'>empat sudut interior.</span>",
            instructionText: "Ketuk » untuk menjelajahi sifat-sifat diagonal."
          }
        },
        page5: {
          animationSequence: {
            step2Message: "AC dan BD adalah dua diagonal",
            step3DescriptionText: "Jajar genjang memiliki <span style='color: #FF9900;'>2 diagonal.</span>",
            step6Message: "Diagonal-diagonalnya memiliki panjang yang berbeda.",
            step6DescriptionText: "<span style='color: #FF9900; font-weight: bold;'>1.</span> <span style='color: #FF9900; font-weight: bold;'>Diagonal</span> <span style='color: #FFFFFF; font-weight: bold;'>jajar genjang umum</span> <span style='color: #FF9900; font-weight: bold;'>tidak sama panjang.</span>",
            instructionText: "Ketuk » untuk menjelajahi sifat-sifat simetri."
          }
        },
        page6: {
          animationSequence: {
            step2SymmetryMessage: "Bentuk tidak simetris sepanjang sumbu horizontal, mari kita periksa sumbu vertikal",
            step4SymmetryMessage: "Bentuk tidak simetris sepanjang sumbu horizontal atau sumbu vertikal",
            step5DescriptionText: "Jajar genjang tidak memiliki <span style='color: #FF9900; font-weight: bold;'>garis simetri.</span>",
            instructionText: "Ketuk » untuk merangkum."
          }
        },
        page7: {
          title: "Aktivitas Selesai!",
          subtitle: "Anda telah menjelajahi sifat-sifat utama jajar genjang!",
          property1: "1. Sisi-sisi yang berhadapan sama panjang dan sejajar.",
          property2: "2. Sudut-sudut yang berhadapan sama besar.",
          property3: "3. Diagonal-diagonalnya tidak sama panjang.",
          property4: "4. Tidak memiliki garis simetri.",
          instruction: 'Ketuk "Mulai Ulang" untuk memulai ulang aktivitas.',
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
