<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <v-layout style="height: 100%" class="layout">
    <v-app style="display: block" class="app-container">
      <v-main>
        <main class="main-view">
          <router-view />
        </main>
      </v-main>
      <v-navigation-drawer expand-on-hover :rail="true">
        <v-list>
          <v-list-item
            :prepend-avatar="'avatar'"
            :title="'name'"
            :subtitle="'email'"
          ></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item
            link
            prepend-icon="mdi-home"
            title="Home"
            to="/"
          ></v-list-item>
          <v-list-item
            link
            prepend-icon="mdi-movie-roll"
            title="Movies"
            to="/movies"
          ></v-list-item>
          <v-list-item
            link
            prepend-icon="mdi-school"
            title="Quizzes"
            to="/quiz"
          ></v-list-item>
          <v-list-item
            link
            prepend-icon="mdi-handcuffs"
            title="Mugshots"
            to="/mugshots"
          ></v-list-item>
          <v-list-item
            link
            prepend-icon="mdi-logout-variant"
            title="Logout"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-app>
  </v-layout>
</template>

<style scoped lang="sass">
.main-view
  padding: 2rem !important
  text-align: center
</style>

<style lang="sass">
.v-application__wrap
  height: 100%
</style>
