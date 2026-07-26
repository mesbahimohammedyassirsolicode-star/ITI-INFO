import i18n from '../i18n';

/**
 * Resolves a multilingual field (string or { fr: '...', en: '...' })
 * according to the current active language or provided language.
 */
export const getLocalized = (field, lang = i18n.language || 'fr') => {
  if (!field) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'object') {
    const currentLang = lang || 'fr';
    return field[currentLang] || field['fr'] || field['en'] || '';
  }
  return '';
};

/**
 * Resolves a multilingual array field (array of strings or { fr: [...], en: [...] })
 */
export const getLocalizedArray = (field, lang = i18n.language || 'fr') => {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  if (typeof field === 'object') {
    const currentLang = lang || 'fr';
    return field[currentLang] || field['fr'] || field['en'] || [];
  }
  return [];
};
