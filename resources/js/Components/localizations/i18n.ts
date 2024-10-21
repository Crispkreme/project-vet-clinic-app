import i18n from 'i18next';
import { initReactI18next, Translation } from 'react-i18next';
import en from '@/Components/localizations/en.json'
import ja from '@/Components/localizations/ja.json'



void i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: { ...en,}
            },
            ja: {
                translation: { ...ja,}
            }
        },
        lng: 'en', //Default = English
        fallbackLng: 'en', //Is translation is missing = English
        interpolation: {
            escapeValue: false,
        },
    });

    export default i18n;