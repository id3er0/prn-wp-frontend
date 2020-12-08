<template lang="pug">
  .b-layout
    Header
    nuxt
    Footer
</template>

<script>
  import fixVH from '~/utils/fixVH';
  import Header from '~/components/Header';
  import Footer from '~/components/Footer';

  export default {
    components: {
      Header,
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

