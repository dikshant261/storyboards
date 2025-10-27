import i18n, { t } from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en", // default language
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        buttons: {
          next: "NEXT",
          Next: "»",
          previous: "«",
          startOver:"Start\n Over"
        },
        count: "Count the fingers",
        shout: "Shout out loud!",
        letUse:'Let use another hand...',
        afterNine:"WHAT COMES AFTER 9?"
      },
    },
  },
});

export default i18n;
