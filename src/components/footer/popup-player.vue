<template>

  <v-expand-transition>
    <div 
      v-if="show_pop && $vuetify.breakpoint.mdAndUp" 
      :class="size" 
      class="pop" 
      xs12
    >
      <v-card 
        height="100%" 
        class="pop-card"
      >
        <!-- image and title containter -->
        <div 
          @contextmenu="$emit('conmen', [$event, [current_song]])"
          @click="()=>(this.$store.commit('show_pop', false), $router.push({name: 'auto', params: { artist: this.current_song.artist, trackID: this.current_song.trackID, source: this.current_song.source }}))"
        >
          <!-- IMAGE -->
          <v-img 
            :src="current_song.posterLarge" 
            :aspect-ratio="aspect" 
          >
            <!-- NEXT BUTTONS -->
            <div
              class="d-flex text-xs-center pointer"
              style="height: 100%;"
            >
              <v-layout 
                align-center
                justify-center
                row
              >
                <v-flex 
                  xs4 
                  @click.stop="$DCPlayer.previous()"
                > 
                  <!-- <v-layout 
                  align-center
                  justify-center
                  fill-height
                > -->
                  <v-btn 
                    icon 
                    dark 
                    class="full" 
                    x-large
                  >
                    <v-icon 
                      large
                    >skip_previous</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex 
                  xs4 
                  @click.stop="$DCPlayer.togglePlay()"
                > 
                  <!-- <v-layout 
                  align-center
                  justify-center
                  fill-height
                > -->
                  <v-btn 
                    icon
                    dark 
                    class="full" 
                    x-large
                  >
                    <v-icon large>{{ $store.getters.isPlaying ? 'pause' : 'play_arrow' }}</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex 
                  xs4 
                  @click.stop="$DCPlayer.next()"
                > 
                  <!-- <v-layout 
                  align-center
                  justify-center
                  fill-height
                > -->
                  <v-btn 
                    icon 
                    dark 
                    class="full"
                    x-large
                  >
                    <v-icon large>skip_next</v-icon>
                  </v-btn>
                </v-flex>
                <v-btn 
                  absolute
                  top
                  icon 
                  right
                  class="full"
                  style="top:5px;right:5px;"
                  @click.stop="$store.commit('show_pop', false)"
                >
                  <v-icon>close</v-icon>
                </v-btn>
              </v-layout>
            </div>
          </v-img>
          <!-- SONG INFO -->
          <v-layout 
            row 
            wrap 
            class="pointer" 
            @click="($router.push({name: 'auto', params: { artist: this.current_song.artist, trackID: this.current_song.trackID, source: this.current_song.source }}), this.$store.commit('show_pop', false))"
          >
            <v-flex 
              xs10 
              pa-3
            >
              <div class="subheading pop-title">{{ current_song.title }}</div>
              <div class="body-1 grey--text text--lighten-1">{{ current_song.artist }}</div>
            </v-flex>
            <!-- SHOW CURRENT PLAYLIST -->
            <v-flex 
              xs2 
              pa-3
              @click.stop="(showList = !showList, showList && scroll())"
            >
              <v-btn 
                mt-3
                icon 
                right
                x-large
              >
                <v-icon>{{ showList ? 'keyboard_arrow_down': 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </div>
        <!-- CURRENT PLAYLIST -->

        <v-list 
          v-show="showList" 
          class="scroll-y pop-list"
        >
          <v-list-tile
            v-for="(song, i) in current_Playlist"
            :key="song.trackID"
            :id="'pop-' + song.trackID"
            avatar
            hover
            @click="()=> ($DCPlayer.setNPlay(current_Playlist, i),
            $store.commit('setNPlay', {songs: current_Playlist, current: i, path: $route.path}),
            $DCFB.historyPush(current_Playlist[i]))"
            @contextmenu="$emit('conmen', [$event, [current_Playlist[i]]])"
          >
            <!-- <v-list-tile-avatar>
            <img :src="song.poster">
          </v-list-tile-avatar>-->
            <!-- :class="index == i ? 'white--text' : ''" -->
            <v-list-tile-content>
              <v-list-tile-title class="body-1 fwl">{{ song.title }}</v-list-tile-title>
              <!-- :class="index == i ? 'white--text' : ''" -->
              <v-list-tile-sub-title>{{ song.artist + ' • ' + song.duration }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </div>
  
  </v-expand-transition>
</template>
<script>
import { mapGetters } from 'vuex'

import deleteButton from '@/components/buttons/delete-button'
export default {
  name: 'PopupPlayer',
  components: {
    'delete-button': deleteButton
  },
  data () {
    return {
      showList: false
    }
  },
  methods: {
    toggle () {
      if (this.bShowStage) {
        this.$router.go(-1)
      } else {
        this.$router.push({name: 'auto', params: { artist: this.current_song.artist,  trackID: this.current_song.trackID,  source: this.current_song.source }})
      }
      this.$store.commit('show_pop', this.bShowStage)
    },
    scroll () {
      this.$nextTick(() => {
        this.$nextTick(() => {
          // this.$nextTick(() => {
          if (this.next_song) {
            if (this.index + 1 > this.current_Playlist.length) {
              console.log('LOOPING')
              document.getElementById('pop-' + this.current_song.trackID).scrollIntoView({behavior: "smooth"})
            } else {
              document.getElementById('pop-' + this.next_song.trackID).scrollIntoView({behavior: "smooth"})
            }
            // document.getElementsByClassName('pop-list').scrollTop = document.getElementById(this.current_song.trackID).scrollHeight + 64
          }
          //  })
        })
      })
    } 
  },
  watch: {
    index: {
      // immediate: true,
      handler: 'scroll'
    }
  },
  computed: {
    
    ...mapGetters(['show_pop', 'index','next_song', 'current_song', 'current_Playlist', 'bShowStage', 'isPlaying']),
    c_show_pop () {
      return this.show_pop
      // return (this.$router.name != 'auto' && this.current_song) && this.show_pop
    },
    size () {
      return this.showList ? 'pop-lg':'pop-sm'
    },
    aspect () {
      return 16/9
    },
  }
}
</script>

<style>
.scroll-y{
  overflow-y: scroll;
}
.pop-card .v-image:hover .d-flex{
  background-color: rgba(12, 12, 12, 0.5) !important;
}
.pop-card .v-image:hover .full{
    /* background-color: rgba(255, 255, 255, 0.5); */

  display: inline-block!important;
}
.pop-card .v-responsive {
  background: center center / cover no-repeat;
}
.full{
  display: none !important;
}
.pop-title{
  height: 24px;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pop-lg{
  height: 450px;
}
.pop-sm{
  height: 330px;
}
.pop{
  /* width: 240px; */
  width: 350px;
  position: fixed;
  bottom: 0;
  right: 18px;
  /* right: 8%; */
  /* left: 0; */
  z-index: 3;
}
.pop-list{
  height: 123px;
}
</style>
