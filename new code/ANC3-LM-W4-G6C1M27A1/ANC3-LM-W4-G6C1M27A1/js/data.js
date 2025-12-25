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
          previousButtonPage1: "Dispatched page change event to page 1",
          startButtonPage1: "Dispatched page change event to page 2"
      },
      
      buttons: {
          next: "»",
          previous: "«",
          startOver: "Start Over",
          start: "Start"
      },
      
      common: {
          questionText: "Asep has 12 chickens, each chicken consumes 3 bowls of food a day. How many bowls of food should Asep provide each day?",
          questionIcon: "Q",
          labels: {
              dropHere: "Drop here",
              group: "Group"
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
              title: "Division as Multiplication by the Reciprocal",
              instructionText: "We learned that the reciprocal of a number is found by flipping it.<br>Now, let's learn how dividing by a number is the same as multiplying with its reciprocal.<br>Tap 'Start' to start the activity.",
              questions: [
                  { dividend: 2, divisor: 3 },
                  { dividend: 4, divisor: 5 },
                  { dividend: 3, divisor: 4 }
              ]
          },
          page2: {
              highlights: [],
              headerText: "Consider a division problem.",
              instructionText: "Tap next to continue."
          },
          page3: {
              highlights: [],
              headerText: "Let's take {dividend} {wholeWord} to represent {dividend}. But we cannot divide {dividend} {wholeWord} into {divisor} equal groups without splitting them.",
              instructionText: "Tap next to continue."
          },
          page4: {
              highlights: [
                    { 
                        text: "Asep has 12 chickens,",
                            highlightColor: highlightColor1, 
                            fontColor: '#000000',
                                fontSize: questionTextSize,
                            bold: true, 
                            underline: false
                    },
                    { 
                        text: "each chicken consumes 3 bowls of food a day",
                            highlightColor: highlightColor2, 
                            fontColor: '#000000',
                                fontSize: questionTextSize,
                            bold: true, 
                            underline: false
                    },
                    { 
                        text: "How many bowls of food should Asep provide each day?",
                            highlightColor: highlightColor3, 
                            fontColor: '#000000',
                                fontSize: questionTextSize,
                            bold: true, 
                            underline: false
                    },
                ],
              headerText: "Now, let's split the {dividend} {wholeWord} into as many groups as the divisor.",
              instructionText: "Use slider to set the divisor and then tap Check.",
              sliderLabel: "Divisor",
              checkButtonText: "Check",
              feedback: {
                  correct: "Good. You divided {dividend} wholes equally among {divisor} groups.",
                  increaseSlider: "Oops! Increase the slider to match the divisor in the problem.",
                  decreaseSlider: "Oops! Decrease the slider to match the divisor in the problem.",
                  incorrect: "Incorrect. Try again."
              },
              informationAnalysis: {
                facts: [
                    { text: "Asep has 12 chickens.", size: '20gc', color: highlightColor1 },
                    { text: "Each chicken consumes 3 bowls of food a day.", size: '20gc', color: highlightColor2 }
                ],
                values: [
                ],
                toFind: [
                    { text: "How many bowls of food should Asep provide each day?", size: '20gc', color: highlightColor3 }
                ]
            }
          },
          page5: {
              highlights: [],
              headerText: "How much does each group get?",
              instructionText: "Choose the correct answer.",
              conceptSummary: {
                  given: [
                      { text: "Asep has 12 chickens.", size: '20gc', color: highlightColor1 },
                      { text: "Each chicken consumes 3 bowls of food a day.", size: '20gc', color: highlightColor2 }
                  ],
                  toFind: [
                      { text: "How many bowls of food should Asep provide each day?", size: '20gc', color: highlightColor3 }
                  ],
                  facts: [
                  ],
                  values: [
                  ]
              },
              quizPanel: {
                  questionText: "What does each group get when {dividend} wholes are divided equally among {divisor} groups?",
                  options: {
                      option1: {
                          text: "Numerator times, i.e. $__DIVIDEND__ \\times \\frac{1}{__DIVISOR__}$",
                          feedback: "Good! Each group gets $__DIVIDEND__ \\times \\frac{1}{__DIVISOR__}$"
                      },
                      option2: {
                          text: "Total parts in each whole times, i.e. $__TOTAL_PARTS_PER_WHOLE__ \\times \\frac{1}{__DIVISOR__}$",
                          feedback: "Incorrect! Try again."
                      },
                      option3: {
                          text: "Total parts in both wholes times, i.e. $__TOTAL_PARTS_IN_BOTH__ \\times \\frac{1}{__DIVISOR__}$",
                          feedback: "Incorrect! Try again."
                      }
                  },
                  impFormulae: [
                      "Total price to pay = (No. of chickens) × (Bowls consumed by chicken)"
                  ]
              }
          },
          page6: {
              highlights: [],
              headerText: "Notice that dividing {dividend} by {divisor} is the same as multiplying {dividend} by one-{ordinal}.",
              resultLabel: "Result",
              changeSignLabel: "Change sign",
              reciprocalLabel: "Reciprocal",
              conclusionText: "We can rewrite division as multiplication by the reciprocal.",
              instructionText: {
                  lastQuestion: "Tap >> to continue",
                  notLastQuestion: "Tap Next to try a new challenge."
              },
              conceptSummary: {
                  given: [
                      { text: "Asep has 12 chickens.", size: '20gc', color: highlightColor1 },
                      { text: "Each chicken consumes 3 bowls of food a day.", size: '20gc', color: highlightColor2 }
                  ],
                  toFind: [
                      { text: "How many bowls of food should Asep provide each day?", size: '20gc', color: highlightColor3 }
                  ],
                  facts: [
                  ],
                  impFormulae: [
                      "Total price to pay = (No. of chickens) × (Bowls consumed by chicken)"
                  ]
              },
              fillBlanks: {
                  instructionText: "Drag and drop the options to complete the mathematical sentence.",
                  options: [
                      { 
                          id: 'opt1', 
                          text: '12', 
                          feedbackText: "Correct! Asep has 12 chickens.", 
                          blankID: 'blank1' 
                      },
                      { 
                          id: 'opt2', 
                          text: '3', 
                          feedbackText: "Correct! Each chicken consumes 3 bowls of food a day.", 
                          blankID: 'blank2' 
                      },
                      { 
                          id: 'opt3', 
                          text: '15', 
                          feedbackText: "Incorrect. Asep has 12 chickens, not 15.", 
                          blankID: null 
                      },
                      { 
                          id: 'opt4', 
                          text: '4', 
                          feedbackText: "Incorrect. Each chicken consumes 3 bowls, not 4.", 
                          blankID: null 
                      }
                  ],
                  impFormulae: [
                      "Total price to pay = 12 × 3"
                  ]
              },
              expressionText: "Total price to pay = (No. of chickens) × (Bowls consumed by chicken)",
              expressionBlanksText: "Total price to pay =",
              multiplySymbol: "×"
          },
          page7: {
              headerText: "Activity Completed!",
              ruleText: "Division by a number is the same as multiplying with reciprocal of that number.",
              instructionText: "Tap 'Start Over' to restart the activity.",
              line1: "Number 1 ÷ Number 2",
              line2: "= Number 1 × Reciprocal of Number 2",
              line3: "= Number 1 × (1/Number 2)"
          },
      },
    },
    id: {
      common: {
          labels: {
          group: "Kelompok"
        }
      },
      pages: {
          page1: {
              title: "Pembagian sebagai Perkalian dengan Resiprokal",
              instructionText: "Kita telah belajar bahwa resiprokal suatu bilangan ditemukan dengan membalikkannya.<br>Sekarang, mari kita pelajari bagaimana membagi dengan suatu bilangan sama dengan mengalikan dengan resiprokalnya.<br>Ketuk 'Mulai' untuk memulai aktivitas."
          },
          page2: {
              headerText: "Pertimbangkan masalah pembagian.",
              instructionText: "Ketuk berikutnya untuk melanjutkan."
          },
          page3: {
              headerText: "Mari kita ambil {dividend} {wholeWord} untuk mewakili {dividend}. Tetapi kita tidak dapat membagi {dividend} {wholeWord} menjadi {divisor} kelompok yang sama tanpa membaginya.",
              instructionText: "Ketuk berikutnya untuk melanjutkan."
          },
          page4: {
              headerText: "Sekarang, mari kita bagi {dividend} {wholeWord} menjadi sebanyak mungkin kelompok sesuai dengan pembagi.",
              instructionText: "Gunakan slider untuk mengatur pembagi lalu ketuk Periksa.",
              sliderLabel: "Pembagi",
              checkButtonText: "Periksa",
              feedback: {
                  correct: "Bagus. Anda membagi {dividend} keseluruhan secara merata di antara {divisor} kelompok.",
                  increaseSlider: "Ups! Naikkan slider agar sesuai dengan pembagi dalam masalah.",
                  decreaseSlider: "Ups! Turunkan slider agar sesuai dengan pembagi dalam masalah.",
                  incorrect: "Salah. Coba lagi."
              }
          },
          page5: {
              headerText: "Berapa banyak yang didapat setiap kelompok?",
              instructionText: "Pilih jawaban yang benar.",
              quizPanel: {
                  questionText: "Apa yang didapat setiap kelompok ketika {dividend} keseluruhan dibagi secara merata di antara {divisor} kelompok?",
                  options: {
                      option1: {
                          text: "Pembilang kali, yaitu $__DIVIDEND__ \\times \\frac{1}{__DIVISOR__}$",
                          feedback: "Bagus! Setiap kelompok mendapat $__DIVIDEND__ \\times \\frac{1}{__DIVISOR__}$"
                      },
                      option2: {
                          text: "Total bagian dalam setiap keseluruhan kali, yaitu $__TOTAL_PARTS_PER_WHOLE__ \\times \\frac{1}{__DIVISOR__}$",
                          feedback: "Salah! Coba lagi."
                      },
                      option3: {
                          text: "Total bagian dalam kedua keseluruhan kali, yaitu $__TOTAL_PARTS_IN_BOTH__ \\times \\frac{1}{__DIVISOR__}$",
                          feedback: "Salah! Coba lagi."
                      }
                  }
              }
          },
          page6: {
              headerText: "Perhatikan bahwa membagi {dividend} dengan {divisor} sama dengan mengalikan {dividend} dengan {ordinal}.",
              resultLabel: "Hasil",
              changeSignLabel: "Ubah tanda",
              reciprocalLabel: "Resiprokal",
              conclusionText: "Kita dapat menulis ulang pembagian sebagai perkalian dengan resiprokal.",
              instructionText: {
                  lastQuestion: "Ketuk >> untuk melanjutkan",
                  notLastQuestion: "Ketuk Berikutnya untuk mencoba tantangan baru."
              }
          },
          page7: {
              headerText: "Aktivitas Selesai!",
              ruleText: "Pembagian dengan suatu bilangan sama dengan mengalikan dengan resiprokal bilangan tersebut.",
              instructionText: "Ketuk 'Mulai Lagi' untuk memulai ulang aktivitas.",
              line1: "Bilangan 1 ÷ Bilangan 2",
              line2: "= Bilangan 1 × Resiprokal dari Bilangan 2",
              line3: "= Bilangan 1 × (1/Bilangan 2)"
          }
      }
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
