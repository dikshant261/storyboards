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
          instruction: "Drag the shape to fill it in the box.",
          instructionAfter: "Tap » to continue",
          dragInstruction: "Drag these shapes to the correct blank.",
          hintText: "This part of the pattern is repeating again and again. This is the core of the pattern.",
          numberOfVertices: "Number of vertices",
          dayText: "Day",
          nightText: "Night",
          headerText: "Exploring pattern",
          questionText: "Observe the pattern. Which figure completes the pattern?",
          fillBlanks: {
            instructionText: "Drag the correct side to the matching statement in the table",
            options: [
              {
                id: "opt1",
                image: "assets/circleOption.png",
                blankID: [{ bid: "blank1", image: "assets/starOption.png", }],
                feedbackText: "That is correct! Pattern is:Circle-Square-Star-Circle-Square-Star.So, Circle comes after star.",
                incorrectFeedback: 'Incorrect! The pattern is Circle-Square-Star-Circle-Square-Star'
              },
              {
                id: "opt2",
                image: "assets/greenSquareOption.png",
                feedbackText: "Correct! The horizontal side BC represents the distance from the observer on land to the fishing boat.",
                incorrectFeedback: 'Incorrect! The pattern is Circle-Square-Star-Circle-Square-Star'

              },
              {
                id: "opt3",
                image: "assets/starOption.png",
                feedbackText: "Yes, pattern is: circle-star-circle-star…<br/>So, star comes after circle.",
                incorrectFeedback: 'Incorrect! The pattern is Circle-Square-Star-Circle-Square-Star'
              },
              {
                id: "opt4",
                image: "assets/pentagonOption.png",
                feedbackText: "Correct! The hypotenuse AC represents the distance from the observer on land to the tourist boat.",
                incorrectFeedback: 'Incorrect! The pattern is Circle-Square-Star-Circle-Square-Star'
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
          instruction: "Drag the shape to fill it in the box.",
          instructionAfter: "Tap » to continue",
          dragInstruction: "Drag these shapes to the correct blank.",
          hintText: "This part of the pattern is repeating again and again. This is the core of the pattern.",
          numberOfVertices: "Number of vertices",
          dayText: "Day",
          nightText: "Night",
          headerText: "Exploring pattern",
          questionText: "Observe the pattern. Which figure completes the pattern?",

          fillBlanks: {
            instructionText: "Drag the correct side to the matching statement in the table",
            options: [

              {
                id: "opt1",
                image: "assets/redCircleOption.png",
                feedbackText: "Yes, pattern is:red-circle-blue-circle…So, red-circle comes after blue-circle",
                incorrectFeedback: 'Incorrect! red-circle-blue-circle…'

              },
              {
                id: "opt2",
                image: "assets/circleOption.png",
                blankID: [{ bid: "blank1", image: "assets/circleOption.png", }],

                feedbackText: "Yes, pattern is : red-circle-blue-circle…So, blue circle comes after red circle.",
                incorrectFeedback: 'Incorrect! The pattern is red-circle-blue-circle-…'
              },
              {
                id: "opt3",
                image: "assets/starOption.png",
                feedbackText: "Yes, pattern is: circle-star-circle-star…<br/>So, star comes after circle.",
                incorrectFeedback: 'Incorrect! The pattern is red-circle-blue-circle…'
              },
              {
                id: "opt4",
                image: "assets/pentagonOption.png",
                feedbackText: "Correct! The hypotenuse AC represents the distance from the observer on land to the tourist boat.",
                incorrectFeedback: 'Incorrect! The pattern is red-circle-blue-circle…'
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
          instruction: "Drag the shape to fill it in the box.",
          instructionAfter: "Tap » to continue",
          dragInstruction: "Drag these shapes to the correct blank.",
          hintText: "This part of the pattern is repeating again and again. This is the core of the pattern.",
          numberOfVertices: "Number of vertices",
          dayText: "Day",
          nightText: "Night",
          headerText: "Exploring pattern",
          questionText: "Observe the pattern. Which figure completes the pattern?",
          fillBlanks: {
            instructionText: "Drag the correct side to the matching statement in the table",
            options: [
              {
                id: "opt1",
                image: "assets/orangeCircle.png",
                feedbackText: "Yes, pattern is:circle-star-circle-star…So, circle comes after star.",
                incorrectFeedback: 'Incorrect! The pattern is circle-square-star-…'
              },
              {
                id: "opt2",
                image: "assets/greenSquareOption.png",
                feedbackText: "Yes, pattern is:red-circle-blue-circle…So, red-circle comes after blue-circle",
                incorrectFeedback: 'Incorrect! The pattern is circle-square-star-…'

              },
              {
                id: "opt3",
                blankID: [{ bid: "blank1", image: "assets/starOption.png", }],
                image: 'assets/starOption.png',
                feedbackText: "Yes, pattern is: circle-square-star-…<br/>So, star comes after circle.",
                incorrectFeedback: 'Incorrect! The pattern is circle-square-star-…'
              },
              {
                id: "opt4",
                image: "assets/redSquareOption.png",
                feedbackText: "Correct! The hypotenuse AC represents the distance from the observer on land to the tourist boat.",
                incorrectFeedback: 'Incorrect! The pattern is circle-square-star-…'
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
          instruction: "Drag the shape to fill it in the box.",
          instructionAfter: "Tap 'Start Over' to re-do this activity.",
          dragInstruction: "Drag these shapes to the correct blank.",
          hintText: "This part of the pattern is repeating again and again. This is the core of the pattern.",
          numberOfVertices: "Number of vertices",
          dayText: "Day",
          nightText: "Night",
          headerText: "Exploring pattern",
          questionText: "Observe the pattern. Which figure completes the pattern?",
          fillBlanks: {
            instructionText: "Drag the correct side to the matching statement in the table",
            options: [
              {
                id: "opt1",
                image: "assets/orangeCircle2.png",
                feedbackText: "Yes, pattern is:circle-star-circle-star…So, circle comes after star.",
                incorrectFeedback: 'Incorrect! The pattern is triangle-circle-triangle-…'
              },
              {
                id: "opt2",
                image: "assets/greenSquareOption.png",
                feedbackText: "Yes, pattern is:red-circle-blue-circle…So, red-circle comes after blue-circle",
                incorrectFeedback: 'Incorrect! The pattern is triangle-circle-triangle-…'

              },

              {
                id: "opt3",
                image: "assets/orangeCircle.png",
                feedbackText: "Correct! The hypotenuse AC represents the distance from the observer on land to the tourist boat.",
                incorrectFeedback: 'Incorrect! The pattern is triangle-circle-triangle-…'
              },
              {
                id: "opt4",
                blankID: [{ bid: "blank1", image: "assets/orangetriangleOption.png", }],
                image: 'assets/orangetriangleOption.png',
                feedbackText: "Yes, pattern is: triangle-circle-triangle-…<br/>So, triangle comes after circle.",
                incorrectFeedback: 'Incorrect! The pattern is triangle-circle-triangle-…'
              },
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
          title: "Menjelajahi Pola",
          mainText:
            "Hari ini kita akan menjelajahi pola dalam kehidupan sehari-hari.",
          instructionText: "Ketuk ‘Mulai’ untuk memulai pelajaran.",
        },

        page2: {
          instruction: "Seret bentuk untuk mengisinya ke dalam kotak.",
          instructionAfter: "Ketuk » untuk melanjutkan",
          dragInstruction: "Seret bentuk-bentuk ini ke kotak yang benar.",
          hintText:
            "Bagian pola ini berulang lagi dan lagi. Ini adalah inti dari pola.",
          numberOfVertices: "Jumlah titik sudut",
          dayText: "Siang",
          nightText: "Malam",
          headerText: "Menjelajahi Pola",
          questionText:
            "Amati polanya. Gambar manakah yang melengkapi pola tersebut?",

          fillBlanks: {
            instructionText:
              "Seret sisi yang benar ke pernyataan yang sesuai pada tabel",

            options: [
              {
                id: "opt1",
                image: "assets/circleOption.png",
                blankID: [{ bid: "blank1", image: "assets/starOption.png" }],
                feedbackText:
                  "Benar! Polanya adalah: Lingkaran–Persegi–Bintang–Lingkaran–Persegi–Bintang. Jadi, lingkaran muncul setelah bintang.",
                incorrectFeedback:
                  "Salah! Polanya adalah Lingkaran–Persegi–Bintang–Lingkaran–Persegi–Bintang.",
              },

              {
                id: "opt2",
                image: "assets/greenSquareOption.png",
                feedbackText:
                  "Benar! Sisi horizontal BC menunjukkan jarak dari pengamat di darat ke perahu nelayan.",
                incorrectFeedback:
                  "Salah! Polanya adalah Lingkaran–Persegi–Bintang–Lingkaran–Persegi–Bintang.",
              },

              {
                id: "opt3",
                image: "assets/starOption.png",
                feedbackText:
                  "Ya, polanya adalah: lingkaran–bintang–lingkaran–bintang…<br/>Jadi, bintang muncul setelah lingkaran.",
                incorrectFeedback:
                  "Salah! Polanya adalah Lingkaran–Persegi–Bintang–Lingkaran–Persegi–Bintang.",
              },

              {
                id: "opt4",
                image: "assets/pentagonOption.png",
                feedbackText:
                  "Benar! Hipotenusa AC menunjukkan jarak dari pengamat di darat ke perahu wisata.",
                incorrectFeedback:
                  "Salah! Polanya adalah Lingkaran–Persegi–Bintang–Lingkaran–Persegi–Bintang.",
              },
            ],

            impFormulae: [],
          },
        },

        page3: {
          instruction: "Seret bentuk untuk mengisinya ke dalam kotak.",
          instructionAfter: "Ketuk » untuk melanjutkan",
          dragInstruction: "Seret bentuk-bentuk ini ke kotak yang benar.",
          hintText:
            "Bagian pola ini berulang lagi dan lagi. Ini adalah inti dari pola.",
          numberOfVertices: "Jumlah titik sudut",
          dayText: "Siang",
          nightText: "Malam",
          headerText: "Menjelajahi Pola",
          questionText:
            "Amati polanya. Gambar manakah yang melengkapi pola tersebut?",

          fillBlanks: {
            instructionText:
              "Seret sisi yang benar ke pernyataan yang sesuai pada tabel",

            options: [
              {
                id: "opt1",
                image: "assets/redCircleOption.png",
                feedbackText:
                  "Ya, polanya adalah: lingkaran merah–lingkaran biru… Jadi lingkaran merah muncul setelah lingkaran biru.",
                incorrectFeedback:
                  "Salah! Polanya adalah lingkaran merah–lingkaran biru…",
              },

              {
                id: "opt2",
                image: "assets/circleOption.png",
                blankID: [{ bid: "blank1", image: "assets/circleOption.png" }],
                feedbackText:
                  "Ya, polanya adalah: lingkaran merah–lingkaran biru… Jadi lingkaran biru muncul setelah lingkaran merah.",
                incorrectFeedback:
                  "Salah! Polanya adalah lingkaran merah–lingkaran biru…",
              },

              {
                id: "opt3",
                image: "assets/starOption.png",
                feedbackText:
                  "Ya, polanya adalah: lingkaran–bintang–lingkaran–bintang…<br/>Jadi, bintang muncul setelah lingkaran.",
                incorrectFeedback:
                  "Salah! Polanya adalah lingkaran merah–lingkaran biru…",
              },

              {
                id: "opt4",
                image: "assets/pentagonOption.png",
                feedbackText:
                  "Benar! Hipotenusa AC menunjukkan jarak dari pengamat di darat ke perahu wisata.",
                incorrectFeedback:
                  "Salah! Polanya adalah lingkaran merah–lingkaran biru…",
              },
            ],

            impFormulae: [],
          },
        },

        page4: {
          instruction: "Seret bentuk untuk mengisinya ke dalam kotak.",
          instructionAfter: "Ketuk » untuk melanjutkan",
          dragInstruction: "Seret bentuk-bentuk ini ke kotak yang benar.",
          hintText:
            "Bagian pola ini berulang lagi dan lagi. Ini adalah inti dari pola.",
          numberOfVertices: "Jumlah titik sudut",
          dayText: "Siang",
          nightText: "Malam",
          headerText: "Menjelajahi Pola",
          questionText:
            "Amati polanya. Gambar manakah yang melengkapi pola tersebut?",

          fillBlanks: {
            instructionText:
              "Seret sisi yang benar ke pernyataan yang sesuai pada tabel",

            options: [
              {
                id: "opt1",
                image: "assets/orangeCircle.png",
                feedbackText:
                  "Ya, polanya adalah: lingkaran–bintang–lingkaran–bintang… Jadi lingkaran muncul setelah bintang.",
                incorrectFeedback:
                  "Salah! Polanya adalah lingkaran–persegi–bintang…",
              },

              {
                id: "opt2",
                image: "assets/greenSquareOption.png",
                feedbackText:
                  "Ya, polanya adalah: lingkaran merah–lingkaran biru… Jadi lingkaran merah muncul setelah lingkaran biru.",
                incorrectFeedback:
                  "Salah! Polanya adalah lingkaran–persegi–bintang…",
              },

              {
                id: "opt3",
                blankID: [{ bid: "blank1", image: "assets/starOption.png" }],
                image: "assets/starOption.png",
                feedbackText:
                  "Ya, polanya adalah: lingkaran–persegi–bintang…<br/>Jadi bintang muncul setelah lingkaran.",
                incorrectFeedback:
                  "Salah! Polanya adalah lingkaran–persegi–bintang…",
              },

              {
                id: "opt4",
                image: "assets/redSquareOption.png",
                feedbackText:
                  "Benar! Hipotenusa AC menunjukkan jarak dari pengamat di darat ke perahu wisata.",
                incorrectFeedback:
                  "Salah! Polanya adalah lingkaran–persegi–bintang…",
              },
            ],

            impFormulae: [],
          },
        },

        page5: {
          instruction: "Seret bentuk untuk mengisinya ke dalam kotak.",
          instructionAfter:
            "Ketuk 'Mulai Ulang' untuk mengulangi aktivitas ini.",
          dragInstruction: "Seret bentuk-bentuk ini ke kotak yang benar.",
          hintText:
            "Bagian pola ini berulang lagi dan lagi. Ini adalah inti dari pola.",
          numberOfVertices: "Jumlah titik sudut",
          dayText: "Siang",
          nightText: "Malam",
          headerText: "Menjelajahi Pola",
          questionText:
            "Amati polanya. Gambar manakah yang melengkapi pola tersebut?",

          fillBlanks: {
            instructionText:
              "Seret sisi yang benar ke pernyataan yang sesuai pada tabel",

            options: [
              {
                id: "opt1",
                image: "assets/orangeCircle2.png",
                feedbackText:
                  "Ya, polanya adalah: lingkaran–bintang–lingkaran–bintang… Jadi lingkaran muncul setelah bintang.",
                incorrectFeedback:
                  "Salah! Polanya adalah segitiga–lingkaran–segitiga…",
              },

              {
                id: "opt2",
                image: "assets/greenSquareOption.png",
                feedbackText:
                  "Ya, polanya adalah: lingkaran merah–lingkaran biru… Jadi lingkaran merah muncul setelah lingkaran biru.",
                incorrectFeedback:
                  "Salah! Polanya adalah segitiga–lingkaran–segitiga…",
              },

              {
                id: "opt3",
                image: "assets/orangeCircle.png",
                feedbackText:
                  "Benar! Hipotenusa AC menunjukkan jarak dari pengamat di darat ke perahu wisata.",
                incorrectFeedback:
                  "Salah! Polanya adalah segitiga–lingkaran–segitiga…",
              },

              {
                id: "opt4",
                blankID: [{ bid: "blank1", image: "assets/orangetriangleOption.png" }],
                image: "assets/orangetriangleOption.png",
                feedbackText:
                  "Ya, polanya adalah: segitiga–lingkaran–segitiga…<br/>Jadi segitiga muncul setelah lingkaran.",
                incorrectFeedback:
                  "Salah! Polanya adalah segitiga–lingkaran–segitiga…",
              },
            ],

            impFormulae: [],
          },
        },
      }
    }


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
