import i18next from 'i18next';
import { initReactI18next, Translation } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './locales/en.json';
import ar from './locales/ar.json';

i18next
  .use(initReactI18next)
  .init({
    lng: Localization.locale.split('-')[0], 
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      ar: { translation: ar }
    },
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18next;