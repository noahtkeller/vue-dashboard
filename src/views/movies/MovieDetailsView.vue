<template>
  <v-card v-if="!movie">
    <v-card-text>
      Loading...
    </v-card-text>
  </v-card>
  <v-card v-if="movie" outlined>
    <v-card-title>{{ movie?.title_long }}</v-card-title>
    <v-card-text class="details-inner">
      <p class="details-wrapper">
        <img :src="movie?.large_cover_image"/>
        <span>{{ movie?.description_full }}</span>
      </p>
      <div>
        <div class="links">
          <span>Links: </span>
          <a target="_blank" :href="`https://www.imdb.com/title/${movie?.imdb_code}/`">iMDB</a>
          <a target="_blank" :href="`https://www.youtube.com/watch?v=${movie?.yt_trailer_code}/`">YouTube</a>
        </div>
        <div>Runtime: {{ movie?.runtime }}m</div>
        <div>Genre: {{ movie?.genres.join(', ') }}</div>
        <div>Rating: {{ movie?.rating }} / 10</div>
        <div>{{ movie?.mpa_rating }}</div>
      </div>
      <div class="clear"></div>
      <table>
        <thead>
        <tr>
          <td>Quality</td>
          <td>Type</td>
          <td>Size</td>
          <td>Seeds</td>
          <td>Peers</td>
          <td>Play</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(torrent, index) of movie?.torrents" :key="index">
          <td>{{torrent.quality}}</td>
          <td>{{torrent.type}}</td>
          <td>{{torrent.size}}</td>
          <td>{{torrent.seeds}}</td>
          <td>{{torrent.peers}}</td>
          <td><v-btn @click="watch(movie?.id, index)"><v-icon>mdi-play</v-icon> Watch</v-btn></td>
        </tr>
        </tbody>
      </table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'MovieDetailsView',
  methods: {
    async watch(id, torrent) {
      await this.$router.push(`/movies/watch/${id}?t=${torrent}`);
    }
  },
  computed: {
    movie: {
      get() {
        return this.$store.state._movies[this.$route.params.id];
      }
    }
  },
  mounted() {
    if (!this.movie) {
      this.$store.dispatch('getMovie', this.$route.params.id)
    }
  }
}
</script>

<style lang="less" scoped>
.links a {
  margin-right: 1em;
}
.clear {
  clear: both;
}
.v-card {
  margin: 1em 0;
  .details-inner {
    table {
      thead {
        td {
          text-align: center;
        }
      }
      margin-top: 1em;
      width: 100%;
      td {
        padding: 0.35em;
        &:last-child {
          text-align: center;
        }
      }
    }
    .details-wrapper {
      margin-top: 0;
      img {
        & + span {
          clear: both;
        }
        float: left;
        margin-right: 1em;
        min-width: 230px;
        min-height: 345px;
      }
    }
  }
}
</style>
