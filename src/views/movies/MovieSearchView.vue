<template>
  <TorrentSearch v-model="terms" />
  <SearchResults
    @click:details="details"
    @click:watch="watch"
    v-model:terms="terms"
    v-model:page="page"
  />
</template>

<script>
import TorrentSearch from '@/components/movies/TorrentSearch.vue';
import SearchResults from '@/components/movies/SearchResults.vue';

export default {
  name: 'MovieSearchView',
  components: {
    SearchResults,
    TorrentSearch,
  },
  methods: {
    details(id) {
      this.$router.push(`/movies/view/${id}`);
    },
    watch(id) {
      this.$router.push(`/movies/watch/${id}`);
    },
  },
  computed: {
    terms: {
      get() {
        return this.$route.params.terms;
      },
      set(terms) {
        this.$router.push(`/movies/search/${terms}`);
      },
    },
    page: {
      get() {
        return parseInt(this.$route.params.page || 1);
      },
      set(idx) {
        this.$router.push(
          `/movies/search/${this.terms}${idx > 1 ? `/${idx}` : ''}`
        );
      },
    },
  },
};
</script>
