// data.js - Internationalization data for the Writing Time clock applet
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
        continue: "Continue",
      },

      numberPad: {
        showHint: "show 💡",
        check: "CHECK",
      },

      messages: {
        pageStatesCleared:
          "Page states were cleared. Reload the page to start from the beginning?",
        nextButtonPage2: "Page navigation event sent",
        previousButtonPage1: "Page navigation event sent",
        navigationReset: "Resetting to question 1",
        navigationComplete: "App reset complete – ready for a new question",
        lastPageStartingOver: "Last page – starting over",
        allStagesCompleted: "All stages completed!",
      },

      common: {
        heavy: "Heavy",
        light: "Light",
        tapAlt: "Tap",
        questionText:
          "Practice reading and writing the time shown on the clock using the short and long hands.",
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
        // Page 2 talk box — {hour} from Question.hour after hours numpad is correct
        page2TalkBox: {
          talkBoxText:
            "Read and write the time shown on the clock. <br/>First - hours.",
          talkBoxOnWrong:
            "Oops! Look at the short hand. Which number did it just cross?",
          talkBoxOnCorrectTemplate:
            "<span>That’s correct.<br/> Short hand reads <br/><span style='color:#FFD700'>{hour} hours!</span></span>",
        },
        // Page 4 talk box — from Question.minute: {crossedClockNumber}=floor(m/5), {minutesAtMark}=floor(m/5)*5
        page4TalkBox: {
          talkBoxTextTemplate:
            "<span>How many <span style='color:#0ECDD7'>minutes</span> when long hand points {crossedClockNumber}?</span>",
          talkBoxOnWrongTemplate:
            '<span>Oops! Long hand crossed {crossedClockNumber}. So, multiply {crossedClockNumber} by 5 to find <span style="color:#0ECDD7">minutes</span></span>',
          talkBoxOnCorrectTemplate:
            "<span>Yeah! Clock reads <span style='color:#0ECDD7'>{minutesAtMark}  minutes </span> when long hand crosses {crossedClockNumber}.</span>",
        },
        // Page 5 talk box — {crossedClockNumber}=floor(minute/5); {options2TickNumber} from correct options2 entry
        page5TalkBox: {
          talkBoxTextTemplate:
            "How many more marks has the long hand crossed after number crossing {crossedClockNumber}?",
          talkBoxOnWrongTemplate:
            "Count the number of marks crossed by long hand after crossing number {crossedClockNumber} on the clock.",
          talkBoxOnCorrectTemplate:
            "Correct! The long hand has crossed {options2TickNumber} more marks after crossing number {crossedClockNumber} on the clock.",
        },
        // Page 6 talk box — {minutesAtMark}=floor(min/5)*5; {marksPhrase}=“1 mark” / “N marks” from min%5; {hour},{minute} from Question
        page6TalkBox: {
          talkBoxTextTemplate:
            "<span>Let’s count up the total minutes.<br/><br/>{minutesAtMark} + {marksPhrase} = <br/><span style='color:#0ECDD7'>?? minutes</span></span>",
          talkBoxOnWrongTemplate:
            '<span>Let’s count up the total minutes.<br/><br/>{minutesAtMark} + {marksPhrase} = <br/><span style="color:#0ECDD7">?? minutes</span></span>',
          talkBoxOnCorrectTemplate:
            "<span>Well Done! <br/>The clock reads <br/><span style='color:#FFD550'>{hour} hours</span> <br/><span style='color:#0ECDD7'>{minute} minutes</span>.</span>",
          marksPhraseOne: "1 mark",
          marksPhraseMany: "{count} marks",
        },
        // Shared box1 (hours) numpad — CHECK compares input to Question.hour; feedback uses {hour}
        box1Numpad: {
          correctFeedbackTemplate:
            "That’s correct. Small hand just crossed number {hour} on the clock.",
          incorrectFeedback: "Oops! That’s not correct, try again!",
        },
        // Page 6 total-minutes numpad — CHECK uses Question.minute; templates use {hour} and {minute}
        box2Numpad: {
          correctFeedbackTemplate:
            "That’s correct. Clock reads {hour}:{minute}.",
          incorrectFeedback: "Oops! That’s not right.",
        },
        // Page 4 minute MCQ — {optionMinute} and {tickNumber} (minute ÷ 5) filled per option
        optionsMinuteFeedback: {
          correctFeedbackTemplate:
            "That’s correct! Clock reads {optionMinute} minutes when long hand points at {tickNumber} on the clock.",
          incorrectFeedbackTemplate:
            "That’s not right! Clock reads {optionMinute} minutes when long hand points at {tickNumber} on the clock.",
        },
        // MCQ button label when option has optionMinute but no text — {optionMinute} substituted
        optionsMinuteButtonLabel: "{optionMinute} minutes",
        // Page 5 options2 — {options2TickNumber} substituted; singular vs plural
        options2TickButtonLabelSingular: "{options2TickNumber} mark",
        options2TickButtonLabelPlural: "{options2TickNumber} marks",
        // Page 5 options2 MCQ feedback — per-option `feedback` not required
        // {crossedClockNumber} = floor(questionMinute/5); {crossedFiveMinuteMark} = that × 5 (minutes at last big tick)
        options2TickFeedback: {
          incorrectFeedback: "That’s not right!",
          correctFeedbackSingular:
            "That’s correct. 1 more minute has passed after crossing {crossedClockNumber}.",
          correctFeedbackPlural:
            "That’s correct. {options2TickNumber} more minutes have passed after crossing {crossedClockNumber}.",
        },
      },


      Question: [
        {
          hour: 6,
          minute: 13,
          options: [
            {
              optionMinute: 5,
              iscorrect: false
            },
            {
              optionMinute: 10,
              iscorrect: true
            },
            {
              optionMinute: 15,
              iscorrect: false
            },
          ],
          options2: [
            {
              options2TickNumber: 3,
              iscorrect: true,
            },
            {
              options2TickNumber: 1,
              iscorrect: false,
            },
            {
              options2TickNumber: 4,
              iscorrect: false,
            },
          ],
        },
        {
          hour: 2,
          minute: 17,

          options: [
            {
              optionMinute: 5,
              iscorrect: false
            },
            {
              optionMinute: 15,
              iscorrect: true
            },
            {
              optionMinute: 10,
              iscorrect: false
            },
          ],

          options2: [
            {
              options2TickNumber: 2,
              iscorrect: true,
            },
            {
              options2TickNumber: 1,
              iscorrect: false,
            },
            {
              options2TickNumber: 4,
              iscorrect: false,
            },
          ],

        },
        {
          hour: 7,
          minute: 18,

          options: [
            {
              optionMinute: 10,
              iscorrect: false
            },
            {
              optionMinute: 15,
              iscorrect: true
            },
            {
              optionMinute: 20,
              iscorrect: false
            },
          ],

          options2: [
            {
              options2TickNumber: 3,
              iscorrect: true,
            },
            {
              options2TickNumber: 1,
              iscorrect: false,
            },
            {
              options2TickNumber: 4,
              iscorrect: false,
            },
          ],

        },
        {
          hour: 6,
          minute: 26,

          options: [
            {
              optionMinute: 20,
              iscorrect: false
            },
            {
              optionMinute: 25,
              iscorrect: true
            },
            {
              optionMinute: 30,
              iscorrect: false
            },
          ],

          options2: [
            {
              options2TickNumber: 1,
              iscorrect: true,
            },
            {
              options2TickNumber: 2,
              iscorrect: false,
            },
            {
              options2TickNumber: 3,
              iscorrect: false,
            },
          ],

        },
        {
          hour: 8,
          minute: 39,

          options: [
            {
              optionMinute: 30,
              iscorrect: false
            },
            {
              optionMinute: 35,
              iscorrect: true
            },
            {
              optionMinute: 40,
              iscorrect: false
            },
          ],

          options2: [
            {
              options2TickNumber: 4,
              iscorrect: true,
            },
            {
              options2TickNumber: 2,
              iscorrect: false,
            },
            {
              options2TickNumber: 3,
              iscorrect: false,
            },
          ],

        },
        {
          hour: 9,
          minute: 44,

          options: [
            {
              optionMinute: 35,
              iscorrect: false
            },
            {
              optionMinute: 40,
              iscorrect: true
            },
            {
              optionMinute: 45,
              iscorrect: false
            },
          ],

          options2: [
            {
              options2TickNumber: 4,
              iscorrect: true,
            },
            {
              options2TickNumber: 2,
              iscorrect: false,
            },
            {
              options2TickNumber: 3,
              iscorrect: false,
            },
          ],

        },
        {
          hour: 6,
          minute: 57,

          options: [
            {
              optionMinute: 50,
              iscorrect: false
            },
            {
              optionMinute: 55,
              iscorrect: true
            },
            {
              optionMinute: 60,
              iscorrect: false
            },
          ],

          options2: [
            {
              options2TickNumber: 2,
              iscorrect: true,
            },
            {
              options2TickNumber: 1,
              iscorrect: false,
            },
            {
              options2TickNumber: 3,
              iscorrect: false,
            },
          ],

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
          feedback: {
            emptyFeedback: "Fill the highlighted box before checking",
          },
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
          talkBoxText:
            '<span>Hey! Let’s try to count and read the <span style="color:#70ACC7">minutes.</span></span>',
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
          feedback: {
            emptyFeedback: "Fill the highlighted box before checking",
          },
          instructionText: "Tap using numpad and check.",
          instructionAfterQuiz: "Tap » for another challenge.",
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
        title: "Menulis Waktu",
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang",
        start: "Mulai",
        continue: "Lanjut",
      },

      numberPad: {
        showHint: "tampilkan 💡",
        check: "PERIKSA",
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

      common: {
        heavy: "Berat",
        light: "Ringan",
        tapAlt: "Ketuk",
        questionText:
          "Latih membaca dan menulis waktu yang ditunjukkan pada jam dengan jarum pendek dan jarum panjang.",
        questionIcon: "T",
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
        page2TalkBox: {
          talkBoxText:
            "Baca dan tulis waktu yang ditunjukkan pada jam.<br/>Pertama — jam.",
          talkBoxOnWrong:
            "Ups! Lihat jarum pendek. Angka berapa baru saja dilewatinya?",
          talkBoxOnCorrectTemplate:
            "<span>Benar.<br/> Jarum pendek menunjukkan <br/><span style='color:#FFD700'>{hour} jam!</span></span>",
        },
        page4TalkBox: {
          talkBoxTextTemplate:
            "<span>Berapa <span style='color:#0ECDD7'>menit</span> ketika jarum panjang menunjuk {crossedClockNumber}?</span>",
          talkBoxOnWrongTemplate:
            '<span>Ups! Jarum panjang melewati {crossedClockNumber}. Kalikan {crossedClockNumber} dengan 5 untuk mencari <span style="color:#0ECDD7">menit</span></span>',
          talkBoxOnCorrectTemplate:
            "<span>Ya! Jam menunjuk <span style='color:#0ECDD7'>{minutesAtMark} menit </span> ketika jarum panjang melewati {crossedClockNumber}.</span>",
        },
        page5TalkBox: {
          talkBoxTextTemplate:
            "Berapa tanda lagi yang dilewati jarum panjang setelah melewati angka {crossedClockNumber}?",
          talkBoxOnWrongTemplate:
            "Hitung banyak tanda yang dilewati jarum panjang setelah melewati angka {crossedClockNumber} pada jam.",
          talkBoxOnCorrectTemplate:
            "Benar! Jarum panjang telah melewati {options2TickNumber} tanda lagi setelah melewati angka {crossedClockNumber} pada jam.",
        },
        page6TalkBox: {
          talkBoxTextTemplate:
            "<span>Mari jumlahkan total menitnya.<br/><br/>{minutesAtMark} + {marksPhrase} = <br/><span style='color:#0ECDD7'>?? menit</span></span>",
          talkBoxOnWrongTemplate:
            '<span>Mari jumlahkan total menitnya.<br/><br/>{minutesAtMark} + {marksPhrase} = <br/><span style="color:#0ECDD7">?? menit</span></span>',
          talkBoxOnCorrectTemplate:
            "<span>Bagus! <br/>Jam menunjuk <br/><span style='color:#FFD550'>{hour} jam</span> <br/><span style='color:#0ECDD7'>{minute} menit</span>.</span>",
          marksPhraseOne: "1 tanda",
          marksPhraseMany: "{count} tanda",
        },
        box1Numpad: {
          correctFeedbackTemplate:
            "Benar. Jarum kecil baru saja melewati angka {hour} pada jam.",
          incorrectFeedback: "Ups! Belum benar, coba lagi!",
        },
        box2Numpad: {
          correctFeedbackTemplate: "Benar. Jam menunjuk {hour}:{minute}.",
          incorrectFeedback: "Ups! Belum benar.",
        },
        optionsMinuteFeedback: {
          correctFeedbackTemplate:
            "Benar! Jam menunjuk {optionMinute} menit ketika jarum panjang menunjuk {tickNumber} pada jam.",
          incorrectFeedbackTemplate:
            "Belum benar! Jam menunjuk {optionMinute} menit ketika jarum panjang menunjuk {tickNumber} pada jam.",
        },
        optionsMinuteButtonLabel: "{optionMinute} menit",
        options2TickButtonLabelSingular: "{options2TickNumber} tanda",
        options2TickButtonLabelPlural: "{options2TickNumber} tanda",
        options2TickFeedback: {
          incorrectFeedback: "Belum benar!",
          correctFeedbackSingular:
            "Benar. 1 menit lagi telah berlalu setelah melewati {crossedClockNumber}.",
          correctFeedbackPlural:
            "Benar. {options2TickNumber} menit lagi telah berlalu setelah melewati {crossedClockNumber}.",
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
          title: "Menulis Waktu",
          mainText:
            "Mari membaca dan menulis waktu pada jam ketika jarum panjang berada di antara dua angka pada jam.<br/><br/>Ketuk “Mulai” untuk memulai!",
        },
        page2: {
          feedback: {
            emptyFeedback: "Isi kotak yang disorot sebelum menekan Periksa",
          },
          instructionText:
            "Ketuk numpad untuk menulis jam di kotak yang disorot.",
          instructionAfterQuiz: "Ketuk » untuk membaca menit.",
          finish: "Ketuk » untuk selesai.",
          timeOnClock: "WAKTU PADA JAM?",
          quizPanel: {
            quizSubType: "QT2R",
            questionText: "",
            options: [
              {
                text: "Jam 5",
                iscorrect: true,
                feedback: "Bagus! Itu benar.",
              },
              {
                text: "Jam 8",
                iscorrect: false,
                feedback:
                  "Ups! Periksa angka yang ditunjuk jarum pendek.",
              },
              {
                text: "Jam 12",
                iscorrect: false,
                feedback:
                  "Ups! Periksa angka yang ditunjuk jarum pendek.",
              },
            ],
          },
        },
        page3: {
          talkBoxText:
            '<span>Hai! Mari menghitung dan membaca <span style="color:#70ACC7">menit.</span></span>',
          instructionText: "Ketuk » untuk lanjut.",
        },
        page4: {
          instructionText: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk langkah berikutnya.",
          finish: "Ketuk » untuk langkah berikutnya.",
          timeOnClock: "WAKTU PADA JAM?",
          quizPanel: {
            quizSubType: "QT3R",
            questionText: "",
            options: [
              {
                text: "Jam 5",
                iscorrect: true,
                feedback: "Bagus! Itu benar.",
              },
              {
                text: "Jam 8",
                iscorrect: false,
                feedback:
                  "Ups! Periksa angka yang ditunjuk jarum pendek.",
              },
              {
                text: "Jam 12",
                iscorrect: false,
                feedback:
                  "Ups! Periksa angka yang ditunjuk jarum pendek.",
              },
            ],
          },
        },
        page5: {
          instructionText: "Ketuk pilihan yang benar.",
          instructionAfterQuiz:
            "Ketuk » untuk langkah terakhir membaca menit.",
          finish: "Ketuk » untuk selesai.",
          timeOnClock: "WAKTU PADA JAM?",
          quizPanel: {
            quizSubType: "QT3R",
            questionText: "",
            options: [
              {
                text: "Jam 5",
                iscorrect: true,
                feedback: "Bagus! Itu benar.",
              },
              {
                text: "Jam 8",
                iscorrect: false,
                feedback:
                  "Ups! Periksa angka yang ditunjuk jarum pendek.",
              },
              {
                text: "Jam 12",
                iscorrect: false,
                feedback:
                  "Ups! Periksa angka yang ditunjuk jarum pendek.",
              },
            ],
          },
        },
        page6: {
          feedback: {
            emptyFeedback: "Isi kotak yang disorot sebelum menekan Periksa",
          },
          instructionText: "Gunakan numpad lalu ketuk Periksa.",
          instructionAfterQuiz: "Ketuk » untuk tantangan lain.",
          finish: "Ketuk » untuk selesai.",
          timeOnClock: "WAKTU PADA JAM?",
          quizPanel: {
            quizSubType: "QT2R",
            questionText: "",
            options: [
              {
                text: "Jam 5",
                iscorrect: true,
                feedback: "Bagus! Itu benar.",
              },
              {
                text: "Jam 8",
                iscorrect: false,
                feedback:
                  "Ups! Periksa angka yang ditunjuk jarum pendek.",
              },
              {
                text: "Jam 12",
                iscorrect: false,
                feedback:
                  "Ups! Periksa angka yang ditunjuk jarum pendek.",
              },
            ],
          },
        },
        page7: {
          title: "Menulis Waktu",
          mainText:
            "Hebat! Kita membaca waktu dengan melihat angka yang ditunjuk jarum panjang.",
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
// Quiz item data (numeric structure); copy lives under en.Question — same for all locales
window.Question = AppData.translations.en.Question;
// Make i18n globally available
window.i18n = i18n;

/**
 * Params for `common.page4TalkBox` templates from total minutes on the clock.
 * crossedClockNumber = floor(minute/5); minutesAtMark = floor(minute/5) * 5
 */
window.getPage4TalkBoxTemplateParamsFromMinute = function getPage4TalkBoxTemplateParamsFromMinute(
  minuteVal,
) {
  const mm = Number(minuteVal);
  if (!Number.isFinite(mm)) {
    return { crossedClockNumber: "", minutesAtMark: "" };
  }
  const n = Math.floor(mm / 5);
  return { crossedClockNumber: String(n), minutesAtMark: String(n * 5) };
};

/**
 * Params for `common.page5TalkBox` templates from a Question object.
 * crossedClockNumber = floor(minute/5); options2TickNumber = correct options2 option’s tick count.
 */
window.getPage5TalkBoxTemplateParamsFromQuestion =
  function getPage5TalkBoxTemplateParamsFromQuestion(q) {
    if (!q || typeof q !== "object") {
      return { crossedClockNumber: "", options2TickNumber: "" };
    }
    const mm = Number(q.minute);
    const crossedClockNumber = Number.isFinite(mm)
      ? String(Math.floor(mm / 5))
      : "";

    let options2TickNumber = "";
    const opts = Array.isArray(q.options2) ? q.options2 : [];
    const correctOpt = opts.find((o) => o && o.iscorrect === true);
    const t = correctOpt?.options2TickNumber;
    if (typeof t === "number" && Number.isFinite(t)) {
      options2TickNumber = String(t);
    } else if (Number.isFinite(mm)) {
      const r = mm % 5;
      options2TickNumber = String(r === 0 ? 0 : r);
    }

    return { crossedClockNumber, options2TickNumber };
  };

/**
 * Params for `common.page6TalkBox` templates.
 * minutesAtMark = floor(minute/5)*5; marksPhrase = “1 mark” or “N marks” for minute%5; hour & minute as spoken.
 */
window.getPage6TalkBoxTemplateParamsFromQuestion =
  function getPage6TalkBoxTemplateParamsFromQuestion(q) {
    if (!q || typeof q !== "object") {
      return {
        minutesAtMark: "",
        marksPhrase: "",
        hour: "",
        minute: "",
      };
    }
    const mm = Number(q.minute);
    const h = q.hour;
    const hourStr =
      h != null && Number.isFinite(Number(h)) ? String(h) : "";
    const minuteStr = Number.isFinite(mm) ? String(mm) : "";

    let minutesAtMark = "";
    let marksPhrase = "";
    if (Number.isFinite(mm)) {
      minutesAtMark = String(Math.floor(mm / 5) * 5);
      const extra = mm % 5;
      if (
        typeof window !== "undefined" &&
        window.i18n &&
        typeof window.i18n.t === "function"
      ) {
        const keyOne = "common.page6TalkBox.marksPhraseOne";
        const keyMany = "common.page6TalkBox.marksPhraseMany";
        if (extra === 1) {
          const t1 = window.i18n.t(keyOne, {});
          marksPhrase =
            typeof t1 === "string" && !t1.startsWith("[Missing:")
              ? t1
              : "1 mark";
        } else {
          const tm = window.i18n.t(keyMany, { count: String(extra) });
          marksPhrase =
            typeof tm === "string" && !tm.startsWith("[Missing:")
              ? tm
              : `${extra} marks`;
        }
      } else {
        marksPhrase = extra === 1 ? "1 mark" : `${extra} marks`;
      }
    }

    return {
      minutesAtMark,
      marksPhrase,
      hour: hourStr,
      minute: minuteStr,
    };
  };
