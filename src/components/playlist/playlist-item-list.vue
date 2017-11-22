  <template>
  <v-flex>
    <v-layout row wrap>
      <v-flex xs7 offset-xs1 offset-lg0 lg10>
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
      <v-flex xs4 lg2 :class="this.$vuetify.breakpoint.name === 'xs'? '' : 'pt-2'">
        <v-btn icon @click="$refs.search.focus()">
          <v-icon>filter_list</v-icon>
        </v-btn>
        <v-btn icon @click="$emit('toggleView')">
          <v-icon>view_module</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-card class="elevation-8">
      <!-- <v-card-title>
      </v-card-title> -->
    <v-data-table
        ref="dtable"
        :rows-per-page-items='[25, 50, 100, { text: "All", value: -1 }]'
        :headers="headers"
        :items="songs"
        :search="search"
        :pagination.sync="pagination"
      >
      <template slot="items" slot-scope="props">
        <td @click="play(props.index)" :class="tdClass(props.item.mp32)"><img v-lazy="props.item.poster" height="35px" /></td>
        <td @click="play(props.index)" :class="tdClass(props.item.mp32)">{{ props.item.title }}</td>
        <td @click="play(props.index)" :class="tdClass(props.item.mp32)">
          <a @click.stop :class="artistClass" :href="shareArtistURL(props.item)">{{ props.item.artist }}</a>
        </td>
        <td @click="play(props.index)" :class="tdClass(props.item.mp32)">{{ date(props.item.created) }}</td>
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
            <add-to-playlist :song="props.item"></add-to-playlist>
          </v-list-tile>          
          <v-list-tile v-for="(action, index) in actions" :key="action.title" @click="action.func(props.item)">
            <!-- <v-list-tile-title>{{ action.title }}</v-list-tile-title> -->
            <v-btn icon>
              <v-icon>
                {{ action.icon }}
              </v-icon>
              </v-btn>
          </v-list-tile>
        </v-list>
      </v-menu></td>
      </template>
    </v-data-table>
    </v-card>
    </v-flex>
  </template>

  <script>
  /* eslint-disable */
  import addToPlaylist from '@/components/playlist/add-to-playlist.vue'

  export default {
    name: 'playlistItemList',
    props: ['songs'],
    components: {
      'add-to-playlist': addToPlaylist
    },
    data () {
      return {
        bSearchShow: false,
        pagination: {
          sortBy: 'created',
          rowsPerPage: 50,
          descending: true
        },
        search: '',
        actions: [
          {'icon': 'share', func: this.$UTILS.share},
          {'icon': 'file_download', func: this.download}
        ],
        today: new Date(),
        headers: [
          { text: '', align: 'left', sortable: false, value: 'name' },
          { text: 'Title', value: 'title', align: 'left' },
          { text: 'Artist', value: 'mp3', align: 'left' },
          { text: 'Created', value: 'created', align: 'left' },
          { text: '', value: '', align: 'left', sortable: false }
        ]
      }
    },
    directives: {
      focus: {
        // directive definition
        inserted: function (el) {
          el.children[0].children[0].focus()
        }
      }
    },
    computed: {
      artistClass: function () {
        return this.$store.getters.theme.dark ? 'artist-dark' : 'artist-light'
      },
      aSongsFilter: function () {
        var a = this.$refs.dtable.pagination.rowsPerPage
        this.$refs.dtable.pagination.rowsPerPage = -1
        var b = this.$refs.dtable.filteredItems.length ? this.$refs.dtable.filteredItems : this.songs
        this.$refs.dtable.pagination.rowsPerPage = a
        return b
      },
      artistID: function () {
        return '/#/a/' + this.song.source + '/' + this.song.artist + '/' + this.song.artistID
      }
    },
    methods: {
      download: function (song) {
        this.$DCAPI.getAudio(song.mp32, (data) => {
          this.$UTILS.downloadLink(data)
        })
      },
      shareURL: function (song) {
        return '#/t/' + song.source + '/' + encodeURIComponent(song.artist) + '/' + encodeURIComponent(song.title) + '/' + song.trackID
      },
      shareArtistURL: function (song) {
        return '#/a/' + song.source + '/' + encodeURIComponent(song.artist) + '/' + song.artistID
      },
      tdClass: function (link) {
        return {
          'teal': this.isPlaying(link),
          'text-xs-left': true,
          'caption': true
        }
      },
      isPlaying: function (link) {
        if (this.$store.getters.index === -1) {
          return
        }
        return this.$route.path === this.$store.getters.hash && link === this.$store.getters.current_Playlist[this.$store.getters.index].mp32
      },
      date: function (date) {
        return this.$DCAPI.calcDate(this.today, date)
      },
      play: function (index) {
        // console.log(this.aSongsFilter)
        this.$store.commit('setNPlay', {songs: this.aSongsFilter, current: index, path: this.$route.path})
        this.$DCPlayer.setNPlay(this.aSongsFilter, index)
      },
      share: function (song) {
        this.$UTILS.share(song)
        // if (this.$UTILS.isMobile) {
        //   // this.$emit('share', 'whatsapp://send?text=' + 'offcloud.netlify.com/#/t/' + this.songs[index].source + '/' + encodeURIComponent(this.songs[index].artist) + '/' + encodeURIComponent(this.songs[index].title) + '/' + this.songs[index].trackID)
        //   this.$parent.setIframeSrc('whatsapp://send?text=' + this.shareURL(song))
        // } else {
        //   this.$UTILS.copyToClipboard('offcloud.netlify.com' + this.shareURL(song))
        // }
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
