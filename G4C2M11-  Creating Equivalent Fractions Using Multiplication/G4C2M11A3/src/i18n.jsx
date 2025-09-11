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
        start:"START"  
      },
    },
  },
});

export default i18n;
