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
        previousButtonPage1: "Dispatched page change event to page 1",
        navigationReset: "Resetting to question 1",
        navigationComplete: "Complete app reset completed - ready for new question",
        lastPageStartingOver: "Last page - Starting over",
        dispatchedPageChange: "Dispatched page change event to page {page}"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over"
      },

      common: {
        equationButtonText: "Total brownies weight",
        questionText: "Nadia baked $2\\frac{1}{2}$ trays of brownies. Each tray weighs <br/>$1\\frac{3}{4}$ kilograms. What is the total weight of all the brownies?",
        questionIcon: "Q",
        weightOfOneTray: "Weight of one tray",
        totalWeight: "Total weight",
        labels: {
          dropHere: "Drop here"
        },
        mathExpressions: {
          twoAndHalf: "$2 \\frac{1}{2}$",
          oneAndThreeQuartersKg: "$1 \\frac{3}{4}$ kg",
          equalsSign: "=",
          multiplySign: "×"
        },
        accessibility: {
          tapImageAlt: "Tap"
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
              text: "Nadia baked $2\\frac{1}{2}$ trays of brownies",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Total trays of brownies baked = 2",
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
              text: "Each tray weighs <br/>$1\\frac{3}{4}$ kilograms",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Total trays of brownies baked = 2",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Each tray weighs  $1\\frac{3}{4}$ kilograms",
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
              text: "What is the total weight of all the brownies?",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Total trays of brownies baked = 2",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Each tray weighs $1\\frac{3}{4}$ kg",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: [
            ],
            toFind: [
              {
                text: "Total weight of all brownies",
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
            optionOpt1Text: "Weight of each<br/> tray",
            optionOpt2Text: 'Total Number of trays of brownies baked',
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
          fractionAddition: "This is a Mixed Fractions multiplication challenge!"
        },
        page7: {
          headerText: "Build a mathematical sentence for the given scene",
          footerInstruction: "Tap » to identify all the required steps for the multiplication",
          equationText: {
            totalWeight: 'Total weight',
            javeneseSugar: "Javenese sugar weight",
            flourWeight: 'Flour weight',
          },
          informationGathered: '<span style="color: #20B2AA;">&#10003;</span>\u00A0Information gathered from question.',
          nextStep: "Next - Steps required to find answer."
        },
        page8: {
          headerText: "What is the correct order of steps for multiply mixed numbers?",
          footerInstruction: "Rearrange the buttons to the correct sequence of steps",
          instructionAfterQuiz: "Tap » to explore the step 1 in more detail.",
          steps: [
            'Convert mixed numbers into improper fractions.',
            'Multiply improper fractions.',
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
          solutionSteps: {
            mixedNumberAddition: "Mixed Number Multiplication",
            steps: [
              {
                text: 'Convert mixed numbers into improper fractions',
                subSteps: []
              },
              {
                text: 'Multiply improper fractions',
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
          },
          instructionAfterQuiz: "Tap » to explore step 2 in more detail"
        },
        page10: {
          highlights: [],
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
          },
          feedbackText: {
            correct: "Correct! The steps are in the right order.",
            incorrect: "Not quite. Try rearranging the steps."
          },
          solutionSteps: {
            headerText: "Mixed Number Multiplication",
            steps: [
              {
                text: 'Convert mixed numbers into improper fractions',
                subSteps: []
              },
              {
                text: 'Multiply improper fractions',
                subSteps: []
              },
              {
                text: 'Convert the result back into a mixed number',
                subSteps: []
              }
            ]

          },
          totalWeight: 'Total Weight',
          footerInstruction: "choose the correct option",
          instructionAfterQuiz: "Tap » to explore step 3 in more detail"
        },
        page11: {
          headerText: "What is the correct formula for converting a improper fraction into an mixed number?",
          footerInstruction: "Drag the correct terms to make the mixed fraction",
          instructionAfterQuiz: "Tap » to continue.",
          totalWeight: "Total Weight",
          solutionSteps: {
            headerText: "Mixed Number Multiplication",
            steps: [
              {
                text: 'Convert mixed numbers into improper fractions',
                subSteps: []
              },
              {
                text: 'Multiply improper fractions',
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
          footerInstruction: "Tap » to multiply the mixed numbers using these steps",
          solutionSteps: {
            headerText: "Mixed Number Multiplication",
            steps: [
              {
                text: 'Convert mixed numbers into improper fractions',
                subSteps: []
              },
              {
                text: 'Multiply improper fractions',
                subSteps: []
              },
              {
                text: 'Convert the result back into a mixed number',
                subSteps: []
              }
            ]

          },
          informationGathered: '<span style="color: #20B2AA;">&#10003;</span>\u00A0Information gathered from question.',
          stepsRequired: '<span style="color: #20B2AA;">&#10003;</span>\u00A0Steps required to find answer',
          nextFinding: "Next - Finding the required Result",
        },
        page13: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the answer for each conversion",
          instructionAfterQuiz:"Tap » to step 2",
          solutionSteps: {
            headerText: "Mixed Number Multiplication",
            steps: [
              {
                text: 'Convert mixed numbers into improper fractions',
                subSteps: []
              },
              {
                text: 'Multiply improper fractions',
                subSteps: []
              },
              {
                text: 'Convert the result back into a mixed number',
                subSteps: []
              }
            ]

          },
        },
        page14: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the subtract",
          instructionRevealConversions: "Tap '?' to reveal the answer",
          instructionAfterQuiz: "Tap » to compute",
          solutionSteps: {
            headerText: "Mixed Number Multiplication",
            steps: [
              {
                text: 'Convert mixed numbers into improper fractions',
                subSteps: []
              },
              {
                text: 'Multiply improper fractions',
                subSteps: []
              },
              {
                text: 'Convert the result back into a mixed number',
                subSteps: []
              }
            ]

          },
        },
        page15: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the answer",
          instructionAfterQuiz: "Tap » for Step 3",
          solutionSteps: {
            headerText: "Mixed Number Multiplication",
            steps: [
              {
                text: 'Convert mixed numbers into improper fractions',
                subSteps: []
              },
              {
                text: 'Multiply improper fractions',
                subSteps: []
              },
              {
                text: 'Convert the result back into a mixed number',
                subSteps: []
              }
            ]

          },
        },
        page16: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the answer",
          instructionRevealConversions: "Tap '?' to reveal the answer",
          instructionAfterQuiz: "Tap » to summarize",
          solutionSteps: {
            headerText: "Mixed Number Multiplication",
            steps: [
              {
                text: 'Convert mixed numbers into improper fractions',
                subSteps: []
              },
              {
                text: 'Multiply improper fractions',
                subSteps: []
              },
              {
                text: 'Convert the result back into a mixed number',
                subSteps: []
              }
            ]

          },
        },
        page17: {
          highlights: [
            {
              text: "What is the total weight of all the brownies?",
              fontColor: highlightColor3,
              fontSize: "34gc",
              bold: true,
              underline: false
            }
          ],
          solutionSteps: {
            headerText: "Mixed Number Multiplication",
            steps: [
              {
                text: 'Convert mixed numbers into improper fractions',
                subSteps: []
              },
              {
                text: 'Multiply improper fractions',
                subSteps: []
              },
              {
                text: 'Convert the result back into a mixed number',
                subSteps: []
              }
            ]

          },
          headerText: "Identify scene – Build Equation – Solve for unknown",
          footerInstruction: "Tap 'Start Over' to re-do activity"
        }

      },
      pageConfig: {
        consoleMessages: {
          initializing: "🚀 Initializing PageConfig",
          directFunctionAssignmentCompleted: "✅ [PageConfig] Direct function assignment completed",
          manuallyClearingPageStates: "🧹 [PageConfig] Manually clearing page states",
          pageStatesClearedSuccessfully: "✅ [PageConfig] Page states cleared successfully",
          errorClearingPageStates: "❌ [PageConfig] Error clearing page states:",
          errorInDirectFunctionAssignment: "❌ [PageConfig] Error in direct function assignment:",
          pageConfigInitialized: "✅ PageConfig initialized - pages and functions available globally",
          useClearAllPageStates: "💡 [PageConfig] Use window.clearAllPageStates() to manually clear page states",
          useUpdateTargetIDText: "💡 [PageConfig] Use window.updateTargetIDText(sourceId, destinationId) to copy text from any source element to any destination element",
          aboutToCallInitialize: "🔄 [PageConfig] About to call initializePageConfig...",
          initializeCompleted: "🔄 [PageConfig] initializePageConfig completed, result:",
          optimizationComplete: "🎉 PageConfig optimization complete!",
          navigationAdvanceToNextQuestion: "🔄 [Navigation] advanceToNextQuestion called (DIRECT IMPLEMENTATION)",
          navigationTreatingAsAppReload: "🔄 [Navigation] Treating as APP RELOAD with next question",
          navigationUpdatedQuestionIndex: "✅ [Navigation] Updated window.currentQuestionIndex to:",
          uiUpdatingQuestionDependentElements: "🔄 [UI] Updating question-dependent elements",
          uiTriggeredReactRerender: "✅ [UI] Triggered React re-render via forceAppUpdate",
          uiForceUpdateNotAvailable: "⚠️ [UI] forceUpdate not available, React may not re-render",
          uiUpdateCompleted: "✅ [UI] updateQuestionDependentElements completed",
          readingTextFromSource: "🎯 [PageConfig] Reading text from source {sourceId}:",
          updatedNumberPad: "✅ [PageConfig] Updated number pad {destinationId} target to:",
          updatedElement: "✅ [PageConfig] Updated element {destinationId} text to:",
          destinationElementNotFound: "🔄 [PageConfig] Destination element {destinationId} not found, retrying... ({retryCount}/{maxRetries})",
          destinationElementNotFoundAfterRetries: "⚠️ [PageConfig] Destination element not found: {destinationId} after {maxRetries} retries",
          sourceElementNotFound: "🔄 [PageConfig] Source element {sourceId} not found, retrying... ({retryCount}/{maxRetries})",
          sourceElementNotFoundAfterRetries: "⚠️ [PageConfig] Source element not found: {sourceId} after {maxRetries} retries",
          errorUpdatingTargetText: "❌ [PageConfig] Error updating target text:"
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
        navigationComplete: "Reset aplikasi selesai - siap untuk soal baru",
        lastPageStartingOver: "Halaman terakhir - Mulai ulang",
        dispatchedPageChange: "Peristiwa perpindahan halaman dikirim ke halaman {page}"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang"
      },

      common: {
        equationButtonText: "Berat total brownies",
        questionText:
          "Nadia memanggang $2\\frac{1}{2}$ loyang brownies. Setiap loyang berbobot <br/>$1\\frac{3}{4}$ kilogram. Berapa berat total semua brownies?",
        questionIcon: "T",
        weightOfOneTray: "Berat satu loyang",
        totalWeight: "Berat total",
        labels: {
          dropHere: "Letakkan di sini"
        },
        mathExpressions: {
          twoAndHalf: "$2 \\frac{1}{2}$",
          oneAndThreeQuartersKg: "$1 \\frac{3}{4}$ kg",
          equalsSign: "=",
          multiplySign: "×"
        },
        accessibility: {
          tapImageAlt: "Ketuk"
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
            "Mari kita cari berat total brownies dengan mengalikan bilangan campuran.",
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
              text: "Nadia memanggang $2\\frac{1}{2}$ loyang brownies",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Jumlah loyang brownies yang dipanggang = $2\\frac{1}{2}$",
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
              text: "Nadia memanggang $2\\frac{1}{2}$ loyang brownies",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "Setiap loyang berbobot <br/>$1\\frac{3}{4}$ kilogram",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Jumlah loyang brownies yang dipanggang = $2\\frac{1}{2}$",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Berat setiap loyang = $1\\frac{3}{4}$ kilogram",
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
              text: "Nadia memanggang $2\\frac{1}{2}$ loyang brownies",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "Setiap loyang berbobot $1\\frac{3}{4}$ kilogram",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "Berapa berat total semua brownies?",
              fontColor: highlightColor3,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Jumlah loyang brownies yang dipanggang = $2\\frac{1}{2}$",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Berat setiap loyang = $1\\frac{3}{4}$ kg",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: [],
            toFind: [
              {
                text: "Berat total semua brownies",
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
            optionOpt1Text: "Berat setiap<br/> loyang",
            optionOpt2Text: "Jumlah loyang brownies yang dipanggang"
          }
        },

        page6: {
          headerText: "Buat kalimat matematika untuk situasi yang diberikan",
          footerInstruction: "Ketuk » untuk melanjutkan.",
          equationText: {
            totalWeight: "Berat total",
            javeneseSugar: "Berat gula Jawa",
            flourWeight: "Berat tepung"
          },
          fractionAddition: "Ini adalah tantangan perkalian bilangan campuran!"
        },

        page7: {
          headerText: "Buat kalimat matematika untuk situasi yang diberikan",
          footerInstruction:
            "Ketuk » untuk mengidentifikasi semua langkah perkalian yang diperlukan",
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
          headerText: "Apa urutan langkah yang benar untuk mengalikan bilangan campuran?",
          footerInstruction: "Susun tombol sesuai urutan langkah yang benar",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          steps: [
            "Ubah bilangan campuran menjadi pecahan tidak wajar.",
            "Kalikan pecahan tidak wajar.",
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
            "Mari kita cari berat total brownies dengan mengalikan bilangan campuran.",
          solutionSteps: {
            mixedNumberAddition: "Perkalian Bilangan Campuran",
            steps: [
              { text: "Ubah bilangan campuran menjadi pecahan tidak wajar", subSteps: [] },
              { text: "Kalikan pecahan tidak wajar yang diperoleh", subSteps: [] },
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
          },
          instructionAfterQuiz: "Ketuk » untuk melanjutkan"
        },

        page10: {
          highlights: [],
          arrangeSteps: {
            instructionText: "Apa urutan langkah yang benar untuk mengalikan bilangan campuran?",
            steps: [
              "Ubah menjadi pecahan senilai",
              "Kalikan pembilang",
              "Kalikan penyebut"
            ]
          },
          feedbackText: {
            correct: "Benar! Urutan langkah sudah tepat.",
            incorrect: "Belum tepat. Coba susun ulang langkah-langkahnya."
          },
          solutionSteps: {
            headerText: "Perkalian Bilangan Campuran",
            steps: [
              { text: "Ubah bilangan campuran menjadi pecahan tidak wajar", subSteps: [] },
              {
                text: "Kalikan pecahan tidak wajar yang diperoleh",
                subSteps: [
                  { text: "Kalikan pembilang dan kalikan penyebut." }
                ]
              },
              { text: "Ubah hasilnya kembali menjadi bilangan campuran", subSteps: [] }
            ]
          },
          totalWeight: "Berat total",
          footerInstruction: "Susun tombol sesuai urutan langkah yang benar",
          instructionAfterQuiz: "Ketuk » untuk menjelajahi langkah 3 lebih detail"
        },

        page11: {
          headerText: "Apa rumus yang benar untuk mengubah pecahan tidak wajar menjadi bilangan campuran?",
          footerInstruction: "Seret istilah yang benar untuk membentuk pecahan campuran",
          totalWeight: "Berat total",
          solutionSteps: {
            headerText: "Perkalian Bilangan Campuran",
            steps: [
              { text: "Ubah bilangan campuran menjadi pecahan tidak wajar", subSteps: [] },
              {
                text: "Kalikan pecahan tidak wajar yang diperoleh",
                subSteps: [
                  { text: "Kalikan pembilang dan kalikan penyebut." }
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
          footerInstruction: "Ketuk » untuk mengalikan bilangan campuran dengan langkah-langkah ini",
          solutionSteps: {
            headerText: "Perkalian Bilangan Campuran",
            steps: [
              { text: "Ubah bilangan campuran menjadi pecahan tidak wajar", subSteps: [] },
              {
                text: "Kalikan pecahan tidak wajar yang diperoleh",
                subSteps: [
                  { text: "Kalikan pembilang dan kalikan penyebut." }
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
            headerText: "Perkalian Bilangan Campuran",
            steps: [
              { text: "Ubah bilangan campuran menjadi pecahan tidak wajar", subSteps: [] },
              {
                text: "Kalikan pecahan tidak wajar yang diperoleh",
                subSteps: [
                  { text: "Kalikan pembilang dan kalikan penyebut." }
                ]
              },
              { text: "Ubah hasilnya kembali menjadi bilangan campuran", subSteps: [] }
            ]
          }
        },

        page14: {
          headerText: "Kerjakan langkahnya di buku catatanmu dan sebutkan jawabannya.",
          footerInstruction: "Ketuk '?' untuk melihat perkalian",
          instructionRevealConversions: "Ketuk '?' untuk melihat jawaban tiap konversi",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          solutionSteps: {
            headerText: "Perkalian Bilangan Campuran",
            steps: [
              { text: "Ubah bilangan campuran menjadi pecahan tidak wajar", subSteps: [] },
              {
                text: "Kalikan pecahan tidak wajar yang diperoleh",
                subSteps: [
                  { text: "Kalikan pembilang dan kalikan penyebut." }
                ]
              },
              { text: "Ubah hasilnya kembali menjadi bilangan campuran", subSteps: [] }
            ]
          }
        },

        page15: {
          headerText: "Kerjakan langkahnya di buku catatanmu dan sebutkan jawabannya.",
          footerInstruction: "Ketuk '?' untuk melihat perkalian",
          instructionRevealConversions: "Ketuk '?' untuk melihat perkalian",
          instructionAfterQuiz: "Ketuk » untuk Langkah 2",
          solutionSteps: {
            headerText: "Perkalian Bilangan Campuran",
            steps: [
              { text: "Ubah bilangan campuran menjadi pecahan tidak wajar", subSteps: [] },
              {
                text: "Kalikan pecahan tidak wajar yang diperoleh",
                subSteps: [
                  { text: "Kalikan pembilang dan kalikan penyebut." }
                ]
              },
              { text: "Ubah hasilnya kembali menjadi bilangan campuran", subSteps: [] }
            ]
          }
        },

        page16: {
          headerText: "Kerjakan langkahnya di buku catatanmu dan sebutkan jawabannya.",
          footerInstruction: "Ketuk '?' untuk melihat bentuk paling sederhana.",
          instructionRevealConversions: "Ketuk '?' untuk melihat bilangan campuran",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          solutionSteps: {
            headerText: "Perkalian Bilangan Campuran",
            steps: [
              { text: "Ubah bilangan campuran menjadi pecahan tidak wajar", subSteps: [] },
              {
                text: "Kalikan pecahan tidak wajar yang diperoleh",
                subSteps: [
                  { text: "Kalikan pembilang dan kalikan penyebut." }
                ]
              },
              { text: "Ubah hasilnya kembali menjadi bilangan campuran", subSteps: [] }
            ]
          }
        },

        page17: {
          highlights: [
            {
              text: "Berapa berat total semua brownies?",
              fontColor: highlightColor3,
              fontSize: "34gc",
              bold: true,
              underline: false
            }
          ],
          solutionSteps: {
            headerText: "Perkalian Bilangan Campuran",
            steps: [
              { text: "Ubah bilangan campuran menjadi pecahan tidak wajar", subSteps: [] },
              {
                text: "Kalikan pecahan tidak wajar yang diperoleh",
                subSteps: [
                  { text: "Kalikan pembilang dan kalikan penyebut." }
                ]
              },
              { text: "Ubah hasilnya kembali menjadi bilangan campuran", subSteps: [] }
            ]
          },
          headerText: "Identifikasi situasi – Buat Persamaan – Selesaikan",
          footerInstruction: "Ketuk 'Mulai Ulang' untuk mengulang aktivitas"
        }
      },

      pageConfig: {
        consoleMessages: {
          initializing: "🚀 Menginisialisasi PageConfig",
          directFunctionAssignmentCompleted: "✅ [PageConfig] Penetapan fungsi langsung selesai",
          manuallyClearingPageStates: "🧹 [PageConfig] Menghapus status halaman secara manual",
          pageStatesClearedSuccessfully: "✅ [PageConfig] Status halaman berhasil dihapus",
          errorClearingPageStates: "❌ [PageConfig] Error saat menghapus status halaman:",
          errorInDirectFunctionAssignment: "❌ [PageConfig] Error saat penetapan fungsi langsung:",
          pageConfigInitialized: "✅ PageConfig diinisialisasi - halaman dan fungsi tersedia secara global",
          useClearAllPageStates: "💡 [PageConfig] Gunakan window.clearAllPageStates() untuk menghapus status halaman secara manual",
          useUpdateTargetIDText: "💡 [PageConfig] Gunakan window.updateTargetIDText(sourceId, destinationId) untuk menyalin teks dari elemen sumber ke elemen tujuan",
          aboutToCallInitialize: "🔄 [PageConfig] Akan memanggil initializePageConfig...",
          initializeCompleted: "🔄 [PageConfig] initializePageConfig selesai, hasil:",
          optimizationComplete: "🎉 Optimisasi PageConfig selesai!",
          navigationAdvanceToNextQuestion: "🔄 [Navigasi] advanceToNextQuestion dipanggil (IMPLEMENTASI LANGSUNG)",
          navigationTreatingAsAppReload: "🔄 [Navigasi] Diproses sebagai MUAT ULANG APLIKASI dengan soal berikutnya",
          navigationUpdatedQuestionIndex: "✅ [Navigasi] window.currentQuestionIndex diperbarui menjadi:",
          uiUpdatingQuestionDependentElements: "🔄 [UI] Memperbarui elemen yang bergantung pada soal",
          uiTriggeredReactRerender: "✅ [UI] Memicu render ulang React melalui forceAppUpdate",
          uiForceUpdateNotAvailable: "⚠️ [UI] forceUpdate tidak tersedia, React mungkin tidak merender ulang",
          uiUpdateCompleted: "✅ [UI] updateQuestionDependentElements selesai",
          readingTextFromSource: "🎯 [PageConfig] Membaca teks dari sumber {sourceId}:",
          updatedNumberPad: "✅ [PageConfig] Target number pad {destinationId} diperbarui menjadi:",
          updatedElement: "✅ [PageConfig] Teks elemen {destinationId} diperbarui menjadi:",
          destinationElementNotFound: "🔄 [PageConfig] Elemen tujuan {destinationId} tidak ditemukan, mencoba lagi... ({retryCount}/{maxRetries})",
          destinationElementNotFoundAfterRetries: "⚠️ [PageConfig] Elemen tujuan tidak ditemukan: {destinationId} setelah {maxRetries} percobaan",
          sourceElementNotFound: "🔄 [PageConfig] Elemen sumber {sourceId} tidak ditemukan, mencoba lagi... ({retryCount}/{maxRetries})",
          sourceElementNotFoundAfterRetries: "⚠️ [PageConfig] Elemen sumber tidak ditemukan: {sourceId} setelah {maxRetries} percobaan",
          errorUpdatingTargetText: "❌ [PageConfig] Error saat memperbarui teks target:"
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
