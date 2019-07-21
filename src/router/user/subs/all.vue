<template>
  <v-flex 
    xs12 
    lg10 
    class="mb-5"
  >
    <v-flex 
      v-if="subscriptions.length" 
      xs12
      py-3
    >
      <span 
        v-if="subscriptions.length > 0"
      >
        <!-- Show/Hide -->
        <v-chip 
          @click="bTog = !bTog"
        >{{ bTog ? 'Hide' : 'Show' }}</v-chip>
        <!-- All -->
        <v-chip 
          :class="chips.length == subscriptions.length ? 'primary white--text': ''"
          @click="chips.length != subscriptions.length ? chips = subscriptions : chips = []"
        >All</v-chip>
        <v-chip 
          :class="bShuf ? 'primary white--text': ''"
          @click="chips = shuffle(subscriptions)"
        >Random</v-chip>
        <!-- @click="(bShuf = !bShuf, bShuf ? chips = shuffle(subscriptions): chips = [])" -->
        <!-- Clear -->
        <v-chip 
          @click="chips = []"
        >Clear</v-chip>
      </span>
      <br>
      <!-- CHIPS -->
      <v-chip         
        v-for="(item, index) in subscriptions"
        v-show="bTog" 
        :key="index"
        :class="someChips(item)"
        class="noSel"
        @mousedown="hai(item, index)"
      >
        <v-avatar outclass="accent white--text">
          <img :src="item.img">
      </v-avatar>{{ item.name }}</v-chip>
      <div 
        v-if="bTog && subscriptions.length > 50 "
      >
        <!-- Show/Hide -->
        <v-chip 
          @click="bTog = !bTog"
        >{{ bTog ? 'Hide' : 'Show' }}</v-chip>
        <!-- All -->
        <v-chip 
          :class="chips.length == subscriptions.length ? 'primary white--text': ''"
          @click="chips.length != subscriptions.length ? chips = subscriptions : chips = []"
        >All</v-chip>
        <v-chip 
          :class="bShuf ? 'primary white--text': ''"
          @click="chips = shuffle(subscriptions)"
        >Random</v-chip>
        <!-- @click="(bShuf = !bShuf, bShuf ? chips = shuffle(subscriptions): chips = [])" -->
        <!-- Clear -->
        <v-chip 
          @click="chips = []"
        >Clear</v-chip>
      </div>
      <!-- END_CHIPS -->


    </v-flex>
    <playlist 
      :songs="aFiltered" 
      :show-uploaded="!0" 
      rows-per-page="126" 
      sort-by="uploaded" 
      @conmen="$emit('conmen', $event)"
    />


    <jumbo 
      v-if="!bLoading && subscriptions.length > 0"
      title="We wanted grab the latest songs from your subscriptions"
      subheading="But you haven't subscribed to anyone yet"
    />
  </v-flex>
</template>
<script>
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'

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
      bShuf: false,
      aShuf: [],
      bLoading: true,
      bFailed: false,
      bLoadedSubs: 0,
      aPlaylists: [],
      aPlaylists2: [],
      subscriptions: [],
      chips: [],
      chipsToGo: [],
      bTog: true
    }
  },
  computed: {
    ...mapState({
      auth_state: state => state.user.auth_state,
    }),
    ...mapGetters(['textColor']),
    aFiltered () {
      return this.chips.length ? 
        this.aPlaylists.filter(f => 
          this.chips.some(c => c.id == f.artistID)
        )
        : [] // this.aPlaylists
    }
  },
  methods: {
    shuffle(source) {
      let ret = []
      // let leng = (source.length - 1) / (Math.max(2, Math.floor(Math.random() * source.length - 1))) | 0; // get a quater or a third of subscriptions
      let leng = (Math.floor(Math.random() * (source.length / 2) + 1))
      for (var i = 0; i < leng; i++) {
        var j = i + Math.floor(Math.random() * (source.length - i));
        ret[i] = source[j];
      }
      return ret;
    },
    someChips (e) { 
      if (this.chips.some(c => c['.key'] == e['.key'])) {
        return `primary ${this.textColor}`
      } else {
        return false
      }
    },
    // hai (e) {
    //   // if we have a suspect chip remove it, otherwise puush 2 chipsToGo
    //   if (this.someChips(e)) {
    //     if(this.chipsToGo.length == 1){
    //       this.chipsToGo = []
    //     } else {
    //       this.chips = this.chips.filter(item => item !== e)
    //       this.chipsToGo = this.chipsToGo.filter(item => item !== e)
    //     }
    //   } else {
    //     this.chipsToGo.push(e)
    //   }
    // },
    hai (e) {
      // if we have a suspect chip remove it, otherwise puush 2 chipsToGo
      if (this.someChips(e)) {
        if(this.chips.length == 1){
          this.chips = []
        } else {
          this.chips = this.chips.filter(item => item !== e)
        }
      } else {
        this.chips.push(e)
      }
    },
    bind () {
      // only bind if logged in
      if (this.auth_state) {
        // On done call getAllSubs
        this.bLoading = true
        // this.$store.dispatch('loadIndeterm', true)
        this.$bindAsArray('subscriptions', this.$DCFB.subscriptionGet(this.user).orderByChild('name_lower'), null, () => {
          // this.chips = this.shuffle(this.subscriptions)
          this.getAllSubs()
        })
      }
    },
    getAllSubs () {
      if (!this.subscriptions.length) {
        this.bLoading = false
        this.bFailed = true
        // this.$router.push({name: 'searchQuery', params: {query: '%20%20', source: 'YouTube'}})
        return
      }
      this.bLoadedSubs = 0
      let impatient = false
      setTimeout(() => {
        impatient = true
        this.aPlaylists = this.aPlaylists2
        // this.$store.commit('loadValue', 0)
        // this.$store.dispatch('loadIndeterm', false)
      }, 1000)
      for (var sub in this.subscriptions) {
        this.$DCAPI.searchInt(0, 0, [this.subscriptions[sub].source], this.subscriptions[sub].id, (songs) => {
          this.bLoadedSubs += 1
          // !impatient && this.$store.commit('loadValue', (100 / this.subscriptions.length) * this.bLoadedSubs)
          this.aPlaylists2 = this.aPlaylists2.concat(songs)
          this.aPlaylists2.sort(this.$DCAPI.sortDate)
          if (this.subscriptions.length === this.bLoadedSubs || impatient) {
            // !impatient && this.$store.commit('loadValue', 0)
            this.aPlaylists = this.aPlaylists2
          }
        }, false, 50)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
