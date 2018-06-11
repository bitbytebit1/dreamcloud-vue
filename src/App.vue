<template>
  <v-app v-bind="theme">
    <!-- left drawer -->
    <v-navigation-drawer
      app
      clipped
      disable-route-watcher
      enable-resize-watcher
      persistent
      ripple
      v-model="drawerLeft">
      <sidebar @closeLeft="closeLeft"></sidebar>
    </v-navigation-drawer>

    <!-- header -->
    <v-toolbar app fixed clipped-left dense>
      
      <!-- toggle left draw button -->
      <v-toolbar-side-icon @click.stop="leftTog"></v-toolbar-side-icon>
      
      <!-- title -->
      <v-toolbar-title class="hidden-sm-and-down">
        <router-link :class="textClass" :to="{name:'home', params: {user: $DCFB.UID}}">
          DreamCloud
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- searchbar -->
      <search></search>

      <v-spacer></v-spacer>
      <!-- toggle stage button -->
      <v-toolbar-side-icon @click.stop="$store.commit('toggleStage')"><v-icon>music_video</v-icon></v-toolbar-side-icon>

      <!-- toggle right draw button -->
      <v-toolbar-side-icon @click.stop="rightTog"><v-icon>playlist_play</v-icon></v-toolbar-side-icon>

    </v-toolbar>

    <!-- right drawer -->
    <v-navigation-drawer
      app
      disable-route-watcher
      enable-resize-watcher
      persistent
      right
      v-model="drawerRight"
      id="right-draw">
      <current-playlist></current-playlist>
    </v-navigation-drawer>

    <!-- Stage -->
    <v-content class="text-xs-center" v-show="bShowStage">
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12>
            <stage></stage>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <!-- Router view -->
    <v-content class="text-xs-center">
      <v-container fluid fill-height>
        <v-layout justify-center>
          <transition name="fade" mode="out-in">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
        </v-layout>
      </v-container>
    </v-content>

    <!-- Footer -->
    <v-footer app fixed id="foot" :style="footStyle">
      <mobileFooter v-show="bMobi"></mobileFooter>
      <dc-youtube v-show="(ytUseVideo && isYT) && (!bMobi || currentActive)"></dc-youtube>
      <dc-audio v-show="(!ytUseVideo || !isYT) && (!bMobi || currentActive)"></dc-audio>
      <scroll-to-top v-if="!bMobi"></scroll-to-top>
    </v-footer>
  <!-- dc keyboard shortcuts -->
  <hks></hks>
  </v-app>
</template>

<script>
  import hks from './components/misc/hks'
  import search from './components/header/search'
  import dcAudio from './components/footer/dc-audio'
  import dcYoutube from './components/footer/dc-youtube'
  import currentPlaylist from './components/sidebar-right/current-playlist'
  import sidebar from './components/sidebar-left/sidebar'
  import stage from '@/components/main/stage/stage'
  import scrollToTop from '@/components/footer/scroll-to-top.vue'
  import mobileFooter from '@/components/footer/mobileFooter'
  import { mapGetters } from 'vuex'

  export default {
    name: 'app',
    components: {
      'hks': hks,
      'search': search,
      'dc-audio': dcAudio,
      'dc-youtube': dcYoutube,
      'sidebar': sidebar,
      'current-playlist': currentPlaylist,
      'stage': stage,
      'mobileFooter': mobileFooter,
      'scroll-to-top': scrollToTop
    },
    data () {
      return {
        drawerLeft: !this.$UTILS.isMobile,
        drawerRight: !this.$UTILS.isMobile
      }
    },
    methods: {
      leftTog () {
        this.drawerLeft = !this.drawerLeft
        this.$store.commit('drawLeftTog')
      },
      rightTog () {
        this.drawerRight = !this.drawerRight
        this.$store.commit('drawRightTog')
      },
      closeLeft () {
        if (this.$UTILS.isMobile) {
          this.drawerLeft = false
        }
      }
    },
    computed: {
      footStyle () {
        return {
          height: (this.currentActive && this.bMobi ? '128px' : '55px') + ' !important'
        }
      },
      bMobi () {
        return this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm'
      },
      textClass () {
        return (this.$store.getters.nightMode ? 'white' : 'black') + '--text noDeco pointer'
      },
      currentActive () {
        return this.$route.name === 'stage'
      },
      ...mapGetters({
        isYT: 'isYT',
        ytUseVideo: 'ytUseVideo',
        bShowStage: 'bShowStage',
        theme: 'theme',
        ytFullScreen: 'ytFullScreen'
      })
    },
    beforeCreate () {
      this.$vuetify.theme.primary = '#009688'
      // if mobile disable youtube video
      // this.$store.commit('ytUseVideo', !this.$UTILS.isMobile)
      // this.$store.commit('ytUseVideo', false)
      // if set log in status
      this.$store.commit('authChange', !!this.$DCFB.fb.auth().currentUser)
      this.$DCFB.fb.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$DCFB.init(user.uid)
          this.$store.commit('authChange', true)
          this.$DCFB.setting('Night Mode').once('value', (snapshot) => {
            if (snapshot.val() !== null) {
              this.$store.commit('changeSetting', {'setting': 'Night Mode', 'value': snapshot.val()})
            }
          })
        } else {
          this.$store.commit('authChange', false)
          this.$router.push({name: 'searchPage', params: {query: ' ', source: 'YouTube'}})
        }
      })
    }
  }
</script>

<style>
  .noDeco{
    /* text-decoration-color: none; */
    text-decoration: none;
  }
  .pointer{
    cursor: pointer;
  }
  .wordbreak{
    word-break: break-word;
  }
  .maxZ {
    z-index: 2147483647 !important;
  }
  @media only screen and (min-width: 600px){
    #foot{
      padding: 0 !important;
      /* height: 55px !important; */
    }
  }
  @media only screen and (max-width: 599px){
    .container {
      padding: 0 !important;
      margin: 0 !important;
    }
    #foot{
      padding: 0 !important;
      height: 75px !important;
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

/* width */
#right-draw::-webkit-scrollbar {
    width: 1px;
}
  
::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
    background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555; 
}
</style>
