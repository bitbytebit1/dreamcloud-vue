<template>
  <v-flex xs12 lg10 flexbox :key="$route.params.playlist">
    <loading v-if="!auth_state || !allSongs.length"></loading>
    <playlist v-else :songs="allSongs" rowsPerPage="84"></playlist>

  </v-flex>
</template>
<script>
import loading from '@/components/misc/loading'
import { mapGetters } from 'vuex'
export default {
  name: 'playlistsAll',
  watch: {
    'auth_state': 'bind'
  },
  created () {
    this.bind()
  },
  data () {
    return {
      aPlaylists: []
    }
  },
  components: {
    'loading': loading
  },
  computed: {
    ...mapGetters({auth_state: 'auth_state'}),
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
  methods: {
    bind () {
      // only bind if logged in
      if (this.auth_state) {
        this.$bindAsArray('aPlaylists', this.$DCFB.playlists)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
