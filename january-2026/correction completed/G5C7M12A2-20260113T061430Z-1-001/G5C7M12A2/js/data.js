// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlightColor1 = "#FFD700";
const highlightColor2 = "#70ACC7";
const highlightColor3 = "#F28283";
const highlightColor4 = "#00FF7F";
const highlightColor5 = '#8A2BE2';

const questionTextSize = '36gc';
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
        equationButtonText: "Combined population of <br/>Batak and Javanese tribes",
        questionText: "The population of the Batak tribe in Indonesia is $\\frac{1}{20}$ of the total population of Indonesia.  The Javanese population in Indonesia is  $\\frac{1}{6}$     of the total population. How much of Indonesia’s population do the Batak and Javanese tribes together make up?",
        questionIcon: "Q",
        labels: {
          dropHere: "Drop here",
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
        amountBeniGiveToGrandMother: "Amount Beni gave\n to his grandfather.",
        amountOfBika: "Amount of Bika\n Ambon left with Beni"
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
              text: "The population of the Batak tribe in Indonesia is $\\frac{1}{20}$ of the total population of Indonesia",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Batak tribe = $\\frac{1}{20}$",
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
              text: "The Javanese population in Indonesia is  $\\frac{1}{6}$     of the total population",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Batak tribe = $\\frac{1}{20}$",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Javanese tribe = $\\frac{1}{6}$",
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
              text: "How much of Indonesia’s population do the Batak and Javanese tribes together make up",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Batak tribe = $\\frac{1}{20}$",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Javanese tribe = $\\frac{1}{6}$",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: [
            ],
            toFind: [
              {
                text: "Combined population of Batak and Javanese tribes in Indonesia",
                size: highlightTextSize,
                color: highlightColor3
              }
            ]
          },


        },
        page5: {
          headerText: "Build a mathematical sentence for the given scene",
          footerInstruction: "Drag the correct buttons to the correct spot in the sentence",
          instructionAfterQuiz: "Tap » to substitute values into the equation",
          equationText: {
            totalWeight: 'Total weight'
          },
          optionTextFillBlanks: {
            optionOpt1Text: "Javanese tribe population",
            optionOpt2Text: 'Batak Tribe population',
          }
        },
        page6: {
          headerText: "Build a mathematical sentence for the given scene",
          footerInstruction: "Tap » to continue",
          equationText: {
            totalWeight: 'Total weight',
            javeneseSugar: "Javenese sugar weight",
            flourWeight: 'Flour weight',
          },
          fractionAddition: "This is a Unlike Fractions Addition challenge!"
        },
        page7: {
          headerText: "Build a mathematical sentence for the given scene",
          footerInstruction: "Tap » to identify all the required steps for the addition",
          equationText: {
            totalWeight: 'Total weight',
            javeneseSugar: "Javenese sugar weight",
            flourWeight: 'Flour weight',
          },
          informationGathered: '<span style="color: #20B2AA;">&#10003;</span>\u00A0Information gathered from question.',
          nextStep: "Next - Steps required to find answer."
        },
        page8: {
          headerText: "Tap and drag the options to arrange the steps in the correct order to add unlike fractions.",
          footerInstruction: "Rearrange the buttons to the correct sequence of steps",
          instructionAfterQuiz: "Tap » to continue",
          steps: [
            'Find the LCM of the two denominators.',
            'Convert into like fractions.',
            'Add like fractions.'
          ],

        },
        page9: {
          headerText: "What is the correct formula for converting a improper fraction into an mixed number?",
          footerInstruction: "Tap » to add the liked fractions using these steps",
          solutionSteps: {
            headerText: "Unliked Fraction Addition",
            steps: [
              {
                text: 'Find the LCM of the  denominators.',
                subSteps: []
              },
              {
                text: 'Convert into like fractions.',
                subSteps: [

                ]
              },
              {
                text: 'Add like fractions.',
                subSteps: []
              }
            ],
          },
          informationGathered: '<span style="color: #20B2AA;">&#10003;</span>\u00A0Information gathered from question.',
          stepsRequired: '<span style="color: #20B2AA;">&#10003;</span>\u00A0Steps required to find answer',
          nextFinding: "Next - Finding the required Result",
        },

        page10: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap on LCM button to find LCM of fractions.",
          lcmButtonText: 'LCM of 20, and 6',
          solutionSteps: {
            headerText: "Unliked Fraction Addition",
            steps: [
              {
                text: 'Find the LCM of the  denominators.',
                subSteps: []
              },
              {
                text: 'Convert into like fractions.',
                subSteps: [

                ]
              },
              {
                text: 'Add like fractions.',
                subSteps: []
              }
            ],
          },
        },
        page11: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap » for Step 2",
          instructionAfterQuiz: "Tap » to continue",
          solutionSteps: {
            headerText: "Unliked Fraction Addition",
            steps: [
              {
                text: 'Find the LCM of the  denominators.',
                subSteps: []
              },
              {
                text: 'Convert into like fractions.',
                subSteps: [

                ]
              },
              {
                text: 'Add like fractions.',
                subSteps: []
              }
            ],
          },
        },
        page12: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the answer.",
          instructionAfterQuiz: "Tap » to find the sum.",
          solutionSteps: {
            headerText: "Unliked Fraction Addition",
            steps: [
              {
                text: 'Find the LCM of the  denominators.',
                subSteps: []
              },
              {
                text: 'Convert into like fractions.',
                subSteps: [

                ]
              },
              {
                text: 'Add like fractions.',
                subSteps: []
              }
            ],
          }
        },
        page13: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the sum",
          instructionAfterQuiz: "Tap » to compute.",
          solutionSteps: {
            headerText: "Unliked Fraction Addition",
            steps: [
              {
                text: 'Find the LCM of the  denominators.',
                subSteps: []
              },
              {
                text: 'Convert into like fractions.',
                subSteps: [

                ]
              },
              {
                text: 'Add like fractions.',
                subSteps: []
              }
            ],
          }
        },
        page14: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the answer.",
          instructionAfterQuiz: "Tap » to summarize.",
          solutionSteps: {
            headerText: "Unliked Fraction Addition",
            steps: [
              {
                text: 'Find the LCM of the  denominators.',
                subSteps: []
              },
              {
                text: 'Convert into like fractions.',
                subSteps: [

                ]
              },
              {
                text: 'Add like fractions.',
                subSteps: []
              }
            ],
          }
        },

        page15: {
          highlights: [
            {
              text: "How much of Indonesia’s population do the Batak and Javanese tribes together make up",
              fontColor: highlightColor3,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          solutionSteps: {
            headerText: "Unliked Fraction Addition",
            steps: [
              {
                text: 'Find the LCM of the  denominators.',
                subSteps: []
              },
              {
                text: 'Convert into like fractions.',
                subSteps: [

                ]
              },
              {
                text: 'Add like fractions.',
                subSteps: []
              }
            ],
          },
          headerText: "Identify scene – Build Equation – Solve for unknown",
          footerInstruction: "Tap 'Start Over' to re-do activity"
        },
        page16: {
          instructionAfterQuiz: "Tap » to continue"
        },
        page17: {
          instructionAfterQuiz: "Tap » to find the sum of like fractions"
        }

      },
    },
    id: {
      appInfo: {
        title: "Perbandingan Rasio – Populasi Suku di Indonesia"
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
        equationButtonText: "Jumlah gabungan populasi <br/>suku Batak dan Jawa",
        questionText:
          "Populasi suku Batak di Indonesia adalah $\\frac{1}{20}$ dari jumlah penduduk Indonesia. Populasi suku Jawa di Indonesia adalah $\\frac{1}{6}$ dari jumlah penduduk Indonesia. Berapa bagian dari jumlah penduduk Indonesia yang merupakan gabungan suku Batak dan Jawa?",
        questionIcon: "T",
        labels: {
          dropHere: "Letakkan di sini",
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
        amountBeniGiveToGrandMother: "Jumlah yang diberikan Beni\n kepada kakeknya",
        amountOfBika: "Jumlah Bika Ambon\n yang tersisa pada Beni"
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
            "Mari kita tentukan gabungan populasi dengan menjumlahkan pecahan.",
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
              text:
                "Populasi suku Batak di Indonesia adalah $\\frac{1}{20}$ dari jumlah penduduk Indonesia",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Suku Batak = $\\frac{1}{20}$",
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
            "Ketuk » untuk mengidentifikasi apa yang harus dicari",
          highlights: [
            {
              text:
                "Populasi suku Batak di Indonesia adalah $\\frac{1}{20}$ dari jumlah penduduk Indonesia",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text:
                "Populasi suku Jawa di Indonesia adalah $\\frac{1}{6}$ dari jumlah penduduk Indonesia",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Suku Batak = $\\frac{1}{20}$",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Suku Jawa = $\\frac{1}{6}$",
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
            "Ketuk » untuk membangun kalimat matematika",
          highlights: [
            {
              text:
                "Populasi suku Batak di Indonesia adalah $\\frac{1}{20}$ dari jumlah penduduk Indonesia",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text:
                "Populasi suku Jawa di Indonesia adalah $\\frac{1}{6}$ dari jumlah penduduk Indonesia",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text:
                "Berapa bagian dari jumlah penduduk Indonesia yang merupakan gabungan suku Batak dan Jawa",
              fontColor: highlightColor3,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Suku Batak = $\\frac{1}{20}$",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Suku Jawa = $\\frac{1}{6}$",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: [],
            toFind: [
              {
                text:
                  "Gabungan populasi suku Batak dan Jawa di Indonesia",
                size: highlightTextSize,
                color: highlightColor3
              }
            ]
          }
        },

        page5: {
          headerText:
            "Buat kalimat matematika untuk situasi yang diberikan",
          footerInstruction:
            "Seret tombol yang benar ke tempat yang sesuai",
          equationText: {
            totalWeight: "Jumlah total"
          },
          optionTextFillBlanks: {
            optionOpt1Text: "Populasi suku Jawa",
            optionOpt2Text: "Populasi suku Batak"
          }
        },

        page6: {
          headerText:
            "Buat kalimat matematika untuk situasi yang diberikan",
          footerInstruction: "Ketuk » untuk melanjutkan",
          equationText: {
            totalWeight: "Jumlah total",
            javeneseSugar: "Populasi suku Jawa",
            flourWeight: "Populasi suku Batak"
          },
          fractionAddition:
            "Ini adalah tantangan penjumlahan pecahan tidak senilai!"
        },

        page7: {
          headerText:
            "Buat kalimat matematika untuk situasi yang diberikan",
          footerInstruction:
            "Ketuk » untuk mengidentifikasi langkah-langkah yang diperlukan",
          equationText: {
            totalWeight: "Jumlah total",
            javeneseSugar: "Populasi suku Jawa",
            flourWeight: "Populasi suku Batak"
          },
          informationGathered:
            '<span style="color: #20B2AA;">&#10003;</span>\u00A0Informasi telah dikumpulkan dari soal.',
          nextStep: "Selanjutnya – Langkah-langkah untuk menemukan jawaban"
        },

        page8: {
          headerText:
            "Ketuk dan seret untuk mengurutkan langkah-langkah penjumlahan pecahan tidak senilai",
          footerInstruction:
            "Susun tombol sesuai urutan langkah yang benar",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          steps: [
            "Menentukan KPK dari kedua penyebut.",
            "Mengubah menjadi pecahan senilai.",
            "Menjumlahkan pecahan senilai."
          ]
        },

        page9: {
          headerText:
            "Apa rumus yang benar untuk mengubah pecahan tidak wajar menjadi pecahan campuran?",
          footerInstruction:
            "Ketuk » untuk menjumlahkan pecahan menggunakan langkah-langkah ini",
          solutionSteps: {
            headerText: "Penjumlahan Bilangan Campuran",
            steps: [
              {
                text: "Ubah bilangan campuran menjadi pecahan tidak wajar",
                subSteps: []
              },
              {
                text: "Jumlahkan pecahan tidak wajar yang dihasilkan",
                subSteps: [
                  { text: "Tentukan KPK dari penyebut", subSteps: [] },
                  { text: "Ubah menjadi Pecahan Senilai", subSteps: [] },
                  { text: "Jumlahkan Pecahan Senilai", subSteps: [] }
                ]
              },
              {
                text: "Ubah hasil kembali menjadi bilangan campuran",
                subSteps: []
              }
            ]
          },
          informationGathered:
            '<span style="color: #20B2AA;">&#10003;</span>\u00A0Informasi telah dikumpulkan dari soal.',
          stepsRequired:
            '<span style="color: #20B2AA;">&#10003;</span>\u00A0Langkah-langkah telah ditentukan',
          nextFinding: "Selanjutnya – Menentukan hasil akhir"
        },

        page10: {
          headerText: 'Selesaikan langkah di buku catatan Anda dan sebutkan jawabannya.',
          footerInstruction: "Ketuk tombol KPK untuk mencari KPK dari pecahan.",
          lcmButtonText: 'KPK dari 20 dan 6',
          solutionSteps: {
            headerText: "Penjumlahan Pecahan Senilai",
            steps: [
              {
                text: 'Menentukan KPK dari penyebut.',
                subSteps: []
              },
              {
                text: 'Mengubah menjadi pecahan senilai.',
                subSteps: []
              },
              {
                text: 'Menjumlahkan pecahan senilai.',
                subSteps: []
              }
            ],
          },
        },

        page11: {
          headerText: 'Selesaikan langkah di buku catatan Anda dan sebutkan jawabannya.',
          footerInstruction: "Ketuk » untuk Langkah 2.b",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          solutionSteps: {
            headerText: "Penjumlahan Pecahan Senilai",
            steps: [
              {
                text: 'Menentukan KPK dari penyebut.',
                subSteps: []
              },
              {
                text: 'Mengubah menjadi pecahan senilai.',
                subSteps: []
              },
              {
                text: 'Menjumlahkan pecahan senilai.',
                subSteps: []
              }
            ],
          },
        },

        page12: {
          headerText: 'Selesaikan langkah di buku catatan Anda dan sebutkan jawabannya.',
          footerInstruction: "Ketuk '?' untuk mengungkapkan pengurangan",
          instructionRevealConversions: "Ketuk '?' untuk mengungkapkan jawaban untuk setiap konversi",
          solutionSteps: {
            headerText: "Penjumlahan Pecahan Senilai",
            steps: [
              {
                text: 'Menentukan KPK dari penyebut.',
                subSteps: []
              },
              {
                text: 'Mengubah menjadi pecahan senilai.',
                subSteps: []
              },
              {
                text: 'Menjumlahkan pecahan senilai.',
                subSteps: []
              }
            ],
          }
        },

        page13: {
          headerText: 'Selesaikan langkah di buku catatan Anda dan sebutkan jawabannya.',
          footerInstruction: "Ketuk '?' untuk mengungkapkan jumlah",
          solutionSteps: {
            headerText: "Penjumlahan Pecahan Senilai",
            steps: [
              {
                text: 'Menentukan KPK dari penyebut.',
                subSteps: []
              },
              {
                text: 'Mengubah menjadi pecahan senilai.',
                subSteps: []
              },
              {
                text: 'Menjumlahkan pecahan senilai.',
                subSteps: []
              }
            ],
          }
        },

        page14: {
          headerText: 'Selesaikan langkah di buku catatan Anda dan sebutkan jawabannya.',
          footerInstruction: "Ketuk '?' untuk mengungkapkan konversi hasil",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          solutionSteps: {
            headerText: "Penjumlahan Pecahan Senilai",
            steps: [
              {
                text: 'Menentukan KPK dari penyebut.',
                subSteps: []
              },
              {
                text: 'Mengubah menjadi pecahan senilai.',
                subSteps: []
              },
              {
                text: 'Menjumlahkan pecahan senilai.',
                subSteps: []
              }
            ],
          }
        },

        page15: {
          headerText: "Identifikasi situasi – Buat Persamaan – Selesaikan untuk yang tidak diketahui",
          footerInstruction: "Ketuk 'Mulai Ulang' untuk mengulang aktivitas",
          solutionSteps: {
            headerText: "Penjumlahan Pecahan Senilai",
            steps: [
              {
                text: 'Menentukan KPK dari penyebut.',
                subSteps: []
              },
              {
                text: 'Mengubah menjadi pecahan senilai.',
                subSteps: []
              },
              {
                text: 'Menjumlahkan pecahan senilai.',
                subSteps: []
              }
            ],
          },
          highlights: [
            {
              text: "Berapa bagian dari jumlah penduduk Indonesia yang merupakan gabungan suku Batak dan Jawa",
              fontColor: highlightColor3,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ]
        },
        page16: {
          instructionAfterQuiz: "Ketuk » untuk melanjutkan"
        },
        page17: {
          instructionAfterQuiz: "Ketuk » untuk mencari jumlah pecahan senilai"
        }
      }
    },
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
