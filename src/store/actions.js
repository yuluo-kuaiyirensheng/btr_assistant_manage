import {
  SET_STORAGE,
  REMOVE_STORAGE,
  SET_PRIOR_PATH,
} from './mutation-types';

export default {
  setStorage({ commit }, item) {
    commit(SET_STORAGE, { item });
  },
  removeStorage({ commit }) {
    commit(REMOVE_STORAGE);
  },
  setPriorPath({ commit }, item) {
    commit(SET_PRIOR_PATH, { item });
  },
}
