  <template>
  <v-flex>

    <!-- table header buttons -->
    <v-card class="elevation-8">
    <v-card-title class="ma-0 pa-0">
      <v-layout row wrap>
        <!-- filter -->
        <v-flex xs4 offset-xs1 offset-lg0 lg9>
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
        <v-flex xs7 lg3 :class="this.$vuetify.breakpoint.name === 'xs' ? '' : 'pt-2'">

          <v-btn icon @click="$refs.search.focus()">
            <v-icon>filter_list</v-icon>
          </v-btn>

          <v-btn icon @click="$emit('toggleView')">
            <v-icon>view_module</v-icon>
          </v-btn>

          <v-btn v-if="$store.getters.auth_state" @click="bSelect = !bSelect" :color="bSelect ? 'teal' : ''" icon>
            <v-icon>check_box</v-icon>
          </v-btn>
        <v-flex xs12 v-if="bSelect">
          <add-to-playlist key="multi" :disabled="selected.length == 0" v-if="$store.getters.auth_state" :song="selected"></add-to-playlist>
          
          <delete-button :disabled="selected.length == 0" v-if="$route.params.playlist" @delete="removeList"></delete-button>

          <download-button :dis="selected.length == 0" :links="selected"></download-button>

        </v-flex>
        
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
    <template slot="items" slot-scope="props">
      <tr>

        <!-- check_box -->
        <td :class="tdClass(props.item.mp32)" v-show="bSelect">
          <v-checkbox :color="isPlaying(props.item.mp32) ? 'white' : 'teal'" hide-details v-model="props.selected"></v-checkbox>
        </td>

        <!-- image -->
        <td @click="play(props.index)" :class="tdClass(props.item.mp32)">
          <img v-lazy="props.item.poster" :class="isPlaying(props.item.mp32) ? 'playing' : ''"/>
        </td>

        <!-- title + description -->
        <td @click="play(props.index)" :class="tdClass(props.item.mp32)">
          {{ props.item.title }}
          <p class="desc" v-if="isPlaying(props.item.mp32)">
            {{props.item.description}}
          </p>
        </td>

        <!-- artist -->
        <td @click="play(props.index)" :class="tdClass(props.item.mp32)">
          <a @click.stop :class="artistClass" :href="shareArtistURL(props.item)">{{ props.item.artist }}</a>
        </td>

        <!-- created -->
        <td @click="play(props.index)" :class="tdClass(props.item.mp32)">
          {{ date(props.item.uploaded) }}
        </td>
        <!-- actions -->
        <td :class="tdClass(props.item.mp32)">
          <v-menu transition="slide-y-transition" bottom lazy>
            <v-btn icon slot="activator">
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-if="$store.getters.auth_state">
                <add-to-playlist :song="addSong(props.item)"></add-to-playlist>
              </v-list-tile>
              <v-list-tile>
                <download-button :links="[props.item]"></download-button>
              </v-list-tile>
              <v-list-tile>
                <share-button :song="props.item" :url="'https://offcloud.netlify.com/#/t/' + props.item.source + '/' + encodeURIComponent(props.item.artist) + '/' + props.item.trackID"></share-button>
              </v-list-tile>
              <v-list-tile v-if="props.item.key">
                <delete-button :id="props.item.key" @delete="remove(props.item.key)"></delete-button>
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
  props: ['songs'],
  components: {
    'add-to-playlist': addToPlaylist,
    'delete-button': deleteButton,
    'download-button': downloadButton,
    'share-button': shareButton
  },
  data () {
    return {
      itemKey: 'mp3',
      bSelect: false,
      selected: [],
      pagination: {
        sortBy: 'uploaded',
        rowsPerPage: 20,
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
        { text: 'Artist', value: 'artist', align: 'left' },
        { text: 'Date', value: 'uploaded', align: 'left' },
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
    artistID () {
      return '/#/a/' + this.song.source + '/' + this.song.artist + '/' + this.song.artistID
    }
  },
  methods: {
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
    height: 50px;
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
      height: 35px;
    }
    img.playing{
      height: 48px !important;
    }    
  }
  @media only screen and (min-width: 600px){
    td img{
      height: 42px;
    }
    img.playing{
      height: 100px !important;
    }
  }
</style>
