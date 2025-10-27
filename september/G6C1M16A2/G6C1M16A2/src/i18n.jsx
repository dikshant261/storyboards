import i18n, { t } from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en", // default language
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
          close: "Close",
        },

        title: "Division of Fraction by a Whole number",
        activityComplete: "Activity Completed!",
        wePractice:"We practiced dividing a fraction by a whole number by rewriting\n the division as multiplication with the reciprocal of the whole number",
        tapStartOver: "Tap “Start Over” to restart the activity.",
        startpage: {
          weHaveLearned:
            "We learned how to divide a fraction by a whole number \nusing the reciprocal.",
          letPractice: "Now, it’s your turn to try own your own.",
          tapStart: "Tap “Start” to start the activity.",
        },
        mainHeading: "Find the value of the given division.",
        navigation: {
          tapOption: "Tap the option that shows the correct answer.",
          tapNext: "Tap next » to try a new question.",
          tapContinue: "Tap next » to continue",
        },
        reciprocal: "Reciprocal of {{count}}",
        error: {
          errorOne:
            "Oops! You multiplied the numerator by the divisor instead of dividing the fraction.",
          errorTwo:
            "Careful! You divided the denominator instead of dividing the fraction.",
          errorThree:
            "Oops! You flipped the fraction instead of flipping the whole. Try again!",
          success:
            "Well done! That’s exactly how to divide a fraction by a whole number.",
          feedback:"Feedback"  
        },
        hint: {
          hint: "Hint",
          heading:"To divide a Fraction by a Whole Number",
          listOne:"Change division(÷) to multiplication(×).",
          listTwo:"Take the reciprocal of the whole number.",
          listThree:"Multiply the fractions.",
          reciprocal:"Reciprocal"
        },

      },
    },
  },
});

export default i18n;
