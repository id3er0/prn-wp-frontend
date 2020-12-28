<template lang="pug">
  .b-main
    .g-container
      .g-row
        .g-col._w-4-3
          h1.-h1 Project title
          template(
            v-if="frontPostsLoaded && frontPosts"
          )
            .g-row
              .g-col._w-3-1(
                v-for="(item, index) in frontPosts.top"
                :key="`${index}_${item.id}`"
              )
                .b-card
                  h2.b-card__title.-t-cut {{item.name}}
                  .-mb-2(
                    v-if="item.video"
                  )
                    .b-card__image(
                      :style="{'background-image': `url(${item.video.video_meta.poster})`}"
                      @click="$router.push({name: 'videos-type', params: {type: item.key}})"
                    )
                      PostCardLike(:id="item.video.id")
                  h3.b-card__subtitle.-t-cut(
                    v-html="item.title"
                  )
                  .-relative
                    h4.b-card__text.-t-cut-lines(
                      v-if="item.video"
                      v-html="item.video.short_content"
                    )
                    .-pos-right-bottom
                      nuxt-link.b-button._icon._bg(
                        :to="{name: 'videos-type', params: {type: item.key}}"
                      )
                        .b-icon._arrow-r

            h2.-h2.-mt-4 Most commented
            .g-row
              .g-col._w-3-1(
                v-for="(item, index) in frontPosts.mostCommented"
                :key="`${index}_${item.id}`"
              )
                .b-card
                  .-mb-2
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
            h2.-h2.-mt-4 Some article
            .g-row
              .g-col._w-3-1
                .b-card
                  .b-card__image
                    img(:src="frontBlocks.article.preview")
              .g-col._w-3-2
                .b-card
                  h3.b-card__subtitle {{frontBlocks.article.title}}
                  h4.b-card__text {{frontBlocks.article.text}}

        .g-col._w-4-1
          Sidebar
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar';
import PostCardLike from '@/components/post-card/PostCardLike';
import { mapActions, mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
  components: {
    PostCardLike,
    Sidebar,
  },
  async fetch() {
    await this.fetchFront();
    await this.fetchTags();
  },
  methods: {
    ...mapActions('data', [
      'fetchFront',
      'fetchTags',
    ]),
  },
  computed: {
    ...mapFields('data', [
      'frontPostsLoaded',
      'frontPosts',
    ]),
  },
};
</script>
