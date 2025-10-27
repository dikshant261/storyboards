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
          next: "NEXT"
        },
        tapNumbers: "Tap the number that you hear",
        tapSpeaker: "Tap the \nSpeaker Icon",
        shoutLound: "Shout Out Loud",
        tapTheNumbers: "Tap the\n numbers that\n you hear"
      }
    }
  }
});
export default i18n;