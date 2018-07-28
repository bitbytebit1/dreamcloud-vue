<template>
  <!-- <v-container grid-list-sm> -->
  <v-layout xs12 row wrap class="sideright">
    <transition-group name="slide-fade">
      <current-playlist-item
        v-for="(song, index) in aPlaylist"
        :song="song"
        :index="index"
        :key="song.trackID + (index + $store.getters.index)"
      ></current-playlist-item>
      <!-- <current-playlist-item
        :song="$store.getters.current_song"
        :index="$store.getters.current_Index"
        :key="$store.getters.current_song.trackID"
        ></current-playlist-item> -->
    </transition-group>
    <infinite-loading v-if="aPlaylist.length" class="flex xs12" ref="infiniteLoading2"  @infinite="infiniteHandler" spinner="default" :distance="600">
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
  <!-- </v-container> -->
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
      this.numberOfItems = 5
      if (this.infState) {
        this.infState.reset()
      }
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
      if (tmp === this.$store.getters.current_Playlist.length) {
        $state.complete()
      } else {
        $state.loaded()
      }
      this.infState = $state
    },
    play (index) {
      this.$store.commit('changeIndex', index)
      this.$DCPlayer.playIndex(index)
      this.$DCFB.historyPush(this.$store.getters.current_song)
    }
  }
}
</script>
<style>

  /* TRANSITIONS */
  .slide-fade-item{
    transition: all .4s ease;
  }
  /* ENTER */
  .slide-fade-enter{
    opacity: 0;
    /* transform: translateY(-294px); */
  }
  .slide-fade-enter-active {
    transition: all 1s ease-in;
  }
  .slide-fade-enter-to{
    opacity: 1;
  }

  /* LEAVE */

  .slide-fade-leave {

  }
  .slide-fade-leave-active {
    position: absolute;
  }
  .slide-fade-leave-to {
    opacity: 0;
    /* transform: translateY(-294px); */
  }
</style>