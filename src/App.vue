<template>
  <v-app v-bind="$store.getters.theme">
    <!-- left drawer -->
    <v-navigation-drawer
      app
      clipped
      disable-route-watcher
      enable-resize-watcher
      persistent
      ripple
      v-model="drawerLeft"
    >
      <sidebar @closeLeft="closeLeft"></sidebar>
    </v-navigation-drawer>

    <!-- header -->
    <v-toolbar app fixed clipped-left clipped-right dense>
      
      <!-- toggle left draw button -->
      <v-toolbar-side-icon @click.stop="drawerLeft = !drawerLeft"></v-toolbar-side-icon>
      
      <!-- title -->
      <v-toolbar-title class="hidden-sm-and-down">
        DreamCloud
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- searchbar -->
      <search></search>

      <v-spacer></v-spacer>
      
      <!-- yt button -->
      <!-- <youtube-button></youtube-button> -->
    <!-- <v-toolbar-items> -->

      <show-stage></show-stage>
      <!-- toggle right draw button -->
      <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"><v-icon>playlist_play</v-icon></v-toolbar-side-icon>
    <!-- </v-toolbar-items> -->

    </v-toolbar>

    <!-- right drawer -->
    <v-navigation-drawer
      app
      clipped
      disable-route-watcher
      enable-resize-watcher
      persistent
      right
      v-model="drawerRight"
    >
      <current-playlist></current-playlist>
    </v-navigation-drawer>
    
    <!-- <main> -->
    <v-content class="text-xs-center maCont">

      <!-- <v-container fluid fill-height> -->
        <v-layout justify-center row wrap>
          <v-flex xs12 v-show="$store.getters.bShowStage">
            <stage></stage>
          </v-flex>
          <transition name="fade" mode="out-in">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
        </v-layout>
      <!-- </v-container> -->
    </v-content>
    <!-- </main> -->
    <v-footer app fixed id="foot">
      <!-- {{$store.getters.ytState.data}} -->

       <!-- v-show="$store.getters.ytState.data == 1 || $store.getters.ytState.data == 2 || $store.getters.ytState.data == 0" -->
      <dc-youtube v-show="$store.getters.ytUseVideo && $store.getters.isYT"></dc-youtube>
      <dc-audio v-show="!$store.getters.ytUseVideo || !$store.getters.isYT"></dc-audio>  
      <scroll-to-top></scroll-to-top>
      
       <!-- v-show="$store.getters.current_Playlist[$store.getters.index].source == 'YouTube'" -->
    </v-footer>
  </v-app>
</template>

<script>
  import search from './components/navbar/search'
  import dcAudio from './components/player/dc-audio'
  import dcYoutube from './components/player/dc-youtube'
  import currentPlaylist from './components/current-playlist/current-playlist'
  import sidebar from './components/sidebar/sidebar'
  import youtubeVideo from './components/misc/youtube-video'
  import stage from '@/components/routes/stage/stage'
  import showStage from '@/components/misc/show-stage.vue'
  import scrollToTop from '@/components/misc/scroll-to-top.vue'

  export default {
    name: 'app',
    components: {
      'search': search,
      'dc-audio': dcAudio,
      'dc-youtube': dcYoutube,
      'sidebar': sidebar,
      'current-playlist': currentPlaylist,
      'youtube-video': youtubeVideo,
      'show-stage': showStage,
      'stage': stage,
      'scroll-to-top': scrollToTop
    },
    data () {
      return {
        drawerLeft: !this.$UTILS.isMobile,
        drawerRight: !this.$UTILS.isMobile
      }
    },
    methods: {
      closeLeft () {
        if (this.$UTILS.isMobile) {
          this.drawerLeft = false
        }
      }
    },
    computed: {
      theme () {
        return this.$store.getters.theme
      }
    },
    beforeCreate () {
      this.$store.commit('ytUseVideo', !this.$vuetify.breakpoint.xsOnly)
      this.$store.commit('authChange', !!this.$DCFB.fb.auth().currentUser)
      this.$DCFB.fb.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$store.commit('authChange', true)
          this.$DCFB.init(user.uid)
          this.$DCFB.setting('Night Mode').once('value', (snapshot) => {
            if (snapshot.val() !== null) {
              this.$store.commit('changeSetting', {'setting': 'Night Mode', 'value': snapshot.val()})
              this.$vuetify.theme.primary = '#009688'
            }
          })
          this.$DCFB.setting('Video').once('value', (snapshot) => {
            // if (snapshot.val() !== null) {
              // alert(snapshot.val())
            // this.$store.commit('changeSetting', {'setting': 'Video', 'value': snapshot.val()})
            // this.$store.commit('ytUseVideo', snapshot.val())
            // this.$store.commit('ytShowVideo', snapshot.val())
            // this.$store.commit('ytUseVideo', snapshot.val())
            // }
          })
        } else {
          this.$store.commit('authChange', false)
          // this.$router.replace('/login')
        }
      })
    }
  }
</script>

<style>
  @media only screen and (min-width: 600px){
    #foot{
      padding: 0 !important;
      height: 55px !important;
    }
    .maCont{
      padding-bottom: 21px;
    }
  }
  @media only screen and (max-width: 599px){
    #foot{
      padding: 0 !important;
      height: 75px !important;
    }
    .maCont{
      padding-bottom: 42px;
    }
  }

/* .fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity .3s ease;
}

.fade-leave-active {
  transition: opacity .3s ease;
  opacity: 0;
} */
.dchide{
  display: none !important;
}
</style>
