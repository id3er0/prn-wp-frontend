<template lang="pug">
  div
    h1.-h1
      | {{title}}
      template(
        v-if="page > 1"
      ) : Page {{page}}
    template(
      v-if="loaded"
    )
      template(
        v-if="items"
      )
        .-columns
          nuxt-link.b-link(
            v-for="(item, index) in items"
            :key="`${index}_${item.id}`"
            :to="{name: routeName, params: {slug: item.slug, page: 1}}"
          )
            .b-link__name.-mr-1 {{item.name}}
            .b-link__number ({{item.count}})

        Pagination.-mt-4(
          :pagesAmount="totalPages"
        )
      .g-row(
        v-else
      )
        .g-col
          .b-card
            h2.b-card__title No tags found

    content-placeholders(
      v-else
      :rounded="true"
    )
      content-placeholders-text
      content-placeholders-text
      content-placeholders-text
      content-placeholders-text
      content-placeholders-text
      content-placeholders-text
      content-placeholders-text
      content-placeholders-text
      content-placeholders-text
      content-placeholders-text
</template>

<script>
import Pagination from '@/components/Pagination';
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import objectValue from '@/utils/objectValue';

export default {
  name: 'Tags',
  components: {
    Pagination,
  },
  data() {
    return {
      title: null,
      type: null,
      page: null,
      routeName: null,
    };
  },
  async fetch() {
    this.type = this.$route.name === 'names-page'
      ? 'actors'
      : 'tags';
    this.page = this.$route.params.page;
    this.routeName = this.type === 'actors'
      ? 'name-slug-page'
      : 'tag-slug-page';
    if (typeof this.page === 'undefined') {
      this.$router.push({params: {page: '1'}});
    }

    await this.fetchTags({
      type: this.type,
      page: this.page,
    });

    this.title = objectValue(this, `pages.taxonomy.${this.type}.meta.title`) || this.type;
    this.description = objectValue(this, `pages.taxonomy.${this.type}.meta.description`, '');
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
    ...mapFields('tags', [
      'loaded',
      'items',
      'totalPages',
    ]),
  },
  methods: {
    ...mapActions('tags', [
      'fetchTags',
    ]),
  },
};
</script>
