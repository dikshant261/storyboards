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
        title: "Exploring pattern",
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
          title: "Exploring pattern",
          mainText:
            "Today we will Exploring the real life pattern.",
          instructionText: "Tap ‘Start’ to begin the lesson.",
        },
        page2: {
          instruction: "Tap the correct option.",
          instructionAfter: "Tap » to continue",
          dragInstruction: "Drag these shapes to the correct blank.",
          hintText: "This part of the pattern is repeating again and again. This is the core of the pattern.",
          numberOfVertices: "Number of vertices",
          dayText: "Day",
          nightText: "Night",
          headerText: "Find the odd one out.",
          questionText: "Observe the pattern. Which figure does not follow the pattern?",
          fillBlanks: {
            instructionText: "Drag the correct side to the matching statement in the table",
            options: [
              {
                id: "opt1",
                image: "assets/circleOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt2",
                image: "assets/greenSquareOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt3",
                image: "assets/starOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt4",
                image: "assets/circleOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt5",
                image: "assets/greenSquareOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt6",
                image: "assets/starOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt7",
                image: "assets/redCircleOption.png",
                feedbackText: "That is correct! The chosen circle is red where other circles are blue.",
                isCorrect: true
              },
              {
                id: "opt8",
                image: "assets/greenSquareOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt9",
                image: "assets/starOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              }
            ],
            impFormulae: []
          },
          feedback: {
            correct: "All the shapes are circles.The colors change again and <br/>again—<br/><span style='background-color: #4F81BD;'>blue</span>, <span style='background-color: #C0504D;'>red</span>, <span style='background-color: #4F81BD;'>blue</span>, <span style='background-color: #C0504D;'>red</span>.",
            incorrect: "All the shapes are same. But the colors are changing again and again. Try Again!",
            emptyFeedback: "Fill the highlighted box before checking",
          },
        },
        page3: {
          instruction: "Tap the correct option.",
          instructionAfter: "Tap » to continue",
          dragInstruction: "Drag these shapes to the correct blank.",
          hintText: "This part of the pattern is repeating again and again. This is the core of the pattern.",
          numberOfVertices: "Number of vertices",
          dayText: "Day",
          nightText: "Night",
          headerText: "Find the odd one out.",
          questionText: "Observe the pattern. Which figure does not follow the pattern?",
          fillBlanks: {
            instructionText: "Drag the correct side to the matching statement in the table",
            options: [
              {
                id: "opt1",
                image: "assets/redCircleOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt2",
                image: "assets/circleOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt3",
                image: "assets/redCircleOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt4",
                image: "assets/greenCircleOption.png",
                feedbackText: "The chosen circle is Green where blue circle should come in that place.",
                isCorrect: true
              },
              {
                id: "opt5",
                image: "assets/redCircleOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt6",
                image: "assets/circleOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt7",
                image: "assets/redCircleOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt8",
                image: "assets/circleOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt9",
                image: "assets/redCircleOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              }
            ],
            impFormulae: []
          },
          feedback: {
            correct: "All the shapes are circles.The colors change again and <br/>again—<br/><span style='background-color: #4F81BD;'>blue</span>, <span style='background-color: #C0504D;'>red</span>, <span style='background-color: #4F81BD;'>blue</span>, <span style='background-color: #C0504D;'>red</span>.",
            incorrect: "All the shapes are same. But the colors are changing again and again. Try Again!",
            emptyFeedback: "Fill the highlighted box before checking",
          },
        },
        page4: {
          instruction: "Tap the correct option.",
          instructionAfter: "Tap » to continue",
          dragInstruction: "Drag these shapes to the correct blank.",
          hintText: "This part of the pattern is repeating again and again. This is the core of the pattern.",
          numberOfVertices: "Number of vertices",
          dayText: "Day",
          nightText: "Night",
          headerText: "Find the odd one out.",
          questionText: "Observe the pattern. Which figure does not follow the pattern?",
          fillBlanks: {
            instructionText: "Drag the correct side to the matching statement in the table",
            options: [
              {
                id: "opt1",
                image: "assets/orangeCircle.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt2",
                image: "assets/greenSquareOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt3",
                image: "assets/starOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt4",
                image: "assets/orangeCircle.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt5",
                image: "assets/greenRightTriangle.png",
                feedbackText: "The chosen figure is a triangle where rectangle should come in that place.",
                isCorrect: true
              },
              {
                id: "opt6",
                image: "assets/starOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt7",
                image: "assets/orangeCircle.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt8",
                image: "assets/greenSquareOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt9",
                image: "assets/starOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              }
            ],
            impFormulae: []
          },
          feedback: {
            correct: "All the shapes are circles.The colors change again and <br/>again—<br/><span style='background-color: #4F81BD;'>blue</span>, <span style='background-color: #C0504D;'>red</span>, <span style='background-color: #4F81BD;'>blue</span>, <span style='background-color: #C0504D;'>red</span>.",
            incorrect: "All the shapes are same. But the colors are changing again and again. Try Again!",
            emptyFeedback: "Fill the highlighted box before checking",
          },
        },
        page5: {
          instruction: "Tap the correct option.",
          instructionAfter: "Tap 'Start Over' to re-do this activity.",
          dragInstruction: "Drag these shapes to the correct blank.",
          hintText: "This part of the pattern is repeating again and again. This is the core of the pattern.",
          numberOfVertices: "Number of vertices",
          dayText: "Day",
          nightText: "Night",
          headerText: "Find the odd one out.",
          questionText: "Observe the pattern. Which figure does not follow the pattern?",
          fillBlanks: {
            instructionText: "Drag the correct side to the matching statement in the table",
            options: [
              {
                id: "opt1",
                image: "assets/orangetriangleOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt2",
                image: "assets/orangeCircle2.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt3",
                image: "assets/orangetriangleOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt4",
                image: "assets/orangetriangleOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt5",
                image: "assets/orangeCircle2.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt6",
                image: "assets/orangetriangleOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt7",
                image: "assets/lowerTriangle.png",
                feedbackText: "The chosen figure is a triangle pointing down where triangle pointing up should come in that place.",
                isCorrect: true
              },
              {
                id: "opt8",
                image: "assets/orangeCircle2.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              },
              {
                id: "opt9",
                image: "assets/orangetriangleOption.png",
                feedbackText: "Incorrect! This is not the odd one.",
                isCorrect: false
              }
            ],
            impFormulae: []
          },
          feedback: {
            correct: "All the shapes are circles.The colors change again and <br/>again—<br/><span style='background-color: #4F81BD;'>blue</span>, <span style='background-color: #C0504D;'>red</span>, <span style='background-color: #4F81BD;'>blue</span>, <span style='background-color: #C0504D;'>red</span>.",
            incorrect: "All the shapes are same. But the colors are changing again and again. Try Again!",
            emptyFeedback: "Fill the highlighted box before checking",
          },
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
