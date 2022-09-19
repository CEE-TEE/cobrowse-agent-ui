import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import moment from 'moment';
import 'moment/locale/es';
import localeEnUS from './locales/en-us/translation.json';
import localeEs from './locales/es/translation.json';

const englishUS = 'en-us';
const spanish = 'es';
const SUPPORTED_LOCALES = [englishUS, spanish];

const i18n = createInstance({
  fallbackLng: englishUS,
  debug: process.env.NODE_ENV === 'development',
  lowerCaseLng: true,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
    format: (value, format) => {
      if (format === 'dateRelative' && moment(value).isValid()) {
        return moment(value).fromNow();
      }
    },
  },

  resources: {
    'en-us': {
      translation: localeEnUS,
    },
    es: {
      translation: localeEs,
    },
  },
});

i18n
  .use(initReactI18next)
  .init()
  .then(async () => {
    const locale = i18n.language.toLowerCase();

    // Return early when the locale is not supported or when it's US English (it comes built in)
    if (SUPPORTED_LOCALES.indexOf(locale) === -1 || locale === englishUS) {
      return;
    }

    moment.locale(locale);
  });

export default i18n;
