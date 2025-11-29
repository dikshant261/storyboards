// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlight1 = "#FFD700";
const highlight2 = "#70ACC7";
const highlight3 = "#F28283";
const highlight4 = "#33ad54";

const AppData = {
  // Current language setting
  currentLanguage: "en",

  // Text content by language
  translations: {
    en: {
      appInfo: {
        title: "Interactive Math Learning Applet",
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
      },

      common: {
        questionIcon: "Q",
        rollerCoasterLabel: "Science Club",
        merryGoRoundLabel: "Art Club",
        ratioSeparator: ":",
        questionText:
          "Prove that among the following groups of three numbers, which one is the correct one?Which is a Pythagorean triple.\na. 24, 17, 25 \nb. 7, 13, 11 \nc. 6, 2½, 6½",
        labels: {
          a: "a = ",
          b: "b = ",
          c: "c = ",
          dropHere: "Drop here",
        },
        informationAnalysis: {
          header: "INFORMATION ANALYSIS",
          facts: "Facts",
          values: "Value",
          toFind: "To Find",
        },
        tableHeaders: {
          quantity: "Quantity",
          coffee: "Coffee (in tsp)",
          sugar: "Sugar (in tsp)",
        },
        conceptSummary: {
          header: "CONCEPT SUMMARY",
          given: "Given",
          toFind: "To Find",
          keyConcepts: "Key Concepts",
          importantFormulae: "Calculations",
        },
      },

      pages: {
        page1: {
          introduction:
            "Let’s find which set of numbers forms a right triangle.",
        },
        page2: {
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4R",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText:
              "Given that p, q, and r are Pythagorean triples with p < q < r, choose the correct option.",
            imageText: "",
            options: [
              {
                text: "a. p<sup>2</sup> = q<sup>2</sup> + r<sup>2</sup>",
                iscorrect: false,
                feedback: " That’s not right! Try again.",
              },
              {
                text: "b. q<sup>2</sup> = p<sup>2</sup> - r<sup>2</sup>",
                iscorrect: false,
                feedback: " That’s not right! Try again.",
              },
              {
                text: "c. r<sup>2</sup> = p<sup>2</sup> - q<sup>2</sup>",
                iscorrect: false,
                feedback: " That’s not right! Try again.",
              },
              {
                text: "d. r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup>",
                iscorrect: true,
                feedback: "Good!",
              },
            ],
            keyConcepts: [
              {
                text: "<span>r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup></span>",
                color: highlight4,
              },
            ],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },

          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: "",
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },
        },
        page3: {
          fillBlanks: {
            instructionText: "Drag the numbers to the correct boxes.",
            options: [
              {
                id: "opt1",
                text: "24",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank3", text: "24" }],
              },
              {
                id: "opt2",
                text: "17",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank2", text: "17" }],
              },
              {
                id: "opt3",
                text: "25",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank1", text: "25" }],
              },
            ],
            containers: {},
            impFormulae: [],
            keyConcepts: [
              {
                text: "<span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup></span>",
                color: highlight4,
              },
            ],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "<span>r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup></span>",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page4: {
          questionTable: {
            headers: [
              "<span>c<sup>2</sup></span>",
              "<span>a<sup>2</sup> + b<sup>2</sup></span>",
            ],
            rows: [
              [
                "<span>24<sup>2</sup></span>",
                "<span>25<sup>2</sup> + 17<sup>2</sup></span>",
              ],
            ],
          },
          labels: {
            aOne: "a = 24",
            bOne: "b = 17",
            cOne: "c = 25",
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT2",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText:
              "Is <span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup> ?</span>",
            imageText: "",
            options: [
              {
                text: "Yes",
                iscorrect: false,
                feedback: " Try again!",
              },
              {
                text: "No",
                iscorrect: true,
                feedback: "Awesome!",
              },
            ],
            keyConcepts: [
              {
                text: "<span>25<sup>2</sup> = 17<sup>2</sup> + 25<sup>2</sup></span><br/> 625 = 289 + 576 <br/> 625 ≠ 865",
                color: highlight4,
              },
            ],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "<span>r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup></span>",
                color: highlight4,
              },
              {
                text: "<span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup></span>",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page5: {
          introduction:
            "Since the L.H.S. is not equal to the R.H.S., 24, 17, and 25 do not form a Pythagorean triple.\n\nLet’s check the next set of numbers, 7, 13, 11.",
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "<span>r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup></span>",
                color: highlight4,
              },
              {
                text: "<span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup></span>",
                color: highlight4,
              },
              {
                text: "<span>25<sup>2</sup> = 17<sup>2</sup> + 25<sup>2</sup></span><br/> 625 = 289 + 576 <br/> 625 ≠ 865",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page6: {
          fillBlanks: {
            instructionText: "Drag the numbers to the correct boxes.",
            options: [
              {
                id: "opt1",
                text: "13",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank2", text: "24" }],
              },
              {
                id: "opt2",
                text: "7",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank3", text: "17" }],
              },
              {
                id: "opt3",
                text: "11",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank1", text: "25" }],
              },
            ],
            containers: {},
            impFormulae: [],
            keyConcepts: [
              {
                text: "<span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup></span>",
                color: highlight4,
              },
            ],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "<span>r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup></span>",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page7: {
          questionTable: {
            headers: [
              "<span>c<sup>2</sup></span>",
              "<span>a<sup>2</sup> + b<sup>2</sup></span>",
            ],
            rows: [
              [
                "<span>11<sup>2</sup></span>",
                "<span>7<sup>2</sup> + 13<sup>2</sup></span>",
              ],
            ],
          },
          labels: {
            aOne: "a = 7",
            bOne: "b = 13",
            cOne: "c = 11",
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT2",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText:
              "Is <span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup> ?</span>",
            imageText: "",
            options: [
              {
                text: "Yes",
                iscorrect: false,
                feedback: " Try again!",
              },
              {
                text: "No",
                iscorrect: true,
                feedback: "Awesome!",
              },
            ],
            keyConcepts: [
              {
                text: "<span>11<sup>2</sup> = 7sup>2</sup> + 13<sup>2</sup></span><br/> 121 = 49 + 169 <br/> 121 ≠ 218",
                color: highlight4,
              },
            ],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "<span>r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup></span>",
                color: highlight4,
              },
              {
                text: "<span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup></span>",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page8: {
          introduction:
            "Since the L.H.S. is not equal to the R.H.S., 7, 13, and 11 do not form a Pythagorean triple.\n\nLet’s check the next set of numbers, 6, 2½, 6½",
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "<span>r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup></span>",
                color: highlight4,
              },
              {
                text: "<span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup></span>",
                color: highlight4,
              },
              {
                text: "<span>11<sup>2</sup> = 7sup>2</sup> + 13<sup>2</sup></span><br/> 121 = 49 + 169 <br/> 121 ≠ 218",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page9: {
          fillBlanks: {
            instructionText: "Drag the numbers to the correct boxes.",
            options: [
              {
                id: "opt1",
                text: "6",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank3", text: "6" }],
              },
              {
                id: "opt2",
                text: "6½",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank1", text: "6½" }],
              },
              {
                id: "opt3",
                text: "2½",
                feedbackText: "Awesome!",
                blankID: [{ bid: "blank2", text: "2½" }],
              },
            ],
            containers: {},
            impFormulae: [],
            keyConcepts: [
              {
                text: "<span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup></span>",
                color: highlight4,
              },
            ],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "<span>r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup></span>",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page10: {
          questionTable: {
            headers: [
              "<span>c<sup>2</sup></span>",
              "<span>a<sup>2</sup> + b<sup>2</sup></span>",
            ],
            rows: [
              [
                "<span>6½<sup>2</sup></span>",
                "<span>6<sup>2</sup> + 2½<sup>2</sup></span>",
              ],
            ],
          },
          labels: {
            aOne: "a = 6",
            bOne: "b = 2½",
            cOne: "c = 6½",
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT2",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText:
              "Is <span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup> ?</span>",
            imageText: "",
            options: [
              {
                text: "Yes",
                iscorrect: true,
                feedback: "Awesome!",
              },
              {
                text: "No",
                iscorrect: false,
                feedback: "Try again!",
              },
            ],
            keyConcepts: [
              {
                text: "<span>6½<sup>2</sup> = 6sup>2</sup> + 2½<sup>2</sup></span><br/> 42.25 = 36 + 6.25 <br/> 42.25 = 42.25",
                color: highlight4,
              },
            ],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "<span>r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup></span>",
                color: highlight4,
              },
              {
                text: "<span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup></span>",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page11: {
          introduction:
            "Since the L.H.S. is  equal to the R.H.S., 6, 2½, and 6½  form a Pythagorean triple.",
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "<span>r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup></span>",
                color: highlight4,
              },
              {
                text: "<span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup></span>",
                color: highlight4,
              },
              {
                text: "<span>6½<sup>2</sup> = 6sup>2</sup> + 2½<sup>2</sup></span><br/> 42.25 = 36 + 6.25 <br/> 42.25 = 42.25",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page12: {
          highlights: [
            {
              text: "Adult Komodo can walk 11.2 km per day.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Baby Komodo can walk 2000 m per day.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Ratio of distance traveled by adult Komodo to baby Komodo",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText: "What is the simplest form of the ratio?",
            imageText: "",
            options: [
              {
                text: "28/5",
                iscorrect: true,
                feedback: "Correct! 112 ÷ 4 = 28 and 20 ÷ 4 = 5.",
              },
              {
                text: "28/10",
                iscorrect: false,
                feedback: "Not quite. Try again.",
              },
              {
                text: "56/10",
                iscorrect: false,
                feedback: "Not quite. Try again.",
              },
              {
                text: "25/8",
                iscorrect: false,
                feedback: "Not quite. Try again.",
              },
            ],
            keyConcepts: [
              {
                text: "Simplest form = 28/5",
                color: highlight4,
              },
            ],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },
          conceptSummary: {
            given: [
              {
                text: "Adult Komodo can walk 11.2 km per day.",
                color: highlight2,
              },
              {
                text: "Baby Komodo can walk 2000 m per day.",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [
              {
                text: "Ratios compare quantities with the same unit.",
                color: highlight4,
              },
              {
                text: "1 km = 1000 m",
                color: highlight4,
              },
              {
                text: "11.2 km = 11200 m",
                color: highlight4,
              },
              {
                text: "Ratio of distance by adult Komodo to baby Komodo = 11200/2000 = 112/20",
                color: highlight4,
              },
              {
                text: "GCF of 112 and 20 = 4",
                color: highlight4,
              },
            ],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },
        },
        page13: {
          highlights: [
            {
              text: "Adult Komodo can walk 11.2 km per day.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Baby Komodo can walk 2000 m per day.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Ratio of distance traveled by adult Komodo to baby Komodo",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT2",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "Connect with Concepts",
            questionText:
              "What is the ratio of distance by adult Komodo to baby Komodo?",
            imageText: "",
            options: [
              {
                text: "5 : 28",
                iscorrect: false,
                feedback: "Not quite. Try again.",
              },
              {
                text: "28 : 5",
                iscorrect: true,
                feedback: "That’s correct.",
              },
            ],
            keyConcepts: [
              {
                text: "Ratio = 28 : 5",
                color: highlight4,
              },
            ],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },
          conceptSummary: {
            given: [
              {
                text: "Adult Komodo can walk 11.2 km per day.",
                color: highlight2,
              },
              {
                text: "Baby Komodo can walk 2000 m per day.",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [
              {
                text: "Ratios compare quantities with the same unit.",
                color: highlight4,
              },
              {
                text: "1 km = 1000 m",
                color: highlight4,
              },
              {
                text: "11.2 km = 11200 m",
                color: highlight4,
              },
              {
                text: "Ratio of distance by adult Komodo to baby Komodo = 11200/2000 = 112/20",
                color: highlight4,
              },
              {
                text: "GCF of 112 and 20 = 4",
                color: highlight4,
              },
              {
                text: "Simplest form = 28/5.",
                color: highlight4,
              },
            ],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },
        },
        page14: {
          highlights: [
            {
              text: "Adult Komodo can walk 11.2 km per day.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Baby Komodo can walk 2000 m per day.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "Ratio of distance traveled by adult Komodo to baby Komodo",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          feedbackTextbox: {
            text: "We concluded that the <span style='background-color: #FFD700; color: #000000; padding: 2px 4px;'>ratio of the distance traveled<br/> by adult Komodo to baby Komodo is 28 : 5.</span>",
          },
          conceptSummary: {
            given: [
              {
                text: "Adult Komodo can walk 11.2 km per day.",
                color: highlight2,
              },
              {
                text: "Baby Komodo can walk 2000 m per day.",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [
              {
                text: "Ratios compare quantities with the same unit.",
                color: highlight4,
              },
              {
                text: "1 km = 1000 m",
                color: highlight4,
              },
              {
                text: "11.2 km = 11200 m",
                color: highlight4,
              },
              {
                text: "Ratio of distance by adult Komodo to baby Komodo = 11200/2000 = 112/20",
                color: highlight4,
              },
              {
                text: "GCF of 112 and 20 = 4",
                color: highlight4,
              },
              {
                text: "Simplest form = 28/5.",
                color: highlight4,
              },
              {
                text: "Ratio = 28 : 5",
                color: highlight4,
              },
            ],
            impFormulae: [
              {
                text: "",
                color: highlight1,
              },
            ],
          },
        },
      },
    },

    id: {
      appInfo: {
        title: "Aplet Pembelajaran Matematika Interaktif",
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Lagi",
      },

      common: {
        questionIcon: "Q",
        rollerCoasterLabel: "Klub Sains",
        merryGoRoundLabel: "Klub Seni",
        ratioSeparator: ":",
        questionText:
          "Ayah meminta Dona untuk membuat kopi untuk teman-temannya. Biasanya, untuk membuat 1 cangkir kecil berukuran 250 ml, Ibu menggunakan 1 sdt kopi dan 2 sdt gula. Dona ingin membuat kopi dalam teko yang menampung 1 liter air menggunakan 4 sdt kopi dan 10 sdt gula. Dibandingkan dengan kopi yang dibuat oleh Ibu, perkirakan rasa kopi yang dibuat oleh Dona. Apakah terlalu pahit, terlalu manis, atau pas?",
        labels: {
          mom: "Ibu",
          dona: "Dona",
          quantity250ml: "250 ml",
          quantity1liter: "1 liter",
          quantity1000ml: "1000 ml",
          number1: "1",
          number2: "2",
          number4: "4",
          number8: "8",
          number10: "10",
          variableA: "a",
          variableB: "b",
          times4: "×4",
          timesQuestion: "×?",
          dropHere: "Letakkan di sini",
        },
        informationAnalysis: {
          header: "ANALISIS INFORMASI",
          facts: "Fakta",
          values: "Nilai",
          toFind: "Ditanyakan",
        },
        tableHeaders: {
          quantity: "Jumlah",
          coffee: "Kopi (dalam sdt)",
          sugar: "Gula (dalam sdt)",
        },
        conceptSummary: {
          header: "RINGKASAN KONSEP",
          given: "Diketahui",
          toFind: "Ditanyakan",
          keyConcepts: "Konsep Kunci",
          importantFormulae: "Perhitungan",
        },
      },

      pages: {
        page1: {
          questionIntro:
            "Di tabel berikut adalah jumlah siswa yang bergabung dengan berbagai klub sekolah.",
          questionTable: {
            headers: ["Klub", "Jumlah Anggota"],
            rows: [
              ["Sains", "16"],
              ["Olahraga", "…"],
              ["Seni", "24"],
              ["Robotika", "…"],
            ],
          },
          introduction:
            "Mari kita bandingkan kopi yang dibuat oleh Dona dan ibunya menggunakan rasio!",
          highlights: [
            {
              text: "a. Tuliskan rasio paling sederhana dari anggota Klub Sains terhadap Klub Seni.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "25gc",
              bold: true,
              underline: false,
            },
          ],
        },
        page2: {
          questionTable: {
            headers: ["Klub", "Jumlah Anggota"],
            rows: [
              ["Sains", "16"],
              ["Olahraga", ""],
              ["Seni", "24"],
              ["Robotika", ""],
            ],
          },
          highlights: [
            {
              text: "1 cangkir kecil berukuran 250 ml, Ibu menggunakan 1 sdt kopi dan 2 sdt gula.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [],
          },
        },
        page3: {
          questionTable: {
            headers: ["Klub", "Jumlah Anggota"],
            rows: [
              ["Sains", "16"],
              ["Olahraga", ""],
              ["Seni", "24"],
              ["Robotika", ""],
            ],
          },
          highlights: [
            {
              text: "1 cangkir kecil berukuran 250 ml, Ibu menggunakan 1 sdt kopi dan 2 sdt gula.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "1 liter air menggunakan 4 sdt kopi dan 10 sdt gula.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight1,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            values: [],
            toFind: [],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [],
            impFormulae: [],
          },
        },
        page4: {
          questionTable: {
            headers: ["Klub", "Jumlah Anggota"],
            rows: [
              ["Sains", "16"],
              ["Olahraga", ""],
              ["Seni", "24"],
              ["Robotika", ""],
            ],
          },
          highlights: [
            {
              text: "1 cangkir kecil berukuran 250 ml, Ibu menggunakan 1 sdt kopi dan 2 sdt gula.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "1 liter air menggunakan 4 sdt kopi dan 10 sdt gula.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "perkirakan rasa kopi yang dibuat oleh Dona. Apakah terlalu pahit, terlalu manis, atau pas?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight1,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Apakah kopi Dona sama, pahit, atau manis?",
                color: highlight3,
              },
            ],
          },
        },
        page5: {
          highlights: [
            {
              text: "1 cangkir kecil berukuran 250 ml, Ibu menggunakan 1 sdt kopi dan 2 sdt gula.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "1 liter air menggunakan 4 sdt kopi dan 10 sdt gula.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "perkirakan rasa kopi yang dibuat oleh Dona. Apakah terlalu pahit, terlalu manis, atau pas?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
        },
        page6: {
          questionTable1: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [["", "", ""]],
          },
          questionTable2: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [["", "", ""]],
          },
          highlights: [],

          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [{ text: "1 liter = 1000 ml", color: highlight1 }],
            impFormulae: [],
          },
          fillBlanks: {
            instructionText:
              "Teko Dona berukuran 1 liter. Untuk membandingkan dengan benar, kita perlu mengubahnya menjadi mililiter. 1 liter = ?",
            options: [
              {
                id: "opt1",
                text: "250 ml",
                feedbackText: "Belum tepat! Coba lagi.",
                blankID: [],
              },
              {
                id: "opt2",
                text: "500 ml",
                feedbackText: "Belum tepat! Coba lagi.",
                blankID: [],
              },
              {
                id: "opt3",
                text: "750 ml",
                feedbackText: "Belum tepat! Coba lagi.",
                blankID: [],
              },
              {
                id: "opt4",
                text: "1000 ml",
                feedbackText:
                  "Bagus! Mari kita ganti 1 liter dengan 1000 ml di tabel Dona.",
                blankID: [{ bid: "blank4", text: "1000 ml" }],
              },
            ],
            containers: {},
            impFormulae: [
              {
                text: "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
                color: highlight1,
              },
            ],
          },
        },
        page7: {
          questionTable1: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [
              ["", "", ""],
              ["", "", ""],
            ],
          },
          highlights: [],

          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [{ text: "1 liter = 1000 ml", color: highlight1 }],
            impFormulae: [
              {
                text: "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
                color: highlight1,
              },
            ],
          },
          fillBlanks: {
            instructionText:
              "Jika ibu Dona membuat 1000 ml kopi, berapa cangkir 250 ml yang dibutuhkannya?",
            options: [
              {
                id: "opt1",
                text: "2",
                feedbackText: "Belum tepat! 250 ml × 2 = 500 ml",
                blankID: [],
              },
              {
                id: "opt2",
                text: "4",
                feedbackText:
                  "Bagus! Mari kita masukkan itu ke dalam tabel rasio Ibu",
                blankID: [{ bid: "blank5", text: "4" }],
              },
              {
                id: "opt3",
                text: "6",
                feedbackText: "Belum tepat! 250 ml × 6 = 1500 ml",
                blankID: [],
              },
              {
                id: "opt4",
                text: "8",
                feedbackText: "Belum tepat! 250 ml × 8 = 2000 ml",
                blankID: [],
              },
            ],
            containers: {},
            impFormulae: [],
          },
        },
        page8: {
          questionTable1: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [["", "", ""]],
          },
          highlights: [],

          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [{ text: "1 liter = 1000 ml", color: highlight1 }],
            impFormulae: [
              {
                text: "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
                color: highlight1,
              },
            ],
          },
          fillBlanks: {
            instructionText:
              "Berapa rasio kopi terhadap gula dalam 250 ml kopi?",
            options: [
              {
                id: "opt1",
                text: "2 : 1",
                feedbackText: "Tidak, itu rasio gula terhadap kopi.",
                blankID: [],
              },
              {
                id: "opt2",
                text: "1 : 2",
                feedbackText: "Ya, itu 1 sdt kopi terhadap 2 sdt gula.",
                blankID: [
                  { bid: "blank2", text: "1" },
                  { bid: "blank3", text: "2" },
                ],
              },
              {
                id: "opt3",
                text: "1 : 250",
                feedbackText: "Tidak, itu bukan rasio kopi terhadap gula.",
                blankID: [],
              },
              {
                id: "opt4",
                text: "2 : 250",
                feedbackText: "Tidak, itu bukan rasio kopi terhadap gula.",
                blankID: [],
              },
            ],
            containers: {},
            impFormulae: [
              { text: "Rasio kopi terhadap gula = 1 : 2", color: highlight1 },
            ],
          },
        },
        page9: {
          highlights: [],
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT2",
              emptyFeedback:
                "Dalam bentuk paling sederhana, kedua suku rasio tidak memiliki faktor persekutuan selain 1.",
            },
            headerText: "Hubungkan dengan Konsep",
            questionText:
              "Mari kita asumsikan ada 'a' sdt kopi dan 'b' sdt gula dalam 1000 ml kopi. <br><br>Nyatakan benar atau salah –<br>Untuk menjaga rasa yang sama, a : b harus setara dengan 1 : 2.",
            imageText: "",
            options: [
              {
                text: "Salah",
                iscorrect: false,
                feedback:
                  "Jika rasionya tidak setara, kopi akan terasa berbeda.",
              },
              {
                text: "Benar",
                iscorrect: true,
                feedback:
                  "Ya, untuk menjaga rasa yang sama, kita perlu menambahkan jumlah kopi dan gula yang setara.",
              },
            ],
            keyConcepts: [],
            impFormulae: [{ text: "a : b = 1 : 2", color: highlight1 }],
          },

          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [{ text: "1 liter = 1000 ml", color: highlight1 }],
            impFormulae: [
              {
                text: "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
                color: highlight1,
              },
              { text: "Rasio kopi terhadap gula = 1 : 2", color: highlight1 },
            ],
          },
        },
        page10: {
          questionTable1: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [["", "", ""]],
          },
          highlights: [],

          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [],
            impFormulae: [
              {
                text: "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
                color: highlight1,
              },
              { text: "Rasio kopi terhadap gula = 1 : 2", color: highlight1 },
              { text: "a : b = 1 : 2", color: highlight1 },
            ],
          },
          fillBlanks: {
            instructionText:
              "Berapa rasio kopi terhadap gula dalam 250 ml kopi?",
            options: [
              {
                id: "opt1",
                text: "1",
                feedbackText: "Tidak, coba lagi!",
                blankID: [],
              },
              {
                id: "opt2",
                text: "2",
                feedbackText: "Tidak, coba lagi!",
                blankID: [],
              },
              {
                id: "opt3",
                text: "4",
                feedbackText:
                  "Benar! Untuk menjaga rasio setara, kita perlu mengalikan dengan 4.",
                blankID: [{ bid: "blank5", text: "4" }],
              },
              {
                id: "opt4",
                text: "8",
                feedbackText: "Tidak, coba lagi!",
                blankID: [],
              },
            ],
            containers: {},
            impFormulae: [{ text: "a = 4", color: highlight1 }],
          },
        },
        page11: {
          questionTable1: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [["", "", ""]],
          },
          highlights: [],

          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [],
            impFormulae: [
              {
                text: "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
                color: highlight1,
              },
              { text: "Rasio kopi terhadap gula = 1 : 2", color: highlight1 },
              { text: "a : b = 1 : 2", color: highlight1 },
              { text: "a = 4", color: highlight1 },
            ],
          },
          fillBlanks: {
            instructionText:
              "Berapa rasio kopi terhadap gula dalam 250 ml kopi?",
            options: [
              {
                id: "opt1",
                text: "4",
                feedbackText: "Tidak, coba lagi!",
                blankID: [],
              },
              {
                id: "opt2",
                text: "6",
                feedbackText: "Tidak, coba lagi!",
                blankID: [],
              },
              {
                id: "opt3",
                text: "8",
                feedbackText:
                  "Benar! Untuk menjaga rasio setara, kita perlu mengalikan dengan 4.",
                blankID: [{ bid: "blank6", text: "8" }],
              },
              {
                id: "opt4",
                text: "10",
                feedbackText: "Tidak, coba lagi!",
                blankID: [],
              },
            ],
            containers: {},
            impFormulae: [{ text: "b = 8", color: highlight1 }],
          },
        },

        page12: {
          questionTable1: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [
              ["", "", ""],
              ["", "", ""],
            ],
          },
          questionTable2: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [["", "", ""]],
          },
          highlights: [],

          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [],
            impFormulae: [
              {
                text: "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
                color: highlight1,
              },
              { text: "Rasio kopi terhadap gula = 1 : 2", color: highlight1 },
              { text: "a : b = 1 : 2", color: highlight1 },
              { text: "a = 4", color: highlight1 },
              { text: "b = 8", color: highlight1 },
            ],
          },
          conclusion: {
            text: 'Jumlah gula berbeda dalam kopi Ibu dan Dona.<br>Jadi, kopi Dona terasa <span style="color: transparent;">lebih manis daripada</span> <br>kopi ibu.',
          },
          fillBlanks: {
            instructionText:
              "Seret dan lepas opsi yang benar untuk mengisi bagian yang kosong yang disorot dalam kotak biru.",
            blank10Coordinate: [365, 695, 675, 750],
            options: [
              {
                id: "opt1",
                text: "sama dengan",
                feedbackText:
                  "Belum tepat! Kopi Dona memiliki jumlah air dan kopi yang sama tetapi lebih banyak gula.",
                blankID: [],
              },
              {
                id: "opt2",
                text: "lebih manis daripada",
                feedbackText:
                  "Benar! Kopi Dona memiliki jumlah air dan kopi yang sama tetapi lebih banyak gula.",
                blankID: [{ bid: "blank10", text: "lebih manis daripada" }],
              },
              {
                id: "opt3",
                text: "lebih pahit daripada",
                feedbackText:
                  "Belum tepat! Kopi Dona memiliki jumlah air dan kopi yang sama tetapi lebih banyak gula.",
                blankID: [],
              },
            ],
            containers: {},
            impFormulae: [{ text: "Kopi Dona lebih manis", color: highlight1 }],
          },
        },
        page13: {
          questionTable1: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [
              ["", "", ""],
              ["", "", ""],
            ],
          },
          questionTable2: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [["", "", ""]],
          },
          highlights: [],

          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [],
            impFormulae: [
              {
                text: "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
                color: highlight1,
              },
              { text: "Rasio kopi terhadap gula = 1 : 2", color: highlight1 },
              { text: "a : b = 1 : 2", color: highlight1 },
              { text: "a = 4", color: highlight1 },
              { text: "b = 8", color: highlight1 },
              { text: "Kopi Dona lebih manis", color: highlight1 },
            ],
          },
          fillBlanks: {
            instructionText:
              "Seret dan lepas opsi yang benar untuk mengisi bagian yang kosong yang disorot dalam kotak biru.",
            blank10Coordinate: [290, 705, 600, 765],
            options: [
              {
                id: "opt1",
                text: "sama dengan",
                feedbackText:
                  "Belum tepat! Kopi Dona memiliki jumlah air dan kopi yang sama tetapi lebih banyak gula.",
                blankID: [{ bid: "blank1", text: "250 ml" }],
              },
              {
                id: "opt2",
                text: "lebih manis daripada",
                feedbackText:
                  "Benar! Kopi Dona memiliki jumlah air dan kopi yang sama tetapi lebih banyak gula.",
                blankID: [{ bid: "blank10", text: "lebih manis daripada" }],
              },
              {
                id: "opt3",
                text: "lebih pahit daripada",
                feedbackText:
                  "Belum tepat! Kopi Dona memiliki jumlah air dan kopi yang sama tetapi lebih banyak gula.",
                blankID: [{ bid: "blank5", text: "4" }],
              },
            ],
            containers: {},
            impFormulae: [],
          },
          feedbackTextbox: {
            text: "Jumlah gula berbeda dalam kopi Ibu dan Dona.<br>Jadi, kopi Dona terasa lebih manis daripada kopi ibu.",
          },
        },
      },
    },
  },
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

    // Special handling for blank10Coordinate to debug
    if (key === "pages.page12.fillBlanks.blank10Coordinate") {
      const fillBlanksObj = translation?.pages?.page12?.fillBlanks;
      console.log("🔍 [i18n] Looking for blank10Coordinate:", {
        lang,
        hasTranslation: !!translation,
        hasPages: !!translation?.pages,
        hasPage12: !!translation?.pages?.page12,
        hasFillBlanks: !!fillBlanksObj,
        hasCoordinate: !!fillBlanksObj?.blank10Coordinate,
        coordinate: fillBlanksObj?.blank10Coordinate,
        fillBlanksType: typeof fillBlanksObj,
        fillBlanksIsArray: Array.isArray(fillBlanksObj),
        fillBlanksKeys: fillBlanksObj ? Object.keys(fillBlanksObj) : null,
        fillBlanksFull: fillBlanksObj ? JSON.stringify(fillBlanksObj) : null,
        fillBlanksRaw: fillBlanksObj,
      });
    }

    for (const k of keys) {
      if (key === "pages.page12.fillBlanks.blank10Coordinate") {
        console.log(`🔍 [i18n] Checking key "${k}":`, {
          valueType: typeof value,
          valueIsArray: Array.isArray(value),
          valueIsObject: value && typeof value === "object",
          hasKey: value && typeof value === "object" && k in value,
          valueKeys:
            value && typeof value === "object" ? Object.keys(value) : null,
        });
      }
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        if (key === "pages.page12.fillBlanks.blank10Coordinate") {
          console.log(`❌ [i18n] Key "${k}" not found in value:`, value);
        }
        found = false;
        break;
      }
    }

    // If not found in current language, try English fallback
    if (!found) {
      if (key === "pages.page12.fillBlanks.blank10Coordinate") {
        console.log(
          "⚠️ [i18n] blank10Coordinate not found in",
          lang,
          "- falling back to English"
        );
      }
      value = AppData.translations.en;
      for (const fallbackKey of keys) {
        if (value && typeof value === "object" && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return `[Missing: ${key}]`;
        }
      }
    } else {
      if (key === "pages.page12.fillBlanks.blank10Coordinate") {
        console.log("✅ [i18n] blank10Coordinate found in", lang, ":", value);
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
