// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlight1 = "#FFD700";
const highlight2 = "#70ACC7";
const highlight3 = "#F28283";
const highlight4 = "#33ad54";

// Common formula constants
const PYTHAGOREAN_FORMULA =
  "<span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup></span>";
const PYTHAGOREAN_QUESTION =
  "Is <span>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup> ?</span>";
const PYTHAGOREAN_FORMULA_PQR =
  "<span>r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup></span>";
const PYTHAGOREAN_FORMULA_PQR_OPTION =
  "r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup>";

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
          "Car A travels 540 km using 36 litres of fuel. Car B runs the same route and maintains the same fuel efficiency (same ratio of distance to fuel). If car B uses 28.5 litres, how far does it travel?",
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
            "Let’s find distance travelled by car B using cross-multiplication method.",
        },
        page2: {
          highlights: [
            {
              text: "Car A travels 540 km using 36 litres of fuel",
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
                text: "Car A – Distance : Fuel = 540 km : 36 L",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [],
          },
        },
        page3: {
          highlights: [
            {
              text: "Car A travels 540 km using 36 litres of fuel",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "maintains the same fuel efficiency (same ratio of distance to fuel)",
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
                text: "Car A – Distance : Fuel = 540 km : 36 L",
                color: highlight1,
              },
              {
                text: "Car B has the same distance to fuel ratio",
                color: highlight2,
              },
            ],
            values: [],
            toFind: [],
          },
        },
        page4: {
          highlights: [
            {
              text: "Car A travels 540 km using 36 litres of fuel",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "maintains the same fuel efficiency (same ratio of distance to fuel)",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "car B uses 28.5 litres",
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
                text: "Car A – Distance : Fuel = 540 km : 36 L",
                color: highlight1,
              },
              {
                text: "Car B has the same distance to fuel ratio",
                color: highlight2,
              },
              {
                text: "Car B uses 28.5 L of fuel",
                color: highlight3,
              },
            ],
            values: [],
            toFind: [],
          },
        },
        page5: {
          highlights: [
            {
              text: "Car A travels 540 km using 36 litres of fuel",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "maintains the same fuel efficiency (same ratio of distance to fuel)",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "car B uses 28.5 litres",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "how far does it travel",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Car A – Distance : Fuel = 540 km : 36 L",
                color: highlight1,
              },
              {
                text: "Car B has the same distance to fuel ratio",
                color: highlight2,
              },
              {
                text: "Car B uses 28.5 L of fuel",
                color: highlight3,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Distance travelled by car B to match efficiency of car A",
                color: highlight4,
              },
            ],
          },
        },
        page6: {
          highlights: [
            {
              text: "Car A travels 540 km using 36 litres of fuel",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "maintains the same fuel efficiency (same ratio of distance to fuel)",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "car B uses 28.5 litres",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "how far does it travel",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          questionTable: {
            headers: ["Distance<br/>(km)", "Fuel<br/>(litres)"],
            rows: [
              ["p", "q"],
              ["r", "s"],
            ],
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText:
              "If two ratios of distance to fuel given in the table are proportional, then - ",
            imageText: "",
            options: [
              {
                text: "\\frac{p}{s} = \\frac{r}{q}",
                iscorrect: false,
                feedback: "Not quite! Try again.",
              },
              {
                text: "\\frac{p}{s} = \\frac{q}{r}",
                iscorrect: false,
                feedback: "Not quite! Try again.",
              },
              {
                text: "\\frac{p}{q} = \\frac{r}{s}",
                iscorrect: true,
                feedback: "Great Job!",
              },
              {
                text: "\\frac{p}{q} = \\frac{s}{r}",
                iscorrect: false,
                feedback: "Not quite! Try again.",
              },
            ],
            keyConcepts: [
              {
                text: "If\\; p : q\\; \\text{ is proportional to }\\; r : s,\\; \\text{ then }\\; \\frac{p}{q} = \\frac{r}{s}",
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
            keyConcepts: [],
            impFormulae: [],
          },
        },
        page7: {
          highlights: [
            {
              text: "Car A travels 540 km using 36 litres of fuel",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "maintains the same fuel efficiency (same ratio of distance to fuel)",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "car B uses 28.5 litres",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "how far does it travel",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading:
            "Let’s assume the distance travelled by car B as ‘x’ km.",
          questionTable: {
            headers: ["Cars", "Distance<br/>(km)", "Fuel<br/>(litres)"],
            rows: [
              ["A", "540", "36"],
              ["B", "X", "28.5"],
            ],
          },
          instructionText:
            "Since car A and car B have same ratio of  \n distance to fuel, \\frac{540 km}{36 L} = \\frac{x\\;km}{28.5 L}",
          // quizPanel: {
          //   quiz: {
          //     mcqType: "MCQ",
          //     qti4Subtype: "QT4",
          //     emptyFeedback:
          //       "In simplest form, both terms of ratio do not have any common factor other than 1.",
          //   },
          //   headerText: "",
          //   questionText:
          //     "If two ratios of distance to fuel given in the table are proportional, then - ",
          //   imageText: "",
          //   options: [
          //     {
          //       text: "\\frac{p}{s} = \\frac{r}{q}",
          //       iscorrect: false,
          //       feedback: "Not quite! Try again.",
          //     },
          //     {
          //       text: "\\frac{p}{s} = \\frac{q}{r}",
          //       iscorrect: false,
          //       feedback: "Not quite! Try again.",
          //     },
          //     {
          //       text: "\\frac{p}{q} = \\frac{r}{s}",
          //       iscorrect: true,
          //       feedback: "Great Job!",
          //     },
          //     {
          //       text: "\\frac{p}{q} = \\frac{s}{r}",
          //       iscorrect: false,
          //       feedback: "Not quite! Try again.",
          //     },
          //   ],
          //   keyConcepts: [
          //     {
          //       text: "If\\; p : q\\; \\text{ is proportional to }\\; r : s,\\; \\text{ then }\\; \\frac{p}{q} = \\frac{r}{s}",
          //       color: highlight4,
          //     },
          //   ],
          //   impFormulae: [
          //     {
          //       text: "",
          //       color: highlight1,
          //     },
          //   ],
          // },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "If\\; p : q\\; \\text{ is proportional to }\\; r : s,\\; \\text{ then }\\; \\frac{p}{q} = \\frac{r}{s}",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page8: {
          highlights: [
            {
              text: "Car A travels 540 km using 36 litres of fuel",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "maintains the same fuel efficiency (same ratio of distance to fuel)",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "car B uses 28.5 litres",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "how far does it travel",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          // tableHeading:
          //   "Let’s assume the distance travelled by car B as ‘x’ km.",
          // questionTable: {
          //   headers: ["Cars", "Distance<br/>(km)", "Fuel<br/>(litres)"],
          //   rows: [
          //     ["A", "540", "36"],
          //     ["B", "X", "28.5"],
          //   ],
          // },
          instructionText: "\\frac{540\\;km}{36\\;L} = \\frac{x\\;km}{28.5L}",
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4R",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText:
              "If two ratios of distance to fuel given in the table are proportional, then - ",
            imageText: "",
            options: [
              {
                text: "540 × 36 = x × 28.5",
                iscorrect: false,
                feedback: "Not quite! Try again.",
              },
              {
                text: "540 × 28.5 = x × 36",
                iscorrect: true,
                feedback: "Great Job!",
              },
              {
                text: "540 × x = 28.5 × 36",
                iscorrect: false,
                feedback: "Not quite! Try again.",
              },
              {
                text: "540 × x = 28.5 × 36",
                iscorrect: false,
                feedback: "Not quite! Try again.",
              },
            ],
            keyConcepts: [
              {
                text: "If\\; p : q\\; \\text{ is proportional to }\\; r : s,\\; \\text{ then }\\; \\frac{p}{q} = \\frac{r}{s}",
                color: highlight4,
              },
              {
                text: "\\frac{540\\;km}{36\\;L} = \\frac{x\\;km}{28.5\\;L}",
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
                text: "If\\; p : q\\; \\text{ is proportional to }\\; r : s,\\; \\text{ then }\\; \\frac{p}{q} = \\frac{r}{s}",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page9: {
          highlights: [
            {
              text: "Car A travels 540 km using 36 litres of fuel",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "maintains the same fuel efficiency (same ratio of distance to fuel)",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "car B uses 28.5 litres",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "how far does it travel",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          // tableHeading:
          //   "Let’s assume the distance travelled by car B as ‘x’ km.",
          // questionTable: {
          //   headers: ["Cars", "Distance<br/>(km)", "Fuel<br/>(litres)"],
          //   rows: [
          //     ["A", "540", "36"],
          //     ["B", "X", "28.5"],
          //   ],
          // },
          instructionText: "540 × 28.5 = x × 36\n x = \\frac{540 × 28.5}{36}",
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4R",
              emptyFeedback:
                "In simplest form, both terms of ratio do not have any common factor other than 1.",
            },
            headerText: "",
            questionText: "Calculate x.",
            imageText: "",
            options: [
              {
                text: "x = 4275 km",
                iscorrect: false,
                feedback: "You forgot to include the decimal point.",
              },
              {
                text: "x = 540 km",
                iscorrect: false,
                feedback: " That’s not right! Try again!",
              },
              {
                text: "x = 285 km ",
                iscorrect: false,
                feedback: " That’s not right! Try again!",
              },
              {
                text: "x = 427.5 km",
                iscorrect: true,
                feedback: "Great Job!",
              },
            ],
            keyConcepts: [
              {
                text: "540 × 28.5 = x × 36\\; x = \\frac{540 × 28.5}{36}",
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
                text: "If\\; p : q\\; \\text{ is proportional to }\\; r : s,\\; \\text{ then }\\; \\frac{p}{q} = \\frac{r}{s}",
                color: highlight4,
              },
              {
                text: "\\frac{540\\;km}{36\\;L} = \\frac{x\\;km}{28.5\\;L}",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
        page10: {
          highlights: [
            {
              text: "Car A travels 540 km using 36 litres of fuel",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "maintains the same fuel efficiency (same ratio of distance to fuel)",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "car B uses 28.5 litres",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "how far does it travel",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["Cars", "Distance<br/>(km)", "Fuel<br/>(litres)"],
            rows: [
              ["A", "540", "36"],
              ["B", "X", "28.5"],
            ],
          },
          instructionText:
            "Keeping the same ratio of distance to fuel, car B can travel 427.5 km in 28.5 litres of fuel.",
          activityCompleted: "Activity completed!",
          // quizPanel: {
          //   quiz: {
          //     mcqType: "MCQ",
          //     qti4Subtype: "QT4",
          //     emptyFeedback:
          //       "In simplest form, both terms of ratio do not have any common factor other than 1.",
          //   },
          //   headerText: "",
          //   questionText:
          //     "If two ratios of distance to fuel given in the table are proportional, then - ",
          //   imageText: "",
          //   options: [
          //     {
          //       text: "\\frac{p}{s} = \\frac{r}{q}",
          //       iscorrect: false,
          //       feedback: "Not quite! Try again.",
          //     },
          //     {
          //       text: "\\frac{p}{s} = \\frac{q}{r}",
          //       iscorrect: false,
          //       feedback: "Not quite! Try again.",
          //     },
          //     {
          //       text: "\\frac{p}{q} = \\frac{r}{s}",
          //       iscorrect: true,
          //       feedback: "Great Job!",
          //     },
          //     {
          //       text: "\\frac{p}{q} = \\frac{s}{r}",
          //       iscorrect: false,
          //       feedback: "Not quite! Try again.",
          //     },
          //   ],
          //   keyConcepts: [
          //     {
          //       text: "If\\; p : q\\; \\text{ is proportional to }\\; r : s,\\; \\text{ then }\\; \\frac{p}{q} = \\frac{r}{s}",
          //       color: highlight4,
          //     },
          //   ],
          //   impFormulae: [
          //     {
          //       text: "",
          //       color: highlight1,
          //     },
          //   ],
          // },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "If\\; p : q\\; \\text{ is proportional to }\\; r : s,\\; \\text{ then }\\; \\frac{p}{q} = \\frac{r}{s}",
                color: highlight4,
              },
              {
                text: "\\frac{540\\;km}{36\\;L} = \\frac{x\\;km}{28.5\\;L}",
                color: highlight4,
              },
              {
                text: "540 × 28.5 = x × 36\\; x = \\frac{540 × 28.5}{36}",
                color: highlight4,
              },
              {
                text: "x  = 427.5 km",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },
      },
    },

    id: {
      appInfo: {
        title: "Applet Pembelajaran Matematika Interaktif",
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Lagi",
      },

      common: {
        questionIcon: "P",
        rollerCoasterLabel: "Klub Sains",
        merryGoRoundLabel: "Klub Seni",
        ratioSeparator: ":",
        questionText:
          "Mobil A menempuh 540 km menggunakan 36 liter bahan bakar. Mobil B menempuh rute yang sama dan mempertahankan efisiensi bahan bakar yang sama (rasio jarak terhadap bahan bakar). Jika mobil B menggunakan 28.5 liter, berapa jauhkah ia menempuh perjalanan?",
        labels: {
          a: "a = ",
          b: "b = ",
          c: "c = ",
          dropHere: "Letakkan di sini",
        },
        informationAnalysis: {
          header: "ANALISIS INFORMASI",
          facts: "Fakta",
          values: "Nilai",
          toFind: "Dicari",
        },
        tableHeaders: {
          quantity: "Kuantitas",
          coffee: "Kopi (dalam sdt)",
          sugar: "Gula (dalam sdt)",
        },
        conceptSummary: {
          header: "RINGKASAN KONSEP",
          given: "Diketahui",
          toFind: "Dicari",
          keyConcepts: "Konsep Utama",
          importantFormulae: "Perhitungan",
        },
      },

      pages: {
        page1: {
          introduction:
            "Mari kita cari jarak yang ditempuh mobil B menggunakan metode perkalian silang.",
        },

        page2: {
          highlights: [
            {
              text: "Mobil A menempuh 540 km menggunakan 36 liter bahan bakar",
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
                text: "Mobil A – Jarak : Bahan Bakar = 540 km : 36 L",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [],
          },
        },

        page3: {
          highlights: [
            {
              text: "Mobil A menempuh 540 km menggunakan 36 liter bahan bakar",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "mempertahankan efisiensi bahan bakar yang sama (rasio jarak terhadap bahan bakar)",
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
                text: "Mobil A – Jarak : Bahan Bakar = 540 km : 36 L",
                color: highlight1,
              },
              {
                text: "Mobil B memiliki rasio jarak terhadap bahan bakar yang sama",
                color: highlight2,
              },
            ],
            values: [],
            toFind: [],
          },
        },

        page4: {
          highlights: [
            {
              text: "Mobil A menempuh 540 km menggunakan 36 liter bahan bakar",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "mempertahankan efisiensi bahan bakar yang sama (rasio jarak terhadap bahan bakar)",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "mobil B menggunakan 28.5 liter",
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
                text: "Mobil A – Jarak : Bahan Bakar = 540 km : 36 L",
                color: highlight1,
              },
              {
                text: "Mobil B memiliki rasio jarak terhadap bahan bakar yang sama",
                color: highlight2,
              },
              {
                text: "Mobil B menggunakan 28.5 L bahan bakar",
                color: highlight3,
              },
            ],
            values: [],
            toFind: [],
          },
        },

        page5: {
          highlights: [
            {
              text: "Mobil A menempuh 540 km menggunakan 36 liter bahan bakar",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "mempertahankan efisiensi bahan bakar yang sama (rasio jarak terhadap bahan bakar)",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "mobil B menggunakan 28.5 liter",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "berapa jauh ia menempuh perjalanan",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Mobil A – Jarak : Bahan Bakar = 540 km : 36 L",
                color: highlight1,
              },
              {
                text: "Mobil B memiliki rasio jarak terhadap bahan bakar yang sama",
                color: highlight2,
              },
              {
                text: "Mobil B menggunakan 28.5 L bahan bakar",
                color: highlight3,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Jarak yang ditempuh mobil B untuk menyamai efisiensi mobil A",
                color: highlight4,
              },
            ],
          },
        },

        page6: {
          highlights: [
            {
              text: "Mobil A menempuh 540 km menggunakan 36 liter bahan bakar",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "mempertahankan efisiensi bahan bakar yang sama (rasio jarak terhadap bahan bakar)",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "mobil B menggunakan 28.5 liter",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "berapa jauh ia menempuh perjalanan",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          questionTable: {
            headers: ["Jarak<br/>(km)", "Bahan Bakar<br/>(liter)"],
            rows: [
              ["p", "q"],
              ["r", "s"],
            ],
          },
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4",
              emptyFeedback:
                "Dalam bentuk paling sederhana, kedua suku rasio tidak memiliki faktor persekutuan selain 1.",
            },
            headerText: "",
            questionText:
              "Jika dua rasio jarak terhadap bahan bakar dalam tabel tersebut saling proporsional, maka - ",
            imageText: "",
            options: [
              {
                text: "\\frac{p}{s} = \\frac{r}{q}",
                iscorrect: false,
                feedback: "Belum tepat! Coba lagi.",
              },
              {
                text: "\\frac{p}{s} = \\frac{q}{r}",
                iscorrect: false,
                feedback: "Belum tepat! Coba lagi.",
              },
              {
                text: "\\frac{p}{q} = \\frac{r}{s}",
                iscorrect: true,
                feedback: "Kerja bagus!",
              },
              {
                text: "\\frac{p}{q} = \\frac{s}{r}",
                iscorrect: false,
                feedback: "Belum tepat! Coba lagi.",
              },
            ],
            keyConcepts: [
              {
                text: "Jika\\; p : q\\; \\text{ berbanding lurus dengan }\\; r : s,\\; \\text{ maka }\\; \\frac{p}{q} = \\frac{r}{s}",
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
            keyConcepts: [],
            impFormulae: [],
          },
        },

        page7: {
          highlights: [
            {
              text: "Mobil A menempuh 540 km menggunakan 36 liter bahan bakar",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "mempertahankan efisiensi bahan bakar yang sama (rasio jarak terhadap bahan bakar)",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "mobil B menggunakan 28.5 liter",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "berapa jauh ia menempuh perjalanan",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading:
            "Mari kita anggap jarak yang ditempuh mobil B adalah ‘x’ km.",
          questionTable: {
            headers: ["Mobil", "Jarak<br/>(km)", "Bahan Bakar<br/>(liter)"],
            rows: [
              ["A", "540", "36"],
              ["B", "X", "28.5"],
            ],
          },
          instructionText:
            "Karena mobil A dan mobil B memiliki rasio jarak terhadap bahan bakar yang sama,\n jarak terhadap bahan bakar, \\frac{540 km}{36 L} = \\frac{x\\;km}{28.5 L}",
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "Jika\\; p : q\\; \\text{ berbanding lurus dengan }\\; r : s,\\; \\text{ maka }\\; \\frac{p}{q} = \\frac{r}{s}",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },

        page8: {
          highlights: [
            {
              text: "Mobil A menempuh 540 km menggunakan 36 liter bahan bakar",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "mempertahankan efisiensi bahan bakar yang sama (rasio jarak terhadap bahan bakar)",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "mobil B menggunakan 28.5 liter",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "berapa jauh ia menempuh perjalanan",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          instructionText: "\\frac{540\\;km}{36\\;L} = \\frac{x\\;km}{28.5L}",
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4R",
              emptyFeedback:
                "Dalam bentuk paling sederhana, kedua suku rasio tidak memiliki faktor persekutuan selain 1.",
            },
            headerText: "",
            questionText:
              "Jika dua rasio jarak terhadap bahan bakar dalam tabel tersebut saling proporsional, maka - ",
            imageText: "",
            options: [
              {
                text: "540 × 36 = x × 28.5",
                iscorrect: false,
                feedback: "Belum tepat! Coba lagi.",
              },
              {
                text: "540 × 28.5 = x × 36",
                iscorrect: true,
                feedback: "Kerja bagus!",
              },
              {
                text: "540 × x = 28.5 × 36",
                iscorrect: false,
                feedback: "Belum tepat! Coba lagi.",
              },
              {
                text: "540 × x = 28.5 × 36",
                iscorrect: false,
                feedback: "Belum tepat! Coba lagi.",
              },
            ],
            keyConcepts: [
              {
                text: "Jika\\; p : q\\; \\text{ berbanding lurus dengan }\\; r : s,\\; \\text{ maka }\\; \\frac{p}{q} = \\frac{r}{s}",
                color: highlight4,
              },
              {
                text: "\\frac{540\\;km}{36\\;L} = \\frac{x\\;km}{28.5\\;L}",
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
                text: "Jika\\; p : q\\; \\text{ berbanding lurus dengan }\\; r : s,\\; \\text{ maka }\\; \\frac{p}{q} = \\frac{r}{s}",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },

        page9: {
          highlights: [
            {
              text: "Mobil A menempuh 540 km menggunakan 36 liter bahan bakar",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "mempertahankan efisiensi bahan bakar yang sama (rasio jarak terhadap bahan bakar)",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "mobil B menggunakan 28.5 liter",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "berapa jauh ia menempuh perjalanan",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          instructionText: "540 × 28.5 = x × 36\n x = \\frac{540 × 28.5}{36}",
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT4R",
              emptyFeedback:
                "Dalam bentuk paling sederhana, kedua suku rasio tidak memiliki faktor persekutuan selain 1.",
            },
            headerText: "",
            questionText: "Hitung nilai x.",
            imageText: "",
            options: [
              {
                text: "x = 4275 km",
                iscorrect: false,
                feedback: "Kamu lupa memasukkan titik desimal.",
              },
              {
                text: "x = 540 km",
                iscorrect: false,
                feedback: "Belum tepat! Coba lagi!",
              },
              {
                text: "x = 285 km",
                iscorrect: false,
                feedback: "Belum tepat! Coba lagi!",
              },
              {
                text: "x = 427.5 km",
                iscorrect: true,
                feedback: "Kerja bagus!",
              },
            ],
            keyConcepts: [
              {
                text: "540 × 28.5 = x × 36\\; x = \\frac{540 × 28.5}{36}",
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
                text: "Jika\\; p : q\\; \\text{ berbanding lurus dengan }\\; r : s,\\; \\text{ maka }\\; \\frac{p}{q} = \\frac{r}{s}",
                color: highlight4,
              },
              {
                text: "\\frac{540\\;km}{36\\;L} = \\frac{x\\;km}{28.5\\;L}",
                color: highlight4,
              },
            ],
            impFormulae: [],
          },
        },

        page10: {
          highlights: [
            {
              text: "Mobil A menempuh 540 km menggunakan 36 liter bahan bakar",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "mempertahankan efisiensi bahan bakar yang sama (rasio jarak terhadap bahan bakar)",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "mobil B menggunakan 28.5 liter",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "berapa jauh ia menempuh perjalanan",
              highlightColor: highlight4,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          tableHeading: "",
          questionTable: {
            headers: ["Mobil", "Jarak<br/>(km)", "Bahan Bakar<br/>(liter)"],
            rows: [
              ["A", "540", "36"],
              ["B", "X", "28.5"],
            ],
          },
          instructionText:
            "Dengan mempertahankan rasio jarak terhadap bahan bakar, mobil B dapat menempuh 427.5 km dengan 28.5 liter bahan bakar.",
          activityCompleted: "Aktivitas selesai!",
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [
              {
                text: "Jika\\; p : q\\; \\text{ berbanding lurus dengan }\\; r : s,\\; \\text{ maka }\\; \\frac{p}{q} = \\frac{r}{s}",
                color: highlight4,
              },
              {
                text: "\\frac{540\\;km}{36\\;L} = \\frac{x\\;km}{28.5\\;L}",
                color: highlight4,
              },
              {
                text: "540 × 28.5 = x × 36\\; x = \\frac{540 × 28.5}{36}",
                color: highlight4,
              },
              {
                text: "x = 427.5 km",
                color: highlight4,
              },
            ],
            impFormulae: [],
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
