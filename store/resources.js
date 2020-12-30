import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
import objectValue from '@/utils/objectValue';
import trimString from '@/utils/trimString';

const STATE = immutableMap({
  date: Date.now(),
  showMore: false,
  showSearch: false,
  search: null,
});

export const state = () => STATE.toJS();

export const getters = {
  getField,
  getResources: (state, getters, rootState) => {
    const resources = objectValue(rootState, 'config.data.sidebar.resources.items');
    if (!Array.isArray(resources)) {
      return false;
    }
    const search = state.search && trimString(state.search);
    return !search
      ? resources
      : resources.filter(i => trimString(i.name).includes(search));
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
