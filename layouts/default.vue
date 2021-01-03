<template lang="pug">
  .b-layout
    Header(:class="{'-show-on-tablet-m': showSmallMenu}")
    HeaderSmall(v-if="showSmallMenu")
    .b-main
      .g-container
        .g-row
          .g-col._w-4-3
            nuxt
          .g-col._w-4-1.-show-on-tablet-m
            Sidebar
    Footer
</template>

<script>
import Header from '@/components/Header';
import HeaderSmall from '@/components/HeaderSmall';
import Sidebar from '@/components/sidebar/Sidebar';
import Footer from '@/components/Footer';
import fixVH from '@/utils/fixVH';
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
  components: {
    Header,
    HeaderSmall,
    Sidebar,
    Footer,
  },
  async fetch() {
    await this.fetchConfig();
  },
  mounted() {
    fixVH();
    this.localStorageLoadedDate = this.$localStorageLoaded && Date.now();
  },
  computed: {
    ...mapFields('localStorage', [
      'localStorageLoadedDate',
    ]),
    ...mapFields('smallMenu', [
      'showSmallMenu',
    ]),
  },
  methods: {
    ...mapActions('config', [
      'fetchConfig',
    ]),
  },
  watch: {
    $route() {
      this.showSmallMenu = false;
    },
  },
};
</script>

<style lang="scss">
.b-layout {
}
</style>

