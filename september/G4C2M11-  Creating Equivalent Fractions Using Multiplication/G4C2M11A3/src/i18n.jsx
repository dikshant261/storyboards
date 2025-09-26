import i18n, { t } from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en", // default language
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        Equivalent_Fractions: "Equivalent Fractions",
        we_multiply:
          "When we multiply both the numerator and \ndenominator of a fraction by the same number,\n the value of the fraction stays the same — this\n creates an equivalent fraction.",
        let_find:
          "Let’s find the number we need to multiply them by to get the new fraction.",
        start: "START",
        here_are:
          "Here are two equivalent fractions. Let’s find the number to multiply the numerator and denominator of ",
        to_get: "to get\n",
        tapNext: "Tap next to continue.",
        what_number_should:
          "By what number should the numerator and denominator of the fraction",
        multiplied_to_get: "multiplied to get the equivalent fraction",
        tap_number: "Tap the correct number.",
        nextContinue: "Click next to continue.",
        greatWork: "Great work! Multiplying the numerator and denominator of",
        gives_it: "by {{count}} gives its equivalent fraction",
        error_message:
          "Not quite! {{num}} × {{result}} = {{multiply}}, not {{num_result}}, and {{deno}} × {{result}} = {{multiplyTwo}}, not {{deno_result}}. Multiply the numerator and denominator by the number that gives the new fraction",
        now_it_time:
          "Now, it's time to divide the numerator and denominator of the fraction by the same number to get new fractions that represent the same value.",
        next: "NEXT",
        check: "CHECK",
        let_find_divide:
          "Here are two equivalent fractions. Let’s find the number to divide the numerator and denominator of",
        divide_error:
          "Not quite! Dividing both {{num}} and {{deno}} by {{result}} doesn’t give us ",
        divide_error_two: "Try finding a number that divides both evenly.",
        great_work_divide:
          "Great work! Dividing the numerator and denominator of ",
        great_work_divide_two: "by {{count}} gives its equivalent fraction",
        great_you_have_learned:"Great job! You’ve learned that multiplying or dividing the numerator and denominator of the fraction by the same number creates an equivalent fraction.",
        start_over:"Start Over",
        divide_equation:"be divided  to get the equivalent fraction"
      },
    },
  },
});

export default i18n;
