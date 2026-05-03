// data.js - Internationalization (en / id) for the Uncertain Situations applet
// All learner-facing copy lives here; layout lives in PageConfig.js

const highlightColor1 = "#FFD700";
const highlightColor2 = "#70ACC7";
const highlightColor3 = "#EF6AA9";
const highlightColor4 = "#00FF7F";
const highlightColor5 = "#8A2BE2";

const questionTextSize = "36gc";
const highlightTextSize = "28gc";

const AppData = {
  // Current language setting
  currentLanguage: "en",

  // Text content by language
  translations: {
    en: {
      appInfo: {
        title: "Uncertain Situations",
      },
      messages: {
        pageStatesCleared:
          "Page states have been cleared. Reload the page to start fresh?",
        nextButtonPage2: "Dispatched page change event to page 2",
        previousButtonPage1: "Dispatched page change event to page 1",
        navigationReset: "Resetting to question 1",
        navigationComplete:
          "Complete app reset completed - ready for new question",
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        start: "Start",
        continue: "Continue",
      },

      common: {
        equationButtonText: "Total wingko parts",
        questionText:
          "Dania has 6 boxes of milk, 12 lollipops, and 24 packets of biscuits. She wants to make the identical parcels so that each parcel has the same number of each item and no items are left over. What is the maximum number of parcels she can make?",
        questionIcon: "Q",
        labels: {
          dropHere: "Drop here",
          tapGifAlt: "Tap",
        },
        symbols: {
          checkMark: "✔",
          questionMark: "?",
          crossMark: "×",
        },
        sunriseText: "Sunrise tomorrow",
        fullAttandanceText: "Full attendance tomorrow",
        classWithKomodoText: "Class with Komodo dragon",
        yes: "Yes",
        no: "No",
        maybe: "Maybe",
        willAlwaysHappen: "Will always happen",
        mayOrMayNotHappen: "May or may not happen",
        canNeverHappen: "Can never happen",
        certainEvents: "Certain Events",
        uncertainEvents: "Uncertain Events",
        impossibleEvents: "Impossible Events",
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
        amountBeniGiveToGrandMother: "Amount Beni gave\n to his grandfather.",
        amountOfBika: "Amount of Bika\n Ambon left with Beni",
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
          highlights: [],
          title: "Uncertain Situations",
          mainText:
            "Everyday, we make guesses about what will happen.<br/><br/>Some things <span style='color:#FFD700'>always happen</span>.<br/>Some things <span style='color:#FFD700'>never happen</span>.<br/>Some things <span style='color:#FFD700'>might happen, or might not happen.</span><br/><br/>Tap ‘Start’ to begin.",
          footerInstruction: "Tap » to identify 'given' information",
        },
        page2: {
          headerText: "Read the question and identify 'given' and 'to find'",
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to continue.",
          questionText: "Will the Sun <br/>rise tomorrow?",
          quizPanel: {
            quizSubType: "QT3",
            questionText: "",
            options: [
              {
                text: "Yes",
                iscorrect: true,
                feedback:
                  "Yes!\nThe Sun rises every day, so it will rise tomorrow.",
              },
              {
                text: "No",
                iscorrect: false,
                feedback: "Not correct. The Sun rises every day.",
              },
              {
                text: "Maybe",
                iscorrect: false,
                feedback:
                  "No, this is not a ‘maybe’ situation! The Sun rises every day, so it will rise tomorrow.",
              },
            ],
          },
        },
        page3: {
          headerText: "Read the question and identify 'given' and 'to find'",
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to continue.",
          questionText:
            "On a normal school day, will all students in your class come to school?",
          quizPanel: {
            quizSubType: "QT3",
            questionText: "",
            options: [
              {
                text: "Yes",
                iscorrect: false,
                feedback:
                  "Not always. Some students may be absent because of illness, travel, or other reasons.",
              },
              {
                text: "No",
                iscorrect: false,
                feedback:
                  "Not exactly. Sometimes all students do come to school!",
              },
              {
                text: "Maybe",
                iscorrect: true,
                feedback: "Correct. It could happen, but we can’t be sure.",
              },
            ],
          },
        },
        page4: {
          headerText: "Read the question and identify 'given' and 'to find'",
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to continue.",
          questionText: "Can a Komodo dragon study<br/> with us in our school?",
          quizPanel: {
            quizSubType: "QT3",
            questionText: "",
            options: [
              {
                text: "Yes",
                iscorrect: false,
                feedback:
                  "This cannot happen. Komodo dragons are wild animals. They cannot be in a class.",
              },
              {
                text: "No",
                iscorrect: true,
                feedback:
                  "You are right. Komodo dragons are wild animals. They cannot be in a class.",
              },
              {
                text: "Maybe",
                iscorrect: false,
                feedback:
                  "This cannot happen. Komodo dragons are wild animals. They cannot be in a class.",
              },
            ],
          },
        },
        page5: {
          headerText: "3 Types of Situations",
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to continue.",
          questionText: "Can a Komodo dragon study<br/> with us in our school?",
        },
        page6: {
          headerText:
            "In Maths, we call these situations – <span style='color:#FFD700'>events</span>",
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to continue.",
          questionText: "Can a Komodo dragon study<br/> with us in our school?",
        },
        page7: {
          headerText:
            "In Maths, we call these situations – <span style='color:#FFD700'>events</span>",
          footerInstruction: "Drag the card to correct bucket.",
          instructionAfterQuiz: "Tap » for the next card.",
          questionText: "Rain at school tomorrow",
          fillBlanks: {
            instructionText:
              "Drag the correct side to the matching statement in the table",
            options: [
              {
                id: "opt1",
                image: "assets/rainyDay.png",
                blankID: [
                  { bid: "blank3", image: "assets/rainyDay.png" },
                  { bid: "blank4", image: "assets/rainyDay.png" },
                ],
                feedbackText:
                  "Correct!<br/>It is <span style='color:#FFD700'>possible</span> that it may rain tomorrow but we <span style='color:#FFD700'>cannot be sure</span>.</span>",
                incorrectFeedback: "Incorrect!<br/> This is not correct event.",
              },
            ],
            impFormulae: [],
          },
          conceptSummary: {
            completionText:
              "You matched uncertain weather with the correct kind of event.",
          },
        },
        page8: {
          headerText:
            "In Maths, we call these situations – <span style='color:#FFD700'>events</span>",
          footerInstruction: "Drag the card to correct bucket.",
          instructionAfterQuiz: "Tap » for the next card.",
          questionText:
            "Football bouncing after getting dropped on<br/> ground",
          fillBlanks: {
            instructionText:
              "Drag the correct side to the matching statement in the table",
            options: [
              {
                id: "opt1",
                image: "assets/footballBouncing.png",
                blankID: [
                  { bid: "blank1", image: "assets/footballBouncing.png" },
                  { bid: "blank2", image: "assets/footballBouncing.png" },
                ],
                feedbackText:
                  "Correct!<br/>A football will <span style='color:#FFD700'>always</span> bounce when dropped on ground – it is a certain <span style='color:#FFD700'>event</span>.</span>",
                incorrectFeedback: "Incorrect!<br/> This is not correct event.",
              },
            ],
            impFormulae: [],
          },
        },
        page9: {
          headerText:
            "In Maths, we call these situations – <span style='color:#FFD700'>events</span>",
          footerInstruction: "Drag the card to correct bucket.",
          instructionAfterQuiz: "Tap » for the next card.",
          questionText: "Getting 6 on <br/>rolling a dice",
          fillBlanks: {
            instructionText:
              "Drag the correct side to the matching statement in the table",
            options: [
              {
                id: "opt1",
                image: "assets/dice.png",
                blankID: [{ bid: "blank4", image: "assets/dice.png" }],
                feedbackText:
                  "Correct!<br/>It is <span style='color:#FFD700'>possible</span> to get a 6 after rolling a dice but we <span style='color:#FFD700'>cannot be sure</span>.",
                incorrectFeedback: "Incorrect!<br/> This is not correct event.",
              },
            ],
            impFormulae: [],
          },
        },
        page10: {
          headerText:
            "In Maths, we call these situations – <span style='color:#FFD700'>events</span>",
          footerInstruction: "Drag the card to correct bucket.",
          instructionAfterQuiz: "Tap » for the next card.",
          questionText: "Getting a test with <br/>no questions",
          fillBlanks: {
            instructionText:
              "Drag the correct side to the matching statement in the table",
            options: [
              {
                id: "opt1",
                image: "assets/noQuestions.png",
                blankID: [
                  { bid: "blank5", image: "assets/noQuestions.png" },
                  { bid: "blank6", image: "assets/noQuestions.png" },
                ],
                feedbackText:
                  "That’s right!<br/>Getting a test with no questions can <span style='color:#FFD700'>never </span> happen - it is an <span style='color:#FFD700'>impossible </span>event.",
                incorrectFeedback: "Incorrect!<br/> This is not correct event.",
              },
            ],
            impFormulae: [],
          },
        },
        page11: {
          headerText:
            "In Maths, we call these situations – <span style='color:#FFD700'>events</span>",
          footerInstruction: "Drag the card to correct bucket.",
          instructionAfterQuiz: "Tap » for the next card.",
          questionText: "Ice melting on heating it",
          fillBlanks: {
            instructionText:
              "Drag the correct side to the matching statement in the table",
            options: [
              {
                id: "opt1",
                image: "assets/iceMelting.png",
                blankID: [{ bid: "blank2", image: "assets/iceMelting.png" }],
                feedbackText:
                  "That’s right!<br/>Ice will <span style='color:#FFD700'>always</span> melt on heating – it is a <span style='color:#FFD700'>certain</span> event.",
                incorrectFeedback: "Incorrect!<br/> This is not correct event.",
              },
            ],
            impFormulae: [],
          },
        },
        page12: {
          headerText:
            "In Maths, we call these situations – <span style='color:#FFD700'>events</span>",
          footerInstruction: "Drag the card to correct bucket.",
          instructionAfterQuiz: "Tap » to summarize.",
          questionText: "Pencil becoming longer<br/> on sharpening",
          fillBlanks: {
            instructionText:
              "Drag the correct side to the matching statement in the table",
            options: [
              {
                id: "opt1",
                image: "assets/pencilLonger.png",
                blankID: [{ bid: "blank6", image: "assets/pencilLonger.png" }],
                feedbackText:
                  "That’s right!<br/>Length of a pencil can   <span style='color:#FFD700'>never </span> increase after sharpening it - it is an <span style='color:#FFD700'>impossible</span> event.",
                incorrectFeedback: "Incorrect!<br/> This is not correct event.",
              },
            ],
            impFormulae: [],
          },
        },
        page13: {
          headerText: "Types of Events",
          footerInstruction: "Tap 'Start Over' to repeat this activity.",

          questionText: "Can a Komodo dragon study<br/> with us in our school?",
        },
      },
    },
    id: {
      appInfo: {
        title: "Situasi Tak Pasti",
      },

      messages: {
        pageStatesCleared:
          "Status halaman sudah dihapus. Muat ulang halaman untuk mulai dari awal?",
        nextButtonPage2: "Peristiwa pindah halaman telah dikirim ke halaman 2",
        previousButtonPage1:
          "Peristiwa pindah halaman telah dikirim ke halaman 1",
        navigationReset: "Mengatur ulang ke pertanyaan 1",
        navigationComplete:
          "Reset aplikasi selesai — siap untuk pertanyaan baru",
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Lagi",
        start: "Mulai",
        continue: "Lanjutkan",
      },

      common: {
        equationButtonText: "Total bagian wingko",
        questionText:
          "Dania memiliki 6 kotak susu, 12 permen karet, dan 24 bungkus biskuit. Ia ingin membuat parsel yang identik sehingga setiap parsel memiliki jumlah tiap barang yang sama dan tidak ada sisa. Berapa banyak parsel maksimum yang bisa dibuat?",
        questionIcon: "T",
        labels: {
          dropHere: "Taruh di sini",
          tapGifAlt: "Ketuk",
        },
        symbols: {
          checkMark: "✔",
          questionMark: "?",
          crossMark: "X",
        },
        sunriseText: "Matahari terbit besok",
        fullAttandanceText: "Hadir penuh besok",
        classWithKomodoText: "Kelas dengan komodo",
        yes: "Ya",
        no: "Tidak",
        maybe: "Mungkin",
        willAlwaysHappen: "Selalu terjadi",
        mayOrMayNotHappen: "Mungkin terjadi atau mungkin tidak",
        canNeverHappen: "Tidak pernah terjadi",
        certainEvents: "Peristiwa Pasti",
        uncertainEvents: "Peristiwa Tak Pasti",
        impossibleEvents: "Peristiwa Mustahil",
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
          keyConcepts: "Konsep Kunci",
          importantFormulae: "Perhitungan",
        },
        amountBeniGiveToGrandMother:
          "Jumlah yang Beni berikan\n kepada kakeknya.",
        amountOfBika: "Jumlah Bika\n Ambon yang tersisa pada Beni",
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
          keyConceptsTitle: "Konsep Kunci",
          importantFormulaeTitle: "Perhitungan",
        },
      },

      pages: {
        page1: {
          highlights: [],
          title: "Situasi Tak Pasti",
          mainText:
            "Setiap hari, kita menebak apa yang akan terjadi.<br/><br/>Ada hal yang <span style='color:#FFD700'>selalu terjadi</span>.<br/>Ada hal yang <span style='color:#FFD700'>tidak pernah terjadi</span>.<br/>Ada hal yang <span style='color:#FFD700'>mungkin terjadi, atau mungkin tidak terjadi.</span><br/><br/>Ketuk ‘Mulai’ untuk memulai.",
          footerInstruction:
            "Tekan » untuk mengidentifikasi informasi 'diketahui'",
        },
        page2: {
          headerText:
            "Baca pertanyaan dan identifikasi 'diketahui' serta 'yang dicari'",
          footerInstruction: "Ketuk opsi yang benar.",
          instructionAfterQuiz: "Tekan » untuk melanjutkan.",
          questionText: "Apakah Matahari akan <br/>terbit besok?",
          quizPanel: {
            quizSubType: "QT3",
            questionText: "",
            options: [
              {
                text: "Ya",
                iscorrect: true,
                feedback:
                  "Ya!\nMatahari terbit setiap hari, jadi besok pun akan terbit.",
              },
              {
                text: "Tidak",
                iscorrect: false,
                feedback: "Belum tepat. Matahari terbit setiap hari.",
              },
              {
                text: "Mungkin",
                iscorrect: false,
                feedback:
                  "Bukan situasi ‘mungkin’! Matahari terbit setiap hari, jadi besok pasti terbit.",
              },
            ],
          },
        },
        page3: {
          headerText:
            "Baca pertanyaan dan identifikasi 'diketahui' serta 'yang dicari'",
          footerInstruction: "Ketuk opsi yang benar.",
          instructionAfterQuiz: "Tekan » untuk melanjutkan.",
          questionText:
            "Pada hari sekolah biasa, apakah semua siswa di kelasmu akan hadir?",
          quizPanel: {
            quizSubType: "QT3",
            questionText: "",
            options: [
              {
                text: "Ya",
                iscorrect: false,
                feedback:
                  "Tidak selalu. Beberapa siswa bisa tidak hadir karena sakit, perjalanan, atau alasan lain.",
              },
              {
                text: "Tidak",
                iscorrect: false,
                feedback: "Kurang tepat. Terkadang semua siswa memang hadir!",
              },
              {
                text: "Mungkin",
                iscorrect: true,
                feedback:
                  "Benar. Bisa saja terjadi, tetapi kita tidak bisa memastikan.",
              },
            ],
          },
        },
        page4: {
          headerText:
            "Baca pertanyaan dan identifikasi 'diketahui' serta 'yang dicari'",
          footerInstruction: "Ketuk opsi yang benar.",
          instructionAfterQuiz: "Tekan » untuk melanjutkan.",
          questionText:
            "Bisakah seekor komodo belajar<br/> bersama kita di sekolah?",
          quizPanel: {
            quizSubType: "QT3",
            questionText: "",
            options: [
              {
                text: "Ya",
                iscorrect: false,
                feedback:
                  "Ini tidak mungkin. Komodo adalah satwa liar. Mereka tidak bisa berada di kelas.",
              },
              {
                text: "Tidak",
                iscorrect: true,
                feedback:
                  "Kamu benar. Komodo adalah satwa liar. Mereka tidak bisa berada di kelas.",
              },
              {
                text: "Mungkin",
                iscorrect: false,
                feedback:
                  "Ini tidak mungkin. Komodo adalah satwa liar. Mereka tidak bisa berada di kelas.",
              },
            ],
          },
        },
        page5: {
          headerText: "3 Jenis Situasi",
          footerInstruction: "Ketuk opsi yang benar.",
          instructionAfterQuiz: "Tekan » untuk melanjutkan.",
          questionText:
            "Bisakah seekor komodo belajar<br/> bersama kita di sekolah?",
        },
        page6: {
          headerText:
            "Dalam Matematika, kita menyebut situasi ini – <span style='color:#FFD700'>peristiwa</span>",
          footerInstruction: "Ketuk opsi yang benar.",
          instructionAfterQuiz: "Tekan » untuk melanjutkan.",
          questionText:
            "Bisakah seekor komodo belajar<br/> bersama kita di sekolah?",
        },
        page7: {
          headerText:
            "Dalam Matematika, kita menyebut situasi ini – <span style='color:#FFD700'>peristiwa</span>",
          footerInstruction: "Seret kartu ke kolom yang tepat.",
          instructionAfterQuiz: "Tekan » untuk kartu berikutnya.",
          questionText: "Hujan di sekolah besok",
          fillBlanks: {
            instructionText:
              "Seret sisi yang benar ke pernyataan yang cocok pada tabel",
            options: [
              {
                id: "opt1",
                image: "assets/rainyDay.png",
                blankID: [
                  { bid: "blank3", image: "assets/rainyDay.png" },
                  { bid: "blank4", image: "assets/rainyDay.png" },
                ],
                feedbackText:
                  "Benar!<br/>Besok <span style='color:#FFD700'>mungkin</span> hujan di sekolah tetapi kita <span style='color:#FFD700'>tidak bisa memastikan</span>.</span>",
                incorrectFeedback:
                  "Belum tepat!<br/> Ini bukan peristiwa yang cocok.",
              },
            ],
            impFormulae: [],
          },
          conceptSummary: {
            completionText:
              "Kamu mencocokkan cuaca yang tak pasti dengan jenis peristiwa yang benar.",
          },
        },
        page8: {
          headerText:
            "Dalam Matematika, kita menyebut situasi ini – <span style='color:#FFD700'>peristiwa</span>",
          footerInstruction: "Seret kartu ke kolom yang tepat.",
          instructionAfterQuiz: "Tekan » untuk kartu berikutnya.",
          questionText: "Bola memantul setelah dijatuhkan ke<br/> tanah",
          fillBlanks: {
            instructionText:
              "Seret sisi yang benar ke pernyataan yang cocok pada tabel",
            options: [
              {
                id: "opt1",
                image: "assets/footballBouncing.png",
                blankID: [
                  { bid: "blank1", image: "assets/footballBouncing.png" },
                  { bid: "blank2", image: "assets/footballBouncing.png" },
                ],
                feedbackText:
                  "Benar!<br/>Bola akan <span style='color:#FFD700'>selalu</span> memantul ketika dijatuhkan ke tanah – ini adalah peristiwa <span style='color:#FFD700'>pasti</span>.</span>",
                incorrectFeedback:
                  "Belum tepat!<br/> Ini bukan peristiwa yang cocok.",
              },
            ],
            impFormulae: [],
          },
        },
        page9: {
          headerText:
            "Dalam Matematika, kita menyebut situasi ini – <span style='color:#FFD700'>peristiwa</span>",
          footerInstruction: "Seret kartu ke kolom yang tepat.",
          instructionAfterQuiz: "Tekan » untuk kartu berikutnya.",
          questionText: "Mendapat angka 6 pada<br/>lempar dadu",
          fillBlanks: {
            instructionText:
              "Seret sisi yang benar ke pernyataan yang cocok pada tabel",
            options: [
              {
                id: "opt1",
                image: "assets/dice.png",
                blankID: [{ bid: "blank4", image: "assets/dice.png" }],
                feedbackText:
                  "Benar!<br/><span style='color:#FFD700'>Mungkin</span> mendapat 6 setelah melempar dadu tetapi kita <span style='color:#FFD700'>tidak bisa memastikan</span>.",
                incorrectFeedback:
                  "Belum tepat!<br/> Ini bukan peristiwa yang cocok.",
              },
            ],
            impFormulae: [],
          },
        },
        page10: {
          headerText:
            "Dalam Matematika, kita menyebut situasi ini – <span style='color:#FFD700'>peristiwa</span>",
          footerInstruction: "Seret kartu ke kolom yang tepat.",
          instructionAfterQuiz: "Tekan » untuk kartu berikutnya.",
          questionText: "Mendapat ulangan tanpa<br/>soal",
          fillBlanks: {
            instructionText:
              "Seret sisi yang benar ke pernyataan yang cocok pada tabel",
            options: [
              {
                id: "opt1",
                image: "assets/noQuestions.png",
                blankID: [
                  { bid: "blank5", image: "assets/noQuestions.png" },
                  { bid: "blank6", image: "assets/noQuestions.png" },
                ],
                feedbackText:
                  "Benar!<br/>Mendapat ulangan tanpa soal <span style='color:#FFD700'>tidak pernah</span> bisa terjadi – ini adalah peristiwa <span style='color:#FFD700'>mustahil</span>.",
                incorrectFeedback:
                  "Belum tepat!<br/> Ini bukan peristiwa yang cocok.",
              },
            ],
            impFormulae: [],
          },
        },
        page11: {
          headerText:
            "Dalam Matematika, kita menyebut situasi ini – <span style='color:#FFD700'>peristiwa</span>",
          footerInstruction: "Seret kartu ke kolom yang tepat.",
          instructionAfterQuiz: "Tekan » untuk kartu berikutnya.",
          questionText: "Es mencair ketika dipanaskan",
          fillBlanks: {
            instructionText:
              "Seret sisi yang benar ke pernyataan yang cocok pada tabel",
            options: [
              {
                id: "opt1",
                image: "assets/iceMelting.png",
                blankID: [{ bid: "blank2", image: "assets/iceMelting.png" }],
                feedbackText:
                  "Benar!<br/>Es akan <span style='color:#FFD700'>selalu</span> mencair jika dipanaskan – ini adalah peristiwa <span style='color:#FFD700'>pasti</span>.",
                incorrectFeedback:
                  "Belum tepat!<br/> Ini bukan peristiwa yang cocok.",
              },
            ],
            impFormulae: [],
          },
        },
        page12: {
          headerText:
            "Dalam Matematika, kita menyebut situasi ini – <span style='color:#FFD700'>peristiwa</span>",
          footerInstruction: "Seret kartu ke kolom yang tepat.",
          instructionAfterQuiz: "Tekan » untuk kartu berikutnya.",
          questionText: "Pensil menjadi lebih panjang<br/> setelah diraut",
          fillBlanks: {
            instructionText:
              "Seret sisi yang benar ke pernyataan yang cocok pada tabel",
            options: [
              {
                id: "opt1",
                image: "assets/pencilLonger.png",
                blankID: [{ bid: "blank6", image: "assets/pencilLonger.png" }],
                feedbackText:
                  "Benar!<br/>Panjang pensil <span style='color:#FFD700'>tidak pernah</span> bertambah setelah diraut – ini adalah peristiwa <span style='color:#FFD700'>mustahil</span>.",
                incorrectFeedback:
                  "Belum tepat!<br/> Ini bukan peristiwa yang cocok.",
              },
            ],
            impFormulae: [],
          },
        },
        page13: {
          headerText: "Jenis-Jenis Peristiwa",
          footerInstruction: "Ketuk opsi yang benar.",
          instructionAfterQuiz: "Tekan » untuk melanjutkan.",
          questionText:
            "Bisakah seekor komodo belajar<br/> bersama kita di sekolah?",
        },
      },
    },
  },
};

// Indonesian ('id') translations are defined explicitly above.

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
