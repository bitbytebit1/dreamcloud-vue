<template>
  <div id="search-results" class="container-fluid">
    <div class="row">
      <div class="well">
        <button class="btn btn-primary" @click='sort'>Sort Date</button>
      </div>
      <playlist-item
        v-for="(song, index) in songs"
        v-bind:song="song"
        v-bind:index="index"
        v-bind:key="index"
      >
      </playlist-item>
      <iframe :src="iframeSrc"></iframe>
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
      msg: 'Welcome to the playlist Trinity',
      iframeSrc: ''
    }
  },
  methods: {
    play: function (index) {
      this.$DCPlayer.setNPlay(this.songs, index)
    },
    setIframeSrc: function (sURL) {
      this.iframeSrc = sURL
    },
    sort: function () {
      this.songs.sort(this.$DCAPI.sortDate)
    }
  }
}
</script>

<style>
img[lazy=loading] {
  background-image: url("./img/loading.gif");
}
#search-results{
  margin-bottom: 10px
}
iframe{
  display: none;
}
</style>
