<template>
  <v-app v-bind="theme" :class="blackClass">
    <!-- left drawer -->
    <v-navigation-drawer
      id="sideleft"
      app
      clipped
      disable-route-watcher
      disable-resize-watcher
      persistent
      ripple
      width="240"
      v-model="drawLeft">
      <sidebar @closeLeft="closeLeft"></sidebar>
    </v-navigation-drawer>

    <!-- header -->
    <v-toolbar app fixed clipped-left clipped-right dense id="navbar">
      <v-progress-linear
        id="loader"
        color="primary"
        background-color="#"
        height="3"
        :active="loadActive"
        :value="loadValue"
      ></v-progress-linear>

      <!-- toggle left draw button -->
      <v-toolbar-side-icon @click.stop="leftTog"></v-toolbar-side-icon>
      
      <!-- title -->
      <v-toolbar-title class="hidden-sm-and-down fwl title" style="width: 170px"  >
        <router-link :class="textClass" :to="{name:'historyRecommended', params: {user: $DCFB.UID}}">
          dreamcloud 
        </router-link>
      </v-toolbar-title>

      <!-- <v-spacer></v-spacer> -->

      <!-- searchbar -->
      <search></search>

      <v-spacer></v-spacer>
      <!-- toggle stage button -->
      <v-toolbar-side-icon v-if="!bMobi" @click.stop="$store.commit('toggleStage')"><v-icon>music_video</v-icon></v-toolbar-side-icon>

      <!-- toggle right draw button -->
      <v-toolbar-side-icon @click.stop="rightTog"><v-icon>playlist_play</v-icon></v-toolbar-side-icon>
    </v-toolbar>

    <!-- right drawer -->
    <v-navigation-drawer
      app
      clipped
      disable-route-watcher
      disable-resize-watcher
      persistent
      right
      v-model="drawRight"
      width="260"
      id="right-draw">
      <current-playlist></current-playlist>
    </v-navigation-drawer>

    <!-- Stage -->
    <v-content class="text-xs-center" v-show="bShowStage">
      <v-container fluid fill-height class="pa-0">
        <v-layout justify-center>
          <v-flex xs12>
            <stage></stage>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <!-- Router view -->
    <v-content class="text-xs-center">
      <v-container fluid fill-height id="main-cont" class="pa-0 p1t-4 pb1-4">
        <v-layout justify-center>
          <!-- <transition name="  fade" mode="out-in" :key="$route.fullPath"> -->
            <!-- <keep-alive> -->
              <router-view></router-view>
            <!-- </keep-alive> -->
          <!-- </transition> -->
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
  import dcAudio2 from './components/footer/dc-audio-flex-2.vue'
  import dcYoutube from './components/footer/dc-youtube'
  import currentPlaylist from './components/sidebar-right/current-playlist'
  import sidebar from './components/sidebar-left/sidebar'
  import stage from '@/components/stage/stage'
  import scrollToTop from '@/components/footer/scroll-to-top.vue'
  import mobileFooter from '@/components/footer/mobileFooter'
  import { mapGetters } from 'vuex'

  export default {
    name: 'app',
    components: {
      'hks': hks,
      'search': search,
      'dc-audio2': dcAudio2,
      'dc-audio': dcAudio,
      'dc-youtube': dcYoutube,
      'sidebar': sidebar,
      'current-playlist': currentPlaylist,
      'stage': stage,
      'mobileFooter': mobileFooter,
      'scroll-to-top': scrollToTop
    },
    methods: {
      leftTog () {
        this.$store.commit('drawLeftTog')
      },
      rightTog () {
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
          height: (this.currentActive && this.bMobi ? '128px' : '56px') + ' !important'
        }
      },
      bMobi () {
        return this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm'
      },
      textClass () {
        return (this.$store.getters.nightMode ? 'white' : 'black') + '--text noDeco pointer hidden-sm-and-down'
      },
      currentActive () {
        return this.$route.name === 'stage'
      },
      drawRight: {
        get () {
          return this.$store.getters.drawRight
        },
        set (value) {
          this.$store.commit('drawRight', value)
        }
      },
      drawLeft: {
        get () {
          return this.$store.getters.drawLeft
        },
        set (value) {
          this.$store.commit('drawLeft', value)
        }
      },
      ...mapGetters({
        blackClass: 'blackClass',
        isYT: 'isYT',
        ytUseVideo: 'ytUseVideo',
        bShowStage: 'bShowStage',
        theme: 'theme',
        loadValue: 'loadValue',
        loadActive: 'loadActive',
        ytFullScreen: 'ytFullScreen'
      })
    },
    beforeCreate () {
      // Set them
      this.$vuetify.theme.primary = '#009688'
      this.$store.commit('ytUseVideo', !this.bMobi)
      // console.log(this.$vuetify.theme)
      // On Firebase auth state change
      this.$DCFB.fb.auth().onAuthStateChanged((user) => {
        // console.log(this.$DCFB.fb.auth().currentUser)
        // Toggle auth state to false
        this.$store.commit('authChange', false)
        this.$nextTick(() => {
          // Set auth state
          this.$store.commit('authChange', !!user)
          // If logged in
          if (!user) {
            // Sign in anonymously
            this.$DCFB.fb.auth().signInAnonymously()
          } else {
            // Update store
            this.$store.commit('setUser', user)
            if (user.isAnonymous) {
              this.$router.push({name: 'about'})
            } else {
              if (!this.$route.name) {
                this.$router.push({name: 'historyRecommended'})
              }
            }
            // Initialise DCFB plugin
            this.$DCFB.init(user.uid)
            // Get settings
            this.$DCFB.settings.once('value', (snapshot) => {
              if (snapshot.val() !== null) {
                this.$store.commit('settings', snapshot.val())
              }
              // this.listViewSmall = !!snapshot
            })
          }
        })
      })
    }
  }
</script>

<style>
  .container .layout:only-child {
      margin-left: 0px !important;
      margin-right: 0px !important;
  }
  #loader{
    padding: 0;
    margin: 0;
    position: absolute;
    /* margin-top:10px; */
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

  }

  /* html, body { */
    /* height: 100%; */
    /* overflow:auto */
    /* margin: 0; padding:0; height: 100%; overflow: hidden */
  /* } */
  .fl-r {
    float: right;
  }
  .noDeco{
    /* text-decoration-color: none; */
    text-decoration: none;
  }
  .pointer{
    cursor: pointer;
  }
  .preline{
    white-space: pre-line;
  }
  .wordbreak{
    word-break: break-word;
  }
  .maxZ {
    z-index: 2147483647 !important;
  }
  @media only screen and (min-width: 600px){
    #main-cont{
      /* margin-top: 0px; */
    }
    #foot{
      padding: 0 !important;
      /* height: 55px !important; */
    }
  }
  @media only screen and (max-width: 599px){
    #main-cont{
      /* margin-top: 16px !important; */
    }
    #foot .v-input {
      margin-top: -10px;
    }
    .container {
      padding: 0 !important;
      margin: 0 !important;
    }
    #foot{
      padding: 0 !important;
      /* height: 75px !important; */
    }
  }

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity .2s ease;
}

.fade-leave-active {
  transition: opacity .2s ease;
  opacity: 0;
}
.dchide{
  display: none !important;
}
.hide{
  display: none;
}
width */
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
