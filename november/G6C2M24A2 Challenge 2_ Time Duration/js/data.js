// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlight1 = "#FFD700";
const highlight2 = "#70ACC7";
const highlight3 = "#F28283";
const highlight4 = "#FFAB40";
const highlight5 = "#2D8758";

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
          "Banyu can cover a distance of 1 km in 30 minutes. Answer the following questions:\na. How far does Banyu travel in 1 hour?\nb. At the same speed, how much time will Banyu need if he travels 9 km?\nc. If Banyu walks for 3.5 hours, how far will he travel?",
        labels: {
          given: "Given",
          fromQuestionA: "From question a.",
          fromQuestionB: "From question b.",
          fromQuestionC: "From question c.",
          dropHere: "Drop here",
        },
        informationAnalysis: {
          header: "INFORMATION ANALYSIS",
          facts: "Facts",
          values: "Value",
          toFind: "To Find",
        },
        tableHeaders: {
          distance: "Distance",
          time: "Time",
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
            "Let’s solve this problem using ratio table in three parts.\nPart A: To find the distance covered in 1 hour\nPart B: To find the time taken to travel 9 km\nPart C: To find the distance traveled in 3.5 hours",
          questionTable: {
            headers: ["Club", "Number of Members"],
            rows: [
              ["Science", "16"],
              ["Sports", "…"],
              ["Art", "24"],
              ["Robotics", "…"],
            ],
          },
        },
        page2: {
          highlights: [
            {
              text: "Banyu can cover a distance of 1 km in 30 minutes",
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
                text: "Banyu can cover a distance of 1 km in 30 minutes",
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
              text: "Banyu can cover a distance of 1 km in 30 minutes",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How far does Banyu travel in 1 hour?",
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
                text: "Banyu can cover a distance of 1 km in 30 minutes",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Distance traveled by Banyu in 1 hour.",
                color: highlight2,
              },
            ],
          },
        },
        page4: {
          highlights: [
            {
              text: "Banyu can cover a distance of 1 km in 30 minutes",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How far does Banyu travel in 1 hour?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "how much time will Banyu need if he travels 9 km",
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
                text: "Banyu can cover a distance of 1 km in 30 minutes",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Distance traveled by Banyu in 1 hour.",
                color: highlight2,
              },
              {
                text: "Time take to travel 9 km.",
                color: highlight3,
              },
            ],
          },
        },
        page5: {
          highlights: [
            {
              text: "Banyu can cover a distance of 1 km in 30 minutes",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How far does Banyu travel in 1 hour?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "how much time will Banyu need if he travels 9 km",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "If Banyu walks for 3.5 hours, how far will he travel?",
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
                text: "Banyu can cover a distance of 1 km in 30 minutes",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Distance traveled by Banyu in 1 hour.",
                color: highlight2,
              },
              {
                text: "Time take to travel 9 km.",
                color: highlight3,
              },
              {
                text: "Distance traveled in 3.5 hours.",
                color: highlight4,
              },
            ],
          },
        },
        page6: {
          highlights: [
            {
              text: "Banyu can cover a distance of 1 km in 30 minutes",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How far does Banyu travel in 1 hour?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "how much time will Banyu need if he travels 9 km",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "If Banyu walks for 3.5 hours, how far will he travel?",
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
                text: "Banyu can cover a distance of 1 km in 30 minutes",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Distance traveled by Banyu in 1 hour.",
                color: highlight2,
              },
              {
                text: "Time take to travel 9 km.",
                color: highlight3,
              },
              {
                text: "Distance traveled in 3.5 hours.",
                color: highlight4,
              },
            ],
          },
          tableInstruction:
            "Complete the ratio table with the given information:",
          questionTable1: {
            headers: ["Distance", "Time"],
            rows: [
              ["?", "?"],
              ["?", "?"],
              ["?", "?"],
              ["?", "?"],
            ],
          },
          fillBlanks: {
            instructionText:
              "Select the correct options to fill in the blanks.",
            options: [
              {
                id: "opt1",
                text: "1 km",
                feedbackText: "You are right!",
                blankID: [{ bid: "blank1", text: "1 km" }],
              },
              {
                id: "opt2",
                text: "30 minutes",
                feedbackText: "You are right!",
                blankID: [{ bid: "blank2", text: "30 minutes" }],
              },
              {
                id: "opt3",
                text: "3.5 hours",
                feedbackText: "You are right!",
                blankID: [{ bid: "blank5", text: "3.5 hours" }],
              },
              {
                id: "opt4",
                text: "1 hour",
                feedbackText: "You are right!",
                blankID: [{ bid: "blank3", text: "1 hour" }],
              },
              {
                id: "opt5",
                text: "9 km",
                feedbackText: "You are right!",
                blankID: [{ bid: "blank4", text: "9 km" }],
              },
            ],
            containers: {},
            impFormulae: [],
          },
        },
        page7: {
          highlights: [
            {
              text: "Banyu can cover a distance of 1 km in 30 minutes",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How far does Banyu travel in 1 hour?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "how much time will Banyu need if he travels 9 km",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "If Banyu walks for 3.5 hours, how far will he travel?",
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
                text: "Banyu can cover a distance of 1 km in 30 minutes",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Distance traveled by Banyu in 1 hour.",
                color: highlight2,
              },
              {
                text: "Time take to travel 9 km.",
                color: highlight3,
              },
              {
                text: "Distance traveled in 3.5 hours.",
                color: highlight4,
              },
            ],
          },
          tableInstruction:
            "We need to express all time durations in the same units.",
          questionTable1: {
            headers: ["Distance", "Time"],
            rows: [
              ["1 km", "30 minutes = ___hour"],
              ["?", "1 hour"],
              ["9 km", "?"],
              ["?", "3.5 hours"],
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
            questionText: "30 minutes = ______ hours",
            imageText: "",
            options: [
              {
                text: "1",
                iscorrect: false,
                feedback: "Not correct.1 hour = 60 minutes. So 30 ÷ 60 = 0.5",
              },
              {
                text: "0.4",
                iscorrect: false,
                feedback: "Not correct.1 hour = 60 minutes. So 30 ÷ 60 = 0.5",
              },
              {
                text: "0.5",
                iscorrect: true,
                feedback: "That’s right, 30 minutes = 0.5 hours.",
              },
              {
                text: "2",
                iscorrect: false,
                feedback: "Not correct.1 hour = 60 minutes. So 30 ÷ 60 = 0.5",
              },
            ],
            keyConcepts: [{ text: "30 minutes = 0.5 hour", color: highlight5 }],
            impFormulae: [],
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
              text: "Banyu can cover a distance of 1 km in 30 minutes",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How far does Banyu travel in 1 hour?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "how much time will Banyu need if he travels 9 km",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "If Banyu walks for 3.5 hours, how far will he travel?",
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
                text: "Banyu can cover a distance of 1 km in 30 minutes",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Distance traveled by Banyu in 1 hour.",
                color: highlight2,
              },
              {
                text: "Time take to travel 9 km.",
                color: highlight3,
              },
              {
                text: "Distance traveled in 3.5 hours.",
                color: highlight4,
              },
            ],
          },
          tableInstruction:
            "We need to express all time durations in the same units.",
          questionTable1: {
            headers: ["Distance", "Time"],
            rows: [
              ["1 km", "0.5 hour"],
              ["?", "1 hour"],
              ["9 km", "?"],
              ["?", "3.5 hours"],
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
            questionText: "To change 0.5 hours into 1 hours, what do we do?",
            imageText: "",
            options: [
              {
                text: "÷ 2",
                iscorrect: false,
                feedback: "Not correct. What makes half become one?",
              },
              {
                text: "× 0.5",
                iscorrect: false,
                feedback: "Not correct. What makes half become one?",
              },
              {
                text: "× 5",
                iscorrect: false,
                feedback: "Not correct. What makes half become one?",
              },
              {
                text: "× 2",
                iscorrect: true,
                feedback: "That’s right, 0.5 × 2 = 1",
              },
            ],
            keyConcepts: [{ text: "0.5 hour × 2 = 1 hour", color: highlight5 }],
            impFormulae: [],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [{ text: "30 minutes = 0.5 hour", color: highlight5 }],
            impFormulae: [],
          },
        },
        page9: {
          highlights: [
            {
              text: "Banyu can cover a distance of 1 km in 30 minutes",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How far does Banyu travel in 1 hour?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "how much time will Banyu need if he travels 9 km",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "If Banyu walks for 3.5 hours, how far will he travel?",
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
                text: "Banyu can cover a distance of 1 km in 30 minutes",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Distance traveled by Banyu in 1 hour.",
                color: highlight2,
              },
              {
                text: "Time take to travel 9 km.",
                color: highlight3,
              },
              {
                text: "Distance traveled in 3.5 hours.",
                color: highlight4,
              },
            ],
          },
          tableInstruction: "",
          questionTable1: {
            headers: ["Distance", "Time"],
            rows: [
              ["1 km", "0.5 hour"],
              ["?", "1 hour"],
              ["9 km", "?"],
              ["?", "3.5 hours"],
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
              "Look at the ratio table, find the missing distance for 1 hour.",
            imageText: "",
            options: [
              {
                text: "2",
                iscorrect: true,
                feedback: "That’s right, 1 km × 2 = 2 km",
              },
              {
                text: "1",
                iscorrect: false,
                feedback:
                  "Not correct. Multiply 1 km with the same multiplier, i.e., by 2.",
              },
              {
                text: "0.5",
                iscorrect: false,
                feedback:
                  "Not correct. Multiply 1 km with the same multiplier, i.e., by 2.",
              },
              {
                text: "1.5",
                iscorrect: false,
                feedback:
                  "Not correct. Multiply 1 km with the same multiplier, i.e., by 2.",
              },
            ],
            keyConcepts: [{ text: "1 km × 2 = 2 km", color: highlight5 }],
            impFormulae: [],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              { text: "30 minutes = 0.5 hour", color: highlight5 },
              { text: "0.5 hour × 2 = 1 hour", color: highlight5 },
            ],
            impFormulae: [],
          },
        },
        page10: {
          highlights: [
            {
              text: "Banyu can cover a distance of 1 km in 30 minutes",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How far does Banyu travel in 1 hour?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "how much time will Banyu need if he travels 9 km",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "If Banyu walks for 3.5 hours, how far will he travel?",
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
                text: "Banyu can cover a distance of 1 km in 30 minutes",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Distance traveled by Banyu in 1 hour.",
                color: highlight2,
              },
              {
                text: "Time take to travel 9 km.",
                color: highlight3,
              },
              {
                text: "Distance traveled in 3.5 hours.",
                color: highlight4,
              },
            ],
          },
          tableInstruction: "",
          questionTable1: {
            headers: ["Distance", "Time"],
            rows: [
              ["1 km", "0.5 hour"],
              ["2", "1 hour"],
              ["9 km", "?"],
              ["?", "3.5 hours"],
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
            questionText: "To change 1 km to 9 km, what do we do?",
            imageText: "",
            options: [
              {
                text: "× 0.5",
                iscorrect: false,
                feedback: "Not correct. 1 km × ____ = 9 km",
              },
              {
                text: "× 4.5",
                iscorrect: false,
                feedback: "Not correct. 1 km × ____ = 9 km",
              },
              {
                text: "× 9",
                iscorrect: true,
                feedback: "That’s right, 1 km × 9 = 9 km",
              },
              {
                text: "× 3",
                iscorrect: false,
                feedback: "Not correct. 1 km × ____ = 9 km",
              },
            ],
            keyConcepts: [{ text: "1 km × 9 = 9 km", color: highlight5 }],
            impFormulae: [],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              { text: "30 minutes = 0.5 hour", color: highlight5 },
              { text: "0.5 hour × 2 = 1 hour", color: highlight5 },
              { text: "1 km × 2 = 2 km", color: highlight5 },
            ],
            impFormulae: [],
          },
        },
        page11: {
          highlights: [
            {
              text: "Banyu can cover a distance of 1 km in 30 minutes",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How far does Banyu travel in 1 hour?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "how much time will Banyu need if he travels 9 km",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "If Banyu walks for 3.5 hours, how far will he travel?",
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
                text: "Banyu can cover a distance of 1 km in 30 minutes",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Distance traveled by Banyu in 1 hour.",
                color: highlight2,
              },
              {
                text: "Time take to travel 9 km.",
                color: highlight3,
              },
              {
                text: "Distance traveled in 3.5 hours.",
                color: highlight4,
              },
            ],
          },
          tableInstruction: "",
          questionTable1: {
            headers: ["Distance", "Time"],
            rows: [
              ["1 km", "0.5 hour"],
              ["2", "1 hour"],
              ["9 km", "?"],
              ["?", "3.5 hours"],
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
              "Look at the ratio table, find the missing time for 9 km.",
            imageText: "",
            options: [
              {
                text: "9",
                iscorrect: false,
                feedback: "Not correct. 0.5 hour × 9 = _______",
              },
              {
                text: "0.5",
                iscorrect: false,
                feedback: "Not correct. 0.5 hour × 9 = _______",
              },
              {
                text: "1",
                iscorrect: false,
                feedback: "Not correct. 0.5 hour × 9 = _______",
              },
              {
                text: "4.5",
                iscorrect: true,
                feedback: "That’s right, 0.5 hour × 9 = 4.5 hours",
              },
            ],
            keyConcepts: [
              { text: "0.5 hour × 9 = 4.5 hours", color: highlight5 },
            ],
            impFormulae: [],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              { text: "30 minutes = 0.5 hour", color: highlight5 },
              { text: "0.5 hour × 2 = 1 hour", color: highlight5 },
              { text: "1 km × 2 = 2 km", color: highlight5 },
              { text: "1 km × 9 = 9 km", color: highlight5 },
            ],
            impFormulae: [],
          },
        },
        page12: {
          highlights: [
            {
              text: "Banyu can cover a distance of 1 km in 30 minutes",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How far does Banyu travel in 1 hour?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "how much time will Banyu need if he travels 9 km",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "If Banyu walks for 3.5 hours, how far will he travel?",
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
                text: "Banyu can cover a distance of 1 km in 30 minutes",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Distance traveled by Banyu in 1 hour.",
                color: highlight2,
              },
              {
                text: "Time take to travel 9 km.",
                color: highlight3,
              },
              {
                text: "Distance traveled in 3.5 hours.",
                color: highlight4,
              },
            ],
          },
          tableInstruction: "",
          questionTable1: {
            headers: ["Distance", "Time"],
            rows: [
              ["1 km", "0.5 hour"],
              ["2", "1 hour"],
              ["9 km", "4.5"],
              ["?", "3.5 hours"],
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
            questionText: "To change 1 hour into 3.5 hours, what do we do?",
            imageText: "",
            options: [
              {
                text: "÷ 3.5",
                iscorrect: false,
                feedback: "Not correct. 1 hour × ____ = 3.5 hours.",
              },
              {
                text: "× 3.5",
                iscorrect: true,
                feedback: "That’s right, 1 hour × 3.5 = 3.5 hours",
              },
              {
                text: "× 2",
                iscorrect: false,
                feedback: "Not correct. 1 hour × ____ = 3.5 hours.",
              },
              {
                text: "÷ 2",
                iscorrect: false,
                feedback: "Not correct. 1 hour × ____ = 3.5 hours.",
              },
            ],
            keyConcepts: [
              { text: "1 hour × 3.5 = 3.5 hours", color: highlight5 },
            ],
            impFormulae: [],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              { text: "30 minutes = 0.5 hour", color: highlight5 },
              { text: "0.5 hour × 2 = 1 hour", color: highlight5 },
              { text: "1 km × 2 = 2 km", color: highlight5 },
              { text: "1 km × 9 = 9 km", color: highlight5 },
              { text: "0.5 hour × 9 = 4.5 hours", color: highlight5 },
            ],
            impFormulae: [],
          },
        },

        page13: {
          highlights: [
            {
              text: "Banyu can cover a distance of 1 km in 30 minutes",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How far does Banyu travel in 1 hour?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "how much time will Banyu need if he travels 9 km",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "If Banyu walks for 3.5 hours, how far will he travel?",
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
                text: "Banyu can cover a distance of 1 km in 30 minutes",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Distance traveled by Banyu in 1 hour.",
                color: highlight2,
              },
              {
                text: "Time take to travel 9 km.",
                color: highlight3,
              },
              {
                text: "Distance traveled in 3.5 hours.",
                color: highlight4,
              },
            ],
          },
          tableInstruction: "",
          questionTable1: {
            headers: ["Distance", "Time"],
            rows: [
              ["1 km", "0.5 hour"],
              ["2", "1 hour"],
              ["9 km", "4.5"],
              ["?", "3.5 hours"],
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
              "Look at the ratio table, find the missing distance for 3.5 hours.",
            imageText: "",
            options: [
              {
                text: "7",
                iscorrect: true,
                feedback: "That’s right! In 1 hour, Banyu travels 2 km.",
              },
              {
                text: "3.5",
                iscorrect: false,
                feedback: "Not quite! Look at the ratio table and try again.",
              },
              {
                text: "2",
                iscorrect: false,
                feedback: "Not quite! Look at the ratio table and try again.",
              },
              {
                text: "9",
                iscorrect: false,
                feedback: "Not quite! Look at the ratio table and try again.",
              },
            ],
            keyConcepts: [{ text: "2 km × 3.5 = 7 km", color: highlight5 }],
            impFormulae: [],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              { text: "30 minutes = 0.5 hour", color: highlight5 },
              { text: "0.5 hour × 2 = 1 hour", color: highlight5 },
              { text: "1 km × 2 = 2 km", color: highlight5 },
              { text: "1 km × 9 = 9 km", color: highlight5 },
              { text: "0.5 hour × 9 = 4.5 hours", color: highlight5 },
              { text: "1 hour × 3.5 = 3.5 hours", color: highlight5 },
            ],
            impFormulae: [],
          },
        },
        page14: {
          highlights: [
            {
              text: "Banyu can cover a distance of 1 km in 30 minutes",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How far does Banyu travel in 1 hour?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "how much time will Banyu need if he travels 9 km",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "If Banyu walks for 3.5 hours, how far will he travel?",
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
                text: "Banyu can cover a distance of 1 km in 30 minutes",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Distance traveled by Banyu in 1 hour.",
                color: highlight2,
              },
              {
                text: "Time take to travel 9 km.",
                color: highlight3,
              },
              {
                text: "Distance traveled in 3.5 hours.",
                color: highlight4,
              },
            ],
          },
          tableInstruction: "",
          questionTable1: {
            headers: ["Distance", "Time"],
            rows: [
              ["1 km", "0.5 hour"],
              ["2", "1 hour"],
              ["9 km", "4.5"],
              ["7", "3.5 hours"],
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
            questionText: "How far does Banyu travel in 1 hour? ",
            imageText: "",
            options: [
              {
                text: "2 km",
                iscorrect: true,
                feedback: "That’s right! In 1 hour, Banyu travels 2 km.",
              },
              {
                text: "4.5 km",
                iscorrect: false,
                feedback: "Not quite! Look at the ratio table and try again.",
              },
              {
                text: "7 km",
                iscorrect: false,
                feedback: "Not quite! Look at the ratio table and try again.",
              },
              {
                text: "9 km",
                iscorrect: false,
                feedback: "Not quite! Look at the ratio table and try again.",
              },
            ],
            keyConcepts: [
              { text: "1 hour, Banyu travels 2 km", color: highlight5 },
            ],
            impFormulae: [],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              { text: "30 minutes = 0.5 hour", color: highlight5 },
              { text: "0.5 hour × 2 = 1 hour", color: highlight5 },
              { text: "1 km × 2 = 2 km", color: highlight5 },
              { text: "1 km × 9 = 9 km", color: highlight5 },
              { text: "0.5 hour × 9 = 4.5 hours", color: highlight5 },
              { text: "1 hour × 3.5 = 3.5 hours", color: highlight5 },
              { text: "2 km × 3.5 = 7 km", color: highlight5 },
            ],
            impFormulae: [],
          },
        },
        page15: {
          highlights: [
            {
              text: "Banyu can cover a distance of 1 km in 30 minutes",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How far does Banyu travel in 1 hour?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "how much time will Banyu need if he travels 9 km",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "If Banyu walks for 3.5 hours, how far will he travel?",
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
                text: "Banyu can cover a distance of 1 km in 30 minutes",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Distance traveled by Banyu in 1 hour.",
                color: highlight2,
              },
              {
                text: "Time take to travel 9 km.",
                color: highlight3,
              },
              {
                text: "Distance traveled in 3.5 hours.",
                color: highlight4,
              },
            ],
          },
          tableInstruction: "",
          questionTable1: {
            headers: ["Distance", "Time"],
            rows: [
              ["1 km", "0.5 hour"],
              ["2", "1 hour"],
              ["9 km", "4.5"],
              ["7", "3.5 hours"],
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
            questionText: "How much time will Banyu need if he travels 9 km?",
            imageText: "",
            options: [
              {
                text: "2 hours",
                iscorrect: false,
                feedback: "Not quite! Look at the ratio table and try again.",
              },
              {
                text: "4.5 hours",
                iscorrect: true,
                feedback: "That’s right! Banyu takes 4.5 hours to travel 9 km.",
              },
              {
                text: "7 hours",
                iscorrect: false,
                feedback: "Not quite! Look at the ratio table and try again.",
              },
              {
                text: "9 hours",
                iscorrect: false,
                feedback: "Not quite! Look at the ratio table and try again.",
              },
            ],
            keyConcepts: [
              {
                text: "Banyu takes 4.5 hours to travel 9 km.",
                color: highlight5,
              },
            ],
            impFormulae: [],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              { text: "30 minutes = 0.5 hour", color: highlight5 },
              { text: "0.5 hour × 2 = 1 hour", color: highlight5 },
              { text: "1 km × 2 = 2 km", color: highlight5 },
              { text: "1 km × 9 = 9 km", color: highlight5 },
              { text: "0.5 hour × 9 = 4.5 hours", color: highlight5 },
              { text: "1 hour × 3.5 = 3.5 hours", color: highlight5 },
              { text: "2 km × 3.5 = 7 km", color: highlight5 },
              { text: "1 hour, Banyu travels 2 km", color: highlight5 },
            ],
            impFormulae: [],
          },
        },
        page16: {
          highlights: [
            {
              text: "Banyu can cover a distance of 1 km in 30 minutes",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How far does Banyu travel in 1 hour?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "how much time will Banyu need if he travels 9 km",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "If Banyu walks for 3.5 hours, how far will he travel?",
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
                text: "Banyu can cover a distance of 1 km in 30 minutes",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Distance traveled by Banyu in 1 hour.",
                color: highlight2,
              },
              {
                text: "Time take to travel 9 km.",
                color: highlight3,
              },
              {
                text: "Distance traveled in 3.5 hours.",
                color: highlight4,
              },
            ],
          },
          tableInstruction: "",
          questionTable1: {
            headers: ["Distance", "Time"],
            rows: [
              ["1 km", "0.5 hour"],
              ["2", "1 hour"],
              ["9 km", "4.5"],
              ["7", "3.5 hours"],
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
            questionText: "How far does Banyu travel in 3.5 hours? ",
            imageText: "",
            options: [
              {
                text: "2 km",
                iscorrect: false,
                feedback: "Not quite! Look at the ratio table and try again.",
              },
              {
                text: "4.5 km",
                iscorrect: false,
                feedback: "Not quite! Look at the ratio table and try again.",
              },
              {
                text: "7 km",
                iscorrect: true,
                feedback: "That’s right! In 3.5 hours, Banyu travels 7 km.",
              },
              {
                text: "9 km",
                iscorrect: false,
                feedback: "Not quite! Look at the ratio table and try again.",
              },
            ],
            keyConcepts: [
              {
                text: "In 3.5 hours, Banyu travels 7 km.",
                color: highlight5,
              },
            ],
            impFormulae: [],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              { text: "30 minutes = 0.5 hour", color: highlight5 },
              { text: "0.5 hour × 2 = 1 hour", color: highlight5 },
              { text: "1 km × 2 = 2 km", color: highlight5 },
              { text: "1 km × 9 = 9 km", color: highlight5 },
              { text: "0.5 hour × 9 = 4.5 hours", color: highlight5 },
              { text: "1 hour × 3.5 = 3.5 hours", color: highlight5 },
              { text: "2 km × 3.5 = 7 km", color: highlight5 },
              { text: "1 hour, Banyu travels 2 km", color: highlight5 },
              {
                text: "Banyu takes 4.5 hours to travel 9 km.",
                color: highlight5,
              },
            ],
            impFormulae: [],
          },
        },
        page17: {
          highlights: [
            {
              text: "Banyu can cover a distance of 1 km in 30 minutes",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "How far does Banyu travel in 1 hour?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "how much time will Banyu need if he travels 9 km",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "If Banyu walks for 3.5 hours, how far will he travel?",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          introduction:
            "We concluded that:\na. Banyu traveled 2 km in 1 hour.\nb. He needs 4.5 hours to travel 9 km.\nc. He walks 7 km in 3.5 hours",
          tableInstruction: "",
          questionTable1: {
            headers: ["Distance", "Time"],
            rows: [
              ["1 km", "0.5 hour"],
              ["2", "1 hour"],
              ["9 km", "4.5"],
              ["7", "3.5 hours"],
            ],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              { text: "30 minutes = 0.5 hour", color: highlight5 },
              { text: "0.5 hour × 2 = 1 hour", color: highlight5 },
              { text: "1 km × 2 = 2 km", color: highlight5 },
              { text: "1 km × 9 = 9 km", color: highlight5 },
              { text: "0.5 hour × 9 = 4.5 hours", color: highlight5 },
              { text: "1 hour × 3.5 = 3.5 hours", color: highlight5 },
              { text: "2 km × 3.5 = 7 km", color: highlight5 },
              { text: "1 hour, Banyu travels 2 km", color: highlight5 },
              {
                text: "Banyu takes 4.5 hours to travel 9 km.",
                color: highlight5,
              },
              {
                text: "In 3.5 hours, Banyu travels 7 km.",
                color: highlight5,
              },
            ],
            impFormulae: [],
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
