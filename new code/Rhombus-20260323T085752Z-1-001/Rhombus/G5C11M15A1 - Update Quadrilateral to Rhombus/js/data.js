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
      appInfo: {
        title: "Interactive Math Learning Applet",
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        check: "CHECK",
      },

      common: {
        questionText:
          "Observe the map of Indonesia and its\n explanation carefully. Measure the length of the thick black line. That line represents 175 km. Complete\n the table below.",
        labels: {
          times4: "×4",
          timesQuestion: "×?",
          dropHere: "Drop here",
        },
        tableHeading: "Length on the Map and Actual Distance",
        informationAnalysis: {
          header: "INFORMATION ANALYSIS",
          facts: "Facts",
          values: "Value",
          toFind: "To Find",
        },
        tableHeaders: {
          cityToCity: "City to City",
          lengthOnMap: "Length on map (cm)",
          actualDistance: "Actual distance (km)",
        },
        conceptSummary: {
          header: "CONCEPT SUMMARY",
          given: "Given",
          toFind: "To Find",
          keyConcepts: "Key Concepts",
          importantFormulae: "Calculations",
        },
      },

      pages: {
        page1: {
          title: "Build a Rhombus",
          text1: "A 4-sided polygon is called a quadrilateral.",
          text2: "Rhombus is a special quadrilateral.",
          text3: "Let's explore what makes a quadrilateral a rhombus.",
          startButton: "Start",
          sideHeading: "Let's solve this challenge by finding scale factors.",
          instructionText: {
            tapAfterReading: "Tap » after reading the question. ",
          },
          mapTable: {
            headers: ["", "", ""],
            rows: [
              ["Black line", "", "175"],
              ["Jakarta–Jayapura", "", ""],
              ["Jakarta–Medan", "", ""],
              ["Jakarta–Palangkaraya", "", ""],
            ],
          },
        },
        page2: {
          header: "Move the vertices of the quadrilateral to match the green shape.",
          instruction: "Drag the vertices to make the required shape.",
          successHeader: "Good Job! This shape is a {shapeName}!",
          successInstruction: "Tap » to see what makes this shape a {shapeName}.",
          successMessage: "Perfect! You created a rhombus!",
        },
        page3: {
          header: "Notice the <span style=\"color: white;\">length of each side</span> of the shape",
          replayButton: "Replay Visualisation",
          measureAngle: "measure of each angle",
          propertyAllSidesEqual: "all sides equal",
          propertyAllAnglesRight: "all angles are right angles",
          noticePropertyOfShape: "Notice the {propertyText} of the {shapeName}",
          noticePropertyOfTheShape: "Notice the {propertyText} of the shape.",
          completionInstruction: "Tap Replay to see the visualization again or » for summary.",
          completionSummary: "<span style=\"color: white;\">All sides</span> of a Rhombus are of the <span style=\"color: white;\">same length</span>.",
          properties: {
            lengthEachSide: "length of each side",
          },
        },
        page4: {
          header: "Rhombus",
          definition: "A Rhombus is a special quadrilateral with all 4 sides of equal length!",
        },
      },
      
      shapes: {
        square: "Square",
        rectangle: "Rectangle",
        rhombus: "Rhombus",
        shape: "Shape",
      },
    },

    id: {
      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Lagi",
        check: "CEK",
      },
      
      pages: {
        page1: {
          title: "Buat Belah Ketupat",
          text1: "Poligon bersisi 4 disebut segi empat.",
          text2: "Belah ketupat adalah segi empat khusus.",
          text3: "Mari kita jelajahi apa yang membuat segi empat menjadi belah ketupat.",
          startButton: "Mulai",
          sideHeading: "Mari kita selesaikan tantangan ini dengan mencari faktor skala.",
          instructionText: {
            tapAfterReading: "Ketuk » setelah membaca pertanyaan. ",
          },
          mapTable: {
            headers: ["", "", ""],
            rows: [
              ["Garis hitam", "", "175"],
              ["Jakarta–Jayapura", "", ""],
              ["Jakarta–Medan", "", ""],
              ["Jakarta–Palangkaraya", "", ""],
            ],
          },
        },
        page2: {
          header: "Pindahkan titik sudut segi empat agar sesuai dengan bentuk hijau.",
          instruction: "Seret titik sudut untuk membuat bentuk yang diperlukan.",
          successHeader: "Bagus! Bentuk ini adalah {shapeName}!",
          successInstruction: "Ketuk » untuk melihat apa yang membuat bentuk ini menjadi {shapeName}.",
          successMessage: "Sempurna! Anda membuat belah ketupat!",
        },
        page3: {
          header: "Perhatikan <span style=\"color: white;\">panjang setiap sisi</span> dari bentuk tersebut",
          replayButton: "Putar Ulang Visualisasi",
          measureAngle: "ukuran setiap sudut",
          propertyAllSidesEqual: "semua sisi sama panjang",
          propertyAllAnglesRight: "semua sudut adalah sudut siku-siku",
          noticePropertyOfShape: "Perhatikan {propertyText} dari {shapeName}",
          noticePropertyOfTheShape: "Perhatikan {propertyText} dari bentuk tersebut.",
          completionInstruction: "Ketuk Putar Ulang untuk melihat visualisasi lagi atau » untuk ringkasan.",
          completionSummary: "<span style=\"color: white;\">Semua sisi</span> belah ketupat <span style=\"color: white;\">sama panjang</span>.",
          properties: {
            lengthEachSide: "panjang setiap sisi",
          },
        },
        page4: {
          header: "Belah ketupat",
          definition: "Belah ketupat adalah segi empat khusus dengan keempat sisi sama panjang!",
        },
      },
      
      shapes: {
        square: "Persegi",
        rectangle: "Persegi Panjang",
        rhombus: "Belah ketupat",
        shape: "Bentuk",
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
