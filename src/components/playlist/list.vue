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
                v-if="$store.getters.auth_state" 
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
            
            <!-- FOCUS SEARCH BAR BUTTON -->
            <v-tooltip top>
              <v-btn 
                slot="activator" 
                icon 
                @click="search.length > 0 ? search = '' : $refs.search.focus()"
              >
                <v-icon>{{ search.length > 0 ? 'clear': 'filter_list' }}</v-icon>
              </v-btn>
              <span>Filter</span>
            </v-tooltip>
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
            lg5 
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
              v-if="$store.getters.auth_state" 
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
              />
            </td> 
            <td 
              class="text-xs-left pa-0 ma-0 body-1"
              style="padding-left:42px !important;"
            >
              Loading
            </td>

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
        <template 
          slot="items" 
          slot-scope="props"
        >
          <v-hover 
            :value="isPlaying(props.item.trackID)"
            :disabled="isPlaying(props.item.trackID)"
          >
            <tr 
              slot-scope="{ hover }" 
              :key="props.index" 
              :id="bSelect ? 'nosel' : ''" 
              :class="$vuetify.breakpoint.name === 'xs' && isPlaying(props.item.trackID) ? 'primary white--text text-xs-left pa-0 ma-0' : 'text-xs-left pa-0 ma-0'"
              class="mb-3 pointer wordbreak'"

              @click.stop="props.item.listID ? 
                $router.push({name: 'channelPlaylist', params: {listID: props.item.listID, artistID: props.item.artistID, title: props.item.title, source: props.item.source}}) 
                : !bSelect ? 
                  play(props.index, !showVideo, isPlaying(props.item.trackID))
              : props.selected = !props.selected"
              @contextmenu="$emit('conmen', [$event, bSelect ? selected : [props.item]])"
            >
              <!-- CHECK_BOX -->
              <td v-if="bSelect">
                <v-checkbox 
                  :color="isPlaying(props.item.trackID) ? 'white' : 'primary'" 
                  v-model="props.selected" 
                  hide-details
                />
              </td>
              <!-- ~~~~~~~~~~~~ NOT MINI ~~~~~~~~~~~~ -->
              <!-- IMAGE -->
              <td 
                v-if="!bMini" 
                class="pa-2"
              >
                <v-img
                  :aspect-ratio="aspect"
                  :src="props.item.posterLarge"
                  class="fillPlace"
                >
                  <v-layout 
                    align-end 
                    justify-end 
                    fill-height
                  >
                    <v-expand-transition>
                      <div
                        v-if="hover || isPlaying(props.item.trackID)"
                        class="d-flex text-xs-center transition-fast-in-fast-out v-card--reveal"
                        style="height: 100%;"
                      >
                        <div>
                          <v-btn 
                            :loading="$store.getters.isLoading && isPlaying (props.item.trackID)"
                            icon
                            color="primary"
                            @click.stop="play(props.index)"
                          >
                            <v-icon>{{ $store.getters.isPlaying && isPlaying (props.item.trackID) ? 'pause' : 'play_arrow' }}</v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </v-expand-transition>
                  </v-layout>
                </v-img>
              </td>
            
              <!-- TITLE + ARTIST + UPLOADED + DURATION + DESCRIPTION-->
              <td 
                v-if="!bMini"
                :colspan="!$route.params.artistID ? '2' : '1'" 
                class="text-xs-left"
              >
                <!-- TITLE -->
                <div :class="$vuetify.breakpoint.name === 'xs' ? 'body-1 ' : 'body-1'">{{ props.item.title }}</div>
                <div class="ma-0 pa-0">
                  <!-- ARTIST -->
                  <a 
                    v-if="!$route.params.artistID && !bSelect" 
                    :class="artistClass(props.item.trackID)" 
                    :href="shareArtistURL(props.item)" 
                    @click.stop
                  >{{ props.item.artist }} • </a>
                  <span 
                    v-else-if="bSelect" 
                    :class="artistClass"
                  >{{ props.item.artist }} • </span>
                  <!-- UPLOADED + DURATION -->
                  <span>{{ date(props.item.uploaded) }} • {{ props.item.duration }}</span>
                  <!-- DESCRIPTION -->
                  <div 
                    v-if="!$vuetify.breakpoint.xs" 
                    class="preline wordbreak mh-2 mt-12"
                  >{{ props.item.description }}</div>
                </div>
              </td>

              <td 
                v-if="bMini && $vuetify.breakpoint.smAndUp" 
                class="text-xs-left"
              >
                <!-- PLAY BUTTON -->
                <v-btn 
                  :loading="$store.getters.isLoading && isPlaying (props.item.trackID)"
                  :class="isPlaying (props.item.trackID) ? '' : 'mouseme'"
                  class="ma-0 pa-0"
                  icon
                  small
                  @click.stop="play(props.index)"
                >
                  <v-icon>{{ $store.getters.isPlaying && isPlaying (props.item.trackID)? 'pause' : 'play_arrow' }}</v-icon>
                </v-btn>
              </td>
              <!-- ~~~~~~~~~~~~  MINI ~~~~~~~~~~~~ -->
              <!-- TITLE + PLAY BUTTON -->
              <td 
                v-if="bMini" 
                class="text-xs-left pa-0 ma-0 wordbreak"
              >
                {{ props.item.title }}
              </td>

              <!-- ARTIST -->
              <td 
                v-if="bMini && !$route.params.artistID"
                class="ma-0 pa-0"
              >
                <a 
                  v-if="!$route.params.artistID" 
                  :class="artistClass(props.item.trackID)" 
                  :href="shareArtistURL(props.item)" 
                  @click.stop
                >{{ props.item.artist }}</a>
                <span 
                  v-else-if="!bSelect" 
                  :class="artistClass"
                >{{ props.item.artist }}</span>
              </td>
              <!-- DURATION -->
              <td 
                v-if="bMini"
              >
                {{ props.item.duration }}
              </td>
              <!-- UPLOADED -->
              <td 
                v-if="!$vuetify.breakpoint.xs && bMini"
              >
                {{ date(props.item.uploaded) }}
              </td>

              <!-- </td> -->


              <!-- ACTIONS -->
              <td 
                v-if="!bSelect" 
                @click.stop
              >
                <v-btn 
                  icon 
                  small 
                  @click="$emit('conmen', [$event, bSelect ? selected : [props.item]])"
                >
                  <v-icon>more_vert</v-icon>
                </v-btn>
              </td>

            </tr>
          </v-hover>
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
import downloadButton from '@/components/buttons/download-button'
import shareButton from '@/components/buttons/share-button'
import offlineButton from '@/components/buttons/offline-button.vue'
import { mapGetters } from 'vuex'

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
    'offlineButton': offlineButton
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
      actions: [
        {'icon': 'file_download', func: this.download}
      ],
      today: new Date()
    }
  },
  created () {
    // set key to use based on whether this is a playlist
    this.itemKey = this.$route.params.playlist ? 'key' : 'trackID'

  },
  computed: {
    ...mapGetters({
      showVideo: 'showVideo',
      view_mode: 'view_mode'
    }),
    headers () {
      let r
      if (this.bMini) {
        r = [
          { text: 'Title', value: 'title', align: 'left', class: 'ma-0 pa-0', width: this.$vuetify.breakpoint.xs ? '70%' : '42%'},
          { text: 'Duration', value: 'duration', align: 'left'},
          { text: 'Date', value: 'uploaded', align: 'left', class: 'ma-0 pa-0' },
          { text: 'Description', value: 'description', align: 'left', class: 'hidden'},
          { text: '', value: '', align: 'left', sortable: false }
        ]
      } else {
        r = [
          { text: 'Title', value: 'title', align: 'left', class: 'ma-0', width: this.listViewSmall ? '14%' : this.$vuetify.breakpoint.xs ? '15%' : '15%'},
          { text: 'Duration', value: 'duration', align: 'left'},
          { text: 'Date', value: 'uploaded', align: 'left', class: 'ma-0 pa-0' },
          { text: 'Description', value: 'description', align: 'left', class: 'hidden'},
          { text: '', value: '', align: 'left', sortable: false }
        ]
      }
      if (!this.$route.params.artistID && r.length < 5) {
        r.splice(1, 0, { text: 'Artist', value: 'artist', align: 'center' })
      }
      if (this.bMini && this.$vuetify.breakpoint.smAndUp) {
        r.splice(0, 0, {align: 'center', class: 'ma-0 pa-0', width: '25px', sortable: false})
      }
      return r
    },
    aspect () {
      return this.$route.name === 'artist' && this.$route.params.source !== 'YouTube'  ? '' : 16 / 9
    },
    sorted () {
      //  returns the full sorted array for use with click

      // if pagination != 'all' and songs.length is longer then current items per page
      if (this.$refs.dtable.pagination.rowsPerPage !== -1 && this.songs.length > this.$refs.dtable.pagination.rowsPerPage) {
        //backup rowsPerPage value
        var a = this.$refs.dtable.pagination.rowsPerPage
        // set to all
        // eslint-disable-next-line
        this.$refs.dtable.pagination.rowsPerPage = -1
        //if we are filtering then  filtereditems  if not this.songs
        var b = this.$refs.dtable.filteredItems.length ? this.$refs.dtable.filteredItems : this.songs
        // resest the rowsPerPage value to previously saved
        // eslint-disable-next-line
        this.$refs.dtable.pagination.rowsPerPage = a
        return b
      } else {
        return this.$refs.dtable.filteredItems.length ? this.$refs.dtable.filteredItems : this.songs
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
    // Watch
    playProxy (props, bShow) {
      // Fix for mobile on first play DIRTY DUPE, SEE PLAY
      if (this.$store.getters.index === -1 && this.$UTILS.isMobile) this.$DCPlayer.eAudio.play()

      // store current value
      let a = this.showVideo
      this.$store.commit('showVideo', bShow)
      this.play(props.index , false)
      // restore old value after ^call
      this.$store.commit('showVideo', a)
    },
    artistClass () {
      return {
        'text-xs-left': true,
        'artist-dark': this.$store.getters.theme.dark,
        'artist-light': this.$store.getters.theme.light,
        'grd-txt':  true,
        'noDeco': true
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
    downloadAll () {
      for (const i in this.selected) {
        setTimeout(() => { this.download(this.selected[i]) }, 1000 * i - 1)
      }
    },
    download (song) {
      this.$DCPlayer.getAudio(song.mp32, (data) => {
        this.$UTILS.downloadLink(data)
      })
    },
    shareArtistURL (song) {
      return '#/a/' + song.source + '/' + encodeURIComponent(song.artist) + '/' + song.artistID
    },
    isPlaying (trackID) {
      if (this.$store.getters.index === -1) {
        return
      }
      return this.$store.getters.current_trackID === trackID
    },
    date (date) {
      return this.$DCAPI.calcDate(this.today, date)
    },
    play (index, pauseIfSame = true, showStage = false) {
      let b = this.sorted[index].trackID === this.$store.getters.current_song.trackID
      if (pauseIfSame && b) {
        return this.$DCPlayer.togglePlay()
      }
      // Fix for mobile on first play
      if (this.$store.getters.index === -1 && this.$UTILS.isMobile) this.$DCPlayer.eAudio.play()
      // If not first page fix index
      let newi = this.pagination.page === 1 ? index : (this.pagination.rowsPerPage * (this.pagination.page - 1)) + index
      this.$store.commit('setNPlay', {songs: this.sorted, current: index, path: this.$route.path})
      this.$DCPlayer.setNPlay(this.sorted, newi)
      this.$DCFB.historyPush(this.sorted[newi])
      // show stage
      if (showStage || this.showVideo) {
        // this.$router.push({name: 'stage'})
        this.$router.push({name: 'auto', params: { artist: this.sorted[newi].artist,  trackID: this.sorted[newi].trackID,  source: this.sorted[newi].source }})
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