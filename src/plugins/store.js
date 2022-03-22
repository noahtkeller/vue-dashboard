import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  strict: true,
  storage: window.localStorage,
});

export default createStore({
  plugins: [vuexLocal.plugin],
  state: {},
  getters: {
    isAuthenticated(state) {
      return Boolean(state.user);
    }
  },
  mutations: {
    oidc(state, { key, value }) {
      state[`oidc:${key}`] = value;
    },
    removeOidc(state, key) {
      delete state[`oidc:${key}`];
    },
    addUser(state, user) {
      state.user = user;
    },
    removeUser(state) {
      delete state.user;
    },
  },
  actions: {
  },
  modules: {
  }
})
