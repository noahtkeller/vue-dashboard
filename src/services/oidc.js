import { createManager } from 'vue-oidc-plugin';
import store from '../plugins/store';

export class VuexStore {
  constructor(store) {
    this.store = store;
  }
  async set(key, value) {
    const [vueKey] = key.split(':');
    const proms = [this.store.commit('oidc', { key: vueKey, value })];
    if (vueKey === 'user') {
      proms.push(this.store.commit('addUser', JSON.parse(value)));
    }
    await Promise.all(proms);
  }
  get(key) {
    const [vueKey] = key.split(':');
    const val = this.store.state[`oidc:${vueKey}`];
    if (val) {
      return val;
    }
  }
  async remove(key) {
    const [vueKey] = key.split(':');
    const proms = [this.store.commit('removeOidc', vueKey)];
    if (vueKey === 'user') {
      proms.push(this.store.commit('removeUser'));
    }
    await Promise.all(proms);
  }
  getAllKeys() {
    return ['user'];
  }
}

export const userManager = createManager({
  authority: 'http://localhost:9000/application/o/dash/',
  client_id: '3ea483460913e80051e63c66c59b7f3b79fd63a0',
  response_type: 'code',
  scope: 'openid profile email api avatar',
  prompt: 'login',
  redirect_uri: 'http://localhost:1313/dash/auth/signinwin/main',
  userStore: new VuexStore(store),
});
