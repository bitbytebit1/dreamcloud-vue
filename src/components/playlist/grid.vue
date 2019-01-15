<template>
  <v-flex xs12>
    <!-- TABLE HEADER BUTTONS -->
    <v-card class="elevation-0">
      <v-card-title 
        v-if="full" 
        class="ma-0 pa-0"
      >
        <v-layout 
          row 
          wrap
        >
          <!-- HEADER BUTTONS -->
          <v-flex 
            xs6 
            lg2 
            class="text-xs-left mt-2"
          >
            <!-- ENABLE CHECK BOXES -->
            <v-tooltip top>
              <v-btn 
                v-if="auth_state" 
                slot="activator" 
                icon 
                @click="bSelect = !bSelect"
              >
                <v-icon :color="bSelect ? 'primary' : ''">check_box</v-icon>
              </v-btn>
              <span>Select multiple songs</span>
            </v-tooltip>

            <!-- TOGGLE VIEW -->
            <v-tooltip top>
              <v-btn 
                slot="activator" 
                icon 
                @click="$emit('toggleView')"
              >
                <v-icon>{{ view_mode ? 'view_module' : 'view_list' }}</v-icon>
              </v-btn>
              <span>Change view</span>
            </v-tooltip>

            <!-- SHUFFLE BUTTON -->
            <shuffle-button 
              :songs="songs" 
              @shuffleOn="$emit('shuffleOn', $event)"
              @shuffleOff="$emit('shuffleOff')"
            />

            <!-- FILTER BUTTON -->
            <v-tooltip top>
              <v-btn 
                slot="activator" 
                icon 
                @click="search.length > 0 ? search='' : $refs.search.focus()"
              >
                <v-icon>{{ search.length > 0 ? 'clear': 'filter_list' }}</v-icon>
              </v-btn>
              <span>Filter</span>
            </v-tooltip>
          </v-flex>
          <!-- FILTER -->
          <v-flex 
            xs5 
            lg9
          >
            <v-text-field
              id="flr-txt"
              ref="search"
              v-model="search"
              color="primary"
              label="Filter"
              single-line
              hide-details
              @focus="filterHasFocus = true"
              @blur="filterHasFocus = false"
              @keyup.enter="$UTILS.closeSoftMobi()"
            />
          </v-flex>
          <!-- SELECT BUTTONS -->
          <v-flex 
            v-if="bSelect" 
            xs12 
            lg12 
            class="text-xs-left"
          >
            <!-- SELECT ALL -->
            <v-tooltip 
              slot="activator" 
              top
            >
              <v-btn 
                slot="activator" 
                icon 
                @click="(bSelectAll = !bSelectAll, bSelectAll ? selected = Object.assign([], sorted) : selected = [])"
              >
                <v-icon :color="selected.length === filterLength ? 'primary' : ''">done_all</v-icon>
              </v-btn>
              <span>Select all</span>
            </v-tooltip>

            <download-button 
              :dis="selected.length == 0" 
              :links="selected"
            />

            <delete-button 
              v-if="$route.params.playlist" 
              :disabled="selected.length == 0" 
              @delete="removeList"
            />

            <add-to-playlist 
              v-if="auth_state" 
              key="multi" 
              :disabled="selected.length == 0" 
              :song="selected"
            />
            
            <v-flex d-inline-flex>{{ selected.length }} of {{ filterLength }}</v-flex>
            
          </v-flex>
        </v-layout>
      </v-card-title>
      <!-- V-DATA-ITERATOR -->
      <v-container 
        grid-list-lg 
        class="pa-0" 
        fluid
      >
        <v-data-iterator
          ref="dItera"
          :headers="headers"
          :items="songs"
          :pagination.sync="pagination"
          :rows-per-page-items='[24, 50, 100, { text: "All", value: -1 }]'
          :search="search"
          :hide-actions="!full"
          content-class="pa-0 ma-0"
          content-tag='v-layout'
          row
          wrap
        >
          <template slot="footer">
            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <v-list>
                <add-to-playlist 
                  :in-list="true" 
                  :song="bSelect ? selected : [chosenSong]"
                />
                <share-button 
                  :in-list="true" 
                  :song="chosenSong" 
                  :url="'https://dreamcloud.netlify.com/#/t/' + chosenSong.source + '/' + encodeURIComponent(chosenSong.artist) + '/' + chosenSong.trackID"
                />
                <delete-button 
                  v-if="chosenSong.key && !bSelect" 
                  :in-list="true" 
                  :id="chosenSong.key" 
                  @delete="bSelect ? removeList() : remove(chosenSong.key)"
                />
                <download-button 
                  :in-list="true" 
                  :links="bSelect ? selected : [chosenSong]"
                />
                <offlineButton 
                  :in-list="true" 
                  :link1="chosenSong.mp32" 
                  :link2="chosenSong.mp3" 
                  :track-id="chosenSong.trackID"
                />
              </v-list>
            </v-dialog>
          </template>
          <!-- NO DATA -->
          <template slot="no-data">
            <v-layout 
              row 
              wrap 
              class="ma-0 pa-0"
            >
              <v-flex 
                v-for="n in 36" 
                :key="n" 
                xs12
                sm6
                md4
                lg2
                xl2
                class="ma-0"
              >
                <v-card class="dc-crd ma-0 pa-0 pointer"> 
                  <!-- IMAGE -->
                  <v-img
                    :aspect-ratio="aspect || 1"
                    class="fillPlace"
                  >
                    <v-layout
                      slot="placeholder"
                      fill-height
                      align-center
                      justify-center
                      ma-0
                      class="grey--text"
                    >Loading</v-layout>
                  </v-img>
                  <v-card-title class="pa-0">
                    <!-- TITLE -->
                    <v-flex 
                      xs10 
                      class="dumTitle fillPlace pa-0 pt-1"
                    />
                    <!-- ARTIST -->
                    <!-- <v-flex xs9 class="dumArtist fillPlace pa-0 pt-1" v-if="$route.name !== 'artist'"> -->
                    <!-- </v-flex> -->
                    <!-- DATE -->
                    <v-flex 
                      xs4 
                      class="dumDate fillPlace pa-0 pt-1"
                    />
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </template>
          <!-- imsert transition here -->
          <!-- ITEM SLOT -->
          <v-flex 
            slot='item'
            slot-scope='props'
            xs12
            sm6
            md4
            lg2
            xl2
            @click.stop="
              // nasty ternary, if playlist push
              props.item.listID 
                ? $router.push({name: 'channelPlaylist', params: {listID: props.item.listID, artistID: props.item.artistID, title: props.item.title, source: props.item.source}}) 
                : 
                  !bSelect 
                    ? play(props.index)
                    : checkItem(props.item)
            "
          >
            <!-- :color="cardColor(props)"  -->
            <v-card 
              :color="cardColor(props)" 
              class="dc-crd ma-0 pa-0 pointer"
            >
              <!-- IMAGE -->
              <v-img
                :aspect-ratio="aspect"
                :src="props.item.posterLarge"
                :lazy-src="props.item.posterLarge"
                class="fillPlace"
              >
                <v-layout 
                  class="men text-xs-right"
                  align-end 
                  justify-end
                  row
                >
                  <!-- YOUTUBE BUTTON -->
                  <v-flex 
                    xs2
                    ma-0
                    pa-0
                  >
                    <v-tooltip 
                      top 
                      dark
                    >
                      <v-btn 
                        slot="activator"
                        color='white'
                        flat 
                        icon 
                        small
                        @click.stop="playProxy(props, true)"
                      >
                        <v-icon light>remove_red_eye</v-icon>
                      </v-btn>
                      <span>Watch</span>
                    </v-tooltip>
                  </v-flex>

                  <!-- PLAY AUDIO BUTTON -->
                  <!-- <v-flex 
                    xs12
                  >
                    <v-tooltip top>
                      <v-btn 
                        slot="activator"
                        color='white'
                        flat 
                        icon 
                        @click.stop="playProxy(props, false)"
                      >
                        <v-icon light>play_arrow</v-icon>
                      </v-btn>
                      <span>Play</span>
                    </v-tooltip>
                  </v-flex>
                </v-layout> -->
                </v-layout>
              </v-img>
              <!-- TITLE -->
              <v-card-title class="pa-0">
                <v-layout 
                  row 
                  wrap
                >
                  <v-flex xs10>
                    <!-- CHECK BOX -->
                    <v-flex 
                      v-show="bSelect" 
                      class="chkbx pa-1" 
                      @click.stop
                    >
                      <v-checkbox 
                        v-model="selected" 
                        :value="props.item" 
                        hide-details 
                        color='primary'
                      />
                    </v-flex>
                    <!-- TITLE -->
                    <v-flex class="text-xs-left body-2 grd-txt pa-0 pt-1">
                      {{ props.item.title }}
                    </v-flex>
                    <!-- ARTIST -->
                    <v-flex 
                      v-if="$route.name !== 'artist'" 
                      class="text-xs-left grd-txt pa-0 pt-1" 
                      @click.stop="bSelect ? checkItem(props.item) : $router.push({name: 'artist', params: {source: props.item.source, artist: props.item.artist, artistID: props.item.artistID}})"
                    >
                      <router-link 
                        :to="{name: 'artist', params: {source: props.item.source, artist: props.item.artist, artistID: props.item.artistID}}"
                        class="noDeco grey--text grd-txt" 
                      >
                        {{ props.item.artist }}
                      </router-link>
                    </v-flex>
                    <!-- DATE -->
                    <v-flex 
                      v-if="$route.params.artistID || showUploaded" 
                      class="text-xs-left grey--text grd-txt pa-0 pt-1"
                    >
                      {{ $DCAPI.calcDate(!1, props.item.uploaded) }} • {{ props.item.duration }}
                    </v-flex>
                  </v-flex>
                  <!-- SONG ACTIONS DROPDOWN MENU -->
                  <v-flex 
                    xs2 
                    class="ma-0 pa-0 pt-2" 
                    @click.stop
                  >
                    <v-tooltip 
                      top
                    >
                      <v-btn 
                        slot="activator"
                        icon 
                        small 
                        class="men fl-r ma-0 pa-0 mt-1" 
                        @click="(chosenSong = props.item, dialog = true)"
                      >
                        <v-icon>more_vert</v-icon>
                      </v-btn>
                      <span>Show more</span>
                    </v-tooltip>
                  </v-flex>
                  
                </v-layout>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-data-iterator>
      </v-container>
    </v-card>
  </v-flex>
</template>
<script>
import shuffleButton from '@/components/buttons/shuffle-button'
import offlineButton from '@/components/buttons/offline-button.vue'
import addToPlaylist from '@/components/buttons/add-to-playlist.vue'
import deleteButton from '@/components/buttons/delete-button'
import shareButton from '@/components/buttons/share-button'
import downloadButton from '@/components/buttons/download-button'
import { mapGetters } from 'vuex'
// /* eslint-disable */
export default {
  name: 'Grid',
  props: {
    songs: {
      type: Array,
      default() {
        return []
      }
    },
    sortBy: {
      type: [String],
      default: ''
    },
    rowsPerPage: {
      type: [Number, String],
      default: 10
    },
    full: {
      type: [Boolean],
      default: true
    },
    showUploaded: {
      type: [Boolean],
      default: false
    }
  },
  components: {
    'offlineButton': offlineButton,
    'add-to-playlist': addToPlaylist,
    'delete-button': deleteButton,
    'download-button': downloadButton,
    'shuffleButton': shuffleButton,
    'share-button': shareButton
  },
  watch: {
    'rowsPerPage': function (val) {
      this.pagination.rowsPerPage = val
    }
  },
  data () {
    return {
      chosenSong: [],
      dialog: false,
      bShow: false,
      filterHasFocus: false,
      bSelectAll: false,
      bSelect: false,
      selected: [],
      search: '',
      today: new Date(),
      loading: false,
      pagination: {
        rowsPerPage: this.rowsPerPage
      },
      items: this.songs,
      headers: [
        // { text: '', align: 'left', sortable: false, value: 'name' },
        { text: 'Title', value: 'title', align: 'left' },
        { text: 'Artist', value: 'artist', align: 'left' },
        { text: 'Date', value: 'uploaded', align: 'left' },
        { text: 'Source', value: 'source', align: 'left' },
        { text: 'Duration', value: 'duration', align: 'left' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      showVideo: 'showVideo',
      auth_state: 'auth_state',
      index: 'index',
      hash: 'hash',
      current_song: 'current_song',
      view_mode: 'view_mode',
      drawLeft: 'drawLeft',
      drawRight: 'drawRight',
      isYT: 'isYT'
    }),
    aspect () {
      return this.$route.name === 'artist' && this.$route.params.source !== 'YouTube'  ? '' : 16/9
    },
    filterLength () {
      return this.search.length && this.$refs.dItera.filteredItems.length ? this.$refs.dItera.filteredItems.length : this.songs.length
    },
    sorted () {
      //  returns the full sorted array for use with click
      if (this.$refs.dItera.pagination.rowsPerPage !== -1 && this.songs.length > this.$refs.dItera.pagination.rowsPerPage) {
        var a = this.$refs.dItera.pagination.rowsPerPage
        // eslint-disable-next-line
        this.$refs.dItera.pagination.rowsPerPage = -1
        var b = this.$refs.dItera.filteredItems.length ? this.$refs.dItera.filteredItems : this.songs
        // eslint-disable-next-line
        this.$refs.dItera.pagination.rowsPerPage = a
        return b
      } else {
        return this.$refs.dItera.filteredItems.length ? this.$refs.dItera.filteredItems : this.songs
      }
    }
  },
  methods: {
    playProxy (props, bShow) {
      // Fix for mobile on first play
      if (this.$store.getters.index === -1 && this.$UTILS.isMobile) this.$DCPlayer.eAudio.play()

      // store current value
      let a = this.showVideo
      this.$store.commit('showVideo', bShow)
      this.play(props.index)
      // restore old value after ^call
      this.$store.commit('showVideo', a)
    },
    cardColor (props) {
      if (this.bSelect) {
        return this.selected.some(el => el === props.item) ? 'primary' : ''
      } else {
        return this.isPlaying(props.item.trackID)
      }
    },
    checkItem (el) {
      var bFound = false
      for (let i = this.selected.length - 1; i >= 0; i--) {
        if (this.selected[i] === el) {
          this.selected.splice(i, 1)
          bFound = true
        }
      }
      if (!bFound) {
        this.selected.push(el)
      }
    },
    download (song) {
      this.$DCPlayer.getAudio(song.mp32, (data) => {
        this.$UTILS.downloadLink(data)
      })
    },
    downloadAll () {
      for (const i in this.selected) {
        setTimeout(() => { this.download(this.selected[i]) }, 1000 * i - 1)
      }
    },
    isPlaying (trackID) {
      return trackID === this.current_song.trackID ? 'primary white--text' : ''
    },
    remove (key) {
      this.$DCFB.playlistSongDelete(this.$route.params.playlist, key)
    },
    removeList () {
      for (const key in this.selected) {
        this.remove(this.selected[key].key)
      }
    },
    play (index) {
      // if (this.$store.getters.index === index && this.hash === this.$route.path) {
      if (this.sorted[index].trackID == this.$store.getters.current_song.trackID) {
        return this.$DCPlayer.togglePlay()
      }
      // console.log('playing')
      // show stage

      if (this.showVideo) {
        // console.log('showing stage')
        // this.$router.push({name: 'stage'})
        this.$store.commit('toggleStage')
      }
      // Fix for mobile on first play
      if (this.$store.getters.index === -1 && this.$UTILS.isMobile) this.$DCPlayer.eAudio.play()
      // If not first page fix index
      index = this.pagination.page === 1 ? index : (this.pagination.rowsPerPage * (this.pagination.page - 1)) + index
      this.$store.commit('setNPlay', {songs: this.sorted, current: index, path: this.$route.path})
      this.$DCPlayer.setNPlay(this.sorted, index)
      this.$DCFB.historyPush(this.sorted[index])
    }
  }
}
</script>
<style>

  @media only screen and (max-width: 1262px){
    .dc-crd .men {
      display:flex !important;
    }
  }
  @media only screen and (min-width: 1263px){
    .dc-crd:hover .men {
      /* transition: opacity 0.2s 1s ease; Mouse enter: delay */
      display:flex !important;
    }
    .men{
      /* transition: 1s 3s; */
      display: none !important;
      /* position: absolute !important; */
      /* top: 2px; */
      /* right: 5px; */
    }
  }
.dumTitle{
  margin-top: 4px;
  height: 24px;
}
.dumArtist{
  margin-top: 4px;
  height: 24px;
}
.dumDate{
  margin-top: 4px;
  height: 21px;
  width: 75px !important;
}

.grd-cnt{
  position: absolute;
  bottom: 0px;
}
.chkbx{
  position: absolute;
  top: 0px;
  left: 15px;
}
.dc-crd.primary .grd-txt{
  color: white !important;
}
.v-card__media[lazy=error] {
  background: center center / cover no-repeat;
}
.v-card__media[lazy=loading] {
  background: center center / cover no-repeat;
}
.v-card__media[lazy=loaded] {
  background: center center / cover no-repeat;
}
.card-duration{
  color: white;
  text-shadow: 0px 0px 5px black;
  background: rgba(1, 1, 1, .5);
  position: absolute;
  bottom: 2px;
  right:4px;
}
.dc-crd{
  box-shadow: unset !important;
  height: 100% !important;
}
.dc-crd .text-xs-left{
  width: 100%;
}

/* @-moz-document url-prefix() { */
  /* .dc-crd .subheading, .dc-crd .artist{ */
    /* white-space: pre-wrap; */
    /* word-break: break-all; */
  /* } */
/* } */

.slide-fade-enter-active {
  transition: all 2s;  
  /* transform: rotate3d(0, 1, 0, -180deg); */
}

.slide-fade-leave-active {
  transition: all 2s;
  /* transform: rotateY(-360deg); */
  /* transform: rotate3d(0, 1, 0, 18q0deg); */
}

.slide-fade-enter{
  transition: all .5s;
  /* transform: rotateY(360deg); */
  transition: all .5s;
  /* transform: rotate3d(1,2, -360deg, 360deg); */
  opacity: 1;
}

.slide-fade-leave-to{
  transition: all .5s;
  /* transform: rotate3d(1,2, -360deg, 360deg); */
  opacity: 0;
}

.slide-fade-move {
  transition: transform 1s;
}

</style>
