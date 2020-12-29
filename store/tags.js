import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
import objectValue from '@/utils/objectValue';

const STATE = immutableMap({
  date: Date.now(),
  loaded: false,
  showMoreLoaded: true,
  data: {},
  totalPages: 1,
  search: null,
});

export const state = () => STATE.toJS();

export const getters = {
  getField,
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
  async fetchTags(context, showLoading = true) {
    context.commit('updateField', {
      path: showLoading ? 'loaded' : 'showMoreLoaded',
      value: false,
    });

    let items = [];

    const request = (page) => this.$axios.get('/wp/v2/tags', {
      params: {
        page,
        per_page: 10,
        hide_empty: true,
        orderby: 'count',
        order: 'desc',
      },
    });

    // const response = await request({});
    const totalPages = context.state.totalPages; // response.headers['x-wp-totalpages'];

    for (let page = 1; page <= totalPages; page += 1) {
      const r = await request(page);
      items = items.concat(r.data);
    }

    context.commit('updateField', {
      path: 'data',
      value: items,
    });

    context.commit('updateField', {
      path: showLoading ? 'loaded' : 'showMoreLoaded',
      value: true,
    });
  },
  async showMore(context) {
    context.commit('updateField', {
      path: 'totalPages',
      value: context.state.totalPages + 1,
    });
    await context.dispatch('fetchTags', false);
  },
};
