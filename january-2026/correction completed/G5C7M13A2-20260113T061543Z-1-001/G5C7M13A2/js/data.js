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
        updatedNumberPadTarget: "✅ [PageConfig] Updated number pad",
        targetTo: "target to:",
        updatedElementText: "✅ [PageConfig] Updated element",
        textTo: "text to:",
        destinationElementNotFound: "🔄 [PageConfig] Destination element",
        notFoundRetrying: "not found, retrying...",
        destinationElementNotFoundAfterRetries: "⚠️ [PageConfig] Destination element not found:",
        afterRetries: "after",
        retries: "retries",
        sourceElementNotFound: "🔄 [PageConfig] Source element",
        sourceElementNotFoundAfterRetries: "⚠️ [PageConfig] Source element not found:",
        errorUpdatingTargetText: "❌ [PageConfig] Error updating target text:",
        pageConfigInitialized: "✅ PageConfig initialized - pages and functions available globally",
        useClearAllPageStates: "💡 [PageConfig] Use window.clearAllPageStates() to manually clear page states",
        useUpdateTargetIDText: "💡 [PageConfig] Use window.updateTargetIDText(sourceId, destinationId) to copy text from any source element to any destination element",
        aboutToCallInitializePageConfig: "🔄 [PageConfig] About to call initializePageConfig...",
        initializePageConfigCompleted: "🔄 [PageConfig] initializePageConfig completed, result:",
        pageConfigOptimizationComplete: "🎉 PageConfig optimization complete!",
        navigationDirection: "📄 [Navigation]",
        dispatchedPageChangeEvent: "Dispatched page change event to page",
        nextButton: "📄 [Next Button]",
        previousButton: "📄 [Previous Button]",
        lastPageStartingOver: "🔄 [Next Button] Last page - Starting over"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over"
      },

      common: {
        equationButtonText: "Difference between use of Indonesian and regional languages",
        questionText: "In the East Nusa Tenggara area, several types of languages are used in daily life. The use of the Indonesian language is $\\frac{1}{8}$ of the total, while the use of regional languages is $\\frac{3}{10}$. What is the difference between the use of Indonesian and regional languages in everyday conversation?",
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
          minus: "-",
          plus: "+",
          questionMark: "?",
          empty: "",
          Difference: "Difference",
          differenceOf: "Difference Of",
          and: "and"
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
              text: "use of the Indonesian language is $\\frac{1}{8}$ of the total",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Use of Indonesian language  = $\\frac{1}{8}$",
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
              text: "use of regional languages is $\\frac{3}{10}$",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Use of Indonesian language =  $\\frac{1}{8}$",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Use of regional languages = $\\frac{3}{10}$",
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
          footerInstruction: "Tap » to continue.",
          highlights: [

            {
              text: "difference between the use of Indonesian and regional languages",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Use of Indonesian language =  $\\frac{1}{8}$",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Use of regional languages = $\\frac{3}{10}$",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: [
            ],
            toFind: [
              {
                text: "Difference between the use of Indonesian and regional languages.",
                size: highlightTextSize,
                color: highlightColor3
              }
            ]
          },


        },
        // page5: {
        //   headerText: "Build a mathematical sentence for the given scene",
        //   footerInstruction: "Drag the correct buttons to the correct spot in the sentence",
        //   equationText: {
        //     totalWeight: 'Total weight'
        //   },
        //   optionTextFillBlanks: {
        //     optionOpt1Text: "Indonesian language",
        //     optionOpt2Text: 'Regional<br/> language',
        //   }
        // },
        // page6: {
        //   headerText: "Build a mathematical sentence for the given scene",
        //   footerInstruction: "Tap » to continue",
        //   equationText: {
        //     totalWeight: 'Total weight',
        //     javeneseSugar: "Javenese sugar weight",
        //     flourWeight: 'Flour weight',
        //   },
        //   fractionAddition: "This is a Mixed Fractions Subtraction challenge!"
        // },
        page5: {
          headerText: "This is the Subtraction of fractions challenge",
          footerInstruction: "Tap » to identify all the required steps for the subtraction",
          equationText: {
            totalWeight: 'Total weight',
            javeneseSugar: "Javenese sugar weight",
            flourWeight: 'Flour weight',
          },
          informationGathered: '<span style="color: #20B2AA;">&#10003;</span>\u00A0Information gathered from question.',
          nextStep: "Next - Steps required to find answer."
        },
        page6: {
          footerInstruction: "Choose the correct option",
          instructionAfterQuiz: "Tap » to continue.",
          quizPanel: {
            questionText: 'Tap the correct option that relates to the difference between two numbers.',
            options: [
              {
                text: "Compare the two numbers and add the smaller number with the bigger number.",
                iscorrect: false,
                feedback: "Check Again!",
              },
              {
                text: "Compare the two numbers and subtract the smaller number from the bigger number.",
                iscorrect: true,
                feedback: "That's Correct!",
              },
              {
                text: "Compare the two numbers and multiply the smaller number with the bigger number.",
                iscorrect: false,
                feedback: "Check Again!",
              },
              {
                text: "Compare the two numbers and divide the bigger number by the smaller number.",
                iscorrect: false,
                feedback: "Check Again!",
              }
            ],
          },
        },
        page7: {
          headerText: "Tap and drag the options to arrange the steps in the correct order to subtract unlike fractions.",
          footerInstruction: "Rearrange the buttons to the correct sequence of steps",
          instructionAfterQuiz: "Tap » to continue.",
          steps: [
            'Find the LCM of the two denominators.',
            'Convert into like fractions.',
            'Subtract like fractions.'
          ],

        },
        page8: {
          headerText: "What is the correct formula for converting a improper fraction into an mixed number?",
          footerInstruction: "Tap » to subtract the fractions using these steps",
          instructionAfterQuiz: "Tap » to explore step 2 in more detail",
          solutionSteps: {
            headerText: "Subtraction of fractions",
            steps: [
              { text: "Subtraction sentence", subSteps: [] }, {
                text: 'Find the LCM of the  denominators.',
                subSteps: []
              },
              {
                text: 'Convert into like fractions.',
                subSteps: [

                ]
              },
              {
                text: 'Subtract like fractions.',
                subSteps: []
              }
            ],
          },
          informationGathered: '<span style="color: #20B2AA;">&#10003;</span>\u00A0Information gathered from question.',
          stepsRequired: '<span style="color: #20B2AA;">&#10003;</span>\u00A0Steps required to find answer',
          nextFinding: "Next - Finding the required Result",
        },
        page9: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal comparison symbol",
          instructionAfterQuiz: 'Tap » to build the Subtraction sentence',
          solutionSteps: {
            headerText: "Subtraction of fractions",
            steps: [
              {
                text: "Subtraction sentence",
                subSteps: []
              },
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
                text: 'Subtract like fractions.',
                subSteps: []
              }
            ],
          },
        },
        page10: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap Build Subtraction Sectence button to build 'Subtraction Sentence' ",
          lcmButtonText: 'Build Subtraction Sectence',
          instructionAfterQuiz: "Tap » to explore step 3 in more detail",
          solutionSteps: {
            headerText: "Subtraction of fractions",
            steps: [
              {
                text: "Subtraction sentence",
                subSteps: []
              },
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
                text: 'Subtract like fractions.',
                subSteps: []
              }
            ],
          },
        },
        page11: {

          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the answer for each conversion.",
          instructionAfterQuiz: "Tap » to step 2",
          solutionSteps: {
            headerText: "Subtraction of fractions",
            steps: [
              { text: "Subtraction sentence", subSteps: [] }, {
                text: 'Find the LCM of the  denominators.',
                subSteps: []
              },
              {
                text: 'Convert into like fractions.',
                subSteps: [

                ]
              },
              {
                text: 'Subtract like fractions.',
                subSteps: []
              }
            ],
          },
        },
        page12: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap LCM button to find the LCM of fractions",
          lcmButtonText: 'Find LCM of 10 and 8',
          solutionSteps: {
            headerText: "Subtraction of fractions",
            steps: [
              { text: "Subtraction sentence", subSteps: [] }, {
                text: 'Find the LCM of the  denominators.',
                subSteps: []
              },
              {
                text: 'Convert into like fractions.',
                subSteps: [

                ]
              },
              {
                text: 'Subtract like fractions.',
                subSteps: []
              }
            ],
          }
        },
        page13: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap » to step 3",
          solutionSteps: {
            headerText: "Subtraction of fractions",
            steps: [
              { text: "Subtraction sentence", subSteps: [] }, {
                text: 'Find the LCM of the  denominators.',
                subSteps: []
              },
              {
                text: 'Convert into like fractions.',
                subSteps: [

                ]
              },
              {
                text: 'Subtract like fractions.',
                subSteps: []
              }
            ],
          }
        },
        page14: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the answer for each conversion",
          instructionAfterQuiz: "Tap » to step 4",
          solutionSteps: {
            headerText: "Subtraction of fractions",
            steps: [
              { text: "Subtraction sentence", subSteps: [] }, {
                text: 'Find the LCM of the  denominators.',
                subSteps: []
              },
              {
                text: 'Convert into like fractions.',
                subSteps: [

                ]
              },
              {
                text: 'Subtract like fractions.',
                subSteps: []
              }
            ],
          }
        },
        page15: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the answer",
          instructionAfterQuiz: "Tap » to compute",
          solutionSteps: {
            headerText: "Subtraction of fractions",
            steps: [
              { text: "Subtraction sentence", subSteps: [] }, {
                text: 'Find the LCM of the  denominators.',
                subSteps: []
              },
              {
                text: 'Convert into like fractions.',
                subSteps: [

                ]
              },
              {
                text: 'Subtract like fractions.',
                subSteps: []
              }
            ],
          }
        },
        page16: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the answer",
          instructionAfterQuiz: "Tap » to summarize",
          solutionSteps: {
            headerText: "Subtraction of fractions",
            steps: [
              { text: "Subtraction sentence", subSteps: [] }, {
                text: 'Find the LCM of the  denominators.',
                subSteps: []
              },
              {
                text: 'Convert into like fractions.',
                subSteps: [

                ]
              },
              {
                text: 'Subtract like fractions.',
                subSteps: []
              }
            ],
          }
        },
        page17: {
          highlights: [
            {
              text: "difference between the use of Indonesian and regional languages",
              fontColor: highlightColor3,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          instructionAfterQuiz: "Tap » for Step 2",
          solutionSteps: {
            headerText: "Subtraction of fractions",
            steps: [
              { text: "Subtraction sentence", subSteps: [] }, {
                text: 'Find the LCM of the  denominators.',
                subSteps: []
              },
              {
                text: 'Convert into like fractions.',
                subSteps: [

                ]
              },
              {
                text: 'Subtract like fractions.',
                subSteps: []
              }
            ],
          },
          headerText: "Identify scene – Build Equation – Solve for unknown",
          footerInstruction: "Tap 'Start Over' to re-do activity"
        },
       
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
        initializingPageConfig: "🚀 Menginisialisasi PageConfig",
        initializingWindowFunctions: "🔄 [PageConfig] Menginisialisasi fungsi window...",
        advanceToNextQuestionCalled: "🔄 [Navigasi] advanceToNextQuestion dipanggil (IMPLEMENTASI LANGSUNG)",
        treatingAsAppReload: "🔄 [Navigasi] Diproses sebagai MUAT ULANG APLIKASI dengan soal berikutnya",
        updatedQuestionIndex: "✅ [Navigasi] window.currentQuestionIndex diperbarui menjadi:",
        updatingQuestionDependentElements: "🔄 [UI] Memperbarui elemen yang bergantung pada soal",
        triggeredReactRerender: "✅ [UI] Memicu render ulang React melalui forceAppUpdate",
        forceAppUpdateNotAvailable: "⚠️ [UI] forceAppUpdate tidak tersedia, React mungkin tidak merender ulang",
        updateQuestionDependentElementsCompleted: "✅ [UI] updateQuestionDependentElements selesai",
        directFunctionAssignmentCompleted: "✅ [PageConfig] Penetapan fungsi langsung selesai",
        windowAdvanceToNextQuestionType: "🔍 [PageConfig] Tipe window.advanceToNextQuestion:",
        windowUpdateQuestionDependentElementsType: "🔍 [PageConfig] Tipe window.updateQuestionDependentElements:",
        errorInDirectFunctionAssignment: "❌ [PageConfig] Error saat penetapan fungsi langsung:",
        manuallyClearingPageStates: "🧹 [PageConfig] Menghapus status halaman secara manual",
        pageStatesClearedSuccessfully: "✅ [PageConfig] Status halaman berhasil dihapus",
        errorClearingPageStates: "❌ [PageConfig] Error saat menghapus status halaman:",
        readingTextFromSource: "🎯 [PageConfig] Membaca teks dari sumber",
        updatedNumberPadTarget: "✅ [PageConfig] Target number pad diperbarui",
        targetTo: "target ke:",
        updatedElementText: "✅ [PageConfig] Teks elemen diperbarui",
        textTo: "teks ke:",
        destinationElementNotFound: "🔄 [PageConfig] Elemen tujuan",
        notFoundRetrying: "tidak ditemukan, mencoba lagi...",
        destinationElementNotFoundAfterRetries: "⚠️ [PageConfig] Elemen tujuan tidak ditemukan:",
        afterRetries: "setelah",
        retries: "percobaan",
        sourceElementNotFound: "🔄 [PageConfig] Elemen sumber",
        sourceElementNotFoundAfterRetries: "⚠️ [PageConfig] Elemen sumber tidak ditemukan:",
        errorUpdatingTargetText: "❌ [PageConfig] Error saat memperbarui teks target:",
        pageConfigInitialized: "✅ PageConfig diinisialisasi - halaman dan fungsi tersedia secara global",
        useClearAllPageStates: "💡 [PageConfig] Gunakan window.clearAllPageStates() untuk menghapus status halaman secara manual",
        useUpdateTargetIDText: "💡 [PageConfig] Gunakan window.updateTargetIDText(sourceId, destinationId) untuk menyalin teks dari elemen sumber ke elemen tujuan",
        aboutToCallInitializePageConfig: "🔄 [PageConfig] Akan memanggil initializePageConfig...",
        initializePageConfigCompleted: "🔄 [PageConfig] initializePageConfig selesai, hasil:",
        pageConfigOptimizationComplete: "🎉 Optimisasi PageConfig selesai!",
        navigationDirection: "📄 [Navigasi]",
        dispatchedPageChangeEvent: "Peristiwa perpindahan halaman dikirim ke halaman",
        nextButton: "📄 [Tombol Berikutnya]",
        previousButton: "📄 [Tombol Sebelumnya]",
        lastPageStartingOver: "🔄 [Tombol Berikutnya] Halaman terakhir - Mulai ulang"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang"
      },

      common: {
        equationButtonText: "Selisih penggunaan bahasa Indonesia dan bahasa daerah",
        questionText:
          "Di wilayah Nusa Tenggara Timur, beberapa jenis bahasa digunakan dalam kehidupan sehari-hari. Penggunaan bahasa Indonesia adalah $\\frac{1}{8}$ dari keseluruhan, sedangkan penggunaan bahasa daerah adalah $\\frac{3}{10}$. Berapa selisih penggunaan bahasa Indonesia dan bahasa daerah dalam percakapan sehari-hari?",
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
          minus: "-",
          plus: "+",
          questionMark: "?",
          empty: ""
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
            "Mari kita tentukan selisih penggunaan bahasa dengan mengurangkan pecahan.",
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
              text: "penggunaan bahasa Indonesia adalah $\\frac{1}{8}$ dari keseluruhan",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Penggunaan bahasa Indonesia = $\\frac{1}{8}$",
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
              text: "penggunaan bahasa Indonesia adalah $\\frac{1}{8}$ dari keseluruhan",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "penggunaan bahasa daerah adalah $\\frac{3}{10}$",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Penggunaan bahasa Indonesia = $\\frac{1}{8}$",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Penggunaan bahasa daerah = $\\frac{3}{10}$",
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
          footerInstruction: "Ketuk » untuk membangun kalimat matematika.",
          highlights: [
            {
              text: "penggunaan bahasa Indonesia adalah $\\frac{1}{8}$ dari keseluruhan",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "penggunaan bahasa daerah adalah $\\frac{3}{10}$",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "selisih penggunaan bahasa Indonesia dan bahasa daerah",
              fontColor: highlightColor3,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Penggunaan bahasa Indonesia = $\\frac{1}{8}$",
                size: highlightTextSize,
                color: highlightColor1
              },
              {
                text: "Penggunaan bahasa daerah = $\\frac{3}{10}$",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: [],
            toFind: [
              {
                text: "Selisih penggunaan bahasa Indonesia dan bahasa daerah.",
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
            totalWeight: "Jumlah total"
          },
          optionTextFillBlanks: {
            optionOpt1Text: "Bahasa Indonesia",
            optionOpt2Text: "Bahasa<br/>daerah"
          }
        },

        page6: {
          headerText: "Buat kalimat matematika untuk situasi yang diberikan",
          footerInstruction: "Ketuk » untuk melanjutkan",
          equationText: {
            totalWeight: "Jumlah total",
            javeneseSugar: "Berat gula Jawa",
            flourWeight: "Berat tepung"
          },
          fractionAddition: "Ini adalah tantangan pengurangan pecahan tidak senilai!"
        },

        page7: {
          headerText: "Buat kalimat matematika untuk situasi yang diberikan",
          footerInstruction:
            "Ketuk » untuk mengidentifikasi semua langkah pengurangan yang diperlukan",
          equationText: {
            totalWeight: "Jumlah total",
            javeneseSugar: "Berat gula Jawa",
            flourWeight: "Berat tepung"
          },
          informationGathered:
            '<span style="color: #20B2AA;">&#10003;</span>\u00A0Informasi telah dikumpulkan dari soal.',
          nextStep: "Selanjutnya – Langkah-langkah untuk menemukan jawaban."
        },

        page8: {
          headerText:
            "Ketuk dan seret opsi untuk menyusun urutan langkah yang benar dalam mengurangkan pecahan tidak senilai.",
          footerInstruction: "Susun tombol sesuai urutan langkah yang benar",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          steps: [
            "Tentukan KPK dari kedua penyebut.",
            "Ubah menjadi pecahan senilai.",
            "Kurangkan pecahan senilai."
          ]
        },

        page9: {
          headerText: "Apa rumus yang benar untuk mengubah pecahan tidak wajar menjadi bilangan campuran?",
          footerInstruction:
            "Ketuk » untuk mengurangkan pecahan senilai dengan langkah-langkah ini",
          solutionSteps: {
            headerText: "Pengurangan Pecahan Senilai",
            steps: [
              { text: "Tentukan KPK dari penyebut.", subSteps: [] },
              { text: "Ubah menjadi pecahan senilai.", subSteps: [] },
              { text: "Kurangkan pecahan senilai.", subSteps: [] }
            ]
          },
          informationGathered:
            '<span style="color: #20B2AA;">&#10003;</span>\u00A0Informasi telah dikumpulkan dari soal.',
          stepsRequired:
            '<span style="color: #20B2AA;">&#10003;</span>\u00A0Langkah-langkah telah ditentukan',
          nextFinding: "Selanjutnya – Menentukan hasil akhir"
        },

        page10: {
          headerText: "Kerjakan langkahnya di buku catatanmu dan sebutkan jawabannya.",
          footerInstruction: "Ketuk tombol KPK untuk mencari KPK dari pecahan.",
          lcmButtonText: "KPK dari 8 dan 10",
          solutionSteps: {
            headerText: "Pengurangan Pecahan Senilai",
            steps: [
              { text: "Tentukan KPK dari penyebut.", subSteps: [] },
              { text: "Ubah menjadi pecahan senilai.", subSteps: [] },
              { text: "Kurangkan pecahan senilai.", subSteps: [] }
            ]
          }
        },

        page11: {
          headerText: "Kerjakan langkahnya di buku catatanmu dan sebutkan jawabannya.",
          footerInstruction: "Ketuk » untuk melanjutkan",
          solutionSteps: {
            headerText: "Pengurangan Pecahan Senilai",
            steps: [
              { text: "Tentukan KPK dari penyebut.", subSteps: [] },
              { text: "Ubah menjadi pecahan senilai.", subSteps: [] },
              { text: "Kurangkan pecahan senilai.", subSteps: [] }
            ]
          }
        },

        page12: {
          headerText: "Kerjakan langkahnya di buku catatanmu dan sebutkan jawabannya.",
          footerInstruction: "Ketuk '?' untuk melihat pengurangan",
          instructionRevealConversions: "Ketuk '?' untuk melihat jawaban tiap konversi",
          solutionSteps: {
            headerText: "Pengurangan Pecahan Senilai",
            steps: [
              { text: "Tentukan KPK dari penyebut.", subSteps: [] },
              { text: "Ubah menjadi pecahan senilai.", subSteps: [] },
              { text: "Kurangkan pecahan senilai.", subSteps: [] }
            ]
          }
        },

        page13: {
          headerText: "Kerjakan langkahnya di buku catatanmu dan sebutkan jawabannya.",
          footerInstruction: "Ketuk '?' untuk melihat jawaban tiap konversi",
          solutionSteps: {
            headerText: "Pengurangan Pecahan Senilai",
            steps: [
              { text: "Tentukan KPK dari penyebut.", subSteps: [] },
              { text: "Ubah menjadi pecahan senilai.", subSteps: [] },
              { text: "Kurangkan pecahan senilai.", subSteps: [] }
            ]
          }
        },

        page14: {
          headerText: "Kerjakan langkahnya di buku catatanmu dan sebutkan jawabannya.",
          footerInstruction: "Ketuk '?' untuk melihat jawaban tiap konversi",
          instructionAfterQuiz: "Ketuk » untuk mengubah ke bilangan campuran.",
          solutionSteps: {
            headerText: "Pengurangan Pecahan Senilai",
            steps: [
              { text: "Tentukan KPK dari penyebut.", subSteps: [] },
              { text: "Ubah menjadi pecahan senilai.", subSteps: [] },
              { text: "Kurangkan pecahan senilai.", subSteps: [] }
            ]
          }
        },

        page15: {
          highlights: [
            {
              text: "selisih penggunaan bahasa Indonesia dan bahasa daerah",
              fontColor: highlightColor3,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          solutionSteps: {
            headerText: "Pengurangan Pecahan Senilai",
            steps: [
              { text: "Tentukan KPK dari penyebut.", subSteps: [] },
              { text: "Ubah menjadi pecahan senilai.", subSteps: [] },
              { text: "Kurangkan pecahan senilai.", subSteps: [] }
            ]
          },
          headerText: "Identifikasi situasi – Buat Persamaan – Selesaikan",
          footerInstruction: "Ketuk 'Mulai Ulang' untuk mengulang aktivitas"
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
