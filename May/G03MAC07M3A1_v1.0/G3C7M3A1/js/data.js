// data.js - Internationalization data for the Parts of the day learning applet
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
        title: "Parts of the day",
      },

      /**
       * Day-part labels and clock windows (24-hour times).
       * `malam` runs from 18:00 through to 05:00 the next morning (end hour is next day when comparing same calendar date).
       */
      timeDurations: [
        {
          name: "pagi",
          start: { hour: 5, minute: 0 },
          end: { hour: 10, minute: 59 },
          hours: [
            { timeLabel: "5:00", description: "At 5:00 pagi, the sky begins to get bright." },
            { timeLabel: "6:00", description: "We wake up at 6:00 pagi" },
            { timeLabel: "7:00", description: "We get ready for school at around 7:00 pagi" },
            { timeLabel: "8:00", description: "We have breakfast and go to school at around 8:00 pagi." },
            { timeLabel: "9:00", description: "We attend classes at school at around 9:00 pagi." },
            { timeLabel: "10:00", description: "We attend classes at school at around 10:00 pagi." },
          ],
        },
        {
          name: "siang",
          start: { hour: 11, minute: 0 },
          end: { hour: 14, minute: 59 },
          hours: [
            { timeLabel: "11:00", description: "We attend classes at school at around 9:00 pagi." },
            { timeLabel: "12:00", description: "We attend classes at school at around 9:00 pagi." },
            { timeLabel: "1:00", description: "We eat lunch at around 1:00 siang." },
            { timeLabel: "2:00", description: "We resume classes at 2:00 siang." },
          ],
        },
        {
          name: "sore",
          start: { hour: 15, minute: 0 },
          end: { hour: 17, minute: 59 },
          hours: [
            { timeLabel: "3:00", description: "School gets over at 3:00 sore." },
            { timeLabel: "4:00", description: "We eat evening snack at 4:00 sore" },
          ],
        },
        {
          name: "malam",
          start: { hour: 18, minute: 0 },
          end: { hour: 4, minute: 59 },
          hours: [

          ],
        },
      ],

      messages: {
        pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?",
        nextButtonPage2: "Page change event sent",
        nextButtonpage3: "Next",
        nextButtonpage4: "Next",
        nextButtonpage5: "Next",
        nextButtonpage7: "Next",
        nextButtonpage8: "Next",
        nextButtonpage9: "Next",
        nextButtonpage10: "Next",
        previousButtonPage1: "Previous button clicked",
        navigationReset: "Resetting to question 1",
        navigationComplete: "App reset complete – ready for new question",
        lastPageStartingOver: "Last page - Starting over",
        allStagesCompleted: "All stages completed!",
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        start: "Start",
        continue: 'Continue',
        check: 'Check',
        replay: "Replay",
      },

      common: {
        heavy: "Heavy",
        light: "Light",
        tapAlt: "Tap",
        questionText:
          "Practice reading and setting the time on an analog clock. Follow each step and tap the controls when you are asked.",
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
          title: "Parts of the day",
          mainText:
            "Let’s learn what different parts of the day are called.<br/><br/>Tap “Start” to begin!",
        },
        page2: {
          talkBoxText:
            "We write “pagi” after the time if it is after 5:00 and before 11:00 in the morning.",
          instructionText: "Tap on the number on clock to show the time.",
          timeOnClock: "TIME ON CLOCK?",
          timeOnClockDisplay: "<span style='color:#FFD700'>{hour}</span><span class='page2-oclock-clickable' style='color:#00FFFF;cursor:pointer'> o'clock</span>",
          timeOnClockDisplayHourClickable: "<span class='page2-hour-clickable' style='color:#FFD700;cursor:pointer'>{hour}</span><span style='color:#00FFFF'> o'clock</span>",
          timeOnClockDisplayFinal: "<span style='color:#FFD700'>{hour}</span><span style='color:#00FFFF'> o'clock</span>",
          talkBoxAfterClockClick: "Why is it {hour} 'o clock?<br><br><span style='color:#FFD700'>Let's see!</span>",
          talkBoxAfterOclockClick: "When the <span style='color:#00FFFF'>long hand at 12</span>, we say <span style='color:#00FFFF'>o'clock</span>.",
          instructionAfterClockClick: "Tap \"o'clock\"",
          instructionAfterOclockClick: "Tap \"{hour}\"",
          instructionAfterHourClick: "Tap » for something interesting…",
          instructionAfterAnimationsComplete: "Tap » to explore related activities.",
          talkBoxAfterHourClick: "With <span style='color:#00FFFF'>long hand at 12</span> and <span style='color:#FFD700'>short hand at {hour}</span>, the time is <span style='color:#FFD700'>{hour}</span> <span style='color:#00FFFF'>o'clock</span>."
        },
        page3: {
          talkBoxText:
            "Let's see what activities we do in this part of the day. Tap the numbers in the highlighted part to explore the activity.",
          talkBoxAfterAnyLabelClick:
            "Shout out loud some activities you do at {hour} {timeDuration}.",
          instructionText: "Tap on the number on clock to explore the activity.",
          instructionAfterAnyLabelClick:
            "Tap on the number to continue or Tap » to explore next part of the day.",
          instructionAfterAllLabelsClick: "Tap » to explore next part of the day.",
          timeOnClock: "TIME ON CLOCK?",
          timeOnClockDisplay: "<span style='color:#FFD700'>{hour}</span><span class='page2-oclock-clickable' style='color:#00FFFF;cursor:pointer'> o'clock</span>",
          timeOnClockDisplayHourClickable: "<span class='page2-hour-clickable' style='color:#FFD700;cursor:pointer'>{hour}</span><span style='color:#00FFFF'> o'clock</span>",
          timeOnClockDisplayFinal: "<span style='color:#FFD700'>{hour}</span><span style='color:#00FFFF'> o'clock</span>",
          talkBoxAfterClockClick: "Why is it {hour} 'o clock?<br><br><span style='color:#FFD700'>Let's see!</span>",
          talkBoxAfterOclockClick: "When the <span style='color:#00FFFF'>long hand at 12</span>, we say <span style='color:#00FFFF'>o'clock</span>.",
          instructionAfterClockClick: "Tap \"o'clock\"",
          instructionAfterOclockClick: "Tap \"{hour}\"",
          instructionAfterHourClick: "Tap » for something interesting…",
          instructionAfterAnimationsComplete: "Tap » to explore related activities.",
          talkBoxAfterHourClick: "With <span style='color:#00FFFF'>long hand at 12</span> and <span style='color:#FFD700'>short hand at {hour}</span>, the time is <span style='color:#FFD700'>{hour}</span> <span style='color:#00FFFF'>o'clock</span>."
        },
        page4: {
          talkBoxText:
            "We write “siang” after the time if it is after 10:00 and before 3:00 in the afternoon.",
          instructionText: "Tap on the number on clock to show the time.",
          timeOnClock: "TIME ON CLOCK?",
          timeOnClockDisplay: "<span style='color:#FFD700'>{hour}</span><span class='page2-oclock-clickable' style='color:#00FFFF;cursor:pointer'> o'clock</span>",
          timeOnClockDisplayHourClickable: "<span class='page2-hour-clickable' style='color:#FFD700;cursor:pointer'>{hour}</span><span style='color:#00FFFF'> o'clock</span>",
          timeOnClockDisplayFinal: "<span style='color:#FFD700'>{hour}</span><span style='color:#00FFFF'> o'clock</span>",
          talkBoxAfterClockClick: "Why is it {hour} 'o clock?<br><br><span style='color:#FFD700'>Let's see!</span>",
          talkBoxAfterOclockClick: "When the <span style='color:#00FFFF'>long hand at 12</span>, we say <span style='color:#00FFFF'>o'clock</span>.",
          instructionAfterClockClick: "Tap \"o'clock\"",
          instructionAfterOclockClick: "Tap \"{hour}\"",
          instructionAfterHourClick: "Tap » for something interesting…",
          instructionAfterAnimationsComplete: "Tap » to explore related activities.",
          talkBoxAfterHourClick: "With <span style='color:#00FFFF'>long hand at 12</span> and <span style='color:#FFD700'>short hand at {hour}</span>, the time is <span style='color:#FFD700'>{hour}</span> <span style='color:#00FFFF'>o'clock</span>."
        },
        page5: {
          talkBoxText:
            "Let's see what activities we do in this part of the day. Tap the numbers in the highlighted part to explore the activity.",
          talkBoxAfterAnyLabelClick:
            "Shout out loud some activities you do at {hour} {timeDuration}.",
          instructionText: "Tap on the number on clock to explore the activity.",
          instructionAfterAnyLabelClick:
            "Tap on the number to continue or Tap » to explore next part of the day.",
          instructionAfterAllLabelsClick: "Tap » to explore next part of the day.",
          timeOnClock: "TIME ON CLOCK?",
          timeOnClockDisplay: "<span style='color:#FFD700'>{hour}</span><span class='page2-oclock-clickable' style='color:#00FFFF;cursor:pointer'> o'clock</span>",
          timeOnClockDisplayHourClickable: "<span class='page2-hour-clickable' style='color:#FFD700;cursor:pointer'>{hour}</span><span style='color:#00FFFF'> o'clock</span>",
          timeOnClockDisplayFinal: "<span style='color:#FFD700'>{hour}</span><span style='color:#00FFFF'> o'clock</span>",
          talkBoxAfterClockClick: "Why is it {hour} 'o clock?<br><br><span style='color:#FFD700'>Let's see!</span>",
          talkBoxAfterOclockClick: "When the <span style='color:#00FFFF'>long hand at 12</span>, we say <span style='color:#00FFFF'>o'clock</span>.",
          instructionAfterClockClick: "Tap \"o'clock\"",
          instructionAfterOclockClick: "Tap \"{hour}\"",
          instructionAfterHourClick: "Tap » for something interesting…",
          instructionAfterAnimationsComplete: "Tap » to explore related activities.",
          talkBoxAfterHourClick: "With <span style='color:#00FFFF'>long hand at 12</span> and <span style='color:#FFD700'>short hand at {hour}</span>, the time is <span style='color:#FFD700'>{hour}</span> <span style='color:#00FFFF'>o'clock</span>."
        },
        page6: {
          talkBoxText:
            "We write “sore” after the time if it is after 2:00 and before 7:00 in the evening.",
          instructionText: "Tap on the number on clock to show the time.",
          timeOnClock: "TIME ON CLOCK?",
          timeOnClockDisplay: "<span style='color:#FFD700'>{hour}</span><span class='page2-oclock-clickable' style='color:#00FFFF;cursor:pointer'> o'clock</span>",
          timeOnClockDisplayHourClickable: "<span class='page2-hour-clickable' style='color:#FFD700;cursor:pointer'>{hour}</span><span style='color:#00FFFF'> o'clock</span>",
          timeOnClockDisplayFinal: "<span style='color:#FFD700'>{hour}</span><span style='color:#00FFFF'> o'clock</span>",
          talkBoxAfterClockClick: "Why is it {hour} 'o clock?<br><br><span style='color:#FFD700'>Let's see!</span>",
          talkBoxAfterOclockClick: "When the <span style='color:#00FFFF'>long hand at 12</span>, we say <span style='color:#00FFFF'>o'clock</span>.",
          instructionAfterClockClick: "Tap \"o'clock\"",
          instructionAfterOclockClick: "Tap \"{hour}\"",
          instructionAfterHourClick: "Tap » for something interesting…",
          instructionAfterAnimationsComplete: "Tap » to explore related activities.",
          talkBoxAfterHourClick: "With <span style='color:#00FFFF'>long hand at 12</span> and <span style='color:#FFD700'>short hand at {hour}</span>, the time is <span style='color:#FFD700'>{hour}</span> <span style='color:#00FFFF'>o'clock</span>."
        },

        page7: {
          talkBoxText:
            "Let's see what activities we do in this part of the day. Tap the numbers in the highlighted part to explore the activity.",
          talkBoxAfterAnyLabelClick:
            "Shout out loud some activities you do at {hour} {timeDuration}.",
          instructionText: "Tap on the number on clock to explore the activity.",
          instructionAfterAnyLabelClick:
            "Tap on the number to continue or Tap » to explore next part of the day.",
          instructionAfterAllLabelsClick: "Tap » to explore next part of the day.",
          timeOnClock: "TIME ON CLOCK?",
          timeOnClockDisplay: "<span style='color:#FFD700'>{hour}</span><span class='page2-oclock-clickable' style='color:#00FFFF;cursor:pointer'> o'clock</span>",
          timeOnClockDisplayHourClickable: "<span class='page2-hour-clickable' style='color:#FFD700;cursor:pointer'>{hour}</span><span style='color:#00FFFF'> o'clock</span>",
          timeOnClockDisplayFinal: "<span style='color:#FFD700'>{hour}</span><span style='color:#00FFFF'> o'clock</span>",
          talkBoxAfterClockClick: "Why is it {hour} 'o clock?<br><br><span style='color:#FFD700'>Let's see!</span>",
          talkBoxAfterOclockClick: "When the <span style='color:#00FFFF'>long hand at 12</span>, we say <span style='color:#00FFFF'>o'clock</span>.",
          instructionAfterClockClick: "Tap \"o'clock\"",
          instructionAfterOclockClick: "Tap \"{hour}\"",
          instructionAfterHourClick: "Tap » for something interesting…",
          instructionAfterAnimationsComplete: "Tap » to explore related activities.",
          talkBoxAfterHourClick: "With <span style='color:#00FFFF'>long hand at 12</span> and <span style='color:#FFD700'>short hand at {hour}</span>, the time is <span style='color:#FFD700'>{hour}</span> <span style='color:#00FFFF'>o'clock</span>."
        },
        page8: {
          talkBoxText:
            "We write “malam” after the time if it is after 6:00 in the evening and before 5:00 in the morning.",
          instructionText: "Tap the correct number.",
          timeOnClock: "TIME ON CLOCK?",
          timeOnClockDisplay: "<span style='color:#FFD700'>{hour}</span><span class='page2-oclock-clickable' style='color:#00FFFF;cursor:pointer'> o'clock</span>",
          timeOnClockDisplayHourClickable: "<span class='page2-hour-clickable' style='color:#FFD700;cursor:pointer'>{hour}</span><span style='color:#00FFFF'> o'clock</span>",
          timeOnClockDisplayFinal: "<span style='color:#FFD700'>{hour}</span><span style='color:#00FFFF'> o'clock</span>",
          talkBoxAfterClockClick: "Why is it {hour} 'o clock?<br><br><span style='color:#FFD700'>Let's see!</span>",
          talkBoxAfterOclockClick: "When the <span style='color:#00FFFF'>long hand at 12</span>, we say <span style='color:#00FFFF'>o'clock</span>.",
          instructionAfterClockClick: "Tap \"o'clock\"",
          instructionAfterOclockClick: "Tap \"{hour}\"",
          instructionAfterHourClick: "Tap » for something interesting…",
          instructionAfterAnimationsComplete: "Tap » to explore related activities.",
          talkBoxAfterHourClick: "With <span style='color:#00FFFF'>long hand at 12</span> and <span style='color:#FFD700'>short hand at {hour}</span>, the time is <span style='color:#FFD700'>{hour}</span> <span style='color:#00FFFF'>o'clock</span>."
        },

        page9: {
          talkBoxText:
            "Let's see what activities we do in this part of the day. Tap the numbers in the highlighted part to explore the activity.",
          talkBoxAfterAnyLabelClick:
            "Shout out loud some activities you do at {hour} {timeDuration}.",
          instructionText: "Tap on the number on clock to explore the activity.",
          instructionAfterAnyLabelClick:
            "Tap on the number to continue or Tap » to explore next part of the day.",
          instructionAfterAllLabelsClick: "Tap » to explore next part of the day.",
          timeOnClock: "TIME ON CLOCK?",
        },
        page10: {
        title: "Parts of the day.",
        mainText:
          "Awesome! We learned that the day is <br/>divided into 4 parts.",
        tableData: {
          headers: ["Duration", "Name"],
          rows: [
            ["From morning 5 o’clock to morning 10 o’clock.", "pagi"],
            ["From morning 10 o‘clock to 2 o’clock afternoon.", "siang"],
            ["From 2 o’clock afternoon to evening 6 o’clock.", "sore"],
            ["From evening 6 o’clock to early morning 5 o’clock.", "malam"]
          ]
        }
      },
      },
      
    },
    id: {
      appInfo: {
        title: "Membaca Waktu",
      },

      /**
       * Day-part labels and clock windows (24-hour times).
       * `malam` runs from 18:00 through to 05:00 the next morning (end hour is next day when comparing same calendar date).
       */
      timeDurations: [
        {
          name: "pagi",
          start: { hour: 5, minute: 0 },
          end: { hour: 11, minute: 0 },
          hours: [
            { timeLabel: "5:00", description: "At 5:00 pagi, the sky begins to get bright." },
            { timeLabel: "6:00", description: "We wake up at 6:00 pagi" },
            { timeLabel: "7:00", description: "We get ready for school at around 7:00 pagi" },
            { timeLabel: "8:00", description: "We have breakfast and go to school at around 8:00 pagi." },
            { timeLabel: "9:00", description: "We attend classes at school at around 9:00 pagi." },
            { timeLabel: "10:00", description: "We attend classes at school at around 10:00 pagi." },
          ],
        },
        {
          name: "siang",
          start: { hour: 10, minute: 0 },
          end: { hour: 14, minute: 0 },
          hours: [
            { timeLabel: "11:00", description: "We attend classes at school at around 9:00 pagi." },
            { timeLabel: "12:00", description: "We attend classes at school at around 9:00 pagi." },
            { timeLabel: "1:00", description: "We eat lunch at around 1:00 siang." },
            { timeLabel: "2:00", description: "We resume classes at 2:00 siang." },
          ],
        },
        {
          name: "sore",
          start: { hour: 14, minute: 0 },
          end: { hour: 19, minute: 0 },
          hours: [
            { timeLabel: "3:00", description: "School gets over at 3:00 sore." },
            { timeLabel: "4:00", description: "We eat evening snack at 4:00 sore" },
          ],
        },
        {
          name: "malam",
          start: { hour: 18, minute: 0 },
          end: { hour: 5, minute: 0 },
          hours: [],
        },
      ],

      messages: {
        pageStatesCleared:
          "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
        nextButtonPage2: "Peristiwa pergantian halaman telah dikirim",
        nextButtonpage3: "Berikutnya",
        nextButtonpage4: "Berikutnya",
        nextButtonpage5: "Berikutnya",
        nextButtonpage7: "Berikutnya",
        nextButtonpage8: "Berikutnya",
        nextButtonpage9: "Berikutnya",
        nextButtonpage10: "Berikutnya",
        previousButtonPage1: "Tombol sebelumnya diketuk",
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
        check: "Periksa",
        replay: "Putar ulang",
      },

      common: {
        heavy: "Berat",
        light: "Ringan",
        tapAlt: "Ketuk",
        questionText:
          "Berlatihlah membaca dan mengatur waktu pada jam analog. Ikuti setiap langkah dan ketuk kontrol saat diminta.",
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
          title: "Bagian-bagian hari",
          mainText:
            "Mari belajar nama-nama bagian dalam sehari.<br/><br/>Ketuk \"Mulai\" untuk memulai!",
        },
        page2: {
          talkBoxText:
            "Kita menulis “pagi” setelah waktu jika setelah 5:00 dan sebelum 11:00 pagi.",
          instructionText: "Ketuk angka pada jam untuk menunjukkan waktunya.",
          timeOnClock: "WAKTU DI JAM?",
          timeOnClockDisplay: "<span style='color:#FFD700'>{hour}</span><span class='page2-oclock-clickable' style='color:#00FFFF;cursor:pointer'> jam</span>",
          timeOnClockDisplayHourClickable: "<span class='page2-hour-clickable' style='color:#FFD700;cursor:pointer'>{hour}</span><span style='color:#00FFFF'> jam</span>",
          timeOnClockDisplayFinal: "<span style='color:#FFD700'>{hour}</span><span style='color:#00FFFF'> jam</span>",
          talkBoxAfterClockClick: "Kenapa pukulnya {hour} jam?<br><br>Mari kita lihat!",
          talkBoxAfterOclockClick: "Saat <span style='color:#00FFFF'>jarum panjang di 12</span>, kita bilang <span style='color:#00FFFF'>jam</span>.",
          instructionAfterClockClick: "Ketuk \"jam\"",
          instructionAfterOclockClick: "Ketuk \"{hour}\"",
          instructionAfterHourClick: "Ketuk » untuk sesuatu yang menarik…",
          instructionAfterAnimationsComplete: "Ketuk » untuk menjelajahi aktivitas terkait.",
          talkBoxAfterHourClick: "Dengan <span style='color:#00FFFF'>jarum panjang di 12</span> dan <span style='color:#FFD700'>jarum pendek di {hour}</span>, waktunya adalah <span style='color:#FFD700'>{hour}</span> <span style='color:#00FFFF'>jam</span>."
        },
        page3: {
          talkBoxText:
            "Mari kita lihat aktivitas apa yang biasa kita lakukan pada bagian hari ini. Ketuk angka-angka pada bagian yang disorot untuk menjelajahi aktivitasnya.",
          talkBoxAfterAnyLabelClick:
            "Sebutkan dengan lantang beberapa aktivitas yang kamu lakukan pada pukul {hour} {timeDuration}.",
          instructionText: "Ketuk angka pada jam untuk menjelajahi aktivitasnya.",
          instructionAfterAnyLabelClick:
            "Ketuk angka untuk melanjutkan atau ketuk » untuk menjelajahi bagian hari berikutnya.",
          instructionAfterAllLabelsClick: "Ketuk » untuk menjelajahi bagian hari berikutnya.",
          timeOnClock: "WAKTU DI JAM?",
          timeOnClockDisplay: "<span style='color:#FFD700'>{hour}</span><span class='page2-oclock-clickable' style='color:#00FFFF;cursor:pointer'> jam</span>",
          timeOnClockDisplayHourClickable: "<span class='page2-hour-clickable' style='color:#FFD700;cursor:pointer'>{hour}</span><span style='color:#00FFFF'> jam</span>",
          timeOnClockDisplayFinal: "<span style='color:#FFD700'>{hour}</span><span style='color:#00FFFF'> jam</span>",
          talkBoxAfterClockClick: "Kenapa pukulnya {hour} jam?<br><br><span style='color:#FFD700'>Mari kita lihat!</span>",
          talkBoxAfterOclockClick: "Saat <span style='color:#00FFFF'>jarum panjang di 12</span>, kita bilang <span style='color:#00FFFF'>jam</span>.",
          instructionAfterClockClick: "Ketuk \"jam\"",
          instructionAfterOclockClick: "Ketuk \"{hour}\"",
          instructionAfterHourClick: "Ketuk » untuk sesuatu yang menarik…",
          instructionAfterAnimationsComplete: "Ketuk » untuk menjelajahi aktivitas terkait.",
          talkBoxAfterHourClick: "Dengan <span style='color:#00FFFF'>jarum panjang di 12</span> dan <span style='color:#FFD700'>jarum pendek di {hour}</span>, waktunya adalah <span style='color:#FFD700'>{hour}</span> <span style='color:#00FFFF'>jam</span>."
        },
        page4: {
          talkBoxText:
            "Kita menulis “siang” setelah waktu jika setelah 10:00 dan sebelum 3:00 siang.",
          instructionText: "Ketuk angka pada jam untuk menunjukkan waktunya.",
          timeOnClock: "WAKTU DI JAM?",
          timeOnClockDisplay: "<span style='color:#FFD700'>{hour}</span><span class='page2-oclock-clickable' style='color:#00FFFF;cursor:pointer'> jam</span>",
          timeOnClockDisplayHourClickable: "<span class='page2-hour-clickable' style='color:#FFD700;cursor:pointer'>{hour}</span><span style='color:#00FFFF'> jam</span>",
          timeOnClockDisplayFinal: "<span style='color:#FFD700'>{hour}</span><span style='color:#00FFFF'> jam</span>",
          talkBoxAfterClockClick: "Kenapa pukulnya {hour} jam?<br><br><span style='color:#FFD700'>Mari kita lihat!</span>",
          talkBoxAfterOclockClick: "Saat <span style='color:#00FFFF'>jarum panjang di 12</span>, kita bilang <span style='color:#00FFFF'>jam</span>.",
          instructionAfterClockClick: "Ketuk \"jam\"",
          instructionAfterOclockClick: "Ketuk \"{hour}\"",
          instructionAfterHourClick: "Ketuk » untuk sesuatu yang menarik…",
          instructionAfterAnimationsComplete: "Ketuk » untuk menjelajahi aktivitas terkait.",
          talkBoxAfterHourClick: "Dengan <span style='color:#00FFFF'>jarum panjang di 12</span> dan <span style='color:#FFD700'>jarum pendek di {hour}</span>, waktunya adalah <span style='color:#FFD700'>{hour}</span> <span style='color:#00FFFF'>jam</span>."
        },
        page5: {
          talkBoxText:
            "Mari kita lihat aktivitas apa yang biasa kita lakukan pada bagian hari ini. Ketuk angka-angka pada bagian yang disorot untuk menjelajahi aktivitasnya.",
          talkBoxAfterAnyLabelClick:
            "Sebutkan dengan lantang beberapa aktivitas yang kamu lakukan pada pukul {hour} {timeDuration}.",
          instructionText: "Ketuk angka pada jam untuk menjelajahi aktivitasnya.",
          instructionAfterAnyLabelClick:
            "Ketuk angka untuk melanjutkan atau ketuk » untuk menjelajahi bagian hari berikutnya.",
          instructionAfterAllLabelsClick: "Ketuk » untuk menjelajahi bagian hari berikutnya.",
          timeOnClock: "WAKTU DI JAM?",
          timeOnClockDisplay: "<span style='color:#FFD700'>{hour}</span><span class='page2-oclock-clickable' style='color:#00FFFF;cursor:pointer'> jam</span>",
          timeOnClockDisplayHourClickable: "<span class='page2-hour-clickable' style='color:#FFD700;cursor:pointer'>{hour}</span><span style='color:#00FFFF'> jam</span>",
          timeOnClockDisplayFinal: "<span style='color:#FFD700'>{hour}</span><span style='color:#00FFFF'> jam</span>",
          talkBoxAfterClockClick: "Kenapa pukulnya {hour} jam?<br><br><span style='color:#FFD700'>Mari kita lihat!</span>",
          talkBoxAfterOclockClick: "Saat <span style='color:#00FFFF'>jarum panjang di 12</span>, kita bilang <span style='color:#00FFFF'>jam</span>.",
          instructionAfterClockClick: "Ketuk \"jam\"",
          instructionAfterOclockClick: "Ketuk \"{hour}\"",
          instructionAfterHourClick: "Ketuk » untuk sesuatu yang menarik…",
          instructionAfterAnimationsComplete: "Ketuk » untuk menjelajahi aktivitas terkait.",
          talkBoxAfterHourClick: "Dengan <span style='color:#00FFFF'>jarum panjang di 12</span> dan <span style='color:#FFD700'>jarum pendek di {hour}</span>, waktunya adalah <span style='color:#FFD700'>{hour}</span> <span style='color:#00FFFF'>jam</span>."
        },
        page6: {
          talkBoxText:
            "Kita menulis “sore” setelah waktu jika setelah 2:00 dan sebelum 7:00 sore.",
          instructionText: "Ketuk angka pada jam untuk menunjukkan waktunya.",
          timeOnClock: "WAKTU DI JAM?",
          timeOnClockDisplay: "<span style='color:#FFD700'>{hour}</span><span class='page2-oclock-clickable' style='color:#00FFFF;cursor:pointer'> jam</span>",
          timeOnClockDisplayHourClickable: "<span class='page2-hour-clickable' style='color:#FFD700;cursor:pointer'>{hour}</span><span style='color:#00FFFF'> jam</span>",
          timeOnClockDisplayFinal: "<span style='color:#FFD700'>{hour}</span><span style='color:#00FFFF'> jam</span>",
          talkBoxAfterClockClick: "Kenapa pukulnya {hour} jam?<br><br><span style='color:#FFD700'>Mari kita lihat!</span>",
          talkBoxAfterOclockClick: "Saat <span style='color:#00FFFF'>jarum panjang di 12</span>, kita bilang <span style='color:#00FFFF'>jam</span>.",
          instructionAfterClockClick: "Ketuk \"jam\"",
          instructionAfterOclockClick: "Ketuk \"{hour}\"",
          instructionAfterHourClick: "Ketuk » untuk sesuatu yang menarik…",
          instructionAfterAnimationsComplete: "Ketuk » untuk menjelajahi aktivitas terkait.",
          talkBoxAfterHourClick: "Dengan <span style='color:#00FFFF'>jarum panjang di 12</span> dan <span style='color:#FFD700'>jarum pendek di {hour}</span>, waktunya adalah <span style='color:#FFD700'>{hour}</span> <span style='color:#00FFFF'>jam</span>."
        },
        page7: {
          talkBoxText:
            "Mari kita lihat aktivitas apa yang biasa kita lakukan pada bagian hari ini. Ketuk angka-angka pada bagian yang disorot untuk menjelajahi aktivitasnya.",
          talkBoxAfterAnyLabelClick:
            "Sebutkan dengan lantang beberapa aktivitas yang kamu lakukan pada pukul {hour} {timeDuration}.",
          instructionText: "Ketuk angka pada jam untuk menjelajahi aktivitasnya.",
          instructionAfterAnyLabelClick:
            "Ketuk angka untuk melanjutkan atau ketuk » untuk menjelajahi bagian hari berikutnya.",
          instructionAfterAllLabelsClick: "Ketuk » untuk menjelajahi bagian hari berikutnya.",
          timeOnClock: "WAKTU DI JAM?",
          timeOnClockDisplay: "<span style='color:#FFD700'>{hour}</span><span class='page2-oclock-clickable' style='color:#00FFFF;cursor:pointer'> jam</span>",
          timeOnClockDisplayHourClickable: "<span class='page2-hour-clickable' style='color:#FFD700;cursor:pointer'>{hour}</span><span style='color:#00FFFF'> jam</span>",
          timeOnClockDisplayFinal: "<span style='color:#FFD700'>{hour}</span><span style='color:#00FFFF'> jam</span>",
          talkBoxAfterClockClick: "Kenapa pukulnya {hour} jam?<br><br><span style='color:#FFD700'>Mari kita lihat!</span>",
          talkBoxAfterOclockClick: "Saat <span style='color:#00FFFF'>jarum panjang di 12</span>, kita bilang <span style='color:#00FFFF'>jam</span>.",
          instructionAfterClockClick: "Ketuk \"jam\"",
          instructionAfterOclockClick: "Ketuk \"{hour}\"",
          instructionAfterHourClick: "Ketuk » untuk sesuatu yang menarik…",
          instructionAfterAnimationsComplete: "Ketuk » untuk menjelajahi aktivitas terkait.",
          talkBoxAfterHourClick: "Dengan <span style='color:#00FFFF'>jarum panjang di 12</span> dan <span style='color:#FFD700'>jarum pendek di {hour}</span>, waktunya adalah <span style='color:#FFD700'>{hour}</span> <span style='color:#00FFFF'>jam</span>."
        },
        page8: {
          talkBoxText:
            "Kita menulis “malam” setelah waktu jika setelah 6:00 sore dan sebelum 5:00 pagi.",
          instructionText: "Ketuk angka pada jam untuk menunjukkan waktunya.",
          timeOnClock: "WAKTU DI JAM?",
          timeOnClockDisplay: "<span style='color:#FFD700'>{hour}</span><span class='page2-oclock-clickable' style='color:#00FFFF;cursor:pointer'> jam</span>",
          timeOnClockDisplayHourClickable: "<span class='page2-hour-clickable' style='color:#FFD700;cursor:pointer'>{hour}</span><span style='color:#00FFFF'> jam</span>",
          timeOnClockDisplayFinal: "<span style='color:#FFD700'>{hour}</span><span style='color:#00FFFF'> jam</span>",
          talkBoxAfterClockClick: "Kenapa pukulnya {hour} jam?<br><br><span style='color:#FFD700'>Mari kita lihat!</span>",
          talkBoxAfterOclockClick: "Saat <span style='color:#00FFFF'>jarum panjang di 12</span>, kita bilang <span style='color:#00FFFF'>jam</span>.",
          instructionAfterClockClick: "Ketuk \"jam\"",
          instructionAfterOclockClick: "Ketuk \"{hour}\"",
          instructionAfterHourClick: "Ketuk » untuk sesuatu yang menarik…",
          instructionAfterAnimationsComplete: "Ketuk » untuk menjelajahi aktivitas terkait.",
          talkBoxAfterHourClick: "Dengan <span style='color:#00FFFF'>jarum panjang di 12</span> dan <span style='color:#FFD700'>jarum pendek di {hour}</span>, waktunya adalah <span style='color:#FFD700'>{hour}</span> <span style='color:#00FFFF'>jam</span>."
        },
        page9: {
          talkBoxText:
            "Mari kita lihat aktivitas apa yang biasa kita lakukan pada bagian hari ini. Ketuk angka-angka pada bagian yang disorot untuk menjelajahi aktivitasnya.",
          talkBoxAfterAnyLabelClick:
            "Sebutkan dengan lantang beberapa aktivitas yang kamu lakukan pada pukul {hour} {timeDuration}.",
          instructionText: "Ketuk angka pada jam untuk menjelajahi aktivitasnya.",
          instructionAfterAnyLabelClick:
            "Ketuk angka untuk melanjutkan atau ketuk » untuk menjelajahi bagian hari berikutnya.",
          instructionAfterAllLabelsClick: "Ketuk » untuk menjelajahi bagian hari berikutnya.",
          timeOnClock: "WAKTU DI JAM?",
        },
        page10: {
          title: "Bagian-bagian hari.",
          mainText:
            "Bagus! Kita belajar bahwa sehari<br/>terbagi menjadi 4 bagian.",
          tableData: {
            headers: ["Durasi", "Nama"],
            rows: [
              ["Dari pukul 5 pagi sampai pukul 10 pagi.", "pagi"],
              ["Dari pukul 10 pagi sampai pukul 2 siang.", "siang"],
              ["Dari pukul 2 siang sampai pukul 6 sore.", "sore"],
              ["Dari pukul 6 sore sampai pukul 5 pagi.", "malam"]
            ]
          }
        },
        page11: {
          title: "Mengatur Waktu",
          mainText:
            "Luar biasa! Sekarang kita tahu cara mengatur waktu<br/> di jam.<br/><br/>Ketuk \"Mulai Ulang\" untuk mengulang aktivitas ini!",
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
