<template>
  <table class="u-full-width">
    <thead>
    <tr>
      <th v-for="columnDefinition in columns"
          @click="sortBy(columnDefinition.key)"
          :class="{ active: sortKey == columnDefinition.key }">
        {{ columnDefinition.name }}
        <span :class="sortOrders[columnDefinition.key] > 0 ? 'fa fa-caret-up' : 'fa fa-caret-down'"></span>
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
  </table>
</template>

<script>
  export default {
    props: {
      data: Array,
      columns: Array,
      filterKey: String
    },
    data: function () {
      var sortOrders = {};
      this.columns.forEach(function (columnDefinition) {
        sortOrders[columnDefinition.key] = 1;
      });
      return {
        sortKey: '',
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
        return data;
      }
    },
//  filters: {
//
//  },
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
      }
    }
  };
</script>
