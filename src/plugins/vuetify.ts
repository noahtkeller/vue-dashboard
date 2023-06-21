import '@mdi/font/css/materialdesignicons.css';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import type { App } from 'vue';

export default function (app: App<Element>) {
  const vuetify = createVuetify();
  app.use(vuetify);
}
