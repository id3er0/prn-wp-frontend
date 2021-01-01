<template lang="pug">
  div
    h1.-h1
      | {{title}}
      template(
        v-if="page > 1"
      ) : Page {{page}}
    template(
      v-if="postsLoaded"
    )
      template(
        v-if="getPosts"
      )
        .g-row
          .g-col._w-3-1(
            v-for="(item, index) in getPosts"
            :key="`${index}_${item.id}`"
            v-if="item"
          )
            .b-card
              .-mb-3
                .b-card__image(
                  v-if="item.video_meta && item.video_meta.poster"
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

        Pagination(
          v-if="showPagination"
          :pagesAmount="totalPages"
        )
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
import Pagination from '@/components/Pagination';
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import objectValue from '@/utils/objectValue';

export default {
  name: 'Videos',
  components: {
    PostCardLike,
    Pagination,
  },
  data() {
    return {
      title: null,
      type: null,
      slug: null,
      page: null,
    };
  },
  async fetch() {
    this.type = this.$route.params.type;
    this.slug = this.$route.params.slug;
    this.page = this.$route.params.page;
    if (this.type !== 'favourites'
      && typeof this.page === 'undefined'
    ) {
      this.$router.push({params: {page: '1'}});
    }

    const setMeta = () => {
      this.title = objectValue(this, `pages.videos.${this.type}.meta.title`) || this.type;
      this.description = objectValue(this, `pages.videos.${this.type}.meta.description`, '');
    }

    const fetchForTaxonomy = async () => {
      await this.fetchPosts({
        taxonomy: {
          name: this.type,
          slug: this.slug,
        },
        page: this.page,
      });
      setMeta();
      this.title = `${this.title} ${this.slug}`;
    }

    switch (this.$route.name) {
      case 'videos-type-page':
        await this.fetchPosts({
          type: this.type,
          page: this.page,
        });
        setMeta();
        break;
      case 'tag-slug-page':
        this.type = 'post_tag';
        await fetchForTaxonomy();
        break;
      case 'name-slug-page':
        this.type = 'actors';
        await fetchForTaxonomy();
        break;
      default:
        await this.fetchPosts({
          page: this.page,
        });
        break;
    }
  },
  head() {
    const name = objectValue(this, 'header.name', '');
    return {
      title: `${this.title} - ${this.page} | ${name}`,
      meta: [
        {hid: 'description', name: 'description', content: this.description},
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
      'totalPages',
    ]),
    getPosts() {
      return Array.isArray(this.posts) && this.posts;
    },
    showPagination() {
      return this.type !== 'favourites';
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
