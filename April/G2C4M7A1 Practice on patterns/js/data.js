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
          instruction: "Tap the shape to fill it in the box.",
          instructionAfter: "Tap » to continue",
          dragInstruction: "Drag these shapes to the correct blank.",
          hintText: "This part highlighted in the pattern is repeating again and again. This is the core of the pattern.",
          numberOfVertices: "Number of vertices",
          dayText: "Day",
          nightText: "Night",
          headerText: "Exploring pattern",
          questionText: "What comes next in this pattern?",
          fillBlanks: {
            instructionText: "Drag the correct side to the matching statement in the table",
            options: [
              {
                id: "opt1",
                image: "assets/circleOption.png",
                blankID: [{ bid: "blank2", image: "assets/circleOption.png" }],
                feedbackText: "Yes, pattern is: circle-star-circle-star…<br/>So, circle comes after star.",
                incorrectFeedback: 'Incorrect! The pattern is circle-star-circle-star…'
              },
              {
                id: "opt2",
                image: "assets/squareOption.png",
                feedbackText: "Correct! The horizontal side BC represents the distance from the observer on land to the fishing boat.",
                incorrectFeedback: 'Incorrect! The pattern is circle-star-circle-star…'

              },
              {
                id: "opt3",
                image: "assets/starOption.png",
                blankID: [{ bid: "blank1", image: "assets/starOption.png", }, { bid: "blank3", image: "assets/starOption.png", }],
                maxDrops: 2,
                feedbackText: "Yes, pattern is: circle-star-circle-star…<br/>So, star comes after circle.",
                incorrectFeedback: 'Incorrect! The pattern is circle-star-circle-star…'
              },
              {
                id: "opt4",
                image: "assets/pentagonOption.png",
                feedbackText: "Correct! The hypotenuse AC represents the distance from the observer on land to the tourist boat.",
                incorrectFeedback: 'Incorrect! The pattern is circle-star-circle-star…'
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
          instruction: "Tap the shape to fill it in the box.",
          instructionAfter: "Tap » to continue",
          dragInstruction: "Drag these shapes to the correct blank.",
          hintText: "This part highlighted in the pattern is repeating again and again. This is the core of the pattern.",
          numberOfVertices: "Number of vertices",
          dayText: "Day",
          nightText: "Night",
          headerText: "Exploring pattern",
          questionText: "What comes next in this pattern?",
          fillBlanks: {
            instructionText: "Drag the correct side to the matching statement in the table",
            options: [
              {
                id: "opt1",
                image: "assets/redCircleOption.png",
                blankID: [{ bid: "blank1", image: "assets/redCircleOption.png", }, { bid: "blank3", image: "assets/redCircleOption.png", }],
                maxDrops: 2,

                feedbackText: "Yes, pattern is: red-circle-blue-circle-red-circle-blue-circle…<br/>So, red circle comes after blue circle.",
                incorrectFeedback: 'Incorrect! The pattern is red-circle-blue-circle-red-circle-blue-circle…'
              },
              {
                id: "opt2",
                image: "assets/squareOption.png",
                feedbackText: "Correct! The horizontal side BC represents the distance from the observer on land to the fishing boat.",
                incorrectFeedback: 'Incorrect! The pattern is red-circle-blue-circle-red-circle-blue-circle…'

              },
              {
                id: "opt3",
                image: "assets/blueCircleOption.png",
                blankID: [{ bid: "blank2", image: "assets/blueCircleOption.png" }],

                feedbackText: "Yes, pattern is: red-circle-blue-circle-red-circle-blue-circle…<br/>So, blue circle comes after red circle.",
                incorrectFeedback: 'Incorrect! The pattern is red-circle-blue-circle-red-circle-blue-circle…'
              },
              {
                id: "opt4",
                image: "assets/pentagonOption.png",
                feedbackText: "Correct! The hypotenuse AC represents the distance from the observer on land to the tourist boat.",
                incorrectFeedback: 'Incorrect! The pattern is red-circle-blue-circle-red-circle-blue-circle…'
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
          instruction: "Tap the shape to fill it in the box.",
          instructionAfter: "Tap » to continue",
          dragInstruction: "Drag these shapes to the correct blank.",
          hintText: "This part highlighted in the pattern is repeating again and again. This is the core of the pattern.",
          numberOfVertices: "Number of vertices",
          dayText: "Day",
          nightText: "Night",
          headerText: "Exploring pattern",
          questionText: "What comes next in this pattern?",
          fillBlanks: {
            instructionText: "Drag the correct side to the matching statement in the table",
            options: [
              {
                id: "opt1",
                image: "assets/redSquareOption.png",
                blankID: [{ bid: "blank1", image: "redSquareOption" }],
                feedbackText: "Yes, pattern is: circle-square-star-circle-square-star…<br/>So, square comes after circle.",
                incorrectFeedback: "Incorrect! The pattern is circle-square-star-circle-square-star…"
              },
              {
                id: "opt2",
                image: "assets/pentagonOption.png",
                feedbackText: "Correct! The pattern follows: circle-square-star-circle-square-star…",
                incorrectFeedback: "Incorrect! The pattern is circle-square-star-circle-square-star…"
              },
              {
                id: "opt3",
                image: "assets/starOption.png",
                blankID: [{ bid: "blank2", image: "assets/starOption.png" }],
                feedbackText: "Yes, pattern is: circle-square-star-circle-square-star…<br/>So, star comes after square.",
                incorrectFeedback: "Incorrect! The pattern is circle-square-star-circle-square-star…"
              },
              {
                id: "opt4",
                image: "assets/yellowCircleOption.png",
                blankID: [{ bid: "blank3", image: "assets/yellowCircleOption.png" }],
                feedbackText: "Correct! The pattern repeats as: circle-square-star-circle-square-star…<br/>So, circle comes after star.",
                incorrectFeedback: "Incorrect! The pattern is circle-square-star-circle-square-star…"
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
          instruction: "Tap the shape to fill it in the box.",
          instructionAfter: "Tap 'Start Over' to re-do this activity.",
          dragInstruction: "Drag these shapes to the correct blank.",
          hintText: "This part highlighted in the pattern is repeating again and again. This is the core of the pattern.",
          numberOfVertices: "Number of vertices",
          dayText: "Day",
          nightText: "Night",
          headerText: "Exploring pattern",
          questionText: "What comes next in this pattern?",
          fillBlanks: {
            instructionText: "Drag the correct side to the matching statement in the table",
            options: [
              {
                id: "opt1",
                image: "assets/redSquareOption.png",
                feedbackText: "Yes, pattern is: circle-triangle-triangle-circle-triangle-triangle…<br/>So, triangle comes after circle.",
                incorrectFeedback: "Incorrect! The pattern is circle-triangle-triangle-circle-triangle-triangle…"
              },
              {
                id: "opt2",
                image: "assets/pentagonOption.png",
                feedbackText: "Correct! The pattern follows: circle-triangle-triangle-circle-triangle-triangle…",
                incorrectFeedback: "Incorrect! The pattern is circle-triangle-triangle-circle-triangle-triangle…"
              },
              {
                id: "opt3",
                image: "assets/yellowtriangleOption.png",
                blankID: [
                  { bid: "blank1", image: "assets/yellowtriangleOption.png" },
                  { bid: "blank2", image: "assets/yellowtriangleOption.png" }
                ],
                maxDrops: 2,
                feedbackText: "Yes, pattern is: circle-triangle-triangle-circle-triangle-triangle…<br/>So, another triangle comes after the first triangle.",
                incorrectFeedback: "Incorrect! The pattern is circle-triangle-triangle-circle-triangle-triangle…"
              },
              {
                id: "opt4",
                image: "assets/yellowCircleOption.png",
                blankID: [{ bid: "blank3", image: "assets/yellowCircleOption.png" }],
                feedbackText: "Correct! The pattern repeats as: circle-triangle-triangle-circle-triangle-triangle…<br/>So, circle comes after the second triangle.",
                incorrectFeedback: "Incorrect! The pattern is circle-triangle-triangle-circle-triangle-triangle…"
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
        page6: {
          title: "Exploring pattern",
          mainText:
            "Great!<br/><br/> Patterns can have both color and shape that repeat.",
          instructionText: "Tap ‘Start Over’ to re-do this activity.",
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
          headerText: "Sifat-sifat Jajar Genjang",
          headerDescription: "Menandai Sisi yang Sama Panjang",
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
            "Hari ini kita akan menjelajahi pola dalam kehidupan nyata.",
          instructionText: "Ketuk ‘Mulai’ untuk memulai pelajaran.",
        },
        page2: {
          instruction: "Ketuk pilihan yang benar.",
          instructionAfter: "Ketuk » untuk melanjutkan.",
          dragInstruction: "Seret bentuk ini ke kotak yang benar.",
          hintText: "Bagian yang disorot dalam pola ini berulang lagi dan lagi. Inilah inti dari pola tersebut.",
          numberOfVertices: "Jumlah titik sudut",
          dayText: "Siang",
          nightText: "Malam",
          headerText: "Menjelajahi Pola",
          questionText:
            "Amati polanya. Fitur apa dari pola tersebut yang berulang?",
          fillBlanks: {
            instructionText: "Seret sisi yang benar ke pernyataan yang cocok di tabel",
            options: [
              { id: "opt1", image: "assets/circleOption.png", blankID: [{ bid: "blank2", image: "assets/circleOption.png" }], feedbackText: "Ya, polanya: lingkaran-bintang-lingkaran-bintang…<br/>Jadi, lingkaran muncul setelah bintang.", incorrectFeedback: "Salah! Polanya lingkaran-bintang-lingkaran-bintang…" },
              { id: "opt2", image: "assets/squareOption.png", feedbackText: "Benar! Sisi mendatar BC mewakili jarak dari pengamat di darat ke perahu nelayan.", incorrectFeedback: "Salah! Polanya lingkaran-bintang-lingkaran-bintang…" },
              { id: "opt3", image: "assets/starOption.png", blankID: [{ bid: "blank1", image: "assets/starOption.png" }, { bid: "blank3", image: "assets/starOption.png" }], maxDrops: 2, feedbackText: "Ya, polanya: lingkaran-bintang-lingkaran-bintang…<br/>Jadi, bintang muncul setelah lingkaran.", incorrectFeedback: "Salah! Polanya lingkaran-bintang-lingkaran-bintang…" },
              { id: "opt4", image: "assets/pentagonOption.png", feedbackText: "Benar! Sisi miring AC mewakili jarak dari pengamat di darat ke perahu wisata.", incorrectFeedback: "Salah! Polanya lingkaran-bintang-lingkaran-bintang…" },
            ],
            impFormulae: [],
          },
          feedback: {
            correct:
              "Semua bentuk adalah lingkaran. Warna berubah lagi dan lagi—<br/><span style='background-color: #4F81BD;'>biru</span>, <span style='background-color: #C0504D;'>merah</span>, <span style='background-color: #4F81BD;'>biru</span>, <span style='background-color: #C0504D;'>merah</span>.",
            incorrect:
              "Semua bentuknya sama. Tetapi warnanya berubah lagi dan lagi. Coba lagi!",
            emptyFeedback: "Isi kotak yang disorot sebelum memeriksa",
          },
        },
        page3: {
          instruction: "Ketuk » untuk melanjutkan.",
          dragInstruction: "Seret bentuk ini ke kotak yang benar.",
          hintText: "Bagian yang disorot dalam pola ini berulang lagi dan lagi. Inilah inti dari pola tersebut.",
          headerText: "Menjelajahi Pola",
          questionText: "Ini adalah pola warna.",
          summaryText:
            "Dalam pola warna, warna berulang lagi dan lagi dalam urutan yang sama.",
          fillBlanks: {
            instructionText: "Seret sisi yang benar ke pernyataan yang cocok di tabel",
            options: [
              { id: "opt1", image: "assets/redCircleOption.png", blankID: [{ bid: "blank1", image: "assets/redCircleOption.png" }, { bid: "blank3", image: "assets/redCircleOption.png" }], maxDrops: 2, feedbackText: "Ya, polanya: merah-lingkaran-biru-lingkaran-merah-lingkaran-biru-lingkaran…<br/>Jadi, lingkaran merah muncul setelah lingkaran biru.", incorrectFeedback: "Salah! Polanya merah-lingkaran-biru-lingkaran-merah-lingkaran-biru-lingkaran…" },
              { id: "opt2", image: "assets/squareOption.png", feedbackText: "Benar! Sisi mendatar BC mewakili jarak dari pengamat di darat ke perahu nelayan.", incorrectFeedback: "Salah! Polanya merah-lingkaran-biru-lingkaran-merah-lingkaran-biru-lingkaran…" },
              { id: "opt3", image: "assets/blueCircleOption.png", blankID: [{ bid: "blank2", image: "assets/blueCircleOption.png" }], feedbackText: "Ya, polanya: merah-lingkaran-biru-lingkaran-merah-lingkaran-biru-lingkaran…<br/>Jadi, lingkaran biru muncul setelah lingkaran merah.", incorrectFeedback: "Salah! Polanya merah-lingkaran-biru-lingkaran-merah-lingkaran-biru-lingkaran…" },
              { id: "opt4", image: "assets/pentagonOption.png", feedbackText: "Benar! Sisi miring AC mewakili jarak dari pengamat di darat ke perahu wisata.", incorrectFeedback: "Salah! Polanya merah-lingkaran-biru-lingkaran-merah-lingkaran-biru-lingkaran…" },
            ],
            impFormulae: [],
          },
        },
        page4: {
          instruction: "Ketuk pilihan yang benar.",
          instructionAfter: "Ketuk » untuk melanjutkan.",
          dragInstruction: "Seret bentuk ini ke kotak yang benar.",
          hintText: "Bagian yang disorot dalam pola ini berulang lagi dan lagi. Inilah inti dari pola tersebut.",
          numberOfVertices: "Jumlah titik sudut",
          headerText: "Menjelajahi Pola",
          questionText:
            "Amati polanya. Fitur apa dari pola tersebut yang berulang?",
          fillBlanks: {
            instructionText: "Seret sisi yang benar ke pernyataan yang cocok di tabel",
            options: [
              { id: "opt1", image: "assets/redSquareOption.png", blankID: [{ bid: "blank1", image: "redSquareOption" }], feedbackText: "Ya, polanya: lingkaran-persegi-bintang-lingkaran-persegi-bintang…<br/>Jadi, persegi muncul setelah lingkaran.", incorrectFeedback: "Salah! Polanya lingkaran-persegi-bintang-lingkaran-persegi-bintang…" },
              { id: "opt2", image: "assets/pentagonOption.png", feedbackText: "Benar! Polanya: lingkaran-persegi-bintang-lingkaran-persegi-bintang…", incorrectFeedback: "Salah! Polanya lingkaran-persegi-bintang-lingkaran-persegi-bintang…" },
              { id: "opt3", image: "assets/starOption.png", blankID: [{ bid: "blank2", image: "assets/starOption.png" }], feedbackText: "Ya, polanya: lingkaran-persegi-bintang-lingkaran-persegi-bintang…<br/>Jadi, bintang muncul setelah persegi.", incorrectFeedback: "Salah! Polanya lingkaran-persegi-bintang-lingkaran-persegi-bintang…" },
              { id: "opt4", image: "assets/yellowCircleOption.png", blankID: [{ bid: "blank3", image: "assets/yellowCircleOption.png" }], feedbackText: "Benar! Polanya berulang: lingkaran-persegi-bintang-lingkaran-persegi-bintang…<br/>Jadi, lingkaran muncul setelah bintang.", incorrectFeedback: "Salah! Polanya lingkaran-persegi-bintang-lingkaran-persegi-bintang…" },
            ],
            impFormulae: [],
          },
          feedback: {
            correct:
              "Semua bangun berwarna kuning.<br/><br/>Bentuk berubah lagi dan lagi—<br/>segitiga-lingkaran-persegi<br/>segitiga-lingkaran-persegi",
            incorrect:
              "Semua warna bangun sama. Tetapi bentuknya berubah lagi dan lagi. Coba lagi!",
            emptyFeedback: "Isi kotak yang disorot sebelum memeriksa",
          },
        },
        page5: {
          instruction: "Ketuk » untuk melanjutkan.",
          dragInstruction: "Seret bentuk ini ke kotak yang benar.",
          hintText: "Bagian yang disorot dalam pola ini berulang lagi dan lagi. Inilah inti dari pola tersebut.",
          headerText: "Menjelajahi Pola",
          questionText: "Ini adalah pola bentuk.",
          summaryText:
            "Dalam pola bentuk, bentuk berulang lagi dan lagi dalam urutan yang sama.",
          fillBlanks: {
            instructionText: "Seret sisi yang benar ke pernyataan yang cocok di tabel",
            options: [
              { id: "opt1", image: "assets/redSquareOption.png", feedbackText: "Ya, polanya: lingkaran-segitiga-segitiga-lingkaran-segitiga-segitiga…<br/>Jadi, segitiga muncul setelah lingkaran.", incorrectFeedback: "Salah! Polanya lingkaran-segitiga-segitiga-lingkaran-segitiga-segitiga…" },
              { id: "opt2", image: "assets/pentagonOption.png", feedbackText: "Benar! Polanya: lingkaran-segitiga-segitiga-lingkaran-segitiga-segitiga…", incorrectFeedback: "Salah! Polanya lingkaran-segitiga-segitiga-lingkaran-segitiga-segitiga…" },
              { id: "opt3", image: "assets/yellowtriangleOption.png", blankID: [{ bid: "blank1", image: "assets/yellowtriangleOption.png" }, { bid: "blank2", image: "assets/yellowtriangleOption.png" }], maxDrops: 2, feedbackText: "Ya, polanya: lingkaran-segitiga-segitiga-lingkaran-segitiga-segitiga…<br/>Jadi, segitiga berikutnya muncul setelah segitiga pertama.", incorrectFeedback: "Salah! Polanya lingkaran-segitiga-segitiga-lingkaran-segitiga-segitiga…" },
              { id: "opt4", image: "assets/yellowCircleOption.png", blankID: [{ bid: "blank3", image: "assets/yellowCircleOption.png" }], feedbackText: "Benar! Polanya berulang: lingkaran-segitiga-segitiga-lingkaran-segitiga-segitiga…<br/>Jadi, lingkaran muncul setelah segitiga kedua.", incorrectFeedback: "Salah! Polanya lingkaran-segitiga-segitiga-lingkaran-segitiga-segitiga…" },
            ],
            impFormulae: [],
          },
        },
        page6: {
          instruction: "Ketuk pilihan yang benar.",
          instructionAfter: "Ketuk » untuk melanjutkan.",
          numberOfVertices: "Jumlah titik sudut",
          headerText: "Menjelajahi Pola",
          questionText:
            "Amati polanya. Fitur apa dari pola tersebut yang berulang?",
          feedback: {
            correct:
              "Baik bentuk maupun warna berulang lagi dan lagi.<br/><br/>Segitiga Oranye-<br/>Lingkaran Biru-<br/>Persegi Kuning…<br/>Berulang lagi dan lagi.",
            incorrect:
              "Semua warna bangun sama. Tetapi bentuknya berubah lagi dan lagi. Coba lagi!",
            emptyFeedback: "Isi kotak yang disorot sebelum memeriksa",
          },
        },
        page7: {
          instruction: "Ketuk 'Mulai Ulang' untuk mengulang kegiatan ini.",
          headerText: "Menjelajahi Pola",
          questionText: "Ini adalah pola bentuk.",
          summaryText:
            "Pola dapat memiliki warna dan bentuk yang berulang. Fitur lain seperti suara dan gerakan pada benda juga dapat membentuk pola.",
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
