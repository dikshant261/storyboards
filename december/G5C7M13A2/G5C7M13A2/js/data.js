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
        previousButtonPage1: "Dispatched page change event to page 1"
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
          footerInstruction: "Tap » to identify 'given' information",
          highlights: [
            {
              text: "use of the Indonesian language is $\\frac{1}{8}$ of the total",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "use of regional languages is $\\frac{3}{10}$",
              fontColor: highlightColor2,
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
          footerInstruction: "Tap » to identify 'given' information",
          highlights: [
            {
              text: "use of the Indonesian language is $\\frac{1}{8}$ of the total",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "use of regional languages is $\\frac{3}{10}$",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "difference between the use of Indonesian and regional languages",
              fontColor: highlightColor3,
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
        page5: {
          headerText: "Build a mathematical sentence for the given scene",
          footerInstruction: "Drag the correct buttons to the correct spot in the sentence",
          equationText: {
            totalWeight: 'Total weight'
          },
          optionTextFillBlanks: {
            optionOpt1Text: "Indonesian language",
            optionOpt2Text: 'Regional<br/> language',
          }
        },
        page6: {
          headerText: "Build a mathematical sentence for the given scene",
          footerInstruction: "Drag the correct buttons to the correct spot in the sentence",
          equationText: {
            totalWeight: 'Total weight',
            javeneseSugar: "Javenese sugar weight",
            flourWeight: 'Flour weight',
          },
          fractionAddition: "This is a Mixed Fractions Subtraction challenge!"
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
          nextStep: "Next - Steps required to find answer."
        },
        page8: {
          headerText: "Tap and drag the options to arrange the steps in the correct order to subtract unlike fractions.",
          footerInstruction: "Rearrange the buttons to the correct sequence of steps",
          steps: [
            'Find the LCM of the two denominators.',
            'Convert into like fractions.',
            'Subtract like fractions.'
          ],

        },
        page9: {
          headerText: "What is the correct formula for converting a improper fraction into an mixed number?",
          footerInstruction: "Tap » to subtract the liked numbers using these steps",
          solutionSteps: {
            headerText: "Liked Fraction Addition",
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
                text: 'Subtract like fractions.',
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
          footerInstruction: "Enter LCM of denominators using numpad",
          lcmButtonText: 'LCM of 8, and 10',
          solutionSteps: {
            headerText: "Liked Fraction Addition",
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
                text: 'Subtract like fractions.',
                subSteps: []
              }
            ],
          },
        },
        page11: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap » to continue",
          solutionSteps: {
            headerText: "Liked Fraction Addition",
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
                text: 'Subtract like fractions.',
                subSteps: []
              }
            ],
          },
        },
        page12: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the subtract",
          instructionRevealConversions: "Tap '?' to reveal the answer for each conversion",
          solutionSteps: {
            headerText: "Liked Fraction Addition",
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
                text: 'Subtract like fractions.',
                subSteps: []
              }
            ],
          }
        },
        page13: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the subtract",
          solutionSteps: {
            headerText: "Liked Fraction Addition",
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
                text: 'Subtract like fractions.',
                subSteps: []
              }
            ],
          }
        },
        page14: {
          headerText: 'Solve the step in your notebook and shout-out the answer.',
          footerInstruction: "Tap '?' to reveal the simplest form.",
          instructionAfterQuiz: "Tap » to convert in mixed fraction.",
          solutionSteps: {
            headerText: "Liked Fraction Addition",
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
                text: 'Subtract like fractions.',
                subSteps: []
              }
            ],
          }
        },

        page15: {
          highlights: [
            {
              text: "difference between the use of Indonesian and regional languages",
              fontColor: highlightColor3,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          solutionSteps: {
            headerText: "Liked Fraction Addition",
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
                text: 'Subtract like fractions.',
                subSteps: []
              }
            ],
          },
          headerText: "Identify scene – Build Equation – Solve for unknown",
          footerInstruction: "Tap 'Start Over' to re-do activity"
        }
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
          highlights: [],
          instructionText:
            "Mari cari jarak dari rumah Yohana ke rumah Lukas dengan menjumlahkan bilangan campuran dan pecahan.",
          headerText: "Baca soal dan identifikasi ‘diketahui’ dan ‘yang dicari’",
          footerInstruction: "Tekan » untuk mengidentifikasi informasi ‘diketahui’"
        },

        page2: {
          headerText: "Baca soal dan identifikasi ‘diketahui’ dan ‘yang dicari’",
          footerInstruction: "Tekan » untuk mengidentifikasi informasi ‘diketahui’",
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
          }
        },

        page3: {
          headerText: "Baca soal dan identifikasi ‘diketahui’ dan ‘yang dicari’",
          footerInstruction: "Tekan » untuk mengidentifikasi informasi ‘diketahui’",
          highlights: [],
          informationAnalysis: {
            facts: [
              { text: "Rumah Komang berada di tengah.", size: "20gc", color: highlightColor2 },
              { text: "Komang ke Yohana = $1 \\frac{1}{2}$ km", size: "20gc", color: highlightColor2 }
            ],
            values: [],
            toFind: []
          }
        },

        page4: {
          headerText: "Baca soal dan identifikasi ‘diketahui’ dan ‘yang dicari’",
          footerInstruction: "Tekan » untuk mengidentifikasi informasi ‘diketahui’",
          highlights: [
            {
              text: "Rumah Komang berada di antara rumah Yohana dan rumah Lukas.",
              highlightColor: highlightColor1,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "Jarak dari rumah Komang ke rumah Yohana adalah",
              highlightColor: highlightColor2,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "km, sedangkan",
              highlightColor: highlightColor2,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "jarak antara rumah Komang dan rumah Lukas adalah",
              highlightColor: highlightColor3,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "km.",
              highlightColor: highlightColor3,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              { text: "Rumah Komang berada di tengah.", size: "20gc", color: highlightColor1 },
              { text: "Komang ke Yohana = $1 \\frac{1}{2}$ km", size: "20gc", color: highlightColor2 },
              { text: "Komang ke Lukas = $2 \\frac{1}{4}$ km", size: "20gc", color: highlightColor3 }
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
          headerText: "Baca soal dan identifikasi ‘diketahui’ dan ‘yang dicari’",
          footerInstruction: "Tekan » untuk mengidentifikasi informasi ‘diketahui’",
          highlights: [
            {
              text: "Rumah Komang berada di antara rumah Yohana dan rumah Lukas.",
              highlightColor: highlightColor1,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "Jarak dari rumah Komang ke rumah Yohana adalah",
              highlightColor: highlightColor2,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "km, sedangkan",
              highlightColor: highlightColor2,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "jarak antara rumah Komang dan rumah Lukas adalah",
              highlightColor: highlightColor3,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "km.",
              highlightColor: highlightColor3,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "lebar rumah Komang adalah",
              highlightColor: highlightColor4,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "km,",
              highlightColor: highlightColor4,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              { text: "Rumah Komang berada di tengah.", size: "20gc", color: highlightColor1 },
              { text: "Komang ke Yohana = $1 \\frac{1}{2}$ km", size: "20gc", color: highlightColor2 },
              { text: "Komang ke Lukas = $2 \\frac{1}{4}$ km", size: "20gc", color: highlightColor3 },
              { text: "lebar rumah Komang adalah $\\frac{1}{200}$ km", size: "20gc", color: highlightColor4 }
            ],
            values: [],
            toFind: []
          }
        },

        page6: {
          headerText: "Baca soal dan identifikasi ‘diketahui’ dan ‘yang dicari’",
          footerInstruction: "Tekan » untuk mengidentifikasi informasi ‘diketahui’",
          highlights: [
            {
              text: "Rumah Komang berada di antara rumah Yohana dan rumah Lukas.",
              highlightColor: highlightColor1,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "Jarak dari rumah Komang ke rumah Yohana adalah",
              highlightColor: highlightColor2,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "km, sedangkan",
              highlightColor: highlightColor2,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "jarak antara rumah Komang dan rumah Lukas adalah",
              highlightColor: highlightColor3,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "km.",
              highlightColor: highlightColor3,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "lebar rumah Komang adalah",
              highlightColor: highlightColor4,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "km,",
              highlightColor: highlightColor4,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "berapa jarak rumah Yohana ke rumah Lukas?",
              highlightColor: highlightColor5,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              { text: "Rumah Komang berada di tengah.", size: "20gc", color: highlightColor1 },
              { text: "Komang ke Yohana = $1 \\frac{1}{2}$ km", size: "20gc", color: highlightColor2 },
              { text: "Komang ke Lukas = $2 \\frac{1}{4}$ km", size: "20gc", color: highlightColor3 },
              { text: "lebar rumah Komang adalah $\\frac{1}{200}$ km", size: "20gc", color: highlightColor4 }
            ],
            values: [],
            toFind: [
              { text: "berapa jarak rumah Yohana ke rumah Lukas?", size: "20gc", color: highlightColor5 }
            ]
          }
        },

        page7: {
          headerText: "Buat kalimat matematika untuk adegan yang diberikan",
          footerInstruction: "Seret tombol yang benar ke tempat yang benar dalam kalimat",
          optionOpt1Text: "Rumah Komang<br>ke<br>Rumah Yohana",
          optionOpt1Feedback: "Benar! Ini adalah jarak dari Komang ke rumah Yohana.",
          optionOpt2Text: "Rumah Yohana<br>ke<br>Rumah Lukas",
          optionOpt2Feedback: "Benar! Ini adalah jarak dari Yohana ke rumah Lukas.",
          optionOpt3Text: "Lebar<br>rumah Komang",
          optionOpt3Feedback: "Benar! Ini adalah lebar rumah Komang.",
          optionPlusCorrectFeedback: "Benar!",
          optionMinusNotNeededFeedback: "Operator ini tidak diperlukan di sini.",

          highlights: [
            {
              text: "sebuah tiang antena TV di atap",
              highlightColor: "#FFD700",
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "tiang antena setinggi 8 meter",
              highlightColor: "#FFD700",
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "tepat di atas",
              highlightColor: "#70ACC7",
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "genteng atap",
              highlightColor: "#70ACC7",
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "ditahan oleh kawat",
              highlightColor: highlightColor4,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "kawat biasanya dipasang di puncak tiang",
              highlightColor: highlightColor4,
              fontColor: "#000000",
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],

          informationAnalysis: {
            facts: [
              { text: "Tiang antena setinggi 8 meter", size: "20gc", color: "#FFD700" },
              { text: "Kawat terpasang pada $\\frac{3}{4}$ tinggi tiang", size: "20gc", color: "#70ACC7" },
              { text: "Panjang sisi vertikal segitiga = 6 m (8 × $\\frac{3}{4}$)", size: "20gc", color: "#70ACC7" },
              { text: "Jarak antara kawat dan tiang di tanah = 8 m", size: "20gc", color: "#70ACC7" },
              { text: "Sisi horizontal adalah jarak dari kaki tiang ke titik ikat kawat", size: "20gc", color: "#F28283" },
              { text: "Panjang kawat adalah hipotenusa segitiga", size: "20gc", color: "#F28283" },
              { text: "Sisi vertikal adalah jarak dari kaki tiang ke titik ikat kawat", size: "20gc", color: "#F28283" }
            ],
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
              { text: "1 km = 1000 m", size: "20gc", color: highlightColor4 }
            ]
          },

          statementText: "Mari ubah jarak tempuh komodo dewasa menjadi meter. 11.2 km = _________",

          fillBlanks: {
            instructionText: "Ketuk opsi yang benar untuk mengisi bagian kosong yang disorot di kotak biru.",
            blank10Coordinate: [610, 295, 820, 360],
            options: [
              { id: "opt1", text: "11.2 m", feedbackText: "Belum tepat. Kalikan 1000 untuk mengubah km ke m.", blankID: [] },
              { id: "opt2", text: "112 m", feedbackText: "Belum tepat. Kalikan 1000 untuk mengubah km ke m.", blankID: [] },
              { id: "opt3", text: "1120 m", feedbackText: "Belum tepat. Kalikan 1000 untuk mengubah km ke m.", blankID: [] },
              {
                id: "opt4",
                text: "11200 m",
                feedbackText: "Benar! 11.2 × 1000 = 11200 m",
                blankID: [{ bid: "blank1", text: "11200 m" }]
              }
            ],
            impFormulae: []
          }
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
