import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
import objectValue from '@/utils/objectValue';
import trimString from '@/utils/trimString';

const STATE = immutableMap({
  date: Date.now(),
  loaded: false,
  data: {},
  showMore: false,
  showSearch: false,
  search: null,
});

export const state = () => STATE.toJS();

export const getters = {
  getField,
  getData: state => {
    const search = state.search && trimString(state.search);
    if (!search) {
      return state.data;
    }
    return state.data.filter(i => trimString(i.name).includes(search));
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
  async fetchResources(context) {
    context.commit('updateField', {
      path: 'loaded',
      value: false,
    });

    let result;
    try {
      result = await this.$axios.$get('/custom/v2/resources/');
    } catch (error) {
      console.log('fetchResources - error:', error);
    }

    context.commit('updateField', {
      path: 'data',
      value: result,
    });

    context.commit('updateField', {
      path: 'loaded',
      value: true,
    });
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
      path: 'search',
      value,
    });
  },
};
