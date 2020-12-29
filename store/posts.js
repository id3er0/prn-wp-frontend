import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
import objectValue from '@/utils/objectValue';

const STATE = immutableMap({
  date: Date.now(),
  frontPostsLoaded: false,
  frontPosts: [],
  postsLoaded: false,
  posts: {},
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
          video: objectValue(result, 'latest.0'),
        },
        {
          name: 'Most rated',
          key: 'most-rated',
          video: objectValue(result, 'mostRated.0'),
        },
        {
          name: 'Most viewed',
          key: 'most-viewed',
          video: objectValue(result, 'mostViewed.0'),
        },
      ],
      mostCommented: objectValue(result, 'mostCommented'),
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
  async fetchPosts(context, {type = 'latest', tag}) {
    context.commit('updateField', {
      path: 'postsLoaded',
      value: false,
    });

    let posts = [];
    let ids = [];
    let per_page = 15;

    if (type === 'favourites') {
      ids = context.rootState.favourites.items;

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

      if (tag) {
        params.tags = tag;
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

    // const responsePosts = await requestPosts(1);
    const totalPages = 1; // responsePosts.headers['x-wp-totalpages'];

    for (let page = 1; page <= totalPages; page += 1) {
      const addPosts = await requestPosts(page);
      posts = posts.concat(addPosts.data);
    }

    context.commit('updateField', {
      path: 'posts',
      value: {
        ...context.posts,
        [type]: posts,
      },
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
        [slug]: objectValue(result, '0'),
      },
    });

    context.commit('updateField', {
      path: 'currentPostLoaded',
      value: true,
    });
  },
};
