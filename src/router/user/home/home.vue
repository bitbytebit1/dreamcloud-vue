<template>
  <v-flex 
    :lg10="viewSmall" 
    :lg12="!viewSmall" 
    xs12
  >
    <div 
      v-if="bLoading || aRecommended.length" 
      class="headline fwl text-xs-left pl-2 pt-2"
    >Home</div>
    <!-- <loading v-if="!auth_state || !aRecommended.length"></loading> -->
    <playlist 
      v-if="bLoading || aRecommended.length"
      :rows-per-page='rowsPerPage' 
      :show-uploaded="true" 
      :songs="aRecommended2" 
      @conmen="$emit('conmen', $event)"
    />
    <!-- title="Here is supposed to be a playlists generated from your recent history" -->
    <jumbo
      v-else-if="bFailed"
      title="We wanted to recommend you some music based on your history"
      subheading="But you haven't listened to any music yet"
    />
  </v-flex>
</template>
<script>
// import axios from 'axios'
/* eslint-disable */
import jumbo from '@/components/misc/jumbo'
import deleteButton from '@/components/buttons/delete-button'
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  components: {
    'jumbo': jumbo
  },
  props: {
    iLimit: {
      type: [Number],
      default: 200
    },
    rowsPerPage: {
      type: [Number],
      default: 100
    }
  },
  data () {
    return {
      bLoading: false,
      bFailed: false,
      iLoaded: 1,
      aRecommended: [],
      bLoaded: false,
      viewSmall: this.$route.name === 'home'
    }
  },
  watch: {
    'auth_state': {
      immediate: true,
      handler: 'bind'
    },
  },
  methods: {
    bind () {
      if (this.auth_state) {
        this.bFailed = false
        this.$store.commit('loadActive', true)
        this.$bindAsArray('aHistory', this.$DCFB.fbhistory.limitToLast(this.iLimit), null, this.getRecommended)
      }
    },
    getRecommended () {
      if (!this.aHistory.length) {
        this.$store.commit('loadActive', false)
        this.bLoading = false
        this.bFailed = !this.aHistory.length
        return
      }
      this.bLoading = true
      // promise array
      var aAjax = []
      // reverse firebase array
      var aRecommended = this.aHistory.reverse()
      // strip out duplicates
      // reset counter
      this.iLoaded = 1
      let un = (array) => {
        var ret = []
        // ret.push(array[0])
        var dupe = false
        for (let i = 0; i < array.length - 1; i++) {
          dupe = false
          for (let n = 0; n < ret.length - 1; n++) {
            if (typeof array[i] === 'undefined' || ret[n].trackID == array[i].trackID) {
              dupe = true
              break
            }
          }
          if (!dupe) {
            ret.push(array[i])
          }
          // console.log(`ARRAY LENGTH ${ret.length} ||| CHECKED INDEX ${array[i].title} ||| dupe ${dupe}`)
        }
        return ret
      }
      aRecommended = un(aRecommended)

      // loop through history array
      for (var i = 0; i < aRecommended.length - 1; i++) {
        // get 2 recommended songs for each item in history
        aAjax.push(this.$DCAPI.searchInt('', 0, [aRecommended[i].source], aRecommended[i].trackID, (d) => {
          this.iLoaded++
          this.$store.commit('loadValue',  (100 / aRecommended.length) * this.iLoaded)
          if (d.length) {
            this.aRecommended.push(d[0])
            if (d.length > 1 ) {
              this.aRecommended.push(d[1])
            }
          }
        }, true, 2))
      }
      
      this.bLoading = false
      setTimeout(() => {
        this.$store.commit('loadActive', false)
      }, 200)
      // console.log('haaaai1', aAjax)
      // axios.all(aAjax).then(() => {
      //   console.log('haaaai2')
      //   this.bLoading = false
      //   setTimeout(() => {
      //     this.$store.commit('loadActive', false)
      //   }, 200)
      // })
    }
  },
  computed: {
    ...mapGetters({auth_state: 'auth_state'}),
    aRecommended2 () {
      return this.bLoading ? [] : this.aRecommended
    }
  },
  destroyed () {
    this.$store.commit('loadActive', false)
  }
}
</script>

<style>
</style>
