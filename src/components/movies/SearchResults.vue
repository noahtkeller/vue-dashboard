<template>
  <h2 v-if="total !== null" class="result-text">
    <t-string :t="results" :count="total" :data="{ terms }" />
  </h2>
  <div v-if="movies !== null">
    <v-pagination
      v-if="pages !== null && pages > 1"
      @update:modelValue="setPage"
      :model-value="page"
      :length="pages"
      rounded="circle"
    ></v-pagination>
    <div class="search-results-container">
      <SearchResultItem
        @click:details="movieDetails"
        @click:watch="watchMovie"
        v-for="(movie, idx) of movies"
        v-bind:key="idx"
        :movie="movie"
      />
    </div>
    <v-pagination
      v-if="pages !== null && pages > 1"
      @update:modelValue="setPage"
      :model-value="page"
      :length="pages"
      rounded="circle"
    ></v-pagination>
  </div>
  <div v-if="movies === null" class="progress">
    <v-progress-circular
      :size="100"
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
</template>

<script>
import SearchResultItem from './SearchResultItem.vue';
import { results } from '@noahtkeller/common-strings/i18n/keys/yify';

export default {
  name: 'SearchResults',
  props: {
    terms: {
      type: String,
    },
    page: {
      type: Number,
      default: 1,
    },
  },
  emits: ['click:details', 'click:watch', 'update:page', 'update:terms'],
  components: {
    SearchResultItem,
  },
  methods: {
    setPage(idx) {
      this.$emit('update:page', idx);
    },
    setTerms(terms) {
      this.$emit('update:terms', terms);
    },
    async getResults() {
      const res = await fetch(
        `https://yts.mx/api/v2/list_movies.json?query_term=${this.terms}&page=${this.page}`
      );
      const { data: { movies = [], movie_count, limit } = {} } =
        (await res.json()) || {};
      this.total = movie_count;
      this.pages = Math.ceil(movie_count / limit);
      this.movies = movies;
    },
    movieDetails(id) {
      this.$emit('click:details', id);
    },
    watchMovie(id) {
      this.$emit('click:watch', id);
    },
  },
  watch: {
    async terms() {
      this.movies = null;
      this.total = null;
      await this.getResults();
    },
    async page() {
      this.movies = null;
      await this.getResults();
    },
  },
  data() {
    return { movies: null, pages: 1, total: null, results };
  },
  async mounted() {
    await this.getResults();
  },
};
</script>

<style lang="sass" scoped>
.search-results-container
  display: grid
  gap: 2rem
  grid-template-columns: 1fr 1fr 1fr 1fr
  padding-bottom: 1rem
  padding-top: 1rem

.progress
  margin-top: 12rem
</style>
