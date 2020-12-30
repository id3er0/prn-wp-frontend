import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
import objectValue from '@/utils/objectValue';
import trimString from '@/utils/trimString';

const STATE = immutableMap({
  date: Date.now(),
  loaded: false,
  data: {},
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
  async fetchConfig(context) {
    context.commit('updateField', {
      path: 'loaded',
      value: false,
    });

    let result;
    try {
      result = await this.$axios.$get('/custom/v2/config/');
    } catch (error) {
      console.log('fetchConfig - error:', error);
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
