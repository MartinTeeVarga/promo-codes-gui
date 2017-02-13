<template>
  <div>
      <div class="row">
        <div class="search">
          <span class="fa fa-search"></span>
          <input class="u-full-width" type="text" placeholder="Search..." id="filterBox" v-model="searchInput">
        </div>
      </div>
    <table class="u-full-width">
      <thead>
      <tr>
        <th v-for="columnDefinition in columns"
            @click="sortBy(columnDefinition.key)"
            :class="{ active: sortKey == columnDefinition.key }">
          {{ columnDefinition.name }}
        <span v-if="sortKey == columnDefinition.key"
              :class="sortOrders[columnDefinition.key] > 0 ? 'fa fa-caret-up' : 'fa fa-caret-down'"></span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="entry in filteredData">
        <td v-for="columnDefinition in columns">
          {{ dynamicFilter(entry[columnDefinition.key], columnDefinition.filter) }}
        </td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <th :colspan="columns.length" class="centered">
          <button v-if="data.length > limit" v-on:click="limit += 10">Show more</button>
          <button v-if="data.length > limit" v-on:click="limit = data.length">Show all</button>
        </th>
      </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
  import _ from 'lodash';

  export default {
    props: {
      data: Array,
      columns: Array,
      initialSortKey: String
    },
    data: function () {
      var sortOrders = {};
      this.columns.forEach(function (columnDefinition) {
        sortOrders[columnDefinition.key] = 1;
      });
      return {
        searchInput: '',
        filterKey: '',
        debouncedFilterKey: '',
        limit: 10,
        sortKey: this.initialSortKey,
        sortOrders: sortOrders
      };
    },
    computed: {
      filteredData: function () {
        var sortKey = this.sortKey;
        var filterKey = this.filterKey && this.filterKey.toLowerCase();
        var order = this.sortOrders[sortKey] || 1;
        var data = this.data;
        if (filterKey) {
          data = data.filter(function (row) {
            return Object.keys(row).some(function (key) {
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
            });
          });
        }
        if (sortKey) {
          data = data.slice().sort(function (a, b) {
            a = a[sortKey];
            b = b[sortKey];
            return (a === b ? 0 : a > b ? 1 : -1) * order;
          });
        }
        return data.slice(0, this.limit);
      }
    },
//  filters: {
//
//  },
    watch: {
      searchInput: function () {
        this.debounceInput();
      }
    },
    methods: {
      sortBy: function (key) {
        this.sortKey = key;
        this.sortOrders[key] = this.sortOrders[key] * -1;
      },
      dynamicFilter: function (str, filterName) {
        if (filterName === 'localDate') {
          return new Date(str).toLocaleString();
        } else {
          return str;
        }
      },
      debounceInput: _.debounce(function () {
        this.filterKey = this.searchInput;
      }, 500)
    }
  };
</script>

<style scoped>
  .search {
    position: relative;
  }

  .search input {
    text-indent: 30px;
  }

  .search .fa-search {
    position: absolute;
    top: 10px;
    left: 7px;
  }
</style>
