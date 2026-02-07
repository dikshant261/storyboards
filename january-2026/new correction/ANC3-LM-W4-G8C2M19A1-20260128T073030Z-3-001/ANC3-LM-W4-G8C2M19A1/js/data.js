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
                previousButtonPage1: "Dispatched page change event to page 1"
            },

            buttons: {
                next: "»",
                previous: "«",
                startOver: "Start Over"
            },

            common: {
                questionText: "The angle formed by the diagonal of a rectangle and its shortest side is 60°.<br>Determine the area of the rectangle if the length of the diagonal is 12 cm.",
                questionIcon: "Q",
                komangToLucas: "Komang to Lucas",
                tapAnimationAlt: "Tap",
                imageAlt: {
                    leftArrow: "Left Arrow"
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
                    highlights: [
                        { text: "rectangle", highlightColor: "#FFD700", fontColor: "#000000" }
                    ],
                    areaLabel: "Area = ?",
                    vertexLabels: {
                        A: "A",
                        B: "B",
                        C: "C",
                        D: "D"
                    },
                    instructionText: "Let's find the distance between the green car and the red car using the Pythagorean theorem.",
                    headerText: "Read the question and identify 'given' and 'to find'",
                    footerInstruction: "Tap » to identify 'given' information"
                },
                page2: {
                    highlights: [
                        { text: "diagonal of a rectangle", highlightColor: "#FFD700", fontColor: "#000000" },
                        { text: "its shortest side", highlightColor: "#FFD700", fontColor: "#000000" }
                    ],
                    vertexLabels: {
                        A: "A",
                        B: "B",
                        C: "C",
                        D: "D"
                    }
                },
                page3: {
                    highlights: [
                        { text: "diagonal of a rectangle", highlightColor: "#FFD700", fontColor: "#000000" },
                        { text: "its shortest side", highlightColor: "#FFD700", fontColor: "#000000" },
                        { text: "60°", highlightColor: "#FFD700", fontColor: "#000000" }
                    ],
                    vertexLabels: {
                        A: "A",
                        B: "B",
                        C: "C",
                        D: "D"
                    }
                },
                page4: {
                    highlights: [
                        { text: "diagonal of a rectangle", highlightColor: "#FFD700", fontColor: "#000000" },
                        { text: "its shortest side", highlightColor: "#FFD700", fontColor: "#000000" },
                        { text: "60°", highlightColor: "#FFD700", fontColor: "#000000" },
                        { text: "length of the diagonal is 12 cm.", highlightColor: "#FFD700", fontColor: "#000000" }
                    ],
                    diagonalLabel: "12 cm",
                    vertexLabels: {
                        A: "A",
                        B: "B",
                        C: "C",
                        D: "D"
                    },
                    instructionText: "Tap » to identify what we need 'to find'"
                },
                page5: {
                    highlights: [
                        { text: "Determine the area of the rectangle", highlightColor: "#F28283", fontColor: "#000000" }
                    ],
                    diagonalLabel: "12 cm",
                    vertexLabels: {
                        A: "A",
                        B: "B",
                        C: "C",
                        D: "D"
                    },
                    instructionText: "Tap » to identify what we need 'to find'"
                },
                page6: {
                    headerText: "Find the area of the rectangle",
                    quizHeader: "FIND THE AREA OF THE RECTANGLE",
                    quizQuestion: "Which of the following is the correct formula of area of rectangle?",
                    diagonalLabel: "12 cm",
                    vertexLabels: {
                        A: "A",
                        B: "B",
                        C: "C",
                        D: "D"
                    },
                    quizOptions: {
                        correct: {
                            text: "A = length x breadth",
                            feedback: "Correct!"
                        },
                        distractor1: {
                            text: "A = length + breadth",
                            feedback: "Try Again!"
                        },
                        distractor2: {
                            text: "A = (length + breadth)²",
                            feedback: "Try Again!"
                        },
                        distractor3: {
                            text: "A = (length x breadth)²",
                            feedback: "Try Again!"
                        }
                    },
                    instructionText: "Select the correct formula for calculating the area",
                    instructionAfterQuiz: "Tap » to continue"
                },
                page7: {
                    headerText: 'Determine the <span style="color: #ffffff;">relationship between sides</span> for the triangle',
                    quizHeader: "",
                    quizQuestion: "What is the measure of ∠BDC?",
                    diagonalLabel: "12 cm",
                    vertexLabels: {
                        A: "A",
                        B: "B",
                        C: "C",
                        D: "D"
                    },
                    quizOptions: {
                        correct: {
                            text: "30°",
                            feedback: "Correct! The angles of triangle BDC add up to 180°, so the remaining angle is 30°."
                        },
                        distractor1: {
                            text: "60°",
                            feedback: "Not quite. The angles of triangle BDC add up to 180°."
                        },
                        distractor2: {
                            text: "45°",
                            feedback: "Not quite. The angles of triangle BDC add up to 180°."
                        },
                        distractor3: {
                            text: "75°",
                            feedback: "Not quite. The angles of triangle BDC add up to 180°."
                        }
                    },
                    instructionText: "Select the correct measure of ∠BDC",
                    instructionAfterQuiz: "Tap » to continue"
                },
                page9: {
                    headerText: "Determine the sides of a △",
                    quizQuestion: "∆ABC is a 30°-60°-90° right triangle. If a is the side opposite 30°, b is the side opposite 60°, and c is the hypotenuse, which of the following is / are correct?",
                    instructionText: "Choose the correct answer",
                    instructionAfterQuiz: "Tap » to continue",
                    quizOptions: {
                        correct: {
                            text: "a = 1 cm, b = √3 cm, c = 2 cm",
                            feedback: "Correct! In a 30°-60°-90° right triangle, the sides follow the ratio 1 : √3 : 2, where a (opposite 30°) = 1, b (opposite 60°) = √3, and c (hypotenuse) = 2."
                        },
                        distractor1: {
                            text: "a = 4√2 cm, b = 4 cm, c = 4 cm",
                            feedback: "Incorrect. This ratio does not match a 30°-60°-90° triangle. In a 30°-60°-90° triangle, the sides follow the ratio 1 : √3 : 2."
                        },
                        distractor2: {
                            text: "a = 6 cm, b = 6√3 cm, c = 12 cm",
                            feedback: "Correct! In a 30°-60°-90° right triangle, the sides follow the ratio 1 : √3 : 2. Here, a = 6, b = 6√3, and c = 12, which maintains the correct ratio (6 : 6√3 : 12 = 1 : √3 : 2)."
                        },
                        distractor3: {
                            text: "a = 10 cm, b = 10 cm, c = 6√2 cm",
                            feedback: "Incorrect. This ratio (a = b) suggests an isosceles right triangle (45°-45°-90°), not a 30°-60°-90° triangle. In a 30°-60°-90° triangle, the sides follow the ratio 1 : √3 : 2."
                        }
                    },
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['c', 'a', 'b']
                    },
                    angleLabels: ['30°', '60°', '90°']
                },
                page10: {
                    headerText: 'Let us find the length of the <span style="color: #ffffff;">sides of the △</span>',
                    triangleLabels: {
                        vertexLabels: ['D', 'B', 'C'],
                        sideLabels: ['c = 12 cm', 'a', 'b']
                    },
                    angleLabels: ['30°', '60°', '90°'],
                    tableHeaders: [
                        '<span style="color: #FF6600;">a</span>',
                        '<span style="color: #00FF7F;">b</span>',
                        '<span style="color: #4A90E2;">c</span>'
                    ],
                    tableRows: [
                        ['<span style="color: #FF6600;">1</span>', '<span style="color: #00FF7F;">$\\sqrt{2}$</span>', '<span style="color: #4A90E2;">2</span>'],
                        ['<span style="color: #FF6600;">a</span>', '<span style="color: #00FF7F;">b</span>', '<span style="color: #4A90E2;">12</span>']
                    ],
                    xText: "x",
                    fillBlanks: {
                        instructionText: "Choose the correct multiplying factor to find the length of the sides",
                        options: [
                            { id: "opt1", text: "6", image: "", blankID: [{ bid: "blank1", text: "6" }, { bid: "blank2", text: "6" }, { bid: "blank3", text: "6$\\sqrt{3}$" }], feedbackText: "Correct!" },
                            { id: "opt2", text: "12", image: "", blankID: null, feedbackText: "Incorrect. " },
                            { id: "opt3", text: "2", image: "", blankID: null, feedbackText: "Incorrect.  " },
                            { id: "opt4", text: "$\\sqrt{3}$", image: "", blankID: null, feedbackText: "Incorrect." }
                        ],
                        impFormulae: []
                    },
                    footerInstruction: "Choose the correct answer to find the length of the sides"
                },
                page11: {
                    headerText: "Find the area of the rectangle",
                    diagonalLabel: "12 cm",
                    sideLabels: {
                        BC: "6 cm",
                        CD: "6$\\sqrt{3}$ cm"
                    },
                    vertexLabels: {
                        A: "A",
                        B: "B",
                        C: "C",
                        D: "D"
                    },
                    instructionText: "Click on the highlighted button to find the area of the rectangle",
                    instructionAfterQuiz: "Tap » to summarise",
                    calculationSteps: {
                        headerText: "Solution Steps",
                        steps: [
                            {
                                type: "formula",
                                text: "Area of the rectangle = Length × Breadth",
                                buttonText: "Substitute the values"
                            },
                            {
                                type: "calculation",
                                explainer: "As calculated : BC = 6 and CD = $\\sqrt{3}$",
                                text: "Area = BC × CD<br>Area = 6 × 6$\\sqrt{3}$<br>Area = 36$\\sqrt{3}$",
                                buttonText: "Calculate numerical value"
                            },
                            {
                                type: "calculation",
                                explainer: "Substitute  = 1.73",
                                text: "Area = 36 × 1.73<br>Area = 62.28",
                                buttonText: "Show final answer"
                            },
                            {
                                type: "answer",
                                explainer: "Final result",
                                text: "Area = 62.28 cm²<br>(approximately 62.3 cm²)",
                                buttonText: null
                            }
                        ]
                    }
                },
                page12: {
                    headerText: "Let us summarise",
                    diagonalLabel: "12 cm",
                    sideLabels: {
                        BC: "6 cm",
                        CD: "6√3 cm"
                    },
                    vertexLabels: {
                        A: "A",
                        B: "B",
                        C: "C",
                        D: "D"
                    },
                    feedbackTextbox: {
                        text: "The problem gives a rectangle with a <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">12 cm</span> diagonal that makes a <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">60°</span> angle with the shorter side.<br><br>We split the rectangle into two right triangles and used right-triangle properties to determine the<br>rectangle's side lengths: <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">6 cm</span> and <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">6√3 cm</span>.<br><br>Multiplying these gives the area:<br>Area = 36√3 ≈ <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">62.3 cm²</span><br><br>👍 The area of the rectangle is approximately <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">62.3 cm²</span>."
                    },
                    footerInstruction: "Tap » to start over"
                },
                page16: {
                    placeholderText: "Page 16 - Content to be implemented"
                },
            },
        },

        // ✅ Indonesian (id) — for the CAR / BUILDING (Pythagoras) set
        id: {
            appInfo: {
                title: "Rasio - Perbandingan Jarak Komodo"
            },
            messages: {
                pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
                nextButtonPage2: "Mengirimkan event perubahan halaman ke halaman 2",
                previousButtonPage1: "Mengirimkan event perubahan halaman ke halaman 1"
            },

            buttons: {
                next: "»",
                previous: "«",
                startOver: "Mulai Ulang"
            },

            common: {
                questionText: "Sudut yang dibentuk oleh diagonal persegi panjang dan sisi terpendeknya adalah 60°.<br>Tentukan luas persegi panjang jika panjang diagonalnya adalah 12 cm.",
                questionIcon: "Q",
                komangToLucas: "Komang ke Lucas",
                tapAnimationAlt: "Ketuk",
                imageAlt: {
                    leftArrow: "Panah Kiri"
                },
                labels: {
                    dropHere: "Letakkan di sini"
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
                    highlights: [
                        { text: "persegi panjang", highlightColor: "#FFD700", fontColor: "#000000" }
                    ],
                    areaLabel: "Luas = ?",
                    vertexLabels: {
                        A: "A",
                        B: "B",
                        C: "C",
                        D: "D"
                    },
                    instructionText: "Mari kita temukan jarak antara mobil hijau dan mobil merah menggunakan teorema Pythagoras.",
                    headerText: "Baca pertanyaan dan identifikasi 'diketahui' dan 'yang dicari'",
                    footerInstruction: "Ketuk » untuk mengidentifikasi informasi 'diketahui'"
                },
                page2: {
                    highlights: [
                        { text: "diagonal persegi panjang", highlightColor: "#FFD700", fontColor: "#000000" },
                        { text: "sisi terpendeknya", highlightColor: "#FFD700", fontColor: "#000000" }
                    ],
                    vertexLabels: {
                        A: "A",
                        B: "B",
                        C: "C",
                        D: "D"
                    }
                },
                page3: {
                    highlights: [
                        { text: "diagonal persegi panjang", highlightColor: "#FFD700", fontColor: "#000000" },
                        { text: "sisi terpendeknya", highlightColor: "#FFD700", fontColor: "#000000" },
                        { text: "60°", highlightColor: "#FFD700", fontColor: "#000000" }
                    ],
                    vertexLabels: {
                        A: "A",
                        B: "B",
                        C: "C",
                        D: "D"
                    }
                },
                page4: {
                    highlights: [
                        { text: "diagonal persegi panjang", highlightColor: "#FFD700", fontColor: "#000000" },
                        { text: "sisi terpendeknya", highlightColor: "#FFD700", fontColor: "#000000" },
                        { text: "60°", highlightColor: "#FFD700", fontColor: "#000000" },
                        { text: "panjang diagonalnya adalah 12 cm.", highlightColor: "#FFD700", fontColor: "#000000" }
                    ],
                    diagonalLabel: "12 cm",
                    vertexLabels: {
                        A: "A",
                        B: "B",
                        C: "C",
                        D: "D"
                    },
                    instructionText: "Ketuk » untuk mengidentifikasi apa yang perlu kita 'cari'"
                },
                page5: {
                    highlights: [
                        { text: "Tentukan luas persegi panjang", highlightColor: "#F28283", fontColor: "#000000" }
                    ],
                    diagonalLabel: "12 cm",
                    vertexLabels: {
                        A: "A",
                        B: "B",
                        C: "C",
                        D: "D"
                    },
                    instructionText: "Ketuk » untuk mengidentifikasi apa yang perlu kita 'cari'"
                },
                page6: {
                    headerText: "Temukan luas persegi panjang",
                    quizHeader: "TEMUKAN LUAS PERSEGI PANJANG",
                    quizQuestion: "Berapakah luas persegi panjang yang diberikan?",
                    diagonalLabel: "12 cm",
                    vertexLabels: {
                        A: "A",
                        B: "B",
                        C: "C",
                        D: "D"
                    },
                    quizOptions: {
                        correct: {
                            text: "luas = panjang sisi yang lebih panjang × panjang sisi yang lebih pendek",
                            feedback: "Benar! Luas persegi panjang dihitung dengan mengalikan panjang sisi yang lebih panjang dengan panjang sisi yang lebih pendek."
                        },
                        distractor1: {
                            text: "luas = panjang diagonal × panjang sisi yang lebih pendek",
                            feedback: "Salah. Diagonal tidak digunakan langsung dalam rumus luas. Luas dihitung menggunakan dua sisi persegi panjang."
                        },
                        distractor2: {
                            text: "luas = panjang sisi yang lebih panjang + panjang sisi yang lebih pendek",
                            feedback: "Salah. Luas dihitung dengan perkalian, bukan penjumlahan. Luas persegi panjang adalah hasil kali panjang dan lebarnya."
                        },
                        distractor3: {
                            text: "luas = (panjang diagonal)² / 2",
                            feedback: "Salah. Rumus ini tidak digunakan untuk menghitung luas persegi panjang. Luas adalah hasil kali kedua sisinya."
                        }
                    },
                    instructionText: "Pilih rumus yang benar untuk menghitung luas",
                    instructionAfterQuiz: "Ketuk » untuk melanjutkan"
                },
                page7: {
                    headerText: 'Tentukan <span style="color: #ffffff;">hubungan antara sisi</span> untuk segitiga',
                    quizHeader: "",
                    quizQuestion: "Berapakah besar ∠BDC?",
                    diagonalLabel: "12 cm",
                    vertexLabels: {
                        A: "A",
                        B: "B",
                        C: "C",
                        D: "D"
                    },
                    quizOptions: {
                        correct: {
                            text: "30°",
                            feedback: "Benar! ∠BDC adalah sudut di titik sudut D antara titik B dan C. Pada persegi panjang yang diberikan dengan diagonal BD, sudut ini berukuran 30°."
                        },
                        distractor1: {
                            text: "60°",
                            feedback: "Salah. ∠BDC bukan 60°. Sudut di titik sudut D antara titik B dan C berukuran 30°."
                        },
                        distractor2: {
                            text: "45°",
                            feedback: "Salah. ∠BDC bukan 45°. Sudut di titik sudut D antara titik B dan C berukuran 30°."
                        },
                        distractor3: {
                            text: "75°",
                            feedback: "Salah. ∠BDC bukan 75°. Sudut di titik sudut D antara titik B dan C berukuran 30°."
                        }
                    },
                    instructionText: "Pilih besar sudut ∠BDC yang benar",
                    instructionAfterQuiz: "Ketuk » untuk melanjutkan"
                },
                page9: {
                    headerText: "Tentukan sisi-sisi △",
                    quizQuestion: "∆ABC adalah segitiga siku-siku 30°-60°-90°. Jika a adalah sisi yang berhadapan dengan 30°, b adalah sisi yang berhadapan dengan 60°, dan c adalah sisi miring, manakah dari berikut ini yang benar?",
                    instructionText: "Pilih jawaban yang benar",
                    instructionAfterQuiz: "Ketuk » untuk melanjutkan",
                    quizOptions: {
                        correct: {
                            text: "a = 1 cm, b = √3 cm, c = 2 cm",
                            feedback: "Benar! Pada segitiga siku-siku 30°-60°-90°, sisi-sisinya mengikuti rasio 1 : √3 : 2, di mana a (berhadapan dengan 30°) = 1, b (berhadapan dengan 60°) = √3, dan c (sisi miring) = 2."
                        },
                        distractor1: {
                            text: "a = 4√2 cm, b = 4 cm, c = 4 cm",
                            feedback: "Salah. Rasio ini tidak sesuai dengan segitiga 30°-60°-90°. Pada segitiga 30°-60°-90°, sisi-sisinya mengikuti rasio 1 : √3 : 2."
                        },
                        distractor2: {
                            text: "a = 6 cm, b = 6√3 cm, c = 12 cm",
                            feedback: "Benar! Pada segitiga siku-siku 30°-60°-90°, sisi-sisinya mengikuti rasio 1 : √3 : 2. Di sini, a = 6, b = 6√3, dan c = 12, yang mempertahankan rasio yang benar (6 : 6√3 : 12 = 1 : √3 : 2)."
                        },
                        distractor3: {
                            text: "a = 10 cm, b = 10 cm, c = 6√2 cm",
                            feedback: "Salah. Rasio ini (a = b) menunjukkan segitiga siku-siku sama kaki (45°-45°-90°), bukan segitiga 30°-60°-90°. Pada segitiga 30°-60°-90°, sisi-sisinya mengikuti rasio 1 : √3 : 2."
                        }
                    },
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['c', 'a', 'b']
                    },
                    angleLabels: ['30°', '60°', '90°']
                },
                page10: {
                    headerText: 'Mari kita temukan panjang <span style="color: #ffffff;">sisi-sisi △</span>',
                    triangleLabels: {
                        vertexLabels: ['D', 'B', 'C'],
                        sideLabels: ['c = 12 cm', 'a = x', 'b']
                    },
                    angleLabels: ['30°', '60°', '90°'],
                    tableHeaders: [
                        '<span style="color: #FF6600;">a</span>',
                        '<span style="color: #00FF7F;">b</span>',
                        '<span style="color: #4A90E2;">c</span>'
                    ],
                    tableRows: [
                        ['<span style="color: #FF6600;">1</span>', '<span style="color: #00FF7F;">√3</span>', '<span style="color: #4A90E2;">2</span>'],
                        ['<span style="color: #FF6600;">a</span>', '<span style="color: #00FF7F;">b</span>', '<span style="color: #4A90E2;">12</span>']
                    ],
                    xText: "x",
                    fillBlanks: {
                        instructionText: "Pilih faktor pengali yang benar untuk menemukan panjang sisi-sisinya",
                        options: [
                            { id: "opt1", text: "6", image: "", blankID: [{ bid: "blank1", text: "6" }, { bid: "blank2", text: "6" }, { bid: "blank3", text: "6√3" }], feedbackText: "Benar! Faktor pengalinya adalah 6. Saat diterapkan: a = 1 × 6 = 6, b = √3 × 6 = 6√3, dan c = 2 × 6 = 12." },
                            { id: "opt2", text: "12", image: "", blankID: null, feedbackText: "Salah. Ini adalah nilai c, bukan faktor pengali. Faktor pengalinya adalah 6 (karena 2 × 6 = 12)." },
                            { id: "opt3", text: "2", image: "", blankID: null, feedbackText: "Salah. Ini adalah nilai rasio untuk c, bukan faktor pengali. Faktor pengalinya adalah 6 (karena 2 × 6 = 12)." },
                            { id: "opt4", text: "√3", image: "", blankID: null, feedbackText: "Salah. Ini adalah nilai rasio untuk b, bukan faktor pengali. Faktor pengalinya adalah 6 (karena 2 × 6 = 12)." }
                        ],
                        impFormulae: []
                    },
                    footerInstruction: "Pilih jawaban yang benar untuk menemukan panjang sisi-sisinya"
                },
                page11: {
                    headerText: "Temukan luas persegi panjang",
                    diagonalLabel: "12 cm",
                    sideLabels: {
                        BC: "6 cm",
                        CD: "6√3 cm"
                    },
                    vertexLabels: {
                        A: "A",
                        B: "B",
                        C: "C",
                        D: "D"
                    },
                    instructionText: "Klik pada tombol yang disorot untuk menemukan luas persegi panjang",
                    instructionAfterQuiz: "Ketuk » untuk merangkum",
                    calculationSteps: {
                        headerText: "Langkah-langkah Solusi",
                        steps: [
                            {
                                type: "formula",
                                text: "Luas persegi panjang = Panjang sisi yang lebih pendek × Panjang sisi yang lebih panjang",
                                buttonText: "Substitusikan nilainya"
                            },
                            {
                                type: "calculation",
                                explainer: "Seperti yang dihitung : BC = 6 dan CD = 6√3",
                                text: "Luas = BC × CD<br>Luas = 6 × 6√3<br>Luas = 36√3",
                                buttonText: "Hitung nilai numerik"
                            },
                            {
                                type: "calculation",
                                explainer: "Substitusikan √3 = 1.73",
                                text: "Luas = 36 × 1.73<br>Luas = 62.28",
                                buttonText: "Tampilkan jawaban akhir"
                            },
                            {
                                type: "answer",
                                explainer: "Hasil akhir",
                                text: "Luas = 62.28 cm²<br>(sekitar 62.3 cm²)",
                                buttonText: null
                            }
                        ]
                    }
                },
                page12: {
                    headerText: "Mari kita rangkum",
                    diagonalLabel: "12 cm",
                    sideLabels: {
                        BC: "6 cm",
                        CD: "6√3 cm"
                    },
                    vertexLabels: {
                        A: "A",
                        B: "B",
                        C: "C",
                        D: "D"
                    },
                    feedbackTextbox: {
                        text: "Masalah memberikan persegi panjang dengan diagonal <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">12 cm</span> yang membentuk sudut <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">60°</span> dengan sisi terpendek.<br><br>Kita membagi persegi panjang menjadi dua segitiga siku-siku dan menggunakan sifat-sifat segitiga siku-siku untuk menentukan<br>panjang sisi persegi panjang: <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">6 cm</span> dan <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">6√3 cm</span>.<br><br>Mengalikan ini memberikan luas:<br>Luas = 36√3 ≈ <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">62.3 cm²</span><br><br>👍 Luas persegi panjang adalah sekitar <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">62.3 cm²</span>."
                    },
                    footerInstruction: "Ketuk » untuk memulai ulang"
                },
                page16: {
                    placeholderText: "Halaman 16 - Konten akan diimplementasikan"
                },
            },
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
