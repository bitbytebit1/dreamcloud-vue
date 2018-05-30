<template>
  <v-flex xs12 :lg10="viewSmall" :lg12="!viewSmall">
    <loading v-if="!auth_state || !aRecommended.length"></loading>
    <playlist v-else :rowsPerPage='rowsPerPage' :showUploaded="true" :full="viewSmall" :gridView="true" :songs="aRecommended"></playlist>
  </v-flex>
</template>
<script>
import axios from 'axios'
/* eslint-disable */
import loading from '@/components/misc/loading'
import deleteButton from '@/components/misc/delete-button'
import { mapGetters } from 'vuex'
export default {
  name: 'history',
  components: {
    'loading': loading
  },
  props: {
    iLimit: {
      type: [Number],
      default: 0
    },
    rowsPerPage: {
      type: [Number],
      default: 8
    },
    outAr: {
      type: [Array],
      default: []
    }
  },
  data () {
    return {
      aHistory: [],
      aRecommended: [],
      viewSmall: this.$route.name === 'historyRecommended'
    }
  },
  watch: {
    'auth_state': 'bind'
  },
  methods: {
    bind () {
      if (this.auth_state) {
        this.$bindAsArray('aHistory', this.$DCFB.history, null, this.getRecommended)
      }
    },
    getRecommended () {
      var aRecommended = this.aHistory.reverse()
      if (this.iLimit) {
        this.$emit('done', aRecommended.length)
        aRecommended = aRecommended.slice(0, this.iLimit)
      }
      var aAjax = []
      for (var i = 0; i < aRecommended.length; i++) {
        aAjax.push(this.$DCAPI.searchInt('', 0, [aRecommended[i].source], aRecommended[i].trackID, (d) => {
          if (aRecommended.some((el => d[0] === el))){
            d.shift() // remove first from res if duplicate
            // console.log('removing dupe')
          }
          // if (d.length > 1 && d[0].trackID === aRecommended[i].trackID) {
          // }
          this.aRecommended.push(d[0])
          this.aRecommended.push(d[1])
        }, true, 3))
        axios.all(aAjax).then(() => {
          this.aRecommended= this.$UTILS.uniqueArray(this.aRecommended)
          // if (this.iLimit) {
            // // this.aRecommended = this.aRecommended.slice(0, this.iLimit)
          // }
        })
      }
    }
  },
  computed: {
    ...mapGetters({auth_state: 'auth_state'})
  },
  created () {
    this.bind()
  }
}
</script>

<style>
</style>
