// Essential Constants for the Math Learning Applet
// Contains navigation and other constants

// Question management - always start from 0 on refresh
let currentQuestionIndex = 0;

// Global question counter for progression (not persisted)
let questionCounter = 0;

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { currentQuestionIndex, questionCounter };
} else {
    if (typeof window.currentQuestionIndex === 'undefined') {
        window.currentQuestionIndex = currentQuestionIndex;
    }
    if (typeof window.questionCounter === 'undefined') {
        window.questionCounter = questionCounter;
    }
} 