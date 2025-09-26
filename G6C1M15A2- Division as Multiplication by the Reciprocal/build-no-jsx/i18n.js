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
          summarise: "Summarise",
          close: "Close"
        },
        title: "Division as multiplication by its reciprocal",
        activityComplete: "Activity Completed!",
        tapStartOver: "Tap “Start Over” to restart the activity.",
        startpage: {
          weHaveLearned: "We learned that division by a number is the same as multiplying\n with reciprocal of that number.",
          letPractice: "Let’s practice writing division problems as multiplication by their \nreciprocals.",
          tapStart: "Tap “Start” to start the activity."
        },
        mainHeading: "Write the given division problem as multiplication by its reciprocal.",
        navigation: {
          tapOption: "Tap the option that shows the correct answer.",
          tapNext: "Tap next » to try a new question."
        },
        reciprocal: "Reciprocal of {{count}}",
        error: {
          errorOne: "Careful! You need to change division problem to multiplication by its reciprocal.",
          errorTwo: "Oops! You took the reciprocal of the dividend instead of the divisor.",
          errorThree: "Careful! Write division as multiplication by reciprocal of the divisor.",
          success: "Well done! You wrote division problem as multiplication by its reciprocal."
        },
        hint: {
          hint: "Hint",
          description: "Division by a number is the same as multiplying with \n reciprocal of that number.",
          numberOne: "Number 1",
          numberTwo: "Number 2",
          reciprocal: "Reciprocal of"
        }
      }
    }
  }
});
export default i18n;