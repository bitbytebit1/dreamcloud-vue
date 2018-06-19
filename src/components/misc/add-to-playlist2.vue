<template>
  <v-dialog :disabled="disabled" v-model="menuOpen" max-width="500px" lazy>
    <v-btn :disabled="disabled" :color='btnCol' icon slot="activator" @click.stop="openMenu" >
      <v-icon>playlist_add</v-icon>
    </v-btn>
    <v-list>
      <v-list-tile>
        <v-text-field
          v-focus
          color="primary"
          name="add-to-playlist"
          label="Playlist name"
          single-line
          v-model="playlistName"
          v-on:keyup.enter="createNewPlaylist"
          ref="filter"
        ></v-text-field>
      </v-list-tile>
      <v-data-iterator
        v-if="$store.getters.auth_state"
        :items="playlists"
        :search="playlistName"
        :rows-per-page-items="rowsPerPageItems"
        hide-actions
        no-data-text="Create new playlist"
        no-results-text="Create new playlist"
        :custom-filter="(items, search, filter) => { search = search.toString().toLowerCase() ; return items.filter(row => filter(row['name_lower'], search)) }"
      >
        <v-list-tile 
          slot="item"
          slot-scope="props"
          :key="props.item['.key']" 
          @click="addToPlaylist(props.item)"
        >
          <v-list-tile-title>{{ props.item['name'] }}</v-list-tile-title>
        </v-list-tile>
      </v-data-iterator>
    </v-list>
  </v-dialog>
</template>
<script>
// /* eslint-disable */
export default {
  name: 'add-to-playlist',
  props: ['song', 'disabled', 'colour'],
  data () {
    return {
      btnCol: this.colour,
      playlistName: '',
      menuOpen: false,
      filterHasFocus: false,
      search: '',
      active: true,
      rowsPerPageItems: [{ value: -1 }],
      pagination: {
        rowsPerPage: 'All'
      }
    }
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
    openMenu () {
      this.menuOpen = !this.menuOpen
      this.$emit('opened', true)
      this.$nextTick(() => this.$refs.filter.focus())
    },
    btnFeedback () {
      //  this.menuOpen = this.$UTILS.isMobile ? false : true
      this.playlistName = ''
      this.menuOpen = false
      this.btnCol = 'green'
      setTimeout(() => {
        this.$emit('opened', false)
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
      playlists: this.$DCFB.playlists.orderByChild('name_lower')
      // playlistsRefs: this.$DCFB.playlistsRefs.orderByChild('name_lower')
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
