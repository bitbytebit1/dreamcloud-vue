<template>
    <v-dialog :disabled="disabled" v-model="menuOpen" max-width="500px">
    <v-btn :disabled="disabled" :color='btnCol' icon slot="activator" @click.stop="menuOpen = !menuOpen" >
      <v-icon>playlist_add</v-icon>
    </v-btn>      
      <v-list>
        <v-list-tile>
          <v-text-field
            v-focus
            color="teal"
            name="add-to-playlist"
            label="Playlist name"
            single-line
            v-model="playlistName"
            v-on:keyup.enter="createNewPlaylist"
          ></v-text-field>
        </v-list-tile>
        <v-list-tile v-for="playlist in playlists" :key="playlist['.key']" @click="addToPlaylist(playlist)">
          <v-list-tile-title>{{ playlist['name'] }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-dialog>
</template>
<script>
/* eslint-disable */
export default {
  name: 'add-to-playlist',
  props: ['song', 'disabled'],
  data () {
    return {
      btnCol: '',
      playlistName: '',
      menuOpen: false
    }
  },
  updated () {
    // console.log(this.$refs)
    // this.$refs.addInput.focus()
  },
  directives: {
    focus: {
      // directive definition
      update: (el) => {
        // console.log(this)
        // console.log(this.$vuetify)
        // console.log($vuetify)
        // if ($vuetify.breakpoint.xsOnly) {
          el.children[1].children[0].focus()  
        // }
      }
    }
  },
  methods: {
    btnFeedback () {
      //  this.menuOpen = this.$UTILS.isMobile ? false : true
      this.menuOpen = false
      this.btnCol = 'green'
      setTimeout(() =>{
        this.btnCol = ''
      }, 2000)
    },
    createNewPlaylist () {
     this.$DCFB.createNewPlaylist(this.playlistName, this.song)
     this.btnFeedback()
    },
    addToPlaylist (playlist) {
      this.$DCFB.playlistSongAdd(playlist['.key'], this.song)
      this.btnFeedback()
    }
  },
  firebase () {
    return {
      playlists: this.$DCFB.playlists.orderByChild('name_lower'),
      playlistsRefs: this.$DCFB.playlistsRefs.orderByChild('name_lower')
    }
  },
  mounted () {
    // console.log('Playlists', this.playlists)
    // console.log('PlaylistsRefs', this.playlistsRefs)
  }
}
</script>

<style>

</style>
