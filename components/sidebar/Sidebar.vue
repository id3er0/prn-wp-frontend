<template lang="pug">
  aside.b-sidebar
    SidebarTags
    .b-sidebar__item
      .-h2 Pornstars
      a.b-button._w-full(href="#") Show more
    .b-sidebar__item
      .-h2 Most popular live cams
      a.b-button._w-full(href="#") Show more
    .b-sidebar__item
      .-h2 Friendly resources
      a.b-button._w-full(href="#") Show more
</template>

<script>
import SidebarTags from '@/components/sidebar/SidebarTags';

export default {
  name: 'Sidebar',
  components: {SidebarTags},
};
</script>
