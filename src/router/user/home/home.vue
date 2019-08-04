<template>
  <v-flex 
    :lg10="viewSmall" 
    :lg12="!viewSmall" 
    xs12
  >
    <div 
      v-if="!bFailed" 
      class="headline fwl text-xs-left pl-2 pt-2"
    >Recommended</div>
    <!-- <loading v-if="!auth_state || !aRecommended.length"></loading> -->
    <playlist 
      v-if="!bFailed" 
      :show-uploaded="true"
      :songs="aRecommended2" 
      infinite 
      @conmen="$emit('conmen', $event)"
    />
    <!-- title="Here is supposed to be a playlists generated from your recent history" -->
    <!-- <jumbo
    
      v-else-if="bFailed"
      title="We wanted to recommend you some music based on your history"
      subheading="But you haven't listened to any music yet"
    /> -->
    <template 
      v-else
    >      
      <div 
        class="headline fwl text-xs-left pl-2 pt-2"
      >Explore</div>
      <genres />
    </template>
  </v-flex>
</template>
<script>
import axios from 'axios'
/* eslint-disable */
import genres from '@/router/genres/genres'
import jumbo from '@/components/misc/jumbo'
import deleteButton from '@/components/buttons/delete-button'
import { mapState } from 'vuex'
export default {
  name: 'home',
  components: {
    'genres': genres,
    'jumbo': jumbo
  },
  props: {
    iLimit: {
      type: [Number],
      default: 150
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
        // this.$store.commit('loadActive', true)
        this.$bindAsArray('aHistory', this.$DCFB.fbhistory.limitToLast(this.iLimit), null, this.getRecommended)
      }
    },
    getRecommended () {
      if (!this.aHistory.length) {
        // this.$store.commit('loadActive', false)
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

      aRecommended = this.$DCAPI.uniqueArray(aRecommended)

      // loop through history array
      for (var i = 0; i < aRecommended.length - 1; i++) {
        // get 2 recommended songs for each item in history
        aAjax.push(this.$DCAPI.searchInt('', 0, [aRecommended[i].source], aRecommended[i].trackID, (d) => {
          this.iLoaded++
          this.$store.commit('loadValue',  (100 / aRecommended.length) * this.iLoaded)
          if (d.length) {
            this.aRecommended.push(...d)
            // if (d.length > 1 ) {
              // this.aRecommended.push(d[1])
            // }
          }
        }, true, 6))
      }
      axios.all(aAjax).then(() => {
        this.aRecommended = this.$DCAPI.uniqueArray(this.aRecommended)
      })
      
      this.bLoading = false
      // setTimeout(() => {
      //   this.$store.commit('loadActive', false)
      // }, 200)
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
    ...mapState({
      auth_state: state => state.user.auth_state,
    }),
    aRecommended2 () {
      return this.bLoading ? [] : this.aRecommended
    }
  },
  destroyed () {
    // this.$store.commit('loadActive', false)
  }
}
</script>

<style>
</style>
