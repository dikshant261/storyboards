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

      messages: {
        pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?",
        nextButtonPage2: "Page change event sent",
        previousButtonPage1: "Page change event sent",
        navigationReset: "Resetting to question 1",
        navigationComplete: "App reset complete – ready for new question",
        lastPageStartingOver: "Last page – starting over",
        allStagesCompleted: "All stages completed!",
      },

      numberPad: {
        showButton: "show 💡",
        checkButton: "CHECK",
        feedback: {
          empty: "Fill the highlighted box before clicking CHECK",
        }
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
          hour: 5,
          minute: 15,
          box1Numpad: {
            correctValue: 5,
            correctFeedback: 'That’s correct. Small hand just crossed number 5 on the clock.',
            incorrectFeedback: 'Oops! The long hand is not crossing 3'
          },
          options: [
            {
              text: "5",

              iscorrect: false,
              feedback: "Oops! Try again. Long hand is not pointing at 5.",
            },
            {
              text: "3",

              iscorrect: true,
              feedback: "That’s correct. Small hand just crossed number 5 on the clock.",
            },
          ],
          box2Numpad: {
            correctValue: 15,
            correctFeedback: 'That’s correct. Clock reads 5:15.',
            incorrectFeedback: 'Oops! Try again. Long hand points at 3. So, multiply 3 by 5 to find minutes.'
          },
          page2TalkBox: {
            talkBoxText: "Read and write the time shown on the clock. <br/>First - hours.",
            talkBoxOnWrong: 'Oops! Look at the short hand. Which number did it just cross?',
            talkBoxOnCorrect: "<span>That’s correct.<br/> Short hand reads <br/><span style='color:#FFD700'>5 hours!</span></span>",
          },
          page3TalkBox: {
            talkBoxText: "<span><span style='color:#FFD700'>5 hours</span> and<br/> <span style='color:#70ACC7'>?? minutes</span><br/><br/> Let’s see where is the long hand is pointing at?</span>",
            talkBoxOnWrong: 'Oops! See which number the long hand is pointing at.',
            talkBoxOnCorrect: "Well Done! Let’s see how many minutes when long hand points at 3?",
          },
          page4TalkBox: {
            talkBoxText: "How many minutes when long hand points at 3?",
            talkBoxOnWrong: 'Oops! Multiply 3 by 5 to find the minutes shown by the clock.',
            talkBoxOnCorrect: "Nice Job! the clock reads 5 hours 15 minutes.",
          }
        },
        {
          previousHour: 5,
          previousMinute: 15,
          hour: 6,
          minute: 10,
          box1Numpad: {
            correctValue: 6,
            correctFeedback: 'That’s correct. Small hand just crossed number 6 on the clock.',
            incorrectFeedback: 'Oops! Look at the short hand. Which number did it just cross?'
          },

          options: [
            {
              text: "2",
              iscorrect: true,
              feedback: "That’s correct. Long hand is pointing at 2.",
            },
            {
              text: "6",
              iscorrect: false,
              feedback: "Oops! Try again. Long hand is not pointing at 6.",
            },
          ],

          box2Numpad: {
            correctValue: 10,
            correctFeedback: 'That’s correct. Clock reads 6:10.',
            incorrectFeedback: 'Oops! Try again. Long hand points at 2. So, multiply 2 by 5 to find minutes.'
          },

          page2TalkBox: {
            talkBoxText: "Read and write the time shown on the clock. <br/>First - hours.",
            talkBoxOnWrong: 'Oops! Look at the short hand. Which number did it just cross?',
            talkBoxOnCorrect: "<span>That’s correct.<br/> Short hand reads <br/><span style='color:#FFD700'>6 hours!</span></span>",
          },

          page3TalkBox: {
            talkBoxText: "<span><span style='color:#FFD700'>6 hours</span> and<br/> <span style='color:#70ACC7'>?? minutes</span><br/><br/> Let’s see where is the long hand is pointing at?</span>",
            talkBoxOnWrong: 'Oops! See which number the long hand is pointing at.',
            talkBoxOnCorrect: "Well Done! Let’s see how many minutes when long hand points at 2?",
          },

          page4TalkBox: {
            talkBoxText: "How many minutes when long hand points at 2?",
            talkBoxOnWrong: 'Oops! Multiply 2 by 5 to find the minutes shown by the clock.',
            talkBoxOnCorrect: "Nice Job! the clock reads 6 hours 10 minutes.",
          }
        },
        {
          previousHour: 6,
          previousMinute: 10,
          hour: 6,
          minute: 30,

          box1Numpad: {
            correctValue: 6,
            correctFeedback: 'That’s correct. Small hand just crossed number 6 on the clock.',
            incorrectFeedback: 'Oops! Look at the short hand. Which number did it just cross?'
          },

          options: [
            {
              text: "6",
              iscorrect: true,
              feedback: "That’s correct. Long hand is pointing at 6.",
            },
            {
              text: "3",
              iscorrect: false,
              feedback: "Oops! Try again. Long hand is not pointing at 3.",
            },
          ],

          box2Numpad: {
            correctValue: 30,
            correctFeedback: 'That’s correct. Clock reads 6:30.',
            incorrectFeedback: 'Oops! Try again. Long hand points at 6. So, multiply 6 by 5 to find minutes.'
          },

          page2TalkBox: {
            talkBoxText: "Read and write the time shown on the clock. <br/>First - hours.",
            talkBoxOnWrong: 'Oops! Look at the short hand. Which number did it just cross?',
            talkBoxOnCorrect: "<span>That’s correct.<br/> Short hand reads <br/><span style='color:#FFD700'>6 hours!</span></span>",
          },

          page3TalkBox: {
            talkBoxText: "<span><span style='color:#FFD700'>6 hours</span> and<br/> <span style='color:#70ACC7'>?? minutes</span><br/><br/> Let’s see where is the long hand is pointing at?</span>",
            talkBoxOnWrong: 'Oops! See which number the long hand is pointing at.',
            talkBoxOnCorrect: "Well Done! Let’s see how many minutes when long hand points at 6?",
          },

          page4TalkBox: {
            talkBoxText: "How many minutes when long hand points at 6?",
            talkBoxOnWrong: 'Oops! Multiply 6 by 5 to find the minutes shown by the clock.',
            talkBoxOnCorrect: "Nice Job! the clock reads 6 hours 30 minutes.",
          }
        },
        {
          previousHour: 6,
          previousMinute: 30,
          hour: 7,
          minute: 20,

          box1Numpad: {
            correctValue: 7,
            correctFeedback: 'That’s correct. Small hand just crossed number 7 on the clock.',
            incorrectFeedback: 'Oops! Look at the short hand. Which number did it just cross?'
          },

          options: [
            {
              text: "4",
              iscorrect: true,
              feedback: "That’s correct. Long hand is pointing at 4.",
            },
            {
              text: "7",
              iscorrect: false,
              feedback: "Oops! Try again. Long hand is not pointing at 7.",
            },
          ],

          box2Numpad: {
            correctValue: 20,
            correctFeedback: 'That’s correct. Clock reads 7:20.',
            incorrectFeedback: 'Oops! Try again. Long hand points at 4. So, multiply 4 by 5 to find minutes.'
          },

          page2TalkBox: {
            talkBoxText: "Read and write the time shown on the clock. <br/>First - hours.",
            talkBoxOnWrong: 'Oops! Look at the short hand. Which number did it just cross?',
            talkBoxOnCorrect: "<span>That’s correct.<br/> Short hand reads <br/><span style='color:#FFD700'>7 hours!</span></span>",
          },

          page3TalkBox: {
            talkBoxText: "<span><span style='color:#FFD700'>7 hours</span> and<br/> <span style='color:#70ACC7'>?? minutes</span><br/><br/> Let’s see where is the long hand is pointing at?</span>",
            talkBoxOnWrong: 'Oops! See which number the long hand is pointing at.',
            talkBoxOnCorrect: "Well Done! Let’s see how many minutes when long hand points at 4?",
          },

          page4TalkBox: {
            talkBoxText: "How many minutes when long hand points at 4?",
            talkBoxOnWrong: 'Oops! Multiply 4 by 5 to find the minutes shown by the clock.',
            talkBoxOnCorrect: "Nice Job! the clock reads 7 hours 20 minutes.",
          }
        },
        {
          previousHour: 7,
          previousMinute: 20,
          hour: 7,
          minute: 40,

          box1Numpad: {
            correctValue: 7,
            correctFeedback: 'That’s correct. Small hand just crossed number 7 on the clock.',
            incorrectFeedback: 'Oops! Look at the short hand. Which number did it just cross?'
          },

          options: [
            {
              text: "8",
              iscorrect: true,
              feedback: "That’s correct. Long hand is pointing at 8.",
            },
            {
              text: "4",
              iscorrect: false,
              feedback: "Oops! Try again. Long hand is not pointing at 4.",
            },
          ],

          box2Numpad: {
            correctValue: 40,
            correctFeedback: 'That’s correct. Clock reads 7:40.',
            incorrectFeedback: 'Oops! Try again. Long hand points at 8. So, multiply 8 by 5 to find minutes.'
          },

          page2TalkBox: {
            talkBoxText: "Read and write the time shown on the clock. <br/>First - hours.",
            talkBoxOnWrong: 'Oops! Look at the short hand. Which number did it just cross?',
            talkBoxOnCorrect: "<span>That’s correct.<br/> Short hand reads <br/><span style='color:#FFD700'>7 hours!</span></span>",
          },

          page3TalkBox: {
            talkBoxText: "<span><span style='color:#FFD700'>7 hours</span> and<br/> <span style='color:#70ACC7'>?? minutes</span><br/><br/> Let’s see where is the long hand is pointing at?</span>",
            talkBoxOnWrong: 'Oops! See which number the long hand is pointing at.',
            talkBoxOnCorrect: "Well Done! Let’s see how many minutes when long hand points at 8?",
          },

          page4TalkBox: {
            talkBoxText: "How many minutes when long hand points at 8?",
            talkBoxOnWrong: 'Oops! Multiply 8 by 5 to find the minutes shown by the clock.',
            talkBoxOnCorrect: "Nice Job! the clock reads 7 hours 40 minutes.",
          }
        },
        {
          previousHour: 7,
          previousMinute: 40,
          hour: 8,
          minute: 10,

          box1Numpad: {
            correctValue: 8,
            correctFeedback: 'That’s correct. Small hand just crossed number 8 on the clock.',
            incorrectFeedback: 'Oops! Look at the short hand. Which number did it just cross?'
          },

          options: [
            {
              text: "2",
              iscorrect: true,
              feedback: "That’s correct. Long hand is pointing at 2.",
            },
            {
              text: "8",
              iscorrect: false,
              feedback: "Oops! Try again. Long hand is not pointing at 8.",
            },
          ],

          box2Numpad: {
            correctValue: 10,
            correctFeedback: 'That’s correct. Clock reads 8:10.',
            incorrectFeedback: 'Oops! Try again. Long hand points at 2. So, multiply 2 by 5 to find minutes.'
          },

          page2TalkBox: {
            talkBoxText: "Read and write the time shown on the clock. <br/>First - hours.",
            talkBoxOnWrong: 'Oops! Look at the short hand. Which number did it just cross?',
            talkBoxOnCorrect: "<span>That’s correct.<br/> Short hand reads <br/><span style='color:#FFD700'>8 hours!</span></span>",
          },

          page3TalkBox: {
            talkBoxText: "<span><span style='color:#FFD700'>8 hours</span> and<br/> <span style='color:#70ACC7'>?? minutes</span><br/><br/> Let’s see where is the long hand is pointing at?</span>",
            talkBoxOnWrong: 'Oops! See which number the long hand is pointing at.',
            talkBoxOnCorrect: "Well Done! Let’s see how many minutes when long hand points at 2?",
          },

          page4TalkBox: {
            talkBoxText: "How many minutes when long hand points at 2?",
            talkBoxOnWrong: 'Oops! Multiply 2 by 5 to find the minutes shown by the clock.',
            talkBoxOnCorrect: "Nice Job! the clock reads 8 hours 10 minutes.",
          }
        },
        {
          previousHour: 8,
          previousMinute: 10,
          hour: 8,
          minute: 25,

          box1Numpad: {
            correctValue: 8,
            correctFeedback: 'That’s correct. Small hand just crossed number 8 on the clock.',
            incorrectFeedback: 'Oops! Look at the short hand. Which number did it just cross?'
          },

          options: [
            {
              text: "5",
              iscorrect: true,
              feedback: "That’s correct. Long hand is pointing at 5.",
            },
            {
              text: "2",
              iscorrect: false,
              feedback: "Oops! Try again. Long hand is not pointing at 2.",
            },
          ],

          box2Numpad: {
            correctValue: 25,
            correctFeedback: 'That’s correct. Clock reads 8:25.',
            incorrectFeedback: 'Oops! Try again. Long hand points at 5. So, multiply 5 by 5 to find minutes.'
          },

          page2TalkBox: {
            talkBoxText: "Read and write the time shown on the clock. <br/>First - hours.",
            talkBoxOnWrong: 'Oops! Look at the short hand. Which number did it just cross?',
            talkBoxOnCorrect: "<span>That’s correct.<br/> Short hand reads <br/><span style='color:#FFD700'>8 hours!</span></span>",
          },

          page3TalkBox: {
            talkBoxText: "<span><span style='color:#FFD700'>8 hours</span> and<br/> <span style='color:#70ACC7'>?? minutes</span><br/><br/> Let’s see where is the long hand is pointing at?</span>",
            talkBoxOnWrong: 'Oops! See which number the long hand is pointing at.',
            talkBoxOnCorrect: "Well Done! Let’s see how many minutes when long hand points at 5?",
          },

          page4TalkBox: {
            talkBoxText: "How many minutes when long hand points at 5?",
            talkBoxOnWrong: 'Oops! Multiply 5 by 5 to find the minutes shown by the clock.',
            talkBoxOnCorrect: "Nice Job! the clock reads 8 hours 25 minutes.",
          }
        },
        {
          previousHour: 8,
          previousMinute: 25,
          hour: 9,
          minute: 30,

          box1Numpad: {
            correctValue: 9,
            correctFeedback: 'That’s correct. Small hand just crossed number 9 on the clock.',
            incorrectFeedback: 'Oops! Look at the short hand. Which number did it just cross?'
          },

          options: [
            {
              text: "6",
              iscorrect: true,
              feedback: "That’s correct. Long hand is pointing at 6.",
            },
            {
              text: "3",
              iscorrect: false,
              feedback: "Oops! Try again. Long hand is not pointing at 3.",
            },
          ],

          box2Numpad: {
            correctValue: 30,
            correctFeedback: 'That’s correct. Clock reads 9:30.',
            incorrectFeedback: 'Oops! Try again. Long hand points at 6. So, multiply 6 by 5 to find minutes.'
          },

          page2TalkBox: {
            talkBoxText: "Read and write the time shown on the clock. <br/>First - hours.",
            talkBoxOnWrong: 'Oops! Look at the short hand. Which number did it just cross?',
            talkBoxOnCorrect: "<span>That’s correct.<br/> Short hand reads <br/><span style='color:#FFD700'>9 hours!</span></span>",
          },

          page3TalkBox: {
            talkBoxText: "<span><span style='color:#FFD700'>9 hours</span> and<br/> <span style='color:#70ACC7'>?? minutes</span><br/><br/> Let’s see where is the long hand is pointing at?</span>",
            talkBoxOnWrong: 'Oops! See which number the long hand is pointing at.',
            talkBoxOnCorrect: "Well Done! Let’s see how many minutes when long hand points at 6?",
          },

          page4TalkBox: {
            talkBoxText: "How many minutes when long hand points at 6?",
            talkBoxOnWrong: 'Oops! Multiply 6 by 5 to find the minutes shown by the clock.',
            talkBoxOnCorrect: "Nice Job! the clock reads 9 hours 30 minutes.",
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
          mainText: "Let’s try reading and writing time shown in the <br/>clock.<br/><br/>Tap “Start” to begin!"
        },
        page2: {
          instructionText: "Tap using numpad to write hours in the highlighted box.",
          instructionAfterQuiz: 'Tap » to read the minutes.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          feedback: {
            emptyFeedback: "Fill the highlighted box before checking",
          },
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
          instructionText: "Tap the correct option.",
          instructionAfterQuiz: 'Tap » to read minutes.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          quizPanel: {
            quizSubType: "QT2R",
            questionText: "What number does the long hand point to?",
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
        page4: {
          instructionText: "Tap using numpad to write minutes in the highlighted box.",
          instructionAfterQuiz: 'Tap » to read the minutes.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          feedback: {
            emptyFeedback: "Fill the highlighted box before checking",
          },
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
        page5: {
          title: "Activities in different parts of the day.",
          mainText:
            "Awesome! We understood parts of the<br/>  day.We also learned what activities we <br/> do in that part of the day."
        },
      },
    },
    id: {
      appInfo: {
        title: "Menulis Waktu",
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
        continue: "Lanjutkan",
      },

      numberPad: {
        showButton: "tampilkan 💡",
        checkButton: "Periska",
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

      Question: [
        {
          hour: 5,
          minute: 15,
          box1Numpad: {
            correctValue: 5,
            correctFeedback: 'Benar. Jarum pendek baru saja melewati angka 5 pada jam.',
            incorrectFeedback: 'Ups! Jarum panjang tidak melewati 3'
          },
          options: [
            { text: "5", iscorrect: false, feedback: "Ups! Coba lagi. Jarum panjang tidak menunjuk 5." },
            { text: "3", iscorrect: true, feedback: "Benar. Jarum pendek baru saja melewati angka 5 pada jam." },
          ],
          box2Numpad: {
            correctValue: 15,
            correctFeedback: 'Benar. Jam menunjuk 5:15.',
            incorrectFeedback: 'Ups! Coba lagi. Jarum panjang menunjuk 3. Jadi, kalikan 3 dengan 5 untuk mencari menit.'
          },
          page2TalkBox: {
            talkBoxText: "Baca dan tulis waktu yang ditampilkan pada jam. <br/>Pertama - jam.",
            talkBoxOnWrong: 'Ups! Lihat jarum pendek. Angka berapa yang baru saja dilewatinya?',
            talkBoxOnCorrect: "<span>Benar!<br/> Jarum pendek menunjuk <br/><span style='color:#FFD700'>5 jam!</span></span>",
          },
          page3TalkBox: {
            talkBoxText: "<span><span style='color:#FFD700'>5 jam</span> dan<br/> <span style='color:#70ACC7'>?? menit</span><br/><br/> Mari kita lihat jarum panjang menunjuk angka berapa?</span>",
            talkBoxOnWrong: 'Ups! Lihat angka berapa yang ditunjuk jarum panjang.',
            talkBoxOnCorrect: "Bagus! Berapa menit saat jarum panjang menunjuk 3?",
          },
          page4TalkBox: {
            talkBoxText: "Berapa menit saat jarum panjang menunjuk 3?",
            talkBoxOnWrong: 'Ups! Kalikan 3 dengan 5 untuk mencari menit yang ditunjukkan jam.',
            talkBoxOnCorrect: "Bagus! Jam menunjuk 5 jam 15 menit.",
          }
        },
        {
          previousHour: 5,
          previousMinute: 15,
          hour: 6,
          minute: 10,
          box1Numpad: {
            correctValue: 6,
            correctFeedback: 'Benar. Jarum pendek baru saja melewati angka 6 pada jam.',
            incorrectFeedback: 'Ups! Lihat jarum pendek. Angka berapa yang baru saja dilewatinya?'
          },
          options: [
            { text: "2", iscorrect: true, feedback: "Benar. Jarum panjang menunjuk 2." },
            { text: "6", iscorrect: false, feedback: "Ups! Coba lagi. Jarum panjang tidak menunjuk 6." },
          ],
          box2Numpad: {
            correctValue: 10,
            correctFeedback: 'Benar. Jam menunjuk 6:10.',
            incorrectFeedback: 'Ups! Coba lagi. Jarum panjang menunjuk 2. Jadi, kalikan 2 dengan 5 untuk mencari menit.'
          },
          page2TalkBox: {
            talkBoxText: "Baca dan tulis waktu yang ditampilkan pada jam. <br/>Pertama - jam.",
            talkBoxOnWrong: 'Ups! Lihat jarum pendek. Angka berapa yang baru saja dilewatinya?',
            talkBoxOnCorrect: "<span>Benar!<br/> Jarum pendek menunjuk <br/><span style='color:#FFD700'>6 jam!</span></span>",
          },
          page3TalkBox: {
            talkBoxText: "<span><span style='color:#FFD700'>6 jam</span> dan<br/> <span style='color:#70ACC7'>?? menit</span><br/><br/> Mari kita lihat jarum panjang menunjuk angka berapa?</span>",
            talkBoxOnWrong: 'Ups! Lihat angka berapa yang ditunjuk jarum panjang.',
            talkBoxOnCorrect: "Bagus! Berapa menit saat jarum panjang menunjuk 2?",
          },
          page4TalkBox: {
            talkBoxText: "Berapa menit saat jarum panjang menunjuk 2?",
            talkBoxOnWrong: 'Ups! Kalikan 2 dengan 5 untuk mencari menit yang ditunjukkan jam.',
            talkBoxOnCorrect: "Bagus! Jam menunjuk 6 jam 10 menit.",
          }
        },
        {
          previousHour: 6,
          previousMinute: 10,
          hour: 6,
          minute: 30,
          box1Numpad: {
            correctValue: 6,
            correctFeedback: 'Benar. Jarum pendek baru saja melewati angka 6 pada jam.',
            incorrectFeedback: 'Ups! Lihat jarum pendek. Angka berapa yang baru saja dilewatinya?'
          },
          options: [
            { text: "6", iscorrect: true, feedback: "Benar. Jarum panjang menunjuk 6." },
            { text: "3", iscorrect: false, feedback: "Ups! Coba lagi. Jarum panjang tidak menunjuk 3." },
          ],
          box2Numpad: {
            correctValue: 30,
            correctFeedback: 'Benar. Jam menunjuk 6:30.',
            incorrectFeedback: 'Ups! Coba lagi. Jarum panjang menunjuk 6. Jadi, kalikan 6 dengan 5 untuk mencari menit.'
          },
          page2TalkBox: {
            talkBoxText: "Baca dan tulis waktu yang ditampilkan pada jam. <br/>Pertama - jam.",
            talkBoxOnWrong: 'Ups! Lihat jarum pendek. Angka berapa yang baru saja dilewatinya?',
            talkBoxOnCorrect: "<span>Benar!<br/> Jarum pendek menunjuk <br/><span style='color:#FFD700'>6 jam!</span></span>",
          },
          page3TalkBox: {
            talkBoxText: "<span><span style='color:#FFD700'>6 jam</span> dan<br/> <span style='color:#70ACC7'>?? menit</span><br/><br/> Mari kita lihat jarum panjang menunjuk angka berapa?</span>",
            talkBoxOnWrong: 'Ups! Lihat angka berapa yang ditunjuk jarum panjang.',
            talkBoxOnCorrect: "Bagus! Berapa menit saat jarum panjang menunjuk 6?",
          },
          page4TalkBox: {
            talkBoxText: "Berapa menit saat jarum panjang menunjuk 6?",
            talkBoxOnWrong: 'Ups! Kalikan 6 dengan 5 untuk mencari menit yang ditunjukkan jam.',
            talkBoxOnCorrect: "Bagus! Jam menunjuk 6 jam 30 menit.",
          }
        },
        {
          previousHour: 6,
          previousMinute: 30,
          hour: 7,
          minute: 20,
          box1Numpad: {
            correctValue: 7,
            correctFeedback: 'Benar. Jarum pendek baru saja melewati angka 7 pada jam.',
            incorrectFeedback: 'Ups! Lihat jarum pendek. Angka berapa yang baru saja dilewatinya?'
          },
          options: [
            { text: "4", iscorrect: true, feedback: "Benar. Jarum panjang menunjuk 4." },
            { text: "7", iscorrect: false, feedback: "Ups! Coba lagi. Jarum panjang tidak menunjuk 7." },
          ],
          box2Numpad: {
            correctValue: 20,
            correctFeedback: 'Benar. Jam menunjuk 7:20.',
            incorrectFeedback: 'Ups! Coba lagi. Jarum panjang menunjuk 4. Jadi, kalikan 4 dengan 5 untuk mencari menit.'
          },
          page2TalkBox: {
            talkBoxText: "Baca dan tulis waktu yang ditampilkan pada jam. <br/>Pertama - jam.",
            talkBoxOnWrong: 'Ups! Lihat jarum pendek. Angka berapa yang baru saja dilewatinya?',
            talkBoxOnCorrect: "<span>Benar!<br/> Jarum pendek menunjuk <br/><span style='color:#FFD700'>7 jam!</span></span>",
          },
          page3TalkBox: {
            talkBoxText: "<span><span style='color:#FFD700'>7 jam</span> dan<br/> <span style='color:#70ACC7'>?? menit</span><br/><br/> Mari kita lihat jarum panjang menunjuk angka berapa?</span>",
            talkBoxOnWrong: 'Ups! Lihat angka berapa yang ditunjuk jarum panjang.',
            talkBoxOnCorrect: "Bagus! Berapa menit saat jarum panjang menunjuk 4?",
          },
          page4TalkBox: {
            talkBoxText: "Berapa menit saat jarum panjang menunjuk 4?",
            talkBoxOnWrong: 'Ups! Kalikan 4 dengan 5 untuk mencari menit yang ditunjukkan jam.',
            talkBoxOnCorrect: "Bagus! Jam menunjuk 7 jam 20 menit.",
          }
        },
        {
          previousHour: 7,
          previousMinute: 20,
          hour: 7,
          minute: 40,
          box1Numpad: {
            correctValue: 7,
            correctFeedback: 'Benar. Jarum pendek baru saja melewati angka 7 pada jam.',
            incorrectFeedback: 'Ups! Lihat jarum pendek. Angka berapa yang baru saja dilewatinya?'
          },
          options: [
            { text: "8", iscorrect: true, feedback: "Benar. Jarum panjang menunjuk 8." },
            { text: "4", iscorrect: false, feedback: "Ups! Coba lagi. Jarum panjang tidak menunjuk 4." },
          ],
          box2Numpad: {
            correctValue: 40,
            correctFeedback: 'Benar. Jam menunjuk 7:40.',
            incorrectFeedback: 'Ups! Coba lagi. Jarum panjang menunjuk 8. Jadi, kalikan 8 dengan 5 untuk mencari menit.'
          },
          page2TalkBox: {
            talkBoxText: "Baca dan tulis waktu yang ditampilkan pada jam. <br/>Pertama - jam.",
            talkBoxOnWrong: 'Ups! Lihat jarum pendek. Angka berapa yang baru saja dilewatinya?',
            talkBoxOnCorrect: "<span>Benar!<br/> Jarum pendek menunjuk <br/><span style='color:#FFD700'>7 jam!</span></span>",
          },
          page3TalkBox: {
            talkBoxText: "<span><span style='color:#FFD700'>7 jam</span> dan<br/> <span style='color:#70ACC7'>?? menit</span><br/><br/> Mari kita lihat jarum panjang menunjuk angka berapa?</span>",
            talkBoxOnWrong: 'Ups! Lihat angka berapa yang ditunjuk jarum panjang.',
            talkBoxOnCorrect: "Bagus! Berapa menit saat jarum panjang menunjuk 8?",
          },
          page4TalkBox: {
            talkBoxText: "Berapa menit saat jarum panjang menunjuk 8?",
            talkBoxOnWrong: 'Ups! Kalikan 8 dengan 5 untuk mencari menit yang ditunjukkan jam.',
            talkBoxOnCorrect: "Bagus! Jam menunjuk 7 jam 40 menit.",
          }
        },
        {
          previousHour: 7,
          previousMinute: 40,
          hour: 8,
          minute: 10,
          box1Numpad: {
            correctValue: 8,
            correctFeedback: 'Benar. Jarum pendek baru saja melewati angka 8 pada jam.',
            incorrectFeedback: 'Ups! Lihat jarum pendek. Angka berapa yang baru saja dilewatinya?'
          },
          options: [
            { text: "2", iscorrect: true, feedback: "Benar. Jarum panjang menunjuk 2." },
            { text: "8", iscorrect: false, feedback: "Ups! Coba lagi. Jarum panjang tidak menunjuk 8." },
          ],
          box2Numpad: {
            correctValue: 10,
            correctFeedback: 'Benar. Jam menunjuk 8:10.',
            incorrectFeedback: 'Ups! Coba lagi. Jarum panjang menunjuk 2. Jadi, kalikan 2 dengan 5 untuk mencari menit.'
          },
          page2TalkBox: {
            talkBoxText: "Baca dan tulis waktu yang ditampilkan pada jam. <br/>Pertama - jam.",
            talkBoxOnWrong: 'Ups! Lihat jarum pendek. Angka berapa yang baru saja dilewatinya?',
            talkBoxOnCorrect: "<span>Benar!<br/> Jarum pendek menunjuk <br/><span style='color:#FFD700'>8 jam!</span></span>",
          },
          page3TalkBox: {
            talkBoxText: "<span><span style='color:#FFD700'>8 jam</span> dan<br/> <span style='color:#70ACC7'>?? menit</span><br/><br/> Mari kita lihat jarum panjang menunjuk angka berapa?</span>",
            talkBoxOnWrong: 'Ups! Lihat angka berapa yang ditunjuk jarum panjang.',
            talkBoxOnCorrect: "Bagus! Berapa menit saat jarum panjang menunjuk 2?",
          },
          page4TalkBox: {
            talkBoxText: "Berapa menit saat jarum panjang menunjuk 2?",
            talkBoxOnWrong: 'Ups! Kalikan 2 dengan 5 untuk mencari menit yang ditunjukkan jam.',
            talkBoxOnCorrect: "Bagus! Jam menunjuk 8 jam 10 menit.",
          }
        },
        {
          previousHour: 8,
          previousMinute: 10,
          hour: 8,
          minute: 25,
          box1Numpad: {
            correctValue: 8,
            correctFeedback: 'Benar. Jarum pendek baru saja melewati angka 8 pada jam.',
            incorrectFeedback: 'Ups! Lihat jarum pendek. Angka berapa yang baru saja dilewatinya?'
          },
          options: [
            { text: "5", iscorrect: true, feedback: "Benar. Jarum panjang menunjuk 5." },
            { text: "2", iscorrect: false, feedback: "Ups! Coba lagi. Jarum panjang tidak menunjuk 2." },
          ],
          box2Numpad: {
            correctValue: 25,
            correctFeedback: 'Benar. Jam menunjuk 8:25.',
            incorrectFeedback: 'Ups! Coba lagi. Jarum panjang menunjuk 5. Jadi, kalikan 5 dengan 5 untuk mencari menit.'
          },
          page2TalkBox: {
            talkBoxText: "Baca dan tulis waktu yang ditampilkan pada jam. <br/>Pertama - jam.",
            talkBoxOnWrong: 'Ups! Lihat jarum pendek. Angka berapa yang baru saja dilewatinya?',
            talkBoxOnCorrect: "<span>Benar!<br/> Jarum pendek menunjuk <br/><span style='color:#FFD700'>8 jam!</span></span>",
          },
          page3TalkBox: {
            talkBoxText: "<span><span style='color:#FFD700'>8 jam</span> dan<br/> <span style='color:#70ACC7'>?? menit</span><br/><br/> Mari kita lihat jarum panjang menunjuk angka berapa?</span>",
            talkBoxOnWrong: 'Ups! Lihat angka berapa yang ditunjuk jarum panjang.',
            talkBoxOnCorrect: "Bagus! Berapa menit saat jarum panjang menunjuk 5?",
          },
          page4TalkBox: {
            talkBoxText: "Berapa menit saat jarum panjang menunjuk 5?",
            talkBoxOnWrong: 'Ups! Kalikan 5 dengan 5 untuk mencari menit yang ditunjukkan jam.',
            talkBoxOnCorrect: "Bagus! Jam menunjuk 8 jam 25 menit.",
          }
        },
        {
          previousHour: 8,
          previousMinute: 25,
          hour: 9,
          minute: 30,
          box1Numpad: {
            correctValue: 9,
            correctFeedback: 'Benar. Jarum pendek baru saja melewati angka 9 pada jam.',
            incorrectFeedback: 'Ups! Lihat jarum pendek. Angka berapa yang baru saja dilewatinya?'
          },
          options: [
            { text: "6", iscorrect: true, feedback: "Benar. Jarum panjang menunjuk 6." },
            { text: "3", iscorrect: false, feedback: "Ups! Coba lagi. Jarum panjang tidak menunjuk 3." },
          ],
          box2Numpad: {
            correctValue: 30,
            correctFeedback: 'Benar. Jam menunjuk 9:30.',
            incorrectFeedback: 'Ups! Coba lagi. Jarum panjang menunjuk 6. Jadi, kalikan 6 dengan 5 untuk mencari menit.'
          },
          page2TalkBox: {
            talkBoxText: "Baca dan tulis waktu yang ditampilkan pada jam. <br/>Pertama - jam.",
            talkBoxOnWrong: 'Ups! Lihat jarum pendek. Angka berapa yang baru saja dilewatinya?',
            talkBoxOnCorrect: "<span>Benar!<br/> Jarum pendek menunjuk <br/><span style='color:#FFD700'>9 jam!</span></span>",
          },
          page3TalkBox: {
            talkBoxText: "<span><span style='color:#FFD700'>9 jam</span> dan<br/> <span style='color:#70ACC7'>?? menit</span><br/><br/> Mari kita lihat jarum panjang menunjuk angka berapa?</span>",
            talkBoxOnWrong: 'Ups! Lihat angka berapa yang ditunjuk jarum panjang.',
            talkBoxOnCorrect: "Bagus! Berapa menit saat jarum panjang menunjuk 6?",
          },
          page4TalkBox: {
            talkBoxText: "Berapa menit saat jarum panjang menunjuk 6?",
            talkBoxOnWrong: 'Ups! Kalikan 6 dengan 5 untuk mencari menit yang ditunjukkan jam.',
            talkBoxOnCorrect: "Bagus! Jam menunjuk 9 jam 30 menit.",
          }
        }
      ],

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
          title: "Menulis Waktu",
          mainText:
            'Ayo coba membaca dan menulis waktu yang ditunjukkan pada <br/>jam.<br/><br/>Ketuk "Mulai" untuk memulai!',
        },
        page2: {
          instructionText: "Ketuk numpad untuk menulis jam di kotak yang disorot.",
          instructionAfterQuiz: "Ketuk » untuk membaca menit.",
          finish: "Ketuk » untuk selesai.",
          timeOnClock: "WAKTU DI JAM?",
          feedback: {
            emptyFeedback: "Isi kotak yang disorot sebelum mengecek",
          },
          quizPanel: {
            quizSubType: "QT2R",
            questionText: "",
            options: [
              { text: "Jam 5", iscorrect: true, feedback: "Bagus! Benar." },
              { text: "Jam 8", iscorrect: false, feedback: "Oops! Periksa angka yang ditunjuk jarum pendek." },
              { text: "Jam 12", iscorrect: false, feedback: "Oops! Periksa angka yang ditunjuk jarum pendek." },
            ],
          },
        },
        page3: {
          instructionText: "Ketuk opsi yang benar.",
          instructionAfterQuiz: "Ketuk » untuk membaca menit.",
          finish: "Ketuk » untuk selesai.",
          timeOnClock: "WAKTU DI JAM?",
          feedback: {
            emptyFeedback: "Isi kotak yang disorot sebelum mengecek",
          },
          quizPanel: {
            quizSubType: "QT2R",
            questionText: "Angka berapa yang ditunjuk jarum panjang?",
            options: [
              { text: "Jam 5", iscorrect: true, feedback: "Bagus! Benar." },
              { text: "Jam 8", iscorrect: false, feedback: "Oops! Periksa angka yang ditunjuk jarum pendek." },
              { text: "Jam 12", iscorrect: false, feedback: "Oops! Periksa angka yang ditunjuk jarum pendek." },
            ],
          },
        },
        page4: {
          instructionText: "Ketuk numpad untuk menulis menit di kotak yang disorot.",
          instructionAfterQuiz: "Ketuk » untuk membaca menit.",
          finish: "Ketuk » untuk selesai.",
          timeOnClock: "WAKTU DI JAM?",
          feedback: {
            emptyFeedback: "Isi kotak yang disorot sebelum mengecek",
          },
          quizPanel: {
            quizSubType: "QT2R",
            questionText: "",
            options: [
              { text: "Jam 5", iscorrect: true, feedback: "Bagus! Benar." },
              { text: "Jam 8", iscorrect: false, feedback: "Oops! Periksa angka yang ditunjuk jarum pendek." },
              { text: "Jam 12", iscorrect: false, feedback: "Oops! Periksa angka yang ditunjuk jarum pendek." },
            ],
          },
        },
        page5: {
          title: "Aktivitas di berbagai waktu dalam sehari.",
          mainText:
            "Luar biasa! Kita memahami bagian-bagian <br/>hari. Kita juga belajar aktivitas apa yang <br/>kita lakukan di waktu tersebut.",
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
window.Question = typeof i18n !== "undefined" ? i18n.t("Question") : AppData.translations.en.Question;
// Make i18n globally available
window.i18n = i18n;
