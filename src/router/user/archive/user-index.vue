<template>
  <v-flex xs12 lg10 flexbox :key="this.$route.params.playlist">
    <h3>{{name}}</h3>
    <!-- <playlist :songs="aSongs"></playlist> -->
  </v-flex>
</template>
<script>


export default {
  name: 'userPlaylist',
  props: ['user', 'playlist', 'name'],
  components: {
    'playlist': playlist
  },
  watch: {
    '$route.params': 'bind'
  },
  created () {
    // this.bind(this.user, this.playlist)
  },
  data () {
    return {
      aSongs: []
    }
  },
  methods: {
    bind (usr, plylist) {
      this.$bindAsArray('aSongs', this.$DCFB.playlistGet(this.$route.params.user, this.$route.params.playlist))
    },
    _routChanged () {
      this.$unbind('aSongs')
      this.bind(this.$route.params.user, this.$route.params.playlist)
    }
  }
  // firebase () {
  //   return {
  //     aSongs: this.$DCFB.playlistGet(this.$route.params.user, this.$route.params.playlist)
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
