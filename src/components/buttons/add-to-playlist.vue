<template>
  <span 
    :class="{w100: inList}" 
    style="display:inline-block"
  >
    <!-- LIST -->
    <v-list-tile 
      v-if="inList" 
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
        id="a2p" 
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
      :fullscreen="$vuetify.breakpoint.xsOnly"
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
            append-Icon=""
            clearable
            no-data-text="Create new playlist"
            color="primary"
            hideNoData
            placeholder="Playlist name"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = 'Playlist name'"
            open-on-clear
            returnObject
            @keyup.enter='enter'
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
        <div 
          v-if="$vuetify.breakpoint.xsOnly" 
          class="fl-l"
        >
          <v-btn 
            color="primary" 
            @click.stop="enter"
          >Close</v-btn>
        </div>
        <div class="fl-r">
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
      type: [Array, Object, String],
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
    song: {
      immediate: true,
      handler: 'bind'
    }
  },
  computed: {
    cardHeight1 () {
      return this.$vuetify.breakpoint.xsOnly ? '100%' : '50%'
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
      this.emit(this.select || this.search)
      setTimeout(() => {
        this.$refs.auto.$children[0].isActive = false
      })
    },
    emit (v) {
      // if (!v) {
      //   return
      // }
      this.menuOpen = false
      this.$DCFB.playlistGet(this.$route.params.user, this.$route.params.playlist).once('value')
        .then((d) =>{
          if (typeof v === 'object') {
            this.$DCFB.playlistSongAdd(v['.key'], this.song)
            // state.snacku[0].user, state.snacku[0].playlist).set(state.snacku[0].songs)
            this.$store.dispatch('snack', { b: true, c:'primary', s:'Added to playlist', u: [{songs: d.val(), user: this.$route.params.user, playlist: v['.key']}]})
          } else {
            this.$store.dispatch('snack', { b: true, c:'primary', s:`Created new playlist`})
            this.$DCFB.createNewPlaylist(this.select || this.search, this.song)
          }
          // this.$store.dispatch('snack', { b: true, c:'primary', s:'Added to playlist' })
        })
    },
    openMenu () {
      this.$emit('clicked')
      this.menuOpen = !this.menuOpen
      setTimeout(() => { // nextTick better?
        // VTFY CLASS
        this.$refs.auto.$el.querySelector('.v-select__slot').click()
        this.$refs.auto.$el.querySelector('input').focus()
      }, 600)
    },

    bind () {
      this.select = ''
      if (this.$store.state.user.auth_state) {
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
