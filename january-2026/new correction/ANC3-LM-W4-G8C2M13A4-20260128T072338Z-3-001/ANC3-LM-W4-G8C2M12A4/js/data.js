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
                questionText: "Putri loves plants and always notices beautiful gardens wherever she goes. One day, she saw the garden shown in the picture below and wanted to create a similar garden at her home.\nHer house has an empty space for a garden in the shape of a right triangle. Therefore, she wanted to check whether the garden she saw was also a right triangle. After measuring the sides of the garden, she found their lengths to be 4 meters, 5 meters, and 6 meters.",
                questionIcon: "Q",
                komangToLucas: "Komang to Lucas",
                tapAnimationAlt: "Tap",
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
                    footerInstruction: "Tap » to visualise the problem"
                },
                page2: {
                    headerText: "How to identify a Pythagoras triple",
                    footerInstruction: "Tap » to learn how to identify a Pythagoras triple",
                    highlights: [
                        {
                            text: "Komang's house is between Yohana's house and Lukas's house.",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: questionTextSize,
                            bold: true,
                            underline: false
                        }
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: "Komang's house is at the center.", size: '20gc', color: highlightColor1 }
                        ],
                        values: [
                        ],
                        toFind: [
                        ]
                    },
                    quizPanel: {
                        questionText: "Given that p, q, and r are Pythagoras triples<br>with p < q < r, choose the correct option.",
                        options: [
                            {
                                text: "p<sup>2</sup> = q<sup>2</sup> + r<sup>2</sup>",
                                feedback: "That's not right! Try again.",
                                iscorrect: false
                            },
                            {
                                text: "q<sup>2</sup> = p<sup>2</sup> − r<sup>2</sup>",
                                feedback: "That's not right! Try again.",
                                iscorrect: false
                            },
                            {
                                text: "r<sup>2</sup> = p<sup>2</sup> − q<sup>2</sup>",
                                feedback: "That's not right! Try again.",
                                iscorrect: false
                            },
                            {
                                text: "r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup>",
                                feedback: "Good!",
                                iscorrect: true
                            }
                        ]
                    },
                    stageComponent: {
                        headerText: "Let us visualise the question",
                        stages: [
                            {
                                image: 'assets/questionImage.png',
                                imageAlt: 'Question image',
                                buttonText: 'View the window frame',
                                descriptionText: 'Let us understand the problem step by step.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [],
                                    values: [],
                                    toFind: []
                                }
                            },
                            {
                                image: 'assets/visual1-en.png',
                                imageAlt: 'Window frame',
                                buttonText: 'Show window frame height',
                                descriptionText: 'We need to determine if the window frame is truly rectangular.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [],
                                    values: [],
                                    toFind: [
                                        { text: "Is the window frame truly rectangular?", size: '20gc', color: highlightColor3 }
                                    ]
                                }
                            },
                            {
                                image: 'assets/visual2-en.png',
                                imageAlt: 'Window frame with height',
                                buttonText: 'Show window frame length',
                                descriptionText: 'The height is given as 40.8 cm.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [
                                        { text: "Height = 40.8 cm", size: '20gc', color: highlightColor1 }
                                    ],
                                    values: [],
                                    toFind: [
                                        { text: "Is the window frame truly rectangular?", size: '20gc', color: highlightColor3 }
                                    ]
                                }
                            },
                            {
                                image: 'assets/visual3-en.png',
                                imageAlt: 'Window frame with length',
                                buttonText: 'Show window frame diagonal',
                                descriptionText: 'The length is given as 30.6 cm.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [
                                        { text: "Height = 40.8 cm", size: '20gc', color: highlightColor1 },
                                        { text: "Length = 30.6 cm", size: '20gc', color: highlightColor1 }
                                    ],
                                    values: [],
                                    toFind: [
                                        { text: "Is the window frame truly rectangular?", size: '20gc', color: highlightColor3 }
                                    ]
                                }
                            },
                            {
                                image: 'assets/visual4-en.png',
                                imageAlt: 'Window frame with diagonal',
                                buttonText: 'Visualize the shape',
                                descriptionText: 'One of its diagonals is given as 52.5 cm.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [
                                        { text: "Height = 40.8 cm", size: '20gc', color: highlightColor1 },
                                        { text: "Length = 30.6 cm", size: '20gc', color: highlightColor1 },
                                        { text: "Diagonal = 52.5 cm", size: '20gc', color: highlightColor2 }
                                    ],
                                    values: [],
                                    toFind: [
                                        { text: "Is the window frame truly rectangular?", size: '20gc', color: highlightColor3 }
                                    ]
                                }
                            },
                            {
                                image: 'assets/visual5-en.png',
                                imageAlt: 'Visualized shape',
                                buttonText: 'Simplify to triangle',
                                descriptionText: 'The shape formed by the sides and diagonal looks like a triangle.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [
                                        { text: "Height = 40.8 cm", size: '20gc', color: highlightColor1 },
                                        { text: "Length = 30.6 cm", size: '20gc', color: highlightColor1 },
                                        { text: "Diagonal = 52.5 cm", size: '20gc', color: highlightColor2 }
                                    ],
                                    values: [],
                                    toFind: [
                                        { text: "Is the window frame truly rectangular?", size: '20gc', color: highlightColor3 }
                                    ]
                                }
                            },
                            {
                                image: 'assets/visual6-en.png',
                                imageAlt: 'Simplified shape',
                                buttonText: null,
                                descriptionText: 'We can simplify this to a right triangle. To verify if it is truly rectangular, we check if the sides and diagonal form a right triangle using the Pythagoras theorem: a² + b² = c²',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [
                                        { text: "Height = 40.8 cm", size: '20gc', color: highlightColor1 },
                                        { text: "Length = 30.6 cm", size: '20gc', color: highlightColor1 },
                                        { text: "Diagonal = 52.5 cm", size: '20gc', color: highlightColor2 }
                                    ],
                                    values: [],
                                    toFind: [
                                        { text: "Is the window frame truly rectangular?", size: '20gc', color: highlightColor3 }
                                    ]
                                }
                            }
                        ]
                    }
                },
                page3: {
                    headerText: "Let us find the relationship between p and q",
                    footerInstruction: "Click on the highlighted button to see the solution steps",
                    instructionAfterQuiz: "Tap » to create a new Pythagoras triple",
                    highlights: [
                    ],
                    informationAnalysis: {
                        facts: [
                        ],
                        values: [
                        ],
                        toFind: [
                        ]
                    },
                    triangleLabels: {
                        vertexLabels: ['', '', ''],
                        sideLabels: ['(p + q)', 'p', '(p - q)']
                    },
                    calculationSteps: {
                        headerText: 'Solution Steps',
                        steps: [
                            {
                                type: 'formula',
                                text: 'Pythagoras\'s theorem: For a right triangle,<br>c² = a² + b², where c is the hypotenuse',
                                buttonText: 'Apply to our case'
                            },
                            {
                                explainer: 'For a Pythagoras triple: (p + q)² = p² + (p - q)²',
                                text: 'Since, (p+q) > p > (p-q)<br>(p+q) would be considered as the hypotenuse',
                                buttonText: 'Expand squares'
                            },
                            {
                                explainer: 'Expand (p + q)² and (p - q)² and Simplify',
                                text: 'p² + 2pq + q² = p² + p² - 2pq + q²<br>p² + 2pq + q² = 2p² - 2pq + q²<br>2pq = p² - 2pq<br>4pq = p²',
                                buttonText: 'Solve for p'
                            },
                            {
                                explainer: 'Relationship between p and q',
                                text: 'p = 4q'
                            }
                        ]
                    },
                    tableUpdates: {
                        step1: {
                            col1: '(p + q)²',
                            col2: 'p² + (p - q)²'
                        },
                        step2: {
                            r2: 'p² + 2pq + q²',
                            p2q2: 'p² + p² - 2pq + q²',
                            p2plusq2: '= 2p² - 2pq + q²'
                        },
                        step3: {
                            text: 'p = 4q'
                        }
                    }
                },
                page4: {
                    headerText: "Let us create a new Pythagoras triple using p = 12",
                    footerInstruction: "Click on the \"?\" to see the solution steps",
                    instructionAfterQuiz: "Tap » to verify the triple",
                    highlights: [
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: "Komang's house is at the center.", size: '20gc', color: highlightColor2 },
                            { text: "Komang to Yohana = $1 \\frac{1}{2}$ km", size: '20gc', color: highlightColor2 }
                        ],
                        values: [
                        ],
                        toFind: [
                        ]
                    },
                    triangleLabels: {
                        vertexLabels: ['', '', ''],
                        sideLabels: ['(p + q)', '(p - q)', 'p']
                    },
                    equationTexts: {
                        tripleLabel: 'Pythagoras triple : ',
                        pPlusQ: '<i>p</i> + q',
                        p: '<i>p</i>',
                        pMinusQ: '<i>p</i> - q',
                        comma: ',',
                        colon: ': ',
                        calculationText: '$p = 4q$ ⇒ $q = \\frac{p}{4}$<br>Substitute $p = 12$:<br>$q = \\frac{12}{4} = 3$<br>Hence using, $p = 12$ and $q = 3$',
                        summaryText: 'The Pythagoras triple formed with p = 12 : 9, 12, 15'
                    },
                    calculationSteps: {
                        headerText: 'Solution Steps',
                        steps: [
                            {
                                text: 'p = 7, q = 8, r = 12 (since 7 < 8 < 12)',
                                buttonText: 'Calculate squares'
                            },
                            {
                                explainer: 'Calculate p², q², and r²',
                                text: 'p² = 7² = 49, q² = 8² = 64, r² = 12² = 144<br>p² + q² = 49 + 64 = 113',
                                buttonText: 'Compare values'
                            },
                            {
                                explainer: 'Compare r² = 144 and p² + q² = 113',
                                text: 'Since 144 ≠ 113, we have r² ≠ p² + q²',
                                buttonText: 'See conclusion'
                            },
                            {
                                explainer: 'Conclusion',
                                text: '7, 8, 12 is NOT a Pythagoras triple'
                            }
                        ]
                    },
                    tableUpdates: {
                        step1: {
                            col1: 'r=12',
                            col2: 'p=7 and q = 8'
                        },
                        step2: {
                            r2: 'r² = 144',
                            p2q2: 'p²=49, q²=64',
                            p2plusq2: 'p²+q²=113'
                        },
                        step3: {
                            text: 'r² ≠ p² + q²'
                        }
                    }
                },
                page8: {
                    headerText: "Let us visualise the question",
                    footerInstruction: "Click on the highlighted button to see the solution steps",
                    instructionAfterQuiz: "Tap » to continue",
                    highlights: [],
                    informationAnalysis: {
                        facts: [],
                        values: [],
                        toFind: []
                    },
                    stageComponent: {
                        headerText: "Let us visualise the question",
                        stages: [
                            {
                                image: 'assets/questionImage.png',
                                imageAlt: 'Garden image',
                                buttonText: 'Identify the shape',
                                descriptionText: 'Putri found a beautiful garden and wants to create one like it at her home.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [],
                                    values: [],
                                    toFind: []
                                }
                            },
                            {
                                image: 'assets/visual1-en.png',
                                imageAlt: 'Garden as triangle',
                                buttonText: 'Add side lengths',
                                descriptionText: 'The garden is triangular in shape.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [],
                                    values: [],
                                    toFind: []
                                }
                            },
                            {
                                image: 'assets/visual2-en.png',
                                imageAlt: 'Garden with side lengths',
                                buttonText: 'Simplify the visual',
                                descriptionText: 'After measuring, the sides are 4 m, 5 m, and 6 m.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [
                                        { text: "Side 1 = 4 m", size: '20gc', color: highlightColor1 },
                                        { text: "Side 2 = 5 m", size: '20gc', color: highlightColor1 },
                                        { text: "Side 3 = 6 m", size: '20gc', color: highlightColor1 }
                                    ],
                                    values: [],
                                    toFind: [
                                        { text: "Is the garden a right triangle?", size: '20gc', color: highlightColor3 }
                                    ]
                                }
                            },
                            {
                                image: 'assets/visual3-en.png',
                                imageAlt: 'Garden verification',
                                buttonText: null,
                                descriptionText: 'To verify that it is a right triangle, we check whether the side lengths satisfy the <br/>Pythagoras theorem:<span style="color:black;background-color:yellow"> a² + b² = c²</span>',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [
                                        { text: "Side 1 = 4 m", size: '20gc', color: highlightColor1 },
                                        { text: "Side 2 = 5 m", size: '20gc', color: highlightColor1 },
                                        { text: "Side 3 = 6 m", size: '20gc', color: highlightColor1 }
                                    ],
                                    values: [],
                                    toFind: [
                                        { text: "Is the garden a right triangle?", size: '20gc', color: highlightColor3 }
                                    ]
                                }
                            }
                        ]
                    }
                },
                page5: {
                    headerText: "Let us verify that 4 m, 5 m, 6 m is a Pythagoras triple",
                    footerInstruction: "Click on the highlighted button to see the solution steps",
                    instructionAfterQuiz: "Tap » to summarise",
                    highlights: [
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: "Komang's house is at the center.", size: '20gc', color: highlightColor2 },
                            { text: "Komang to Yohana = $1 \\frac{1}{2}$ km", size: '20gc', color: highlightColor2 }
                        ],
                        values: [
                        ],
                        toFind: [
                        ]
                    },
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['6 m', '4 m', '5 m']
                    },
                    calculationSteps: {
                        headerText: 'Solution Steps',
                        steps: [
                            {
                                type: 'formula',
                                text: 'Pythagoras\'s theorem: For a right triangle,<br>c² = a² + b², where c is the hypotenuse',
                                buttonText: 'Apply to our case'
                            },
                            {
                                text: 'p = 4 m, q = 5 m, r = 6 m<br>(since 4 < 5 < 6)',
                                buttonText: 'Calculate squares'
                            },
                            {
                                explainer: 'Calculate p², q², and r²',
                                text: 'p² = 4² = 16, q² = 5² = 25<br>r² = 6² = 36<br>p² + q² = 16 + 25 = 41',
                                buttonText: 'Compare values'
                            },
                            {
                                explainer: 'Compare r² = 36 and p² + q² = 41',
                                text: 'Since 36 ≠ 41, we have r² ≠ p² + q²',
                                buttonText: 'See conclusion'
                            },
                            {
                                explainer: 'Conclusion',
                                text: '4 m, 5 m, 6 m is NOT a Pythagoras triple'
                            }
                        ]
                    },
                    tableUpdates: {
                        step1: {
                            col1: 'r = 6 m',
                            col2: 'p = 4 m and q = 5 m'
                        },
                        step2: {
                            r2: 'r² = 36',
                            p2q2: 'p² = 16, q² = 25',
                            p2plusq2: 'p² + q² = 41'
                        },
                        step3: {
                            text: 'r² ≠ p² + q²'
                        }
                    }
                },
                page6: {
                    headerText: "Let us explore the triple 8 cm, 15 cm, 17 cm",
                    footerInstruction: "Click on the highlighted button see the solution steps",
                    highlights: [
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: "Komang's house is at the center.", size: '20gc', color: highlightColor2 },
                            { text: "Komang to Yohana = $1 \\frac{1}{2}$ km", size: '20gc', color: highlightColor2 }
                        ],
                        values: [
                        ],
                        toFind: [
                        ]
                    },
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['? m', '? m', '? m']
                    },
                    calculationSteps: {
                        headerText: 'Solution Steps',
                        steps: [
                            {
                                text: 'p = 8, q = 15, r = 17 (since 8 < 15 < 17)',
                                buttonText: 'Calculate squares'
                            },
                            {
                                explainer: 'Calculate p², q², and r²',
                                text: 'p² = 8² = 64, q² = 15² = 225, r² = 17² = 289<br>p² + q² = 64 + 225 = 289',
                                buttonText: 'Compare values'
                            },
                            {
                                explainer: 'Compare r² = 289 and p² + q² = 289',
                                text: 'Since 289 = 289, we have r² = p² + q²',
                                buttonText: 'See conclusion'
                            },
                            {
                                explainer: 'Conclusion',
                                text: '8, 15, 17 IS a Pythagoras triple'
                            }
                        ]
                    },
                    tableUpdates: {
                        step1: {
                            col1: 'r=17',
                            col2: 'p=8 and q = 15'
                        },
                        step2: {
                            r2: 'r² = 289',
                            p2q2: 'p²=64, q²=225',
                            p2plusq2: 'p²+q²=289'
                        },
                        step3: {
                            text: 'r² = p² + q²'
                        }
                    }
                },
                page7: {
                    headerText: "Summary",
                    summaryText: "Based on our exploration:<br><br><div style=\"text-align: center; margin: 0 auto; width: fit-content;\">Putri found a triangular garden with sides measuring <br/>4 m, 5 m, and 6 m. She wanted to prove whether this garden is a right triangle.<br><br>We verified that 4² + 5² = 16 + 25 = 41 ≠ 36 = 6²<br><br>Therefore, <strong>the garden is NOT a right triangle</strong> because the sides 4 m, 5 m, and 6 m do not form a Pythagoras triple.</div>",
                    footerInstruction: "Tap » to start over",
                    highlights: [
                        {
                            text: "Therefore, the garden is NOT a right triangle because the sides<br/> 4 m, 5 m, and 6 m do not form a Pythagoras triple."
                        }
                    ]
                },
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
                questionText: "Putri sangat menyukai tanaman sehingga ketika dia pergi ke suatu tempat, dia selalu memperhatikan taman yang menurutnya indah. Putri melihat gambar taman di bawah ini dan ingin membuat taman seperti itu di rumahnya.<br><br>Rumahnya. Taman tersebut berbentuk segitiga, karena rumahnya memiliki ruang kosong untuk taman berbentuk segitiga siku-siku, jadi dia ingin membuktikan apakah taman di tempat yang ditemukannya juga merupakan segitiga siku-siku atau tidak. Setelah mengukur panjang sisi-sisi taman, hasilnya adalah 4 meter, 5 meter, dan 6 meter.",
                questionIcon: "Q",
                komangToLucas: "Komang ke Lucas",
                tapAnimationAlt: "Ketuk",
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
                    headerText: "Baca soal dan identifikasi 'diketahui' dan 'yang dicari'",
                    footerInstruction: "Tekan » untuk memvisualisasikan masalahnya"
                },

                page2: {
                    headerText: "Cara mengidentifikasi tripel Pythagoras",
                    footerInstruction: "Tekan » untuk mempelajari cara mengidentifikasi tripel Pythagoras",
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
                    quizPanel: {
                        questionText: "Diketahui bahwa p, q, dan r adalah tripel Pythagoras<br>dengan p < q < r, pilih opsi yang benar.",
                        options: [
                            {
                                text: "p<sup>2</sup> = q<sup>2</sup> + r<sup>2</sup>",
                                feedback: "Itu tidak benar! Coba lagi.",
                                iscorrect: false
                            },
                            {
                                text: "q<sup>2</sup> = p<sup>2</sup> - r<sup>2</sup>",
                                feedback: "Itu tidak benar! Coba lagi.",
                                iscorrect: false
                            },
                            {
                                text: "r<sup>2</sup> = p<sup>2</sup> - q<sup>2</sup>",
                                feedback: "Itu tidak benar! Coba lagi.",
                                iscorrect: false
                            },
                            {
                                text: "r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup>",
                                feedback: "Bagus!",
                                iscorrect: true
                            }
                        ]
                    },
                    stageComponent: {
                        headerText: "Mari kita visualisasikan soal",
                        stages: [
                            {
                                image: 'assets/questionImage.png',
                                imageAlt: 'Gambar soal',
                                buttonText: 'Lihat bingkai jendela',
                                descriptionText: 'Mari kita pahami masalahnya langkah demi langkah.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [],
                                    values: [],
                                    toFind: []
                                }
                            },
                            {
                                image: 'assets/visual1-id.png',
                                imageAlt: 'Bingkai jendela',
                                buttonText: 'Tampilkan tinggi',
                                descriptionText: 'Kita perlu mencari tahu apakah bingkai jendela ini berbentuk persegi panjang.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [],
                                    values: [],
                                    toFind: [
                                        { text: "Apakah bingkai jendela benar-benar persegi panjang?", size: "20gc", color: highlightColor3 }
                                    ]
                                }
                            },
                            {
                                image: 'assets/visual2-id.png',
                                imageAlt: 'Bingkai jendela dengan tinggi',
                                buttonText: 'Tampilkan panjang',
                                descriptionText: 'Tinggi diberikan sebagai 40,8 cm.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [
                                        { text: "Tinggi = 40,8 cm", size: "20gc", color: highlightColor1 }
                                    ],
                                    values: [],
                                    toFind: [
                                        { text: "Apakah bingkai jendela benar-benar persegi panjang?", size: "20gc", color: highlightColor3 }
                                    ]
                                }
                            },
                            {
                                image: 'assets/visual3-id.png',
                                imageAlt: 'Bingkai jendela dengan panjang',
                                buttonText: 'Tampilkan diagonal',
                                descriptionText: 'Panjang diberikan sebagai 30,6 cm.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [
                                        { text: "Tinggi = 40,8 cm", size: "20gc", color: highlightColor1 },
                                        { text: "Panjang = 30,6 cm", size: "20gc", color: highlightColor1 }
                                    ],
                                    values: [],
                                    toFind: [
                                        { text: "Apakah bingkai jendela benar-benar persegi panjang?", size: "20gc", color: highlightColor3 }
                                    ]
                                }
                            },
                            {
                                image: 'assets/visual3-id.png',
                                imageAlt: 'Bingkai jendela dengan diagonal',
                                buttonText: 'Visualisasikan bentuk',
                                descriptionText: 'Salah satu diagonalnya diberikan sebagai 52,5 cm.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [
                                        { text: "Tinggi = 40,8 cm", size: "20gc", color: highlightColor1 },
                                        { text: "Panjang = 30,6 cm", size: "20gc", color: highlightColor1 },
                                        { text: "Diagonal = 52,5 cm", size: "20gc", color: highlightColor2 }
                                    ],
                                    values: [],
                                    toFind: [
                                        { text: "Apakah bingkai jendela benar-benar persegi panjang?", size: "20gc", color: highlightColor3 }
                                    ]
                                }
                            },
                            {
                                image: 'assets/visual4-id.png',
                                imageAlt: 'Bingkai jendela dengan diagonal',
                                buttonText: 'Visualisasikan bentuk',
                                descriptionText: 'Salah satu diagonalnya diberikan sebagai 52,5 cm.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [
                                        { text: "Tinggi = 40,8 cm", size: "20gc", color: highlightColor1 },
                                        { text: "Panjang = 30,6 cm", size: "20gc", color: highlightColor1 },
                                        { text: "Diagonal = 52,5 cm", size: "20gc", color: highlightColor2 }
                                    ],
                                    values: [],
                                    toFind: [
                                        { text: "Apakah bingkai jendela benar-benar persegi panjang?", size: "20gc", color: highlightColor3 }
                                    ]
                                }
                            },
                            {
                                image: 'assets/visual5-id.png',
                                imageAlt: 'Bentuk yang divisualisasikan',
                                buttonText: 'Sederhanakan menjadi segitiga',
                                descriptionText: 'Bentuk yang dibentuk oleh sisi-sisi dan diagonal terlihat seperti segitiga.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [
                                        { text: "Tinggi = 40,8 cm", size: "20gc", color: highlightColor1 },
                                        { text: "Panjang = 30,6 cm", size: "20gc", color: highlightColor1 },
                                        { text: "Diagonal = 52,5 cm", size: "20gc", color: highlightColor2 }
                                    ],
                                    values: [],
                                    toFind: [
                                        { text: "Apakah bingkai jendela benar-benar persegi panjang?", size: "20gc", color: highlightColor3 }
                                    ]
                                }
                            },
                            {
                                image: 'assets/visual6-id.png',
                                imageAlt: 'Bentuk yang disederhanakan',
                                buttonText: null,
                                descriptionText: 'Kita dapat menyederhanakan ini menjadi segitiga siku-siku. Untuk memverifikasi apakah benar-benar persegi panjang, kita memeriksa apakah sisi-sisi dan diagonalnya membentuk segitiga siku-siku menggunakan teorema Pythagoras: a² + b² = c²',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [
                                        { text: "Tinggi = 40,8 cm", size: "20gc", color: highlightColor1 },
                                        { text: "Panjang = 30,6 cm", size: "20gc", color: highlightColor1 },
                                        { text: "Diagonal = 52,5 cm", size: "20gc", color: highlightColor2 }
                                    ],
                                    values: [],
                                    toFind: [
                                        { text: "Apakah bingkai jendela benar-benar persegi panjang?", size: "20gc", color: highlightColor3 }
                                    ]
                                }
                            }
                        ]
                    }
                },

                page3: {
                    headerText: "Mari kita cari hubungan antara p dan q",
                    footerInstruction: "Klik tombol yang disorot untuk melihat langkah-langkah solusi",
                    instructionAfterQuiz: "Tekan » untuk membuat tripel Pythagoras baru",
                    highlights: [],
                    informationAnalysis: {
                        facts: [
                        ],
                        values: [],
                        toFind: []
                    },
                    triangleLabels: {
                        vertexLabels: ['', '', ''],
                        sideLabels: ['(p + q)', 'p', '(p - q)']
                    },
                    calculationSteps: {
                        headerText: 'Langkah-langkah Solusi',
                        steps: [
                            {
                                type: 'formula',
                                text: 'Teorema Pythagoras: Untuk segitiga siku-siku,<br>c² = a² + b², dengan c adalah hipotenusa',
                                buttonText: 'Terapkan pada kasus kita'
                            },
                            {
                                explainer: 'Untuk tripel Pythagoras: (p + q)² = p² + (p - q)²',
                                text: 'Karena, (p+q) > p > (p-q)<br>(p+q) akan dianggap sebagai hipotenusa',
                                buttonText: 'Kembangkan kuadrat'
                            },
                            {
                                explainer: 'Kembangkan (p + q)² dan (p - q)² dan Sederhanakan',
                                text: 'p² + 2pq + q² = p² + p² - 2pq + q²<br>p² + 2pq + q² = 2p² - 2pq + q²<br>2pq = p² - 2pq<br>4pq = p²',
                                buttonText: 'Selesaikan untuk p'
                            },
                            {
                                explainer: 'Hubungan antara p dan q',
                                text: 'p = 4q'
                            }
                        ]
                    },
                    tableUpdates: {
                        step1: {
                            col1: '(p + q)²',
                            col2: 'p² + (p - q)²'
                        },
                        step2: {
                            r2: 'p² + 2pq + q²',
                            p2q2: 'p² + p² - 2pq + q²',
                            p2plusq2: '= 2p² - 2pq + q²'
                        },
                        step3: {
                            text: 'p = 4q'
                        }
                    }
                },

                page4: {
                    headerText: "Mari kita buat tripel Pythagoras baru menggunakan p = 12",
                    footerInstruction: "Klik \"?\" untuk melihat langkah-langkah solusi",
                    instructionAfterQuiz: "Tekan » untuk memverifikasi tripel",
                    highlights: [
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: "Rumah Komang berada di tengah.", size: "20gc", color: highlightColor2 },
                            { text: "Komang ke Yohana = $1 \\frac{1}{2}$ km", size: "20gc", color: highlightColor2 }
                        ],
                        values: [],
                        toFind: []
                    },
                    triangleLabels: {
                        vertexLabels: ['', '', ''],
                        sideLabels: ['(p + q)', '(p - q)', 'p']
                    },
                    equationTexts: {
                        tripleLabel: 'Tripel Pythagoras : ',
                        pPlusQ: '<i>p</i> + q',
                        p: '<i>p</i>',
                        pMinusQ: '<i>p</i> - q',
                        comma: ',',
                        colon: ': ',
                        calculationText: '$p = 4q$ ⇒ $q = \\frac{p}{4}$<br>Substitusi $p = 12$:<br>$q = \\frac{12}{4} = 3$<br>Oleh karena itu, menggunakan $p = 12$ dan $q = 3$',
                        summaryText: 'Tripel Pythagoras yang terbentuk dengan p = 12 : 9, 12, 15'
                    },
                    calculationSteps: {
                        headerText: 'Langkah-langkah Solusi',
                        steps: [
                            {
                                text: 'p = 7, q = 8, r = 12 (karena 7 < 8 < 12)',
                                buttonText: 'Hitung kuadrat'
                            },
                            {
                                explainer: 'Hitung p², q², dan r²',
                                text: 'p² = 7² = 49, q² = 8² = 64, r² = 12² = 144<br>p² + q² = 49 + 64 = 113',
                                buttonText: 'Bandingkan nilai'
                            },
                            {
                                explainer: 'Bandingkan r² = 144 dan p² + q² = 113',
                                text: 'Karena 144 ≠ 113, kita memiliki r² ≠ p² + q²',
                                buttonText: 'Lihat kesimpulan'
                            },
                            {
                                explainer: 'Kesimpulan',
                                text: '7, 8, 12 BUKAN tripel Pythagoras'
                            }
                        ]
                    },
                    tableUpdates: {
                        step1: {
                            col1: 'r=12',
                            col2: 'p=7 dan q = 8'
                        },
                        step2: {
                            r2: 'r² = 144',
                            p2q2: 'p²=49, q²=64',
                            p2plusq2: 'p²+q²=113'
                        },
                        step3: {
                            text: 'r² ≠ p² + q²'
                        }
                    }
                },

                page8: {
                    headerText: "Mari kita visualisasikan soal",
                    footerInstruction: "Klik tombol yang disorot untuk melihat langkah-langkah solusi",
                    instructionAfterQuiz: "Ketuk » untuk melanjutkan",
                    highlights: [],
                    informationAnalysis: {
                        facts: [],
                        values: [],
                        toFind: []
                    },
                    stageComponent: {
                        headerText: "Mari kita visualisasikan soal",
                        stages: [
                            {
                                image: 'assets/questionImage.png',
                                imageAlt: 'Gambar taman',
                                buttonText: 'Identifikasi bentuk',
                                descriptionText: 'Putri menemukan taman yang indah dan ingin membuat taman seperti itu di rumahnya.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [],
                                    values: [],
                                    toFind: []
                                }
                            },
                            {
                                image: 'assets/visual1-id.png',
                                imageAlt: 'Taman sebagai segitiga',
                                buttonText: 'Tambahkan panjang sisi',
                                descriptionText: 'Taman tersebut berbentuk segitiga.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [],
                                    values: [],
                                    toFind: []
                                }
                            },
                            {
                                image: 'assets/visual2-id.png',
                                imageAlt: 'Taman dengan panjang sisi',
                                buttonText: 'Sederhanakan visual',
                                descriptionText: 'Setelah diukur, sisi-sisinya adalah 4 m, 5 m, dan 6 m.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [
                                        { text: "Sisi 1 = 4 m", size: '20gc', color: highlightColor1 },
                                        { text: "Sisi 2 = 5 m", size: '20gc', color: highlightColor1 },
                                        { text: "Sisi 3 = 6 m", size: '20gc', color: highlightColor1 }
                                    ],
                                    values: [],
                                    toFind: [
                                        { text: "Apakah taman tersebut segitiga siku-siku?", size: '20gc', color: highlightColor3 }
                                    ]
                                }
                            },
                            {
                                image: 'assets/visual3-id.png',
                                imageAlt: 'Verifikasi taman',
                                buttonText: null,
                                descriptionText: 'Untuk memverifikasi apakah itu segitiga siku-siku, kita memeriksa apakah sisi-sisinya membentuk segitiga siku-siku menggunakan teorema Pythagoras: a² + b² = c²',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [
                                        { text: "Sisi 1 = 4 m", size: '20gc', color: highlightColor1 },
                                        { text: "Sisi 2 = 5 m", size: '20gc', color: highlightColor1 },
                                        { text: "Sisi 3 = 6 m", size: '20gc', color: highlightColor1 }
                                    ],
                                    values: [],
                                    toFind: [
                                        { text: "Apakah taman tersebut segitiga siku-siku?", size: '20gc', color: highlightColor3 }
                                    ]
                                }
                            }
                        ]
                    }
                },
                page5: {
                    headerText: "Mari kita verifikasi bahwa 4 m, 5 m, 6 m adalah tripel Pythagoras",
                    footerInstruction: "Klik tombol yang disorot untuk melihat langkah-langkah solusi",
                    instructionAfterQuiz: "Tekan » untuk merangkum",
                    highlights: [
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: "Rumah Komang berada di tengah.", size: "20gc", color: highlightColor2 },
                            { text: "Komang ke Yohana = $1 \\frac{1}{2}$ km", size: "20gc", color: highlightColor2 }
                        ],
                        values: [],
                        toFind: []
                    },
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['6 m', '4 m', '5 m']
                    },
                    calculationSteps: {
                        headerText: 'Langkah-langkah Solusi',
                        steps: [
                            {
                                type: 'formula',
                                text: 'Teorema Pythagoras: Untuk segitiga siku-siku,<br>c² = a² + b², dengan c adalah hipotenusa',
                                buttonText: 'Terapkan pada kasus kita'
                            },
                            {
                                text: 'p = 4 m, q = 5 m, r = 6 m<br>(karena 4 < 5 < 6)',
                                buttonText: 'Hitung kuadrat'
                            },
                            {
                                explainer: 'Hitung p², q², dan r²',
                                text: 'p² = 4² = 16, q² = 5² = 25<br>r² = 6² = 36<br>p² + q² = 16 + 25 = 41',
                                buttonText: 'Bandingkan nilai'
                            },
                            {
                                explainer: 'Bandingkan r² = 36 dan p² + q² = 41',
                                text: 'Karena 36 ≠ 41, kita memiliki r² ≠ p² + q²',
                                buttonText: 'Lihat kesimpulan'
                            },
                            {
                                explainer: 'Kesimpulan',
                                text: '4 m, 5 m, 6 m BUKAN tripel Pythagoras'
                            }
                        ]
                    },
                    tableUpdates: {
                        step1: {
                            col1: 'r=6 m',
                            col2: 'p=4 m dan q = 5 m'
                        },
                        step2: {
                            r2: 'r² = 36',
                            p2q2: 'p²=16, q²=25',
                            p2plusq2: 'p²+q²=41'
                        },
                        step3: {
                            text: 'r² ≠ p² + q²'
                        }
                    }
                },
                page6: {
                    headerText: "Mari kita jelajahi tripel 8 cm, 15 cm, 17 cm",
                    footerInstruction: "Klik tombol yang disorot untuk melihat langkah-langkah solusi",
                    highlights: [],
                    informationAnalysis: {
                        facts: [
                            { text: "Rumah Komang berada di tengah.", size: "20gc", color: highlightColor2 },
                            { text: "Komang ke Yohana = $1 \\frac{1}{2}$ km", size: "20gc", color: highlightColor2 }
                        ],
                        values: [],
                        toFind: []
                    },
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['? m', '? m', '? m']
                    },
                    calculationSteps: {
                        headerText: 'Langkah-langkah Solusi',
                        steps: [
                            {
                                text: 'p = 8, q = 15, r = 17 (karena 8 < 15 < 17)',
                                buttonText: 'Hitung kuadrat'
                            },
                            {
                                explainer: 'Hitung p², q², dan r²',
                                text: 'p² = 8² = 64, q² = 15² = 225, r² = 17² = 289<br>p² + q² = 64 + 225 = 289',
                                buttonText: 'Bandingkan nilai'
                            },
                            {
                                explainer: 'Bandingkan r² = 289 dan p² + q² = 289',
                                text: 'Karena 289 = 289, kita memiliki r² = p² + q²',
                                buttonText: 'Lihat kesimpulan'
                            },
                            {
                                explainer: 'Kesimpulan',
                                text: '8, 15, 17 ADALAH tripel Pythagoras'
                            }
                        ]
                    },
                    tableUpdates: {
                        step1: {
                            col1: 'r=17',
                            col2: 'p=8 dan q = 15'
                        },
                        step2: {
                            r2: 'r² = 289',
                            p2q2: 'p²=64, q²=225',
                            p2plusq2: 'p²+q²=289'
                        },
                        step3: {
                            text: 'r² = p² + q²'
                        }
                    }
                },
                page7: {
                    headerText: "Ringkasan",
                    summaryText: "Berdasarkan eksplorasi kami:<br><br><div style=\"text-align: left; margin: 0 auto; width: fit-content;\">Putri menemukan taman berbentuk segitiga dengan sisi-sisi berukuran 4 m, 5 m, dan 6 m. Dia ingin membuktikan apakah taman ini merupakan segitiga siku-siku.<br><br>Kami memverifikasi bahwa 4² + 5² = 16 + 25 = 41 ≠ 36 = 6²<br><br>Oleh karena itu, <strong>taman tersebut BUKAN segitiga siku-siku</strong> karena sisi-sisi 4 m, 5 m, dan 6 m tidak membentuk tripel Pythagoras.</div>",
                    footerInstruction: "Tekan » untuk memulai lagi",
                    highlights: [
                        {
                            text: "Oleh karena itu, taman tersebut BUKAN segitiga siku-siku karena sisi-sisi 4 m, 5 m, dan 6 m tidak membentuk tripel Pythagoras."
                        }
                    ]
                },
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
