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
          "Banyu can cover a distance of 1 km in 30 minutes. Answer the following questions:<br>a. How far does Banyu travel in 1 hour?<br>b. At the same speed, how much time will Banyu need if he travels 9 km?<br>c. If Banyu walks for 3.5 hours, how far will he travel?",
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
        imageAlt: {
          tap: "Tap",
          banyu: "Banyu",
          leftArrow: "Left Arrow",
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
                text: "Distance traveled by Banyu in 1 hour?",
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
                text: "Distance traveled by Banyu in 1 hour?",
                color: highlight2,
              },
              {
                text: "Time taken to travel 9 km?",
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
                text: "Distance traveled by Banyu in 1 hour?",
                color: highlight2,
              },
              {
                text: "Time taken to travel 9 km?",
                color: highlight3,
              },
              {
                text: "Distance traveled in 3.5 hours?",
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
                text: "Distance traveled by Banyu in 1 hour?",
                color: highlight2,
              },
              {
                text: "Time taken to travel 9 km?",
                color: highlight3,
              },
              {
                text: "Distance traveled in 3.5 hours?",
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
              text: "How far does Banyu travel in 1 hour?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableInstruction:
            "We need to express all time durations in the same units.",
          questionTable1: {
            headers: ["Distance", "Time"],
            rows: [
              ["1 km", "30 minutes =\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0hour"],
              ["?", "1 hour"],
              ["9 km", "?"],
              ["?", "3.5 hours"],
            ],
          },
          
          fillBlanks: {
            instructionText:
              "Select the correct options to fill in the blanks.",
            options: [
              {
                id: "opt1",
                text: "1",
                feedback: "Not correct.1 hour = 60 minutes. So 30 ÷ 60 = 0.5",
              },
              {
                id: "opt2",
                text: "0.4",
                feedback: "Not correct.1 hour = 60 minutes. So 30 ÷ 60 = 0.5",
              },
              {
                id: "opt3",
                text: "0.5",
                feedback: "That’s right, 30 minutes = 0.5 hours.",
                blankID: [{ bid: "blank1", text: "0.5" }],
              },
              {
                id: "opt4",
                text: "2",
                feedback: "Not correct.1 hour = 60 minutes. So 30 ÷ 60 = 0.5",
              },
            ],
            containers: {},
            impFormulae: [{ text: "30 minutes = 0.5 hour", color: highlight1 }],
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
              text: "How far does Banyu travel in 1 hour?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
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
          
          
          fillBlanks: {
            instructionText:
              "Select the correct options to fill in the blanks.",
            options: [
              {
                id: "opt1",
                text: "÷ 2",
                feedback: "Not correct. What makes half become one?",
              },
              {
                id: "opt2",
                text: "× 0.5",
                feedback: "Not correct. What makes half become one?",
              },
              {
                id: "opt3",
                text: "× 5",
                feedback: "Not correct. What makes half become one?",
              },
              {
                id: "opt4",
                text: "× 2",
                feedback: "That’s right, 0.5 × 2 = 1",
                blankID: [{ bid: "blank1", text: "× 2" }],
              },
            ],
            containers: {},
            impFormulae: [
              { text: "0.5 hour × 2 = 1 hour", color: highlight1 },
            ],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [],
            impFormulae: [{ text: "30 minutes = 0.5 hour", color: highlight1 },
            ],
          },
        },
        page9: {
          highlights: [
            {
              text: "How far does Banyu travel in 1 hour?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
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
          fillBlanks: {
            instructionText:
              "Select the correct options to fill in the blanks.",
            options: [
              {
                id: "opt1",
                text: "2 km",
                feedback: "That's right, 1 km × 2 = 2 km",
                blankID: [{ bid: "blank2", text: "2 km" }],
              },
              {
                id: "opt2",
                text: "1 km",
                feedback: "Not correct. Multiply 1 km with the same multiplier, i.e., by 2.",
              },
              {
                id: "opt3",
                text: "0.5 km",
                feedback: "Not correct. Multiply 1 km with the same multiplier, i.e., by 2.",
              },
              {
                id: "opt4",
                text: "1.5 km",
                feedback: "Not correct. Multiply 1 km with the same multiplier, i.e., by 2.",
              },
            ],
            containers: {},
            impFormulae: [{ text: "1 km × 2 = 2 km", color: highlight1 }],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
            ],
            impFormulae: [
              { text: "30 minutes = 0.5 hour", color: highlight1 },
              { text: "0.5 hour × 2 = 1 hour", color: highlight1 },],
          },
        },
        page10: {
          highlights: [
            {
              text: "how much time will Banyu need if he travels 9 km?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableInstruction: "",
          questionTable1: {
            headers: ["Distance", "Time"],
            rows: [
              ["1 km", "0.5 hour"],
              ["2 km", "1 hour"],
              ["9 km", "?"],
              ["?", "3.5 hours"],
            ],
          },
          fillBlanks: {
            instructionText:
              "Select the correct options to fill in the blanks.",
            options: [
              {
                id: "opt1",
                text: "× 0.5",
                feedback: "Not correct. 1 km × ____ = 9 km",
              },
              {
                id: "opt2",
                text: "× 4.5",
                feedback: "Not correct. 1 km × ____ = 9 km",
              },
              {
                id: "opt3",
                text: "× 9",
                feedback: "That’s right, 1 km × 9 = 9 km",
                blankID: [{ bid: "blank1", text: "× 9" }],
              },
              {
                id: "opt4",
                text: "× 3",
                feedback: "Not correct. 1 km × ____ = 9 km",
              },
            ],
            containers: {},
            impFormulae: [
              { text: "1 km × 9 = 9 km", color: highlight1 }
            ],
          },
          
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
            ],
            impFormulae: [              
              { text: "30 minutes = 0.5 hour", color: highlight1 },
              { text: "0.5 hour × 2 = 1 hour", color: highlight1 },
              { text: "1 km × 2 = 2 km", color: highlight1 }],
          },
        },
        page11: {
          highlights: [
            {
              text: "how much time will Banyu need if he travels 9 km?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableInstruction: "",
          questionTable1: {
            headers: ["Distance", "Time"],
            rows: [
              ["1 km", "0.5 hour"],
              ["2 km", "1 hour"],
              ["9 km", "?"],
              ["?", "3.5 hours"],
            ],
          },
          fillBlanks: {
            instructionText:
              "Select the correct options to fill in the blanks.",
            options: [
              {
                id: "opt1",
                text: "9 km",
                feedback: "Not correct. 0.5 hour × 9 = _______",
              },
              {
                id: "opt2",
                text: "0.5 km",
                feedback: "Not correct. 0.5 hour × 9 = _______",
              },
              {
                id: "opt3",
                text: "1 km",
                feedback: "Not correct. 0.5 hour × 9 = _______",
              },
              {
                id: "opt4",
                text: "4.5 km",
                feedback: "That's right, 0.5 hour × 9 = 4.5 hours",
                blankID: [{ bid: "blank2", text: "4.5 km" }],
              },
            ],
            containers: {},
            impFormulae: [
              { text: "0.5 hour × 9 = 4.5 hours", color: highlight1 }
            ],
          },
          
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
            ],
            impFormulae: [              
              { text: "30 minutes = 0.5 hour", color: highlight1 },
              { text: "0.5 hour × 2 = 1 hour", color: highlight1 },
              { text: "1 km × 2 = 2 km", color: highlight1 },
              { text: "1 km × 9 = 9 km", color: highlight1 }],
          },
        },
        page12: {
          highlights: [
            {
              text: "If Banyu walks for 3.5 hours, how far will he travel?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableInstruction: "",
          questionTable1: {
            headers: ["Distance", "Time"],
            rows: [
              ["1 km", "0.5 hour"],
              ["2 km", "1 hour"],
              ["9 km", "4.5 hours"],
              ["?", "3.5 hours"],
            ],
          },
          fillBlanks: {
            instructionText:
              "Select the correct options to fill in the blanks.",
            options: [
              {
                id: "opt1",
                text: "÷ 3.5",
                feedback: "Not correct. 1 hour × ____ = 3.5 hours",
              },
              {
                id: "opt2",
                text: "× 3.5",
                feedback: "That’s right, 1 hour × 3.5 = 3.5 hours",
                blankID: [{ bid: "blank1", text: "× 3.5" }],
              },
              {
                id: "opt3",
                text: "× 2",
                feedback: "Not correct. 1 hour × ____ = 3.5 hours",
              },
              {
                id: "opt4",
                text: "÷ 2",
                feedback: "Not correct. 1 hour × ____ = 3.5 hours",
              },
            ],
            containers: {},
            impFormulae: [
              { text: "1 hour × 3.5 = 3.5 hours", color: highlight1 }
            ],
          },
          
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
            ],
            impFormulae: [              
              { text: "30 minutes = 0.5 hour", color: highlight1 },
              { text: "0.5 hour × 2 = 1 hour", color: highlight1 },
              { text: "1 km × 2 = 2 km", color: highlight1 },
              { text: "1 km × 9 = 9 km", color: highlight1 },
              { text: "0.5 hour × 9 = 4.5 hours", color: highlight1 }],
          },
        },

        page13: {
          highlights: [
            {
              text: "If Banyu walks for 3.5 hours, how far will he travel?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableInstruction: "",
          questionTable1: {
            headers: ["Distance", "Time"],
            rows: [
              ["1 km", "0.5 hour"],
              ["2 km", "1 hour"],
              ["9 km", "4.5 hours"],
              ["?", "3.5 hours"],
            ],
          },
          fillBlanks: {
            instructionText:
              "Look at the ratio table, find the missing distance for 3.5 hours.",
            options: [
              {
                id: "opt1",
                text: "7 km",
                feedback: "Not correct. 2 km × 3.5 hours = ____",
                blankID: [{ bid: "blank2", text: "7 km" }],
              },
              {
                id: "opt2",
                text: "3.5 km",
                feedback: "That's right, 2 km × 3.5 = 7 km",
              },
              {
                id: "opt3",
                text: "2 km",
                feedback: "Not correct. 2 km × 3.5 hours = ____",
              },
              {
                id: "opt4",
                text: "9 km",
                feedback: "Not correct. 2 km × 3.5 hours = ____",
              },
            ],
            containers: {},
            impFormulae: [
              { text: "2 km × 3.5 = 7 km", color: highlight1 }
            ],
          },
          
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
            ],
            impFormulae: [              
              { text: "30 minutes = 0.5 hour", color: highlight1 },
              { text: "0.5 hour × 2 = 1 hour", color: highlight1 },
              { text: "1 km × 2 = 2 km", color: highlight1 },
              { text: "1 km × 9 = 9 km", color: highlight1 },
              { text: "0.5 hour × 9 = 4.5 hours", color: highlight1 },
              { text: "1 hour × 3.5 = 3.5 hours", color: highlight1 },
              { text: "2 km × 3.5 = 7 km", color: highlight1 }
            ],
          },
        },
        page14: {
            highlights: [
              {
                text: "How far does Banyu travel in 1 hour?",
                highlightColor: highlight1,
                fontColor: "#000000",
                fontSize: "24gc",
                bold: true,
                underline: false,
              },
              {
                text: "how much time will Banyu need if he travels 9 km?",
                highlightColor: highlight4,
                fontColor: "#000000",
                fontSize: "24gc",
                bold: true,
                underline: false,
              },
              {
                text: "If Banyu walks for 3.5 hours, how far will he travel?",
                highlightColor: highlight3,
                fontColor: "#000000",
                fontSize: "24gc",
                bold: true,
                underline: false,
              },
          ],
          tableInstruction: "",
          questionTable1: {
            headers: ["Distance", "Time"],
            rows: [
              ["1 km", "0.5 hour"],
              ["2 km", "1 hour"],
              ["9 km", "4.5 hours"],
              ["?", "3.5 hours"],
            ],
          },
          fillBlanks: {
            instructionText:
              "Look at the ratio table, find the missing distance for 3.5 hours.",
            options: [
              {
                id: "opt1",
                text: "7 km",
                feedback: "Not correct. 2 km × 3.5 hours = ____",
                blankID: [{ bid: "blank2", text: "7 km" }],
              },
              {
                id: "opt2",
                text: "3.5 km",
                feedback: "That's right, 2 km × 3.5 = 7 km",
              },
              {
                id: "opt3",
                text: "2 km",
                feedback: "Not correct. 2 km × 3.5 hours = ____",
              },
              {
                id: "opt4",
                text: "9 km",
                feedback: "Not correct. 2 km × 3.5 hours = ____",
              },
            ],
            containers: {},
            impFormulae: [
              { text: "2 km × 3.5 = 7 km", color: highlight1 }
            ],
          },
          
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
            ],
            impFormulae: [              
              { text: "30 minutes = 0.5 hour", color: highlight1 },
              { text: "0.5 hour × 2 = 1 hour", color: highlight1 },
              { text: "1 km × 2 = 2 km", color: highlight1 },
              { text: "1 km × 9 = 9 km", color: highlight1 },
              { text: "0.5 hour × 9 = 4.5 hours", color: highlight1 },
              { text: "1 hour × 3.5 = 3.5 hours", color: highlight1 },
              { text: "2 km × 3.5 = 7 km", color: highlight1 },
            ],
          },
          feedbackTextbox: {
            text: "We concluded that:<br>a. Banyu traveled <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">2 km in 1 hour</span>.<br>b. He needs <span style=\"background-color: #FFAB40; color: #000000; padding: 2px 4px;\">4.5 hours to travel 9 km</span>.<br>c. He walks <span style=\"background-color: #F28283; color: #000000; padding: 2px 4px;\">7 km in 3.5 hours</span>",
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
          "Banyu dapat menempuh jarak 1 km dalam 30 menit. Jawab pertanyaan berikut:<br>a. Berapa jauh Banyu menempuh dalam 1 jam?<br>b. Dengan kecepatan yang sama, berapa waktu yang dibutuhkan Banyu jika dia menempuh 9 km?<br>c. Jika Banyu berjalan selama 3,5 jam, berapa jauh dia menempuh?",
        labels: {
          given: "Diketahui",
          fromQuestionA: "Dari pertanyaan a.",
          fromQuestionB: "Dari pertanyaan b.",
          fromQuestionC: "Dari pertanyaan c.",
          dropHere: "Letakkan di sini",
        },
        informationAnalysis: {
          header: "ANALISIS INFORMASI",
          facts: "Fakta",
          values: "Nilai",
          toFind: "Yang Dicari",
        },
        tableHeaders: {
          distance: "Jarak",
          time: "Waktu",
        },
        conceptSummary: {
          header: "RINGKASAN KONSEP",
          given: "Diketahui",
          toFind: "Yang Dicari",
          keyConcepts: "Konsep Kunci",
          importantFormulae: "Perhitungan",
        },
        imageAlt: {
          tap: "Ketuk",
          banyu: "Banyu",
          leftArrow: "Panah Kiri",
        },
      },

      pages: {
        page1: {
          introduction:
            "Mari kita selesaikan masalah ini menggunakan tabel perbandingan dalam tiga bagian.\nBagian A: Untuk mencari jarak yang ditempuh dalam 1 jam\nBagian B: Untuk mencari waktu yang dibutuhkan untuk menempuh 9 km\nBagian C: Untuk mencari jarak yang ditempuh dalam 3,5 jam",
          questionTable: {
            headers: ["Klub", "Jumlah Anggota"],
            rows: [
              ["Sains", "16"],
              ["Olahraga", "…"],
              ["Seni", "24"],
              ["Robotika", "…"],
            ],
          },
        },
        page2: {
          highlights: [
            {
              text: "Banyu dapat menempuh jarak 1 km dalam 30 menit",
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
                text: "Banyu dapat menempuh jarak 1 km dalam 30 menit",
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
              text: "Banyu dapat menempuh jarak 1 km dalam 30 menit",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Berapa jauh Banyu menempuh dalam 1 jam?",
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
                text: "Banyu dapat menempuh jarak 1 km dalam 30 menit",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Jarak yang ditempuh Banyu dalam 1 jam?",
                color: highlight2,
              },
            ],
          },
        },
        page4: {
          highlights: [
            {
              text: "Banyu dapat menempuh jarak 1 km dalam 30 menit",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Berapa jauh Banyu menempuh dalam 1 jam?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "berapa waktu yang dibutuhkan Banyu jika dia menempuh 9 km",
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
                text: "Banyu dapat menempuh jarak 1 km dalam 30 menit",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Jarak yang ditempuh Banyu dalam 1 jam?",
                color: highlight2,
              },
              {
                text: "Waktu yang dibutuhkan untuk menempuh 9 km?",
                color: highlight3,
              },
            ],
          },
        },
        page5: {
          highlights: [
            {
              text: "Banyu dapat menempuh jarak 1 km dalam 30 menit",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Berapa jauh Banyu menempuh dalam 1 jam?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "berapa waktu yang dibutuhkan Banyu jika dia menempuh 9 km",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Jika Banyu berjalan selama 3,5 jam, berapa jauh dia menempuh?",
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
                text: "Banyu dapat menempuh jarak 1 km dalam 30 menit",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Jarak yang ditempuh Banyu dalam 1 jam?",
                color: highlight2,
              },
              {
                text: "Waktu yang dibutuhkan untuk menempuh 9 km?",
                color: highlight3,
              },
              {
                text: "Jarak yang ditempuh dalam 3,5 jam?",
                color: highlight4,
              },
            ],
          },
        },
        page6: {
          highlights: [
            {
              text: "Banyu dapat menempuh jarak 1 km dalam 30 menit",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Berapa jauh Banyu menempuh dalam 1 jam?",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "berapa waktu yang dibutuhkan Banyu jika dia menempuh 9 km",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Jika Banyu berjalan selama 3,5 jam, berapa jauh dia menempuh?",
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
                text: "Banyu dapat menempuh jarak 1 km dalam 30 menit",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Jarak yang ditempuh Banyu dalam 1 jam?",
                color: highlight2,
              },
              {
                text: "Waktu yang dibutuhkan untuk menempuh 9 km?",
                color: highlight3,
              },
              {
                text: "Jarak yang ditempuh dalam 3,5 jam?",
                color: highlight4,
              },
            ],
          },
          tableInstruction:
            "Lengkapi tabel perbandingan dengan informasi yang diberikan:",
          questionTable1: {
            headers: ["Jarak", "Waktu"],
            rows: [
              ["?", "?"],
              ["?", "?"],
              ["?", "?"],
              ["?", "?"],
            ],
          },
          fillBlanks: {
            instructionText:
              "Pilih opsi yang benar untuk mengisi bagian yang kosong.",
            options: [
              {
                id: "opt1",
                text: "1 km",
                feedbackText: "Kamu benar!",
                blankID: [{ bid: "blank1", text: "1 km" }],
              },
              {
                id: "opt2",
                text: "30 menit",
                feedbackText: "Kamu benar!",
                blankID: [{ bid: "blank2", text: "30 menit" }],
              },
              {
                id: "opt3",
                text: "3,5 jam",
                feedbackText: "Kamu benar!",
                blankID: [{ bid: "blank5", text: "3,5 jam" }],
              },
              {
                id: "opt4",
                text: "1 jam",
                feedbackText: "Kamu benar!",
                blankID: [{ bid: "blank3", text: "1 jam" }],
              },
              {
                id: "opt5",
                text: "9 km",
                feedbackText: "Kamu benar!",
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
              text: "Berapa jauh Banyu menempuh dalam 1 jam?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableInstruction:
            "Kita perlu menyatakan semua durasi waktu dalam satuan yang sama.",
          questionTable1: {
            headers: ["Jarak", "Waktu"],
            rows: [
              ["1 km", "30 menit =\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0jam"],
              ["?", "1 jam"],
              ["9 km", "?"],
              ["?", "3,5 jam"],
            ],
          },
          
          fillBlanks: {
            instructionText:
              "Pilih opsi yang benar untuk mengisi bagian yang kosong.",
            options: [
              {
                id: "opt1",
                text: "1",
                feedback: "Tidak benar. 1 jam = 60 menit. Jadi 30 ÷ 60 = 0,5",
              },
              {
                id: "opt2",
                text: "0,4",
                feedback: "Tidak benar. 1 jam = 60 menit. Jadi 30 ÷ 60 = 0,5",
              },
              {
                id: "opt3",
                text: "0,5",
                feedback: "Benar, 30 menit = 0,5 jam.",
                blankID: [{ bid: "blank1", text: "0,5" }],
              },
              {
                id: "opt4",
                text: "2",
                feedback: "Tidak benar. 1 jam = 60 menit. Jadi 30 ÷ 60 = 0,5",
              },
            ],
            containers: {},
            impFormulae: [{ text: "30 menit = 0,5 jam", color: highlight1 }],
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
              text: "Berapa jauh Banyu menempuh dalam 1 jam?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableInstruction:
            "Kita perlu menyatakan semua durasi waktu dalam satuan yang sama.",
          questionTable1: {
            headers: ["Jarak", "Waktu"],
            rows: [
              ["1 km", "0,5 jam"],
              ["?", "1 jam"],
              ["9 km", "?"],
              ["?", "3,5 jam"],
            ],
          },
          
          
          fillBlanks: {
            instructionText:
              "Pilih opsi yang benar untuk mengisi bagian yang kosong.",
            options: [
              {
                id: "opt1",
                text: "÷ 2",
                feedback: "Tidak benar. Apa yang membuat setengah menjadi satu?",
              },
              {
                id: "opt2",
                text: "× 0,5",
                feedback: "Tidak benar. Apa yang membuat setengah menjadi satu?",
              },
              {
                id: "opt3",
                text: "× 5",
                feedback: "Tidak benar. Apa yang membuat setengah menjadi satu?",
              },
              {
                id: "opt4",
                text: "× 2",
                feedback: "Benar, 0,5 × 2 = 1",
                blankID: [{ bid: "blank1", text: "× 2" }],
              },
            ],
            containers: {},
            impFormulae: [
              { text: "0,5 jam × 2 = 1 jam", color: highlight1 },
            ],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [],
            impFormulae: [{ text: "30 menit = 0,5 jam", color: highlight1 },
            ],
          },
        },
        page9: {
          highlights: [
            {
              text: "Berapa jauh Banyu menempuh dalam 1 jam?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableInstruction: "",
          questionTable1: {
            headers: ["Jarak", "Waktu"],
            rows: [
              ["1 km", "0,5 jam"],
              ["?", "1 jam"],
              ["9 km", "?"],
              ["?", "3,5 jam"],
            ],
          },
          fillBlanks: {
            instructionText:
              "Pilih opsi yang benar untuk mengisi bagian yang kosong.",
            options: [
              {
                id: "opt1",
                text: "2 km",
                feedback: "Benar, 1 km × 2 = 2 km",
                blankID: [{ bid: "blank2", text: "2 km" }],
              },
              {
                id: "opt2",
                text: "1 km",
                feedback: "Tidak benar. Kalikan 1 km dengan pengali yang sama, yaitu dengan 2.",
              },
              {
                id: "opt3",
                text: "0,5 km",
                feedback: "Tidak benar. Kalikan 1 km dengan pengali yang sama, yaitu dengan 2.",
              },
              {
                id: "opt4",
                text: "1,5 km",
                feedback: "Tidak benar. Kalikan 1 km dengan pengali yang sama, yaitu dengan 2.",
              },
            ],
            containers: {},
            impFormulae: [{ text: "1 km × 2 = 2 km", color: highlight1 }],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
            ],
            impFormulae: [
              { text: "30 menit = 0,5 jam", color: highlight1 },
              { text: "0,5 jam × 2 = 1 jam", color: highlight1 },],
          },
        },
        page10: {
          highlights: [
            {
              text: "berapa waktu yang dibutuhkan Banyu jika dia menempuh 9 km?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableInstruction: "",
          questionTable1: {
            headers: ["Jarak", "Waktu"],
            rows: [
              ["1 km", "0,5 jam"],
              ["2 km", "1 jam"],
              ["9 km", "?"],
              ["?", "3,5 jam"],
            ],
          },
          fillBlanks: {
            instructionText:
              "Pilih opsi yang benar untuk mengisi bagian yang kosong.",
            options: [
              {
                id: "opt1",
                text: "× 0,5",
                feedback: "Tidak benar. 1 km × ____ = 9 km",
              },
              {
                id: "opt2",
                text: "× 4,5",
                feedback: "Tidak benar. 1 km × ____ = 9 km",
              },
              {
                id: "opt3",
                text: "× 9",
                feedback: "Benar, 1 km × 9 = 9 km",
                blankID: [{ bid: "blank1", text: "× 9" }],
              },
              {
                id: "opt4",
                text: "× 3",
                feedback: "Tidak benar. 1 km × ____ = 9 km",
              },
            ],
            containers: {},
            impFormulae: [
              { text: "1 km × 9 = 9 km", color: highlight1 }
            ],
          },
          
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
            ],
            impFormulae: [              
              { text: "30 menit = 0,5 jam", color: highlight1 },
              { text: "0,5 jam × 2 = 1 jam", color: highlight1 },
              { text: "1 km × 2 = 2 km", color: highlight1 }],
          },
        },
        page11: {
          highlights: [
            {
              text: "berapa waktu yang dibutuhkan Banyu jika dia menempuh 9 km?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableInstruction: "",
          questionTable1: {
            headers: ["Jarak", "Waktu"],
            rows: [
              ["1 km", "0,5 jam"],
              ["2 km", "1 jam"],
              ["9 km", "?"],
              ["?", "3,5 jam"],
            ],
          },
          fillBlanks: {
            instructionText:
              "Pilih opsi yang benar untuk mengisi bagian yang kosong.",
            options: [
              {
                id: "opt1",
                text: "9 km",
                feedback: "Tidak benar. 0,5 jam × 9 = _______",
              },
              {
                id: "opt2",
                text: "0,5 km",
                feedback: "Tidak benar. 0,5 jam × 9 = _______",
              },
              {
                id: "opt3",
                text: "1 km",
                feedback: "Tidak benar. 0,5 jam × 9 = _______",
              },
              {
                id: "opt4",
                text: "4,5 km",
                feedback: "Benar, 0,5 jam × 9 = 4,5 jam",
                blankID: [{ bid: "blank2", text: "4,5 km" }],
              },
            ],
            containers: {},
            impFormulae: [
              { text: "0,5 jam × 9 = 4,5 jam", color: highlight1 }
            ],
          },
          
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
            ],
            impFormulae: [              
              { text: "30 menit = 0,5 jam", color: highlight1 },
              { text: "0,5 jam × 2 = 1 jam", color: highlight1 },
              { text: "1 km × 2 = 2 km", color: highlight1 },
              { text: "1 km × 9 = 9 km", color: highlight1 }],
          },
        },
        page12: {
          highlights: [
            {
              text: "Jika Banyu berjalan selama 3,5 jam, berapa jauh dia menempuh?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableInstruction: "",
          questionTable1: {
            headers: ["Jarak", "Waktu"],
            rows: [
              ["1 km", "0,5 jam"],
              ["2 km", "1 jam"],
              ["9 km", "4,5 jam"],
              ["?", "3,5 jam"],
            ],
          },
          fillBlanks: {
            instructionText:
              "Pilih opsi yang benar untuk mengisi bagian yang kosong.",
            options: [
              {
                id: "opt1",
                text: "÷ 3,5",
                feedback: "Tidak benar. 1 jam × ____ = 3,5 jam",
              },
              {
                id: "opt2",
                text: "× 3,5",
                feedback: "Benar, 1 jam × 3,5 = 3,5 jam",
                blankID: [{ bid: "blank1", text: "× 3,5" }],
              },
              {
                id: "opt3",
                text: "× 2",
                feedback: "Tidak benar. 1 jam × ____ = 3,5 jam",
              },
              {
                id: "opt4",
                text: "÷ 2",
                feedback: "Tidak benar. 1 jam × ____ = 3,5 jam",
              },
            ],
            containers: {},
            impFormulae: [
              { text: "1 jam × 3,5 = 3,5 jam", color: highlight1 }
            ],
          },
          
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
            ],
            impFormulae: [              
              { text: "30 menit = 0,5 jam", color: highlight1 },
              { text: "0,5 jam × 2 = 1 jam", color: highlight1 },
              { text: "1 km × 2 = 2 km", color: highlight1 },
              { text: "1 km × 9 = 9 km", color: highlight1 },
              { text: "0,5 jam × 9 = 4,5 jam", color: highlight1 }],
          },
        },

        page13: {
          highlights: [
            {
              text: "Jika Banyu berjalan selama 3,5 jam, berapa jauh dia menempuh?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableInstruction: "",
          questionTable1: {
            headers: ["Jarak", "Waktu"],
            rows: [
              ["1 km", "0,5 jam"],
              ["2 km", "1 jam"],
              ["9 km", "4,5 jam"],
              ["?", "3,5 jam"],
            ],
          },
          fillBlanks: {
            instructionText:
              "Lihat tabel perbandingan, cari jarak yang hilang untuk 3,5 jam.",
            options: [
              {
                id: "opt1",
                text: "7 km",
                feedback: "Tidak benar. 2 km × 3,5 jam = ____",
                blankID: [{ bid: "blank2", text: "7 km" }],
              },
              {
                id: "opt2",
                text: "3,5 km",
                feedback: "Benar, 2 km × 3,5 = 7 km",
              },
              {
                id: "opt3",
                text: "2 km",
                feedback: "Tidak benar. 2 km × 3,5 jam = ____",
              },
              {
                id: "opt4",
                text: "9 km",
                feedback: "Tidak benar. 2 km × 3,5 jam = ____",
              },
            ],
            containers: {},
            impFormulae: [
              { text: "2 km × 3,5 = 7 km", color: highlight1 }
            ],
          },
          
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
            ],
            impFormulae: [              
              { text: "30 menit = 0,5 jam", color: highlight1 },
              { text: "0,5 jam × 2 = 1 jam", color: highlight1 },
              { text: "1 km × 2 = 2 km", color: highlight1 },
              { text: "1 km × 9 = 9 km", color: highlight1 },
              { text: "0,5 jam × 9 = 4,5 jam", color: highlight1 },
              { text: "1 jam × 3,5 = 3,5 jam", color: highlight1 },
              { text: "2 km × 3,5 = 7 km", color: highlight1 }
            ],
          },
        },
        page14: {
            highlights: [
              {
                text: "Berapa jauh Banyu menempuh dalam 1 jam?",
                highlightColor: highlight1,
                fontColor: "#000000",
                fontSize: "24gc",
                bold: true,
                underline: false,
              },
              {
                text: "berapa waktu yang dibutuhkan Banyu jika dia menempuh 9 km?",
                highlightColor: highlight4,
                fontColor: "#000000",
                fontSize: "24gc",
                bold: true,
                underline: false,
              },
              {
                text: "Jika Banyu berjalan selama 3,5 jam, berapa jauh dia menempuh?",
                highlightColor: highlight3,
                fontColor: "#000000",
                fontSize: "24gc",
                bold: true,
                underline: false,
              },
          ],
          tableInstruction: "",
          questionTable1: {
            headers: ["Jarak", "Waktu"],
            rows: [
              ["1 km", "0,5 jam"],
              ["2 km", "1 jam"],
              ["9 km", "4,5 jam"],
              ["?", "3,5 jam"],
            ],
          },
          fillBlanks: {
            instructionText:
              "Lihat tabel perbandingan, cari jarak yang hilang untuk 3,5 jam.",
            options: [
              {
                id: "opt1",
                text: "7 km",
                feedback: "Tidak benar. 2 km × 3,5 jam = ____",
                blankID: [{ bid: "blank2", text: "7 km" }],
              },
              {
                id: "opt2",
                text: "3,5 km",
                feedback: "Benar, 2 km × 3,5 = 7 km",
              },
              {
                id: "opt3",
                text: "2 km",
                feedback: "Tidak benar. 2 km × 3,5 jam = ____",
              },
              {
                id: "opt4",
                text: "9 km",
                feedback: "Tidak benar. 2 km × 3,5 jam = ____",
              },
            ],
            containers: {},
            impFormulae: [
              { text: "2 km × 3,5 = 7 km", color: highlight1 }
            ],
          },
          
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
            ],
            impFormulae: [              
              { text: "30 menit = 0,5 jam", color: highlight1 },
              { text: "0,5 jam × 2 = 1 jam", color: highlight1 },
              { text: "1 km × 2 = 2 km", color: highlight1 },
              { text: "1 km × 9 = 9 km", color: highlight1 },
              { text: "0,5 jam × 9 = 4,5 jam", color: highlight1 },
              { text: "1 jam × 3,5 = 3,5 jam", color: highlight1 },
              { text: "2 km × 3,5 = 7 km", color: highlight1 },
            ],
          },
          feedbackTextbox: {
            text: "Kita menyimpulkan bahwa:<br>a. Banyu menempuh <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">2 km dalam 1 jam</span>.<br>b. Dia membutuhkan <span style=\"background-color: #FFAB40; color: #000000; padding: 2px 4px;\">4,5 jam untuk menempuh 9 km</span>.<br>c. Dia berjalan <span style=\"background-color: #F28283; color: #000000; padding: 2px 4px;\">7 km dalam 3,5 jam</span>",
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

