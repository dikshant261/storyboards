// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlightColor1 = "#B77FD0";
const highlightColor2 = "#FFD700";
const highlightColor3 = "#70ACC7";
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
        nextButtonpage3: "Dispatched page change event to page 3",
        nextButtonpage4: "Dispatched page change event to page 4",
        nextButtonpage5: "Dispatched page change event to page 5",
        navigationReset: "Resetting to question 1",
        navigationComplete: "Complete app reset completed - ready for new question"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over"
      },

      common: {
        equationButtonText: "Fraction of whole cake Tania's friends ate",
        questionText: "Tania baked a cake and cut it into equal slices. She gave $\\frac{2}{3}$ of the cake to her friends. Later, her friends ate $\\frac{1}{2}$ of what Tania gave them. What fraction of the whole cake did her friends eat?",
        questionIcon: "Q",
        labels: {
          dropHere: "Drop here"
        },
        symbols: {
          questionMark: "?",
          equals: "=",
          multiply: "×",
          divide: "÷"
        },
        imageAlt: {
          tap: "Tap"
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
              text: "Tania baked a cake and cut it into equal slices.",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Tania baked a cake and cut it into pieces.",
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
              text: "She gave $\\frac{2}{3}$ of the cake to her friends",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Tania baked a cake and cut it into pieces.",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Amount of the cake Tania gave to her friends = $\\frac{2}{3}$ of the whole cake",
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
              text: "her friends ate $\\frac{1}{2}$ of what Tania gave them",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Tania baked a cake and cut it into pieces.",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Amount of the cake Tania gave to her friends = $\\frac{2}{3}$ of the whole cake",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Amount of the cake Tania friends ate = $\\frac{1}{2}$of the cake Tania gave",
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
              text: "What fraction of the whole cake did her friends eat?",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Tania baked a cake and cut it into pieces.",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Amount of the cake Tania gave to her friends = $\\frac{2}{3}$ of the whole cake",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Amount of the cake Tania friends ate = $\\frac{1}{2}$of the cake Tania gave",
                size: highlightTextSize,
                color: highlightColor3
              }
            ],
            values: [
            ],
            toFind: [
              {
                text: "Fraction of the whole cake Tania’s friends ate",
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
            optionOpt1Text: "Amount of cake Tania gave to her friends",
            optionOpt2Text: "Amount of cake Tania's friends ate from what she gave",
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
          fractionAddition: "This is a Fractions Multiplication challenge!"
        },
        page8: {
          headerText: "Build a mathematical sentence for the given scene",
          footerInstruction: "Tap » to identify all the required information for the multiplication",
          equationText: {
            totalWeight: 'Total weight',
            javeneseSugar: "Javenese sugar weight",
            flourWeight: 'Flour weight',
          },
          informationGathered: '<span style="color: #20B2AA;">&#10003;</span>\u00A0Information gathered from question.',
          nextStep: "Next - information required to find answer."
        },
        page9: {
          headerText: "Tap and drag the options to arrange the steps in the correct order to multiply unlike fractions.",
          footerInstruction: "Choose the correct option",
          instructionAfterQuiz: "Tap » to continue",
          quizPanel: {
            questionText: 'Tap the correct option to multiply two fractions.',
            options: [
              {
                text: "Multiply the denominators together and keep the numerator the same.",
                iscorrect: false,
                feedback: "Check Again!",
              },
              {
                text: "Multiply the numerators together and keep the denominator the same.",
                iscorrect: false,
                feedback: "Check Again!",
              },
              {
                text: "Multiply the numerators together and multiply the denominators together.",
                iscorrect: true,
                feedback: "That's Correct!",
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
          footerInstruction: "Tap » to multiplication of fraction using this information",
          solutionSteps: {
            headerText: "Fraction Multiplication",
            steps: [
              {
                text: 'Multiply fraction',
                subSteps: [{
                  text: "Multiply the numerators together and multiply the denominators together."
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
          footerInstruction: "Tap '?' to reveal the answer.",
          instructionAfterQuiz: "Tap » to compute",
          solutionSteps: {
            headerText: "Fraction Multiplication",
            steps: [
              {
                text: 'Multiply fraction',
                subSteps: [{
                  text: "Multiply the numerators together and multiply the denominators together."
                }]
              },
            ],
          },
        },
        page12: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the answer",
                    instructionAfterQuiz: "Tap » to summarize",

          solutionSteps: {
            headerText: "Fraction Multiplication",
            steps: [
              {
                text: 'Multiply fraction',
                subSteps: [{
                  text: "Multiply the numerators together and multiply the denominators together."
                }]
              },
            ],
          },
        },
        page13: {
          highlights: [
            {
              text: "What fraction of the whole cake did her friends eat?",
              fontColor: highlightColor4,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          solutionSteps: {
            headerText: "Fraction Multiplication",
            steps: [
              {
                text: 'Multiply fraction',
                subSteps: [{
                  text: "Multiply the numerators together and multiply the denominators together."
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
        nextButtonpage3: "Peristiwa perpindahan halaman ke halaman 3 telah dikirim",
        nextButtonpage4: "Peristiwa perpindahan halaman ke halaman 4 telah dikirim",
        nextButtonpage5: "Peristiwa perpindahan halaman ke halaman 5 telah dikirim",
        navigationReset: "Mengatur ulang ke soal 1",
        navigationComplete: "Reset aplikasi selesai - siap untuk soal baru"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang"
      },

      common: {
        equationButtonText: "Pecahan dari seluruh kue yang dimakan teman Tania",
        questionText:
          "Tania membuat kue dan memotongnya menjadi potongan yang sama besar. Ia memberikan $\\frac{2}{3}$ bagian kue kepada teman-temannya. Kemudian, teman-temannya memakan $\\frac{1}{2}$ dari bagian yang diberikan Tania. Pecahan berapa dari seluruh kue yang dimakan teman-temannya?",
        questionIcon: "T",
        labels: {
          dropHere: "Letakkan di sini"
        },
        symbols: {
          questionMark: "?",
          equals: "=",
          multiply: "×",
          divide: "÷"
        },
        imageAlt: {
          tap: "Ketuk"
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
        FractionOfCake: "Pecahan kue<br/>yang dimakan<br/>teman Tania",
        amountOfCake: "Jumlah kue <br/>yang dimakan<br/>teman Tania",
        amountOfCakeTaniaGave: "Jumlah kue<br/>yang diberikan Tania<br/>kepada teman-temannya"
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
            "Mari kita cari pecahan kue yang dimakan teman Tania dengan mengalikan pecahan.",
          headerText:
            "Bacalah soal dan identifikasi bagian 'diketahui' dan 'ditanyakan'",
          footerInstruction:
            "Ketuk » untuk mengidentifikasi informasi yang diketahui"
        },

        page2: {
          headerText:
            "Bacalah soal dan identifikasi bagian 'diketahui' dan 'ditanyakan'",
          footerInstruction:
            "Ketuk » untuk mengidentifikasi informasi yang diketahui",
          highlights: [
            {
              text: "Tania membuat kue dan memotongnya menjadi potongan yang sama besar.",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Tania membuat kue dan memotongnya menjadi potongan-potongan.",
                size: highlightTextSize,
                color: highlightColor1
              }
            ],
            values: [],
            toFind: []
          }
        },

        page3: {
          headerText:
            "Bacalah soal dan identifikasi bagian 'diketahui' dan 'ditanyakan'",
          footerInstruction:
            "Ketuk » untuk mengidentifikasi informasi yang diketahui",
          highlights: [
            {
              text: "Tania membuat kue dan memotongnya menjadi potongan yang sama besar.",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "Ia memberikan $\\frac{2}{3}$ bagian kue kepada teman-temannya",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Tania membuat kue dan memotongnya menjadi potongan-potongan.",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Bagian kue yang diberikan Tania kepada teman-temannya = $\\frac{2}{3}$ dari seluruh kue",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: [],
            toFind: []
          }
        },

        page4: {
          headerText:
            "Bacalah soal dan identifikasi bagian 'diketahui' dan 'ditanyakan'",
          footerInstruction:
            "Ketuk » untuk mengidentifikasi apa yang harus dicari",
          highlights: [
            {
              text: "Tania membuat kue dan memotongnya menjadi potongan yang sama besar.",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "Ia memberikan $\\frac{2}{3}$ bagian kue kepada teman-temannya",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "teman-temannya memakan $\\frac{1}{2}$ dari bagian yang diberikan Tania",
              fontColor: highlightColor3,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Tania membuat kue dan memotongnya menjadi potongan-potongan.",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Bagian kue yang diberikan Tania kepada teman-temannya = $\\frac{2}{3}$ dari seluruh kue",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Bagian kue yang dimakan teman Tania = $\\frac{1}{2}$ dari bagian kue yang diberikan Tania",
                size: highlightTextSize,
                color: highlightColor3
              }
            ],
            values: [],
            toFind: []
          }
        },

        page5: {
          headerText:
            "Bacalah soal dan identifikasi bagian 'diketahui' dan 'ditanyakan'",
          footerInstruction:
            "Ketuk » untuk membangun kalimat matematika",
          highlights: [
            {
              text: "Tania membuat kue dan memotongnya menjadi potongan yang sama besar.",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "Ia memberikan $\\frac{2}{3}$ bagian kue kepada teman-temannya",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "teman-temannya memakan $\\frac{1}{2}$ dari bagian yang diberikan Tania",
              fontColor: highlightColor3,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "Pecahan berapa dari seluruh kue yang dimakan teman-temannya?",
              fontColor: highlightColor4,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Tania membuat kue dan memotongnya menjadi potongan-potongan.",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Bagian kue yang diberikan Tania kepada teman-temannya = $\\frac{2}{3}$ dari seluruh kue",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Bagian kue yang dimakan teman Tania = $\\frac{1}{2}$ dari bagian kue yang diberikan Tania",
                size: highlightTextSize,
                color: highlightColor3
              }
            ],
            values: [],
            toFind: [
              {
                text: "Pecahan dari seluruh kue yang dimakan teman Tania",
                size: highlightTextSize,
                color: highlightColor4
              }
            ]
          }
        },

        page6: {
          headerText: "Buat kalimat matematika untuk situasi yang diberikan",
          footerInstruction:
            "Seret tombol yang benar ke tempat yang sesuai dalam kalimat",
          equationText: {
            totalWeight: "Jumlah total"
          },
          optionTextFillBlanks: {
            optionOpt1Text: "Bagian kue yang diberikan Tania kepada teman-temannya",
            optionOpt2Text: "Bagian yang dimakan teman Tania dari yang diberikan"
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
          footerInstruction:
            "Ketuk » untuk mengidentifikasi semua langkah perkalian yang diperlukan",
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
          headerText:
            "Ketuk dan seret opsi untuk menyusun urutan langkah yang benar untuk mengalikan pecahan.",
          footerInstruction:
            "Susun tombol sesuai urutan langkah yang benar",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          steps: [
            "Kalikan pembilang",
            "Kalikan penyebut"
          ]
        },

        page10: {
          headerText: "Apa rumus yang benar untuk mengubah pecahan tidak wajar menjadi bilangan campuran?",
          footerInstruction: "Ketuk » untuk mengerjakan langkah-langkah berikut",
          solutionSteps: {
            headerText: "Perkalian Pecahan",
            steps: [
              {
                text: "Kalikan pecahan",
                subSteps: [
                  {
                    text: "Kalikan pembilang dan kalikan penyebut."
                  }
                ]
              }
            ]
          },
          informationGathered:
            '<span style="color: #20B2AA;">&#10003;</span>\u00A0Informasi telah dikumpulkan dari soal.',
          stepsRequired:
            '<span style="color: #20B2AA;">&#10003;</span>\u00A0Langkah-langkah telah ditentukan',
          nextFinding: "Selanjutnya – Menentukan hasil akhir"
        },

        page11: {
          headerText: "Kerjakan langkahnya di buku catatanmu dan sebutkan jawabannya.",
          footerInstruction: "Ketuk '?' untuk melihat jawabannya",
          instructionRevealConversions: "Ketuk '?' untuk melihat jawaban",
          solutionSteps: {
            headerText: "Perkalian Pecahan",
            steps: [
              {
                text: "Kalikan pecahan",
                subSteps: [
                  {
                    text: "Kalikan pembilang dan kalikan penyebut."
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
            headerText: "Perkalian Pecahan",
            steps: [
              {
                text: "Kalikan pecahan",
                subSteps: [
                  {
                    text: "Kalikan pembilang dan kalikan penyebut."
                  }
                ]
              }
            ]
          }
        },

        page13: {
          highlights: [
            {
              text: "Pecahan berapa dari seluruh kue yang dimakan teman-temannya?",
              fontColor: highlightColor4,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          solutionSteps: {
            headerText: "Perkalian Pecahan",
            steps: [
              {
                text: "Kalikan pecahan",
                subSteps: [
                  {
                    text: "Kalikan pembilang dan kalikan penyebut."
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
