<template lang="pug">
  div(
    v-if="currentPostLoaded && getPost"
  )
    h1.-h1(
      v-html="getPost.title"
    )
    .g-row
      .g-col
        .b-card
          .b-card__video(
            v-if="getPost.video_meta.video_url"
          )
            ClientOnly
              VideoPlayer(
                :videoUrl="getPost.video_meta.video_url"
              )
          .b-card__iframe(
            v-else-if="getPost.video_meta.embed_code"
            v-html="getPost.video_meta.embed_code"
          )
          .b-card__panel.-mb-4
            .b-buttons(
              v-if="getPost.video_meta"
            )
              button.b-button._icon(type="button")
                .b-icon._like._left
                span {{getPost.video_meta.likes || 0}}
              button.b-button._icon(type="button")
                .b-icon._dislike._left
                span {{getPost.video_meta.dislikes || 0}}
              button.b-button._icon(type="button")
                .b-icon._eye._left
                span {{getPost.video_meta.views || 0}}
              button.b-button._icon(type="button")
                .b-icon._comments._left
                span {{getPost.video_meta.comments_number || 0}}
              button.b-button._icon(type="button" disabled)
                .b-icon._camera-photo._left
                span Screenshots
              button.b-button._icon(type="button" disabled)
                .b-icon._share._left
                span Share
              PostLike(:id="getPost.id")

          .-mb-3(
            v-if="getPost.video_meta && Array.isArray(getPost.video_meta.tags) && getPost.video_meta.tags.length > 0"
          )
            .b-card__values
              div
                .-h3.-mt-2 Tags:
              div
                .b-tags
                  nuxt-link.b-tag(
                    v-for="item in getPost.video_meta.tags"
                    :key="item.id"
                    :to="{name: 'tag-slug-page', params: {slug: item.slug, page: 1}}"
                  ) {{item.name}}

          .b-card__values(
            v-if="getPost.content"
          )
            .-h3 Description:
            .-text(
              v-html="getPost.content"
            )

  //
    h2.-h2.-mt-5 Similar videos
    .g-row(
      v-if="getVideos"
    )
      .g-col._w-3-1(
        v-for="(item, index) in getVideos"
        v-if="index < 6"
        :key="`${index}_${item.id}`"
      )
        .b-card
          .-mb-3
            .b-card__image(
              :style="{'background-image': `url(${item.video.preview})`}"
            )
          h3.b-card__subtitle(
            v-html="item.video.title"
          )
          h4.b-card__text(
            v-html="item.video.text"
          )
          .-t-right
            nuxt-link.b-button._icon(
              :to="{name: 'video-slug', params: {slug: item.video.slug}}"
            )
              .b-icon._arrow-r
  div(
    v-else-if="!currentPostLoaded"
  )
    content-placeholders(:rounded="true")
      content-placeholders-heading
      content-placeholders-img
      content-placeholders-heading
</template>

<script>
import ClientOnly from 'vue-client-only';
import VideoPlayer from '@/components/VideoPlayer';
import { mapActions, mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import objectValue from '@/utils/objectValue';
import PostLike from '@/components/post/PostLike';

export default {
  components: {
    PostLike,
    ClientOnly,
    VideoPlayer,
  },
  async fetch() {
    await this.fetchPosts({});
    await this.fetchPost({slug: this.$route.params.slug});
  },
  head() {
    const name = objectValue(this, 'header.name', '');
    const title = objectValue(this, 'getPost.title', '');
    return {
      title: `${title} | ${name}`,
      meta: [
        {hid: 'description', name: 'description', content: title},
      ],
    };
  },
  computed: {
    ...mapFields('config', [
      'data.header',
    ]),
    ...mapFields('posts', [
      'currentPostLoaded',
      'currentPost',
      'currentPostsLoaded',
    ]),
    getPost() {
      return objectValue(this.currentPost, this.$route.params.slug);
    },
  },
  methods: {
    ...mapActions('posts', [
      'fetchPosts',
      'fetchPost',
    ]),
  },
};
</script>
