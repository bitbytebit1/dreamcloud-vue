<template>
  <div id="search-results" class="container-fluid">
    <div class="row">
      <playlist-item
        v-for="(song, index) in songs"
        v-bind:song="song"
        v-bind:index="index"
        v-bind:key="index"
      >
      </playlist-item>
    </div>
  </div>
</template>
<script>
import playlistItem from './playlistItem.vue'
export default {
  name: 'playlist',
  props: ['songs'],
  components: {
    'playlistItem': playlistItem
  },
  data () {
    return {
      msg: 'Welcome to the playlist Trinity'
    }
  },
  methods: {
    play: function (index) {
      this.$DCPlayer.setNPlay(this.songs, index)
    }
  }
}
</script>

<style>
img[lazy=loading] {
  background-image: url("./img/loading.gif");
}
</style>
