// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlightColor1 = "#FFD700";
const highlightColor2 = "#70ACC7";
const highlightColor3 = "#F28283";
const highlightColor4 = "#00FF7F";
const highlightColor5 = '#8A2BE2';

const questionTextSize = '44gc';
const highlightTextSize = "28gc";

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
        check: "Check",
      },
      appInfo: {
        title: 'Rhombus garden — area of a rhombus'
      },
      parallelogramOneUnits: {
        nineUnits: "9 units",
        sevenUnits: "7 units",
        fourUnits: "4 units",
      },
      parallelogramTwoUnits: {
        twelveUnits: "12 units",
        sixUnits: "6 units",
        tenUnits: "10 units",
      },
      sqUnits: 'sq. units',
      messages: {
        pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?",
        navigationReset: "Resetting to question 1",
        navigationComplete: "Complete app reset completed - ready for new question",
      },
      numberPad: { feedback: { empty: "Enter some value" } },
      common: {
        questionText:
          "A garden is shaped like a rhombus. One diagonal is 12 m long, and the area of the garden is 96 m². What is the length of the other diagonal?",
        propertyShowcase: {
          headerText: "Properties of a Parallelogram",
          headerDescription: "A parallelogram is a <span style='color: #FF9900;'>quadrilateral</span>- it is a 4-sided polygon",

        },
        rhombus: {
          d1: "<span>d<sub>1</sub> = 12m</span>",
          areaOfGarden: 'Area  = 96 m²',
          d2: "<span>d<sub>2</sub> = ?</span>",
          d2Result: "<span>d<sub>2</sub> = 16 m</span>"
        },
        formula: {
          areaOfRhombus: 'Area of rhombus',
          equalTo: '=',
          half: '$\\frac{1}{2}$',
          diagonal1: '<span>d<sub>1</sub></span>',
          diagonal2: '<span>d<sub>2</sub></span>',
          area: '96 m²',
          m: 'm',
          allEquation: '$\\frac{2 \\times 96\\, \\mathrm{m}^{2}}{12\\, \\mathrm{m}}$'
        },
        tapAlt: "Tap",
        informationAnalysis: {
          header: "INFORMATION ANALYSIS",
          facts: "Facts",
          values: "Value",
          toFind: "To Find",
          findings: 'Findings'
        },
        conceptSummary: {
          header: "CONCEPT SUMMARY",
          given: "Given",
          toFind: "To Find",
          keyConcepts: "Key Concepts",
          importantFormulae: "Calculations"
        },
      },
      components: {
        informationAnalysis: {
          headerText: "INFORMATION ANALYSIS",
          factsTitle: "Facts",
          valueTitle: "Value",
          toFindTitle: "To Find",
          findings: 'Findings'
        },
        conceptSummary: {
          headerText: "CONCEPT SUMMARY",
          givenTitle: "Given",
          toFindTitle: "To Find",
          keyConceptsTitle: "Key Concepts",
          importantFormulaeTitle: "Calculations"
        }
      },
      pages: {
        page1: {
          title: "Practice Area of Parallelogram",
          mainText: "Let’s practice to identify the correct base-height pair to find the area of parallelograms.",
          instructionText: 'Tap ‘Start’ to begin the activity.',
        },
        page2: {
          headerText: "Let’s find the area of the given parallelogram.",
          instruction: "Tap »  to continue.",
        },
        page3: {
          headerText: "First, identify the correct base-height pair.",
          instruction: "Tap on the correct base–height pair.",
          instructionAfterQuiz: 'Tap » to continue.',
        },
        page4: {
          headerText: "Now, find the area of the given parallelogram.",
          instruction: "Tap »  to continue.",
          instructionAfterQuiz: 'Tap » to see another question.',
          messageBox: "Area of parallelogram  =  9 × 4",
          numpad: {
            feedback: {
              correct: "Correct!",
              incorrect: "Oops! Incorrect. Try Again!"
            }
          }
        },
        page5: {
          headerText: "Now, find the area of the given parallelogram.",
          instruction: "Use the numpad to fill the answer and click Check.",
          instructionAfterQuiz: 'Tap » to see another question.',
          messageBox: "Area of parallelogram  =  9 × 4 =",
          numpad: {
            feedback: {
              correct: "Correct!",
              incorrect: "Oops! Incorrect. Try Again!"
            }
          }
        },
        page6: {
          headerText: "Let’s find the area of the given parallelogram.",
          instruction: "Tap »  to continue.",
        },
        page7: {
          headerText: "First, identify the correct base-height pair.",
          instruction: "Tap on the correct base–height pair.",
          instructionAfterQuiz: 'Tap » to continue.',

        },
        page8: {
          headerText: "Now, find the area of the given parallelogram.",
          instruction: "Tap »  to continue.",
          instructionAfterQuiz: 'Tap » to see another question.',
          messageBox: "Area of parallelogram  =  12 × 6",
          numpad: {
            feedback: {
              correct: "Correct!",
              incorrect: "Oops! Incorrect. Try Again!"
            }
          }
        },
        page9: {
          headerText: "Now, find the area of the given parallelogram.",
          instruction: "Use the numpad to fill the answer and click Check.",
          instructionAfterQuiz: 'Tap » summarize.',
          messageBox: "Area of parallelogram  =  12 × 6 =",
          numpad: {
            feedback: {
              correct: "Correct!",
              incorrect: "Oops! Incorrect. Try Again!"
            }
          }
        },
        page10: {
          title: "Activity Completed!",
          mainText: "You identified the correct base-height pair and found the area of parallelograms.",
          instructionText: 'Tap ‘Start Over’ to restart the activity.',
        },
      },
    },

    id: {
      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang",
        start: "Mulai",
        check: "Periksa",
      },
      appInfo: {
        title: "Taman belah ketupat — luas belah ketupat"
      },
      messages: {
        pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
        navigationReset: "Mengatur ulang ke pertanyaan 1",
        navigationComplete: "Reset aplikasi selesai - siap untuk pertanyaan baru",
      },
      numberPad: { feedback: { empty: "Masukkan suatu nilai" } },
      common: {
        questionText:
          "Sebuah taman berbentuk belah ketupat. Salah satu diagonal panjangnya 12 m, dan luas taman adalah 96 m². Berapa panjang diagonal yang lain?",
        rhombus: {
          d1: "<span>d<sub>1</sub> = 12 m</span>",
          areaOfGarden: "Luas = 96 m²",
          d2: "<span>d<sub>2</sub> = ?</span>",
          d2Result: "<span>d<sub>2</sub> = 16 m</span>"
        },
        formula: {
          areaOfRhombus: "Luas belah ketupat",
          equalTo: "=",
          half: "$\\frac{1}{2}$",
          diagonal1: "<span>d<sub>1</sub></span>",
          diagonal2: "<span>d<sub>2</sub></span>",
          area: "96 m²",
          m: "m",
          allEquation: "$\\frac{2 \\times 96\\, \\mathrm{m}^{2}}{12\\, \\mathrm{m}}$"
        },
        informationAnalysis: {
          header: "ANALISIS INFORMASI",
          facts: "Fakta",
          values: "Nilai",
          toFind: "Yang dicari",
          findings: "Temuan"
        },
        conceptSummary: {
          header: "RINGKASAN KONSEP",
          given: "Diketahui",
          toFind: "Yang dicari",
          keyConcepts: "Konsep kunci",
          importantFormulae: "Perhitungan"
        },
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
        allSidesEqualMessage: "Semua sisi sama panjang!",
        rotationAngleLabel: "Sudut Rotasi",
      },
      components: {
        informationAnalysis: {
          headerText: "ANALISIS INFORMASI",
          factsTitle: "Fakta",
          valueTitle: "Nilai",
          toFindTitle: "Yang dicari",
          findings: "Temuan"
        },
        conceptSummary: {
          headerText: "RINGKASAN KONSEP",
          givenTitle: "Diketahui",
          toFindTitle: "Yang dicari",
          keyConceptsTitle: "Konsep kunci",
          importantFormulaeTitle: "Perhitungan"
        }
      },
      pages: {
        page1: {
          headerText: "Baca soal lalu tentukan informasi yang 'diketahui' dan yang 'akan dicari'.",
          footerInstruction: "Ketuk » untuk menemukan informasi yang 'diketahui'."
        },
        page2: {
          headerText: "Baca soal dan tentukan informasi yang 'diketahui' serta yang 'akan dicari'.",
          footerInstruction: "Ketuk » untuk menemukan informasi yang 'diketahui'.",
          highlights: [
            {
              text: "Sebuah taman berbentuk belah ketupat.",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [],
            values: [],
            toFind: [],
            findingsArray: [],
          }
        },
        page3: {
          headerText: "Baca soal dan tentukan informasi yang 'diketahui' serta yang 'akan dicari'.",
          footerInstruction: "Ketuk » untuk menemukan informasi yang 'diketahui'.",
          highlights: [
            {
              text: "Sebuah taman berbentuk belah ketupat.",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Bentuk yang diberikan pada soal adalah belah ketupat",
                size: highlightTextSize,
                color: highlightColor1
              }
            ],
            values: [],
            toFind: [],
            findingsArray: [],
          }
        },
        page4: {
          headerText: "Baca soal dan tentukan informasi yang 'diketahui' serta yang 'akan dicari'.",
          footerInstruction: "Ketuk » untuk menemukan informasi yang 'diketahui'.",
          highlights: [
            {
              text: "Sebuah taman berbentuk belah ketupat.",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Bentuk yang diberikan pada soal adalah belah ketupat",
                size: highlightTextSize,
                color: highlightColor1
              }
            ],
            values: [],
            toFind: [],
            findingsArray: [],
          }
        },
        page5: {
          headerText: "Baca soal dan tentukan informasi yang 'diketahui' serta yang 'akan dicari'.",
          footerInstruction: "Ketuk » untuk melanjutkan.",
          highlights: [
            {
              text: "Salah satu diagonal panjangnya 12 m",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Bentuk yang diberikan pada soal adalah belah ketupat",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: 'Diagonal 1 (<span>d<sub>1</sub></span>) = 12 m',
                size: highlightTextSize,
                color: highlightColor1
              }
            ],
            values: [],
            toFind: [],
            findingsArray: [],
          }
        },
        page6: {
          headerText: "Baca soal dan tentukan informasi yang 'diketahui' serta yang 'akan dicari'.",
          footerInstruction: "Ketuk » untuk menemukan informasi 'yang akan dicari'.",
          highlights: [
            {
              text: "luas taman adalah 96 m²",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Bentuk yang diberikan pada soal adalah belah ketupat",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: 'Diagonal 1 (<span>d<sub>1</sub></span>) = 12 m',
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: 'Luas taman = 96 m²',
                size: highlightTextSize,
                color: highlightColor1
              }
            ],
            values: [],
            toFind: [],
            findingsArray: [],
          }
        },
        page7: {
          headerText: "Baca soal dan tentukan informasi yang 'diketahui' serta yang 'akan dicari'.",
          footerInstruction: "Ketuk » untuk melanjutkan",
          highlights: [
            {
              text: "luas taman adalah 96 m²",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Bentuk yang diberikan pada soal adalah belah ketupat",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: 'Diagonal 1 (<span>d<sub>1</sub></span>) = 12 m',
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: 'Luas taman = 96 m²',
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: [],
            toFind: [
              {
                text: 'Diagonal 2 (<span>d<sub>2</sub></span>)',
                size: highlightTextSize,
                color: highlightColor1
              }
            ],
            findingsArray: [],
          }
        },
        page8: {
          footerInstruction: "Ketuk » untuk melanjutkan.",
          informationGathered: '<span style="color: #20B2AA;">&#10003;</span>\u00A0 <span style="color: #20B2AA;">Informasi yang diperoleh dari soal.</span>',
          nextStep: "Berikutnya — selesaikan masalah langkah demi langkah."
        },
        page9: {
          headerText: "Pertama, tentukan rumus yang benar untuk luas belah ketupat.",
          footerInstruction: "Pilih jawaban yang benar",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          quizPanel: {
            questionText: "Apa rumus luas belah ketupat?",
            options: [
              {
                text: "Luas = alas × tinggi",
                iscorrect: false,
                feedback: "Coba lagi!",
              },
              {
                text: "Luas = $\\frac{1}{2}$ × diagonal 1 × diagonal 2",
                iscorrect: true,
                feedback: "Benar!",
              },
              {
                text: "Luas = sisi²",
                iscorrect: false,
                feedback: "Coba lagi!",
              },
              {
                text: "Luas = 2(panjang + lebar)",
                iscorrect: false,
                feedback: "Coba lagi!",
              }
            ],
          }
        },
        page10: {
          headerText: "Sekarang substitusikan nilainya.",
          footerInstruction: "Ketuk teks yang disorot.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          highlights: [
            {
              text: "luas taman adalah 96 m²",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: 'Diagonal 1 (<span>d<sub>1</sub></span>) = 12 m',
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: 'Luas taman = 96 m²',
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: [],
            toFind: [
              {
                text: 'Diagonal 2 (<span>d<sub>2</sub></span>)',
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            findingsArray: [
              {
                text: 'Luas belah ketupat = $\\frac{1}{2}$ × <span>d<sub>1</sub></span> × <span>d<sub>2</sub></span>',
                size: highlightTextSize,
                color: highlightColor1
              }
            ],
          }
        },
        page11: {
          headerText: "Sekarang substitusikan nilainya.",
          footerInstruction: "Gunakan keypad angka untuk mengisi jawaban lalu ketuk Periksa.",
          instructionAfterQuiz: "Ketuk » untuk merangkum.",
          highlights: [
            {
              text: "luas taman adalah 96 m²",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: 'Diagonal 1 (<span>d<sub>1</sub></span>) = 12 m',
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: 'Luas taman = 96 m²',
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: [],
            toFind: [
              {
                text: 'Diagonal 2 (<span>d<sub>2</sub></span>)',
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            findingsArray: [
              {
                text: 'Luas belah ketupat = $\\frac{1}{2}$ × <span>d<sub>1</sub></span> × <span>d<sub>2</sub></span>',
                size: highlightTextSize,
                color: highlightColor1
              }
            ],
          },
          numpad: {
            tile1: {
              correct: "Bagus! Jawaban benar",
              inCorrect: "Ups! Coba lagi"
            }
          },
          feedback: {
            emptyFeedback: "Isi kotak yang disorot sebelum mengecek"
          }
        },
        page12: {
          headerText: "Sekarang substitusikan nilainya.",
          footerInstruction: "Ketuk 'Mulai Ulang' untuk mengulang aktivitas ini.",
          instructionAfterQuiz: "Ketuk » untuk merangkum.",
          highlights: [
            {
              text: "luas taman adalah 96 m²",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: 'Diagonal 1 (<span>d<sub>1</sub></span>) = 12 m',
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: 'Luas taman = 96 m²',
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: [],
            toFind: [
              {
                text: 'Diagonal 2 (<span>d<sub>2</sub></span>)',
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            findingsArray: [
              {
                text: 'Luas belah ketupat = $\\frac{1}{2}$ × <span>d<sub>1</sub></span> × <span>d<sub>2</sub></span>',
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
          },
          summaryText: 'Jadi, panjang diagonal yang lain adalah <span style="color: #efda16fe;">16 m.</span>'
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
