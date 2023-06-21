<template>
  <v-form ref="form" @submit.prevent="search()">
    <v-text-field
      color="primary"
      :rules="rules"
      @click:append-inner="search()"
      append-inner-icon="mdi-magnify"
      :label="label"
      v-model="local"
      :placeholder="placeholder"
      variant="outlined"
    ></v-text-field>
  </v-form>
</template>

<script>
import yifyLogo from '@/assets/img/logo-YTS.svg';
import {
  search_placeholder,
  search_label,
} from '@noahtkeller/common-strings/i18n/keys/yify';

export default {
  name: 'TorrentSearch',
  setup() {
    return { yifyLogo };
  },
  data() {
    const rules = [(v) => !!v];
    return { local: this.modelValue, rules };
  },
  methods: {
    search() {
      this.$emit('update:modelValue', this.local);
    },
  },
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  watch: {
    modelValue() {
      this.local = this.modelValue;
    },
  },
  computed: {
    placeholder: {
      get() {
        return this.$i18n.t(search_placeholder);
      },
    },
    label: {
      get() {
        return this.$i18n.t(search_label);
      },
    },
  },
};
</script>

<style lang="sass" scoped>
.recent-btn
  margin-right: 0.5rem
</style>
