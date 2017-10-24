<template>
  <v-container grid-list-sm>
    <v-layout xs12 row wrap>
      <transition-group name="slide-fade">
        <current-playlist-item
        v-for="(song, index) in aPlaylist"
        :song="song"
        :index="index"
        :key="song.trackID"
        ></current-playlist-item>
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
    aPlaylist: function () {
      return this.$store.getters.current_Playlist.slice(this.$store.getters.index)
    }
  },
  methods: {
    play: function (index) {
      this.$store.commit('changeIndex', index)
      this.$DCPlayer.playIndex(index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.slide-fade-enter-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter{
  transform: translateX(100px);
}

.slide-fade-leave-to{
  transform: translateY(-100px);
  opacity: 0;
}

.slide-fade-move {
  transition: transform 1s;
}
</style>