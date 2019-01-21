<template>
  <span 
    :class="{w100: inList}" 
    style="display:inline-block"
  >
    <!-- LIST -->
    <v-list-tile 
      v-if="inList" 
      ripple 
      class="w100" 
      @click.stop="openMenu"
    >
      <v-list-tile-title>Add to playlist</v-list-tile-title>

    </v-list-tile>

    <!-- BUTTON ONLY -->
    <v-tooltip 
      v-else 
      top
    >
      <v-btn 
        slot="activator" 
        :disabled="disabled" 
        :color='btnCol' 
        class="ml-2" 
        icon 
        @click.stop="openMenu"
      >
        <v-icon>playlist_add</v-icon>
      </v-btn>
      <span>Add to playist</span>
    </v-tooltip>

    <!-- DIALOG -->
    <v-dialog 
      v-model="menuOpen" 
      dark 
      maxWidth="500px"
    >
      <!-- height="385" -->
      <v-card 
        :height="cardHeight1" 
        flat
        style="overflow-x: hidden;"
      >
        <v-card-text class="title fwl ma-0 pa-0 pl-2 pt-2">
          Add to playlist
        </v-card-text>
        <div :style="{height: 44 + +cardHeight2 + 'px'}">
          <v-autocomplete
            ref="auto"
            v-model="select"
            :menu-props="{ maxHeight: cardHeight2, contentClass: 'noShadow pt-1'}"
            :items="items"
            :searchInput.sync="search"
            class="ma-0 px-2"
            itemValue="key"
            itemText="name"
            appendIcon="add"
            no-data-text="Create new playlist"
            label="Playlist name"
            color="primary"
            clearable
            hideNoData
            open-on-clear
            returnObject
            singleLine
            @keyup.enter='enter'
            @click:append="enter"
          >
            <template 
              slot="item" 
              slot-scope="data"
            >
              <v-list-tile-content 
                :key="data.item['.key']" 
                @click="clicked(data.item)"
                v-text="data.item.name"
              />
            </template>
          </v-autocomplete>
        </div>
        <div class="text-xs-right">
          <v-btn 
            color="primary" 
            @click.stop="enter"
          >Add</v-btn>
        </div>
        <!-- 438
        345 -->
        
      </v-card>
    </v-dialog>
  </span>
</template>
<script>
// /* eslint-disable */
export default {
  name: 'AddToPlaylist',
  props: {
    song: {
      type: [Array, Object],
      default() {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inList: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      items: [],
      btnCol: '',
      menuOpen: false,
      loading: false,
      search: null,
      select: ''
    }
  },
  watch: {
    auth_state: {
      immediate: true,
      handler: 'bind'
    }
  },
  computed: {
    cardHeight1 () {
      return this.$vuetify.breakpoint.xsOnly ? '316' : '438'
    },
    cardHeight2 () {
      return this.$vuetify.breakpoint.xsOnly ? '188' : '310'
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
      setTimeout(() => {
        // VTFY CLASS
        this.$refs.auto.$el.querySelector('.v-select__slot').click()
        this.$refs.auto.$el.querySelector('input').focus()
      }, 600)
    },
    btnFeedback () {
      this.$store.dispatch('snack', { b: true, c:'primary', s:'Added to playlist' })
      //  this.menuOpen = this.$UTILS.isMobile ? false : true
      // this.playlistName = ''
      this.btnCol = 'green'
      setTimeout(() => {
        this.menuOpen = false
        // this.$emit('opened', false)
        this.btnCol = ''
      }, 420)
    },
    bind () {
      if (this.$store.getters.auth_state) {
        this.$bindAsArray('items', this.$DCFB.playlists.orderByChild('name_lower'))
      }
    }
  }
}
</script>

<style>
.w100{
  width: 100%;
}
.noShadow{
  box-shadow: none !important;
}
</style>
