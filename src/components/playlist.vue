<template>
  <div id="search-results" class="container-fluid">
    <div class="row">
      <div class="well">
        <button class="btn btn-primary" @click='sort'>Sort Date</button>
        <button class="btn btn-primary" @click='toggleView'>Toggle Playlist View</button>
      </div>
      <playlistItemNormal v-if="toggle"
        v-for="(song, index) in songs"
        v-bind:song="song"
        v-bind:index="index"
        v-bind:key="index"
      >
      </playlistItemNormal>
      <table v-if="!toggle" class="tablesorter table table-hover table-condensed sortable-table" style="border:1px;">
        <tr>
          <th><p class="text-center">Title</p></th>
          <th><p class="text-center">Bild</p></th>
          <th><p class="text-center">Artist</p></th>
          <th><p class="text-center">Uploaded</p></th>
          <th><p class="text-center">Duration</p></th>
        </tr>
        <playlistItemList
          v-for="(song, index) in songs"
          v-bind:song="song"
          v-bind:index="index"
          v-bind:key="index"
        >
        </playlistItemList>
      </table>
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
      this.$store.commit('setNPlay', {songs: this.songs, current: index, path: this.$route.path})
      this.$DCPlayer.setNPlay(this.songs, index)
    },
    setIframeSrc: function (sURL) {
      this.iframeSrc = sURL
    },
    sort: function () {
      this.songs.sort(this.$DCAPI.sortDate)
    },
    toggleView: function () {
      this.toggle = !this.toggle
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
  display: none
}
</style>
