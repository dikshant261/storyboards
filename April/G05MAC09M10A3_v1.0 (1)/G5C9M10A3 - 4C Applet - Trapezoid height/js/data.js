// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlightColor1 = "#FFD700";
const highlightColor2 = "#70ACC7";
const highlightColor3 = "#F28283";
const highlightColor4 = "#00FF7F";
const highlightColor5 = '#8A2BE2';

const questionTextSize = '44gc';
const highlightTextSize = "28gc";

const AppData = {
  // Current language setting
  currentLanguage: "en",

  // Text content by language
  translations: {
    en: {
      appInfo: {
        title: "The area of a trapezoid"
      },
      messages: {
        pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?",
        nextButtonPage2: "Dispatched page change event to page 2",
        previousButtonPage1: "Dispatched page change event to page 1"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        check: "CHECK",
        showHint: "show 💡"
      },

      common: {
        side: {
          a: '20 cm',
          b: '40 cm',
          h: 'h = ?',
          findH: 'h = 10 cm',
          equalTo: '=',
          cm: 'cm'
        },
        formula: {
          areaOfTrapezoid: 'Area of a trapezoid',
          sumOfParellelSide: "(sum of parallel sides)",
          height: 'Height'
        },
        equationButtonText: "Total wingko parts",
        questionText: "The area of a trapezoid is 300 cm². The dimensions of the sides are known - the parallels are 20 cm and 40 cm respectively. What is the height of the trapezoid?",
        questionIcon: "Q",
        labels: {
          dropHere: "Drop here"
        },
        informationAnalysis: {
          header: "INFORMATION ANALYSIS",
          facts: "Facts",
          values: "Value",
          toFind: "To Find",
          findings: 'Findings'
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
          toFindTitle: "To Find",
          findings: 'Findings'
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
          instructionText:
            "Let's read the question carefully. We will identify what is given and what we need to find.",
          headerText: "Read the question and identify 'given' and 'to find'",
          footerInstruction: "Tap » to identify 'given' information"
        },
        page2: {
          headerText: "Read the question and identify 'given' and 'to find'",
          footerInstruction: "Tap » to identify 'given' information",
          highlights: [
            {
              text: "trapezoid",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "The given shape is a trapezoid.",
                size: highlightTextSize,
                color: highlightColor1
              }
            ],
            values: [
            ],
            toFind: [
            ],
             findingsArray: [
            ],
          }
        },
        page3: {
          headerText: "Read the question and identify 'given' and 'to find'",
          footerInstruction: "Tap » to continue.",
          areaText: 'Area = 300 cm²',
          highlights: [
            {
              text: "area of a trapezoid is 300 cm²",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Area of a trapezoid is 300 cm²",
                size: highlightTextSize,
                color: highlightColor1
              }
            ],
            values: [
            ],
            toFind: [
            ],
             findingsArray: [],
          },
        },
        page4: {
          headerText: "Read the question and identify 'given' and 'to find'",
          footerInstruction: "Tap » to identify 'To find' information.",
          highlights: [

            {
              text: "parallels are 20 cm and 40 cm",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Area of a trapezoid is 300 cm²",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Base 1 (a) = 40 cm <br/>Base 2 (b) = 20 cm",
                size: highlightTextSize,
                color: highlightColor1
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
          footerInstruction: "Tap » to continue.",
          highlights: [

            {
              text: "height of the trapezoid",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Area of a trapezoid is 300 cm²",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Base 1 (a) = 40 cm <br/>Base 2 (b) = 20 cm",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: [
            ],
            toFind: [
              {
                text: "Height of the trapezoid",
                size: highlightTextSize,
                color: highlightColor1
              }
            ],
            
             findingsArray: [],
          },


        },

        page6: {
          footerInstruction: "Tap » to continue.",

          informationGathered: '<span style="color: #20B2AA;">&#10003;</span>\u00A0 Information gathered from the question.',
          nextStep: "Next - Let's solve the problem step by step."
        },
        page7: {
          headerText: "Let’s identify the trapezoid area formula.",
          footerInstruction: "Select the correct option",
          instructionAfterQuiz: "Tap » to continue.",
          quizPanel: {
            questionText: 'Which formula is used to find the area of a trapezoid?',
            options: [
              {
                text: "$\\frac{1}{2}$ × base × height",
                iscorrect: false,
                feedback: "Check Again!",
              },
              {
                text: "(sum of parallel sides) × height",
                iscorrect: false,
                feedback: "Check Again!",
              },
              {
                text: "$\\frac{1}{2}$ × (sum of parallel sides) × height",
                iscorrect: true,
                feedback: "That's Correct!",
              },
              {
                text: " base × height",
                iscorrect: false,
                feedback: "Check Again!",

              }
            ],
          }
        },
        page8: {
          headerText: "Let’s substitute the values in the formula.",
          footerInstruction: "Tap the highlighted text.",
          instructionAfterQuiz: "Tap » to continue.",
          informationAnalysis: {
            facts: [
              {
                text: "Area of a trapezoid is 300 cm²",
                size: "22gc",
                color: highlightColor2
              },
              {
                text: "Base 1 (a) = 40 cm <br/>Base 2 (b) = 20 cm",
                size: "22gc",
                color: highlightColor2
              }
            ],

            toFind: [
              {
                text: "Height of the trapezoid",
                size: "22gc",
                color: highlightColor2
              }
            ],
            findingsArray: [
              {
              text: "Area of trapezoid",
              size: "22gc",
              color: highlightColor2
            },
            {
              text: "= $\\frac{1}{2}$ × (sum of parallel sides) × height",
              size: "20gc",
              color: highlightColor2
            }
          ],
            values: [
            ],
          },
        },
        page9: {
          headerText: "Let’s substitute the values in the formula.",
          footerInstruction: "Tap the highlighted text.",
          instructionAfterQuiz: "Tap » to continue.",
          informationAnalysis: {
            facts: [
              {
                text: "Area of a trapezoid is 300 cm²",
                size: "22gc",
                color: highlightColor2
              },
              {
                text: "Base 1 (a) = 40 cm <br/>Base 2 (b) = 20 cm",
                size: "22gc",
                color: highlightColor2
              }
            ],

            toFind: [
              {
                text: "Height of the trapezoid",
                size: "22gc",
                color: highlightColor2
              }
            ],
            findingsArray: [
              {
              text: "Area of trapezoid",
              size: "22gc",
              color: highlightColor2
            },
            {
              text: "= $\\frac{1}{2}$ × (sum of parallel sides) × height",
              size: "20gc",
              color: highlightColor2
            }
          ],
            values: [
            ],
          },
        },
        page10: {
          headerText: "Let’s substitute the values in the formula.",
          footerInstruction: "Tap the highlighted text.",
          instructionAfterQuiz: "Tap » to continue.",
          informationAnalysis: {
            facts: [
              {
                text: "Area of a trapezoid is 300 cm²",
                size: "22gc",
                color: highlightColor2
              },
              {
                text: "Base 1 (a) = 40 cm <br/>Base 2 (b) = 20 cm",
                size: "22gc",
                color: highlightColor2
              }
            ],

            toFind: [
              {
                text: "Height of the trapezoid",
                size: "22gc",
                color: highlightColor2
              }
            ],
            findingsArray: [
              {
              text: "Area of trapezoid",
              size: "22gc",
              color: highlightColor2
            },
            {
              text: "= $\\frac{1}{2}$ × (sum of parallel sides) × height",
              size: "20gc",
              color: highlightColor2
            }
          ],
            values: [
            ],
          },
        },
        page11: {
          headerText: "Let’s calculate the height of the trapezoid.",
          footerInstruction: "Use the numpad to fill the answer and click Check",
          instructionAfterQuiz: "Tap » to summarize",
          informationAnalysis: {
            facts: [
              {
                text: "Area of a trapezoid is 300 cm²",
                size: "22gc",
                color: highlightColor2
              },
              {
                text: "Base 1 (a) = 40 cm <br/>Base 2 (b) = 20 cm",
                size: "22gc",
                color: highlightColor2
              }
            ],

            toFind: [
              {
                text: "Height of the trapezoid",
                size: "22gc",
                color: highlightColor2
              }
            ],
            findingsArray: [
              {
              text: "Area of trapezoid",
              size: "22gc",
              color: highlightColor2
            },
            {
              text: "= $\\frac{1}{2}$ × (sum of parallel sides) × height",
              size: "20gc",
              color: highlightColor2
            }
          ],
            values: [
            ],
          },
          numpad: {
            tile1: {
              correct: 'Well done! Correct',
              inCorrect: 'Oops! Try Again'
            }
          },
          feedback: {
            emptyFeedback: 'Please enter a number before pressing CHECK.'
          }
        },
        page12: {
          headerText: "Let’s substitute the values in the formula.",
          footerInstruction: "Tap 'Start Over' to re-do this activity.",
          instructionAfterQuiz: "",
          summary: 'Hence, height of the given trapezoid = 10 cm.',
          informationAnalysis: {
            facts: [
              {
                text: "Area of a trapezoid is 300 cm²",
                size: "22gc",
                color: highlightColor2
              },
              {
                text: "Base 1 (a) = 40 cm <br/>Base 2 (b) = 20 cm",
                size: "22gc",
                color: highlightColor2
              }
            ],

            toFind: [
              {
                text: "Height of the trapezoid",
                size: "22gc",
                color: highlightColor2
              }
            ],
            findingsArray: [
              {
              text: "Area of trapezoid",
              size: "22gc",
              color: highlightColor2
            },
            {
              text: "= $\\frac{1}{2}$ × (sum of parallel sides) × height",
              size: "20gc",
              color: highlightColor2
            }
          ],
            values: [
            ],
          },
          numpad: {
            tile1: {
              correct: 'Well done! Correct',
              inCorrect: 'Oops! Try Again'
            }
          }
        },

      },
    },
    id: {
      appInfo: {
        title: "Luas sebuah trapesium"
      },

      messages: {
        pageStatesCleared: "Status halaman sudah dihapus. Muat ulang halaman untuk mulai dari awal?",
        nextButtonPage2: "Peristiwa pindah halaman telah dikirim ke halaman 2",
        previousButtonPage1: "Peristiwa pindah halaman telah dikirim ke halaman 1"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Lagi",
        check: "PERIKSA",
        showHint: "tampilkan 💡"
      },

      common: {
        side: {
          a: "20 cm",
          b: "40 cm",
          h: "h = ?",
          findH: "h = 10 cm",
          equalTo: "=",
          cm: "cm"
        },
        formula: {
          areaOfTrapezoid: "Luas trapesium",
          sumOfParellelSide: "(jumlah sisi sejajar)",
          height: "Tinggi"
        },
        equationButtonText: "Jumlah bagian wingko",
        questionText:
          "Luas sebuah trapesium adalah 300 cm². Dimensi sisinya diketahui — sisi sejajarnya masing-masing 20 cm dan 40 cm. Berapakah tinggi trapesium tersebut?",
        questionIcon: "Q",
        labels: {
          dropHere: "Taruh di sini"
        },
        informationAnalysis: {
          header: "ANALISIS INFORMASI",
          facts: "Fakta",
          values: "Nilai",
          toFind: "Yang Dicari",
          findings: "Temuan"
        },
        conceptSummary: {
          header: "RINGKASAN KONSEP",
          given: "Diketahui",
          toFind: "Yang Dicari",
          keyConcepts: "Konsep Kunci",
          importantFormulae: "Perhitungan"
        },
        amountBeniGiveToGrandMother: "Jumlah yang Beni berikan\nkepada kakeknya.",
        amountOfBika: "Jumlah Bika Ambon\nyang tinggal bersama Beni"
      },

      components: {
        informationAnalysis: {
          headerText: "ANALISIS INFORMASI",
          factsTitle: "Fakta",
          valueTitle: "Nilai",
          toFindTitle: "Yang Dicari",
          findings: "Temuan"
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
          instructionText:
            "Mari baca soal dengan teliti. Kita akan mengidentifikasi apa yang diketahui dan apa yang perlu dicari.",
          headerText: "Baca soal dan identifikasi 'diketahui' dan 'yang dicari'",
          footerInstruction: "Tekan » untuk mengidentifikasi informasi 'diketahui'"
        },

        page2: {
          headerText: "Baca soal dan identifikasi 'diketahui' dan 'yang dicari'",
          footerInstruction: "Tekan » untuk mengidentifikasi informasi 'diketahui'",
          highlights: [
            {
              text: "trapesium",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Bentuk yang diberikan adalah trapesium.",
                size: highlightTextSize,
                color: highlightColor1
              }
            ],
            values: [],
            toFind: [],
            findingsArray: []
          }
        },

        page3: {
          headerText: "Baca soal dan identifikasi 'diketahui' dan 'yang dicari'",
          footerInstruction: "Tekan » untuk melanjutkan.",
          areaText: "Luas = 300 cm²",
          highlights: [
            {
              text: "Luas sebuah trapesium adalah 300 cm²",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Luas sebuah trapesium adalah 300 cm²",
                size: highlightTextSize,
                color: highlightColor1
              }
            ],
            values: [],
            toFind: [],
            findingsArray: []
          }
        },

        page4: {
          headerText: "Baca soal dan identifikasi 'diketahui' dan 'yang dicari'",
          footerInstruction: "Tekan » untuk mengidentifikasi informasi 'yang dicari'.",
          highlights: [
            {
              text: "sisi sejajar berukuran 20 cm dan 40 cm",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Luas trapesium adalah 300 cm²",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Alas 1 (a) = 40 cm <br/>Alas 2 (b) = 20 cm",
                size: highlightTextSize,
                color: highlightColor1
              }
            ],
            values: [],
            toFind: []
          }
        },

        // Newly added/updated texts for later pages
        page18: {
          instructionRevealSum: "Tekan '?' untuk menampilkan hasil penjumlahan",
          instructionAfterQuiz: "Tekan » untuk Langkah 3"
        },

        page19: {
          instructionRevealConversion: "Tekan '?' untuk menampilkan konversi hasil",
          instructionAfterQuiz: "Tekan » untuk merangkum",
          headerAfterQuiz: "Kamu sudah menemukan jarak dari rumah Komang ke rumah Lukas!"
        },

        page24: {
          instructionRevealConversions: "Tekan '?' untuk menampilkan jawaban tiap konversi",
          instructionAfterQuiz: "Tekan » untuk Langkah 2.c"
        },

        page5: {
          headerText: "Baca soal dan identifikasi 'diketahui' dan 'yang dicari'",
          footerInstruction: "Tekan » untuk melanjutkan.",
          highlights: [
            {
              text: "tinggi trapesium",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Luas trapesium adalah 300 cm²",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Alas 1 (a) = 40 cm <br/>Alas 2 (b) = 20 cm",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: [],
            toFind: [
              {
                text: "Tinggi trapesium",
                size: highlightTextSize,
                color: highlightColor1
              }
            ],
            findingsArray: []
          }
        },

        page6: {
          footerInstruction: "Tekan » untuk melanjutkan.",
          informationGathered:
            '<span style="color: #20B2AA;">&#10003;</span>\u00A0 Informasi yang terkumpul dari soal.',
          nextStep: "Berikutnya — mari selesaikan soal ini langkah demi langkah."
        },

        page7: {
          headerText: "Mari identifikasi rumus luas trapesium.",
          footerInstruction: "Pilih jawaban yang benar",
          instructionAfterQuiz: "Tekan » untuk melanjutkan.",
          quizPanel: {
            questionText: "Rumus manakah yang digunakan untuk mencari luas trapesium?",
            options: [
              {
                text: "$\\frac{1}{2}$ × alas × tinggi",
                iscorrect: false,
                feedback: "Coba lagi!"
              },
              {
                text: "(jumlah sisi sejajar) × tinggi",
                iscorrect: false,
                feedback: "Coba lagi!"
              },
              {
                text: "$\\frac{1}{2}$ × (jumlah sisi sejajar) × tinggi",
                iscorrect: true,
                feedback: "Benar!"
              },
              {
                text: " alas × tinggi",
                iscorrect: false,
                feedback: "Coba lagi!"
              }
            ]
          }
        },

        page8: {
          headerText: "Mari substitusi nilai-nilai ke dalam rumus.",
          footerInstruction: "Ketuk teks yang disorot.",
          instructionAfterQuiz: "Tekan » untuk melanjutkan.",
          informationAnalysis: {
            facts: [
              {
                text: "Luas trapesium adalah 300 cm²",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Alas 1 (a) = 40 cm <br/>Alas 2 (b) = 20 cm",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            toFind: [
              {
                text: "Tinggi trapesium",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            findingsArray: [
              {
                text: "Luas trapesium = $\\frac{1}{2}$ × (jumlah sisi sejajar) × tinggi",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: []
          }
        },

        page9: {
          headerText: "Mari substitusi nilai-nilai ke dalam rumus.",
          footerInstruction: "Ketuk teks yang disorot.",
          instructionAfterQuiz: "Tekan » untuk melanjutkan.",
          informationAnalysis: {
            facts: [
              {
                text: "Luas trapesium adalah 300 cm²",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Alas 1 (a) = 40 cm <br/>Alas 2 (b) = 20 cm",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            toFind: [
              {
                text: "Tinggi trapesium",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            findingsArray: [
              {
                text: "Luas trapesium = $\\frac{1}{2}$ × (jumlah sisi sejajar) × tinggi",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: []
          }
        },

        page10: {
          headerText: "Mari substitusi nilai-nilai ke dalam rumus.",
          footerInstruction: "Ketuk teks yang disorot.",
          instructionAfterQuiz: "Tekan » untuk melanjutkan.",
          informationAnalysis: {
            facts: [
              {
                text: "Luas trapesium adalah 300 cm²",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Alas 1 (a) = 40 cm <br/>Alas 2 (b) = 20 cm",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            toFind: [
              {
                text: "Tinggi trapesium",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            findingsArray: [
              {
                text: "Luas trapesium = $\\frac{1}{2}$ × (jumlah sisi sejajar) × tinggi",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: []
          }
        },

        page11: {
          headerText: "Mari substitusi nilai-nilai ke dalam rumus.",
          footerInstruction: "Gunakan papan angka untuk mengisi jawaban, lalu tekan PERIKSA.",
          instructionAfterQuiz: "Tekan » untuk merangkum.",
          informationAnalysis: {
            facts: [
              {
                text: "Luas trapesium adalah 300 cm²",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Alas 1 (a) = 40 cm <br/>Alas 2 (b) = 20 cm",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            toFind: [
              {
                text: "Tinggi trapesium",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            findingsArray: [
              {
                text: "Luas trapesium = $\\frac{1}{2}$ × (jumlah sisi sejajar) × tinggi",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: []
          },
          numpad: {
            tile1: {
              correct: "Bagus! Benar.",
              inCorrect: "Ups! Coba lagi."
            }
          },
          feedback: {
            emptyFeedback: "Masukkan angka terlebih dahulu sebelum menekan PERIKSA."
          }
        },

        page12: {
          headerText: "Mari substitusi nilai-nilai ke dalam rumus.",
          footerInstruction: "Tekan 'Mulai Lagi' untuk mengulang aktivitas ini.",
          instructionAfterQuiz: "",
          summary: "Jadi, tinggi trapesium yang dimaksud = 10 cm.",
          informationAnalysis: {
            facts: [
              {
                text: "Luas trapesium adalah 300 cm²",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Alas 1 (a) = 40 cm <br/>Alas 2 (b) = 20 cm",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            toFind: [
              {
                text: "Tinggi trapesium",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            findingsArray: [
              {
                text: "Luas trapesium = $\\frac{1}{2}$ × (jumlah sisi sejajar) × tinggi",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: []
          },
          numpad: {
            tile1: {
              correct: "Bagus! Benar.",
              inCorrect: "Ups! Coba lagi."
            }
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
