<template>
	<v-flex xs12 lg10 flexbox :key="$route.params.playlist">
		<!-- <loading v-if="!auth_state || !allSongs.length"></loading> -->
		<!-- <loading v-if="!auth_state || aPlaylists.length === 0"></loading> -->
		<div v-if="!auth_state || !aPlaylists.length || (100 / subscriptions.length) * bLoadedSubs < 97">
			<v-progress-linear :value="Math.floor((100 / subscriptions.length) * bLoadedSubs)" height="5" color="primary"></v-progress-linear>
			<!-- Loaded {{bLoadedSubs}} of {{subscriptions.length}} -->
			<!-- <br> -->
			<!-- {{Math.floor((100 / subscriptions.length) * bLoadedSubs)}} -->
		</div>
		<playlist v-else :songs="aPlaylists" :showUploaded="!0" sortBy="uploaded" rowsPerPage="84"></playlist>

	</v-flex>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: ['user'],
  name: 'subs-all',
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
        this.$bindAsArray('subscriptions', this.$DCFB.subscriptionGet(this.user), null, this.getAllSubs)
      }
    },
    getAllSubs () {
			this.bLoadedSubs = 0
      for (var sub in this.subscriptions) {
        this.$DCAPI.searchInt(0, 0, [this.subscriptions[sub].source], this.subscriptions[sub].id,
          (songs) => {
						this.bLoadedSubs += 1
            this.aPlaylists = this.aPlaylists.concat(songs)
            this.aPlaylists.sort(this.$DCAPI.sortDate)
          }, false, 5)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
