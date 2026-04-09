// data.js - Internationalization data for the Diver Coral Reef Planting Learning Applet
// Contains only the text content that's actually used in the app

const highlightColor1 = "#FFD700";
const highlightColor2 = "#70ACC7";
const highlightColor3 = "#F28283";
const highlightColor4 = "#00FF7F";
const highlightColor5 = "#8A2BE2";

const questionTextSize = "24gc";

const AppData = {
  // Current language setting
  currentLanguage: "en",

  // Text content by language
  translations: {
    en: {
      appInfo: {
        title: "Writing Time",
      },


      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        start: "Start",
        continue: 'Continue',
      },

      common: {
        heavy: "Heavy",
        light: "Light",
        tapAlt: "Tap",
        questionText:
          "Humam is a diver who cares about the environment. One day he and his team will do coral planting to repair damaged coral reefs. Humam's condition is documented as shown in the picture below. If the sea being dived is 20 meters and the bottom is flat. How much area of the seabed can Humam reach to plant coral reefs?",
        questionIcon: "Q",
        informationAnalysis: {
          header: "INFORMATION ANALYSIS",
          facts: "Facts",
          values: "Value",
          toFind: "To Find",
        },
        conceptSummary: {
          header: "CONCEPT SUMMARY",
          given: "Given",
          toFind: "To Find",
          keyConcepts: "Key Concepts",
          importantFormulae: "Calculations",
        },
      },


      Question: [
        {
          hour: 6,
          minute: 13,
          box1Numpad: {
            correctValue: 6,
            correctFeedback: 'That’s correct. Small hand just crossed number 6 on the clock.',
            incorrectFeedback: 'Oops! The long hand is not crossing 7'
          },
          options: [
            {
              text: "5 minutes",

              iscorrect: false,
              feedback: "That’s not right! Clock reads 5 minutes when long hand points at 1 on the clock.",
            },
            {
              text: "10 minutes",

              iscorrect: true,
              feedback: "That’s correct! Clock reads 10 minutes when long hand points at 2 on the clock.",
            },
            {
              text: "15 minutes",

              iscorrect: false,
              feedback: "That’s not right! Clock reads 5 minutes when long hand points at 1 on the clock.",
            },
          ],
          options2: [
            {
              text: "3 mark",
              iscorrect: true,
              feedback: "That’s correct. 3 more minutes have passed after crossing 2.",
            },
            {
              text: "1 marks",
              iscorrect: false,
              feedback: "That’s not right!",
            },
            {
              text: "4 marks",
              iscorrect: false,
              feedback: "That’s not right!",
            },
          ],
          box2Numpad: {
            correctValue: 13,
            correctFeedback: 'That’s correct. Clock reads 5:15.',
            incorrectFeedback: 'Oops! That’s not right.'
          },
          page2TalkBox: {
            talkBoxText: "Read and write the time shown on the clock. <br/>First - hours.",
            talkBoxOnWrong: 'Oops! Look at the short hand. Which number did it just cross?',
            talkBoxOnCorrect: "<span>That’s correct.<br/> <span style='border-bottom:2px solid #ffff'>Short hand</span> reads <br/><span style='color:#FFD700'>5 hours!</span></span>",
          },
          page4TalkBox: {
            talkBoxText: "<span>How many <span style='color:#0ECDD7'>minutes</span> when long hand points 2?</span>",
            talkBoxOnWrong: '<span>Oops! Long hand crossed 2. So, multiply 2 by 5 to find <span style="color:#0ECDD7">minutes</span></span>',
            talkBoxOnCorrect: "<span>Yeah! Clock reads <span style='color:#0ECDD7'>10  minutes </span> when long hand crosses 2.</span>",
          },
          page5TalkBox: {
            talkBoxText: "How many more marks has the long hand crossed after number crossing 2?",
            talkBoxOnWrong: 'Count the number of marks crossed by long hand after crossing number 2 on the clock.',
            talkBoxOnCorrect: "Correct! The long hand has crossed 3 more marks after crossing number 2 on the clock.",
          },
          page6TalkBox: {
            talkBoxText: "<span>Let’s count up the total minutes.<br/><br/>10 + 3 marks = <br/><span style='color:#0ECDD7'>?? minutes</span></span>",
            talkBoxOnWrong: '<span>Let’s count up the total minutes.<br/><br/>10 + 3 marks = <br/><span style="color:#0ECDD7">?? minutes</span></span>',
            talkBoxOnCorrect: "<span>Well Done! <br/>The clock reads <br/><span style='color:#FFD550'>6 hours</span> <br/><span style='color:#0ECDD7'>13 minutes</span>.</span>",
          }
        },
        {
          hour: 2,
          minute: 17,

          box1Numpad: {
            correctValue: 2,
            correctFeedback: 'That’s correct. Small hand just crossed number 2 on the clock.',
            incorrectFeedback: 'Oops! The long hand is not crossing 9'
          },

          options: [
            {
              text: "5 minutes",
              iscorrect: false,
              feedback: "That’s not right! Clock reads 5 minutes when long hand points at 1 on the clock.",
            },
            {
              text: "15 minutes",
              iscorrect: true,
              feedback: "That’s correct! Clock reads 15 minutes when long hand points at 3 on the clock.",
            },
            {
              text: "10 minutes",
              iscorrect: false,
              feedback: "That’s not right! Clock reads 10 minutes when long hand points at 2 on the clock.",
            },
          ],

          options2: [
            {
              text: "2 mark",
              iscorrect: true,
              feedback: "That’s correct. 2 more minutes have passed after crossing 3.",
            },
            {
              text: "1 marks",
              iscorrect: false,
              feedback: "That’s not right!",
            },
            {
              text: "4 marks",
              iscorrect: false,
              feedback: "That’s not right!",
            },
          ],

          box2Numpad: {
            correctValue: 17,
            correctFeedback: 'That’s correct. Clock reads 2:17.',
            incorrectFeedback: 'Oops! That’s not right.'
          },

          page2TalkBox: {
            talkBoxText: "Read and write the time shown on the clock. <br/>First - hours.",
            talkBoxOnWrong: 'Oops! Look at the short hand. Which number did it just cross?',
            talkBoxOnCorrect: "<span>That’s correct.<br/> <span style='border-bottom:2px solid #ffff'>Short hand</span> reads <br/><span style='color:#FFD700'>2 hours!</span></span>",
          },

          page4TalkBox: {
            talkBoxText: "<span>How many <span style='color:#0ECDD7'>minutes</span> when long hand points 3?</span>",
            talkBoxOnWrong: '<span>Oops! Long hand crossed 3. So, multiply 3 by 5 to find <span style="color:#0ECDD7">minutes</span></span>',
            talkBoxOnCorrect: "<span>Yeah! Clock reads <span style='color:#0ECDD7'>15 minutes </span> when long hand crosses 3.</span>",
          },

          page5TalkBox: {
            talkBoxText: "How many more marks has the long hand crossed after number crossing 3?",
            talkBoxOnWrong: 'Count the number of marks crossed by long hand after crossing number 3 on the clock.',
            talkBoxOnCorrect: "Correct! The long hand has crossed 2 more marks after crossing number 3 on the clock.",
          },

          page6TalkBox: {
            talkBoxText: "<span>Let’s count up the total minutes.<br/><br/>15 + 2 marks = <br/><span style='color:#0ECDD7'>?? minutes</span></span>",
            talkBoxOnWrong: '<span>Let’s count up the total minutes.<br/><br/>15 + 2 marks = <br/><span style="color:#0ECDD7">?? minutes</span></span>',
            talkBoxOnCorrect: "<span>Well Done! <br/>The clock reads <br/><span style='color:#FFD550'>2 hours</span> <br/><span style='color:#0ECDD7'>17 minutes</span>.</span>",
          }
        },
        {
          hour: 7,
          minute: 18,

          box1Numpad: {
            correctValue: 7,
            correctFeedback: 'That’s correct. Small hand just crossed number 7 on the clock.',
            incorrectFeedback: 'Oops! The long hand is not crossing 10'
          },

          options: [
            {
              text: "10 minutes",
              iscorrect: false,
              feedback: "That’s not right! Clock reads 10 minutes when long hand points at 2 on the clock.",
            },
            {
              text: "15 minutes",
              iscorrect: true,
              feedback: "That’s correct! Clock reads 15 minutes when long hand points at 3 on the clock.",
            },
            {
              text: "20 minutes",
              iscorrect: false,
              feedback: "That’s not right! Clock reads 20 minutes when long hand points at 4 on the clock.",
            },
          ],

          options2: [
            {
              text: "3 mark",
              iscorrect: true,
              feedback: "That’s correct. 3 more minutes have passed after crossing 3.",
            },
            {
              text: "1 marks",
              iscorrect: false,
              feedback: "That’s not right!",
            },
            {
              text: "4 marks",
              iscorrect: false,
              feedback: "That’s not right!",
            },
          ],

          box2Numpad: {
            correctValue: 18,
            correctFeedback: 'That’s correct. Clock reads 7:18.',
            incorrectFeedback: 'Oops! That’s not right.'
          },

          page2TalkBox: {
            talkBoxText: "Read and write the time shown on the clock. <br/>First - hours.",
            talkBoxOnWrong: 'Oops! Look at the short hand. Which number did it just cross?',
            talkBoxOnCorrect: "<span>That’s correct.<br/> <span style='border-bottom:2px solid #ffff'>Short hand</span> reads <br/><span style='color:#FFD700'>7 hours!</span></span>",
          },

          page4TalkBox: {
            talkBoxText: "<span>How many <span style='color:#0ECDD7'>minutes</span> when long hand points 3?</span>",
            talkBoxOnWrong: '<span>Oops! Long hand crossed 3. So, multiply 3 by 5 to find <span style="color:#0ECDD7">minutes</span></span>',
            talkBoxOnCorrect: "<span>Yeah! Clock reads <span style='color:#0ECDD7'>15 minutes </span> when long hand crosses 3.</span>",
          },

          page5TalkBox: {
            talkBoxText: "How many more marks has the long hand crossed after number crossing 3?",
            talkBoxOnWrong: 'Count the number of marks crossed by long hand after crossing number 3 on the clock.',
            talkBoxOnCorrect: "Correct! The long hand has crossed 3 more marks after crossing number 3 on the clock.",
          },

          page6TalkBox: {
            talkBoxText: "<span>Let’s count up the total minutes.<br/><br/>15 + 3 marks = <br/><span style='color:#0ECDD7'>?? minutes</span></span>",
            talkBoxOnWrong: '<span>Let’s count up the total minutes.<br/><br/>15 + 3 marks = <br/><span style="color:#0ECDD7">?? minutes</span></span>',
            talkBoxOnCorrect: "<span>Well Done! <br/>The clock reads <br/><span style='color:#FFD550'>7 hours</span> <br/><span style='color:#0ECDD7'>18 minutes</span>.</span>",
          }
        },
        {
          hour: 6,
          minute: 26,

          box1Numpad: {
            correctValue: 6,
            correctFeedback: 'That’s correct. Small hand just crossed number 6 on the clock.',
            incorrectFeedback: 'Oops! The long hand is not crossing 11'
          },

          options: [
            {
              text: "20 minutes",
              iscorrect: false,
              feedback: "That’s not right! Clock reads 20 minutes when long hand points at 4 on the clock.",
            },
            {
              text: "25 minutes",
              iscorrect: true,
              feedback: "That’s correct! Clock reads 25 minutes when long hand points at 5 on the clock.",
            },
            {
              text: "30 minutes",
              iscorrect: false,
              feedback: "That’s not right! Clock reads 30 minutes when long hand points at 6 on the clock.",
            },
          ],

          options2: [
            {
              text: "1 mark",
              iscorrect: true,
              feedback: "That’s correct. 1 more minute has passed after crossing 5.",
            },
            {
              text: "2 marks",
              iscorrect: false,
              feedback: "That’s not right!",
            },
            {
              text: "3 marks",
              iscorrect: false,
              feedback: "That’s not right!",
            },
          ],

          box2Numpad: {
            correctValue: 26,
            correctFeedback: 'That’s correct. Clock reads 6:26.',
            incorrectFeedback: 'Oops! That’s not right.'
          },

          page2TalkBox: {
            talkBoxText: "Read and write the time shown on the clock. <br/>First - hours.",
            talkBoxOnWrong: 'Oops! Look at the short hand. Which number did it just cross?',
            talkBoxOnCorrect: "<span>That’s correct.<br/> <span style='border-bottom:2px solid #ffff'>Short hand</span> reads <br/><span style='color:#FFD700'>6 hours!</span></span>",
          },

          page4TalkBox: {
            talkBoxText: "<span>How many <span style='color:#0ECDD7'>minutes</span> when long hand points 5?</span>",
            talkBoxOnWrong: '<span>Oops! Long hand crossed 5. So, multiply 5 by 5 to find <span style="color:#0ECDD7">minutes</span></span>',
            talkBoxOnCorrect: "<span>Yeah! Clock reads <span style='color:#0ECDD7'>25 minutes </span> when long hand crosses 5.</span>",
          },

          page5TalkBox: {
            talkBoxText: "How many more marks has the long hand crossed after number crossing 5?",
            talkBoxOnWrong: 'Count the number of marks crossed by long hand after crossing number 5 on the clock.',
            talkBoxOnCorrect: "Correct! The long hand has crossed 1 more mark after crossing number 5 on the clock.",
          },

          page6TalkBox: {
            talkBoxText: "<span>Let’s count up the total minutes.<br/><br/>25 + 1 mark = <br/><span style='color:#0ECDD7'>?? minutes</span></span>",
            talkBoxOnWrong: '<span>Let’s count up the total minutes.<br/><br/>25 + 1 mark = <br/><span style="color:#0ECDD7">?? minutes</span></span>',
            talkBoxOnCorrect: "<span>Well Done! <br/>The clock reads <br/><span style='color:#FFD550'>6 hours</span> <br/><span style='color:#0ECDD7'>26 minutes</span>.</span>",
          }
        },
        {
          hour: 8,
          minute: 39,

          box1Numpad: {
            correctValue: 8,
            correctFeedback: 'That’s correct. Small hand just crossed number 8 on the clock.',
            incorrectFeedback: 'Oops! The long hand is not crossing 11'
          },

          options: [
            {
              text: "30 minutes",
              iscorrect: false,
              feedback: "That’s not right! Clock reads 30 minutes when long hand points at 6 on the clock.",
            },
            {
              text: "35 minutes",
              iscorrect: true,
              feedback: "That’s correct! Clock reads 35 minutes when long hand points at 7 on the clock.",
            },
            {
              text: "40 minutes",
              iscorrect: false,
              feedback: "That’s not right! Clock reads 40 minutes when long hand points at 8 on the clock.",
            },
          ],

          options2: [
            {
              text: "4 marks",
              iscorrect: true,
              feedback: "That’s correct. 4 more minutes have passed after crossing 7.",
            },
            {
              text: "2 marks",
              iscorrect: false,
              feedback: "That’s not right!",
            },
            {
              text: "3 marks",
              iscorrect: false,
              feedback: "That’s not right!",
            },
          ],

          box2Numpad: {
            correctValue: 39,
            correctFeedback: 'That’s correct. Clock reads 8:39.',
            incorrectFeedback: 'Oops! That’s not right.'
          },

          page2TalkBox: {
            talkBoxText: "Read and write the time shown on the clock. <br/>First - hours.",
            talkBoxOnWrong: 'Oops! Look at the short hand. Which number did it just cross?',
            talkBoxOnCorrect: "<span>That’s correct.<br/> <span style='border-bottom:2px solid #ffff'>Short hand</span> reads <br/><span style='color:#FFD700'>8 hours!</span></span>",
          },

          page4TalkBox: {
            talkBoxText: "<span>How many <span style='color:#0ECDD7'>minutes</span> when long hand points 7?</span>",
            talkBoxOnWrong: '<span>Oops! Long hand crossed 7. So, multiply 7 by 5 to find <span style="color:#0ECDD7">minutes</span></span>',
            talkBoxOnCorrect: "<span>Yeah! Clock reads <span style='color:#0ECDD7'>35 minutes </span> when long hand crosses 7.</span>",
          },

          page5TalkBox: {
            talkBoxText: "How many more marks has the long hand crossed after number crossing 7?",
            talkBoxOnWrong: 'Count the number of marks crossed by long hand after crossing number 7 on the clock.',
            talkBoxOnCorrect: "Correct! The long hand has crossed 4 more marks after crossing number 7 on the clock.",
          },

          page6TalkBox: {
            talkBoxText: "<span>Let’s count up the total minutes.<br/><br/>35 + 4 marks = <br/><span style='color:#0ECDD7'>?? minutes</span></span>",
            talkBoxOnWrong: '<span>Let’s count up the total minutes.<br/><br/>35 + 4 marks = <br/><span style="color:#0ECDD7">?? minutes</span></span>',
            talkBoxOnCorrect: "<span>Well Done! <br/>The clock reads <br/><span style='color:#FFD550'>8 hours</span> <br/><span style='color:#0ECDD7'>39 minutes</span>.</span>",
          }
        },
        {
          hour: 9,
          minute: 44,

          box1Numpad: {
            correctValue: 9,
            correctFeedback: 'That’s correct. Small hand just crossed number 9 on the clock.',
            incorrectFeedback: 'Oops! The long hand is not crossing 12'
          },

          options: [
            {
              text: "35 minutes",
              iscorrect: false,
              feedback: "That’s not right! Clock reads 35 minutes when long hand points at 7 on the clock.",
            },
            {
              text: "40 minutes",
              iscorrect: true,
              feedback: "That’s correct! Clock reads 40 minutes when long hand points at 8 on the clock.",
            },
            {
              text: "45 minutes",
              iscorrect: false,
              feedback: "That’s not right! Clock reads 45 minutes when long hand points at 9 on the clock.",
            },
          ],

          options2: [
            {
              text: "4 marks",
              iscorrect: true,
              feedback: "That’s correct. 4 more minutes have passed after crossing 8.",
            },
            {
              text: "2 marks",
              iscorrect: false,
              feedback: "That’s not right!",
            },
            {
              text: "3 marks",
              iscorrect: false,
              feedback: "That’s not right!",
            },
          ],

          box2Numpad: {
            correctValue: 44,
            correctFeedback: 'That’s correct. Clock reads 9:44.',
            incorrectFeedback: 'Oops! That’s not right.'
          },

          page2TalkBox: {
            talkBoxText: "Read and write the time shown on the clock. <br/>First - hours.",
            talkBoxOnWrong: 'Oops! Look at the short hand. Which number did it just cross?',
            talkBoxOnCorrect: "<span>That’s correct.<br/> <span style='border-bottom:2px solid #ffff'>Short hand</span> reads <br/><span style='color:#FFD700'>9 hours!</span></span>",
          },

          page4TalkBox: {
            talkBoxText: "<span>How many <span style='color:#0ECDD7'>minutes</span> when long hand points 8?</span>",
            talkBoxOnWrong: '<span>Oops! Long hand crossed 8. So, multiply 8 by 5 to find <span style="color:#0ECDD7">minutes</span></span>',
            talkBoxOnCorrect: "<span>Yeah! Clock reads <span style='color:#0ECDD7'>40 minutes </span> when long hand crosses 8.</span>",
          },

          page5TalkBox: {
            talkBoxText: "How many more marks has the long hand crossed after number crossing 8?",
            talkBoxOnWrong: 'Count the number of marks crossed by long hand after crossing number 8 on the clock.',
            talkBoxOnCorrect: "Correct! The long hand has crossed 4 more marks after crossing number 8 on the clock.",
          },

          page6TalkBox: {
            talkBoxText: "<span>Let’s count up the total minutes.<br/><br/>40 + 4 marks = <br/><span style='color:#0ECDD7'>?? minutes</span></span>",
            talkBoxOnWrong: '<span>Let’s count up the total minutes.<br/><br/>40 + 4 marks = <br/><span style="color:#0ECDD7">?? minutes</span></span>',
            talkBoxOnCorrect: "<span>Well Done! <br/>The clock reads <br/><span style='color:#FFD550'>9 hours</span> <br/><span style='color:#0ECDD7'>44 minutes</span>.</span>",
          }
        },
        {
          hour: 6,
          minute: 57,

          box1Numpad: {
            correctValue: 6,
            correctFeedback: 'That’s correct. Small hand just crossed number 6 on the clock.',
            incorrectFeedback: 'Oops! The long hand is not crossing 12'
          },

          options: [
            {
              text: "50 minutes",
              iscorrect: false,
              feedback: "That’s not right! Clock reads 50 minutes when long hand points at 10 on the clock.",
            },
            {
              text: "55 minutes",
              iscorrect: true,
              feedback: "That’s correct! Clock reads 55 minutes when long hand points at 11 on the clock.",
            },
            {
              text: "60 minutes",
              iscorrect: false,
              feedback: "That’s not right! Clock reads 60 minutes when long hand points at 12 on the clock.",
            },
          ],

          options2: [
            {
              text: "2 marks",
              iscorrect: true,
              feedback: "That’s correct. 2 more minutes have passed after crossing 11.",
            },
            {
              text: "1 marks",
              iscorrect: false,
              feedback: "That’s not right!",
            },
            {
              text: "3 marks",
              iscorrect: false,
              feedback: "That’s not right!",
            },
          ],

          box2Numpad: {
            correctValue: 57,
            correctFeedback: 'That’s correct. Clock reads 6:57.',
            incorrectFeedback: 'Oops! That’s not right.'
          },

          page2TalkBox: {
            talkBoxText: "Read and write the time shown on the clock. <br/>First - hours.",
            talkBoxOnWrong: 'Oops! Look at the short hand. Which number did it just cross?',
            talkBoxOnCorrect: "<span>That’s correct.<br/> <span style='border-bottom:2px solid #ffff'>Short hand</span> reads <br/><span style='color:#FFD700'>6 hours!</span></span>",
          },

          page4TalkBox: {
            talkBoxText: "<span>How many <span style='color:#0ECDD7'>minutes</span> when long hand points 11?</span>",
            talkBoxOnWrong: '<span>Oops! Long hand crossed 11. So, multiply 11 by 5 to find <span style="color:#0ECDD7">minutes</span></span>',
            talkBoxOnCorrect: "<span>Yeah! Clock reads <span style='color:#0ECDD7'>55 minutes </span> when long hand crosses 11.</span>",
          },

          page5TalkBox: {
            talkBoxText: "How many more marks has the long hand crossed after number crossing 11?",
            talkBoxOnWrong: 'Count the number of marks crossed by long hand after crossing number 11 on the clock.',
            talkBoxOnCorrect: "Correct! The long hand has crossed 2 more marks after crossing number 11 on the clock.",
          },

          page6TalkBox: {
            talkBoxText: "<span>Let’s count up the total minutes.<br/><br/>55 + 2 marks = <br/><span style='color:#0ECDD7'>?? minutes</span></span>",
            talkBoxOnWrong: '<span>Let’s count up the total minutes.<br/><br/>55 + 2 marks = <br/><span style="color:#0ECDD7">?? minutes</span></span>',
            talkBoxOnCorrect: "<span>Well Done! <br/>The clock reads <br/><span style='color:#FFD550'>6 hours</span> <br/><span style='color:#0ECDD7'>57 minutes</span>.</span>",
          }
        }
      ],
      components: {
        informationAnalysis: {
          headerText: "INFORMATION ANALYSIS",
          factsTitle: "Facts",
          valueTitle: "Value",
          toFindTitle: "To Find",
        },
        conceptSummary: {
          headerText: "CONCEPT SUMMARY",
          givenTitle: "Given",
          toFindTitle: "To Find",
          keyConceptsTitle: "Key Concepts",
          importantFormulaeTitle: "Calculations",
        },
      },

      pages: {
        page1: {
          title: "Writing Time",
          mainText: "Let’s try reading and writing time shown in the clock when the long hand is between 2 numbers on the clock.<br/><br/>Tap “Start” to begin!"
        },
        page2: {

          instructionText: "Tap using numpad to write hours in the highlighted box.",
          instructionAfterQuiz: 'Tap » to read the minutes.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          quizPanel: {
            quizSubType: "QT2R",
            questionText: '',
            options: [
              {
                text: "5 o’clock",
                iscorrect: true,
                feedback: "Well done! That’s correct.",
              },
              {
                text: "8 o’clock",
                iscorrect: false,
                feedback: "Oops! Check the number the short hand is pointing to.",
              },
              {
                text: "12 o’clock",
                iscorrect: false,
                feedback: "Oops! Check the number the short hand is pointing to.",
              }

            ],
          }
        },
        page3: {
          talkBoxText: '<span >Hey! Let’s try to count and read the <span style="color:#70ACC7">minutes.</sapn></span>',
          instructionText: "Tap » to continue.",
        },
        page4: {

          instructionText: "Tap the correct option.",
          instructionAfterQuiz: 'Tap » to explore next step.',
          finish: 'Tap » to explore next step.',
          timeOnClock: "TIME ON CLOCK?",
          quizPanel: {
            quizSubType: "QT3R",
            questionText: '',
            options: [
              {
                text: "5 o’clock",
                iscorrect: true,
                feedback: "Well done! That’s correct.",
              },
              {
                text: "8 o’clock",
                iscorrect: false,
                feedback: "Oops! Check the number the short hand is pointing to.",
              },
              {
                text: "12 o’clock",
                iscorrect: false,
                feedback: "Oops! Check the number the short hand is pointing to.",
              }

            ],
          }
        },
        page5: {

          instructionText: "Tap the correct option.",
          instructionAfterQuiz: 'Tap » to explore final step to read minutes.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          quizPanel: {
            quizSubType: "QT3R",
            questionText: '',
            options: [
              {
                text: "5 o’clock",
                iscorrect: true,
                feedback: "Well done! That’s correct.",
              },
              {
                text: "8 o’clock",
                iscorrect: false,
                feedback: "Oops! Check the number the short hand is pointing to.",
              },
              {
                text: "12 o’clock",
                iscorrect: false,
                feedback: "Oops! Check the number the short hand is pointing to.",
              }

            ],
          }
        },
        page6: {

          instructionText: "Tap using numpad and check.",
          instructionAfterQuiz: 'Tap » to for another challenge.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          quizPanel: {
            quizSubType: "QT2R",
            questionText: '',
            options: [
              {
                text: "5 o’clock",
                iscorrect: true,
                feedback: "Well done! That’s correct.",
              },
              {
                text: "8 o’clock",
                iscorrect: false,
                feedback: "Oops! Check the number the short hand is pointing to.",
              },
              {
                text: "12 o’clock",
                iscorrect: false,
                feedback: "Oops! Check the number the short hand is pointing to.",
              }

            ],
          }
        },
        page7: {
          title: "Writing Time",
          mainText: "Awesome! We read the time by looking at the number the long hand is pointing at."
        },
      },
    },
    id: {
      appInfo: {
        title: "Benda Berat dan Ringan",
      },

      messages: {
        pageStatesCleared:
          "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
        nextButtonPage2: "Event perpindahan halaman telah dikirim",
        previousButtonPage1: "Event perpindahan halaman telah dikirim",
        navigationReset: "Mengatur ulang ke pertanyaan 1",
        navigationComplete:
          "Reset aplikasi selesai – siap untuk pertanyaan baru",
        lastPageStartingOver: "Halaman terakhir – memulai kembali",
        allStagesCompleted: "Semua tahap telah selesai!",
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang",
        start: "Mulai",
      },

      common: {
        heavy: "Berat",
        light: "Ringan",
        tapAlt: "Ketuk",
        questionText:
          "Humam adalah seorang penyelam yang peduli terhadap lingkungan. Suatu hari, ia dan timnya akan melakukan penanaman karang untuk memperbaiki terumbu karang yang rusak. Kondisi Humam didokumentasikan seperti yang ditunjukkan pada gambar di bawah ini. Jika kedalaman laut yang diselami adalah 20 meter dan dasar lautnya datar, berapa luas area dasar laut yang dapat dijangkau Humam untuk menanam terumbu karang?",
        questionIcon: "P",
        informationAnalysis: {
          header: "ANALISIS INFORMASI",
          facts: "Fakta",
          values: "Nilai",
          toFind: "Yang Dicari",
        },
        conceptSummary: {
          header: "RINGKASAN KONSEP",
          given: "Diketahui",
          toFind: "Yang Dicari",
          keyConcepts: "Konsep Utama",
          importantFormulae: "Perhitungan",
        },
      },

      components: {
        informationAnalysis: {
          headerText: "ANALISIS INFORMASI",
          factsTitle: "Fakta",
          valueTitle: "Nilai",
          toFindTitle: "Yang Dicari",
        },
        conceptSummary: {
          headerText: "RINGKASAN KONSEP",
          givenTitle: "Diketahui",
          toFindTitle: "Yang Dicari",
          keyConceptsTitle: "Konsep Utama",
          importantFormulaeTitle: "Perhitungan",
        },
      },

      pages: {
        page1: {
          title: "Benda Berat dan Ringan",
          mainText:
            "Ayo belajar tentang <span style='color:#70ACC7'>benda berat</span> dan <br/><span style='color:#70ACC7'>benda ringan</span> bersama Jax dan DeeTee. <br/><br/>Ketuk “Mulai” untuk memulai!",
        },
        page2: {
          talkBoxText:
            "Jax, benda mana yang berat dan mana yang ringan — tas atau penghapus?",
          instructionText: "Ketuk » untuk melihat apa kata Jax.",
        },
        page3: {
          talkBoxText: "Apa itu benda berat dan benda ringan?",
          instructionText: "Ketuk » untuk melihat penjelasan DeeTee.",
        },
        page4: {
          talkBoxText:
            "Baik Jax! Sebelum aku menjelaskan, bisakah kamu mencoba mengangkat tas dan penghapus?",
          instructionText: "Ketuk » untuk melihat apa yang dilakukan Jax.",
        },
        page5: {
          talkBoxText: "Ya! Tentu,<br/> DeeTee.",
          instructionText:
            "Ketuk tombol “Angkat Tas” untuk melihat cara Jax mengangkatnya.",
          liftBag: "Angkat Tas",
          liftEraser: "Angkat Penghapus",
          liftBagText: "Uffff… sulit sekali mengangkatnya!",
          liftEraserText: "Haaa… mudah sekali mengangkatnya!",
          instructionText2: "Ketuk » untuk melihat apa kata DeeTee.",
        },
        page6: {
          talkBoxText:
            "Kita mengatakan bahwa tas adalah benda berat karena sulit diangkat! Ayo coba benda lainnya.",
          instructionText: "Ketuk » untuk mencoba benda lain.",
        },
        page7: {
          talkBoxText:
            "Kerja bagus Jax. Sekarang mari kita coba mengangkat dua benda ini.",
          instructionText: "Ketuk » untuk melihat cara Jax mengangkatnya.",
        },
        page8: {
          talkBoxText: "Ya! Tentu,<br/> DeeTee.",
          instructionText:
            "Ketuk tombol “Angkat Bulu” untuk melihat cara Jax mengangkatnya.",
          liftBag: "Angkat Bulu",
          liftEraser: "Angkat Semangka",
          liftFeatherText: "Haaa… mudah sekali mengangkatnya!",
          liftWatermelonText: "Uffff… sulit mengangkatnya!",
          instructionText2: "Ketuk » untuk melihat apa kata DeeTee.",
        },
        page9: {
          talkBoxText:
            "Kita mengatakan bahwa bulu adalah benda ringan karena mudah diangkat! Ayo coba satu set lagi.",
          instructionText: "Ketuk » untuk mencoba benda lainnya.",
        },
        page10: {
          talkBoxText: "Luar biasa Jax. Terakhir, angkat dua benda ini.",
          instructionText: "Ketuk » untuk melihat cara Jax mengangkatnya.",
        },
        page11: {
          talkBoxText: "Ya! Tentu,<br/> DeeTee.",
          instructionText: "Ketuk tombol untuk melihat cara Jax mengangkatnya.",
          liftStone: "Angkat Batu",
          liftPencil: "Angkat Pensil",
          liftStoneText: "Uffff… sangat sulit mengangkatnya!",
          liftPencilText: "Haaa… mudah sekali mengangkatnya!",
          instructionText2: "Ketuk » untuk melihat apa kata DeeTee.",
        },
        page12: {
          talkBoxText:
            "Kita mengatakan bahwa batu adalah benda berat karena sulit diangkat!",
          instructionText: "Ketuk » untuk merangkum benda berat dan ringan.",
        },
        page13: {
          talkBoxText:
            "Kerja bagus Jax! Sekarang, mari aku jelaskan tentang benda berat dan ringan.",
          instructionText: "Ketuk » untuk memulai kembali.",
          heavyObejects: "Benda Berat",
          lightObjects: "Benda Ringan",
          hardToLift: "<span style='color:#70ACC7'>Sulit</span> diangkat!",
          easyToLift: "<span style='color:#70ACC7'>Mudah</span> diangkat!",
        },
        page14: {
          title: "Benda Berat dan Ringan",
          mainText:
            "Hebat! Sekarang kita tahu apa itu<br/> benda <span style='color:#70ACC7'>berat</span> dan <span style='color:#70ACC7'>ringan</span>.",
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
        Object.keys(AppData.translations),
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
window.Question = Question;
// Make i18n globally available
window.i18n = i18n;
