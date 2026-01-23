// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlightColor1 = "#FFD700";
const highlightColor2 = "#70ACC7";
const highlightColor3 = "#F28283";
const highlightColor4 = "#00FF7F";
const highlightColor5 = '#8A2BE2';

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
        navigationComplete: "Complete app reset completed - ready for new question",
        lastPageStartingOver: "Last page - Starting over"
      },
      console: {
        initializingPageConfig: "🚀 Initializing PageConfig",
        initializingWindowFunctions: "🔄 [PageConfig] Initializing window functions...",
        advanceToNextQuestionCalled: "🔄 [Navigation] advanceToNextQuestion called (DIRECT IMPLEMENTATION)",
        treatingAsAppReload: "🔄 [Navigation] Treating as APP RELOAD with next question",
        updatedQuestionIndex: "✅ [Navigation] Updated window.currentQuestionIndex to:",
        updatingQuestionDependentElements: "🔄 [UI] Updating question-dependent elements",
        triggeredReactRerender: "✅ [UI] Triggered React re-render via forceAppUpdate",
        forceAppUpdateNotAvailable: "⚠️ [UI] forceAppUpdate not available, React may not re-render",
        updateQuestionDependentElementsCompleted: "✅ [UI] updateQuestionDependentElements completed",
        directFunctionAssignmentCompleted: "✅ [PageConfig] Direct function assignment completed",
        windowAdvanceToNextQuestionType: "🔍 [PageConfig] window.advanceToNextQuestion type:",
        windowUpdateQuestionDependentElementsType: "🔍 [PageConfig] window.updateQuestionDependentElements type:",
        errorInDirectFunctionAssignment: "❌ [PageConfig] Error in direct function assignment:",
        manuallyClearingPageStates: "🧹 [PageConfig] Manually clearing page states",
        pageStatesClearedSuccessfully: "✅ [PageConfig] Page states cleared successfully",
        errorClearingPageStates: "❌ [PageConfig] Error clearing page states:",
        readingTextFromSource: "🎯 [PageConfig] Reading text from source",
        updatedNumberPad: "✅ [PageConfig] Updated number pad",
        updatedElement: "✅ [PageConfig] Updated element",
        destinationElementNotFound: "🔄 [PageConfig] Destination element",
        destinationElementNotFoundAfterRetries: "⚠️ [PageConfig] Destination element not found:",
        sourceElementNotFound: "🔄 [PageConfig] Source element",
        sourceElementNotFoundAfterRetries: "⚠️ [PageConfig] Source element not found:",
        errorUpdatingTargetText: "❌ [PageConfig] Error updating target text:",
        pageConfigInitialized: "✅ PageConfig initialized - pages and functions available globally",
        useClearAllPageStates: "💡 [PageConfig] Use window.clearAllPageStates() to manually clear page states",
        useUpdateTargetIDText: "💡 [PageConfig] Use window.updateTargetIDText(sourceId, destinationId) to copy text from any source element to any destination element",
        aboutToCallInitializePageConfig: "🔄 [PageConfig] About to call initializePageConfig...",
        initializePageConfigCompleted: "🔄 [PageConfig] initializePageConfig completed, result:",
        pageConfigOptimizationComplete: "🎉 PageConfig optimization complete!",
        nextButton: "📄 [Next Button]",
        previousButton: "📄 [Previous Button]",
        retrying: "retrying...",
        afterRetries: "after",
        retries: "retries",
        targetTo: "target to:",
        textTo: "text to:",
        notFound: "not found,"
      },
      common: {
        imageAlt: {
          tap: "Tap"
        },
        navigation: {
          unknown: "unknown"
        },
        questionData: {
          missing: "subtrahend"
        }
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over"
      },

      common: {
        equationButtonText: "Paper not painted",
        questionText: "Yohana has a painting assignment on $\\frac{2}{3}$ piece of drawing paper given by her teacher. She has already painted $\\frac{1}{3}$ of the paper. How much paper has Yohana not painted yet?",
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
        },
        amountBeniGiveToGrandMother: "Amount Beni gave\n to his grandfather.",
        amountOfBika: "Amount of Bika\n Ambon left with Beni",
        symbols: {
          equals: "=",
          plus: "+",
          minus: "-",
          questionMark: "?",
          fractionTwoThirds: "$\\frac{2}{3}$",
          fractionOneThird: "$\\frac{1}{3}$"
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
              text: "on $\\frac{2}{3}$ piece of drawing paper",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Drawing paper size = $\\frac{2}{3}$",
                size: highlightTextSize,
                color: highlightColor1
              }
            ],
            values: [
            ],
            toFind: [
            ]
          },
          fractionTwoThirds: "$\\frac{2}{3}$"
        },
        page3: {
          headerText: "Read the question and identify 'given' and 'to find'",
          footerInstruction: "Tap » to identify what we need 'to find'",
          highlights: [

            {
              text: "painted $\\frac{1}{3}$ of the paper",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Drawing paper size = $\\frac{2}{3}$",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Painted = $\\frac{1}{3}$ of the paper",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: [
            ],
            toFind: [
            ]
          },
          fractionTwoThirds: "$\\frac{2}{3}$",
          fractionOneThird: "$\\frac{1}{3}$"
        },
        page4: {
          headerText: "Read the question and identify 'given' and 'to find'",
          footerInstruction: "Tap » to build the mathematical sentence",
          highlights: [

            {
              text: "Yohana not painted yet",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Drawing paper size = $\\frac{2}{3}$",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Painted = $\\frac{1}{3}$ of the paper",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: [
            ],
            toFind: [
              {
                text: "Paper not painted.",
                size: highlightTextSize,
                color: highlightColor3
              }
            ]
          },
          fractionTwoThirds: "$\\frac{2}{3}$",
          fractionOneThird: "$\\frac{1}{3}$",
          questionMark: "?"
        },
        page5: {
          headerText: "Build a mathematical sentence for the given scene",
          footerInstruction: "Drag the correct buttons to the correct spot in the sentence",
          instructionAfterQuiz: "Tap » to substitute values into the equation",
          equationText: {
            totalWeight: 'Total weight'
          },
          optionTextFillBlanks: {
            optionOpt1Text: "Drawing paper<br/> size",
            optionOpt2Text: 'Amount of paper painted',
          },
          optionOpt1Feedback: "Correct! This is the distance from Komang to Yohana house.",
          optionOpt2Feedback: "Correct! This is the distance from Yohana to Lukas house.",
          optionPlusCorrectFeedback: "Correct!",
          optionMinusNotNeededFeedback: "This operator is not needed here.",
          fractionTwoThirds: "$\\frac{2}{3}$",
          fractionOneThird: "$\\frac{1}{3}$",
          questionMark: "?",
          equalsSign: "=",
          plusSign: "+",
          minusSign: "-"
        },
        page6: {
          headerText: "Build a mathematical sentence for the given scene",
          footerInstruction: "Tap » to Continue",
          equationText: {
            totalWeight: 'Total weight',
            javeneseSugar: "Javenese sugar weight",
            flourWeight: 'Flour weight',
          },
          fractionAddition: "This is a liked fractions Subtraction challenge!",
          fractionTwoThirds: "$\\frac{2}{3}$",
          fractionOneThird: "$\\frac{1}{3}$",
          questionMark: "?",
          equalsSign: "=",
          minusSign: "-"
        },
        page7: {
          headerText: "Build a mathematical sentence for the given scene",
          footerInstruction: "Tap » to identify all the required steps for the subtraction",
          equationText: {
            totalWeight: 'Total weight',
            javeneseSugar: "Javenese sugar weight",
            flourWeight: 'Flour weight',
          },
          informationGathered: '<span style="color: #20B2AA;">&#10003;</span>\u00A0Information gathered from question.',
          nextStep: "Next - Steps required to find answer.",
          fractionTwoThirds: "$\\frac{2}{3}$",
          fractionOneThird: "$\\frac{1}{3}$",
          questionMark: "?",
          equalsSign: "=",
          minusSign: "-"
        },
        page8: {
          headerText: "What is the correct order of steps for subtract mixed numbers?",
          footerInstruction: "Select correct option.",
          instructionAfterQuiz: "Tap » to continue.",
          quizPanel: {
            questionText: 'Tap the correct option that represents like fractions.',
            options: [
              {
                text: "Both numerators and denominators are the same.",
                iscorrect: false,
                feedback: "Check Again!",
              },
              {
                text: "Both numerators and denominators are different.",
                iscorrect: false,
                feedback: "Check Again!",
              },
              {
                text: "Numerators are the same.",
                iscorrect: false,
                feedback: "Check Again!",
              },
              {
                text: "Denominators are the same.",
                iscorrect: true,
                feedback: "That's Correct!",
              }
            ],
          },
          fractionTwoThirds: "$\\frac{2}{3}$",
          fractionOneThird: "$\\frac{1}{3}$",
          equalsSign: "=",
          minusSign: "-"
        },
        page9: {
          headerText: "What is the correct formula for converting a mixed to improper fraction?",
          footerInstruction: "Select correct option.",
          instructionAfterQuiz: "Tap » to continue.",
          highlights: [],

          quizPanel: {
            questionText: 'Tap the correct option to subtract like fractions.',
            options: [
              {
                text: "Subtract both numerators and denominators.",
                iscorrect: false,
                feedback: "Check Again!",
              },
              {
                text: "Subtract numerators and keep the denominator the same.",
                iscorrect: true,
                feedback: "That's Correct!",
              },
              {
                text: "Subtract denominators and keep the numerator the same.",
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
          fractionTwoThirds: "$\\frac{2}{3}$",
          fractionOneThird: "$\\frac{1}{3}$",
          equalsSign: "=",
          minusSign: "-"
        },
        page10: {
          headerText: "What is the correct formula for converting a improper fraction into an mixed number?",
          footerInstruction: "Tap » to subtract the Like fractions using these steps",
          solutionSteps: {
            headerText: "Like Fraction Subtraction",
            steps: [
              {
                text: 'Subtract the fractions',
                subSteps: [
                  { text: 'Subtract numerators and keep the denominator the same.' }
                ]

              },
            ],
          },
          informationGathered: '<span style="color: #20B2AA;">&#10003;</span>\u00A0Information gathered from question.',
          stepsRequired: '<span style="color: #20B2AA;">&#10003;</span>\u00A0Steps required to find answer',
          nextFinding: "Next - Finding the required Result",
          fractionTwoThirds: "$\\frac{2}{3}$",
          fractionOneThird: "$\\frac{1}{3}$",
          equalsSign: "=",
          minusSign: "-"
        },
        page11: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the answer.",
          instructionAfterQuiz:"Tap » to compute.",
          solutionSteps: {
            headerText: "Like Fraction Subtraction",
            steps: [

              {
                text: 'Subtract the fractions',
                subSteps: [
                  { text: 'Subtract numerators and keep the denominator the same.' }
                ]

              },
            ],
          },
          fractionTwoThirds: "$\\frac{2}{3}$",
          fractionOneThird: "$\\frac{1}{3}$",
          fractionTwoMinusOneOverThree: "$\\frac{2 - 1}{3}$",
          fractionTwoMinusOneOverThreeHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">2 - 1</span><span style="display: block; padding: 0 2px;">3</span></span>',
          fractionOneThirdHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">1</span><span style="display: block; padding: 0 2px;">3</span></span>',
          questionMark: "?",
          equalsSign: "=",
          minusSign: "-"
        },
        page12: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the answer",
          instructionAfterQuiz:"Tap » to summarize.",
          solutionSteps: {
            headerText: "Like Fraction Subtraction",
            steps: [

              {
                text: 'Subtract the fractions',
                subSteps: [
                  { text: 'Subtract numerators and keep the denominator the same.' }
                ]

              },
            ],
          },
          fractionTwoThirds: "$\\frac{2}{3}$",
          fractionOneThird: "$\\frac{1}{3}$",
          fractionTwoMinusOneOverThree: "$\\frac{2 - 1}{3}$",
          fractionTwoMinusOneOverThreeHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">2 - 1</span><span style="display: block; padding: 0 2px;">3</span></span>',
          fractionOneThirdHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">1</span><span style="display: block; padding: 0 2px;">3</span></span>',
          questionMark: "?",
          equalsSign: "=",
          minusSign: "-"
        },
        page13: {
          highlights: [
            {
              text: "Yohana not painted yet",
              fontColor: highlightColor3,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          solutionSteps: {
            headerText: "Like Fraction Subtraction",
            steps: [

              {
                text: 'Subtract the fractions',
                subSteps: [
                  { text: 'Subtract numerators and keep the denominator the same.' }
                ]

              },
            ],
          },
          headerText: "Identify scene – Build Equation – Solve for unknown",
          footerInstruction: "Tap 'Start Over' to re-do activity",
          fractionTwoThirds: "$\\frac{2}{3}$",
          fractionOneThird: "$\\frac{1}{3}$",
          questionMark: "?"
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
        equationButtonText: "Kertas yang belum diwarnai",
        questionText:
          "Yohana mendapat tugas melukis pada $\\frac{2}{3}$ lembar kertas gambar dari gurunya. Ia sudah mewarnai $\\frac{1}{3}$ bagian kertas tersebut. Berapa bagian kertas yang belum diwarnai Yohana?",
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
        },
        amountBeniGiveToGrandMother: "Jumlah yang diberikan Beni\n kepada kakeknya.",
        amountOfBika: "Jumlah Bika\n Ambon yang tersisa pada Beni",
        symbols: {
          equals: "=",
          plus: "+",
          minus: "-",
          questionMark: "?",
          fractionTwoThirds: "$\\frac{2}{3}$",
          fractionOneThird: "$\\frac{1}{3}$"
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
            "Mari kita tentukan bagian kertas yang belum diwarnai dengan mengurangkan pecahan.",
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
              text: "pada $\\frac{2}{3}$ lembar kertas gambar",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Ukuran kertas gambar = $\\frac{2}{3}$",
                size: highlightTextSize,
                color: highlightColor1
              }
            ],
            values: [],
            toFind: []
          },
          fractionTwoThirds: "$\\frac{2}{3}$"
        },

        page3: {
          headerText:
            "Bacalah soal dan identifikasi bagian 'diketahui' dan 'ditanyakan'",
          footerInstruction:
            "Ketuk » untuk mengidentifikasi apa yang harus dicari",
          highlights: [
            {
              text: "pada $\\frac{2}{3}$ lembar kertas gambar",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "sudah mewarnai $\\frac{1}{3}$ bagian kertas",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Ukuran kertas gambar = $\\frac{2}{3}$",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Sudah diwarnai = $\\frac{1}{3}$ bagian kertas",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: [],
            toFind: []
          },
          fractionTwoThirds: "$\\frac{2}{3}$",
          fractionOneThird: "$\\frac{1}{3}$"
        },

        page4: {
          headerText:
            "Bacalah soal dan identifikasi bagian 'diketahui' dan 'ditanyakan'",
          footerInstruction:
            "Ketuk » untuk membangun kalimat matematika",
          highlights: [
            {
              text: "pada $\\frac{2}{3}$ lembar kertas gambar",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "sudah mewarnai $\\frac{1}{3}$ bagian kertas",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "belum diwarnai Yohana",
              fontColor: highlightColor3,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Ukuran kertas gambar = $\\frac{2}{3}$",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Sudah diwarnai = $\\frac{1}{3}$ bagian kertas",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: [],
            toFind: [
              {
                text: "Bagian kertas yang belum diwarnai",
                size: highlightTextSize,
                color: highlightColor3
              }
            ]
          },
          fractionTwoThirds: "$\\frac{2}{3}$",
          fractionOneThird: "$\\frac{1}{3}$",
          questionMark: "?"
        },

        page5: {
          headerText: "Buat kalimat matematika untuk situasi yang diberikan",
          footerInstruction:
            "Seret tombol yang benar ke tempat yang sesuai dalam kalimat",
          equationText: {
            totalWeight: "Berat total"
          },
          optionTextFillBlanks: {
            optionOpt1Text: "Ukuran kertas<br/>gambar",
            optionOpt2Text: "Bagian kertas yang sudah diwarnai"
          },
          optionOpt1Feedback: "Benar!",
          optionOpt2Feedback: "Benar!",
          optionPlusCorrectFeedback: "Benar!",
          optionMinusNotNeededFeedback: "Operator ini tidak diperlukan di sini.",
          fractionTwoThirds: "$\\frac{2}{3}$",
          fractionOneThird: "$\\frac{1}{3}$",
          questionMark: "?",
          equalsSign: "=",
          plusSign: "+",
          minusSign: "-"
        },

        page6: {
          headerText: "Buat kalimat matematika untuk situasi yang diberikan",
          footerInstruction: "Ketuk » untuk melanjutkan",
          equationText: {
            totalWeight: "Berat total",
            javeneseSugar: "Berat gula Jawa",
            flourWeight: "Berat tepung"
          },
          fractionAddition: "Ini adalah tantangan pengurangan pecahan campuran!",
          fractionTwoThirds: "$\\frac{2}{3}$",
          fractionOneThird: "$\\frac{1}{3}$",
          questionMark: "?",
          equalsSign: "=",
          minusSign: "-"
        },

        page7: {
          headerText: "Buat kalimat matematika untuk situasi yang diberikan",
          footerInstruction:
            "Ketuk » untuk mengidentifikasi semua langkah pengurangan yang diperlukan",
          equationText: {
            totalWeight: "Berat total",
            javeneseSugar: "Berat gula Jawa",
            flourWeight: "Berat tepung"
          },
          informationGathered:
            '<span style="color: #20B2AA;">&#10003;</span>\u00A0Informasi telah dikumpulkan dari soal.',
          nextStep: "Selanjutnya – Langkah-langkah untuk menemukan jawaban.",
          fractionTwoThirds: "$\\frac{2}{3}$",
          fractionOneThird: "$\\frac{1}{3}$",
          questionMark: "?",
          equalsSign: "=",
          minusSign: "-"
        },

        page8: {
          headerText: "Apa urutan langkah yang benar untuk mengurangkan bilangan campuran?",
          footerInstruction: "Pilih opsi yang benar.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          quizPanel: {
            questionText: "Ketuk opsi yang benar yang menunjukkan pecahan senilai.",
            options: [
              { text: "Pembilang dan penyebut keduanya sama.", iscorrect: false, feedback: "Coba lagi!" },
              { text: "Pembilang dan penyebut keduanya berbeda.", iscorrect: false, feedback: "Coba lagi!" },
              { text: "Pembilangnya sama.", iscorrect: false, feedback: "Coba lagi!" },
              { text: "Penyebutnya sama.", iscorrect: true, feedback: "Benar!" }
            ]
          },
          fractionTwoThirds: "$\\frac{2}{3}$",
          fractionOneThird: "$\\frac{1}{3}$",
          equalsSign: "=",
          minusSign: "-"
        },

        page9: {
          headerText: "Apa rumus yang benar untuk mengubah bilangan campuran menjadi pecahan tidak wajar?",
          footerInstruction: "Pilih opsi yang benar.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          highlights: [],
          quizPanel: {
            questionText: "Ketuk opsi yang benar untuk mengurangkan pecahan senilai.",
            options: [
              { text: "Kurangkan pembilang dan penyebutnya.", iscorrect: false, feedback: "Coba lagi!" },
              { text: "Kurangkan pembilang dan penyebut tetap sama.", iscorrect: true, feedback: "Benar!" },
              { text: "Kurangkan penyebut dan pembilang tetap sama.", iscorrect: false, feedback: "Coba lagi!" },
              { text: "Tidak ada yang benar", iscorrect: false, feedback: "Coba lagi!" }
            ]
          },
          fractionTwoThirds: "$\\frac{2}{3}$",
          fractionOneThird: "$\\frac{1}{3}$",
          equalsSign: "=",
          minusSign: "-"
        },

        page10: {
          headerText: "Apa rumus yang benar untuk mengubah pecahan tidak wajar menjadi bilangan campuran?",
          footerInstruction:
            "Ketuk » untuk mengurangkan pecahan senilai dengan langkah-langkah ini",
          solutionSteps: {
            headerText: "Pengurangan Pecahan Senilai",
            steps: [
              { text: "Identifikasi jenis pecahan yang akan dikurangkan", subSteps: [] },
              {
                text: "Kurangkan pecahannya",
                subSteps: [{ text: "Pengurangan Pecahan Senilai" }]
              }
            ]
          },
          informationGathered:
            '<span style="color: #20B2AA;">&#10003;</span>\u00A0Informasi telah dikumpulkan dari soal.',
          stepsRequired:
            '<span style="color: #20B2AA;">&#10003;</span>\u00A0Langkah-langkah telah ditentukan',
          nextFinding: "Selanjutnya – Menentukan hasil akhir",
          fractionTwoThirds: "$\\frac{2}{3}$",
          fractionOneThird: "$\\frac{1}{3}$",
          equalsSign: "=",
          minusSign: "-"
        },

        page11: {
          headerText: "Kerjakan langkahnya di buku catatanmu dan sebutkan jawabannya.",
          footerInstruction: "Ketuk '?' untuk melihat jawaban",
          solutionSteps: {
            headerText: "Pengurangan Pecahan Senilai",
            steps: [
              { text: "Identifikasi jenis pecahan yang akan dikurangkan", subSteps: [] },
              {
                text: "Kurangkan pecahannya",
                subSteps: [{ text: "Pengurangan Pecahan Senilai" }]
              }
            ]
          },
          fractionTwoThirds: "$\\frac{2}{3}$",
          fractionOneThird: "$\\frac{1}{3}$",
          fractionTwoMinusOneOverThree: "$\\frac{2 - 1}{3}$",
          questionMark: "?",
          equalsSign: "=",
          minusSign: "-"
        },

        page12: {
          headerText: "Kerjakan langkahnya di buku catatanmu dan sebutkan jawabannya.",
          footerInstruction: "Ketuk '?' untuk melihat jawaban",
          solutionSteps: {
            headerText: "Pengurangan Pecahan Senilai",
            steps: [
              { text: "Identifikasi jenis pecahan yang akan dikurangkan", subSteps: [] },
              {
                text: "Kurangkan pecahannya",
                subSteps: [{ text: "Pengurangan Pecahan Senilai" }]
              }
            ]
          },
          fractionTwoThirds: "$\\frac{2}{3}$",
          fractionOneThird: "$\\frac{1}{3}$",
          fractionTwoMinusOneOverThree: "$\\frac{2 - 1}{3}$",
          questionMark: "?",
          equalsSign: "=",
          minusSign: "-"
        },

        page13: {
          highlights: [
            {
              text: "belum diwarnai Yohana",
              fontColor: highlightColor3,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          solutionSteps: {
            headerText: "Pengurangan Pecahan Senilai",
            steps: [
              { text: "Identifikasi jenis pecahan yang akan dikurangkan", subSteps: [] },
              {
                text: "Kurangkan pecahannya",
                subSteps: [{ text: "Pengurangan Pecahan Senilai" }]
              }
            ]
          },
          headerText: "Identifikasi situasi – Buat Persamaan – Selesaikan",
          footerInstruction: "Ketuk 'Mulai Ulang' untuk mengulang aktivitas",
          fractionTwoThirds: "$\\frac{2}{3}$",
          fractionOneThird: "$\\frac{1}{3}$",
          questionMark: "?"
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
