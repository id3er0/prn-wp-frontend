<template lang="pug">
  .b-card__star
    button.b-button._icon(
      type="button"
      @click.stop="onClick"
    )
      .b-icon(
        :class="!_isFavourited ? '_star-bg' : '_star-filled'"
      )
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PostCardLike',
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
