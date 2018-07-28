<template>
  <v-dialog  dark v-model="menuOpen" max-width="500px">
    <v-btn slot="activator" class="ml-2" :disabled="disabled" :color='btnCol' icon @click.stop="openMenu" >
      <v-icon>playlist_add</v-icon>
    </v-btn>
    <!-- height="385" -->
    <v-card flat :height="cardHeight1">
      <v-card-text class="title fwl ma-0 pa-2">
        Add to playlist
      </v-card-text>
      <v-card-actions>
        <v-autocomplete
          :max-height="cardHeight2"
          v-on:keyup.enter='enter'
          v-model="select"
          content-class="noShadow pt-1"
          class="ma-0"
          :items="items"
          :search-input.sync="search"
          @click:append="enter"
          item-value="key"
          item-text="name"
          append-icon="add"
          no-data-text="Create new playlist"
          label="Name"
          color="primary"
          ref="auto"
          return-object
          single-line
          hide-no-data
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
  computed: {
    cardHeight1 () {
      return this.$vuetify.breakpoint.xsOnly ? '277' : '385'
    },
    cardHeight2 () {
      return this.$vuetify.breakpoint.xsOnly ? '190' : '300'
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
      if (typeof v === 'object') {
        this.$DCFB.playlistSongAdd(v['.key'], this.song)
      } else {
        this.$DCFB.createNewPlaylist(this.search, this.song)
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
      this.btnCol = 'green'
      setTimeout(() => {
        this.menuOpen = false
        this.$emit('opened', false)
        this.btnCol = ''
      }, 420)
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
.noShadow{
  box-shadow: none !important;
}
</style>
