<template lang="pug">
  .b-sidebar__item
    .-h2 Most popular tags
    template(
      v-if="loaded"
    )
      .-mb-2(
        v-if="Array.isArray(data)"
      )
        .b-tags._max-h
          nuxt-link.b-tag(
            v-for="item in data"
            :key="item.id"
            :to="{name: 'tag-tag', params: {tag: item.id}}"
          ) {{item.name}}
      button.b-button._w-full(
        @click="showMore"
        :disabled="!showMoreLoaded"
      )
        template(v-if="showMoreLoaded") Show more
        template(v-else) Loading...
    content-placeholders(
      v-else
      :rounded="true"
    )
      content-placeholders-text
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';

export default {
  name: 'SidebarTags',
  async fetch() {
    await this.fetchTags();
  },
  computed: {
    ...mapFields('tags', [
      'loaded',
      'showMoreLoaded',
      'data',
      'totalPages',
    ]),
  },
  methods: {
    ...mapActions('tags', [
      'fetchTags',
      'showMore',
    ]),
  },
};
</script>
