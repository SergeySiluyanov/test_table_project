<template>
  <div class="table">
    <ul>
      <li v-for="table in list" :key="table.id" @click="pickedId = table.id">{{table.id}}</li>
    </ul>
    <div v-if="currentTable">
      <table>
        <tr v-for="(row, i) in currentTable" :key="i">
          <td v-for="(cell, j) in row" :key="j">
            <input type="text" :value="cell" @change="({ currentTarget }) => updateTable(i, j, currentTarget.value)">
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
  },
  data: () => ({
    pickedId: null,
  }),
  computed: {
    ...mapGetters({
      list: 'table/list',
      tableById: 'table/itemById',
    }),
    currentTable() {
      return this.tableById(this.pickedId);
    },
  },
  methods: {
    updateTable(x, y, val) {
      this.$store.dispatch('table/update', {
        id: this.pickedId,
        cells: [{ x, y, val }]
      });
    },
  }
}
</script>
