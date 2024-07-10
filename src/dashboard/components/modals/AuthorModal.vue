<template>
  <b-modal v-model="showAuthorModal" :title="`${titleModal} Author`" @hidden="handleCancel">
    <form ref="form" @submit.stop.prevent="handleSave">
      <b-form-group
        label="Name"
        label-for="name-input"
        invalid-feedback="Name is required"
        :state="nameState"
        label-cols="2"
      >
        <b-form-input id="name-input" v-model="name" :state="nameState" required></b-form-input>
      </b-form-group>

      <BookModal
        :showModal="showBookModal"
        :selectedBook="selectedBook"
        :titleModal="titleBookModal"
        @closeModal="handleCloseModal"
        :disableAuthor="true"
      />
      <BookTable
        v-if="bookList && bookList.length > 0"
        class="mt-3"
        :bookData="bookList"
        :action="true"
        @selectBook="handleSelectBook"
      />
    </form>
    <template #modal-footer>
      <b-button variant="success" @click="handleSave()"> Save </b-button>
      <b-button variant="danger" @click="handleCancel()"> Cancel </b-button>
    </template>
  </b-modal>
</template>

<script>
import BookTable from '~/components/tables/BookTable.vue';
import BookModal from '~/components/modals/BookModal.vue';

export default {
  data() {
    return {
      name: '',
      bookList: [],
      nameState: null,
      showAuthorModal: false,
      showBookModal: false,
      selectedBook: { name: '', pages: 0, author_id: 0 },
      titleBookModal: '',
    };
  },
  components: {
    BookTable,
    BookModal,
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    authorData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    titleModal: {
      type: String,
      default: '',
    },
  },
  watch: {
    authorData: function (val) {
      this.name = val.name;
      this.bookList = val.books;
    },
    showModal: function (val) {
      this.showAuthorModal = val;
    },
  },
  computed: {
    selectedAuthor() {
      return this.$accessor.author.selectedAuthor;
    },
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    handleCancel() {
      this.nameState = null;
      this.name = '';
      this.$emit('closeModal');
    },
    async handleSave() {
      if (!this.checkFormValidity()) {
        return;
      }
      if (this.titleModal === 'Create') {
        const formData = {
          author: {
            name: this.name,
          },
          books: [],
        };
        await this.$accessor.author.createAuthor(formData);
      } else {
        const formData = {
          old_id: this.authorData.id,
          new_name: this.name,
        };
        await this.$accessor.author.updateAuthor(formData);
      }
      this.$accessor.author.getAllAuthors();
      this.$emit('closeModal');
    },
    handleSelectBook() {
      this.selectedBook = this.$accessor.book.selectedBook;
      this.titleBookModal = 'Edit';
      this.showBookModal = true;
    },
    handleCloseModal() {
      this.handleUpdateAuthor();
      this.showBookModal = false;
    },
    async handleUpdateAuthor() {
      await this.$accessor.author.getAuthor(this.selectedAuthor.id);
      this.bookList = this.selectedAuthor.books;
    },
  },
};
</script>
