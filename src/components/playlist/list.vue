<template>
  <v-flex xs12>
    <!-- TABLE CARD -->
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
            shrink
            class="text-xs-left mt-2"
          >
            <!-- ENABLE CHECK BOXES -->
            <v-tooltip top >
              <v-btn 
                v-if="$store.state.user.auth_state" 
                slot="activator" 
                icon 
                @click="(bSelect = !bSelect, bSelect ? headers.unshift({ class: 'ma-0', width: '10px', text: '', value: '', align: 'left', sortable: false }): headers.shift())"
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
            <!-- SORT BUTTON -->
            <sortButton 
              :songs="songs" 
              @sorted="items = $event"
            />
          </v-flex>
          <!-- FILTER --> 
          <!-- MOVE TO BEFORE BUTTONS ON MOBILE ONLY USING FLEX PROP -->
          <v-flex 
            xs4 
            lg5
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
            xs8 
            lg12 
            class="text-xs-left"
          >
            <!-- SELECT ALL -->
            <v-tooltip top>
              <v-btn 
                slot="activator" 
                icon 
                @click="(bSelectAll = !bSelectAll, bSelectAll ? selected = sorted : selected = [])"
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
              key="multi" 
              :disabled="selected.length == 0" 
              :song="selected"
            />

            <v-flex d-inline-flex>{{ selected.length }} of {{ filterLength }}</v-flex>
          </v-flex>
        </v-layout>
      </v-card-title>
      <!-- DATA-TABLE -->
      <v-data-table
        ref="dtable"
        :headers="headers"
        :items="songs"
        :item-key="itemKey"
        :pagination.sync="pagination"
        :rows-per-page-items='[25, 50, 100, { text: "All", value: -1 }]'
        :search="search"
        v-model="selected"
        class="dtable"
      >
        <template 
          slot="no-data"
        >
          <tr 
            v-for="n in 36" 
            :key="n"
          >
            <!-- IMAGE -->

            <td 
              v-if="!bMini" 
              class="pa-2" 
            >
              <v-img
                :aspect-ratio="aspect"
                class="fillPlace"
                src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
              >
                <v-layout 
                  slot="placeholder" 
                  fill-height 
                  align-center 
                  justify-center 
                  ma-0
                  grey--text
                />
              </v-img>
            </td> 
            <td 
              class="text-xs-left pl-3 py-1"
            ><div 
              style="height:21px; width:200px;" 
              class="fillPlace"
            />
              <div 
                class="fillPlace mt-1"
                style="height:16px; width:160px;" 
            /></td>
            
            <!-- ARTIST -->
            <td 
              v-if="!$route.params.artistID" 
              class="fillPlace1 dumTd "
            />

            <td 
              class="fillPlace1"
            />
            <td 
              class="fillPlace1"
            />
            
            <td />
            <!-- ACTIONS -->
            <td 
              v-if="bMini" 
              class="fillPlace1 dumTd"
            >
              <v-btn 
                icon 
                small 
              >
                <v-icon>more_vert</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
        <!-- <template slot="expand" slot-scope="props">
          <v-card flat>
            <v-card-text>{{props.item.description}}</v-card-text>
          </v-card>
        </template> -->
        <!-- slot="items" slot-scope="props" -->
        <template 
          v-slot:items="props"  
        >
          <!-- <v-hover 
            :value="isPlaying(props.item.trackID)"
            :disabled="isPlaying(props.item.trackID)"
          >  -->
          <tr 
            :key="props.index" 
            :id="bSelect ? 'noSel' : ''" 
            :class="isPlaying(props.item.trackID) ? 'primary white--text text-xs-left pa-0 ma-0' : 'text-xs-left pa-0 ma-0'"
            class="mb-3 pointer wordbreak'"
            @click.stop="
              // if not track ID go to artist
              !props.item.trackID 
                ? $router.push({name: 'artist', params: {source: props.item.source, artist: props.item.title, artistID: props.item.artistID }}) 
                // else if listID open playlist
                : !props.item.listID 
                  // else if select check item
                  ? !bSelect 
                    // else play
                    ? play(props.index, !showVideo, isPlaying(props.item.trackID))
                    : checkItem(props.item)
            : $router.push({name: 'channelPlaylist', params: {listID: props.item.listID, artistID: props.item.artistID, title: props.item.title, source: props.item.source}})"
            @contextmenu="!props.item.trackID ? false : $emit('conmen', [$event, bSelect ? selected : [props.item]])"
          >
            <!-- CHECK_BOX -->
            <td 
              v-if="bSelect"
            >
              <v-checkbox 
                v-model="selected"
                :value="props.item" 
                hide-details 
                color='primary' 
                @click.stop
              />
            </td>
            <!-- IMAGE -->
            <!-- 1 -->
            <td 
              v-if="!bMini"
              class="pa-2" 
            >
              <v-img
                v-if="props.item.trackID"
                :aspect-ratio="props.item.source == 'YouTube' ? 16/9 : 1"
                :src="props.item.posterLarge"
                class="fillPlace" 
                align-end 
                justify-end 
                fill-height
              >
                <div
                  v-if="props.item.trackID && isPlaying(props.item.trackID) && $vuetify.breakpoint.mdAndUp"
                  class="d-flex text-xs-center v-card--reveal"
                  style="height: 100%;"
                >
                  <div class="playBtn">
                    <v-btn 
                      :loading="$store.getters.isLoading && isPlaying (props.item.trackID)"
                      dark  
                      icon
                      large
                      color="primary"
                      @click.stop="play(props.index)"
                    >
                      <v-icon>{{ $store.getters.isPlaying && isPlaying (props.item.trackID)? 'pause' : 'play_arrow' }}</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-img>
            </td>
            <!-- TITLE + ARTIST + UPLOADED + DURATION + DESCRIPTION-->
            <!-- 2 -->
            <td 
              :colspan="$route.params.artistID ? '2' : '3'"
              class="text-xs-left pl-3 py-1" 
            >
              <!-- TITLE -->
              <div 
                class="body-1 wordbreak" 
                v-text="props.item.title"
              />
              <div 
                :class="isPlaying(props.item.trackID) ? 'white-text' : 'grey--text'" 
                class="ma-0 pa-0"
              >
                <!-- ARTIST -->
                <a 
                  v-if="!$route.params.artistID && !bSelect && !$UTILS.isMobile" 
                  :href="shareArtistURL(props.item)" 
                  :class="isPlaying(props.item.trackID) ? 'white-text' : 'grey--text'" 
                  class="noDeco" 
                  @click.stop
                >{{ props.item.artist }} • </a>
                <span 
                  v-else-if="bSelect || !$UTILS.isMobile" 
                  :class="isPlaying(props.item.trackID) ? 'white-text' : 'grey--text'" 
                >{{ props.item.artist }} • </span>
                <!-- UPLOADED + DURATION -->
                <span>{{ date(props.item.uploaded) }} • {{ props.item.duration }}</span>
                <!-- DESCRIPTION -->
                <!-- <div 
                    v-if="!$vuetify.breakpoint.xs" 
                    class="preline wordbreak mh-2 mt-12"
                  >{{ props.item.description }}</div> -->
              </div>
            </td>
            <!-- Artist -->
            <!-- <td v-if="!$route.params.artistID"/> -->
            <!-- <td v-if="bMini"/> -->
            <!-- 4 -->
            <!-- ACTIONS -->
            <td 
              v-if="!bSelect && props.item.trackID"
              @click.stop="$emit('conmen', [$event, bSelect ? selected : [props.item]])"
            >
              <v-icon >more_vert</v-icon>
            </td>

          </tr>
          <!-- </v-hover> -->
        </template>
      </v-data-table>
    </v-card>
  </v-flex>
</template>

<script>
// /* eslint-disable */
import addToPlaylist from '@/components/buttons/add-to-playlist.vue'
import deleteButton from '@/components/buttons/delete-button'
import shuffleButton from '@/components/buttons/shuffle-button'
import sortButton from '@/components/buttons/sort-button'
import downloadButton from '@/components/buttons/download-button'
import shareButton from '@/components/buttons/share-button'
import offlineButton from '@/components/buttons/offline-button.vue'
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'List',
  // props: ['songs', 'sortBy'],
  props: {
    songs: {
      type: [Array],
      required: true
    },
    bMini: {
      type: [Boolean],
      default: false
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
    }
  },
  components: {
    'add-to-playlist': addToPlaylist,
    'delete-button': deleteButton,
    'download-button': downloadButton,
    'share-button': shareButton,
    'shuffleButton': shuffleButton,
    'sortButton': sortButton,
    'offlineButton': offlineButton
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
      bSelectAll: false,
      filterHasFocus: false,
      itemKey: 'mp32',
      bSelect: false,
      selected: [],
      pagination: {
        sortBy: this.sortBy,
        rowsPerPage: this.rowsPerPage,
        descending: true
      },
      search: '',
      today: new Date()
    }
  },
  created () {
    // set key to use based on whether this is a playlist
    this.itemKey = this.$route.params.playlist ? 'key' : 'trackID'

  },
  computed: {
    ...mapState({
      view_mode: state => state.user.view_mode,
    }),
    ...mapGetters({
      showVideo: 'showVideo'
    }),
    headers () {
      if (this.$route.params.artistID) {
        return [
          { text: 'Title', value: 'title', align: 'left', class: 'ma-0', width: this.bMini ? '95%': '15%'},
          { text: 'Duration', value: 'duration', align: 'left', class: 'ma-0', width: '0px'},
          { text: 'Date', value: 'uploaded', align: 'left', class: 'ma-0', width: '0px' },
          { text: 'Description', value: 'description', align: 'left', class: 'hidden', width: '0px'}
        ]
      } else {
        return [
          { text: 'Title', value: 'title', align: 'left', class: 'ma-0', width: this.bMini ? '95%': '15%'},
          { text: 'Artist', value: 'artist', align: 'left', class: 'ma-0 pa-0' },
          { text: 'Duration', value: 'duration', align: 'left'},
          { text: 'Date', value: 'uploaded', align: 'left', class: 'ma-0 pa-0' },
          { text: 'Description', value: 'description', align: 'left', class: 'hidden'}
        ]
      }
    },
    aspect () {
      return this.$route.name === 'artist' && this.$route.params.source !== 'YouTube'  ? 1 : 16 / 9
    },
    sorted () {
      //  returns the full sorted array for use with click

      // if pagination != 'all' and songs.length is longer then current items per page
      if (this.$refs.dtable.pagination.rowsPerPage !== -1 && this.songs.length > this.$refs.dtable.pagination.rowsPerPage) {
        // console.log('getting sorted')
        //backup rowsPerPage value
        var a = this.$refs.dtable.pagination.rowsPerPage
        // set to all
        // eslint-disable-next-line
        this.$refs.dtable.pagination.rowsPerPage = -1
        //if we are filtering then  filtereditems  if not this.songs
        var b = Object.assign([], this.$refs.dtable.filteredItems.length ? this.$refs.dtable.filteredItems : this.songs)

        // resest the rowsPerPage value to previously saved
        // eslint-disable-next-line
        this.$refs.dtable.pagination.rowsPerPage = a
        // console.log(b)
        return b
      } else {
        // console.log('getting sorted 2')
        return Object.assign([], this.$refs.dtable.filteredItems.length ? this.$refs.dtable.filteredItems : this.songs)
      }
    },
    artistID () {
      return '/#/a/' + this.song.source + '/' + this.song.artist + '/' + this.song.artistID
    },
    filterLength () {
      return this.search.length && this.$refs.dtable.filteredItems.length ? this.$refs.dtable.filteredItems.length : this.songs.length
    }
  },
  methods: {
    checkItem (el) {
      // console.log('checking')
      var bFound = false
      for (let i = this.selected.length - 1; i >= 0; i--) {
        if (this.selected[i] === el) {
          // console.log('found', this.selected[i])
          this.selected.splice(i, 1)
          bFound = true
        }
      }
      if (!bFound) {
        // console.log('not found')
        this.selected.push(el)
      }
    },
    addSong (song) {
      return this.bSelect && this.selected.length ? this.selected : song
    },
    remove (key) {
      this.$DCFB.playlistSongDelete(this.$route.params.playlist, key)
    },
    removeList () {
      for (const key in this.selected) {
        this.remove(this.selected[key].key)
      }
      this.selected = []
    },
    shareArtistURL (song) {
      return '#/a/' + song.source + '/' + encodeURIComponent(song.artist) + '/' + song.artistID
    },
    isPlaying (trackID) {
      if (this.$store.state.player.current_index === -1) {
        return
      }
      return this.$store.getters.current_trackID === trackID
    },
    date (date) {
      return this.$DCAPI.calcDate(this.today, date)
    },
    play (index, pauseIfSame = true, showStage = false) {
      if (this.$store.state.player.current_index === -1 && this.$UTILS.isMobile) this.$DCPlayer.eAudio.play()
      // If not first page fix index
      let newi = this.pagination.page === 1 ? index : (this.pagination.rowsPerPage * (this.pagination.page - 1)) + index
      // if (this.$store.state.player.current_index === index && this.hash === this.$route.path) {
      if (showStage) {
        // return this.$router.push({name: 'stage'})
        return this.$router.push({name: 'auto', params: { artist: this.sorted[newi].artist,  trackID: this.sorted[newi].trackID,  source: this.sorted[newi].source }})
      }
      if (pauseIfSame && this.sorted[index].trackID == this.$store.getters.current_song.trackID) {
        return this.$DCPlayer.togglePlay()
      }
      
      this.$DCPlayer.setNPlay({songs: this.sorted, current: newi, path: this.$route.path})
      this.$DCFB.historyPush(this.sorted[newi])
      if (showStage || this.showVideo) {
        // console.log('showing stage')
        // this.$router.push({name: 'stage'})
        this.$router.push({name: 'auto', params: { artist: this.sorted[newi].artist, trackID: this.sorted[newi].trackID, source: this.sorted[newi].source }})
        // this.$store.commit('toggleStage')
      }
    }
  }
}
</script>

<style>
  .mouseme{
    width:35px;
    opacity: 0.0;
  }
  tr:hover .mouseme{
    opacity: 1!important;
  }

  .tr.primary .grd-txt{
    color: white !important;
  }
  @media only screen and (max-width: 1262px){
    .tr .men {
      display:flex !important;
    }
  }
  @media only screen and (min-width: 1263px){
    .tr:hover .men {
      display:flex !important;
    }
    .men{
        display: none !important;
        /* position: absolute !important; */
        /* top: 2px; */
        /* right: 5px; */
    }
  }
  .dumTd{
    padding: 4px!important;
    height: 20px!important;
  }
  .mh-2{
    max-height: 60px !important;
    overflow:hidden !important;
  }
  table {
    border-collapse:separate; 
    border-spacing: 0 5em;
  }

  .artist-dark{
    color: white
  }
  .artist-light{
    color: black
  }
  .hidden{
    display: none;
  }
  @media only screen and (max-width: 599px){
    /* table.table tbody td:not(:first-child),  */
    td:nth-child(2), td:nth-child(3), td:nth-child(4){
      word-break: break-word;
    }
    table td,
    table th:not(:first-child){
      padding: 0 1px!important;
    }
    table td:first-child,
    table th:first-child{
      padding: 0 0 0 1px!important;
    }
    th {
      /* width: 20px !important; */
      padding: 0 !important;
    }

  }
  @media only screen and (min-width: 600px){
  }
</style>