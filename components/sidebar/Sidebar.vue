<template lang="pug">
  aside.b-sidebar
    SidebarTags
    .b-sidebar__item
      .-h2 Pornstars
      a.b-button._w-full(href="#") Show more
    SidebarLiveCams
    SidebarResources
</template>

<script>
import SidebarTags from '@/components/sidebar/SidebarTags';
import SidebarLiveCams from '@/components/sidebar/SidebarLiveCams';
import SidebarResources from '@/components/sidebar/SidebarResources';
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'Sidebar',
  components: {
    SidebarTags,
    SidebarLiveCams,
    SidebarResources,
  },
};
</script>
