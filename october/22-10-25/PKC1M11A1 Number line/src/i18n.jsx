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
          startOver:'Start Over'
        },
        tapNumbers: "Place the numbers on the number line",
        tapSpeaker: "Tap the number that\n comes next on the\n number line",
        shoutLound: "Shout Out Loud",
        tapNum:"Tap the numbers to place them"
      },
    },
  },
});

export default i18n;
