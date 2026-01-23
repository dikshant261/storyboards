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
        title: "Symmetry of Shapes"
      },
      messages: {
        pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?",
      },

      common: {
        propertyShowcase: {
          headerText: "Properties of a Parallelogram",
          headerDescription: "Let’s spot the pair of perpendicular lines for the following figure.",
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
          title: "Symmetry of Shapes",
          mainText: "Different shapes have different numbers of symmetry lines.\n\nLet's identify the line of symmetry.",
          instructionText: 'Tap "Start" to begin.',
        },
        page2: {
          headerText: "Lines of Symmetry in Shapes",
          instruction: "Tap on a line to see if it's a line of symmetry, then answer the question.",
          shapeName: "Equilateral Triangle",
          quizPanel: {
            quizSubtype: "QT3",
            questionText: "How many lines of symmetry does the triangle have?",
            options: [
              {
                text: "0",
                iscorrect: false,
                feedback: "Not quite! Try tapping on the lines to see which ones are lines of symmetry.",
              },
              {
                text: "2",
                iscorrect: false,
                feedback: "Not quite! Try tapping on the lines to see which ones are lines of symmetry.",
              },
              {
                text: "3",
                iscorrect: true,
                feedback: "Well done! Equilateral triangles have 3 lines of symmetry.",
              },
            ],
          }

        },
        page3: {
          headerText: "Lines of Symmetry in Shapes",
          instruction: "Tap on a line to see if it's a line of symmetry, then answer the question.",
          shapeName: "Quadrilateral",
          quizPanel: {
            quizSubtype: "QT3",
            questionText: "How many lines of symmetry does the triangle have?",
            options: [
              {
                text: "0",
                iscorrect: false,
                feedback: "Not quite! Try tapping on the lines to see which ones are lines of symmetry.",
              },
              {
                text: "2",
                iscorrect: false,
                feedback: "Not quite! Try tapping on the lines to see which ones are lines of symmetry.",
              },
              {
                text: "3",
                iscorrect: true,
                feedback: "Well done! Equilateral triangles have 3 lines of symmetry.",
              },
            ],
          }

        },
        page4: {
          headerText: "Lines of Symmetry in Shapes",
          instruction: "Tap on a line to see if it's a line of symmetry, then answer the question.",
          shapeName: "Kite",
          quizPanel: {
            quizSubtype: "QT3",
            questionText: "How many lines of symmetry does the triangle have?",
            options: [
              {
                text: "0",
                iscorrect: false,
                feedback: "Not quite! Try tapping on the lines to see which ones are lines of symmetry.",
              },
              {
                text: "2",
                iscorrect: false,
                feedback: "Not quite! Try tapping on the lines to see which ones are lines of symmetry.",
              },
              {
                text: "3",
                iscorrect: true,
                feedback: "Well done! Equilateral triangles have 3 lines of symmetry.",
              },
            ],
          }

        },
        page5: {
          headerText: "Lines of Symmetry in Shapes",
          instruction: "Tap on a line to see if it's a line of symmetry, then answer the question.",
          shapeName: "Rectangle",
          quizPanel: {
            quizSubtype: "QT3",
            questionText: "How many lines of symmetry does the triangle have?",
            options: [
              {
                text: "0",
                iscorrect: false,
                feedback: "Not quite! Try tapping on the lines to see which ones are lines of symmetry.",
              },
              {
                text: "2",
                iscorrect: false,
                feedback: "Not quite! Try tapping on the lines to see which ones are lines of symmetry.",
              },
              {
                text: "3",
                iscorrect: true,
                feedback: "Well done! Equilateral triangles have 3 lines of symmetry.",
              },
            ],
          }

        },
        page6: {
          headerText: "Lines of Symmetry in Shapes",
          instruction: "Tap on a line to see if it's a line of symmetry, then answer the question.",
          shapeName: "Rhombus",
          quizPanel: {
            quizSubtype: "QT3",
            questionText: "How many lines of symmetry does the triangle have?",
            options: [
              {
                text: "0",
                iscorrect: false,
                feedback: "Not quite! Try tapping on the lines to see which ones are lines of symmetry.",
              },
              {
                text: "2",
                iscorrect: false,
                feedback: "Not quite! Try tapping on the lines to see which ones are lines of symmetry.",
              },
              {
                text: "3",
                iscorrect: true,
                feedback: "Well done! Equilateral triangles have 3 lines of symmetry.",
              },
            ],
          }

        },
        page7: {
          title: "Activity Completed!",
          mainText: "You practiced identifying lines of symmetry in different shapes.",
          instructionText: 'Tap "Start Over" to practice again!',
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
