<template>
  <div class="?">
    <h1>{{ x1 }}</h1>
  </div>
</template>
<script>
// /* eslint-disable */
import deleteButton from '@/components/misc/delete-button'
export default {
  name: 'x',
  components: {
    'delete-button': deleteButton
  },
  data () {
    return {
      x1: 'deleteme?'
    }
  },
  methods: {
    x2 () {

    }
  },
  computed: {
    x3 () {
      
    }
  }
}
</script>

<style>
</style>
