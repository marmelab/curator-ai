import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';  // English translations
import fr from './locales/fr.json';  // French translations


i18n
    .use(initReactI18next) // Integrate with React
    .init({
        resources: {
            en: { translation: en },
            fr: { translation: fr },
        },
        lng: 'en',  // Default language
        fallbackLng: 'en',  // Language fallback
        interpolation: {
            escapeValue: false,  // React already does escaping
        },
    });

export default i18n;
