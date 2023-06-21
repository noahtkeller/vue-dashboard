<template>
  <TorrentInfo :id="id" />
</template>

<script>
import TorrentInfo from '@/components/movies/TorrentInfo.vue';

export default {
  name: 'MovieDetailsView',
  components: { TorrentInfo },
  computed: {
    id: {
      get() {
        return this.$route.params.id;
      },
    },
  },
};
</script>
