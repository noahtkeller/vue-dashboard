import { createPlugin } from 'vue-oidc-plugin';
import router from './router';
import { userManager } from '@/services/oidc';

const oidc = createPlugin('main', router, userManager);

export default oidc;
