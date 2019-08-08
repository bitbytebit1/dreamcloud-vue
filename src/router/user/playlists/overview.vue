<template>
  <v-flex 
    flexbox 
    xs12 
    lg10 
    class="ma-0 pa-0"
  >
    <div class="headline fwl text-xs-left pl-2 pt-2">Playlists</div>
    <v-container 
      fluid 
      grid-list-md 
      class="ma-0 pa-0"
    >
      <v-flex 
        xs12 
        class="mb-3"
      >
        <!-- filter -->
        <v-text-field
          id="flr-txt"
          ref="search"
          v-model="search"
          clearable
          color="primary"
          placeholder="Filter"
          onfocus="this.placeholder = ''"
          onblur="this.placeholder = 'Filter'"
          single-line
          hide-details
          class="px-1"
          @focus="filterHasFocus = true"
          @blur="filterHasFocus = false"
          @keyup.enter="$UTILS.closeSoftMobi()"
        />
      </v-flex>
      <v-data-iterator
        v-if="$store.state.user.auth_state"
        :items="aPlaylist"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :custom-filter="(items, search, filter) => { search = search.toString().toLowerCase() ; return items.filter(row => filter(row['name_lower'], search)) }"
        content-tag="v-layout"
        row
        wrap
        pagination.sync="pagination"
        hide-actions
      >
        <v-flex   
          slot="item"
          slot-scope="props"
          xs4
          md3
          lg2
        >
          <!-- {{props.item['.key']}} -->
          <!-- {{props.item.name_lower}} -->
          <!-- {{props.item.songs[Object.keys(props.item.songs)[0]].poster}} -->
          <!-- Object.keys(aPlaylist[props.index].songs)[0] -->
          <v-card 
            :to="{name: 'userPlaylist', params: {user: user, playlist: props.item['.key'], name: props.item.name}}"
            height="100%" 
            width="100%" 
            class="pointer"
          >
            <!-- IMAGE -->
            <v-img
              :src="props.item.songs[Object.keys(props.item.songs)[0]].posterLarge"
              aspect-ratio="1"
              class="fillPlace"
            >
              <div
                class="d-flex text-xs-center v-card--reveal"
                style="height: 100%;"
              >
                <div 
                  class="playBtn"
                >
                  <v-btn 
                    :class="isPlaying (`/u/${user}/${props.item['.key']}/${props.item['name']}`) ? 'primary' : ''"  
                    dark
                    icon
                    large
                    @click.prevent="$store.getters.isPlaying && isPlaying (`/u/${user}/${props.item['.key']}/${props.item['name']}`) ? $DCPlayer.pause() : playPlaylist(props.item, 0)"
                  >
                    <v-icon>{{ $store.getters.isPlaying && isPlaying (`/u/${user}/${props.item['.key']}/${props.item['name']}`) ? 'pause' : 'play_arrow' }}</v-icon>
                  </v-btn>
                </div>
                <div 
                  class="shuffBtn"
                >
                  <v-btn 
                    dark
                    icon
                    large
                    @click.prevent="playPlaylist(props.item, true)"
                  >
                    <v-icon>shuffle</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-img>
            <v-card-text class="text-xs-center"><div class="ma-0 pa-0">{{ props.item.name }}</div><div class="grey--text ma-0 pa-0">{{ Object.keys(props.item.songs).length }}</div></v-card-text>
          </v-card>
        </v-flex>
      </v-data-iterator>
    </v-container>
  </v-flex>
</template>
<script>
// /* eslint-disable */
// import deleteButton from '@/components/buttons/delete-button'
export default {
  name: 'PlaylistOverview',
  props: {
    user: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      filterHasFocus: false,
      search: '',
      active: true,
      rowsPerPageItems: [{ text: 'All', value: -1 }],
      pagination: {
        rowsPerPage: 'All'
      }
    }
  },
  created () {
    this.bind()
  },
  methods: {
    isPlaying (item) {
      return this.$store.getters.hash == item 
    },
    playPlaylist (aPlaylist, shuffle) {

      let aSongs = []
      for (var key in aPlaylist.songs) {
        aSongs.push(aPlaylist.songs[key]);
      }
      if (shuffle) {
        aSongs = this.$UTILS.shuffle(aSongs)
      }
      if (this.$store.state.player.current_index === -1 && this.$UTILS.isMobile){
        // bug fix, passing the play event from here, 
        // which is called on click is important the first time on movbile
        this.$DCPlayer.eAudio.play()
        // hacky bug fix, need to 'see' the player first time before it will load
      } else if (!this.showVideo && aSongs[0].source == 'YouTube' && typeof this.$store.getters.ytState.data === 'number') {
        this.$nextTick(() => {
          this.$store.commit('show_pop', true)
          let f = () => setTimeout(() => { 
            this.$store.getters.ytIsPlaying ? this.$store.commit('show_pop', false) : f()
          }, 150)
          f()
        })
      }
      this.$DCPlayer.setNPlay({songs: aSongs, current: 0, path: `/u/${this.user}/${aPlaylist['.key']}/${aPlaylist['name']}`})
      this.$DCFB.historyPush(aSongs[0])
    },
    bind () {
      // very likely that it will be faster to query the first song of every playlist 
      // instead of getting all songs from all playlists
      this.$bindAsArray('aPlaylist', this.$DCFB.playlistGetAll(this.user).orderByChild('name_lower'))
    }
  }
}
</script>

<style>
.sl{
  color: white;
  /* text-shadow: 0px 0px 5px black; */
  /* background: rgba(1, 1, 1, .5); */
  position: absolute;
  bottom: 0px;
  right: 0px;
}

.v-card--reveal div.shuffBtn{
  bottom: 0;
  left: 0px;
  position: absolute;
}
</style>
