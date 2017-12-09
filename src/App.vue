<template>
  <v-app v-bind="$store.getters.theme">
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

    <v-toolbar app fixed clipped-left clipped-right dense>
      
      <v-toolbar-side-icon @click.stop="drawerLeft = !drawerLeft"></v-toolbar-side-icon>
      
      <v-toolbar-title class="hidden-sm-and-down">
        DreamCloud
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <search></search>

      <v-spacer></v-spacer>

      <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"><v-icon large>playlist_play</v-icon></v-toolbar-side-icon>

    </v-toolbar>

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
      <v-content class="text-xs-center">

        <!-- <v-container fluid fill-height> -->
          <v-layout justify-center >
            <transition name="fade" mode="out-in">
              <!-- <keep-alive inlcude="all"> -->
                <router-view></router-view>
              <!-- </keep-alive> -->
            </transition>
          </v-layout>
        <!-- </v-container> -->
      </v-content>
    <!-- </main> -->
    <v-footer app fixed id="foot">
      <dc-audio :song="aSong"></dc-audio>
    </v-footer>
  </v-app>
</template>

<script>
  import search from './components/navbar/search'
  import dcAudio from './components/player/dc-audio'
  import currentPlaylist from './components/current-playlist/current-playlist'
  import sidebar from '@/components/sidebar/sidebar'
  export default {
    name: 'app',
    components: {
      'search': search,
      'dc-audio': dcAudio,
      'sidebar': sidebar,
      'current-playlist': currentPlaylist
    },
    data () {
      return {
        drawerLeft: !this.$UTILS.isMobile,
        drawerRight: !this.$UTILS.isMobile,
        aSongs: [],
        aSong: []
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
      this.$store.commit('authChange', !!this.$DCFB.fb.auth().currentUser)
      this.$DCFB.fb.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$store.commit('authChange', true)
          this.$DCFB.init(user.uid)
          this.$DCFB.setting('Night Mode').once('value', (snapshot) => {
            if (snapshot.val() !== null) {
              this.$store.commit('changeSetting', {'setting': 'Night Mode', 'value': snapshot.val()})
            }
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
  }
  @media only screen and (max-width: 599px){
    #foot{
      padding: 0 !important;
      height: 75px !important;
    }
  }

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity .3s ease;
}

.fade-leave-active {
  transition: opacity .3s ease;
  opacity: 0;
}
</style>
