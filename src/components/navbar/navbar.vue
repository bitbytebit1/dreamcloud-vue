<template>
  <div class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand hidden-xs" href="#">DreamCloud</a>
        <div class="navbar-form pull-left">
          <search></search>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import search from './search'
export default {
  name: 'navbar',
  components: {
    'search': search
  },
  data () {
    return {
      msg: 'Welcome the real Trinity'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
