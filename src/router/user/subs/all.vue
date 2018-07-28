<template>
  <v-flex xs12 lg10 flexbox :key="$route.params.playlist">
    <div class="headline fwl text-xs-left pl-2 pt-2">Latest from your subscriptions</div>

    <!-- <loading v-if="!auth_state || !allSongs.length"></loading> -->
    <!-- <loading v-if="!auth_state || aPlaylists.length === 0"></loading> -->
    <!-- <div v-if="!auth_state || !aPlaylists.length || (100 / subscriptions.length) * bLoadedSubs < 97"> -->
      <!-- <v-progress-linear :value="Math.floor((100 / subscriptions.length) * bLoadedSubs)" height="5" color="primary"></v-progress-linear> -->
      <!-- Loaded {{bLoadedSubs}} of {{subscriptions.length}} -->
      <!-- <br> -->
      <!-- {{Math.floor((100 / subscriptions.length) * bLoadedSubs)}} -->
    <!-- </div> -->
    <playlist :songs="aPlaylists" :showUploaded="!0" sortBy="uploaded" rowsPerPage="50"></playlist>

  </v-flex>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: ['user'],
  name: 'subsAll',
  watch: {
    'auth_state': 'bind'
  },
  created () {
    this.bind()
  },
  data () {
    return {
      bLoadedSubs: 0,
      aPlaylists: [],
      aPlaylists2: [],
      subscriptions: []
    }
  },
  computed: {
    ...mapGetters({auth_state: 'auth_state'})
  },
  methods: {
    bind () {
      // only bind if logged in
      if (this.auth_state) {
        // On done call getAllSubs
        this.$store.dispatch('loadIndeterm', true)
        this.$bindAsArray('subscriptions', this.$DCFB.subscriptionGet(this.user), null, this.getAllSubs)
      }
    },
    getAllSubs () {
      if (!this.subscriptions.length) {
        this.$router.push({name: 'searchPage', params: {query: '%20%20', source: 'YouTube'}})
        return
      }
      this.bLoadedSubs = 0
      let impatient = false
      setTimeout(() => {
        impatient = true
        this.aPlaylists = this.aPlaylists2
        this.$store.commit('loadValue', 0)
        this.$store.dispatch('loadIndeterm', false)
      }, 3000)
      for (var sub in this.subscriptions) {
        this.$DCAPI.searchInt(0, 0, [this.subscriptions[sub].source], this.subscriptions[sub].id,
          (songs) => {
            this.bLoadedSubs += 1
            !impatient && this.$store.commit('loadValue', (100 / this.subscriptions.length) * this.bLoadedSubs)
            this.aPlaylists2 = this.aPlaylists2.concat(songs)
            this.aPlaylists2.sort(this.$DCAPI.sortDate)
            if (this.subscriptions.length === this.bLoadedSubs || impatient) {
              !impatient && this.$store.commit('loadValue', 0)
              this.aPlaylists = this.aPlaylists2
            }
          }, false, 5)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
