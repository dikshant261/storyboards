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
        title: "Reading Time",
      },


      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        start: "Start",
        continue: 'Continue',
      },

      messages: {
        pageStatesCleared: "Page states have been cleared. Reload the page to start from the beginning?",
        nextButtonPage2: "Page change event sent",
        previousButtonPage1: "Page change event sent",
        nextButtonpage3: "Page change event sent",
        nextButtonpage4: "Page change event sent",
        nextButtonpage5: "Page change event sent",
        nextButtonpage7: "Page change event sent",
        nextButtonpage8: "Page change event sent",
        nextButtonpage9: "Page change event sent",
        navigationReset: "Resetting to question 1",
        navigationComplete: "App reset complete – ready for new question",
        lastPageStartingOver: "Last page - Starting over",
        allStagesCompleted: "All stages completed!",
      },

      common: {
        heavy: "Heavy",
        light: "Light",
        tapAlt: "Tap",
        clockLabel: "Clock",
        longHand: "Long Hand",
        shortHand: "Short Hand",
        oclockPlaceholder: "___ <span style='color:aqua'>o'clock</span>",
        clockNumber12: "12",
        clockNumber9: "9",
        clockNumber7: "7",
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
          title: "Reading Time",
          mainText:
            "<span style='color:#fff'>Let’s summarise how to read the time when long hand is at </span><span style='color:aqua'>3</span><span style='color:#fff'>, </span><span style='color:aqua'>6</span><span style='color:#fff'> and </span><span style='color:aqua'>9</span><span style='color:#fff'>.</span><br/><br/><span style='color:#fff'>Tap “Start” to begin!</span>",
        },
        page2: {
          clockLabelHtml:
            "<span style='color:#E74C3C'>7</span><span style='color:aqua'> : 00 - \"</span><span style='color:#E74C3C'>7</span><span style='color:aqua'> o'clock\"</span>",
          clockLabelHtmlQuarterPast:
            "<span style='color:#E74C3C'>7</span><span style='color:#fff'> : </span><span style='color:#3498DB'>15</span><span style='color:#fff'> - \"</span><span style='color:#3498DB'>Quarter past </span><span style='color:#E74C3C'>7</span><span style='color:#fff'>\"</span>",
          clockLabelHtmlHalfPast:
            "<span style='color:#E74C3C'>7</span><span style='color:#fff'> : </span><span style='color:#3498DB'>30</span><span style='color:#fff'> - \"</span><span style='color:#3498DB'>Half past </span><span style='color:#E74C3C'>7</span><span style='color:#fff'>\"</span>",
          clockLabelHtmlQuarterTo:
            "<span style='color:#E74C3C'>7</span><span style='color:#fff'> : </span><span style='color:#3498DB'>45</span><span style='color:#fff'> - \"</span><span style='color:#3498DB'>Quarter to </span><span style='color:#E74C3C'>8</span><span style='color:#fff'>\"</span>",
          longHandLabel: "Long hand at 12.",
          longHandLabelAt3: "Long hand at 3.",
          longHandLabelAt6: "Long hand at 6.",
          longHandLabelAt9: "Long hand at 9.",
          shortHandLabel: "Short hand at 7.",
          shortHandLabelBetween7And8: "Short hand between 7 and 8.",
          shortHandLabelReaching8: "Short hand reaching 8.",
          talkBoxText:
            "What is this picture called?<br/><br/><span style='color:orange'>SHOUT OUT LOUD!</span>",
          instructionText: "Tap the number 3 to move the minute hand there",
          instructionTapNumber6: "Tap the number 6 to move the minute hand there",
          instructionTapNumber9: "Tap the number 9 to move the minute hand there",
          instructionTapToSummarise: "Tap » to summarise",
          instructionTapEachHand: "Tap each hand of the clock",
          instructionTapToContinue: "Tap » to continue",
          talkBoxClockIntro: "This CLOCK has two hands. Let's name them…",
          talkBoxShortHand: "This hand is <span style='color:gold'>shorter than</span> the other.<br><br>It is called the <span style='color:gold'>SHORT HAND</span>.",
          talkBoxLongHand: "This hand is <span style='color:aqua'>longer than</span> the other.<br><br>It is called the <span style='color:aqua'>LONG HAND</span>.",
        },
        page3: {
          talkBoxText: "What number is the <span style='color:#70ACC7'>LONG HAND</span> pointing at?<br/><br/><span style='color:orange'>SHOUT OUT LOUD!</span>",
          instructionText: "Tap the long hand",
          positionOf: "Position of the HANDS tell us the time.",
          instructionTapShortHand: "Tap the short hand",
          instructionTapToReset: "Tap » to reset the clock",
          timeOnClockReveal: "The TIME shown on the clock is<br><span style='color:gold'>9</span> <span style='color:aqua'>o'clock</span>",
          talkBoxWhen9Oclock: "When the <span style='color:gold'>short hand points at 9</span> and the <span style='color:aqua'>long hand points at 12</span>, the time is <span style='color:gold'>9</span> <span style='color:aqua'>o' clock</span>.",
          talkBoxLongHandAt12: "When the <span style='color:aqua'>LONG HAND points</span> at <span style='color:aqua'>12</span>, We say <span style='color:aqua'>o' clock</span><br>What number is the <span style='color:gold'>SHORT HAND</span> pointing at?<br><span style='color:orange'>SHOUT OUT LOUD!</span>",
        },
        page4: {
          talkBoxText: "What number is the <span style='color:#70ACC7'>LONG HAND</span> now pointing at?<br/><br/><span style='color:orange'>SHOUT OUT LOUD!</span>",
          instructionText: "Tap the long hand",
          timeOnClock: "TIME ON CLOCK?",
          instructionTapShortHand: "Tap the short hand",
          instructionTapClockReveal: "Tap the clock to reveal the time",
          instructionTapToReset: "Tap » to reset the clock",
          timeOnClockReveal7: "<span style='color:gold'>3</span> <span style='color:aqua'>o'clock</span>",
          talkBoxWhen7Oclock: "With <span style='color:gold'>short hand at 3</span> and <span style='color:aqua'>long hand at 12</span>, the time is <span style='color:gold'>3</span> <span style='color:aqua'>o' clock</span>",
          talkBoxWhatTime: "What time is shown on the clock?<br><br><span style='color:orange'>SHOUT OUT LOUD</span>",
          talkBoxWhatNumberShortHand: "What number is the <span style='color:gold'>SHORT HAND</span> pointing at?<br><br><span style='color:orange'>SHOUT OUT LOUD</span>",
        },
        page5: {
          talkBoxText: "What number is the <span style='color:#70ACC7'>LONG HAND</span> now pointing at?<br/><br/><span style='color:orange'>SHOUT OUT LOUD!</span>",
          instructionText: "Tap the long hand",
          timeOnClock: "TIME ON CLOCK?",
          instructionTapShortHand: "Tap the short hand",
          instructionTapClockReveal: "Tap the clock to reveal the time",
          instructionTapToReset: "Tap » to reset the clock",
          timeOnClockReveal7: "<span style='color:gold'>7</span> <span style='color:aqua'>o'clock</span>",
          talkBoxWhen7Oclock: "With <span style='color:gold'>short hand at 7</span> and <span style='color:aqua'>long hand at 12</span>, the time is <span style='color:gold'>7</span> <span style='color:aqua'>o' clock</span>",
          talkBoxWhatTime: "What time is shown on the clock?<br><br><span style='color:orange'>SHOUT OUT LOUD</span>",
          talkBoxWhatNumberShortHand: "What number is the <span style='color:gold'>SHORT HAND</span> pointing at?<br><br><span style='color:orange'>SHOUT OUT LOUD</span>",
        },
        page6: {
          title: "Reading Time",
          mainText:
            "We have learned to read time when the<span style='color:#70ACC7'> long hand is at 12</span><br/><br/>Now let's practice!",
          headerAfterQuiz: "Reading Time",
          instructionAfterQuiz: "Tap » to continue.",
        },
        page7: {
          talkBoxText: "What is the time shown on clock?",
          instructionText: "Tap the correct option.",
          instructionAfterQuiz: 'Tap » to move to the next question.',
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
        page8: {
          talkBoxText: "What is the time shown on clock?",
          instructionText: "Tap the correct option.",
          instructionAfterQuiz: 'Tap » to move to the next question.',
          timeOnClock: "TIME ON CLOCK?",
          quizPanel: {
            quizSubType: "QT3R",
            questionText: '',
            options: [
              {
                text: "6 o’clock",
                iscorrect: false,
                feedback: "Oops! Check the number the short hand is pointing to.",
              },
              {
                text: "2 o’clock",
                iscorrect: true,
                feedback: "Well done! That’s correct.",
              },
              {
                text: "12 o’clock",
                iscorrect: false,
                feedback: "Oops! Check the number the short hand is pointing to.",
              }

            ],
          }
        },
        page9: {
          talkBoxText: "What is the time shown on clock?",
          instructionText: "Tap the correct option.",
          instructionAfterQuiz: 'Tap » to "Start Over"',
          timeOnClock: "TIME ON CLOCK?",
          quizPanel: {
            quizSubType: "QT3R",
            questionText: '',
            options: [
              {
                text: "12 o’clock",
                iscorrect: false,
                feedback: "Oops! Check the number the short hand is pointing to.",
              },
              {
                text: "9 o’clock",
                iscorrect: false,
                feedback: "Oops! Check the number the short hand is pointing to.",
              },
              {
                text: "10 o’clock",
                iscorrect: true,
                feedback: "Well done! That’s correct.",
              }

            ],
          }
        },
        page10: {
          title: "Reading Time",
          mainText:
            "Awesome! Every movement of 3 numbers on the clock is a time of <span style='color:aqua'>15 minutes</span> or a <span style='color:aqua'>quarter-hour</span>!<br/><br/>Tap \"Start Over\" to re-do this activity!",
          instructionAfterQuiz: "Tap » to Start Over",
        },
        page11: {
          talkBoxText: "Yes! Of course,<br/> DeeTee.",
          instructionText: "Tap the button to see how Jax lifts it.",
          liftStone: "Lift Stone",
          liftPencil: "Lift Pencil",
          liftStoneText: "Uffff… so hard to lift!",
          liftPencilText: "Haaa… so easy to lift!",
          instructionAfterQuiz: "Tap » to compute the result.",
        },
        page12: {
          talkBoxText:
            "We say that the stone is a heavy object because it is hard to lift!",
          instructionText: "Tap » to summarise heavy and light objects.",
          instructionAfterQuiz: "Tap » to summarise",
        },
        page13: {
          talkBoxText:
            "Great job Jax! Now let me explain about heavy and light objects.",
          instructionText: "Tap » to start over.",
          heavyObjects: "Heavy Objects",
          lightObjects: "Light Objects",
          hardToLift: "<span style='color:#70ACC7'>Hard</span> to lift!",
          easyToLift: "<span style='color:#70ACC7'>Easy</span> to lift!",
          instructionAfterQuiz: "Tap » to summarise",
          feedbackTextbox: {
            text: "We concluded that heavy objects are hard to lift and light objects are easy to lift.",
          },
        },
        page14: {
          title: "Heavy and Light Objects",
          mainText:
            "Great! Now we know what<br/> <span style='color:#70ACC7'>heavy</span> and <span style='color:#70ACC7'>light</span> objects are.",
          instructionAfterQuiz: "Tap » to summarise",
        },
      },
    },
    id: {
      appInfo: {
        title: "Membaca Waktu",
      },

      messages: {
        pageStatesCleared:
          "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
        nextButtonPage2: "Event perpindahan halaman telah dikirim",
        previousButtonPage1: "Event perpindahan halaman telah dikirim",
        nextButtonpage3: "Event perpindahan halaman telah dikirim",
        nextButtonpage4: "Event perpindahan halaman telah dikirim",
        nextButtonpage5: "Event perpindahan halaman telah dikirim",
        nextButtonpage7: "Event perpindahan halaman telah dikirim",
        nextButtonpage8: "Event perpindahan halaman telah dikirim",
        nextButtonpage9: "Event perpindahan halaman telah dikirim",
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
        continue: "Lanjut",
      },

      common: {
        heavy: "Berat",
        light: "Ringan",
        tapAlt: "Ketuk",
        clockLabel: "Jam",
        longHand: "Jarum Panjang",
        shortHand: "Jarum Pendek",
        oclockPlaceholder: "___ <span style='color:aqua'>jam</span>",
        clockNumber12: "12",
        clockNumber9: "9",
        clockNumber7: "7",
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
          title: "Membaca Waktu",
          mainText:
            "<span style='color:#fff'>Mari kita ringkaskan cara membaca waktu ketika jarum panjang menunjuk </span><span style='color:aqua'>3</span><span style='color:#fff'>, </span><span style='color:aqua'>6</span><span style='color:#fff'> dan </span><span style='color:aqua'>9</span><span style='color:#fff'>.</span><br/><br/><span style='color:#fff'>Ketuk “Mulai” untuk memulai!</span>",
        },
        page2: {
          clockLabelHtml:
            "<span style='color:#E74C3C'>7</span><span style='color:aqua'> : 00 - \"</span><span style='color:#E74C3C'>7</span><span style='color:aqua'> jam\"</span>",
          clockLabelHtmlQuarterPast:
            "<span style='color:#E74C3C'>7</span><span style='color:#fff'> : </span><span style='color:#3498DB'>15</span><span style='color:#fff'> - \"</span><span style='color:#3498DB'>Seperempat lewat </span><span style='color:#E74C3C'>7</span><span style='color:#fff'>\"</span>",
          clockLabelHtmlHalfPast:
            "<span style='color:#E74C3C'>7</span><span style='color:#fff'> : </span><span style='color:#3498DB'>30</span><span style='color:#fff'> - \"</span><span style='color:#3498DB'>Setengah lewat </span><span style='color:#E74C3C'>7</span><span style='color:#fff'>\"</span>",
          clockLabelHtmlQuarterTo:
            "<span style='color:#E74C3C'>7</span><span style='color:#fff'> : </span><span style='color:#3498DB'>45</span><span style='color:#fff'> - \"</span><span style='color:#3498DB'>Seperempat menuju </span><span style='color:#E74C3C'>8</span><span style='color:#fff'>\"</span>",
          longHandLabel: "Jarum panjang di 12.",
          longHandLabelAt3: "Jarum panjang di 3.",
          longHandLabelAt6: "Jarum panjang di 6.",
          longHandLabelAt9: "Jarum panjang di 9.",
          shortHandLabel: "Jarum pendek di 7.",
          shortHandLabelBetween7And8: "Jarum pendek di antara 7 dan 8.",
          shortHandLabelReaching8: "Jarum pendek menuju 8.",
          talkBoxText:
            "Apa nama gambar ini?<br/><br/><span style='color:orange'>BERTERIAKLAH!</span>",
          instructionText: "Ketuk angka 3 untuk memindahkan jarum menit ke sana",
          instructionTapNumber6: "Ketuk angka 6 untuk memindahkan jarum menit ke sana",
          instructionTapNumber9: "Ketuk angka 9 untuk memindahkan jarum menit ke sana",
          instructionTapToSummarise: "Ketuk » untuk merangkum",
          instructionTapEachHand: "Ketuk masing-masing jarum jam",
          instructionTapToContinue: "Ketuk » untuk lanjut",
          talkBoxClockIntro: "JAM ini memiliki dua jarum. Mari kita sebut…",
          talkBoxShortHand: "Jarum ini <span style='color:gold'>lebih pendek</span> dari yang lain.<br><br>Ini disebut <span style='color:gold'>JARUM PENDEK</span>.",
          talkBoxLongHand: "Jarum ini <span style='color:aqua'>lebih panjang</span> dari yang lain.<br><br>Ini disebut <span style='color:aqua'>JARUM PANJANG</span>.",
        },
        page3: {
          talkBoxText: "Angka berapa yang ditunjuk <span style='color:#70ACC7'>JARUM PANJANG</span>?<br/><br/><span style='color:orange'>BERTERIAKLAH!</span>",
          instructionText: "Ketuk jarum panjang",
          positionOf: "Posisi JARUM menunjukkan waktu.",
          instructionTapShortHand: "Ketuk jarum pendek",
          instructionTapToReset: "Ketuk » untuk mengatur ulang jam",
          timeOnClockReveal: "WAKTU yang ditunjukkan jam adalah<br><span style='color:gold'>9</span> <span style='color:aqua'>jam</span>",
          talkBoxWhen9Oclock: "Saat <span style='color:gold'>jarum pendek menunjuk 9</span> dan <span style='color:aqua'>jarum panjang menunjuk 12</span>, waktunya <span style='color:gold'>9</span> <span style='color:aqua'>jam</span>.",
          talkBoxLongHandAt12: "Saat <span style='color:aqua'>JARUM PANJANG menunjuk</span> <span style='color:aqua'>12</span>, kita bilang <span style='color:aqua'>jam</span><br>Angka berapa yang ditunjuk <span style='color:gold'>JARUM PENDEK</span>?<br><span style='color:orange'>BERTERIAKLAH!</span>",
        },
        page4: {
          talkBoxText:
            "Angka berapa yang ditunjuk <span style='color:#70ACC7'>JARUM PANJANG</span>?<br/><br/><span style='color:orange'>BERTERIAKLAH!</span>",
          instructionText: "Ketuk jarum panjang",
          timeOnClock: "WAKTU DI JAM?",
          instructionTapShortHand: "Ketuk jarum pendek",
          instructionTapClockReveal: "Ketuk jam untuk menampilkan waktu",
          instructionTapToReset: "Ketuk » untuk mengatur ulang jam",
          timeOnClockReveal7: "<span style='color:gold'>3</span> <span style='color:aqua'>jam</span>",
          talkBoxWhen7Oclock: "Dengan <span style='color:gold'>jarum pendek di 3</span> dan <span style='color:aqua'>jarum panjang di 12</span>, waktunya <span style='color:gold'>3</span> <span style='color:aqua'>jam</span>",
          talkBoxWhatTime: "Pukul berapa yang ditunjukkan jam?<br><br><span style='color:orange'>BERTERIAKLAH</span>",
          talkBoxWhatNumberShortHand: "Angka berapa yang ditunjuk <span style='color:gold'>JARUM PENDEK</span>?<br><br><span style='color:orange'>BERTERIAKLAH</span>",
        },
        page5: {
          talkBoxText:
            "Angka berapa yang ditunjuk <span style='color:#70ACC7'>JARUM PANJANG</span>?<br/><br/><span style='color:orange'>BERTERIAKLAH!</span>",
          instructionText: "Ketuk jarum panjang",
          timeOnClock: "WAKTU DI JAM?",
          instructionTapShortHand: "Ketuk jarum pendek",
          instructionTapClockReveal: "Ketuk jam untuk menampilkan waktu",
          instructionTapToReset: "Ketuk » untuk mengatur ulang jam",
          timeOnClockReveal7: "<span style='color:gold'>7</span> <span style='color:aqua'>jam</span>",
          talkBoxWhen7Oclock: "Dengan <span style='color:gold'>jarum pendek di 7</span> dan <span style='color:aqua'>jarum panjang di 12</span>, waktunya <span style='color:gold'>7</span> <span style='color:aqua'>jam</span>",
          talkBoxWhatTime: "Pukul berapa yang ditunjukkan jam?<br><br><span style='color:orange'>BERTERIAKLAH</span>",
          talkBoxWhatNumberShortHand: "Angka berapa yang ditunjuk <span style='color:gold'>JARUM PENDEK</span>?<br><br><span style='color:orange'>BERTERIAKLAH</span>",
        },
        page6: {
          title: "Membaca Waktu",
          mainText:
            "Kita sudah belajar membaca waktu saat <span style='color:#70ACC7'>jarum panjang di 12</span><br/><br/>Sekarang ayo berlatih!",
          headerAfterQuiz: "Membaca Waktu",
          instructionAfterQuiz: "Ketuk » untuk lanjut.",
        },
        page7: {
          talkBoxText: "Pukul berapa yang ditunjukkan jam?",
          instructionText: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk lanjut ke pertanyaan berikutnya.",
          timeOnClock: "WAKTU DI JAM?",
          quizPanel: {
            quizSubType: "QT3R",
            questionText: '',
            options: [
              { text: "5 jam", iscorrect: true, feedback: "Bagus! Benar." },
              { text: "8 jam", iscorrect: false, feedback: "Cek angka yang ditunjuk jarum pendek." },
              { text: "12 jam", iscorrect: false, feedback: "Cek angka yang ditunjuk jarum pendek." },
            ],
          },
        },
        page8: {
          talkBoxText: "Pukul berapa yang ditunjukkan jam?",
          instructionText: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk lanjut ke pertanyaan berikutnya.",
          timeOnClock: "WAKTU DI JAM?",
          quizPanel: {
            quizSubType: "QT3R",
            questionText: '',
            options: [
              { text: "6 jam", iscorrect: false, feedback: "Cek angka yang ditunjuk jarum pendek." },
              { text: "2 jam", iscorrect: true, feedback: "Bagus! Benar." },
              { text: "12 jam", iscorrect: false, feedback: "Cek angka yang ditunjuk jarum pendek." },
            ],
          },
        },
        page9: {
          talkBoxText: "Pukul berapa yang ditunjukkan jam?",
          instructionText: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk Mulai Ulang",
          timeOnClock: "WAKTU DI JAM?",
          quizPanel: {
            quizSubType: "QT3R",
            questionText: '',
            options: [
              { text: "12 jam", iscorrect: false, feedback: "Cek angka yang ditunjuk jarum pendek." },
              { text: "9 jam", iscorrect: false, feedback: "Cek angka yang ditunjuk jarum pendek." },
              { text: "10 jam", iscorrect: true, feedback: "Bagus! Benar." },
            ],
          },
        },
        page10: {
          title: "Membaca Waktu",
          mainText:
            "Luar biasa! Setiap pergerakan 3 angka pada jam adalah waktu <span style='color:aqua'>15 menit</span> atau <span style='color:aqua'>seperempat jam</span>!<br/><br/>Ketuk \"Mulai Ulang\" untuk mengulang aktivitas ini!",
          instructionAfterQuiz: "Ketuk » untuk Mulai Ulang",
        },
        page11: {
          talkBoxText: "Ya! Tentu,<br/> DeeTee.",
          instructionText: "Ketuk tombol untuk melihat cara Jax mengangkatnya.",
          liftStone: "Angkat Batu",
          liftPencil: "Angkat Pensil",
          liftStoneText: "Uffff… sangat sulit mengangkatnya!",
          liftPencilText: "Haaa… mudah sekali mengangkatnya!",
          instructionAfterQuiz: "Ketuk » untuk menghitung hasil.",
        },
        page12: {
          talkBoxText:
            "Kita mengatakan bahwa batu adalah benda berat karena sulit diangkat!",
          instructionText: "Ketuk » untuk merangkum benda berat dan ringan.",
          instructionAfterQuiz: "Ketuk » untuk merangkum",
        },
        page13: {
          talkBoxText:
            "Kerja bagus Jax! Sekarang, mari aku jelaskan tentang benda berat dan ringan.",
          instructionText: "Ketuk » untuk memulai kembali.",
          heavyObjects: "Benda Berat",
          lightObjects: "Benda Ringan",
          hardToLift: "<span style='color:#70ACC7'>Sulit</span> diangkat!",
          easyToLift: "<span style='color:#70ACC7'>Mudah</span> diangkat!",
          instructionAfterQuiz: "Ketuk » untuk merangkum",
          feedbackTextbox: {
            text: "Kita menyimpulkan bahwa benda berat sulit diangkat dan benda ringan mudah diangkat.",
          },
        },
        page14: {
          title: "Benda Berat dan Ringan",
          mainText:
            "Hebat! Sekarang kita tahu apa itu<br/> benda <span style='color:#70ACC7'>berat</span> dan <span style='color:#70ACC7'>ringan</span>.",
          instructionAfterQuiz: "Ketuk » untuk merangkum",
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
