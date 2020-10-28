<template>
  <div class="table">
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
  computed: {
    ...mapGetters({
      tableById: 'table/itemById',
    }),
    currentTable() {
      return this.tableById(this.pickedId);
    },
    pickedId() {
      return this.$route.params.id;
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
