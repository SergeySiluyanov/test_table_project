<template>
  <button
    :id="id"
    class="button"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <div class="button__text">
      {{ text }}
    </div>
  </button>
</template>

<script>
export default {
  name: 'customButton',
  props: {
    id: String,
    text: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isDisabled() {
      return this.disabled;
    },
  },
  methods: {
    handleClick(event) {
      if (!this.isDisabled) {
        this.$emit('click');
      } else {
        event.preventDefault();
      }
    },
  },
};
</script>

<style lang="scss">
  @import "../../assets/scss/color.scss";
  .button {
    padding: 10px;
    border: none;
    width: 100%;
  }
</style>
