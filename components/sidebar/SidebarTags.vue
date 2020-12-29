<template lang="pug">
  .b-sidebar__item
    .-h2.-flex
      span Most popular tags
      .-flex-divider
      button.b-button._icon(
        type="button"
        @click="_setShowSearch"
      )
        .b-icon._search
    .b-input.-mb-2(
      v-if="showSearch"
    )
      input(
        ref="input"
        :value="search"
        @input="doSearch($event.target.value)"
      )
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
      'showSearch',
      'search',
    ]),
  },
  methods: {
    ...mapActions('tags', [
      'fetchTags',
      'showMore',
      'setShowSearch',
      'doSearch',
    ]),
    _setShowSearch() {
      this.setShowSearch();
      this.$nextTick(() => {
        if (this.showSearch && this.$refs.input) {
          this.$refs.input.focus();
        }
      });
    },
  },
};
</script>
