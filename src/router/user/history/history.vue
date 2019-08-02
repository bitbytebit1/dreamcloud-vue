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
      infinite
      @conmen="$emit('conmen', $event)"
    />
    <jumbo
      v-else-if="bFailed && $route.name === 'history'"
      title="Here is supposed to be your history"
    >
      {{ $store.getters.isAnon ? `We won't log your history unless you` : 'Why not listen to some music?' }}
      <router-link 
        v-if="$store.getters.isAnon" 
        :to="{name: 'login'}"
      >login</router-link>
    </jumbo>
  </v-flex>
</template>
<script>
/* eslint-disable */
import jumbo from '@/components/misc/jumbo'
import deleteButton from '@/components/buttons/delete-button'
import { mapState } from 'vuex'
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
        // this.$store.dispatch('loadIndeterm', true)
        this.bFailed = false
        this.$bindAsArray('aHistory', this.$DCFB.fbhistory.limitToLast(300), null, () => { 
          // this.$store.dispatch('loadIndeterm', false)
          this.bLoading = false
          this.bFailed  = !!this.aHistory
        })
      }
    }
  },
  computed: {
    ...mapState({
      auth_state: state => state.user.auth_state,
    }),
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
