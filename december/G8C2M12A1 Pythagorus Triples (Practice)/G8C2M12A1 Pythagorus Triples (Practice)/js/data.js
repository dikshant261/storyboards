// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlight1 = "#FFD700";
const highlight2 = "#70ACC7";
const highlight3 = "#F28283";
const highlight4 = "#00FF7F";
const highlight5 = '#8A2BE2';
const questionTextSize = '28gc';

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
      },

      common: {
        questionIcon: "Q",
        rollerCoasterLabel: "Science Club",
        merryGoRoundLabel: "Art Club",
        ratioSeparator: ":",
        questionText:
          "Prove that among the following groups of three numbers, which one is the correct one? Which is a Pythagorean triple.\na. 24, 17, 25 \nb. 7, 13, 11 \nc. 6, 2½, 6½",
        labels: {
          a: "a = ",
          b: "b = ",
          c: "c = ",
          dropHere: "Drop here",
        },
        informationAnalysis: {
          header: "INFORMATION ANALYSIS",
          facts: "Facts",
          values: "Value",
          toFind: "To Find",
        },
        tableHeaders: {
          quantity: "Quantity",
          coffee: "Coffee (in tsp)",
          sugar: "Sugar (in tsp)",
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
          introduction:
            "Let’s find which set of numbers forms a right triangle.",
        },
        page2: {
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4R",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText:
              "Given that p, q, and r are Pythagorean triples with p < q < r, choose the correct option.",
            imageText: "",
            options: [
              {
                text: "p<sup>2</sup> = q<sup>2</sup> + r<sup>2</sup>",
                iscorrect: false,
                feedback: " That’s not right! Try again.",
              },
              {
                text: "q<sup>2</sup> = p<sup>2</sup> - r<sup>2</sup>",
                iscorrect: false,
                feedback: " That’s not right! Try again.",
              },
              {
                text: "r<sup>2</sup> = p<sup>2</sup> - q<sup>2</sup>",
                iscorrect: false,
                feedback: " That’s not right! Try again.",
              },
              {
                text: "r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup>",
                iscorrect: true,
                feedback: "Good!",
              },
            ],
            keyConcepts: [
              {
                text: "<span>r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup></span>",
                color: highlight4,
              },
            ],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },

          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: "",
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },
        },
        page3: {
          fillBlanks: {
            instructionText: "Drag the numbers to the correct boxes.",
            options: [
              {
                id: "opt1",
                text: "24",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank3", text: "24" }],
              },
              {
                id: "opt2",
                text: "17",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank2", text: "17" }],
              },
              {
                id: "opt3",
                text: "25",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank1", text: "25" }],
              },
            ],
            containers: {},
            impFormulae: [],
            keyConcepts: [
              {
                text: "<span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup></span>",
                color: highlight4,
              },
            ],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "<span>r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup></span>",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page4: {
          questionTable: {
            headers: [
              "<span>c<sup>2</sup></span>",
              "<span>a<sup>2</sup> + b<sup>2</sup></span>",
            ],
            rows: [
              [
                "<span>25<sup>2</sup></span>",
                "<span>24<sup>2</sup> + 17<sup>2</sup></span>",
              ],
            ],
          },
          labels: {
            aOne: "a = 24",
            bOne: "b = 17",
            cOne: "c = 25",
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT2",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText:
              "Is <span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup> ?</span>",
            imageText: "",
            options: [
              {
                text: "Yes",
                iscorrect: false,
                feedback: " Try again!",
              },
              {
                text: "No",
                iscorrect: true,
                feedback: "Awesome!",
              },
            ],
            keyConcepts: [
              {
                text: "<span>25<sup>2</sup> = 17<sup>2</sup> + 25<sup>2</sup></span><br/> 625 = 289 + 576 <br/> 625 ≠ 865",
                color: highlight4,
              },
            ],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "<span>r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup></span>",
                color: highlight4,
              },
              {
                text: "<span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup></span>",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page5: {
          introduction:
            "Since the L.H.S. <span style='background-color:#FFD700'>is not equal to the R.H.S., 24, 17, and 25 do not form a Pythagorean triple</span>.\n\nLet’s check the next set of numbers, 7, 13, 11.",
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "<span>r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup></span>",
                color: highlight4,
              },
              {
                text: "<span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup></span>",
                color: highlight4,
              },
              {
                text: "<span>25<sup>2</sup> = 17<sup>2</sup> + 25<sup>2</sup></span><br/> 625 = 289 + 576 <br/> 625 ≠ 865",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page6: {
          fillBlanks: {
            instructionText: "Drag the numbers to the correct boxes.",
            options: [
              {
                id: "opt1",
                text: "13",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank2", text: "24" }],
              },
              {
                id: "opt2",
                text: "7",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank3", text: "17" }],
              },
              {
                id: "opt3",
                text: "11",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank1", text: "25" }],
              },
            ],
            containers: {},
            impFormulae: [],
            keyConcepts: [
              {
                text: "<span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup></span>",
                color: highlight4,
              },
            ],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "<span>r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup></span>",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page7: {
          questionTable: {
            headers: [
              "<span>c<sup>2</sup></span>",
              "<span>a<sup>2</sup> + b<sup>2</sup></span>",
            ],
            rows: [
              [
                "<span>11<sup>2</sup></span>",
                "<span>7<sup>2</sup> + 13<sup>2</sup></span>",
              ],
            ],
          },
          labels: {
            aOne: "a = 7",
            bOne: "b = 13",
            cOne: "c = 11",
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT2",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText:
              "Is <span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup> ?</span>",
            imageText: "",
            options: [
              {
                text: "Yes",
                iscorrect: false,
                feedback: " Try again!",
              },
              {
                text: "No",
                iscorrect: true,
                feedback: "Awesome!",
              },
            ],
            keyConcepts: [
              {
                text: "<span>11<sup>2</sup> = 7<sup>2</sup> + 13<sup>2</sup></span><br/> 121 = 49 + 169 <br/> 121 ≠ 218",
                color: highlight4,
              },
            ],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "<span>r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup></span>",
                color: highlight4,
              },
              {
                text: "<span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup></span>",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page8: {
          introduction:
            "Since the L.H.S. <span style='background-color:#FFD700'>is not equal to the R.H.S., 7, 13, and 11 do not form a Pythagorean triple</span>.\n\nLet’s check the next set of numbers, 6, 2½, 6½",
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "<span>r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup></span>",
                color: highlight4,
              },
              {
                text: "<span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup></span>",
                color: highlight4,
              },
              {
                text: "<span>11<sup>2</sup> = 7<sup>2</sup> + 13<sup>2</sup></span><br/> 121 = 49 + 169 <br/> 121 ≠ 218",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page9: {
          fillBlanks: {
            instructionText: "Drag the numbers to the correct boxes.",
            options: [
              {
                id: "opt1",
                text: "6",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank3", text: "6" }],
              },
              {
                id: "opt2",
                text: "6½",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank1", text: "6½" }],
              },
              {
                id: "opt3",
                text: "2½",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank2", text: "2½" }],
              },
            ],
            containers: {},
            impFormulae: [],
            keyConcepts: [
              {
                text: "<span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup></span>",
                color: highlight4,
              },
            ],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "<span>r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup></span>",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page10: {
          questionTable: {
            headers: [
              "<span>c<sup>2</sup></span>",
              "<span>a<sup>2</sup> + b<sup>2</sup></span>",
            ],
            rows: [
              [
                "<span>6½<sup>2</sup></span>",
                "<span>6<sup>2</sup> + 2½<sup>2</sup></span>",
              ],
            ],
          },
          labels: {
            aOne: "a = 6",
            bOne: "b = 2½",
            cOne: "c = 6½",
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT2",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText:
              "Is <span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup> ?</span>",
            imageText: "",
            options: [
              {
                text: "Yes",
                iscorrect: true,
                feedback: "Awesome!",
              },
              {
                text: "No",
                iscorrect: false,
                feedback: "Try again!",
              },
            ],
            keyConcepts: [
              {
                text: "<span>6½<sup>2</sup> = 6<sup>2</sup> + 2½<sup>2</sup></span><br/> 42.25 = 36 + 6.25 <br/> 42.25 = 42.25",
                color: highlight4,
              },
            ],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "<span>r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup></span>",
                color: highlight4,
              },
              {
                text: "<span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup></span>",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page11: {
          introduction:
            "Since the L.H.S. <span style='background-color:#FFD700'>is  equal to the R.H.S., 6, 2½, and 6½  form a Pythagorean triple.<span>",
          activityCompleted:'Activity Completed!',  
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "<span>r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup></span>",
                color: highlight4,
              },
              {
                text: "<span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup></span>",
                color: highlight4,
              },
              {
                text: "<span>6½<sup>2</sup> = 6<sup>2</sup> + 2½<sup>2</sup></span><br/> 42.25 = 36 + 6.25 <br/> 42.25 = 42.25",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
      },
    },
    id: {},
  }
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
