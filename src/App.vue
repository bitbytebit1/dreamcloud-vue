<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer
      v-model="drawerLeft"
      clipped
      persistent
      enable-resize-watcher
      app
      disable-route-watcher>
    <sidebar></sidebar>
    </v-navigation-drawer>

    <v-toolbar app fixed clipped-left clipped-right>
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
      clipped
      persistent
      v-model="drawerRight"
      enable-resize-watcher
      app
      disable-route-watcher
      right
      
      ><current-playlist></current-playlist>
      </v-navigation-drawer>
    <main>
      <v-content >
        <v-container fluid fill-height>
          <v-layout justify-center align-center>
            <router-view></router-view>
          </v-layout>
        </v-container>
      </v-content>
    </main>
    <v-footer app fixed>
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
        drawerLeft: false,
        drawerRight: true,
        aSongs: [],
        aSong: []
      }
    }
  }
</script>

<style>

main {
  text-align: center;
}
</style>
