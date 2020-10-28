<template>
  <div class="tableItem" @click="handleClick">
    <span class="tableItem__name">{{titleTable}}</span>
    <button class="tableItem__delete" @click="deleteTable">Удалить таблицу</button>
  </div>
</template>

<script>
export default {
  name: 'ListTableItem',
  props: {
    titleTable: String,
    id: Number,
  },
  methods: {
    handleClick() {
      this.$router.push(`/table/${this.id}`);
    },
    deleteTable() {
      this.$store.dispatch('table/delete', this.id)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/scss/color.scss";
  .tableItem {
    align-items: center;
    background: $bg_white;
    box-shadow: 0 5px 10px rgba($bg_black, 0.4);
    border: 1px solid rgba($bg_black, 0.4);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    padding: 10px;
    text-transform: uppercase;
    transition: all .3s ease;
    width: 100%;
    margin: 0 5px 10px;

    &:hover {
      background: $bg_black;
      color: $color_white;
      box-shadow: none;
    }

    &__delete {
      border: none;
    }
  }
</style>
