<template lang="pug">
  .b-sidebar__item
    .-h2 Most popular live cams
    .b-livecams
      .b-livecams__item(
        v-for="n in 6"
        :key="n"
      )
        .b-livecams__item-inner
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SidebarLiveCams',
};
</script>
