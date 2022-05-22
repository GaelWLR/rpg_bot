import * as i18next from 'i18next';

import { en, fr } from '../../locales';

i18next.init({
  lng: 'fr',
  fallbackLng: 'en',
  debug: true,
  resources: { en, fr },
});

export default i18next;
