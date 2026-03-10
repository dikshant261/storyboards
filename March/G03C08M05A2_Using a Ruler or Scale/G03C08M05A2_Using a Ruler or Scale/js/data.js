// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlight1 = "#FFD700";
const highlight2 = "#70ACC7";
const highlight3 = "#F28283";
const highlight4 = "#70ACC7";

const AppData = {
  // Current language setting
  currentLanguage: "en",

  // Text content by language
  translations: {
    en: {
      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        start: "Start",
        showHint: "Show Hint",
        hideHint: "Hide Hint",
        color: "Color",
        shape: "Shape",
        yes: "Yes",
        no: "No",
      },
      appInfo: {
        title: "Using a Ruler / Scale",
      },
      messages: {
        pageStatesCleared:
          "Page states have been cleared. Reload the page to start fresh?",
      },
      common: {
        propertyShowcase: {
          headerText: "Properties of a Parallelogram",
          headerDescription: "Marking Equal Sides",
          propertyNames: {
            sides: "Sides",
            angles: "Angles",
            diagonals: "Diagonals",
            symmetry: "Symmetry",
          },
        },
        labels: {
          dropHere: "Drop Here",
        },
        tapAlt: "Tap",
        oppositeSidesEqualMessage: "Opposite sides are equal!",
      },
      numberPad: {
        feedback: {
          empty: "Fill the highlighted box before checking",
        },
      },
      pages: {
        page1: {
          title: "Using a Ruler / Scale",
          mainText:
            "Let’s understand the divisions on <br/>the ruler and what they mean,<br/> how we can count the divisions,<br/> and how we can measure line <br/>segments using the divisions.",
          instructionText: "Tap ‘Start’ to begin the lesson.",
        },
        page2: {

          headerText: "Measuring using CENTIMETER (cm) scale",
          instruction: "Tap » to look at the symbol",
          studentInstructText: "Pull out your scale and look at the divisions on it…<br/><br/>On the screen, let’s zoom in an look at different segments."
        },
        page3: {

          headerText: "The ‘cm’ symbol stands for CENTIMETER",
          instruction: "Tap » to look at the divisions",
          studentInstructText: "The symbol ‘cm’ indicates that this ruler let’s us measure in CENTIMETERS.<br/><br/>Look at the divisions now…"
        },
        page4: {

          headerText: "Divisions on a CENTIMETER (cm) ruler",
          instruction: "Tap » to continue",
          studentInstructText: "There are <span style='color:#00FFCC'>larger numbered divisions</span> and <span style='color:#0A83B4'>smaller divisions</span> in between them."
        },
        page5: {

          headerText: "Divisions on a CENTIMETER (cm) ruler",
          instruction: "Tap » to look at one large division",
          studentInstructText: "Notice that the distance between all divisions is exactly the same!"
        },
        page6: {

          headerText: "Every large numbered division is 1 cm",
          instruction: "Tap » to look at the division numbers",
          studentInstructText: "Look at any 2 large divisions next to one another, and they will have a distance of 1 cm between them, in all cm rulers!"
        },
        page7: {

          headerText: "What do the numbers indicate?",
          instruction: "Tap » to look at the small divisions",
          studentInstructText: "Each number indicates how many CENTIMETERS of length are moved from the marking 0."
        },
        page8: {
          headerText: "Small divisions in a cm ruler",
          instruction: "Tap » to look at one small division",
          studentInstructText: "There are 10 small divisions between each large numbered division."
        },
        page9: {
          headerText: "Every small division is 1 mm",
          instruction: "Tap » to check how many mm are in 1 cm",
          studentInstructText: "Look at any 2 small divisions next to one another, and they will have a distance of 1 millimeter or 1 mm between them, in all cm rulers!"
        },
        page10: {
          headerText: "How many mm in 1 cm?",
          instruction: "Tap the correct button as per the question",
          instructionAfterQuiz:'Tap » to measure a line segment using the ruler',
          studentInstructText: "How many millimeter (mm) are there in 1 centimeter (cm)?",
          quizPanel: {
            questionText: 'How many millimeter (mm) are there in 1 centimeter (cm)?',
            options: [
              {
                text: "1",
                iscorrect: false,
                feedback: "Oops! 10 small divisions make 1 large numbered division…",
              },
              {
                text: "10",
                iscorrect: true,
                feedback: "That’s Right! 10 small divisions (mm) make 1 large numbered division (cm)…",
              },
              {
                text: "100",
                iscorrect: false,
                feedback: "Oops! 10 small divisions make 1 large numbered division…",
              },
              
            ],
          }
        },
        page11: {
          headerText: "What is the length of the given line segment?",
          instruction: "Tap ‘1: Align…’ button",
          instructionAfterQuiz:'Tap » to measure a line segment using the ruler',
          findLengthext:"To find length of <span style='border-top:3px solid #ffff; padding-top:2px'>PQ:</span>",
          button1:"1: Align and place the ‘0’ marker of the ruler at one endpoint",
          button2:'2: Count the large divisions till the other endpoint.'
        },
        page12: {
          headerText: "Draw any line segment",
          instruction: "Drag across the grid to draw a line segment",
          studentInstructText: "Part of a line bound by 2 endpoints is called a line segment.<br/><br/>You can draw a line segment of your choice on the grid."
        },
         page13: {
          headerText: "Steps to measure length of line segment with ruler:",
          instruction: "Tap ‘1: Align…’ button",
          instructionAfterQuiz:'Tap » to measure a line segment using the ruler',
          findLengthext:"To find length of <span style='border-top:3px solid #ffff; padding-top:2px'>PQ:</span>",
          button1:"1: Align and place the ‘0’ marker of the ruler at one endpoint",
          button2:'2: Count the large divisions till the other endpoint.',
          button3:'3: If there is more distance, count the small divisions to the other endpoint'
        },
        page14: {
          headerText: "Measure of Line Segment AB using cm ruler:",
          instruction: "Tap » for length in mm alone",
          studentInstructText: "Length of <span style='border-top:3px solid #ffff; padding-top:2px'>AB</span><br/>= 13 cm and 7 mm"
        },
        page15: {
          headerText: "Measure of Line Segment AB using cm ruler:",
          instruction: "Tap » to summarise",
          studentInstructText: "Since 1 cm = 10 mm, we can also say length of <span style='border-top:3px solid #ffff; padding-top:2px'>AB</span><br/>= 13 × 10 + 7 mm<br/>= 137 mm"
        },
        page16: {
          title: "Measuring a line segment using cm ruler",
          mainText:
          "1: Align and place the ‘0’ marker<br/> of the ruler at one endpoint<br/><br/>2: Count the CENTIMETERS till<br/> the other endpoint from ‘0’.<br/><br/>3: If there is more distance, count the <br/>MILLIMETERS to the other endpoint<br/> from the CENTIMETER marker.<br/><br/>Report in ‘cm and mm’ or ‘mm’.",
          activityCompleted:'Activity Completed!',
        },
      },
    },

    id: {
      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang",
        start: "Mulai",
        showHint: "Tampilkan Petunjuk",
        hideHint: "Sembunyikan Petunjuk",
        color: "Warna",
        shape: "Bentuk",
        yes: "Ya",
        no: "Tidak",
      },

      appInfo: {
        title: "Menjelajahi Pola",
      },

      messages: {
        pageStatesCleared:
          "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
      },

      common: {
        propertyShowcase: {
          headerText: "Sifat-Sifat Jajar Genjang",
          headerDescription: "Menandai Sisi yang Sama",
          propertyNames: {
            sides: "Sisi",
            angles: "Sudut",
            diagonals: "Diagonal",
            symmetry: "Simetri",
          },
        },

        labels: {
          dropHere: "Letakkan di Sini",
        },

        tapAlt: "Ketuk",

        oppositeSidesEqualMessage: "Sisi yang berhadapan sama panjang!",
      },

      numberPad: {
        feedback: {
          empty: "Isi kotak yang disorot sebelum memeriksa",
        },
      },

      pages: {
        page1: {
          title: "Menjelajahi pola",
          mainText:
            "Hari ini kita akan menjelajahi pola dalam kehidupan nyata.",
          instructionText: "Ketuk ‘Mulai’ untuk memulai pelajaran.",
        },
        page2: {
          instruction: "Ketuk opsi yang benar.",
          instructionAfter: "Ketuk » untuk melanjutkan",
          dragInstruction: "Seret bentuk-bentuk ini ke kotak kosong yang benar.",
          hintText: "Bagian dari pola ini berulang lagi dan lagi. Ini adalah inti dari pola.",
          numberOfVertices: "Jumlah titik sudut",
          dayText: "Siang",
          nightText: "Malam",
          headerText: "Temukan yang berbeda.",
          questionText: "Amati polanya. Gambar mana yang tidak mengikuti pola?",
          fillBlanks: {
            instructionText: "Seret sisi yang benar ke pernyataan yang cocok di tabel",
            options: [
              {
                id: "opt1",
                image: "assets/circleOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt2",
                image: "assets/greenSquareOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt3",
                image: "assets/starOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt4",
                image: "assets/circleOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt5",
                image: "assets/greenSquareOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt6",
                image: "assets/starOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt7",
                image: "assets/redCircleOption.png",
                feedbackText: "Itu benar! Lingkaran yang dipilih berwarna merah sedangkan lingkaran lainnya berwarna biru.",
                isCorrect: true
              },
              {
                id: "opt8",
                image: "assets/greenSquareOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt9",
                image: "assets/starOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              }
            ],
            impFormulae: []
          },
          feedback: {
            correct: "Semua bentuk adalah lingkaran. Warnanya berubah lagi dan <br/>lagi—<br/><span style='background-color: #4F81BD;'>biru</span>, <span style='background-color: #C0504D;'>merah</span>, <span style='background-color: #4F81BD;'>biru</span>, <span style='background-color: #C0504D;'>merah</span>.",
            incorrect: "Semua bentuk sama. Tetapi warnanya berubah lagi dan lagi. Coba lagi!",
            emptyFeedback: "Isi kotak yang disorot sebelum memeriksa",
          },
        },
        page3: {
          instruction: "Ketuk opsi yang benar.",
          instructionAfter: "Ketuk » untuk melanjutkan",
          dragInstruction: "Seret bentuk-bentuk ini ke kotak kosong yang benar.",
          hintText: "Bagian dari pola ini berulang lagi dan lagi. Ini adalah inti dari pola.",
          numberOfVertices: "Jumlah titik sudut",
          dayText: "Siang",
          nightText: "Malam",
          headerText: "Temukan yang berbeda.",
          questionText: "Amati polanya. Gambar mana yang tidak mengikuti pola?",
          fillBlanks: {
            instructionText: "Seret sisi yang benar ke pernyataan yang cocok di tabel",
            options: [
              {
                id: "opt1",
                image: "assets/redCircleOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt2",
                image: "assets/circleOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt3",
                image: "assets/redCircleOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt4",
                image: "assets/greenCircleOption.png",
                feedbackText: "Lingkaran yang dipilih berwarna hijau sedangkan seharusnya lingkaran biru berada di posisi tersebut.",
                isCorrect: true
              },
              {
                id: "opt5",
                image: "assets/redCircleOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt6",
                image: "assets/circleOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt7",
                image: "assets/redCircleOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt8",
                image: "assets/circleOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt9",
                image: "assets/redCircleOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              }
            ],
            impFormulae: []
          },
          feedback: {
            correct: "Semua bentuk adalah lingkaran. Warnanya berubah lagi dan <br/>lagi—<br/><span style='background-color: #4F81BD;'>biru</span>, <span style='background-color: #C0504D;'>merah</span>, <span style='background-color: #4F81BD;'>biru</span>, <span style='background-color: #C0504D;'>merah</span>.",
            incorrect: "Semua bentuk sama. Tetapi warnanya berubah lagi dan lagi. Coba lagi!",
            emptyFeedback: "Isi kotak yang disorot sebelum memeriksa",
          },
        },
        page4: {
          instruction: "Ketuk opsi yang benar.",
          instructionAfter: "Ketuk » untuk melanjutkan",
          dragInstruction: "Seret bentuk-bentuk ini ke kotak kosong yang benar.",
          hintText: "Bagian dari pola ini berulang lagi dan lagi. Ini adalah inti dari pola.",
          numberOfVertices: "Jumlah titik sudut",
          dayText: "Siang",
          nightText: "Malam",
          headerText: "Temukan yang berbeda.",
          questionText: "Amati polanya. Gambar mana yang tidak mengikuti pola?",
          fillBlanks: {
            instructionText: "Seret sisi yang benar ke pernyataan yang cocok di tabel",
            options: [
              {
                id: "opt1",
                image: "assets/orangeCircle.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt2",
                image: "assets/greenSquareOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt3",
                image: "assets/starOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt4",
                image: "assets/orangeCircle.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt5",
                image: "assets/greenRightTriangle.png",
                feedbackText: "Bentuk yang dipilih adalah segitiga, padahal seharusnya persegi panjang berada di posisi tersebut.",
                isCorrect: true
              },
              {
                id: "opt6",
                image: "assets/starOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt7",
                image: "assets/orangeCircle.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt8",
                image: "assets/greenSquareOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt9",
                image: "assets/starOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              }
            ],
            impFormulae: []
          },
          feedback: {
            correct: "Semua bentuk adalah lingkaran. Warnanya berubah lagi dan <br/>lagi—<br/><span style='background-color: #4F81BD;'>biru</span>, <span style='background-color: #C0504D;'>merah</span>, <span style='background-color: #4F81BD;'>biru</span>, <span style='background-color: #C0504D;'>merah</span>.",
            incorrect: "Semua bentuk sama. Tetapi warnanya berubah lagi dan lagi. Coba lagi!",
            emptyFeedback: "Isi kotak yang disorot sebelum memeriksa",
          },
        },

        page5: {
          instruction: "Ketuk opsi yang benar.",
          instructionAfter: "Ketuk 'Mulai Lagi' untuk mengulang aktivitas ini.",
          dragInstruction: "Seret bentuk-bentuk ini ke kotak kosong yang benar.",
          hintText: "Bagian dari pola ini berulang lagi dan lagi. Ini adalah inti dari pola.",
          numberOfVertices: "Jumlah titik sudut",
          dayText: "Siang",
          nightText: "Malam",
          headerText: "Temukan yang berbeda.",
          questionText: "Amati polanya. Gambar mana yang tidak mengikuti pola?",
          fillBlanks: {
            instructionText: "Seret sisi yang benar ke pernyataan yang cocok di tabel",
            options: [
              {
                id: "opt1",
                image: "assets/orangetriangleOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt2",
                image: "assets/orangeCircle2.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt3",
                image: "assets/orangetriangleOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt4",
                image: "assets/orangetriangleOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt5",
                image: "assets/orangeCircle2.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt6",
                image: "assets/orangetriangleOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt7",
                image: "assets/lowerTriangle.png",
                feedbackText: "Bentuk yang dipilih adalah segitiga yang mengarah ke bawah, padahal seharusnya segitiga yang mengarah ke atas berada di posisi tersebut.",
                isCorrect: true
              },
              {
                id: "opt8",
                image: "assets/orangeCircle2.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              },
              {
                id: "opt9",
                image: "assets/orangetriangleOption.png",
                feedbackText: "Salah! Ini bukan yang berbeda.",
                isCorrect: false
              }
            ],
            impFormulae: []
          },
          feedback: {
            correct: "Semua bentuk adalah lingkaran. Warnanya berubah lagi dan <br/>lagi—<br/><span style='background-color: #4F81BD;'>biru</span>, <span style='background-color: #C0504D;'>merah</span>, <span style='background-color: #4F81BD;'>biru</span>, <span style='background-color: #C0504D;'>merah</span>.",
            incorrect: "Semua bentuk sama. Tetapi warnanya berubah lagi dan lagi. Coba lagi!",
            emptyFeedback: "Isi kotak yang disorot sebelum memeriksa",
          },
        },
      }
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
