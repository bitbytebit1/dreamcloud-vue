<template>
  <v-container grid-list-sm>
    <v-layout xs12 row wrap>
      <transition-group name="slide-fade" mode="in-out">
        <current-playlist-item
        v-for="(song, index) in aPlaylist"
        :song="song"
        :index="index"
        :key="index"
        ></current-playlist-item>
        <!-- <current-playlist-item
        :song="$store.getters.current_song"
        :index="$store.getters.current_Index"
        :key="$store.getters.current_song.trackID"
        ></current-playlist-item> -->
      </transition-group>
    </v-layout>
  </v-container>
</template>

<script>
import item from './current-playlist-item'
// import vueNiceScrollbar from 'vue-nice-scrollbar'

export default {
  name: 'current-playlist',
  components: {
    'current-playlist-item': item
    // 'vueNiceScrollbar': vueNiceScrollbar
  },
  computed: {
    aPlaylist () {
      return this.$store.getters.current_Playlist.slice(this.$store.getters.index, this.$store.getters.index + (this.$UTILS.isMobile ? 1 : 5))
    }
  },
  methods: {
    play (index) {
      this.$store.commit('changeIndex', index)
      this.$DCPlayer.playIndex(index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.slide-fade-enter-active {
  /* transition: all 2s;   */
  /* transform: rotate3d(0, 1, 0, -180deg); */
}

.slide-fade-leave-active {
  /* transition: all 2s; */
  /* transform: rotateY(-360deg); */
  /* transform: rotate3d(0, 1, 0, 18q0deg); */
}

.slide-fade-enter{
  /* transition: all .5s; */
  /* transform: rotateY(360deg); */
  /* transition: all .5s; */
  /* transform: rotate3d(1,2, -360deg, 360deg); */
  /* opacity: 1; */
}

.slide-fade-leave-to{
  transition: all .5s;
  /* transform: rotate3d(1,2, -360deg, 360deg); */
  opacity: 0;
}

.slide-fade-move {
  transition: transform 1s;
}
</style>