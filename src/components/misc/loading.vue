<template>
  <v-flex xs12 v-if="show">
    <infinite-loading :spinner="spinner"></infinite-loading>
  </v-flex>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading'
export default {
  name: 'loading',
  props: {
    show: {
      type: [Boolean],
      required: true
    },
    spinner: {
      type: [String],
      default: 'default'
    }
  },
  components: {
    'infinite-loading': InfiniteLoading
  }
}
</script>

<style>
</style>
