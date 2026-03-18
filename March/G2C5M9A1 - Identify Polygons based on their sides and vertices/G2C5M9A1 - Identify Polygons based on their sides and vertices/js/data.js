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
        title: "Identify Polygons",
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
          title: "Identify Polygons",
          mainText:
            "Let us practice identifying polygons on<br/> the basis on number of sides and<br/> vertices.",
          instructionText: "Tap ‘Start’ to begin the lesson.",
        },
        page2: {
          instruction: "Tap the correct option",
          instructionAfter: "Tap ‘»’ to move to the next challenge",
          headerText: "Identify Polygons based on its SIDES",
          quizPanel: {
            quizSubType: "QT4",
            questionText: 'Which polygon has 5 sides?',
            options: [
              {
                image: 'assets/square.png',
                iscorrect: false,
                feedback: "Not Correct! Try Again!",
              },
              {
                image: 'assets/pentagon.png',
                iscorrect: true,
                feedback: "That’s Right! A PENTAGON has 5 sides!",
              },
              {
                image: 'assets/triangle.png',
                iscorrect: false,
                feedback: "Not Correct! Try Again!",
              },
              {
                image: 'assets/hexagon.png',
                iscorrect: false,
                feedback: "Not Correct! Try Again!",
              },

            ],
          }
        },
        page3: {
          instruction: "Tap the correct option",
          instructionAfter: "Tap ‘»’ to move to the next challenge",
          headerText: "Identify Polygons based on its SIDES",
          quizPanel: {
            quizSubType: "QT4",
            questionText: 'Which polygon has 3 sides?',
            options: [

              {
                image: 'assets/triangle.png',
                iscorrect: true,
                feedback: "That’s Right! A TRIANGLE has 3 sides!",
              },
              {
                image: 'assets/pentagon.png',
                iscorrect: false,
                feedback: "Not Correct! Try Again!",
              },
              {
                image: 'assets/rectangle.png',
                iscorrect: false,
                feedback: "Not Correct! Try Again!",
              },
              {
                image: 'assets/hexagon.png',
                iscorrect: false,
                feedback: "Not Correct! Try Again!",
              },

            ],
          }
        },
        page4: {
          instruction: "Tap the correct option",
          instructionAfter: "Tap ‘»’ to move to the next challenge",
          headerText: "Identify Polygons based on its SIDES",
          quizPanel: {
            quizSubType: "QT4",
            questionText: 'Which polygon has 4 sides?',
            options: [



              {
                image: 'assets/heptagon.png',
                iscorrect: false,
                feedback: "Not Correct! Try Again!",
              },
              {
                image: 'assets/octagon.png',
                iscorrect: false,
                feedback: "Not Correct! Try Again!",
              },
              {
                image: 'assets/trapezium.png',
                iscorrect: true,
                feedback: "That’s Right! A TRAPEZIUM has 4 sides!",
              },
              {
                image: 'assets/pentagon.png',
                iscorrect: false,
                feedback: "Not Correct! Try Again!",
              },
            ],
          }
        },
        page5: {
          instruction: "Tap the correct option",
          instructionAfter: "Tap ‘»’ to move to the next challenge",
          headerText: "Identify Polygons based on its SIDES",
          quizPanel: {
            quizSubType: "QT4",
            questionText: 'Which polygon has 6 sides?',
            options: [



              {
                image: 'assets/square.png',
                iscorrect: false,
                feedback: "Not Correct! Try Again!",
              },
              {
                image: 'assets/parallelogram.png',
                iscorrect: false,
                feedback: "Not Correct! Try Again!",
              },

              {
                image: 'assets/decagon.png',
                iscorrect: false,
                feedback: "Not Correct! Try Again!",
              },
              {
                image: 'assets/hexagon.png',
                iscorrect: true,
                feedback: "That’s Right! A HEXAGON has 6 sides!",
              },
            ],
          }
        },
        page6: {
          instruction: "Tap the correct option",
          instructionAfter: "Tap ‘»’ to move to the next challenge",
          headerText: "Identify Polygons based on its VERTICES",
          quizPanel: {
            quizSubType: "QT4",
            questionText: 'Which polygon has 4 vertices?',
            options: [
              {
                image: 'assets/square.png',
                iscorrect: true,
                feedback: "That’s right. A QUADRILATERAL has 4 vertices!",
              },
              {
                image: 'assets/pentagon.png',
                iscorrect: false,
                feedback: "Not Correct! Try Again!",
              },
              {
                image: 'assets/triangle.png',
                iscorrect: false,
                feedback: "Not Correct! Try Again!",
              },
              {
                image: 'assets/hexagon.png',
                iscorrect: false,
                feedback: "Not Correct! Try Again!",
              },

            ],
          }
        },
        page7: {
          instruction: "Tap the correct option",
          instructionAfter: "Tap ‘»’ to move to the next challenge",
          headerText: "Identify Polygons based on its VERTICES",
          quizPanel: {
            quizSubType: "QT4",
            questionText: 'Which polygon has 3 vertices?',
            options: [

              {
                image: 'assets/triangle.png',
                iscorrect: true,
                feedback: "That’s Right! A TRIANGLE has 3 vertices!",
              },

              {
                image: 'assets/rectangle.png',
                iscorrect: false,
                feedback: "Not Correct! Try Again!",
              },
              {
                image: 'assets/pentagon.png',
                iscorrect: false,
                feedback: "Not Correct! Try Again!",
              },
              {
                image: 'assets/hexagon.png',
                iscorrect: false,
                feedback: "Not Correct! Try Again!",
              },

            ],
          }
        },
        page8: {
          instruction: "Tap the correct option",
          instructionAfter: "Tap ‘»’ to move to the next challenge",
          headerText: "Identify Polygons based on its vertices",
          quizPanel: {
            quizSubType: "QT4",
            questionText: 'Which polygon has 5 vertices',
            options: [



              {
                image: 'assets/heptagon.png',
                iscorrect: false,
                feedback: "Not Correct! Try Again!",
              },
              {
                image: 'assets/octagon.png',
                iscorrect: false,
                feedback: "Not Correct! Try Again!",
              },
              {
                image: 'assets/trapezium.png',
                iscorrect: false,
                feedback: "Not Correct! Try Again!",
              },
              {
                image: 'assets/pentagon.png',
                iscorrect: true,
                feedback: "That’s Right! A PENTAGON has  5 vertices!",


              },
            ],
          }
        },
        page9: {
          instruction: "Tap the correct option",
          instructionAfter: "Tap ‘Start Over’ to practice again",
          headerText: "Identify Polygons based on its vertices",
          quizPanel: {
            quizSubType: "QT4",
            questionText: 'Which polygon has 7 vertices?',
            options: [
              {
                image: 'assets/square.png',
                iscorrect: false,
                feedback: "Not Correct! Try Again!",
              },
              {
                image: 'assets/hexagon.png',
                iscorrect: false,
                feedback: "Not Correct! Try Again!",
              },

              {
                image: 'assets/decagon.png',
                iscorrect: false,
                feedback: "Not Correct! Try Again!",
              },
              {
                image: 'assets/heptagon.png',
                iscorrect: true,
                feedback: "That’s Right! A HEPTAGON has 7 vertices!",
              },
            ],
          }
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
          title: "Mengidentifikasi Poligon",
          mainText:
            "Mari kita berlatih mengidentifikasi poligon berdasarkan<br/> jumlah sisi dan<br/> titik sudutnya.",
          instructionText: "Ketuk ‘Mulai’ untuk memulai pelajaran.",
        },
        page2: {
          instruction: "Ketuk jawaban yang benar",
          instructionAfter: "Ketuk ‘»’ untuk lanjut ke tantangan berikutnya",
          headerText: "Identifikasi Poligon berdasarkan SISI",
          quizPanel: {
            quizSubType: "QT4",
            questionText: 'Poligon manakah yang memiliki 5 sisi?',
            options: [
              {
                image: 'assets/square.png',
                iscorrect: false,
                feedback: "Tidak benar! Coba lagi!",
              },
              {
                image: 'assets/pentagon.png',
                iscorrect: true,
                feedback: "Benar! PENTAGON memiliki 5 sisi!",
              },
              {
                image: 'assets/triangle.png',
                iscorrect: false,
                feedback: "Tidak benar! Coba lagi!",
              },
              {
                image: 'assets/hexagon.png',
                iscorrect: false,
                feedback: "Tidak benar! Coba lagi!",
              },
            ],
          }
        },
        page3: {
          instruction: "Ketuk jawaban yang benar",
          instructionAfter: "Ketuk ‘»’ untuk lanjut ke tantangan berikutnya",
          headerText: "Identifikasi Poligon berdasarkan SISI",
          quizPanel: {
            quizSubType: "QT4",
            questionText: 'Poligon manakah yang memiliki 3 sisi?',
            options: [
              {
                image: 'assets/triangle.png',
                iscorrect: true,
                feedback: "Benar! SEGITIGA memiliki 3 sisi!",
              },
              {
                image: 'assets/pentagon.png',
                iscorrect: false,
                feedback: "Tidak benar! Coba lagi!",
              },
              {
                image: 'assets/rectangle.png',
                iscorrect: false,
                feedback: "Tidak benar! Coba lagi!",
              },
              {
                image: 'assets/hexagon.png',
                iscorrect: false,
                feedback: "Tidak benar! Coba lagi!",
              },
            ],
          }
        },
        page4: {
          instruction: "Ketuk jawaban yang benar",
          instructionAfter: "Ketuk ‘»’ untuk lanjut ke tantangan berikutnya",
          headerText: "Identifikasi Poligon berdasarkan SISI",
          quizPanel: {
            quizSubType: "QT4",
            questionText: 'Poligon manakah yang memiliki 4 sisi?',
            options: [
              {
                image: 'assets/heptagon.png',
                iscorrect: false,
                feedback: "Tidak benar! Coba lagi!",
              },
              {
                image: 'assets/octagon.png',
                iscorrect: false,
                feedback: "Tidak benar! Coba lagi!",
              },
              {
                image: 'assets/trapezium.png',
                iscorrect: true,
                feedback: "Benar! TRAPESIUM memiliki 4 sisi!",
              },
              {
                image: 'assets/pentagon.png',
                iscorrect: false,
                feedback: "Tidak benar! Coba lagi!",
              },
            ],
          }
        },
        page5: {
          instruction: "Ketuk jawaban yang benar",
          instructionAfter: "Ketuk ‘»’ untuk lanjut ke tantangan berikutnya",
          headerText: "Identifikasi Poligon berdasarkan SISI",
          quizPanel: {
            quizSubType: "QT4",
            questionText: 'Poligon manakah yang memiliki 6 sisi?',
            options: [
              {
                image: 'assets/square.png',
                iscorrect: false,
                feedback: "Tidak benar! Coba lagi!",
              },
              {
                image: 'assets/parallelogram.png',
                iscorrect: false,
                feedback: "Tidak benar! Coba lagi!",
              },
              {
                image: 'assets/decagon.png',
                iscorrect: false,
                feedback: "Tidak benar! Coba lagi!",
              },
              {
                image: 'assets/hexagon.png',
                iscorrect: true,
                feedback: "Benar! HEKSAGON memiliki 6 sisi!",
              },
            ],
          }
        },
        page6: {
          instruction: "Ketuk jawaban yang benar",
          instructionAfter: "Ketuk ‘»’ untuk lanjut ke tantangan berikutnya",
          headerText: "Identifikasi Poligon berdasarkan TITIK SUDUT",
          quizPanel: {
            quizSubType: "QT4",
            questionText: 'Poligon manakah yang memiliki 4 titik sudut?',
            options: [
              {
                image: 'assets/square.png',
                iscorrect: true,
                feedback: "Benar! SEGIEMPAT memiliki 4 titik sudut!",
              },
              {
                image: 'assets/pentagon.png',
                iscorrect: false,
                feedback: "Tidak benar! Coba lagi!",
              },
              {
                image: 'assets/triangle.png',
                iscorrect: false,
                feedback: "Tidak benar! Coba lagi!",
              },
              {
                image: 'assets/hexagon.png',
                iscorrect: false,
                feedback: "Tidak benar! Coba lagi!",
              },
            ],
          }
        },
        page7: {
          instruction: "Ketuk jawaban yang benar",
          instructionAfter: "Ketuk ‘»’ untuk lanjut ke tantangan berikutnya",
          headerText: "Identifikasi Poligon berdasarkan TITIK SUDUT",
          quizPanel: {
            quizSubType: "QT4",
            questionText: 'Poligon manakah yang memiliki 3 titik sudut?',
            options: [
              {
                image: 'assets/triangle.png',
                iscorrect: true,
                feedback: "Benar! SEGITIGA memiliki 3 titik sudut!",
              },
              {
                image: 'assets/rectangle.png',
                iscorrect: false,
                feedback: "Tidak benar! Coba lagi!",
              },
              {
                image: 'assets/pentagon.png',
                iscorrect: false,
                feedback: "Tidak benar! Coba lagi!",
              },
              {
                image: 'assets/hexagon.png',
                iscorrect: false,
                feedback: "Tidak benar! Coba lagi!",
              },
            ],
          }
        },
        page8: {
          instruction: "Ketuk jawaban yang benar",
          instructionAfter: "Ketuk ‘»’ untuk lanjut ke tantangan berikutnya",
          headerText: "Identifikasi Poligon berdasarkan titik sudut",
          quizPanel: {
            quizSubType: "QT4",
            questionText: 'Poligon manakah yang memiliki 5 titik sudut?',
            options: [
              {
                image: 'assets/heptagon.png',
                iscorrect: false,
                feedback: "Tidak benar! Coba lagi!",
              },
              {
                image: 'assets/octagon.png',
                iscorrect: false,
                feedback: "Tidak benar! Coba lagi!",
              },
              {
                image: 'assets/trapezium.png',
                iscorrect: false,
                feedback: "Tidak benar! Coba lagi!",
              },
              {
                image: 'assets/pentagon.png',
                iscorrect: true,
                feedback: "Benar! PENTAGON memiliki 5 titik sudut!",
              },
            ],
          }
        },
        page9: {
          instruction: "Ketuk jawaban yang benar",
          instructionAfter: "Ketuk ‘Mulai Ulang’ untuk berlatih lagi",
          headerText: "Identifikasi Poligon berdasarkan titik sudut",
          quizPanel: {
            quizSubType: "QT4",
            questionText: 'Poligon manakah yang memiliki 7 titik sudut?',
            options: [
              {
                image: 'assets/square.png',
                iscorrect: false,
                feedback: "Tidak benar! Coba lagi!",
              },
              {
                image: 'assets/hexagon.png',
                iscorrect: false,
                feedback: "Tidak benar! Coba lagi!",
              },
              {
                image: 'assets/decagon.png',
                iscorrect: false,
                feedback: "Tidak benar! Coba lagi!",
              },
              {
                image: 'assets/heptagon.png',
                iscorrect: true,
                feedback: "Benar! HEPTAGON memiliki 7 titik sudut!",
              },
            ],
          }
        },
      },
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
