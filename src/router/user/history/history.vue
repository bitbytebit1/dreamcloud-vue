<template>
  <v-flex 
    xs12 
    lg10
  >
    <div 
      v-if="bLoading || aHistRev.length" 
      class="headline fwl text-xs-left pl-2 pt-2"
    >History</div>
    <playlist 
      v-if="bLoading || aHistRev.length" 
      :songs="aHistRev" 
      rows-per-page='84'
      @conmen="$emit('conmen', $event)"
    />
    <jumbo
      v-else-if="bFailed && $route.name === 'history'"
      title="Here is supposed to be your history"
      subheading="But it looks like you haven't listened to any music yet"
    />
  </v-flex>
</template>
<script>
/* eslint-disable */
import jumbo from '@/components/misc/jumbo'
import deleteButton from '@/components/buttons/delete-button'
import { mapGetters } from 'vuex'
export default {
  props: ['user'],
  name: 'history',
  components: {
    'jumbo': jumbo
  },
  data () {
    return {
      aHistory: [],
      bLoading: false,
      bFailed: false
    }
  },
  watch: {
    'auth_state': {
      handler: 'bind',
      immediate: true
    }
  },
  methods: {
    bind () {
      if (this.auth_state) {
        this.$store.dispatch('loadIndeterm', true)
        this.bFailed = false
        this.$bindAsArray('aHistory', this.$DCFB.fbhistory.limitToLast(100), null, () => { 
          this.$store.dispatch('loadIndeterm', false)
          this.bLoading = false
          this.bFailed  = !this.aHistory.length
        })
      }
    }
  },
  computed: {
    ...mapGetters({auth_state: 'auth_state'}),
    aHistRev () {
      return this.$UTILS.uniqueArray([...this.aHistory].reverse())
    }
  },
  // created () {
    // this.bind()
  // }
}
</script>

<style>
</style>
