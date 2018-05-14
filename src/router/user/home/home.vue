<template>
  <v-flex xs12 lg10>
    <!-- subsAll -->
    <router-link :class="textClass" :to="{name:'subsAll', params: {user: $DCFB.UID}}">
      <h2 class="text-xs-left">Latest from your subscriptions</h2>
    </router-link>
    <loading v-if="!auth_state || !aSubscriptions.length"></loading>
    <div v-else class="mb-2">
      <playlist :rowsPerPage='iSub' :showUploaded="true" :full="false" :gridView="true" :songs="aSubscriptions"></playlist>
      <v-flex xs12>
        <v-btn block color="transparent" class="pointer" @click="iSub += iMore">SHOW MORE</v-btn>
      </v-flex>
      <!-- <router-link class="grey--text text--lighten-2" :to="{name:'history', params: {user: $DCFB.UID}}"><h5 class="text-xs-left">SHOW MORE</h5></router-link> -->
    </div>
    <v-divider color="teal" class="mt-4 mb-4 teal"></v-divider>

    <!-- Recommended -->
    <router-link :class="textClass" :to="{name:'historyRecommended', params: {user: $DCFB.UID}}">
      <h2 class="text-xs-left">Recommended</h2>
    </router-link>
    <div class="mb-2">
      <historyRecommended :iLimit="iReco" :rowsPerPage='iReco'></historyRecommended>
      <v-btn block class="pointer" @click="iReco += iMore">SHOW MORE</v-btn>
    </div>
    <v-divider color="transparent" class="mt-4 mb-4 teal"></v-divider>

    <!-- History -->
    <router-link :class="textClass" :to="{name:'history', params: {user: $DCFB.UID}}">
      <h2 class="text-xs-left">Recently played</h2>
    </router-link>
    <loading v-if="!auth_state || !aHistory.length"></loading>
    <div v-else class="mb-2">
      <playlist :rowsPerPage='iHist' :full="false" :gridView="true" :songs="aHistory"></playlist>
      <v-btn block color="transparent" class="pointer" @click="iHist += iMore">SHOW MORE</v-btn>
      <!-- <router-link class="grey--text text--lighten-2" :to="{name:'history', params: {user: $DCFB.UID}}"><h5 class="text-xs-left">SHOW MORE</h5></router-link> -->
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
        this.$bindAsArray('aHistory', this.$DCFB.history, null, () => { this.aHistory = this.$UTILS.uniqueArray(this.aHistory.reverse()) })
        this.$bindAsArray('aSubscriptionsRoot', this.$DCFB.subscriptionGet(this.$DCFB.UID), null, this.getAllSubs)
      }
    },
    getAllSubs () {
      for (var sub in this.aSubscriptionsRoot) {
        this.$DCAPI.searchInt(0, 0, [this.aSubscriptionsRoot[sub].source], this.aSubscriptionsRoot[sub].id,
          (songs) => {
            this.aSubscriptions = this.aSubscriptions.concat(songs)
            this.aSubscriptions.sort(this.$DCAPI.sortDate)
            // this.aSubscriptions = this.aSubscriptions.slice(0, 8)
          }, false, 8)
      }
    },
    inSub () {
      this.iSub += this.iMore
      alert()
    }
  },
  computed: {
    ...mapGetters({
      auth_state: 'auth_state',
      nightMode: 'nightMode'
    }),
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
