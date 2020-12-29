<template lang="pug">
  .b-sidebar__item
    .-h2.-flex
      span Friendly resources
      .-flex-divider
      button.b-button._icon(
        type="button"
        @click="setShowSearch"
      )
        .b-icon._search
    .b-input.-mb-2(
      v-if="showSearch"
    )
      input(
        :value="search"
        @input="doSearch($event.target.value)"
      )
    template(
      v-if="loaded"
    )
      template(v-if="Array.isArray(getData) && getData.length > 0")
        .b-links
          a.b-link(
            v-for="(item, index) in getData"
            :key="index"
            v-if="(!showMore && index < 3) || showMore"
            :href="item.link"
            target="_blank"
          )
            .b-link__number {{index + 1}}.
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

export default {
  name: 'SidebarResources',
  async fetch() {
    await this.fetchResources();
  },
  computed: {
    ...mapFields('resources', [
      'loaded',
      'data',
      'showMore',
      'showSearch',
      'search',
    ]),
    ...mapGetters('resources', [
      'getData',
    ]),
  },
  methods: {
    ...mapActions('resources', [
      'fetchResources',
      'setShowSearch',
      'doSearch',
    ]),
  },
};
</script>
