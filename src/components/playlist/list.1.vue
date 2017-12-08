  <template>
  <v-flex>

    <!-- table header buttons -->
    <v-card class="elevation-8">
      <v-card-title>
    <v-layout row wrap>
      <!-- filter -->
      <v-flex xs5 offset-xs1 offset-lg0 lg9>
        <v-text-field
          v-if="filterOpen"
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

        <v-btn icon @click="filterOpen = !filterOpen">
          <v-icon>filter_list</v-icon>
        </v-btn>

        <v-btn icon @click="$emit('toggleView')">
          <v-icon>view_module</v-icon>
        </v-btn>

        <v-btn v-if="$store.getters.auth_state" icon @click="bSelect = !bSelect">
          <v-icon>{{bSelect ? 'check_box_outline_blank' : 'check_box'}}</v-icon>
        </v-btn>

      </v-flex>
        <v-flex xs12 class="text-xs-left" v-if="bSelect">
          <add-to-playlist key="multi" :disabled="selected.length == 0" v-if="$store.getters.auth_state" :song="selected"></add-to-playlist>
          <delete-button :disabled="selected.length == 0" v-if="$route.params.playlist" @delete="removeList"></delete-button>
          <v-btn icon :disabled="selected.length == 0" @click="downloadAll">
            <v-icon>
              file_download
            </v-icon>
          </v-btn>
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
        <item :selected="props.selected" :bSelect="bSelect" :song="props.item"></item>
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
import item from '@/components/playlist/list.item.vue'

export default {
  name: 'list',
  props: ['songs'],
  components: {
    'add-to-playlist': addToPlaylist,
    'delete-button': deleteButton,
    'share-button': shareButton,
    'item': item
  },
  data () {
    return {
      filterOpen: false,
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
      /* height: 20px; */
    }
  }
  @media only screen and (min-width: 600px){
    /* td img{
      height: 42px;
    } */
  }
</style>
