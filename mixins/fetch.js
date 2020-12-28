import { mapActions } from 'vuex';

export default {
  async fetch() {
    await this.fetchPosts({
      tag: this.$route.params.tag,
    });
    await this.fetchTags();
  },
  methods: {
    ...mapActions('data', [
      'fetchPosts',
      'fetchTags',
    ]),
  },
};
