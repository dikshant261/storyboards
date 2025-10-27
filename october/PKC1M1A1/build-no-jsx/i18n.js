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
        tapNumbers: "Tap the numbers",
        shoutLound: "Shout Out Loud",
        tapTheNumbers: "Tap the numbers.\n Shout out loud what you\n hear."
      }
    }
  }
});
export default i18n;