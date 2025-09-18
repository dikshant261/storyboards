// Essential Constants for the Math Learning Applet
// Simplified to include only what's actually used

// Fraction representation variables
// const numerator = 12;
// const denominator = 5;
const showNumber = false;

// Animation timing constants
const CHECKPOINT_DELAY_MS = 2000; // Delay between checkpoints in milliseconds

let page2completed = false;

// Page 1 state variables
let objectsremoved = 0;
let page1complete = false;

// Page 2 state variables
let answerPage2 = '';
let page2complete = false;

// Question management
let currentQuestionIndex = 0;

// Questions array for math problems
const QUESTIONS = [    
    {
        minuend: 5,
        subtrahend: 1,
        missing:'both',
        asset:'car'
    },
    {
        minuend: 9,
        subtrahend: 3,
        missing:'both',
        asset:'car'
    },
    {
        minuend: 5,
        subtrahend: 5,
        missing:'both',
        asset:'car'
    },
    {
        minuend: 8,
        subtrahend: 0,
        missing:'both',
        asset:'car'
    },
    {
        minuend: 8,
        subtrahend: 6,
        missing:'both',
        asset:'car'
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QUESTIONS, showNumber, CHECKPOINT_DELAY_MS, page2completed, objectsremoved, page1complete, answerPage2, page2complete, currentQuestionIndex };
} else {
    window.QUESTIONS = QUESTIONS;
    window.showNumber = showNumber;
    window.CHECKPOINT_DELAY_MS = CHECKPOINT_DELAY_MS;
    // Initialize page 1 state variables
    if (typeof window.objectsremoved === 'undefined') {
        window.objectsremoved = objectsremoved;
    }
    if (typeof window.page1complete === 'undefined') {
        window.page1complete = page1complete;
    }
    
    // Initialize page 2 state variables
    if (typeof window.page2completed === 'undefined') {
        window.page2completed = page2completed;
    }
    if (typeof window.answerPage2 === 'undefined') {
        window.answerPage2 = answerPage2;
    }
    if (typeof window.page2complete === 'undefined') {
        window.page2complete = page2complete;
    }
    if (typeof window.currentQuestionIndex === 'undefined') {
        window.currentQuestionIndex = currentQuestionIndex;
    }
    
    console.log('🔄 Constants loaded - page1:', window.objectsremoved, window.page1complete, 'page2:', window.page2completed, 'answerPage2:', window.answerPage2, 'page2complete:', window.page2complete, 'currentQuestionIndex:', window.currentQuestionIndex);
} 