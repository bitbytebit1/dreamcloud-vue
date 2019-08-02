<template>
  <v-app 
    v-bind="theme"
    :class="blackClass"
  >
    <context-menu 
      ref="con" 
      :key="uid"
    />
    <snackbar/>
    <v-snackbar
      v-model="snackbar"
      :timeout="0"
      top
      auto-height
    >
      A newer version of dreamcloud has been downloaded
      <v-btn
        dark
        flat
        @click="() => swReg.waiting.postMessage('skipWaiting')"
      >
        use now
      </v-btn>
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        dismiss
      </v-btn>
    </v-snackbar>
    
    <!-- left drawer -->
    <v-navigation-drawer
      id="sideleft"
      v-model="drawLeft"
      app
      clipped
      disable-route-watcher
      disable-resize-watcher
      persistent
      ripple
      width="240"
    >
      <sidebar @closeLeft="closeLeft"/>
    </v-navigation-drawer>

    <!-- header -->
    <v-toolbar 
      id="navbar" 
      app 
      dense 
      fixed 
      clipped-left 
      clipped-right
    >
      <!-- <v-progress-linear
        id="loader"
        :active="loadActive"
        :value="loadValue"
        color="primary"
        background-color="#"
        height="2"
      /> -->

      <!-- debug button -->
      <!-- <v-toolbar-side-icon @click.stop="$store.dispatch('snack', { b: true, c:'green', s:'wat' })"/> -->
      <!-- toggle left draw button -->
      <v-toolbar-side-icon @click.stop="leftTog"/>
      
      <!-- title -->
      <v-toolbar-title 
        style="width: 121px" 
        class="hidden-sm-and-down fwl title" 
      >
        <router-link 
          :class="textClass" 
          :to="{name:'home', params: {user: uid}}"
        >
          dreamcloud
        </router-link>
      </v-toolbar-title>

      <search/>

      <v-spacer/>
      <!-- toggle stage button -->
      <!-- <v-toolbar-side-icon 
        v-if="!bMobi" 
        @click.stop="$store.commit('toggleStage')"
      ><v-icon>music_video</v-icon></v-toolbar-side-icon> -->

      <!-- toggle right draw button -->
      <v-toolbar-side-icon @click.stop="rightTog"><v-icon>playlist_play</v-icon></v-toolbar-side-icon>
    </v-toolbar>

    <!-- right drawer -->
    <v-navigation-drawer
      id="right-draw"
      v-model="drawRight"
      app
      clipped
      disable-route-watcher
      disable-resize-watcher
      persistent
      right
      width="260"
    >
      <current-playlist @conmen="con"/>
    </v-navigation-drawer>

    <!-- Stage -->
    <v-content 
      :style="!bShowStage ? 'position:absolute':''"
      class="text-xs-center"
    >
      <v-container 
        fluid 
        fill-height 
        class="pa-0"
      >
        <v-layout justify-center>
          <v-flex xs12>
            <stage 
              @conmen="con"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <!-- Router view -->
    <v-content class="text-xs-center">
      <v-container 
        id="main-cont" 
        fluid 
        fill-height 
        class="pa-0 ma-0"
      >
        <v-layout justify-center>
          <!-- <transition 
            :key="$route.fullPath" 
            name="fade" 
            mode="out-in"
          > -->
          <keep-alive
            :max="4"
          >
            <router-view @conmen="con"/>
          </keep-alive>
          <!-- </transition> -->
        </v-layout>
      </v-container>
    </v-content>
    <popup @conmen="con"/>
    <!-- Footer -->
    <v-footer 
      id="foot" 
      :style="footStyle" 
      app 
      fixed
    >
      <mobileFooter v-if="bMobi"/>
      <!-- && (bMobi || currentActive) -->
      <dc-youtube v-show="(ytUseVideo && isYT)"/>
      <dc-audio v-show="(!ytUseVideo || !isYT)"/>
      <!-- <scroll/> -->
      <!-- <v-flex xs12 xl12> -->
      <!-- <v-btn block large color="primary ">Get started</v-btn> -->
      <!-- </v-flex> -->

    </v-footer>
    <!-- dc keyboard shortcuts -->
    <hks/>
  </v-app>
</template>

<script>
import scroll from './components/footer/show-pop'
import popup from './components/footer/popup-player'
import hks from './components/misc/hks'
import search from './components/header/search'
import snackbar from './components/header/snackbar'
import dcAudio from './components/footer/dc-audio'
import dcYoutube from './components/footer/dc-youtube'
import currentPlaylist from './components/sidebar-right/current-playlist'
import sidebar from './components/sidebar-left/sidebar'
import stage from '@/components/stage/stage'
import mobileFooter from '@/components/footer/mobileFooter'

import { mapGetters } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      snackbar: false,
      swReg: '',
      refreshing: false
    }
  },
  components: {
    'scroll': scroll,
    'popup': popup,
    'hks': hks,
    'snackbar': snackbar,
    'search': search,
    'dc-audio': dcAudio,
    'dc-youtube': dcYoutube,
    'sidebar': sidebar,
    'current-playlist': currentPlaylist,
    'stage': stage,
    'mobileFooter': mobileFooter
  },
  methods: {
    con (a) {
      this.$refs.con.show(a[0], a[1])
    },
    leftTog () {
      this.$store.commit('drawLeftTog')
    },
    rightTog () {
      this.$store.commit('drawRightTog')
    },
    closeLeft () {
      if (this.$UTILS.isMobile) {
        this.$store.commit('drawLeft', false)
        // console.log('toggle left')
        this.drawLeft = false
      }
    },
    listenForWaitingServiceWorker (reg, callback) {
      function awaitStateChange() {
        reg.installing.addEventListener('statechange', function() {
          if (this.state === 'installed') callback(reg);
        });
      }
      if (!reg) return;
      if (reg.waiting) return callback(reg);
      if (reg.installing) awaitStateChange();
      reg.addEventListener('updatefound', awaitStateChange);
    }
  },
  
  computed: {
    ...mapState({
      bShowStage: state => state.user.bShowStage,
    }),
    ...mapGetters({
      uid: 'uid',
      blackClass: 'blackClass',
      isYT: 'isYT',
      ytUseVideo: 'ytUseVideo',
      theme: 'theme',
      ytFullScreen: 'ytFullScreen'
    }),
    footStyle () {
      return {
        height: (this.bMobi ? '128px' : '56px') + ' !important'
      }
      // return {
      //   height: (this.currentActive && this.bMobi ? '128px' : '56px') + ' !important'
      // }
    },
    bMobi () {
      return this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm'
    },
    textClass () {
      return 'noDeco pointer hidden-sm-and-down ' + this.$store.getters.textColor
    },
    currentActive () {
      return this.$route.name === 'stage'
    },
    drawRight: {
      get () {
        return this.$store.state.user.drawRight
      },
      set (value) {
        this.$store.commit('drawRight', value)
      }
    },
    drawLeft: {
      get () {
        return this.$store.state.user.drawLeft
      },
      set (value) {
        this.$store.commit('drawLeft', value)
      }
    }
  },
  created () {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (this.refreshing) return
        this.refreshing = true
        window.location.reload()
      }
      )
      navigator.serviceWorker.getRegistration().then(e => {
        this.swReg = e
        this.listenForWaitingServiceWorker(this.swReg, () => {
          this.snackbar = true
        })
      })
    }
    // Set theme
    this.$vuetify.theme.primary = '#710000'
    this.$store.commit('ytUseVideo', !this.bMobi)
    // On Firebase auth state change
    this.$DCFB.fb.auth().onAuthStateChanged((user) => {
      // console.log(this.$DCFB.fb.auth().currentUser)
      // Toggle auth state to false
      this.$store.commit('authChange', false)
      this.$nextTick(() => {
        // Set auth state
        this.$store.commit('authChange', !!user) // dirty !! to convert int to bool
        // If not logged in
        if (!user) {
          // Sign in anonymously and wait, WAIT PLS
          this.$DCFB.fb.auth().signInAnonymously()
          return
        } else {
          // Update store with user uid
          this.$store.commit('setUser', user)
        }

        // Initialise DCFB plugin
        this.$DCFB.init(user.uid)

        // redirect to somewhere meaningful
        if (!this.$route.name && !user.isAnonymous) {
          this.$router.push({name:'home', params: {user: user.uid}})
        } else if (!this.$route.name) {
          this.$router.push({name: 'about'})
        }
        // set isMobile in store for router guard (close menus on back)
        this.$store.commit('isMobile', this.$vuetify.breakpoint.smAndDown)

        // Get settings
        this.$DCFB.settings.once('value', (snapshot) => {
          if (snapshot.val() !== null) {
            this.$store.commit('settings', snapshot.val())
          }
          // this.listViewSmall = !!snapshot
        })
      })
    })
  }
}
</script>

<style>
.filter label, .filter input{
  font-size: 13px;
}
  .fl-l{
    float: left;
  } 

  .fl-r{
    float: right;
  }
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
    cursor: pointer !important;
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
      padding-bottom: 50px !important;
      /* margin-bottom: 35px; */
    }
    #foot{
      padding: 0 !important;
      /* height: 55px !important; */
    }
  }
  @media only screen and (max-width: 599px){
    #main-cont{
      padding-bottom: 110px !important;
      /* margin-top: 106px !important; */
    }
    #foot .v-input {
      margin-top: -10px;
    }
    /* .container { */
      /* padding: 0 !important; */
      /* margin: 0 !important; */
    /* } */
    #foot{
      padding: 0 !important;
      /* height: 75px !important; */
    }
  }

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity .1s ease;
}

.fade-leave-active {
  transition: opacity .1s ease;
  opacity: 0;
}
.dchide{
  display: none !important;
}
.hide{
  display: none;
}

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
