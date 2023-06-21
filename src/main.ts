import { createApp } from 'vue';

import App from './app.vue';

import vuetify from './plugins/vuetify';
import i18n from './plugins/i18n';
import router from './plugins/router';
import pinia from './plugins/pinia';
import oidc from './plugins/oidc';

const app = createApp(App);

export default async (id: string) => {
  await i18n(app);
  pinia(app);
  vuetify(app);
  router(app);
  oidc(app);

  app.mount(id);
};
