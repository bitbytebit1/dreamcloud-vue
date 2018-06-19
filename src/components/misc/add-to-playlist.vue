<template>
    <v-dialog dark v-model="menuOpen" max-width="500px">
    <v-btn slot="activator" class="ml-2" :disabled="disabled" :color='btnCol' icon @click.stop="openMenu" >
      <v-icon>playlist_add</v-icon>
    </v-btn>

      <v-card>
        <v-card-actions>
          <v-autocomplete
            :items="items"
            return-object
            item-text="name"
            item-value="key"
            :search-input.sync="search"
            v-model="select"
            v-on:keyup.enter='enter'
            no-data-text="Create new playlist"
            label="Playlist name"
            color="primary"
            ref="auto"
            append-icon=""
            single-line
            hide-no-data
            combobox
          >
            <template slot="item" slot-scope="data">
              <v-list-tile-content @click="clicked(data.item)" v-text="data.item.name"></v-list-tile-content>
            </template>
          </v-autocomplete>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
// /* eslint-disable */
export default {
  name: 'add-to-playlist',
  props: ['song', 'disabled', 'colour'],
  data () {
    return {
      items: [],
      btnCol: this.colour,
      menuOpen: false,
      loading: false,
      search: null,
      select: ''
    }
  },
  methods: {
    clicked (v) {
      this.emit(v)
    },
    enter () {
      this.emit(this.select)
    },
    emit (v) {
      if (typeof v === 'string'){
        this.$DCFB.createNewPlaylist(v, this.song, this.song.length)
      }
      if (typeof v === 'object'){
        console.log('add',v['.key'], this.song.length)
        this.$DCFB.playlistSongAdd(v['.key'], this.song)
      }
      this.btnFeedback()
    },
    openMenu () {
      this.menuOpen = !this.menuOpen
      // this.$emit('opened', true)
      setTimeout(() => {
        // VTFY CLASS
        this.$refs.auto.$el.querySelector('.v-select__slot').click()
        this.$refs.auto.$el.querySelector('input').focus()
      }, 600)
    },
    btnFeedback () {
      //  this.menuOpen = this.$UTILS.isMobile ? false : true
      this.playlistName = ''
      this.menuOpen = false
      this.btnCol = 'green'
      setTimeout(() => {
        // this.$emit('opened', false)
        this.btnCol = ''
      }, 2000)
    }
  },
  firebase () {
    return {
      items: this.$DCFB.playlists.orderByChild('name_lower')
    }
  }
}
</script>

<style>

</style>
