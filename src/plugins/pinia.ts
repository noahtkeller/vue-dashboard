import type { App } from 'vue';
import { createPinia } from 'pinia';

export default function (app: App<Element>) {
  app.use(createPinia());
}
