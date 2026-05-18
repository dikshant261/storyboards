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
        title: "Finding Parallel and Perpendicular Lines",
      },
      messages: {
        pageStatesCleared:
          "Page states have been cleared. Reload the page to start fresh?",
        navigationReset: "Resetting to question 1",
        navigationComplete:
          "Complete app reset completed - ready for new question",
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
          title: "Properties of a Parallelogram",
          mainText:
            "Let's explore the side, angle, and diagonal properties of a parallelogram.",
          instructionText: 'Tap "Start" to start the activity.',
        },
        page6: {
          headerAfterQuiz: "Well done! Let's move on.",
        },
        page7: {
          conceptSummary: {
            completionText:
              "Dona's mom needs 4 cups of 250 ml to make 1000 ml",
          },
        },
        page8: {
          instructionAfterQuiz:
            "Tap » to explore the first step in more detail",
        },
        page9: {
          instructionAfterQuiz: "Tap » to continue",
        },
        page10: {
          instructionAfterQuiz: "Tap » to continue",
        },
        page11: {
          instructionAfterQuiz: "Tap » to compute the result.",
          feedbackTextbox: {
            text: "The length of <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">AC = 15</span>",
          },
        },
        page12: {
          instructionAfterQuiz: "Tap » to summarize",
        },
        page13: {
          instructionAfterQuiz: "Tap » to summarize",
          feedbackTextbox: {
            text: "We concluded that Dona's coffee doesn't taste the same as her mom's. It is sweeter as it has <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">more sugar</span>.",
          },
        },
        page2: {
          instruction: "Tap all the correct options",
          instructionAfter: "Tap ‘»’ to move to the next challenge",

          headerText: "Find the parallel lines",
          quizPanel: {
            quizSubType: "QT4R",
            questionText: '',
            options: [
              {
                text: "AB and CD",
                iscorrect: true,
                feedback: "Well done! That’s correct.",
              },
              {
                text: "AB and LM",
                iscorrect: false,
                feedback: "Oops! Not correct.",
              },
              {
                text: "CD and NO",
                iscorrect: false,
                feedback: "Oops! Not correct.",
              },
              {
                text: "LM and NO",
                iscorrect: true,
                feedback: "Well done! That’s correct.",
              },
            ],
          }
        },
        page3: {
          instruction: "Tap all the correct options",
          instructionAfter: "Tap ‘»’ to move to the next challenge",

          headerText: "Find the parallel lines",
          quizPanel: {
            quizSubType: "QT4R",
            questionText: '',
            options: [

              {
                text: "PQ and WX",
                iscorrect: false,
                feedback: "Oops! Not correct.",
              },
              {
                text: "RS and YZ",
                iscorrect: false,
                feedback: "Oops! Not correct.",
              },
              {
                text: "PQ and RS",
                iscorrect: true,
                feedback: "Well done! That’s correct.",
              },
              {
                text: "WX and YZ",
                iscorrect: true,
                feedback: "Well done! That’s correct.",
              },
            ],
          }
        },
        page4: {
          instruction: "Tap all the correct options",
          instructionAfter: "Tap ‘»’ to move to the next challenge",

          headerText: "Find the perpendicular lines",
          quizPanel: {
            quizSubType: "QT4R",
            questionText: '',
            options: [

              {
                text: "PQ and RS",
                iscorrect: false,
                feedback: "Oops! Not correct.",
              },
              {
                text: "YZ and PQ",
                iscorrect: true,
                feedback: "Well done! That’s correct.",
              },
              {
                text: "RS and YZ",
                iscorrect: true,
                feedback: "Well done! That’s correct.",
              },
              {
                text: "WX and PQ",
                iscorrect: false,
                feedback: "Oops! Not correct.",
              },
            ],
          }
        },
        page5: {
          instruction: "Tap all the correct options",
          instructionAfter: "Tap ‘Start Over’ to practice again",

          headerText: "Find the perpendicular lines",
          quizPanel: {
            quizSubType: "QT4R",
            questionText: '',
            options: [
              {
                text: "AB and NO",
                iscorrect: true,
                feedback: "Well done! That’s correct.",
              },
              {
                text: "AB and LM",
                iscorrect: true,
                feedback: "Well done! That’s correct.",
              },

              {
                text: "AB and CD",
                
              },
              {
                text: "LM and NO",
                iscorrect: false,
                feedback: "Oops! Not correct.",
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
        title: "Menemukan Garis Sejajar dan Tegak Lurus",
      },

      messages: {
        pageStatesCleared:
          "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
        navigationReset: "Mengatur ulang ke soal 1",
        navigationComplete:
          "Reset aplikasi selesai - siap untuk soal berikutnya",
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
          title: "Sifat-Sifat Jajar Genjang",
          mainText:
            "Mari kita jelajahi sifat sisi, sudut, dan diagonal pada jajar genjang.",
          instructionText: 'Ketuk "Mulai" untuk memulai aktivitas.',
        },
        page6: {
          headerAfterQuiz: "Bagus sekali! Mari lanjut.",
        },
        page7: {
          conceptSummary: {
            completionText:
              "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
          },
        },
        page8: {
          instructionAfterQuiz:
            "Ketuk » untuk menjelajahi langkah pertama lebih detail",
        },
        page9: {
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
        },
        page10: {
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
        },
        page11: {
          instructionAfterQuiz: "Ketuk » untuk menghitung hasilnya.",
          feedbackTextbox: {
            text: "Panjang <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">AC = 15</span>",
          },
        },
        page12: {
          instructionAfterQuiz: "Ketuk » untuk merangkum",
        },
        page13: {
          instructionAfterQuiz: "Ketuk » untuk merangkum",
          feedbackTextbox: {
            text: "Kita menyimpulkan bahwa kopi Dona rasanya tidak sama seperti kopi ibunya. Kopi Dona lebih manis karena memiliki <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">lebih banyak gula</span>.",
          },
        },
        page2: {
          instruction: "Ketuk semua pilihan yang benar",
          instructionAfter: "Ketuk ‘»’ untuk melanjutkan ke tantangan berikutnya",

          headerText: "Temukan garis sejajar",
          quizPanel: {
            quizSubType: "QT4R",
            questionText: '',
            options: [
              {
                text: "AB dan CD",
                iscorrect: true,
                feedback: "Bagus sekali! Itu benar.",
              },
              {
                text: "AB dan LM",
                iscorrect: false,
                feedback: "Ups! Tidak benar.",
              },
              {
                text: "CD dan NO",
                iscorrect: false,
                feedback: "Ups! Tidak benar.",
              },
              {
                text: "LM dan NO",
                iscorrect: true,
                feedback: "Bagus sekali! Itu benar.",
              },
            ],
          }
        },
        page3: {
          instruction: "Ketuk semua pilihan yang benar",
          instructionAfter: "Ketuk ‘»’ untuk melanjutkan ke tantangan berikutnya",

          headerText: "Temukan garis sejajar",
          quizPanel: {
            quizSubType: "QT4R",
            questionText: '',
            options: [
              {
                text: "PQ dan WX",
                iscorrect: false,
                feedback: "Ups! Tidak benar.",
              },
              {
                text: "RS dan YZ",
                iscorrect: false,
                feedback: "Ups! Tidak benar.",
              },
              {
                text: "PQ dan RS",
                iscorrect: true,
                feedback: "Bagus sekali! Itu benar.",
              },
              {
                text: "WX dan YZ",
                iscorrect: true,
                feedback: "Bagus sekali! Itu benar.",
              },
            ],
          }
        },
        page4: {
          instruction: "Ketuk semua pilihan yang benar",
          instructionAfter: "Ketuk ‘»’ untuk melanjutkan ke tantangan berikutnya",

          headerText: "Temukan garis tegak lurus",
          quizPanel: {
            quizSubType: "QT4R",
            questionText: '',
            options: [
              {
                text: "PQ dan RS",
                iscorrect: false,
                feedback: "Ups! Tidak benar.",
              },
              {
                text: "YZ dan PQ",
                iscorrect: true,
                feedback: "Bagus sekali! Itu benar.",
              },
              {
                text: "RS dan YZ",
                iscorrect: true,
                feedback: "Bagus sekali! Itu benar.",
              },
              {
                text: "WX dan PQ",
                iscorrect: false,
                feedback: "Ups! Tidak benar.",
              },
            ],
          }
        },
        page5: {
          instruction: "Ketuk semua pilihan yang benar",
          instructionAfter: "Ketuk ‘Mulai Ulang’ untuk berlatih lagi",

          headerText: "Temukan garis tegak lurus",
          quizPanel: {
            quizSubType: "QT4R",
            questionText: '',
            options: [
              {
                text: "AB dan NO",
                iscorrect: true,
                feedback: "Bagus sekali! Itu benar.",
              },
              {
                text: "AB dan LM",
                iscorrect: true,
                feedback: "Bagus sekali! Itu benar.",
              },
              {
                text: "AB dan CD",
                iscorrect: false,
                feedback: "Ups! Tidak benar.",
              },
              {
                text: "LM dan NO",
                iscorrect: true,
                feedback: "Bagus sekali! Itu benar.",
              },
            ],
          }
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
