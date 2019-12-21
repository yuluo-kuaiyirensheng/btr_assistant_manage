import {
  KEY,
  SET_STORAGE,
  REMOVE_STORAGE,
  SET_PRIOR_PATH,
} from './mutation-types';

export default {
  [SET_STORAGE](state, { item }) {
    state.manager = item;
    localStorage.setItem(KEY, JSON.stringify(item));
  },
  [REMOVE_STORAGE](state) {
    state.manager = null;
    localStorage.removeItem(KEY);
  },
  [SET_PRIOR_PATH](state, { item }) {
    state.priorPath = item;
  },
}
