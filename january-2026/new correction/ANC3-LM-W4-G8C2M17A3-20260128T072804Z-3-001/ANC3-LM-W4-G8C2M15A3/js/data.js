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
                questionText: "An observation helicopter is looking at several objects below it at a height of 500 m above ground level. The objects seen by the helicopter are named point A, point B, and point C.<br>Based on the illustration and previous information, determine<br>a. Distance OA<br>b. Distance AB<br>c. Distance BC",
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
                    instructionText: "Let's find the distance between the green car and the red car using the Pythagorean theorem.",
                    headerText: "Read the question and identify 'given' and 'to find'",
                    footerInstruction: "Tap » to visualise the problem"
                },
                page17: {
                    headerText: "Let us summarise",
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['20 KM', '15 KM', '25 KM']
                    },
                    angleLabels: ['', '90°', ''],
                    footerInstruction: "Tap » to start over",
                    feedbackTextbox: {
                        text: "we determined:<br>a. Distance OA = <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">289.02 m</span> (using 30° –60° –90° triangle ratio)<br>b. Distance AB = <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">210.98 m</span> (using 45° – 45° – 90° triangle ratio, AB = OB − OA)<br>c. Distance BC = <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">365 m</span> (using 30° – 60° – 90° triangle ratio, BC = OC − OB)"
                    }
                },
                page12: {
                    headerText: "Determine the sides of the △",
                    footerInstruction: "Match the correct side with the statement",
                    instructionAfterQuiz: "Tap » to continue",
                    triangleLabels: {
                        vertexLabels: ['C', 'B', 'A'],
                        sideLabels: ['', '120 m', '']
                    },
                    angleLabels: ['', '90°', ''],
                    tableHeaders: ['', 'Side'],
                    tableRows: [
                        ['Side of the triangle represents the line of sight from the helicopter to the point on the ground.', ''],
                        ['Side of the triangle represents the horizontal distance from the point directly below the helicopter to the point on the ground.', ''],
                        ['Side of the triangle represents the vertical height of the helicopter above the ground (500 m).', '']
                    ],
                    fillBlanks: {
                        instructionText: "Drag the correct side to the matching statement in the table",
                        options: [
                            {
                                id: "opt1",
                                text: "Vertical side",
                                blankID: [{ bid: "blank3", text: "Vertical side" }],
                                feedbackText: "Correct! The vertical side represents the vertical height of the helicopter above the ground (500 m)."
                            },
                            {
                                id: "opt2",
                                text: "Hypotenuse",
                                blankID: [{ bid: "blank1", text: "Hypotenuse" }],
                                feedbackText: "Correct! The hypotenuse represents the line of sight from the helicopter to the point on the ground."
                            },
                            {
                                id: "opt3",
                                text: "Horizontal side",
                                blankID: [{ bid: "blank2", text: "Horizontal side" }],
                                feedbackText: "Correct! The horizontal side represents the horizontal distance from the point directly below the helicopter to the point on the ground."
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
                page18: {
                    headerText: "Determine the relationship between the sides of different △s",
                    footerInstruction: "Match the correct side ratio with statement",
                    instructionAfterQuiz: "Tap » to continue",
                    triangleLabels: {
                        vertexLabels: ['C', 'B', 'A'],
                        sideLabels: ['', '120 m', '']
                    },
                    angleLabels: ['', '90°', ''],
                    tableHeaders: ['', 'Ratio'],
                    tableRows: [
                        ['In a 45° – 45° – 90° triangle (isosceles right triangle) the sides are always in the ratio of ?', ''],
                        ['In a 30° – 60° – 90° right triangle the sides (shortest: longer: hypotenuse) always follow the ratio of?', '']
                    ],
                    fillBlanks: {
                        instructionText: "Drag the correct ratio to the matching statement in the table",
                        options: [
                            {
                                id: "opt1",
                                text: "1 : √2 : 1",
                                blankID: null,
                                feedbackText: "Not quite. This ratio doesn't match either triangle type. Try again!"
                            },
                            {
                                id: "opt2",
                                text: "1 : √3 : 2",
                                blankID: [{ bid: "blank2", text: "1 : √3 : 2" }],
                                feedbackText: "Correct! In a 30°–60°–90° triangle, the shortest side (opposite 30°) is 1, the longer side (opposite 60°) is √3, and the hypotenuse is 2, so the ratio is 1 : √3 : 2."
                            },
                            {
                                id: "opt3",
                                text: "2 : √3 : 1",
                                blankID: null,
                                feedbackText: "Not quite. This ratio doesn't match either triangle type. Try again!"
                            },
                            {
                                id: "opt4",
                                text: "1 : 1 : √2",
                                blankID: [{ bid: "blank1", text: "1 : 1 : √2" }],
                                feedbackText: "Correct! In a 45°–45°–90° triangle, the two legs are equal and the hypotenuse is √2 times the leg length, so the ratio is 1 : 1 : √2."
                            },
                            {
                                id: "opt5",
                                text: "√2 : 1 : 1",
                                blankID: null,
                                feedbackText: "Not quite. This ratio doesn't match either triangle type. Try again!"
                            },
                            {
                                id: "opt6",
                                text: "1 : 2 : 3",
                                blankID: null,
                                feedbackText: "Not quite. This ratio doesn't match either triangle type. Try again!"
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
                page13: {
                    headerText: 'Finding the <span style="color: #ffffff;">length of OA</span> in △OAH',
                    footerInstruction: "Click on the highlighted button to see the solution steps",
                    instructionAfterQuiz: "Tap » to continue",
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
                        vertexLabels: ['B', 'A', 'C'],
                        sideLabels: ['120 m', '130 m', '? m']
                    },
                    angleLabels: ['90°', '', ''],
                    tableHeaders: ['r²', 'p² + q²'],
                    calculationSteps: {
                        headerText: 'Solution Steps',
                        steps: [
                            {
                                type: 'formula',
                                text: 'In a 30° – 60° – 90° right triangle the sides (shortest: longer: hypotenuse) always follow the ratio of 1 : √3 : 2',
                                buttonText: 'Apply to our case'
                            },
                            {
                                explainer: 'Establishing relation between OA and OH and solving for it',
                                text: 'OA : OH : AH = 1 : √3 : 2 (Using the ratio 1 : √3 : 2)<br>thus, OA:OH = 1 : √3',
                                buttonText: 'Solve for OA'
                            },
                            {
                                explainer: 'Substituting OH = 500 m',
                                text: 'OA = $\\frac{OH}{√3}$<br>OA = $\\frac{500}{√3}$ = $\\frac{500}{1.73}$',
                                buttonText: 'Calculate OA'
                            },
                            {
                                explainer: 'Final value',
                                text: 'OA = 289.02 m',
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
                page15: {
                    headerText: 'Finding the <span style="color: #ffffff;">length of AB</span> in △OBH',
                    footerInstruction: "Click on the highlighted button to see the solution steps",
                    instructionAfterQuiz: "Tap » to continue",
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
                        vertexLabels: ['B', 'A', 'C'],
                        sideLabels: ['120 m', '150 m', '? m']
                    },
                    angleLabels: ['90°', '', ''],
                    tableHeaders: ['r²', 'p² + q²'],
                    calculationSteps: {
                        headerText: 'Solution Steps',
                        steps: [
                            {
                                type: 'formula',
                                text: 'In a 45° – 45° – 90° triangle (isosceles right triangle) the sides are always in the ratio of 1 : 1 : √2',
                                buttonText: 'Apply to our case'
                            },
                            {
                                explainer: 'Establishing relation between OB and OH and solving for OB',
                                text: 'OB : OH : HB = 1 : 1 : √2 (Using the ratio 1 : 1 : √2)<br>thus, OB:OH = 1 : 1',
                                buttonText: 'Solve for OB'
                            },
                            {
                                explainer: 'Substituting OH = 500 m',
                                text: 'OB = OH<br>OB = 500 m',
                                buttonText: 'Find AB'
                            },
                            {
                                explainer: 'Finding AB',
                                text: 'AB = OB − OA<br>AB = 500 − 289.02<br>AB = 210.98 m',
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
                            p2plusq2: 'p² + q²=41'
                        },
                        step3: {
                            text: 'r² ≠ p² + q²'
                        }
                    }
                },
                page19: {
                    headerText: 'Finding the <span style="color: #ffffff;">length of BC</span> in △OCH',
                    headerAfterQuiz: 'Finding the <span style="color: #ffffff;">length of BC</span> in △OCH',
                    footerInstruction: "Click on the highlighted button to see the solution steps",
                    instructionAfterQuiz: "Tap » to continue",
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
                        vertexLabels: ['B', 'A', 'C'],
                        sideLabels: ['120 m', '150 m', '? m']
                    },
                    angleLabels: ['90°', '', ''],
                    tableHeaders: ['r²', 'p² + q²'],
                    calculationSteps: {
                        headerText: 'Solution Steps',
                        steps: [
                            {
                                type: 'formula',
                                text: 'In a 30° – 60° – 90° right triangle the sides (shortest: longer: hypotenuse) always follow the ratio of 1 : √3 : 2',
                                buttonText: 'Apply to our case'
                            },
                            {
                                explainer: 'Establishing relation between OC and OH and solving for it',
                                text: 'OH : OC : CH = 1 : √3 : 2 (Using the ratio 1 : √3 : 2)<br>thus, OH : OC = 1 : √3',
                                buttonText: 'Solve for OC'
                            },
                            {
                                explainer: 'Substituting OH = 500 m',
                                text: 'OC = OH × √3<br>OC = 500 × √3 = 500 × 1.73 = 865 m',
                                buttonText: 'Find BC'
                            },
                            {
                                explainer: 'Finding BC',
                                text: 'BC = OC − OB<br>BC = 865 − 500<br>BC = 365 m',
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
                page16: {
                    headerText: "Now, let us find the distance between the two cars",
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
                        sideLabels: ['20 KM', '15 KM', '25 KM']
                    },
                    angleLabels: ['', '90°', ''],
                    equationTexts: {
                        tripletLabel: 'Time taken to reach the shore = $\\frac{\\text{Distance from shore}}{\\text{average Speed}}$',
                        pPlusQ: '<i>p</i> + q',
                        p: '<i>p</i>',
                        pMinusQ: '<i>p</i> - q',
                        comma: ',',
                        equalsSign: '=',
                        colon: 'Distance of Green car from building',
                        touristBoatText: 'Distance of Red car from building',
                        distanceText: 'Distance between the two cars',
                        calculationText: 'As given :<br>Distance of fishing boat from shore = 15 KM<br>Average Speed of both boats = 30 KMph<br><br>As calculated<br>Distance of fishing boat from shore = 25 KM',
                        summaryText: 'Difference in time taken = <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">25</span><span style="display: block; padding: 0 2px;">30</span></span> - <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">15</span><span style="display: block; padding: 0 2px;">30</span></span> = <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">10</span><span style="display: block; padding: 0 2px;">30</span></span> = <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">1</span><span style="display: block; padding: 0 2px;">3</span></span> hours or 20 mins',
                        lengthOfBC: 'Length of BC',
                        lengthOfAC: 'Length of BD',
                        plane1Altitude: '50 m',
                        plane2Altitude: '90 m',
                        distanceBetweenAircraft: '40 m'
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
                                text: 'Since r² ≠ p² + q², the triplet (7, 8, 12) is not a Pythagorean triplet.',
                                buttonText: null
                            }
                        ]
                    }
                },
                page14: {
                    headerText: "Steps to find the distance between the two cars",
                    footerInstruction: "Tap » to continue",
                    instructionAfterQuiz: "Tap » to continue",
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
                        vertexLabels: ['Plane', 'Aircraft<br>Carrier', 'Radar'],
                        sideLabels: ['', '9 KM', '']
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
                                text: 'Vertical side (AB) = 20 km<br>Horizontal side (BC) = 15 km<br>We need to find the hypotenuse (AC)',
                                buttonText: 'Calculate squares'
                            },
                            {
                                explainer: 'Calculate the squares',
                                text: 'AC² = AB² + BC²<br>AC² = 20² + 15²<br>AC² = 400 + 225 = 625',
                                buttonText: 'Find the hypotenuse'
                            },
                            {
                                explainer: 'Find the square root',
                                text: 'AC = √625<br>AC = 25 km',
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
                    },
                    textAC: '<span style="color: #ffffff;">Distance of Green car from building:</span><br><span style="color: #FF6600;">Length of BC</span>',
                    textBC: '<span style="color: #ffffff;">Distance of Red car from building:</span><br><span style="color: #FF6600;">Length of BD</span>',
                    textDistanceLeft: '<span style="color: #FF6600;">Distance between the two cars</span>',
                    textDistanceRight: '<span style="color: #FF6600;">=\u00A0\u00A0</span><span style="color: #ffffff;">(Distance of Red car from building)</span> <span style="color: #FF6600;">-</span> <span style="color: #ffffff;">(Distance of Green car from building)</span>'
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
                pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai ulang?",
                nextButtonPage2: "Mengirimkan event perubahan halaman ke halaman 2",
                previousButtonPage1: "Mengirimkan event perubahan halaman ke halaman 1"
            },

            buttons: {
                next: "»",
                previous: "«",
                startOver: "Mulai Ulang"
            },

            common: {
                questionText: "Sebuah helikopter pengamatan sedang melihat beberapa objek di bawahnya pada ketinggian 500 m di atas permukaan tanah. Objek yang terlihat oleh helikopter diberi nama titik A, titik B, dan titik C.<br>Berdasarkan ilustrasi dan informasi sebelumnya, tentukan<br>a. Jarak OA<br>b. Jarak AB<br>c. Jarak BC",
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
                    highlights: [],
                    instructionText: "Mari kita cari jarak antara mobil hijau dan mobil merah menggunakan teorema Pythagoras.",
                    headerText: "Baca pertanyaan dan identifikasi 'diketahui' dan 'yang dicari'",
                    footerInstruction: "Ketuk » untuk memvisualisasikan masalah"
                },
                page17: {
                    headerText: "Mari kita rangkum",
                    triangleLabels: {
                        vertexLabels: ['A', 'B', 'C'],
                        sideLabels: ['20 KM', '15 KM', '25 KM']
                    },
                    angleLabels: ['', '90°', ''],
                    footerInstruction: "Ketuk » untuk memulai ulang",
                    feedbackTextbox: {
                        text: "Berdasarkan ilustrasi dan informasi sebelumnya, kita menentukan:<br>a. Jarak OA = <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">289,02 m</span> (menggunakan rasio segitiga 30°–60°–90°)<br>b. Jarak AB = <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">210,98 m</span> (menggunakan rasio segitiga 45°–45°–90°, AB = OB - OA)<br>c. Jarak BC = <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">365 m</span> (menggunakan rasio segitiga 30°–60°–90°, BC = OC - OB)"
                    }
                },
                page12: {
                    headerText: "Tentukan sisi-sisi dari △",
                    footerInstruction: "Cocokkan sisi yang benar dengan pernyataan",
                    instructionAfterQuiz: "Ketuk » untuk melanjutkan",
                    triangleLabels: {
                        vertexLabels: ['C', 'B', 'A'],
                        sideLabels: ['', '120 m', '']
                    },
                    angleLabels: ['', '90°', ''],
                    tableHeaders: ['', 'Sisi'],
                    tableRows: [
                        ['Sisi segitiga yang mewakili garis pandang dari helikopter ke titik di tanah.', ''],
                        ['Sisi segitiga yang mewakili jarak horizontal dari titik tepat di bawah helikopter ke titik di tanah.', ''],
                        ['Sisi segitiga yang mewakili ketinggian vertikal helikopter di atas tanah (500 m).', '']
                    ],
                    fillBlanks: {
                        instructionText: "Seret sisi yang benar ke pernyataan yang sesuai di tabel",
                        options: [
                            {
                                id: "opt1",
                                text: "Sisi vertikal",
                                blankID: [{ bid: "blank3", text: "Sisi vertikal" }],
                                feedbackText: "Benar! Sisi vertikal mewakili ketinggian vertikal helikopter di atas tanah (500 m)."
                            },
                            {
                                id: "opt2",
                                text: "Sisi miring",
                                blankID: [{ bid: "blank1", text: "Sisi miring" }],
                                feedbackText: "Benar! Sisi miring mewakili garis pandang dari helikopter ke titik di tanah."
                            },
                            {
                                id: "opt3",
                                text: "Sisi horizontal",
                                blankID: [{ bid: "blank2", text: "Sisi horizontal" }],
                                feedbackText: "Benar! Sisi horizontal mewakili jarak horizontal dari titik tepat di bawah helikopter ke titik di tanah."
                            }
                        ],
                        impFormulae: []
                    },
                    quizPanel: {
                        questionText: "Dalam segitiga siku-siku 30°-60°-90° apa pun, di mana 'c' adalah sisi miring, rasio a:b:c adalah:",
                        options: [
                            {
                                text: "1 : 2 : 3",
                                feedback: "Belum tepat. Dalam segitiga 30°-60°-90°, rasionya bukan 1:2:3. Ingat bahwa sisi di depan 30° adalah yang terpendek, di depan 60° adalah √3 kali itu, dan sisi miring adalah 2 kali sisi terpendek. Coba lagi!",
                                iscorrect: false
                            },
                            {
                                text: "1 : √3 : 2",
                                feedback: "Sempurna! Ini benar. Dalam segitiga 30°-60°-90°, sisi di depan 30° (a) adalah yang terpendek, sisi di depan 60° (b) adalah √3 kali sisi terpendek, dan sisi miring (c) adalah 2 kali sisi terpendek. Jadi rasio a:b:c = 1:√3:2.",
                                iscorrect: true
                            },
                            {
                                text: "2 : √2 : 1",
                                feedback: "Belum tepat. Rasio ini tidak cocok dengan segitiga 30°-60°-90°. Dalam segitiga 30°-60°-90°, sisi miring selalu sisi terpanjang (2 kali sisi terpendek), bukan yang terpendek. Coba lagi!",
                                iscorrect: false
                            },
                            {
                                text: "1 : √2 : 1",
                                feedback: "Belum tepat. Rasio 1:√2:1 ini menggambarkan segitiga siku-siku sama kaki (45°-45°-90°), bukan segitiga 30°-60°-90°. Dalam segitiga 30°-60°-90°, sisi miring harus 2 kali sisi terpendek. Coba lagi!",
                                iscorrect: false
                            }
                        ]
                    }
                },
                page18: {
                    headerText: "Tentukan hubungan antara sisi-sisi dari △ yang berbeda",
                    footerInstruction: "Cocokkan rasio yang benar dengan pernyataan",
                    instructionAfterQuiz: "Ketuk » untuk melanjutkan",
                    triangleLabels: {
                        vertexLabels: ['C', 'B', 'A'],
                        sideLabels: ['', '120 m', '']
                    },
                    angleLabels: ['', '90°', ''],
                    tableHeaders: ['', 'Rasio'],
                    tableRows: [
                        ['Dalam segitiga 45°–45°–90° (segitiga siku-siku sama kaki) sisi-sisinya selalu dalam rasio?', ''],
                        ['Dalam segitiga siku-siku 30°–60°–90° sisi-sisinya (terpendek: lebih panjang: sisi miring) selalu mengikuti rasio?', '']
                    ],
                    fillBlanks: {
                        instructionText: "Seret rasio yang benar ke pernyataan yang sesuai di tabel",
                        options: [
                            {
                                id: "opt1",
                                text: "1 : √2 : 1",
                                blankID: null,
                                feedbackText: "Belum tepat. Rasio ini tidak cocok dengan kedua jenis segitiga. Coba lagi!"
                            },
                            {
                                id: "opt2",
                                text: "1 : √3 : 2",
                                blankID: [{ bid: "blank2", text: "1 : √3 : 2" }],
                                feedbackText: "Benar! Dalam segitiga 30°–60°–90°, sisi terpendek (di depan 30°) adalah 1, sisi lebih panjang (di depan 60°) adalah √3, dan sisi miring adalah 2, jadi rasionya adalah 1 : √3 : 2."
                            },
                            {
                                id: "opt3",
                                text: "2 : √3 : 1",
                                blankID: null,
                                feedbackText: "Belum tepat. Rasio ini tidak cocok dengan kedua jenis segitiga. Coba lagi!"
                            },
                            {
                                id: "opt4",
                                text: "1 : 1 : √2",
                                blankID: [{ bid: "blank1", text: "1 : 1 : √2" }],
                                feedbackText: "Benar! Dalam segitiga 45°–45°–90°, kedua kaki sama panjang dan sisi miring adalah √2 kali panjang kaki, jadi rasionya adalah 1 : 1 : √2."
                            },
                            {
                                id: "opt5",
                                text: "√2 : 1 : 1",
                                blankID: null,
                                feedbackText: "Belum tepat. Rasio ini tidak cocok dengan kedua jenis segitiga. Coba lagi!"
                            },
                            {
                                id: "opt6",
                                text: "1 : 2 : 3",
                                blankID: null,
                                feedbackText: "Belum tepat. Rasio ini tidak cocok dengan kedua jenis segitiga. Coba lagi!"
                            }
                        ],
                        impFormulae: []
                    },
                    quizPanel: {
                        questionText: "Dalam segitiga siku-siku 30°-60°-90° apa pun, di mana 'c' adalah sisi miring, rasio a:b:c adalah:",
                        options: [
                            {
                                text: "1 : 2 : 3",
                                feedback: "Belum tepat. Dalam segitiga 30°-60°-90°, rasionya bukan 1:2:3. Ingat bahwa sisi di depan 30° adalah yang terpendek, di depan 60° adalah √3 kali itu, dan sisi miring adalah 2 kali sisi terpendek. Coba lagi!",
                                iscorrect: false
                            },
                            {
                                text: "1 : √3 : 2",
                                feedback: "Sempurna! Ini benar. Dalam segitiga 30°-60°-90°, sisi di depan 30° (a) adalah yang terpendek, sisi di depan 60° (b) adalah √3 kali sisi terpendek, dan sisi miring (c) adalah 2 kali sisi terpendek. Jadi rasio a:b:c = 1:√3:2.",
                                iscorrect: true
                            },
                            {
                                text: "2 : √2 : 1",
                                feedback: "Belum tepat. Rasio ini tidak cocok dengan segitiga 30°-60°-90°. Dalam segitiga 30°-60°-90°, sisi miring selalu sisi terpanjang (2 kali sisi terpendek), bukan yang terpendek. Coba lagi!",
                                iscorrect: false
                            },
                            {
                                text: "1 : √2 : 1",
                                feedback: "Belum tepat. Rasio 1:√2:1 ini menggambarkan segitiga siku-siku sama kaki (45°-45°-90°), bukan segitiga 30°-60°-90°. Dalam segitiga 30°-60°-90°, sisi miring harus 2 kali sisi terpendek. Coba lagi!",
                                iscorrect: false
                            }
                        ]
                    }
                },
                page13: {
                    headerText: 'Mencari <span style="color: #ffffff;">panjang OA</span> dalam △OAH',
                    footerInstruction: "Klik tombol yang disorot untuk melihat langkah-langkah solusi",
                    instructionAfterQuiz: "Ketuk » untuk melanjutkan",
                    highlights: [
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: "Rumah Komang berada di tengah.", size: '20gc', color: highlightColor2 },
                            { text: "Komang ke Yohana = $1 \\frac{1}{2}$ km", size: '20gc', color: highlightColor2 }
                        ],
                        values: [
                        ],
                        toFind: [
                        ]
                    },
                    triangleLabels: {
                        vertexLabels: ['B', 'A', 'C'],
                        sideLabels: ['120 m', '130 m', '? m']
                    },
                    angleLabels: ['90°', '', ''],
                    tableHeaders: ['r²', 'p² + q²'],
                    calculationSteps: {
                        headerText: 'Langkah-langkah Solusi',
                        steps: [
                            {
                                type: 'formula',
                                text: 'Dalam segitiga siku-siku 30°–60°–90° sisi-sisinya (terpendek: lebih panjang: sisi miring) selalu mengikuti rasio 1 : √3 : 2',
                                buttonText: 'Terapkan pada kasus kita'
                            },
                            {
                                explainer: 'Membangun hubungan antara OA dan OH dan menyelesaikannya',
                                text: 'OA : OH : AH = 1 : √3 : 2 (Menggunakan rasio 1 : √3 : 2)<br>jadi, OA:OH = 1 : √3',
                                buttonText: 'Selesaikan untuk OA'
                            },
                            {
                                explainer: 'Mensubstitusi OH = 500 m',
                                text: 'OA = OH/√3<br>OA = 500/√3 = 500/1,73',
                                buttonText: 'Hitung OA'
                            },
                            {
                                explainer: 'Nilai akhir',
                                text: 'OA = 289,02 m',
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
                page15: {
                    headerText: 'Mencari <span style="color: #ffffff;">panjang AB</span> dalam △OBH',
                    footerInstruction: "Klik tombol yang disorot untuk melihat langkah-langkah solusi",
                    instructionAfterQuiz: "Ketuk » untuk melanjutkan",
                    highlights: [
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: "Rumah Komang berada di tengah.", size: '20gc', color: highlightColor2 },
                            { text: "Komang ke Yohana = $1 \\frac{1}{2}$ km", size: '20gc', color: highlightColor2 }
                        ],
                        values: [
                        ],
                        toFind: [
                        ]
                    },
                    triangleLabels: {
                        vertexLabels: ['B', 'A', 'C'],
                        sideLabels: ['120 m', '150 m', '? m']
                    },
                    angleLabels: ['90°', '', ''],
                    tableHeaders: ['r²', 'p² + q²'],
                    calculationSteps: {
                        headerText: 'Langkah-langkah Solusi',
                        steps: [
                            {
                                type: 'formula',
                                text: 'Dalam segitiga 45°–45°–90° (segitiga siku-siku sama kaki) sisi-sisinya selalu dalam rasio 1 : 1 : √2',
                                buttonText: 'Terapkan pada kasus kita'
                            },
                            {
                                explainer: 'Membangun hubungan antara OB dan OH dan menyelesaikan untuk OB',
                                text: 'OB : OH : HB = 1 : 1 : √2 (Menggunakan rasio 1 : 1 : √2)<br>jadi, OB:OH = 1 : 1',
                                buttonText: 'Selesaikan untuk OB'
                            },
                            {
                                explainer: 'Mensubstitusi OH = 500 m',
                                text: 'OB = OH<br>OB = 500 m',
                                buttonText: 'Cari AB'
                            },
                            {
                                explainer: 'Mencari AB',
                                text: 'AB = OB - OA<br>AB = 500 - 289,02<br>AB = 210,98 m',
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
                page19: {
                    headerText: 'Mencari <span style="color: #ffffff;">panjang BC</span> dalam △OCH',
                    headerAfterQuiz: 'Mencari <span style="color: #ffffff;">panjang BC</span> dalam △OCH',
                    footerInstruction: "Klik tombol yang disorot untuk melihat langkah-langkah solusi",
                    instructionAfterQuiz: "Ketuk » untuk melanjutkan",
                    highlights: [
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: "Rumah Komang berada di tengah.", size: '20gc', color: highlightColor2 },
                            { text: "Komang ke Yohana = $1 \\frac{1}{2}$ km", size: '20gc', color: highlightColor2 }
                        ],
                        values: [
                        ],
                        toFind: [
                        ]
                    },
                    triangleLabels: {
                        vertexLabels: ['B', 'A', 'C'],
                        sideLabels: ['120 m', '150 m', '? m']
                    },
                    angleLabels: ['90°', '', ''],
                    tableHeaders: ['r²', 'p² + q²'],
                    calculationSteps: {
                        headerText: 'Langkah-langkah Solusi',
                        steps: [
                            {
                                type: 'formula',
                                text: 'Dalam segitiga siku-siku 30°–60°–90° sisi-sisinya (terpendek: lebih panjang: sisi miring) selalu mengikuti rasio 1 : √3 : 2',
                                buttonText: 'Terapkan pada kasus kita'
                            },
                            {
                                explainer: 'Membangun hubungan antara OC dan OH dan menyelesaikannya',
                                text: 'OC : OH : CH = √3 : 1 : 2 (Menggunakan rasio 1 : √3 : 2)<br>jadi, OC:OH = √3 : 1',
                                buttonText: 'Selesaikan untuk OC'
                            },
                            {
                                explainer: 'Mensubstitusi OH = 500 m',
                                text: 'OC = OH × √3<br>OC = 500 × √3 = 500 × 1,73 = 865 m',
                                buttonText: 'Cari BC'
                            },
                            {
                                explainer: 'Mencari BC',
                                text: 'BC = OC - OB<br>BC = 865 - 500<br>BC = 365 m',
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
                page16: {
                    headerText: "Sekarang, mari kita cari jarak antara kedua mobil",
                    footerInstruction: "Klik pada \"?\" untuk melihat langkah-langkah solusi",
                    instructionAfterQuiz: "Ketuk » untuk merangkum",
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
                        sideLabels: ['20 KM', '15 KM', '25 KM']
                    },
                    angleLabels: ['', '90°', ''],
                    equationTexts: {
                        tripletLabel: 'Waktu yang dibutuhkan untuk mencapai pantai = $\\frac{\\text{Jarak dari pantai}}{\\text{Kecepatan rata-rata}}$',
                        pPlusQ: '<i>p</i> + q',
                        p: '<i>p</i>',
                        pMinusQ: '<i>p</i> - q',
                        comma: ',',
                        equalsSign: '=',
                        colon: 'Jarak mobil hijau dari gedung',
                        touristBoatText: 'Jarak mobil merah dari gedung',
                        distanceText: 'Jarak antara kedua mobil',
                        calculationText: 'Sebagai diketahui:<br>Jarak kapal penangkap ikan dari pantai = 15 KM<br>Kecepatan rata-rata kedua kapal = 30 KMph<br><br>Sebagai dihitung<br>Jarak kapal penangkap ikan dari pantai = 25 KM',
                        summaryText: 'Selisih waktu yang dibutuhkan = <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">25</span><span style="display: block; padding: 0 2px;">30</span></span> - <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">15</span><span style="display: block; padding: 0 2px;">30</span></span> = <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">10</span><span style="display: block; padding: 0 2px;">30</span></span> = <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">1</span><span style="display: block; padding: 0 2px;">3</span></span> jam atau 20 menit',
                        lengthOfBC: 'Panjang BC',
                        lengthOfAC: 'Panjang BD',
                        plane1Altitude: '50 m',
                        plane2Altitude: '90 m',
                        distanceBetweenAircraft: '40 m'
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
                                text: 'Karena 144 ≠ 113, kita punya r² ≠ p² + q²',
                                buttonText: 'Lihat kesimpulan'
                            },
                            {
                                explainer: 'Kesimpulan',
                                text: 'Karena r² ≠ p² + q², triplet (7, 8, 12) bukan triplet Pythagoras.',
                                buttonText: null
                            }
                        ]
                    }
                },
                page14: {
                    headerText: "Langkah-langkah untuk mencari jarak antara kedua mobil",
                    footerInstruction: "Ketuk » untuk melanjutkan",
                    instructionAfterQuiz: "Ketuk » untuk melanjutkan",
                    highlights: [
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: "Rumah Komang berada di tengah.", size: '20gc', color: highlightColor2 },
                            { text: "Komang ke Yohana = $1 \\frac{1}{2}$ km", size: '20gc', color: highlightColor2 }
                        ],
                        values: [
                        ],
                        toFind: [
                        ]
                    },
                    triangleLabels: {
                        vertexLabels: ['Pesawat', 'Kapal<br>Induk', 'Radar'],
                        sideLabels: ['', '9 KM', '']
                    },
                    angleLabels: ['', '90°', ''],
                    tableHeaders: ['r²', 'p² + q²'],
                    calculationSteps: {
                        headerText: 'Langkah-langkah Solusi',
                        steps: [
                            {
                                type: 'formula',
                                text: 'Teorema Pythagoras: Untuk segitiga siku-siku,<br>c² = a² + b², di mana c adalah sisi miring',
                                buttonText: 'Terapkan pada kasus kita'
                            },
                            {
                                explainer: 'Diketahui sisi vertikal dan horizontal',
                                text: 'Sisi vertikal (AB) = 20 km<br>Sisi horizontal (BC) = 15 km<br>Kita perlu mencari sisi miring (AC)',
                                buttonText: 'Hitung kuadrat'
                            },
                            {
                                explainer: 'Hitung kuadrat',
                                text: 'AC² = AB² + BC²<br>AC² = 20² + 15²<br>AC² = 400 + 225 = 625',
                                buttonText: 'Cari sisi miring'
                            },
                            {
                                explainer: 'Cari akar kuadrat',
                                text: 'AC = √625<br>AC = 25 km',
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
                    },
                    textAC: '<span style="color: #ffffff;">Jarak mobil hijau dari gedung:</span><br><span style="color: #FF6600;">Panjang BC</span>',
                    textBC: '<span style="color: #ffffff;">Jarak mobil merah dari gedung:</span><br><span style="color: #FF6600;">Panjang BD</span>',
                    textDistanceLeft: '<span style="color: #FF6600;">Jarak antara kedua mobil</span>',
                    textDistanceRight: '<span style="color: #FF6600;">=\u00A0\u00A0</span><span style="color: #ffffff;">(Jarak mobil merah dari gedung)</span> <span style="color: #FF6600;">-</span> <span style="color: #ffffff;">(Jarak mobil hijau dari gedung)</span>'
                },
                page6: {
                    headerText: "Mari kita eksplorasi triplet 8 cm, 15 cm, 17 cm",
                    footerInstruction: "Klik tombol yang disorot untuk melihat langkah-langkah solusi",
                    highlights: [
                    ],
                    informationAnalysis: {
                        facts: [
                            { text: "Rumah Komang berada di tengah.", size: '20gc', color: highlightColor2 },
                            { text: "Komang ke Yohana = $1 \\frac{1}{2}$ km", size: '20gc', color: highlightColor2 }
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
                                text: 'Karena 289 = 289, kita punya r² = p² + q²',
                                buttonText: 'Lihat kesimpulan'
                            },
                            {
                                explainer: 'Kesimpulan',
                                text: '8, 15, 17 ADALAH triplet Pythagoras'
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
                    headerText: "Rangkuman",
                    summaryText: "Berdasarkan eksplorasi kita:<br><br><div style=\"text-align: left; margin: 0 auto; width: fit-content;\">Putri menemukan taman segitiga dengan sisi-sisi berukuran 4 m, 5 m, dan 6 m. Dia ingin membuktikan apakah taman ini adalah segitiga siku-siku.<br><br>Kita memverifikasi bahwa 4² + 5² = 16 + 25 = 41 ≠ 36 = 6²<br><br>Oleh karena itu, <strong>taman tersebut BUKAN segitiga siku-siku</strong> karena sisi-sisi 4 m, 5 m, dan 6 m tidak membentuk triplet Pythagoras.</div>",
                    footerInstruction: "Ketuk » untuk memulai ulang",
                    highlights: [
                        {
                            text: "Oleh karena itu, taman tersebut BUKAN segitiga siku-siku karena sisi-sisi 4 m, 5 m, dan 6 m tidak membentuk triplet Pythagoras."
                        }
                    ]
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
        const pageKey = `page${pageNumber}`;

        console.log(`🔍 [getPageData] Requesting page ${pageNumber}, current language: ${lang}`);

        if (translation && translation.pages && translation.pages[pageKey]) {
            console.log(`✅ [getPageData] Found page ${pageNumber} in ${lang}`);
            return translation.pages[pageKey];
        }

        // Fallback to English
        const enTranslation = AppData.translations.en;
        if (enTranslation && enTranslation.pages && enTranslation.pages[pageKey]) {
            console.log(`⚠️ [getPageData] Page ${pageNumber} not found in ${lang}, falling back to English`);
            return enTranslation.pages[pageKey];
        }

        console.error(`❌ [getPageData] Page ${pageNumber} not found in any language`);
        return null;
    },
};

// Make i18n and AppData globally available
window.i18n = i18n;
window.AppData = AppData;
