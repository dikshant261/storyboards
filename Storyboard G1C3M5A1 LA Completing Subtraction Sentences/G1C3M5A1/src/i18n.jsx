import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en", // default language
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        Complete_the_subtraction_sentence:
          "Complete the\n subtraction sentence\n using the information in\n the picture",
        tapBegin: "Tap Start to begin…",
        start: "START",
        There_are_total_cars_in_picture:
          "There are total {{total}} cars in picture. {{cross}} cars are crossed showing subtraction.",
        Count_and_complete_the:
          "Count and complete the subtraction sentence given along with the picture",
        hintMessage:
          "To subtract the numbers, count the number of objects not\n crossed….",
        hide: "HIDE",
        show: "SHOW",
        check: "CHECK",
        tap_and_check: "Tap the correct number and then tap check.",
        greaterErrorMessage:
          "Oops! Think smaller… There were {{total}} cars! How many cars are left after crossing out {{cross}}?",
        biggerErrorMessage:
          "Oops! Think bigger… Is there only {{left}} car left uncrossed?",
        successMessage:
          "Well Done!Subtracting {{total}} from {{cross}} gives {{left}}.",
        nullError:
          "Oops! {{cross}} Cars are crossed out! How many are left uncrossed?",
        sentanceOne:
          "If {{cross}} objects are crossed\n out of {{total}}, we say that",
        sentanceTwo: "{{cross}} is subtracted\n from {{total}}.",
        sentanceThree:
          "Subtraction Expression\n for this will\n be: {{total}} - {{cross}}.",
        nextQuestion: "Tap  ▶  for the next challenge…",
      },
    },
  },
});

export default i18n;
