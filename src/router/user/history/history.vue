<template>
  <v-flex xs12 lg10>
    <div class="headline fwl text-xs-left pl-2 pt-2">History</div>
    <!-- <loading v-if="!auth_state || !aHistory.length"></loading> -->
    <playlist rowsPerPage='84' :songs="aHistRev"></playlist>
  </v-flex>
</template>
<script>
/* eslint-disable */
import loading from '@/components/misc/loading'
import deleteButton from '@/components/buttons/delete-button'
import { mapGetters } from 'vuex'
export default {
  props: ['user'],
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
    // 'user': {
    //   handler: 'bind',
    //   immediate: true
    // },s
    'auth_state': {
      handler: 'bind',
      immediate: true
    }
  },
  methods: {
    bind () {
      if (this.auth_state) {
        this.$store.dispatch('loadIndeterm', true)
        this.$bindAsArray('aHistory', this.$DCFB.history.limitToLast(200), null, () => { this.$store.dispatch('loadIndeterm', false) })
      }
    }
  },
  computed: {
    ...mapGetters({auth_state: 'auth_state'}),
    aHistRev () {
      return this.$UTILS.uniqueArray([...this.aHistory].reverse())
    }
  },
  created () {
    this.bind()
  }
}
</script>

<style>
</style>
