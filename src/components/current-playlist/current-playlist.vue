<template>
    <v-container grid-list-sm>
        <v-layout xs12 row wrap id="current-playlist">
          <current-playlist-item
          v-for="(song, index) in $store.getters.current_Playlist"
          :song="song"
          :index="index"
          :key="index"
          ></current-playlist-item>
        </v-layout>
    </v-container>
</template>

<script>
import VueScrollTo from 'vue-scrollto'
import item from './current-playlist-item'
export default {
  name: 'current-playlist',
  watch: {
    '$store.getters.index': 'scrollToCurrent'
  },
  data () {
    return {
      msg: 'Welcome to the real Trinity'
    }
  },
  components: {
    'current-playlist-item': item
  },
  methods: {
    scrollToCurrent: function () {
      var opt = {
        container: '#current-playlist',
        easing: 'ease-in',
        x: false,
        y: true
      }
      VueScrollTo.scrollTo('#s' + this.$store.getters.current_Index, 500, opt)
      console.log('changed')
    },
    play: function (index) {
      this.$DCPlayer.play(index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
