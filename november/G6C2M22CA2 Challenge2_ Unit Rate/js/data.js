// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlight1 = "#ffd966";
const highlight2 = "#70ACC7";
const highlight3 = "#f08080";
const highlight4 = "#254319";

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
          "Mutia bought 1 box of pens for Rp36.000,00 which contains 15 pens. Determine:\na. How much does one pen cost?\nb. How much money does Mutia have to pay if she only wants to buy 5 pens?",
        labels: {
          mom: "Mom",
          dona: "Dona",
          quantity250ml: "250 ml",
          quantity1liter: "1 liter",
          quantity1000ml: "1000 ml",
          number1: "1",
          number2: "2",
          number4: "4",
          number8: "8",
          number10: "10",
          variableA: "a",
          variableB: "b",
          times4: "×4",
          timesQuestion: "×?",
          dropHere: "Drop here",
        },
        informationAnalysis: {
          header: "INFORMATION ANALYSIS",
          given: "Given",
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
          introductionText:
            "Let’s solve this problem in two parts.\nPart A: To find the cost of 1 pen using unit rate and \nPart B: To find the cost of 5 pens from unit rate.",
        },
        page2: {
          highlights: [
            {
              text: "1 box of pens for Rp36.000,00 which contains 15 pens",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          givenList: {
            given: [
              {
                text: "1 box = 15 pens = Rp36.000,00",
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
              text: "1 box of pens for Rp36.000,00 which contains 15 pens",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How much does one pen cost?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          givenList: {
            given: [
              {
                text: "1 box = 15 pens = Rp36.000,00",
                color: highlight1,
              },
            ],

            toFind: [
              {
                text: "How much does one pen cost?",
                color: highlight2,
              },
            ],
          },
        },
        page4: {
          highlights: [
            {
              text: "1 box of pens for Rp36.000,00 which contains 15 pens",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How much does one pen cost?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How much money does Mutia have to pay if she only wants to buy 5 pens?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          givenList: {
            given: [
              {
                text: "1 box = 15 pens = Rp36.000,00",
                color: highlight1,
              },
            ],

            toFind: [
              {
                text: "How much does one pen cost?",
                color: highlight2,
              },
              {
                text: "How much should be paid to buy 5 pens?",
                color: highlight3,
              },
            ],
          },
        },
        page5: {
          highlights: [
            {
              text: "1 box of pens for Rp36.000,00 which contains 15 pens",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How much does one pen cost?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How much money does Mutia have to pay if she only wants to buy 5 pens?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4R",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText: "To find the cost of 1 pen, what should you do?",
            imageText: "",
            options: [
              {
                text: "Divide total cost by number of pens",
                iscorrect: true,
                feedback:
                  "You are right! Cost per pen = (Total cost of pens) ÷ (Number of pens)",
              },
              {
                text: "Multiply total cost by number of pens",
                iscorrect: false,
                feedback:
                  "Unit cost is always found by dividing total cost by quantity.",
              },
              {
                text: "Add cost and number of pens",
                iscorrect: false,
                feedback:
                  "Unit cost is always found by dividing total cost by quantity.",
              },
              {
                text: "Add cost and number of pens",
                iscorrect: false,
                feedback:
                  "Unit cost is always found by dividing total cost by quantity.",
              },
            ],
            keyConcepts: [],
            impFormulae: [
              {
                text: "Cost of 1 pen = Divide total cost by number of pens.",
                color: highlight1,
              },
            ],
          },
          conceptSummary: {
            given: [
              {
                text: "1 box = 15 pens = Rp36.000,00",
                color: highlight1,
              },
            ],

            toFind: [
              {
                text: "How much does one pen cost?",
                color: highlight2,
              },
              {
                text: "How much should be paid to buy 5 pens?",
                color: highlight3,
              },
            ],
          },
        },
        page6: {
          highlights: [
            {
              text: "1 box of pens for Rp36.000,00 which contains 15 pens",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How much does one pen cost?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How much money does Mutia have to pay if she only wants to buy 5 pens?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4R",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText: "Cost of 1 pen = Rp36.000 ÷ 15 = ?",
            imageText: "",
            options: [
              {
                text: "Rp2.000",
                iscorrect: false,
                feedback: "Not quite! Try again.",
              },
              {
                text: "Rp2.400",
                iscorrect: true,
                feedback: "You are right!",
              },
              {
                text: "Rp3.000",
                iscorrect: false,
                feedback: "Not quite! Try again.",
              },
              {
                text: "Rp.3.400",
                iscorrect: false,
                feedback: "Not quite! Try again.",
              },
            ],
            keyConcepts: [],
            impFormulae: [
              {
                text: "Cost of 1 pen = Rp36.000 ÷ 15 ",
                color: highlight4,
              },
            ],
          },
          conceptSummary: {
            given: [
              {
                text: "1 box = 15 pens = Rp36.000,00",
                color: highlight1,
              },
            ],

            toFind: [
              {
                text: "How much does one pen cost?",
                color: highlight2,
              },
              {
                text: "How much should be paid to buy 5 pens?",
                color: highlight3,
              },
            ],

            keyConcepts: [
              {
                text: "Cost of 1 pen = Divide total cost by number of pens.",
                color: highlight4,
              },
            ],
          },
        },
        page7: {
          highlights: [
            {
              text: "1 box of pens for Rp36.000,00 which contains 15 pens",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How much does one pen cost?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How much money does Mutia have to pay if she only wants to buy 5 pens?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT2",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText: "Cost of 1 pen = Rp2.400 per 1 pen",
            imageText: "",
            options: [
              {
                text: "True",
                iscorrect: true,
                feedback: "You are right!",
              },
              {
                text: "False",
                iscorrect: false,
                feedback: "Not quite! Try again.",
              },
            ],
            keyConcepts: [],
            impFormulae: [
              {
                text: "\n= Rp2.400 per 1 pen ",
                color: highlight4,
              },
            ],
          },
          conceptSummary: {
            given: [
              {
                text: "1 box = 15 pens = Rp36.000,00",
                color: highlight1,
              },
            ],

            toFind: [
              {
                text: "How much does one pen cost?",
                color: highlight2,
              },
              {
                text: "How much should be paid to buy 5 pens?",
                color: highlight3,
              },
            ],

            keyConcepts: [
              {
                text: "Cost of 1 pen = Divide total cost by number of pens.",
                color: highlight4,
              },
              {
                text: "Cost of 1 pen = Rp36.000 ÷ 15",
                color: highlight4,
              },
            ],
          },
        },
        page8: {
          highlights: [
            {
              text: "1 box of pens for Rp36.000,00 which contains 15 pens",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How much does one pen cost?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How much money does Mutia have to pay if she only wants to buy 5 pens?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4R",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText:
              "Once we know the cost of 1 pen, how do we find the cost of 5 pens?",
            imageText: "",
            options: [
              {
                text: "Multiply cost per 1 pen by 5",
                iscorrect: true,
                feedback:
                  "You are right! cost of 5 pens = 5 × 1 cost per 1 pen",
              },
              {
                text: "Divide cost per 1 pen by 5",
                iscorrect: false,
                feedback: "Not quite! To scale up, we multiply.",
              },
              {
                text: "Add 5 to the cost per 1 pen",
                iscorrect: false,
                feedback: "Not quite! To scale up, we multiply.",
              },
              {
                text: "Add 5 to the cost per 1 pen",
                iscorrect: false,
                feedback: "Not quite! To scale up, we multiply.",
              },
            ],
            keyConcepts: [],
            impFormulae: [
              {
                text: "Cost of 5 pens = multiply cost per 1 pen bt 5.",
                color: highlight4,
              },
            ],
          },
          conceptSummary: {
            given: [
              {
                text: "1 box = 15 pens = Rp36.000,00",
                color: highlight1,
              },
            ],

            toFind: [
              {
                text: "How much does one pen cost?",
                color: highlight2,
              },
              {
                text: "How much should be paid to buy 5 pens?",
                color: highlight3,
              },
            ],

            keyConcepts: [
              {
                text: "Cost of 1 pen = Divide total cost by number of pens.",
                color: highlight4,
              },
              {
                text: "Cost of 1 pen = Rp36.000 ÷ 15\nRp2.400 per 1 pen",
                color: highlight4,
              },
            ],
          },
        },
        page9: {
          highlights: [
            {
              text: "1 box of pens for Rp36.000,00 which contains 15 pens",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How much does one pen cost?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How much money does Mutia have to pay if she only wants to buy 5 pens?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4R",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText: "Cost of 5 pens = 2,400 × 5 = ?",
            imageText: "",
            options: [
              {
                text: "Rp10.000",
                iscorrect: false,
                feedback: "Not quite! Try again.",
              },
              {
                text: "Rp12.000",
                iscorrect: true,
                feedback: "You are right!",
              },
              {
                text: "Rp12.500",
                iscorrect: false,
                feedback: "Not quite! Try again.",
              },
              {
                text: "Rp15.000",
                iscorrect: false,
                feedback: "Not quite! Try again.",
              },
            ],
            keyConcepts: [],
            impFormulae: [
              {
                text: "Cost of 5 pens = Rp2.400 × 5 = Rp.12.000 ",
                color: highlight4,
              },
            ],
          },
          conceptSummary: {
            given: [
              {
                text: "1 box = 15 pens = Rp36.000,00",
                color: highlight1,
              },
            ],

            toFind: [
              {
                text: "How much does one pen cost?",
                color: highlight2,
              },
              {
                text: "How much should be paid to buy 5 pens?",
                color: highlight3,
              },
            ],

            keyConcepts: [
              {
                text: "Cost of 1 pen = Divide total cost by number of pens.",
                color: highlight4,
              },
              {
                text: "Cost of 1 pen = Rp36.000 ÷ 15\nRp2.400 per 1 pen",
                color: highlight4,
              },
              {
                text: "Cost of 5 pens = multiply cost per 1 pen bt 5.",
                color: highlight4,
              },
            ],
          },
        },
        page10: {
          highlights: [
            {
              text: "1 box of pens for Rp36.000,00 which contains 15 pens",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How much does one pen cost?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How much money does Mutia have to pay if she only wants to buy 5 pens?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4R",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText:
              "How much money does Mutia have to pay to buy 5 pens?",
            imageText: "",
            options: [
              {
                text: "Rp2.000 per 1 pen",
                iscorrect: false,
                feedback: "Not quite! Try again.",
              },
              {
                text: "Rp12.500 for 5 pens",
                iscorrect: false,
                feedback: "You are right!",
              },
              {
                text: "Rp12.000 per 1 pen",
                iscorrect: true,
                feedback: "You are right!",
              },
              {
                text: "Rp12.000 for 5 pens",
                iscorrect: false,
                feedback: "Not quite! Try again.",
              },
            ],
            keyConcepts: [],
            impFormulae: [
              {
                text: "Multia has to pay Rp12.000 to buy 5 pens.",
                color: highlight4,
              },
            ],
          },
          conceptSummary: {
            given: [
              {
                text: "1 box = 15 pens = Rp36.000,00",
                color: highlight1,
              },
            ],

            toFind: [
              {
                text: "How much does one pen cost?",
                color: highlight2,
              },
              {
                text: "How much should be paid to buy 5 pens?",
                color: highlight3,
              },
            ],

            keyConcepts: [
              {
                text: "Cost of 1 pen = Divide total cost by number of pens.",
                color: highlight4,
              },
              {
                text: "Cost of 1 pen = Rp36.000 ÷ 15\nRp2.400 per 1 pen",
                color: highlight4,
              },
              {
                text: "Cost of 5 pens = multiply cost per 1 pen bt 5.",
                color: highlight4,
              },
              {
                text: "Cost of 5 pens = Rp2.400 × 5 = Rp.12.000",
                color: highlight4,
              },
            ],
          },
        },
        page11: {
          questionTable1: {
            headers: ["Quantity", "Coffee (in tsp)", "Sugar (in tsp)"],
            rows: [["", "", ""]],
          },
          highlights: [],

          conceptSummary: {
            given: [
              {
                text: "250 ml has 1 tsp of coffee and 2 tsp of sugar",
                color: highlight2,
              },
              {
                text: "1 liter has 4 tsp of coffee and 10 tsp of sugar",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [],
            impFormulae: [
              {
                text: "Dona’s mom needs 4 cups of 250 ml to make 1000 ml",
                color: highlight1,
              },
              { text: "Ratio of coffee to sugar = 1 : 2", color: highlight1 },
              { text: "a : b = 1 : 2", color: highlight1 },
              { text: "a = 4", color: highlight1 },
            ],
          },
          fillBlanks: {
            instructionText:
              "What is the ratio of coffee to sugar in 250 ml of coffee?",
            options: [
              {
                id: "opt1",
                text: "4",
                feedbackText: "No, try again!",
                blankID: [],
              },
              {
                id: "opt2",
                text: "6",
                feedbackText: "No, try again!",
                blankID: [],
              },
              {
                id: "opt3",
                text: "8",
                feedbackText:
                  "Right! To keep the ratio equivalent, we need to multiply by 4.",
                blankID: [{ bid: "blank6", text: "8" }],
              },
              {
                id: "opt4",
                text: "10",
                feedbackText: "No, try again!",
                blankID: [],
              },
            ],
            containers: {},
            impFormulae: [{ text: "b = 8", color: highlight1 }],
          },
        },

        page12: {
          questionTable1: {
            headers: ["Quantity", "Coffee (in tsp)", "Sugar (in tsp)"],
            rows: [
              ["", "", ""],
              ["", "", ""],
            ],
          },
          questionTable2: {
            headers: ["Quantity", "Coffee (in tsp)", "Sugar (in tsp)"],
            rows: [["", "", ""]],
          },
          highlights: [],

          conceptSummary: {
            given: [
              {
                text: "250 ml has 1 tsp of coffee and 2 tsp of sugar",
                color: highlight2,
              },
              {
                text: "1 liter has 4 tsp of coffee and 10 tsp of sugar",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [],
            impFormulae: [
              {
                text: "Dona's mom needs 4 cups of 250 ml to make 1000 ml",
                color: highlight1,
              },
              { text: "Ratio of coffee to sugar = 1 : 2", color: highlight1 },
              { text: "a : b = 1 : 2", color: highlight1 },
              { text: "a = 4", color: highlight1 },
              { text: "b = 8", color: highlight1 },
            ],
          },
          conclusion: {
            text: "The amount of sugar is different in Mom's and Dona's coffee.<br>So, Dona's coffee tastes <span style=\"color: transparent;\">sweeter than</span> \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0mom's coffee.",
          },
          fillBlanks: {
            instructionText:
              "Drag and drop the correct options to fill in the highlighted blank in blue box.",
            blank10Coordinate: [390, 705, 600, 765],
            options: [
              {
                id: "opt1",
                text: "same as",
                feedbackText:
                  "Not quite! Dona's coffee has same amount of water and coffee but more sugar.",
                blankID: [],
              },
              {
                id: "opt2",
                text: "sweeter than",
                feedbackText:
                  "You are right! Dona's coffee has same amount of water and coffee but more sugar.",
                blankID: [{ bid: "blank10", text: "sweeter than" }],
              },
              {
                id: "opt3",
                text: "bitter than",
                feedbackText:
                  "Not quite! Dona's coffee has same amount of water and coffee but more sugar.",
                blankID: [],
              },
            ],
            containers: {},
            impFormulae: [
              { text: "Dona's coffee is sweeter", color: highlight1 },
            ],
          },
        },
        page13: {
          questionTable1: {
            headers: ["Quantity", "Coffee (in tsp)", "Sugar (in tsp)"],
            rows: [
              ["", "", ""],
              ["", "", ""],
            ],
          },
          questionTable2: {
            headers: ["Quantity", "Coffee (in tsp)", "Sugar (in tsp)"],
            rows: [["", "", ""]],
          },
          highlights: [],

          conceptSummary: {
            given: [
              {
                text: "250 ml has 1 tsp of coffee and 2 tsp of sugar",
                color: highlight2,
              },
              {
                text: "1 liter has 4 tsp of coffee and 10 tsp of sugar",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [],
            impFormulae: [
              {
                text: "Dona’s mom needs 4 cups of 250 ml to make 1000 ml",
                color: highlight1,
              },
              { text: "Ratio of coffee to sugar = 1 : 2", color: highlight1 },
              { text: "a : b = 1 : 2", color: highlight1 },
              { text: "a = 4", color: highlight1 },
              { text: "b = 8", color: highlight1 },
              { text: "Dona's coffee is sweeter", color: highlight1 },
            ],
          },
          fillBlanks: {
            instructionText:
              "Drag and drop the correct options to fill in the highlighted blank in blue box.",
            options: [
              {
                id: "opt1",
                text: "same as",
                feedbackText:
                  "Not quite! Dona's coffee has same amount of water and coffee but more sugar.",
                blankID: [{ bid: "blank1", text: "250 ml" }],
              },
              {
                id: "opt2",
                text: "sweeter than",
                feedbackText:
                  "You are right! Dona's coffee has same amount of water and coffee but more sugar.",
                blankID: [{ bid: "blank10", text: "sweeter than" }],
              },
              {
                id: "opt3",
                text: "bitter than",
                feedbackText:
                  "Not quite! Dona's coffee has same amount of water and coffee but more sugar.",
                blankID: [{ bid: "blank5", text: "4" }],
              },
            ],
            containers: {},
            impFormulae: [],
          },
          feedbackTextbox: {
            text: "The amount of sugar is different in Mom's and Dona's coffee.<br>So, Dona's coffee tastes sweeter than mom's coffee.",
          },
        },
      },
    },

    id: {
      appInfo: {
        title: "Aplet Pembelajaran Matematika Interaktif",
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
        questionText:
          "Ayah meminta Dona untuk membuat kopi untuk teman-temannya. Biasanya, untuk membuat 1 cangkir kecil berukuran 250 ml, Ibu menggunakan 1 sdt kopi dan 2 sdt gula. Dona ingin membuat kopi dalam teko yang menampung 1 liter air menggunakan 4 sdt kopi dan 10 sdt gula. Dibandingkan dengan kopi yang dibuat oleh Ibu, perkirakan rasa kopi yang dibuat oleh Dona. Apakah terlalu pahit, terlalu manis, atau pas?",
        labels: {
          mom: "Ibu",
          dona: "Dona",
          quantity250ml: "250 ml",
          quantity1liter: "1 liter",
          quantity1000ml: "1000 ml",
          number1: "1",
          number2: "2",
          number4: "4",
          number8: "8",
          number10: "10",
          variableA: "a",
          variableB: "b",
          times4: "×4",
          timesQuestion: "×?",
          dropHere: "Letakkan di sini",
        },
        informationAnalysis: {
          header: "ANALISIS INFORMASI",
          facts: "Fakta",
          values: "Nilai",
          toFind: "Ditanyakan",
        },
        tableHeaders: {
          quantity: "Jumlah",
          coffee: "Kopi (dalam sdt)",
          sugar: "Gula (dalam sdt)",
        },
        conceptSummary: {
          header: "RINGKASAN KONSEP",
          given: "Diketahui",
          toFind: "Ditanyakan",
          keyConcepts: "Konsep Kunci",
          importantFormulae: "Perhitungan",
        },
      },

      pages: {
        page1: {
          questionIntro:
            "Di tabel berikut adalah jumlah siswa yang bergabung dengan berbagai klub sekolah.",
          questionTable: {
            headers: ["Klub", "Jumlah Anggota"],
            rows: [
              ["Sains", "16"],
              ["Olahraga", "…"],
              ["Seni", "24"],
              ["Robotika", "…"],
            ],
          },
          introduction:
            "Mari kita bandingkan kopi yang dibuat oleh Dona dan ibunya menggunakan rasio!",
          highlights: [
            {
              text: "a. Tuliskan rasio paling sederhana dari anggota Klub Sains terhadap Klub Seni.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "25gc",
              bold: true,
              underline: false,
            },
          ],
        },
        page2: {
          questionTable: {
            headers: ["Klub", "Jumlah Anggota"],
            rows: [
              ["Sains", "16"],
              ["Olahraga", ""],
              ["Seni", "24"],
              ["Robotika", ""],
            ],
          },
          highlights: [
            {
              text: "1 cangkir kecil berukuran 250 ml, Ibu menggunakan 1 sdt kopi dan 2 sdt gula.",
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
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [],
          },
        },
        page3: {
          questionTable: {
            headers: ["Klub", "Jumlah Anggota"],
            rows: [
              ["Sains", "16"],
              ["Olahraga", ""],
              ["Seni", "24"],
              ["Robotika", ""],
            ],
          },
          highlights: [
            {
              text: "1 cangkir kecil berukuran 250 ml, Ibu menggunakan 1 sdt kopi dan 2 sdt gula.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "1 liter air menggunakan 4 sdt kopi dan 10 sdt gula.",
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
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight1,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            values: [],
            toFind: [],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [],
            impFormulae: [],
          },
        },
        page4: {
          questionTable: {
            headers: ["Klub", "Jumlah Anggota"],
            rows: [
              ["Sains", "16"],
              ["Olahraga", ""],
              ["Seni", "24"],
              ["Robotika", ""],
            ],
          },
          highlights: [
            {
              text: "1 cangkir kecil berukuran 250 ml, Ibu menggunakan 1 sdt kopi dan 2 sdt gula.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "1 liter air menggunakan 4 sdt kopi dan 10 sdt gula.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "perkirakan rasa kopi yang dibuat oleh Dona. Apakah terlalu pahit, terlalu manis, atau pas?",
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
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight1,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Apakah kopi Dona sama, pahit, atau manis?",
                color: highlight3,
              },
            ],
          },
        },
        page5: {
          questionTable1: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [["", "", ""]],
          },
          questionTable2: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [["", "", ""]],
          },
          highlights: [],
          informationAnalysis: {
            facts: [],
            values: [],
            toFind: [],
          },
          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [{ text: "1 liter = 1000 ml", color: highlight1 }],
            impFormulae: [],
          },
          fillBlanks: {
            instructionText:
              "Pilih opsi yang benar untuk mengisi bagian yang kosong.",
            options: [
              {
                id: "opt1",
                text: "250 ml",
                feedbackText: "Benar!",
                blankID: [{ bid: "blank1", text: "250 ml" }],
              },
              {
                id: "opt2",
                text: "1 liter",
                feedbackText: "Benar!",
                blankID: [{ bid: "blank4", text: "1 liter" }],
              },
              {
                id: "opt3",
                text: "4",
                feedbackText: "Benar!",
                blankID: [{ bid: "blank5", text: "4" }],
              },
              {
                id: "opt4",
                text: "1",
                feedbackText: "Benar!",
                blankID: [{ bid: "blank2", text: "1" }],
              },
              {
                id: "opt5",
                text: "2",
                feedbackText: "Benar!",
                blankID: [{ bid: "blank3", text: "2" }],
              },
              {
                id: "opt6",
                text: "10",
                feedbackText: "Benar!",
                blankID: [{ bid: "blank6", text: "10" }],
              },
            ],
            containers: {},
            impFormulae: [],
          },
        },
        page6: {
          questionTable1: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [["", "", ""]],
          },
          questionTable2: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [["", "", ""]],
          },
          highlights: [],

          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [{ text: "1 liter = 1000 ml", color: highlight1 }],
            impFormulae: [],
          },
          fillBlanks: {
            instructionText:
              "Teko Dona berukuran 1 liter. Untuk membandingkan dengan benar, kita perlu mengubahnya menjadi mililiter. 1 liter = ?",
            options: [
              {
                id: "opt1",
                text: "250 ml",
                feedbackText: "Belum tepat! Coba lagi.",
                blankID: [],
              },
              {
                id: "opt2",
                text: "500 ml",
                feedbackText: "Belum tepat! Coba lagi.",
                blankID: [],
              },
              {
                id: "opt3",
                text: "750 ml",
                feedbackText: "Belum tepat! Coba lagi.",
                blankID: [],
              },
              {
                id: "opt4",
                text: "1000 ml",
                feedbackText:
                  "Bagus! Mari kita ganti 1 liter dengan 1000 ml di tabel Dona.",
                blankID: [{ bid: "blank4", text: "1000 ml" }],
              },
            ],
            containers: {},
            impFormulae: [
              {
                text: "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
                color: highlight1,
              },
            ],
          },
        },
        page7: {
          questionTable1: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [
              ["", "", ""],
              ["", "", ""],
            ],
          },
          highlights: [],

          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [{ text: "1 liter = 1000 ml", color: highlight1 }],
            impFormulae: [
              {
                text: "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
                color: highlight1,
              },
            ],
          },
          fillBlanks: {
            instructionText:
              "Jika ibu Dona membuat 1000 ml kopi, berapa cangkir 250 ml yang dibutuhkannya?",
            options: [
              {
                id: "opt1",
                text: "2",
                feedbackText: "Belum tepat! 250 ml × 2 = 500 ml",
                blankID: [],
              },
              {
                id: "opt2",
                text: "4",
                feedbackText:
                  "Bagus! Mari kita masukkan itu ke dalam tabel rasio Ibu",
                blankID: [{ bid: "blank5", text: "4" }],
              },
              {
                id: "opt3",
                text: "6",
                feedbackText: "Belum tepat! 250 ml × 6 = 1500 ml",
                blankID: [],
              },
              {
                id: "opt4",
                text: "8",
                feedbackText: "Belum tepat! 250 ml × 8 = 2000 ml",
                blankID: [],
              },
            ],
            containers: {},
            impFormulae: [],
          },
        },
        page8: {
          questionTable1: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [["", "", ""]],
          },
          highlights: [],

          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [{ text: "1 liter = 1000 ml", color: highlight1 }],
            impFormulae: [
              {
                text: "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
                color: highlight1,
              },
            ],
          },
          fillBlanks: {
            instructionText:
              "Berapa rasio kopi terhadap gula dalam 250 ml kopi?",
            options: [
              {
                id: "opt1",
                text: "2 : 1",
                feedbackText: "Tidak, itu rasio gula terhadap kopi.",
                blankID: [],
              },
              {
                id: "opt2",
                text: "1 : 2",
                feedbackText: "Ya, itu 1 sdt kopi terhadap 2 sdt gula.",
                blankID: [
                  { bid: "blank2", text: "1" },
                  { bid: "blank3", text: "2" },
                ],
              },
              {
                id: "opt3",
                text: "1 : 250",
                feedbackText: "Tidak, itu bukan rasio kopi terhadap gula.",
                blankID: [],
              },
              {
                id: "opt4",
                text: "2 : 250",
                feedbackText: "Tidak, itu bukan rasio kopi terhadap gula.",
                blankID: [],
              },
            ],
            containers: {},
            impFormulae: [
              { text: "Rasio kopi terhadap gula = 1 : 2", color: highlight1 },
            ],
          },
        },
        page9: {
          highlights: [],
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT2",
              emptyFeedback:
                "Dalam bentuk paling sederhana, kedua suku rasio tidak memiliki faktor persekutuan selain 1.",
            },
            headerText: "Hubungkan dengan Konsep",
            questionText:
              "Mari kita asumsikan ada 'a' sdt kopi dan 'b' sdt gula dalam 1000 ml kopi. <br><br>Nyatakan benar atau salah –<br>Untuk menjaga rasa yang sama, a : b harus setara dengan 1 : 2.",
            imageText: "",
            options: [
              {
                text: "Salah",
                iscorrect: false,
                feedback:
                  "Jika rasionya tidak setara, kopi akan terasa berbeda.",
              },
              {
                text: "Benar",
                iscorrect: true,
                feedback:
                  "Ya, untuk menjaga rasa yang sama, kita perlu menambahkan jumlah kopi dan gula yang setara.",
              },
            ],
            keyConcepts: [],
            impFormulae: [{ text: "a : b = 1 : 2", color: highlight1 }],
          },

          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [{ text: "1 liter = 1000 ml", color: highlight1 }],
            impFormulae: [
              {
                text: "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
                color: highlight1,
              },
              { text: "Rasio kopi terhadap gula = 1 : 2", color: highlight1 },
            ],
          },
        },
        page10: {
          questionTable1: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [["", "", ""]],
          },
          highlights: [],

          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [],
            impFormulae: [
              {
                text: "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
                color: highlight1,
              },
              { text: "Rasio kopi terhadap gula = 1 : 2", color: highlight1 },
              { text: "a : b = 1 : 2", color: highlight1 },
            ],
          },
          fillBlanks: {
            instructionText:
              "Berapa rasio kopi terhadap gula dalam 250 ml kopi?",
            options: [
              {
                id: "opt1",
                text: "1",
                feedbackText: "Tidak, coba lagi!",
                blankID: [],
              },
              {
                id: "opt2",
                text: "2",
                feedbackText: "Tidak, coba lagi!",
                blankID: [],
              },
              {
                id: "opt3",
                text: "4",
                feedbackText:
                  "Benar! Untuk menjaga rasio setara, kita perlu mengalikan dengan 4.",
                blankID: [{ bid: "blank5", text: "4" }],
              },
              {
                id: "opt4",
                text: "8",
                feedbackText: "Tidak, coba lagi!",
                blankID: [],
              },
            ],
            containers: {},
            impFormulae: [{ text: "a = 4", color: highlight1 }],
          },
        },
        page11: {
          questionTable1: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [["", "", ""]],
          },
          highlights: [],

          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [],
            impFormulae: [
              {
                text: "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
                color: highlight1,
              },
              { text: "Rasio kopi terhadap gula = 1 : 2", color: highlight1 },
              { text: "a : b = 1 : 2", color: highlight1 },
              { text: "a = 4", color: highlight1 },
            ],
          },
          fillBlanks: {
            instructionText:
              "Berapa rasio kopi terhadap gula dalam 250 ml kopi?",
            options: [
              {
                id: "opt1",
                text: "4",
                feedbackText: "Tidak, coba lagi!",
                blankID: [],
              },
              {
                id: "opt2",
                text: "6",
                feedbackText: "Tidak, coba lagi!",
                blankID: [],
              },
              {
                id: "opt3",
                text: "8",
                feedbackText:
                  "Benar! Untuk menjaga rasio setara, kita perlu mengalikan dengan 4.",
                blankID: [{ bid: "blank6", text: "8" }],
              },
              {
                id: "opt4",
                text: "10",
                feedbackText: "Tidak, coba lagi!",
                blankID: [],
              },
            ],
            containers: {},
            impFormulae: [{ text: "b = 8", color: highlight1 }],
          },
        },

        page12: {
          questionTable1: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [
              ["", "", ""],
              ["", "", ""],
            ],
          },
          questionTable2: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [["", "", ""]],
          },
          highlights: [],

          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [],
            impFormulae: [
              {
                text: "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
                color: highlight1,
              },
              { text: "Rasio kopi terhadap gula = 1 : 2", color: highlight1 },
              { text: "a : b = 1 : 2", color: highlight1 },
              { text: "a = 4", color: highlight1 },
              { text: "b = 8", color: highlight1 },
            ],
          },
          conclusion: {
            text: 'Jumlah gula berbeda dalam kopi Ibu dan Dona.<br>Jadi, kopi Dona terasa <span style="color: transparent;">lebih manis daripada</span> <br>kopi ibu.',
          },
          fillBlanks: {
            instructionText:
              "Seret dan lepas opsi yang benar untuk mengisi bagian yang kosong yang disorot dalam kotak biru.",
            blank10Coordinate: [365, 695, 675, 750],
            options: [
              {
                id: "opt1",
                text: "sama dengan",
                feedbackText:
                  "Belum tepat! Kopi Dona memiliki jumlah air dan kopi yang sama tetapi lebih banyak gula.",
                blankID: [],
              },
              {
                id: "opt2",
                text: "lebih manis daripada",
                feedbackText:
                  "Benar! Kopi Dona memiliki jumlah air dan kopi yang sama tetapi lebih banyak gula.",
                blankID: [{ bid: "blank10", text: "lebih manis daripada" }],
              },
              {
                id: "opt3",
                text: "lebih pahit daripada",
                feedbackText:
                  "Belum tepat! Kopi Dona memiliki jumlah air dan kopi yang sama tetapi lebih banyak gula.",
                blankID: [],
              },
            ],
            containers: {},
            impFormulae: [{ text: "Kopi Dona lebih manis", color: highlight1 }],
          },
        },
        page13: {
          questionTable1: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [
              ["", "", ""],
              ["", "", ""],
            ],
          },
          questionTable2: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [["", "", ""]],
          },
          highlights: [],

          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [],
            impFormulae: [
              {
                text: "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
                color: highlight1,
              },
              { text: "Rasio kopi terhadap gula = 1 : 2", color: highlight1 },
              { text: "a : b = 1 : 2", color: highlight1 },
              { text: "a = 4", color: highlight1 },
              { text: "b = 8", color: highlight1 },
              { text: "Kopi Dona lebih manis", color: highlight1 },
            ],
          },
          fillBlanks: {
            instructionText:
              "Seret dan lepas opsi yang benar untuk mengisi bagian yang kosong yang disorot dalam kotak biru.",
            blank10Coordinate: [290, 705, 600, 765],
            options: [
              {
                id: "opt1",
                text: "sama dengan",
                feedbackText:
                  "Belum tepat! Kopi Dona memiliki jumlah air dan kopi yang sama tetapi lebih banyak gula.",
                blankID: [{ bid: "blank1", text: "250 ml" }],
              },
              {
                id: "opt2",
                text: "lebih manis daripada",
                feedbackText:
                  "Benar! Kopi Dona memiliki jumlah air dan kopi yang sama tetapi lebih banyak gula.",
                blankID: [{ bid: "blank10", text: "lebih manis daripada" }],
              },
              {
                id: "opt3",
                text: "lebih pahit daripada",
                feedbackText:
                  "Belum tepat! Kopi Dona memiliki jumlah air dan kopi yang sama tetapi lebih banyak gula.",
                blankID: [{ bid: "blank5", text: "4" }],
              },
            ],
            containers: {},
            impFormulae: [],
          },
          feedbackTextbox: {
            text: "Jumlah gula berbeda dalam kopi Ibu dan Dona.<br>Jadi, kopi Dona terasa lebih manis daripada kopi ibu.",
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
