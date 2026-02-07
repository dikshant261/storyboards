// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlightColor1 = "#FFD700";
const highlightColor2 = "#70ACC7";
const highlightColor3 = "#F28283";
const highlightColor4 = "#00FF7F";
const highlightColor5 = '#8A2BE2';

const questionTextSize = '24gc';

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
        questionText: "Prove that among the following groups of three numbers, which one is the correct one?<br><br>Which is a Pythagoras’ triple.<br><br><div style=\"text-align: left; margin: 0 auto; width: fit-content;\"><strong>a.</strong> 24, 17, 25<br><strong>b.</strong> 7, 13, 11<br><strong>c.</strong> 6, $2 \\frac{1}{2}$, $6 \\frac{1}{2}$</div>",
        questionIcon: "Q",
        komangToLucas: "Komang to Lucas",
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
        }
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
          footerInstruction: "Tap » to identify a Pythagoras’ triple"
        },
        page2: {
          headerText: "How to identify a Pythagoras’ triple",
          footerInstruction: "Tap » to learn how to identify a Pythagoras’ triple",
          highlights: [
            {
              text: "Komang's house is between Yohana's house and Lukas's house.",
              highlightColor: highlightColor1,
              fontColor: '#000000',
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              { text: "Komang's house is at the center.", size: '20gc', color: highlightColor1 }
            ],
            values: [
            ],
            toFind: [
            ]
          },
          quizPanel: {
            questionText: "Given that p, q, and r are Pythagoras’ triples<br>with p < q < r, choose the correct option.",
            options: [
              {
                text: "p<sup>2</sup> = q<sup>2</sup> + r<sup>2</sup>",
                feedback: "That's not right! Try again.",
                iscorrect: false
              },
              {
                text: "q<sup>2</sup> = p<sup>2</sup> - r<sup>2</sup>",
                feedback: "That's not right! Try again.",
                iscorrect: false
              },
              {
                text: "r<sup>2</sup> = p<sup>2</sup> - q<sup>2</sup>",
                feedback: "That's not right! Try again.",
                iscorrect: false
              },
              {
                text: "r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup>",
                feedback: "Good!",
                iscorrect: true
              }
            ]
          }
        },
        page3: {
          headerText: "Let us explore the triple 24, 17, 25",
          footerInstruction: "Click on the highlighted button see the solution steps",
          highlights: [
          ],
          informationAnalysis: {
            facts: [
              { text: "Komang's house is at the center.", size: '20gc', color: highlightColor2 },
              { text: "Komang to Yohana = $1 \\frac{1}{2}$ km", size: '20gc', color: highlightColor2 }
            ],
            values: [
            ],
            toFind: [
            ]
          },
          triangleLabels: {
            vertexLabels: ['A', 'B', 'C'],
            sideLabels: ['? m', '? m', '? m']
          },
          calculationSteps: {
            headerText: 'Solution Steps',
            steps: [
              {
                text: 'p = 17, q = 24, r = 25 (since 17 < 24 < 25)',
                buttonText: 'Calculate squares'
              },
              {
                explainer: 'Calculate p², q², and r²',
                text: 'p² = 17² = 289, q² = 24² = 576, r² = 25² = 625<br>p² + q² = 289 + 576 = 865',
                buttonText: 'Compare values'
              },
              {
                explainer: 'Compare r² = 625 and p² + q² = 865',
                text: 'Since 625 ≠ 865, we have r² ≠ p² + q²',
                buttonText: 'See conclusion'
              },
              {
                explainer: 'Conclusion',
                text: '24, 17, 25 is NOT a Pythagoras’ triple'
              }
            ]
          },
          tableUpdates: {
            step1: {
              col1: 'r = 25',
              col2: 'p = 17 and q = 24'
            },
            step2: {
              r2: 'r² = 625',
              p2q2: 'p² = 289, q² = 576',
              p2plusq2: 'p² + q² = 865'
            },
            step3: {
              text: 'r² ≠ p² + q²'
            }
          }
        },
        page4: {
          headerText: "Let us explore the triple 7, 13, 11",
          footerInstruction: "Click on the highlighted button see the solution steps",
          highlights: [
          ],
          informationAnalysis: {
            facts: [
              { text: "Komang's house is at the center.", size: '20gc', color: highlightColor2 },
              { text: "Komang to Yohana = $1 \\frac{1}{2}$ km", size: '20gc', color: highlightColor2 }
            ],
            values: [
            ],
            toFind: [
            ]
          },
          triangleLabels: {
            vertexLabels: ['A', 'B', 'C'],
            sideLabels: ['? m', '? m', '? m']
          },
          calculationSteps: {
            headerText: 'Solution Steps',
            steps: [
              {
                text: 'p = 7, q = 11, r = 13 (since 7 < 11 < 13)',
                buttonText: 'Calculate squares'
              },
              {
                explainer: 'Calculate p², q², and r²',
                text: 'p² = 7² = 49, q² = 11² = 121, r² = 13² = 169<br>p² + q² = 49 + 121 = 170',
                buttonText: 'Compare values'
              },
              {
                explainer: 'Compare r² = 169 and p² + q² = 170',
                text: 'Since 169 ≠ 170, we have r² ≠ p² + q²',
                buttonText: 'See conclusion'
              },
              {
                explainer: 'Conclusion',
                text: '7, 13, 11 is NOT a Pythagoras’ triple'
              }
            ]
          },
          tableUpdates: {
            step1: {
              col1: 'r=13',
              col2: 'p=7 and q = 11'
            },
            step2: {
              r2: 'r² = 169',
              p2q2: 'p²=49, q²=121',
              p2plusq2: 'p²+q²=170'
            },
            step3: {
              text: 'r² ≠ p² + q²'
            }
          }
        },
        page5: {
          headerText: "Let us explore the triple 6, $ 2\\frac{1}{2}$, $ 6\\frac{1}{2}$",
          footerInstruction: "Click on the highlighted button see the solution steps",
          highlights: [
          ],
          informationAnalysis: {
            facts: [
              { text: "Komang's house is at the center.", size: '20gc', color: highlightColor2 },
              { text: "Komang to Yohana = $1 \\frac{1}{2}$ km", size: '20gc', color: highlightColor2 }
            ],
            values: [
            ],
            toFind: [
            ]
          },
          triangleLabels: {
            vertexLabels: ['A', 'B', 'C'],
            sideLabels: ['? m', '? m', '? m']
          },
          calculationSteps: {
            headerText: 'Solution Steps',
            steps: [
              {
                text: 'p = $2\\frac{1}{2}$, q = 6, r = $6\\frac{1}{2}$ (since $2\\frac{1}{2}$ < 6 < $6\\frac{1}{2}$)',
                buttonText: 'Calculate squares'
              },
              {
                explainer: 'Calculate p², q², and r²',
                text: 'p² = ($2\\frac{1}{2}$)² = ($\\frac{5}{2}$)² = $\\frac{25}{4}$, q² = 6² = 36 = $\\frac{144}{4}$<br>r² = ($6\\frac{1}{2}$)² = ($\\frac{13}{2}$)² = $\\frac{169}{4}$<br>p² + q² = $\\frac{25}{4}$ + $\\frac{144}{4}$ = $\\frac{169}{4}$',
                buttonText: 'Compare values'
              },
              {
                explainer: 'Comparing r² and p² + q²',
                text: 'Since $\\frac{169}{4}$ = $\\frac{169}{4}$, we have r² = p² + q²',
                buttonText: 'See conclusion'
              },
              {

                text: '6, $2\\frac{1}{2}$, $6\\frac{1}{2}$ IS a Pythagoras’ triple'
              }
            ]
          },
          tableUpdates: {
            step1: {
              col1: 'r = $6\\frac{1}{2}$',
              col2: 'p = $2\\frac{1}{2}$ and q = 6'
            },
            step2: {
              r2: 'r² = $\\frac{169}{4}$',
              p2q2: 'p² = $\\frac{25}{4}$, q² = $\\frac{144}{4}$',
              p2plusq2: 'p² + q² = $\\frac{169}{4}$'
            },
            step3: {
              text: 'r² = p² + q²'
            }
          }
        },
        page6: {
          headerText: "Summary",
          summaryText: "After exploring all three triples, we found that:<br><br><div style=\"text-align: left; margin: 0 auto; width: fit-content;\"><strong>a.</strong> 24, 17, 25 is NOT a Pythagoras’ triple<br><strong>b.</strong> 7, 13, 11 is NOT a Pythagoras’ triple<br><strong>c.</strong> 6, $2 \\frac{1}{2}$, $6 \\frac{1}{2}$ IS a Pythagoras’ triple</div><br><br>Therefore, the correct answer is <strong>option c</strong>.",
          footerInstruction: "Tap » to start over",
          highlights: [
            {
              text: "c. 6, $2 \\frac{1}{2}$, $6 \\frac{1}{2}$ IS a Pythagoras’ triple"
            }
          ]
        },
      },
    },
    id: {
      appInfo: {
        title: "Rasio - Perbandingan Jarak Komodo"
      },

      messages: {
        pageStatesCleared: "Status halaman sudah dihapus. Muat ulang halaman untuk mulai dari awal?",
        nextButtonPage2: "Peristiwa pindah halaman telah dikirim ke halaman 2",
        previousButtonPage1: "Peristiwa pindah halaman telah dikirim ke halaman 1"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Lagi"
      },

      common: {
        questionText: "Buktikan bahwa di antara kelompok tiga angka berikut, manakah yang benar?<br><br>Manakah yang merupakan tripel Pythagoras.<br><br><div style=\"text-align: left; margin: 0 auto; width: fit-content;\"><strong>a.</strong> 24, 17, 25<br><strong>b.</strong> 7, 13, 11<br><strong>c.</strong> 6, $2 \\frac{1}{2}$, $6 \\frac{1}{2}$</div>",
        questionIcon: "Q",
        komangToLucas: "Komang ke Lucas",
        labels: {
          dropHere: "Taruh di sini"
        },
        informationAnalysis: {
          header: "ANALISIS INFORMASI",
          facts: "Fakta",
          values: "Nilai",
          toFind: "Yang Dicari"
        },
        conceptSummary: {
          header: "RINGKASAN KONSEP",
          given: "Diketahui",
          toFind: "Yang Dicari",
          keyConcepts: "Konsep Kunci",
          importantFormulae: "Perhitungan"
        }
      },

      components: {
        informationAnalysis: {
          headerText: "ANALISIS INFORMASI",
          factsTitle: "Fakta",
          valueTitle: "Nilai",
          toFindTitle: "Yang Dicari"
        },
        conceptSummary: {
          headerText: "RINGKASAN KONSEP",
          givenTitle: "Diketahui",
          toFindTitle: "Yang Dicari",
          keyConceptsTitle: "Konsep Kunci",
          importantFormulaeTitle: "Perhitungan"
        }
      },

      pages: {
        page1: {
          highlights: [],
          instructionText: "Mari kita cari jarak dari rumah Yohana ke rumah Lukas dengan menjumlahkan bilangan campuran dan pecahan.",
          headerText: "Baca soal dan tentukan 'diketahui' dan 'yang ditanyakan'",
          footerInstruction: "Ketuk » untuk mengidentifikasi tripel Pythagoras"
        },

        page2: {
          headerText: "Cara mengidentifikasi tripel Pythagoras",
          footerInstruction: "Ketuk » untuk mempelajari cara mengidentifikasi tripel Pythagoras",
          highlights: [
            {
              text: "Rumah Komang berada di antara rumah Yohana dan rumah Lukas.",
              highlightColor: highlightColor1,
              fontColor: '#000000',
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              { text: "Rumah Komang berada di tengah.", size: '20gc', color: highlightColor1 }
            ],
            values: [],
            toFind: []
          },
          quizPanel: {
            questionText: "Diketahui bahwa p, q, dan r adalah tripel Pythagoras<br>dengan p < q < r, pilih pernyataan yang benar.",
            options: [
              {
                text: "p<sup>2</sup> = q<sup>2</sup> + r<sup>2</sup>",
                feedback: "Belum benar! Coba lagi.",
                iscorrect: false
              },
              {
                text: "q<sup>2</sup> = p<sup>2</sup> - r<sup>2</sup>",
                feedback: "Belum benar! Coba lagi.",
                iscorrect: false
              },
              {
                text: "r<sup>2</sup> = p<sup>2</sup> - q<sup>2</sup>",
                feedback: "Belum benar! Coba lagi.",
                iscorrect: false
              },
              {
                text: "r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup>",
                feedback: "Bagus!",
                iscorrect: true
              }
            ]
          }
        },

        page3: {
          headerText: "Mari kita eksplorasi tripel 24, 17, 25",
          footerInstruction: "Klik tombol yang disorot untuk melihat langkah penyelesaian",
          highlights: [],
          informationAnalysis: {
            facts: [
              { text: "Rumah Komang berada di tengah.", size: '20gc', color: highlightColor2 },
              { text: "Jarak Komang ke Yohana = $1 \\frac{1}{2}$ km", size: '20gc', color: highlightColor2 }
            ],
            values: [],
            toFind: []
          },
          triangleLabels: {
            vertexLabels: ['A', 'B', 'C'],
            sideLabels: ['? m', '? m', '? m']
          },
          calculationSteps: {
            headerText: 'Langkah Penyelesaian',
            steps: [
              {
                text: 'p = 17, q = 24, r = 25 (karena 17 < 24 < 25)',
                buttonText: 'Hitung kuadrat'
              },
              {
                explainer: 'Hitung p², q², dan r²',
                text: 'p² = 17² = 289, q² = 24² = 576, r² = 25² = 625<br>p² + q² = 289 + 576 = 865',
                buttonText: 'Bandingkan nilai'
              },
              {
                explainer: 'Bandingkan r² = 625 dan p² + q² = 865',
                text: 'Karena 625 ≠ 865, maka r² ≠ p² + q²',
                buttonText: 'Lihat kesimpulan'
              },
              {
                explainer: 'Kesimpulan',
                text: '24, 17, 25 BUKAN tripel Pythagoras'
              }
            ]
          },
          tableUpdates: {
            step1: {
              col1: 'r = 25',
              col2: 'p = 17 dan q = 24'
            },
            step2: {
              r2: 'r² = 625',
              p2q2: 'p² = 289, q² = 576',
              p2plusq2: 'p² + q² = 865'
            },
            step3: {
              text: 'r² ≠ p² + q²'
            }
          }
        },

        page4: {
          headerText: "Mari kita eksplorasi tripel 7, 13, 11",
          footerInstruction: "Klik tombol yang disorot untuk melihat langkah penyelesaian",
          highlights: [],
          informationAnalysis: {
            facts: [
              { text: "Rumah Komang berada di tengah.", size: '20gc', color: highlightColor2 },
              { text: "Jarak Komang ke Yohana = $1 \\frac{1}{2}$ km", size: '20gc', color: highlightColor2 }
            ],
            values: [],
            toFind: []
          },
          triangleLabels: {
            vertexLabels: ['A', 'B', 'C'],
            sideLabels: ['? m', '? m', '? m']
          },
          calculationSteps: {
            headerText: 'Langkah Penyelesaian',
            steps: [
              {
                text: 'p = 7, q = 11, r = 13 (karena 7 < 11 < 13)',
                buttonText: 'Hitung kuadrat'
              },
              {
                explainer: 'Hitung p², q², dan r²',
                text: 'p² = 7² = 49, q² = 11² = 121, r² = 13² = 169<br>p² + q² = 49 + 121 = 170',
                buttonText: 'Bandingkan nilai'
              },
              {
                explainer: 'Bandingkan r² = 169 dan p² + q² = 170',
                text: 'Karena 169 ≠ 170, maka r² ≠ p² + q²',
                buttonText: 'Lihat kesimpulan'
              },
              {
                explainer: 'Kesimpulan',
                text: '7, 13, 11 BUKAN tripel Pythagoras'
              }
            ]
          },
          tableUpdates: {
            step1: {
              col1: 'r = 13',
              col2: 'p = 7 dan q = 11'
            },
            step2: {
              r2: 'r² = 169',
              p2q2: 'p² = 49, q² = 121',
              p2plusq2: 'p² + q² = 170'
            },
            step3: {
              text: 'r² ≠ p² + q²'
            }
          }
        },

        page5: {
          headerText: "Mari kita eksplorasi tripel 6, $2\\frac{1}{2}$, $6\\frac{1}{2}$",
          footerInstruction: "Klik tombol yang disorot untuk melihat langkah penyelesaian",
          highlights: [],
          informationAnalysis: {
            facts: [
              { text: "Rumah Komang berada di tengah.", size: '20gc', color: highlightColor2 },
              { text: "Jarak Komang ke Yohana = $1 \\frac{1}{2}$ km", size: '20gc', color: highlightColor2 }
            ],
            values: [],
            toFind: []
          },
          triangleLabels: {
            vertexLabels: ['A', 'B', 'C'],
            sideLabels: ['? m', '? m', '? m']
          },
          calculationSteps: {
            headerText: 'Langkah Penyelesaian',
            steps: [
              {
                text: 'p = $2\\frac{1}{2}$, q = 6, r = $6\\frac{1}{2}$ (karena $2\\frac{1}{2}$ < 6 < $6\\frac{1}{2}$)',
                buttonText: 'Hitung kuadrat'
              },
              {
                explainer: 'Hitung p², q², dan r²',
                text: 'p² = ($2\\frac{1}{2}$)² = ($\\frac{5}{2}$)² = $\\frac{25}{4}$, q² = 6² = 36 = $\\frac{144}{4}$<br>r² = ($6\\frac{1}{2}$)² = ($\\frac{13}{2}$)² = $\\frac{169}{4}$<br>p² + q² = $\\frac{25}{4}$ + $\\frac{144}{4}$ = $\\frac{169}{4}$',
                buttonText: 'Bandingkan nilai'
              },
              {
                explainer: 'Membandingkan r² dan p² + q²',
                text: 'Karena $\\frac{169}{4}$ = $\\frac{169}{4}$, maka r² = p² + q²',
                buttonText: 'Lihat kesimpulan'
              },
              {
                text: '6, $2\\frac{1}{2}$, $6\\frac{1}{2}$ ADALAH tripel Pythagoras'
              }
            ]
          },
          tableUpdates: {
            step1: {
              col1: 'r = $6\\frac{1}{2}$',
              col2: 'p = $2\\frac{1}{2}$ dan q = 6'
            },
            step2: {
              r2: 'r² = $\\frac{169}{4}$',
              p2q2: 'p² = $\\frac{25}{4}$, q² = $\\frac{144}{4}$',
              p2plusq2: 'p² + q² = $\\frac{169}{4}$'
            },
            step3: {
              text: 'r² = p² + q²'
            }
          }
        },

        page6: {
          headerText: "Ringkasan",
          summaryText: "Setelah mengeksplorasi ketiga tripel, kita menemukan bahwa:<br><br><div style=\"text-align: left; margin: 0 auto; width: fit-content;\"><strong>a.</strong> 24, 17, 25 BUKAN tripel Pythagoras<br><strong>b.</strong> 7, 13, 11 BUKAN tripel Pythagoras<br><strong>c.</strong> 6, $2 \\frac{1}{2}$, $6 \\frac{1}{2}$ ADALAH tripel Pythagoras</div><br><br>Oleh karena itu, jawaban yang benar adalah <strong>opsi c</strong>.",
          footerInstruction: "Ketuk » untuk mengulang",
          highlights: [
            {
              text: "c. 6, $2 \\frac{1}{2}$, $6 \\frac{1}{2}$ ADALAH tripel Pythagoras"
            }
          ]
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
