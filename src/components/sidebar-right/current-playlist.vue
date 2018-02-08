<template>
  <v-container grid-list-sm>
    <v-layout xs12 row wrap>
      <transition-group name="slide-fade" mode="in-out">
        <current-playlist-item
        v-for="(song, index) in aPlaylist"
        :song="song"
        :index="index"
        :key="song.trackID"
        ></current-playlist-item>
        <!-- <current-playlist-item
        :song="$store.getters.current_song"
        :index="$store.getters.current_Index"
        :key="$store.getters.current_song.trackID"
        ></current-playlist-item> -->
      </transition-group>
      <infinite-loading distance="420" v-if="aPlaylist.length" class="flex xs12" ref="infiniteLoading2"  @infinite="infiniteHandler" spinner="default">
        <span slot="no-results">
          End of the line kiddo
        </span>
        <span slot="no-more">
          End of the line kiddo
        </span>
        <span slot="spinner">
          <v-flex class="text-xs-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </v-flex>
        </span>
      </infinite-loading>
    </v-layout>
  </v-container>
</template>

<script>
import item from './current-playlist-item'
// import vueNiceScrollbar from 'vue-nice-scrollbar'
import InfiniteLoading from 'vue-infinite-loading'
import { mapGetters } from 'vuex'
export default {
  name: 'current-playlist',
  data () {
    return {
      numberOfItems: 5,
      infState: ''
    }
  },
  watch: {
    hash () {
      this.infState.reset()
      this.numberOfItems = 5
    }
  },
  components: {
    'infinite-loading': InfiniteLoading,
    'current-playlist-item': item
  },
  computed: {
    ...mapGetters({
      hash: 'hash'
    }),
    aPlaylist () {
      return this.$store.getters.current_Playlist.slice(this.$store.getters.index, this.$store.getters.index + this.numberOfItems)
      // return this.$store.getters.current_Playlist.slice(this.$store.getters.index, this.$store.getters.index + this.$store.getters.current_Playlist.length)
    }
  },
  methods: {
    infiniteHandler ($state) {
      this.numberOfItems += 5
      var tmp = Math.min(this.$store.getters.current_Playlist.length, this.$store.getters.index + this.numberOfItems)
      // alert(tmp)
      if (tmp === this.$store.getters.current_Playlist.length) {
        $state.complete()
      } else {
        $state.loaded()
      }
      this.infState = $state
      // alert('11')
      // this.numberOfItems = Math.min(this.$store.getters.current_Playlist.length, this.$store.getters.index + 5)
      // alert(this.$store.getters.current_Playlist.length - this.$store.getters.index + ' ' + this.numberOfItems)
      // // this.$nextTick(() => {
      // if (this.$store.getters.current_Playlist.length - this.$store.getters.index === this.numberOfItems) {
      //   $state.complete()
      // } else {
      // }
      // })
    },
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
  transition: all 2s;  
  /* transform: rotate3d(0, 1, 0, -180deg); */
}

.slide-fade-leave-active {
  transition: all 2s;
  /* transform: rotateY(-360deg); */
  /* transform: rotate3d(0, 1, 0, 18q0deg); */
}

.slide-fade-enter{
  transition: all .5s;
  /* transform: rotateY(360deg); */
  transition: all .5s;
  /* transform: rotate3d(1,2, -360deg, 360deg); */
  opacity: 1;
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