// data.js − Internationalization data for the Ratio Learning Applet
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
        title: "Ratio − Komodo Distance Comparison"
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
        questionText: "Two planes were flying over an aircraft carrier. A radar located away from the carrier detected that the positions of the two fighter planes were 10 km and 12 km apart from the radar. Determine the distance between the two aircraft measured based on their altitude.",
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
                image: 'assets/visual1−en.png',
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
                image: 'assets/visual2−en.png',
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
                image: 'assets/visual3−en.png',
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
                image: 'assets/visual4−en.png',
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
                image: 'assets/visual5−en.png',
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
                image: 'assets/visual6−en.png',
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
                text: 'y = 2x − x<br>y = x',
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
              col2: 'p² + (p − q)²'
            },
            step2: {
              r2: 'p² + 2pq + q²',
              p2q2: 'p² + p² − 2pq + q²',
              p2plusq2: '= 2p² − 2pq + q²'
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
            questionText: "In any 30°−60°−90° right angled triangle, where 'c' is the hypotenuse, ratio a:b:c is :",
            options: [
              {
                text: "1 : 2 : 3",
                feedback: "Not quite. In a 30°−60°−90° triangle, the ratio is not 1:2:3. Remember that the side opposite 30° is the shortest, opposite 60° is √3 times that, and the hypotenuse is 2 times the shortest side. Try again!",
                iscorrect: false
              },
              {
                text: "1 : √3 : 2",
                feedback: "Excellent! This is correct. In a 30°−60°−90° triangle, the side opposite 30° (a) is the shortest, the side opposite 60° (b) is √3 times the shortest side, and the hypotenuse (c) is 2 times the shortest side. So the ratio a:b:c = 1:√3:2.",
                iscorrect: true
              },
              {
                text: "2 : √2 : 1",
                feedback: "Not quite. This ratio doesn't match a 30°−60°−90° triangle. In a 30°−60°−90° triangle, the hypotenuse is always the longest side (2 times the shortest), not the shortest. Try again!",
                iscorrect: false
              },
              {
                text: "1 : √2 : 1",
                feedback: "Not quite. This ratio 1:√2:1 describes an isosceles right triangle (45°−45°−90°), not a 30°−60°−90° triangle. In a 30°−60°−90° triangle, the hypotenuse should be 2 times the shortest side. Try again!",
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
            sideLabels: ['20 km', '15 km', '25 km']
          },
          angleLabels: ['', '90°', ''],
          footerInstruction: "Tap » to start over",
          feedbackTextbox: {
            text: "The difference in time taken by the two boats to reach the shore is <span style=\"backmround−color: #FFD700; color: #000000; padding: 2px 4px;\">1/3 hours or 20 minutes</span>"
          }
        },
        page17: {
          headerText: "Let us summarise",
          triangleLabels: {
            vertexLabels: ['A', 'B', 'C'],
            sideLabels: ['20 km', '15 km', '25 km']
          },
          angleLabels: ['', '90°', ''],
          footerInstruction: "Tap » to start over",
          feedbackTextbox: {
            text: "Using the Pythagoras theorem, we found that Plane 1 is at an altitude of <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">4.36 km</span> above the aircraft carrier, and Plane 2 is at an altitude of <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">7.94 km</span>. Therefore, the distance between the two aircraft is <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">7.94 km - 4.36 km = 3.58 km</span>."

          }
        },
        page12: {
          headerText: "Determine the sides of the △",
          footerInstruction: "Match the correct side with the statement",
          instructionAfterQuiz: "Tap » to continue",
          triangleLabels: {
            vertexLabels: ['Plane<br/>B', 'C<br/>Aircraft<br>Carrier', 'D<br/>Radar'],
            sideLabels: ['', '9 km', '']
          },
          angleLabels: ['', '90°', ''],
          tableHeaders: ['', 'Side'],
          tableRows: [
            ['side of the triangle represents the distance from the radar to one of the planes', ''],
            ['side of the triangle represents the distance between the aircraft carrier and the plane', ''],
            ['side of the triangle represents the distance from the radar to the aircraft carrier', '']
          ],
          fillBlanks: {
            instructionText: "Drag the correct side to the matching statement in the table",
            options: [
              {
                id: "opt1",
                text: "Vertical Side (BD)",
                blankID: [{ bid: "blank2", text: "Vertical Side (AB)" }],
                feedbackText: "Correct! The vertical side AB represents the distance between the aircraft carrier and the plane.",
                incorrectFeedback: 'Incorrect! The vertical side AB represents the distance between the aircraft carrier and the plane.'
              },
              {
                id: "opt2",
                text: "Horizontal side (DC)",
                blankID: [{ bid: "blank3", text: "Horizontal side (BC)" }],
                feedbackText: "Correct! The horizontal side BC represents the distance from the radar to the aircraft carrier.",
                incorrectFeedback: "Incorrect! The horizontal side BC represents the distance from the radar to the aircraft carrier."
              },
              {
                id: "opt3",
                text: "Hypotenuse (BD)",
                blankID: [{ bid: "blank1", text: "Hypotenuse (AC)" }],
                feedbackText: "Correct! The hypotenuse AC represents the distance from the radar to one of the planes.",
                incorrectFeedback: "Incorrect! The horizontal side BC represents the distance from the radar to the aircraft carrier."
              }
            ],
            impFormulae: []
          },
          quizPanel: {
            questionText: "In any 30°−60°−90° right angled triangle, where 'c' is the hypotenuse, ratio a:b:c is :",
            options: [
              {
                text: "1 : 2 : 3",
                feedback: "Not quite. In a 30°−60°−90° triangle, the ratio is not 1:2:3. Remember that the side opposite 30° is the shortest, opposite 60° is √3 times that, and the hypotenuse is 2 times the shortest side. Try again!",
                iscorrect: false
              },
              {
                text: "1 : √3 : 2",
                feedback: "Excellent! This is correct. In a 30°−60°−90° triangle, the side opposite 30° (a) is the shortest, the side opposite 60° (b) is √3 times the shortest side, and the hypotenuse (c) is 2 times the shortest side. So the ratio a:b:c = 1:√3:2.",
                iscorrect: true
              },
              {
                text: "2 : √2 : 1",
                feedback: "Not quite. This ratio doesn't match a 30°−60°−90° triangle. In a 30°−60°−90° triangle, the hypotenuse is always the longest side (2 times the shortest), not the shortest. Try again!",
                iscorrect: false
              },
              {
                text: "1 : √2 : 1",
                feedback: "Not quite. This ratio 1:√2:1 describes an isosceles right triangle (45°−45°−90°), not a 30°−60°−90° triangle. In a 30°−60°−90° triangle, the hypotenuse should be 2 times the shortest side. Try again!",
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
            sideLabels: ['20 km', '15 km', '25 km']
          },
          angleLabels: ['', '90°', ''],
          equationTexts: {
            tripletLabel: 'Time taken to reach the shore = $\\frac{\\text{Distance from shore}}{\\text{average Speed}}$',
            pPlusQ: '<i>p</i> + q',
            p: '<i>p</i>',
            pMinusQ: '<i>p</i> − q',
            comma: ',',
            equalsSign: '=',
            colon: 'Time taken by Fishing boat =',
            touristBoatText: 'Time taken by Tourist boat =',
            calculationText: 'As given :<br>Distance of fishing boat from shore = 15 km<br>Average Speed of both boats = 30 kmph<br><br>As calculated<br>Distance of fishing boat from shore = 25 km',
            summaryText: 'Difference in time taken = <span style="display: inline−block; vertical−align: middle; text−align: center; line−height: 1.2;"><span style="display: block; border−bottom: 1px solid currentColor; padding: 0 2px;">25</span><span style="display: block; padding: 0 2px;">30</span></span> − <span style="display: inline−block; vertical−align: middle; text−align: center; line−height: 1.2;"><span style="display: block; border−bottom: 1px solid currentColor; padding: 0 2px;">15</span><span style="display: block; padding: 0 2px;">30</span></span> = <span style="display: inline−block; vertical−align: middle; text−align: center; line−height: 1.2;"><span style="display: block; border−bottom: 1px solid currentColor; padding: 0 2px;">10</span><span style="display: block; padding: 0 2px;">30</span></span> = <span style="display: inline−block; vertical−align: middle; text−align: center; line−height: 1.2;"><span style="display: block; border−bottom: 1px solid currentColor; padding: 0 2px;">1</span><span style="display: block; padding: 0 2px;">3</span></span> hours or 20 mins',
            flipCardLabel: '<span style="display: inline−block; vertical−align: middle; text−align: center; line−height: 1.2;"><span style="display: block; border−bottom: 1px solid currentColor; padding: 0 2px;">Distance from Shore</span><span style="display: block; padding: 0 2px;">Average Speed</span></span>'
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
                image: 'assets/visual1.png',
                imageAlt: 'Aircraft carrier scene with radar and planes',
                buttonText: 'Radar position',
                descriptionText: 'Two planes are flying over an aircraft carrier. A radar located away from the carrier is detecting the positions of the two fighter planes.',
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [],
                  values: [],
                  toFind: [
                    { text: "Determine the distance between the two aircraft measured based on their altitude", size: '20gc', color: highlightColor3 }
                  ]
                }
              },
              {
                image: 'assets/visual2.png',
                imageAlt: 'Distance from radar to first plane',
                buttonText: 'Distance to first plane',
                descriptionText: 'The radar is located 9 km from the aircraft carrier.',
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [
                    { text: "Radar distance from carrier = 9 km", size: '20gc', color: highlightColor1 }
                  ],
                  values: [
                    { text: "Distance from radar to first plane = 10 km", size: '20gc', color: highlightColor2 }
                  ],
                  toFind: [
                    { text: "Determine the distance between the two aircraft measured based on their altitude", size: '20gc', color: highlightColor3 }
                  ]
                }
              },
              {
                image: 'assets/visual3.png',
                imageAlt: 'Distance from radar to second plane',
                buttonText: 'Distance to second plane',
                descriptionText: 'The first fighter plane is detected at a distance of 10 km from the radar.',
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [
                    { text: "Distance from radar to second plane = 12 km", size: '20gc', color: highlightColor1 }
                  ],
                  values: [
                    { text: "Distance from radar to second plane = 12 km", size: '20gc', color: highlightColor2 }
                  ],
                  toFind: [
                    { text: "Determine the distance between the two aircraft measured based on their altitude", size: '20gc', color: highlightColor3 }
                  ]
                }
              },
              {
                image: 'assets/visual4.png',
                imageAlt: 'Triangle visualization',
                buttonText: 'Visualise the Shape',
                descriptionText: 'The second fighter plane is detected at a distance of 12 km from the radar.',
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [
                    { text: "Radar to carrier = 9 km", size: '20gc', color: highlightColor1 },
                    { text: "Radar to first plane = 10 km", size: '20gc', color: highlightColor1 },
                    { text: "Radar to second plane = 12 km", size: '20gc', color: highlightColor1 }
                  ],
                  values: [
                    { text: "Radar to carrier = 9 km", size: '20gc', color: highlightColor1 },
                    { text: "Radar to first plane = 10 km", size: '20gc', color: highlightColor1 },
                    { text: "Radar to second plane = 12 km", size: '20gc', color: highlightColor1 }
                  ],
                  toFind: [
                    { text: "Distance between the two aircraft", size: '20gc', color: highlightColor3 }
                  ]
                }
              },
              {
                image: 'assets/visual5.png',
                imageAlt: 'Triangle formed by radar and planes',
                buttonText: 'Simplify the Visual',
                descriptionText: 'The radar, aircraft carrier, and Plane 1 form a right−angled triangle. Similarly, the radar, aircraft carrier, and Plane 2 form another right−angled triangle. The radar is 9 km from the carrier, and detects Plane 1 at 10 km and Plane 2 at 12 km.',
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [
                    { text: "Triangle formed by radar, first plane, and second plane", size: '20gc', color: highlightColor1 },
                    { text: "Radar to carrier = 9 km", size: '20gc', color: highlightColor2 },
                    { text: "Radar to first plane = 10 km", size: '20gc', color: highlightColor2 },
                    { text: "Radar to second plane = 12 km", size: '20gc', color: highlightColor2 }
                  ],
                  values: [
                    { text: "Radar to first plane = 10 km", size: '20gc', color: highlightColor1 },
                    { text: "Radar to second plane = 12 km", size: '20gc', color: highlightColor1 }
                  ],
                  toFind: [
                    { text: "Distance between the two aircraft", size: '20gc', color: highlightColor3 }
                  ]
                }
              },
              {
                image: 'assets/visual6.png',
                imageAlt: 'Using Pythagoras theorem to find altitudes',
                buttonText: null,
                descriptionText: 'We can use the Pythagoras theorem to find the altitudes of each plane above the carrier, then determine the distance between the two aircraft.',
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [
                    { text: "Triangle formed by radar, first plane, and second plane", size: '20gc', color: highlightColor1 },
                    { text: "Radar to carrier = 9 km", size: '20gc', color: highlightColor2 },
                    { text: "Radar to first plane = 10 km", size: '20gc', color: highlightColor2 },
                    { text: "Radar to second plane = 12 km", size: '20gc', color: highlightColor2 }
                  ],
                  values: [
                    { text: "Radar to first plane = 10 km", size: '20gc', color: highlightColor1 },
                    { text: "Radar to second plane = 12 km", size: '20gc', color: highlightColor1 }
                  ],
                  toFind: [
                    { text: "Distance between the two aircraft", size: '20gc', color: highlightColor3 }
                  ]
                }
              }
            ]
          }
        },
        page5: {
          headerText: "Let us verify that 4 m, 5 m, 6 m is a Pythagoras triplet",
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
            sideLabels: ['4 m', '5 m', '6 m']
          },
          tableHeaders: ['r²', 'p² + q²'],
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
                text: '4 m, 5 m, 6 m is NOT a Pythagoras triple'
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
          headerText: '<span style="color: #ffffff;">Plane 1 altitude:</span> Find the length of side BC',
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
            vertexLabels: ['C', 'D', 'B'],
            sideLabels: ['9 km', '10 km', '? km']
          },
          angleLabels: ['90°', '', ''],
          tableHeaders: ['r²', 'p² + q²'],
          calculationSteps: {
            headerText: 'Solution Steps',
            steps: [
              {
                type: 'formula',
                text: "Pythagoras' theorem: For a right triangle,<br>c² = a² + b², where c is the hypotenuse",
                buttonText: 'Apply to our case'
              },
              {
                explainer: 'Given the sides',
                text: 'Sides DC = 9 km and BD = 10 km<br>We need to find the altitude (BC)',
                buttonText: 'Calculate squares'
              },
              {
                explainer: 'Calculate the squares',
                text: 'BD² = DC² + BC²<br>10² = 9² + BC²<br>100 = 81 + BC²<br>BC² = 100 − 81 = 19',
                buttonText: 'Find the altitude'
              },
              {
                explainer: 'Find the square root',
                text: 'BC = $\\sqrt{19}$<br>BC ≈ 4.36 km',
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
          headerText: '<span style="color: #ffffff;">Plane 2 altitude:</span> Find the length of side BC',
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
            vertexLabels: ['C', 'D', 'A'],
            sideLabels: ['9 km', '12 km', '? km']
          },
          angleLabels: ['90°', '', ''],
          tableHeaders: ['r²', 'p² + q²'],
          calculationSteps: {
            headerText: 'Solution Steps',
            steps: [
              {
                type: 'formula',
                text: 'Pythagoras theorem: For a right triangle,<br>c² = a² + b², where c is the hypotenuse',
                buttonText: 'Apply to our case'
              },
              {
                explainer: 'Given the sides',
                text: 'Sides DC = 9 km and AD = 12 km<br>We need to find the altitude (AC)',
                buttonText: 'Calculate squares'
              },
              {
                explainer: 'Calculate the squares',
                text: 'AD² = DC² + AC²<br>12² = 9² + AC²<br>144 = 81 + AC²<br>AC² = 144 − 81 = 63',
                buttonText: 'Find the altitude'
              },
              {
                explainer: 'Find the square root',
                text: 'AC = $\\sqrt{63}$<br>AC ≈ 7.94 km',
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
          headerText: "Now, let us find the distance between the two aircrafts",
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
            sideLabels: ['20 km', '15 km', '25 km']
          },
          angleLabels: ['', '90°', ''],
          equationTexts: {
            tripletLabel: 'Time taken to reach the shore = $\\frac{\\text{Distance from shore}}{\\text{average Speed}}$',
            pPlusQ: '<i>p</i> + q',
            p: '<i>p</i>',
            pMinusQ: '<i>p</i> − q',
            comma: ',',
            equalsSign: '=',
            colon: 'Distance of Plane 1 from Aircraft Carrier',
            touristBoatText: 'Distance of Plane 2 from Aircraft Carrier',
            distanceText: 'Distance between two aircrafts',
            calculationText: 'As given :<br>Distance of fishing boat from shore = 15 km<br>Average Speed of both boats = 30 kmph<br><br>As calculated<br>Distance of fishing boat from shore = 25 km',
            summaryText: 'Difference in time taken = <span style="display: inline−block; vertical−align: middle; text−align: center; line−height: 1.2;"><span style="display: block; border−bottom: 1px solid currentColor; padding: 0 2px;">25</span><span style="display: block; padding: 0 2px;">30</span></span> − <span style="display: inline−block; vertical−align: middle; text−align: center; line−height: 1.2;"><span style="display: block; border−bottom: 1px solid currentColor; padding: 0 2px;">15</span><span style="display: block; padding: 0 2px;">30</span></span> = <span style="display: inline−block; vertical−align: middle; text−align: center; line−height: 1.2;"><span style="display: block; border−bottom: 1px solid currentColor; padding: 0 2px;">10</span><span style="display: block; padding: 0 2px;">30</span></span> = <span style="display: inline−block; vertical−align: middle; text−align: center; line−height: 1.2;"><span style="display: block; border−bottom: 1px solid currentColor; padding: 0 2px;">1</span><span style="display: block; padding: 0 2px;">3</span></span> hours or 20 mins',
            lengthOfBC: 'Length of BC',
            lengthOfAC: 'Length of AC',
            plane1Altitude: '4.36 km',
            plane2Altitude: '7.94 km',
            distanceBetweenAircraft: '3.58 km'
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
                text: 'Since r² ≠ p² + q², the triplet (7, 8, 12) is not a Pythagoras triplet.',
                buttonText: null
              }
            ]
          }
        },
        page14: {
          headerText: "Steps to find the distance between the two aircrafts",
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
            sideLabels: ['', '9 km', '']
          },
          angleLabels: ['', '90°', ''],
          tableHeaders: ['r²', 'p² + q²'],
          equationTexts: {
            plane2AltitudeLabel: 'Plane 2 altitude:',
            findLengthAC: 'Find the length of side AC',
            plane1AltitudeLabel: 'Plane 1 altitude:',
            findLengthBC: 'Find the length of side BC',
            distanceBetweenAircraft: 'Distance between the two aircraft',
            plane2Altitude: 'Plane 2 altitude',
            plane1Altitude: 'Plane 1 altitude'
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
          summaryText: "Based on our exploration:<br><br><div style=\"text−align: left; margin: 0 auto; width: fit−content;\">Putri found a triangular garden with sides measuring 4 m, 5 m, and 6 m. She wanted to prove whether this garden is a right triangle.<br><br>We verified that 4² + 5² = 16 + 25 = 41 ≠ 36 = 6²<br><br>Therefore, <strong>the garden is NOT a right triangle</strong> because the sides 4 m, 5 m, and 6 m do not form a Pythagoras triple.</div>",
          footerInstruction: "Tap » to start over",
          highlights: [
            {
              text: "Therefore, the garden is NOT a right triangle because the sides 4 m, 5 m, and 6 m do not form a Pythagoras triple."
            }
          ]
        },
      },
    },
    id: {
      appInfo: {
        title: "Rasio − Perbandingan Jarak Komodo"
      },

      messages: {
        pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk mulai dari awal?",
        nextButtonPage2: "Event perpindahan halaman telah dikirim ke halaman 2",
        previousButtonPage1: "Event perpindahan halaman telah dikirim ke halaman 1"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang"
      },

      common: {
        questionText:
          "Dua pesawat terbang melintasi sebuah kapal induk. Radar yang berada jauh dari kapal induk mendeteksi bahwa posisi dua pesawat tempur berjarak 10 km dan 12 km dari radar. Tentukan jarak antara kedua pesawat berdasarkan ketinggiannya.",
        questionIcon: "Q",
        komangToLucas: "Komang ke Lukas",
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
          toFind: "Ditanyakan"
        },
        conceptSummary: {
          header: "RINGKASAN KONSEP",
          given: "Diketahui",
          toFind: "Ditanyakan",
          keyConcepts: "Konsep Kunci",
          importantFormulae: "Perhitungan"
        }
      },

      components: {
        informationAnalysis: {
          headerText: "ANALISIS INFORMASI",
          factsTitle: "Fakta",
          valueTitle: "Nilai",
          toFindTitle: "Ditanyakan"
        },
        conceptSummary: {
          headerText: "RINGKASAN KONSEP",
          givenTitle: "Diketahui",
          toFindTitle: "Ditanyakan",
          keyConceptsTitle: "Konsep Kunci",
          importantFormulaeTitle: "Perhitungan"
        }
      },

      pages: {
        page1: {
          highlights: [],
          instructionText:
            "Mari cari jarak dari rumah Yohana ke rumah Lukas dengan menjumlahkan pecahan campuran dan pecahan.",
          headerText: "Baca soal dan tentukan bagian 'diketahui' dan 'ditanyakan'",
          footerInstruction: "Ketuk » untuk memvisualisasikan soal"
        },

        page2: {
          headerText: "Temukan representasi visual yang tepat untuk soal",
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
            questionText:
              "Diketahui segitiga siku−siku sama kaki △ABC dengan ∠C = 90° dan AB = 15√2 cm. Pilih gambar yang merepresentasikan segitiga ini.",
            options: [
              { image: "assets/option1.png", text: "", feedback: "Bagus!", iscorrect: true },
              { image: "assets/option2.png", text: "", feedback: "Belum tepat. Coba lagi!", iscorrect: false },
              { image: "assets/option3.png", text: "", feedback: "Belum tepat. Coba lagi!", iscorrect: false }
            ]
          },
          stageComponent: {
            headerText: "Mari memvisualisasikan soal",
            stages: [
              {
                image: "assets/questionImage.png",
                imageAlt: "Gambar soal",
                buttonText: "Lihat bingkai jendela",
                descriptionText: "Mari pahami soal ini langkah demi langkah.",
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: { facts: [], values: [], toFind: [] }
              },
              {
                image: "assets/visual1−en.png",
                imageAlt: "Bingkai jendela",
                buttonText: "Tampilkan tinggi bingkai jendela",
                descriptionText: "Kita perlu menentukan apakah bingkai jendela benar−benar berbentuk persegi panjang.",
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [],
                  values: [],
                  toFind: [{ text: "Apakah bingkai jendela benar−benar persegi panjang?", size: "20gc", color: highlightColor3 }]
                }
              },
              {
                image: "assets/visual2−en.png",
                imageAlt: "Bingkai jendela dengan tinggi",
                buttonText: "Tampilkan panjang bingkai jendela",
                descriptionText: "Tingginya diketahui 40,8 cm.",
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [{ text: "Tinggi = 40,8 cm", size: "20gc", color: highlightColor1 }],
                  values: [],
                  toFind: [{ text: "Apakah bingkai jendela benar−benar persegi panjang?", size: "20gc", color: highlightColor3 }]
                }
              },
              {
                image: "assets/visual3−en.png",
                imageAlt: "Bingkai jendela dengan panjang",
                buttonText: "Tampilkan diagonal bingkai jendela",
                descriptionText: "Panjangnya diketahui 30,6 cm.",
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [
                    { text: "Tinggi = 40,8 cm", size: "20gc", color: highlightColor1 },
                    { text: "Panjang = 30,6 cm", size: "20gc", color: highlightColor1 }
                  ],
                  values: [],
                  toFind: [{ text: "Apakah bingkai jendela benar−benar persegi panjang?", size: "20gc", color: highlightColor3 }]
                }
              },
              {
                image: "assets/visual4−en.png",
                imageAlt: "Bingkai jendela dengan diagonal",
                buttonText: "Visualisasikan bentuknya",
                descriptionText: "Salah satu diagonalnya diketahui 52,5 cm.",
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [
                    { text: "Tinggi = 40,8 cm", size: "20gc", color: highlightColor1 },
                    { text: "Panjang = 30,6 cm", size: "20gc", color: highlightColor1 },
                    { text: "Diagonal = 52,5 cm", size: "20gc", color: highlightColor2 }
                  ],
                  values: [],
                  toFind: [{ text: "Apakah bingkai jendela benar−benar persegi panjang?", size: "20gc", color: highlightColor3 }]
                }
              },
              {
                image: "assets/visual5−en.png",
                imageAlt: "Bentuk yang divisualisasikan",
                buttonText: "Sederhanakan menjadi segitiga",
                descriptionText: "Bentuk yang terbentuk oleh sisi−sisi dan diagonal terlihat seperti segitiga.",
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [
                    { text: "Tinggi = 40,8 cm", size: "20gc", color: highlightColor1 },
                    { text: "Panjang = 30,6 cm", size: "20gc", color: highlightColor1 },
                    { text: "Diagonal = 52,5 cm", size: "20gc", color: highlightColor2 }
                  ],
                  values: [],
                  toFind: [{ text: "Apakah bingkai jendela benar−benar persegi panjang?", size: "20gc", color: highlightColor3 }]
                }
              },
              {
                image: "assets/visual6−en.png",
                imageAlt: "Bentuk yang disederhanakan",
                buttonText: null,
                descriptionText:
                  "Kita dapat menyederhanakan ini menjadi segitiga siku−siku. Untuk memeriksa apakah benar−benar persegi panjang, kita cek apakah sisi−sisi dan diagonal membentuk segitiga siku−siku menggunakan teorema Pythagoras: a² + b² = c²",
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [
                    { text: "Tinggi = 40,8 cm", size: "20gc", color: highlightColor1 },
                    { text: "Panjang = 30,6 cm", size: "20gc", color: highlightColor1 },
                    { text: "Diagonal = 52,5 cm", size: "20gc", color: highlightColor2 }
                  ],
                  values: [],
                  toFind: [{ text: "Apakah bingkai jendela benar−benar persegi panjang?", size: "20gc", color: highlightColor3 }]
                }
              }
            ]
          }
        },

        page3: {
          headerText: "Mari temukan hubungan antara sisi−sisi pada △ siku−siku sama kaki",
          footerInstruction: 'Klik tombol yang disorot untuk melihat langkah penyelesaian',
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          highlights: [],
          informationAnalysis: { facts: [], values: [], toFind: [] },
          triangleLabels: {
            vertexLabels: ["B", "D", "C"],
            sideLabels: ["c = x + y", "a = x", "b"]
          },
          angleLabels: ["30°", "60°", "90°"],
          calculationSteps: {
            headerText: "Langkah Penyelesaian",
            steps: [
              { type: "formula", text: "Dari halaman 9, kita menetapkan:<br>a : b : c = 1 : √3 : 2", buttonText: "Terapkan rasio" },
              { explainer: "Dari rasio a : b : c = 1 : √3 : 2", text: "Maka, c = 2a", buttonText: "Substitusikan nilai" },
              { explainer: "Mensubstitusikan a = x dan c = x + y", text: "Jadi: x + y = 2x", buttonText: "Selesaikan untuk y" },
              { explainer: "Menyelesaikan untuk y", text: "y = 2x − x<br>y = x", buttonText: "Cari x" },
              { explainer: "Jawaban", text: "x = y", buttonText: null }
            ]
          },
          tableUpdates: {
            step1: { col1: "(p + q)²", col2: "p² + (p − q)²" },
            step2: {
              r2: "p² + 2pq + q²",
              p2q2: "p² + p² − 2pq + q²",
              p2plusq2: "= 2p² − 2pq + q²"
            },
            step3: { text: "p = 4q" }
          }
        },

        page9: {
          headerText: "Tentukan sisi−sisi pada △ sama kaki",
          footerInstruction: "Pilih jawaban yang benar",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          triangleLabels: { vertexLabels: ["B", "D", "C"], sideLabels: ["c", "a", "b"] },
          angleLabels: ["30°", "60°", "90°"],
          quizPanel: {
            questionText: "Pada segitiga siku−siku 30°−60°−90°, dengan 'c' sebagai sisi miring, rasio a:b:c adalah:",
            options: [
              {
                text: "1 : 2 : 3",
                feedback:
                  "Belum tepat. Pada segitiga 30°−60°−90°, rasionya bukan 1:2:3. Ingat: sisi di depan 30° paling pendek, sisi di depan 60° adalah √3 kali sisi terpendek, dan sisi miring adalah 2 kali sisi terpendek. Coba lagi!",
                iscorrect: false
              },
              {
                text: "1 : √3 : 2",
                feedback:
                  "Hebat! Ini benar. Pada segitiga 30°−60°−90°, sisi di depan 30° (a) paling pendek, sisi di depan 60° (b) adalah √3 kali sisi terpendek, dan sisi miring (c) adalah 2 kali sisi terpendek. Jadi rasio a:b:c = 1:√3:2.",
                iscorrect: true
              },
              {
                text: "2 : √2 : 1",
                feedback:
                  "Belum tepat. Rasio ini tidak sesuai untuk segitiga 30°−60°−90°. Pada segitiga 30°−60°−90°, sisi miring selalu sisi terpanjang (2 kali sisi terpendek), bukan yang terpendek. Coba lagi!",
                iscorrect: false
              },
              {
                text: "1 : √2 : 1",
                feedback:
                  "Belum tepat. Rasio 1:√2:1 menggambarkan segitiga siku−siku sama kaki (45°−45°−90°), bukan segitiga 30°−60°−90°. Pada segitiga 30°−60°−90°, sisi miring harus 2 kali sisi terpendek. Coba lagi!",
                iscorrect: false
              }
            ]
          }
        },

        page10: {
          xText: "x",
          footerInstruction: "Pilih jawaban yang benar untuk menemukan panjang sisi−sisi",
          triangleLabels: { vertexLabels: ["B", "D", "C"], sideLabels: ["c = x + y", "a = x", "b"] },
          angleLabels: ["30°", "60°", "90°"],
          tableHeaders: [
            '<span style="color: #FF6600;">a</span>',
            '<span style="color: #00FF7F;">b</span>',
            '<span style="color: #4A90E2;">c</span>'
          ],
          tableRows: [
            ['<span style="color: #FF6600;">1</span>', '<span style="color: #00FF7F;">√3</span>', '<span style="color: #4A90E2;">2</span>'],
            ['<span style="color: #FF6600;">x</span>', "", ""]
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
          triangleLabels: { vertexLabels: ["A", "B", "C"], sideLabels: ["20 km", "15 km", "25 km"] },
          angleLabels: ["", "90°", ""],
          footerInstruction: "Ketuk » untuk mulai ulang",
          feedbackTextbox: {
            text:
              'Selisih waktu yang dibutuhkan dua kapal untuk mencapai pantai adalah <span style="backmround−color: #FFD700; color: #000000; padding: 2px 4px;">1/3 jam atau 20 menit</span>'
          }
        },

        page17: {
          headerText: "Mari kita rangkum",
          triangleLabels: { vertexLabels: ["A", "B", "C"], sideLabels: ["20 km", "15 km", "25 km"] },
          angleLabels: ["", "90°", ""],
          footerInstruction: "Ketuk » untuk mulai ulang",
          feedbackTextbox: {
            text:
              'Dengan menggunakan teorema Pythagoras, kita menemukan bahwa Pesawat 1 berada pada ketinggian <span style="backmround−color: #FFD700; color: #000000; padding: 2px 4px;">4.36 km</span> di atas kapal induk, dan Pesawat 2 berada pada ketinggian <span style="backmround−color: #FFD700; color: #000000; padding: 2px 4px;">7.94 km</span>. Oleh karena itu, jarak antara kedua pesawat adalah <span style="backmround−color: #FFD700; color: #000000; padding: 2px 4px;">7.94 km − 4.36 km = 3.58 km</span>.'
          }
        },

        page12: {
          headerText: "Tentukan sisi−sisi △",
          footerInstruction: "Cocokkan sisi yang benar dengan pernyataan",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          triangleLabels: {
            vertexLabels: ["Pesawat", "Kapal Induk<br>Pesawat", "Radar"],
            sideLabels: ["", "9 km", ""]
          },
          angleLabels: ["", "90°", ""],
          tableHeaders: ["", "Sisi"],
          tableRows: [
            ["sisi segitiga merepresentasikan jarak dari radar ke salah satu pesawat", ""],
            ["sisi segitiga merepresentasikan jarak antara kapal induk dan pesawat", ""],
            ["sisi segitiga merepresentasikan jarak dari radar ke kapal induk", ""]
          ],
          fillBlanks: {
            instructionText: "Seret sisi yang benar ke pernyataan yang sesuai pada tabel",
            options: [
              {
                id: "opt1",
                text: "Sisi Vertikal (AB)",
                blankID: [{ bid: "blank2", text: "Sisi Vertikal (AB)" }],
                feedbackText: "Benar! Sisi vertikal AB merepresentasikan jarak antara kapal induk dan pesawat."
              },
              {
                id: "opt2",
                text: "Sisi Horizontal (BC)",
                blankID: [{ bid: "blank3", text: "Sisi Horizontal (BC)" }],
                feedbackText: "Benar! Sisi horizontal BC merepresentasikan jarak dari radar ke kapal induk."
              },
              {
                id: "opt3",
                text: "Sisi Miring (AC)",
                blankID: [{ bid: "blank1", text: "Sisi Miring (AC)" }],
                feedbackText: "Benar! Sisi miring AC merepresentasikan jarak dari radar ke salah satu pesawat."
              }
            ],
            impFormulae: []
          },
          quizPanel: {
            questionText: "Pada segitiga siku−siku 30°−60°−90°, dengan 'c' sebagai sisi miring, rasio a:b:c adalah:",
            options: [
              {
                text: "1 : 2 : 3",
                feedback:
                  "Belum tepat. Pada segitiga 30°−60°−90°, rasionya bukan 1:2:3. Ingat: sisi di depan 30° paling pendek, sisi di depan 60° adalah √3 kali sisi terpendek, dan sisi miring adalah 2 kali sisi terpendek. Coba lagi!",
                iscorrect: false
              },
              {
                text: "1 : √3 : 2",
                feedback:
                  "Hebat! Ini benar. Pada segitiga 30°−60°−90°, sisi di depan 30° (a) paling pendek, sisi di depan 60° (b) adalah √3 kali sisi terpendek, dan sisi miring (c) adalah 2 kali sisi terpendek. Jadi rasio a:b:c = 1:√3:2.",
                iscorrect: true
              },
              {
                text: "2 : √2 : 1",
                feedback:
                  "Belum tepat. Rasio ini tidak sesuai untuk segitiga 30°−60°−90°. Pada segitiga 30°−60°−90°, sisi miring selalu sisi terpanjang (2 kali sisi terpendek), bukan yang terpendek. Coba lagi!",
                iscorrect: false
              },
              {
                text: "1 : √2 : 1",
                feedback:
                  "Belum tepat. Rasio 1:√2:1 menggambarkan segitiga siku−siku sama kaki (45°−45°−90°), bukan segitiga 30°−60°−90°. Pada segitiga 30°−60°−90°, sisi miring harus 2 kali sisi terpendek. Coba lagi!",
                iscorrect: false
              }
            ]
          }
        },

        page4: {
          headerText: "Sekarang, mari kita cari selisih waktu yang dibutuhkan untuk mencapai pantai",
          footerInstruction: 'Klik tombol "?" untuk melihat langkah penyelesaian',
          instructionAfterQuiz: "Ketuk » untuk merangkum",
          highlights: [],
          informationAnalysis: { facts: [], values: [], toFind: [] },
          triangleLabels: { vertexLabels: ["A", "B", "C"], sideLabels: ["20 km", "15 km", "25 km"] },
          angleLabels: ["", "90°", ""],
          equationTexts: {
            tripletLabel: 'Waktu untuk mencapai pantai = $\\frac{\\text{Jarak dari pantai}}{\\text{Kecepatan rata−rata}}$',
            pPlusQ: "<i>p</i> + q",
            p: "<i>p</i>",
            pMinusQ: "<i>p</i> − q",
            comma: ",",
            equalsSign: "=",
            colon: "Waktu yang dibutuhkan kapal nelayan =",
            touristBoatText: "Waktu yang dibutuhkan kapal wisata =",
            calculationText:
              "Diketahui :<br>Jarak kapal nelayan dari pantai = 15 km<br>Kecepatan rata−rata kedua kapal = 30 km/jam<br><br>Hasil perhitungan<br>Jarak kapal nelayan dari pantai = 25 km",
            summaryText:
              'Selisih waktu = <span style="display: inline−block; vertical−align: middle; text−align: center; line−height: 1.2;"><span style="display: block; border−bottom: 1px solid currentColor; padding: 0 2px;">25</span><span style="display: block; padding: 0 2px;">30</span></span> − <span style="display: inline−block; vertical−align: middle; text−align: center; line−height: 1.2;"><span style="display: block; border−bottom: 1px solid currentColor; padding: 0 2px;">15</span><span style="display: block; padding: 0 2px;">30</span></span> = <span style="display: inline−block; vertical−align: middle; text−align: center; line−height: 1.2;"><span style="display: block; border−bottom: 1px solid currentColor; padding: 0 2px;">10</span><span style="display: block; padding: 0 2px;">30</span></span> = <span style="display: inline−block; vertical−align: middle; text−align: center; line−height: 1.2;"><span style="display: block; border−bottom: 1px solid currentColor; padding: 0 2px;">1</span><span style="display: block; padding: 0 2px;">3</span></span> jam atau 20 menit',
            flipCardLabel:
              '<span style="display: inline−block; vertical−align: middle; text−align: center; line−height: 1.2;"><span style="display: block; border−bottom: 1px solid currentColor; padding: 0 2px;">Jarak dari Pantai</span><span style="display: block; padding: 0 2px;">Kecepatan Rata−rata</span></span>'
          },
          calculationSteps: {
            headerText: "Langkah Penyelesaian",
            steps: [
              { text: "p = 7, q = 8, r = 12 (karena 7 < 8 < 12)", buttonText: "Hitung kuadrat" },
              {
                explainer: "Hitung p², q², dan r²",
                text: "p² = 7² = 49, q² = 8² = 64, r² = 12² = 144<br>p² + q² = 49 + 64 = 113",
                buttonText: "Bandingkan nilai"
              },
              {
                explainer: "Bandingkan r² = 144 dan p² + q² = 113",
                text: "Karena 144 ≠ 113, maka r² ≠ p² + q²",
                buttonText: "Lihat kesimpulan"
              },
              { explainer: "Kesimpulan", text: "7, 8, 12 BUKAN tripel Pythagoras" }
            ]
          },
          tableUpdates: {
            step1: { col1: "r=12", col2: "p=7 dan q = 8" },
            step2: { r2: "r² = 144", p2q2: "p²=49, q²=64", p2plusq2: "p²+q²=113" },
            step3: { text: "r² ≠ p² + q²" }
          }
        },

        page8: {
          headerText: "Mari memvisualisasikan soal",
          footerInstruction: 'Klik tombol yang disorot untuk melihat langkah penyelesaian',
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          highlights: [],
          informationAnalysis: { facts: [], values: [], toFind: [] },
          stageComponent: {
            headerText: "Mari memvisualisasikan soal",
            stages: [
              {
                image: "assets/visual1.png",
                imageAlt: "Adegan kapal induk dengan radar dan pesawat",
                buttonText: "Posisi radar",
                descriptionText:
                  "Dua pesawat terbang melintasi sebuah kapal induk. Radar yang berada jauh dari kapal induk mendeteksi posisi dua pesawat tempur.",
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [],
                  values: [],
                  toFind: [{ text: "Tentukan jarak antara kedua pesawat berdasarkan ketinggiannya", size: "20gc", color: highlightColor3 }]
                }
              },
              {
                image: "assets/visual2.png",
                imageAlt: "Jarak dari radar ke pesawat pertama",
                buttonText: "Jarak ke pesawat pertama",
                descriptionText: "Radar berada 9 km dari kapal induk.",
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [{ text: "Jarak radar dari kapal induk = 9 km", size: "20gc", color: highlightColor1 }],
                  values: [{ text: "Jarak dari radar ke pesawat pertama = 10 km", size: "20gc", color: highlightColor2 }],
                  toFind: [{ text: "Tentukan jarak antara kedua pesawat berdasarkan ketinggiannya", size: "20gc", color: highlightColor3 }]
                }
              },
              {
                image: "assets/visual3.png",
                imageAlt: "Jarak dari radar ke pesawat kedua",
                buttonText: "Jarak ke pesawat kedua",
                descriptionText: "Pesawat tempur pertama terdeteksi berjarak 10 km dari radar.",
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [{ text: "Jarak dari radar ke pesawat kedua = 12 km", size: "20gc", color: highlightColor1 }],
                  values: [{ text: "Jarak dari radar ke pesawat kedua = 12 km", size: "20gc", color: highlightColor2 }],
                  toFind: [{ text: "Tentukan jarak antara kedua pesawat berdasarkan ketinggiannya", size: "20gc", color: highlightColor3 }]
                }
              },
              {
                image: "assets/visual4.png",
                imageAlt: "Visualisasi segitiga",
                buttonText: "Visualisasikan Bentuk",
                descriptionText: "Pesawat tempur kedua terdeteksi berjarak 12 km dari radar.",
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [
                    { text: "Radar ke kapal induk = 9 km", size: "20gc", color: highlightColor1 },
                    { text: "Radar ke pesawat pertama = 10 km", size: "20gc", color: highlightColor1 },
                    { text: "Radar ke pesawat kedua = 12 km", size: "20gc", color: highlightColor1 }
                  ],
                  values: [
                    { text: "Radar ke kapal induk = 9 km", size: "20gc", color: highlightColor1 },
                    { text: "Radar ke pesawat pertama = 10 km", size: "20gc", color: highlightColor1 },
                    { text: "Radar ke pesawat kedua = 12 km", size: "20gc", color: highlightColor1 }
                  ],
                  toFind: [{ text: "Jarak antara kedua pesawat", size: "20gc", color: highlightColor3 }]
                }
              },
              {
                image: "assets/visual5.png",
                imageAlt: "Segitiga yang terbentuk oleh radar dan pesawat",
                buttonText: "Sederhanakan Visual",
                descriptionText:
                  "Radar, kapal induk, dan Pesawat 1 membentuk segitiga siku−siku. Demikian juga radar, kapal induk, dan Pesawat 2 membentuk segitiga siku−siku lainnya. Radar berjarak 9 km dari kapal induk, dan mendeteksi Pesawat 1 pada 10 km serta Pesawat 2 pada 12 km.",
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [
                    { text: "Segitiga terbentuk oleh radar, pesawat pertama, dan pesawat kedua", size: "20gc", color: highlightColor1 },
                    { text: "Radar ke kapal induk = 9 km", size: "20gc", color: highlightColor2 },
                    { text: "Radar ke pesawat pertama = 10 km", size: "20gc", color: highlightColor2 },
                    { text: "Radar ke pesawat kedua = 12 km", size: "20gc", color: highlightColor2 }
                  ],
                  values: [
                    { text: "Radar ke pesawat pertama = 10 km", size: "20gc", color: highlightColor1 },
                    { text: "Radar ke pesawat kedua = 12 km", size: "20gc", color: highlightColor1 }
                  ],
                  toFind: [{ text: "Jarak antara kedua pesawat", size: "20gc", color: highlightColor3 }]
                }
              },
              {
                image: "assets/visual6.png",
                imageAlt: "Menggunakan teorema Pythagoras untuk mencari ketinggian",
                buttonText: null,
                descriptionText:
                  "Kita dapat menggunakan teorema Pythagoras untuk mencari ketinggian masing−masing pesawat di atas kapal induk, lalu menentukan jarak antara kedua pesawat.",
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [
                    { text: "Segitiga terbentuk oleh radar, pesawat pertama, dan pesawat kedua", size: "20gc", color: highlightColor1 },
                    { text: "Radar ke kapal induk = 9 km", size: "20gc", color: highlightColor2 },
                    { text: "Radar ke pesawat pertama = 10 km", size: "20gc", color: highlightColor2 },
                    { text: "Radar ke pesawat kedua = 12 km", size: "20gc", color: highlightColor2 }
                  ],
                  values: [
                    { text: "Radar ke pesawat pertama = 10 km", size: "20gc", color: highlightColor1 },
                    { text: "Radar ke pesawat kedua = 12 km", size: "20gc", color: highlightColor1 }
                  ],
                  toFind: [{ text: "Jarak antara kedua pesawat", size: "20gc", color: highlightColor3 }]
                }
              }
            ]
          }
        },

        page5: {
          headerText: "Mari verifikasi bahwa 4 m, 5 m, 6 m adalah tripel Pythagoras",
          footerInstruction: "Klik tombol yang disorot untuk melihat langkah penyelesaian",
          instructionAfterQuiz: "Ketuk » untuk merangkum",
          highlights: [],
          informationAnalysis: {
            facts: [
              { text: "Rumah Komang berada di tengah.", size: "20gc", color: highlightColor2 },
              { text: "Komang ke Yohana = $1 \\frac{1}{2}$ km", size: "20gc", color: highlightColor2 }
            ],
            values: [],
            toFind: []
          },
          triangleLabels: { vertexLabels: ["A", "B", "C"], sideLabels: ["4 m", "5 m", "6 m"] },
          tableHeaders: ["r²", "p² + q²"],
          calculationSteps: {
            headerText: "Langkah Penyelesaian",
            steps: [
              {
                type: "formula",
                text: "Teorema Pythagoras: Untuk segitiga siku−siku,<br>c² = a² + b², dengan c sebagai sisi miring",
                buttonText: "Terapkan pada kasus ini"
              },
              { text: "p = 4 m, q = 5 m, r = 6 m<br>(karena 4 < 5 < 6)", buttonText: "Hitung kuadrat" },
              {
                explainer: "Hitung p², q², dan r²",
                text: "p² = 4² = 16, q² = 5² = 25<br>r² = 6² = 36<br>p² + q² = 16 + 25 = 41",
                buttonText: "Bandingkan nilai"
              },
              {
                explainer: "Bandingkan r² = 36 dan p² + q² = 41",
                text: "Karena 36 ≠ 41, maka r² ≠ p² + q²",
                buttonText: "Lihat kesimpulan"
              },
              { explainer: "Kesimpulan", text: "4 m, 5 m, 6 m BUKAN tripel Pythagoras" }
            ]
          },
          tableUpdates: {
            step1: { col1: "r=6 m", col2: "p=4 m dan q = 5 m" },
            step2: { r2: "r² = 36", p2q2: "p²=16, q²=25", p2plusq2: "p²+q²=41" },
            step3: { text: "r² ≠ p² + q²" }
          }
        },

        page13: {
          headerText: '<span style="color: #ffffff;">Ketinggian Pesawat 1:</span> Temukan panjang sisi BC',
          footerInstruction: 'Klik tombol yang disorot untuk melihat langkah penyelesaian',
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          highlights: [],
          informationAnalysis: {
            facts: [
              { text: "Rumah Komang berada di tengah.", size: "20gc", color: highlightColor2 },
              { text: "Komang ke Yohana = $1 \\frac{1}{2}$ km", size: "20gc", color: highlightColor2 }
            ],
            values: [],
            toFind: []
          },
          triangleLabels: { vertexLabels: ["C", "D", "B"], sideLabels: ["9 km", "10 km", "? km"] },
          angleLabels: ["90°", "", ""],
          tableHeaders: ["r²", "p² + q²"],
          calculationSteps: {
            headerText: "Langkah Penyelesaian",
            steps: [
              {
                type: "formula",
                text: "Teorema Pythagoras: Untuk segitiga siku−siku,<br>c² = a² + b², dengan c sebagai sisi miring",
                buttonText: "Terapkan pada kasus ini"
              },
              {
                explainer: "Diketahui sisi−sisinya",
                text: "Sisi DC = 9 km dan BD = 10 km<br>Kita perlu mencari ketinggian (BC)",
                buttonText: "Hitung kuadrat"
              },
              {
                explainer: "Hitung kuadratnya",
                text: "BD² = DC² + BC²<br>10² = 9² + BC²<br>100 = 81 + BC²<br>BC² = 100 − 81 = 19",
                buttonText: "Cari ketinggian"
              },
              { explainer: "Cari akar kuadrat", text: "BC = √19<br>BC ≈ 4.36 km", buttonText: null }
            ]
          },
          tableUpdates: {
            step1: { col1: "r=6 m", col2: "p=4 m dan q = 5 m" },
            step2: { r2: "r² = 36", p2q2: "p²=16, q²=25", p2plusq2: "p²+q²=41" },
            step3: { text: "r² ≠ p² + q²" }
          }
        },

        page15: {
          headerText: '<span style="color: #ffffff;">Ketinggian Pesawat 1:</span> Temukan panjang sisi BC',
          footerInstruction: 'Klik tombol yang disorot untuk melihat langkah penyelesaian',
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          highlights: [],
          informationAnalysis: {
            facts: [
              { text: "Rumah Komang berada di tengah.", size: "20gc", color: highlightColor2 },
              { text: "Komang ke Yohana = $1 \\frac{1}{2}$ km", size: "20gc", color: highlightColor2 }
            ],
            values: [],
            toFind: []
          },
          triangleLabels: { vertexLabels: ["C", "D", "A"], sideLabels: ["9 km", "12 km", "? km"] },
          angleLabels: ["90°", "", ""],
          tableHeaders: ["r²", "p² + q²"],
          calculationSteps: {
            headerText: "Langkah Penyelesaian",
            steps: [
              {
                type: "formula",
                text: "Teorema Pythagoras: Untuk segitiga siku−siku,<br>c² = a² + b², dengan c sebagai sisi miring",
                buttonText: "Terapkan pada kasus ini"
              },
              {
                explainer: "Diketahui sisi−sisinya",
                text: "Sisi DC = 9 km dan AD = 12 km<br>Kita perlu mencari ketinggian (AC)",
                buttonText: "Hitung kuadrat"
              },
              {
                explainer: "Hitung kuadratnya",
                text: "AD² = DC² + AC²<br>12² = 9² + AC²<br>144 = 81 + AC²<br>AC² = 144 − 81 = 63",
                buttonText: "Cari ketinggian"
              },
              { explainer: "Cari akar kuadrat", text: "AC = √63<br>AC ≈ 7.94 km", buttonText: null }
            ]
          },
          tableUpdates: {
            step1: { col1: "r=6 m", col2: "p=4 m dan q = 5 m" },
            step2: { r2: "r² = 36", p2q2: "p²=16, q²=25", p2plusq2: "p²+q²=41" },
            step3: { text: "r² ≠ p² + q²" }
          }
        },

        page16: {
          headerText: "Sekarang, mari kita cari jarak antara kedua pesawat",
          footerInstruction: 'Klik tombol "?" untuk melihat langkah penyelesaian',
          instructionAfterQuiz: "Ketuk » untuk merangkum",
          highlights: [],
          informationAnalysis: { facts: [], values: [], toFind: [] },
          triangleLabels: { vertexLabels: ["A", "B", "C"], sideLabels: ["20 km", "15 km", "25 km"] },
          angleLabels: ["", "90°", ""],
          equationTexts: {
            tripletLabel: 'Waktu untuk mencapai pantai = $\\frac{\\text{Jarak dari pantai}}{\\text{Kecepatan rata−rata}}$',
            pPlusQ: "<i>p</i> + q",
            p: "<i>p</i>",
            pMinusQ: "<i>p</i> − q",
            comma: ",",
            equalsSign: "=",
            colon: "Jarak Pesawat 1 dari Kapal Induk Pesawat",
            touristBoatText: "Jarak Pesawat 2 dari Kapal Induk Pesawat",
            distanceText: "Jarak antara dua pesawat",
            calculationText:
              "Diketahui :<br>Jarak kapal nelayan dari pantai = 15 km<br>Kecepatan rata−rata kedua kapal = 30 km/jam<br><br>Hasil perhitungan<br>Jarak kapal nelayan dari pantai = 25 km",
            summaryText:
              'Selisih waktu = <span style="display: inline−block; vertical−align: middle; text−align: center; line−height: 1.2;"><span style="display: block; border−bottom: 1px solid currentColor; padding: 0 2px;">25</span><span style="display: block; padding: 0 2px;">30</span></span> − <span style="display: inline−block; vertical−align: middle; text−align: center; line−height: 1.2;"><span style="display: block; border−bottom: 1px solid currentColor; padding: 0 2px;">15</span><span style="display: block; padding: 0 2px;">30</span></span> = <span style="display: inline−block; vertical−align: middle; text−align: center; line−height: 1.2;"><span style="display: block; border−bottom: 1px solid currentColor; padding: 0 2px;">10</span><span style="display: block; padding: 0 2px;">30</span></span> = <span style="display: inline−block; vertical−align: middle; text−align: center; line−height: 1.2;"><span style="display: block; border−bottom: 1px solid currentColor; padding: 0 2px;">1</span><span style="display: block; padding: 0 2px;">3</span></span> jam atau 20 menit',
            lengthOfBC: "Panjang BC",
            lengthOfAC: "Panjang AC",
            plane1Altitude: "4.36 km",
            plane2Altitude: "7.94 km",
            distanceBetweenAircraft: "3.58 km"
          },
          calculationSteps: {
            headerText: "Langkah Penyelesaian",
            steps: [
              { text: "p = 7, q = 8, r = 12 (karena 7 < 8 < 12)", buttonText: "Hitung kuadrat" },
              {
                explainer: "Hitung p², q², dan r²",
                text: "p² = 7² = 49, q² = 8² = 64, r² = 12² = 144<br>p² + q² = 49 + 64 = 113",
                buttonText: "Bandingkan nilai"
              },
              {
                explainer: "Bandingkan r² = 144 dan p² + q² = 113",
                text: "Karena 144 ≠ 113, maka r² ≠ p² + q²",
                buttonText: "Lihat kesimpulan"
              },
              {
                explainer: "Kesimpulan",
                text: "Karena r² ≠ p² + q², maka tripel (7, 8, 12) bukan tripel Pythagoras.",
                buttonText: null
              }
            ]
          }
        },

        page14: {
          headerText: "Langkah untuk mencari jarak antara kedua pesawat",
          footerInstruction: "Ketuk » untuk melanjutkan",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
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
            vertexLabels: ["Pesawat", "Kapal Induk<br>Pesawat", "Radar"],
            sideLabels: ["", "9 km", ""]
          },
          angleLabels: ["", "90°", ""],
          tableHeaders: ["r²", "p² + q²"],
          equationTexts: {
            plane2AltitudeLabel: "Ketinggian Pesawat 2:",
            findLengthAC: "Temukan panjang sisi AC",
            plane1AltitudeLabel: "Ketinggian Pesawat 1:",
            findLengthBC: "Temukan panjang sisi BC",
            distanceBetweenAircraft: "Jarak antara kedua pesawat",
            plane2Altitude: "Ketinggian Pesawat 2",
            plane1Altitude: "Ketinggian Pesawat 1"
          },
          calculationSteps: {
            headerText: "Langkah Penyelesaian",
            steps: [
              {
                type: "formula",
                text: "Teorema Pythagoras: Untuk segitiga siku−siku,<br>c² = a² + b², dengan c sebagai sisi miring",
                buttonText: "Terapkan pada kasus ini"
              },
              {
                explainer: "Diketahui sisi vertikal dan horizontal",
                text: "Sisi vertikal (AB) = 20 km<br>Sisi horizontal (BC) = 15 km<br>Kita perlu mencari sisi miring (AC)",
                buttonText: "Hitung kuadrat"
              },
              {
                explainer: "Hitung kuadratnya",
                text: "AC² = AB² + BC²<br>AC² = 20² + 15²<br>AC² = 400 + 225 = 625",
                buttonText: "Cari sisi miring"
              },
              { explainer: "Cari akar kuadrat", text: "AC = √625<br>AC = 25 km", buttonText: null }
            ]
          },
          tableUpdates: {
            step1: { col1: "r=6 m", col2: "p=4 m dan q = 5 m" },
            step2: { r2: "r² = 36", p2q2: "p²=16, q²=25", p2plusq2: "p²+q²=41" },
            step3: { text: "r² ≠ p² + q²" }
          }
        },

        page6: {
          headerText: "Mari kita eksplorasi tripel 8 cm, 15 cm, 17 cm",
          footerInstruction: "Klik tombol yang disorot untuk melihat langkah penyelesaian",
          highlights: [],
          informationAnalysis: {
            facts: [
              { text: "Rumah Komang berada di tengah.", size: "20gc", color: highlightColor2 },
              { text: "Komang ke Yohana = $1 \\frac{1}{2}$ km", size: "20gc", color: highlightColor2 }
            ],
            values: [],
            toFind: []
          },
          triangleLabels: { vertexLabels: ["A", "B", "C"], sideLabels: ["17 cm", "8 cm", "15 cm"] },
          tableHeaders: ["r²", "p² + q²"],
          calculationSteps: {
            headerText: "Langkah Penyelesaian",
            steps: [
              { text: "p = 8, q = 15, r = 17 (karena 8 < 15 < 17)", buttonText: "Hitung kuadrat" },
              {
                explainer: "Hitung p², q², dan r²",
                text: "p² = 8² = 64, q² = 15² = 225, r² = 17² = 289<br>p² + q² = 64 + 225 = 289",
                buttonText: "Bandingkan nilai"
              },
              {
                explainer: "Bandingkan r² = 289 dan p² + q² = 289",
                text: "Karena 289 = 289, maka r² = p² + q²",
                buttonText: "Lihat kesimpulan"
              },
              { explainer: "Kesimpulan", text: "8, 15, 17 ADALAH tripel Pythagoras" }
            ]
          },
          tableUpdates: {
            step1: { col1: "r=17", col2: "p=8 dan q = 15" },
            step2: { r2: "r² = 289", p2q2: "p²=64, q²=225", p2plusq2: "p²+q²=289" },
            step3: { text: "r² = p² + q²" }
          }
        },

        page7: {
          headerText: "Ringkasan",
          summaryText:
            'Berdasarkan eksplorasi kita:<br><br><div style="text−align: left; margin: 0 auto; width: fit−content;">Putri menemukan taman berbentuk segitiga dengan panjang sisi 4 m, 5 m, dan 6 m. Ia ingin membuktikan apakah taman tersebut merupakan segitiga siku−siku.<br><br>Kita memeriksa bahwa 4² + 5² = 16 + 25 = 41 ≠ 36 = 6²<br><br>Oleh karena itu, <strong>taman tersebut BUKAN segitiga siku−siku</strong> karena sisi 4 m, 5 m, dan 6 m tidak membentuk tripel Pythagoras.</div>',
          footerInstruction: "Ketuk » untuk mulai ulang",
          highlights: [
            {
              text:
                "Oleh karena itu, taman tersebut BUKAN segitiga siku−siku karena sisi 4 m, 5 m, dan 6 m tidak membentuk tripel Pythagoras."
            }
          ]
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

    // Return value as−is (could be array, object, number, boolean, etc.)
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
