// QuestionHandler Component
function QuestionHandler({ children }) {
  const [index, setIndex] = React.useState(0);
  const [isCompleted, setIsCompleted] = React.useState(false);

  // Get questions from translation - access directly from appData
  const currentLang = window.APP_LANGUAGE || "en";
  const questions = window.appData?.[currentLang]?.translation?.questions || [];
  const currentQuestion = questions[index];

  console.log("QuestionHandler - Language:", currentLang);
  console.log("QuestionHandler - Questions loaded:", questions.length);
  console.log("QuestionHandler - Current question:", currentQuestion);

  // Effect to handle Next button state based on isCompleted
  React.useEffect(() => {
    // This effect runs whenever isCompleted changes
    // The Next button enable/disable logic is handled by passing isCompleted to children
    console.log("isCompleted changed:", isCompleted);
  }, [isCompleted]);

  // Handle option click
  const handleOptionClick = (option) => {
    if (option.isCorrect) {
      setIsCompleted(true);
      // Play correct sound
      if (window.PlayAudio) {
        window.PlayAudio("assets/correct.mp3");
      }
      return { success: true, feedback: option.feedback };
    } else {
      // Play wrong sound
      if (window.PlayAudio) {
        window.PlayAudio("assets/wrong.mp3");
      }
      return { success: false, feedback: option.feedback };
    }
  };

  // Handle Next button click
  const handleNext = () => {
    if (isCompleted && index < questions.length - 1) {
      setIndex(index + 1);
      setIsCompleted(false); // Reset for next question
      // Play click sound
      if (window.PlayAudio) {
        window.PlayAudio("assets/click.mp3");
      }
    } else if (isCompleted && index === questions.length - 1) {
      // Last question - Start Over
      console.log("Starting over - resetting to first question");
      setIndex(0);
      setIsCompleted(false);
      // Play confetti sound
      if (window.PlayAudio) {
        window.PlayAudio("assets/confetti.mp3");
      }
    }
  };

  // Check if it's the last question
  const isLastQuestion = index === questions.length - 1;

  // Expose state and handlers to children
  return children({
    index,
    isCompleted,
    currentQuestion,
    totalQuestions: questions.length,
    handleOptionClick,
    handleNext,
    isNextDisabled: !isCompleted,
    isLastQuestion,
  });
}

// Export to global scope
window.QuestionHandler = QuestionHandler;

