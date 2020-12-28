<template lang="pug">
  .b-main
    .g-container
      .g-row
        .g-col._w-4-3
          h1.-h1 {{title}}
          .g-row(
            v-if="getVideos"
          )
            .g-col._w-3-1(
              v-for="(item, index) in getVideos"
              :key="`${index}_${item.id}`"
            )
              .b-card
                .-mb-2
                  .b-card__image(
                    :style="{'background-image': `url(${item.video.preview})`}"
                    @click="$router.push({name: 'video-slug', params: {slug: item.video.slug}})"
                  )
                h3.b-card__subtitle.-t-cut(
                  v-html="item.video.title"
                )
                .-relative
                  h4.b-card__text.-t-cut-lines(
                    v-html="item.video.text"
                  )
                  .-pos-right-bottom
                    nuxt-link.b-button._icon._bg(
                      :to="{name: 'video-slug', params: {slug: item.video.slug}}"
                    )
                      .b-icon._arrow-r

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
        .g-col._w-4-1
          Sidebar
</template>

<script>
import fetch from '@/mixins/fetch';
import Sidebar from '@/components/sidebar/Sidebar';
import { mapGetters } from 'vuex';

export default {
  name: 'Videos',
  mixins: [
    fetch,
  ],
  components: {
    Sidebar,
  },
  props: {
    title: {
      type: String,
      default() {
        return 'Videos';
      },
    },
  },
  data() {
    return {
      content: null,
      posts: null,
    };
  },
  computed: {
    ...mapGetters('data', [
      'getVideos',
    ]),
  },
};
</script>
