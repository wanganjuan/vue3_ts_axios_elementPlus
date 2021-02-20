<template>
  <h1>{{ count }}</h1>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const count = ref(0)
    return {
      count
    }
  }
})
</script>

<style lang="stylus">
h1
 color $success
</style>
