<template>
  <TorrentSearch class="search" @search="doSearch" :terms="terms" />
  <SearchResults @movieDetails="movieDetails" @watchMovie="watchMovie" :terms="terms" />
</template>

<script>
import { SearchResults, TorrentSearch } from '@noahtkeller/vue-yify-client'

export default {
  name: 'MovieSearchView',
  components: {
    SearchResults,
    TorrentSearch,
  },
  methods: {
    movieDetails(id) {
      this.$router.push(`/movies/view/${id}`)
    },
    watchMovie(id) {
      this.$router.push(`/movies/watch/${id}`)
    },
  },
  computed: {
    terms: {
      get() {
        return this.$route.params.terms;
      }
    }
  },
}
</script>
