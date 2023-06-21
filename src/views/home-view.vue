<template>
  <div class="home">
    <p>Dashboard Home</p>
    <v-btn
      @click.prevent="signIn()"
      class="mdc-theme--primary"
      v-if="!isAuthenticated"
      >login</v-btn
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { inject } from 'vue';
import type { UserManager } from 'vue-oidc-plugin';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const oidc = inject('oidc') as UserManager;
    return {
      signIn() {
        oidc.signinRedirect();
      },
      isAuthenticated: false,
    };
  },
});
</script>

<style lang="sass" scoped>
@use "@noahtkeller/md-theme"

.home
  color: md-theme.$primary
</style>
