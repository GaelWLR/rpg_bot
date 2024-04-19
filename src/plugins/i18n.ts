import i18next from 'i18next';

import { en, fr } from '../locales/index.js';

i18next.init({
  lng: 'fr',
  fallbackLng: 'en',
  debug: true,
  resources: { en, fr },
});

export const i18n = i18next;
