import { createPlugin } from 'vue-oidc-plugin';
import { userManager } from '@/services/oidc';

import type { App } from 'vue';

export default function (app: App<Element>) {
  app.use(createPlugin(userManager));
}
