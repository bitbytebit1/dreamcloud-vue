<template>
  <v-flex xs12 lg10 flexbox :key="this.$route.params.playlist">
    <h3>{{name}}</h3>
    <playlist :songs="aSongs1"></playlist>
  </v-flex>
</template>
<script>
import { DCFB } from '@/DCAPIs/DCFB.js'
export default {
  name: 'userPlaylist',
  props: ['user', 'playlist', 'name'],
  watch: {
    '$route.params.user': 'bind',
    '$route.params.playlist': 'bind'
  },
  created: function () {
    this.bind(this.user, this.playlist)
  },
  data () {
    return {
      aSongs1: []
    }
  },
  methods: {
    bind: function (usr, plylist) {
      this.$bindAsArray('aSongs1', DCFB.playlistGet(this.$route.params.user, this.$route.params.playlist))
    },
    _routChanged: function () {
      this.$unbind('aSongs1')
      this.bind(this.$route.params.user, this.$route.params.playlist)
    }
  }
  // firebase: function () {
  //   return {
  //     aSongs: DCFB.playlistGet(this.$route.params.user, this.$route.params.playlist)
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
