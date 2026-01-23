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
        partsOfAngle: "Parts of an Angle",
        namingAnAngle: "Naming an Angle",
        vertex: "Vertex",
        arms: "Arms",
        measure: "Measure",
        threeCapital: "3 Capital letters",
        greekLetters: "Greek Letters",
      },
      appInfo: {
        title: "What is an Angle?"
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
          title: "What is an Angle?",
          mainText: "Let’s learn to identify the parts of an angle <br/>and how to name an angle.",
          instructionText: 'Tap ‘Start’ to begin.',
        },
        page2: {
          instruction: "Tap a button.",
          sideText: "An <span style='color: orange;'><b>angle</b></span> is defined by the corner point, the rays (or line segments) that span from it, and the region enclosed between the rays about the point."
        },
        page3: {
          instruction: "Click the buttons to notice each part.",
          sideText: "An <span style='color: orange;'><b>angle</b></span> is defined by the corner point, the rays (or line segments) that span from it, and the region enclosed between the rays about the point."
        },
        page4: {
          instruction: "Click the buttons to notice each part.",
          sideText: "The corner point is called the <span style='color: orange;'><b>vertex</b></span> of the angle. It is the common point to both the rays forming the angle."
        },
        page5: {
          instruction: "Click the buttons to notice each part.",
          sideText: "The rays are referred to as <span style='color: orange;'><b>arms</b></span> or <span style='color: orange;'><b>legs</b></span> of the angle. Sometimes these might be line segments too. These form the bounding of the angle."
        },
        page6: {
          instruction: "Click the buttons to notice each part.",
          sideText: "The region bounded between the arms and the point is the measure of the <span style='color: orange;'><b>angle</b></span>"
        },
        page7: {
          instruction: "Tap a button.",
          sideText: "An <span style='color: orange;'><b>angle</b></span> is defined by the corner point, the rays (or line segments) that span from it, and the region enclosed between the rays about the point."
        },
        page8: {
          instruction: "Tap a button.",
          sideText: "We can name an <span style='color: orange;'><b>angle</b></span> in three different ways!<br/><br/>To name an angle, we use the angle symbol (∠).An arc shows which angle is being considered."
        },
        page9: {
          instruction: "Tap a button.",
          angleText: "∠AOB = 50°  or ∠BOA = 50°",
          sideText: "<span style='color: orange;'><b>Angles</b></span> are named using a point on one arm, the vertex, and a point on the other arm. <br/><br/>The vertex is written in the middle and the other two letters lie on the arms of the angle."
        },
        page10: {
          instruction: "Tap a button.",
          angleText: "∠O = 50°",
          sideText: "An <span style='color: orange;'><b>angle</b></span> can be named using only the <span style='color: orange;'><b>vertex letter</b></span> when there is only one angle at that vertex."
        },
        page11: {
          instruction: "Tap 'Start Over' to reload the activity.",
          angleText: "θ = 50°",
          sideText: "<span style='color: orange;'><b>Angles</b></span> can also be named using Greek letters, such as ∠α, ∠β, ∠θ, or ∠ω."
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
