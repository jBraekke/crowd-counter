import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import en from "./translations/en.json";
import nb from "./translations/nb.json"

const resources = {
  en,
  nb,
}

export const availableLanguages = Object.keys(resources)

i18n.use(initReactI18next)
  .init({
    resources,
    defaultNS: "common",
    fallbackLng: "en",
  });