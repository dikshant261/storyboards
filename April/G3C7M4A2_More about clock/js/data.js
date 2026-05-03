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
        title: "Reading Minutes",
      },


      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        start: "Start",
        continue: 'Continue',
      },
      messages: {
        pageStatesCleared:
          "Page states have been cleared. Reload the page to start fresh?",
        nextButtonPage2: "Page navigation event dispatched",
        nextButtonpage2: "Page navigation event dispatched",
        nextButtonpage3: "Page navigation event dispatched",
        nextButtonpage4: "Page navigation event dispatched",
        nextButtonpage5: "Page navigation event dispatched",
        nextButtonpage6: "Page navigation event dispatched",
        nextButtonpage7: "Page navigation event dispatched",
        nextButtonpage9: "Page navigation event dispatched",
        nextButtonpage10: "Page navigation event dispatched",
        nextButtonpage11: "Page navigation event dispatched",
        nextButtonpage12: "Page navigation event dispatched",
        nextButtonpage13: "Page navigation event dispatched",
        previousButtonPage1: "Page navigation event dispatched",
        navigationReset: "Resetting to question 1",
        navigationComplete: "App reset complete – ready for new question",
        lastPageStartingOver: "Last page – starting over",
        allStagesCompleted: "All stages completed!",
      },
      quiz: {
        legacyQuestionBank: [],
      },
      clockLesson: {
        arcLabelPlusFive: "+5",
        minuteEquationLabels: [
          "1 × 5 = 5 minutes",
          "2 × 5 = 10 minutes",
          "3 × 5 = 15 minutes",
          "4 × 5 = 20 minutes",
          "5 × 5 = 25 minutes",
        ],
      },
      numberPad: {
        feedback: { empty: "First enter some value" },
        checkButton: "CHECK",
        showHintButton: "show 💡",
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
          title: "Reading Minutes",
          mainText: "Let’s learn how to read minutes by looking where the long hand is pointing to.<br/><br/>Tap “Start” to begin!"
        },
        page2: {
          talkBoxText: "<span>When long hand is at 12, a new hour starts and clock reads <span style='color:#70ACC7'>0</span> minutes.</span>",
          talkBoxOnWrong: 'Oops! Dinner is done at night. Pagi shows morning time.',
          talkBoxOnCorrect: "Well Done! We write pagi after time to show morning time.We do breakfast in morning hours.",
          instructionText: "Tap » to explore more.",
          instructionAfterQuiz: 'Tap » to try another time.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          clockReads: "Clock reads 6 o’clock."
        },
        page3: {
          talkBoxText: "<span><span style='color:#EBCD52'>6</span> o’clock is written as <span style='color:#EBCD52'>6</span>:<span style='color:#00FFF2'>00</span>. That means <span style='color:#EBCD52'>6</span> hours and <span style='color:#00FFF2'>0</span> minutes.</span>",
          talkBoxOnWrong: 'Oops! Dinner is done at night. Pagi shows morning time.',
          talkBoxOnCorrect: "Well Done! We write pagi after time to show morning time.We do breakfast in morning hours.",
          instructionText: "Tap » to continue.",
          instructionAfterQuiz: 'Tap » to try another time.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          clockReads: "6 : 00"
        },
        page4: {
          talkBoxText: "The long hand has moved from 12 to 1. How many minutes does the clock read?",
          talkAfterNumberPadCorrect: "Well done! <br>Now, the clock reads {minutes} minutes.",
          talkAfterNumberPadIncorrect:
            "Oops! That's not right<br>Recall that long hand takes 5 minutes to move to the next number.",
          instructionTapNextFaceHour: "Tap {hour} on the clock to move long hand there.",
          instructionAfterClockFaceTap: "Tap using numpad to fill the minutes.",
          talkAfterClockFaceTapHour:
            "The long hand has moved to number {hour}.<br>How many many minutes does the clock read now?",
          talkBoxOnWrong: 'Oops! Dinner is done at night. Pagi shows morning time.',
          talkBoxOnCorrect: "Well Done! We write pagi after time to show morning time.We do breakfast in morning hours.",
          instructionText: "Tap using numpad to fill the minutes.",
          instructionAfterQuiz: 'Tap » to try another time.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          clockReads: "6 : 05",
          feedback: {
            correct:
              "That is correct!<br>Clock reads 5 minutes when long hand points at 1.",
            step2Correct:
              "That is correct!<br>Clock reads 10 minutes when long hand points at 2.",
            step2Incorrect: "Oops! Try again.",
            step3Correct:
              "That is correct!<br>Clock reads 15 minutes when long hand points at 3.",
            step3Incorrect: "Oops! Try again.",
            step4Correct:
              "That is correct!<br>Clock reads 20 minutes when long hand points at 4.",
            step4Incorrect: "Oops! Try again.",
            step5Correct:
              "That is correct!<br>Clock reads 25 minutes when long hand points at 5.",
            step5Incorrect: "Oops! Try again.",
            incorrect: "Oops! Try again.",
            emptyFeedback: "Fill the highlighted box before checking",
          },
        },
        page5: {
          readingMinutesHeader: "Reading Minutes",
          liftBagText: "The bag feels heavy to lift.",
          liftEraserText: "The eraser feels light to lift.",
          mainText: `
<span style="color:#22E6E6; font-weight:600;">Do you observe?</span><br/><br/>

To find minutes when long hand points to a number, we need to do 
<span style="color:#FFD34D; font-weight:700;">REPEATED ADDITION of 5.</span>
<br/><br/>

Can we use multiplication to read minutes?
`,
          talkBoxText: "The long hand has moved from 12 to 1. How many minutes does the clock read?",
          talkAfterNumberPadCorrect: "Well done! <br>Now, the clock reads {minutes} minutes.",
          talkAfterNumberPadIncorrect:
            "Oops! That's not right<br>Recall that long hand takes 5 minutes to move to the next number.",
          instructionTapNextFaceHour: "Tap {hour} on the clock to move long hand there.",
          instructionAfterClockFaceTap: "Tap using numpad to fill the minutes.",
          talkAfterClockFaceTapHour:
            "The long hand has moved to number {hour}.<br>How many many minutes does the clock read now?",
          talkBoxOnWrong: 'Oops! Dinner is done at night. Pagi shows morning time.',
          talkBoxOnCorrect: "Well Done! We write pagi after time to show morning time.We do breakfast in morning hours.",
          instructionText: "Tap » to continue.",
          instructionAfterQuiz: 'Tap » to try another time.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          clockReads: "6 : 05",
          feedback: {
            correct:
              "That is correct!<br>Clock reads 5 minutes when long hand points at 1.",
            step2Correct:
              "That is correct!<br>Clock reads 10 minutes when long hand points at 2.",
            step2Incorrect: "Oops! Try again.",
            step3Correct:
              "That is correct!<br>Clock reads 15 minutes when long hand points at 3.",
            step3Incorrect: "Oops! Try again.",
            step4Correct:
              "That is correct!<br>Clock reads 20 minutes when long hand points at 4.",
            step4Incorrect: "Oops! Try again.",
            step5Correct:
              "That is correct!<br>Clock reads 25 minutes when long hand points at 5.",
            step5Incorrect: "Oops! Try again.",
            incorrect: "Oops! Try again.",
            emptyFeedback: "Fill the highlighted box before checking",
          },
        },
        page6: {
          mainText: `
<div style="text-align:center;">
<span style="color:#22E6E6;font-weight:700;">Repeated addition<br/>of 5 is<br/>Multiplication by 5.</span>
<br/><br/>
<span style="color:#ffffff;font-weight:700;">Multiply the number<br/>where long hand points<br/>to by 5 to read the<br/>minutes shown by the<br/>clock.</span>
</div>`,
          talkBoxText: "The long hand has moved from 12 to 1. How many minutes does the clock read?",
          talkBoxOnWrong: 'Oops! Dinner is done at night. Pagi shows morning time.',
          talkBoxOnCorrect: "Well Done! We write pagi after time to show morning time.We do breakfast in morning hours.",
          instructionText: "Tap using numpad to fill the minutes.",
          instructionAfterQuiz: 'Tap » to try another time.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          clockReads: "6 : 00"
        },
        page7: {
          talkBoxText:
            "Long hand points at {hour}.<br>What should we do to read the minutes on the clock?",
          talkBoxOnWrong: 'Oops! Dinner is done at night. Pagi shows morning time.',
          talkBoxOnCorrect:
            "This is how we read the minutes when long hand points at a number.",
          instructionText: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to multiply.",
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          clockReads: "6 : 00",
          quizPanel: {
            questionText:
              "What should we do to find the minutes on the clock?",
            optionMultiplyBy5: {
              text: "Multiply {hour} by 5",
              feedback:
                "Good Job! <br>To read minutes, we multiply the number the long hand is pointing at by 5.",
            },
            optionMultiplyBy1: {
              text: "Multiply {hour} by 1",
              feedback:
                "Oops! Try again.<br>Long hand moving from one number to the next is 5 minutes.",
            },
            optionAddHTo5: {
              text: "Add {hour} to 5",
              feedback:
                "Oops! Try again.<br>Long hand moving from one number to the next is 5 minutes.",
            },
          },
        },
        page8: {
          talkBoxText:
            "Long hand points at {hour}.<br>What should we do to read the minutes on the clock?",
          talkBoxOnWrong: 'Oops! Dinner is done at night. Pagi shows morning time.',
          talkBoxOnCorrect:
            "This is how we read the minutes when long hand points at a number.",
          liftFeatherText: "The feather is light to lift.",
          liftWatermelonText: "The watermelon is heavy to lift.",
          equationLabel: "{hour} x 5 = ",
          instructionText: "Tap the number using numpad and check.",
          instructionAfterQuiz: "Tap » to continue.",
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          clockReads: "6 : 00",
          feedback: {
            correct:
              "That is correct!<br>{hour} x 5 = {minutes}, so the clock reads {minutes} minutes when the long hand points at {hour}.",
            incorrect: "Oops! Try again.",
            emptyFeedback: "Fill the yellow answer box before checking.",
          },
        },
        page9: {
          title: "Reading Minutes",
          mainText: `
<span style="color:#22E6E6; font-weight:600;">Do you observe?</span><br/><br/>

To find minutes when long hand points to a number, we need to do 
<span style="color:#FFD34D; font-weight:700;">REPEATED ADDITION of 5.</span>
<br/><br/>

Can we use multiplication to read minutes?
`,
          instructionText: "Tap » to continue.",
          instructionAfterPage8Last: "Tap » to continue.",
          instructionAfterPage8Next: "Tap » to go to the next question.",
          instructionAfterQuiz: "Tap » to continue.",
        },
        page10: {
          title: "Reading Minutes",
          mainText: `
<span style="color:#22E6E6; font-weight:600;"> Repeated addition 
of 5 is 
Multiplication by 5.</span><br/><br/>

Multiply the number where long hand points to by 5 to read the minutes shown by the clock.
`,
          instructionText: "Tap » to read minutes when long hand points to 6.",
          fiveMinutes: '1 × 5 = 5 minutes',
          tenMinutes: '2 × 5 = 10 minutes',
          fifteenMinutes: '3 × 5 = 15 minutes',
          twentyMinutes: '4 × 5 = 20 minutes',
          twentyFiveMinutes: '5 × 5 = 25 minutes',
          instructionAfterQuiz: "Tap » to continue.",
        },
        page11: {
          talkBoxText: "Long hand points at 6. What should we do to read the minutes on the clock?",
          talkBoxOnWrong: 'Oops! Dinner is done at night. Pagi shows morning time.',
          talkBoxOnCorrect: "This is how we read the minutes when long hand points at a number.",
          liftStoneText: "The stone is heavy to lift.",
          liftPencilText: "The pencil is light to lift.",
          instructionText: "Tap the correct option.",
          instructionAfterQuiz: 'Tap » to multiply.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          clockReads: "6 : 00",
          quizPanel: {
            quizSubType: "QT3R",
            questionText: '',
            options: [
              {
                text: "Multiply 6 by 5",
                iscorrect: true,
                feedback: "Good Job! To read minutes, we multiply the number the long hand is pointing at by 5.",
              },
              {
                text: "Multiply 6 by 1",
                iscorrect: false,
                feedback: "Oops! Try again. Long hand moving from one number to the next is 5 minutes.",
              },
              {
                text: "Add 6 to 5",
                iscorrect: false,
                feedback: "Oops! Try again. Long hand moving from one number to the next is 5 minutes.",

              }

            ],
          }
        },
        page12: {
          talkBoxText: "Multiply 6 by 5 to read minutes when long hand points at 6",
          talkBoxOnWrong: 'Oops! Dinner is done at night. Pagi shows morning time.',
          talkBoxOnCorrect: "Clock reads 6:30 now.",
          instructionText: "Tap the correct option.",
          instructionAfterQuiz: 'Tap » to multiply.',
          finish: 'Tap » to finish.',
          timeOnClock: "TIME ON CLOCK?",
          clockReads: "6 × 5 = ",
          feedback: {
            correct: 'That’s correct. Clock reads 30 minutes when long hand points at 6.',
            incorrect: 'Oops! Try again. Multiply 6 by 5 to find the answer.',
            empty: 'Enter a value!',
            emptyFeedback: 'Enter a value!',
          }
        },
        page13: {
          title: "Reading Minutes",
          mainText: `
After 6:55, When the long hand moves from 11 to 12. 
The short hand moves to the next number 7. A new hour starts. 

60 minutes past 6 o'clock is 
0 minutes past 7!
<br/>
That's 7 o' clock or 7:00

`,
          instructionText: "Tap » to continue.",

        },
        page14: {
          title: "Reading Minutes",
          mainText: `Awesome! We just explored reading minutes by looking at which number 
the long hand points to.
`
                    
        },
        
      },
    },
    id: {
      appInfo: {
        title: "Membaca Menit",
      },

      messages: {
        pageStatesCleared:
          "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
        nextButtonPage2: "Peristiwa navigasi halaman dikirim",
        nextButtonpage2: "Peristiwa navigasi halaman dikirim",
        nextButtonpage3: "Peristiwa navigasi halaman dikirim",
        nextButtonpage4: "Peristiwa navigasi halaman dikirim",
        nextButtonpage5: "Peristiwa navigasi halaman dikirim",
        nextButtonpage6: "Peristiwa navigasi halaman dikirim",
        nextButtonpage7: "Peristiwa navigasi halaman dikirim",
        nextButtonpage9: "Peristiwa navigasi halaman dikirim",
        nextButtonpage10: "Peristiwa navigasi halaman dikirim",
        nextButtonpage11: "Peristiwa navigasi halaman dikirim",
        nextButtonpage12: "Peristiwa navigasi halaman dikirim",
        nextButtonpage13: "Peristiwa navigasi halaman dikirim",
        previousButtonPage1: "Peristiwa navigasi halaman dikirim",
        navigationReset: "Mengatur ulang ke pertanyaan 1",
        navigationComplete:
          "Reset aplikasi selesai – siap untuk pertanyaan baru",
        lastPageStartingOver: "Halaman terakhir – memulai kembali",
        allStagesCompleted: "Semua tahap telah selesai!",
      },

      quiz: {
        legacyQuestionBank: [],
      },

      clockLesson: {
        arcLabelPlusFive: "+5",
        minuteEquationLabels: [
          "1 × 5 = 5 menit",
          "2 × 5 = 10 menit",
          "3 × 5 = 15 menit",
          "4 × 5 = 20 menit",
          "5 × 5 = 25 menit",
        ],
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang",
        start: "Mulai",
        continue: "Lanjutkan",
      },

      numberPad: {
        feedback: { empty: "Masukkan nilai terlebih dahulu" },
        checkButton: "PERIKSA",
        showHintButton: "tunjukkan 💡",
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
          title: "Membaca Menit",
          mainText:
            "Mari belajar membaca menit dengan melihat ke mana jarum panjang menunjuk.<br/><br/>Ketuk “Mulai” untuk memulai!",
        },
        page2: {
          talkBoxText:
            "<span>Ketika jarum panjang di 12, jam baru dimulai dan jam menunjukkan <span style='color:#70ACC7'>0</span> menit.</span>",
          talkBoxOnWrong:
            "Ups! Makan malam dilakukan di malam hari. Pagi menunjukkan waktu pagi.",
          talkBoxOnCorrect:
            "Bagus! Kita menulis “pagi” setelah waktu untuk menunjukkan waktu pagi. Kita sarapan di jam pagi.",
          instructionText: "Ketuk » untuk menjelajah lebih lanjut.",
          instructionAfterQuiz: "Ketuk » untuk mencoba waktu lain.",
          finish: "Ketuk » untuk selesai.",
          timeOnClock: "WAKTU DI JAM?",
          clockReads: "Jam menunjukkan pukul 6.",
        },
        page3: {
          talkBoxText:
            "<span><span style='color:#EBCD52'>6</span> ditulis sebagai <span style='color:#EBCD52'>6</span>:<span style='color:#00FFF2'>00</span>. Artinya <span style='color:#EBCD52'>6</span> jam dan <span style='color:#00FFF2'>0</span> menit.</span>",
          talkBoxOnWrong:
            "Ups! Makan malam dilakukan di malam hari. Pagi menunjukkan waktu pagi.",
          talkBoxOnCorrect:
            "Bagus! Kita menulis “pagi” setelah waktu untuk menunjukkan waktu pagi. Kita sarapan di jam pagi.",
          instructionText: "Ketuk » untuk melanjutkan.",
          instructionAfterQuiz: "Ketuk » untuk mencoba waktu lain.",
          finish: "Ketuk » untuk selesai.",
          timeOnClock: "WAKTU DI JAM?",
          clockReads: "6 : 00",
        },
        page4: {
          talkBoxText:
            "Jarum panjang bergerak dari 12 ke 1. Berapa menit yang ditunjukkan jam?",
          talkAfterNumberPadCorrect:
            "Bagus! <br>Sekarang jam menunjukkan {minutes} menit.",
          talkAfterNumberPadIncorrect:
            "Ups! Itu belum tepat<br>Ingat, jarum panjang butuh 5 menit untuk pindah ke angka berikutnya.",
          instructionTapNextFaceHour:
            "Ketuk {hour} pada jam untuk memindahkan jarum panjang ke sana.",
          instructionAfterClockFaceTap:
            "Ketuk angka pada numpad untuk mengisi menit.",
          talkAfterClockFaceTapHour:
            "Jarum panjang sudah di angka {hour}.<br>Berapa menit yang ditunjukkan jam sekarang?",
          talkBoxOnWrong:
            "Ups! Makan malam dilakukan di malam hari. Pagi menunjukkan waktu pagi.",
          talkBoxOnCorrect:
            "Bagus! Kita menulis “pagi” setelah waktu untuk menunjukkan waktu pagi. Kita sarapan di jam pagi.",
          instructionText: "Ketuk numpad untuk mengisi menit.",
          instructionAfterQuiz: "Ketuk » untuk mencoba waktu lain.",
          finish: "Ketuk » untuk selesai.",
          timeOnClock: "WAKTU DI JAM?",
          clockReads: "6 : 05",
          feedback: {
            correct:
              "Benar!<br>Jam menunjukkan 5 menit ketika jarum panjang di 1.",
            step2Correct:
              "Benar!<br>Jam menunjukkan 10 menit ketika jarum panjang di 2.",
            step2Incorrect: "Ups! Coba lagi.",
            step3Correct:
              "Benar!<br>Jam menunjukkan 15 menit ketika jarum panjang di 3.",
            step3Incorrect: "Ups! Coba lagi.",
            step4Correct:
              "Benar!<br>Jam menunjukkan 20 menit ketika jarum panjang di 4.",
            step4Incorrect: "Ups! Coba lagi.",
            step5Correct:
              "Benar!<br>Jam menunjukkan 25 menit ketika jarum panjang di 5.",
            step5Incorrect: "Ups! Coba lagi.",
            incorrect: "Ups! Coba lagi.",
            emptyFeedback: "Isi kotak yang disorot sebelum memeriksa",
          },
        },
        page5: {
          readingMinutesHeader: "Membaca Menit",
          liftBagText: "Tas terasa berat untuk diangkat.",
          liftEraserText: "Penghapus terasa ringan untuk diangkat.",
          mainText: `
<span style="color:#22E6E6; font-weight:600;">Apakah kamu melihat?</span><br/><br/>

Untuk mencari menit ketika jarum panjang menunjuk suatu angka, kita perlu
<span style="color:#FFD34D; font-weight:700;">PENJUMLAHAN BERULANG 5.</span>
<br/><br/>

Bisakah kita memakai perkalian untuk membaca menit?
`,
          talkBoxText:
            "Jarum panjang bergerak dari 12 ke 1. Berapa menit yang ditunjukkan jam?",
          talkAfterNumberPadCorrect:
            "Bagus! <br>Sekarang jam menunjukkan {minutes} menit.",
          talkAfterNumberPadIncorrect:
            "Ups! Itu belum tepat<br>Ingat, jarum panjang butuh 5 menit untuk pindah ke angka berikutnya.",
          instructionTapNextFaceHour:
            "Ketuk {hour} pada jam untuk memindahkan jarum panjang ke sana.",
          instructionAfterClockFaceTap:
            "Ketuk angka pada numpad untuk mengisi menit.",
          talkAfterClockFaceTapHour:
            "Jarum panjang sudah di angka {hour}.<br>Berapa menit yang ditunjukkan jam sekarang?",
          talkBoxOnWrong:
            "Ups! Makan malam dilakukan di malam hari. Pagi menunjukkan waktu pagi.",
          talkBoxOnCorrect:
            "Bagus! Kita menulis “pagi” setelah waktu untuk menunjukkan waktu pagi. Kita sarapan di jam pagi.",
          instructionText: "Ketuk » untuk melanjutkan.",
          instructionAfterQuiz: "Ketuk » untuk mencoba waktu lain.",
          finish: "Ketuk » untuk selesai.",
          timeOnClock: "WAKTU DI JAM?",
          clockReads: "6 : 05",
          feedback: {
            correct:
              "Benar!<br>Jam menunjukkan 5 menit ketika jarum panjang di 1.",
            step2Correct:
              "Benar!<br>Jam menunjukkan 10 menit ketika jarum panjang di 2.",
            step2Incorrect: "Ups! Coba lagi.",
            step3Correct:
              "Benar!<br>Jam menunjukkan 15 menit ketika jarum panjang di 3.",
            step3Incorrect: "Ups! Coba lagi.",
            step4Correct:
              "Benar!<br>Jam menunjukkan 20 menit ketika jarum panjang di 4.",
            step4Incorrect: "Ups! Coba lagi.",
            step5Correct:
              "Benar!<br>Jam menunjukkan 25 menit ketika jarum panjang di 5.",
            step5Incorrect: "Ups! Coba lagi.",
            incorrect: "Ups! Coba lagi.",
            emptyFeedback: "Isi kotak yang disorot sebelum memeriksa",
          },
        },
        page6: {
          mainText: `
<div style="text-align:center;">
<span style="color:#22E6E6;font-weight:700;">Penjumlahan berulang<br/>angka 5 adalah<br/>perkalian dengan 5.</span>
<br/><br/>
<span style="color:#ffffff;font-weight:700;">Kalikan angka yang<br/>ditunjuk jarum panjang<br/>dengan 5 untuk membaca<br/>menit yang ditunjukkan<br/>oleh jam.</span>
</div>`,
          talkBoxText:
            "Jarum panjang bergerak dari 12 ke 1. Berapa menit yang ditunjukkan jam?",
          talkBoxOnWrong:
            "Ups! Makan malam dilakukan di malam hari. Pagi menunjukkan waktu pagi.",
          talkBoxOnCorrect:
            "Bagus! Kita menulis “pagi” setelah waktu untuk menunjukkan waktu pagi. Kita sarapan di jam pagi.",
          instructionText: "Ketuk numpad untuk mengisi menit.",
          instructionAfterQuiz: "Ketuk » untuk mencoba waktu lain.",
          finish: "Ketuk » untuk selesai.",
          timeOnClock: "WAKTU DI JAM?",
          clockReads: "6 : 00",
        },
        page7: {
          talkBoxText:
            "Jarum panjang menunjuk ke {hour}.<br>Apa yang harus kita lakukan untuk membaca menit pada jam?",
          talkBoxOnWrong:
            "Ups! Makan malam dilakukan di malam hari. Pagi menunjukkan waktu pagi.",
          talkBoxOnCorrect:
            "Beginilah cara kita membaca menit ketika jarum panjang menunjuk ke suatu angka.",
          instructionText: "Ketuk opsi yang benar.",
          instructionAfterQuiz: "Ketuk » untuk mengalikan.",
          finish: "Ketuk » untuk selesai.",
          timeOnClock: "WAKTU DI JAM?",
          clockReads: "6 : 00",
          quizPanel: {
            questionText:
              "Apa yang harus kita lakukan untuk menemukan menit pada jam?",
            optionMultiplyBy5: {
              text: "Kalikan {hour} dengan 5",
              feedback:
                "Bagus! <br>Untuk membaca menit, kita kalikan angka yang ditunjuk jarum panjang dengan 5.",
            },
            optionMultiplyBy1: {
              text: "Kalikan {hour} dengan 1",
              feedback:
                "Ups! Coba lagi.<br>Jarum panjang pindah dari satu angka ke angka berikutnya dalam 5 menit.",
            },
            optionAddHTo5: {
              text: "Tambahkan {hour} ke 5",
              feedback:
                "Ups! Coba lagi.<br>Jarum panjang pindah dari satu angka ke angka berikutnya dalam 5 menit.",
            },
          },
        },
        page8: {
          talkBoxText:
            "Jarum panjang menunjuk ke {hour}.<br>Apa yang harus kita lakukan untuk membaca menit pada jam?",
          talkBoxOnWrong:
            "Ups! Makan malam dilakukan di malam hari. Pagi menunjukkan waktu pagi.",
          talkBoxOnCorrect:
            "Beginilah cara kita membaca menit ketika jarum panjang menunjuk ke suatu angka.",
          liftFeatherText: "Bulu terasa ringan untuk diangkat.",
          liftWatermelonText: "Semangka terasa berat untuk diangkat.",
          equationLabel: "{hour} x 5 = ",
          instructionText: "Ketuk angka dengan numpad lalu periksa.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          finish: "Ketuk » untuk selesai.",
          timeOnClock: "WAKTU DI JAM?",
          clockReads: "6 : 00",
          feedback: {
            correct:
              "Benar!<br>{hour} x 5 = {minutes}, jadi jam menunjukkan {minutes} menit ketika jarum panjang menunjuk ke {hour}.",
            incorrect: "Ups! Coba lagi.",
            emptyFeedback: "Isi kotak jawaban kuning sebelum memeriksa",
          },
        },
        page9: {
          title: "Membaca Menit",
          mainText: `
<span style="color:#22E6E6; font-weight:600;">Apakah kamu melihat?</span><br/><br/>

Untuk mencari menit ketika jarum panjang menunjuk suatu angka, kita perlu
<span style="color:#FFD34D; font-weight:700;">PENJUMLAHAN BERULANG 5.</span>
<br/><br/>

Bisakah kita memakai perkalian untuk membaca menit?
`,
          instructionText: "Ketuk » untuk melanjutkan.",
          instructionAfterPage8Last: "Ketuk » untuk melanjutkan.",
          instructionAfterPage8Next: "Ketuk » untuk menuju ke pertanyaan berikutnya.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
        },
        page10: {
          title: "Membaca Menit",
          mainText: `
<span style="color:#22E6E6; font-weight:600;">Penjumlahan berulang 
angka 5 adalah 
perkalian dengan 5.</span><br/><br/>

Kalikan angka yang ditunjuk jarum panjang dengan 5 untuk membaca menit yang ditunjukkan jam.
`,
          instructionText:
            "Ketuk » untuk membaca menit ketika jarum panjang menunjuk ke 6.",
          fiveMinutes: "1 × 5 = 5 menit",
          tenMinutes: "2 × 5 = 10 menit",
          fifteenMinutes: "3 × 5 = 15 menit",
          twentyMinutes: "4 × 5 = 20 menit",
          twentyFiveMinutes: "5 × 5 = 25 menit",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
        },
        page11: {
          talkBoxText:
            "Jarum panjang menunjuk ke 6. Apa yang harus kita lakukan untuk membaca menit pada jam?",
          talkBoxOnWrong:
            "Ups! Makan malam dilakukan di malam hari. Pagi menunjukkan waktu pagi.",
          talkBoxOnCorrect:
            "Beginilah cara kita membaca menit ketika jarum panjang menunjuk ke suatu angka.",
          liftStoneText: "Batu terasa berat untuk diangkat.",
          liftPencilText: "Pensil terasa ringan untuk diangkat.",
          instructionText: "Ketuk opsi yang benar.",
          instructionAfterQuiz: "Ketuk » untuk mengalikan.",
          finish: "Ketuk » untuk selesai.",
          timeOnClock: "WAKTU DI JAM?",
          clockReads: "6 : 00",
          quizPanel: {
            quizSubType: "QT3R",
            questionText: "",
            options: [
              {
                text: "Kalikan 6 dengan 5",
                iscorrect: true,
                feedback:
                  "Bagus! Untuk membaca menit, kita kalikan angka yang ditunjuk jarum panjang dengan 5.",
              },
              {
                text: "Kalikan 6 dengan 1",
                iscorrect: false,
                feedback:
                  "Ups! Coba lagi. Jarum panjang pindah dari satu angka ke angka berikutnya dalam 5 menit.",
              },
              {
                text: "Tambahkan 6 ke 5",
                iscorrect: false,
                feedback:
                  "Ups! Coba lagi. Jarum panjang pindah dari satu angka ke angka berikutnya dalam 5 menit.",
              },
            ],
          },
        },
        page12: {
          talkBoxText:
            "Kalikan 6 dengan 5 untuk membaca menit ketika jarum panjang menunjuk ke 6",
          talkBoxOnWrong:
            "Ups! Makan malam dilakukan di malam hari. Pagi menunjukkan waktu pagi.",
          talkBoxOnCorrect: "Jam sekarang menunjukkan 6:30.",
          instructionText: "Ketuk opsi yang benar.",
          instructionAfterQuiz: "Ketuk » untuk mengalikan.",
          finish: "Ketuk » untuk selesai.",
          timeOnClock: "WAKTU DI JAM?",
          clockReads: "6 × 5 = ",
          feedback: {
            correct:
              "Benar. Jam menunjukkan 30 menit ketika jarum panjang menunjuk ke 6.",
            incorrect:
              "Ups! Coba lagi. Kalikan 6 dengan 5 untuk menemukan jawaban.",
            empty: "Masukkan nilai!",
            emptyFeedback: "Masukkan nilai!",
          },
        },
        page13: {
          title: "Membaca Menit",
          mainText: `
Setelah 6:55, ketika jarum panjang bergerak dari 11 ke 12,
jarum pendek bergerak ke angka berikutnya 7. Jam baru dimulai.

60 menit lewat pukul 6 sama dengan
0 menit lewat pukul 7!
<br/>
Itu pukul 7 atau 7:00

`,
          instructionText: "Ketuk » untuk melanjutkan.",
        },
        page14: {
          title: "Membaca Menit",
          mainText: `Hebat! Kita baru saja menjelajahi cara membaca menit dengan melihat angka mana yang ditunjuk jarum panjang.
`,
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
// Make i18n globally available
window.i18n = i18n;
