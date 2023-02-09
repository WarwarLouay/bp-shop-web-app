import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languagedetector from 'i18next-browser-languagedetector';
import en from './Languages/en.json';
import ar from './Languages/ar.json';

const language = localStorage.getItem('language');

i18n
  .use(initReactI18next)
  .use(languagedetector)
  .init({
    resources: {
      en: {
        translation: en
      },
      ar: {
        translation: ar
      }
    },
    lng: language,
    fallbackLng: language,

    interpolation: {
      escapeValue: false
    },
    react: {
        useSuspense: false
    }
  });

  export default i18n;