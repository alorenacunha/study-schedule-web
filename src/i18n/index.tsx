import i18n, { use } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';

const resources = {
  en: {
    translation: en,
  },
};

use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

i18n.services.formatter?.add('lowercase', (value) => {
  return value.toLowerCase();
});
i18n.services.formatter?.add('underscore', (value) => {
  return value.replace(/\s+/g, '_');
});

export default i18n;
