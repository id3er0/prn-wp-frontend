import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
import objectValue from '@/utils/objectValue';

const STATE = immutableMap({
  date: Date.now(),
  loaded: false,
  showMoreLoaded: true,
  data: {},
  totalPages: 1,
  showSearch: false,
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
  async fetchActors(context, showLoading = true) {
    context.commit('updateField', {
      path: showLoading ? 'loaded' : 'showMoreLoaded',
      value: false,
    });

    let items = [];

    const request = (page) => {
      let result;
      const params = {
        page,
        per_page: 10,
        hide_empty: true,
        orderby: 'count',
        order: 'desc',
      };

      const search = context.state.search;
      if (!!search) {
        params.search = search;
      }

      try {
        result = this.$axios.get('/wp/v2/actors', {params});
      } catch (error) {
        console.log('fetchActors - error:', error);
      }
      return result;
    }

    const totalPages = context.state.totalPages;

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
    await context.dispatch('fetchActors', false);
  },
  async setShowSearch(context) {
    const value = !context.state.showSearch;
    context.commit('updateField', {
      path: 'showSearch',
      value,
    });
    if (!value) {
      await context.dispatch('doSearch', '');
    }
  },
  async doSearch(context, value) {
    context.commit('updateField', {
      path: 'totalPages',
      value: 1,
    });
    context.commit('updateField', {
      path: 'search',
      value,
    });
    await context.dispatch('fetchActors', true);
  },
};
