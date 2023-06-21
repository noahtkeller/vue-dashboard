<template>
  <v-card elevation="2" class="home">
    <div class="logo-container">
      <v-img :src="yifyLogo"></v-img>
    </div>
    <div class="warn text-warning"><t-string :t="warning" /></div>
    <div class="form-container">
      <TorrentSearch @update:modelValue="search" />
      <div class="text-primary"><t-string :t="new_releases" /></div>
    </div>
    <div class="content text-info">
      <p>
        <t-string :t="powered_by" />
        <a href="https://yts.mx/" target="_blank">https://yts.mx/</a>
      </p>
      <p><t-string :t="connections" /></p>
      <ul class="tracker-list">
        <li v-for="(tracker, index) of trackers" v-bind:key="index">
          {{ tracker }}
        </li>
      </ul>
    </div>
  </v-card>
</template>

<script>
import { trackers } from '@/assets/constants';
import yifyLogo from '@/assets/img/logo-YTS.svg';
import TorrentSearch from '@/components/movies/TorrentSearch.vue';
import {
  warning,
  powered_by,
  connections,
  new_releases,
} from '@noahtkeller/common-strings/i18n/keys/yify';

export default {
  name: 'MovieHomeView',
  data() {
    return { trackers, warning, powered_by, connections, new_releases };
  },
  methods: {
    async search(terms) {
      await this.$router.push(`/movies/search/${terms}`);
    },
  },
  setup() {
    return { yifyLogo };
  },
  components: { TorrentSearch },
};
</script>

<style lang="sass" scoped>
.logo-container
  margin: 1rem 25% 2rem 25%

.home
  text-align: left

.warn
  text-align: center

.form-container
  padding: 2rem 15% 0 15%

.content
  margin: 1rem

.tracker-list
  margin: .5rem 0 0 2rem
</style>
