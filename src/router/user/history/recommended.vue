<template>
  <v-flex xs12 :lg10="viewSmall" :lg12="!viewSmall">
    <div class="headline fwl text-xs-left pl-2 pt-2">Home</div>
    <!-- <loading v-if="!auth_state || !aRecommended.length"></loading> -->
    <playlist :rowsPerPage='rowsPerPage' :showUploaded="true" :songs="aRecommended2"></playlist>
  </v-flex>
</template>
<script>
import axios from 'axios'
/* eslint-disable */
import loading from '@/components/misc/loading'
import deleteButton from '@/components/buttons/delete-button'
import { mapGetters } from 'vuex'
export default {
  name: 'recommended',
  components: {
    'loading': loading
  },
  props: {
    iLimit: {
      type: [Number],
      default: 100
    },
    rowsPerPage: {
      type: [Number],
      default: 100
    }
  },
  data () {
    return {
      bWait: true,
      iLoaded: 1,
      aRecommended: [],
      viewSmall: this.$route.name === 'historyRecommended'
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
        this.$store.commit('loadActive', true)
        this.$bindAsArray('aHistory', this.$DCFB.history.limitToLast(this.iLimit), null, this.getRecommended)
      }
    },
    getRecommended () {
      var aRecommended = this.aHistory.reverse()
      if (this.iLimit) {
        aRecommended = aRecommended.slice(0, this.iLimit)
      }
      aRecommended = this.$UTILS.uniqueArray(aRecommended)
      var aAjax = []
      for (var i = 0; i < aRecommended.length - 1; i++) {
        aAjax.push(this.$DCAPI.searchInt('', 0, [aRecommended[i].source], aRecommended[i].trackID, (d) => {
          this.iLoaded++
          if (d.length) {
            this.aRecommended.push(d[0])
            this.aRecommended.push(d[1])
          }

          this.$store.commit('loadValue',  (100 / aRecommended.length) * this.iLoaded)

        }, true, 2))
      }
      axios.all(aAjax).then(() => {
        this.aRecommended = this.$UTILS.uniqueArray(this.aRecommended)
        this.bWait = false
        setTimeout(() => {
          this.$store.commit('loadActive', false)
        }, 200)
      })
    }
  },
  computed: {
    ...mapGetters({auth_state: 'auth_state'}),
    aRecommended2 () {
      return this.bWait ? [] : this.aRecommended
    }
  }
}
</script>

<style>
</style>
