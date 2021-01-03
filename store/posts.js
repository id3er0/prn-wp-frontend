import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
import objectValue from '@/utils/objectValue';

const STATE = immutableMap({
  date: Date.now(),
  frontPostsLoaded: false,
  frontPosts: [],
  postsLoaded: false,
  posts: {},
  totalPages: 1,
  currentPostLoaded: false,
  currentPost: {},
  tagsLoaded: false,
  tags: [],
});

export const state = () => STATE.toJS();

export const getters = {
  getField,
  getVideos: state => {
    if (!state.postsLoaded || !Array.isArray(state.posts)) {
      return false;
    }

    const getPostFields = (post) => ({
      id: objectValue(post, 'id'),
      slug: objectValue(post, 'slug'),
      title: objectValue(post, 'title.rendered'),
      text: objectValue(post, 'excerpt.rendered'),
      preview: post && post._embedded && post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url,
    });

    const items = [];

    for (const post of state.posts) {
      items.push({video: getPostFields(post)});
    }

    return items;
  },
};

export const mutations = {
  updateField,
  clean(state) {
    Object.assign(state, {
      ...STATE.toJS(),
      date: Date.now(),
    });
  },
};

export const actions = {
  async fetchFront(context) {
    context.commit('updateField', {
      path: 'frontPostsLoaded',
      value: false,
    });

    let result;
    try {
      result = await this.$axios.$get('/custom/v2/front_posts');
    } catch (error) {
      console.log('fetchFront - error:', error);
    }

    result = {
      top: [
        {
          name: 'Latest movies',
          key: 'latest',
          video: objectValue(result, 'latest.posts.0'),
        },
        {
          name: 'Most rated',
          key: 'most-rated',
          video: objectValue(result, 'mostRated.posts.0'),
        },
        {
          name: 'Most viewed',
          key: 'most-viewed',
          video: objectValue(result, 'mostViewed.posts.0'),
        },
      ],
      mostCommented: objectValue(result, 'mostCommented.posts'),
    };

    context.commit('updateField', {
      path: 'frontPosts',
      value: result,
    });

    context.commit('updateField', {
      path: 'frontPostsLoaded',
      value: true,
    });
  },
  async fetchPosts(context, {type = 'latest', page = 1, taxonomy}) {
    context.commit('updateField', {
      path: 'postsLoaded',
      value: false,
    });

    let ids = [];
    let per_page = 15;

    if (type === 'favourites') {
      ids = context.rootGetters['favourites/getLoadedFavourites'];

      if (!Array.isArray(ids) || ids.length < 1) {
        context.commit('updateField', {
          path: 'posts',
          value: {
            ...context.posts,
            [type]: false,
          },
        });

        context.commit('updateField', {
          path: 'postsLoaded',
          value: true,
        });
        return true;
      }

      per_page = ids.length;
    }

    const requestPosts = async (page) => {
      const params = {
        type,
        per_page,
        page,
        ids,
      };

      if (taxonomy) {
        params.type = 'taxonomy_slug';
        params.taxonomy_name = taxonomy.name;
        params.taxonomy_slug = taxonomy.slug;
      }

      let result;
      try {
        result = await this.$axios.get('/custom/v2/posts', {
          params,
        });
      } catch (error) {
        console.log('fetchPosts - requestPosts - error:', error);
      }
      return result;
    }

    const response = await requestPosts(page);

    context.commit('updateField', {
      path: 'posts',
      value: objectValue(response, 'data.posts'),
    });

    let totalPosts = objectValue(response, 'data.total', 0);
    let totalPages = Math.ceil(totalPosts / per_page);
    context.commit('updateField', {
      path: 'totalPages',
      value: totalPages,
    });

    context.commit('updateField', {
      path: 'postsLoaded',
      value: true,
    });
  },
  async fetchPost(context, {slug}) {
    context.commit('updateField', {
      path: 'currentPostLoaded',
      value: false,
    });

    let result;
    try {
      result = await this.$axios.$get('/custom/v2/posts', {
        params: {
          type: 'by_slug',
          slug,
        },
      });
    } catch (error) {
      console.log('fetchPost - error:', error);
    }

    context.commit('updateField', {
      path: 'currentPost',
      value: {
        ...context.currentPost,
        [slug]: objectValue(result, 'posts.0'),
      },
    });

    context.commit('updateField', {
      path: 'currentPostLoaded',
      value: true,
    });
  },
};
