<template>
  <v-flex xs12 lg10 flexbox :key="$route.params.playlist">
    <playlist :songs="allSongs"></playlist>
  </v-flex>
</template>
<script>
import playlist from '@/components/playlist/playlist'

export default {
  name: 'playlistsAll',
  components: {
    'playlist': playlist
  },
  data () {
    return {
      aPlaylists: []
    }
  },
  computed: {
    allSongs () {
      let all = []
      for (const i1 in this.aPlaylists) {
        // all.push.apply(all, this.aPlaylists[i1].songs)
        // all = all.concat(this.aPlaylists[i1].songs)
        for (const i2 in this.aPlaylists[i1].songs) {
          all.push(this.aPlaylists[i1].songs[i2])
        }
      }
      return all
    }
  },
  firebase () {
    return {
      aPlaylists: this.$DCFB.playlists
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
