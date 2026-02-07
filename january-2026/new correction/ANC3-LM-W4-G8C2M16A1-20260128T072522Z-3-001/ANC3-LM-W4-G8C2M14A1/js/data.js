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
                questionText: "Given an isosceles right triangle △ABC with ∠C = 90° and AB = 15$\\sqrt{2}$ cm.<br><br>Calculate the length of AC.",
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
                    highlights: [],
                    instructionText: "Let's find out the distance from Yohana's house to Lukas's house by adding the mixed numbers and the fraction.",
                    headerText: "Read the question and identify 'given' and 'to find'",
                    footerInstruction: "Tap » to visualise the problem"
                },
                page2: {
                    headerText: "Find the correct visual representation for the question",
                    footerInstruction: "Select the correct answer",
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
                        questionText: "Given an isosceles right triangle △ABC with ∠C = 90° and AB = 15$\\sqrt{2}$ cm. Choose the correct figure which represents this triangle.",
                        options: [
                            {
                                image: "assets/option1.png",
                                text: "",
                                feedback: "Not correct. Try again!",
                                iscorrect: false
                            },
                            {
                                image: "assets/option2.png",
                                text: "",
                                feedback: "Not correct. Try again!",
                                iscorrect: false
                            },
                            {
                                image: "assets/option3.png",
                                text: "",
                                feedback: "Awesome",
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
                                descriptionText: 'We can simplify this to a right triangle. To verify if it is truly rectangular, we check if the sides and diagonal form a right triangle using the Pythagorean theorem: a² + b² = c²',
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
                    headerText: "Let us find the relationship between the sides of a isoceles right △",
                    footerInstruction: "Click on the highlighted button to see the solution steps",
                    instructionAfterQuiz: "Tap » to continue",
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
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['c', 'b', 'a']
                    },
                    calculationSteps: {
                        headerText: 'Solution Steps',
                        steps: [
                            {
                                type: 'formula',
                                text: 'Pythagoras theorem: For a right triangle,<br>c² = a² + b², where c is the hypotenuse',
                                buttonText: 'Apply to our theoram'
                            },
                            {
                                explainer: 'Given it is an isosceles triangle, substitute a = b',
                                text: 'c² = a² + b²<br>c² = a² + a²<br>c² = 2a²',
                                buttonText: 'Find c'
                            },
                            {
                                type: 'answer',
                                text: 'c = a$\\sqrt{2}$',
                                buttonText: 'Find side ratio'
                            },
                            {
                                explainer: 'Ratio of sides',
                                text: 'a : b : c<br>= a : a : a$\\sqrt{2}$<br>= 1 : 1 : $\\sqrt{2}$'
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
                page9: {
                    headerText: "Determine the sides of an isoceles △",
                    footerInstruction: "Choose the correct answer",
                    instructionAfterQuiz: "Tap » to continue",
                    quizPanel: {
                        questionText: "∆ABC is an isosceles right triangle. If a and b are sides at right angle and c is the hypotenuse, which of the following is / are correct?",
                        options: [
                            {
                                text: "a = 1 cm, b = 1 cm, c = $\\sqrt{2}$ cm",
                                feedback: "Not Correct! Try again",
                                iscorrect: false
                            },
                            {
                                text: "a = 4$\\sqrt{2}$, b = 4 cm, c = 4 cm",
                                feedback: "Not quite. Remember, in an isosceles right triangle, the two legs (a and b) must be equal. Here a ≠ b, so this cannot be correct.",
                                iscorrect: false
                            },
                            {
                                text: "a = 6 cm, b = 6 cm, c = 6$\\sqrt{2}$ cm",
                                feedback: "Excellent! This is correct. When a = b = 6, then c = 6$\\sqrt{2}$.",
                                iscorrect: true
                            },
                            {
                                text: "a = 10 cm, b = 10 cm, c = 6$\\sqrt{2}$ cm",
                                feedback: "Not quite. Let's check: if a = 10 and b = 10, then c should be 10$\\sqrt{2}$, not 6$\\sqrt{2}$. Try again!",
                                iscorrect: false
                            }
                        ]
                    }
                },
                page10: {
                    xText: "x",
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['a$\\sqrt{2}$', 'a', 'a']
                    },
                    fillBlanks: {
                        instructionText: "Tap the correct option",
                        options: [
                            { id: "opt1", text: "15", blankID: ["blank1", "blank2", "blank3"], feedbackText: "Correct!" },
                            { id: "opt2", text: "1", blankID: null, feedbackText: "Not quite. Try again." },
                            { id: "opt3", text: "6", blankID: null, feedbackText: "Not quite. Try again." },
                            { id: "opt4", text: "$\\sqrt{2}$", blankID: null, feedbackText: "Not quite. Try again." }
                        ],
                        impFormulae: []
                    }
                },
                page11: {
                    headerText: "Let us summarise",
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['15$\\sqrt{2}$', '15', '15']
                    },
                    footerInstruction: "Tap » to start over",
                    feedbackTextbox: {
                        text: "The length of <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">AC = 15 cm</span>"
                    }
                },
                page4: {
                    headerText: "Let us create a new Pythagorean triplet using p = 12",
                    footerInstruction: "Click on the \"?\" to see the solution steps",
                    instructionAfterQuiz: "Tap » to verify the triplet",
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
                        tripletLabel: 'Pythagorean Triplet : ',
                        pPlusQ: '<i>p</i> + q',
                        p: '<i>p</i>',
                        pMinusQ: '<i>p</i> - q',
                        comma: ',',
                        colon: ': ',
                        calculationText: '$p = 4q$ ⇒ $q = \\frac{p}{4}$<br>Substitute $p = 12$:<br>$q = \\frac{12}{4} = 3$<br>Hence using, $p = 12$ and $q = 3$',
                        summaryText: 'The Pythagorean triplet formed with p = 12 : 9, 12, 15'
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
                                text: '7, 8, 12 is NOT a Pythagorean triple'
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
                                descriptionText: 'To verify if it is a right triangle, we check if the sides form a right triangle using the Pythagorean theorem: a² + b² = c²',
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
                    headerText: "Let us verify that 4 m, 5 m, 6 m is a Pythagorean triplet",
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
                                text: 'Pythagoras theorem: For a right triangle,<br>c² = a² + b², where c is the hypotenuse',
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
                                text: '4 m, 5 m, 6 m is NOT a Pythagorean triple'
                            }
                        ]
                    },
                    tableUpdates: {
                        step1: {
                            col1: 'r=6 m',
                            col2: 'p=4 m and q = 5 m'
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
                    headerText: "Let us explore the triplet 8 cm, 15 cm, 17 cm",
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
                                text: '8, 15, 17 IS a Pythagorean triple'
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
                    summaryText: "Based on our exploration:<br><br><div style=\"text-align: left; margin: 0 auto; width: fit-content;\">Putri found a triangular garden with sides measuring 4 m, 5 m, and 6 m. She wanted to prove whether this garden is a right triangle.<br><br>We verified that 4² + 5² = 16 + 25 = 41 ≠ 36 = 6²<br><br>Therefore, <strong>the garden is NOT a right triangle</strong> because the sides 4 m, 5 m, and 6 m do not form a Pythagorean triple.</div>",
                    footerInstruction: "Tap » to start over",
                    highlights: [
                        {
                            text: "Therefore, the garden is NOT a right triangle because the sides 4 m, 5 m, and 6 m do not form a Pythagorean triple."
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
                questionText: "Diberikan segitiga siku-siku sama kaki △ABC dengan ∠C = 90° dan AB = 15$\\sqrt{2}$ cm.<br><br>Hitunglah panjang AC.",
                questionIcon: "Q",
                komangToLucas: "Komang ke Lucas",
                tapAnimationAlt: "Ketuk",
                imageAlt: {
                    leftArrow: "Panah Kiri"
                },
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
                    headerText: "Temukan representasi visual yang benar untuk pertanyaan",
                    footerInstruction: "Pilih jawaban yang benar",
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
                        questionText: "Diberikan segitiga siku-siku sama kaki △ABC dengan ∠C = 90° dan AB = 15$\\sqrt{2}$ cm. Pilih gambar yang benar yang mewakili segitiga ini.",
                        options: [
                            {
                                image: "assets/option1.png",
                                text: "",
                                feedback: "Tidak benar. Coba lagi!",
                                iscorrect: false
                            },
                            {
                                image: "assets/option2.png",
                                text: "",
                                feedback: "Tidak benar. Coba lagi!",
                                iscorrect: false
                            },
                            {
                                image: "assets/option3.png",
                                text: "",
                                feedback: "Luar biasa",
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
                    headerText: "Mari kita cari hubungan antara sisi-sisi segitiga siku-siku sama kaki △",
                    footerInstruction: "Klik tombol yang disorot untuk melihat langkah-langkah solusi",
                    instructionAfterQuiz: "Tekan » untuk melanjutkan",
                    highlights: [],
                    informationAnalysis: {
                        facts: [
                        ],
                        values: [],
                        toFind: []
                    },
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['c', 'b', 'a']
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
                                explainer: 'Diberikan bahwa ini adalah segitiga sama kaki, substitusikan a = b',
                                text: 'c² = a² + b²<br>c² = a² + a²<br>c² = 2a²',
                                buttonText: 'Temukan c'
                            },
                            {
                                type: 'answer',
                                text: 'c = a$\\sqrt{2}$'
                            },
                            {
                                explainer: 'Rasio sisi-sisi',
                                text: 'a : b : c<br>= a : a : a$\\sqrt{2}$<br>= 1 : 1 : $\\sqrt{2}$'
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
                        tripletLabel: 'Tripel Pythagoras : ',
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
                page9: {
                    headerText: "Tentukan sisi-sisi segitiga sama kaki △",
                    footerInstruction: "Pilih jawaban yang benar",
                    instructionAfterQuiz: "Tekan » untuk melanjutkan",
                    quizPanel: {
                        questionText: "∆ABC adalah segitiga siku-siku sama kaki. Jika a dan b adalah sisi-sisi pada sudut siku-siku dan c adalah hipotenusa, manakah dari berikut ini yang benar?",
                        options: [
                            {
                                text: "a = 1 cm, b = 1 cm, c = $\\sqrt{2}$ cm",
                                feedback: "Bagus sekali! Ini benar. Dalam segitiga siku-siku sama kaki, ketika a = b = 1, maka c = $\\sqrt{2}$.",
                                iscorrect: true
                            },
                            {
                                text: "a = 4$\\sqrt{2}$, b = 4 cm, c = 4 cm",
                                feedback: "Belum tepat. Ingat, dalam segitiga siku-siku sama kaki, kedua kaki (a dan b) harus sama. Di sini a ≠ b, jadi ini tidak benar.",
                                iscorrect: false
                            },
                            {
                                text: "a = 6 cm, b = 6 cm, c = 6$\\sqrt{2}$ cm",
                                feedback: "Luar biasa! Ini benar. Ketika a = b = 6, maka c = 6$\\sqrt{2}$.",
                                iscorrect: true
                            },
                            {
                                text: "a = 10 cm, b = 10 cm, c = 6$\\sqrt{2}$ cm",
                                feedback: "Belum tepat. Mari kita periksa: jika a = 10 dan b = 10, maka c seharusnya 10$\\sqrt{2}$, bukan 6$\\sqrt{2}$. Coba lagi!",
                                iscorrect: false
                            }
                        ]
                    }
                },
                page10: {
                    xText: "x",
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['a$\\sqrt{2}$', 'a', 'a']
                    },
                    fillBlanks: {
                        instructionText: "Seret dan letakkan nilai yang benar",
                        options: [
                            { id: "opt1", text: "15", blankID: ["blank1", "blank2", "blank3"], feedbackText: "Benar!" },
                            { id: "opt2", text: "1", blankID: null, feedbackText: "Belum tepat. Coba lagi." },
                            { id: "opt3", text: "6", blankID: null, feedbackText: "Belum tepat. Coba lagi." },
                            { id: "opt4", text: "$\\sqrt{2}$", blankID: null, feedbackText: "Belum tepat. Coba lagi." }
                        ],
                        impFormulae: []
                    }
                },
                page11: {
                    headerText: "Mari kita rangkum",
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['15$\\sqrt{2}$', '15', '15']
                    },
                    footerInstruction: "Tekan » untuk memulai ulang",
                    feedbackTextbox: {
                        text: "Panjang <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">AC = 15</span>"
                    }
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
