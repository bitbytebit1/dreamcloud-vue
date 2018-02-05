  <template>
  <v-flex>
    
    <!-- table header buttons -->
    <v-card class="elevation-8">
    <v-card-title class="ma-0 pa-0">
      <v-layout row wrap>
        <!-- header buttons -->
        <v-flex xs6 lg2 class="text-xs-left mt-2">

          <v-btn v-if="$store.getters.auth_state" @click="bSelect = !bSelect" icon>
            <v-icon :color="bSelect ? 'primary' : ''">check_box</v-icon>
          </v-btn>

          <v-btn icon @click="$emit('toggleView')">
            <v-icon>view_module</v-icon>
          </v-btn>

          <v-btn icon @click="$refs.search.focus()">
            <v-icon :color="filterHasFocus ? 'primary' : ''">filter_list</v-icon>
          </v-btn>
        </v-flex>
        <!-- filter -->
        <v-flex xs5 offset-lg0 lg10>
          <v-text-field
            @focus="filterHasFocus = true"
            @blur="filterHasFocus = false"
            color="primary"
            :class="$vuetify.breakpoint.smAndUp ? 'ma-0' : ''"
            label="Filter"
            single-line
            hide-details
            v-model="search"
            v-on:keyup.enter="$UTILS.closeSoftMobi()"
            ref="search"
          ></v-text-field>
        </v-flex>

        <!-- select buttons -->
        <v-flex xs6 lg3 v-if="bSelect" class="text-xs-left">
          <add-to-playlist key="multi" :disabled="selected.length == 0" v-if="$store.getters.auth_state" :song="selected"></add-to-playlist>

          <delete-button :disabled="selected.length == 0" v-if="$route.params.playlist" @delete="removeList"></delete-button>

          <download-button :dis="selected.length == 0" :links="selected"></download-button>
          <v-flex d-inline-flex>{{selected.length}} of {{songs.length}}</v-flex>
        </v-flex>
      </v-layout>

    </v-card-title>

    <!-- data-table -->
    <v-data-table
      ref="dtable"
      :headers="headers"
      :items="songs"
      :item-key="itemKey"
      :pagination.sync="pagination"
      :rows-per-page-items='[25, 50, 100, { text: "All", value: -1 }]'
      :search="search"
      :select-all="bSelect"
      v-model="selected"
    >
    <v-progress-linear slot="progress" color="primary" indeterminate></v-progress-linear>

    <template slot="items" slot-scope="props">
      <tr :key="props.index" :class="isPlaying(props.item.mp32) ? 'primary white--text' : ''" @click.stop="!bSelect ? play(props.index) : props.selected = !props.selected">
        <!-- check_box -->
        <td v-if="bSelect">
          <v-checkbox :color="isPlaying(props.item.mp32) ? 'white' : 'primary'" hide-details v-model="props.selected"></v-checkbox>
        </td>

        <!-- image -->
        <td>
          <img class="mt-2" v-lazy="props.item.poster"/>
        </td>

        <!-- title -->
        <td class="text-xs-left">
          <span :class="$vuetify.breakpoint.name === 'xs' ? 'caption' : 'body-1'">{{ props.item.title }}</span>
        </td>

        <!-- artist -->
        <td v-if="!$route.params.artistID">
          <a v-if="!bSelect" @click.stop :class="artistClass(props.item.mp32)" :href="shareArtistURL(props.item)">{{ props.item.artist }}</a>
          <span :class="artistClass" v-else>{{ props.item.artist }}</span>
        </td>

        <!-- uploaded -->
        <td class="text-xs-left hidden-xs-only">
          {{ date(props.item.uploaded)}}
        </td>
        <!-- actions -->
        <td @click.stop>
          <v-menu transition="slide-y-transition" bottom lazy open-on-hover v-if="!bSelect">
            <v-btn icon slot="activator">
              <v-icon :color="isPlaying(props.item.mp32) ? 'white' : ''">more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-if="$store.getters.auth_state">
                <add-to-playlist :song="addSong(props.item)"></add-to-playlist>
              </v-list-tile>
              <v-list-tile>
                <download-button :links="bSelect ? selected :[props.item]"></download-button>
              </v-list-tile>
              <v-list-tile>
                <share-button :song="props.item" :url="'https://offcloud.netlify.com/#/t/' + props.item.source + '/' + encodeURIComponent(props.item.artist) + '/' + props.item.trackID"></share-button>
              </v-list-tile>
              <v-list-tile v-if="props.item.key">
                <delete-button :id="props.item.key" @delete="bSelect ? removeList() : remove(props.item.key)"></delete-button>
              </v-list-tile>
            </v-list>
          </v-menu>
        </td>
      </tr>
    </template>
    </v-data-table>
    </v-card>
    </v-flex>
  </template>

<script>
// /* eslint-disable */
import addToPlaylist from '@/components/playlist/add-to-playlist.vue'
import deleteButton from '@/components/misc/delete-button'
import shareButton from '@/components/misc/share-button'
import downloadButton from '@/components/misc/download-button'

export default {
  name: 'list',
  // props: ['songs', 'sortBy'],
  props: {
    songs: {
      type: [Array],
      required: true
    },
    sortBy: {
      type: [String],
      default: ''
    },
    rowsPerPage: {
      type: [Number, String],
      default: 10
    }
  },
  components: {
    'add-to-playlist': addToPlaylist,
    'delete-button': deleteButton,
    'download-button': downloadButton,
    'share-button': shareButton
  },
  data () {
    return {
      filterHasFocus: false,
      itemKey: 'mp3',
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
        { text: '', align: 'left', sortable: false, value: 'name' },
        { text: 'Title', value: 'title', align: 'left' },
        { text: 'Date', value: 'uploaded', align: 'left' },
        { text: '', value: '', align: 'left', sortable: false }
      ]
    }
  },
  created () {
    // if NOT on user page add artist add artist header for sorting
    if (!this.$route.params.artistID) {
      this.headers.splice(2, 0, { text: 'Artist', value: 'artist', align: 'left' })
    }
    // set key to use based on whether this is a playlist
    this.itemKey = this.$route.params.playlist ? 'key' : 'mp3'
  },
  computed: {
    sorted () {
      //  returns the full sorted array for use with click
      if (this.$refs.dtable.pagination.rowsPerPage !== -1 && this.songs.length > this.$refs.dtable.pagination.rowsPerPage) {
        var a = this.$refs.dtable.pagination.rowsPerPage
        this.$refs.dtable.pagination.rowsPerPage = -1
        var b = this.$refs.dtable.filteredItems.length ? this.$refs.dtable.filteredItems : this.songs
        this.$refs.dtable.pagination.rowsPerPage = a
        return b
      } else {
        return this.$refs.dtable.filteredItems.length ? this.$refs.dtable.filteredItems : this.songs
      }
    },
    artistID () {
      return '/#/a/' + this.song.source + '/' + this.song.artist + '/' + this.song.artistID
    }
  },
  methods: {
    artistClass (link) {
      return {
        'text-xs-left': true,
        'artist-dark': this.$store.getters.theme.dark,
        'artist-light': this.$store.getters.theme.light,
        'white--text': this.isPlaying(link)
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
      for (const key in this.selected) {
        this.download(this.selected[key])
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
    isPlaying (link) {
      if (this.$store.getters.index === -1) {
        return
      }
      return this.$route.path === this.$store.getters.hash && link === this.$store.getters.current_Playlist[this.$store.getters.index].mp32
    },
    date (date) {
      return this.$DCAPI.calcDate(this.today, date)
    },
    play (index) {
      // Fix for mobile on first play
      if (this.$store.getters.index === -1 && this.$UTILS.isMobile) this.$DCPlayer.eAudio.play()
      // If not first page fix index
      // console.log(index)
      index = this.pagination.page === 1 ? index : (this.pagination.rowsPerPage * (this.pagination.page - 1)) + index
      this.$store.commit('setNPlay', {songs: this.sorted, current: index, path: this.$route.path})
      this.$DCPlayer.setNPlay(this.sorted, index)
    }
  }
}
</script>

<style>
  .artist-dark{
    color: white !important;
  }
  .artist-light{
    color: black !important;
  }
  .hidden{
    display: none;
  }
  .desc{
    overflow-y: hidden;
    max-height: 53px;
  }
  td img {
    margin: 2px
  }

  @media only screen and (max-width: 599px){
    td img[lazy=loading] {
      width: auto;
      height: 40px;
    }
    td img[lazy=loaded]{
      width: auto;
      height: 40px;
    }
    /* .header-buttons {
      margin-left: -9px !important;
    }
    .select-buttons{
      margin-left: -9px;
    } */
    .menu{
      width: 45px;
    }
    /* table.table tbody td:not(:first-child),  */
    td:nth-child(2), td:nth-child(3), td:nth-child(4){
      word-break: break-word;
    }
    table td,
    table th:not(:first-child){
      padding: 0 1px!important;
      /* normal value is 24 */
    }
    table td:first-child,
    table th:first-child{
      padding: 0 0 0 1px!important;
      /* normal value is 24 */
    }

  }
  @media only screen and (min-width: 600px){
    /* .header-buttons {
      margin-left: -33px;
    }
    .select-buttons{
      margin-left: -1px;
    } */
    td img[lazy=loading] {
      /* width: 61px !important; */
      height: 50px;
    }
    td img[lazy=loaded]{
      /* width: 61px; */
      height: 50px;
    }
    table td:first-child,
    table th:first-child{
      padding: 0 0 0 8px!important;
      /* normal value is 24 */
    }
  }
</style>
