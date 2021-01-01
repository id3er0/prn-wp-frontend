<template lang="pug">
  .b-header._fixed.-hide-on-tablet-m
    .g-container
      .b-nav
        div
          button.b-nav__item(
            type="button"
            @click="showSmallMenu = !showSmallMenu"
          )
            .b-icon._close._header
        div
          button.b-nav__item(
            type="button"
            @click="showSmallMenu = !showSmallMenu"
          )
            .b-icon._menu._header._flip-horizontal
    .b-header__container
      Sidebar
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import Sidebar from '@/components/sidebar/Sidebar';

export default {
  name: 'HeaderSmall',
  components: {Sidebar},
  computed: {
    ...mapFields('smallMenu', [
      'showSmallMenu',
    ]),
  },
};
</script>
