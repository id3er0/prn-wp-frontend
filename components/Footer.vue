<template lang="pug">
  .b-footer
    .g-container
      template(
        v-if="loaded"
      )
        template(
          v-if="footer"
        ) {{footer.text}}
      content-placeholders(
        v-else
        :rounded="true"
      )
        content-placeholders-text
</template>

<script>
  import { mapFields } from 'vuex-map-fields';

  export default {
    name: 'Footer',
    computed: {
      ...mapFields('config', [
        'loaded',
        'data.footer',
      ]),
    },
  };
</script>
