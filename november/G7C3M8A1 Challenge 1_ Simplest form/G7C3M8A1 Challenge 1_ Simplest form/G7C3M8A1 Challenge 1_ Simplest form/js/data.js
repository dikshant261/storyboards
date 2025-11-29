// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlight1 = "#FFD700";
const highlight2 = "#70ACC7";
const highlight3 = "#F28283";
const highlight4 = "#33ad54";

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
          "Komodo is an animal that is only found in Indonesia, especially in the east of Flores Island. Komodo is an animal that is preserved so that it does not become extinct. Adult Komodo can walk as far as 11.2 km per day while baby Komodo can walk 2000 m per day. Determine the ratio of the distance traveled by adult Komodo to baby Komodo.",
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
            "Let’s compare the distance traveled by adult Komodo to baby Komodo and determine it as the ratio.",
        },
        page2: {
          highlights: [
            {
              text: "Adult Komodo can walk 11.2 km per day. ",
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
                text: "Adult Komodo can walk 11.2 km per day.",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [],
          },
        },
        page3: {
          questionTable: {
            headers: ["Club", "Number of Members"],
            rows: [
              ["Science", "16"],
              ["Sports", ""],
              ["Art", "24"],
              ["Robotics", ""],
            ],
          },
          highlights: [
            {
              text: "Adult Komodo can walk 11.2 km per day.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Baby Komodo can walk 2000 m per day.",
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
                text: "Adult Komodo can walk 11.2 km per day.",
                color: highlight1,
              },
              {
                text: "Baby Komodo can walk 2000 m per day.",
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
          highlights: [
            {
              text: "Adult Komodo can walk 11.2 km per day.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Baby Komodo can walk 2000 m per day.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Ratio of distance traveled by adult Komodo to baby Komodo",
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
                text: "Adult Komodo can walk 11.2 km per day.",
                color: highlight1,
              },
              {
                text: "Baby Komodo can walk 2000 m per day.",
                color: highlight2,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Ratio of distance traveled by adult Komodo to baby Komodo",
                color: highlight3,
              },
            ],
          },
        },
        page5: {
          highlights: [
            {
              text: "Adult Komodo can walk 11.2 km per day.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Baby Komodo can walk 2000 m per day.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Ratio of distance traveled by adult Komodo to baby Komodo",
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
            questionText: "A ratio compares quantities with the same units.",
            imageText: "",
            options: [
              {
                text: "False",
                iscorrect: false,
                feedback: "Not quite. Units must be the same to compare.",
              },
              {
                text: "True",
                iscorrect: true,
                feedback:
                  "Correct! Ratios compare quantities with the same unit.",
              },
            ],
            keyConcepts: [],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },

          conceptSummary: {
            given: [
              {
                text: "Adult Komodo can walk 11.2 km per day.",
                color: highlight2,
              },
              {
                text: "Baby Komodo can walk 2000 m per day.",
                color: highlight2,
              },
            ],
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
        page6: {
          highlights: [
            {
              text: "Adult Komodo can walk 11.2 km per day.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Baby Komodo can walk 2000 m per day.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Ratio of distance traveled by adult Komodo to baby Komodo",
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
              qti4Subtype: "QT4",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText: "1 km = _________ m",
            imageText: "",
            options: [
              {
                text: "250",
                iscorrect: false,
                feedback: "Not quite. Try again!",
              },
              {
                text: "500",
                iscorrect: false,
                feedback: "Not quite. Try again!",
              },
              {
                text: "750",
                iscorrect: false,
                feedback: "Not quite. Try again!",
              },
              {
                text: "1000",
                iscorrect: true,
                feedback: "Correct! 1 km = 1000 m",
              },
            ],
            keyConcepts: [
              {
                text: "1 km = 1000 m",
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
            given: [
              {
                text: "Adult Komodo can walk 11.2 km per day.",
                color: highlight2,
              },
              {
                text: "Baby Komodo can walk 2000 m per day.",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [
              {
                text: "Ratios compare quantities with the same unit.",
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
        },
        page7: {
          highlights: [
            {
              text: "Adult Komodo can walk 11.2 km per day.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Baby Komodo can walk 2000 m per day.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Ratio of distance traveled by adult Komodo to baby Komodo",
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
              qti4Subtype: "QT4",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText:
              "Let’s convert the adult Komodo’s distance into meters. 11.2 km = _________ m",
            imageText: "",
            options: [
              {
                text: "11.2",
                iscorrect: false,
                feedback: "Not quite. Multiply by 1000 to convert km to m.",
              },
              {
                text: "112",
                iscorrect: false,
                feedback: "Not quite. Multiply by 1000 to convert km to m.",
              },
              {
                text: "11200",
                iscorrect: true,
                feedback: "Correct! 11.2 × 1000 = 11200 m",
              },
              {
                text: "1120",
                iscorrect: false,
                feedback: "Not quite. Multiply by 1000 to convert km to m.",
              },
            ],
            keyConcepts: [
              {
                text: "11.2 km = 11200 m",
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
            given: [
              {
                text: "Adult Komodo can walk 11.2 km per day.",
                color: highlight2,
              },
              {
                text: "Baby Komodo can walk 2000 m per day.",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [
              {
                text: "Ratios compare quantities with the same unit.",
                color: highlight4,
              },
              {
                text: "1 km = 1000 m",
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
        },
        page8: {
          highlights: [
            {
              text: "Adult Komodo can walk 11.2 km per day.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Baby Komodo can walk 2000 m per day.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Ratio of distance traveled by adult Komodo to baby Komodo",
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
              qti4Subtype: "QT4",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText:
              "What is the ratio of the distance traveled by adult Komodo to Baby Komodo.",
            imageText: "",
            options: [
              {
                text: "1120/2000",
                iscorrect: false,
                feedback:
                  "Not quite. Use the same units before forming the ratio.",
              },
              {
                text: "11.2/2000",
                iscorrect: false,
                feedback:
                  "Not quite. Use the same units before forming the ratio.",
              },
              {
                text: "11200/2",
                iscorrect: false,
                feedback:
                  "Not quite. Use the same units before forming the ratio.",
              },
              {
                text: "11200/2000",
                iscorrect: true,
                feedback: "Correct! Let’s simplify the ratio.",
              },
            ],
            keyConcepts: [
              {
                text: "Ratio of distance by adult Komodo to baby Komodo = 11200/2000",
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
            given: [
              {
                text: "Adult Komodo can walk 11.2 km per day.",
                color: highlight2,
              },
              {
                text: "Baby Komodo can walk 2000 m per day.",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [
              {
                text: "Ratios compare quantities with the same unit.",
                color: highlight4,
              },
              {
                text: "1 km = 1000 m",
                color: highlight4,
              },
              {
                text: "11.2 km = 11200 m",
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
        },
        page9: {
          highlights: [
            {
              text: "Adult Komodo can walk 11.2 km per day.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Baby Komodo can walk 2000 m per day.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Ratio of distance traveled by adult Komodo to baby Komodo",
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
              qti4Subtype: "QT4",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText:
              "To simplifying the ratio, which of these is correct?",
            imageText: "",
            options: [
              {
                text: "11200/2000=11/2",
                iscorrect: false,
                feedback:
                  "Not quite. Try canceling common zeros in both numbers.",
              },
              {
                text: "11200/2000=112/20",
                iscorrect: true,
                feedback: "Correct! Let’s further simplify the ratio.",
              },
              {
                text: "11200/2000=11/20",
                iscorrect: false,
                feedback:
                  "Not quite. Try canceling common zeros in both numbers.",
              },
              {
                text: "11200/2000=112/2",
                iscorrect: false,
                feedback:
                  "Not quite. Try canceling common zeros in both numbers.",
              },
            ],
            keyConcepts: [
              {
                text: "Ratio of distance by adult Komodo to baby Komodo = 11200/2000 = 112/20",
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
            given: [
              {
                text: "Adult Komodo can walk 11.2 km per day.",
                color: highlight2,
              },
              {
                text: "Baby Komodo can walk 2000 m per day.",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [
              {
                text: "Ratios compare quantities with the same unit.",
                color: highlight4,
              },
              {
                text: "1 km = 1000 m",
                color: highlight4,
              },
              {
                text: "11.2 km = 11200 m",
                color: highlight4,
              },
              {
                text: "Ratio of distance by adult Komodo to baby Komodo = 11200/2000",
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
        },
        page10: {
          highlights: [
            {
              text: "Adult Komodo can walk 11.2 km per day.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Baby Komodo can walk 2000 m per day.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Ratio of distance traveled by adult Komodo to baby Komodo",
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
            questionText: "How can we further simplify 112 and 20.",
            imageText: "",
            options: [
              {
                text: "Divide 112 and 20 by their LCM",
                iscorrect: false,
                feedback:
                  "Not quite. We simplify by dividing both numbers by their greatest common factor. ",
              },
              {
                text: "Divide both numbers by 112",
                iscorrect: false,
                feedback:
                  "Not quite. We simplify by dividing both numbers by their greatest common factor. ",
              },
              {
                text: "Divide 112 and 20 by their GCF",
                iscorrect: true,
                feedback: "Correct! Let’s find GCF of 112 and 20.",
              },
              {
                text: "Divide both numbers by 20",
                iscorrect: false,
                feedback:
                  "Not quite. We simplify by dividing both numbers by their greatest common factor. ",
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
                text: "",
                color: highlight1,
              },
            ],
          },

          conceptSummary: {
            given: [
              {
                text: "Adult Komodo can walk 11.2 km per day.",
                color: highlight2,
              },
              {
                text: "Baby Komodo can walk 2000 m per day.",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [
              {
                text: "Ratios compare quantities with the same unit.",
                color: highlight4,
              },
              {
                text: "1 km = 1000 m",
                color: highlight4,
              },
              {
                text: "11.2 km = 11200 m",
                color: highlight4,
              },
              {
                text: "Ratio of distance by adult Komodo to baby Komodo = 11200/2000 = 112/20",
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
        },
        page11: {
          highlights: [
            {
              text: "Adult Komodo can walk 11.2 km per day.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Baby Komodo can walk 2000 m per day.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Ratio of distance traveled by adult Komodo to baby Komodo",
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
              qti4Subtype: "QT4",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText: "Find the GCF of 112 and 20.",
            imageText: "",
            options: [
              {
                text: "2",
                iscorrect: false,
                feedback:
                  "Not quite. Check the highest number that divides both 112 and 20.",
              },
              {
                text: "4",
                iscorrect: true,
                feedback:
                  "Correct! 4 is the greatest common factor of 112 and 20.",
              },
              {
                text: "8",
                iscorrect: false,
                feedback:
                  "Not quite. Check the highest number that divides both 112 and 20.",
              },
              {
                text: "10",
                iscorrect: false,
                feedback:
                  "Not quite. Check the highest number that divides both 112 and 20.",
              },
            ],
            keyConcepts: [
              {
                text: "GCF of 112 and 20 = 4",
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
            given: [
              {
                text: "Adult Komodo can walk 11.2 km per day.",
                color: highlight2,
              },
              {
                text: "Baby Komodo can walk 2000 m per day.",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [
              {
                text: "Ratios compare quantities with the same unit.",
                color: highlight4,
              },
              {
                text: "1 km = 1000 m",
                color: highlight4,
              },
              {
                text: "11.2 km = 11200 m",
                color: highlight4,
              },
              {
                text: "Ratio of distance by adult Komodo to baby Komodo = 11200/2000 = 112/20",
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
        },
        page12: {
          highlights: [
            {
              text: "Adult Komodo can walk 11.2 km per day.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Baby Komodo can walk 2000 m per day.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Ratio of distance traveled by adult Komodo to baby Komodo",
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
              qti4Subtype: "QT4",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText: "What is the simplest form of the ratio?",
            imageText: "",
            options: [
              {
                text: "28/5",
                iscorrect: true,
                feedback: "Correct! 112 ÷ 4 = 28 and 20 ÷ 4 = 5.",
              },
              {
                text: "28/10",
                iscorrect: false,
                feedback: "Not quite. Try again.",
              },
              {
                text: "56/10",
                iscorrect: false,
                feedback: "Not quite. Try again.",
              },
              {
                text: "25/8",
                iscorrect: false,
                feedback: "Not quite. Try again.",
              },
            ],
            keyConcepts: [
              {
                text: "Simplest form = 28/5",
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
            given: [
              {
                text: "Adult Komodo can walk 11.2 km per day.",
                color: highlight2,
              },
              {
                text: "Baby Komodo can walk 2000 m per day.",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [
              {
                text: "Ratios compare quantities with the same unit.",
                color: highlight4,
              },
              {
                text: "1 km = 1000 m",
                color: highlight4,
              },
              {
                text: "11.2 km = 11200 m",
                color: highlight4,
              },
              {
                text: "Ratio of distance by adult Komodo to baby Komodo = 11200/2000 = 112/20",
                color: highlight4,
              },
              {
                text: "GCF of 112 and 20 = 4",
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
        },
        page13: {
          highlights: [
            {
              text: "Adult Komodo can walk 11.2 km per day.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Baby Komodo can walk 2000 m per day.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Ratio of distance traveled by adult Komodo to baby Komodo",
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
            questionText:
              "What is the ratio of distance by adult Komodo to baby Komodo?",
            imageText: "",
            options: [
              {
                text: "5 : 28",
                iscorrect: false,
                feedback: "Not quite. Try again.",
              },
              {
                text: "28 : 5",
                iscorrect: true,
                feedback: "That’s correct.",
              },
            ],
            keyConcepts: [
              {
                text: "Ratio = 28 : 5",
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
            given: [
              {
                text: "Adult Komodo can walk 11.2 km per day.",
                color: highlight2,
              },
              {
                text: "Baby Komodo can walk 2000 m per day.",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [
              {
                text: "Ratios compare quantities with the same unit.",
                color: highlight4,
              },
              {
                text: "1 km = 1000 m",
                color: highlight4,
              },
              {
                text: "11.2 km = 11200 m",
                color: highlight4,
              },
              {
                text: "Ratio of distance by adult Komodo to baby Komodo = 11200/2000 = 112/20",
                color: highlight4,
              },
              {
                text: "GCF of 112 and 20 = 4",
                color: highlight4,
              },
              {
                text: "Simplest form = 28/5.",
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
        },
        page14: {
          highlights: [
            {
              text: "Adult Komodo can walk 11.2 km per day.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Baby Komodo can walk 2000 m per day.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Ratio of distance traveled by adult Komodo to baby Komodo",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          feedbackTextbox: {
            text: "We concluded that the <span style='background-color: #FFD700; color: #000000; padding: 2px 4px;'>ratio of the distance traveled<br/> by adult Komodo to baby Komodo is 28 : 5.</span>",
          },
          conceptSummary: {
            given: [
              {
                text: "Adult Komodo can walk 11.2 km per day.",
                color: highlight2,
              },
              {
                text: "Baby Komodo can walk 2000 m per day.",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [
              {
                text: "Ratios compare quantities with the same unit.",
                color: highlight4,
              },
              {
                text: "1 km = 1000 m",
                color: highlight4,
              },
              {
                text: "11.2 km = 11200 m",
                color: highlight4,
              },
              {
                text: "Ratio of distance by adult Komodo to baby Komodo = 11200/2000 = 112/20",
                color: highlight4,
              },
              {
                text: "GCF of 112 and 20 = 4",
                color: highlight4,
              },
              {
                text: "Simplest form = 28/5.",
                color: highlight4,
              },
              {
                text: "Ratio = 28 : 5",
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
