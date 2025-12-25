// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlight1 = "#FFD700";
const highlight2 = "#70ACC7";
const highlight3 = "rgba(242, 130, 131, 1)";
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
        sixtyDegree: "60°",
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
        questionText: "The angle formed by the diagonal of a rectangle and its shortest side is 60°. Determine the area of the rectangle if the length of the diagonal is 12 cm.",
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
          introduction: "Let’s find the area of rectangle.",
        },
        page2: {
          introduction: "Here is a rectangle ABCD.",
          highlights: [
            {
              text: "rectangle",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
          ],
          informationAnalysis: {
            facts: [
            ],
            values: [],
            toFind: [],
          },
        },
        page3: {
          introduction: "Here is a rectangle ABCD.",
          highlights: [
            {
              text: "diagonal of a rectangle",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: questionTextSize,
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
            questionText: "Which is the diagonal ?",
            imageText: "",
            options: [
              {
                text: "AB",
                iscorrect: false,
                feedback:
                  "Try Again!",
              },
              {
                text: "BD",
                iscorrect: true,
                feedback: "Correct! The diagonal joins opposite corners.",
              },
              {
                text: "BC",
                iscorrect: false,
                feedback: "Try Again!",
              },
              {
                text: "DC",
                iscorrect: false,
                feedback:
                  "Try Again!",
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
          informationAnalysis: {
            facts: [
            ],
            values: [],
            toFind: [],
          },
        },
        page4: {
          highlights: [
            {
              text: "The angle formed by the diagonal of a rectangle and its shortest side is 60°.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "∠DBC = 60<sup>o</sup> and ∠ADB = 60<sup>o</sup>",
                color: highlight2
              }
            ],
            values: [],
            toFind: [
            ],
          },
        },

        page5: {
          highlights: [
            {
              text: "The angle formed by the diagonal of a rectangle and its shortest side is 60°.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: " if the length of the diagonal is 12 cm.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "∠DBC = 60<sup>o</sup> and ∠ADB = 60<sup>o</sup>",
                color: highlight2
              },
              {
                text: "Length of the diagonal = 12 cm",
                color: highlight1
              }
            ],
            values: [],
            toFind: [
            ],
          },
        },
        page6: {
          highlights: [
            {
              text: "The angle formed by the diagonal of a rectangle and its shortest side is 60°.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: " if the length of the diagonal is 12 cm.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: "Determine the area of the rectangle",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "∠DBC = 60<sup>o</sup> and ∠ADB = 60<sup>o</sup>",
                color: highlight2
              },
              {
                text: "Length of the diagonal = 12 cm",
                color: highlight1
              }
            ],
            values: [],
            toFind: [
              {
                text: "Area of Rectangle",
                color: highlight3
              }
            ],
          },
        },

        page7: {
          highlights: [
            {
              text: "The angle formed by the diagonal of a rectangle and its shortest side is 60°.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: " if the length of the diagonal is 12 cm.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: "Determine the area of the rectangle",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
          ],
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText: "What is the measure of ∠BDC?",
            imageText: "",
            options: [
              {
                text: "30°",
                iscorrect: true,
                feedback:
                  "Corrcted",
              },
              {
                text: "60°",
                iscorrect: false,
                feedback: "Try Again!",
              },
              {
                text: "45°",
                iscorrect: false,
                feedback:
                  "Try Again!",
              },
              {
                text: "75°",
                iscorrect: false,
                feedback:
                  "Try Again!",
              },
            ],
            keyConcepts: [
              {
                text: "",
                color: highlight4,
              },
            ],
            impFormulae: [
              {
                text: "∠BDC = 30°",
                color: highlight4
              }
            ],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [],
            impFormulae: [],
          },
        },
        page8: {
          highlights: [
            {
              text: "The angle formed by the diagonal of a rectangle and its shortest side is 60°.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: " if the length of the diagonal is 12 cm.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: "Determine the area of the rectangle",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
          ],
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText: "What is the measure of ∠BDC?",
            imageText: "",
            options: [
              {
                text: "60°",
                iscorrect: false,
                feedback: "Try Again!",
              },
              {
                text: "30°",
                iscorrect: true,
                feedback:
                  "Corrcted",
              },
              {
                text: "45°",
                iscorrect: false,
                feedback:
                  "Try Again!",
              },
              {
                text: "75°",
                iscorrect: false,
                feedback:
                  "Try Again!",
              },
            ],
            keyConcepts: [
              {
                text: "",
                color: highlight4,
              },
            ],
            impFormulae: [
              {
                text: "∠ABD = 30°",
                color: highlight4
              }
            ],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [],
            impFormulae: [{
              text: "∠BDC = 30°",
              color: highlight4
            }],
          },
        },
        page9: {
          highlights: [
            {
              text: "The angle formed by the diagonal of a rectangle and its shortest side is 60°.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: " if the length of the diagonal is 12 cm.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: "Determine the area of the rectangle",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
          ],
          questionTable: {
            headers: [
              "a",
              "b",
              "c",

            ],
            rows: [["", "", ""]],
          },
          fillBlanks: {
            instructionText:
              "Choose the correct values for the side length ratio a:b:c for a 30° - 60° - 90° triangle ?",
            options: [
              {
                id: "opt1",
                text: "1",
                feedbackText: "move to the next box.",
                blankID: [{ bid: "blank1", text: "1" }],
              },
              {
                id: "opt2",
                text: "2",
                feedbackText: "Try Again!",
                blankID: [],
              },
              {
                id: "opt3",
                text: "√3",
                feedbackText: "Try Again!",
                blankID: [],
              },
            ],
            keyConcepts: [],
            impFormulae: [],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [],
            impFormulae: [{
              text: "∠BDC = 30°",
              color: highlight4
            },
            {
              text: "∠ABD = 30°",
              color: highlight4
            }
            ],
          },
        },
        page10: {
          highlights: [
            {
              text: "The angle formed by the diagonal of a rectangle and its shortest side is 60°.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: " if the length of the diagonal is 12 cm.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: "Determine the area of the rectangle",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
          ],
          questionTable: {
            headers: [
              "a",
              "b",
              "c",

            ],
            rows: [["1", "", ""]],
          },
          fillBlanks: {
            instructionText:
              "Choose the correct values for the side length ratio a:b:c for a 30° - 60° - 90° triangle ?",
            options: [
              {
                id: "opt1",
                text: "1",
                feedbackText: "Try Again!",

              },
              {
                id: "opt2",
                text: "2",
                feedbackText: "Try Again!",
              },
              {
                id: "opt3",
                text: "√3",
                feedbackText: "move to the next box.",
                blankID: [{ bid: "blank1", text: "√3" }],
              },
            ],
            keyConcepts: [],
            impFormulae: [],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [],
            impFormulae: [{
              text: "∠BDC = 30°",
              color: highlight4
            },
            {
              text: "∠ABD = 30°",
              color: highlight4
            }
            ],
          },
        },
        page11: {
          highlights: [
            {
              text: "The angle formed by the diagonal of a rectangle and its shortest side is 60°.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: " if the length of the diagonal is 12 cm.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: "Determine the area of the rectangle",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
          ],
          questionTable: {
            headers: [
              "a",
              "b",
              "c",

            ],
            rows: [["1", "√3", ""]],
          },
          fillBlanks: {
            instructionText:
              "Choose the correct values for the side length ratio a:b:c for a 30° - 60° - 90° triangle ?",
            options: [
              {
                id: "opt1",
                text: "1",
                feedbackText: "Try Again!",

              },
              {
                id: "opt2",
                text: "2",

                feedbackText: "move to the next box.",
                blankID: [{ bid: "blank1", text: "2" }],
              },
              {
                id: "opt3",
                text: "√3",
                feedback: "Try Again!"
              },
            ],
            keyConcepts: [],
            impFormulae: [
              {
                text: '1 : √3 : 2',
                color: highlight4
              }
            ],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [],
            impFormulae: [{
              text: "∠BDC = 30°",
              color: highlight4
            },
            {
              text: "∠ABD = 30°",
              color: highlight4
            }
            ],
          },
        },
        page12: {
          highlights: [
            {
              text: "The angle formed by the diagonal of a rectangle and its shortest side is 60°.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: " if the length of the diagonal is 12 cm.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: "Determine the area of the rectangle",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
          ],
          questionTable: {
            headers: [
              "a",
              "b",
              "c",

            ],
            rows: [["1", "√3", "2"], ["", "", "12"]],
          },
          fillBlanks: {
            instructionText:
              "What number should the terms of the ratio 1 : √3 : 2 be scaled up by?",
            options: [
              {
                id: "opt1",
                text: "3",
                feedbackText: "Try Again!",

              },
              {
                id: "opt2",
                text: "6",
                feedbackText: "Correct",
                blankID: [{ bid: "blank1", text: "6" }],
              },
              {
                id: "opt3",
                text: "1",
                feedbackText: "Try Again!",
              },
            ],
            keyConcepts: [],
            impFormulae: [],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [],
            impFormulae: [{
              text: "∠BDC = 30°",
              color: highlight4
            },
            {
              text: "∠ABD = 30°",
              color: highlight4
            },
            {
              text: '1 : √3 : 2',
              color: highlight4
            }
            ],
          },
        },
        page13: {
          highlights: [
            {
              text: "The angle formed by the diagonal of a rectangle and its shortest side is 60°.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: " if the length of the diagonal is 12 cm.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: "Determine the area of the rectangle",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
          ],
          questionTable: {
            headers: [
              "a",
              "b",
              "c",

            ],
            rows: [["1", "√3", "2"], ["6", "6√3", "12"]],
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT3",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText: "Which of the following is the correct formula of area of rectangle?",
            imageText: "",
            options: [
              {
                text: "A = length × Breadth ",
                iscorrect: true,
                feedback:
                  "Awesome.",
              },
              {
                text: "A = length + Breadth",
                iscorrect: false,
                feedback: "Not quite! Try Again.",
              },
              {
                text: "A =  (length + Breadth)<sup>2</sup>",
                iscorrect: false,
                feedback:
                  "Not quite! Try Again.",
              },
            ],
            keyConcepts: [

            ],
            impFormulae: [
              {
                text: "Short side BC= 6 √3 cm",
                color: highlight4,
              },
              {
                text: "Long side DC = 6 cm",
                color: highlight4
              },
              {
                text: "Diagonal DB = 12 cm",
                color: highlight4
              },
              {
                text: "Area of rectangle = Length × Breadth",
                color: highlight4
              }
            ],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [],
            impFormulae: [{
              text: "∠BDC = 30°",
              color: highlight4
            },
            {
              text: "∠ABD = 30°",
              color: highlight4
            },
            {
              text: '1 : √3 : 2',
              color: highlight4
            }
            ],
          },
        },
        page14: {
          highlights: [
            {
              text: "The angle formed by the diagonal of a rectangle and its shortest side is 60°.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: " if the length of the diagonal is 12 cm.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: "Determine the area of the rectangle",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
          ],
          questionTable: {
            headers: [
              "a",
              "b",
              "c",

            ],
            rows: [["1", "√3", "2"], ["6", "6√3", "12"]],
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText: "Area of rectangle =",
            imageText: "",
            options: [
              {
                text: "36 cm²",
                iscorrect: false,
                feedback:
                  "Try Again!",
              },
              {
                text: "36√3 cm²",
                iscorrect: true,
                feedback: "Awesome",
              },
              {
                text: "72 cm²",
                iscorrect: false,
                feedback:
                  "Try Again.",
              },
              {
                text: "12√3 cm²",
                iscorrect: false,
                feedback:
                  "Try Again.",
              },
            ],
            keyConcepts: [

            ],
            impFormulae: [
              {
                text: "=6  × 6 √3<br/>Area of the rectangle = 36√3 cm²",
                color: highlight4
              }
            ],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [],
            impFormulae: [{
              text: "∠BDC = 30°",
              color: highlight4
            },
            {
              text: "∠ABD = 30°",
              color: highlight4
            },
            {
              text: '1 : √3 : 2',
              color: highlight4
            },
            {
              text: "Short side BC= 6 √3 cm",
              color: highlight4,
            },
            {
              text: "Long side DC = 6 cm",
              color: highlight4
            },
            {
              text: "Diagonal DB = 12 cm",
              color: highlight4
            },
            {
              text: "Area of rectangle = Length × Breadth",
              color: highlight4
            }
            ],
          },
        },
        page15: {
          highlights: [
            {
              text: "The angle formed by the diagonal of a rectangle and its shortest side is 60°.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: " if the length of the diagonal is 12 cm.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: "Determine the area of the rectangle",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
          ],

          summaryText: 'The area of the rectangle <span style="background-color:#FFD700">is 36√3 cm²</span>',
          activityCompleted:"Activity Completed!",
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [],
            impFormulae: [{
              text: "∠BDC = 30°",
              color: highlight4
            },
            {
              text: "∠ABD = 30°",
              color: highlight4
            },
            {
              text: '1 : √3 : 2',
              color: highlight4
            },
            {
              text: "Short side BC= 6 √3 cm",
              color: highlight4,
            },
            {
              text: "Long side DC = 6 cm",
              color: highlight4
            },
            {
              text: "Diagonal DB = 12 cm",
              color: highlight4
            },
            {
              text: "Area of rectangle = Length × Breadth",
              color: highlight4
            },
            {
              text: "=6  × 6 √3<br/>Area of the rectangle = 36√3 cm²",
              color: highlight4
            }
            ],
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
