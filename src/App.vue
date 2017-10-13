<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer
      v-model="drawerLeft"
      clipped
      persistent
      enable-resize-watcher
      app
      disable-route-watcher>
      <v-list dense>
        <v-list-tile :to="{path: '/home'}">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path: '/settings'}">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app fixed clipped-left clipped-right>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawerLeft = !drawerLeft"></v-toolbar-side-icon>
        DreamCloud
      </v-toolbar-title>
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
      
      ><current-playlist></current-playlist></v-navigation-drawer>
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
      <dcAudio :song="aSong"></dcAudio>
    </v-footer>    
  </v-app>
</template>

<script>
  import search from './components/navbar/search'
  import dcAudio from './components/dcAudio'
  import currentPlaylist from './components/playlist/current-playlist'
  export default {
    name: 'app',
    components: {
      'search': search,
      'dcAudio': dcAudio,
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
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 64px;
  margin-bottom: 60px;
}
</style>
