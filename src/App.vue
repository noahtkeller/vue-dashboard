<template>
  <v-layout style="height: 100%" class="layout">
    <v-app style="display: block" class="app-container">
      <v-main>
        <main class="main-view">
          <router-view/>
        </main>
      </v-main>
      <v-navigation-drawer v-if="isAuthenticated" expand-on-hover :rail="true">
        <v-list>
          <v-list-item :prepend-avatar="avatar" :title="name" :subtitle="email"></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item link prepend-icon="mdi-home" title="Home" to="/"></v-list-item>
          <v-list-item v-if="showTorrent" link prepend-icon="mdi-movie-roll" title="Movies" to="/movies"></v-list-item>
          <v-list-item link prepend-icon="mdi-school" title="Quizzes" to="/quiz"></v-list-item>
          <v-list-item link prepend-icon="mdi-handcuffs" title="Mugshots" to="/mugshots"></v-list-item>
          <v-list-item @click.prevent="signOut()" link prepend-icon="mdi-logout-variant" title="Logout"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-app>
  </v-layout>
</template>

<script>
export default {
  name: 'App',
  methods: {
    signOut() {
      return this.$oidc.signoutRedirect();
    }
  },
  computed: {
    isAuthenticated: {
      get() {
        return this.$store.getters.isAuthenticated;
      },
    },
    email: {
      get() {
        return this.$store.state.user?.profile.email;
      },
    },
    name: {
      get() {
        return this.$store.state.user?.profile.name;
      },
    },
    showTorrent: {
      get() {
        return this.$store.state.user?.profile.groups.includes('Torrent Peer');
      }
    },
    avatar: {
      get() {
        return this.$store.state.user?.profile.avatar;
      }
    },
  },
}
</script>

<style scoped lang="sass">
.main-view
  padding: 2rem !important
  text-align: center
</style>

<style lang="sass">
.v-application__wrap
  height: 100%
</style>

