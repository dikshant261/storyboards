// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlightColor1 = "#FFD700";
const highlightColor2 = "#70ACC7";
const highlightColor3 = "#F28283";
const highlightColor4 = "#B77FD0";
const highlightColor5 = '#00FF7F';

const questionTextSize = '34gc';
const highlightTextSize = "28gc";

const AppData = {
  // Current language setting
  currentLanguage: "en",

  // Text content by language
  translations: {
    en: {
      appInfo: {
        title: "Ratio - Komodo Distance Comparison"
      },
      messages: {
        pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?",
        nextButtonPage2: "Dispatched page change event to page 2",
        previousButtonPage1: "Dispatched page change event to page 1"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over"
      },

      common: {
        equationButtonText: "Total number of sponge cakes can Rina make",
        questionText: "Rina has 6 kg of granulated sugar. She wants to make sponge cakes. Each sponge cake requires $\\frac{3}{4}$ kg of granulated sugar. How many sponge cakes can Rina make?",
        questionIcon: "Q",
        labels: {
          dropHere: "Drop here"
        },
        values: {
          sixKg: "6 kg",
          threeFourthsKg: "$\\frac{3}{4}$ kg",
          eightKg: "8 sponge cake",
          six: "6",
          eight: "8",
          threeFourths: "$\\frac{3}{4}$"
        },
        symbols: {
          questionMark: "?",
          equals: "=",
          division: "÷",
          multiplication: "×"
        },
        informationAnalysis: {
          header: "INFORMATION ANALYSIS",
          facts: "Facts",
          values: "Value",
          toFind: "To Find"
        },
        conceptSummary: {
          header: "CONCEPT SUMMARY",
          given: "Given",
          toFind: "To Find",
          keyConcepts: "Key Concepts",
          importantFormulae: "Calculations"
        },
        FractionOfCake: "Fraction of cake<br/>Tania friends ate",
        amountOfCake: 'Amount of cake <br/>Tania friends ate',
        amountOfCakeTaniaGave: "Amount of cake<br/>Tania gave to her<br/> friends"
      },

      components: {
        informationAnalysis: {
          headerText: "INFORMATION ANALYSIS",
          factsTitle: "Facts",
          valueTitle: "Value",
          toFindTitle: "To Find"
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
          highlights: [],
          instructionText: "Let's find out the distance from Yohana's house to Lukas's house by adding the mixed numbers and the fraction.",
          headerText: "Read the question and identify 'given' and 'to find'",
          footerInstruction: "Tap » to identify 'given' information"
        },
        page2: {
          headerText: "Read the question and identify 'given' and 'to find'",
          footerInstruction: "Tap » to identify 'given' information",
          highlights: [
            {
              text: "Rina has 6 kg of granulated sugar",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Rani has = 6 kg of granulated sugar",
                size: highlightTextSize,
                color: highlightColor1
              }
            ],
            values: [
            ],
            toFind: [
            ]
          }
        },
        page3: {
          headerText: "Read the question and identify 'given' and 'to find'",
          footerInstruction: "Tap » to identify what we need 'to find'",
          highlights: [

            {
              text: "Each sponge cake requires $\\frac{3}{4}$ kg of granulated sugar",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Rani has = 6 kg of granulated sugar",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Each sponge cake requires = $\\frac{3}{4}$ kg of granulated sugar",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: [
            ],
            toFind: [
            ]
          },
        },
        page4: {
          headerText: "Read the question and identify 'given' and 'to find'",
          footerInstruction: "Tap » to build the mathematical sentence",
          highlights: [

            {
              text: " How many sponge cakes can Rina make?",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Rani has = 6 kg of granulated sugar",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Each sponge cake requires = $\\frac{3}{4}$ kg of granulated sugar",
                size: highlightTextSize,
                color: highlightColor2
              },

            ],
            values: [

            ],
            toFind: [
              {
                text: "Total number of sponge cakes can Rina make",
                size: highlightTextSize,
                color: highlightColor3
              }
            ]
          },


        },

        page5: {
          headerText: "Build a mathematical sentence for the given scene",
          footerInstruction: "Drag the correct buttons to the correct spot in the sentence.",
          instructionAfterQuiz: "Tap » to substitute values into the equation",
          equationText: {
            totalWeight: 'Total weight'
          },
          optionTextFillBlanks: {
            optionOpt1Text: "Amount of granulated sugar Rani has",
            optionOpt2Text: 'Granulated Sugar required per sponge cake',
          }
        },
        page6: {
          headerText: "Build a mathematical sentence for the given scene",
          footerInstruction: "Tap » to continue.",
          equationText: {
            totalWeight: 'Total weight',
            javeneseSugar: "Javenese sugar weight",
            flourWeight: 'Flour weight',
          },
          fractionAddition: "This is a Fractions Division challenge!"
        },
        page7: {
          headerText: "Build a mathematical sentence for the given scene",
          footerInstruction: "Tap » to identify all the required steps for the division",
          equationText: {
            totalWeight: 'Total weight',
            javeneseSugar: "Javenese sugar weight",
            flourWeight: 'Flour weight',
          },
          informationGathered: '<span style="color: #20B2AA;">&#10003;</span>\u00A0Information gathered from question.',
          nextStep: "Next - Steps required to find answer."
        },
        page8: {
          headerText: "Tap and drag the options to arrange the steps in the correct order to divide fractions.",
          footerInstruction: "Rearrange the buttons to the correct sequence of steps",
          instructionAfterQuiz: "Tap » to continue.",
          steps: [

            "Change ÷ to ×.",
            "Take the reciprocal of the fraction.",
            "Multiply the two fractions."
          ],

        },
        page9: {
          headerText: "What is the correct formula for converting a improper fraction into an mixed number?",
          footerInstruction: "Tap » to divide fractions using these steps",
          solutionSteps: {
            headerText: "Fraction Division",
            steps: [
              {
                text: "Change ÷ to ×."
              },
              {
                text: "Take the reciprocal of the fraction."
              },
              {
                text: "Multiply the two fractions."
              },
            ],
          },
          informationGathered: '<span style="color: #20B2AA;">&#10003;</span>\u00A0Information gathered from question.',
          stepsRequired: '<span style="color: #20B2AA;">&#10003;</span>\u00A0Steps required to find answer',
          nextFinding: "Next - Finding the required Result",
        },
        page10: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the answer",
          instructionAfterQuiz: "Tap » to step 2",
          solutionSteps: {
            headerText: "Fraction Division",
            steps: [
              {
                text: "Change ÷ to ×."
              },
              {
                text: "Take the reciprocal of the fraction."
              },
              {
                text: "Multiply the two fractions."
              },
            ],
          },
        },
        page11: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the answer",
          instructionAfterQuiz: "Tap » to step 3",
          solutionSteps: {
            headerText: "Fraction Division",
            steps: [
              {
                text: "Change ÷ to ×."
              },
              {
                text: "Take the reciprocal of the fraction."
              },
              {
                text: "Multiply the two fractions."
              },
            ],
          },
        },
        page12: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the answer",
          instructionAfterQuiz: "Tap » to compute",
          solutionSteps: {
            headerText: "Fraction Division",
            steps: [
              {
                text: "Change ÷ to ×."
              },
              {
                text: "Take the reciprocal of the fraction."
              },
              {
                text: "Multiply the two fractions."
              },
            ],
          },
        },
        page13: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the answer",
          instructionAfterQuiz: "Tap » to summarize",
          solutionSteps: {
            headerText: "Fraction Division",
            steps: [
              {
                text: "Change ÷ to ×."
              },
              {
                text: "Take the reciprocal of the fraction."
              },
              {
                text: "Multiply the two fractions."
              },
            ],
          },
        },
        page14: {
          highlights: [
            {
              text: "How many sponge cakes can Rina make?",
              fontColor: highlightColor3,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          solutionSteps: {
            headerText: "Fraction Division",
            steps: [
              {
                text: "Change ÷ to ×."
              },
              {
                text: "Take the reciprocal of the fraction."
              },
              {
                text: "Multiply the two fractions."
              },
            ],
          },
          headerText: "Identify scene – Build Equation – Solve for unknown",
          footerInstruction: "Tap 'Start Over' to re-do activity"
        }
      },
    },
    id: {
      appInfo: {
        title: "Rasio - Perbandingan Jarak Komodo"
      },

      messages: {
        pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai kembali?",
        nextButtonPage2: "Peristiwa perpindahan halaman ke halaman 2 telah dikirim",
        previousButtonPage1: "Peristiwa perpindahan halaman ke halaman 1 telah dikirim"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang"
      },

      common: {
        equationButtonText: "Jumlah total bolu yang bisa dibuat Rina",
        questionText:
          "Rina memiliki 6 kg gula pasir. Ia ingin membuat bolu. Setiap bolu membutuhkan $\\frac{3}{4}$ kg gula pasir. Berapa banyak bolu yang dapat dibuat Rina?",
        questionIcon: "T",
        labels: {
          dropHere: "Letakkan di sini"
        },
        values: {
          sixKg: "6 kg",
          threeFourthsKg: "$\\frac{3}{4}$ kg",
          eightKg: "8 kg",
          six: "6",
          eight: "8",
          threeFourths: "$\\frac{3}{4}$"
        },
        symbols: {
          questionMark: "?",
          equals: "=",
          division: "÷",
          multiplication: "×"
        },
        informationAnalysis: {
          header: "ANALISIS INFORMASI",
          facts: "Fakta",
          values: "Nilai",
          toFind: "Ditanyakan"
        },
        conceptSummary: {
          header: "RINGKASAN KONSEP",
          given: "Diketahui",
          toFind: "Ditanyakan",
          keyConcepts: "Konsep Kunci",
          importantFormulae: "Perhitungan"
        },
        FractionOfCake: "Pecahan kue<br/>yang dimakan teman Tania",
        amountOfCake: "Jumlah kue<br/>yang dimakan teman Tania",
        amountOfCakeTaniaGave: "Jumlah kue<br/>yang Tania berikan<br/>kepada temannya"
      },

      components: {
        informationAnalysis: {
          headerText: "ANALISIS INFORMASI",
          factsTitle: "Fakta",
          valueTitle: "Nilai",
          toFindTitle: "Ditanyakan"
        },
        conceptSummary: {
          headerText: "RINGKASAN KONSEP",
          givenTitle: "Diketahui",
          toFindTitle: "Ditanyakan",
          keyConceptsTitle: "Konsep Kunci",
          importantFormulaeTitle: "Perhitungan"
        }
      },

      pages: {
        page1: {
          highlights: [],
          instructionText:
            "Mari kita cari berapa banyak bolu yang bisa dibuat Rina dengan membagi jumlah gula yang tersedia dengan gula yang dibutuhkan untuk setiap bolu.",
          headerText: "Bacalah soal dan identifikasi bagian 'diketahui' dan 'ditanyakan'",
          footerInstruction: "Ketuk » untuk mengidentifikasi informasi yang diketahui"
        },

        page2: {
          headerText: "Bacalah soal dan identifikasi bagian 'diketahui' dan 'ditanyakan'",
          footerInstruction: "Ketuk » untuk mengidentifikasi informasi yang diketahui",
          highlights: [
            {
              text: "Rina memiliki 6 kg gula pasir",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Rina memiliki = 6 kg gula pasir",
                size: highlightTextSize,
                color: highlightColor1
              }
            ],
            values: [],
            toFind: []
          }
        },

        page3: {
          headerText: "Bacalah soal dan identifikasi bagian 'diketahui' dan 'ditanyakan'",
          footerInstruction: "Ketuk » untuk mengidentifikasi apa yang harus dicari",
          highlights: [
            {
              text: "Rina memiliki 6 kg gula pasir",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "Setiap bolu membutuhkan $\\frac{3}{4}$ kg gula pasir",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Rina memiliki = 6 kg gula pasir",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Setiap bolu membutuhkan = $\\frac{3}{4}$ kg gula pasir",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: [],
            toFind: []
          }
        },

        page4: {
          headerText: "Bacalah soal dan identifikasi bagian 'diketahui' dan 'ditanyakan'",
          footerInstruction: "Ketuk » untuk membangun kalimat matematika",
          highlights: [
            {
              text: "Rina memiliki 6 kg gula pasir",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "Setiap bolu membutuhkan $\\frac{3}{4}$ kg gula pasir",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "Berapa banyak bolu yang dapat dibuat Rina?",
              fontColor: highlightColor3,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Rina memiliki = 6 kg gula pasir",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Setiap bolu membutuhkan = $\\frac{3}{4}$ kg gula pasir",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: [],
            toFind: [
              {
                text: "Jumlah total bolu yang bisa dibuat Rina",
                size: highlightTextSize,
                color: highlightColor3
              }
            ]
          }
        },

        page5: {
          headerText: "Buat kalimat matematika untuk situasi yang diberikan",
          footerInstruction: "Seret tombol yang benar ke tempat yang sesuai dalam kalimat.",
          equationText: {
            totalWeight: "Jumlah total"
          },
          optionTextFillBlanks: {
            optionOpt1Text: "Jumlah gula pasir yang dimiliki Rina",
            optionOpt2Text: "Gula pasir yang dibutuhkan per bolu"
          }
        },

        page6: {
          headerText: "Buat kalimat matematika untuk situasi yang diberikan",
          footerInstruction: "Ketuk » untuk melanjutkan.",
          equationText: {
            totalWeight: "Jumlah total",
            javeneseSugar: "Berat gula Jawa",
            flourWeight: "Berat tepung"
          },
          fractionAddition: "Ini adalah tantangan pembagian pecahan!"
        },

        page7: {
          headerText: "Buat kalimat matematika untuk situasi yang diberikan",
          footerInstruction: "Ketuk » untuk mengidentifikasi semua langkah yang diperlukan untuk pembagian",
          equationText: {
            totalWeight: "Jumlah total",
            javeneseSugar: "Berat gula Jawa",
            flourWeight: "Berat tepung"
          },
          informationGathered:
            '<span style="color: #20B2AA;">&#10003;</span>\u00A0Informasi telah dikumpulkan dari soal.',
          nextStep: "Selanjutnya – Langkah-langkah yang diperlukan untuk menemukan jawaban."
        },

        page8: {
          headerText: "Ketuk dan seret opsi untuk menyusun urutan langkah membagi pecahan.",
          footerInstruction: "Susun tombol sesuai urutan langkah yang benar",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          steps: ["Ubah ÷ menjadi ×.", "Ambil kebalikan (resiprok) pecahan.", "Kalikan kedua pecahan."]
        },

        page9: {
          headerText: "Apa rumus yang benar untuk mengubah pecahan tidak wajar menjadi bilangan campuran?",
          footerInstruction: "Ketuk » untuk melanjutkan dengan langkah-langkah berikut",
          solutionSteps: {
            headerText: "Pembagian Pecahan",
            steps: [
              {
                text: "Pembagian pecahan",
                subSteps: [
                  { text: "Ubah ÷ menjadi ×." },
                  { text: "Ambil kebalikan (resiprok) pecahan." },
                  { text: "Kalikan kedua pecahan." }
                ]
              }
            ]
          },
          informationGathered:
            '<span style="color: #20B2AA;">&#10003;</span>\u00A0Informasi telah dikumpulkan dari soal.',
          stepsRequired:
            '<span style="color: #20B2AA;">&#10003;</span>\u00A0Langkah-langkah telah ditentukan',
          nextFinding: "Selanjutnya – Menentukan hasil yang diminta"
        },

        page10: {
          headerText: "Kerjakan langkahnya di buku catatanmu dan sebutkan jawabannya.",
          footerInstruction: "Ketuk '?' untuk melihat jawaban",
          instructionRevealConversions: "Ketuk '?' untuk melihat jawaban setiap langkah",
          instructionAfterQuiz: "Ketuk » untuk menjelajahi langkah 3 lebih detail",
          solutionSteps: {
            headerText: "Pembagian Pecahan",
            steps: [
              {
                text: "Pembagian pecahan",
                subSteps: [
                  { text: "Ubah ÷ menjadi ×." },
                  { text: "Ambil kebalikan (resiprok) pecahan." },
                  { text: "Kalikan kedua pecahan." }
                ]
              }
            ]
          }
        },

        page11: {
          headerText: "Kerjakan langkahnya di buku catatanmu dan sebutkan jawabannya.",
          footerInstruction: "Ketuk '?' untuk melihat jawaban",
          instructionRevealConversions: "Ketuk '?' untuk melihat jawaban setiap langkah",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          solutionSteps: {
            headerText: "Pembagian Pecahan",
            steps: [
              {
                text: "Pembagian pecahan",
                subSteps: [
                  { text: "Ubah ÷ menjadi ×." },
                  { text: "Ambil kebalikan (resiprok) pecahan." },
                  { text: "Kalikan kedua pecahan." }
                ]
              }
            ]
          }
        },

        page12: {
          headerText: "Kerjakan langkahnya di buku catatanmu dan sebutkan jawabannya.",
          footerInstruction: "Ketuk '?' untuk melihat jawaban",
          instructionRevealConversions: "Ketuk '?' untuk melihat jawaban setiap langkah",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          solutionSteps: {
            headerText: "Pembagian Pecahan",
            steps: [
              {
                text: "Pembagian pecahan",
                subSteps: [
                  { text: "Ubah ÷ menjadi ×." },
                  { text: "Ambil kebalikan (resiprok) pecahan." },
                  { text: "Kalikan kedua pecahan." }
                ]
              }
            ]
          }
        },

        page13: {
          headerText: "Kerjakan langkahnya di buku catatanmu dan sebutkan jawabannya.",
          footerInstruction: "Ketuk '?' untuk melihat jawaban",
          instructionRevealConversions: "Ketuk '?' untuk melihat jawaban setiap langkah",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          solutionSteps: {
            headerText: "Pembagian Pecahan",
            steps: [
              {
                text: "Pembagian pecahan",
                subSteps: [
                  { text: "Ubah ÷ menjadi ×." },
                  { text: "Ambil kebalikan (resiprok) pecahan." },
                  { text: "Kalikan kedua pecahan." }
                ]
              }
            ]
          }
        },

        page14: {
          highlights: [
            {
              text: "Berapa banyak bolu yang dapat dibuat Rina?",
              fontColor: highlightColor3,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          solutionSteps: {
            headerText: "Pembagian Pecahan",
            steps: [
              {
                text: "Pembagian pecahan",
                subSteps: [
                  { text: "Ubah ÷ menjadi ×." },
                  { text: "Ambil kebalikan (resiprok) pecahan." },
                  { text: "Kalikan kedua pecahan." }
                ]
              }
            ]
          },
          headerText: "Identifikasi situasi – Buat Persamaan – Selesaikan",
          footerInstruction: "Ketuk 'Mulai Ulang' untuk mengulang aktivitas"
        }
      }
    }
  },
};

// Indonesian ('id') translations are defined explicitly above.

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
