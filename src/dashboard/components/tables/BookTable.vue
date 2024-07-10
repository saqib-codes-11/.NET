<template>
  <div>
    <b-table
      :fields="fields"
      :items="bookList"
      :per-page="perPage"
      :current-page="currentPage"
      responsive="sm"
      outlined
      hover
      @row-clicked="handleClickRow"
    >
      <template #cell(id)="data">
        {{ data.item.id }}
      </template>
      <template #cell(name)="data">
        {{ data.item.name }}
      </template>
      <template #cell(pages)="data"> {{ data.item.pages }} </template>
      <template #cell()="data">
        <div v-if="action">
          <b-button size="sm" variant="warning" @click="handleDelete(data)"> Delete </b-button>
        </div>
        <div v-else>{{ data.item.author_name }}</div>
      </template>
    </b-table>

    <b-pagination
      v-if="totalRows > 0"
      v-model="currentPage"
      pills
      :total-rows="totalRows"
      :per-page="perPage"
      aria-controls="author-table"
    ></b-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true,
          thStyle: { width: '20%' },
        },
        {
          key: 'name',
          sortable: true,
          thStyle: { width: '30%' },
        },
        {
          key: 'pages',
          sortable: true,
          thStyle: { width: '20%' },
        },
        {
          key: this.action ? 'action' : 'author_name',
          sortable: true,
          thStyle: { width: '30%' },
        },
      ],
      currentPage: 1,
      perPage: 10,
      editingBook: {},
      bookList: [],
      modalShow: false,
    };
  },
  props: {
    bookData: {
      type: Array[Object],
      default: function () {
        return [];
      },
    },
    action: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.bookList = this.bookData;
  },
  watch: {
    bookData: function (val) {
      this.bookList = val;
    },
  },
  computed: {
    totalRows() {
      return this.bookData.length;
    },
  },
  methods: {
    handleClickRow(item) {
      this.$accessor.book.setSelectedBook(item);
      this.$emit('selectBook');
    },
    async handleDelete({ item }) {
      const response = await this.$accessor.book.deleteBook(item.id);
      this.bookList = this.bookList.filter(function (el) {
        return el.id != item.id;
      });
      this.$accessor.author.getAllAuthors();
    },
  },
};
</script>
