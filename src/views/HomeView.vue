<template>
  <div class="home">
    <p>Dashboard Home</p>
    <v-btn @click.prevent="signIn()" class="mdc-theme--primary" v-if="!isAuthenticated">login</v-btn>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    signIn() {
      this.$oidc.signinRedirect();
    }
  },
  computed: {
    isAuthenticated: {
      get() {
        return this.$store.getters.isAuthenticated;
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@use "@noahtkeller/md-theme"

.home
  color: md-theme.$primary
</style>
