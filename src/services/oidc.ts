import { createManager } from 'vue-oidc-plugin';

export const userManager = createManager({
  authority: 'http://localhost:9000/application/o/dash/',
  client_id: '3ea483460913e80051e63c66c59b7f3b79fd63a0',
  response_type: 'code',
  scope: 'openid profile email api avatar',
  prompt: 'login',
  redirect_uri: 'http://localhost:1313/dash/auth/signinwin/main',
});
