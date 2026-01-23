// data.js - Internationalization data for the Diver Coral Reef Planting Learning Applet
// Contains only the text content that's actually used in the app

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
                title: "Pythagoras’ theorem - Diver Seabed Reach Calculation"
            },
            messages: {
                pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?",
                nextButtonPage2: "Dispatched page change event",
                previousButtonPage1: "Dispatched page change event",
                navigationReset: "Resetting to question 1",
                navigationComplete: "Complete app reset completed - ready for new question",
                lastPageStartingOver: "Last page - Starting over",
                allStagesCompleted: "All stages completed!"
            },

            buttons: {
                next: "»",
                previous: "«",
                startOver: "Start Over"
            },

            common: {
                tapAlt: "Tap",
                questionText: "Humam is a diver who cares about the environment. One day he and his team will do coral planting to repair damaged coral reefs. Humam's condition is documented as shown in the picture below. If the sea being dived is 20 meters and the bottom is flat. How much area of the seabed can Humam reach to plant coral reefs?",
                questionIcon: "Q",
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
                    instructionText: "Let's find the horizontal distance Human can reach along the seabed."
                },
                page2: {
                    highlights: [],
                    informationAnalysis: {
                        facts: [
                        ],
                        values: [
                        ],
                        toFind: [
                        ]
                    },
                    stageComponent: {
                        headerText: 'Let us visualise the question',
                        stages: [
                            {
                                imageAlt: 'Let us visualise the facts given in the question.',
                                buttonText: 'Show underwater scene',
                                descriptionText: '',
                                highlights: [],
                                appendToInfoAnalysis: {
                                    facts: [],
                                    values: [],
                                    toFind: []
                                }
                            },
                            {
                                image: 'assets/diver1.png',
                                buttonText: 'Show sea depth',
                                descriptionText: 'This is an underwater scene with a boat on the surface and Humam the diver swimming near the seabed. The seabed is flat.',
                                highlights: [],
                                appendToInfoAnalysis: {
                                    facts: [],
                                    values: [],
                                    toFind: []
                                }
                            },
                            {
                                image: 'assets/diver2.png',
                                buttonText: 'Show diagonal reach',
                                descriptionText: 'The sea depth is 20 meters - this is the vertical distance from the boat to the seabed.',
                                highlights: [
                                    {
                                        text: "the sea being dived is 20 meters",
                                        highlightColor: highlightColor1,
                                        fontColor: '#000000',
                                        fontSize: '24gc',
                                        bold: true,
                                        underline: false
                                    },
                                ],
                                appendToInfoAnalysis: {
                                    values: [],
                                    facts: [{ text: 'Sea depth = 20 m', size: '24gc', color: highlightColor1 }],
                                    toFind: []
                                }
                            },
                            {
                                image: 'assets/diver3.png',
                                buttonText: 'Show horizontal distance',
                                descriptionText: 'The diagonal distance from the boat to Humam is 25 meters - this is the maximum reach for coral planting.',
                                highlights: [],
                                appendToInfoAnalysis: {
                                    values: [],
                                    facts: [{ text: 'Diagonal reach from boat to diver = 25 m', size: '24gc', color: highlightColor2 }],
                                    toFind: []
                                }
                            },
                            {
                                image: 'assets/diver4.png',
                                buttonText: 'Simplify the visual',
                                descriptionText: 'We need to find the horizontal distance along the seabed that Humam can reach - this determines the area for coral planting.',
                                highlights: [],
                                appendToInfoAnalysis: {
                                    facts: [],
                                    values: [],
                                    toFind: [{ text: 'Horizontal distance along seabed (area reachable) = ?', size: '24gc', color: highlightColor3 }]
                                }
                            },
                            {
                                image: 'assets/diver5.png',
                                buttonText: 'Simplify the visual',
                                descriptionText: 'This forms a familiar shape: a right triangle, with AB as one leg, AC as the hypotenuse, and BC as the other leg.',
                                highlights: [],
                                appendToInfoAnalysis: {
                                    facts: [],
                                    values: [],
                                    toFind: []
                                }
                            },
                            {
                                image: 'assets/diver6.png',
                                buttonText: '',
                                descriptionText: 'We need to find the horizontal distance using the Pythagoras\' theorem. The hypotenuse is 25 m and one leg (depth) is 20 m.',
                                highlights: [],
                                appendToInfoAnalysis: {
                                    facts: [{ text: 'Pythagoras\' theorem', size: '24gc', color: highlightColor2 }],
                                    values: [],
                                    toFind: []
                                }
                            }
                        ],
                    }
                },
                page3: {
                    highlights: [
                        {
                            text: "the sea being dived is 20 meters",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "How much area of the seabed can Humam reach to plant coral reefs?",
                            highlightColor: highlightColor3,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                    ],
                    informationAnalysis: {
                        facts: [],
                        values: [
                        ],
                        toFind: [
                        ]
                    },
                    quizPanel: {
                        questionText: "Which side of the triangle represents the sea depth (20 m)?",
                        options: [
                            {
                                text: "Horizontal side",
                                feedback: "Incorrect! Try Again."
                            },
                            {
                                text: "Hypotenuse",
                                feedback: "Incorrect! Try Again."
                            },
                            {
                                text: "Vertical Side",
                                feedback: "Correct! Great Job! The vertical side represents the sea depth (20 m).",
                                facts: [
                                    { text: "The vertical side represents the sea depth (20 m)", size: '24gc', color: highlightColor1 }
                                ]
                            },
                            {
                                text: "None of the above",
                                feedback: "Incorrect! Try Again."
                            }
                        ]
                    }
                },
                page4: {
                    highlights: [
                        {
                            text: "the sea being dived is 20 meters",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "How much area of the seabed can Humam reach to plant coral reefs?",
                            highlightColor: highlightColor3,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: "The vertical side represents the sea depth (20 m)", size: '24gc', color: highlightColor1 }
                        ],
                        values: [
                        ],
                        toFind: [
                        ]
                    },
                    quizPanel: {
                        questionText: "Which side represents the diagonal reach from boat to diver (25 m)?",
                        options: [
                            {
                                text: "Horizontal side",
                                feedback: "Incorrect! Try Again."
                            },
                            {
                                text: "Hypotenuse",
                                feedback: "Correct! Great Job! The hypotenuse represents the diagonal reach (25 m).",
                                facts: [
                                    { text: "The hypotenuse represents the diagonal reach from boat to diver (25 m)", size: '24gc', color: highlightColor1 }
                                ],
                                //   toFind: [{ text: 'Horizontal distance along seabed (area reachable) = ?', size: '24gc', color: highlightColor3 }]
                            },
                            {
                                text: "Vertical Side",
                                feedback: "Incorrect! Try Again."
                            },
                            {
                                text: "None of the above",
                                feedback: "Incorrect! Try Again."
                            }
                        ]
                    }
                },
                page5: {
                    highlights: [
                        {
                            text: "the sea being dived is 20 meters",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "How much area of the seabed can Humam reach to plant coral reefs?",
                            highlightColor: highlightColor3,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: "The vertical side represents the sea depth (20 m)", size: '24gc', color: highlightColor1 },
                            { text: "The hypotenuse represents the diagonal reach from boat to diver (25 m)", size: '24gc', color: highlightColor1 }
                        ],
                        values: [
                        ],
                        toFind: [
                        ]
                    },
                    quizPanel: {
                        questionText: "Which side represents the horizontal distance along the seabed (what we need to find)?",
                        options: [
                            {
                                text: "Horizontal side",
                                feedback: "Correct! Great Job! The horizontal side is what we need to find.",
                                facts: [
                                ],
                                toFind: [{ text: 'Horizontal distance along seabed (area reachable) = ?', size: '24gc', color: highlightColor3 }]
                            },
                            {
                                text: "Hypotenuse",
                                feedback: "Incorrect! Try Again."
                            },
                            {
                                text: "Vertical Side",
                                feedback: "Incorrect! The vertical side is the sea depth (20 m). Try Again."
                            },
                            {
                                text: "None of the above",
                                feedback: "Incorrect! Try Again."
                            }
                        ]
                    }
                },
                page6: {
                    highlights: [
                        {
                            text: "Humam",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "20 meters",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "25 meters",
                            highlightColor: highlightColor2,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "How much area of the seabed can Humam reach",
                            highlightColor: highlightColor3,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: 'Sea depth = 20 m', size: '24gc', color: highlightColor1 },
                            { text: 'Diagonal reach from boat to diver = 25 m', size: '24gc', color: highlightColor2 },
                            { text: "The vertical side represents the sea depth (20 m)", size: '24gc', color: highlightColor2 },
                            { text: "The hypotenuse represents the diagonal reach (25 m)", size: '24gc', color: highlightColor2 },
                            { text: "The horizontal side represents the seabed distance (to find)", size: '24gc', color: highlightColor2 }
                        ],
                        values: [
                        ],
                        toFind: [
                            { text: 'Horizontal distance along seabed (area reachable) = ?', size: '24gc', color: highlightColor3 }
                        ]
                    },
                    instructionText: "Simplified diagram to solve the problem - What is the horizontal distance Humam can reach?",
                    fillBlanksInstruction: "Drag and drop the values to fill in the blanks",
                    quizPanel: {
                        questionText: "Using the Pythagoras’ theorem, what formula should we use to find the horizontal distance?",
                        options: [
                            {
                                text: "distance² = 25² + 20²",
                                feedback: "Incorrect! The distance is a leg, not the hypotenuse. We need to subtract."
                            },
                            {
                                text: "distance² = 25² - 20²",
                                feedback: "Correct! Great Job! Since 25 m is the hypotenuse and 20 m is one leg, we use distance² = hypotenuse² - leg²."
                            },
                            {
                                text: "distance = 25 - 20",
                                feedback: "Incorrect! The Pythagoras’ theorem involves squares of the sides, not simple subtraction."
                            },
                            {
                                text: "distance = 25 + 20",
                                feedback: "Incorrect! The Pythagoras’ theorem involves squares of the sides, not simple addition."
                            }
                        ]
                    }
                },
                page7: {
                    highlights: [
                        {
                            text: "Humam",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "20 meters",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "25 meters",
                            highlightColor: highlightColor2,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "How much area of the seabed can Humam reach",
                            highlightColor: highlightColor3,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: 'Diagonal reach (hypotenuse) = 25 m', size: '24gc', color: highlightColor2 },
                            { text: 'Sea depth (vertical) = 20 m', size: '24gc', color: highlightColor1 },
                            { text: 'Horizontal distance = ?', size: '24gc', color: highlightColor3 },
                        ],
                        values: [
                        ],
                        toFind: [
                            { text: 'Horizontal distance along seabed (area reachable) = ?', size: '24gc', color: highlightColor3 }
                        ]
                    }
                },
                page8: {
                    highlights: [
                        {
                            text: "Humam",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "20 meters",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "25 meters",
                            highlightColor: highlightColor2,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "How much area of the seabed can Humam reach",
                            highlightColor: highlightColor3,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: 'Diagonal reach (hypotenuse) = 25 m', size: '24gc', color: highlightColor2 },
                            { text: 'Sea depth (vertical) = 20 m', size: '24gc', color: highlightColor1 },
                        ],
                        values: [
                        ],
                        toFind: [
                            { text: 'Horizontal distance (d) in meters', size: '24gc', color: highlightColor3 }
                        ]
                    }
                },
                page9: {
                    highlights: [
                    ],
                    conceptSummary: {
                        given: [
                            { text: 'Diagonal reach (hypotenuse) = 25 m', size: '24gc', color: '#70ACC7' },
                            { text: 'Sea depth (vertical) = 20 m', size: '24gc', color: '#70ACC7' }
                        ],
                        toFind: [
                            { text: 'Horizontal distance along seabed (area reachable) = ?', size: '24gc', color: '#F28283' }
                        ],
                        facts: [
                            { text: 'Pythagoras\' theorem', size: '24gc', color: '#8A2BE2' }
                        ],
                        values: [
                            { text: 'AB² = 25² - 20²', size: '24gc', color: '#00FF7F' }
                        ]
                    },
                    quizPanel: {
                        questionText: "Choose the correct calculation for the horizontal distance.",
                        options: [
                            {
                                text: "d² = 25² + 20²",
                                feedback: "That's not right! We need to find a leg, not the hypotenuse. Try again."
                            },
                            {
                                text: "AB² = 25² - 20²",
                                feedback: "Great! That's right. AB² = 625 - 400 = 225"
                            },
                            {
                                text: "d = 25 - 20",
                                feedback: "That's not right! The Pythagoras’ theorem uses squares. Try again."
                            },
                            {
                                text: "d = 25 + 20",
                                feedback: "That's not right! We need to subtract, not add. Try again."
                            }
                        ]
                    }
                },
                page10: {
                    highlights: [
                        {
                            text: "the sea being dived is 20 meters",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "How much area of the seabed can Humam reach to plant coral reefs?",
                            highlightColor: highlightColor3,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                    ],
                    conceptSummary: {
                        given: [
                            { text: "The vertical side represents the sea depth (20 m)", size: '24gc', color: highlightColor1 },
                            { text: "The hypotenuse represents the diagonal reach from boat to diver (25 m)", size: '24gc', color: highlightColor1 }
                        ],
                        toFind: [
                            { text: 'Horizontal distance along seabed (area reachable) = ?', size: '24gc', color: '#F28283' }
                        ],
                        facts: [
                            { text: 'Pythagoras\' theorem', size: '24gc', color: '#8A2BE2' }
                        ],
                        values: []
                    },
                    calculationSteps: {
                        headerText: 'Calculation Steps',
                        steps: [
                            {
                                text: 'Pythagoras\' theorem:<br>c² = a² + b²',
                                buttonText: 'Apply to Question'
                            },
                            {
                                explainer: 'For finding a leg, rearrange: a² = c² - b²',
                                text: 'AB² = 25² - 20²',
                                buttonText: 'Calculate Squares'
                            },
                            {
                                explainer: 'Calculating the squares and subtracting',
                                text: 'AB² = 625 - 400 = 225',
                                buttonText: 'Take Square Root'
                            },
                            {
                                text: 'AB = $\\sqrt{225}$ = 15 m',
                                buttonText: ''
                            }
                        ]
                    }
                },

                page11: {
                    highlights: [
                        {
                            text: "the sea being dived is 20 meters",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "How much area of the seabed can Humam reach to plant coral reefs?",
                            highlightColor: highlightColor3,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                    ],
                    conceptSummary: {
                        given: [
                            { text: "The vertical side represents the sea depth (20 m)", size: '24gc', color: highlightColor1 },
                            { text: "The hypotenuse represents the diagonal reach from boat to diver (25 m)", size: '24gc', color: highlightColor1 }
                        ],
                        toFind: [
                            { text: 'Horizontal distance along seabed (area reachable) = ?', size: '24gc', color: '#F28283' }
                        ],
                        facts: [],
                        values: [
                            { text: 'AB² = 25² - 20²', size: '24gc', color: '#00FF7F' },
                            { text: 'AB² = 625 - 400 = 225', size: '24gc', color: '#00FF7F' },
                            { text: 'AB = $\\sqrt{225}$ = 15 m', size: '24gc', color: '#00FF7F' },
                        ]
                    },
                    feedbackText: '<ul><li>The horizontal distance Humam can reach is 15 meters.</li><li>Humam can cover an area of  <span style="background-color:#FFD700;">225π m² on the seabed to plant coral reefs.</span></li></ul>'
                },
                page12: {
                    highlights: [
                        {
                            text: "the sea being dived is 20 meters",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "How much area of the seabed can Humam reach to plant coral reefs?",
                            highlightColor: highlightColor3,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                    ],
                    conceptSummary: {
                        given: [
                            { text: "The vertical side represents the sea depth (20 m)", size: '24gc', color: highlightColor1 },
                            { text: "The hypotenuse represents the diagonal reach from boat to diver (25 m)", size: '24gc', color: highlightColor1 }
                        ],
                        toFind: [
                            { text: 'Horizontal distance along seabed (area reachable) = ?', size: '24gc', color: '#F28283' }
                        ],
                        facts: [],

                        values: [
                            { text: 'AB² = 25² - 20²', size: '24gc', color: '#00FF7F' },
                            { text: 'AB² = 625 - 400 = 225', size: '24gc', color: '#00FF7F' },
                            { text: 'AB = $\\sqrt{225}$ = 15 m', size: '24gc', color: '#00FF7F' },
                        ]
                    },
                    quizPanel: {
                        questionText: "What is the area of the seabed ?",
                        options: [
                            {
                                text: "A = π(15)²",
                                feedback: "Correct! Great Job! AB² = 25² - 20² = 625 - 400 = 225, so AB = $\\sqrt{225}$ = 15 m"
                            },
                            {
                                text: "A = π(15)",
                                feedback: "Incorrect! Using AB² = 25² - 20² = 625 - 400 = 225, we get AB = $\\sqrt{225}$ = 15 m"
                            },
                            {
                                text: "A = 2π (15)",
                                feedback: "Incorrect! Using AB² = 25² - 20² = 625 - 400 = 225, we get AB = $\\sqrt{225}$ = 15 m"
                            },
                            {
                                text: "none of these",
                                feedback: "Incorrect! Using AB² = 25² - 20² = 625 - 400 = 225, we get AB = $\\sqrt{225}$ = 15 m"
                            }
                        ]
                    },
                    seabedText: 'Area of the seabed =  225π m²'
                },
                page13: {
                    highlights: [
                        {
                            text: "the sea being dived is 20 meters",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "How much area of the seabed can Humam reach to plant coral reefs?",
                            highlightColor: highlightColor3,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                    ],
                    conceptSummary: {
                        given: [
                            { text: "The vertical side represents the sea depth (20 m)", size: '24gc', color: highlightColor1 },
                            { text: "The hypotenuse represents the diagonal reach from boat to diver (25 m)", size: '24gc', color: highlightColor1 }
                        ],
                        toFind: [
                            { text: 'Horizontal distance along seabed (area reachable) = ?', size: '24gc', color: '#F28283' }
                        ],
                        facts: [],

                        values: [
                            { text: 'AB² = 25² - 20²', size: '24gc', color: '#00FF7F' },
                            { text: 'AB² = 625 - 400 = 225', size: '24gc', color: '#00FF7F' },
                            { text: 'AB = $\\sqrt{225}$ = 15 m', size: '24gc', color: '#00FF7F' },
                        ]
                    },
                    quizPanel: {
                        questionText: "What shape woukd the diver be able to cover on the sea bed",
                        options: [
                            {
                                text: "Square",
                                feedback: "Incorrect! Using AB² = 25² - 20² = 625 - 400 = 225, we get AB = $\\sqrt{225}$ = 15 m"

                            },
                            {
                                text: "Straight Line",
                                feedback: "Incorrect! Using AB² = 25² - 20² = 625 - 400 = 225, we get AB = $\\sqrt{225}$ = 15 m"
                            },
                            {
                                text: "Circle",
                                feedback: "Correct! Great Job! AB² = 25² - 20² = 625 - 400 = 225, so AB = $\\sqrt{225}$ = 15 m"

                            },
                            {
                                text: "Triangle",
                                feedback: "Incorrect! Using AB² = 25² - 20² = 625 - 400 = 225, we get AB = $\\sqrt{225}$ = 15 m"
                            }
                        ]
                    },
                    seabedText: 'The diver tied to the boat via a rope goes around in a conical shape to form a circular area on the seabed'
                },
            },
        },
        id: {
            appInfo: {
                title: "Teorema Pythagoras - Perhitungan Jangkauan Penyelam"
            },
            messages: {
                pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
                nextButtonPage2: "Mengirimkan event perubahan halaman",
                previousButtonPage1: "Mengirimkan event perubahan halaman",
                navigationReset: "Mengatur ulang ke pertanyaan 1",
                navigationComplete: "Reset aplikasi lengkap selesai - siap untuk pertanyaan baru",
                lastPageStartingOver: "Halaman terakhir - Memulai dari awal",
                allStagesCompleted: "Semua tahap selesai!"
            },

            buttons: {
                next: "»",
                previous: "«",
                startOver: "Mulai Lagi"
            },

            common: {
                tapAlt: "Ketuk",
                questionText: "Humam adalah seorang penyelam yang peduli terhadap lingkungan. Suatu hari dia dan timnya akan melakukan penanaman karang untuk memperbaiki terumbu karang yang rusak. Kondisi Humam didokumentasikan seperti gambar di bawah ini. Jika laut yang diselami sedalam 20 meter dan dasarnya datar. Berapa luas area dasar laut yang dapat dijangkau Humam untuk menanam terumbu karang?",
                questionIcon: "Q",
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
                    instructionText: "Mari kita cari jarak horizontal yang dapat dijangkau Human di dasar laut."
                },
                page2: {
                    highlights: [],
                    informationAnalysis: {
                        facts: [
                        ],
                        values: [
                        ],
                        toFind: [
                        ]
                    },
                    stageComponent: {
                        headerText: 'Mari kita visualisasikan pertanyaan',
                        stages: [
                            {
                                imageAlt: 'Mari kita visualisasikan fakta yang diberikan dalam pertanyaan.',
                                buttonText: 'Tampilkan adegan bawah laut',
                                descriptionText: '',
                                highlights: [],
                                appendToInfoAnalysis: {
                                    facts: [],
                                    values: [],
                                    toFind: []
                                }
                            },
                            {
                                image: 'assets/diver1.png',
                                buttonText: 'Tampilkan adegan bawah laut',
                                descriptionText: 'Ini adalah adegan bawah laut dengan kapal di permukaan dan Humam penyelam yang berenang di dekat dasar laut. Dasar lautnya datar.',
                                highlights: [
                                    {
                                        text: "Humam",
                                        highlightColor: highlightColor1,
                                        fontColor: '#000000',
                                        fontSize: '24gc',
                                        bold: true,
                                        underline: false
                                    },
                                ],
                                appendToInfoAnalysis: {
                                    facts: [],
                                    values: [],
                                    toFind: []
                                }
                            },
                            {
                                image: 'assets/diver2.png',
                                buttonText: 'Tampilkan kedalaman laut',
                                descriptionText: 'Kedalaman laut adalah 20 meter - ini adalah jarak vertikal dari kapal ke dasar laut.',
                                highlights: [
                                    {
                                        text: "Humam",
                                        highlightColor: highlightColor1,
                                        fontColor: '#000000',
                                        fontSize: '24gc',
                                        bold: true,
                                        underline: false
                                    },
                                    {
                                        text: "20 meter",
                                        highlightColor: highlightColor1,
                                        fontColor: '#000000',
                                        fontSize: '24gc',
                                        bold: true,
                                        underline: false
                                    }
                                ],
                                appendToInfoAnalysis: {
                                    values: [],
                                    facts: [{ text: 'Kedalaman laut = 20 m', size: '24gc', color: highlightColor1 }],
                                    toFind: []
                                }
                            },
                            {
                                image: 'assets/diver3.png',
                                buttonText: 'Tampilkan jangkauan diagonal',
                                descriptionText: 'Jarak diagonal dari kapal ke Humam adalah 25 meter - ini adalah jangkauan maksimum untuk penanaman karang.',
                                highlights: [
                                    {
                                        text: "Humam",
                                        highlightColor: highlightColor1,
                                        fontColor: '#000000',
                                        fontSize: '24gc',
                                        bold: true,
                                        underline: false
                                    },
                                    {
                                        text: "20 meter",
                                        highlightColor: highlightColor1,
                                        fontColor: '#000000',
                                        fontSize: '24gc',
                                        bold: true,
                                        underline: false
                                    },
                                    {
                                        text: "25 meter",
                                        highlightColor: highlightColor2,
                                        fontColor: '#000000',
                                        fontSize: '24gc',
                                        bold: true,
                                        underline: false
                                    }
                                ],
                                appendToInfoAnalysis: {
                                    values: [],
                                    facts: [{ text: 'Jangkauan diagonal dari kapal ke penyelam = 25 m', size: '24gc', color: highlightColor2 }],
                                    toFind: []
                                }
                            },
                            {
                                image: 'assets/diver4.png',
                                buttonText: 'Tampilkan jarak horizontal',
                                descriptionText: 'Kita perlu mencari jarak horizontal sepanjang dasar laut yang dapat dijangkau Humam - ini menentukan area untuk penanaman karang.',
                                highlights: [
                                    {
                                        text: "Humam",
                                        highlightColor: highlightColor1,
                                        fontColor: '#000000',
                                        fontSize: '24gc',
                                        bold: true,
                                        underline: false
                                    },
                                    {
                                        text: "20 meter",
                                        highlightColor: highlightColor1,
                                        fontColor: '#000000',
                                        fontSize: '24gc',
                                        bold: true,
                                        underline: false
                                    },
                                    {
                                        text: "25 meter",
                                        highlightColor: highlightColor2,
                                        fontColor: '#000000',
                                        fontSize: '24gc',
                                        bold: true,
                                        underline: false
                                    },
                                    {
                                        text: "Berapa luas area dasar laut yang dapat dijangkau Humam",
                                        highlightColor: highlightColor3,
                                        fontColor: '#000000',
                                        fontSize: '24gc',
                                        bold: true,
                                        underline: false
                                    }
                                ],
                                appendToInfoAnalysis: {
                                    facts: [],
                                    values: [],
                                    toFind: [{ text: 'Jarak horizontal sepanjang dasar laut (area yang dapat dijangkau) = ?', size: '24gc', color: highlightColor3 }]
                                }
                            },
                            {
                                image: 'assets/diver5.png',
                                buttonText: 'Sederhanakan visual',
                                descriptionText: 'Ini membentuk bentuk yang familiar: segitiga siku-siku, dengan AB sebagai satu kaki, AC sebagai sisi miring, dan BC sebagai kaki lainnya.',
                                highlights: [
                                    {
                                        text: "Humam",
                                        highlightColor: highlightColor1,
                                        fontColor: '#000000',
                                        fontSize: '24gc',
                                        bold: true,
                                        underline: false
                                    },
                                    {
                                        text: "20 meter",
                                        highlightColor: highlightColor1,
                                        fontColor: '#000000',
                                        fontSize: '24gc',
                                        bold: true,
                                        underline: false
                                    },
                                    {
                                        text: "25 meter",
                                        highlightColor: highlightColor2,
                                        fontColor: '#000000',
                                        fontSize: '24gc',
                                        bold: true,
                                        underline: false
                                    },
                                    {
                                        text: "Berapa luas area dasar laut yang dapat dijangkau Humam",
                                        highlightColor: highlightColor3,
                                        fontColor: '#000000',
                                        fontSize: '24gc',
                                        bold: true,
                                        underline: false
                                    }
                                ],
                                appendToInfoAnalysis: {
                                    facts: [],
                                    values: [],
                                    toFind: []
                                }
                            },
                            {
                                image: 'assets/diver6.png',
                                buttonText: '',
                                descriptionText: 'Kita perlu mencari jarak horizontal menggunakan teorema Pythagoras. Sisi miring adalah 25 m dan satu kaki (kedalaman) adalah 20 m.',
                                highlights: [
                                    {
                                        text: "Humam",
                                        highlightColor: highlightColor1,
                                        fontColor: '#000000',
                                        fontSize: '24gc',
                                        bold: true,
                                        underline: false
                                    },
                                    {
                                        text: "20 meter",
                                        highlightColor: highlightColor1,
                                        fontColor: '#000000',
                                        fontSize: '24gc',
                                        bold: true,
                                        underline: false
                                    },
                                    {
                                        text: "25 meter",
                                        highlightColor: highlightColor2,
                                        fontColor: '#000000',
                                        fontSize: '24gc',
                                        bold: true,
                                        underline: false
                                    },
                                    {
                                        text: "Berapa luas area dasar laut yang dapat dijangkau Humam",
                                        highlightColor: highlightColor3,
                                        fontColor: '#000000',
                                        fontSize: '24gc',
                                        bold: true,
                                        underline: false
                                    },
                                ],
                                appendToInfoAnalysis: {
                                    facts: [{ text: 'Teorema Pythagoras', size: '24gc', color: highlightColor2 }],
                                    values: [],
                                    toFind: []
                                }
                            }
                        ],
                    }
                },
                page3: {
                    highlights: [
                        {
                            text: "Humam",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "20 meter",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "Berapa luas area dasar laut yang dapat dijangkau Humam",
                            highlightColor: highlightColor3,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: 'Kedalaman laut = 20 m', size: '24gc', color: highlightColor1 },
                            { text: 'Jangkauan diagonal dari kapal ke penyelam = 25 m', size: '24gc', color: highlightColor2 }
                        ],
                        values: [
                        ],
                        toFind: [
                            { text: 'Jarak horizontal sepanjang dasar laut (area yang dapat dijangkau) = ?', size: '24gc', color: highlightColor3 }
                        ]
                    },
                    quizPanel: {
                        questionText: "Sisi mana dari segitiga yang mewakili kedalaman laut (20 m)?",
                        options: [
                            {
                                text: "Sisi horizontal",
                                feedback: "Salah! Coba lagi."
                            },
                            {
                                text: "Sisi miring",
                                feedback: "Salah! Coba lagi."
                            },
                            {
                                text: "Sisi vertikal",
                                feedback: "Benar! Kerja bagus! Sisi vertikal mewakili kedalaman laut (20 m).",
                                facts: [
                                    { text: "Sisi vertikal mewakili kedalaman laut (20 m)", size: '24gc', color: highlightColor2 }
                                ]
                            },
                            {
                                text: "Tidak ada yang benar",
                                feedback: "Salah! Coba lagi."
                            }
                        ]
                    }
                },
                page4: {
                    highlights: [
                        {
                            text: "Humam",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "20 meter",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "25 meter",
                            highlightColor: highlightColor2,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "Berapa luas area dasar laut yang dapat dijangkau Humam",
                            highlightColor: highlightColor3,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: 'Kedalaman laut = 20 m', size: '24gc', color: highlightColor1 },
                            { text: 'Jangkauan diagonal dari kapal ke penyelam = 25 m', size: '24gc', color: highlightColor2 },
                            { text: "Sisi vertikal mewakili kedalaman laut (20 m)", size: '24gc', color: highlightColor2 }
                        ],
                        values: [
                        ],
                        toFind: [
                            { text: 'Jarak horizontal sepanjang dasar laut (area yang dapat dijangkau) = ?', size: '24gc', color: highlightColor3 }
                        ]
                    },
                    quizPanel: {
                        questionText: "Sisi mana yang mewakili jangkauan diagonal dari kapal ke penyelam (25 m)?",
                        options: [
                            {
                                text: "Sisi horizontal",
                                feedback: "Salah! Coba lagi."
                            },
                            {
                                text: "Sisi miring",
                                feedback: "Benar! Kerja bagus! Sisi miring mewakili jangkauan diagonal (25 m).",
                                facts: [
                                    { text: "Sisi miring mewakili jangkauan diagonal dari kapal ke penyelam (25 m)", size: '24gc', color: highlightColor2 }
                                ],
                                toFind: [{ text: 'Jarak horizontal sepanjang dasar laut (area yang dapat dijangkau) = ?', size: '24gc', color: highlightColor3 }]
                            },
                            {
                                text: "Sisi vertikal",
                                feedback: "Salah! Coba lagi."
                            },
                            {
                                text: "Tidak ada yang benar",
                                feedback: "Salah! Coba lagi."
                            }
                        ]
                    }
                },
                page5: {
                    highlights: [
                        {
                            text: "Humam",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "20 meter",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "25 meter",
                            highlightColor: highlightColor2,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "Berapa luas area dasar laut yang dapat dijangkau Humam",
                            highlightColor: highlightColor3,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: 'Kedalaman laut = 20 m', size: '24gc', color: highlightColor1 },
                            { text: 'Jangkauan diagonal dari kapal ke penyelam = 25 m', size: '24gc', color: highlightColor2 },
                            { text: "Sisi vertikal mewakili kedalaman laut (20 m)", size: '24gc', color: highlightColor2 },
                            { text: "Sisi miring mewakili jangkauan diagonal (25 m)", size: '24gc', color: highlightColor2 }
                        ],
                        values: [
                        ],
                        toFind: [
                            { text: 'Jarak horizontal sepanjang dasar laut (area yang dapat dijangkau) = ?', size: '24gc', color: highlightColor3 }
                        ]
                    },
                    quizPanel: {
                        questionText: "Sisi mana yang mewakili jarak horizontal sepanjang dasar laut (yang perlu dicari)?",
                        options: [
                            {
                                text: "Sisi horizontal",
                                feedback: "Benar! Kerja bagus! Sisi horizontal adalah yang perlu kita cari.",
                                facts: [
                                ],
                                toFind: [{ text: 'Jarak horizontal sepanjang dasar laut (area yang dapat dijangkau) = ?', size: '24gc', color: highlightColor3 }]
                            },
                            {
                                text: "Sisi miring",
                                feedback: "Salah! Coba lagi."
                            },
                            {
                                text: "Sisi vertikal",
                                feedback: "Salah! Sisi vertikal adalah kedalaman laut (20 m). Coba lagi."
                            },
                            {
                                text: "Tidak ada yang benar",
                                feedback: "Salah! Coba lagi."
                            }
                        ]
                    }
                },
                page6: {
                    highlights: [
                        {
                            text: "Humam",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "20 meter",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "25 meter",
                            highlightColor: highlightColor2,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "Berapa luas area dasar laut yang dapat dijangkau Humam",
                            highlightColor: highlightColor3,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: 'Kedalaman laut = 20 m', size: '24gc', color: highlightColor1 },
                            { text: 'Jangkauan diagonal dari kapal ke penyelam = 25 m', size: '24gc', color: highlightColor2 },
                            { text: "Sisi vertikal mewakili kedalaman laut (20 m)", size: '24gc', color: highlightColor2 },
                            { text: "Sisi miring mewakili jangkauan diagonal (25 m)", size: '24gc', color: highlightColor2 },
                            { text: "Sisi horizontal mewakili jarak dasar laut (yang dicari)", size: '24gc', color: highlightColor2 }
                        ],
                        values: [
                        ],
                        toFind: [
                            { text: 'Jarak horizontal sepanjang dasar laut (area yang dapat dijangkau) = ?', size: '24gc', color: highlightColor3 }
                        ]
                    },
                    instructionText: "Diagram sederhana untuk menyelesaikan masalah - Berapa jarak horizontal yang dapat dijangkau Humam?",
                    fillBlanksInstruction: "Seret dan lepas nilai-nilai untuk mengisi bagian yang kosong",
                    quizPanel: {
                        questionText: "Menggunakan teorema Pythagoras, rumus apa yang harus kita gunakan untuk mencari jarak horizontal?",
                        options: [
                            {
                                text: "jarak² = 25² + 20²",
                                feedback: "Salah! Jarak adalah kaki, bukan sisi miring. Kita perlu mengurangi."
                            },
                            {
                                text: "jarak² = 25² - 20²",
                                feedback: "Benar! Kerja bagus! Karena 25 m adalah sisi miring dan 20 m adalah satu kaki, kita gunakan jarak² = sisi miring² - kaki²."
                            },
                            {
                                text: "jarak = 25 - 20",
                                feedback: "Salah! Teorema Pythagoras menggunakan kuadrat sisi, bukan pengurangan sederhana."
                            },
                            {
                                text: "jarak = 25 + 20",
                                feedback: "Salah! Teorema Pythagoras menggunakan kuadrat sisi, bukan penjumlahan sederhana."
                            }
                        ]
                    }
                },
                page7: {
                    highlights: [
                        {
                            text: "Humam",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "20 meter",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "25 meter",
                            highlightColor: highlightColor2,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "Berapa luas area dasar laut yang dapat dijangkau Humam",
                            highlightColor: highlightColor3,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: 'Jangkauan diagonal (sisi miring) = 25 m', size: '24gc', color: highlightColor2 },
                            { text: 'Kedalaman laut (vertikal) = 20 m', size: '24gc', color: highlightColor1 },
                            { text: 'Jarak horizontal = ?', size: '24gc', color: highlightColor3 },
                        ],
                        values: [
                        ],
                        toFind: [
                            { text: 'Jarak horizontal sepanjang dasar laut (area yang dapat dijangkau) = ?', size: '24gc', color: highlightColor3 }
                        ]
                    }
                },
                page8: {
                    highlights: [
                        {
                            text: "Humam",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "20 meter",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "25 meter",
                            highlightColor: highlightColor2,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "Berapa luas area dasar laut yang dapat dijangkau Humam",
                            highlightColor: highlightColor3,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: 'Jangkauan diagonal (sisi miring) = 25 m', size: '24gc', color: highlightColor2 },
                            { text: 'Kedalaman laut (vertikal) = 20 m', size: '24gc', color: highlightColor1 },
                        ],
                        values: [
                        ],
                        toFind: [
                            { text: 'Jarak horizontal (d) dalam meter', size: '24gc', color: highlightColor3 }
                        ]
                    }
                },
                page9: {
                    highlights: [
                    ],
                    conceptSummary: {
                        given: [
                            { text: 'Jangkauan diagonal (sisi miring) = 25 m', size: '24gc', color: '#70ACC7' },
                            { text: 'Kedalaman laut (vertikal) = 20 m', size: '24gc', color: '#70ACC7' }
                        ],
                        toFind: [
                            { text: 'Jarak horizontal sepanjang dasar laut (area yang dapat dijangkau) = ?', size: '24gc', color: '#F28283' }
                        ],
                        facts: [
                            { text: 'Teorema Pythagoras', size: '24gc', color: '#8A2BE2' }
                        ],
                        values: [
                            { text: 'AB² = 25² - 20²', size: '24gc', color: '#00FF7F' }
                        ]
                    },
                    quizPanel: {
                        questionText: "Pilih perhitungan yang benar untuk jarak horizontal.",
                        options: [
                            {
                                text: "d² = 25² + 20²",
                                feedback: "Itu tidak benar! Kita perlu mencari kaki, bukan sisi miring. Coba lagi."
                            },
                            {
                                text: "AB² = 25² - 20²",
                                feedback: "Bagus! Itu benar. AB² = 625 - 400 = 225"
                            },
                            {
                                text: "d = 25 - 20",
                                feedback: "Itu tidak benar! Teorema Pythagoras menggunakan kuadrat. Coba lagi."
                            },
                            {
                                text: "d = 25 + 20",
                                feedback: "Itu tidak benar! Kita perlu mengurangi, bukan menambah. Coba lagi."
                            }
                        ]
                    }
                },
                page10: {
                    highlights: [
                        {
                            text: "laut yang diselami sedalam 20 meter",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "Berapa luas area dasar laut yang dapat dijangkau Humam untuk menanam terumbu karang?",
                            highlightColor: highlightColor3,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                    ],
                    conceptSummary: {
                        given: [
                            { text: "Sisi vertikal mewakili kedalaman laut (20 m)", size: '24gc', color: highlightColor1 },
                            { text: "Sisi miring mewakili jangkauan diagonal dari kapal ke penyelam (25 m)", size: '24gc', color: highlightColor1 }
                        ],
                        toFind: [
                            { text: 'Jarak horizontal sepanjang dasar laut (area yang dapat dijangkau) = ?', size: '24gc', color: '#F28283' }
                        ],
                        facts: [
                            { text: 'Teorema Pythagoras', size: '24gc', color: '#8A2BE2' }
                        ],
                        values: []
                    },
                    calculationSteps: {
                        headerText: 'Langkah Perhitungan',
                        steps: [
                            {
                                text: 'Teorema Pythagoras:<br>c² = a² + b²',
                                buttonText: 'Terapkan ke Pertanyaan'
                            },
                            {
                                explainer: 'Untuk mencari kaki, susun ulang: a² = c² - b²',
                                text: 'AB² = 25² - 20²',
                                buttonText: 'Hitung Kuadrat'
                            },
                            {
                                explainer: 'Menghitung kuadrat dan mengurangi',
                                text: 'AB² = 625 - 400 = 225',
                                buttonText: 'Ambil Akar Kuadrat'
                            },
                            {
                                text: 'AB = $\\sqrt{225}$ = 15 m',
                                buttonText: ''
                            }
                        ]
                    }
                },

                page11: {
                    highlights: [
                        {
                            text: "kedalaman laut yang diselami adalah 20 meter",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "Berapa luas dasar laut yang dapat dijangkau Humam untuk menanam terumbu karang?",
                            highlightColor: highlightColor3,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                    ],
                    conceptSummary: {
                        given: [
                            { text: "Sisi vertikal mewakili kedalaman laut (20 m)", size: '24gc', color: highlightColor1 },
                            { text: "Sisi miring mewakili jangkauan diagonal dari perahu ke penyelam (25 m)", size: '24gc', color: highlightColor1 }
                        ],
                        toFind: [
                            { text: 'Jarak horizontal di dasar laut (luas yang dapat dijangkau) = ?', size: '24gc', color: '#F28283' }
                        ],
                        facts: [],
                        values: [
                            { text: 'AB² = 25² - 20²', size: '24gc', color: '#00FF7F' },
                            { text: 'AB² = 625 - 400 = 225', size: '24gc', color: '#00FF7F' },
                            { text: 'AB = $\\sqrt{225}$ = 15 m', size: '24gc', color: '#00FF7F' },
                        ]
                    },
                    feedbackText: '<ul><li>Jarak horizontal yang dapat dijangkau Humam adalah 15 meter.</li><li>Humam dapat mencakup area <span style="background-color:#FFD700;">225π m² di dasar laut untuk menanam terumbu karang.</span></li></ul>'
                },
                page12: {
                    highlights: [
                        {
                            text: "kedalaman laut yang diselami adalah 20 meter",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "Berapa luas dasar laut yang dapat dijangkau Humam untuk menanam terumbu karang?",
                            highlightColor: highlightColor3,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                    ],
                    conceptSummary: {
                        given: [
                            { text: "Sisi vertikal mewakili kedalaman laut (20 m)", size: '24gc', color: highlightColor1 },
                            { text: "Sisi miring mewakili jangkauan diagonal dari perahu ke penyelam (25 m)", size: '24gc', color: highlightColor1 }
                        ],
                        toFind: [
                            { text: 'Jarak horizontal di dasar laut (luas yang dapat dijangkau) = ?', size: '24gc', color: '#F28283' }
                        ],
                        facts: [],
                        values: [
                            { text: 'AB² = 25² - 20²', size: '24gc', color: '#00FF7F' },
                            { text: 'AB² = 625 - 400 = 225', size: '24gc', color: '#00FF7F' },
                            { text: 'AB = $\\sqrt{225}$ = 15 m', size: '24gc', color: '#00FF7F' },
                        ]
                    },
                    quizPanel: {
                        questionText: "Berapa luas dasar laut?",
                        options: [
                            {
                                text: "A = π(15)²",
                                feedback: "Benar! Kerja bagus! AB² = 25² - 20² = 625 - 400 = 225, sehingga AB = $\\sqrt{225}$ = 15 m"
                            },
                            {
                                text: "A = π(15)",
                                feedback: "Salah! Dengan menggunakan AB² = 25² - 20² = 625 - 400 = 225, diperoleh AB = $\\sqrt{225}$ = 15 m"
                            },
                            {
                                text: "A = 2π (15)",
                                feedback: "Salah! Dengan menggunakan AB² = 25² - 20² = 625 - 400 = 225, diperoleh AB = $\\sqrt{225}$ = 15 m"
                            },
                            {
                                text: "tidak ada jawaban yang benar",
                                feedback: "Salah! Dengan menggunakan AB² = 25² - 20² = 625 - 400 = 225, diperoleh AB = $\\sqrt{225}$ = 15 m"
                            }
                        ]
                    },
                    seabedText: 'Luas dasar laut = 225π m²'
                },
                page13: {
                    highlights: [
                        {
                            text: "kedalaman laut yang diselami adalah 20 meter",
                            highlightColor: highlightColor1,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                        {
                            text: "Berapa luas dasar laut yang dapat dijangkau Humam untuk menanam terumbu karang?",
                            highlightColor: highlightColor3,
                            fontColor: '#000000',
                            fontSize: '24gc',
                            bold: true,
                            underline: false
                        },
                    ],
                    conceptSummary: {
                        given: [
                            { text: "Sisi vertikal mewakili kedalaman laut (20 m)", size: '24gc', color: highlightColor1 },
                            { text: "Sisi miring mewakili jangkauan diagonal dari perahu ke penyelam (25 m)", size: '24gc', color: highlightColor1 }
                        ],
                        toFind: [
                            { text: 'Jarak horizontal di dasar laut (luas yang dapat dijangkau) = ?', size: '24gc', color: '#F28283' }
                        ],
                        facts: [],
                        values: [
                            { text: 'AB² = 25² - 20²', size: '24gc', color: '#00FF7F' },
                            { text: 'AB² = 625 - 400 = 225', size: '24gc', color: '#00FF7F' },
                            { text: 'AB = $\\sqrt{225}$ = 15 m', size: '24gc', color: '#00FF7F' },
                        ]
                    },
                    quizPanel: {
                        questionText: "Bentuk apa yang dapat dicakup penyelam di dasar laut?",
                        options: [
                            {
                                text: "Persegi",
                                feedback: "Salah! Dengan menggunakan AB² = 25² - 20² = 625 - 400 = 225, diperoleh AB = $\\sqrt{225}$ = 15 m"
                            },
                            {
                                text: "Garis lurus",
                                feedback: "Salah! Dengan menggunakan AB² = 25² - 20² = 625 - 400 = 225, diperoleh AB = $\\sqrt{225}$ = 15 m"
                            },
                            {
                                text: "Lingkaran",
                                feedback: "Benar! Kerja bagus! AB² = 25² - 20² = 625 - 400 = 225, sehingga AB = $\\sqrt{225}$ = 15 m"
                            },
                            {
                                text: "Segitiga",
                                feedback: "Salah! Dengan menggunakan AB² = 25² - 20² = 625 - 400 = 225, diperoleh AB = $\\sqrt{225}$ = 15 m"
                            }
                        ]
                    },
                    seabedText: 'Penyelam yang terikat pada perahu dengan tali bergerak membentuk lintasan melingkar sehingga menghasilkan area berbentuk lingkaran di dasar laut'
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
