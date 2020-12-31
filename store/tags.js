import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
import objectValue from '@/utils/objectValue';

const STATE = immutableMap({
  date: Date.now(),
  loaded: false,
  items: [],
  totalPages: 1,
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
  async fetchTags(context, {type = 'tags', page = 1, per_page = 100}) {
    context.commit('updateField', {
      path: 'loaded',
      value: false,
    });

    const request = (page) => {
      let result;
      const params = {
        page,
        per_page,
        hide_empty: true,
        orderby: 'count',
        order: 'desc',
      };

      try {
        result = this.$axios.get(`/wp/v2/${type}`, {params});
      } catch (error) {
        console.log('fetchTags - error:', error);
      }
      return result;
    }

    const response = await request(page);

    context.commit('updateField', {
      path: 'items',
      value: objectValue(response, 'data'),
    });

    const totalPagesKey = 'x-wp-totalpages';
    let totalPages = objectValue(response, `headers.${totalPagesKey}`, 0);
    totalPages = parseInt(totalPages);
    console.log({totalPages});
    context.commit('updateField', {
      path: 'totalPages',
      value: totalPages,
    });

    context.commit('updateField', {
      path: 'loaded',
      value: true,
    });
  },
};
