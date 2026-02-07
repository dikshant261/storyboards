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
                questionText: "A triangle is said to be a right triangle if the lengths of its three sides are consecutively...<br><br><div style=\"text-align: left; margin: 0 auto; width: fit-content;\"><strong>a.</strong> 3 cm, 5 cm, dan 6 cm<br><strong>b.</strong> 7 cm, 8 cm, and 12 cm<br><strong>c.</strong> 5 cm, 12, cm, and 15 cm<br><strong>d.</strong> 8 cm, 15 cm, dan 17 cm</div>",
                questionIcon: "Q",
                komangToLucas: "Komang to Lucas",
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
                    footerInstruction: "Tap » to identify a Pythagoras’ triple"
                },
                page2: {
                    headerText: "How to identify a Pythagoras’ triple",
                    footerInstruction: "Tap » to learn how to identify a Pythagoras’ triple",
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
                        questionText: "Given that p, q, and r are Pythagoras’ triples<br>with p < q < r, choose the correct option.",
                        options: [
                            {
                                text: "p<sup>2</sup> = q<sup>2</sup> + r<sup>2</sup>",
                                feedback: "That's not right! Try again.",
                                iscorrect: false
                            },
                            {
                                text: "q<sup>2</sup> = p<sup>2</sup> - r<sup>2</sup>",
                                feedback: "That's not right! Try again.",
                                iscorrect: false
                            },
                            {
                                text: "r<sup>2</sup> = p<sup>2</sup> - q<sup>2</sup>",
                                feedback: "That's not right! Try again.",
                                iscorrect: false
                            },
                            {
                                text: "r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup>",
                                feedback: "Good!",
                                iscorrect: true
                            }
                        ]
                    }
                },
                page3: {
                    headerText: "Let us explore the triple 3 cm, 5 cm, 6 cm",
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
                                text: 'p = 3, q = 5, r = 6 (since 3 < 5 < 6)',
                                buttonText: 'Calculate squares'
                            },
                            {
                                explainer: 'Calculate p², q², and r²',
                                text: 'p² = 3² = 9, q² = 5² = 25, r² = 6² = 36<br>p² + q² = 9 + 25 = 34',
                                buttonText: 'Compare values'
                            },
                            {
                                explainer: 'Compare r² = 36 and p² + q² = 34',
                                text: 'Since 36 ≠ 34, we have r² ≠ p² + q²',
                                buttonText: 'See conclusion'
                            },
                            {
                                explainer: 'Conclusion',
                                text: '3, 5, 6 is NOT a Pythagoras’ triple'
                            }
                        ]
                    },
                    tableUpdates: {
                        step1: {
                            col1: 'r = 6',
                            col2: 'p = 3 and q = 5'
                        },
                        step2: {
                            r2: 'r² = 36',
                            p2q2: 'p² = 9, q² = 25',
                            p2plusq2: 'p² + q² = 34'
                        },
                        step3: {
                            text: 'r² ≠ p² + q²'
                        }
                    }
                },
                page4: {
                    headerText: "Let us explore the triple 7 cm, 8 cm, 12 cm",
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
                                text: '7, 8, 12 is NOT a Pythagoras’ triple'
                            }
                        ]
                    },
                    tableUpdates: {
                        step1: {
                            col1: 'r = 12',
                            col2: 'p = 7 and q = 8'
                        },
                        step2: {
                            r2: 'r² = 144',
                            p2q2: 'p² = 49, q²=64',
                            p2plusq2: 'p² + q² = 113'
                        },
                        step3: {
                            text: 'r² ≠ p² + q²'
                        }
                    }
                },
                page5: {
                    headerText: "Let us explore the triple 5 cm, 12 cm, 15 cm",
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
                                text: 'p = 5, q = 12, r = 15 (since 5 < 12 < 15)',
                                buttonText: 'Calculate squares'
                            },
                            {
                                explainer: 'Calculate p², q², and r²',
                                text: 'p² = 5² = 25, q² = 12² = 144, r² = 15² = 225<br>p² + q² = 25 + 144 = 169',
                                buttonText: 'Compare values'
                            },
                            {
                                explainer: 'Compare r² = 225 and p² + q² = 169',
                                text: 'Since 225 ≠ 169, we have r² ≠ p² + q²',
                                buttonText: 'See conclusion'
                            },
                            {
                                explainer: 'Conclusion',
                                text: '5, 12, 15 is NOT a Pythagoras’ triple'
                            }
                        ]
                    },
                    tableUpdates: {
                        step1: {
                            col1: 'r = 15',
                            col2: 'p = 5 and q = 12'
                        },
                        step2: {
                            r2: 'r² = 225',
                            p2q2: 'p² = 25, q² = 144',
                            p2plusq2: 'p² + q² = 169'
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
                                text: '8, 15, 17 IS a Pythagoras’ triple'
                            }
                        ]
                    },
                    tableUpdates: {
                        step1: {
                            col1: 'r = 17',
                            col2: 'p = 8 and q = 15'
                        },
                        step2: {
                            r2: 'r² = 289',
                            p2q2: 'p² = 64, q² = 225',
                            p2plusq2: 'p² + q² = 289'
                        },
                        step3: {
                            text: 'r² = p² + q²'
                        }
                    }
                },
                page7: {
                    headerText: "Summary",
                    summaryText: "After exploring all four triples, we found that:<br><br><div style=\"text-align: left; margin: 0 auto; width: fit-content;\"><strong>a.</strong> 3 cm, 5 cm, dan 6 cm is NOT a Pythagoras’ triple<br><strong>b.</strong> 7 cm, 8 cm, and 12 cm is NOT a Pythagoras’ triple<br><strong>c.</strong> 5 cm, 12, cm, and 15 cm is NOT a Pythagoras’ triple<br><strong>d.</strong> 8 cm, 15 cm, dan 17 cm IS a Pythagoras’ triple</div><br><br>Therefore, the correct answer is <strong>option d</strong>.",
                    footerInstruction: "Tap » to start over",
                    highlights: [
                        {
                            text: "d. 8 cm, 15 cm, dan 17 cm IS a Pythagoras’ triple"
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
                questionText: "Segitiga dikatakan sebagai segitiga siku-siku jika panjang ketiga sisinya secara berurutan...<br><br><div style=\"text-align: left; margin: 0 auto; width: fit-content;\"><strong>a.</strong> 3 cm, 5 cm, dan 6 cm<br><strong>b.</strong> 7 cm, 8 cm, dan 12 cm<br><strong>c.</strong> 5 cm, 12, cm, dan 15 cm<br><strong>d.</strong> 8 cm, 15 cm, dan 17 cm</div>",
                questionIcon: "Q",
                komangToLucas: "Komang ke Lucas",
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
                    instructionText: "Mari kita mencari jarak dari rumah Yohana ke rumah Lukas dengan menjumlahkan bilangan campuran dan pecahan.",
                    headerText: "Bacalah soal dan tentukan 'diketahui' dan 'yang ditanyakan'",
                    footerInstruction: "Ketuk » untuk mengidentifikasi tripel Pythagoras"
                },

                page2: {
                    headerText: "Cara mengidentifikasi tripel Pythagoras",
                    footerInstruction: "Ketuk » untuk mempelajari cara mengidentifikasi tripel Pythagoras",
                    highlights: [
                        {
                            text: "Rumah Komang berada di antara rumah Yohana dan rumah Lukas.",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: questionTextSize,
                            bold: true,
                            underline: false
                        }
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: "Rumah Komang berada di tengah.", size: '20gc', color: highlightColor1 }
                        ],
                        values: [],
                        toFind: []
                    },
                    quizPanel: {
                        questionText: "Diketahui bahwa p, q, dan r merupakan tripel Pythagoras<br>dengan p < q < r, pilihlah pernyataan yang benar.",
                        options: [
                            {
                                text: "p<sup>2</sup> = q<sup>2</sup> + r<sup>2</sup>",
                                feedback: "Belum benar! Coba lagi.",
                                iscorrect: false
                            },
                            {
                                text: "q<sup>2</sup> = p<sup>2</sup> - r<sup>2</sup>",
                                feedback: "Belum benar! Coba lagi.",
                                iscorrect: false
                            },
                            {
                                text: "r<sup>2</sup> = p<sup>2</sup> - q<sup>2</sup>",
                                feedback: "Belum benar! Coba lagi.",
                                iscorrect: false
                            },
                            {
                                text: "r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup>",
                                feedback: "Bagus!",
                                iscorrect: true
                            }
                        ]
                    }
                },

                page3: {
                    headerText: "Mari kita eksplorasi tripel 3 cm, 5 cm, 6 cm",
                    footerInstruction: "Klik tombol yang disorot untuk melihat langkah penyelesaian",
                    highlights: [],
                    informationAnalysis: {
                        facts: [
                            { text: "Rumah Komang berada di tengah.", size: '20gc', color: highlightColor2 },
                            { text: "Jarak Komang ke Yohana = $1 \\frac{1}{2}$ km", size: '20gc', color: highlightColor2 }
                        ],
                        values: [],
                        toFind: []
                    },
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['? m', '? m', '? m']
                    },
                    calculationSteps: {
                        headerText: 'Langkah Penyelesaian',
                        steps: [
                            {
                                text: 'p = 3, q = 5, r = 6 (karena 3 < 5 < 6)',
                                buttonText: 'Hitung kuadrat'
                            },
                            {
                                explainer: 'Hitung p², q², dan r²',
                                text: 'p² = 3² = 9, q² = 5² = 25, r² = 6² = 36<br>p² + q² = 9 + 25 = 34',
                                buttonText: 'Bandingkan nilai'
                            },
                            {
                                explainer: 'Bandingkan r² = 36 dan p² + q² = 34',
                                text: 'Karena 36 ≠ 34, maka r² ≠ p² + q²',
                                buttonText: 'Lihat kesimpulan'
                            },
                            {
                                explainer: 'Kesimpulan',
                                text: '3, 5, 6 BUKAN tripel Pythagoras'
                            }
                        ]
                    },
                    tableUpdates: {
                        step1: {
                            col1: 'r = 6',
                            col2: 'p = 3 dan q = 5'
                        },
                        step2: {
                            r2: 'r² = 36',
                            p2q2: 'p² = 9, q² = 25',
                            p2plusq2: 'p² + q² = 34'
                        },
                        step3: {
                            text: 'r² ≠ p² + q²'
                        }
                    }
                },

                page4: {
                    headerText: "Mari kita eksplorasi tripel 7 cm, 8 cm, 12 cm",
                    footerInstruction: "Klik tombol yang disorot untuk melihat langkah penyelesaian",
                    highlights: [],
                    informationAnalysis: {
                        facts: [
                            { text: "Rumah Komang berada di tengah.", size: '20gc', color: highlightColor2 },
                            { text: "Jarak Komang ke Yohana = $1 \\frac{1}{2}$ km", size: '20gc', color: highlightColor2 }
                        ],
                        values: [],
                        toFind: []
                    },
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['? m', '? m', '? m']
                    },
                    calculationSteps: {
                        headerText: 'Langkah Penyelesaian',
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
                                text: 'Karena 144 ≠ 113, maka r² ≠ p² + q²',
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
                            col1: 'r = 12',
                            col2: 'p = 7 dan q = 8'
                        },
                        step2: {
                            r2: 'r² = 144',
                            p2q2: 'p² = 49, q² = 64',
                            p2plusq2: 'p² + q² = 113'
                        },
                        step3: {
                            text: 'r² ≠ p² + q²'
                        }
                    }
                },

                page5: {
                    headerText: "Mari kita eksplorasi tripel 5 cm, 12 cm, 15 cm",
                    footerInstruction: "Klik tombol yang disorot untuk melihat langkah penyelesaian",
                    highlights: [],
                    informationAnalysis: {
                        facts: [
                            { text: "Rumah Komang berada di tengah.", size: '20gc', color: highlightColor2 },
                            { text: "Jarak Komang ke Yohana = $1 \\frac{1}{2}$ km", size: '20gc', color: highlightColor2 }
                        ],
                        values: [],
                        toFind: []
                    },
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['? m', '? m', '? m']
                    },
                    calculationSteps: {
                        headerText: 'Langkah Penyelesaian',
                        steps: [
                            {
                                text: 'p = 5, q = 12, r = 15 (karena 5 < 12 < 15)',
                                buttonText: 'Hitung kuadrat'
                            },
                            {
                                explainer: 'Hitung p², q², dan r²',
                                text: 'p² = 5² = 25, q² = 12² = 144, r² = 15² = 225<br>p² + q² = 25 + 144 = 169',
                                buttonText: 'Bandingkan nilai'
                            },
                            {
                                explainer: 'Bandingkan r² = 225 dan p² + q² = 169',
                                text: 'Karena 225 ≠ 169, maka r² ≠ p² + q²',
                                buttonText: 'Lihat kesimpulan'
                            },
                            {
                                explainer: 'Kesimpulan',
                                text: '5, 12, 15 BUKAN tripel Pythagoras'
                            }
                        ]
                    },
                    tableUpdates: {
                        step1: {
                            col1: 'r = 15',
                            col2: 'p = 5 dan q = 12'
                        },
                        step2: {
                            r2: 'r² = 225',
                            p2q2: 'p² = 25, q² = 144',
                            p2plusq2: 'p² + q² = 169'
                        },
                        step3: {
                            text: 'r² ≠ p² + q²'
                        }
                    }
                },

                page6: {
                    headerText: "Mari kita eksplorasi tripel 8 cm, 15 cm, 17 cm",
                    footerInstruction: "Klik tombol yang disorot untuk melihat langkah penyelesaian",
                    highlights: [],
                    informationAnalysis: {
                        facts: [
                            { text: "Rumah Komang berada di tengah.", size: '20gc', color: highlightColor2 },
                            { text: "Jarak Komang ke Yohana = $1 \\frac{1}{2}$ km", size: '20gc', color: highlightColor2 }
                        ],
                        values: [],
                        toFind: []
                    },
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['? m', '? m', '? m']
                    },
                    calculationSteps: {
                        headerText: 'Langkah Penyelesaian',
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
                                text: 'Karena 289 = 289, maka r² = p² + q²',
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
                            col1: 'r = 17',
                            col2: 'p = 8 dan q = 15'
                        },
                        step2: {
                            r2: 'r² = 289',
                            p2q2: 'p² = 64, q² = 225',
                            p2plusq2: 'p² + q² = 289'
                        },
                        step3: {
                            text: 'r² = p² + q²'
                        }
                    }
                },

                page7: {
                    headerText: "Ringkasan",
                    summaryText: "Setelah mengeksplorasi keempat tripel, kita menemukan bahwa:<br><br><div style=\"text-align: left; margin: 0 auto; width: fit-content;\"><strong>a.</strong> 3 cm, 5 cm, dan 6 cm BUKAN tripel Pythagoras<br><strong>b.</strong> 7 cm, 8 cm, dan 12 cm BUKAN tripel Pythagoras<br><strong>c.</strong> 5 cm, 12 cm, dan 15 cm BUKAN tripel Pythagoras<br><strong>d.</strong> 8 cm, 15 cm, dan 17 cm ADALAH tripel Pythagoras</div><br><br>Oleh karena itu, jawaban yang benar adalah <strong>opsi d</strong>.",
                    footerInstruction: "Ketuk » untuk mengulang",
                    highlights: [
                        {
                            text: "d. 8 cm, 15 cm, dan 17 cm ADALAH tripel Pythagoras"
                        }
                    ]
                }
            },

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
