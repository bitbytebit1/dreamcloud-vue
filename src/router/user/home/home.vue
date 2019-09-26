<template>
  <v-flex 
    xs12
    lg10
  >
    <div 
      class="headline fwl text-xs-left pl-2 pt-2"
    >Recommended</div>
    <playlist 
      :show-uploaded="true"
      :songs="aRecommended" 
      infinite 
      @conmen="$emit('conmen', $event)"
    />
  </v-flex>
</template>
<script>
import axios from 'axios'
// /* eslint-disable */
import jumbo from '@/components/misc/jumbo'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    'jumbo': jumbo
  },
  data () {
    return {
      iLimit: this.$vuetify.breakpoint.xsOnly ? 3 : 10,
      sLastTrack: '',
      aRecommended: [],
      aHistory: [],
      bLoaded: false,
    }
  },
  watch: {
    'auth_state': {
      immediate: true,
      handler: 'bind'
    },
  },
  activated () {
    this.bind()
  },
  methods: {
    bind() {
      if (this.auth_state) {
        // this.$store.commit('loadActive', true)
        this.$bindAsArray('aHistory', this.$DCFB.fbhistory.limitToLast(10), null, () => {
          if (this.aHistory[0].trackID != this.sLastTrack) {
            this.aRecommended = []
            this.getRecommended()
            console.log('getting history')
          } else
            console.log('NOT getting history')
        })
      }
    },
    getRecommended () {
      if (!this.aHistory.length) {
        this.$DCAPI.searchInt(' ', 0, ['YouTube'], false, (d) => {
          if (d.length) {
            this.aRecommended.push(...this.$DCAPI.uniqueArray(d))
          }
        }, false, 50)
        return
      }
      // promise array
      var aAjax = []
      // reverse firebase array
      // strip out duplicates
      // this.iLoaded = 1

      const aRecommended = this.$DCAPI.uniqueArray(this.aHistory.reverse()).slice(0, this.iLimit)
      let temp = []
      // loop through history array
      for (var i = 0; i < aRecommended.length - 1; i++) {
        // get 2 recommended songs for each item in history
        aAjax.push(this.$DCAPI.searchInt('', 0, [aRecommended[i].source], aRecommended[i].trackID, (d) => {
          if (d.length) {
            temp = this.$DCAPI.uniqueArray([...temp, ...d])
            this.aRecommended.push(...temp)
          }
        }, true, 25))
      }
      temp = []
      axios.all(aAjax).then(() => {
        this.aRecommended = this.$DCAPI.uniqueArray(this.aRecommended)
        this.sLastTrack = this.aRecommended[0].trackID
      })
    }
  },
  computed: {
    ...mapState({
      auth_state: state => state.user.auth_state,
    })
  },
}
</script>

<style>
</style>
