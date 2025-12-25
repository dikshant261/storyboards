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
        letsCompare: "Let’s Compare :",
        greaterSign: ">",
        lessSign: "<",
        aText: "a",
        bText: "b",
        mixA: "Mix A",
        mixB: "Mix B",
        mixC: "Mix C",
        crossProduct: "Cross\nProducts",
        questionText: "Which of these three classrooms will look the most colourful?\na) Class 7A – Coloured : White = 16 : 12. b) Class 7B – Coloured : White = 20 : 18. \nc) Class 7C – Coloured : White = 24 : 22",
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
          introduction: "Let’s compare the classroom decorations using ratios!\nEach class has mixed coloured and white balloons in different ratios.Which class’s decoration will look the most colourful (that is, has the highest proportion of coloured balloons)?",
        },
        page2: {
          highlights: [
            {
              text: "Class 7A – Coloured : White = 16 : 12",
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
                text: "Class 7A – Coloured : White = 16 : 12",
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
              text: "Class 7A – Coloured : White = 16 : 12",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: "Class 7B – Coloured : White = 20 : 18",
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
                text: "Class 7A – Coloured : White = 16 : 12",
                color: highlight1,
              },
              {
                text: "Class 7B – Coloured : White = 20 : 18",
                color: highlight2
              }
            ],
            values: [],
            toFind: [],
          },
        },
        page4: {
          highlights: [
            {
              text: "Class 7A – Coloured : White = 16 : 12",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: "Class 7B – Coloured : White = 20 : 18",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: "Class 7C – Coloured : White = 24 : 22",
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
                text: "Class 7A – Coloured : White = 16 : 12",
                color: highlight1,
              },
              {
                text: "Class 7B – Coloured : White = 20 : 18",
                color: highlight2
              },
              {
                text: "Class 7C – Coloured : White = 24 : 22",
                color: highlight3
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
              text: "Class 7A – Coloured : White = 16 : 12",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: "Class 7B – Coloured : White = 20 : 18",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: "Class 7C – Coloured : White = 24 : 22",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
            {
              text: "Which of these three classrooms will look the most colourful",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false,
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Class 7A – Coloured : White = 16 : 12",
                color: highlight1,
              },
              {
                text: "Class 7B – Coloured : White = 20 : 18",
                color: highlight2
              },
              {
                text: "Class 7C – Coloured : White = 24 : 22",
                color: highlight3
              }
            ],
            values: [],
            toFind: [
              {
                text: "Which class has the highest proportion of coloured balloons?",
                color: highlight4
              }
            ],
          },
        },
        page6: {
          highlights: [
            {
              text: " For 1 litre of water, mix ⅔ litre of red syrup.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Mix water and red syrup in the ratio 2 : 3.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "⅔ of the total mixture is water",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Which of these three red syrup mixtures is sweetest?",
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
              "Mixes",
              "Water<br/>(litres)",
              "Syrup<br/>(litres)",
              "Water :<br/>Syrup",
            ],
            rows: [
              ["Mix A", "p", "q", "\\frac{p}{q}"],
              ["Mix B", "r", "s", "\\frac{r}{s}"],
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
            questionText: "If Mix A is sweeter (has less water, more syrup)-",
            imageText: "",
            options: [
              {
                text: "\\frac{p}{q} = \\frac{r}{s}",
                iscorrect: false,
                feedback:
                  "Not quite! If ratios are equal, they will have the same taste.",
              },
              {
                text: "\\frac{p}{s} < \\frac{q}{r}",
                iscorrect: false,
                feedback: "These ratios are not correctly written, try again.",
              },
              {
                text: "\\frac{p}{q} < \\frac{r}{s}",
                iscorrect: true,
                feedback: "Great job!",
              },
              {
                text: "\\frac{p}{q} > \\frac{r}{s}",
                iscorrect: false,
                feedback:
                  "This indicates more water, less syrup. So, less sweet, try again.",
              },
            ],
            keyConcepts: [
              {
                text: "Water : Syrup ratio lesser → Less water → More syrup → More sweet",
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
        page7: {
          highlights: [
            {
              text: " For 1 litre of water, mix ⅔ litre of red syrup.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Mix water and red syrup in the ratio 2 : 3.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "⅔ of the total mixture is water",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Which of these three red syrup mixtures is sweetest?",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["Water<br/>(litres)", "Water :<br/>Syrup"],
            rows: [["1", "\\frac{1}{2}"]],
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
              "Water : Syrup ratio is given in the table. Which of the following options represents the same ratio in terms of whole number? ",
            imageText: "",
            options: [
              {
                text: "1 : 2",
                iscorrect: false,
                feedback:
                  "Not quite! Syrup is half of water. 1 : 2 represents syrup as two times of water.",
              },
              {
                text: "2 : 1",
                iscorrect: true,
                feedback: "Good Job!",
              },
            ],
            keyConcepts: [
              {
                text: "If ratio has fraction terms, multiply both terms by denominator to get equivalent ratio with whole number terms",
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
                text: "Water : Syrup ratio lesser → Less water → More syrup → More sweet",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page8: {
          highlights: [
            {
              text: " For 1 litre of water, mix ⅔ litre of red syrup.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Mix water and red syrup in the ratio 2 : 3.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "⅔ of the total mixture is water",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Which of these three red syrup mixtures is sweetest?",
              highlightColor: highlight4,
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
            headerText: "",
            questionText:
              "Water : syrup ratios are p : q and r : s in two mixes. Arrange the steps given in order to compare the ratios.",
            imageText: "",
            options: [
              {
                text: "Find cross-products.",
                iscorrect: false,
                feedback:
                  "Not quite! Syrup is half of water. 1 : 2 represents syrup as two times of water.",
              },
              {
                text: "Ratio with greater cross-product is greater.",
                iscorrect: true,
                feedback: "Good Job!",
              },
              {
                text: "Write ratios as fractions.",
                iscorrect: false,
                feedback:
                  "Not quite! Syrup is half of water. 1 : 2 represents syrup as two times of water.",
              },
              {
                text: "Compare the cross-products.",
                iscorrect: false,
                feedback:
                  "Not quite! Syrup is half of water. 1 : 2 represents syrup as two times of water.",
              },
            ],
            keyConcepts: [
              {
                text: "If ratio has fraction terms, multiply both terms by denominator to get equivalent ratio with whole number terms",
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
                text: "Water : Syrup ratio lesser → Less water → More syrup → More sweet",
                color: highlight4,
              },
              {
                text: "If ratio has fraction terms, multiply both terms by denominator to get equivalent ratio with whole number terms",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page9: {
          highlights: [
            {
              text: " For 1 litre of water, mix ⅔ litre of red syrup.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Mix water and red syrup in the ratio 2 : 3.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "⅔ of the total mixture is water",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Which of these three red syrup mixtures is sweetest?",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          questionTable: {
            headers: [
              "Mixes",
              "Water<br/>(litres)",
              "Syrup<br/>(litres)",
              "Water :<br/>Syrup",
            ],
            rows: [["Mix A", "1", "\\frac{1}{2}", ""]],
          },
          fillBlanks: {
            instructionText:
              "Mix A in the question has 1 litre of water and ⅔ litre of syrup. So, water : syrup =",
            options: [
              {
                id: "opt1",
                text: "3 : 2",
                feedbackText: "Great job!",
                blankID: [{ bid: "blank1", text: "3 : 2" }],
              },
              {
                id: "opt2",
                text: "2 : 3",
                feedbackText: "Not quite! Multiply both terms by 3. ",
                blankID: [],
              },
            ],
            keyConcepts: [],
            impFormulae: [],
          },

          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "Water : Syrup ratio lesser → Less water → More syrup → More sweet",
                color: highlight4,
              },
              {
                text: "If ratio has fraction terms, multiply both terms by denominator to get equivalent ratio with whole number terms",
                color: highlight4,
              },
              {
                text: "If ratio has fraction terms, multiply both terms by denominator to get equivalent ratio with whole number terms",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page10: {
          highlights: [
            {
              text: " For 1 litre of water, mix ⅔ litre of red syrup.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Mix water and red syrup in the ratio 2 : 3.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "⅔ of the total mixture is water",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Which of these three red syrup mixtures is sweetest?",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          questionTable: {
            headers: [
              "Mixes",
              "Water<br/>(litres)",
              "Syrup<br/>(litres)",
              "Water :<br/>Syrup",
            ],
            rows: [
              ["Mix A", "1", "\\frac{1}{2}", "3 : 2"],
              ["Mix B", "2", "3", "2 : 3"],
            ],
          },
          updationText:
            "Water : Syrup ratio is given in the question. <br/>Let’s update the table and continue.",
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "Water : Syrup ratio lesser → Less water → More syrup → More sweet",
                color: highlight4,
              },
              {
                text: "If ratio has fraction terms, multiply both terms by denominator to get equivalent ratio with whole number terms",
                color: highlight4,
              },
              {
                text: "If ratio has fraction terms, multiply both terms by denominator to get equivalent ratio with whole number terms",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page11: {
          highlights: [
            {
              text: " For 1 litre of water, mix ⅔ litre of red syrup.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Mix water and red syrup in the ratio 2 : 3.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "⅔ of the total mixture is water",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Which of these three red syrup mixtures is sweetest?",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          questionTable: {
            headers: [
              "Mixes",
              "Water<br/>(litres)",
              "Syrup<br/>(litres)",
              "Water :<br/>Syrup",
            ],
            rows: [
              ["Mix A", "1", "\\frac{1}{2}", "3 : 2"],
              ["Mix B", "2", "3", "2 : 3"],
              ["Mix C", "\\frac{2}{3}", "", ""],
            ],
          },
          wTable: {
            headers: ["W", "W", "S"],
            rows: [],
          },
          fillBlanks: {
            instructionText:
              "If \\frac{2}{3} of total mixture is water, then what part of total mixture is syrup?",
            options: [
              {
                id: "opt1",
                text: "\\frac{5}{3}",
                feedbackText: "Not quite! Try Again.",
                blankID: [],
              },
              {
                id: "opt2",
                text: "\\frac{1}{3}",
                feedbackText: "Great job!",
                blankID: [{ bid: "blank1", text: "\\frac{1}{3}" }],
              },
              {
                id: "opt3",
                text: "\\frac{2}{3}",
                feedbackText: "Not quite! Try Again.",
                blankID: [],
              },
              {
                id: "opt4",
                text: "\\frac{5}{3}",
                feedbackText: "Not quite! Try Again.",
                blankID: [],
              },
            ],
            keyConcepts: [],
            impFormulae: [],
          },

          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "Water : Syrup ratio lesser → Less water → More syrup → More sweet",
                color: highlight4,
              },
              {
                text: "If ratio has fraction terms, multiply both terms by denominator to get equivalent ratio with whole number terms",
                color: highlight4,
              },
              {
                text: "If ratio has fraction terms, multiply both terms by denominator to get equivalent ratio with whole number terms",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page12: {
          highlights: [
            {
              text: " For 1 litre of water, mix ⅔ litre of red syrup.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Mix water and red syrup in the ratio 2 : 3.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "⅔ of the total mixture is water",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Which of these three red syrup mixtures is sweetest?",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          questionTable: {
            headers: [
              "Mixes",
              "Water<br/>(litres)",
              "Syrup<br/>(litres)",
              "Water :<br/>Syrup",
            ],
            rows: [
              ["Mix A", "1", "\\frac{1}{2}", "3 : 2"],
              ["Mix B", "2", "3", "2 : 3"],
              ["Mix C", "\\frac{2}{3}", "\\frac{1}{3}", ""],
            ],
          },

          fillBlanks: {
            instructionText: "What is the water : syrup ratio in mix C?",
            options: [
              {
                id: "opt1",
                text: "3 : 2",
                feedbackText: "Not quite! Try Again.",
                blankID: [],
              },
              {
                id: "opt2",
                text: "2 : 3",
                feedbackText: "Not quite! Try Again.",
                blankID: [],
              },
              {
                id: "opt3",
                text: "2 : 1",
                feedbackText: "Great job!",
                blankID: [{ bid: "blank1", text: "2 : 1" }],
              },
              {
                id: "opt4",
                text: "1 : 2",
                feedbackText: "Not quite! Try Again.",
                blankID: [],
              },
            ],
            keyConcepts: [],
            impFormulae: [],
          },

          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "Water : Syrup ratio lesser → Less water → More syrup → More sweet",
                color: highlight4,
              },
              {
                text: "If ratio has fraction terms, multiply both terms by denominator to get equivalent ratio with whole number terms",
                color: highlight4,
              },
              {
                text: "If ratio has fraction terms, multiply both terms by denominator to get equivalent ratio with whole number terms",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page13: {
          highlights: [
            {
              text: " For 1 litre of water, mix ⅔ litre of red syrup.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Mix water and red syrup in the ratio 2 : 3.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "⅔ of the total mixture is water",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Which of these three red syrup mixtures is sweetest?",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          questionTable: {
            headers: [
              "Mixes",
              "Water<br/>(litres)",
              "Syrup<br/>(litres)",
              "Water :<br/>Syrup",
            ],
            rows: [
              ["Mix A", "1", "\\frac{1}{2}", "3 : 2"],
              ["Mix B", "2", "3", "2 : 3"],
              ["Mix C", "\\frac{2}{3}", "\\frac{1}{3}", "2 : 1"],
            ],
          },

          updationText:
            "We have found the ratios of water : syrup in all the mixes.<br/><br/>  Now, let’s compare them. We need to find the smallest ratio of the three, as <span style='color:#EEFF4D' > water : Syrup ratio lesser → Less water → More syrup → More sweet</span>",
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "Water : Syrup ratio lesser → Less water → More syrup → More sweet",
                color: highlight4,
              },
              {
                text: "If ratio has fraction terms, multiply both terms by denominator to get equivalent ratio with whole number terms",
                color: highlight4,
              },
              {
                text: "We compare ratios using cross-multiplication method",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page14: {
          highlights: [
            {
              text: " For 1 litre of water, mix ⅔ litre of red syrup.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Mix water and red syrup in the ratio 2 : 3.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "⅔ of the total mixture is water",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Which of these three red syrup mixtures is sweetest?",
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
              "Mixes",
              "Water :<br/>Syrup"
            ],
            rows: [
              ["Mix A", "3 : 2"],
              ["Mix B", "2 : 3"],
              ["Mix C", "2 : 1"]
            ],
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QTI4R",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText: "Which option shows the correct values of a and b?",
            imageText: "",
            options: [
              {
                text: "a = 3, b = 2",
                iscorrect: false,
                feedback:
                  "Not quite! Try Again.",
              },
              {
                text: "a = 4, b = 9",
                iscorrect: false,
                feedback: "Not quite! Try Again.",
              },
              {
                text: "a = 9, b = 4",
                iscorrect: true,
                feedback: "Great job!",
              },
              {
                text: "a = 2, b = 3",
                iscorrect: false,
                feedback:
                  "Not quite! Try Again.",
              },
            ],
            keyConcepts: [
              {
                text: "Water : Syrup ratio lesser → Less water → More syrup → More sweet",
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
                text: "Water : Syrup ratio lesser → Less water → More syrup → More sweet",
                color: highlight4,
              },
              {
                text: "We compare ratios using cross-multiplication method.",
                color: highlight4,
              }

            ],
            impFormulae: [],
          },
        },
        page15: {
          highlights: [
            {
              text: " For 1 litre of water, mix ⅔ litre of red syrup.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Mix water and red syrup in the ratio 2 : 3.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "⅔ of the total mixture is water",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Which of these three red syrup mixtures is sweetest?",
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
              "Mixes",
              "Water :<br/>Syrup"
            ],
            rows: [
              ["Mix A", "3 : 2"],
              ["Mix B", "2 : 3"],
              ["Mix C", "2 : 1"]
            ],
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QTI2R",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText: "Which mix is sweeter?",
            imageText: "",
            options: [
              {
                text: "Mix A",
                iscorrect: false,
                feedback:
                  "Mix A has more water and less syrup than Mix B.",
              },
              {
                text: "Mix B",
                iscorrect: true,
                feedback: "Good Job!",
              },

            ],
            keyConcepts: [
              {
                text: "Mix B is sweeter than Mix A",
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
                text: "Water : Syrup ratio lesser → Less water → More syrup → More sweet",
                color: highlight4,
              },
              {
                text: "We compare ratios using cross-multiplication method.",
                color: highlight4,
              }

            ],
            impFormulae: [],
          },
        },
        page16: {
          highlights: [
            {
              text: " For 1 litre of water, mix ⅔ litre of red syrup.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Mix water and red syrup in the ratio 2 : 3.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "⅔ of the total mixture is water",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Which of these three red syrup mixtures is sweetest?",
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
              "Mixes",
              "Water :<br/>Syrup"
            ],
            rows: [
              ["Mix A", "3 : 2"],
              ["Mix B", "2 : 3"],
              ["Mix C", "2 : 1"]
            ],
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QTI4R",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText: "Which option shows the correct values of a and b?",
            imageText: "",
            options: [
              {
                text: "a = 1, b = 2",
                iscorrect: false,
                feedback:
                  "Not quite! Try Again.",
              },
              {
                text: "a = 2, b = 6",
                iscorrect: true,
                feedback: "Great job!",
              },
              {
                text: "a = 6, b = 2",
                iscorrect: false,
                feedback: "Not quite! Try Again.",
              },
              {
                text: "a = 2, b = 1",
                iscorrect: false,
                feedback:
                  "Not quite! Try Again.",
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
            keyConcepts: [
              {
                text: "Water : Syrup ratio lesser → Less water → More syrup → More sweet",
                color: highlight4,
              },
              {
                text: "We compare ratios using cross-multiplication method.",
                color: highlight4,
              },
              {
                text: "Mix B is sweeter than Mix A",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page17: {
          highlights: [
            {
              text: " For 1 litre of water, mix ⅔ litre of red syrup.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Mix water and red syrup in the ratio 2 : 3.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "⅔ of the total mixture is water",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Which of these three red syrup mixtures is sweetest?",
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
              "Mixes",
              "Water :<br/>Syrup"
            ],
            rows: [
              ["Mix A", "3 : 2"],
              ["Mix B", "2 : 3"],
              ["Mix C", "2 : 1"]
            ],
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QTI2R",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText: "Which mix is sweeter?",
            imageText: "",
            options: [
              {
                text: "Mix B",
                iscorrect: false,
                feedback:
                  "Mix C has more water and less syrup than Mix B.",
              },
              {
                text: "Mix C",
                iscorrect: true,
                feedback: "Good Job!",
              },

            ],
            keyConcepts: [
              {
                text: "Mix C is sweeter than Mix B",
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
                text: "Water : Syrup ratio lesser → Less water → More syrup → More sweet",
                color: highlight4,
              },
              {
                text: "We compare ratios using cross-multiplication method.",
                color: highlight4,
              },
              {
                text: "Mix B is sweeter than Mix A",
                color: highlight4,
              },

            ],
            impFormulae: [],
          },
        },
        page18: {
          highlights: [
            {
              text: " For 1 litre of water, mix ⅔ litre of red syrup.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Mix water and red syrup in the ratio 2 : 3.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "⅔ of the total mixture is water",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Which of these three red syrup mixtures is sweetest?",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          questionTable: {
            headers: [
              "Mixes",
              "Water<br/>(litres)",
              "Syrup<br/>(litres)",
              "Water :<br/>Syrup",
            ],
            rows: [
              ["Mix A", "1", "\\frac{1}{2}", "3 : 2"],
              ["Mix B", "2", "3", "2 : 3"],
              ["Mix C", "\\frac{2}{3}", "\\frac{1}{3}", "2 : 1"],
            ],
          },

          updationText:
            "We have found that mix B is sweeter than both mix A and mix C. So, <span style='background-color:#EEFF4D'>mix B is the sweetest red syrup mixture.</span>",
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "Water : Syrup ratio lesser → Less water → More syrup → More sweet",
                color: highlight4,
              },
              {
                text: "We compare ratios using cross-multiplication method.",
                color: highlight4,
              },
              {
                text: "Mix B is sweeter than Mix A",
                color: highlight4,
              },
              {
                text: "Mix C is sweeter than Mix B",
                color: highlight4,
              },
              {
                text: 'Mix B is the sweetest red syrup mixture.',
                color: highlight4,
              }
            ],
            impFormulae: [],
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
