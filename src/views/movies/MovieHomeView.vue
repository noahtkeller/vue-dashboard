<template>
  <v-card elevation="2" class="home">
    <v-img :src="yifyLogo"></v-img>
    <p color="red">Warning: This page is powered by torrents, and my access internet resources that are not allowed by your organization.</p>
    <p>This search is powered by YIFY API at <a href="https://yts.mx/" target="_blank">https://yts.mx/</a></p>
    <p>It will also attempt to make connections to the following trackers:</p>
    <ul class="tracker-list">
      <li v-for="(tracker, index) of trackers" v-bind:key="index">
        {{ tracker }}
      </li>
    </ul>
  </v-card>
</template>

<script>
import { trackers } from '@/plugins/webtorrent';
import { yifyLogo } from '@noahtkeller/vue-yify-client';

export default {
  name: 'MovieWatchView',
  setup() {
    return { yifyLogo };
  },
  data() {
    return { trackers };
  }
}
</script>

<style lang="sass" scoped>
.home
  text-align: left

.warn
  margin-bottom: 1rem

.v-card-title
  h3
    padding-left: 1rem

.tracker-list
  margin: .5rem 0 0 2rem
</style>
