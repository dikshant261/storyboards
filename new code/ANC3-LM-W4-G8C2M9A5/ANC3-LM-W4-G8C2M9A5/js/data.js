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
          title: "Pythagorean Theorem - Triangle Variable"
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
          questionText: "Determine the value of x in the given figure.",
          questionIcon: "Q",
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
          },
          tapGif: {
              imageAlt: "Tap"
          }
      },
      
      pages: {
          page1: {
              highlights: [],
              problemDescription: "Let's find the value of x using the Pythagorean theorem."
          },
          page2: {
              highlights: [
                  { 
                      text: "2x", 
                          highlightColor: highlightColor1, 
                          fontColor: '#000000',
                          fontSize: '30gc', 
                          bold: true, 
                          underline: false
                      },
                  ],
              informationAnalysis: {
                  facts: [
                      { text: "One side a = 2x", color: highlightColor1 },
                      { text: "Another side b = √42", color: highlightColor2 },
                      { text: "Hypotenuse c = 5x", color: highlightColor4 },
                  ],
                  values: [
                  ],
                  toFind: [
                  ]
              }
          },
          page3: {
              highlights: [
                  { 
                      text: "2x", 
                          highlightColor: highlightColor1, 
                          fontColor: '#000000',
                          fontSize: '30gc', 
                          bold: true, 
                          underline: false
                      },
                  { 
                      text: "Determine the value of x", 
                          highlightColor: highlightColor3, 
                          fontColor: '#000000',
                          fontSize: '30gc', 
                          bold: true, 
                          underline: false
                      },
                  ],
              informationAnalysis: {
                  facts: [
                      { text: "One side a = 2x", color: highlightColor1 },
                      { text: "Another side b = √42", color: highlightColor2 },
                      { text: "Hypotenuse c = 5x", color: highlightColor4 },
                  ],
                  values: [
                  ],
                  toFind: [
                      { text: "Determine the value of x", color: highlightColor3 },
                  ]
              }
          },
          page4: {
              highlights: [
                    { 
                        text: "2x", 
                            highlightColor: highlightColor1, 
                            fontColor: '#000000',
                            fontSize: '30gc', 
                            bold: true, 
                            underline: false
                    },
                    { 
                        text: "2x", 
                            highlightColor: highlightColor2, 
                            fontColor: '#000000',
                            fontSize: '30gc', 
                            bold: true, 
                            underline: false
                    },
                    { 
                        text: "√42", 
                            highlightColor: highlightColor3, 
                            fontColor: '#000000',
                            fontSize: '30gc', 
                            bold: true, 
                            underline: false
                    },
                ],
              informationAnalysis: {
                facts: [
                    { text: "One side a = 2x", color: highlightColor1 },
                    { text: "Another side b = 2x", color: highlightColor2 },
                ],
                values: [
                ],
                toFind: [
                    { text: "value of x, given hypotenuse c = √42", color: highlightColor3 },
                ]
            }
          },
          page5: {
              highlights: [
                    { 
                        text: "2x", 
                            highlightColor: highlightColor1, 
                            fontColor: '#000000',
                            fontSize: '30gc', 
                            bold: true, 
                            underline: false
                    },
                    { 
                        text: "2x", 
                            highlightColor: highlightColor2, 
                            fontColor: '#000000',
                            fontSize: '30gc', 
                            bold: true, 
                            underline: false
                    },
                    { 
                        text: "√42", 
                            highlightColor: highlightColor3, 
                            fontColor: '#000000',
                            fontSize: '30gc', 
                            bold: true, 
                            underline: false
                    },
                ],
              informationAnalysis: {
                facts: [
                    { text: "One side a = 2x", color: highlightColor1 },
                    { text: "Another side b = 2x", color: highlightColor2 },
                ],
                values: [
                ],
                toFind: [
                    { text: "value of x, given hypotenuse c = √42", color: highlightColor3 },
                ]
            },
            fillBlanks: {
                instructionText: 'Drag the numbers to fill in the blanks on the triangle. Match each value to its correct position.',
                options: [
                    { id: 'opt1', text: '2x', blankID: 'blank1', feedbackText: 'Correct!' },
                    { id: 'opt2', text: '2x', blankID: 'blank2', feedbackText: 'Correct!' },
                    { id: 'opt3', text: '√42', blankID: 'blank3', feedbackText: 'Correct! The value √42 represents the hypotenuse.' },
                    { id: 'opt4', text: 'x', blankID: null, feedbackText: 'Incorrect. The sides are labeled 2x, not just x.' },
                    { id: 'opt5', text: '42', blankID: null, feedbackText: 'Incorrect. The hypotenuse is √42, not 42.' },
                    { id: 'opt6', text: '4x', blankID: null, feedbackText: 'Incorrect. Each side is 2x, not 4x.' }
                ]
            }
          },
          page6: {
              highlights: [
                    { 
                        text: "2x", 
                            highlightColor: highlightColor1, 
                            fontColor: '#000000',
                            fontSize: '30gc', 
                            bold: true, 
                            underline: false
                    },
                    { 
                        text: "2x", 
                            highlightColor: highlightColor2, 
                            fontColor: '#000000',
                            fontSize: '30gc', 
                            bold: true, 
                            underline: false
                    },
                    { 
                        text: "√42", 
                            highlightColor: highlightColor3, 
                            fontColor: '#000000',
                            fontSize: '30gc', 
                            bold: true, 
                            underline: false
                    },
                ],
              conceptSummary: {
                  given: [
                      { text: "One side a = 2x", color: highlightColor1 },
                      { text: "Another side b = 2x", color: highlightColor2 },
                      { text: "Hypotenuse c = √42", color: highlightColor3 }
                  ],
                  toFind: [
                      { text: "value of x", color: highlightColor3 }
                  ],
                  facts: [],
                  impFormulae: []
              },
              quizPanel: {
                  questionText: "Choose the correct relationship.",
                  options: [
                      { 
                          text: 'a² = b² + c²',
                          feedback: "Incorrect: That's not right! Try again.",
                          iscorrect: false
                      },
                      { 
                          text: 'c² = a² + b²',
                          feedback: 'Correct! That is the right answer.',
                          iscorrect: true
                      },
                      { 
                          text: 'b² = a² + c²',
                          feedback: "Incorrect: That's not right! Try again.",
                          iscorrect: false
                      },
                      { 
                          text: 'a² = b² - c²',
                          feedback: "Incorrect: That's not right! Try again.",
                          iscorrect: false
                      }
                  ],
                  impFormulae: ['c² = a² + b²']
              }
          },
          page7: {
              highlights: [],
              conceptSummary: {
                  given: [
                    { text: 'a = 2x', size: '20gc', color: '#FFD700' },
                    { text: 'b = √42', size: '20gc', color: '#70ACC7' },
                    { text: 'c = 5x', size: '20gc', color: '#F28283' }
                  ],
                  toFind: [
                    { text: 'Value of x', size: '20gc', color: '#F28283' }
                  ],
                  facts: [
                    { text: 'Pythagorean theorem', size: '20gc', color: '#8A2BE2' }
                  ],
                  values: [
                    { text: 'c² = a² + b²', size: '20gc', color: '#00FF7F' }
                  ]
              },
              calculationSteps: {
                  headerText: 'Calculation Steps',
                  steps: [
                      {
                          text: 'c² = a² + b²',
                          buttonText: 'Substitute Values'
                      },
                      {
                          explainer: 'Substituting, a=2x, b=√42, and c=5x',
                          text: '(5x)² = (2x)² + (√42)²',
                          buttonText: 'Calculate Squares'
                      },
                      {
                          text: '25x² = 4x² + 42',
                          buttonText: 'Rearrange Terms'
                      },
                      {
                          text: '25x² - 4x² = 42',
                          buttonText: 'Combine Like Terms'
                      },
                      {
                          text: '21x² = 42',
                          buttonText: 'Divide Both Sides by 21'
                      },
                      {
                          text: 'x² = 2, hence x = √2',
                          buttonText: 'Take Square Root'
                      },
                  ]
              }
          },
          page8: {
              highlights: [
              ],
              conceptSummary: {
                  given: [
                        { text: 'a = 2x, b = √42 and c = 5x', size: '20gc', color: '#F28283' }
                  ],
                  toFind: [
                  ],
                  facts: [
                    { text: 'Pythagorean theorem', size: '20gc', color: '#8A2BE2' }
                  ],
                  values: [
                    { text: 'c² = a² + b²', size: '20gc', color: '#00FF7F' },
                    { text: '(5x)² = (2x)² + (√42)²', size: '20gc', color: '#00FF7F' },
                    { text: '25x² = 4x² + 42', size: '20gc', color: '#00FF7F' },
                    { text: '25x² - 4x² = 42', size: '20gc', color: '#00FF7F' },
                    { text: '21x² = 42', size: '20gc', color: '#00FF7F' },
                    { text: 'x² = 2', size: '20gc', color: '#00FF7F' },
                    { text: 'x = √2', size: '20gc', color: '#00FF7F' }
                  ]
              },
              feedbackText: 'The value of x is √2, which is approximately 1.41'
          },
      },
    },
    id: {
      appInfo: {
          title: "Teorema Pythagoras - Variabel Segitiga"
      },
      messages: {
          pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
          nextButtonPage2: "Peristiwa perubahan halaman dikirim ke halaman 2",
          previousButtonPage1: "Peristiwa perubahan halaman dikirim ke halaman 1"
      },
      
      buttons: {
          next: "»",
          previous: "«",
          startOver: "Mulai Lagi"
      },
      
      common: {
          questionText: "Tentukan nilai x pada gambar yang diberikan.",
          questionIcon: "S",
          labels: {
              dropHere: "Letakkan di sini"
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
              toFind: "Ditanya",
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
              toFindTitle: "Ditanya",
              keyConceptsTitle: "Konsep Kunci",
              importantFormulaeTitle: "Perhitungan"
          },
          tapGif: {
              imageAlt: "Ketuk"
          }
      },
      
      pages: {
          page1: {
              highlights: [],
              problemDescription: "Mari kita cari nilai x menggunakan teorema Pythagoras."
          },
          page2: {
              highlights: [
                  { 
                      text: "2x", 
                          highlightColor: highlightColor1, 
                          fontColor: '#000000',
                          fontSize: '30gc', 
                          bold: true, 
                          underline: false
                      },
                  ],
              informationAnalysis: {
                  facts: [
                      { text: "Satu sisi a = 2x", color: highlightColor1 },
                      { text: "Sisi lain b = √42", color: highlightColor2 },
                      { text: "Hipotenusa c = 5x", color: highlightColor4 },
                  ],
                  values: [
                  ],
                  toFind: [
                  ]
              }
          },
          page3: {
              highlights: [
                  { 
                      text: "2x", 
                          highlightColor: highlightColor1, 
                          fontColor: '#000000',
                          fontSize: '30gc', 
                          bold: true, 
                          underline: false
                      },
                  { 
                      text: "Tentukan nilai x", 
                          highlightColor: highlightColor3, 
                          fontColor: '#000000',
                          fontSize: '30gc', 
                          bold: true, 
                          underline: false
                      },
                  ],
              informationAnalysis: {
                  facts: [
                      { text: "Satu sisi a = 2x", color: highlightColor1 },
                      { text: "Sisi lain b = √42", color: highlightColor2 },
                      { text: "Hipotenusa c = 5x", color: highlightColor4 },
                  ],
                  values: [
                  ],
                  toFind: [
                      { text: "Tentukan nilai x", color: highlightColor3 },
                  ]
              }
          },
          page4: {
              highlights: [
                    { 
                        text: "2x", 
                            highlightColor: highlightColor1, 
                            fontColor: '#000000',
                            fontSize: '30gc', 
                            bold: true, 
                            underline: false
                    },
                    { 
                        text: "2x", 
                            highlightColor: highlightColor2, 
                            fontColor: '#000000',
                            fontSize: '30gc', 
                            bold: true, 
                            underline: false
                    },
                    { 
                        text: "√42", 
                            highlightColor: highlightColor3, 
                            fontColor: '#000000',
                            fontSize: '30gc', 
                            bold: true, 
                            underline: false
                    },
                ],
              informationAnalysis: {
                facts: [
                    { text: "Satu sisi a = 2x", color: highlightColor1 },
                    { text: "Sisi lain b = 2x", color: highlightColor2 },
                ],
                values: [
                ],
                toFind: [
                    { text: "nilai x, diketahui hipotenusa c = √42", color: highlightColor3 },
                ]
            }
          },
          page5: {
              highlights: [
                    { 
                        text: "2x", 
                            highlightColor: highlightColor1, 
                            fontColor: '#000000',
                            fontSize: '30gc', 
                            bold: true, 
                            underline: false
                    },
                    { 
                        text: "2x", 
                            highlightColor: highlightColor2, 
                            fontColor: '#000000',
                            fontSize: '30gc', 
                            bold: true, 
                            underline: false
                    },
                    { 
                        text: "√42", 
                            highlightColor: highlightColor3, 
                            fontColor: '#000000',
                            fontSize: '30gc', 
                            bold: true, 
                            underline: false
                    },
                ],
              informationAnalysis: {
                facts: [
                    { text: "Satu sisi a = 2x", color: highlightColor1 },
                    { text: "Sisi lain b = 2x", color: highlightColor2 },
                ],
                values: [
                ],
                toFind: [
                    { text: "nilai x, diketahui hipotenusa c = √42", color: highlightColor3 },
                ]
            },
            fillBlanks: {
                instructionText: 'Seret angka untuk mengisi titik-titik pada segitiga. Cocokkan setiap nilai dengan posisi yang benar.',
                options: [
                    { id: 'opt1', text: '2x', blankID: 'blank1', feedbackText: 'Benar!' },
                    { id: 'opt2', text: '2x', blankID: 'blank2', feedbackText: 'Benar!' },
                    { id: 'opt3', text: '√42', blankID: 'blank3', feedbackText: 'Benar! Nilai √42 mewakili hipotenusa.' },
                    { id: 'opt4', text: 'x', blankID: null, feedbackText: 'Salah. Sisi-sisinya dilabeli 2x, bukan hanya x.' },
                    { id: 'opt5', text: '42', blankID: null, feedbackText: 'Salah. Hipotenusanya adalah √42, bukan 42.' },
                    { id: 'opt6', text: '4x', blankID: null, feedbackText: 'Salah. Setiap sisi adalah 2x, bukan 4x.' }
                ]
            }
          },
          page6: {
              highlights: [
                    { 
                        text: "2x", 
                            highlightColor: highlightColor1, 
                            fontColor: '#000000',
                            fontSize: '30gc', 
                            bold: true, 
                            underline: false
                    },
                    { 
                        text: "2x", 
                            highlightColor: highlightColor2, 
                            fontColor: '#000000',
                            fontSize: '30gc', 
                            bold: true, 
                            underline: false
                    },
                    { 
                        text: "√42", 
                            highlightColor: highlightColor3, 
                            fontColor: '#000000',
                            fontSize: '30gc', 
                            bold: true, 
                            underline: false
                    },
                ],
              conceptSummary: {
                  given: [
                      { text: "Satu sisi a = 2x", color: highlightColor1 },
                      { text: "Sisi lain b = 2x", color: highlightColor2 },
                      { text: "Hipotenusa c = √42", color: highlightColor3 }
                  ],
                  toFind: [
                      { text: "nilai x", color: highlightColor3 }
                  ],
                  facts: [],
                  impFormulae: []
              },
              quizPanel: {
                  questionText: "Pilih hubungan yang benar.",
                  options: [
                      { 
                          text: 'a² = b² + c²',
                          feedback: "Salah: Itu tidak benar! Coba lagi.",
                          iscorrect: false
                      },
                      { 
                          text: 'c² = a² + b²',
                          feedback: 'Benar! Itu jawaban yang tepat.',
                          iscorrect: true
                      },
                      { 
                          text: 'b² = a² + c²',
                          feedback: "Salah: Itu tidak benar! Coba lagi.",
                          iscorrect: false
                      },
                      { 
                          text: 'a² = b² - c²',
                          feedback: "Salah: Itu tidak benar! Coba lagi.",
                          iscorrect: false
                      }
                  ],
                  impFormulae: ['c² = a² + b²']
              }
          },
          page7: {
              highlights: [],
              conceptSummary: {
                  given: [
                    { text: 'a = 2x, b = √42, c = 5x', size: '20gc', color: '#F28283' }
                  ],
                  toFind: [
                    { text: 'Nilai x', size: '20gc', color: '#F28283' }
                  ],
                  facts: [
                    { text: 'Teorema Pythagoras', size: '20gc', color: '#8A2BE2' }
                  ],
                  values: [
                    { text: 'c² = a² + b²', size: '20gc', color: '#00FF7F' }
                  ]
              },
              calculationSteps: {
                  headerText: 'Langkah Perhitungan',
                  steps: [
                      {
                          text: 'c² = a² + b²',
                          buttonText: 'Substitusi Nilai'
                      },
                      {
                          explainer: 'Substitusi, a=2x, b=√42, dan c=5x',
                          text: '(5x)² = (2x)² + (√42)²',
                          buttonText: 'Hitung Kuadrat'
                      },
                      {
                          text: '25x² = 4x² + 42',
                          buttonText: 'Susun Ulang Suku'
                      },
                      {
                          text: '25x² - 4x² = 42',
                          buttonText: 'Gabungkan Suku Sejenis'
                      },
                      {
                          text: '21x² = 42',
                          buttonText: 'Bagi Kedua Sisi dengan 21'
                      },
                      {
                          text: 'x² = 2, maka x = √2',
                          buttonText: 'Akar Kuadrat'
                      },
                  ]
              }
          },
          page8: {
              highlights: [
              ],
              conceptSummary: {
                  given: [
                    { text: 'a = 2x, b = √42, c = 5x', size: '20gc', color: '#F28283' }
                  ],
                  toFind: [
                  ],
                  facts: [
                    { text: 'Teorema Pythagoras', size: '20gc', color: '#8A2BE2' }
                  ],
                  values: [
                    { text: 'c² = a² + b²', size: '20gc', color: '#00FF7F' },
                    { text: '(5x)² = (2x)² + (√42)²', size: '20gc', color: '#00FF7F' },
                    { text: '25x² = 4x² + 42', size: '20gc', color: '#00FF7F' },
                    { text: '25x² - 4x² = 42', size: '20gc', color: '#00FF7F' },
                    { text: '21x² = 42', size: '20gc', color: '#00FF7F' },
                    { text: 'x² = 2', size: '20gc', color: '#00FF7F' },
                    { text: 'x = √2', size: '20gc', color: '#00FF7F' }
                  ]
              },
              feedbackText: 'Nilai x adalah √2, yang kira-kira sama dengan 1.41'
          },
      },
    },
  }
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
