import { getterTree, mutationTree, actionTree } from 'typed-vuex';

interface IAuth {
  username: string;
  password: string;
}

export const state = () => ({
  isAuthenticated: false as boolean,
  statusText: '' as string,
});

export const getters = getterTree(state, {});

export const mutations = mutationTree(state, {
  setAuthenticated(state, isAuthenticated: boolean) {
    state.isAuthenticated = isAuthenticated;
  },
  setStatusText(state, statusText: string) {
    state.statusText = statusText;
  },
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    async login({ commit }, { formData }: { formData: IAuth }) {
      try {
        const response = await this.$axios
          .post('login', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((response) => {
            commit('setAuthenticated', true);
            localStorage.setItem('session-token', response.data.access_token);
            this.$router.push('/authors');
          });
      } catch (error) {
        commit('setStatusText', 'Your credential is incorrect');
      }
    },
    async logout({ commit }) {
      localStorage.setItem('session-token', '');
      commit('setStatusText', '');
      commit('setAuthenticated', false);
      this.$router.push('/');
    },
  }
);
