<template>
  <v-flex xs12>
    <!-- TABLE CARD -->
    <v-card class="elevation-0">
      <v-card-title 
        v-if="full" 
        class="ma-0 pa-0">
        <v-layout 
          row 
          wrap>
          <!-- HEADER BUTTONS -->
          <v-flex 
            xs6 
            lg2 
            class="text-xs-left mt-2">
            <!-- ENABLE CHECK BOXES -->
            <v-tooltip top >
              <v-btn 
                v-if="$store.getters.auth_state" 
                slot="activator" 
                icon 
                @click="(bSelect = !bSelect, bSelect ? headers.unshift({ class: 'ma-0', width: '10px', text: '', value: '', align: 'left', sortable: false }): headers.shift())">
                <v-icon :color="bSelect ? 'primary' : ''">check_box</v-icon>
              </v-btn>
              <span>Select multiple songs</span>
            </v-tooltip>
            <!-- TOGGLE VIEW -->
            <v-tooltip top>
              <v-btn 
                slot="activator" 
                icon 
                @click="$emit('toggleView')">
                <v-icon>{{ view_mode ? 'view_module' : 'view_list' }}</v-icon>
              </v-btn>
              <span>Change view</span>
            </v-tooltip>
            <!-- FOCUS SEARCH BAR BUTTON -->
            <v-tooltip top>
              <v-btn 
                slot="activator" 
                icon 
                @click="search.length > 0 ? search = '' : $refs.search.focus()">
                <v-icon>{{ search.length > 0 ? 'clear': 'filter_list' }}</v-icon>
              </v-btn>
              <span>Filter</span>
            </v-tooltip>
          </v-flex>
          <!-- FILTER -->
          <v-flex 
            xs5 
            lg9>
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
            class="text-xs-left">
            <!-- SELECT ALL -->
            <v-tooltip top>
              <v-btn 
                slot="activator" 
                icon 
                @click="(bSelectAll = !bSelectAll, bSelectAll ? selected = sorted : selected = [])">
                <v-icon :color="selected.length === filterLength ? 'primary' : ''">done_all</v-icon>
              </v-btn>
              <span>Select all</span>
            </v-tooltip>

            <download-button 
              :dis="selected.length == 0" 
              :links="selected"/>
            
            <delete-button 
              v-if="$route.params.playlist" 
              :disabled="selected.length == 0" 
              @delete="removeList"/>
            
            <add-to-playlist 
              v-if="$store.getters.auth_state" 
              key="multi" 
              :disabled="selected.length == 0" 
              :song="selected"/>

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
        <template slot="footer">
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <v-list>
              <add-to-playlist 
                :in-list="true" 
                :song="bSelect ? selected : [chosenSong]"/>
              <share-button 
                :in-list="true" 
                :song="chosenSong" 
                :url="'https://dreamcloud.netlify.com/#/t/' + chosenSong.source + '/' + encodeURIComponent(chosenSong.artist) + '/' + chosenSong.trackID"/>
              <delete-button 
                v-if="chosenSong.key && !bSelect" 
                :in-list="true" 
                :id="chosenSong.key" 
                @delete="bSelect ? removeList() : remove(chosenSong.key)"/>
              <download-button 
                :in-list="true" 
                :links="bSelect ? selected : [chosenSong]"/>
              <offlineButton 
                :in-list="true" 
                :link1="chosenSong.mp32" 
                :link2="chosenSong.mp3" 
                :track-id="chosenSong.trackID"/>
            </v-list>
          </v-dialog>
        </template>

        <template slot="no-data">
          <tr 
            v-for="n in 36" 
            :key="n">
            <!-- IMAGE -->
            <td class="pa-2">
              <v-img
                :aspect-ratio="aspect"
                max-height="290"
                src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                class="fillPlace"
              >
                <v-layout 
                  slot="placeholder" 
                  fill-height 
                  align-center 
                  justify-center 
                  ma-0 >
                  <v-progress-circular 
                    indeterminate 
                    color="grey lighten-5"/>
                </v-layout>
              </v-img>
            </td>

            <!-- ARTIST -->
            <td v-if="!$route.params.artistID">
              <!-- <a v-if="!bSelect" @click.stop :class="artistClass(props.item.mp32)" :href="shareArtistURL(props.item)">{{ props.item.artist }}</a> -->
              <!-- <span :class="artistClass" v-else>{{ props.item.artist }}</span> -->
            </td>

            <!-- UPLOADED -->
            <td class="text-xs-left hidden-xs-only">
              <!-- {{ date(props.item.uploaded)}} -->
            </td>
            <!-- ACTIONS -->
            <td/>
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
          <tr 
            :key="props.index" 
            :id="bSelect ? 'nulld' : ''" 
            :class="isPlaying(props.item.trackID) ? 'primary white--text mb-3 pointer wordbreak' : 'mb-3 pointer wordbreak'" 
            @click.stop="!bSelect ? play(props.index) : props.selected = !props.selected">
            <!-- CHECK_BOX -->
            <td v-if="bSelect">
              <v-checkbox 
                :color="isPlaying(props.item.trackID) ? 'white' : 'primary'" 
                v-model="props.selected" 
                class="" 
                hide-details/>
            </td>

            <!-- IMAGE -->
            <td 
              v-if="!bMini" 
              class="pa-2">
              <v-img
                :aspect-ratio="aspect"
                :src="props.item.posterLarge"
                :lazy-src="props.item.posterLarge"
                class="fillPlace"
              >
                <v-layout
                  slot="placeholder"
                  fill-height
                  align-center
                  justify-center
                  ma-0
                >
                  <v-progress-circular 
                    indeterminate 
                    color="grey lighten-5"/>
                </v-layout>
              </v-img>
            </td>
            
            <!-- TITLE + ARTIST + UPLOADED + DURATION + DESCRIPTION-->
            <td 
              v-if="!bMini"
              :colspan="!$route.params.artistID ? '2' : '1'" 
              class="text-xs-left">
              <!-- TITLE -->
              <div :class="$vuetify.breakpoint.name === 'xs' ? 'subheading' : 'dc-t'">{{ props.item.title }}</div>
              <div class="ma-0 pa-0">
                <!-- ARTIST -->
                <a 
                  v-if="!$route.params.artistID && !bSelect" 
                  :class="artistClass(props.item.trackID)" 
                  :href="shareArtistURL(props.item)" 
                  @click.stop>{{ props.item.artist }}</a>
                <span 
                  v-else-if="!bSelect" 
                  :class="artistClass"
                >{{ props.item.artist }}</span>
                <!-- UPLOADED + DURATION -->
                <span> • {{ date(props.item.uploaded) }} • {{ props.item.duration }}</span>
                <!-- DESCRIPTION -->
                <div 
                  v-if="!$vuetify.breakpoint.xs" 
                  class="preline wordbreak mh-2 mt-2">{{ props.item.description }}</div>
              </div>
            </td>

            <!-- TITLE -->
            <td 
              v-if="bMini" 
              :class="$vuetify.breakpoint.name === 'xs' ? 'subheading text-xs-left' : 'dc-t text-xs-left'">
              {{ props.item.title }}
            </td>

            <!-- ARTIST -->
            <td v-if="bMini">
              <a 
                v-if="!$route.params.artistID && !bSelect" 
                :class="artistClass(props.item.trackID)" 
                :href="shareArtistURL(props.item)" 
                @click.stop>{{ props.item.artist }}</a>
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
              v-if="!$vuetify.breakpoint.xs" 
            >
              {{ date(props.item.uploaded) }}
            </td>


            <!-- ACTIONS -->
            <td 
              v-if="!bSelect" 
              @click.stop>
              <v-btn 
                icon 
                small 
                @click="(chosenSong = props.item, dialog = true)">
                <v-icon>more_vert</v-icon>
              </v-btn>
            </td>

          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-flex>
</template>

<script>
// /* eslint-disable */
import addToPlaylist from '@/components/buttons/add-to-playlist.vue'
import deleteButton from '@/components/buttons/delete-button'
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
      today: new Date(),
      headers: [
        { text: 'Title', value: 'title', align: 'left', class: 'ma-0 pa-0'},
        { text: 'Duration', value: 'duration', align: 'center', class: 'ma-0 pa-0' },
        { text: 'Date', value: 'uploaded', align: 'center', class: 'ma-0 pa-0' },
        // { text: '', value: '', align: 'left', sortable: false }
      ]
    }
  },
  created () {
    // if NOT on user page add artist add artist header for sorting
    if (!this.$route.params.artistID) {
      this.headers.splice(1, 0, { text: 'Artist', value: 'artist', align: 'center', class: 'ma-0 pa-0'})
      // this.headers.splice(4, 0, { text: 'Date', value: 'uploaded', align: 'center1' })
      // this.headers.splice(4, 0, { text: '', value: 'source', align: 'left'})
    } else {
      // this.headers.splice(3, 0, { text: 'Date', value: 'uploaded', align: 'left' })
      // this.headers.splice(4, 0, { text: '', value: 'source', align: 'left' })
    }
    // this.headers.push({ text: '', value: '', align: 'left', sortable: false })
    // set key to use based on whether this is a playlist
    this.itemKey = this.$route.params.playlist ? 'key' : 'mp32'
  },
  computed: {
    ...mapGetters({
      showVideo: 'showVideo',
      listViewSmall: 'listViewSmall',
      view_mode: 'view_mode'
    }),
    aspect () {
      return this.$route.name === 'artist' && this.$route.params.source !== 'YouTube'  ? '' : 16/9
    },
    imgClass () {
      // console.log(this.$store.getters.listViewSmall)
      return this.listViewSmall ? 'pstr-sm pdiv' : 'pstr-lg pdiv'
    },
    sorted () {
      //  returns the full sorted array for use with click
      if (this.$refs.dtable.pagination.rowsPerPage !== -1 && this.songs.length > this.$refs.dtable.pagination.rowsPerPage) {
        var a = this.$refs.dtable.pagination.rowsPerPage
        // eslint-disable-next-line
        this.$refs.dtable.pagination.rowsPerPage = -1
        var b = this.$refs.dtable.filteredItems.length ? this.$refs.dtable.filteredItems : this.songs
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
    artistClass (trackID) {
      return {
        'text-xs-left': true,
        'artist-dark': this.$store.getters.theme.dark,
        'artist-light': this.$store.getters.theme.light,
        'noDeco': true,
        'white--text': this.isPlaying(trackID)
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
    play (index) {
      if (this.$store.getters.index === index && this.hash === this.$route.path) {
        return this.$DCPlayer.togglePlay()
      }
      // show stage
      if (this.showVideo) {
        this.$router.push({name: 'stage'})
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
.dc-t{
  font-size: 18px;
}
.mh-2{
  max-height: 99px;
  overflow:hidden;
}
  table {
    border-collapse:separate; 
    border-spacing: 0 5em;
  }
  tr#nulld{
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none;   /* Safari */
    -khtml-user-select: none;    /* Konqueror HTML */
    -moz-user-select: none;      /* Firefox */
    -ms-user-select: none;       /* Internet Explorer/Edge */
    user-select: none;           /* Non-prefixed version, currently supported by Chrome and Opera */
  }
  .artist-dark{
    color: white !important;
  }
  .artist-light{
    color: black !important;
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