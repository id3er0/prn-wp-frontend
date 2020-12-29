<template lang="pug">
  .b-sidebar__item
    .-h2 Friendly resources
    template(
      v-if="loaded"
    )
      .b-links(v-if="Array.isArray(data)")
        a.b-link(
          v-for="(item, index) in data"
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
  name: 'SidebarResources',
  async fetch() {
    await this.fetchResources();
  },
  methods: {
    ...mapActions('resources', [
      'fetchResources',
    ]),
  },
  computed: {
    ...mapFields('resources', [
      'loaded',
      'data',
      'showMore',
    ]),
  },
};
</script>
