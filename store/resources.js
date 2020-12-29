import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
import objectValue from '@/utils/objectValue';

const STATE = immutableMap({
  date: Date.now(),
  loaded: false,
  data: {},
  showMore: false,
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
};
