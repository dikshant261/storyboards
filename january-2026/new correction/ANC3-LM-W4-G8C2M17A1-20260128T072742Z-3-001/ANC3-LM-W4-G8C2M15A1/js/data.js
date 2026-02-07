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
                questionText: "Aldo is a lifeguard who always monitors the condition of the beach and also the boats that will be docked around the beach.\nOne day, Aldo saw two boats, a tourist boat and a fishing boat, as shown in the picture.\nIf the average speed of both boats approaching the shore is 30 Km/h, determine the difference in time taken by the two boats to approach the shore.",
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
                        questionText: "Given an isosceles right triangle △ABC with ∠C = 90° and AB = 15√2 cm. Choose the correct figure which represents this triangle.",
                        options: [
                            {
                                image: "assets/option1.png",
                                text: "",
                                feedback: "Awesome",
                                iscorrect: true
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
                                feedback: "Not correct. Try again!",
                                iscorrect: false
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
                        vertexLabels: ['B', 'D', 'C'],
                        sideLabels: ['c = x + y', 'a = x', 'b']
                    },
                    angleLabels: ['30°', '60°', '90°'],
                    calculationSteps: {
                        headerText: 'Solution Steps',
                        steps: [
                            {
                                type: 'formula',
                                text: 'From page 9, we established:<br>a : b : c = 1 : √3 : 2',
                                buttonText: 'Apply the ratio'
                            },
                            {
                                explainer: 'From the ratio a : b : c = 1 : √3 : 2',
                                text: 'Thus, c = 2a',
                                buttonText: 'Substitute values'
                            },
                            {
                                explainer: 'Substituting a = x and c = x + y',
                                text: 'Therefore: x + y = 2x',
                                buttonText: 'Solve for y'
                            },
                            {
                                explainer: 'Solving for y',
                                text: 'y = 2x - x<br>y = x',
                                buttonText: 'Find x'
                            },
                            {
                                explainer: 'Answer',
                                text: 'x = y',
                                buttonText: null
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
                    triangleLabels: {
                        vertexLabels: ['B', 'D', 'C'],
                        sideLabels: ['c', 'a', 'b']
                    },
                    angleLabels: ['30°', '60°', '90°'],
                    quizPanel: {
                        questionText: "In any 30°-60°-90° right angled triangle, where 'c' is the hypotenuse, ratio a:b:c is :",
                        options: [
                            {
                                text: "1 : 2 : 3",
                                feedback: "Not quite. In a 30°-60°-90° triangle, the ratio is not 1:2:3. Remember that the side opposite 30° is the shortest, opposite 60° is √3 times that, and the hypotenuse is 2 times the shortest side. Try again!",
                                iscorrect: false
                            },
                            {
                                text: "1 : √3 : 2",
                                feedback: "Excellent! This is correct. In a 30°-60°-90° triangle, the side opposite 30° (a) is the shortest, the side opposite 60° (b) is √3 times the shortest side, and the hypotenuse (c) is 2 times the shortest side. So the ratio a:b:c = 1:√3:2.",
                                iscorrect: true
                            },
                            {
                                text: "2 : √2 : 1",
                                feedback: "Not quite. This ratio doesn't match a 30°-60°-90° triangle. In a 30°-60°-90° triangle, the hypotenuse is always the longest side (2 times the shortest), not the shortest. Try again!",
                                iscorrect: false
                            },
                            {
                                text: "1 : √2 : 1",
                                feedback: "Not quite. This ratio 1:√2:1 describes an isosceles right triangle (45°-45°-90°), not a 30°-60°-90° triangle. In a 30°-60°-90° triangle, the hypotenuse should be 2 times the shortest side. Try again!",
                                iscorrect: false
                            }
                        ]
                    }
                },
                page10: {
                    xText: "x",
                    footerInstruction: "Choose the correct answer to find the length of the sides",
                    triangleLabels: {
                        vertexLabels: ['B', 'D', 'C'],
                        sideLabels: ['c = x + y', 'a = x', 'b']
                    },
                    angleLabels: ['30°', '60°', '90°'],
                    tableHeaders: [
                        '<span style="color: #FF6600;">a</span>',
                        '<span style="color: #00FF7F;">b</span>',
                        '<span style="color: #4A90E2;">c</span>'
                    ],
                    tableRows: [
                        ['<span style="color: #FF6600;">1</span>', '<span style="color: #00FF7F;">√3</span>', '<span style="color: #4A90E2;">2</span>'],
                        ['<span style="color: #FF6600;">x</span>', '', '']
                    ],
                    fillBlanks: {
                        instructionText: "Choose the correct answer",
                        options: [
                            { id: "opt1", text: "60", blankID: [{ bid: "blank1", text: "60" }, { bid: "blank2", text: "60√3" }, { bid: "blank3", text: "120" }], feedbackText: "Correct!" },
                            { id: "opt2", text: "30", blankID: null, feedbackText: "Not quite. Try again." },
                            { id: "opt3", text: "120", blankID: null, feedbackText: "Not quite. Try again." },
                            { id: "opt4", text: "60√3", blankID: null, feedbackText: "Not quite. Try again." }
                        ],
                        impFormulae: []
                    }
                },
                page11: {
                    headerText: "Let us summarise",
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['20 Km', '15 Km', '25 Km']
                    },
                    angleLabels: ['', '90°', ''],
                    footerInstruction: "Tap » to start over",
                    feedbackTextbox: {
                        text: "The difference in time taken by the two boats to reach the shore is <span style='background-color: #FFD700; color: #000000; padding: 2px 4px;'>$\\frac{1}{3}$ hours or 20 minutes</span>"

                    }
                },
                page12: {
                    headerText: "Determine the sides of the △",
                    footerInstruction: "Match the correct side with the statement",
                    instructionAfterQuiz: "Tap » to continue",
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['20 Km', '15 Km', '']
                    },
                    angleLabels: ['', '90°', ''],
                    tableHeaders: ['', 'Side'],
                    tableRows: [
                        ['side of the triangle represents the distance from the observer on land to the tourist boat', ''],
                        ['side of the triangle represents the Distance between the two boats?', ''],
                        ['side of the triangle represents the distance from the observer on land to the fishing boat', '']
                    ],
                    fillBlanks: {
                        instructionText: "Drag the correct side to the matching statement in the table",
                        options: [
                            {
                                id: "opt1",
                                text: "Vertical Side (AB)",
                                blankID: [{ bid: "blank2", text: "Vertical Side (AB)" }],
                                feedbackText: "Correct! The vertical side AB represents the distance between the two boats.",
                                incorrectFeedback: "Incorrect! The vertical side AB represents the distance between the two boats."
                            },
                            {
                                id: "opt2",
                                text: "Horizontal side (BC)",
                                blankID: [{ bid: "blank3", text: "Horizontal side (BC)" }],
                                feedbackText: "Correct! The horizontal side BC represents the distance from the observer on land to the fishing boat.",
                                incorrectFeedback: "Incorrect! The horizontal side BC represents the distance from the observer on land to the fishing boat."

                            },
                            {
                                id: "opt3",
                                text: "Hypotenuse (AC)",
                                blankID: [{ bid: "blank1", text: "Hypotenuse (AC)" }],
                                feedbackText: "Correct! The hypotenuse AC represents the distance from the observer on land to the tourist boat.",
                                incorrectFeedback: 'Incorrect! The hypotenuse AC represents the distance from the observer on land to the tourist boat.'
                            }
                        ],
                        impFormulae: []
                    },
                    quizPanel: {
                        questionText: "In any 30°-60°-90° right angled triangle, where 'c' is the hypotenuse, ratio a:b:c is :",
                        options: [
                            {
                                text: "1 : 2 : 3",
                                feedback: "Not quite. In a 30°-60°-90° triangle, the ratio is not 1:2:3. Remember that the side opposite 30° is the shortest, opposite 60° is √3 times that, and the hypotenuse is 2 times the shortest side. Try again!",
                                iscorrect: false,
                            },
                            {
                                text: "1 : √3 : 2",
                                feedback: "Excellent! This is correct. In a 30°-60°-90° triangle, the side opposite 30° (a) is the shortest, the side opposite 60° (b) is √3 times the shortest side, and the hypotenuse (c) is 2 times the shortest side. So the ratio a:b:c = 1:√3:2.",
                                iscorrect: true
                            },
                            {
                                text: "2 : √2 : 1",
                                feedback: "Not quite. This ratio doesn't match a 30°-60°-90° triangle. In a 30°-60°-90° triangle, the hypotenuse is always the longest side (2 times the shortest), not the shortest. Try again!",
                                iscorrect: false
                            },
                            {
                                text: "1 : √2 : 1",
                                feedback: "Not quite. This ratio 1:√2:1 describes an isosceles right triangle (45°-45°-90°), not a 30°-60°-90° triangle. In a 30°-60°-90° triangle, the hypotenuse should be 2 times the shortest side. Try again!",
                                iscorrect: false
                            }
                        ]
                    }
                },
                page4: {
                    headerText: "Now, let us find the difference in time taken to reach the shore",
                    footerInstruction: "Click on the \"?\" to see the solution steps",
                    instructionAfterQuiz: "Tap » to summarise",
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
                        sideLabels: ['20 Km', '15 Km', '25 Km']
                    },
                    angleLabels: ['', '90°', ''],
                    equationTexts: {
                        tripletLabel: 'Time taken to reach the shore = $\\frac{Distance from shore}{average Speed}$',
                        pPlusQ: '<i>p</i> + q',
                        p: '<i>p</i>',
                        pMinusQ: '<i>p</i> - q',
                        comma: ',',
                        equalsSign: '=',
                        colon: 'Time taken by Fishing boat =',
                        touristBoatText: 'Time taken by Tourist boat =',
                        calculationText: 'As given :<br>Distance of fishing boat from shore = 15 Km<br>Average Speed of both boats = 30 Kmph<br><br>As calculated<br>Distance of fishing boat from shore = 25 Km',
                        summaryText: 'Difference in time taken = <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">25</span><span style="display: block; padding: 0 2px;">30</span></span> - <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">15</span><span style="display: block; padding: 0 2px;">30</span></span> = <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">10</span><span style="display: block; padding: 0 2px;">30</span></span> = <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">1</span><span style="display: block; padding: 0 2px;">3</span></span> hours or 20 mins'
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
                                image: 'assets/visual1.png',
                                imageAlt: 'Beach scene with lifeguard and boats',
                                buttonText: 'Fishing boat distance',
                                descriptionText: 'Aldo, the lifeguard, is monitoring the beach. He sees two boats approaching the shore: a fishing boat and a tourist boat.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [],
                                    values: [],
                                    toFind: [
                                        { text: "Determine the difference in time taken by the two boats to approach the shore", size: '20gc', color: highlightColor3 }
                                    ]
                                }
                            },
                            {
                                image: 'assets/visual2.png',
                                imageAlt: 'Distance from lifeguard to fishing boat',
                                buttonText: 'Distance between boats',
                                descriptionText: 'The fishing boat is 15 Km from the shore. This is the horizontal distance from Aldo (the lifeguard) to the fishing boat.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [
                                        { text: "Fishing boat distance from shore = 15 Km", size: '20gc', color: highlightColor1 }
                                    ],
                                    values: [
                                        { text: "Distance from lifeguard to fishing boat = 15 Km", size: '20gc', color: highlightColor2 }
                                    ],
                                    toFind: [
                                        { text: "Determine the difference in time taken by the two boats to approach the shore", size: '20gc', color: highlightColor3 }
                                    ]
                                }
                            },
                            {
                                image: 'assets/visual3.png',
                                imageAlt: 'Vertical distance between the two boats',
                                buttonText: 'What we need to find',
                                descriptionText: 'The vertical distance between the two boats is 20 Km. This is the perpendicular distance from the fishing boat to the tourist boat.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [
                                        { text: "Vertical distance between boats = 20 Km", size: '20gc', color: highlightColor1 }
                                    ],
                                    values: [
                                        { text: "Vertical distance between boats = 20 Km", size: '20gc', color: highlightColor2 }
                                    ],
                                    toFind: [
                                        { text: "Determine the difference in time taken by the two boats to approach the shore", size: '20gc', color: highlightColor3 }
                                    ]
                                }
                            },
                            {
                                image: 'assets/visual4.png',
                                imageAlt: 'Tourist boat distance to shore',
                                buttonText: 'Simplify the visual',
                                descriptionText: 'We know the fishing boat is 15 Km from shore. To find the time difference, we need to determine the tourist boat\'s distance to shore.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [
                                        { text: "Fishing boat distance from shore = 15 Km", size: '20gc', color: highlightColor1 },
                                        { text: "Vertical distance between boats = 20 Km", size: '20gc', color: highlightColor1 }
                                    ],
                                    values: [
                                        { text: "Fishing boat distance = 15 Km", size: '20gc', color: highlightColor1 }
                                    ],
                                    toFind: [
                                        { text: "Distance of tourist boat from shore", size: '20gc', color: highlightColor3 }
                                    ]
                                }
                            },
                            {
                                image: 'assets/visual5.png',
                                imageAlt: 'Right triangle formed by lifeguard and boats',
                                buttonText: null,
                                descriptionText: 'We can see that a right triangle is formed by connecting the lifeguard (Aldo) on the shore, the fishing boat, and the tourist boat. The horizontal line from the lifeguard to the fishing boat and the vertical line between the boats form the two legs of a right triangle.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [
                                        { text: "A right triangle is formed by the lifeguard, fishing boat, and tourist boat", size: '20gc', color: highlightColor1 },
                                        { text: "Horizontal leg = 15 Km (lifeguard to fishing boat)", size: '20gc', color: highlightColor2 },
                                        { text: "Vertical leg = 20 Km (between the two boats)", size: '20gc', color: highlightColor2 }
                                    ],
                                    values: [
                                        { text: "Horizontal distance = 15 Km", size: '20gc', color: highlightColor1 },
                                        { text: "Vertical distance = 20 Km", size: '20gc', color: highlightColor1 }
                                    ],
                                    toFind: [
                                        { text: "Distance of tourist boat from shore (hypotenuse)", size: '20gc', color: highlightColor3 }
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
                            { text: "Komang to Yohana = $1 \\frac{1}{2}$ Km", size: '20gc', color: highlightColor2 }
                        ],
                        values: [
                        ],
                        toFind: [
                        ]
                    },
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['4 m', '5 m', '6 m']
                    },
                    tableHeaders: ['r²', 'p² + q²'],
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
                page13: {
                    headerText: "Let us find the length of the third side",
                    footerInstruction: "Click on the highlighted button to see the solution steps",
                    instructionAfterQuiz: "Tap » to continue",
                    highlights: [
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: "Komang's house is at the center.", size: '20gc', color: highlightColor2 },
                            { text: "Komang to Yohana = $1 \\frac{1}{2}$ Km", size: '20gc', color: highlightColor2 }
                        ],
                        values: [
                        ],
                        toFind: [
                        ]
                    },
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['20 Km', '15 Km', '']
                    },
                    angleLabels: ['', '90°', ''],
                    tableHeaders: ['r²', 'p² + q²'],
                    calculationSteps: {
                        headerText: 'Solution Steps',
                        steps: [
                            {
                                type: 'formula',
                                text: 'Pythagoras\'s theorem: For a right triangle,<br>c² = a² + b², where c is the hypotenuse',
                                buttonText: 'Apply to our case'
                            },
                            {
                                explainer: 'Given the vertical and horizontal sides',
                                text: 'Vertical side (AB) = 20 Km<br>Horizontal side (BC) = 15 Km<br>We need to find the hypotenuse (AC)',
                                buttonText: 'Calculate squares'
                            },
                            {
                                explainer: 'Calculate the squares',
                                text: 'AC² = AB² + BC²<br>AC² = 20² + 15²<br>AC² = 400 + 225 = 625',
                                buttonText: 'Find the hypotenuse'
                            },
                            {
                                explainer: 'Find the square root',
                                text: 'AC = $\\sqrt{625}$<br>AC = 25 Km',
                                buttonText: null
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
                            { text: "Komang to Yohana = $1 \\frac{1}{2}$ Km", size: '20gc', color: highlightColor2 }
                        ],
                        values: [
                        ],
                        toFind: [
                        ]
                    },
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['17 cm', '8 cm', '15 cm']
                    },
                    tableHeaders: ['r²', 'p² + q²'],
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
                questionText: "Aldo adalah seorang penjaga pantai yang selalu memantau kondisi pantai dan juga kapal-kapal yang akan berlabuh di sekitar pantai.\nSuatu hari, Aldo melihat dua kapal, sebuah kapal wisata dan sebuah kapal penangkap ikan, seperti yang ditunjukkan dalam gambar.\nJika kecepatan rata-rata kedua kapal yang mendekati pantai adalah 30 Km/jam, tentukan selisih waktu yang dibutuhkan kedua kapal untuk mendekati pantai.",
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
                        questionText: "Diberikan segitiga siku-siku sama kaki △ABC dengan ∠C = 90° dan AB = 15√2 cm. Pilih gambar yang benar yang mewakili segitiga ini.",
                        options: [
                            {
                                image: "assets/option1.png",
                                text: "",
                                feedback: "Luar biasa",
                                iscorrect: true
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
                                feedback: "Tidak benar. Coba lagi!",
                                iscorrect: false
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
                        vertexLabels: ['B', 'D', 'C'],
                        sideLabels: ['c = x + y', 'a = x', 'b']
                    },
                    angleLabels: ['30°', '60°', '90°'],
                    calculationSteps: {
                        headerText: 'Langkah-langkah Solusi',
                        steps: [
                            {
                                type: 'formula',
                                text: 'Dari halaman 9, kita telah menetapkan:<br>a : b : c = 1 : √3 : 2',
                                buttonText: 'Terapkan rasio'
                            },
                            {
                                explainer: 'Dari rasio a : b : c = 1 : √3 : 2',
                                text: 'Jadi, c = 2a',
                                buttonText: 'Substitusikan nilai'
                            },
                            {
                                explainer: 'Substitusikan a = x dan c = x + y',
                                text: 'Oleh karena itu: x + y = 2x',
                                buttonText: 'Selesaikan untuk y'
                            },
                            {
                                explainer: 'Menyelesaikan untuk y',
                                text: 'y = 2x - x<br>y = x',
                                buttonText: 'Temukan x'
                            },
                            {
                                explainer: 'Jawaban',
                                text: 'x = y',
                                buttonText: null
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
                    headerText: "Sekarang, mari kita cari selisih waktu yang dibutuhkan untuk mencapai pantai",
                    footerInstruction: "Klik \"?\" untuk melihat langkah-langkah solusi",
                    instructionAfterQuiz: "Tekan » untuk merangkum",
                    highlights: [
                    ],
                    informationAnalysis: {
                        facts: [
                        ],
                        values: [],
                        toFind: []
                    },
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['20 Km', '15 Km', '25 Km']
                    },
                    angleLabels: ['', '90°', ''],
                    equationTexts: {
                        tripletLabel: 'Waktu yang dibutuhkan untuk mencapai pantai = $\\frac{\\text{Jarak dari pantai}}{\\text{kecepatan rata-rata}}$',
                        pPlusQ: '<i>p</i> + q',
                        p: '<i>p</i>',
                        pMinusQ: '<i>p</i> - q',
                        comma: ',',
                        equalsSign: '=',
                        colon: 'Waktu yang dibutuhkan kapal penangkap ikan =',
                        touristBoatText: 'Waktu yang dibutuhkan kapal wisata =',
                        calculationText: 'Diberikan :<br>Jarak kapal penangkap ikan dari pantai = 15 Km<br>Kecepatan rata-rata kedua kapal = 30 Kmph<br><br>Dihitung<br>Jarak kapal penangkap ikan dari pantai = 25 Km',
                        summaryText: 'Selisih waktu yang dibutuhkan = <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">25</span><span style="display: block; padding: 0 2px;">30</span></span> - <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">15</span><span style="display: block; padding: 0 2px;">30</span></span> = <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">10</span><span style="display: block; padding: 0 2px;">30</span></span> = <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">1</span><span style="display: block; padding: 0 2px;">3</span></span> jam atau 20 menit'
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
                                image: 'assets/visual1-id.png',
                                imageAlt: 'Adegan pantai dengan penjaga pantai dan kapal',
                                buttonText: 'Jarak kapal penangkap ikan',
                                descriptionText: 'Aldo, penjaga pantai, sedang memantau pantai. Dia melihat dua kapal mendekati pantai: sebuah kapal penangkap ikan dan sebuah kapal wisata.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [],
                                    values: [],
                                    toFind: [
                                        { text: "Tentukan selisih waktu yang dibutuhkan kedua kapal untuk mendekati pantai", size: '20gc', color: highlightColor3 }
                                    ]
                                }
                            },
                            {
                                image: 'assets/visual2-id.png',
                                imageAlt: 'Jarak dari penjaga pantai ke kapal penangkap ikan',
                                buttonText: 'Jarak antara kapal',
                                descriptionText: 'Kapal penangkap ikan berjarak 15 Km dari pantai. Ini adalah jarak horizontal dari Aldo (penjaga pantai) ke kapal penangkap ikan.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [
                                        { text: "Jarak kapal penangkap ikan dari pantai = 15 Km", size: '20gc', color: highlightColor1 }
                                    ],
                                    values: [
                                        { text: "Jarak dari penjaga pantai ke kapal penangkap ikan = 15 Km", size: '20gc', color: highlightColor2 }
                                    ],
                                    toFind: [
                                        { text: "Tentukan selisih waktu yang dibutuhkan kedua kapal untuk mendekati pantai", size: '20gc', color: highlightColor3 }
                                    ]
                                }
                            },
                            {
                                image: 'assets/visual3-id.png',
                                imageAlt: 'Jarak vertikal antara kedua kapal',
                                buttonText: 'Apa yang perlu dicari',
                                descriptionText: 'Jarak vertikal antara kedua kapal adalah 20 Km. Ini adalah jarak tegak lurus dari kapal penangkap ikan ke kapal wisata.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [
                                        { text: "Jarak vertikal antara kapal = 20 Km", size: '20gc', color: highlightColor1 }
                                    ],
                                    values: [
                                        { text: "Jarak vertikal antara kapal = 20 Km", size: '20gc', color: highlightColor2 }
                                    ],
                                    toFind: [
                                        { text: "Tentukan selisih waktu yang dibutuhkan kedua kapal untuk mendekati pantai", size: '20gc', color: highlightColor3 }
                                    ]
                                }
                            },
                            {
                                image: 'assets/visual4-id.png',
                                imageAlt: 'Jarak kapal wisata ke pantai',
                                buttonText: 'Sederhanakan visual',
                                descriptionText: 'Kita sudah tahu kapal penangkap ikan berjarak 15 Km dari pantai. Untuk menemukan selisih waktu, kita perlu menentukan jarak kapal wisata ke pantai.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [
                                        { text: "Jarak kapal penangkap ikan dari pantai = 15 Km", size: '20gc', color: highlightColor1 },
                                        { text: "Jarak vertikal antara kapal = 20 Km", size: '20gc', color: highlightColor1 }
                                    ],
                                    values: [
                                        { text: "Jarak kapal penangkap ikan = 15 Km", size: '20gc', color: highlightColor1 }
                                    ],
                                    toFind: [
                                        { text: "Jarak kapal wisata dari pantai", size: '20gc', color: highlightColor3 }
                                    ]
                                }
                            },
                            {
                                image: 'assets/visual5-id.png',
                                imageAlt: 'Segitiga siku-siku yang dibentuk oleh penjaga pantai dan kapal',
                                buttonText: null,
                                descriptionText: 'Kita dapat melihat bahwa segitiga siku-siku terbentuk dengan menghubungkan penjaga pantai (Aldo) di pantai, kapal penangkap ikan, dan kapal wisata. Garis horizontal dari penjaga pantai ke kapal penangkap ikan dan garis vertikal antara kapal membentuk dua sisi siku-siku dari segitiga siku-siku.',
                                highlights: [],
                                showPreviousImages: [],
                                appendToInfoAnalysis: {
                                    facts: [
                                        { text: "Segitiga siku-siku terbentuk oleh penjaga pantai, kapal penangkap ikan, dan kapal wisata", size: '20gc', color: highlightColor1 },
                                        { text: "Sisi horizontal = 15 Km (penjaga pantai ke kapal penangkap ikan)", size: '20gc', color: highlightColor2 },
                                        { text: "Sisi vertikal = 20 Km (antara kedua kapal)", size: '20gc', color: highlightColor2 }
                                    ],
                                    values: [
                                        { text: "Jarak horizontal = 15 Km", size: '20gc', color: highlightColor1 },
                                        { text: "Jarak vertikal = 20 Km", size: '20gc', color: highlightColor1 }
                                    ],
                                    toFind: [
                                        { text: "Jarak kapal wisata dari pantai (hipotenusa)", size: '20gc', color: highlightColor3 }
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
                            { text: "Komang ke Yohana = $1 \\frac{1}{2}$ Km", size: "20gc", color: highlightColor2 }
                        ],
                        values: [],
                        toFind: []
                    },
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['4 m', '5 m', '6 m']
                    },
                    tableHeaders: ['r²', 'p² + q²'],
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
                page13: {
                    headerText: "Mari kita cari panjang sisi ketiga",
                    footerInstruction: "Klik tombol yang disorot untuk melihat langkah-langkah solusi",
                    instructionAfterQuiz: "Tekan » untuk melanjutkan",
                    highlights: [
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: "Rumah Komang berada di tengah.", size: "20gc", color: highlightColor2 },
                            { text: "Komang ke Yohana = $1 \\frac{1}{2}$ Km", size: "20gc", color: highlightColor2 }
                        ],
                        values: [],
                        toFind: []
                    },
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['20 Km', '15 Km', '']
                    },
                    angleLabels: ['', '90°', ''],
                    tableHeaders: ['r²', 'p² + q²'],
                    calculationSteps: {
                        headerText: 'Langkah-langkah Solusi',
                        steps: [
                            {
                                type: 'formula',
                                text: 'Teorema Pythagoras: Untuk segitiga siku-siku,<br>c² = a² + b², dengan c adalah hipotenusa',
                                buttonText: 'Terapkan pada kasus kita'
                            },
                            {
                                explainer: 'Diberikan sisi vertikal dan horizontal',
                                text: 'Sisi vertikal (AB) = 20 Km<br>Sisi horizontal (BC) = 15 Km<br>Kita perlu mencari hipotenusa (AC)',
                                buttonText: 'Hitung kuadrat'
                            },
                            {
                                explainer: 'Hitung kuadratnya',
                                text: 'AC² = AB² + BC²<br>AC² = 20² + 15²<br>AC² = 400 + 225 = 625',
                                buttonText: 'Cari hipotenusa'
                            },
                            {
                                explainer: 'Cari akar kuadrat',
                                text: 'AC = √625<br>AC = 25 Km',
                                buttonText: null
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
                            { text: "Komang ke Yohana = $1 \\frac{1}{2}$ Km", size: "20gc", color: highlightColor2 }
                        ],
                        values: [],
                        toFind: []
                    },
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['17 cm', '8 cm', '15 cm']
                    },
                    tableHeaders: ['r²', 'p² + q²'],
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
                    triangleLabels: {
                        vertexLabels: ['B', 'D', 'C'],
                        sideLabels: ['c', 'a', 'b']
                    },
                    angleLabels: ['30°', '60°', '90°'],
                    quizPanel: {
                        questionText: "Dalam segitiga siku-siku 30°-60°-90°, di mana 'c' adalah hipotenusa, rasio a:b:c adalah :",
                        options: [
                            {
                                text: "1 : 2 : 3",
                                feedback: "Belum tepat. Dalam segitiga 30°-60°-90°, rasionya bukan 1:2:3. Ingat bahwa sisi yang berhadapan dengan 30° adalah yang terpendek, yang berhadapan dengan 60° adalah √3 kali sisi terpendek, dan hipotenusa adalah 2 kali sisi terpendek. Coba lagi!",
                                iscorrect: false
                            },
                            {
                                text: "1 : √3 : 2",
                                feedback: "Luar biasa! Ini benar. Dalam segitiga 30°-60°-90°, sisi yang berhadapan dengan 30° (a) adalah yang terpendek, sisi yang berhadapan dengan 60° (b) adalah √3 kali sisi terpendek, dan hipotenusa (c) adalah 2 kali sisi terpendek. Jadi rasio a:b:c = 1:√3:2.",
                                iscorrect: true
                            },
                            {
                                text: "2 : √2 : 1",
                                feedback: "Belum tepat. Rasio ini tidak sesuai dengan segitiga 30°-60°-90°. Dalam segitiga 30°-60°-90°, hipotenusa selalu merupakan sisi terpanjang (2 kali sisi terpendek), bukan sisi terpendek. Coba lagi!",
                                iscorrect: false
                            },
                            {
                                text: "1 : √2 : 1",
                                feedback: "Belum tepat. Rasio 1:√2:1 menggambarkan segitiga siku-siku sama kaki (45°-45°-90°), bukan segitiga 30°-60°-90°. Dalam segitiga 30°-60°-90°, hipotenusa seharusnya 2 kali sisi terpendek. Coba lagi!",
                                iscorrect: false
                            }
                        ]
                    }
                },
                page10: {
                    xText: "x",
                    footerInstruction: "Pilih jawaban yang benar untuk mencari panjang sisi-sisinya",
                    triangleLabels: {
                        vertexLabels: ['B', 'D', 'C'],
                        sideLabels: ['c = x + y', 'a = x', 'b']
                    },
                    angleLabels: ['30°', '60°', '90°'],
                    tableHeaders: [
                        '<span style="color: #FF6600;">a</span>',
                        '<span style="color: #00FF7F;">b</span>',
                        '<span style="color: #4A90E2;">c</span>'
                    ],
                    tableRows: [
                        ['<span style="color: #FF6600;">1</span>', '<span style="color: #00FF7F;">√3</span>', '<span style="color: #4A90E2;">2</span>'],
                        ['<span style="color: #FF6600;">60</span>', '', '']
                    ],
                    fillBlanks: {
                        instructionText: "Pilih jawaban yang benar",
                        options: [
                            { id: "opt1", text: "60", blankID: [{ bid: "blank1", text: "60" }, { bid: "blank2", text: "60√3" }, { bid: "blank3", text: "120" }], feedbackText: "Benar!" },
                            { id: "opt2", text: "30", blankID: null, feedbackText: "Belum tepat. Coba lagi." },
                            { id: "opt3", text: "120", blankID: null, feedbackText: "Belum tepat. Coba lagi." },
                            { id: "opt4", text: "60√3", blankID: null, feedbackText: "Belum tepat. Coba lagi." }
                        ],
                        impFormulae: []
                    }
                },
                page11: {
                    headerText: "Mari kita rangkum",
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['20 Km', '15 Km', '25 Km']
                    },
                    angleLabels: ['', '90°', ''],
                    footerInstruction: "Tekan » untuk memulai ulang",
                    feedbackTextbox: {
                        text: "Selisih waktu yang dibutuhkan kedua kapal untuk mencapai pantai adalah <span style=\"bacKmround-color: #FFD700; color: #000000; padding: 2px 4px;\">1/3 jam atau 20 menit</span>"
                    }
                },
                page12: {
                    headerText: "Tentukan sisi-sisi segitiga △",
                    footerInstruction: "Cocokkan sisi yang benar dengan pernyataan",
                    instructionAfterQuiz: "Tekan » untuk melanjutkan",
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['20 Km', '15 Km', '']
                    },
                    angleLabels: ['', '90°', ''],
                    tableHeaders: ['', 'Side'],
                    tableRows: [
                        ['sisi segitiga mewakili jarak dari pengamat di darat ke kapal wisata', ''],
                        ['sisi segitiga mewakili jarak antara kedua kapal?', ''],
                        ['sisi segitiga mewakili jarak dari pengamat di darat ke kapal penangkap ikan', '']
                    ],
                    fillBlanks: {
                        instructionText: "Seret sisi yang benar ke pernyataan yang sesuai di tabel",
                        options: [
                            {
                                id: "opt1",
                                text: "Sisi Vertikal (AB)",
                                blankID: [{ bid: "blank2", text: "Sisi Vertikal (AB)" }],
                                feedbackText: "Benar! Sisi vertikal AB mewakili jarak antara kedua kapal."
                            },
                            {
                                id: "opt2",
                                text: "Sisi Horizontal (BC)",
                                blankID: [{ bid: "blank3", text: "Sisi Horizontal (BC)" }],
                                feedbackText: "Benar! Sisi horizontal BC mewakili jarak dari pengamat di darat ke kapal penangkap ikan."
                            },
                            {
                                id: "opt3",
                                text: "Hipotenusa (AC)",
                                blankID: [{ bid: "blank1", text: "Hipotenusa (AC)" }],
                                feedbackText: "Benar! Hipotenusa AC mewakili jarak dari pengamat di darat ke kapal wisata."
                            }
                        ],
                        impFormulae: []
                    },
                    quizPanel: {
                        questionText: "Dalam segitiga siku-siku 30°-60°-90°, di mana 'c' adalah hipotenusa, rasio a:b:c adalah :",
                        options: [
                            {
                                text: "1 : 2 : 3",
                                feedback: "Belum tepat. Dalam segitiga 30°-60°-90°, rasionya bukan 1:2:3. Ingat bahwa sisi yang berhadapan dengan 30° adalah yang terpendek, yang berhadapan dengan 60° adalah √3 kali sisi terpendek, dan hipotenusa adalah 2 kali sisi terpendek. Coba lagi!",
                                iscorrect: false
                            },
                            {
                                text: "1 : √3 : 2",
                                feedback: "Luar biasa! Ini benar. Dalam segitiga 30°-60°-90°, sisi yang berhadapan dengan 30° (a) adalah yang terpendek, sisi yang berhadapan dengan 60° (b) adalah √3 kali sisi terpendek, dan hipotenusa (c) adalah 2 kali sisi terpendek. Jadi rasio a:b:c = 1:√3:2.",
                                iscorrect: true
                            },
                            {
                                text: "2 : √2 : 1",
                                feedback: "Belum tepat. Rasio ini tidak sesuai dengan segitiga 30°-60°-90°. Dalam segitiga 30°-60°-90°, hipotenusa selalu merupakan sisi terpanjang (2 kali sisi terpendek), bukan sisi terpendek. Coba lagi!",
                                iscorrect: false
                            },
                            {
                                text: "1 : √2 : 1",
                                feedback: "Belum tepat. Rasio 1:√2:1 menggambarkan segitiga siku-siku sama kaki (45°-45°-90°), bukan segitiga 30°-60°-90°. Dalam segitiga 30°-60°-90°, hipotenusa seharusnya 2 kali sisi terpendek. Coba lagi!",
                                iscorrect: false
                            }
                        ]
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
