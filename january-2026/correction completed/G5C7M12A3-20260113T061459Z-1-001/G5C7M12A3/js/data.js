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
        totalWeight: "Total weight",
        questionText: "Joko went shopping at Beringharjo Market. He bought $1 \\frac{1}{5}$ kg of Javanese sugar and $2 \\frac{2}{5}$ kg flour. How many kg does the total weight?",
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
              text: "$1 \\frac{1}{5}$ kg of Javanese sugar",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Javanese sugar = $1 \\frac{1}{5}$ kg",
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
              text: "$2 \\frac{2}{5}$ kg flour",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Javanese sugar = $1 \\frac{1}{5}$ kg",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Flour = $2 \\frac{2}{5}$ kg",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: [
            ],
            toFind: [
            ]
          }
        },
        page4: {
          headerText: "Read the question and identify 'given' and 'to find'",
          footerInstruction: "Tap » to build the mathematical sentence",
          highlights: [
            
            {
              text: "total weight",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Javanese sugar = $1 \\frac{1}{5}$ kg",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Flour = $2 \\frac{2}{5}$ kg",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: [
            ],
            toFind: [
              {
                text: "Total weight (kg)",
                size: highlightTextSize,
                color: highlightColor3
              }
            ]
          }
        },
        page5: {
          headerText: "Build a mathematical sentence for the given scene",
          footerInstruction: "Drag the correct buttons to the correct spot in the sentence",
          instructionAfterQuiz: "Tap » to substitute values into the equation",
          equationText: {
            totalWeight: 'Total weight'
          },
          optionTextFillBlanks: {
            optionOpt1Text: "Javenese sugar weight",
            optionOpt2Text: 'Flour weight',
          },
          optionOpt1Feedback: "Correct! This is the distance from Komang to Yohana house.",
          optionOpt2Feedback: "Correct! This is the distance from Yohana to Lukas house.",
          optionPlusCorrectFeedback: "Correct!",
          optionMinusNotNeededFeedback: "This operator is not needed here."
        },
        page6: {
          headerText: "Build a mathematical sentence for the given scene",
          footerInstruction: "Tap » to Continue",
          equationText: {
            totalWeight: 'Total weight',
            javeneseSugar: "Javenese sugar weight",
            flourWeight: 'Flour weight',
          },
          fractionAddition: "This is a Mixed Fractions Addition challenge!"
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
          headerText: "What is the correct order of steps for adding mixed numbers?",
          footerInstruction: "Rearrange the buttons to the correct sequence of steps",
          instructionAfterQuiz: "Tap » to explore the first step in more detail",
          steps: [
            'Convert mixed numbers into improper fractions.',
            'Add improper fractions.',
            'Convert the result back to a mixed number.'
          ],
          totalWeight: "Total Weight"
        },
        page9: {
          headerText: "What is the correct formula for converting a mixed to improper fraction?",
          footerInstruction: "Drag the correct terms to make the improper fraction",
          highlights: [],
          totalWeight: "Total Weight",
          mixedNumberNotation: "Mixed Number Notation",
          improperFractionNotation: "Improper Fraction Notation",
          instructionText: "Let's find out the distance from Yohana's house to Lukas's house by adding the mixed numbers and the fraction.",
          tapToExploreStep2: "Tap » to explore step 2 in more detail",
          solutionSteps: {
            mixedNumberAddition: "Mixed Number Addition",
            steps: [
              {
                text: 'Convert mixed numbers into improper fractions',
                subSteps: []
              },
              {
                text: 'Add Improper Fractions',
                subSteps: []
              },
              {
                text: 'Convert the result back into a mixed number',
                subSteps: []
              }
            ]
          },
          fillBlanks: {
            options: [
              // Option 1: "whole part" - #477F98, horizontal button on the left (can go to blank1 or blank2, maxDrops: 1)
              { id: 'opt1', text: 'whole part', image: '', blankID: ['blank1', 'blank2'], maxDrops: 1, feedbackText: 'Correct!', coordinate: [150, 400, 375, 475], buttonColor: '#477F98' },
              // Option 2: "numerator" - #905D7B, above fraction bar, reduced by 25gc (275x75)
              { id: 'opt2', text: 'numerator', image: '', blankID: ['blank3'], feedbackText: 'Correct!', coordinate: [400, 353, 675, 428], buttonColor: '#905D7B' },
              // Option 3: "denominator" - #838574, below fraction bar, reduced by 25gc (275x75) (can go to blank1, blank2, blank3, or blank4, maxDrops: 2)
              { id: 'opt3', text: 'denominator', image: '', blankID: ['blank1', 'blank2', 'blank3', 'blank4'], maxDrops: 2, feedbackText: 'Correct!', coordinate: [400, 450, 675, 525], buttonColor: '#838574' },
              // Option 4: "+" - #F9A52F, square button stacked vertically on the right (top)
              { id: 'opt4', text: '+', image: '', blankID: ['blank-plus'], feedbackText: 'Correct!', coordinate: [900, 360, 960, 420], buttonColor: '#F9A52F' },
              // Option 5: "×" - #F9A52F, square button stacked vertically on the right (bottom)
              { id: 'opt5', text: '×', image: '', blankID: ['blank-times'], feedbackText: 'Correct!', coordinate: [900, 450, 960, 510], buttonColor: '#F9A52F' },
            ]
          }
        },
        page10: {
          highlights: [],
          quizPanel: {
            questionText: 'Tap the correct option to add like fractions.',
            options: [
              {
                text: "Add numerators and denominators.",
                iscorrect: false,
                feedback: "Check Again!",
              },
              {
                text: "Add numerators and keep the denominator the same.",
                iscorrect: true,
                feedback: "That's Correct!",
              },
              {
                text: "Add denominators and keep the numerator the same.",
                iscorrect: false,
                feedback: "Check Again!",
              },
              {
                text: "None of these",
                iscorrect: false,
                feedback: "Check Again!",
              }
            ],
          },
          tapToExploreStep3: "Tap » to explore step 3 in more detail",
          solutionSteps: {
            headerText: "Mixed Number Addition",
            steps: [
              {
                text: 'Convert mixed numbers into improper fractions',
                subSteps: []
              },
              {
                text: 'Add Improper Fractions',
                subSteps: []
              },
              {
                text: 'Convert the result back into a mixed number',
                subSteps: []
              }
            ]

          },
          totalWeight: 'Total Weight',
          footerInstruction: "Select the correct option",
        },
        page11: {
          headerText: "What is the correct formula for converting a improper fraction into an mixed number?",
          footerInstruction: "Drag the correct terms to make the mixed fraction",
          instructionAfterQuiz: "Tap » to continue.",
          solutionSteps: {
            headerText: "Mixed Number Addition",
            steps: [
              {
                text: 'Convert mixed numbers into improper fractions',
                subSteps: []
              },
              {
                text: 'Add Improper Fractions',
                subSteps: []
              },
              {
                text: 'Convert the result back into a mixed number',
                subSteps: []
              }
            ],
          },
          fillBlanks: {
            options: [
              // Option 1: "numerator" - #477F98, left side top (inside mixed-fraction container) - not used in correct answer
              { id: 'opt1', text: 'numerator', image: '', blankID: [], feedbackText: 'Incorrect!', coordinate: [320, 350, 520, 430], buttonColor: '#477F98' },
              // Option 2: "denominator" - #838574, left side bottom (inside mixed-fraction container) - goes to blank3 (bottom right)
              { id: 'opt2', text: 'denominator', image: '', blankID: ['blank3'], feedbackText: 'Correct!', coordinate: [320, 450, 520, 530], buttonColor: '#838574' },
              // Option 3: "quotient" - #905D7B, right side top (inside mixed-fraction container) - goes to blank1 (left)
              { id: 'opt3', text: 'quotient', image: '', blankID: ['blank1'], feedbackText: 'Correct!', coordinate: [640, 350, 820, 430], buttonColor: '#905D7B' },
              // Option 4: "remainder" - #F9A52F, right side bottom (inside mixed-fraction container) - goes to blank2 (top right)
              { id: 'opt4', text: 'remainder', image: '', blankID: ['blank2'], feedbackText: 'Correct!', coordinate: [640, 450, 820, 530], buttonColor: '#F9A52F' },
            ]
          },
        },
        page12: {
          headerText: "What is the correct formula for converting a improper fraction into an mixed number?",
          footerInstruction: "Tap » to add the mixed numbers using these steps",
          solutionSteps: {
            headerText: "Mixed Number Addition",
            steps: [
              {
                text: 'Convert mixed numbers into improper fractions',
                subSteps: []
              },
              {
                text: 'Add Improper Fractions',
                subSteps: []
              },
              {
                text: 'Convert the result back into a mixed number',
                subSteps: []
              }
            ],
          },
          informationGathered: '<span style="color: #20B2AA;">&#10003;</span>\u00A0Information gathered from question.',
          stepsRequired: '<span style="color: #20B2AA;">&#10003;</span>\u00A0Steps required to find answer',
          nextFinding: "Next - Finding the required Result",
        },
        page13: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the answer.",
          instructionAfterQuiz: "Tap » for step 2",
          solutionSteps: {
            headerText: "Mixed Number Addition",
            steps: [
              {
                text: 'Convert mixed numbers into improper fractions',
                subSteps: []
              },
              {
                text: 'Add Improper Fractions',
                subSteps: []
              },
              {
                text: 'Convert the result back into a mixed number',
                subSteps: []
              }
            ],
          },
        },
       
        
        page14: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the sum",
          instructionAfterQuiz: "Tap » for step 3",
          solutionSteps: {
            headerText: "Mixed Number Addition",
            steps: [
              {
                text: 'Convert mixed numbers into improper fractions',
                subSteps: []
              },
              {
                text: 'Add Improper Fractions',
                subSteps: []
              },
              {
                text: 'Convert the result back into a mixed number',
                subSteps: []
              }
            ],
          },
        },
        page15: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the answer",
          instructionAfterQuiz: "Tap » to summarise",
          solutionSteps: {
            headerText: "Mixed Number Addition",
            steps: [
              {
                text: 'Convert mixed numbers into improper fractions',
                subSteps: []
              },
              {
                text: 'Add Improper Fractions',
                subSteps: []
              },
              {
                text: 'Convert the result back into a mixed number',
                subSteps: []
              }
            ],
          },
        },
        page16: {
          highlights: [
            {
              text: " How many kg does the total weight",
              fontColor: highlightColor3,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          headerText: "Identify scene – Build Equation – Solve for unknown",
          footerInstruction: "Tap 'Start Over' to re-do activity",
          solutionSteps: {
            headerText: "Mixed Number Addition",
            steps: [
              {
                text: 'Convert mixed numbers into improper fractions',
                subSteps: []
              },
              {
                text: 'Add Improper Fractions',
                subSteps: []
              },
              {
                text: 'Convert the result back into a mixed number',
                subSteps: []
              }
            ],
          },
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
        totalWeight: "Berat total",
        questionText:
          "Joko berbelanja di Pasar Beringharjo. Ia membeli $1 \\frac{1}{5}$ kg gula Jawa dan $2 \\frac{2}{5}$ kg tepung. Berapa kg berat totalnya?",
        questionIcon: "T",
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
            "Mari kita cari berat total dengan menjumlahkan bilangan campuran.",
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
              text: "$1 \\frac{1}{5}$ kg gula Jawa",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Gula Jawa = $1 \\frac{1}{5}$ kg",
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
              text: "$1 \\frac{1}{5}$ kg gula Jawa",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "$2 \\frac{2}{5}$ kg tepung",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Gula Jawa = $1 \\frac{1}{5}$ kg",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Tepung = $2 \\frac{2}{5}$ kg",
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
              text: "$1 \\frac{1}{5}$ kg gula Jawa",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "$2 \\frac{2}{5}$ kg tepung",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "berat total",
              fontColor: highlightColor3,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Gula Jawa = $1 \\frac{1}{5}$ kg",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Tepung = $2 \\frac{2}{5}$ kg",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: [],
            toFind: [
              {
                text: "Berat total (kg)",
                size: highlightTextSize,
                color: highlightColor3
              }
            ]
          }
        },

        page5: {
          headerText: "Buat kalimat matematika untuk situasi yang diberikan",
          footerInstruction:
            "Seret tombol yang benar ke tempat yang sesuai dalam kalimat",
          equationText: {
            totalWeight: "Berat total"
          },
          optionTextFillBlanks: {
            optionOpt1Text: "Berat gula Jawa",
            optionOpt2Text: "Berat tepung"
          },
          optionOpt1Feedback: "Benar!",
          optionOpt2Feedback: "Benar!",
          optionPlusCorrectFeedback: "Benar!",
          optionMinusNotNeededFeedback: "Operator ini tidak diperlukan di sini."
        },

        page6: {
          headerText: "Buat kalimat matematika untuk situasi yang diberikan",
          footerInstruction: "Ketuk » untuk melanjutkan",
          equationText: {
            totalWeight: "Berat total",
            javeneseSugar: "Berat gula Jawa",
            flourWeight: "Berat tepung"
          },
          fractionAddition: "Ini adalah tantangan penjumlahan pecahan campuran!"
        },

        page7: {
          headerText: "Buat kalimat matematika untuk situasi yang diberikan",
          footerInstruction:
            "Ketuk » untuk mengidentifikasi semua langkah penjumlahan yang diperlukan",
          equationText: {
            totalWeight: "Berat total",
            javeneseSugar: "Berat gula Jawa",
            flourWeight: "Berat tepung"
          },
          informationGathered:
            '<span style="color: #20B2AA;">&#10003;</span>\u00A0Informasi telah dikumpulkan dari soal.',
          nextStep: "Selanjutnya – Langkah-langkah untuk menemukan jawaban."
        },

        page8: {
          headerText: "Apa urutan langkah yang benar untuk menjumlahkan bilangan campuran?",
          footerInstruction: "Susun tombol sesuai urutan langkah yang benar",
          steps: [
            "Ubah bilangan campuran menjadi pecahan tidak wajar.",
            "Jumlahkan pecahan tidak wajar.",
            "Ubah hasilnya kembali menjadi bilangan campuran."
          ],
          totalWeight: "Berat total"
        },

        page9: {
          headerText: "Apa rumus yang benar untuk mengubah bilangan campuran menjadi pecahan tidak wajar?",
          footerInstruction: "Seret istilah yang benar untuk membentuk pecahan tidak wajar",
          highlights: [],
          totalWeight: "Berat total",
          mixedNumberNotation: "Notasi Bilangan Campuran",
          improperFractionNotation: "Notasi Pecahan Tidak Wajar",
          instructionText:
            "Mari kita cari berat total dengan menjumlahkan bilangan campuran.",
          tapToExploreStep2: "Ketuk » untuk mengeksplorasi langkah 2 lebih detail",
          solutionSteps: {
            mixedNumberAddition: "Penjumlahan Bilangan Campuran",
            steps: [
              { text: "Ubah bilangan campuran menjadi pecahan tidak wajar", subSteps: [] },
              { text: "Jumlahkan pecahan tidak wajar yang diperoleh", subSteps: [] },
              { text: "Ubah hasilnya kembali menjadi bilangan campuran", subSteps: [] }
            ]
          },
          fillBlanks: {
            options: [
              { id: "opt1", text: "bagian bulat", image: "", blankID: ["blank1", "blank2"], maxDrops: 1, feedbackText: "Benar!", coordinate: [150, 400, 375, 475], buttonColor: "#477F98" },
              { id: "opt2", text: "pembilang", image: "", blankID: ["blank3"], feedbackText: "Benar!", coordinate: [400, 353, 675, 428], buttonColor: "#905D7B" },
              { id: "opt3", text: "penyebut", image: "", blankID: ["blank1", "blank2", "blank3", "blank4"], maxDrops: 2, feedbackText: "Benar!", coordinate: [400, 450, 675, 525], buttonColor: "#838574" },
              { id: "opt4", text: "+", image: "", blankID: ["blank-plus"], feedbackText: "Benar!", coordinate: [900, 360, 960, 420], buttonColor: "#F9A52F" },
              { id: "opt5", text: "×", image: "", blankID: ["blank-times"], feedbackText: "Benar!", coordinate: [900, 450, 960, 510], buttonColor: "#F9A52F" }
            ]
          }
        },

        page10: {
          highlights: [],
          arrangeSteps: {
            instructionText: "Apa rumus yang benar untuk mengubah bilangan campuran menjadi pecahan tidak wajar?",
            steps: [
              "Tentukan KPK dari penyebut.",
              "Ubah menjadi pecahan senilai.",
              "Jumlahkan pecahan senilai yang dihasilkan."
            ]
          },
          tapToExploreStep3: "Ketuk » untuk mengeksplorasi langkah 3 lebih detail",
          solutionSteps: {
            headerText: "Penjumlahan Bilangan Campuran",
            steps: [
              { text: "Ubah bilangan campuran menjadi pecahan tidak wajar", subSteps: [] },
              {
                text: "Jumlahkan pecahan tidak wajar yang diperoleh",
                subSteps: [
                  { text: "Tentukan KPK dari penyebut" },
                  { text: "Ubah menjadi pecahan senilai" },
                  { text: "Jumlahkan pecahan senilai" }
                ]
              },
              { text: "Ubah hasilnya kembali menjadi bilangan campuran", subSteps: [] }
            ]
          },
          totalWeight: "Berat total",
          footerInstruction: "Susun tombol sesuai urutan langkah yang benar"
        },

        page11: {
          headerText: "Apa rumus yang benar untuk mengubah pecahan tidak wajar menjadi bilangan campuran?",
          footerInstruction: "Seret istilah yang benar untuk membentuk pecahan campuran",
          solutionSteps: {
            headerText: "Penjumlahan Bilangan Campuran",
            steps: [
              { text: "Ubah bilangan campuran menjadi pecahan tidak wajar", subSteps: [] },
              {
                text: "Jumlahkan pecahan tidak wajar yang diperoleh",
                subSteps: [
                  { text: "Tentukan KPK dari penyebut" },
                  { text: "Ubah menjadi pecahan senilai" },
                  { text: "Jumlahkan pecahan senilai" }
                ]
              },
              { text: "Ubah hasilnya kembali menjadi bilangan campuran", subSteps: [] }
            ]
          },
          fillBlanks: {
            options: [
              { id: "opt1", text: "pembilang", image: "", blankID: [], feedbackText: "Salah!", coordinate: [320, 350, 520, 430], buttonColor: "#477F98" },
              { id: "opt2", text: "penyebut", image: "", blankID: ["blank3"], feedbackText: "Benar!", coordinate: [320, 450, 520, 530], buttonColor: "#838574" },
              { id: "opt3", text: "hasil bagi", image: "", blankID: ["blank1"], feedbackText: "Benar!", coordinate: [640, 350, 820, 430], buttonColor: "#905D7B" },
              { id: "opt4", text: "sisa", image: "", blankID: ["blank2"], feedbackText: "Benar!", coordinate: [640, 450, 820, 530], buttonColor: "#F9A52F" }
            ]
          }
        },

        page12: {
          headerText: "Apa rumus yang benar untuk mengubah pecahan tidak wajar menjadi bilangan campuran?",
          footerInstruction: "Ketuk » untuk menjumlahkan bilangan campuran dengan langkah-langkah ini",
          solutionSteps: {
            headerText: "Penjumlahan Bilangan Campuran",
            steps: [
              { text: "Ubah bilangan campuran menjadi pecahan tidak wajar", subSteps: [] },
              {
                text: "Jumlahkan pecahan tidak wajar yang diperoleh",
                subSteps: [
                  { text: "Tentukan KPK dari penyebut" },
                  { text: "Ubah menjadi pecahan senilai" },
                  { text: "Jumlahkan pecahan senilai" }
                ]
              },
              { text: "Ubah hasilnya kembali menjadi bilangan campuran", subSteps: [] }
            ]
          },
          informationGathered:
            '<span style="color: #20B2AA;">&#10003;</span>\u00A0Informasi telah dikumpulkan dari soal.',
          stepsRequired:
            '<span style="color: #20B2AA;">&#10003;</span>\u00A0Langkah-langkah telah ditentukan',
          nextFinding: "Selanjutnya – Menentukan hasil akhir"
        },

        page13: {
          headerText: "Kerjakan langkahnya di buku catatanmu dan sebutkan jawabannya.",
          footerInstruction: "Ketuk '?' untuk melihat jawaban tiap konversi",
          solutionSteps: {
            headerText: "Penjumlahan Bilangan Campuran",
            steps: [
              { text: "Ubah bilangan campuran menjadi pecahan tidak wajar", subSteps: [] },
              {
                text: "Jumlahkan pecahan tidak wajar yang diperoleh",
                subSteps: [
                  { text: "Tentukan KPK dari penyebut" },
                  { text: "Ubah menjadi pecahan senilai" },
                  { text: "Jumlahkan pecahan senilai" }
                ]
              },
              { text: "Ubah hasilnya kembali menjadi bilangan campuran", subSteps: [] }
            ]
          }
        },

        page14: {
          headerText: "Kerjakan langkahnya di buku catatanmu dan sebutkan jawabannya.",
          footerInstruction: "Ketuk tombol KPK untuk mencari KPK dari pecahan.",
          lcmButtonText: "KPK dari 5 dan 5",
          solutionSteps: {
            headerText: "Penjumlahan Bilangan Campuran",
            steps: [
              { text: "Ubah bilangan campuran menjadi pecahan tidak wajar", subSteps: [] },
              {
                text: "Jumlahkan pecahan tidak wajar yang diperoleh",
                subSteps: [
                  { text: "Tentukan KPK dari penyebut" },
                  { text: "Ubah menjadi pecahan senilai" },
                  { text: "Jumlahkan pecahan senilai" }
                ]
              },
              { text: "Ubah hasilnya kembali menjadi bilangan campuran", subSteps: [] }
            ]
          }
        },

        page15: {
          headerText: "Kerjakan langkahnya di buku catatanmu dan sebutkan jawabannya.",
          footerInstruction: "Ketuk » untuk Langkah 2.b",
          tapForStep2: "Ketuk » untuk Langkah 2",
          solutionSteps: {
            headerText: "Penjumlahan Bilangan Campuran",
            steps: [
              { text: "Ubah bilangan campuran menjadi pecahan tidak wajar", subSteps: [] },
              {
                text: "Jumlahkan pecahan tidak wajar yang diperoleh",
                subSteps: [
                  { text: "Tentukan KPK dari penyebut" },
                  { text: "Ubah menjadi pecahan senilai" },
                  { text: "Jumlahkan pecahan senilai" }
                ]
              },
              { text: "Ubah hasilnya kembali menjadi bilangan campuran", subSteps: [] }
            ]
          }
        },

        page16: {
          headerText: "Kerjakan langkahnya di buku catatanmu dan sebutkan jawabannya.",
          footerInstruction: "Ketuk '?' untuk melihat hasil penjumlahan",
          instructionRevealConversions: "Ketuk '?' untuk melihat jawaban tiap konversi",
          tapToContinue: "Ketuk » untuk melanjutkan",
          tapToFindSum: "Ketuk » untuk mencari jumlah pecahan senilai",
          solutionSteps: {
            headerText: "Penjumlahan Bilangan Campuran",
            steps: [
              { text: "Ubah bilangan campuran menjadi pecahan tidak wajar", subSteps: [] },
              {
                text: "Jumlahkan pecahan tidak wajar yang diperoleh",
                subSteps: [
                  { text: "Tentukan KPK dari penyebut" },
                  { text: "Ubah menjadi pecahan senilai" },
                  { text: "Jumlahkan pecahan senilai" }
                ]
              },
              { text: "Ubah hasilnya kembali menjadi bilangan campuran", subSteps: [] }
            ]
          }
        },

        page17: {
          headerText: "Kerjakan langkahnya di buku catatanmu dan sebutkan jawabannya.",
          footerInstruction: "Ketuk '?' untuk melihat hasil penjumlahan",
          tapToFindSum: "Ketuk » untuk mencari jumlah pecahan senilai",
          solutionSteps: {
            headerText: "Penjumlahan Bilangan Campuran",
            steps: [
              { text: "Ubah bilangan campuran menjadi pecahan tidak wajar", subSteps: [] },
              {
                text: "Jumlahkan pecahan tidak wajar yang diperoleh",
                subSteps: [
                  { text: "Tentukan KPK dari penyebut" },
                  { text: "Ubah menjadi pecahan senilai" },
                  { text: "Jumlahkan pecahan senilai" }
                ]
              },
              { text: "Ubah hasilnya kembali menjadi bilangan campuran", subSteps: [] }
            ]
          }
        },

        page18: {
          headerText: "Kerjakan langkahnya di buku catatanmu dan sebutkan jawabannya.",
          footerInstruction: "Ketuk '?' untuk melihat konversi hasil",
          instructionAfterQuiz: "Ketuk » untuk merangkum",
          solutionSteps: {
            headerText: "Penjumlahan Bilangan Campuran",
            steps: [
              { text: "Ubah bilangan campuran menjadi pecahan tidak wajar", subSteps: [] },
              {
                text: "Jumlahkan pecahan tidak wajar yang diperoleh",
                subSteps: [
                  { text: "Tentukan KPK dari penyebut" },
                  { text: "Ubah menjadi pecahan senilai" },
                  { text: "Jumlahkan pecahan senilai" }
                ]
              },
              { text: "Ubah hasilnya kembali menjadi bilangan campuran", subSteps: [] }
            ]
          }
        },

        page19: {
          highlights: [
            {
              text: "Berapa kg berat totalnya",
              fontColor: highlightColor3,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          headerText: "Identifikasi situasi – Buat Persamaan – Selesaikan",
          footerInstruction: "Ketuk 'Mulai Ulang' untuk mengulang aktivitas",
          solutionSteps: {
            headerText: "Penjumlahan Bilangan Campuran",
            steps: [
              { text: "Ubah bilangan campuran menjadi pecahan tidak wajar", subSteps: [] },
              {
                text: "Jumlahkan pecahan tidak wajar yang diperoleh",
                subSteps: [
                  { text: "Tentukan KPK dari penyebut" },
                  { text: "Ubah menjadi pecahan senilai" },
                  { text: "Jumlahkan pecahan senilai" }
                ]
              },
              { text: "Ubah hasilnya kembali menjadi bilangan campuran", subSteps: [] }
            ],
          },
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
