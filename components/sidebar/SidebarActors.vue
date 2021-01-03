<template lang="pug">
  .b-sidebar__item
    .b-sidebar__title(
      v-if="!showSearch"
    )
      h2.-h2.-mb-0 {{getTitle}}
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
        placeholder="Search by name"
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
          nuxt-link.b-link(
            v-for="(item, index) in data"
            :key="item.id"
            :to="{name: 'name-slug-page', params: {slug: item.slug, page: 1}}"
          )
            | <span class="b-link__name -mr-1">{{item.name}}</span>
            template(
              v-if="index + 1 < data.length"
            )
              | <span class="b-link__number">({{item.count}})</span>,
            template(
              v-else
            )
              | <span class="b-link__number">({{item.count}})</span>
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
  name: 'SidebarActors',
  async fetch() {
    await this.fetchActors();
  },
  computed: {
    ...mapFields('config', [
      'data.sidebar',
    ]),
    getTitle() {
      return objectValue(this.sidebar, 'actors.title', 'Actors');
    },
    ...mapFields('sidebar/actors', [
      'loaded',
      'showMoreLoaded',
      'data',
      'showSearch',
      'search',
    ]),
  },
  methods: {
    ...mapActions('sidebar/actors', [
      'fetchActors',
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
