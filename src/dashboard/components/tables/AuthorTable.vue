<template>
  <div>
    <b-table
      :fields="fields"
      :items="tableData"
      :per-page="perPage"
      :current-page="currentPage"
      responsive="sm"
      outlined
      hover
      @row-clicked="handleClickRow"
    >
      <template #cell(name)="data">
        {{ data.item.name }}
      </template>
      <template #cell(books)="data"> {{ data.item.books.length }} </template>
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
          key: 'name',
          sortable: true,
          thStyle: { width: '50%' },
        },
        {
          key: 'books',
          sortable: true,
          thStyle: { width: '50%' },
        },
      ],
      currentPage: 1,
      perPage: 10,
    };
  },
  props: {
    tableData: {
      type: Array[Object],
      default: function () {
        return [];
      },
    },
  },
  computed: {
    totalRows() {
      return this.tableData.length;
    },
  },
  methods: {
    handleClickRow(item) {
      this.$accessor.author.setSelectedAuthor(item);
      this.$emit('selectAuthor');
    },
  },
};
</script>
