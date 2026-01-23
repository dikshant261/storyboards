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

      messages: {
        pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?",
      },

      common: {
        propertyShowcase: {
          headerText: "Properties of a Parallelogram",
          headerDescription: "A parallelogram is a <span style='color: #FF9900;'>quadrilateral</span>- it is a 4-sided polygon",
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
          title: "Properties of a Parallelogram",
          mainText: "Let's explore the side, angle, and diagonal properties of a parallelogram.",
          instructionText: 'Tap "Start" to start the activity.',
        },
        page2: {
          instruction: "Tap » to explore side properties.",
          messageBox: "The given quadrilateral has four sides",
        },
        page3: {
          animationSequence: {
            initialMessage: "Opposite sides are parallel because they maintain the same distance between them.",
            firstPairProvenMessage: "AB and CD are parallel to each other",
            secondPairProvenMessage: "BC and DA are parallel to each other",
            conclusionMessage: "Two pairs of opposite sides are parallel",
            // propertyDescriptionText: "<span style='color: #FF9900;'>1.</span> <span style='color: #FF9900;'>Two pairs</span> <span style='color: #FFFFFF;'>of opposite sides are</span> <span style='color: #FF9900;'>parallel.</span>",
            secondDescriptionText: "<span style='color: #FF9900; font-weight: bold;'>1.</span> <span style='color: #FF9900; font-weight: bold;'>Two pairs</span> <span style='color: #FFFFFF; font-weight: bold;'>of opposite sides are</span> <span style='color: #FF9900; font-weight: bold;'>parallel.</span>",
            secondDescriptionText: "<span style='color: #FF9900; font-weight: bold;'>2.</span> <span style='color: #FF9900; font-weight: bold;'>Two pairs</span> <span style='color: #FFFFFF; font-weight: bold;'>of opposite sides are</span> <span style='color: #FF9900; font-weight: bold;'>equal in length.</span>",
            instructionText: "Tap » to explore angle properties."
          }
        },
        page4: {
          animationSequence: {
            step2DescriptionText: "<span style='color: #FF9900;'>1.</span> <span style='color: #FF9900;'>Two pairs</span> <span style='color: #FFFFFF;'>of opposite angles are</span> <span style='color: #FF9900;'>equal.</span>",
            step3Message: "We see that there are four interior angles.",
            step3AnglesDescriptionText: "A parallelogram has <span style='color: #FF9900; font-weight: bold;'>four interior angles.</span>",
            instructionText: "Tap » to explore diagonal properties."
          }
        },
        page5: {
          animationSequence: {
            step2Message: "AC and BD are two diagonals",
            step3DescriptionText: "A parallelogram has <span style='color: #FF9900;'>2 diagonals.</span>",
            step6Message: "The diagonals are of different lengths.",
            step6DescriptionText: "<span style='color: #FF9900; font-weight: bold;'>1.</span> <span style='color: #FF9900; font-weight: bold;'>Diagonals</span> <span style='color: #FFFFFF; font-weight: bold;'>of a general parallelogram are</span> <span style='color: #FF9900; font-weight: bold;'>not equal.</span>",
            instructionText: "Tap » to explore symmetry properties."
          }
        },
        page6: {
          animationSequence: {
            step2SymmetryMessage: "The shape is not symmetric along the horizontal axis, lets check the vertical axis",
            step4SymmetryMessage: "The shape is not symmetric along the horizontal axis or the vertical axis",
            step5DescriptionText: "A parallelogram has <span style='color: #FF9900; font-weight: bold;'>no line of symmetry.</span>",
            instructionText: "Tap » to summarise."
          }
        },
        page7: {
          title: "Activity Completed!",
          subtitle: "You've explored the key properties of a parallelogram!",
          property1: "1. Opposite sides are equal and parallel.",
          property2: "2. Opposite angles are equal.",
          property3: "3. Diagonals are unequal.",
          property4: "4. It has no lines of symmetry.",
          instruction: 'Tap "Start Over" to restart the activity.',
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
