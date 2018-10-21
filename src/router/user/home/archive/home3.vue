<template>
  <v-flex 
    xs12 
    lg10 
    class="mb-2"
  >
    <genres/>
    <!-- <div class="headline fwl text-xs-left">Popular Artists</div> -->
    <!-- <div class="headline fwl text-xs-left">Recent playlists</div> -->

  </v-flex>
</template>
<script>
// /* eslint-disable */
import genres from '@/router/user/home/genres'
import { mapGetters } from 'vuex'
export default {
  name: 'History',
  components: {
    'genres': genres
  },
  data () {
    return {
    }
  },
  watch: {
    'auth_state': {
      immediate: true,
      handler: 'bind'
    }
  },
  methods: {
    bind () {
    }
  },
  computed: {
    ...mapGetters({
      auth_state: 'auth_state'
    })
  },
  created () {
    // this.bind()
  },
  updated () {
    // this.$store.dispatch('loadIndeterm', false)
  }
}
</script>

<style>
.home-link{
  text-decoration: none;
}
</style>
