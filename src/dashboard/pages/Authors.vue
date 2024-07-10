<template>
  <div>
    <h1>Authors</h1>
    <b-input-group class="my-3">
      <b-input v-model="searchQuery" aria-placeholder="Search authors" placeholder="Search authors" />
      <b-input-group-append>
        <b-button @click="handleSearch()" variant="outline-primary">Search</b-button>
      </b-input-group-append>
      <b-button class="ml-5" variant="primary" @click="handleCreate()">Create Author</b-button>
    </b-input-group>
    <AuthorTable :tableData="filteredAuthors" @selectAuthor="handleSelectAuthor" />
    <AuthorModal
      :showModal="showAuthorModal"
      :titleModal="titleAuthorModal"
      :authorData="selectedAuthor"
      @closeModal="handleCloseModal"
    />
  </div>
</template>

<script>
import AuthorTable from '~/components/tables/AuthorTable.vue';
import AuthorModal from '~/components/modals/AuthorModal.vue';

export default {
  name: 'books',
  middleware: 'auth',
  data() {
    return {
      searchQuery: '',
      filteredAuthors: [],
      selectedAuthor: {},
      showAuthorModal: false,
      titleAuthorModal: '',
    };
  },
  components: {
    AuthorTable,
    AuthorModal,
  },
  async mounted() {
    await this.$accessor.author.getAllAuthors();
  },
  computed: {
    allAuthors() {
      return this.$accessor.author.allAuthors;
    },
  },
  watch: {
    allAuthors: function (val) {
      this.filteredAuthors = val;
    },
  },
  methods: {
    handleSearch() {
      this.filteredAuthors = this.allAuthors.filter((item) => item.name.toLowerCase().includes(this.searchQuery));
    },
    handleCreate() {
      this.titleAuthorModal = 'Create';
      this.showAuthorModal = true;
    },
    handleCloseModal() {
      this.showAuthorModal = false;
      this.selectedAuthor = {};
      this.$accessor.author.setSelectedAuthor({});
    },
    handleSelectAuthor() {
      this.titleAuthorModal = 'Edit';
      this.selectedAuthor = this.$accessor.author.selectedAuthor;
      this.showAuthorModal = true;
    },
  },
};
</script>
