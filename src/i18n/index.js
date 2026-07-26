import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './locales/fr.json';
import en from './locales/en.json';

const STORAGE_KEY = 'iti_language';

// Ensure initial language is strictly 'fr' unless user explicitly saved 'en'
const savedLanguage = localStorage.getItem(STORAGE_KEY);
const initialLng = savedLanguage === 'en' ? 'en' : 'fr';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en }
    },
    lng: initialLng,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false // React handles XSS
    }
  });

// Synchronize document.documentElement.lang and localStorage on language changes
const updateDocumentLang = (lng) => {
  const currentLang = lng || i18n.language || 'fr';
  document.documentElement.lang = currentLang;
  localStorage.setItem(STORAGE_KEY, currentLang);
};

// Initial sync
updateDocumentLang(initialLng);

// Listen to language changes
i18n.on('languageChanged', (lng) => {
  updateDocumentLang(lng);
});

export default i18n;
