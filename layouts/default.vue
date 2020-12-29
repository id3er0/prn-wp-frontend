<template lang="pug">
  .b-layout
    Header
    .b-main
      .g-container
        .g-row
          .g-col._w-4-3
            nuxt
          .g-col._w-4-1
            Sidebar
    Footer
</template>

<script>
import Header from '~/components/Header';
import Sidebar from '@/components/sidebar/Sidebar';
import Footer from '~/components/Footer';
import fixVH from '~/utils/fixVH';

export default {
  components: {
    Header,
    Sidebar,
    Footer,
  },
  mounted() {
    fixVH();
  },
};
</script>

<style lang="scss">
.b-layout {
  min-width: rem(320);
  max-width: rem(1650);
  margin: 0 auto;
}
</style>

