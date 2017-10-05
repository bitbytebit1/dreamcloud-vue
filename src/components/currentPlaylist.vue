<template>
  <div class="current-playlist">
    <!-- <h1>{{ msg }}</h1> -->
  </div>
</template>
<script>

export default {
  // name: 'currentPlayist',
  props: ['songs', 'current'],
  data () {
    return {
      msg: 'Welcome to the real Trinity'
    }
  },
  mounted: function () {
    console.log('mounted currentPlaylist')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
