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
          questionText: "Arjuna is on the top floor of the tallest building, which is 120 meters tall. He sees a green car and a red car. If the building where Arjuna is located is in a straight line with both cars, then the distance between the green car and the red car is...",
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
                  sideLabels: ['20 KM', '15 KM', '25 KM']
              },
              angleLabels: ['', '90°', ''],
              footerInstruction: "Tap » to start over",
              feedbackTextbox: {
                  text: "The difference in time taken by the two boats to reach the shore is <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">1/3 hours or 20 minutes</span>"
              }
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
                  text: "Using the Pythagorean theorem, we found that the green car is at a distance of <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">50 m</span> from the building, and the red car is at a distance of <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">90 m</span> from the building. Therefore, the distance between the two cars is <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">90 m - 50 m = 40 m</span>."
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
                  ['side of the triangle represents the line of sight from Arjuna to the car', ''],
                  ['side of the triangle represents the distance from the building base to the car', ''],
                  ['side of the triangle represents the height of the building', '']
              ],
              fillBlanks: {
                  instructionText: "Drag the correct side to the matching statement in the table",
                  options: [
                      { 
                          id: "opt1", 
                          text: "Vertical Side (AB)", 
                          blankID: [{ bid: "blank3", text: "Vertical Side (AB)" }], 
                          feedbackText: "Correct! The vertical side AB represents the height of the building."
                      },
                      { 
                          id: "opt2", 
                          text: "Horizontal side (BC)", 
                          blankID: [{ bid: "blank2", text: "Horizontal side (BC)" }], 
                          feedbackText: "Correct! The horizontal side BC represents the distance from the building base to the car."
                      },
                      { 
                          id: "opt3", 
                          text: "Hypotenuse (AC)", 
                          blankID: [{ bid: "blank1", text: "Hypotenuse (AC)" }], 
                          feedbackText: "Correct! The hypotenuse AC represents the line of sight from Arjuna to the car."
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
                  colon: 'Time taken by Fishing boat =',
                  touristBoatText: 'Time taken by Tourist boat =',
                  calculationText: 'As given :<br>Distance of fishing boat from shore = 15 KM<br>Average Speed of both boats = 30 KMph<br><br>As calculated<br>Distance of fishing boat from shore = 25 KM',
                  summaryText: 'Difference in time taken = <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">25</span><span style="display: block; padding: 0 2px;">30</span></span> - <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">15</span><span style="display: block; padding: 0 2px;">30</span></span> = <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">10</span><span style="display: block; padding: 0 2px;">30</span></span> = <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">1</span><span style="display: block; padding: 0 2px;">3</span></span> hours or 20 mins',
                  flipCardLabel: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">Distance from Shore</span><span style="display: block; padding: 0 2px;">Average Speed</span></span>'
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
                          imageAlt: 'Building with Arjuna and two cars',
                          buttonText: 'Height of Tower',
                          descriptionText: 'Arjuna is on the top floor of the tallest building, which is 120 meters tall. He sees a green car and a red car. The building and both cars are in a straight line.',
                          highlights: [],
                          showPreviousImages: [],
                          appendToInfoAnalysis: {
                              facts: [
                                  { text: "Building height = 120 m", size: '20gc', color: highlightColor1 }
                              ],
                              values: [],
                              toFind: [
                                  { text: "Distance between the green car and red car", size: '20gc', color: highlightColor3 }
                              ]
                          }
                      },
                      {
                          image: 'assets/visual2.png',
                          imageAlt: 'Building height visualization',
                          buttonText: 'Distance to green car',
                          descriptionText: 'Arjuna is on the top floor of the tallest building, which is 120 meters tall.',
                          highlights: [],
                          showPreviousImages: [],
                          appendToInfoAnalysis: {
                              facts: [
                                  { text: "Building height = 120 m", size: '20gc', color: highlightColor1 }
                              ],
                              values: [],
                              toFind: [
                                  { text: "Distance between the green car and red car", size: '20gc', color: highlightColor3 }
                              ]
                          }
                      },
                      {
                          image: 'assets/visual3.png',
                          imageAlt: 'Distance from Arjuna to green car',
                          buttonText: 'Distance to red car',
                          descriptionText: "Arjuna's line-of-sight distance to the green car is 130 meters.",
                          highlights: [],
                          showPreviousImages: [],
                          appendToInfoAnalysis: {
                              facts: [
                                  { text: "Building height = 120 m", size: '20gc', color: highlightColor1 }
                              ],
                              values: [
                                  { text: "Line-of-sight to green car = 130 m", size: '20gc', color: highlightColor2 }
                              ],
                              toFind: [
                                  { text: "Distance between the green car and red car", size: '20gc', color: highlightColor3 }
                              ]
                          }
                      },
                      {
                          image: 'assets/visual4.png',
                          imageAlt: 'Distance from Arjuna to red car',
                          buttonText: 'Visualize the shape',
                          descriptionText: "Arjuna's line-of-sight distance to the red car is 150 meters.",
                          highlights: [],
                          showPreviousImages: [],
                          appendToInfoAnalysis: {
                              facts: [
                                  { text: "Building height = 120 m", size: '20gc', color: highlightColor1 }
                              ],
                              values: [
                                  { text: "Line-of-sight to green car = 130 m", size: '20gc', color: highlightColor2 },
                                  { text: "Line-of-sight to red car = 150 m", size: '20gc', color: highlightColor2 }
                              ],
                              toFind: [
                                  { text: "Distance between the green car and red car", size: '20gc', color: highlightColor3 }
                              ]
                          }
                      },
                      {
                          image: 'assets/visual5.png',
                          imageAlt: 'Right-angled triangles visualization',
                          buttonText: 'Simplify the shape',
                          descriptionText: 'From Arjuna\'s position, two right-angled triangles are formed: one with the green car and one with the red car. The building height (120 m) is the vertical leg, and the line-of-sight distances (150 m and 130 m) are the hypotenuses.',
                          highlights: [],
                          showPreviousImages: [],
                          appendToInfoAnalysis: {
                              facts: [
                                  { text: "Building height = 120 m (vertical leg)", size: '20gc', color: highlightColor1 },
                                  { text: "Line-of-sight to green car = 130 m (hypotenuse)", size: '20gc', color: highlightColor1 },
                                  { text: "Line-of-sight to red car = 150 m (hypotenuse)", size: '20gc', color: highlightColor1 }
                              ],
                              values: [
                                  { text: "Line-of-sight to green car = 130 m", size: '20gc', color: highlightColor2 },
                                  { text: "Line-of-sight to red car = 150 m", size: '20gc', color: highlightColor2 }
                              ],
                              toFind: [
                                  { text: "Distance between the green car and red car", size: '20gc', color: highlightColor3 }
                              ]
                          }
                      },
                      {
                          image: 'assets/visual6.png',
                          imageAlt: 'Solution approach visualization',
                          buttonText: null,
                          descriptionText: 'We have two right-angled triangles. Each triangle has a known vertical side (the building height) and a known hypotenuse (the line-of-sight distance). We need to find the horizontal distance from the building to each car, which will help us find the distance between them.',
                          highlights: [],
                          showPreviousImages: [],
                          appendToInfoAnalysis: {
                              facts: [
                                  { text: "Building height = 120 m (vertical leg)", size: '20gc', color: highlightColor1 },
                                  { text: "Line-of-sight to green car = 130 m (hypotenuse)", size: '20gc', color: highlightColor1 },
                                  { text: "Line-of-sight to red car = 150 m (hypotenuse)", size: '20gc', color: highlightColor1 }
                              ],
                              values: [
                                  { text: "Line-of-sight to green car = 130 m", size: '20gc', color: highlightColor2 },
                                  { text: "Line-of-sight to red car = 150 m", size: '20gc', color: highlightColor2 }
                              ],
                              toFind: [
                                  { text: "Distance between the green car and red car", size: '20gc', color: highlightColor3 }
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
              headerText: '<span style="color: #ffffff;">Distance of Green car from building:</span> Find the length of side BC',
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
                          text: 'Pythagoras\'s theorem: For a right triangle,<br>c² = a² + b², where c is the hypotenuse',
                          buttonText: 'Apply to our case'
                      },
                      {
                          explainer: 'Given the sides',
                          text: 'AB = 120 m and AC = 130 m<br>We need to find the distance (BC)',
                          buttonText: 'Calculate squares'
                      },
                      {
                          explainer: 'Calculate the squares',
                          text: 'AC² = AB² + BC²<br>130² = 120² + BC²<br>16900 = 14400 + BC²<br>BC² = 16900 - 14400 = 2500',
                          buttonText: 'Find the distance'
                      },
                      {
                          explainer: 'Find the square root',
                          text: 'BC = √2500<br>BC = 50 m',
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
              headerText: '<span style="color: #ffffff;">Distance of Red car from building:</span> Find the length of side BD',
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
                          text: 'Pythagoras\'s theorem: For a right triangle,<br>c² = a² + b², where c is the hypotenuse',
                          buttonText: 'Apply to our case'
                      },
                      {
                          explainer: 'Given the sides',
                          text: 'AB = 120 m and AD = 150 m<br>We need to find the distance (BD)',
                          buttonText: 'Calculate squares'
                      },
                      {
                          explainer: 'Calculate the squares',
                          text: 'AD² = AB² + BD²<br>150² = 120² + BD²<br>22500 = 14400 + BD²<br>BD² = 22500 - 14400 = 8100',
                          buttonText: 'Find the distance'
                      },
                      {
                          explainer: 'Find the square root',
                          text: 'BD = √8100<br>BD = 90 m',
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
              textBC: '<span style="color: #ffffff;">Distance of Red car from building:</span><br><span style="color:#FFC000;">Length of BD</span>',
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
        pageStatesCleared: "Status halaman sudah dibersihkan. Muat ulang halaman untuk mulai dari awal?",
        nextButtonPage2: "Event perubahan halaman telah dikirim ke halaman 2",
        previousButtonPage1: "Event perubahan halaman telah dikirim ke halaman 1"
      },
    
      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang"
      },
    
      common: {
        questionText:
          "Arjuna berada di lantai paling atas gedung tertinggi dengan tinggi 120 meter. Ia melihat sebuah mobil hijau dan sebuah mobil merah. Jika gedung tempat Arjuna berada segaris lurus dengan kedua mobil tersebut, maka jarak antara mobil hijau dan mobil merah adalah...",
        questionIcon: "T",
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
          instructionText:
            "Mari kita cari jarak antara mobil hijau dan mobil merah menggunakan teorema Pythagoras.",
          headerText: "Baca soal dan identifikasi 'diketahui' dan 'yang dicari'",
          footerInstruction: "Ketuk » untuk memvisualisasikan soal"
        },
    
        page2: {
          headerText: "Pilih visual yang tepat untuk mewakili soal",
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
              "Diketahui segitiga siku-siku sama kaki △ABC dengan ∠C = 90° dan AB = 15√2 cm. Pilih gambar yang tepat yang merepresentasikan segitiga tersebut.",
            options: [
              {
                image: "assets/option1.png",
                text: "",
                feedback: "Bagus sekali!",
                iscorrect: true
              },
              {
                image: "assets/option2.png",
                text: "",
                feedback: "Belum tepat. Coba lagi!",
                iscorrect: false
              },
              {
                image: "assets/option3.png",
                text: "",
                feedback: "Belum tepat. Coba lagi!",
                iscorrect: false
              }
            ]
          },
          stageComponent: {
            headerText: "Mari kita visualisasikan soalnya",
            stages: [
              {
                image: "assets/questionImage.png",
                imageAlt: "Gambar soal",
                buttonText: "Lihat bingkai jendela",
                descriptionText: "Mari kita pahami masalahnya langkah demi langkah.",
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: { facts: [], values: [], toFind: [] }
              },
              {
                image: "assets/visual1-en.png",
                imageAlt: "Bingkai jendela",
                buttonText: "Tampilkan tinggi bingkai jendela",
                descriptionText: "Kita perlu menentukan apakah bingkai jendela benar-benar berbentuk persegi panjang.",
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [],
                  values: [],
                  toFind: [{ text: "Apakah bingkai jendela benar-benar persegi panjang?", size: "20gc", color: highlightColor3 }]
                }
              },
              {
                image: "assets/visual2-en.png",
                imageAlt: "Bingkai jendela dengan tinggi",
                buttonText: "Tampilkan panjang bingkai jendela",
                descriptionText: "Tingginya diketahui 40,8 cm.",
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [{ text: "Tinggi = 40,8 cm", size: "20gc", color: highlightColor1 }],
                  values: [],
                  toFind: [{ text: "Apakah bingkai jendela benar-benar persegi panjang?", size: "20gc", color: highlightColor3 }]
                }
              },
              {
                image: "assets/visual3-en.png",
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
                  toFind: [{ text: "Apakah bingkai jendela benar-benar persegi panjang?", size: "20gc", color: highlightColor3 }]
                }
              },
              {
                image: "assets/visual4-en.png",
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
                  toFind: [{ text: "Apakah bingkai jendela benar-benar persegi panjang?", size: "20gc", color: highlightColor3 }]
                }
              },
              {
                image: "assets/visual5-en.png",
                imageAlt: "Bentuk yang divisualisasikan",
                buttonText: "Sederhanakan menjadi segitiga",
                descriptionText: "Bentuk yang terbentuk oleh sisi-sisi dan diagonal terlihat seperti segitiga.",
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [
                    { text: "Tinggi = 40,8 cm", size: "20gc", color: highlightColor1 },
                    { text: "Panjang = 30,6 cm", size: "20gc", color: highlightColor1 },
                    { text: "Diagonal = 52,5 cm", size: "20gc", color: highlightColor2 }
                  ],
                  values: [],
                  toFind: [{ text: "Apakah bingkai jendela benar-benar persegi panjang?", size: "20gc", color: highlightColor3 }]
                }
              },
              {
                image: "assets/visual6-en.png",
                imageAlt: "Bentuk yang disederhanakan",
                buttonText: null,
                descriptionText:
                  "Kita dapat menyederhanakan ini menjadi segitiga siku-siku. Untuk memeriksa apakah benar-benar persegi panjang, kita cek apakah sisi-sisinya dan diagonal membentuk segitiga siku-siku dengan teorema Pythagoras: a² + b² = c²",
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [
                    { text: "Tinggi = 40,8 cm", size: "20gc", color: highlightColor1 },
                    { text: "Panjang = 30,6 cm", size: "20gc", color: highlightColor1 },
                    { text: "Diagonal = 52,5 cm", size: "20gc", color: highlightColor2 }
                  ],
                  values: [],
                  toFind: [{ text: "Apakah bingkai jendela benar-benar persegi panjang?", size: "20gc", color: highlightColor3 }]
                }
              }
            ]
          }
        },
    
        page3: {
          headerText: "Mari kita cari hubungan antara sisi-sisi segitiga siku-siku sama kaki",
          footerInstruction: "Klik tombol yang disorot untuk melihat langkah penyelesaian",
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
              {
                type: "formula",
                text: "Dari halaman 9, kita memperoleh:<br>a : b : c = 1 : √3 : 2",
                buttonText: "Terapkan rasio"
              },
              {
                explainer: "Dari rasio a : b : c = 1 : √3 : 2",
                text: "Maka, c = 2a",
                buttonText: "Substitusikan nilai"
              },
              {
                explainer: "Substitusi a = x dan c = x + y",
                text: "Jadi: x + y = 2x",
                buttonText: "Cari nilai y"
              },
              {
                explainer: "Mencari y",
                text: "y = 2x - x<br>y = x",
                buttonText: "Cari x"
              },
              {
                explainer: "Jawaban",
                text: "x = y",
                buttonText: null
              }
            ]
          },
          tableUpdates: {
            step1: { col1: "(p + q)²", col2: "p² + (p - q)²" },
            step2: {
              r2: "p² + 2pq + q²",
              p2q2: "p² + p² - 2pq + q²",
              p2plusq2: "= 2p² - 2pq + q²"
            },
            step3: { text: "p = 4q" }
          }
        },
    
        page9: {
          headerText: "Tentukan perbandingan sisi-sisi segitiga",
          footerInstruction: "Pilih jawaban yang benar",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          triangleLabels: {
            vertexLabels: ["B", "D", "C"],
            sideLabels: ["c", "a", "b"]
          },
          angleLabels: ["30°", "60°", "90°"],
          quizPanel: {
            questionText:
              "Pada segitiga siku-siku 30°-60°-90°, jika 'c' adalah sisi miring, maka perbandingan a:b:c adalah:",
            options: [
              {
                text: "1 : 2 : 3",
                feedback:
                  "Belum tepat. Pada segitiga 30°-60°-90°, rasionya bukan 1:2:3. Ingat: sisi di depan 30° paling pendek, sisi di depan 60° adalah √3 kali sisi terpendek, dan sisi miring adalah 2 kali sisi terpendek. Coba lagi!",
                iscorrect: false
              },
              {
                text: "1 : √3 : 2",
                feedback:
                  "Hebat! Ini benar. Pada segitiga 30°-60°-90°, sisi di depan 30° (a) paling pendek, sisi di depan 60° (b) adalah √3 kali sisi terpendek, dan sisi miring (c) adalah 2 kali sisi terpendek. Jadi a:b:c = 1:√3:2.",
                iscorrect: true
              },
              {
                text: "2 : √2 : 1",
                feedback:
                  "Belum tepat. Rasio ini tidak sesuai untuk segitiga 30°-60°-90°. Pada segitiga 30°-60°-90°, sisi miring selalu yang terpanjang (2 kali sisi terpendek), bukan yang terpendek. Coba lagi!",
                iscorrect: false
              },
              {
                text: "1 : √2 : 1",
                feedback:
                  "Belum tepat. Rasio 1:√2:1 adalah untuk segitiga siku-siku sama kaki (45°-45°-90°), bukan segitiga 30°-60°-90°. Pada segitiga 30°-60°-90°, sisi miring harus 2 kali sisi terpendek. Coba lagi!",
                iscorrect: false
              }
            ]
          }
        },
    
        page10: {
          xText: "x",
          footerInstruction: "Pilih jawaban yang benar untuk menentukan panjang sisi-sisi",
          triangleLabels: {
            vertexLabels: ["B", "D", "C"],
            sideLabels: ["c = x + y", "a = x", "b"]
          },
          angleLabels: ["30°", "60°", "90°"],
          tableHeaders: [
            '<span style="color: #FF6600;">a</span>',
            '<span style="color: #00FF7F;">b</span>',
            '<span style="color: #4A90E2;">c</span>'
          ],
          tableRows: [
            [
              '<span style="color: #FF6600;">1</span>',
              '<span style="color: #00FF7F;">√3</span>',
              '<span style="color: #4A90E2;">2</span>'
            ],
            ['<span style="color: #FF6600;">x</span>', "", ""]
          ],
          fillBlanks: {
            instructionText: "Pilih jawaban yang benar",
            options: [
              {
                id: "opt1",
                text: "60",
                blankID: [
                  { bid: "blank1", text: "60" },
                  { bid: "blank2", text: "60√3" },
                  { bid: "blank3", text: "120" }
                ],
                feedbackText: "Benar!"
              },
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
            vertexLabels: ["A", "B", "C"],
            sideLabels: ["20 KM", "15 KM", "25 KM"]
          },
          angleLabels: ["", "90°", ""],
          footerInstruction: "Ketuk » untuk mulai ulang",
          feedbackTextbox: {
            text:
              'Selisih waktu yang dibutuhkan kedua perahu untuk mencapai pantai adalah <span style="background-color: #FFD700; color: #000000; padding: 2px 4px;">1/3 jam atau 20 menit</span>'
          }
        },
    
        page17: {
          headerText: "Mari kita rangkum",
          triangleLabels: {
            vertexLabels: ["A", "B", "C"],
            sideLabels: ["20 KM", "15 KM", "25 KM"]
          },
          angleLabels: ["", "90°", ""],
          footerInstruction: "Ketuk » untuk mulai ulang",
          feedbackTextbox: {
            text:
              'Dengan menggunakan teorema Pythagoras, kita memperoleh bahwa mobil hijau berjarak <span style="background-color: #FFD700; color: #000000; padding: 2px 4px;">50 m</span> dari gedung, dan mobil merah berjarak <span style="background-color: #FFD700; color: #000000; padding: 2px 4px;">90 m</span> dari gedung. Maka, jarak antara kedua mobil adalah <span style="background-color: #FFD700; color: #000000; padding: 2px 4px;">90 m - 50 m = 40 m</span>.'
          }
        },
    
        page12: {
          headerText: "Tentukan sisi-sisi segitiga",
          footerInstruction: "Cocokkan sisi yang benar dengan pernyataannya",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          triangleLabels: {
            vertexLabels: ["C", "B", "A"],
            sideLabels: ["", "120 m", ""]
          },
          angleLabels: ["", "90°", ""],
          tableHeaders: ["", "Sisi"],
          tableRows: [
            ["sisi segitiga yang mewakili garis pandang dari Arjuna ke mobil", ""],
            ["sisi segitiga yang mewakili jarak dari kaki gedung ke mobil", ""],
            ["sisi segitiga yang mewakili tinggi gedung", ""]
          ],
          fillBlanks: {
            instructionText: "Seret sisi yang benar ke pernyataan yang sesuai pada tabel",
            options: [
              {
                id: "opt1",
                text: "Sisi Vertikal (AB)",
                blankID: [{ bid: "blank3", text: "Sisi Vertikal (AB)" }],
                feedbackText: "Benar! Sisi vertikal AB mewakili tinggi gedung."
              },
              {
                id: "opt2",
                text: "Sisi Horizontal (BC)",
                blankID: [{ bid: "blank2", text: "Sisi Horizontal (BC)" }],
                feedbackText: "Benar! Sisi horizontal BC mewakili jarak dari kaki gedung ke mobil."
              },
              {
                id: "opt3",
                text: "Sisi Miring (AC)",
                blankID: [{ bid: "blank1", text: "Sisi Miring (AC)" }],
                feedbackText: "Benar! Sisi miring AC mewakili garis pandang dari Arjuna ke mobil."
              }
            ],
            impFormulae: []
          },
          quizPanel: {
            questionText:
              "Pada segitiga siku-siku 30°-60°-90°, jika 'c' adalah sisi miring, maka perbandingan a:b:c adalah:",
            options: [
              {
                text: "1 : 2 : 3",
                feedback:
                  "Belum tepat. Pada segitiga 30°-60°-90°, rasionya bukan 1:2:3. Ingat: sisi di depan 30° paling pendek, sisi di depan 60° adalah √3 kali sisi terpendek, dan sisi miring adalah 2 kali sisi terpendek. Coba lagi!",
                iscorrect: false
              },
              {
                text: "1 : √3 : 2",
                feedback:
                  "Hebat! Ini benar. Pada segitiga 30°-60°-90°, sisi di depan 30° (a) paling pendek, sisi di depan 60° (b) adalah √3 kali sisi terpendek, dan sisi miring (c) adalah 2 kali sisi terpendek. Jadi a:b:c = 1:√3:2.",
                iscorrect: true
              },
              {
                text: "2 : √2 : 1",
                feedback:
                  "Belum tepat. Rasio ini tidak sesuai untuk segitiga 30°-60°-90°. Pada segitiga 30°-60°-90°, sisi miring selalu yang terpanjang (2 kali sisi terpendek), bukan yang terpendek. Coba lagi!",
                iscorrect: false
              },
              {
                text: "1 : √2 : 1",
                feedback:
                  "Belum tepat. Rasio 1:√2:1 adalah untuk segitiga siku-siku sama kaki (45°-45°-90°), bukan segitiga 30°-60°-90°. Pada segitiga 30°-60°-90°, sisi miring harus 2 kali sisi terpendek. Coba lagi!",
                iscorrect: false
              }
            ]
          }
        },
    
        page4: {
          headerText: "Sekarang, mari kita cari selisih waktu untuk mencapai pantai",
          footerInstruction: 'Klik pada "?" untuk melihat langkah penyelesaian',
          instructionAfterQuiz: "Ketuk » untuk merangkum",
          highlights: [],
          informationAnalysis: { facts: [], values: [], toFind: [] },
          triangleLabels: {
            vertexLabels: ["A", "B", "C"],
            sideLabels: ["20 KM", "15 KM", "25 KM"]
          },
          angleLabels: ["", "90°", ""],
          equationTexts: {
            tripletLabel: 'Waktu untuk mencapai pantai = $\\frac{\\text{Jarak dari pantai}}{\\text{Kecepatan rata-rata}}$',
            pPlusQ: "<i>p</i> + q",
            p: "<i>p</i>",
            pMinusQ: "<i>p</i> - q",
            comma: ",",
            equalsSign: "=",
            colon: "Waktu tempuh perahu nelayan =",
            touristBoatText: "Waktu tempuh perahu wisata =",
            calculationText:
              "Diketahui :<br>Jarak perahu nelayan dari pantai = 15 KM<br>Kecepatan rata-rata kedua perahu = 30 KM/jam<br><br>Hasil perhitungan<br>Jarak perahu wisata dari pantai = 25 KM",
            summaryText:
              'Selisih waktu = <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">25</span><span style="display: block; padding: 0 2px;">30</span></span> - <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">15</span><span style="display: block; padding: 0 2px;">30</span></span> = <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">10</span><span style="display: block; padding: 0 2px;">30</span></span> = <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">1</span><span style="display: block; padding: 0 2px;">3</span></span> jam atau 20 menit',
            flipCardLabel:
              '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">Jarak dari Pantai</span><span style="display: block; padding: 0 2px;">Kecepatan Rata-rata</span></span>'
          },
          calculationSteps: {
            headerText: "Langkah Penyelesaian",
            steps: [
              {
                text: "p = 7, q = 8, r = 12 (karena 7 < 8 < 12)",
                buttonText: "Hitung kuadrat"
              },
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
                text: "7, 8, 12 BUKAN tripel Pythagoras"
              }
            ]
          },
          tableUpdates: {
            step1: { col1: "r=12", col2: "p=7 dan q = 8" },
            step2: { r2: "r² = 144", p2q2: "p²=49, q²=64", p2plusq2: "p²+q²=113" },
            step3: { text: "r² ≠ p² + q²" }
          }
        },
    
        page8: {
          headerText: "Mari kita visualisasikan soalnya",
          footerInstruction: "Klik tombol yang disorot untuk melihat langkah penyelesaian",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          highlights: [],
          informationAnalysis: { facts: [], values: [], toFind: [] },
          stageComponent: {
            headerText: "Mari kita visualisasikan soalnya",
            stages: [
              {
                image: "assets/visual1.png",
                imageAlt: "Gedung dengan Arjuna dan dua mobil",
                buttonText: "Tinggi Menara",
                descriptionText:
                  "Arjuna berada di lantai paling atas gedung tertinggi dengan tinggi 120 meter. Ia melihat sebuah mobil hijau dan sebuah mobil merah. Gedung dan kedua mobil berada pada satu garis lurus.",
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [{ text: "Tinggi gedung = 120 m", size: "20gc", color: highlightColor1 }],
                  values: [],
                  toFind: [{ text: "Jarak antara mobil hijau dan mobil merah", size: "20gc", color: highlightColor3 }]
                }
              },
              {
                image: "assets/visual2.png",
                imageAlt: "Visualisasi tinggi gedung",
                buttonText: "Jarak ke mobil hijau",
                descriptionText: "Arjuna berada di lantai paling atas gedung tertinggi dengan tinggi 120 meter.",
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [{ text: "Tinggi gedung = 120 m", size: "20gc", color: highlightColor1 }],
                  values: [],
                  toFind: [{ text: "Jarak antara mobil hijau dan mobil merah", size: "20gc", color: highlightColor3 }]
                }
              },
              {
                image: "assets/visual3.png",
                imageAlt: "Jarak dari Arjuna ke mobil hijau",
                buttonText: "Jarak ke mobil merah",
                descriptionText: "Jarak garis pandang Arjuna ke mobil hijau adalah 130 meter.",
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [{ text: "Tinggi gedung = 120 m", size: "20gc", color: highlightColor1 }],
                  values: [{ text: "Garis pandang ke mobil hijau = 130 m", size: "20gc", color: highlightColor2 }],
                  toFind: [{ text: "Jarak antara mobil hijau dan mobil merah", size: "20gc", color: highlightColor3 }]
                }
              },
              {
                image: "assets/visual4.png",
                imageAlt: "Jarak dari Arjuna ke mobil merah",
                buttonText: "Visualisasikan bentuknya",
                descriptionText: "Jarak garis pandang Arjuna ke mobil merah adalah 150 meter.",
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [{ text: "Tinggi gedung = 120 m", size: "20gc", color: highlightColor1 }],
                  values: [
                    { text: "Garis pandang ke mobil hijau = 130 m", size: "20gc", color: highlightColor2 },
                    { text: "Garis pandang ke mobil merah = 150 m", size: "20gc", color: highlightColor2 }
                  ],
                  toFind: [{ text: "Jarak antara mobil hijau dan mobil merah", size: "20gc", color: highlightColor3 }]
                }
              },
              {
                image: "assets/visual5.png",
                imageAlt: "Visualisasi dua segitiga siku-siku",
                buttonText: "Sederhanakan bentuknya",
                descriptionText:
                  "Dari posisi Arjuna, terbentuk dua segitiga siku-siku: satu dengan mobil hijau dan satu dengan mobil merah. Tinggi gedung (120 m) adalah sisi tegak, sedangkan jarak garis pandang (150 m dan 130 m) adalah sisi miring.",
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [
                    { text: "Tinggi gedung = 120 m (sisi tegak)", size: "20gc", color: highlightColor1 },
                    { text: "Garis pandang ke mobil hijau = 130 m (sisi miring)", size: "20gc", color: highlightColor1 },
                    { text: "Garis pandang ke mobil merah = 150 m (sisi miring)", size: "20gc", color: highlightColor1 }
                  ],
                  values: [
                    { text: "Garis pandang ke mobil hijau = 130 m", size: "20gc", color: highlightColor2 },
                    { text: "Garis pandang ke mobil merah = 150 m", size: "20gc", color: highlightColor2 }
                  ],
                  toFind: [{ text: "Jarak antara mobil hijau dan mobil merah", size: "20gc", color: highlightColor3 }]
                }
              },
              {
                image: "assets/visual6.png",
                imageAlt: "Visualisasi pendekatan solusi",
                buttonText: null,
                descriptionText:
                  "Kita memiliki dua segitiga siku-siku. Setiap segitiga memiliki sisi tegak yang diketahui (tinggi gedung) dan sisi miring yang diketahui (jarak garis pandang). Kita perlu mencari jarak mendatar dari kaki gedung ke masing-masing mobil, lalu menentukan jarak antara kedua mobil.",
                highlights: [],
                showPreviousImages: [],
                appendToInfoAnalysis: {
                  facts: [
                    { text: "Tinggi gedung = 120 m (sisi tegak)", size: "20gc", color: highlightColor1 },
                    { text: "Garis pandang ke mobil hijau = 130 m (sisi miring)", size: "20gc", color: highlightColor1 },
                    { text: "Garis pandang ke mobil merah = 150 m (sisi miring)", size: "20gc", color: highlightColor1 }
                  ],
                  values: [
                    { text: "Garis pandang ke mobil hijau = 130 m", size: "20gc", color: highlightColor2 },
                    { text: "Garis pandang ke mobil merah = 150 m", size: "20gc", color: highlightColor2 }
                  ],
                  toFind: [{ text: "Jarak antara mobil hijau dan mobil merah", size: "20gc", color: highlightColor3 }]
                }
              }
            ]
          }
        },
    
        page5: {
          headerText: "Mari kita verifikasi bahwa 4 m, 5 m, 6 m adalah tripel Pythagoras",
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
                text: "Teorema Pythagoras: Untuk segitiga siku-siku,<br>c² = a² + b², dengan c adalah sisi miring",
                buttonText: "Terapkan pada kasus kita"
              },
              {
                text: "p = 4 m, q = 5 m, r = 6 m<br>(karena 4 < 5 < 6)",
                buttonText: "Hitung kuadrat"
              },
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
          headerText:
            '<span style="color: #ffffff;">Jarak mobil hijau dari gedung:</span> Tentukan panjang sisi BC',
          footerInstruction: "Klik tombol yang disorot untuk melihat langkah penyelesaian",
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
          triangleLabels: { vertexLabels: ["B", "A", "C"], sideLabels: ["120 m", "130 m", "? m"] },
          angleLabels: ["90°", "", ""],
          tableHeaders: ["r²", "p² + q²"],
          calculationSteps: {
            headerText: "Langkah Penyelesaian",
            steps: [
              {
                type: "formula",
                text: "Teorema Pythagoras: Untuk segitiga siku-siku,<br>c² = a² + b², dengan c adalah sisi miring",
                buttonText: "Terapkan pada kasus kita"
              },
              {
                explainer: "Diketahui sisi-sisinya",
                text: "AB = 120 m dan AC = 130 m<br>Kita perlu mencari jarak (BC)",
                buttonText: "Hitung kuadrat"
              },
              {
                explainer: "Hitung kuadratnya",
                text: "AC² = AB² + BC²<br>130² = 120² + BC²<br>16900 = 14400 + BC²<br>BC² = 16900 - 14400 = 2500",
                buttonText: "Tentukan jaraknya"
              },
              { explainer: "Ambil akar kuadrat", text: "BC = √2500<br>BC = 50 m", buttonText: null }
            ]
          }
        },
    
        page15: {
          headerText:
            '<span style="color: #ffffff;">Jarak mobil merah dari gedung:</span> Tentukan panjang sisi BD',
          footerInstruction: "Klik tombol yang disorot untuk melihat langkah penyelesaian",
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
          triangleLabels: { vertexLabels: ["B", "A", "C"], sideLabels: ["120 m", "150 m", "? m"] },
          angleLabels: ["90°", "", ""],
          tableHeaders: ["r²", "p² + q²"],
          calculationSteps: {
            headerText: "Langkah Penyelesaian",
            steps: [
              {
                type: "formula",
                text: "Teorema Pythagoras: Untuk segitiga siku-siku,<br>c² = a² + b², dengan c adalah sisi miring",
                buttonText: "Terapkan pada kasus kita"
              },
              {
                explainer: "Diketahui sisi-sisinya",
                text: "AB = 120 m dan AD = 150 m<br>Kita perlu mencari jarak (BD)",
                buttonText: "Hitung kuadrat"
              },
              {
                explainer: "Hitung kuadratnya",
                text: "AD² = AB² + BD²<br>150² = 120² + BD²<br>22500 = 14400 + BD²<br>BD² = 22500 - 14400 = 8100",
                buttonText: "Tentukan jaraknya"
              },
              { explainer: "Ambil akar kuadrat", text: "BD = √8100<br>BD = 90 m", buttonText: null }
            ]
          }
        },
    
        page16: {
          headerText: "Sekarang, mari kita cari jarak antara kedua mobil",
          footerInstruction: 'Klik pada "?" untuk melihat langkah penyelesaian',
          instructionAfterQuiz: "Ketuk » untuk merangkum",
          highlights: [],
          informationAnalysis: { facts: [], values: [], toFind: [] },
          triangleLabels: { vertexLabels: ["A", "B", "C"], sideLabels: ["20 KM", "15 KM", "25 KM"] },
          angleLabels: ["", "90°", ""],
          equationTexts: {
            tripletLabel:
              'Waktu untuk mencapai pantai = $\\frac{\\text{Jarak dari pantai}}{\\text{Kecepatan rata-rata}}$',
            pPlusQ: "<i>p</i> + q",
            p: "<i>p</i>",
            pMinusQ: "<i>p</i> - q",
            comma: ",",
            equalsSign: "=",
            colon: "Jarak mobil hijau dari gedung",
            touristBoatText: "Jarak mobil merah dari gedung",
            distanceText: "Jarak antara kedua mobil",
            calculationText:
              "Diketahui :<br>Jarak perahu nelayan dari pantai = 15 KM<br>Kecepatan rata-rata kedua perahu = 30 KM/jam<br><br>Hasil perhitungan<br>Jarak perahu wisata dari pantai = 25 KM",
            summaryText:
              'Selisih waktu = <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">25</span><span style="display: block; padding: 0 2px;">30</span></span> - <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">15</span><span style="display: block; padding: 0 2px;">30</span></span> = <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">10</span><span style="display: block; padding: 0 2px;">30</span></span> = <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">1</span><span style="display: block; padding: 0 2px;">3</span></span> jam atau 20 menit',
            lengthOfBC: "Panjang BC",
            lengthOfAC: "Panjang BD",
            plane1Altitude: "50 m",
            plane2Altitude: "90 m",
            distanceBetweenAircraft: "40 m"
          }
        },
    
        page14: {
          headerText: "Langkah-langkah mencari jarak antara kedua mobil",
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
          triangleLabels: { vertexLabels: ["Pesawat", "Kapal<br>Induk", "Radar"], sideLabels: ["", "9 KM", ""] },
          angleLabels: ["", "90°", ""],
          tableHeaders: ["r²", "p² + q²"],
          calculationSteps: {
            headerText: "Langkah Penyelesaian",
            steps: [
              {
                type: "formula",
                text: "Teorema Pythagoras: Untuk segitiga siku-siku,<br>c² = a² + b², dengan c adalah sisi miring",
                buttonText: "Terapkan pada kasus kita"
              },
              {
                explainer: "Diketahui sisi tegak dan sisi mendatar",
                text: "Sisi tegak (AB) = 20 km<br>Sisi mendatar (BC) = 15 km<br>Kita perlu mencari sisi miring (AC)",
                buttonText: "Hitung kuadrat"
              },
              {
                explainer: "Hitung kuadratnya",
                text: "AC² = AB² + BC²<br>AC² = 20² + 15²<br>AC² = 400 + 225 = 625",
                buttonText: "Tentukan sisi miring"
              },
              { explainer: "Ambil akar kuadrat", text: "AC = √625<br>AC = 25 km", buttonText: null }
            ]
          },
          textAC:
            '<span style="color: #ffffff;">Jarak mobil hijau dari gedung:</span><br><span style="color: #FF6600;">Panjang BC</span>',
          textBC:
            '<span style="color: #ffffff;">Jarak mobil merah dari gedung:</span><br><span style="color: #FF6600;">Panjang BD</span>',
          textDistanceLeft: '<span style="color: #FF6600;">Jarak antara kedua mobil</span>',
          textDistanceRight:
            '<span style="color: #FF6600;">=\u00A0\u00A0</span><span style="color: #ffffff;">(Jarak mobil merah dari gedung)</span> <span style="color: #FF6600;">-</span> <span style="color: #ffffff;">(Jarak mobil hijau dari gedung)</span>'
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
          headerText: "Rangkuman",
          summaryText:
            'Berdasarkan eksplorasi kita:<br><br><div style="text-align: left; margin: 0 auto; width: fit-content;">Putri menemukan sebuah taman berbentuk segitiga dengan panjang sisi 4 m, 5 m, dan 6 m. Ia ingin membuktikan apakah taman tersebut merupakan segitiga siku-siku.<br><br>Kita memeriksa bahwa 4² + 5² = 16 + 25 = 41 ≠ 36 = 6²<br><br>Jadi, <strong>taman tersebut BUKAN segitiga siku-siku</strong> karena sisi 4 m, 5 m, dan 6 m tidak membentuk tripel Pythagoras.</div>',
          footerInstruction: "Ketuk » untuk mulai ulang",
          highlights: [
            {
              text:
                "Jadi, taman tersebut BUKAN segitiga siku-siku karena sisi 4 m, 5 m, dan 6 m tidak membentuk tripel Pythagoras."
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
