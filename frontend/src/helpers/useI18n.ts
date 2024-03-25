import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../locales/en.json';
import frTranslation from '../locales/ru.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslation },
            ru: { translation: frTranslation }
        },
        lng: 'en', // Default language
        fallbackLng: 'en', // Fallback language if translation not found
        interpolation: {
            escapeValue: false // React already safely escapes interpolated values
        }
    });

export default i18n;