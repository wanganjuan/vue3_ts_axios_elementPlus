<template>
  <div class="m-contain">
    <Nav />
    <div
      class="m-content"
      :class="{ 'm-content-project': $route.path.includes('/project') }"
    >
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Nav from './nav/nav.vue'
export default {
  name: 'main-layout',
  components: {
    Nav
  }
}
</script>

<style lang="stylus" scoped>
.m-contain
  min-height 100vh
  position relative
  .m-content
    position absolute
    top 0
    left 64px
    padding-left 24px
    padding-right 24px
    bottom 0
    right 0
    overflow auto
    overflow-x hidden
    &.m-content-project
      padding 0
</style>
