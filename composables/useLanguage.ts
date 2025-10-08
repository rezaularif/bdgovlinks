import { computed, useState, watch } from '#imports';
import type { Language } from '~/utils/translations';
import { translations } from '~/utils/translations';

const BODY_LANG_CLASSES = ['lang-en', 'lang-bn'];

const resolveTranslation = (lang: Language, key: string, args: unknown[]): string => {
  const segments = key.split('.');
  let value: unknown = translations[lang];

  for (const segment of segments) {
    if (value && typeof value === 'object') {
      value = (value as Record<string, unknown>)[segment];
    } else {
      value = undefined;
      break;
    }
  }

  if (typeof value === 'function') {
    return (value as (...fnArgs: unknown[]) => string)(...args);
  }

  if (typeof value === 'string') {
    return value;
  }

  return key;
};

export const useLanguage = () => {
  const language = useState<Language>('language', () => 'en');

  const setLanguage = (lang: Language) => {
    language.value = lang;
  };

  watch(
    language,
    (lang) => {
      if (!process.client) return;
      const body = document.body;
      BODY_LANG_CLASSES.forEach((cls) => body.classList.remove(cls));
      body.classList.add(`lang-${lang}`);
    },
    { immediate: true },
  );

  const t = (key: string, ...args: unknown[]): string =>
    resolveTranslation(language.value, key, args);

  return {
    language: computed(() => language.value),
    setLanguage,
    t,
  };
};
