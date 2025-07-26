import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import * as Localization from "expo-localization";

import en from "./locales/en.json";
import pt from "./locales/pt.json";

const locale = Localization.getLocales()[0].languageCode;

i18n.use(initReactI18next).init({
  lng: locale && locale.startsWith("pt") ? "pt" : "en",
  fallbackLng: "en",
  resources: {
    en: {translation: en},
    pt: {translation: pt},
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
