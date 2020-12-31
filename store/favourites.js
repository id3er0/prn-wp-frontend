import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
// import { debounce, throttle } from 'throttle-debounce';
// import ky from 'ky';
import objectValue from '@/utils/objectValue';

const STATE = immutableMap({
  date: Date.now(),
  items: [],
});

export const state = () => STATE.toJS();

export const getters = {
  getField,
  isFavourited: state => id => state.items.includes(id),
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
  toggleFavourite(context, {id}) {
    let items = [...context.state.items];

    if (!context.state.items.includes(id)) {
      items.push(id);
    } else {
      items = items.filter(item => item !== id);
    }

    context.commit('updateField', {
      path: 'items',
      value: items,
    })
  },
};
