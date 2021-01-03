<template lang="pug">
  .b-sidebar__item
    h2.-h2 {{getTitle}}
    .b-livecams(
      v-if="loaded"
    )
      .b-livecams__item(
        v-for="(item, index) in getLivecams"
        :key="index"
      )
        a.b-livecams__item-inner(
          :lazy-background="`${wp_theme_url}${item.image}`"
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
import objectValue from '@/utils/objectValue';

export default {
  name: 'SidebarLiveCams',
  computed: {
    ...mapFields('config', [
      'loaded',
      'data.wp_theme_url',
      'data.sidebar',
    ]),
    getTitle() {
      return objectValue(this.sidebar, 'livecams.title', 'Livecams');
    },
    getLivecams() {
      return objectValue(this.sidebar, 'livecams.items');
    },
  },
};
</script>
