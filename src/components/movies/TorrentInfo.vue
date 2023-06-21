<template>
  <div v-if="!movie" class="progress">
    <v-progress-circular
      :size="100"
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
  <v-card v-if="movie" outlined>
    <v-card-title>{{ movie.title_long }}</v-card-title>
    <v-card-text class="details-inner">
      <div class="img-container">
        <v-img cover :src="movie.medium_cover_image" aspect-ratio=".66" />
      </div>
      <div class="details-content">
        <p v-if="movie.description_full">{{ movie.description_full }}</p>
        <div class="info-table">
          <div
            v-if="movie.imdb_code || movie.yt_trailer_code"
            class="info-title"
          >
            <t-string :t="links_title" />:
          </div>
          <div v-if="movie.imdb_code || movie.yt_trailer_code">
            <a
              target="_blank"
              :href="`https://www.imdb.com/title/${movie.imdb_code}/`"
              >iMDB</a
            >
            <a
              target="_blank"
              :href="`https://www.youtube.com/watch?v=${movie.yt_trailer_code}/`"
              >YouTube</a
            >
          </div>
          <div v-if="movie.runtime" class="info-title">
            <t-string :t="runtime_title" />:
          </div>
          <div v-if="movie.runtime">
            <t-string :t="runtime" :count="movie.runtime" />
          </div>
          <div v-if="movie.genres?.length" class="info-title">
            <t-string :t="genre_title" />:
          </div>
          <div v-if="movie.genres?.length">{{ movie.genres.join(', ') }}</div>
          <div v-if="movie.rating" class="info-title">
            <t-string :t="rating_title" />:
          </div>
          <div v-if="movie.rating">
            <t-string :t="rating" :count="movie.rating" />
          </div>
          <div v-if="movie.mpa_rating" class="info-title">
            <t-string :t="mpaa_title" />:
          </div>
          <div v-if="movie.mpa_rating">{{ movie.mpa_rating }}</div>
        </div>
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
              <td>{{ torrent.quality }}</td>
              <td>{{ torrent.type }}</td>
              <td>{{ torrent.size }}</td>
              <td>{{ torrent.seeds }}</td>
              <td>{{ torrent.peers }}</td>
              <td>
                <v-btn @click="watch(movie?.id, index)"
                  ><v-icon>mdi-play</v-icon> Watch</v-btn
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  links_title,
  runtime_title,
  genre_title,
  rating_title,
  mpaa_title,
  rating,
  runtime,
} from '@noahtkeller/common-strings/i18n/keys/yify';

export default {
  name: 'TorrentInfo',
  props: ['id'],
  methods: {
    watch(id, idx) {
      console.log('watch id', id, idx);
    },
  },
  data() {
    return {
      movie: null,
      links_title,
      runtime_title,
      genre_title,
      rating_title,
      mpaa_title,
      rating,
      runtime,
    };
  },
  async mounted() {
    const { data: { movie } = {} } = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${this.id}`
    ).then((r) => r.json());
    this.movie = movie;
  },
};
</script>

<style lang="sass" scoped>
.details-inner
  display: grid
  grid-template-columns: 1fr 2fr

.details-content
  padding: 0 0 0 1rem
  text-align: left
  p:not(:first-child)
    margin-top: 0.5rem
  .info-table
    display: grid
    padding: 1rem 0
    grid-template-columns: 1fr 8fr
    a:not(:first-child)
      margin-left: 1rem
    .info-title
      text-align: right
      padding-right: 0.5rem
</style>
