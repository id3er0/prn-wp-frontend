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
import Sidebar from '@/components/sidebar/Sidebar';
import Footer from '@/components/Footer';
import fixVH from '@/utils/fixVH';
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import HeaderSmall from '@/components/HeaderSmall';

export default {
  components: {
    HeaderSmall,
    Header,
    Sidebar,
    Footer,
  },
  async fetch() {
    await this.fetchConfig();
  },
  mounted() {
    fixVH();
  },
  computed: {
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

