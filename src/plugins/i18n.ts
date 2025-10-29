import i18next from 'i18next';

import { cs, de, en, es, fr, it, nl, pl, pt, sv } from '../locales/index.js';

i18next.init({
  lng: 'fr',
  fallbackLng: 'en',
  debug: false,
  resources: { cs, de, en, es, fr, it, nl, pl, pt, sv },
});

export const i18n = i18next;
