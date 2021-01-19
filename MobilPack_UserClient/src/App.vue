<template>
  <div id="app">
      <router-view name="top"/>
      <router-view/>
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
</style>
