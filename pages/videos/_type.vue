<template lang="pug">
  .b-main
    .g-container
      .g-row
        .g-col._w-4-3
          h1.-h1 {{title}}
          .g-row(
            v-if="getPosts"
          )
            .g-col._w-3-1(
              v-for="(item, index) in getPosts"
              :key="`${index}_${item.id}`"
            )
              .b-card
                .-mb-2
                  .b-card__image(
                    :style="{'background-image': `url(${item.video_meta.poster})`}"
                    @click="$router.push({name: 'video-slug', params: {slug: item.slug}})"
                  )
                h3.b-card__subtitle.-t-cut(
                  v-html="item.title"
                )
                .-relative
                  h4.b-card__text.-t-cut-lines(
                    v-html="item.short_content"
                  )
                  .-pos-right-bottom
                    nuxt-link.b-button._icon._bg(
                      :to="{name: 'video-slug', params: {slug: item.slug}}"
                    )
                      .b-icon._arrow-r

          .g-row(
            v-else
          )
            .g-col._w-3-1(
              v-for="n in 6"
              :key="n"
            )
              content-placeholders(:rounded="true")
                content-placeholders-img
                content-placeholders-heading
        .g-col._w-4-1
          Sidebar
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar';
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import objectValue from '@/utils/objectValue';

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      title: null,
    };
  },
  async fetch() {
    this.title = this.$route.params.type;
    await this.fetchPosts({
      type: this.$route.params.type,
    });
  },
  computed: {
    ...mapFields('data', [
      'postsLoaded',
      'posts',
    ]),
    getPosts() {
      return objectValue(this.posts, this.$route.params.type);
    },
  },
  methods: {
    ...mapActions('data', [
      'fetchPosts',
      'fetchTags',
    ]),
  },
};
</script>
