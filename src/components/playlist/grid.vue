<template>
  <v-flex xs12>
    <!-- TABLE HEADER BUTTONS -->
    <v-card class="elevation-0">
      <v-card-title v-if="full" class="ma-0 pa-0">
        <v-layout row wrap>
          <!-- HEADER BUTTONS -->
          <v-flex xs6 lg2 class="text-xs-left mt-2">
            <!-- ENABLE CHECK BOXES -->
            <v-tooltip top>
              <v-btn slot="activator" v-if="auth_state" @click="bSelect = !bSelect" icon>
                <v-icon :color="bSelect ? 'primary' : ''">check_box</v-icon>
              </v-btn>
              <span>Show checkboxes</span>
            </v-tooltip>

            <!-- TOGGLE VIEW -->
            <v-tooltip top>
              <v-btn slot="activator" icon @click="$emit('toggleView')">
                <v-icon>{{view_mode ? 'view_module' : 'view_list'}}</v-icon>
              </v-btn>
              <span>Change view</span>
            </v-tooltip>
            <!-- FILTER BUTTON -->
            <v-tooltip top>
              <v-btn slot="activator" icon @click="search.length > 0 ? search='' : $refs.search.focus()" >
                <v-icon>{{search.length > 0 ? 'clear': 'filter_list'}}</v-icon>
              </v-btn>
              <span>Filter</span>
            </v-tooltip>
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
          <v-flex xs12 lg12 v-if="bSelect" class="text-xs-left">
            <!-- SELECT ALL -->
            <v-tooltip top>
              <v-btn slot="activator" icon @click="(bSelectAll = !bSelectAll, bSelectAll ? selected = Object.assign([], sorted) : selected = [])">
                <v-icon :color="selected.length === filterLength ? 'primary' : ''">done_all</v-icon>
              </v-btn>
              <span>Select all</span>
            </v-tooltip>

            <download-button :dis="selected.length == 0" :links="selected"></download-button>

            <delete-button :disabled="selected.length == 0" v-if="$route.params.playlist" @delete="removeList"></delete-button>

            <add-to-playlist key="multi" :disabled="selected.length == 0" v-if="auth_state" :song="selected"></add-to-playlist>
            
            <v-flex d-inline-flex>{{selected.length}} of {{filterLength}}</v-flex>
            
          </v-flex>
        </v-layout>
      </v-card-title>
      <!-- V-DATA-ITERATOR -->
      <v-container grid-list-lg class="pa-0" fluid>
      <v-data-iterator
        content-class="pa-0 ma-0"
        ref="dItera"
        content-tag='v-layout'
        row
        wrap
        :headers="headers"
        :items="songs"
        :pagination.sync="pagination"
        :rows-per-page-items='[24, 50, 100, { text: "All", value: -1 }]'
        :search="search"
        :hide-actions="!full"
      >
        <!-- NO DATA -->
        <template slot="no-data">
          <v-layout row wrap class="ma-0 pa-0">
            <v-flex xs12 sm6 md4 lg3 xl2 v-for="n in 36" :key="n" class="ma-0">
              <v-card class="dc-crd ma-0 pa-0 pointer"> 
                <!-- IMAGE -->
                <v-card-media class="fillPlace" :height="posterH">
                </v-card-media>
                <v-card-title class="pa-0">
                  <!-- TITLE -->
                  <v-flex xs10 class="dumTitle fillPlace pa-0 pt-1">
                  </v-flex>
                  <!-- ARTIST -->
                  <!-- <v-flex xs9 class="dumArtist fillPlace pa-0 pt-1" v-if="$route.name !== 'artist'"> -->
                  <!-- </v-flex> -->
                  <!-- DATE -->
                  <v-flex xs4 class="dumDate fillPlace pa-0 pt-1" >
                  </v-flex>
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
          lg3
          xl2
          @click.stop="!bSelect ? play(props.index) : checkItem(props.item)"
        >
          <v-card class="dc-crd ma-0 pa-0 pointer" :color="cardColor(props)">
            <!-- IMAGE -->
            <v-card-media v-lazy:background-image="props.item.posterLarge" :height="posterH" :key="props.item.poster">
              <!-- <v-card-media v-lazy:background-image="props.item.poster" height="200" :key="props.item.poster"> -->
              <!-- DURATION -->
              <span class="card-duration" v-text="props.item.duration"/>
              <v-flex xs1>
              </v-flex>
            </v-card-media>
            <!-- TITLE -->
            <v-card-title class="pa-0">
              <v-layout row wrap>
                <v-flex xs10>
                  <!-- CHECK BOX -->
                  <v-flex @click.stop v-show="bSelect" class="chkbx pa-1">
                    <v-checkbox hide-details v-model="selected" :value="props.item" color='primary'></v-checkbox>
                  </v-flex>
                  <!-- TITLE -->
                  <v-flex class="text-xs-left body-2 grd-txt pa-0 pt-1">
                    {{ props.item.title }}
                  </v-flex>
                  <!-- ARTIST -->
                  <v-flex class="text-xs-left grey--text grd-txt pa-0 pt-1" v-if="$route.name !== 'artist'" @click.stop="bSelect ? checkItem(props.item) : $router.push({name: 'artist', params: {source: props.item.source, artist: props.item.artist, artistID: props.item.artistID}})">
                    {{ props.item.artist }}
                  </v-flex>
                  <!-- DATE -->
                  <v-flex class="text-xs-left grey--text grd-txt pa-0 pt-1" v-if="$route.params.artistID || showUploaded">
                    {{ $DCAPI.calcDate(!1, props.item.uploaded) }}
                  </v-flex>
                </v-flex>

                <!-- SONG ACTIONS DROPDOWN MENU -->
                <v-flex xs2 class="ma-0 pa-0 pt-2" @click.stop>
                  <v-menu bottom open-on-click lazy nudge-top="10" nudge-left="30" class="men ma-0 pa-0" v-if="!$UTILS.isMobile" >
                    <v-btn icon small slot="activator" class="ar14">
                      <v-icon>more_vert</v-icon>
                    </v-btn>
                    <v-list>
                      <v-list-tile v-if="$store.getters.auth_state">
                        <add-to-playlist :song="bSelect ? selected :[props.item]"></add-to-playlist>
                      </v-list-tile>
                      <v-list-tile>
                        <download-button :links="bSelect ? selected :[props.item]"></download-button>
                      </v-list-tile>
                      <v-list-tile>
                        <share-button :song="props.item" :url="'https://dreamcloud.netlify.com/#/t/' + props.item.source + '/' + encodeURIComponent(props.item.artist) + '/' + props.item.trackID"></share-button>
                      </v-list-tile>
                      <v-list-tile v-if="props.item.key && !bSelect">
                        <delete-button :id="props.item.key" @delete="bSelect ? removeList() : remove(props.item.key)"></delete-button>
                      </v-list-tile>
                      <v-list-tile>
                        <offlineButton :link1="props.item.mp32" :link2="props.item.mp3" :trackID="props.item.trackID"></offlineButton>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
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

import offlineButton from '@/components/buttons/offline-button.vue'
import addToPlaylist from '@/components/buttons/add-to-playlist.vue'
import deleteButton from '@/components/buttons/delete-button'
import shareButton from '@/components/buttons/share-button'
import downloadButton from '@/components/buttons/download-button'
import { mapGetters } from 'vuex'
// /* eslint-disable */
export default {
  name: 'grid',
  props: {
    songs: {
      type: [Array]
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
    'share-button': shareButton
  },
  watch: {
    'rowsPerPage': function (val) {
      this.pagination.rowsPerPage = val
    }
  },
  data () {
    return {
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
      drawRight: 'drawRight'
    }),
    posterH () {
      return this.$vuetify.breakpoint.xlOnly ? '140' : '280' + 'px'
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
    cardColor (props) {
      if (this.bSelect) {
        return this.selected.some(el => el === props.item) ? 'primary' : ''
      } else {
        return this.isPlaying(props.item.mp32)
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
    isPlaying (link) {
      return this.$route.path === this.hash && link === this.current_song.mp32 ? 'primary white--text' : ''
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
  },
  created () {
    // this.items = this.songs
    // console.log(this.songs)
    // this.getRelated()
  },
  mounted () {
    // console.log(this.items, this.songs)
    // this.items = this.songs
  },
  updated () {
    // console.log(this.items, this.songs)
    // this.items = this.songs
    // this.getRelated()
    // this.items = this.current
  }
}
</script>
<style>

  @media only screen and (max-width: 599px){

  }
  @media only screen and (min-width: 600px){
    .dc-crd:hover .men {
      display:inline-block !important;
    }
    .men{
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
