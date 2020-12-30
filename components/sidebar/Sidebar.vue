<template lang="pug">
  aside.b-sidebar
    //ClientOnly
    SidebarTags
    SidebarActors
    SidebarLiveCams
    SidebarResources
</template>

<script>
import ClientOnly from 'vue-client-only';
import SidebarTags from '@/components/sidebar/SidebarTags';
import SidebarActors from '@/components/sidebar/SidebarActors';
import SidebarLiveCams from '@/components/sidebar/SidebarLiveCams';
import SidebarResources from '@/components/sidebar/SidebarResources';

export default {
  name: 'Sidebar',
  components: {
    ClientOnly,
    SidebarTags,
    SidebarActors,
    SidebarLiveCams,
    SidebarResources,
  },
};
</script>
