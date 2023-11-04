// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json';
import translationES from './locales/es.json';
import translationZH from './locales/zh.json';

const resources = {
  en: { translation: translationEN },
  es: { translation: translationES },
  zh: { translation: translationZH },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
