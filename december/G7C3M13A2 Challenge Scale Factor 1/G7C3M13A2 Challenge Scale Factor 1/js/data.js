// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlight1 = "#FFD700";
const highlight2 = "#F28283";
const highlight3 = "#70ACC7";
const highlight4 = "#33ad54";

// Common formula constants
const PYTHAGOREAN_FORMULA =
  "<span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup></span>";
const PYTHAGOREAN_QUESTION =
  "Is <span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup> ?</span>";
const PYTHAGOREAN_FORMULA_PQR =
  "<span>r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup></span>";
const PYTHAGOREAN_FORMULA_PQR_OPTION =
  "r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup>";

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
        questionTextA:
          "Lemon syrup is made using a recipe of 4 lemons and 1 teaspoon of sugar.\na. If you want to make two batches with the same recipe, how many lemons and how much sugar are needed?",
        questionTextB:
          "Lemon syrup is made using a recipe of 4 lemons and 1 teaspoon of sugar.\nb. If there are 4 teaspoons of sugar, how many lemons are needed?",
        questionTextC:
          "Lemon syrup is made using a recipe of 4 lemons and 1 teaspoon of sugar.\na. If there are 5 teaspoons of sugar and 12 lemons, are there any ingredients left over? How much is left?",
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
          introduction: "Let’s solve this challenge using scale factors.",
        },
        page2: {
          highlights: [
            {
              text: "recipe of 4 lemons and 1 teaspoon of sugar.",
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
                text: "No. of lemons for recipe = 4",
                color: highlight1,
              },
              {
                text: "No. of teaspoons of sugar for recipe = 1",
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
              text: "recipe of 4 lemons and 1 teaspoon of sugar.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "two batches with the same recipe, how many lemons and how much sugar are needed",
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
                text: "No. of lemons for recipe = 4",
                color: highlight1,
              },
              {
                text: "No. of teaspoons of sugar for recipe = 1",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [
              {
                text: "No. of lemons and teaspoons of sugar for twice the recipe",
                color: highlight2,
              },
            ],
          },
        },
        page4: {
          highlights: [
            {
              text: "recipe of 4 lemons and 1 teaspoon of sugar.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "two batches with the same recipe, how many lemons and how much sugar are needed",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["Recipe <br/>batches", "Ingredient 1", "Ingredient 2"],
            rows: [
              ["1", "a", "b"],
              ["2", "c", "d"],
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
            questionText:
              "Based on the table above, which of the following are true?<br/> (More than one option may be correct) ",
            imageText: "",
            options: [
              {
                text: "a = 2c",
                iscorrect: false,
                feedback: "Not quite! Try again.",
              },
              {
                text: "a : b = c : d",
                iscorrect: true,
                feedback: "Great Job!",
              },
              {
                text: "d = 2b",
                iscorrect: true,
                feedback: "Great Job!",
              },
              {
                text: "c = 2a",
                iscorrect: true,
                feedback: "Great Job!",
              },
            ],
            keyConcepts: [
              {
                text: "Ingredients must be proportional",
                color: highlight4,
              },
              {
                text: "Each ingredient increases by the scale factor",
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
            keyConcepts: [],
            impFormulae: [],
          },
        },
        page5: {
          highlights: [
            {
              text: "recipe of 4 lemons and 1 teaspoon of sugar.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "two batches with the same recipe, how many lemons and how much sugar are needed",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["Recipe <br/>batches", "Ingredient 1", "Ingredient 2"],
            rows: [
              ["1", "4", "1"],
              ["2", "a", "b"],
            ],
          },
          fillBlanks: {
            instructionText:
              "The ingredients for 1 batch are given, what is the scale factor to find ingredients for 2 batches?",
            options: [
              {
                id: "opt1",
                text: "0.5",
                feedbackText: "Not quite! More batches mean more ingredients!",
                blankID: [],
              },
              {
                id: "opt2",
                text: "2",
                feedbackText:
                  "Great job! Since we are going from 1 batch to 2 batches, we multiply.",
                blankID: [{ bid: "blank1", text: "2" }],
              },
            ],
            keyConcepts: [
              {
                text: "Scale factor = 2",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },

          // quizPanel: {
          //   quiz: {
          //     mcqType: "MCQ",
          //     qti4Subtype: "QT2",
          //     emptyFeedback:
          //       "In simplest form, both terms of ratio do not have any common factor other than 1.",
          //   },
          //   headerText: "",
          //   questionText:
          //     "The ingredients for 1 batch are given, what is the scale factor to find ingredients for 2 batches? ",
          //   imageText: "",
          //   options: [
          //     {
          //       text: "0.5",
          //       iscorrect: false,
          //       feedback: "Not quite! More batches mean more ingredients!",
          //     },
          //     {
          //       text: "2",
          //       iscorrect: true,
          //       feedback:
          //         "Great job! Since we are going from 1 batch to 2 batches, we multiply.",
          //     },
          //   ],
          //   keyConcepts: [
          //     {
          //       text: "Scale factor = 2",
          //       color: highlight4,
          //     },
          //   ],
          //   impFormulae: [
          //     {
          //       text: "",
          //       color: highlight1,
          //     },
          //   ],
          // },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "Ingredients must be proportional",
                color: highlight4,
              },
              {
                text: "Each ingredient increases by the scale factor",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page6: {
          highlights: [
            {
              text: "recipe of 4 lemons and 1 teaspoon of sugar.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "two batches with the same recipe, how many lemons and how much sugar are needed",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["Recipe <br/>batches", "Ingredient 1", "Ingredient 2"],
            rows: [
              ["1", "4", "1"],
              ["2", "a", "b"],
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
            questionText: "Find the value of ‘a’ and ‘b’.",
            imageText: "",
            options: [
              {
                text: "a = 4, b = 1",
                iscorrect: false,
                feedback:
                  "Not quite! Look at the scale factor and multiply correctly!",
              },
              {
                text: "a = 2, b = 8",
                iscorrect: false,
                feedback:
                  "Not quite! Look at the scale factor and multiply correctly!",
              },
              {
                text: "a = 8, b = 2",
                iscorrect: true,
                feedback: "Great job! a = 4 × 2 = 8, b = 1 × 2 = 2",
              },
              {
                text: "a = 1, b = 4",
                iscorrect: false,
                feedback:
                  "Not quite! Look at the scale factor and multiply correctly!",
              },
            ],
            keyConcepts: [
              {
                text: "a = 8, b = 2",
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
                text: "Ingredients must be proportional",
                color: highlight4,
              },
              {
                text: "Each ingredient increases by the scale factor",
                color: highlight4,
              },
              {
                text: "Scale factor = 2",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page7: {
          highlights: [
            {
              text: "recipe of 4 lemons and 1 teaspoon of sugar.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "two batches with the same recipe, how many lemons and how much sugar are needed",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["Recipe <br/>batches", "Ingredient 1", "Ingredient 2"],
            rows: [
              ["1", "4", "1"],
              ["2", "8", "2"],
            ],
          },
          conclusionText:
            "For two batches, we would need <span style='background-color:#FFD700 ;'>8 lemons and 2 teaspoons of sugar.</span>",
          tapForNext: "Tap >> for the next part of the challenge.",
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "Ingredients must be proportional",
                color: highlight4,
              },
              {
                text: "Each ingredient increases by the scale factor",
                color: highlight4,
              },
              {
                text: "Scale factor = 2",
                color: highlight4,
              },
              {
                text: "a = 8, b = 2",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page8: {
          introduction: "Let’s find the scale factor and solve this challenge.",
        },
        page9: {
          highlights: [
            {
              text: "recipe of 4 lemons and 1 teaspoon of sugar",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "4 teaspoons of sugar",
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
                text: "No. of lemons for recipe = 4",
                color: highlight1,
              },
              {
                text: "No. of teaspoons of sugar for recipe = 1",
                color: highlight1,
              },
              {
                text: "No. of teaspoons of sugar = 6",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [],
          },
        },
        page10: {
          highlights: [
            {
              text: "recipe of 4 lemons and 1 teaspoon of sugar",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "4 teaspoons of sugar",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "how many lemons are needed",
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
                text: "No. of lemons for recipe = 4",
                color: highlight1,
              },
              {
                text: "No. of teaspoons of sugar for recipe = 1",
                color: highlight1,
              },
              {
                text: "No. of teaspoons of sugar = 6",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [
              {
                text: "No. of lemons for 4 teaspoons of sugar",
                color: highlight2,
              },
            ],
          },
        },
        page11: {
          highlights: [
            {
              text: "recipe of 4 lemons and 1 teaspoon of sugar",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "4 teaspoons of sugar",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "how many lemons are needed",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["No. of <br/>lemons", "Teaspoons<br/> of sugar"],
            rows: [
              ["4", "1"],
              ["a", "4"],
            ],
          },
          fillBlanks: {
            instructionText: "Find the scale factor.",
            options: [
              {
                id: "opt1",
                text: "4",
                feedbackText: "Great job!",
                blankID: [{ bid: "blank1", text: "4" }],
              },
              {
                id: "opt2",
                text: "0.4",
                feedbackText: "Not quite! Try Again ",
                blankID: [],
              },
              {
                id: "opt3",
                text: "2",
                feedbackText: "Not quite! Try Again",
                blankID: [],
              },
              {
                id: "opt4",
                text: "0.25",
                feedbackText: "Not quite! Try Again",
                blankID: [],
              },
            ],
            keyConcepts: [
              {
                text: "Scale Factor = 4",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },

          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "Ingredients must be proportional",
                color: highlight4,
              },
              {
                text: "Each ingredient increases by the scale factor",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page12: {
          highlights: [
            {
              text: "recipe of 4 lemons and 1 teaspoon of sugar",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "4 teaspoons of sugar",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "how many lemons are needed",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["No. of <br/>lemons", "Teaspoons<br/> of sugar"],
            rows: [
              ["4", "1"],
              ["a", "4"],
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
            questionText: "Find the scale factor.",
            imageText: "",
            options: [
              {
                text: "a = 4",
                iscorrect: false,
                feedback:
                  "Not quite! Look at the scale factor and multiply correctly!",
              },
              {
                text: "a = 16",
                iscorrect: true,
                feedback: "Great job! a = 4 × 4 = 16",
              },
              {
                text: "a = 8",
                iscorrect: false,
                feedback:
                  "Not quite! Look at the scale factor and multiply correctly!",
              },
              {
                text: "a = 1",
                iscorrect: false,
                feedback:
                  "Not quite! Look at the scale factor and multiply correctly!",
              },
            ],
            keyConcepts: [
              {
                text: "a = 16",
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
                text: "Ingredients must be proportional",
                color: highlight4,
              },
              {
                text: "Each ingredient increases by the scale factor",
                color: highlight4,
              },
              {
                text: "Scale factor = 4",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page13: {
          highlights: [
            {
              text: "recipe of 4 lemons and 1 teaspoon of sugar",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "4 teaspoons of sugar",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "how many lemons are needed",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["No. of <br/>lemons", "Teaspoons<br/> of sugar"],
            rows: [
              ["4", "1"],
              ["16", "4"],
            ],
          },
          conclusionText: "For 4 teaspoons of sugar, we need <span style='background-color: " + highlight1 + "'>16 lemons.</span>",
          tapForNext: "Tap >> for the next part of the challenge.",
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "Ingredients must be proportional",
                color: highlight4,
              },
              {
                text: "Each ingredient increases by the scale factor",
                color: highlight4,
              },
              {
                text: "Scale factor = 4",
                color: highlight4,
              },
              {
                text: "a = 16",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page14: {
          introduction:
            "We need to check if these ratios are proportional or not.",
        },
        page15: {
          highlights: [
            {
              text: "recipe of 4 lemons and 1 teaspoon of sugar",
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
                text: "Lemons : Teaspoons of sugar = 4 : 1",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [],
          },
        },
        page16: {
          highlights: [
            {
              text: "recipe of 4 lemons and 1 teaspoon of sugar",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "If there are 5 teaspoons of sugar and 12 lemons, are there any ingredients left over? How much is left?",
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
                text: "Lemons : Teaspoons of sugar = 4 : 1",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [
              {
                text: "If Lemons : Teaspoons is 12 : 5, will there be ingredients left?",
                color: highlight2,
              },
            ],
          },
        },
        page17: {
          highlights: [
            {
              text: "recipe of 4 lemons and 1 teaspoon of sugar",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "If there are 5 teaspoons of sugar and 12 lemons, are there any ingredients left over? How much is left?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["No. of <br/>lemons", "Teaspoons<br/> of sugar"],
            rows: [
              ["4", "1"],
              ["a", "4"],
            ],
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4R",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText:
              "Two ratios are said to be proportional if – <br/>(More than one option may be correct) ",
            imageText: "",
            options: [
              {
                text: "they have the same simplest form",
                iscorrect: true,
                feedback: "Awesome!",
              },
              {
                text: "both terms have the same scale factor",
                iscorrect: true,
                feedback: "Awesome!",
              },
              {
                text: "their cross products are not equal",
                iscorrect: false,
                feedback:
                  "Not quite! Check all options, more than one options are correct!",
              },
              {
                text: "their cross products are equal",
                iscorrect: true,
                feedback: "Awesome!",
              },
            ],
            keyConcepts: [
              {
                text: "12 : 5 ≠ 4 : 1",
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
                text: "Ingredients must be proportional",
                color: highlight4,
              },
              {
                text: "To be proportional, terms of the ratio should have the same scale factor.",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page18: {
          highlights: [
            {
              text: "recipe of 4 lemons and 1 teaspoon of sugar",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "If there are 5 teaspoons of sugar and 12 lemons, are there any ingredients left over? How much is left?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["No. of <br/>lemons", "Teaspoons<br/> of sugar"],
            rows: [
              ["4", "1"],
              ["12", "5"],
            ],
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT2",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText: "Is 12 : 5 proportional to 4 : 1?",
            imageText: "",
            options: [
              {
                text: "Yes",
                iscorrect: false,
                feedback: "Not quite! The terms do not have the",
              },
              {
                text: "No",
                iscorrect: true,
                feedback: "Good! 12:5 is not proportional to 4 : 1.",
              },
            ],
            keyConcepts: [
              {
                text: "12 : 5 ≠ 4 : 1",
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
                text: "Ingredients must be proportional",
                color: highlight4,
              },
              {
                text: "To be proportional, terms of the ratio should have the same scale factor",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page19: {
          highlights: [
            {
              text: "recipe of 4 lemons and 1 teaspoon of sugar",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "If there are 5 teaspoons of sugar and 12 lemons, are there any ingredients left over? How much is left?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["No. of <br/>lemons", "Teaspoons<br/> of sugar"],
            rows: [
              ["4", "1"],
              ["12", "b"],
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
            questionText: "Find b such that 12 : b is proportional to 4 : 1.",
            imageText: "",
            options: [
              {
                text: "4",
                iscorrect: false,
                feedback: "Not quite! Try Again.",
              },
              {
                text: "12",
                iscorrect: false,
                feedback: "Not quite! Try Again.",
              },
              {
                text: "2",
                iscorrect: false,
                feedback: "Not quite! Try Again.",
              },
              {
                text: "3",
                iscorrect: true,
                feedback: "Good! 12:3 is proportional to 4 : 1.",
              },
            ],
            keyConcepts: [
              {
                text: "12 : 3 = 4 : 1",
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
                text: "Ingredients must be proportional",
                color: highlight4,
              },
              {
                text: "To be proportional, terms of the ratio should have the same scale factor",
                color: highlight4,
              },
              {
                text: "12 : 5 ≠ 4 : 1",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page20: {
          highlights: [
            {
              text: "recipe of 4 lemons and 1 teaspoon of sugar",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "If there are 5 teaspoons of sugar and 12 lemons, are there any ingredients left over? How much is left?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["No. of <br/>lemons", "Teaspoons<br/> of sugar"],
            rows: [
              ["4", "1"],
              ["a", "4"],
            ],
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4R",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText:
              "If we have lemons and teaspoons of sugar as 12 and 5, for this recipe we can use 12 lemons and 3 teaspoons of sugar. So, which ingredient is left over and how much?",
            imageText: "",
            options: [
              {
                text: "4 lemons are left over",
                iscorrect: false,
                feedback: "Not quite! Try again.",
              },
              {
                text: "2 teaspoons of sugar are left over",
                iscorrect: true,
                feedback: "Good!",
              },
              {
                text: "4 teaspoons of sugar are left over",
                iscorrect: false,
                feedback: "Not quite! Try again.",
              },
              {
                text: "4 lemons are left over",
                iscorrect: false,
                feedback: "Not quite! Try again.",
              },
            ],
            keyConcepts: [
              {
                text: "2 tsp of sugar are left over",
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
                text: "Ingredients must be proportional",
                color: highlight4,
              },
              {
                text: "To be proportional, terms of the ratio should have the same scale factor",
                color: highlight4,
              },
              {
                text: "12 : 5 ≠ 4 : 1",
                color: highlight4,
              },
              {
                text: "12 : 3 = 4 : 1",
                color: highlight4,
              },
              {
                text: "2 tsp of sugar are left over",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page21: {
          highlights: [
            {
              text: "recipe of 4 lemons and 1 teaspoon of sugar",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "If there are 5 teaspoons of sugar and 12 lemons, are there any ingredients left over? How much is left?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",

          conclusionText:
            "Since recipe needs lemons and tsp. of sugar in 4 : 1 ratio, 12 lemons would need 3 tsp. of sugar. But we are given 5 tsp. of sugar. <span style='background-color: #FFD700;'>Hence 2 tsp of sugar will be leftover.</span>",
          activityCompleted: "Activity Completed!",
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "Ingredients must be proportional",
                color: highlight4,
              },
              {
                text: "To be proportional, terms of the ratio should have the same scale factor",
                color: highlight4,
              },
              {
                text: "12 : 5 ≠ 4 : 1",
                color: highlight4,
              },
              {
                text: "12 : 3 = 4 : 1",
                color: highlight4,
              },
              {
                text: "2 tsp of sugar are left over",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
      },
    },

    id: {
      appInfo: {
        title: "Applet Pembelajaran Matematika Interaktif",
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Lagi",
      },

      common: {
        questionIcon: "Q",
        rollerCoasterLabel: "Klub Sains",
        merryGoRoundLabel: "Klub Seni",
        ratioSeparator: ":",
        questionTextA:
          "Sirup lemon dibuat menggunakan resep 4 lemon dan 1 sendok teh gula.\na. Jika Anda ingin membuat dua batch dengan resep yang sama, berapa banyak lemon dan berapa banyak gula yang diperlukan?",
        questionTextB:
          "Sirup lemon dibuat menggunakan resep 4 lemon dan 1 sendok teh gula.\nb. Jika ada 4 sendok teh gula, berapa banyak lemon yang diperlukan?",
        questionTextC:
          "Sirup lemon dibuat menggunakan resep 4 lemon dan 1 sendok teh gula.\nc. Jika ada 5 sendok teh gula dan 12 lemon, apakah ada bahan yang tersisa? Berapa banyak yang tersisa?",
        labels: {
          a: "a = ",
          b: "b = ",
          c: "c = ",
          dropHere: "Letakkan di sini",
        },
        informationAnalysis: {
          header: "ANALISIS INFORMASI",
          facts: "Fakta",
          values: "Nilai",
          toFind: "Dicari",
        },
        tableHeaders: {
          quantity: "Kuantitas",
          coffee: "Kopi (dalam sdt)",
          sugar: "Gula (dalam sdt)",
        },
        conceptSummary: {
          header: "RINGKASAN KONSEP",
          given: "Diketahui",
          toFind: "Dicari",
          keyConcepts: "Konsep Utama",
          importantFormulae: "Perhitungan",
        },
      },

      pages: {
        page1: {
          introduction: "Mari kita selesaikan tantangan ini menggunakan faktor skala.",
        },
        page2: {
          highlights: [
            {
              text: "resep 4 lemon dan 1 sendok teh gula.",
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
                text: "Jumlah lemon untuk resep = 4",
                color: highlight1,
              },
              {
                text: "Jumlah sendok teh gula untuk resep = 1",
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
              text: "resep 4 lemon dan 1 sendok teh gula.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "dua batch dengan resep yang sama, berapa banyak lemon dan berapa banyak gula yang diperlukan",
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
                text: "Jumlah lemon untuk resep = 4",
                color: highlight1,
              },
              {
                text: "Jumlah sendok teh gula untuk resep = 1",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Jumlah lemon dan sendok teh gula untuk dua kali batch",
                color: highlight2,
              },
            ],
          },
        },
        page4: {
          highlights: [
            {
              text: "resep 4 lemon dan 1 sendok teh gula.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "dua batch dengan resep yang sama, berapa banyak lemon dan berapa banyak gula yang diperlukan",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["Batch <br/>Resep", "Bahan 1", "Bahan 2"],
            rows: [
              ["1", "a", "b"],
              ["2", "c", "d"],
            ],
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4",
              emptyFeedback:
                "Dalam bentuk paling sederhana, kedua suku rasio tidak memiliki faktor persekutuan selain 1.",
            },
            headerText: "",
            questionText:
              "Berdasarkan tabel di atas, mana yang benar?<br/> (Lebih dari satu opsi mungkin benar) ",
            imageText: "",
            options: [
              {
                text: "a = 2c",
                iscorrect: false,
                feedback: "Belum tepat! Coba lagi.",
              },
              {
                text: "a : b = c : d",
                iscorrect: true,
                feedback: "Bagus sekali!",
              },
              {
                text: "d = 2b",
                iscorrect: true,
                feedback: "Bagus sekali!",
              },
              {
                text: "c = 2a",
                iscorrect: true,
                feedback: "Bagus sekali!",
              },
            ],
            keyConcepts: [
              {
                text: "Bahan harus sebanding",
                color: highlight4,
              },
              {
                text: "Setiap bahan meningkat dengan faktor skala",
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
            keyConcepts: [],
            impFormulae: [],
          },
        },
        page5: {
          highlights: [
            {
              text: "resep 4 lemon dan 1 sendok teh gula.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "dua batch dengan resep yang sama, berapa banyak lemon dan berapa banyak gula yang diperlukan",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["Batch <br/>Resep", "Bahan 1", "Bahan 2"],
            rows: [
              ["1", "4", "1"],
              ["2", "a", "b"],
            ],
          },
          fillBlanks: {
            instructionText:
              "Bahan untuk 1 batch diberikan, berapa faktor skala untuk menemukan bahan untuk 2 batch?",
            options: [
              {
                id: "opt1",
                text: "0.5",
                feedbackText: "Belum tepat! Lebih banyak batch berarti lebih banyak bahan!",
                blankID: [],
              },
              {
                id: "opt2",
                text: "2",
                feedbackText:
                  "Bagus! Karena kami beralih dari 1 batch ke 2 batch, kami mengalikan.",
                blankID: [{ bid: "blank1", text: "2" }],
              },
            ],
            keyConcepts: [
              {
                text: "Faktor skala = 2",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },

          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "Bahan harus sebanding",
                color: highlight4,
              },
              {
                text: "Setiap bahan meningkat dengan faktor skala",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page6: {
          highlights: [
            {
              text: "resep 4 lemon dan 1 sendok teh gula.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "dua batch dengan resep yang sama, berapa banyak lemon dan berapa banyak gula yang diperlukan",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["Batch <br/>Resep", "Bahan 1", "Bahan 2"],
            rows: [
              ["1", "4", "1"],
              ["2", "a", "b"],
            ],
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4",
              emptyFeedback:
                "Dalam bentuk paling sederhana, kedua suku rasio tidak memiliki faktor persekutuan selain 1.",
            },
            headerText: "",
            questionText: "Temukan nilai 'a' dan 'b'.",
            imageText: "",
            options: [
              {
                text: "a = 4, b = 1",
                iscorrect: false,
                feedback:
                  "Belum tepat! Perhatikan faktor skala dan kalikan dengan benar!",
              },
              {
                text: "a = 2, b = 8",
                iscorrect: false,
                feedback:
                  "Belum tepat! Perhatikan faktor skala dan kalikan dengan benar!",
              },
              {
                text: "a = 8, b = 2",
                iscorrect: true,
                feedback: "Bagus! a = 4 × 2 = 8, b = 1 × 2 = 2",
              },
              {
                text: "a = 1, b = 4",
                iscorrect: false,
                feedback:
                  "Belum tepat! Perhatikan faktor skala dan kalikan dengan benar!",
              },
            ],
            keyConcepts: [
              {
                text: "a = 8, b = 2",
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
                text: "Bahan harus sebanding",
                color: highlight4,
              },
              {
                text: "Setiap bahan meningkat dengan faktor skala",
                color: highlight4,
              },
              {
                text: "Faktor skala = 2",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page7: {
          highlights: [
            {
              text: "resep 4 lemon dan 1 sendok teh gula.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "dua batch dengan resep yang sama, berapa banyak lemon dan berapa banyak gula yang diperlukan",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["Batch <br/>Resep", "Bahan 1", "Bahan 2"],
            rows: [
              ["1", "4", "1"],
              ["2", "8", "2"],
            ],
          },
          conclusionText:
            "Untuk dua batch, kami membutuhkan <span style='background-color:#FFD700 ;'>8 lemon dan 2 sendok teh gula.</span>",
          tapForNext: "Ketuk >> untuk bagian berikutnya dari tantangan.",
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "Bahan harus sebanding",
                color: highlight4,
              },
              {
                text: "Setiap bahan meningkat dengan faktor skala",
                color: highlight4,
              },
              {
                text: "Faktor skala = 2",
                color: highlight4,
              },
              {
                text: "a = 8, b = 2",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page8: {
          introduction: "Mari kita cari faktor skala dan selesaikan tantangan ini.",
        },
        page9: {
          highlights: [
            {
              text: "resep 4 lemon dan 1 sendok teh gula",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "4 sendok teh gula",
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
                text: "Jumlah lemon untuk resep = 4",
                color: highlight1,
              },
              {
                text: "Jumlah sendok teh gula untuk resep = 1",
                color: highlight1,
              },
              {
                text: "Jumlah sendok teh gula = 4",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [],
          },
        },
        page10: {
          highlights: [
            {
              text: "resep 4 lemon dan 1 sendok teh gula",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "4 sendok teh gula",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "berapa banyak lemon yang diperlukan",
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
                text: "Jumlah lemon untuk resep = 4",
                color: highlight1,
              },
              {
                text: "Jumlah sendok teh gula untuk resep = 1",
                color: highlight1,
              },
              {
                text: "Jumlah sendok teh gula = 4",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Jumlah lemon untuk 4 sendok teh gula",
                color: highlight2,
              },
            ],
          },
        },
        page11: {
          highlights: [
            {
              text: "resep 4 lemon dan 1 sendok teh gula",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "4 sendok teh gula",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "berapa banyak lemon yang diperlukan",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["Jumlah <br/>Lemon", "Sendok Teh<br/> Gula"],
            rows: [
              ["4", "1"],
              ["a", "4"],
            ],
          },
          fillBlanks: {
            instructionText: "Temukan faktor skala.",
            options: [
              {
                id: "opt1",
                text: "4",
                feedbackText: "Bagus!",
                blankID: [{ bid: "blank1", text: "4" }],
              },
              {
                id: "opt2",
                text: "0.4",
                feedbackText: "Belum tepat! Coba Lagi ",
                blankID: [],
              },
              {
                id: "opt3",
                text: "2",
                feedbackText: "Belum tepat! Coba Lagi",
                blankID: [],
              },
              {
                id: "opt4",
                text: "0.25",
                feedbackText: "Belum tepat! Coba Lagi",
                blankID: [],
              },
            ],
            keyConcepts: [
              {
                text: "Faktor Skala = 4",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },

          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "Bahan harus sebanding",
                color: highlight4,
              },
              {
                text: "Setiap bahan meningkat dengan faktor skala",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page12: {
          highlights: [
            {
              text: "resep 4 lemon dan 1 sendok teh gula",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "4 sendok teh gula",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "berapa banyak lemon yang diperlukan",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["Jumlah <br/>Lemon", "Sendok Teh<br/> Gula"],
            rows: [
              ["4", "1"],
              ["a", "4"],
            ],
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4",
              emptyFeedback:
                "Dalam bentuk paling sederhana, kedua suku rasio tidak memiliki faktor persekutuan selain 1.",
            },
            headerText: "",
            questionText: "Temukan faktor skala.",
            imageText: "",
            options: [
              {
                text: "a = 4",
                iscorrect: false,
                feedback:
                  "Belum tepat! Perhatikan faktor skala dan kalikan dengan benar!",
              },
              {
                text: "a = 16",
                iscorrect: true,
                feedback: "Bagus! a = 4 × 4 = 16",
              },
              {
                text: "a = 8",
                iscorrect: false,
                feedback:
                  "Belum tepat! Perhatikan faktor skala dan kalikan dengan benar!",
              },
              {
                text: "a = 1",
                iscorrect: false,
                feedback:
                  "Belum tepat! Perhatikan faktor skala dan kalikan dengan benar!",
              },
            ],
            keyConcepts: [
              {
                text: "a = 16",
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
                text: "Bahan harus sebanding",
                color: highlight4,
              },
              {
                text: "Setiap bahan meningkat dengan faktor skala",
                color: highlight4,
              },
              {
                text: "Faktor skala = 4",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page13: {
          highlights: [
            {
              text: "resep 4 lemon dan 1 sendok teh gula",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "4 sendok teh gula",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "berapa banyak lemon yang diperlukan",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["Jumlah <br/>Lemon", "Sendok Teh<br/> Gula"],
            rows: [
              ["4", "1"],
              ["16", "4"],
            ],
          },
          conclusionText: "Untuk 4 sendok teh gula, kami membutuhkan <span style='background-color: " + highlight1 + "'>16 lemon.</span>",
          tapForNext: "Ketuk >> untuk bagian berikutnya dari tantangan.",
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "Bahan harus sebanding",
                color: highlight4,
              },
              {
                text: "Setiap bahan meningkat dengan faktor skala",
                color: highlight4,
              },
              {
                text: "Faktor skala = 4",
                color: highlight4,
              },
              {
                text: "a = 16",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page14: {
          introduction:
            "Kami perlu memeriksa apakah rasio-rasio ini sebanding atau tidak.",
        },
        page15: {
          highlights: [
            {
              text: "resep 4 lemon dan 1 sendok teh gula",
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
                text: "Lemon : Sendok teh gula = 4 : 1",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [],
          },
        },
        page16: {
          highlights: [
            {
              text: "resep 4 lemon dan 1 sendok teh gula",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Jika ada 5 sendok teh gula dan 12 lemon, apakah ada bahan yang tersisa? Berapa banyak yang tersisa?",
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
                text: "Lemon : Sendok teh gula = 4 : 1",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Jika Lemon : Sendok teh adalah 12 : 5, apakah akan ada bahan yang tersisa?",
                color: highlight2,
              },
            ],
          },
        },
        page17: {
          highlights: [
            {
              text: "resep 4 lemon dan 1 sendok teh gula",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Jika ada 5 sendok teh gula dan 12 lemon, apakah ada bahan yang tersisa? Berapa banyak yang tersisa?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["Jumlah <br/>Lemon", "Sendok Teh<br/> Gula"],
            rows: [
              ["4", "1"],
              ["a", "4"],
            ],
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4R",
              emptyFeedback:
                "Dalam bentuk paling sederhana, kedua suku rasio tidak memiliki faktor persekutuan selain 1.",
            },
            headerText: "",
            questionText:
              "Dua rasio dikatakan sebanding jika – <br/>(Lebih dari satu opsi mungkin benar) ",
            imageText: "",
            options: [
              {
                text: "mereka memiliki bentuk paling sederhana yang sama",
                iscorrect: true,
                feedback: "Luar biasa!",
              },
              {
                text: "kedua suku memiliki faktor skala yang sama",
                iscorrect: true,
                feedback: "Luar biasa!",
              },
              {
                text: "hasil kali silang mereka tidak sama",
                iscorrect: false,
                feedback:
                  "Belum tepat! Periksa semua opsi, lebih dari satu opsi benar!",
              },
              {
                text: "hasil kali silang mereka sama",
                iscorrect: true,
                feedback: "Luar biasa!",
              },
            ],
            keyConcepts: [
              {
                text: "12 : 5 ≠ 4 : 1",
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
                text: "Bahan harus sebanding",
                color: highlight4,
              },
              {
                text: "Untuk sebanding, suku-suku rasio harus memiliki faktor skala yang sama.",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page18: {
          highlights: [
            {
              text: "resep 4 lemon dan 1 sendok teh gula",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Jika ada 5 sendok teh gula dan 12 lemon, apakah ada bahan yang tersisa? Berapa banyak yang tersisa?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["Jumlah <br/>Lemon", "Sendok Teh<br/> Gula"],
            rows: [
              ["4", "1"],
              ["12", "5"],
            ],
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT2",
              emptyFeedback:
                "Dalam bentuk paling sederhana, kedua suku rasio tidak memiliki faktor persekutuan selain 1.",
            },
            headerText: "",
            questionText: "Apakah 12 : 5 sebanding dengan 4 : 1?",
            imageText: "",
            options: [
              {
                text: "Ya",
                iscorrect: false,
                feedback: "Belum tepat! Suku-suku tidak memiliki",
              },
              {
                text: "Tidak",
                iscorrect: true,
                feedback: "Bagus! 12:5 tidak sebanding dengan 4 : 1.",
              },
            ],
            keyConcepts: [
              {
                text: "12 : 5 ≠ 4 : 1",
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
                text: "Bahan harus sebanding",
                color: highlight4,
              },
              {
                text: "Untuk sebanding, suku-suku rasio harus memiliki faktor skala yang sama",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page19: {
          highlights: [
            {
              text: "resep 4 lemon dan 1 sendok teh gula",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Jika ada 5 sendok teh gula dan 12 lemon, apakah ada bahan yang tersisa? Berapa banyak yang tersisa?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["Jumlah <br/>Lemon", "Sendok Teh<br/> Gula"],
            rows: [
              ["4", "1"],
              ["12", "b"],
            ],
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4",
              emptyFeedback:
                "Dalam bentuk paling sederhana, kedua suku rasio tidak memiliki faktor persekutuan selain 1.",
            },
            headerText: "",
            questionText: "Temukan b sehingga 12 : b sebanding dengan 4 : 1.",
            imageText: "",
            options: [
              {
                text: "4",
                iscorrect: false,
                feedback: "Belum tepat! Coba Lagi.",
              },
              {
                text: "12",
                iscorrect: false,
                feedback: "Belum tepat! Coba Lagi.",
              },
              {
                text: "2",
                iscorrect: false,
                feedback: "Belum tepat! Coba Lagi.",
              },
              {
                text: "3",
                iscorrect: true,
                feedback: "Bagus! 12:3 sebanding dengan 4 : 1.",
              },
            ],
            keyConcepts: [
              {
                text: "12 : 3 = 4 : 1",
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
                text: "Bahan harus sebanding",
                color: highlight4,
              },
              {
                text: "Untuk sebanding, suku-suku rasio harus memiliki faktor skala yang sama",
                color: highlight4,
              },
              {
                text: "12 : 5 ≠ 4 : 1",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page20: {
          highlights: [
            {
              text: "resep 4 lemon dan 1 sendok teh gula",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Jika ada 5 sendok teh gula dan 12 lemon, apakah ada bahan yang tersisa? Berapa banyak yang tersisa?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["Jumlah <br/>Lemon", "Sendok Teh<br/> Gula"],
            rows: [
              ["4", "1"],
              ["a", "4"],
            ],
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4R",
              emptyFeedback:
                "Dalam bentuk paling sederhana, kedua suku rasio tidak memiliki faktor persekutuan selain 1.",
            },
            headerText: "",
            questionText:
              "Jika kami memiliki lemon dan sendok teh gula 12 dan 5, untuk resep ini kami dapat menggunakan 12 lemon dan 3 sendok teh gula. Jadi, bahan apa yang tersisa dan berapa banyak?",
            imageText: "",
            options: [
              {
                text: "4 lemon tersisa",
                iscorrect: false,
                feedback: "Belum tepat! Coba lagi.",
              },
              {
                text: "2 sendok teh gula tersisa",
                iscorrect: true,
                feedback: "Bagus!",
              },
              {
                text: "4 sendok teh gula tersisa",
                iscorrect: false,
                feedback: "Belum tepat! Coba lagi.",
              },
              {
                text: "4 lemon tersisa",
                iscorrect: false,
                feedback: "Belum tepat! Coba lagi.",
              },
            ],
            keyConcepts: [
              {
                text: "2 sdt gula tersisa",
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
                text: "Bahan harus sebanding",
                color: highlight4,
              },
              {
                text: "Untuk sebanding, suku-suku rasio harus memiliki faktor skala yang sama",
                color: highlight4,
              },
              {
                text: "12 : 5 ≠ 4 : 1",
                color: highlight4,
              },
              {
                text: "12 : 3 = 4 : 1",
                color: highlight4,
              },
              {
                text: "2 sdt gula tersisa",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page21: {
          highlights: [
            {
              text: "resep 4 lemon dan 1 sendok teh gula",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Jika ada 5 sendok teh gula dan 12 lemon, apakah ada bahan yang tersisa? Berapa banyak yang tersisa?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",

          conclusionText:
            "Karena resep membutuhkan lemon dan sdt. gula dalam rasio 4 : 1, 12 lemon membutuhkan 3 sdt. gula. Tetapi kami diberi 5 sdt. gula. <span style='background-color: #FFD700;'>Maka 2 sdt gula akan tersisa.</span>",
          activityCompleted: "Aktivitas Selesai!",
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "Bahan harus sebanding",
                color: highlight4,
              },
              {
                text: "Untuk sebanding, suku-suku rasio harus memiliki faktor skala yang sama",
                color: highlight4,
              },
              {
                text: "12 : 5 ≠ 4 : 1",
                color: highlight4,
              },
              {
                text: "12 : 3 = 4 : 1",
                color: highlight4,
              },
              {
                text: "2 sdt gula tersisa",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
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

    // Special handling for blank10Coordinate to debug
    if (key === "pages.page12.fillBlanks.blank10Coordinate") {
      const fillBlanksObj = translation?.pages?.page12?.fillBlanks;
      console.log("🔍 [i18n] Looking for blank10Coordinate:", {
        lang,
        hasTranslation: !!translation,
        hasPages: !!translation?.pages,
        hasPage12: !!translation?.pages?.page12,
        hasFillBlanks: !!fillBlanksObj,
        hasCoordinate: !!fillBlanksObj?.blank10Coordinate,
        coordinate: fillBlanksObj?.blank10Coordinate,
        fillBlanksType: typeof fillBlanksObj,
        fillBlanksIsArray: Array.isArray(fillBlanksObj),
        fillBlanksKeys: fillBlanksObj ? Object.keys(fillBlanksObj) : null,
        fillBlanksFull: fillBlanksObj ? JSON.stringify(fillBlanksObj) : null,
        fillBlanksRaw: fillBlanksObj,
      });
    }

    for (const k of keys) {
      if (key === "pages.page12.fillBlanks.blank10Coordinate") {
        console.log(`🔍 [i18n] Checking key "${k}":`, {
          valueType: typeof value,
          valueIsArray: Array.isArray(value),
          valueIsObject: value && typeof value === "object",
          hasKey: value && typeof value === "object" && k in value,
          valueKeys:
            value && typeof value === "object" ? Object.keys(value) : null,
        });
      }
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        if (key === "pages.page12.fillBlanks.blank10Coordinate") {
          console.log(`❌ [i18n] Key "${k}" not found in value:`, value);
        }
        found = false;
        break;
      }
    }

    // If not found in current language, try English fallback
    if (!found) {
      if (key === "pages.page12.fillBlanks.blank10Coordinate") {
        console.log(
          "⚠️ [i18n] blank10Coordinate not found in",
          lang,
          "- falling back to English"
        );
      }
      value = AppData.translations.en;
      for (const fallbackKey of keys) {
        if (value && typeof value === "object" && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return `[Missing: ${key}]`;
        }
      }
    } else {
      if (key === "pages.page12.fillBlanks.blank10Coordinate") {
        console.log("✅ [i18n] blank10Coordinate found in", lang, ":", value);
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
