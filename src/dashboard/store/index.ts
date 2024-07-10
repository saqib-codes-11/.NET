import { getAccessorType, mutationTree, actionTree } from 'typed-vuex';

import * as auth from '~/store/auth';
import * as book from '~/store/book';
import * as author from '~/store/author';

export const state = () => ({});

export const mutations = mutationTree(state, {});

export const getters = {};

export const actions = actionTree({ state, getters, mutations }, {});

// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    auth,
    book,
    author,
  },
});
