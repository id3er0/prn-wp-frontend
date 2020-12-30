<template lang="pug">
  .b-sidebar__item
    .-h2 Most popular live cams
    .b-livecams(
      v-if="loaded"
    )
      .b-livecams__item(
        v-for="(item, index) in livecams"
        :key="index"
      )
        a.b-livecams__item-inner(
          :style="{'background-image': `url(${wp_theme_url}${item.image})`}"
          :href="item.link"
          target="_blank"
        )
    content-placeholders(
      v-else
      :rounded="true"
    )
      content-placeholders-img
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'SidebarLiveCams',
  computed: {
    ...mapFields('config', [
      'loaded',
      'data.wp_theme_url',
      'data.livecams',
    ]),
  },
};
</script>
