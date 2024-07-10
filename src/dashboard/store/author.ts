import { getterTree, mutationTree, actionTree } from 'typed-vuex';
import { IBook } from './book';

export default interface IAuthor {
  id: number;
  name: string;
  books: IBook[];
}

export const state = () => ({
  selectedAuthor: {} as IAuthor,
  allAuthors: [] as IAuthor[],
});

export const getters = getterTree(state, {});

export const mutations = mutationTree(state, {
  setSelectedAuthor(state, author: IAuthor) {
    state.selectedAuthor = author;
  },
  setAllAuthors(state, authors) {
    state.allAuthors = authors;
  },
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    async getAllAuthors({ commit }) {
      try {
        const response = await this.$axios.get('/authors');
        commit('setAllAuthors', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async createAuthor({}, formData) {
      try {
        const response = await this.$axios.post('/authors', formData);
      } catch (error) {
        console.log(error);
      }
    },
    async getAuthor({ commit }, author_id) {
      try {
        const response = await this.$axios.get('/authors/' + author_id);
        commit('setSelectedAuthor', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async updateAuthor({}, formData) {
      try {
        const response = await this.$axios.put('/authors/' + formData.old_id, { name: formData.new_name });
      } catch (error) {
        console.log(error);
      }
    },
  }
);
