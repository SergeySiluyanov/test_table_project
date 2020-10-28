<template>
  <div class="table">
    <div class="table__btn">
        <CustomButton text="Добавить строку" @click="addRow" class="btn" />
        <CustomButton text="Добавить колонку" @click="addColumn" class="btn" />
    </div>
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
import CustomButton from '@/components/common/Button.vue'

export default {
  name: 'Home',
  components: {
    CustomButton
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
    addRow() {
      this.$store.dispatch('row/add', this.pickedId)
    },
    addColumn() {
      this.$store.dispatch('column/add', this.pickedId)
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/color.scss";
  .table {
    &__btn {
      .btn {
        background: $bg_green;
        margin-bottom: 10px;
      }
    }
  }
</style>
