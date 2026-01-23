// Essential Constants for the Math Learning Applet
// Contains only currentQuestionIndex for navigation

// Question management
let currentQuestionIndex = 0;

// Initialize on app load
if (typeof window !== 'undefined') {
    window.currentQuestionIndex = currentQuestionIndex;
    console.log('✅ Question index initialized:', window.currentQuestionIndex);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { currentQuestionIndex };
} else {
    if (typeof window.currentQuestionIndex === 'undefined') {
        window.currentQuestionIndex = currentQuestionIndex;
    }
} 