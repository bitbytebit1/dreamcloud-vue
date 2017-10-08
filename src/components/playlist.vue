<template>
  <div id="search-results" class="container-fluid">
    <div class="row">
      <div class="well">
        <button class="btn btn-primary" @click='sort'>Sort Date</button>
        <button class="btn btn-primary" @click='toggleView'>Toggle Playlist View</button>
      </div>
      <playlistItemNormal v-if="!toggle"
        v-for="(song, index) in songs"
        v-bind:song="song"
        v-bind:index="index"
        v-bind:key="index"
      >
      </playlistItemNormal>
      <playlistItemList v-if="toggle"
        v-for="(song, index) in songs"
        v-bind:song="song"
        v-bind:index="index"
        v-bind:key="index"
      >
      </playlistItemList>
      <iframe :src="iframeSrc"></iframe>
    </div>
  </div>
</template>
<script>
import playlistItemNormal from './playlistItemNormal.vue'
import playlistItemList from './playlistItemList.vue'

export default {
  name: 'playlist',
  props: ['songs'],
  components: {
    'playlistItemNormal': playlistItemNormal,
    'playlistItemList': playlistItemList
  },
  data () {
    return {
      msg: 'Welcome to the playlist Trinity',
      iframeSrc: '',
      toggle: false
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
    },
    toggleView: function () {
      if (!this.toggle) this.toggle = true
      else this.toggle = false
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
