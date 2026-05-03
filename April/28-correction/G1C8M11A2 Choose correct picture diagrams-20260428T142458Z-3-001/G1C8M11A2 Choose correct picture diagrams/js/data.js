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
        title: "Reading favorite games PD"
      },
      accessibility: {
        tapGifAlt: "Tap",
      },
      messages: {
        pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?",
        navigationDispatched:
          "📄 [Navigation] {direction} - Dispatched page change event to page {targetPage}",
        nextPageEventDispatched: "📄 [Next Button] Dispatched page change event to page {page}",
        previousPageEventDispatched:
          "📄 [Previous Button] Dispatched page change event to page {page}",
        nextButtonLastPage: "🔄 [Next Button] Last page - Starting over",
        navigationReset: "Navigation reset (simplified flow).",
        navigationComplete: "Complete app reset completed — ready for a new question.",
        pageConfig: {
          initializing: "🚀 Initializing PageConfig",
          initWindowFunctions: "🔄 [PageConfig] Initializing window functions...",
          advanceToNextCalled:
            "🔄 [Navigation] advanceToNextQuestion called (DIRECT IMPLEMENTATION)",
          treatingAsReload: "🔄 [Navigation] Treating as APP RELOAD with next question",
          updatedQuestionIndex: "✅ [Navigation] Updated window.currentQuestionIndex to: {index}",
          updatingQuestionElements: "🔄 [UI] Updating question-dependent elements",
          forceAppUpdateTriggered: "✅ [UI] Triggered React re-render via forceAppUpdate",
          forceAppUpdateUnavailable:
            "⚠️ [UI] forceAppUpdate not available, React may not re-render",
          updateQuestionElementsDone: "✅ [UI] updateQuestionDependentElements completed",
          directAssignmentDone: "✅ [PageConfig] Direct function assignment completed",
          advanceToNextType: "🔍 [PageConfig] window.advanceToNextQuestion type: {type}",
          updateQuestionDepType:
            "🔍 [PageConfig] window.updateQuestionDependentElements type: {type}",
          errorDirectAssignment: "❌ [PageConfig] Error in direct function assignment:",
          clearingPageStates: "🧹 [PageConfig] Manually clearing page states",
          pageStatesClearedOk: "✅ [PageConfig] Page states cleared successfully",
          errorClearingStates: "❌ [PageConfig] Error clearing page states:",
          readingFromSource: "🎯 [PageConfig] Reading text from source {sourceId}:",
          updatedNumberPad: "✅ [PageConfig] Updated number pad {destinationId} target to:",
          updatedElement: "✅ [PageConfig] Updated element {destinationId} text to:",
          destinationRetry:
            "🔄 [PageConfig] Destination element {destinationId} not found, retrying... ({attempt}/{maxRetries})",
          destinationNotFound:
            "⚠️ [PageConfig] Destination element not found: {destinationId} after {maxRetries} retries",
          sourceRetry:
            "🔄 [PageConfig] Source element {sourceId} not found, retrying... ({attempt}/{maxRetries})",
          sourceNotFound:
            "⚠️ [PageConfig] Source element not found: {sourceId} after {maxRetries} retries",
          errorUpdateTarget: "❌ [PageConfig] Error updating target text:",
          initComplete: "✅ PageConfig initialized — pages and functions available globally",
          hintClearStates:
            "💡 [PageConfig] Use window.clearAllPageStates() to manually clear page states",
          hintUpdateTarget:
            "💡 [PageConfig] Use window.updateTargetIDText(sourceId, destinationId) to copy text between elements",
          aboutToInit: "🔄 [PageConfig] About to call initializePageConfig...",
          initFinished:
            "🔄 [PageConfig] initializePageConfig completed, result: {resultType}",
          optimizationComplete: "🎉 PageConfig optimization complete!",
        },
      },

      buttons: {
        next: "»",
        previous: "«",
        start: "Start",
        startOver: "Start Over"
      },

      common: {
        equationButtonText: "Paper not painted",
        questionText: "Yohana has a painting assignment on $\\frac{2}{3}$ piece of drawing paper given by her teacher. She has already painted $\\frac{1}{3}$ of the paper. How much paper has Yohana not painted yet?",
        questionIcon: "Q",
        headerText: "The picture diagram shows children’s favorite games.",
        gameLabel: {
          favoriteGamerPicture: "Favorite Games Picture Diagram",
          hideAndSeek: "Hide and<br/> Seek",
          ropeJump: "Rope<br/> Jump",
          marbles: "Marbles",
          bentengan: "Bentengan",
          key: "Key: Each triangle picture = 1 Child",
        },
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
          title: "Let’s try a fun challenge!",
          introText: 'Read the question carefully.<br/>Choose the correct picture diagram.'
        },
        page2: {
          headerText: "Which picture diagram shows 4 mangoes?",
          footerInstruction: "Tap the correct picture diagram",
          instructionAfterQuiz: 'Tap » to continue.',
          typesOfFruits: 'Types of Fruits Diagram',
          questionTable1: {
            headers: ["Types of Fruits Diagram"],
            rows: [
              ["Bananas", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Mangoes", ["assets/star.png", "assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Oranges", ["assets/star.png"]],
              ["Papayas", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ['Key:  Each <span style="display:inline-flex;align-items:center;vertical-align:middle;"><img src="assets/star.png" style="width:55gc;height:55gc;display:inline-block;vertical-align:middle;margin:0 4gc;"/></span> = 1 Fruit', ""]
            ],
          },
          questionTable2: {
            headers: ["Types of Fruits Diagram"],
            rows: [
              ["Bananas", ["assets/star.png", "assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Mangoes", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Oranges", ["assets/star.png"]],
              ["Papayas", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ['Key:  Each <span style="display:inline-flex;align-items:center;vertical-align:middle;"><img src="assets/star.png" style="width:55gc;height:55gc;display:inline-block;vertical-align:middle;margin:0 4gc;"/></span> = 1 Fruit', ""]


            ],
          },
          key: '',
          oneFruit: ' ',
          feedback: {
            correct: "Yay! This picture diagram shows 4 mangoes.",
            incorrect: 'Oops! That’s not correct. Count the stars in the Mangoes row again.'
          }
        },
        page3: {
          headerText: "Which picture diagram has more bananas?",
          footerInstruction: "Tap the correct picture diagram",
          instructionAfterQuiz: 'Tap » to continue.',
          typesOfFruits: 'Types of Fruits Diagram',
          questionTable1: {
            headers: ["Types of Fruits Diagram"],

            rows: [
              ["Bananas", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Mangoes", ["assets/star.png", "assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Oranges", ["assets/star.png"]],

              ["Papayas", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ['Key:  Each <span style="display:inline-flex;align-items:center;vertical-align:middle;"><img src="assets/star.png" style="width:55gc;height:55gc;display:inline-block;vertical-align:middle;margin:0 4gc;"/></span> = 1 Fruit', ""]

            ],
          },
          questionTable2: {
            headers: ["Types of Fruits Diagram"],
            rows: [
              ["Bananas", ["assets/star.png", "assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Mangoes", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Oranges", ["assets/star.png"]],
              ["Papayas", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ['Key:  Each <span style="display:inline-flex;align-items:center;vertical-align:middle;"><img src="assets/star.png" style="width:55gc;height:55gc;display:inline-block;vertical-align:middle;margin:0 4gc;"/></span> = 1 Fruit', ""]

            ],
          },
          key: 'Key:  Each',
          oneFruit: ' = 1 Fruit',
          feedback: {
            correct: "Yay! That’s correct. This picture diagram shows more bananas.",
            incorrect: 'Uh-oh! Compare the number of stars for bananas in both diagrams.'
          }
        },
        page4: {
          headerText: "Which picture diagram has fewer papayas?",
          footerInstruction: "Tap the correct picture diagram",
          instructionAfterQuiz: 'Tap » to continue.',
          typesOfFruits: 'Types of Fruits Diagram',
          questionTable1: {
            headers: ["Types of Fruits Diagram"],
            rows: [
              ["Bananas", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Mangoes", ["assets/star.png", "assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Oranges", ["assets/star.png"]],
              ["Papayas", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ['Key:  Each <span style="display:inline-flex;align-items:center;vertical-align:middle;"><img src="assets/star.png" style="width:55gc;height:55gc;display:inline-block;vertical-align:middle;margin:0 4gc;"/></span> = 1 Fruit', ""]

            ],
          },
          questionTable2: {
            headers: ["Types of Fruits Diagram"],
            rows: [
              ["Bananas", ["assets/star.png", "assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Mangoes", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Oranges", ["assets/star.png"]],
              ["Papayas", ["assets/star.png", "assets/star.png"]],
              ['Key:  Each <span style="display:inline-flex;align-items:center;vertical-align:middle;"><img src="assets/star.png" style="width:55gc;height:55gc;display:inline-block;vertical-align:middle;margin:0 4gc;"/></span> = 1 Fruit', ""]
            ],
          },
          key: 'Key:  Each',
          oneFruit: ' = 1 Fruit',
          feedback: {
            correct: "Yay! That’s correct. This picture diagram shows fewer papayas.",
            incorrect: 'Uh-oh! Compare the number of stars for papayas in both diagrams.'
          }
        },
        page5: {
          headerText: "Which picture diagram shows more mangoes than bananas?",
          footerInstruction: "Tap the correct picture diagram",
          instructionAfterQuiz: 'Tap » to continue.',
          typesOfFruits: 'Types of Fruits Diagram',
          questionTable1: {
            headers: ["Types of Fruits Diagram"],
            rows: [
              ["Bananas", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Mangoes", ["assets/star.png", "assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Oranges", ["assets/star.png"]],
              ["Papayas", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ['Key:  Each <span style="display:inline-flex;align-items:center;vertical-align:middle;"><img src="assets/star.png" style="width:55gc;height:55gc;display:inline-block;vertical-align:middle;margin:0 4gc;"/></span> = 1 Fruit', ""]
            ],
          },
          questionTable2: {
            headers: ["Types of Fruits Diagram"],
            rows: [
              ["Bananas", ["assets/star.png", "assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Mangoes", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Oranges", ["assets/star.png"]],
              ["Papayas", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ['Key:  Each <span style="display:inline-flex;align-items:center;vertical-align:middle;"><img src="assets/star.png" style="width:55gc;height:55gc;display:inline-block;vertical-align:middle;margin:0 4gc;"/></span> = 1 Fruit', ""]
            ],
          },
          key: 'Key:  Each',
          oneFruit: ' = 1 Fruit',
          feedback: {
            correct: "Yay! You choose correct picture diagram",
            incorrect: 'Oops! This diagram shows less mangoes than bananas. Count and try again.'
          }
        },
        page6: {
          headerText: "Which picture diagram has more fruits in total?",
          footerInstruction: "Tap the correct picture diagram",
          instructionAfterQuiz: 'Tap » to continue.',
          typesOfFruits: 'Types of Fruits Diagram',
          questionTable1: {
            headers: ["Types of Fruits Diagram"],
            rows: [
              ["Bananas", ["assets/star.png", "assets/star.png"]],
              ["Mangoes", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Oranges", ["assets/star.png"]],
              ["Papayas", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ['Key:  Each <span style="display:inline-flex;align-items:center;vertical-align:middle;"><img src="assets/star.png" style="width:55gc;height:55gc;display:inline-block;vertical-align:middle;margin:0 4gc;"/></span> = 1 Fruit', ""]
            ],
          },
          questionTable2: {
            headers: ["Types of Fruits Diagram"],
            rows: [
              ["Bananas", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Mangoes", ["assets/star.png", "assets/star.png"]],
              ["Oranges", ["assets/star.png"]],
              ["Papayas", ["assets/star.png", "assets/star.png"]],
              ['Key:  Each <span style="display:inline-flex;align-items:center;vertical-align:middle;"><img src="assets/star.png" style="width:55gc;height:55gc;display:inline-block;vertical-align:middle;margin:0 4gc;"/></span> = 1 Fruit', ""]
            ],
          },
          key: 'Key:  Each',
          oneFruit: ' = 1 Fruit',
          feedback: {
            correct: "Yay! You choose the diagram with more total stars.",
            incorrect: 'Uh-oh! It shows only 8 stars. Count all the stars in other diagram.'
          }
        },
        page7: {
          title: "Activity Completed!",
          introText: 'Well done!<br/>You did a great job reading picture diagrams.'
        },
      }
    },
    id: {
      appInfo: {
        title: "Rasio - Perbandingan Jarak Komodo"
      },
      accessibility: {
        tapGifAlt: "Ketuk",
      },
      messages: {
        pageStatesCleared: "Status halaman sudah dihapus. Muat ulang halaman untuk mulai dari awal?",
        navigationDispatched:
          "📄 [Navigasi] {direction} — peristiwa pindah halaman dikirim ke halaman {targetPage}",
        nextPageEventDispatched:
          "📄 [Tombol Berikutnya] Peristiwa pindah halaman dikirim ke halaman {page}",
        previousPageEventDispatched:
          "📄 [Tombol Sebelumnya] Peristiwa pindah halaman dikirim ke halaman {page}",
        nextButtonLastPage: "🔄 [Tombol Berikutnya] Halaman terakhir — mulai lagi",
        navigationReset: "Navigasi diatur ulang (aliran disederhanakan).",
        navigationComplete: "Reset aplikasi selesai — siap untuk pertanyaan baru.",
        pageConfig: {
          initializing: "🚀 Menginisialisasi PageConfig",
          initWindowFunctions: "🔄 [PageConfig] Menginisialisasi fungsi window...",
          advanceToNextCalled:
            "🔄 [Navigasi] advanceToNextQuestion dipanggil (IMPLEMENTASI LANGSUNG)",
          treatingAsReload: "🔄 [Navigasi] Diperlakukan sebagai MUAT ULANG APLIKASI dengan pertanyaan berikutnya",
          updatedQuestionIndex:
            "✅ [Navigasi] window.currentQuestionIndex diperbarui menjadi: {index}",
          updatingQuestionElements: "🔄 [UI] Memperbarui elemen yang bergantung pada soal",
          forceAppUpdateTriggered: "✅ [UI] Render ulang React dipicu melalui forceAppUpdate",
          forceAppUpdateUnavailable:
            "⚠️ [UI] forceAppUpdate tidak tersedia, React mungkin tidak me-render ulang",
          updateQuestionElementsDone: "✅ [UI] updateQuestionDependentElements selesai",
          directAssignmentDone: "✅ [PageConfig] Penugasan fungsi langsung selesai",
          advanceToNextType: "🔍 [PageConfig] tipe window.advanceToNextQuestion: {type}",
          updateQuestionDepType:
            "🔍 [PageConfig] tipe window.updateQuestionDependentElements: {type}",
          errorDirectAssignment: "❌ [PageConfig] Galat saat penugasan fungsi langsung:",
          clearingPageStates: "🧹 [PageConfig] Menghapus status halaman secara manual",
          pageStatesClearedOk: "✅ [PageConfig] Status halaman berhasil dihapus",
          errorClearingStates: "❌ [PageConfig] Galat saat menghapus status halaman:",
          readingFromSource: "🎯 [PageConfig] Membaca teks dari sumber {sourceId}:",
          updatedNumberPad: "✅ [PageConfig] Target keypad angka {destinationId} diperbarui menjadi:",
          updatedElement: "✅ [PageConfig] Teks elemen {destinationId} diperbarui menjadi:",
          destinationRetry:
            "🔄 [PageConfig] Elemen tujuan {destinationId} tidak ditemukan, mencoba lagi... ({attempt}/{maxRetries})",
          destinationNotFound:
            "⚠️ [PageConfig] Elemen tujuan tidak ditemukan: {destinationId} setelah {maxRetries} percobaan",
          sourceRetry:
            "🔄 [PageConfig] Elemen sumber {sourceId} tidak ditemukan, mencoba lagi... ({attempt}/{maxRetries})",
          sourceNotFound:
            "⚠️ [PageConfig] Elemen sumber tidak ditemukan: {sourceId} setelah {maxRetries} percobaan",
          errorUpdateTarget: "❌ [PageConfig] Galat saat memperbarui teks target:",
          initComplete: "✅ PageConfig diinisialisasi — halaman dan fungsi tersedia secara global",
          hintClearStates:
            "💡 [PageConfig] Gunakan window.clearAllPageStates() untuk menghapus status halaman secara manual",
          hintUpdateTarget:
            "💡 [PageConfig] Gunakan window.updateTargetIDText(sourceId, destinationId) untuk menyalin teks antar elemen",
          aboutToInit: "🔄 [PageConfig] Akan memanggil initializePageConfig...",
          initFinished:
            "🔄 [PageConfig] initializePageConfig selesai, hasil: {resultType}",
          optimizationComplete: "🎉 Optimasi PageConfig selesai!",
        },
      },

      buttons: {
        next: "»",
        previous: "«",
        start: "Mulai",
        startOver: "Mulai Lagi"
      },

      common: {
        equationButtonText: "Kertas belum dicat",
        headerText: "Diagram gambar menunjukkan permainan favorit anak-anak.",
        gameLabel: {
          favoriteGamerPicture: "Diagram Gambar Permainan Favorit",
          hideAndSeek: "Petak<br/> Umpet",
          ropeJump: "Lompat<br/> Tali",
          marbles: "Kelereng",
          bentengan: "Bentengan",
          key: "Kunci: Setiap segitiga = 1 anak",
        },
        amountBeniGiveToGrandMother: "Jumlah yang Beni berikan\n kepada kakeknya.",
        amountOfBika: "Jumlah Bika\n Ambon yang tersisa pada Beni",
        questionText:
          "Rumah Komang berada di antara rumah Yohana dan rumah Lukas. Jarak dari rumah Komang ke rumah Yohana adalah $1 \\frac{1}{2}$ km, sedangkan jarak antara rumah Komang dan rumah Lukas adalah $2 \\frac{1}{4}$ km. Jika lebar rumah Komang adalah $\\frac{1}{200}$ km, berapa jarak rumah Yohana ke rumah Lukas?",
        questionIcon: "Q",
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
          title: "Yuk coba tantangan seru!",
          introText:
            "Baca soal dengan teliti.<br/>Pilih diagram gambar yang benar.",
        },

        page2: {
          headerText: "Diagram gambar manakah yang menunjukkan 4 mangga?",
          footerInstruction: "Ketuk diagram gambar yang benar",
          instructionAfterQuiz: "Tekan » untuk lanjut.",
          typesOfFruits: "Diagram Jenis Buah",
          questionTable1: {
            headers: [],
            rows: [
              ["Pisang", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Mangga", ["assets/star.png", "assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Jeruk", ["assets/star.png"]],
              ["Pepaya", ["assets/star.png", "assets/star.png", "assets/star.png"]],
            ],
          },
          questionTable2: {
            headers: [],
            rows: [
              ["Pisang", ["assets/star.png", "assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Mangga", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Jeruk", ["assets/star.png"]],
              ["Pepaya", ["assets/star.png", "assets/star.png", "assets/star.png"]],
            ],
          },
          key: "Kunci:  Setiap",
          oneFruit: " = 1 buah",
          feedback: {
            correct: "Hore! Diagram gambar ini menunjukkan 4 mangga.",
            incorrect:
              "Ups! Belum benar. Hitung lagi bintang pada baris Mangga.",
          },
        },

        page3: {
          headerText: "Diagram gambar manakah yang memiliki lebih banyak pisang?",
          footerInstruction: "Ketuk diagram gambar yang benar",
          instructionAfterQuiz: "Tekan » untuk lanjut.",
          typesOfFruits: "Diagram Jenis Buah",
          questionTable1: {
            headers: [],
            rows: [
              ["Pisang", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Mangga", ["assets/star.png", "assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Jeruk", ["assets/star.png"]],
              ["Pepaya", ["assets/star.png", "assets/star.png", "assets/star.png"]],
            ],
          },
          questionTable2: {
            headers: [],
            rows: [
              ["Pisang", ["assets/star.png", "assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Mangga", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Jeruk", ["assets/star.png"]],
              ["Pepaya", ["assets/star.png", "assets/star.png", "assets/star.png"]],
            ],
          },
          key: "Kunci:  Setiap",
          oneFruit: " = 1 buah",
          feedback: {
            correct:
              "Hore! Benar. Diagram gambar ini menunjukkan lebih banyak pisang.",
            incorrect:
              "Aduh! Bandingkan jumlah bintang untuk pisang di kedua diagram.",
          },
        },

        page4: {
          headerText: "Diagram gambar manakah yang memiliki lebih sedikit pepaya?",
          footerInstruction: "Ketuk diagram gambar yang benar",
          instructionAfterQuiz: "Tekan » untuk lanjut.",
          typesOfFruits: "Diagram Jenis Buah",
          questionTable1: {
            headers: [],
            rows: [
              ["Pisang", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Mangga", ["assets/star.png", "assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Jeruk", ["assets/star.png"]],
              ["Pepaya", ["assets/star.png", "assets/star.png", "assets/star.png"]],
            ],
          },
          questionTable2: {
            headers: [],
            rows: [
              ["Pisang", ["assets/star.png", "assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Mangga", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Jeruk", ["assets/star.png"]],
              ["Pepaya", ["assets/star.png", "assets/star.png"]],
            ],
          },
          key: "Kunci:  Setiap",
          oneFruit: " = 1 buah",
          feedback: {
            correct:
              "Hore! Benar. Diagram gambar ini menunjukkan lebih sedikit pepaya.",
            incorrect:
              "Aduh! Bandingkan jumlah bintang untuk pepaya di kedua diagram.",
          },
        },

        page5: {
          headerText:
            "Diagram gambar manakah yang menunjukkan lebih banyak mangga daripada pisang?",
          footerInstruction: "Ketuk diagram gambar yang benar",
          instructionAfterQuiz: "Tekan » untuk lanjut.",
          typesOfFruits: "Diagram Jenis Buah",
          questionTable1: {
            headers: [],
            rows: [
              ["Pisang", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Mangga", ["assets/star.png", "assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Jeruk", ["assets/star.png"]],
              ["Pepaya", ["assets/star.png", "assets/star.png", "assets/star.png"]],
            ],
          },
          questionTable2: {
            headers: [],
            rows: [
              ["Pisang", ["assets/star.png", "assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Mangga", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Jeruk", ["assets/star.png"]],
              ["Pepaya", ["assets/star.png", "assets/star.png", "assets/star.png"]],
            ],
          },
          key: "Kunci:  Setiap",
          oneFruit: " = 1 buah",
          feedback: {
            correct: "Hore! Kamu memilih diagram gambar yang benar.",
            incorrect:
              "Ups! Diagram ini menunjukkan mangga tidak lebih banyak daripada pisang. Hitung lagi dan coba lagi.",
          },
        },

        page6: {
          headerText:
            "Diagram gambar manakah yang memiliki lebih banyak buah secara total?",
          footerInstruction: "Ketuk diagram gambar yang benar",
          instructionAfterQuiz: "Tekan » untuk lanjut.",
          typesOfFruits: "Diagram Jenis Buah",
          questionTable1: {
            headers: [],
            rows: [
              ["Pisang", ["assets/star.png", "assets/star.png"]],
              ["Mangga", ["assets/star.png", "assets/star.png", "assets/star.png", ]],
              ["Jeruk", ["assets/star.png"]],
              ["Pepaya", ["assets/star.png", "assets/star.png", "assets/star.png"]],
            ],
          },
          questionTable2: {
            headers: [],
            rows: [
              ["Pisang", ["assets/star.png", "assets/star.png", "assets/star.png"]],
              ["Mangga", ["assets/star.png", "assets/star.png", ]],
              ["Jeruk", ["assets/star.png"]],
              ["Pepaya", ["assets/star.png", "assets/star.png", ]],
            ],
          },
          key: "Kunci:  Setiap",
          oneFruit: " = 1 buah",
          feedback: {
            correct:
              "Hore! Kamu memilih diagram dengan jumlah bintang (buah) lebih banyak.",
            incorrect:
              "Aduh! Diagram itu hanya menunjukkan 8 bintang. Hitung semua bintang di diagram lainnya.",
          },
        },

        page7: {
          title: "Aktivitas selesai!",
          introText:
            "Bagus!<br/>Kamu sudah hebat membaca diagram gambar.",
        },

        page8: {
          headerText: "Apa urutan langkah yang benar untuk menjumlahkan bilangan campuran?",
          footerInstruction: "Susun ulang tombol ke urutan langkah yang benar",
          highlights: [
            {
              text: "Rumah Komang berada di antara rumah Yohana dan rumah Lukas.",
              highlightColor: highlightColor1,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [{ text: "Rumah Komang berada di tengah.", size: "20gc", color: highlightColor1 }],
            values: [],
            toFind: []
          },
          conceptSummary: {
            given: [],
            toFind: [],
            facts: [
              { text: "Komodo dewasa dapat berjalan 11,2 km per hari.", size: "20gc", color: highlightColor1 },
              { text: "Komodo bayi dapat berjalan 2000 m per hari.", size: "20gc", color: highlightColor2 }
            ],
            values: [
              { text: "Rasio membandingkan besaran dengan satuan yang sama.", size: "20gc", color: highlightColor3 },
              { text: "1 km = 1000 m", size: "20gc", color: highlightColor4 },
              { text: "11.2 km = 11200 m", size: "20gc", color: highlightColor4 }
            ]
          },
          quizPanel: {
            questionText: "Berapa rasio jarak yang ditempuh komodo dewasa terhadap komodo bayi?",
            options: [
              { text: "$\\frac{1120}{2000}$", feedback: "Belum tepat. Samakan satuan dulu sebelum membuat rasio.", iscorrect: false },
              { text: "$\\frac{11.2}{2000}$", feedback: "Belum tepat. Samakan satuan dulu sebelum membuat rasio.", iscorrect: false },
              { text: "$\\frac{11200}{2000}$", feedback: "Benar! Mari sederhanakan rasionya.", iscorrect: true },
              { text: "$\\frac{11200}{2}$", feedback: "Belum tepat. Samakan satuan dulu sebelum membuat rasio.", iscorrect: false }
            ]
          }
        },

        page9: {
          headerText: "Apa rumus yang benar untuk mengubah bilangan campuran menjadi pecahan biasa?",
          footerInstruction: "Seret suku yang benar untuk membentuk pecahan biasa",
          highlights: [],
          instructionText:
            "Mari cari jarak dari rumah Yohana ke rumah Lukas dengan menjumlahkan bilangan campuran dan pecahan.",
          quizPanel: {
            questionText: "Hubungan mana yang benar untuk mengubah bilangan campuran menjadi pecahan biasa?",
            options: [
              {
                text: '$\\frac{(<span style="background: linear-gradient(135deg, #FF9999 0%, #FF7F7F 100%); color: white; padding: 4px 8px; border-radius: 6px; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.2); font-weight: bold;">Pembilang</span> \\times <span style="background: linear-gradient(135deg, #4A7C2A 0%, #3D6B1F 100%); color: white; padding: 4px 8px; border-radius: 6px; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.2); font-weight: bold;">Bagian Utuh</span>) + <span style="background: linear-gradient(135deg, #D2B48C 0%, #C9A961 100%); color: white; padding: 4px 8px; border-radius: 6px; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.2); font-weight: bold;">Penyebut</span>}{<span style="background: linear-gradient(135deg, #D2B48C 0%, #C9A961 100%); color: white; padding: 4px 8px; border-radius: 6px; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.2); font-weight: bold;">Penyebut</span>}$',
                feedback:
                  "Salah. Di sini pembilang dikalikan dengan bagian utuh, padahal yang benar: penyebut dikalikan dengan bagian utuh dulu, lalu ditambah pembilang.",
                iscorrect: false
              },
              {
                text: '$\\frac{(<span style="background: linear-gradient(135deg, #D2B48C 0%, #C9A961 100%); color: white; padding: 4px 8px; border-radius: 6px; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.2); font-weight: bold;">Penyebut</span> \\times <span style="background: linear-gradient(135deg, #4A7C2A 0%, #3D6B1F 100%); color: white; padding: 4px 8px; border-radius: 6px; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.2); font-weight: bold;">Bagian Utuh</span>) + <span style="background: linear-gradient(135deg, #FF9999 0%, #FF7F7F 100%); color: white; padding: 4px 8px; border-radius: 6px; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.2); font-weight: bold;">Pembilang</span>}{<span style="background: linear-gradient(135deg, #FF9999 0%, #FF7F7F 100%); color: white; padding: 4px 8px; border-radius: 6px; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.2); font-weight: bold;">Pembilang</span>}$',
                feedback:
                  "Salah. Perhitungan pembilangnya benar, tetapi penyebutnya harus tetap penyebut asli dari bilangan campuran, bukan pembilang.",
                iscorrect: false
              },
              {
                text: '$\\frac{(<span style="background: linear-gradient(135deg, #D2B48C 0%, #C9A961 100%); color: white; padding: 4px 8px; border-radius: 6px; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.2); font-weight: bold;">Penyebut</span> \\times <span style="background: linear-gradient(135deg, #4A7C2A 0%, #3D6B1F 100%); color: white; padding: 4px 8px; border-radius: 6px; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.2); font-weight: bold;">Bagian Utuh</span>) + <span style="background: linear-gradient(135deg, #FF9999 0%, #FF7F7F 100%); color: white; padding: 4px 8px; border-radius: 6px; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.2); font-weight: bold;">Pembilang</span>}{<span style="background: linear-gradient(135deg, #D2B48C 0%, #C9A961 100%); color: white; padding: 4px 8px; border-radius: 6px; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.2); font-weight: bold;">Penyebut</span>}$',
                feedback:
                  "Benar! Untuk mengubah bilangan campuran menjadi pecahan biasa, kalikan penyebut dengan bagian utuh, lalu tambahkan pembilang untuk mendapatkan pembilang baru, dan pertahankan penyebut asli.",
                iscorrect: true
              }
            ]
          }
        },

        page10: {
          highlights: [],
          instructionText:
            "Mari cari jarak dari rumah Yohana ke rumah Lukas dengan menjumlahkan bilangan campuran dan pecahan.",
          quizPanel: {
            questionText: "Ketuk opsi yang benar untuk menemukan KPK dari bilangan yang diberikan.",
            options: [
              {
                text: "Pengurangan bilangan prima yang membantu membagi bilangan hingga menjadi 1.",
                feedback:
                  "Salah. Pengurangan tidak digunakan untuk mencari KPK. KPK didapat dari perkalian faktor prima, bukan pengurangan.",
                iscorrect: false
              },
              {
                text: "Penjumlahan bilangan prima yang membantu membagi bilangan hingga menjadi 1.",
                feedback:
                  "Salah. Penjumlahan tidak digunakan untuk mencari KPK. KPK memerlukan perkalian faktor prima, bukan penjumlahan.",
                iscorrect: false
              },
              {
                text: "Hasil kali bilangan prima yang membantu membagi bilangan hingga menjadi 1.",
                feedback:
                  "Benar! KPK ditemukan dengan mengambil hasil kali (perkalian) semua faktor prima dengan pangkat tertinggi yang muncul pada bilangan-bilangan tersebut.",
                iscorrect: true
              },
              {
                text: "Pembagian bilangan prima yang membantu membagi bilangan hingga menjadi 1.",
                feedback:
                  "Salah. Pembagian dipakai untuk menemukan faktor prima, tetapi KPK adalah hasil kali faktor-faktor prima itu, bukan pembagiannya.",
                iscorrect: false
              }
            ]
          }
        },

        page11: {
          highlights: [],
          instructionText:
            "Mari cari jarak dari rumah Yohana ke rumah Lukas dengan menjumlahkan bilangan campuran dan pecahan.",
          quizPanel: {
            questionText: "Ketuk opsi yang benar untuk menemukan KPK dari bilangan yang diberikan.",
            options: [
              {
                text: "Pengurangan bilangan prima yang membantu membagi bilangan hingga menjadi 1.",
                feedback:
                  "Salah. Pengurangan tidak digunakan untuk mencari KPK. KPK didapat dari perkalian faktor prima, bukan pengurangan.",
                iscorrect: false
              },
              {
                text: "Penjumlahan bilangan prima yang membantu membagi bilangan hingga menjadi 1.",
                feedback:
                  "Salah. Penjumlahan tidak digunakan untuk mencari KPK. KPK memerlukan perkalian faktor prima, bukan penjumlahan.",
                iscorrect: false
              },
              {
                text: "Hasil kali bilangan prima yang membantu membagi bilangan hingga menjadi 1.",
                feedback:
                  "Benar! KPK ditemukan dengan mengambil hasil kali (perkalian) semua faktor prima dengan pangkat tertinggi yang muncul pada bilangan-bilangan tersebut.",
                iscorrect: true
              },
              {
                text: "Pembagian bilangan prima yang membantu membagi bilangan hingga menjadi 1.",
                feedback:
                  "Salah. Pembagian dipakai untuk menemukan faktor prima, tetapi KPK adalah hasil kali faktor-faktor prima itu, bukan pembagiannya.",
                iscorrect: false
              }
            ]
          }
        },

        page12: {
          footerInstruction: "Susun ulang tombol ke urutan langkah yang benar",
          highlights: [],
          instructionText:
            "Mari cari jarak dari rumah Yohana ke rumah Lukas dengan menjumlahkan bilangan campuran dan pecahan.",
          quizPanel: {
            questionText: "Ketuk opsi yang benar untuk mengubah pecahan tidak sejenis menjadi pecahan sejenis.",
            options: [
              {
                text: "Cari pecahan senilai dengan KPK sebagai penyebut.",
                feedback:
                  "Benar! Untuk mengubah pecahan tidak sejenis menjadi sejenis, kita mencari pecahan senilai dengan menggunakan KPK (Kelipatan Persekutuan Terkecil) dari penyebut sebagai penyebut bersama.",
                iscorrect: true
              },
              {
                text: "Cari pecahan senilai dengan FPB sebagai penyebut.",
                feedback:
                  "Salah. FPB digunakan untuk menyederhanakan pecahan, bukan untuk menyamakan penyebut. Kita menggunakan KPK sebagai penyebut bersama.",
                iscorrect: false
              },
              {
                text: "Cari pecahan senilai dengan KPK sebagai pembilang.",
                feedback:
                  "Salah. KPK digunakan sebagai penyebut (bukan pembilang) untuk menyamakan penyebut. Pembilang disesuaikan agar pecahannya senilai.",
                iscorrect: false
              },
              {
                text: "Cari pecahan senilai dengan FPB sebagai pembilang.",
                feedback:
                  "Salah. FPB tidak digunakan untuk menyamakan penyebut. Kita menggunakan KPK sebagai penyebut bersama, dan pembilang disesuaikan.",
                iscorrect: false
              }
            ]
          }
        },

        page13: {
          highlights: [],
          instructionText:
            "Mari cari jarak dari rumah Yohana ke rumah Lukas dengan menjumlahkan bilangan campuran dan pecahan.",
          quizPanel: {
            questionText: "Ketuk opsi yang benar untuk menjumlahkan pecahan sejenis.",
            options: [
              {
                text: "Jumlahkan pembilang dan penyebut.",
                feedback:
                  "Salah. Saat menjumlahkan pecahan sejenis, kita hanya menjumlahkan pembilang. Penyebut tetap sama.",
                iscorrect: false
              },
              {
                text: "Jumlahkan pembilang dan pertahankan penyebut.",
                feedback:
                  "Benar! Saat menjumlahkan pecahan sejenis, kita menjumlahkan pembilang dan penyebut tetap sama.",
                iscorrect: true
              },
              {
                text: "Jumlahkan penyebut dan pertahankan pembilang.",
                feedback:
                  "Salah. Yang dijumlahkan adalah pembilang (bukan penyebut) dan penyebut tetap sama.",
                iscorrect: false
              },
              {
                text: "Tidak ada yang benar.",
                feedback:
                  "Salah. Cara yang benar adalah menjumlahkan pembilang dan mempertahankan penyebut saat menjumlahkan pecahan sejenis.",
                iscorrect: false
              }
            ]
          }
        },

        page14: {
          headerText: "Apa rumus yang benar untuk mengubah pecahan biasa menjadi bilangan campuran?",
          footerInstruction: "Seret suku yang benar untuk membentuk pecahan campuran",
          highlights: [],
          instructionText:
            "Mari cari jarak dari rumah Yohana ke rumah Lukas dengan menjumlahkan bilangan campuran dan pecahan.",
          quizPanel: {
            questionText: "Ketuk hubungan yang benar untuk mengubah pecahan biasa menjadi bilangan campuran.",
            options: [
              {
                text:
                  'Bilangan Campuran = <span style="background-color: #20B2AA; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Hasil Bagi</span> $\\frac{<span style="background-color: #9370DB; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Sisa</span>}{<span style="background-color: #FF69B4; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Penyebut</span>}$',
                feedback:
                  "Benar! Untuk mengubah pecahan biasa menjadi bilangan campuran, bagi pembilang dengan penyebut. Hasil bagi menjadi bagian utuh, sisa menjadi pembilang pecahan, dan penyebut tetap sama.",
                iscorrect: true
              },
              {
                text:
                  'Bilangan Campuran = <span style="background-color: #20B2AA; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Hasil Bagi</span> $\\frac{<span style="background-color: #FF69B4; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Penyebut</span>}{<span style="background-color: #9370DB; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Sisa</span>}$',
                feedback:
                  "Salah. Hasil bagi sebagai bagian utuh sudah benar, tetapi sisa harus menjadi pembilang dan penyebut harus tetap sama. Kamu menukarnya.",
                iscorrect: false
              },
              {
                text:
                  'Bilangan Campuran = <span style="background-color: #FF69B4; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Penyebut</span> $\\frac{<span style="background-color: #20B2AA; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Hasil Bagi</span>}{<span style="background-color: #9370DB; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Sisa</span>}$',
                feedback:
                  "Salah. Hasil bagi (hasil pembagian) harus menjadi bagian utuh, bukan penyebut. Penyebut tetap sama, dan sisa menjadi pembilang.",
                iscorrect: false
              }
            ]
          }
        },

        page15: {
          highlights: [
            { text: "sebuah tiang antena TV di atap", highlightColor: "#FFD700", fontColor: "#000000", fontSize: "24gc" }
          ]
        },

        page16: {
          headerText: "Kerjakan langkahnya di buku catatan dan sebutkan jawabannya.",
          highlights: [],
          instructionText:
            "Mari cari jarak dari rumah Yohana ke rumah Lukas dengan menjumlahkan bilangan campuran dan pecahan.",
          quizPanel: {
            questionText: "Ketuk hubungan yang benar untuk mengubah bilangan campuran menjadi pecahan biasa.",
            options: [
              {
                text:
                  'Pecahan Biasa = $\\frac{(<span style="background-color: #20B2AA; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Pembilang</span> \\times <span style="background-color: #9370DB; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Bagian Utuh</span>) + <span style="background-color: #FF69B4; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Penyebut</span>}{<span style="background-color: #FF69B4; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Penyebut</span>}$',
                feedback:
                  "Salah. Di sini pembilang dikalikan dengan bagian utuh, padahal yang benar: penyebut dikalikan dengan bagian utuh dulu, lalu ditambah pembilang.",
                iscorrect: false
              },
              {
                text:
                  'Pecahan Biasa = $\\frac{(<span style="background-color: #FF69B4; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Penyebut</span> \\times <span style="background-color: #9370DB; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Bagian Utuh</span>) + <span style="background-color: #20B2AA; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Pembilang</span>}{<span style="background-color: #20B2AA; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Pembilang</span>}$',
                feedback:
                  "Salah. Perhitungan pembilangnya benar, tetapi penyebutnya harus tetap penyebut asli, bukan pembilang.",
                iscorrect: false
              },
              {
                text:
                  'Pecahan Biasa = $\\frac{(<span style="background-color: #FF69B4; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Penyebut</span> \\times <span style="background-color: #9370DB; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Bagian Utuh</span>) + <span style="background-color: #20B2AA; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Pembilang</span>}{<span style="background-color: #FF69B4; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Penyebut</span>}$',
                feedback:
                  "Benar! Kalikan penyebut dengan bagian utuh, tambahkan pembilang untuk mendapatkan pembilang baru, dan pertahankan penyebut asli.",
                iscorrect: true
              }
            ]
          }
        },

        page17: {
          headerText: "Kerjakan langkahnya di buku catatan dan sebutkan jawabannya.",
          highlights: [],
          instructionText:
            "Mari cari jarak dari rumah Yohana ke rumah Lukas dengan menjumlahkan bilangan campuran dan pecahan.",
          quizPanel: {
            questionText: "Ketuk hubungan yang benar untuk mengubah bilangan campuran menjadi pecahan biasa.",
            options: [
              {
                text:
                  'Pecahan Biasa = $\\frac{(<span style="background-color: #20B2AA; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Pembilang</span> \\times <span style="background-color: #9370DB; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Bagian Utuh</span>) + <span style="background-color: #FF69B4; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Penyebut</span>}{<span style="background-color: #FF69B4; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Penyebut</span>}$',
                feedback:
                  "Salah. Yang benar: penyebut dikalikan dengan bagian utuh dulu, lalu ditambah pembilang.",
                iscorrect: false
              },
              {
                text:
                  'Pecahan Biasa = $\\frac{(<span style="background-color: #FF69B4; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Penyebut</span> \\times <span style="background-color: #9370DB; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Bagian Utuh</span>) + <span style="background-color: #20B2AA; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Pembilang</span>}{<span style="background-color: #20B2AA; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Pembilang</span>}$',
                feedback:
                  "Salah. Penyebutnya harus tetap penyebut asli, bukan pembilang.",
                iscorrect: false
              },
              {
                text:
                  'Pecahan Biasa = $\\frac{(<span style="background-color: #FF69B4; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Penyebut</span> \\times <span style="background-color: #9370DB; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Bagian Utuh</span>) + <span style="background-color: #20B2AA; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Pembilang</span>}{<span style="background-color: #FF69B4; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Penyebut</span>}$',
                feedback:
                  "Benar! Kalikan penyebut dengan bagian utuh, tambahkan pembilang, dan pertahankan penyebut asli.",
                iscorrect: true
              }
            ]
          }
        },

        page18: {
          headerText: "Kerjakan langkahnya di buku catatan dan sebutkan jawabannya.",
          highlights: [],
          instructionText:
            "Mari cari jarak dari rumah Yohana ke rumah Lukas dengan menjumlahkan bilangan campuran dan pecahan.",
          instructionRevealSum: "Tekan '?' untuk menampilkan hasil penjumlahan",
          instructionAfterQuiz: "Tekan » untuk Langkah 3",
          quizPanel: {
            questionText: "Ketuk hubungan yang benar untuk mengubah bilangan campuran menjadi pecahan biasa.",
            options: [
              {
                text:
                  'Pecahan Biasa = $\\frac{(<span style="background-color: #20B2AA; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Pembilang</span> \\times <span style="background-color: #9370DB; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Bagian Utuh</span>) + <span style="background-color: #FF69B4; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Penyebut</span>}{<span style="background-color: #FF69B4; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Penyebut</span>}$',
                feedback:
                  "Salah. Yang benar: penyebut dikalikan dengan bagian utuh dulu, lalu ditambah pembilang.",
                iscorrect: false
              },
              {
                text:
                  'Pecahan Biasa = $\\frac{(<span style="background-color: #FF69B4; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Penyebut</span> \\times <span style="background-color: #9370DB; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Bagian Utuh</span>) + <span style="background-color: #20B2AA; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Pembilang</span>}{<span style="background-color: #20B2AA; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Pembilang</span>}$',
                feedback:
                  "Salah. Penyebutnya harus tetap penyebut asli, bukan pembilang.",
                iscorrect: false
              },
              {
                text:
                  'Pecahan Biasa = $\\frac{(<span style="background-color: #FF69B4; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Penyebut</span> \\times <span style="background-color: #9370DB; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Bagian Utuh</span>) + <span style="background-color: #20B2AA; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Pembilang</span>}{<span style="background-color: #FF69B4; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block;">Penyebut</span>}$',
                feedback:
                  "Benar! Kalikan penyebut dengan bagian utuh, tambahkan pembilang, dan pertahankan penyebut asli.",
                iscorrect: true
              }
            ]
          }
        },

        page19: {
          headerText: "Kerjakan langkahnya di buku catatan dan sebutkan jawabannya.",
          instructionRevealConversion: "Tekan '?' untuk menampilkan konversi hasil",
          instructionAfterQuiz: "Tekan » untuk merangkum",
          headerAfterQuiz: "Kamu sudah menemukan jarak dari rumah Komang ke rumah Lukas!"
        },

        page20: {
          headerText: "Identifikasi adegan – Buat Persamaan – Selesaikan nilai yang belum diketahui",
          instructionText:
            "Mari cari jarak dari rumah Yohana ke rumah Lukas dengan menjumlahkan bilangan campuran dan pecahan."
        },

        page21: {
          headerText: "Buat kalimat matematika untuk adegan yang diberikan",
          footerInstruction: "Seret tombol yang benar ke tempat yang benar dalam kalimat"
        },

        page22: {
          headerText: "Buat kalimat matematika untuk adegan yang diberikan",
          footerInstruction: "Tekan » untuk mengidentifikasi semua langkah yang diperlukan untuk penjumlahan"
        },

        page23: {
          footerInstruction: "Tekan » untuk menjumlahkan bilangan campuran menggunakan langkah-langkah ini"
        },

        page24: {
          instructionRevealConversions: "Tekan '?' untuk menampilkan jawaban tiap konversi",
          instructionAfterQuiz: "Tekan » untuk Langkah 2.c"
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
