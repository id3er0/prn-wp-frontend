<template lang="pug">
  button.b-button._icon(
    type="button"
    @click.stop="onClick"
  )
    .b-icon._s-18._left(
      :class="!_isFavourited ? '_star' : '_star-filled'"
    )
    span(v-if="!_isFavourited") Add to favourites
    span(v-else) Remove from favourites
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PostLike',
  props: {
    id: {
      type: Number,
    },
  },
  computed: {
    ...mapGetters('favourites', [
      'isFavourited',
    ]),
    _isFavourited() {
      return this.isFavourited(this.id);
    },
  },
  methods: {
    ...mapActions('favourites', [
      'toggleFavourite',
    ]),
    onClick() {
      this.toggleFavourite({id: this.id});
      this.$emit('afterClick');
    },
  },
};
</script>
