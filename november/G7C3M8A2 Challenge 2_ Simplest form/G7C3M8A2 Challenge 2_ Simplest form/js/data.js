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
        questionText: "Determine : \na. The ratio of the volume of a 220 ml glass to the volume of a 330 ml bottle.\nb. The ratio of the volume of a 600 ml bottle to the volume of a 1500 ml bottle.\nc. The ratio of the volume of the 330 ml bottle and the 600 ml bottle, each reduced by 30 ml.",
        questionA: "Determine : \na. The ratio of the volume of a 220 ml glass to the volume of a 330 ml bottle.",
        questionB: "Determine : \nb. The ratio of the volume of a 600 ml bottle to the volume of a 1500 ml bottle.",
        questionC: "Determine : \nc. The ratio of the volume of a 330 ml bottle and the volume of a 600 ml bottle, each reduced by 30 ml.",
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
          introduction: "Let’s determine the ratios of volumes between the given water packages step by step."
        },
        page2: {
          highlights: [
            {
              text: "volume of a 220 ml glass",
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
                text: "Volume of a glass is 220 ml.	",
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
              text: "volume of a 220 ml glass",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 330 ml bottle.",
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
                text: "Volume of a glass is 220 ml.	",
                color: highlight1,
              },
              {
                text: "Volume of a bottle is 330 ml.",
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
              text: "volume of a 220 ml glass",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 330 ml bottle.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "ratio",
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
                text: "Volume of a glass is 220 ml.	",
                color: highlight1,
              },
              {
                text: "Volume of a bottle is 330 ml.",
                color: highlight2,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Ratio of volume of glass to volume of bottle",
                color: highlight3,
              },
            ],
          },
        },
        page5: {
          highlights: [
            {
              text: "volume of a 220 ml glass",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 330 ml bottle.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "ratio",
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
            questionText: "What do we do to convert a ratio to its simplest form?",
            imageText: "",
            options: [
              {
                text: "Divide both terms by their LCM",
                iscorrect: false,
                feedback: "No! That’s not correct.",
              },
              {
                text: "Divide both terms by the greater number",
                iscorrect: false,
                feedback:
                  "No! That’s not correct.",
              },
              {
                text: "Divide both terms by their GCF",
                iscorrect: true,
                feedback:
                  "Correct! Dividing terms by GCF gives the simplest form of a ratio.",
              }, {
                text: "Divide both terms by any common factor",
                iscorrect: false,
                feedback:
                  " Dividing by any common factor may give an equivalent ratio, not simplest form.",
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
                text: "Volume of a glass is 220 ml.",
                color: highlight1,
              },
              {
                text: "Volume of a bottle is 330 ml.",
                color: highlight2,
              },
            ],
            toFind: [{ text: "Ratio of volume of glass to volume of bottle", color: highlight3 }],
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
              text: "volume of a 220 ml glass",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 330 ml bottle.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "ratio",
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
            questionText: "What is the ratio of the volume of the 220 ml glass to the volume of 330 ml bottle?",
            imageText: "",
            options: [
              {
                text: "\\frac{330}{220}",
                iscorrect: false,
                feedback: "Not quite. Use the same units before forming the ratio.",
              }, {
                text: "\\frac{33}{220}",
                iscorrect: false,
                feedback: "Not quite. Use the same units before forming the ratio.",
              },
              {
                text: "\\frac{220}{330}",
                iscorrect: true,
                feedback: "Correct! Let’s simplify the ratio.",
              },
              {
                text: "\\frac{220}{33}",
                iscorrect: false,
                feedback: "Not quite. Use the same units before forming the ratio.",
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
                text: "Volume of a glass is 220 ml.",
                color: highlight1,
              },
              {
                text: "Volume of a bottle is 330 ml.",
                color: highlight2,
              },
            ],
            toFind: [{ text: "Ratio of volume of glass to volume of bottle", color: highlight3 }],
            keyConcepts: "",
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
              text: "volume of a 220 ml glass",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 330 ml bottle.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "ratio",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          solutionText: {
            text: "Ratio of the volume of the 220 ml <br/>glass to the volume of 330 ml bottle ",
            fractionValue: '= \\frac{220}{330}'
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText: "What is the ratio of the volume of the 220 ml glass to the volume of 330 ml bottle?",
            imageText: "",
            options: [
              {
                text: "\\frac{220}{330} = \\frac{22}{330}",
                iscorrect: false,
                feedback: "Not quite. Try canceling common zeros in both numbers. ",
              }, {
                text: "\\frac{220}{330} = \\frac{22}{33}",
                iscorrect: true,
                feedback: "Correct! Let’s further simplify the ratio. ",
              },
              {
                text: "\\frac{220}{330} = \\frac{22}{30}",
                iscorrect: false,
                feedback: "Not quite. Try canceling common zeros in both numbers. ",
              },
              {
                text: "\\frac{220}{330} = \\frac{22}{3}",
                iscorrect: false,
                feedback: "Not quite. Try canceling common zeros in both numbers. ",
              }
            ],
            keyConcepts: [{
              text: "Ratios of the volume of 220 ml glass to the volume of 330 ml bottle\n = \\frac{220}{330}",
              color: highlight4
            }],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },

          conceptSummary: {
            given: [

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
        page8: {
          highlights: [
            {
              text: "volume of a 220 ml glass",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 330 ml bottle.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "ratio",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          solutionText: {
            text: "Ratio of the volume of the 220 ml <br/>glass to the volume of 330 ml bottle ",
            fractionValue: '= \\frac{220}{330}',
            gcfFractionValue: "= \\frac{22\\;÷\\;GCF}{33\\;÷\\;GCF}"
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText: "Find the GCF of 22 and 33.",
            imageText: "",
            options: [
              {
                text: "66",
                iscorrect: false,
                feedback: "Not quite. Check the highest number that divides both 22 and 33.",
              }, {
                text: "11",
                iscorrect: true,
                feedback: "Correct! 11 is the GCF of 22 and 33.",
              },
              {
                text: "3",
                iscorrect: false,
                feedback: "Not quite. Check the highest number that divides both 22 and 33.",
              },
              {
                text: "2",
                iscorrect: false,
                feedback: "Not quite. Check the highest number that divides both 22 and 33.",
              }
            ],
            keyConcepts: [{
              text: "= \\frac{22}{33}",
              color: highlight4
            }],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },

          conceptSummary: {
            given: [

            ],
            toFind: [],
            keyConcepts: [
              {
                text: "Ratios of the volume of 220 ml glass to the volume of 330 ml bottle<br/> = \\frac{220}{330}",
                color: highlight4
              }
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
              text: "volume of a 220 ml glass",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 330 ml bottle.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "ratio",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          solutionText: {
            text: "Ratio of the volume of the 220 ml <br/>glass to the volume of 330 ml bottle ",
            fractionValue: '= \\frac{220}{330}',
            gcfFractionValue: "= \\frac{22\\;÷\\;11}{33\\;÷\\;11}"
          },
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
                text: "\\frac{2}{3}",
                iscorrect: true,
                feedback: "Correct! 22 ÷ 11 = 2 and 33 ÷ 11 = 3. ",
              }, {
                text: "\\frac{2}{11}",
                iscorrect: false,
                feedback: "Not quite. Try again.",
              },
              {
                text: "\\frac{11}{3}",
                iscorrect: false,
                feedback: "Not quite. Try again.",
              },
              {
                text: "\\frac{2}{33}",
                iscorrect: false,
                feedback: "Not quite. Try again.",
              }
            ],
            keyConcepts: [{
              text: "GCF of 22 and 33 is 11.",
              color: highlight4
            }],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },

          conceptSummary: {
            given: [

            ],
            toFind: [],
            keyConcepts: [
              {
                text: "Ratios of the volume of 220 ml glass to the volume of 330 ml bottle<br/> = \\frac{220}{330}",
                color: highlight4
              },
              {
                text: "= \\frac{22}{33}",
                color: highlight4
              }
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
              text: "volume of a 220 ml glass",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 330 ml bottle.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "ratio",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          solutionText: {
            text: "Ratio of the volume of the 220 ml <br/>glass to the volume of 330 ml bottle ",
            fractionValue: '= \\frac{220}{330}',
            gcfFractionValue: "= \\frac{22\\;÷\\;11}{33\\;÷\\;11}",
            simplestFormFraction: '= \\frac{2}{3}'
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT2",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText: "Therefore, the ratio of volumes of 220ml glass and 330 ml bottle is:",
            imageText: "",
            options: [
              {
                text: "3 : 2",
                iscorrect: false,
                feedback: "Not quite. Try again.",
              }, {
                text: "2 : 3",
                iscorrect: true,
                feedback: "That’s correct.",
              },

            ],
            keyConcepts: [{
              text: "Required ratio in simplest form = \\frac{2}{3}",
              color: highlight4
            }],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },

          conceptSummary: {
            given: [

            ],
            toFind: [],
            keyConcepts: [
              {
                text: "Ratios of the volume of 220 ml glass to the volume of 330 ml bottle<br/> = \\frac{220}{330}",
                color: highlight4
              },
              {
                text: "= \\frac{22}{33}",
                color: highlight4
              }, {
                text: "GCF of 22 and 33 is 11.",
                color: highlight4
              }
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
              text: "volume of a 600 ml bottle",
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
                text: "Volume of a bottle is 600 ml.",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [],
          },
        },
        page12: {
          highlights: [
            {
              text: "volume of a 600 ml bottle",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 1500 ml bottle.",
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
                text: "Volume of a bottle is 600 ml.",
                color: highlight1,
              },
              {
                text: "Volume of another bottle is 1500 ml.",
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
        page13: {
          highlights: [
            {
              text: "volume of a 600 ml bottle",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 1500 ml bottle.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "ratio",
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
                text: "Volume of a bottle is 600 ml.",
                color: highlight1,
              },
              {
                text: "Volume of another bottle is 1500 ml.",
                color: highlight2,
              },

            ],
            values: [],
            toFind: [
              {
                text: "Ratio of volumes of 600 ml to 1500 ml bottles.",
                color: highlight3,
              },
            ],
          },
        },
        page14: {
          highlights: [
            {
              text: "volume of a 600 ml bottle",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 1500 ml bottle.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "ratio",
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
            questionText: "What is the ratio volumes of 600 ml to 1500 ml bottles?",
            imageText: "",
            options: [
              {
                text: "\\frac{600}{1500}",
                iscorrect: true,
                feedback: "Correct! Let’s simplify the ratio.",
              }, {
                text: "\\frac{1500}{600}",
                iscorrect: false,
                feedback: "Not quite. Use the same units before forming the ratio.",
              },
              {
                text: "\\frac{600}{15}",
                iscorrect: false,
                feedback: "Not quite. Use the same units before forming the ratio.",
              },
              {
                text: "\\frac{1500}{6}",
                iscorrect: false,
                feedback: "Not quite. Use the same units before forming the ratio.",
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
                text: "Volume of a bottle is 600 ml.",
                color: highlight1,
              },
              {
                text: "Volume of another bottle is 1500 ml.",
                color: highlight2,
              },

            ],
            values: [],
            toFind: [
              {
                text: "Ratio of volumes of 600 ml to 1500 ml bottles.",
                color: highlight3,
              },
            ],
          },
        },
        page15: {
          highlights: [
            {
              text: "volume of a 600 ml bottle",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 1500 ml bottle.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "ratio",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          solutionText: {
            text: "Ratio of volumes of 600 ml to <br/>1500 ml bottles",
            fractionValue: '= \\frac{600}{1500}'
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText: "To simplifying the ratio, which of these is correct?",
            imageText: "",
            options: [
              {
                text: "\\frac{600}{1500} = \\frac{6}{150}",
                iscorrect: false,
                feedback: "Not quite. Try canceling common zeros in both numbers. ",
              },
              {
                text: "\\frac{600}{1500} = \\frac{60}{15}",
                iscorrect: false,
                feedback: "Not quite. Try canceling common zeros in both numbers. ",
              },
              {
                text: "\\frac{600}{1500} = \\frac{600}{15}",
                iscorrect: false,
                feedback: "Not quite. Try canceling common zeros in both numbers. ",
              },
              {
                text: "\\frac{600}{1500} = \\frac{6}{15}",
                iscorrect: true,
                feedback: "Correct! Let’s further simplify the ratio. ",
              }
            ],
            keyConcepts: [{
              text: "Ratios of volumes of 600 ml to 1500 ml bottles =\n = \\frac{600}{1500}",
              color: highlight4
            }],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },

          conceptSummary: {
            given: [

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
        page16: {
          highlights: [
            {
              text: "volume of a 600 ml bottle",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 1500 ml bottle.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "ratio",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          solutionText: {
            text: "Ratio of volumes of 600 ml to <br/>1500 ml bottles",
            fractionValue: '= \\frac{600}{1500}',
            gcfFractionValue: "= \\frac{6\\;÷\\;3}{15\\;÷\\;3}"

          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText: "Find the GCF of 6 and 15.",
            imageText: "",
            options: [
              {
                text: "30",
                iscorrect: false,
                feedback: "Not quite. Check the highest number that divides both 6 and 15.",
              }, {
                text: "15",
                iscorrect: false,
                feedback: "Not quite. Check the highest number that divides both 6 and 15.",
              },
              {
                text: "6",
                iscorrect: false,
                feedback: "Not quite. Check the highest number that divides both 6 and 15.",
              },
              {
                text: "3",
                iscorrect: true,
                feedback: "Correct! 3 is the GCF of 6 and 15.",
              }
            ],
            keyConcepts: [{
              text: "= \\frac{6}{15}",
              color: highlight4
            }],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },

          conceptSummary: {
            given: [

            ],
            toFind: [],
            keyConcepts: [
              {
                text: "Ratios of volumes of 600 ml to 1500 ml bottles =<br/> = \\frac{600}{1500}",
                color: highlight4
              }
            ],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },
        },
        page17: {
          highlights: [
            {
              text: "volume of a 600 ml bottle",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 1500 ml bottle.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "ratio",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          solutionText: {
            text: "Ratio of volumes of 600 ml to <br/>1500 ml bottles",
            fractionValue: '= \\frac{600}{1500}',
            gcfFractionValue: "= \\frac{6\\;÷\\;GCF}{15\\;÷\\;GCF}"

          },
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
                text: "\\frac{2}{5}",
                iscorrect: true,
                feedback: "Correct! 6 ÷ 3 = 2 and 15 ÷ 3 = 5. ",
              }, {
                text: "\\frac{2}{3}",
                iscorrect: false,
                feedback: "Not quite. Try again.",
              },
              {
                text: "\\frac{3}{5}",
                iscorrect: false,
                feedback: "Not quite. Try again.",
              },
              {
                text: "\\frac{3}{2}",
                iscorrect: false,
                feedback: "Not quite. Try again.",
              }
            ],
            keyConcepts: [{
              text: "GCF of 6 and 15 = 3",
              color: highlight4
            }],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },

          conceptSummary: {
            given: [

            ],
            toFind: [],
            keyConcepts: [
              {
                text: "Ratios of volumes of 600 ml to 1500 ml bottles <br /> = \\frac{600}{1500}",
                color: highlight4
              },
              {
                text: "= \\frac{6}{15}",
                color: highlight4
              }
            ],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },
        },
        page18: {
          highlights: [
            {
              text: "volume of a 600 ml bottle",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 1500 ml bottle.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "ratio",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          solutionText: {
            text: "Ratio of volumes of 600 ml to <br/>1500 ml bottles",
            fractionValue: '= \\frac{600}{1500}',
            gcfFractionValue: "= \\frac{6\\;÷\\;3}{15\\;÷\\;3}",
            simplestFormFraction: "= \\frac{2}{5}",
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT2",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText: "Therefore, the ratio of volumes of 600 ml to 1500 ml bottle in simplest form is:",
            imageText: "",
            options: [
              {
                text: "5 : 2",
                iscorrect: false,
                feedback: "Not quite. Try again.",
              }, {
                text: "2 : 5",
                iscorrect: true,
                feedback: "That’s correct.",
              },

            ],
            keyConcepts: [{
              text: "The required ratio in simplest form = \\frac{2}{5}",
              color: highlight4
            }],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },

          conceptSummary: {
            given: [

            ],
            toFind: [],
            keyConcepts: [
              {
                text: "Ratios of volumes of 600 ml to 1500 ml bottles <br /> = \\frac{600}{1500}",
                color: highlight4
              },
              {
                text: "= \\frac{6}{15}",
                color: highlight4
              },
              {
                text: "GCF of 6 and 15 = 11.",
                color: highlight4
              }
            ],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },
        },
        page19: {
          highlights: [
            {
              text: "volume of a 330 ml bottle",
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
                text: "Volume of a bottle is 330 ml.",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [],
          },
        },
        page20: {
          highlights: [
            {
              text: "volume of a 330 ml bottle",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 600 ml bottle",
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
                text: "Volume of a bottle is 330 ml.",
                color: highlight1,
              },
              {
                text: "Volume of another bottle is 600 ml.",
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
        page21: {
          highlights: [
            {
              text: "volume of a 330 ml bottle",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 600 ml bottle",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "each reduced by 30 ml.",
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
                text: "Volume of a bottle is 330 ml.",
                color: highlight1,
              },
              {
                text: "Volume of another bottle is 600 ml.",
                color: highlight2,
              },

            ],
            values: [],
            toFind: [
              {
                text: "New volumes after each is reduced by 30 ml.",
                color: highlight3,
              },
            ],
          },
        },
        page22: {
          highlights: [
            {
              text: "volume of a 330 ml bottle",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 600 ml bottle",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "each reduced by 30 ml.",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "ratio",
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
                text: "Volume of a bottle is 330 ml.",
                color: highlight1,
              },
              {
                text: "Volume of another bottle is 600 ml.",
                color: highlight2,
              },

            ],
            values: [],
            toFind: [
              {
                text: "New volumes after each is reduced by 30 ml.",
                color: highlight3,
              },
              {
                text: "Ratio of new volumes.",
                color: highlight4
              }
            ],
          },
        },
        page23: {
          highlights: [
            {
              text: "volume of a 330 ml bottle",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 600 ml bottle",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "each reduced by 30 ml.",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "ratio",
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
              qti4Subtype: "QT4",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText: "Find the new volume after reducing 30 ml from a 330 ml bottle.",
            imageText: "",
            options: [
              {
                text: "360 ml",
                iscorrect: false,
                feedback: "Not quite. Subtract 30 ml from 330 ml. ",
              }, {
                text: "330 ml",
                iscorrect: false,
                feedback: "Not quite. Subtract 30 ml from 330 ml. ",
              },
              {
                text: "333 ml",
                iscorrect: false,
                feedback: "Not quite. Subtract 30 ml from 330 ml. ",
              },
              {
                text: "300 ml",
                iscorrect: true,
                feedback: "Correct! The new volume is 330 ml - 30 ml = 300 ml.",
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
                text: "Volume of a bottle is 330 ml.",
                color: highlight1,
              },
              {
                text: "Volume of another bottle is 600 ml.",
                color: highlight2,
              },

            ],
            values: [],
            toFind: [
              {
                text: "New volumes after each is reduced by 30 ml.",
                color: highlight3,
              },
              {
                text: "Ratio of new volumes.",
                color: highlight4
              }
            ],
          },
        },
        page24: {
          highlights: [
            {
              text: "volume of a 330 ml bottle",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 600 ml bottle",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "each reduced by 30 ml.",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "ratio",
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
              qti4Subtype: "QT4",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText: "Find the new volume after reducing 30 ml from a 600 ml bottle.",
            imageText: "",
            options: [
              {
                text: "530 ml",
                iscorrect: false,
                feedback: "Not quite. Subtract 30 ml from 600 ml. ",
              }, {
                text: "570 ml",
                iscorrect: true,
                feedback: "Correct! The new volume is 600 ml - 30 ml = 570 ml.",
              },
              {
                text: "600 ml",
                iscorrect: false,
                feedback: "Not quite. Subtract 30 ml from 600 ml. ",
              },
              {
                text: "630 ml",
                iscorrect: false,
                feedback: "Not quite. Subtract 30 ml from 600 ml. ",
              },
            ],
            keyConcepts: [{
              text: "330 ml - 30 ml = 300 ml",
              color: highlight4
            }],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },
          conceptSummary: {
            given: [


            ],
            values: [],
            toFind: [
            ],
          },
        },
        page25: {
          highlights: [
            {
              text: "volume of a 330 ml bottle",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 600 ml bottle",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "each reduced by 30 ml.",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "ratio",
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
              qti4Subtype: "QT4",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText: "What is the ratio volumes of 300 ml to 570 ml?",
            imageText: "",
            options: [
              {
                text: "\\frac{300}{570}",
                iscorrect: true,
                feedback: "Correct! Let’s simplify the ratio.",
              }, {
                text: "\\frac{300}{57}",
                iscorrect: false,
                feedback: "Not quite. Use the same units before forming the ratio.",
              },
              {
                text: "\\frac{570}{300}",
                iscorrect: false,
                feedback: "Not quite. Use the same units before forming the ratio."
              },
              {
                text: "\\frac{570}{3}",
                iscorrect: false,
                feedback: "Not quite. Use the same units before forming the ratio.",
              },
            ],
            keyConcepts: [{
              text: "600 ml - 30 ml = 570 ml",
              color: highlight4
            }],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },
          conceptSummary: {
            given: [


            ],
            keyConcepts: [
              {
                text: "330 ml - 30 ml = 300 ml",
                color: highlight4
              },
            ],
            values: [],
            toFind: [
            ],
          },
        },
        page26: {
          highlights: [
            {
              text: "volume of a 330 ml bottle",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 600 ml bottle",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "each reduced by 30 ml.",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "ratio",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          solutionText: {
            text: "Ratio of volumes of 300 ml to 570 ml",
            fractionValue: '= \\frac{300}{570}'
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText: "To simplifying the ratio, which of these is correct?",
            imageText: "",
            options: [
              {
                text: "\\frac{300}{570} = \\frac{3}{57}",
                iscorrect: false,
                feedback: "Not quite. Try canceling common zeros in both numbers. ",
              },
              {
                text: "\\frac{300}{570} = \\frac{3}{5}",
                iscorrect: false,
                feedback: "Not quite. Try canceling common zeros in both numbers. ",
              },
              {
                text: "\\frac{300}{570} = \\frac{3}{570}",
                iscorrect: false,
                feedback: "Not quite. Try canceling common zeros in both numbers. ",
              },
              {
                text: "\\frac{300}{570} = \\frac{30}{57}",
                iscorrect: true,
                feedback: "Correct! Let’s further simplify the ratio. ",
              }
            ],
            keyConcepts: [{
              text: "Ratio of the volumes of 300 ml to 570 ml \n = \\frac{300}{570}",
              color: highlight4
            }],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },

          conceptSummary: {
            given: [

            ],
            toFind: [],
            keyConcepts: [{
              text: "330 ml - 30 ml = 300 ml",
              color: highlight4
            },
            {
              text: "600 ml - 30 ml = 570 ml",
              color: highlight4
            }],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },
        },
        page27: {
          highlights: [
            {
              text: "volume of a 330 ml bottle",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 600 ml bottle",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "each reduced by 30 ml.",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "ratio",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          solutionText: {
            text: "Ratio of volumes of 300 ml to 570 ml",
            fractionValue: '= \\frac{300}{570}',
            gcfFractionValue: "= \\frac{30\\;÷\\;GCF}{57\\;÷\\;GCF}"
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText: "Find the GCF of 30 and 57.",
            imageText: "",
            options: [
              {
                text: "30",
                iscorrect: false,
                feedback: "Not quite. Check the highest number that divides both 30 and 57.",
              }, {
                text: "57",
                iscorrect: false,
                feedback: "Not quite. Check the highest number that divides both 30 and 57.",
              },
              {
                text: "7",
                iscorrect: false,
                feedback: "Not quite. Check the highest number that divides both 30 and 57.",
              },
              {
                text: "3",
                iscorrect: true,
                feedback: "Correct! 3 is the GCF of 30 and 57.",
              }
            ],
            keyConcepts: [{
              text: "= \\frac{30}{57}",
              color: highlight4
            }],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },

          conceptSummary: {
            given: [

            ],
            toFind: [],
            keyConcepts: [{
              text: "330 ml - 30 ml = 300 ml",
              color: highlight4
            },
            {
              text: "600 ml - 30 ml = 570 ml",
              color: highlight4
            },
            {
              text: "Ratio of the volumes of 300 ml to 570 ml = \\frac{300}{570}",
              color: highlight4
            }
            ],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },
        },
        page28: {
          highlights: [
            {
              text: "volume of a 330 ml bottle",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 600 ml bottle",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "each reduced by 30 ml.",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "ratio",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          solutionText: {
            text: "Ratio of volumes of 300 ml to 570 ml",
            fractionValue: '= \\frac{300}{570}',
            gcfFractionValue: "= \\frac{30\\;÷\\;3}{57\\;÷\\;3}"
          },
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
                text: "\\frac{10}{19}",
                iscorrect: true,
                feedback: "Correct! 30 ÷ 3 = 10 and 57 ÷ 3 = 19.",
              },
              {
                text: "\\frac{10}{27}",
                iscorrect: false,
                feedback: "Not quite. Try again.",
              },
              {
                text: "\\frac{10}{29}",
                iscorrect: false,
                feedback: "Not quite. Try again.",
              },
              {
                text: "\\frac{10}{57}",
                iscorrect: false,
                feedback: "Not quite. Try again.",
              },
            ],
            keyConcepts: [{
              text: "GCF of 30 and 57 = 3",
              color: highlight4
            }],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },

          conceptSummary: {
            given: [

            ],
            toFind: [],
            keyConcepts: [{
              text: "330 ml - 30 ml = 300 ml",
              color: highlight4
            },
            {
              text: "600 ml - 30 ml = 570 ml",
              color: highlight4
            },
            {
              text: "Ratio of the volumes of 300 ml to 570 ml = \\frac{300}{570}",
              color: highlight4
            },
            {
              text: "= \\frac{30}{57}",
              color: highlight4
            }
            ],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },
        },
        page29: {
          highlights: [
            {
              text: "volume of a 330 ml bottle",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "volume of a 600 ml bottle",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "each reduced by 30 ml.",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "ratio",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          solutionText: {
            text: "Ratio of volumes of 300 ml to 570 ml",
            fractionValue: '= \\frac{300}{570}',
            gcfFractionValue: "= \\frac{30\\;÷\\;3}{57\\;÷\\;3}",
            simplestFormFraction: "= \\frac{10}{19}"
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT2",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText: "Therefore, the ratio of volumes of 330 ml to 600 ml bottle after each reduced by 30 ml is:",
            imageText: "",
            options: [
              {
                text: "19 : 10",
                iscorrect: false,
                feedback: "Not quite. Try again.",
              },
              {
                text: "19 : 10",
                iscorrect: true,
                feedback: "That’s correct.",
              },

            ],
            keyConcepts: [{
              text: "The required ratio = \\frac{10}{9}",
              color: highlight4
            }],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },

          conceptSummary: {
            given: [

            ],
            toFind: [],
            keyConcepts: [{
              text: "330 ml - 30 ml = 300 ml",
              color: highlight4
            },
            {
              text: "600 ml - 30 ml = 570 ml",
              color: highlight4
            },
            {
              text: "Ratio of the volumes of 300 ml to 570 ml = \\frac{300}{570}",
              color: highlight4
            },
            {
              text: "= \\frac{30}{57}",
              color: highlight4
            },
            {
              text: "GCF of 30 and 57 = 3",
              color: highlight4
            }
            ],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },
        },
        page30: {
          conclusion: "We concluded that:<br/>a. <span style='background-color:#FFD700;'>2 : 3</span> is the ratio of the volume of a 220 ml glass to the volume of a 330 ml bottle.\nb. <span style='background-color:#FFD700;'>2 : 5</span> is the ratio of the volume of a 600 ml bottle to the volume of a 1500 ml bottle.\nc. <span style='background-color:#FFD700;'>10 : 9</span> is the ratio of the volume of the 330 ml bottle and the 600 ml bottle, each reduced by 30 ml.",
          conceptSummary: {
            given: [

            ],
            toFind: [],
            keyConcepts: [{
              text: "The ratio of the volumes of 200 ml glass to 330 ml bottle = 2 : 3.",
              color: highlight4
            },
            {
              text: "The ratio of the volumes of 600 ml to 1500 ml bottles = 2 : 5.",
              color: highlight4
            },
            {
              text: "The ratio of volumes of 330 ml to 600 ml bottles after each reduced to 30 ml = 10 : 19.",
              color: highlight4
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
