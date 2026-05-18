// data.js - Internationalization data for the Diver Coral Reef Planting Learning Applet
// Contains only the text content that's actually used in the app

const highlightColor1 = "#FFD700";
const highlightColor2 = "#70ACC7";
const highlightColor3 = "#F28283";
const highlightColor4 = "#00FF7F";
const highlightColor5 = "#8A2BE2";

const questionTextSize = "24gc";

/** Legacy global used by some applets; quiz flow uses `quiz.questions` via i18n. */
const Question = [];

const AppData = {
  // Current language setting
  currentLanguage: "en",

  // Text content by language
  translations: {
    en: {
      appInfo: {
        title: "Activity on Time",
      },

      quiz: {
        questions: [],
      },

      messages: {
        pageStatesCleared:
          "Page states have been cleared. Reload the page to start fresh?",
        pageNavNext: "Page navigation event sent",
        previousButtonPage1: "Page navigation event sent",
        navigationReset: "Reset to question 1",
        navigationComplete: "App reset complete – ready for a new question",
        lastPageStartingOver: "Last page – starting over",
        allStagesCompleted: "All stages completed!",
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        start: "Start",
        continue: "Continue",
        check: "CHECK",
      },
      numberPad: { feedback: { empty: 'First enter some value' } },
      common: {
        heavy: "Heavy",
        light: "Light",
        tapAlt: "Tap",
        andiCharacterAlt: "Andi",
        hours: "hours",

        minutes: "minutes",
        /** Peripheral arc on clocks (hour 3→7 lesson); numerals identical in EN/ID */
        clockPeripheralArc3to7Labels: {
          startLabel: "0",
          endLabel: "20",
          segmentLabels: [
            { hour: 4, text: "5" },
            { hour: 5, text: "10" },
            { hour: 6, text: "15" },
          ],
        },
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
          title: "Activity on Time",
          mainText:
            "Let’s explore Andi’s daily routine<br/>using our skills with clocks and time.<br/><br/>Tap “Start” to begin!",
        },
        page2: {
          instructionText: "Tap » to explore Andi’s daily routine.",
          instructionAfterQuiz: 'Tap » to try another time.',
          routineText: 'Hi! Meet Andi! <br/>Let’s explore his daily routine…'
        },
        page3: {
          instructionText: "Tap to choose the correct option.",
          instructionAfterQuiz: 'Tap » to continue.',
          routineText: 'Andi wakes up early in the morning.',
          quizPanel: {
            quizSubType: "QT2R",
            questionText: 'What is the time shown in the clock when Andi woke up?',
            options: [
              {
                text: "6:05 am",
                iscorrect: true,
                feedback: "Well Done! That's correct!",
              },
              {
                text: "7:05 am",
                iscorrect: false,
                feedback: "Oops! Try again.",
              },


            ],
          }
        },
        page4: {
          instructionText: "Tap to choose the correct option.",
          instructionAfterQuiz: 'Tap » to continue.',
          routineText: 'Andi then does morning chores from 6:05 am for the next 45 minutes. At what time does Andi finish his morning chores?',
          quizPanel: {
            quizSubType: "QT2R",
            questionText: 'How can we find the time when Andi finished his work?',
            options: [
              {
                text: "Add 45 minutes to<br/>6:05 am",
                iscorrect: true,
                feedback: "Well Done! That's correct!",
              },
              {
                text: "Subtract 45 minutes<br/>from 6:05 am",
                iscorrect: false,
                feedback: "Oops! Try again.",
              },
            ],
          }
        },
        page5: {
          instructionText: "Tap using numpad to fill in the highlighted boxes and check.",
          instructionAfterQuiz: 'Tap » to continue.',
          routineText: 'Andi then does morning chores from 6:05 am for the next 45 minutes. At what time does Andi finish his morning chores?',
          numpadInstruction: 'Add 45 minutes to 6:05 am to find the time when Andi finished his chores.',
          feedback: {
            emptyFeedback:
              "Fill the highlighted box before checking",
            tile3: {
              correct: "Correct!",
              incorrect: "Not Correct! Try again!",
            },
            tile2: {
              correct: "Correct!",
              incorrect: "Not Correct! Try again!",
            },
            tile1: {
              correct:
                "That’s correct. Andi Starts at 6:05 am. 45 minutes later, he finishes his morning  chores at 6:50 am.",
              incorrect: "That’s not correct. Let’s try adding the time again.",
            },
          },
        },
        page6: {
          andiStarts: 'Andi starts at 6:05 am.',
          instructionText: "Tap » to continue.",

        },
        page7: {
          andiStarts: '45 minutes later, Andi finishes his morning  chores at 6:50 am.',
          instructionText: "Tap » to continue.",
          /** Dial arc 5→50 min; badges 0→45 = minutes elapsed (same numerals EN/ID) */
          peripheralArcMinuteLabels: {
            startLabel: "0",
            endLabel: "45",
            segmentLabels: [
              { minute: 10, text: "5" },
              { minute: 15, text: "10" },
              { minute: 20, text: "15" },
              { minute: 25, text: "20" },
              { minute: 30, text: "25" },
              { minute: 35, text: "30" },
              { minute: 40, text: "35" },
              { minute: 45, text: "40" },
            ],
          },
        },
        page8: {
          instructionText: "Tap to choose the correct option.",
          instructionAfterQuiz: 'Tap » to continue.',
          routineText: 'Andi leaves for office at 8:15 am. He takes 20 minutes to reach. At what time will he reached office?',
          quizPanel: {
            quizSubType: "QT2R",
            questionText: 'How can we find the time when Andi reached his office?',
            options: [

              {
                text: "Add 20 minutes to 8:15 am",
                iscorrect: true,
                feedback: "Well Done! That's correct!",
              },
              {
                text: "Subtract 20 minutes from 8:15 am",
                iscorrect: false,
                feedback: "Oops! Try again.",

              },

            ],
          }
        },
        page9: {
          instructionText: "Tap using numpad to fill in the highlighted boxes and check.",
          instructionAfterQuiz: 'Tap » to continue.',
          routineText: 'Andi leaves for office at 8:15 am. He takes 20 minutes to reach. At what time will he reached office?',
          numpadInstruction: 'Add 20 minutes to 8:15 am to find the time when Andi reaches his office.',
          feedback: {
            emptyFeedback:
              "Fill the highlighted box before checking",
            tile3: {
              correct: "Correct!",
              incorrect: "Not Correct! Try again!",
            },
            tile2: {
              correct: "Correct!",
              incorrect: "Not Correct! Try again!",
            },
            tile1: {
              correct:
                "That’s correct. Andi Starts at 8:15 am. 20 minutes later, he reaches his office at 8:35 am.",
              incorrect: "That’s not correct. Let’s try adding the time again.",
            },
          },
        },
        page10: {
          andiStarts: 'Andi starts at 8:15 am.',
          instructionText: "Tap » to continue.",
        },
        page11: {
          andiStarts: '20 minutes later, Andi reaches his office at 8:35 am.',
          instructionText: "Tap » to continue.",

        },
        page12: {
          instructionText: "Tap to choose the correct option.",
          instructionAfterQuiz: 'Tap » to continue.',
          routineText: 'Andi started an office work at 10:13 am and finished that work at 11:39 am. How long did Andi take to finish that work?',
          quizPanel: {
            quizSubType: "QT2R",
            questionText: 'How will you find the time taken by Andi to finish his office work?',
            options: [

              {
                text: "Add the times",
                iscorrect: false,
                feedback: "Oops! Try again.",

              },
              {
                text: "Subtract the first time from second time.",
                iscorrect: true,
                feedback: "Well Done! That's correct!",

              },

            ],
          }
        },
        page13: {
          instructionText: "Tap using numpad to fill in the highlighted boxes and check.",
          instructionAfterQuiz: 'Tap » to continue.',
          routineText: 'Andi started an office work at 10:13 am and finished that work at 11:39 am. How long did Andi take to finish that work?',
          numpadInstruction: 'Subtract 10:13 from 11:39 to find the duration of the activity.',
          feedback: {
            emptyFeedback:
              "Fill the highlighted box before checking",
            tile4: {
              correct: "Correct!",
              incorrect: "Not Correct! Try again!",
            },
            tile3: {
              correct: "Correct!",
              incorrect: "Not Correct! Try again!",
            },
            tile2: {
              correct: "Correct!",
              incorrect: "Not Correct! Try again!",
            },
            tile1: {
              correct:
                "That’s correct. Andi Starts at 10:13 am. 1 hour 26 minutes later, he finishes office work at 11:39 am.",
              incorrect:
                "That’s not correct. Let’s try subtracting the time again.",
            },
          },
        },
        page14: {
          andiStarts: 'Andi starts at 10:13  am.',
          instructionText: "Tap » to continue.",
        },
        page15: {
          andiStarts: '1 hour 26 minutes later, Andi finishes his office work at 11:39 am.',
          instructionText: "Tap » to continue.",
          hour: '1 hour'
        },
        page16: {
          andiStarts: '1 hour 26 minutes later, Andi finishes his office work at 11:39 am.',
          instructionText: "Tap » to continue.",
          hour: '1 hour',
          minutes: '26<br/>minutes',
          and: '&',
          /** Shown on end badge only; arc still ends at minute 39 */
          peripheralArcEndLabel: "26",
        },
        page17: {
          instructionText: "Tap to choose the correct option.",
          instructionAfterQuiz: 'Tap » to continue.',
          routineText: 'Andi ate his lunch in the afternoon. What can be the possible time?',
          quizPanel: {
            quizSubType: "QT3R",
            questionText: 'Which of these is a lunch time?',
            options: [

              {
                text: "8:30 am",
                iscorrect: false,
                feedback: "Oops! Try again.",

              },
              {
                text: "1:30 pm",
                iscorrect: true,
                feedback: "Well Done! That's correct!",

              },
              {
                text: "7:35 pm",
                iscorrect: false,
                feedback: "Oops! Try again.",

              },

            ],
          }
        },
        page18: {
          instructionText: "Tap to choose the correct option.",
          instructionAfterQuiz: 'Tap » to continue.',
          routineText: 'Andi has a good hobby of book reading. Andi starts reading a book at 8:45 pm and finishes at 9:45 pm. For how long did Andi read the book?',
          quizPanel: {
            quizSubType: "QT2R",
            questionText: 'How can we find how long Andi read the book?',
            options: [

              {
                text: "Add the times",
                iscorrect: false,
                feedback: "Oops! Try again.",

              },
              {
                text: "Subtract the first time from second time.",
                iscorrect: true,
                feedback: "Well Done! That's correct!",

              },

            ],
          }
        },
        page19: {
          instructionText: "Tap using numpad to fill in the highlighted boxes and check.",
          instructionAfterQuiz: 'Tap » to continue.',
          routineText: 'Andi has a good hobby of book reading. Andi starts reading a book at 8:45 pm and finishes at 9:45 pm. For how long did Andi read the book?',
          numpadInstruction: 'Subtract 8:45 from 9:45 to find the duration of the activity.',
          feedback: {
            emptyFeedback:
              "Fill the highlighted box before checking",
            tile3: {
              correct: "Correct!",
              incorrect: "Not Correct! Try again!",
            },
            tile2: {
              correct: "Correct!",
              incorrect: "Not Correct! Try again!",
            },
            tile1: {
              correct:
                "That’s correct. Andi Starts at 8:45 pm. 1 hour later, he finishes reading his book at 9:45 pm.",
              incorrect:
                "That’s not correct. Let’s try subtracting the time again.",
            },
          },
        },
        page20: {
          andiStarts: 'Andi starts at 8:45 pm.',
          instructionText: "Tap » to continue.",
        },
        page21: {
          andiStarts: '1 hour later, Andi finishes reading his book at 9:45 pm.',
          instructionText: "Tap » to continue.",
          hour: '1 hour'
        },
        page22: {
          title: "Activity on Time",
          mainText: "Andi goes back to sleep at 10:00 pm. Creating a healthy daily routine like Andi keeps you grounded and can make you feel happy and strong."
        },
      },

    },
    id: {
      appInfo: {
        title: "Aktivitas Tepat Waktu",
      },

      quiz: {
        questions: [],
      },

      messages: {
        pageStatesCleared:
          "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
        pageNavNext: "Event navigasi halaman telah dikirim",
        previousButtonPage1: "Event navigasi halaman telah dikirim",
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
        check: "PERIKSA",
      },

      numberPad: {
        feedback: { empty: "Masukkan nilai terlebih dahulu" },
      },

      common: {
        heavy: "Berat",
        light: "Ringan",
        tapAlt: "Ketuk",
        andiCharacterAlt: "Andi",
        hours: "jam",
        minutes: "menit",
        clockPeripheralArc3to7Labels: {
          startLabel: "0",
          endLabel: "20",
          segmentLabels: [
            { hour: 4, text: "5" },
            { hour: 5, text: "10" },
            { hour: 6, text: "15" },
          ],
        },
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
          title: "Aktivitas Tepat Waktu",
          mainText:
            "Mari jelajahi rutinitas harian Andi<br/>menggunakan keterampilan kita tentang jam dan waktu.<br/><br/>Ketuk “Mulai” untuk memulai!",
        },
        page2: {
          instructionText: "Ketuk » untuk menjelajahi rutinitas harian Andi.",
          instructionAfterQuiz: "Ketuk » untuk mencoba waktu lain.",
          routineText:
            "Hai! Kenalan dengan Andi! <br/>Mari jelajahi rutinitas hariannya…",
        },
        page3: {
          instructionText: "Ketuk untuk memilih jawaban yang benar.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          routineText: "Andi bangun pagi-pagi sekali.",
          quizPanel: {
            quizSubType: "QT2R",
            questionText:
              "Berapa waktu yang ditunjukkan jam ketika Andi bangun?",
            options: [
              {
                text: "6:05 am",
                iscorrect: true,
                feedback: "Bagus! Itu benar!",
              },
              {
                text: "7:05 am",
                iscorrect: false,
                feedback: "Ups! Coba lagi.",
              },
            ],
          },
        },
        page4: {
          instructionText: "Ketuk untuk memilih jawaban yang benar.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          routineText:
            "Andi lalu melakukan pekerjaan rumah pagi mulai pukul 6:05 selama 45 menit berikutnya. Pada pukul berapa Andi selesai pekerjaan rumah paginya?",
          quizPanel: {
            quizSubType: "QT2R",
            questionText:
              "Bagaimana kita bisa menemukan waktu ketika Andi selesai bekerja?",
            options: [
              {
                text: "Tambahkan 45 menit ke<br/>6:05 am",
                iscorrect: true,
                feedback: "Bagus! Itu benar!",
              },
              {
                text: "Kurangkan 45 menit<br/>dari 6:05 am",
                iscorrect: false,
                feedback: "Ups! Coba lagi.",
              },
            ],
          },
        },
        page5: {
          instructionText:
            "Ketuk numpad untuk mengisi kotak yang disorot lalu periksa.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          routineText:
            "Andi lalu melakukan pekerjaan rumah pagi mulai pukul 6:05 selama 45 menit berikutnya. Pada pukul berapa Andi selesai pekerjaan rumah paginya?",
          numpadInstruction:
            "Tambahkan 45 menit ke 6:05 am untuk menemukan waktu Andi selesai pekerjaan rumah.",
          feedback: {
            emptyFeedback:
              "Isi kotak yang disorot sebelum memeriksa",
            tile3: {
              correct: "Benar!",
              incorrect: "Belum benar! Coba lagi!",
            },
            tile2: {
              correct: "Benar!",
              incorrect: "Belum benar! Coba lagi!",
            },
            tile1: {
              correct:
                "Benar. Andi mulai pukul 6:05 am. 45 menit kemudian, ia selesai pekerjaan rumah pagi pukul 6:50 am.",
              incorrect:
                "Belum benar. Mari kita coba menjumlahkan waktunya lagi.",
            },
          },
        },
        page6: {
          andiStarts: "Andi mulai pukul 6:05 am.",
          instructionText: "Ketuk » untuk melanjutkan.",
        },
        page7: {
          andiStarts:
            "45 menit kemudian, Andi selesai pekerjaan rumah pagi pukul 6:50 am.",
          instructionText: "Ketuk » untuk melanjutkan.",
          /** Dial arc 5→50 min; badges 0→45 = menit berlalu (angka sama EN/ID) */
          peripheralArcMinuteLabels: {
            startLabel: "0",
            endLabel: "45",
            segmentLabels: [
              { minute: 10, text: "5" },
              { minute: 15, text: "10" },
              { minute: 20, text: "15" },
              { minute: 25, text: "20" },
              { minute: 30, text: "25" },
              { minute: 35, text: "30" },
              { minute: 40, text: "35" },
              { minute: 45, text: "40" },
            ],
          },
        },
        page8: {
          instructionText: "Ketuk untuk memilih jawaban yang benar.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          routineText:
            "Andi berangkat ke kantor pukul 8:15 am. Ia membutuhkan 20 menit untuk sampai. Pada pukul berapa ia tiba di kantor?",
          quizPanel: {
            quizSubType: "QT2R",
            questionText:
              "Bagaimana kita bisa menemukan waktu ketika Andi tiba di kantor?",
            options: [
              {
                text: "Tambahkan 20 menit ke 8:15 am",
                iscorrect: true,
                feedback: "Bagus! Itu benar!",
              },
              {
                text: "Kurangkan 20 menit dari 8:15 am",
                iscorrect: false,
                feedback: "Ups! Coba lagi.",
              },
            ],
          },
        },
        page9: {
          instructionText:
            "Ketuk numpad untuk mengisi kotak yang disorot lalu periksa.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          routineText:
            "Andi berangkat ke kantor pukul 8:15 am. Ia membutuhkan 20 menit untuk sampai. Pada pukul berapa ia tiba di kantor?",
          numpadInstruction:
            "Tambahkan 20 menit ke 8:15 am untuk menemukan waktu Andi tiba di kantor.",
          feedback: {
            emptyFeedback:
              "Isi kotak yang disorot sebelum memeriksa",
            tile3: {
              correct: "Benar!",
              incorrect: "Belum benar! Coba lagi!",
            },
            tile2: {
              correct: "Benar!",
              incorrect: "Belum benar! Coba lagi!",
            },
            tile1: {
              correct:
                "Benar. Andi mulai pukul 8:15 am. 20 menit kemudian, ia tiba di kantor pukul 8:35 am.",
              incorrect:
                "Belum benar. Mari kita coba menjumlahkan waktunya lagi.",
            },
          },
        },
        page10: {
          andiStarts: "Andi mulai pukul 8:15 am.",
          instructionText: "Ketuk » untuk melanjutkan.",
        },
        page11: {
          andiStarts:
            "20 menit kemudian, Andi tiba di kantor pukul 8:35 am.",
          instructionText: "Ketuk » untuk melanjutkan.",
        },
        page12: {
          instructionText: "Ketuk untuk memilih jawaban yang benar.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          routineText:
            "Andi mulai pekerjaan kantor pukul 10:13 am dan menyelesaikannya pukul 11:39 am. Berapa lama Andi menyelesaikan pekerjaan itu?",
          quizPanel: {
            quizSubType: "QT2R",
            questionText:
              "Bagaimana kamu akan menemukan lama waktu yang Andi butuhkan untuk menyelesaikan pekerjaan kantornya?",
            options: [
              {
                text: "Jumlahkan kedua waktu",
                iscorrect: false,
                feedback: "Ups! Coba lagi.",
              },
              {
                text: "Kurangkan waktu pertama dari waktu kedua.",
                iscorrect: true,
                feedback: "Bagus! Itu benar!",
              },
            ],
          },
        },
        page13: {
          instructionText:
            "Ketuk numpad untuk mengisi kotak yang disorot lalu periksa.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          routineText:
            "Andi mulai pekerjaan kantor pukul 10:13 am dan menyelesaikannya pukul 11:39 am. Berapa lama Andi menyelesaikan pekerjaan itu?",
          numpadInstruction:
            "Kurangkan 10:13 dari 11:39 untuk menemukan durasi aktivitas.",
          feedback: {
            emptyFeedback:
              "Isi kotak yang disorot sebelum memeriksa",
            tile4: {
              correct: "Benar!",
              incorrect: "Belum benar! Coba lagi!",
            },
            tile3: {
              correct: "Benar!",
              incorrect: "Belum benar! Coba lagi!",
            },
            tile2: {
              correct: "Benar!",
              incorrect: "Belum benar! Coba lagi!",
            },
            tile1: {
              correct:
                "Benar. Andi mulai pukul 10:13 am. 1 jam 26 menit kemudian, ia menyelesaikan pekerjaan kantor pukul 11:39 am.",
              incorrect:
                "Belum benar. Mari kita coba mengurangkan waktunya lagi.",
            },
          },
        },
        page14: {
          andiStarts: "Andi mulai pukul 10:13 am.",
          instructionText: "Ketuk » untuk melanjutkan.",
        },
        page15: {
          andiStarts:
            "1 jam 26 menit kemudian, Andi menyelesaikan pekerjaan kantornya pukul 11:39 am.",
          instructionText: "Ketuk » untuk melanjutkan.",
          hour: "1 jam",
        },
        page16: {
          andiStarts:
            "1 jam 26 menit kemudian, Andi menyelesaikan pekerjaan kantornya pukul 11:39 am.",
          instructionText: "Ketuk » untuk melanjutkan.",
          hour: "1 jam",
          minutes: "26<br/>menit",
          and: "&",
          peripheralArcEndLabel: "26",
        },
        page17: {
          instructionText: "Ketuk untuk memilih jawaban yang benar.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          routineText:
            "Andi makan siang di siang hari. Waktu yang mungkin adalah berapa?",
          quizPanel: {
            quizSubType: "QT3R",
            questionText: "Manakah dari ini waktu makan siang?",
            options: [
              {
                text: "8:30 am",
                iscorrect: false,
                feedback: "Ups! Coba lagi.",
              },
              {
                text: "1:30 pm",
                iscorrect: true,
                feedback: "Bagus! Itu benar!",
              },
              {
                text: "7:35 pm",
                iscorrect: false,
                feedback: "Ups! Coba lagi.",
              },
            ],
          },
        },
        page18: {
          instructionText: "Ketuk untuk memilih jawaban yang benar.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          routineText:
            "Andi punya hobi membaca buku yang baik. Andi mulai membaca pukul 8:45 pm dan selesai pukul 9:45 pm. Berapa lama Andi membaca buku itu?",
          quizPanel: {
            quizSubType: "QT2R",
            questionText:
              "Bagaimana kita bisa menemukan berapa lama Andi membaca buku?",
            options: [
              {
                text: "Jumlahkan kedua waktu",
                iscorrect: false,
                feedback: "Ups! Coba lagi.",
              },
              {
                text: "Kurangkan waktu pertama dari waktu kedua.",
                iscorrect: true,
                feedback: "Bagus! Itu benar!",
              },
            ],
          },
        },
        page19: {
          instructionText:
            "Ketuk numpad untuk mengisi kotak yang disorot lalu periksa.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          routineText:
            "Andi punya hobi membaca buku yang baik. Andi mulai membaca pukul 8:45 pm dan selesai pukul 9:45 pm. Berapa lama Andi membaca buku itu?",
          numpadInstruction:
            "Kurangkan 8:45 dari 9:45 untuk menemukan durasi aktivitas.",
          feedback: {
            emptyFeedback:
              "Isi kotak yang disorot sebelum memeriksa",
            tile3: {
              correct: "Benar!",
              incorrect: "Belum benar! Coba lagi!",
            },
            tile2: {
              correct: "Benar!",
              incorrect: "Belum benar! Coba lagi!",
            },
            tile1: {
              correct:
                "Benar. Andi mulai pukul 8:45 pm. 1 jam kemudian, ia selesai membaca bukunya pukul 9:45 pm.",
              incorrect:
                "Belum benar. Mari kita coba mengurangkan waktunya lagi.",
            },
          },
        },
        page20: {
          andiStarts: "Andi mulai pukul 8:45 pm.",
          instructionText: "Ketuk » untuk melanjutkan.",
        },
        page21: {
          andiStarts:
            "1 jam kemudian, Andi selesai membaca bukunya pukul 9:45 pm.",
          instructionText: "Ketuk » untuk melanjutkan.",
          hour: "1 jam",
        },
        page22: {
          title: "Aktivitas Tepat Waktu",
          mainText:
            "Andi kembali tidur pukul 10:00 pm. Rutinitas harian yang sehat seperti Andi membantu kamu tetap tenang dan bisa membuatmu merasa bahagia dan kuat.",
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
