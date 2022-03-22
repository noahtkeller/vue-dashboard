import { createApp } from 'vue';

import store from './plugins/store';
import router from './plugins/router';
import vuetify from './plugins/vuetify';
import oidc from './plugins/oidc';

import App from './App.vue';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(vuetify);
app.use(oidc);

export default (id) => {
  app.mount(id);
};
