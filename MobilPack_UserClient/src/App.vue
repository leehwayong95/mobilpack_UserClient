<template>
  <div id="app">
      <router-view/>
      <router-view name="top"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import url('./assets/css/reset');
  @import url('./assets/css/content');
  @import url('./assets/css/common');
  @import url('./assets/css/style');
body {
  background: #eee;
}
</style>
