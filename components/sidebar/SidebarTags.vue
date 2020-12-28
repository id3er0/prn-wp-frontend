<template lang="pug">
  .b-sidebar__item(
    v-if="Array.isArray(tags)"
  )
    .-h2 Most popular tags
    .-mb-2
      .b-tags
        nuxt-link.b-tag(
          v-for="item in tags"
          :key="item.id"
          :to="{name: 'tag-tag', params: {tag: item.id}}"
        ) {{item.name}}
    a.b-button._w-full(href="#") Show more
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'SidebarTags',
  computed: {
    ...mapFields('data', [
      'tags',
    ]),
  },
};
</script>
