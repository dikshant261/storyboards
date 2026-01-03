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
        questionText: "A triangle is said to be a right triangle if the lengths of its three sides are consecutively.\na) 3 cm, 5 cm, and 6 cm. b) 7 cm, 8 cm, and 12 cm\nc) 5 cm, 12, cm, and 15 cm.  d) 8 cm, 15 cm, and 17 cm",
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
                text: "3",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank3", text: "3" }],
              },
              {
                id: "opt2",
                text: "5",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank2", text: "5" }],
              },
              {
                id: "opt3",
                text: "6",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank1", text: "6" }],
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
                "<span>6<sup>2</sup></span>",
                "<span>3<sup>2</sup> + 5<sup>2</sup></span>",
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
                text: "<span>6<sup>2</sup> = 3<sup>2</sup> + 5<sup>2</sup></span><br/> 36 = 9 + 25 <br/> 36 ≠ 34",
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
            "Since the L.H.S. <span style='background-color:#FFD700'>is not equal to the R.H.S., 3, 5, and 6 are not a right angled triangle</span>.\n\nLet’s check the next set of numbers, 7, 8, 12.",
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
                text: "<span>6<sup>2</sup> = 3<sup>2</sup> + 5<sup>2</sup></span><br/> 36 = 9 + 25 <br/> 36 ≠ 34",
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
                text: "8",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank2", text: "8" }],
              },
              {
                id: "opt2",
                text: "7",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank3", text: "7" }],
              },
              {
                id: "opt3",
                text: "12",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank1", text: "12" }],
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
                "<span>12<sup>2</sup></span>",
                "<span>7<sup>2</sup> + 8<sup>2</sup></span>",
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
                text: "<span>12<sup>2</sup> = 7<sup>2</sup> + 8<sup>2</sup></span><br/> 144 = 49 + 64 <br/> 144 ≠ 113",
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
            "Since the L.H.S. <span style='background-color:#FFD700'>is not equal to the R.H.S., 7, 8, and 12 are not a right angled triangle</span>.\n\nLet’s check the next set of numbers, 5, 12, 15",
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
                text: "<span>12<sup>2</sup> = 7<sup>2</sup> + 8<sup>2</sup></span><br/> 144 = 49 + 64 <br/> 144 ≠ 113",
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
                text: "5",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank3", text: "5" }],
              },
              {
                id: "opt2",
                text: "15",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank1", text: "15" }],
              },
              {
                id: "opt3",
                text: "12",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank2", text: "12" }],
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
                "<span>15<sup>2</sup></span>",
                "<span>5<sup>2</sup> + 12<sup>2</sup></span>",
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
                iscorrect: false,
                feedback: "Try again!",
              },
              {
                text: "No",
                iscorrect: true,
                feedback: "Awesome!",
              },
            ],
            keyConcepts: [
              {
                text: "<span>15<sup>2</sup> = 5<sup>2</sup> + 12<sup>2</sup></span><br/> 225 = 25 + 144 <br/> 225 ≠ 169",
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
            "Since the L.H.S. <span style='background-color:#FFD700'>is  equal to the R.H.S., 5, 12 and 15  are not a right angled triangle</span>\n\nLet’s check the next set of numbers, 8, 15, 17",
          activityCompleted: 'Activity Completed!',
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
                text: "<span>15<sup>2</sup> = 5<sup>2</sup> + 12<sup>2</sup></span><br/> 225 = 25 + 144 <br/> 225 ≠ 169",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page12: {
          fillBlanks: {
            instructionText: "Drag the numbers to the correct boxes.",
            options: [
              {
                id: "opt1",
                text: "8",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank3", text: "8" }],
              },
              {
                id: "opt2",
                text: "17",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank1", text: "17" }],
              },
              {
                id: "opt3",
                text: "15",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank2", text: "15" }],
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
        page13: {
          questionTable: {
            headers: [
              "<span>c<sup>2</sup></span>",
              "<span>a<sup>2</sup> + b<sup>2</sup></span>",
            ],
            rows: [
              [
                "<span>17<sup>2</sup></span>",
                "<span>8<sup>2</sup> + 15<sup>2</sup></span>",
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
                feedback: "Awesome",
              },
              {
                text: "No",
                iscorrect: false,
                feedback: "Try Again!",
              },
            ],
            keyConcepts: [
              {
                text: "<span>17<sup>2</sup> = 8<sup>2</sup> + 15<sup>2</sup></span><br/> 289 = 64 + 225 <br/> 289 = 289",
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
        page14: {
          introduction:
            "Since the L.H.S. <span style='background-color:#FFD700'>is  equal to the R.H.S., 8, 15 and 17  are  a right angled triangle</span>",
          activityCompleted: 'Activity Completed!',
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
                text: "<span>17<sup>2</sup> = 8<sup>2</sup> + 15<sup>2</sup></span><br/> 289 = 64 + 225 <br/> 289 = 289",
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
