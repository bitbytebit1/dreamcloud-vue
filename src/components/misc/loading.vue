<template>
  <v-flex xs12 v-show="show" class="loading">
    <infinite-loading :ref="reff" @infinite="infiniteHandler" :spinner="spinner">
      <span slot="no-more"></span>
      <span v-if="!spinner" slot="spinner"></span>
    </infinite-loading>
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
    },
    customSpinner: {
      type: [Boolean],
      default: false
    },
    infiniteHandler: {
      type: [Function],
      default: () => {}
    },
    reff: {
      type: [String],
      default: 'inf'
    }
  },
  components: {
    'infinite-loading': InfiniteLoading
  }
}
</script>

<style>
.loading{
  position: fixed;
  left: 50%
}
</style>
