import { createPlugin } from 'vue-i18n-plugin';
// @ts-ignore
import i18next from '@noahtkeller/common-backend/utils/i18next';
// @ts-ignore
import yify from '@noahtkeller/common-strings/i18n/bundles/yify';

import type { App } from 'vue';

export default async function (app: App<Element>) {
  const i18n = await i18next({}, { yify });
  app.use(createPlugin(i18n));
}
