<template>
  <v-progress-circular
    v-show="!fileName"
    :size="100"
    indeterminate
    color="primary"
  ></v-progress-circular>
  <MovieClient v-model="fileName" class="movie-client" :infoHash="infoHash" />
</template>

<script>
import MovieClient from '@/components/movies/MovieClient.vue';

export default {
  name: 'MovieWatchView',
  components: {
    MovieClient,
  },
  data() {
    return { fileName: '' };
  },
  computed: {
    movie: {
      get() {
        return this.$store.state._movies[this.$route.params.id];
      },
    },
    torrent: {
      get() {
        if (this.$route.query.t) {
          return Number(this.$route.query.t);
        }
        return this.$store.state._movies[
          this.$route.params.id
        ]?.torrents.findIndex(({ quality }) => quality === '720p');
      },
    },
    infoHash: {
      get() {
        return this.movie?.torrents[this.torrent]?.hash;
      },
    },
  },
  mounted() {
    if (!this.movie) {
      this.$store.dispatch('getMovie', this.$route.params.id);
    }
  },
};
</script>

<style lang="sass" scoped>
.movie-client
  margin-bottom: 2rem
</style>
