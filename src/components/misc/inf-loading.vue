<template>
  <v-flex 
    v-show="show" 
    xs12 
    class="loading"
  >
    <infinite-loading 
      :ref="reff" 
      :spinner="spinner" 
      @infinite="infiniteHandler"
    >
      <span slot="no-more"/>
      <span 
        v-if="!spinner" 
        slot="spinner"
      />
    </infinite-loading>
  </v-flex>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading'
export default {
  name: 'Loading',
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
