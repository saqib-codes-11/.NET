<template>
  <b-modal v-model="showBookModal" :title="`${titleModal} Book`" @hidden="handleCancel">
    <form ref="form" @submit.stop.prevent="handleSave">
      <b-form-group label="Name" label-for="name-input" invalid-feedback="Name is required" :state="nameState">
        <b-form-input id="name-input" v-model="bookData.name" :state="nameState" required></b-form-input>
      </b-form-group>
      <b-form-group label="Page" label-for="page-input" invalid-feedback="Page is required" :state="pageState">
        <b-form-input
          type="number"
          id="page-input"
          v-model="bookData.pages"
          :state="pageState"
          min="0"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Author" label-for="author-select">
        <treeselect
          :options="
            allAuthors.map((author) => ({
              id: author.id,
              label: author.name,
            }))
          "
          v-model="bookData.author_id"
          :disabled="disableAuthor"
        >
          <div slot="author-label" slot-scope="{ node }">{{ node.raw.customLabel }}</div>
        </treeselect>
      </b-form-group>
    </form>
    <template #modal-footer>
      <b-button variant="success" @click="handleSave()"> Save </b-button>
      <b-button variant="danger" @click="handleCancel()"> Cancel </b-button>
    </template>
  </b-modal>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
  components: { Treeselect },
  data() {
    return {
      pageState: null,
      nameState: null,
      showBookModal: false,
      bookData: {
        name: '',
        pages: 0,
        author_id: null,
      },
    };
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    titleModal: {
      type: String,
      default: '',
    },
    disableAuthor: {
      type: Boolean,
      default: false,
    },
    selectedBook: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  watch: {
    showModal: function (val) {
      this.showBookModal = val;
    },
    selectedBook: function (val) {
      if (val.author_id > 0) {
        this.bookData.name = val.name;
        this.bookData.pages = val.pages;
        this.bookData.author_id = val.author_id;
      } else {
        this.bookData.name = '';
        this.bookData.pages = 0;
        this.bookData.author_id = null;
      }
    },
  },
  computed: {
    allAuthors() {
      return this.$accessor.author.allAuthors;
    },
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      this.pageState = this.bookData.pages > 0;
      return valid & this.pageState;
    },
    handleCancel() {
      this.nameState = null;
      this.pageState = null;
      this.$accessor.book.setSelectedBook({});
      this.$emit('closeModal');
    },
    async handleSave() {
      if (!this.checkFormValidity()) {
        return;
      }

      if (this.titleModal === 'Create') {
        await this.$accessor.book.createBook(this.bookData);
      } else {
        await this.$accessor.book.updateBook({ book_id: this.selectedBook.id, bookData: this.bookData });
      }

      await this.$accessor.book.getAllBooks();
      await this.$accessor.author.getAllAuthors();
      this.bookData = {
        name: '',
        pages: 0,
        author_id: null,
      };
      this.$emit('closeModal');
    },
  },
};
</script>
