<template>
  <v-flex xs12 lg10 flexbox :key="$route.params.playlist">
    <loading v-if="!auth_state || !aSongs.length"></loading>
    <playlist v-else :songs="aSongs" rowsPerPage="-1"></playlist>

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
      userlist: [],
      aSongs: []
    }
  },
  components: {
    'loading': loading
  },
  computed: {
    ...mapGetters({auth_state: 'auth_state'})
  },
  methods: {
    allSongs () {
      for (const i1 in this.userlist) {
        // all.push.apply(all, this.aPlaylists[i1].songs)
        // all = all.concat(this.aPlaylists[i1].songs)
        for (const i2 in this.userlist[i1].songs) {
          this.aSongs.push(this.userlist[i1].songs[i2])
        }
      }
    },
    bind () {
      // only bind if logged in
      if (this.auth_state) {
        this.$bindAsArray('userlist', this.$DCFB.playlists, null, this.allSongs)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
