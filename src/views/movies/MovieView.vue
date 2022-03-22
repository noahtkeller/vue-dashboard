<template>
  <router-view/>
</template>

<script>

export default {
  name: 'MovieView',
  computed: {
    terms: {
      get() {
        return this.$route.params.terms;
      }
    }
  },
  methods: {
    async doSearch(searchTerms) {
      await this.$router.push(`/movies/search/${encodeURIComponent(searchTerms)}`);
    }
  }
}
</script>

<style lang="sass" scoped>
.search
  margin-bottom: 1rem
</style>
