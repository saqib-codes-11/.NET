import { getterTree, mutationTree, actionTree } from 'typed-vuex';

export interface IBook {
  id: number;
  name: string;
  pages: number;
  author_id: number;
}

export const state = () => ({
  selectedBook: { name: '', pages: 0, author_id: 0 } as IBook,
  allBooks: [] as IBook[],
});

export const getters = getterTree(state, {});

export const mutations = mutationTree(state, {
  setSelectedBook(state, book: IBook) {
    state.selectedBook = book;
  },
  setAllBooks(state, books) {
    state.allBooks = books;
  },
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    async getAllBooks({ commit }) {
      try {
        const response = await this.$axios.get('/books');
        commit('setAllBooks', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async createBook({}, bookData: IBook) {
      try {
        const response = await this.$axios.post('/books', bookData);
      } catch (error) {
        console.log(error);
      }
    },
    async updateBook({}, { book_id, bookData }: { book_id: number; bookData: IBook }) {
      try {
        const response = await this.$axios.put('/books/' + book_id, bookData);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteBook({}, book_id: number) {
      try {
        const response = await this.$axios.delete('/books/' + book_id);
      } catch (error) {
        console.log(error);
      }
    },
  }
);
