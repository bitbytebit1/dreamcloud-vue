<template>
  <v-flex xs12 lg10>
    <!-- History -->
    <router-link :class="textClass" :to="{name:'history', params: {user: $DCFB.UID}}">
      <h2 class="text-xs-left">Recently played</h2>
    </router-link>
    <loading v-if="!auth_state || !aHistory.length"></loading>
    <div v-else class="mb-2">
      <playlist rowsPerPage='8' :full="false" :gridView="true" :songs="aHistory"></playlist>
      <!-- <router-link class="grey--text text--lighten-2" :to="{name:'history', params: {user: $DCFB.UID}}"><h5 class="text-xs-left">SHOW MORE</h5></router-link> -->
      <!-- <v-btn class="pointer grey--text text--lighten-1" @click="incHistory()">SHOW MORE</v-btn> -->
    </div>
    <v-divider color="teal" class="mt-4 mb-4 teal"></v-divider>
    <!-- subsAll -->
    <router-link :class="textClass" :to="{name:'subsAll', params: {user: $DCFB.UID}}">
      <h2 class="text-xs-left">Latest from your subscriptions</h2>
    </router-link>
    <loading v-if="!auth_state || !aSubscriptions.length"></loading>
    <div v-else class="mb-2">
      <playlist rowsPerPage='8' :showUploaded="true" :full="false" :gridView="true" :songs="aSubscriptions"></playlist>
    </div>
    <v-divider color="teal" class="mt-4 mb-4 teal"></v-divider>

    <!-- Recommended -->
    <router-link :class="textClass" :to="{name:'historyRecommended', params: {user: $DCFB.UID}}">
      <h2 class="text-xs-left">Recommended</h2>
    </router-link>
    <div class="mb-2">
      <historyRecommended :iLimit="8"></historyRecommended>
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
    incHistory () {
      this.iHistory = this.iHistory + 8
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
