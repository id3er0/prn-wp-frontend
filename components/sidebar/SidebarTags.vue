<template lang="pug">
  .b-sidebar__item
    .b-sidebar__title(
      v-if="!showSearch"
    )
      span {{getTitle}}
      .-flex-divider
      button.b-button._plain._mt(
        type="button"
        @click="_setShowSearch"
      )
        .b-icon._search
    .b-input(
      v-else
    )
      input.-mr-3(
        ref="input"
        :value="search"
        @input="doSearch($event.target.value)"
        placeholder="Search by tag"
      )
      button.b-button._plain._mt(
        type="button"
        @click="_setShowSearch"
      )
        .b-icon._close
    template(
      v-if="loaded"
    )
      .-mb-3(
        v-if="Array.isArray(data)"
      )
        .b-tags._max-h
          nuxt-link.b-tag(
            v-for="item in data"
            :key="item.id"
            :to="{name: 'tag-slug-page', params: {slug: item.slug, page: 1}}"
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
import objectValue from '@/utils/objectValue';

export default {
  name: 'SidebarTags',
  async fetch() {
    await this.fetchTags();
  },
  computed: {
    ...mapFields('sidebar/tags', [
      'loaded',
      'showMoreLoaded',
      'data',
      'showSearch',
      'search',
    ]),
    ...mapFields('config', [
      'data.sidebar',
    ]),
    getTitle() {
      return objectValue(this.sidebar, 'tags.title', 'Tags');
    },
  },
  methods: {
    ...mapActions('sidebar/tags', [
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
