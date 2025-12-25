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
        questionText: "A special shade of wall paint is made by mixing 7.2 litres of white paint with 4.8 litres of blue paint. To prepare a larger batch of the same shade, a decorator uses 12 litres of white paint. How many litres of blue paint should be added to get the same shade?",
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
          introduction: "Let’s find the amount of blue paint required using cross-multiplication method.",
        },
        page2: {
          highlights: [
            {
              text: "7.2 litres of white paint with 4.8 litres of blue paint",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Mix 1 – White : Blue = 7.2 : 4.8",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [],
          },
        },
        page3: {
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
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Mix 1 – White : Blue = 7.2 : 4.8",
                color: highlight1,
              },
              {
                text: "Same shade of color to be prepared",
                color: highlight2,
              },
            ],
            values: [],
            toFind: [],
          },
        },
        page4: {
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
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Mix 1 – White : Blue = 7.2 : 4.8",
                color: highlight1,
              },
              {
                text: "Same shade of color to be prepared",
                color: highlight2,
              },
              {
                text: "Mix 2 has 12 litres of white paint",
                color: highlight3,
              },
            ],
            values: [],
            toFind: [],
          },
        },

        page5: {
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
          informationAnalysis: {
            facts: [
              {
                text: "Mix 1 – White : Blue = 7.2 : 4.8",
                color: highlight1,
              },
              {
                text: "Same shade of color to be prepared",
                color: highlight2,
              },
              {
                text: "Mix 2 has 12 litres of white paint",
                color: highlight3,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Amount of blue paint in Mix 2 for same shade as Mix 1 ",
                color: highlight4,
              },
            ],
          },
        },
        page6: {
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
          tableHeading: "",
          questionTable: {
            headers: [
              "White<br/>(litres)",
              "Blue<br/>(litres)"
            ],
            rows: [
              ["p", "q"],
              ["r", "s"],
            ],
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText: "If two ratios of white to blue paints given in the table are proportional, then - ",
            imageText: "",
            options: [
              {
                text: "\\frac{p}{s} = \\frac{r}{q}",
                iscorrect: false,
                feedback:
                  "Not quite! Try again.",
              },
              {
                text: "\\frac{p}{s} = \\frac{q}{r}",
                iscorrect: false,
                feedback: "Not quite! Try again.",
              },
              {
                text: "\\frac{p}{q} = \\frac{r}{s}",
                iscorrect: true,
                feedback: "Great job!",
              },
              {
                text: "\\frac{p}{q} = \\frac{s}{r}",
                iscorrect: false,
                feedback:
                  "Not quite! Try again.",
              },
            ],
            keyConcepts: [
              {
                text: "If p : q is proportional to r : s, then \\frac{p}{q} = \\frac{r}{s}",
                color: highlight2,
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
            keyConcepts: [],
            impFormulae: [],
          },
        },
        page7: {
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
          tableHeading:
            "Let’s assume the blue paint aaded to prepare a larger batch 'X' litres.",
          questionTable: {
            headers: ["Mixes", "White<br/>litres", "Blue<br/>(litres)"],
            rows: [
              ["Mix A", "7.2", "4.8"],
              ["Mix B", "12", "X"],
            ],
          },
          instructionText:
            "Since paint A and paint B have same ratio  \\frac{7.2 L}{12 L} = \\frac{4.8\\;}{X\\;L}",
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

          instructionText: "7.2 × X = 4.8 × 12\n x = \\frac{4.8 × 12}{7.2}",
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4R",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText: "Calculate x.",
            imageText: "",
            options: [
              {
                text: "x = 5 L",
                iscorrect: false,
                feedback: "That’s not right! Try again!",
              },
              {
                text: "x = 2.2 L",
                iscorrect: false,
                feedback: " That’s not right! Try again!",
              },
              {
                text: "x = 13 L ",
                iscorrect: false,
                feedback: " That’s not right! Try again!",
              },
              {
                text: "x = 8 L",
                iscorrect: true,
                feedback: "Great Job!",
              },
            ],
            keyConcepts: [

            ],
            impFormulae: [
              {
                text: "7.2 × X = 4.8 × 12\n x = \\frac{4.8 × 12}{7.2}",
                color: highlight2,
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
            impFormulae: [
              {
                text: "\\frac{7.2\\;L}{12\\;L} = \\frac{4.8\\;L}{X\\;L}",
                color: highlight2
              },
            ],
          },
        },
        page10: {
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
          tableHeading: "",
          questionTable: {
            headers: ["Mixes", "White<br/>(litres)", "Blue<br/>(litres)"],
            rows: [
              ["Mix 1", "7.2", "4.8"],
              ["Mix 2", "12", "8"],
            ],
          },
          instructionText:
            "To prepare a larger batch of the same shade,<span style='background-color:#FFD700'>8 litres of blue paint should be added to get the same shade</span>",

          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "If p : q is proportional to r : s, then \\frac{p}{q} = \\frac{r}{s}",
                color: highlight2,
              },

            ],
            impFormulae: [
              {
                text: "\\frac{7.2\\;L}{12\\;L} = \\frac{4.8\\;L}{X\\;L}",
                color: highlight2
              },
              {
                text: "7.2 × X = 4.8 × 12\n x = \\frac{4.8 × 12}{7.2}",
                color: highlight2,
              },
              {
                text: "X = 8 litres.",
                color: highlight2
              }
            ],
          },
        },
        page11: {
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
          tableHeading: "",
          questionTable: {
            headers: ["Mixes", "White<br/>(litres)", "Blue<br/>(litres)"],
            rows: [
              ["Mix 1", "7.2", "4.8"],
              ["Mix 2", "12", "8"],
            ],
          },
          tableInstrucionText: "We found that we needed 8 litres of blue paint to get the same shade. Let us check our answer.",
          instructionText: "Use ‘+’ and ‘-’ buttons to increase or reduce the amount of blue paint. ",

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
