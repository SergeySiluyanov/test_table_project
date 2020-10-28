<template>
  <div class="tableItem" @click="handleClick">
    <span>{{titleTable}}</span>
  </div>
</template>

<script>
export default {
  name: 'ListTableItem',
  props: {
    titleTable: String,
    id: String,
  },
  methods: {
    handleClick() {
      this.$router.push(`/table/${this.id}`);
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
  }
</style>
