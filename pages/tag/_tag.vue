<template lang="pug">
  Videos(
    :title="`Tag: ${tag}`"
  )
</template>

<script>
import Videos from '@/components/Videos';

export default {
  components: {Videos},
  computed: {
    tag() {
      return this.$route.params.tag;
    },
  },
};
</script>
