  <template>
  <v-flex>
    <v-layout row wrap>
      <!-- filter -->
      <v-flex xs5 offset-xs1 offset-lg0 lg9>
        <v-text-field
          color="teal"
          :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : ''"
          label="Filter"
          single-line
          hide-details
          v-model="search"
          v-on:keyup.enter="$UTILS.closeSoftMobi()"
          ref="search"
        ></v-text-field>
      </v-flex>
      
      <!-- header buttons -->
      <v-flex xs6 lg3 :class="this.$vuetify.breakpoint.name === 'xs'? '' : 'pt-2'">

        <v-btn icon @click="$refs.search.focus()">
          <v-icon>filter_list</v-icon>
        </v-btn>

        <v-btn icon @click="$emit('toggleView')">
          <v-icon>view_module</v-icon>
        </v-btn>

        <v-btn v-if="$store.getters.auth_state" icon @click="bSelect = !bSelect">
          <v-icon>{{bSelect ? 'check_box_outline_blank' : 'check_box'}}</v-icon>
        </v-btn>

      </v-flex>
    </v-layout>

    <!-- table header buttons -->
    <v-card class="elevation-8">
      <v-card-title v-if="bSelect">
        <add-to-playlist key="multi" :disabled="selected.length == 0" v-if="$store.getters.auth_state" :song="selected"></add-to-playlist>
        <delete-button :disabled="selected.length == 0" v-if="$route.params.playlist" @delete="removeList"></delete-button>
        <v-btn icon :disabled="selected.length == 0" @click="downloadAll">
          <v-icon>
            file_download
          </v-icon>
        </v-btn>
      </v-card-title>

    <!-- data-table -->
    <v-data-table
        ref="dtable"
        :rows-per-page-items='[25, 50, 100, { text: "All", value: -1 }]'
        :headers="headers"
        :items="songs"
        :search="search"
        :pagination.sync="pagination"

        v-model="selected"
        :item-key="itemKey"
        :select-all="bSelect"

      >
      <template slot="items" slot-scope="props">
        <td :class="tdClass(props.item.mp32)" v-show="bSelect"><v-checkbox :color="isPlaying(props.item.mp32) ? 'white' : 'teal'" hide-details v-model="props.selected"></v-checkbox></td>
        <td @click="play(props.index)" :class="tdClass(props.item.mp32)"><img v-lazy="props.item.poster" height="35px" /></td>
        <td @click="play(props.index)" :class="tdClass(props.item.mp32)">{{ props.item.title }}</td>
        <td @click="play(props.index)" :class="tdClass(props.item.mp32)"><a @click.stop :class="artistClass" :href="shareArtistURL(props.item)">{{ props.item.artist }}</a></td>
        <td @click="play(props.index)" :class="tdClass(props.item.mp32)">{{ date(props.item.created) }}</td>
        <!-- actions -->
        <td :class="tdClass(props.item.mp32)">
        <v-menu
          transition="slide-y-transition"
          bottom
          lazy
        >
        <v-btn icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile>
            <add-to-playlist key="single" :song="props.item"></add-to-playlist>
          </v-list-tile>
          <v-list-tile v-for="(action, index) in actions" :key="action.title" @click="action.func(props.item)">
            <!-- <v-list-tile-title>{{ action.title }}</v-list-tile-title> -->
            <v-btn icon>
              <v-icon>
                {{ action.icon }}
              </v-icon>
            </v-btn>
          </v-list-tile>
          <v-list-tile v-if="props.item.key">
            <delete-button :id="props.item.key" @delete="remove(props.item.key)"></delete-button>
          </v-list-tile>
        </v-list>
      </v-menu></td>
      </template>
    </v-data-table>
    </v-card>
    </v-flex>
  </template>

<script>
// /* eslint-disable */
import addToPlaylist from '@/components/playlist/add-to-playlist.vue'
import deleteButton from '@/components/misc/delete-button'
export default {
  name: 'list',
  props: ['songs'],
  components: {
    'add-to-playlist': addToPlaylist,
    'delete-button': deleteButton
  },
  data () {
    return {
      itemKey: 'mp3',
      bSelect: false,
      selected: [],
      bSearchShow: false,
      pagination: {
        sortBy: 'created',
        rowsPerPage: 20,
        descending: true
      },
      search: '',
      actions: [
        {'icon': 'share', func: this.share},
        {'icon': 'file_download', func: this.download}
      ],
      today: new Date(),
      headers: [
        { text: '', align: 'left', sortable: false, value: 'name' },
        { text: 'Title', value: 'title', align: 'left' },
        { text: 'Artist', value: 'artist', align: 'left' },
        { text: 'Date', value: 'created', align: 'left' },
        { text: '', value: '', align: 'left', sortable: false }
      ]
    }
  },
  mounted () {
    // set key to use based on whether this is a playlist
    this.itemKey = this.$route.params.playlist ? 'key' : 'mp3'
  },
  computed: {
    artistClass () {
      return this.$store.getters.theme.dark ? 'artist-dark' : 'artist-light'
    },
    sorted () {
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
    /* sorted1 () {
      let callback
      switch (this.pagination.sortBy) {
        case 'created':
          callback =
          this.pagination.descending
          ? (a, b) => {
            a = new Date(a.created)
            b = new Date(b.created)
            return a > b ? -1 : a < b ? 1 : 0
          }
          : (a, b) => {
            a = new Date(a.created)
            b = new Date(b.created)
            return b > a ? -1 : b < a ? 1 : 0
          }
          break
        case 'artist':
          callback =
          this.pagination.descending
          ? (a, b) => { a.artist = a.artist.toLowerCase(); b.artist = b.artist.toLowerCase(); return (b.artist > a.artist) - (b.artist < a.artist) }
          : (a, b) => { a.artist = a.artist.toLowerCase(); b.artist = b.artist.toLowerCase(); return (a.artist > b.artist) - (a.artist < b.artist) }
          break
        case 'title':
          callback =
          this.pagination.descending
          ? (a, b) => { a.title = a.title.toLowerCase(); b.title = b.title.toLowerCase(); return (b.title > a.title) - (b.title < a.title) }
          : (a, b) => { a.title = a.title.toLowerCase(); b.title = b.title.toLowerCase(); return (a.title > b.title) - (a.title < b.title) }
          break
        default:
      }
      let copy = this.songs
      copy.sort(callback)
      return copy
    },
    */
    artistID () {
      return '/#/a/' + this.song.source + '/' + this.song.artist + '/' + this.song.artistID
    }
  },
  methods: {
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
    shareURL (song) {
      return '#/t/' + song.source + '/' + encodeURIComponent(song.artist) + '/' + encodeURIComponent(song.title) + '/' + song.trackID
    },
    shareArtistURL (song) {
      return '#/a/' + song.source + '/' + encodeURIComponent(song.artist) + '/' + song.artistID
    },
    tdClass (link) {
      return {
        'teal': this.isPlaying(link),
        'text-xs-left': true,
        'caption': true
      }
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
    },
    share (song) {
      this.$UTILS.share('https://offcloud.netlify.com/#/t/' + song.source + '/' + encodeURIComponent(song.artist) + '/' + song.trackID, song)
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
  @media only screen and (max-width: 599px){
    .menu{
      width: 45px;
    }
    /* table.table tbody td:not(:first-child),  */
    td:nth-child(2), td:nth-child(3), td:nth-child(4){
      word-break: break-all;
    }
    table td,
    table th{
      padding: 0 1px!important 
      /* normal value is 24 */
    }
    td img{
      height: 20px;
    }
  }
  @media only screen and (min-width: 600px){
    td img{
      height: 42px;
    }
  }
</style>
