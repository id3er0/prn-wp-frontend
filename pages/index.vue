<template lang="pug">
  div
    h1.-h1(
      v-if="header && header.name"
    ) {{header.name}}
    template(
      v-if="frontPostsLoaded && frontPosts"
    )
      .g-row
        .g-col._w-3-1(
          v-for="(item, index) in frontPosts.top"
          :key="`${index}_${item.id}`"
        )
          .b-card
            h2.b-card__title
              nuxt-link.-t-cut(
                :to="{name: 'videos-type-page', params: {type: item.key, page: 1}}"
              ) {{item.name}}
            .-mb-3(
              v-if="item.video"
            )
              .b-card__image(
                :style="{'background-image': `url(${item.video.video_meta.poster})`}"
                @click="$router.push({name: 'videos-type-page', params: {type: item.key, page: 1}})"
              )
                PostCardLike(:id="item.video.id")
            nuxt-link.b-card__subtitle.-t-cut.-mb-0(
              :to="{name: 'videos-type-page', params: {type: item.key, page: 1}}"
              v-html="item.video.title"
            )

      h2.-h2.-mt-4 Most commented
      .g-row
        .g-col._w-3-1(
          v-for="(item, index) in frontPosts.mostCommented"
          :key="`${index}_${item.id}`"
        )
          .b-card
            .-mb-3
              .b-card__image(
                :style="{'background-image': `url(${item.video_meta.poster})`}"
                @click="$router.push({name: 'video-slug', params: {slug: item.slug}})"
              )
                PostCardLike(:id="item.id")
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

    template(
      v-else-if="!frontPostsLoaded"
    )
      .g-row
        .g-col._w-3-1(
          v-for="n in 9"
          :key="n"
        )
          content-placeholders(:rounded="true")
            content-placeholders-img
            content-placeholders-heading
    //
      h2.-h2.-mt-5 Some article
      .g-row
        .g-col._w-3-1
          .b-card
            .b-card__image
              img(:src="frontBlocks.article.preview")
        .g-col._w-3-2
          .b-card
            h3.b-card__subtitle {{frontBlocks.article.title}}
            h4.b-card__text {{frontBlocks.article.text}}
</template>

<script>
import PostCardLike from '@/components/post-card/PostCardLike';
import objectValue from '@/utils/objectValue';
import { mapActions, mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
  components: {
    PostCardLike,
  },
  async fetch() {
    await this.fetchFront();
  },
  head() {
    const title = objectValue(this, 'pages.home.meta.title');
    const name = objectValue(this, 'header.name', '');
    const description = objectValue(this, 'pages.home.meta.description');
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
      'frontPostsLoaded',
      'frontPosts',
    ]),
  },
  methods: {
    ...mapActions('posts', [
      'fetchFront',
    ]),
  },
};
</script>
