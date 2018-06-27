<template>
	<v-flex xs12 lg10 class="mb-2">
		<!-- subsAll -->
		<!-- <v-flex xs12 v-if="aSubscriptionsRoot.length">
			<router-link :class="textClass" :to="{name:'subsAll', params: {user: $DCFB.UID}}">
				<h2 class="text-xs-left">Latest from your subscriptions</h2>
			</router-link>
			<div v-if="!auth_state || !aSubscriptionsRoot.length || (100 / aSubscriptionsRoot.length) * bLoadingSubs < 90">
				<div v-if="bLoadingSubs">
					<v-progress-linear :value="Math.floor((100 / aSubscriptionsRoot.length) * bLoadingSubs)" height="5" color="primary"></v-progress-linear>
					Loaded {{bLoadingSubs}} of {{aSubscriptionsRoot.length}}
				</div>
			</div>
			<div v-else class="mb-2">
				<playlist :rowsPerPage='iSub' :showUploaded="true" :full="false" :gridView="true" :songs="aSubscriptions"></playlist>
				<v-flex xs12>
					<v-btn block class="pointer" @click="iSub += iMore">SHOW MORE</v-btn>
				</v-flex>
			</div>
			<v-divider v-if="!bLoadingSubs"  class="mt-4 mb-4"></v-divider>
		</v-flex> -->

		<!-- Recommended -->
		<router-link :class="textClass" :to="{name:'historyRecommended', params: {user: $DCFB.UID}}">
			<h2 class="text-xs-left">Recommended</h2>
		</router-link>
		<div class="mb-2">
			<historyRecommended :iLimit="iReco" :rowsPerPage='iReco' @done='bRecoShow = true'></historyRecommended>
			<v-btn v-if="bRecoShow" block class="pointer" @click="iReco += iMore">SHOW MORE</v-btn>
		</div>
		<v-divider color="primary" class="mt-4 mb-4"></v-divider>

		<!-- History -->
		<router-link :class="textClass" :to="{name:'history', params: {user: $DCFB.UID}}">
			<h2 class="text-xs-left">Recently played</h2>
		</router-link>
		<loading v-if="!auth_state || !aHistory.length"></loading>
		<div v-else class="mb-2">
			<playlist :rowsPerPage='iHist' :full="false" :gridView="true" :songs="aHistRev"></playlist>
			<v-btn block class="pointer" @click="iHist += iMore">SHOW MORE</v-btn>
		</div>

	</v-flex>
</template>
<script>
// /* eslint-disable */
import loading from '@/components/misc/loading'
import historyRecommended from '@/router/user/history/recommended'
import { mapGetters } from 'vuex'
export default {
  name: 'history',
  components: {
    'loading': loading,
    'historyRecommended': historyRecommended
  },
  data () {
    return {
      bLoadingSubs: 0,
      bRecoShow: false,
      iHist: 12,
      iMore: 16,
      iReco: 12,
      iSub: 12,
      aHistory: [],
      aSubscriptions: [],
      aSubscriptionsRoot: []
    }
  },
  watch: {
    'auth_state': 'bind'
  },
  methods: {
    bind () {
      if (this.auth_state) {
        this.$bindAsArray('aHistory', this.$DCFB.history)
        // this.$bindAsArray('aSubscriptionsRoot', this.$DCFB.subscriptionGet(this.$DCFB.UID), null, this.getAllSubs)
      }
    },
    getAllSubs () {
      this.bLoadingSubs = 0
      // console.log(this.aSubscriptionsRoot.length)
      for (var sub in this.aSubscriptionsRoot) {
        this.$DCAPI.searchInt(0, 0, [this.aSubscriptionsRoot[sub].source], this.aSubscriptionsRoot[sub].id,
          (songs) => {
            this.bLoadingSubs++
            this.aSubscriptions = this.aSubscriptions.concat(songs)
            this.aSubscriptions.sort(this.$DCAPI.sortDate)
            // this.aSubscriptions = this.aSubscriptions.slice(0, 8)
          }, false, 8)
      }
    }
  },
  computed: {
    ...mapGetters({
      auth_state: 'auth_state',
      nightMode: 'nightMode'
    }),
    aHistRev () {
      // eslint-disable-next-line
      return this.$UTILS.uniqueArray([...this.aHistory].reverse())
    },
    textClass () {
      return 'home-link grey--text text--' + (this.nightMode ? 'lighten' : 'darken') + '-2'
    }
  },
  created () {
    this.bind()
  }
}
</script>

<style>
.home-link{
  text-decoration: none;
}
</style>
