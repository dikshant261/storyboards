// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlight1 = "#FFD700";
const highlight2 = "#00FF7F";
const highlight3 = "#25CEFC";
const highlight4 = "#F28283";
const highlight5 = '#8A2BE2';
const questionTextSize = '24gc';

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
        letsCompare: "Let’s Compare :",
        greaterSign: ">",
        lessSign: "<",
        aText: "a",
        bText: "b",
        mixA: "Mix A",
        mixB: "Mix B",
        mixC: "Mix C",
        crossProduct: "Cross\nProducts",
        questionText: "The length of the shorter side of this right-angled triangle, labelled a, is ______ cm.Fill in the blank.",
        questionTextTwo: "The length of the shorter side of this right-angled triangle, labelled a, is 17 cm.Fill in the blank.",
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
          introduction: "Let’s find the length of the shorter side.",
        },
        page2: {
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QTI4R",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText: "Look carefully at the triangle.Which side should be noted as the hypotenuse.",
            imageText: "",
            options: [
              {
                text: "The side that forms the right angle",
                iscorrect: false,
                feedback:
                  " Incorrect! Try again!",
              },
              {
                text: "The side opposite the right angle",
                iscorrect: true,
                feedback: "Awesome.",
              },
              {
                text: "Any of the two shorter sides",
                iscorrect: false,
                feedback: "Incorrect! Try again!",
              },
              {
                text: " The base of the triangle",
                iscorrect: false,
                feedback:
                  "Incorrect! Try again!",
              },
            ],
            keyConcepts: [

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
            keyConcepts: [],
            impFormulae: [],
          },
        },
        page3: {
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QTI4R",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText: "The area of the square on the hypotenuse is 338 square units.How can we find the length of the hypotenuse?",
            imageText: "",
            options: [
              {
                text: "Divide 338 by 2",
                iscorrect: false,
                feedback:
                  " Incorrect! Try again!",
              },
              {
                text: "Subtract 7 from 338",
                iscorrect: false,
                feedback: "Incorrect! Try again!",
              },
              {
                text: "Take the square root of 338",
                iscorrect: true,
                feedback: "Awesome.",
              },
              {
                text: "Multiply 338 by 2",
                iscorrect: false,
                feedback:
                  "Incorrect! Try again!",
              },
            ],
            keyConcepts: [

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
            keyConcepts: [],
            impFormulae: [],
          },
        },
        page4: {
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QTI4R",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText: "What is the square root of 338?",
            imageText: "",
            options: [
              {
                text: "16",
                iscorrect: false,
                feedback:
                  " Incorrect! Try again!",
              },
              {
                text: "17",
                iscorrect: false,
                feedback: "Incorrect! Try again!",
              },
              {
                text: "18.4",
                iscorrect: true,
                feedback: "Awesome.",
              },
              {
                text: "19",
                iscorrect: false,
                feedback:
                  "Incorrect! Try again!",
              },
            ],
            keyConcepts: [

            ],
            impFormulae: [
              {
                text: "Hypotenuse c = √ 338 cm²",
                color: highlight4,
              },
            ],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [],
            impFormulae: [],
          },
        },
        page5: {
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QTI4R",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText: "In the figure, the side of the square on one side of the right triangle is given as 7 cm.Which side of the triangle does this measurement represent?",
            imageText: "",
            options: [
              {
                text: "The hypotenuse",
                iscorrect: false,
                feedback:
                  " Incorrect! Try again!",
              },
              {
                text: "One of the sides forming the right angle ",
                iscorrect: true,
                feedback: "Awesome.",
              },
              {
                text: "The side opposite the hypotenuse",
                iscorrect: false,
                feedback: "Incorrect! Try again!",
              },
              {
                text: "None of these",
                iscorrect: false,
                feedback:
                  "Incorrect! Try again!",
              },
            ],
            keyConcepts: [

            ],
            impFormulae: [
              {
                text: "c = 18.4",
                color: highlight4,
              },
            ],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [],
            impFormulae: [{
              text: "Hypotenuse c = √ 338 cm²",
              color: highlight4,
            },],
          },
        },
        page6: {
          highlights: [
            {
              text: "labelled a, is ______ cm",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "28gc",
              bold: true,
              underline: false,
            },

          ],
          conceptSummary: {
            given: [

              {
                text: "One of the shorter side ‘b’ = 7 cm",
                color: highlight1
              }
            ],
            toFind: [
              {
                text: " Find the other side ‘a’ ",
                color: highlight3
              }
            ],
            keyConcepts: [],
            impFormulae: [
              {
                text: "Hypotenuse c = √ 338 cm²",
                color: highlight4,
              },
              {
                text: "c = 18.4",
                color: highlight4,
              },
            ],
          },
        },
        page7: {
          highlights: [
            {
              text: "labelled a, is ______ cm",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "28gc",
              bold: true,
              underline: false,
            },

          ],

          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QTI4R",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText: "Which of the following shows the correct relation to find the value of the shorter side ‘a’ in a right-angled triangle?",

            imageText: "",
            options: [
              {
                text: "a  =√b<sup>2</sup> + c<sup>2</sup>",
                iscorrect: false,
                feedback:
                  " Incorrect! Try again!",
              },
              {
                text: "a  = √c<sup>2</sup> + b",
                iscorrect: false,
                feedback: "Incorrect! Try again!",
              },
              {
                text: "a  = √c<sup>2</sup> - b<sup>2</sup>",
                iscorrect: true,
                feedback: "Awesome.",
              },
              {
                text: "a  = √c - b<sup>2</sup>",
                iscorrect: false,
                feedback:
                  "Incorrect! Try again!",
              },
            ],
            keyConcepts: [

            ],
            impFormulae: [
            ],
          },
          conceptSummary: {
            given: [

              {
                text: "One of the shorter side ‘b’ = 7 cm",
                color: highlight1
              }
            ],
            toFind: [
              {
                text: " Find the other side ‘a’ ",
                color: highlight3
              }
            ],
            keyConcepts: [],
            impFormulae: [
              {
                text: "Hypotenuse c = √ 338 cm²",
                color: highlight4,
              },
              {
                text: "c = 18.4",
                color: highlight4,
              },
            ],
          },
        },
        page8: {
          highlights: [
            {
              text: "7.2 litres of white paint with 4.8 litres of blue paint",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "To prepare a larger batch of the same shade",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "12 litres of white paint",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How many litres of blue paint should be added to get the same shade",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          instructionText: "\\frac{7.2\\;L}{12\\;L} = \\frac{4.8\\;L}{X\\;L}",
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT3R",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText:
              "If two ratios of distance to fuel given in the table are proportional, then - ",
            imageText: "",
            options: [
              {
                text: "7.2 × 4.8 = X × 12",
                iscorrect: false,
                feedback: "Not quite! Try again.",
              },
              {
                text: "7.2 × X = 12 × 4.8",
                iscorrect: true,
                feedback: "Great Job!",
              },
              {
                text: "7.2 × 12 =X  × 4.8",
                iscorrect: false,
                feedback: "Not quite! Try again.",
              },
            ],
            keyConcepts: [

            ],
            impFormulae: [
              {
                text: "\\frac{7.2\\;L}{12\\;L} = \\frac{4.8\\;L}{X\\;L}",
                color: highlight2
              },
            ],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "If p : q is proportional to r : s, then \\frac{p}{q} = \\frac{r}{s}",
                color: highlight2,
              },
            ],
            impFormulae: [],
          },
        },
        page9: {

          summaryText: "Labeled <span style='background-color:#FFD700'>‘a’  is 17 cm",
          conceptSummary: {
            given: [


            ],
            toFind: [

            ],
            keyConcepts: [],
            impFormulae: [
              {
                text: "c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup>",
                color: highlight2,
              },
              {
                text: "a =√18.4<sup>2</sup> - 7<sup>2</sup> ",
                color: highlight2,
              },
              {
                text: "a =√ 338 - 49",
                color: highlight2,
              },
              {
                text: "a =√ 289",
                color: highlight2,
              },
              {
                text: "a = 17",
                color: highlight2,
              },
            ],
          },
          activityCompleted: "Activity Completed!"
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
