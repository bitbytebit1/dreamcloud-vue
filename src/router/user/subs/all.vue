<template>
  <v-flex 
    xs12 
    lg10 
    flexbox
  >
    <v-combobox
      v-model="chips"
      :items="subscriptions"
      :value-comparator="(a, b) => a = b"
      label="Subscriptions"
      item-text="name"
      item-value="artistID"
      chips
      clearable
      single-line
      prepend-icon="filter_list"
      multiple
      deletable-chips
    />
    <!-- <div 
      v-if="bLoading || aPlaylists2.length" 
      class="headline fwl text-xs-left pl-2 pt-2"
    >Latest from your subscriptions</div> -->

    <playlist 
      v-if="bLoading || aFiltered.length" 
      :songs="aFiltered" 
      :show-uploaded="!0" 
      sort-by="uploaded" 
      rows-per-page="50"
    />

    <jumbo 
      v-else
      title="We wanted grab the latest songs from your subscriptions"
      subheading="But you haven't subscribed to anyone yet"
    />
  </v-flex>
</template>
<script>
import { mapGetters } from 'vuex'

import jumbo from '@/components/misc/jumbo'
export default {
  name: 'SubsAll',
  props: {
    user: {
      type: String,
      default: ''
    }
  },
  components: {
    'jumbo': jumbo
  },
  watch: {
    auth_state: {
      immediate: true,
      handler: 'bind'
    }
  },
  data () {
    return {
      bLoading: true,
      bFailed: false,
      bLoadedSubs: 0,
      aPlaylists: [],
      aPlaylists2: [],
      subscriptions: [],
      chips: [],
    }
  },
  computed: {
    ...mapGetters({auth_state: 'auth_state'}),
    aFiltered () {
      return this.chips.length ? 
        this.aPlaylists.filter(f => 
          this.chips.some(c => c.id == f.artistID)
        )
        : this.aPlaylists
    }
  },
  methods: {
    bind () {
      // only bind if logged in
      if (this.auth_state) {
        // On done call getAllSubs
        this.bLoading = true
        this.$store.dispatch('loadIndeterm', true)
        this.$bindAsArray('subscriptions', this.$DCFB.subscriptionGet(this.user), null, this.getAllSubs)
      }
    },
    getAllSubs () {
      if (!this.subscriptions.length) {
        this.bLoading = false
        this.bFailed = true
        // this.$router.push({name: 'searchPage', params: {query: '%20%20', source: 'YouTube'}})
        return
      }
      // console.log(this.aFiltered)
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
        }, false, 20)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
