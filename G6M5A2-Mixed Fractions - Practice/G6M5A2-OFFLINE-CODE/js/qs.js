const Questions = [{
  divisor: 7,
  dividend: 18,
  quotient: [{
    option: 1,
    isCorrected: false,
    feedback: "Oops! There is another complete whole of 7 in the 11 parts that are left. "
  }, {
    option: 2,
    isCorrected: true,
    feedback: "Well done! The correct quotient is 2. "
  }, {
    option: 3,
    isCorrected: false,
    feedback: "Oops! 3 groups of 7 make 21, but we only have 18.\nTry again!"
  }],
  remainder: [{
    option: 5,
    isCorrected: false,
    feedback: "Oops! Give it another try—subtract carefully!"
  }, {
    option: 3,
    isCorrected: false,
    feedback: "Oops! Give it another try—subtract carefully!"
  }, {
    option: 4,
    isCorrected: true,
    feedback: "Great! The correct remainder is 4."
  }]
}, {
  divisor: 6,
  dividend: 20,
  quotient: [{
    option: 5,
    isCorrected: false,
    feedback: " Oops! That’s not the right quotient. Try again"
  }, {
    option: 2,
    isCorrected: false,
    feedback: "Oops! There is another complete whole of 6 in the 8 parts that are left.Notice that 8/6 is still an improper fraction. Try again!"
  }, {
    option: 3,
    isCorrected: true,
    feedback: "Well done! The correct quotient is 2. Now, tap the correct remainder"
  }],
  remainder: [{
    option: 3,
    isCorrected: false,
    feedback: "Oops! Give it another try—subtract carefully!"
  }, {
    option: 2,
    isCorrected: true,
    feedback: "The mixed number representation of 20/6 is 3 2/6. Tap Next to proceed."
  }, {
    option: 1,
    isCorrected: false,
    feedback: "Oops! Give it another try—subtract carefully!"
  }]
}, {
  divisor: 4,
  dividend: 25,
  quotient: [{
    option: 5,
    isCorrected: false,
    feedback: "Oops! There is another complete whole of 4 in the 5 parts that are left.Notice that 5/4 is still an improper fraction. Try again!"
  }, {
    option: 8,
    isCorrected: false,
    feedback: "Oops! That’s not the right quotient. Try again!"
  }, {
    option: 6,
    isCorrected: true,
    feedback: "Well done! The correct quotient is 6. Now, tap the correct remainder."
  }],
  remainder: [{
    option: 1,
    isCorrected: true,
    feedback: "The mixed number representation of 25/4 is 6 1/4. Tap Next to proceed"
  }, {
    option: 3,
    isCorrected: false,
    feedback: "Oops! Give it another try—subtract carefully!"
  }, {
    option: 2,
    isCorrected: false,
    feedback: "Oops! Give it another try—subtract carefully!"
  }]
}, {
  divisor: 9,
  dividend: 75,
  quotient: [{
    option: 9,
    isCorrected: false,
    feedback: "Oops! There are complete wholes of 9 in the 30 parts that are left.Notice that 30/9 is still an improper fraction. Try again!"
  }, {
    option: 8,
    isCorrected: true,
    feedback: "Well done! The correct quotient is 8. Now, tap the correct remainder."
  }, {
    option: 6,
    isCorrected: false,
    feedback: "Oops! That’s not the right quotient. Try again!"
  }],
  remainder: [{
    option: 3,
    isCorrected: true,
    feedback: "The mixed number representation of 75/9 is 8 3/9. Tap Next to proceed."
  }, {
    option: 1,
    isCorrected: false,
    feedback: "Oops! Give it another try—subtract carefully!"
  }, {
    option: 2,
    isCorrected: false,
    feedback: "Oops! Give it another try—subtract carefully!"
  }]
}, {
  divisor: 11,
  dividend: 59,
  quotient: [{
    option: 5,
    isCorrected: true,
    feedback: " Well done! The correct quotient is 5. Now, tap the correct remainder."
  }, {
    option: 4,
    isCorrected: false,
    feedback: "Oops! There are complete wholes of 11 in the 26 parts that are left.Notice that 26/11 is still an improper fraction. Try again!"
  }, {
    option: 9,
    isCorrected: false,
    feedback: "Oops! That’s not the right quotient. Try again!"
  }],
  remainder: [{
    option: 5,
    isCorrected: false,
    feedback: "Oops! Give it another try—subtract carefully!"
  }, {
    option: 7,
    isCorrected: false,
    feedback: "Oops! Give it another try—subtract carefully!"
  }, {
    option: 4,
    isCorrected: true,
    feedback: "The mixed number representation of 59/11 is 5 4/11. Tap Next to proceed."
  }]
}, {
  divisor: 7,
  dividend: 64,
  quotient: [{
    option: 9,
    isCorrected: true,
    feedback: "Well done! The correct quotient is 7. Now, tap the correct remainder."
  }, {
    option: 7,
    isCorrected: false,
    feedback: "Oops! That’s not the right quotient. Try again!"
  }, {
    option: 5,
    isCorrected: false,
    feedback: "Oops! That’s not the right quotient. Try again!"
  }],
  remainder: [{
    option: 5,
    isCorrected: false,
    feedback: "Oops! Give it another try—subtract carefully!"
  }, {
    option: 1,
    isCorrected: true,
    feedback: "The mixed number representation of 64/7 is 9 1/7. Tap Next to proceed."
  }, {
    option: 3,
    isCorrected: false,
    feedback: "Oops! Give it another try—subtract carefully!"
  }]
}];

window.Questions=Questions;