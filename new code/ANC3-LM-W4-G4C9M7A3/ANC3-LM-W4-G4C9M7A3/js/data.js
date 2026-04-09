// data.js - Internationalization data for the Ratio Learning Applet
// All user-facing text must be defined here for each language (en, id). No hardcoded
// English (or other language) in PageConfig.js or components; use getI18nText("key") with
// the key pointing to this file. Keep en and id in sync (same keys, translated values).

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
      },
      appInfo: {
        title: "Types of Lines"
      },
      messages: {
        pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?",
        navigationComplete: "Complete app reset completed - ready for new question",
        navigationReset: "Resetting to question 1",
      },

      common: {
        propertyShowcase: {
          headerText: "Properties of a Parallelogram",
          headerDescription: "Imagine folding this square piece of paper.",
          propertyNames: {
            sides: "Sides",
            angles: "Angles",
            diagonals: "Diagonals",
            symmetry: "Symmetry"
          }
        },
        tapAlt: "Tap",
        oppositeSidesEqualMessage: "Opposite sides are equal!",
        tapToContinue: "Tap » to continue",
      },

      pages: {
        page1: {
          title: "Classify Triangles by Angles",
          mainText: "Let's classify triangles by their angles by measuring each angle of the triangle using a protractor.",
          instructionText: "",
          tapToBegin: 'Tap "Start" to begin.',
        },
        page2: {
          instruction: "Drag the protractor to vertex C to measure ∠ABC",
          headerText: "Let's learn how to measure the length of any side of △ABC.",
          leftPanelHeader: "Equilateral Triangle",
          messageBox: "",
          solutionSteps: {
            headerText: "Steps to measure a side of △",
            steps: [
              "Center the Zero mark on the scale on any vertex.",
              "Rotate the scale to align parallel to the side to measure its length.",
              "Use the measurement markers to measure the side length."
            ]
          },
          protractorFlow: {
            stateC: {
              step1: "Drag the ruler to vertex B to measure the side BC",
              step2: "Align the ruler length along the side BC (blinking)",
              step3: "Now, measure the length of BC using the measurement marker",
              step4: "Tap anywhere to continue"
            },
            stateB: {
              step1: "Drag the ruler to vertex B to measure the side AB",
              step2: "Align the ruler length along the side AB (blinking)",
              step3: "Now, measure the length of AB using the measurement marker",
              step4: "Tap anywhere to continue"
            },
            stateA: {
              step1: "Drag the ruler to vertex A to measure the side AC",
              step2: "Align the ruler length along the side AC (blinking)",
              step3: "Now, measure the length of AC using the measurement marker",
              step4: "Tap anywhere to continue"
            }
          },
          quizPanel: {
            quizSubtype: "QT3",
            questionText: "How many lines of symmetry does the triangle have?",
            options: [
              {
                text: "0",
                iscorrect: false,
                feedback: "Not quite! Try tapping on the lines to see which ones are lines of symmetry."
              },
              {
                text: "2",
                iscorrect: false,
                feedback: "Not quite! Try tapping on the lines to see which ones are lines of symmetry."
              },
              {
                text: "3",
                iscorrect: true,
                feedback: "Well done! Equilateral triangles have 3 lines of symmetry."
              },
            ],
          }
        },
        page3: {
          instruction: "Choose the correct answer",
          headerText: "Now, classify the triangle by its sides.",
          leftPanelHeader: "Quadrilateral",
          messageBox: "",
          quizPanel: {
            quizSubtype: "QT3",
            questionText: "Please choose the correct type of triangle for the triangle whose sides we just measured",
            options: [
              {
                text: "Equilateral Triangle",
                iscorrect: false,
                feedback: "Incorrect. An equilateral triangle has all three sides equal."
              },
              {
                text: "Isosceles Triangle",
                iscorrect: false,
                feedback: "Incorrect. An isosceles triangle has exactly two sides equal."
              },
              {
                text: "Scalene Triangle",
                iscorrect: true,
                feedback: "Correct! A scalene triangle has no equal sides."
              },
            ],
          }
        },
        page4: {
          instruction: "Tap on a line to see if it's a line of symmetry, then answer the question.",
          headerText: "Lines of Symmetry in Shapes",
          leftPanelHeader: "Kite",
          messageBox: "",
          solutionSteps: {
            headerText: "Steps to measure an angle of △",
            steps: [
              "Center the protractor on any vertex.",
              "Rotate the protractor to align the 0° baseline with one arm of the angle.",
              "Move the slider to measure the angle."
            ]
          },
          quizPanel: {
            quizSubtype: "QT3",
            questionText: "How many lines of symmetry does the kite have?",
            options: [
              {
                text: "0",
                iscorrect: false,
                feedback: "Not quite! Try tapping on the lines to see which ones are lines of symmetry."
              },
              {
                text: "1",
                iscorrect: true,
                feedback: "Well done! A kite has 1 line of symmetry."
              },
              {
                text: "2",
                iscorrect: false,
                feedback: "Not quite! Try tapping on the lines to see which ones are lines of symmetry."
              },
            ],
          }
        },
        page5: {
          instruction: "Choose the correct answer",
          headerText: "Now, classify the triangle by its sides.",
          leftPanelHeader: "Rectangle",
          messageBox: "",
          solutionSteps: {
            headerText: "Steps to measure an angle of △",
            steps: [
              "Center the protractor on any vertex.",
              "Rotate the protractor to align the 0° baseline with one arm of the angle.",
              "Move the slider to measure the angle."
            ]
          },
          quizPanel: {
            quizSubtype: "QT3",
            questionText: "Please choose the correct type of triangle for the triangle whose sides we just measured",
            options: [
              {
                text: "Equilateral Triangle",
                iscorrect: false,
                feedback: "Incorrect. An equilateral triangle has all three sides equal."
              },
              {
                text: "Isosceles Triangle",
                iscorrect: true,
                feedback: "Correct! An isosceles triangle has exactly two sides equal."
              },
              {
                text: "Scalene Triangle",
                iscorrect: false,
                feedback: "Incorrect. A scalene triangle has no equal sides."
              },
            ],
          }
        },
        page6: {
          instruction: "Drag the scale to vertex C to measure side BC.",
          headerText: "Let's learn how to measure the angles of △ABC.",
          leftPanelHeader: "Rhombus",
          messageBox: "",
          solutionSteps: {
            headerText: "Steps to measure an angle of △",
            steps: [
              "Center the protractor on any vertex.",
              "Rotate the protractor to align the 0° baseline with one arm of the angle.",
              "Move the slider to measure the angle."
            ]
          },
          quizPanel: {
            quizSubtype: "QT3",
            questionText: "How many lines of symmetry does the rhombus have?",
            options: [
              {
                text: "0",
                iscorrect: false,
                feedback: "Not quite! Try tapping on the lines to see which ones are lines of symmetry."
              },
              {
                text: "2",
                iscorrect: true,
                feedback: "Well done! A rhombus has 2 lines of symmetry."
              },
              {
                text: "4",
                iscorrect: false,
                feedback: "Not quite! Try tapping on the lines to see which ones are lines of symmetry."
              },
            ],
          }
        },
        page7: {
          title: "Activity Completed!",
          headerText: "Now, classify the triangle by its sides.",
          mainText: "You practiced identifying lines of symmetry in different shapes.",
          instruction: "Choose the correct answer",
          instructionText: "Tap 'Start Over' to practice again!",
          quizPanel: {
            quizSubtype: "QT3",
            questionText: "Please choose the correct type of triangle for the triangle whose sides we just measured",
            options: [
              {
                text: "Equilateral Triangle",
                iscorrect: true,
                feedback: "Correct! An equilateral triangle has all three sides equal."
              },
              {
                text: "Isosceles Triangle",
                iscorrect: false,
                feedback: "Incorrect. An isosceles triangle has exactly two sides equal."
              },
              {
                text: "Scalene Triangle",
                iscorrect: false,
                feedback: "Incorrect. A scalene triangle has no equal sides."
              },
            ],
          },
        },
        page8: {
          headerText: "We classified the triangles based on their sides.",
          triangleLabels: {
            acute: "Scalene Triangle",
            right: "Isosceles Triangle",
            obtuse: "Equilateral Triangle"
          },
          instructionText: 'Tap "Start Over" to try the activity again.',
        },

      },
    },

    id: {
      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang",
        start: "Mulai",
      },
      appInfo: {
        title: "Jenis Garis"
      },
      messages: {
        pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
        navigationComplete: "Reset aplikasi lengkap selesai - siap untuk pertanyaan baru",
        navigationReset: "Mengatur ulang ke pertanyaan 1",
      },
      common: {
        propertyShowcase: {
          headerText: "Sifat-sifat Jajar Genjang",
          headerDescription: "Jajar genjang adalah <span style='color: #FF9900;'>segi empat</span>- yaitu poligon bersisi 4",
          propertyNames: {
            sides: "Sisi",
            angles: "Sudut",
            diagonals: "Diagonal",
            symmetry: "Simetri"
          }
        },
        tapAlt: "Ketuk",
        oppositeSidesEqualMessage: "Sisi-sisi yang berhadapan sama panjang!",
        tapToContinue: "Ketuk » untuk melanjutkan",
      },
      pages: {
        page1: {
          title: "Simetri Bentuk",
          mainText: "Bentuk yang berbeda memiliki jumlah garis simetri yang berbeda.",
          instructionText: "Mari kita identifikasi garis simetri.",
          tapToBegin: 'Ketuk "Mulai" untuk memulai.',
        },
        page2: {
          instruction: "Ketuk pada garis untuk melihat apakah itu garis simetri, lalu jawab pertanyaannya.",
          headerText: "Garis Simetri dalam Bentuk",
          leftPanelHeader: "Segitiga Sama Sisi",
          messageBox: "",
          solutionSteps: {
            headerText: "Langkah-langkah mengukur sudut △",
            steps: [
              "Pusatkan busur derajat pada salah satu titik sudut.",
              "Putar busur derajat untuk menyelaraskan garis dasar 0° dengan salah satu lengan sudut.",
              "Gerakkan slider untuk mengukur sudut."
            ]
          },
          protractorFlow: {
            stateC: {
              step1: "Seret busur derajat ke titik sudut C untuk mengukur ∠ACB",
              step2: "Selaraskan garis dasar busur derajat dengan sisi BC",
              step3: "Selaraskan lengan pengukuran (berkedip) dengan sisi AC",
              step4: "Klik pada pengukuran sudut yang benar di busur derajat"
            },
            stateB: {
              step1: "Seret penggaris ke titik sudut B untuk mengukur sisi AB",
              step2: "Selaraskan panjang penggaris dengan sisi AB (berkedip)",
              step3: "Sekarang, ukur panjang AB menggunakan penanda pengukuran",
              step4: "Klik pada pengukuran sudut yang benar di busur derajat"
            },
            stateA: {
              step1: "Seret busur derajat ke titik sudut A untuk mengukur ∠BAC",
              step2: "Selaraskan garis dasar busur derajat dengan sisi AB",
              step3: "Selaraskan lengan pengukuran (berkedip) dengan sisi AC",
              step4: "Klik pada pengukuran sudut yang benar di busur derajat"
            }
          },
          quizPanel: {
            quizSubtype: "QT3",
            questionText: "Berapa banyak garis simetri yang dimiliki segitiga?",
            options: [
              {
                text: "0",
                iscorrect: false,
                feedback: "Belum tepat! Coba ketuk pada garis untuk melihat mana yang merupakan garis simetri."
              },
              {
                text: "2",
                iscorrect: false,
                feedback: "Belum tepat! Coba ketuk pada garis untuk melihat mana yang merupakan garis simetri."
              },
              {
                text: "3",
                iscorrect: true,
                feedback: "Bagus! Segitiga sama sisi memiliki 3 garis simetri."
              },
            ],
          }
        },
        page3: {
          instruction: "Pilih jawaban yang benar",
          headerText: "Sekarang, klasifikasikan segitiga berdasarkan sisinya.",
          leftPanelHeader: "Segi Empat",
          messageBox: "",
          quizPanel: {
            quizSubtype: "QT3",
            questionText: "Silakan pilih jenis segitiga yang benar untuk segitiga yang sisinya baru saja kita ukur",
            options: [
              {
                text: "Segitiga Sama Sisi",
                iscorrect: false,
                feedback: "Salah. Segitiga sama sisi memiliki ketiga sisi sama panjang."
              },
              {
                text: "Segitiga Sama Kaki",
                iscorrect: false,
                feedback: "Salah. Segitiga sama kaki memiliki tepat dua sisi sama panjang."
              },
              {
                text: "Segitiga Sembarang",
                iscorrect: true,
                feedback: "Benar! Segitiga sembarang tidak memiliki sisi yang sama panjang."
              },
            ],
          }
        },
        page4: {
          instruction: "Ketuk pada garis untuk melihat apakah itu garis simetri, lalu jawab pertanyaannya.",
          headerText: "Garis Simetri dalam Bentuk",
          leftPanelHeader: "Layang-layang",
          messageBox: "",
          solutionSteps: {
            headerText: "Langkah-langkah mengukur sudut △",
            steps: [
              "Pusatkan busur derajat pada salah satu titik sudut.",
              "Putar busur derajat untuk menyelaraskan garis dasar 0° dengan salah satu lengan sudut.",
              "Gerakkan slider untuk mengukur sudut."
            ]
          },
          quizPanel: {
            quizSubtype: "QT3",
            questionText: "Berapa banyak garis simetri yang dimiliki layang-layang?",
            options: [
              {
                text: "0",
                iscorrect: false,
                feedback: "Belum tepat! Coba ketuk pada garis untuk melihat mana yang merupakan garis simetri."
              },
              {
                text: "1",
                iscorrect: true,
                feedback: "Bagus! Layang-layang memiliki 1 garis simetri."
              },
              {
                text: "2",
                iscorrect: false,
                feedback: "Belum tepat! Coba ketuk pada garis untuk melihat mana yang merupakan garis simetri."
              },
            ],
          }
        },
        page5: {
          instruction: "Pilih jawaban yang benar",
          headerText: "Sekarang, klasifikasikan segitiga berdasarkan sisinya.",
          leftPanelHeader: "Persegi Panjang",
          messageBox: "",
          solutionSteps: {
            headerText: "Langkah-langkah mengukur sudut △",
            steps: [
              "Pusatkan busur derajat pada salah satu titik sudut.",
              "Putar busur derajat untuk menyelaraskan garis dasar 0° dengan salah satu lengan sudut.",
              "Gerakkan slider untuk mengukur sudut."
            ]
          },
          quizPanel: {
            quizSubtype: "QT3",
            questionText: "Silakan pilih jenis segitiga yang benar untuk segitiga yang sisinya baru saja kita ukur",
            options: [
              {
                text: "Segitiga Sama Sisi",
                iscorrect: false,
                feedback: "Salah. Segitiga sama sisi memiliki ketiga sisi sama panjang."
              },
              {
                text: "Segitiga Sama Kaki",
                iscorrect: true,
                feedback: "Benar! Segitiga sama kaki memiliki tepat dua sisi sama panjang."
              },
              {
                text: "Segitiga Sembarang",
                iscorrect: false,
                feedback: "Salah. Segitiga sembarang tidak memiliki sisi yang sama panjang."
              },
            ],
          }
        },
        page6: {
          instruction: "Seret penggaris ke titik sudut C untuk mengukur sisi BC.",
          headerText: "Mari kita belajar mengukur sudut △ABC.",
          leftPanelHeader: "Belah Ketupat",
          messageBox: "",
          solutionSteps: {
            headerText: "Langkah-langkah mengukur sudut △",
            steps: [
              "Pusatkan busur derajat pada salah satu titik sudut.",
              "Putar busur derajat untuk menyelaraskan garis dasar 0° dengan salah satu lengan sudut.",
              "Gerakkan slider untuk mengukur sudut."
            ]
          },
          quizPanel: {
            quizSubtype: "QT3",
            questionText: "Berapa banyak garis simetri yang dimiliki belah ketupat?",
            options: [
              {
                text: "0",
                iscorrect: false,
                feedback: "Belum tepat! Coba ketuk pada garis untuk melihat mana yang merupakan garis simetri."
              },
              {
                text: "2",
                iscorrect: true,
                feedback: "Bagus! Belah ketupat memiliki 2 garis simetri."
              },
              {
                text: "4",
                iscorrect: false,
                feedback: "Belum tepat! Coba ketuk pada garis untuk melihat mana yang merupakan garis simetri."
              },
            ],
          }
        },
        page7: {
          title: "Aktivitas Selesai!",
          headerText: "Sekarang, klasifikasikan segitiga berdasarkan sisinya.",
          mainText: "Anda telah berlatih mengidentifikasi garis simetri dalam berbagai bentuk.",
          instruction: "Pilih jawaban yang benar",
          instructionText: "Ketuk 'Mulai Ulang' untuk berlatih lagi!",
          quizPanel: {
            quizSubtype: "QT3",
            questionText: "Silakan pilih jenis segitiga yang benar untuk segitiga yang sisinya baru saja kita ukur",
            options: [
              {
                text: "Segitiga Sama Sisi",
                iscorrect: true,
                feedback: "Benar! Segitiga sama sisi memiliki ketiga sisi sama panjang."
              },
              {
                text: "Segitiga Sama Kaki",
                iscorrect: false,
                feedback: "Salah. Segitiga sama kaki memiliki tepat dua sisi sama panjang."
              },
              {
                text: "Segitiga Sembarang",
                iscorrect: false,
                feedback: "Salah. Segitiga sembarang tidak memiliki sisi yang sama panjang."
              },
            ],
          },
        },
        page8: {
          headerText: "Kami mengklasifikasikan segitiga berdasarkan sisinya.",
          triangleLabels: {
            acute: "Segitiga Sembarang",
            right: "Segitiga Sama Kaki",
            obtuse: "Segitiga Sama Sisi"
          },
          instructionText: 'Ketuk "Mulai Ulang" untuk mencoba aktivitas lagi.',
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
