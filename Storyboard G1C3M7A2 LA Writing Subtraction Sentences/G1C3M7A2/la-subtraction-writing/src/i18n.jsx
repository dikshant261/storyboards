import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en", // default language
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        hey: "Hey! Look at the picture.",
        startHeading:
          "Let’s write the subtraction sentence that represents this picture.",
        begin: "Tap start to begin...",
        writing: "Writing subtraction sentences for pictures.",
        givenPicture:
          "For the given picture, fill the subtraction sentence using numpad and check.",
        tapNumber: "Tap the number and then tap check.",
        hintMessage:
          "Subtraction sentences are written as:\nthe whole – part taken away = part that is left”",
        totalCars: "Total Cars",
        crossCars: "Cross Cars",
        remainingCars: "Remaining Cars",
        start: "Start",
        check: "Check",
        show: "Show",
        errorMessage:
          "Oops! Count the\n total cars and\n cars that are\n crossed and cars\n left to write the\n subtraction\n sentence.",
        successMessage:
          "Well Done! \nYou have \ncorrectly written\n subtraction\n sentence for this\n picture…",
        subtractionSentance: "Writing subtraction sentences for\n pictures",
        stepOne: "There are {{count}} cars in total.",
        stepTwo: "{{count}} car is removed/crossed.",
        stepThree: "Then, {{count}} cars remain.",
        weWrite: "We write this as,",
        nextQuestion:"Tap ▶ to move to next question."
      },
    },
  },
});

export default i18n;
