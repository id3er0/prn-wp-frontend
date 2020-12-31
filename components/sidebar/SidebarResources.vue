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
      template(v-if="Array.isArray(getResources) && getResources.length > 0")
        .b-links._max-h
          a.b-link(
            v-for="(item, index) in getResources"
            :key="index"
            v-if="(!showMore && index < 3) || showMore"
            :href="item.link"
            target="_blank"
          )
            .b-link__number.-mr-1 {{index + 1}}.
            .b-link__name {{item.name}}
            .-flex-divider
            .b-icon._link
        button.b-button._w-full(
          v-if="!showMore"
          @click="showMore = !showMore"
        ) Show more
      div(v-else) No resources found
    content-placeholders(
      v-else
      :rounded="true"
    )
      content-placeholders-text
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapActions, mapGetters } from 'vuex';
import objectValue from '@/utils/objectValue';

export default {
  name: 'SidebarResources',
  computed: {
    ...mapFields('config', [
      'loaded',
      'data.sidebar',
    ]),
    getTitle() {
      return objectValue(this.sidebar, 'resources.title', 'Resources');
    },
    ...mapFields('resources', [
      'showMore',
      'showSearch',
      'search',
    ]),
    ...mapGetters('resources', [
      'getResources',
    ]),
  },
  methods: {
    ...mapActions('resources', [
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
