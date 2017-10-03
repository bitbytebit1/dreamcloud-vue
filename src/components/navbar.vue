<template>
  <div class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand hidden-xs" href="#">DreamCloud</a>
        <a class="navbar-brand visible-xs" href="#">DC</a>
        <div class="navbar-form pull-left">
          <search></search>
        </div>
      </div>
      <div class="navbar-collapse collapse">
        <ul class="nav navbar-nav navbar-right">
          <li style="display:none"><a data-toggle="tab" id="search-results-tab" href="#search-results">Search</a></li>
        </ul>
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
