<template lang="pug">
  .b-sidebar__item
    .-h2 Most popular live cams
    .b-livecams(
      v-if="loaded"
    )
      .b-livecams__item(
        v-for="(item, index) in data"
        :key="index"
      )
        a.b-livecams__item-inner(
          :style="{'background-image': `url(${path}${item.image})`}"
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
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'SidebarLiveCams',
  async fetch() {
    await this.fetchLiveCams();
  },
  computed: {
    ...mapFields('livecams', [
      'loaded',
      'data.data',
      'data.path',
    ]),
  },
  methods: {
    ...mapActions('livecams', [
      'fetchLiveCams',
    ]),
  },
};
</script>
