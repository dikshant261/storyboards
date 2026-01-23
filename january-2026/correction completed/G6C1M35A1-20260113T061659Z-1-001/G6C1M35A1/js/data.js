// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlightColor1 = "#FFD700";
const highlightColor2 = "#70ACC7";
const highlightColor3 = "#B77FD0";
const highlightColor4 = "#F28283";
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
        previousButtonPage1: "Dispatched page change event to page 1",
        navigationReset: "Resetting to question 1",
        navigationComplete: "Complete app reset completed - ready for new question"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over"
      },

      common: {
        equationButtonText: "Distance they have travelled",
        questionText: "Mr. Arman and his family are on their way to Surabaya from Jakarta. The distance from Jakarta to Surabaya is 630 km. They have completed $\\frac{2}{5}$ of their journey. How many kilometers have they traveled?",
        questionIcon: "Q",
        jakarta: "Jakarta",
        surabaya: "Surabaya",
        labels: {
          dropHere: "Drop here"
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
              text: "Mr. Arman and his family are on their way to Surabaya from Jakarta.",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Mr. Arman and his family are traveling from Jakarta to Surabaya.",
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
          footerInstruction: "Tap » to identify 'given' information",
          highlights: [

            {
              text: "The distance from Jakarta to Surabaya is 630 km.",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Mr. Arman and his family are traveling from Jakarta to Surabaya.",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Jakarta — Surabaya = 630 km",
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
          footerInstruction: "Tap » to identify what we need 'to find'",
          highlights: [

            {
              text: "They have completed $\\frac{2}{5}$ of their journey.",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Mr. Arman and his family are traveling from Jakarta to Surabaya.",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Jakarta — Surabaya = 630 km",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Completed = $\\frac{2}{5}$ of their journey",
                size: highlightTextSize,
                color: highlightColor3
              }
            ],
            values: [
            ],
            toFind: [

            ]
          },


        },
        page5: {
          headerText: "Read the question and identify 'given' and 'to find'",
          footerInstruction: "Tap » to build the mathematical sentence",
          highlights: [

            {
              text: "How many kilometers have they traveled?",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Mr. Arman and his family are traveling from Jakarta to Surabaya.",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Jakarta — Surabaya = 630 km",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Completed = $\\frac{2}{5}$ of their journey",
                size: highlightTextSize,
                color: highlightColor3
              }
            ],
            values: [
            ],
            toFind: [
              {
                text: "Distance(in km) they have traveled",
                size: highlightTextSize,
                color: highlightColor4
              }
            ]
          },
        },
        page6: {
          headerText: "Build a mathematical sentence for the given scene",
          footerInstruction: "Drag the correct buttons to the correct spot in the sentence",
          instructionAfterQuiz: "Tap » to substitute values into the equation",
          equationText: {
            totalWeight: 'Total weight'
          },
          optionTextFillBlanks: {
            optionOpt1Text: "Total Distance",
            optionOpt2Text: "$\\frac{2}{5}$",
            optionOpt3Text: "of"
          },
          optionOpt1Feedback: "Correct! This is the distance from Komang to Yohana house.",
          optionOpt2Feedback: "Correct! This is the distance from Yohana to Lukas house.",
          optionPlusCorrectFeedback: "Correct!",
          optionMinusNotNeededFeedback: "This operator is not needed here."
        },
        page7: {
          headerText: "Build a mathematical sentence for the given scene",
          footerInstruction: "Tap » to continue.",
          equationText: {
            totalWeight: 'Total weight',
            javeneseSugar: "Javenese sugar weight",
            flourWeight: 'Flour weight',
          },
          fractionAddition: "This is a Fraction Multiplication and whole number chalenge!"
        },
        page8: {
          headerText: "Build a mathematical sentence for the given scene",
          footerInstruction: "Tap » to identify all the required information for the multiplication.",
          equationText: {
            totalWeight: 'Total weight',
            javeneseSugar: "Javenese sugar weight",
            flourWeight: 'Flour weight',
          },
          informationGathered: '<span style="color: #20B2AA;">&#10003;</span>\u00A0Information gathered from question.',
          nextStep: "Next - Information required to find answer."
        },
        page9: {
          headerText: "What is the correct order of steps for adding mixed numbers?",
          footerInstruction: "Choose the correct option",
          instructionAfterQuiz: "Tap » to continue.",
          quizPanel: {
            questionText: 'Tap the correct option to multiply a fraction by a whole number.',
            options: [
              {
                text: "Multiply the whole number by the denominator and keep the numerator the same.",
                iscorrect: false,
                feedback: "Check Again!",
              },
              {
                text: "Multiply the whole number by the numerator and keep the denominator the same.",
                iscorrect: true,
                feedback: "That's Correct!",
              },
              {
                text: "Multiply the whole number by both the numerator and the denominator.",
                iscorrect: false,
                feedback: "Check Again!",
              },
              {
                text: "None of these",
                iscorrect: false,
                feedback: "Check Again!",
              }
            ],
          }

        },
        page10: {
          headerText: "What is the correct formula for converting a improper fraction into an mixed number?",
          footerInstruction: "Tap » to multiply fraction and whole number using this information",
          solutionSteps: {
            headerText: "Fraction × whole number",
            steps: [
              {
                text: 'Multiplication',
                subSteps: [{
                  text: "Multiply the whole number by the numerator and keep the denominator the same."
                }]
              },
            ],
          },
          informationGathered: '<span style="color: #20B2AA;">&#10003;</span>\u00A0Information gathered from question.',
          stepsRequired: '<span style="color: #20B2AA;">&#10003;</span>\u00A0Information required to find answer',
          nextFinding: "Next - Finding the required Result",
        },
        page11: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the answer",
          instructionAfterQuiz: "Tap » to compute.",
          solutionSteps: {
            headerText: "Fraction × whole number",
            steps: [
              {
                text: 'Multiplication',
                subSteps: [{
                  text: "Multiply the whole number by the numerator and keep the denominator the same."
                }]
              },
            ],
          },
        },
        page12: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the answer",
          instructionAfterQuiz: "Tap » to summarize.",
          solutionSteps: {
            headerText: "Fraction × whole number",
            steps: [
              {
                text: 'Multiplication',
                subSteps: [{
                  text: "Multiply the whole number by the numerator and keep the denominator the same."
                }]
              },
            ],
          },
        },

        page13: {
          highlights: [
            {
              text: "How many kilometers have they traveled?",
              fontColor: highlightColor4,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          solutionSteps: {
            headerText: "Fraction × whole number",
            steps: [
              {
                text: 'Multiplication',
                subSteps: [{
                  text: "Multiply the whole number by the numerator and keep the denominator the same."
                }]
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
        previousButtonPage1: "Peristiwa perpindahan halaman ke halaman 1 telah dikirim",
        navigationReset: "Mengatur ulang ke soal 1",
        navigationComplete: "Reset aplikasi selesai - siap untuk soal baru"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang"
      },

      common: {
        equationButtonText: "Jarak yang telah ditempuh",
        questionText:
          "Pak Arman dan keluarganya sedang dalam perjalanan dari Jakarta ke Surabaya. Jarak dari Jakarta ke Surabaya adalah 630 km. Mereka telah menempuh $\\frac{2}{5}$ dari perjalanannya. Berapa kilometer yang telah mereka tempuh?",
        questionIcon: "T",
        jakarta: "Jakarta",
        surabaya: "Surabaya",
        labels: {
          dropHere: "Letakkan di sini"
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
        }
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
            "Mari kita cari jarak yang telah ditempuh dengan mengalikan jarak total dengan pecahan perjalanan yang sudah ditempuh.",
          headerText: "Bacalah soal dan identifikasi bagian 'diketahui' dan 'ditanyakan'",
          footerInstruction: "Ketuk » untuk mengidentifikasi informasi yang diketahui"
        },

        page2: {
          headerText: "Bacalah soal dan identifikasi bagian 'diketahui' dan 'ditanyakan'",
          footerInstruction: "Ketuk » untuk mengidentifikasi informasi yang diketahui",
          highlights: [
            {
              text: "Pak Arman dan keluarganya sedang dalam perjalanan dari Jakarta ke Surabaya.",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Pak Arman dan keluarganya bepergian dari Jakarta ke Surabaya.",
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
          footerInstruction: "Ketuk » untuk mengidentifikasi informasi yang diketahui",
          highlights: [
            {
              text: "Pak Arman dan keluarganya sedang dalam perjalanan dari Jakarta ke Surabaya.",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "Jarak dari Jakarta ke Surabaya adalah 630 km.",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Pak Arman dan keluarganya bepergian dari Jakarta ke Surabaya.",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Jakarta — Surabaya = 630 km",
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
          footerInstruction: "Ketuk » untuk mengidentifikasi apa yang harus dicari",
          highlights: [
            {
              text: "Pak Arman dan keluarganya sedang dalam perjalanan dari Jakarta ke Surabaya.",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "Jarak dari Jakarta ke Surabaya adalah 630 km.",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "Mereka telah menempuh $\\frac{2}{5}$ dari perjalanannya.",
              fontColor: highlightColor3,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Pak Arman dan keluarganya bepergian dari Jakarta ke Surabaya.",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Jakarta — Surabaya = 630 km",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Sudah ditempuh = $\\frac{2}{5}$ dari perjalanan",
                size: highlightTextSize,
                color: highlightColor3
              }
            ],
            values: [],
            toFind: []
          }
        },

        page5: {
          headerText: "Bacalah soal dan identifikasi bagian 'diketahui' dan 'ditanyakan'",
          footerInstruction: "Ketuk » untuk membangun kalimat matematika",
          highlights: [
            {
              text: "Pak Arman dan keluarganya sedang dalam perjalanan dari Jakarta ke Surabaya.",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "Jarak dari Jakarta ke Surabaya adalah 630 km.",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "Mereka telah menempuh $\\frac{2}{5}$ dari perjalanannya.",
              fontColor: highlightColor3,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "Berapa kilometer yang telah mereka tempuh?",
              fontColor: highlightColor4,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Pak Arman dan keluarganya bepergian dari Jakarta ke Surabaya.",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Jakarta — Surabaya = 630 km",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Sudah ditempuh = $\\frac{2}{5}$ dari perjalanan",
                size: highlightTextSize,
                color: highlightColor3
              }
            ],
            values: [],
            toFind: [
              {
                text: "Jarak (km) yang telah ditempuh",
                size: highlightTextSize,
                color: highlightColor4
              }
            ]
          }
        },

        page6: {
          headerText: "Buat kalimat matematika untuk situasi yang diberikan",
          footerInstruction: "Seret tombol yang benar ke tempat yang sesuai dalam kalimat",
          equationText: {
            totalWeight: "Jumlah total"
          },
          optionTextFillBlanks: {
            optionOpt1Text: "Jarak total Jakarta ke Surabaya",
            optionOpt2Text: "Bagian perjalanan yang sudah ditempuh"
          },
          optionOpt1Feedback: "Benar!",
          optionOpt2Feedback: "Benar!",
          optionPlusCorrectFeedback: "Benar!",
          optionMinusNotNeededFeedback: "Operator ini tidak diperlukan di sini."
        },

        page7: {
          headerText: "Buat kalimat matematika untuk situasi yang diberikan",
          footerInstruction: "Ketuk » untuk melanjutkan.",
          equationText: {
            totalWeight: "Jumlah total",
            javeneseSugar: "Berat gula Jawa",
            flourWeight: "Berat tepung"
          },
          fractionAddition: "Ini adalah tantangan perkalian pecahan!"
        },

        page8: {
          headerText: "Buat kalimat matematika untuk situasi yang diberikan",
          footerInstruction: "Ketuk » untuk mengidentifikasi semua langkah yang diperlukan",
          equationText: {
            totalWeight: "Jumlah total",
            javeneseSugar: "Berat gula Jawa",
            flourWeight: "Berat tepung"
          },
          informationGathered:
            '<span style="color: #20B2AA;">&#10003;</span>\u00A0Informasi telah dikumpulkan dari soal.',
          nextStep: "Selanjutnya – Langkah-langkah untuk menemukan jawaban."
        },

        page9: {
          headerText: "Apa urutan langkah yang benar untuk mengalikan bilangan dengan pecahan?",
          footerInstruction: "Susun tombol sesuai urutan langkah yang benar",
          instructionAfterQuiz: "Ketuk » untuk mengalikan bilangan yang disukai menggunakan langkah-langkah ini",
          steps: [
            "Kalikan bilangan bulat dengan pembilang",
            "Penyebut tetap sama"
          ]
        },

        page10: {
          headerText: "Apa rumus yang benar untuk mengubah pecahan tidak wajar menjadi bilangan campuran?",
          footerInstruction: "Ketuk » untuk melanjutkan dengan langkah-langkah berikut",
          solutionSteps: {
            headerText: "Perkalian Bilangan dengan Pecahan",
            steps: [
              {
                text: "Kalikan pecahan",
                subSteps: [
                  {
                    text: "Kalikan bilangan bulat dengan pembilang dan penyebut tetap sama."
                  }
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

        page11: {
          headerText: "Kerjakan langkahnya di buku catatanmu dan sebutkan jawabannya.",
          footerInstruction: "Ketuk '?' untuk melihat jawabannya",
          instructionRevealConversions: "Ketuk '?' untuk melihat jawaban",
          solutionSteps: {
            headerText: "Perkalian Bilangan dengan Pecahan",
            steps: [
              {
                text: "Kalikan pecahan",
                subSteps: [
                  {
                    text: "Kalikan bilangan bulat dengan pembilang dan penyebut tetap sama."
                  }
                ]
              }
            ]
          }
        },

        page12: {
          headerText: "Kerjakan langkahnya di buku catatanmu dan sebutkan jawabannya.",
          footerInstruction: "Ketuk '?' untuk melihat jawabannya",
          instructionRevealConversions: "Ketuk '?' untuk melihat jawaban",
          solutionSteps: {
            headerText: "Perkalian Bilangan dengan Pecahan",
            steps: [
              {
                text: "Kalikan pecahan",
                subSteps: [
                  {
                    text: "Kalikan bilangan bulat dengan pembilang dan penyebut tetap sama."
                  }
                ]
              }
            ]
          }
        },

        page13: {
          highlights: [
            {
              text: "Berapa kilometer yang telah mereka tempuh?",
              fontColor: highlightColor4,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          solutionSteps: {
            headerText: "Perkalian Bilangan dengan Pecahan",
            steps: [
              {
                text: "Kalikan pecahan",
                subSteps: [
                  {
                    text: "Kalikan bilangan bulat dengan pembilang dan penyebut tetap sama."
                  }
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
