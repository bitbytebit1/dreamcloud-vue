<template>
	<v-flex xs12>
		<!-- TABLE CARD -->
		<v-card class="elevation-8">
			<v-card-title v-if="full" class="ma-0 pa-0">
				<v-layout row wrap>
					<!-- HEADER BUTTONS -->
					<v-flex xs6 lg2 class="text-xs-left mt-2">
						<!-- ENABLE CHECK BOXES -->
						<v-btn v-if="$store.getters.auth_state" @click="(bSelect = !bSelect, bSelect ? headers.unshift({ class: 'ma-0', width: '10px', text: '', value: '', align: 'left', sortable: false }): headers.shift())" icon>
							<v-icon :color="bSelect ? 'primary' : ''">check_box</v-icon>
						</v-btn>
						<!-- TOGGLE VIEW -->
						<v-btn icon @click="$emit('toggleView')">
							<v-icon>{{view_mode ? 'view_module' : 'view_list'}}</v-icon>
						</v-btn>
						<!-- FOCUS SEARCH BAR BUTTON -->
						<v-btn icon @click="search.length > 0 ? search='' : $refs.search.focus()" >
							<v-icon>{{search.length > 0 ? 'clear': 'filter_list'}}</v-icon>
						</v-btn>
					</v-flex>
					<!-- FILTER -->
					<v-flex xs5 lg9>
						<v-text-field
							@focus="filterHasFocus = true"
							@blur="filterHasFocus = false"
							color="primary"
							id="flr-txt"
							label="Filter"
							single-line
							hide-details
							v-model="search"
							v-on:keyup.enter="$UTILS.closeSoftMobi()"
							ref="search"
						></v-text-field>
					</v-flex>
					<!-- SELECT BUTTONS -->
					<v-flex xs8 lg5 v-if="bSelect" class="text-xs-left">
						<!-- SELECT ALL -->
						<v-btn @click="(bSelectAll = !bSelectAll, bSelectAll ? selected = sorted : selected = [])" icon>
							<v-icon :color="selected.length === filterLength ? 'primary' : ''">done_all</v-icon>
						</v-btn>

						<download-button :dis="selected.length == 0" :links="selected"></download-button>
            
						<delete-button :disabled="selected.length == 0" v-if="$route.params.playlist" @delete="removeList"></delete-button>
            
						<add-to-playlist key="multi" :disabled="selected.length == 0" v-if="$store.getters.auth_state" :song="selected"></add-to-playlist>

						<v-flex d-inline-flex>{{selected.length}} of {{filterLength}}</v-flex>
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
				<v-progress-linear slot="progress" color="primary" indeterminate></v-progress-linear>

				<template slot="items" slot-scope="props">
					<tr :key="props.index" :id="bSelect ? 'nulld' : ''" :class="isPlaying(props.item.mp32) ? 'primary white--text pointer' : 'pointer'" @click.stop="!bSelect ? play(props.index) : props.selected = !props.selected">
						<!-- CHECK_BOX -->
						<td v-if="bSelect">
							<v-checkbox class="" :color="isPlaying(props.item.mp32) ? 'white' : 'primary'" hide-details v-model="props.selected"></v-checkbox>
						</td>

						<!-- IMAGE -->
						<td>
              
							<div v-lazy:background-image="props.item.poster" :key="props.item.poster">
							</div>
						</td>

						<!-- TITLE -->
						<td class="text-xs-left">
							<span :class="$vuetify.breakpoint.name === 'xs' ? 'caption' : 'subheading'">{{ props.item.title }}</span>
							<!-- <div :class="$vuetify.breakpoint.name === 'xs' ? 'caption' : ''">{{ props.item.description }}</div> -->
						</td>
						<!-- DURATION -->
						<td>
							{{props.item.duration}}
						</td>

						<!-- ARTIST -->
						<td v-if="!$route.params.artistID">
							<a v-if="!bSelect" @click.stop :class="artistClass(props.item.mp32)" :href="shareArtistURL(props.item)">{{ props.item.artist }}</a>
							<span :class="artistClass" v-else>{{ props.item.artist }}</span>
						</td>

						<!-- UPLOADED -->
						<td class="text-xs-left hidden-xs-only">
							{{ date(props.item.uploaded)}}
						</td>
						<!-- ACTIONS -->
						<td @click.stop v-if="!bSelect">
							<v-menu transition="slide-y-transition" bottom lazy open-on-hover>
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
										<share-button :song="props.item" :url="'https://dreamcloud.netlify.com/#/t/' + props.item.source + '/' + encodeURIComponent(props.item.artist) + '/' + props.item.trackID"></share-button>
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
import addToPlaylist from '@/components/misc/add-to-playlist.vue'
import deleteButton from '@/components/misc/delete-button'
import shareButton from '@/components/misc/share-button'
import downloadButton from '@/components/misc/download-button'
import { mapGetters } from 'vuex'

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
    'share-button': shareButton
  },
  data () {
    return {
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
        { text: 'Source', value: 'source', align: 'left', width: '27%'},
        { text: 'Title', value: 'title', align: 'left' },
        { text: 'Duration', value: 'duration', align: 'left' },
        { text: 'Date', value: 'uploaded', align: 'left' },
        { text: '', value: '', align: 'left' , sortable: false}
        // { text: '', value: '', align: 'left', sortable: false }
      ]
    }
  },
  created () {
    // if NOT on user page add artist add artist header for sorting
    if (!this.$route.params.artistID) {
      this.headers.splice(3, 0, { text: 'Artist', value: 'artist', align: 'left' })
      // this.headers.splice(4, 0, { text: 'Date', value: 'uploaded', align: 'left' })
      // this.headers.splice(4, 0, { text: '', value: 'source', align: 'left'})
    } else {
      // this.headers.splice(3, 0, { text: 'Date', value: 'uploaded', align: 'left' })
      // this.headers.splice(4, 0, { text: '', value: 'source', align: 'left'})
    }
    // this.headers.push({ text: '', value: '', align: 'left', sortable: false })
    // set key to use based on whether this is a playlist
    this.itemKey = this.$route.params.playlist ? 'key' : 'mp32'
  },
  computed: {
    ...mapGetters({
      view_mode: 'view_mode'
    }),
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
      // show stage
      this.$router.push({name: 'stage'})
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
  tr {
    height: 180px;
  }
  td div { 
    width: 100%;
    margin: 2px
  }
  td div[lazy=error] {
    background: center center / cover no-repeat;
  }
  td div[lazy=loading] {
    background: center center / cover no-repeat;
  }
  td div[lazy=loaded] {
    background: center center / cover no-repeat;
  }
  td div[lazy=error] {
    height: 40px;
  }
  @media only screen and (max-width: 599px){
    td div[lazy=loading] {
      width: auto;
      height: 40px;
    }
    td div[lazy=loaded]{
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
      /* width: 200px !important; */
    }
    td div[lazy=loading] {
      /* width: 61px !important; */
      height: 180px;
    }
    td div[lazy=loaded]{
      width: 100%;
      height: 100%;
    }

  }
  @media only screen and (min-width: 600px){
    /* .header-buttons {
      margin-left: -33px;
    }
    .select-buttons{
      margin-left: -1px;
    } */
    td div[lazy=loading] {
      /* width: 61px !important; */
      height: 180px;
    }
    td div[lazy=loaded]{
      width: 100%;
      height: 100%;
    }
    table td:first-child,
    table th:first-child{
      padding: 0 0 0 0px!important;
      /* normal value is 24 */
      /* width: 27% !important */
    }
  }
</style>

