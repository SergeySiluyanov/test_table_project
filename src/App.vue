<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import "/assets/scss/main";
</style>
