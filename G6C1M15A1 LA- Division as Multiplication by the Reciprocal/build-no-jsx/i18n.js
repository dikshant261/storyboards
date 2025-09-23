import i18n, { t } from "i18next";
import { initReactI18next } from "react-i18next";
i18n.use(initReactI18next).init({
  lng: "en",
  // default language
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        buttons: {
          previous: "«",
          next: "»",
          show: "Show",
          check: "Check",
          hide: "Hide",
          startOver: "START OVER",
          start: "START",
          summarise: "Summarise"
        },
        startPageContent: {
          title: "Division as Multiplication by the Reciprocal",
          weLearned: "We learned that the reciprocal of a number is found by flipping it.",
          nowLetLearn: "Now, let’s learn how dividing by a number is the same as multiplying with its reciprocal.",
          tapStart: "Tap “Start” to start the activity."
        },
        sceneOne: {
          contentHeading: "Consider a division problem."
        },
        sceneTwo: {
          question: "Let’s take two wholes to represent 2. But we cannot divide 2 wholes into 3 equal groups without splitting them."
        },
        navigation: {
          tapNext: "Tap » next to continue.",
          chooseCorrectOption: "Choose the correct answer.",
          tapSummarise: "Tap Summarise.",
          slider: "Use slider to set the divisor and then tap Check.",
          tapNextQuestion: "Tap Next to try a new challenge."
        },
        sceneThree: {
          nowLetSplit: "Now, let’s split the two wholes into as many groups as the divisor.",
          divisor: "Divisor"
        },
        sceneThreeError: {
          success: "Good. You divided 2 wholes equally among 3 groups.",
          errorDecrease: " Oops! Decrease the slider to match the divisor in the problem.",
          errorIncrease: "Oops! Increase the slider to match the divisor in the problem."
        },
        sceneFourContent: {
          topHeading: "How much does each group get?"
        },
        sceneFour: {
          success: "Good! Each group gets 2",
          erorrOne: "You counted all the parts in a whole. Check the parts in each group.",
          erorrTwo: "Oops! You counted all the parts in both wholes. Check the parts in each group."
        },
        sceneFiveHeading: "Notice that dividing 2 by 3 is the same as multiplying 2 by one-third.",
        weCanWrite: "We can rewrite division as multiplication by the reciprocal.",
        result: "Result",
        activityCompleted: {
          activity: "Activity Completed!",
          description: "Division by a number is the same as multiplying with reciprocal of that number.",
          numberOne: "Number 1",
          numberTwo: "Number 2",
          reciprocalOf: " Reciprocal of ",
          startOver: "Tap “Start Over” to restart the activity."
        }
      }
    }
  }
});
export default i18n;