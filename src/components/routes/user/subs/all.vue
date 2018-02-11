<template>
  <v-flex xs12 lg10 flexbox :key="$route.params.playlist">
    <loading v-if="!auth_state || !allSongs.length"></loading>
    <playlist v-else :songs="aPlaylists" rowsPerPage="84"></playlist>

  </v-flex>
</template>
<script>
import loading from '@/components/misc/loading'
import { mapGetters } from 'vuex'
export default {
  name: 'subs-all',
  watch: {
    'auth_state': 'bind'
  },
  created () {
    this.bind()
  },
  data () {
    return {
      aPlaylists: [],
      subscriptions: []
    }
  },
  components: {
    'loading': loading
  },
  computed: {
    ...mapGetters({auth_state: 'auth_state'}),
    allSongs () {
      var results = []
      for (var sub in this.subscriptions) {
        results.push(this.$DCAPI.searchInt(0, 0, [this.subscriptions[sub].source], this.subscriptions[sub].id,
        (songs) => {
          this.aPlaylists = this.aPlaylists.concat(songs)
        }, false, 25).then(() => {
          this.loading = false
        }))
      }
      return results
    }
  },
  methods: {
    bind () {
      // only bind if logged in
      if (this.auth_state) {
        this.$bindAsArray('subscriptions', this.$DCFB.subscriptions)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
