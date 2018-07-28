<template>
  <v-flex xs12 lg10 flexbox :key="$route.params.playlist">
    <div class="headline fwl text-xs-left pl-2 pt-2">Library</div>
    <playlist sortBy="uploaded" :showUploaded="!0" :songs="aSongs" rowsPerPage="84"></playlist>
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
  props: ['user'],
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
      this.userlist.reverse()
      for (const i1 in this.userlist) {
        // all.push.apply(all, this.aPlaylists[i1].songs)
        // all = all.concat(this.aPlaylists[i1].songs)
        for (const i2 in this.userlist[i1].songs) {
          this.aSongs.push(this.userlist[i1].songs[i2])
        }
        this.$store.commit('loadValue', (100 / this.userlist.length) * i1)
      }
      setTimeout(() => {
        this.$store.commit('loadActive', false)
      }, 350)
    },
    bind () {
      // only bind if logged in
      if (this.auth_state) {
        // this.$bindAsArray('userlist', this.$DCFB.playlists, null, this.allSongs)
        this.$store.commit('loadActive', true)
        this.$bindAsArray('userlist', this.$DCFB.playlistGetAll(this.user), null, this.allSongs)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
