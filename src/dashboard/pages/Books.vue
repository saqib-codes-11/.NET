<template>
  <div>
    <h1>Books</h1>
    <b-input-group class="my-3">
      <b-input v-model="searchQuery" aria-placeholder="Search books" placeholder="Search books" />
      <b-input-group-append>
        <b-button @click="handleSearch()" variant="outline-primary">Search</b-button>
      </b-input-group-append>
      <b-button class="ml-5" variant="primary" @click="handleCreate()">Create Book</b-button>
    </b-input-group>
    <BookTable @selectBook="handleSelectBook" :bookData="filteredBooks" />
    <BookModal
      :showModal="showBookModal"
      :titleModal="titleBookModal"
      :selectedBook="selectedBook"
      @closeModal="handleCloseModal"
    />
  </div>
</template>

<script>
import BookTable from '~/components/tables/BookTable.vue';
import BookModal from '~/components/modals/BookModal.vue';

export default {
  name: 'books',
  middleware: 'auth',
  data() {
    return {
      searchQuery: '',
      filteredBooks: [],
      showBookModal: false,
      titleBookModal: '',
      selectedBook: { name: '', pages: 0, author_id: 0 },
    };
  },
  components: {
    BookTable,
    BookModal,
  },
  mounted() {
    this.$accessor.book.getAllBooks();
  },
  computed: {
    allBooks() {
      return this.$accessor.book.allBooks;
    },
  },
  watch: {
    allBooks: function (val) {
      this.filteredBooks = val;
    },
  },
  methods: {
    handleSearch() {
      this.filteredBooks = this.allBooks.filter((item) => item.name.toLowerCase().includes(this.searchQuery));
    },
    handleSelectBook() {
      this.showBookModal = true;
      this.titleBookModal = 'Edit';
      this.selectedBook = this.$accessor.book.selectedBook;
    },
    handleCloseModal() {
      this.showBookModal = false;
      this.selectedBook = {};
      this.$accessor.book.setSelectedBook({});
    },
    handleCreate() {
      this.titleBookModal = 'Create';
      this.showBookModal = true;
    },
  },
};
</script>
