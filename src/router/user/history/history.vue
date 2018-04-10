<template>
  <v-flex xs12 lg10>
    <loading v-if="!auth_state || !aHistory.length"></loading>
    <playlist v-else rowsPerPage='84' :songs="aHistory"></playlist>
  </v-flex>
</template>
<script>
/* eslint-disable */
import loading from '@/components/misc/loading'
import deleteButton from '@/components/misc/delete-button'
import { mapGetters } from 'vuex'
export default {
  name: 'history',
  components: {
    'loading': loading
  },
  data () {
    return {
      aHistory: []
    }
  },
  watch: {
    'auth_state': 'bind'
  },
  methods: {
    bind () {
      if (this.auth_state) {
        this.$bindAsArray('aHistory', this.$DCFB.history, null, () => { this.aHistory = this.$UTILS.uniqueArray(this.aHistory.reverse()) })
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
