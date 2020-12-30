<template lang="pug">
  div
    h1.-h1 {{title}}
    template(
      v-if="postsLoaded"
    )
      .g-row(
        v-if="getPosts"
      )
        .g-col._w-3-1(
          v-for="(item, index) in getPosts"
          :key="`${index}_${item.id}`"
        )
          .b-card
            .-mb-3
              .b-card__image(
                :style="{'background-image': `url(${item.video_meta.poster})`}"
                @click="$router.push({name: 'video-slug', params: {slug: item.slug}})"
              )
                PostCardLike(
                  :id="item.id"
                  @afterClick="fetchFavourites"
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
        .g-col
          .b-card
            h2.b-card__title No videos found

    .g-row(
      v-else
    )
      .g-col._w-3-1(
        v-for="n in 9"
        :key="n"
      )
        content-placeholders(:rounded="true")
          content-placeholders-img
          content-placeholders-heading
</template>

<script>
import PostCardLike from '@/components/post-card/PostCardLike';
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import objectValue from '@/utils/objectValue';

export default {
  components: {
    PostCardLike,
  },
  data() {
    return {
      title: null,
    };
  },
  async fetch() {
    const type = this.$route.params.type;
    this.title = objectValue(this, `pages.videos.${type}.meta.title`) || type;
    await this.fetchPosts({
      type,
    });
  },
  head() {
    const type = this.$route.params.type;
    const title = objectValue(this, `pages.videos.${type}.meta.title`);
    const name = objectValue(this, 'header.name', '');
    const description = objectValue(this, `pages.videos.${type}.meta.description`);
    return {
      title: `${title} | ${name}`,
      meta: [
        {hid: 'description', name: 'description', content: description},
      ],
    };
  },
  computed: {
    ...mapFields('config', [
      'data.header',
      'data.pages',
    ]),
    ...mapFields('posts', [
      'postsLoaded',
      'posts',
    ]),
    getPosts() {
      return objectValue(this.posts, this.$route.params.type);
    },
  },
  methods: {
    ...mapActions('posts', [
      'fetchPosts',
    ]),
    fetchFavourites() {
      if (this.$route.params.type === 'favourites') {
        this.fetchPosts({
          type: this.$route.params.type,
        });
      }
    },
  },
};
</script>
