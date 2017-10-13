<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer
      clipped
      persistent
      v-model="drawer"
      enable-resize-watcher
      app
      disable-route-watcher
    >
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app fixed clipped-left>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        DreamCloud
      </v-toolbar-title>
      <search></search>
    </v-toolbar>

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
  export default {
    name: 'app',
    components: {
      'search': search,
      'dcAudio': dcAudio
    },
    data () {
      return {
        drawer: false,
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
