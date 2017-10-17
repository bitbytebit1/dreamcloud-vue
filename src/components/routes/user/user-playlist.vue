<template>
  <div :index="playlist" :key="this.$route.params.user">
    <h3>/u/{{user}}/{{playlist}}</h3>
    <playlist :songs="aSongs1"></playlist>
  </div>
</template>
<script>
import { DCFB } from '@/plugins/Firebase.js'
export default {
  name: 'userPlaylist',
  props: ['user', 'playlist'],
  watch: {
    '$route.params.user': 'bind',
    '$route.params.playlist': 'bind'
  },
  created: function () {
    this.bind()
  },
  data () {
    return {
      aSongs1: []
    }
  },
  methods: {
    bind: function () {
      this.$bindAsArray('aSongs1', DCFB.getPlaylist(this.$route.params.user, this.$route.params.playlist))
    }
  }
  // firebase: function () {
  //   return {
  //     aSongs: DCFB.getPlaylist(this.$route.params.user, this.$route.params.playlist)
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
