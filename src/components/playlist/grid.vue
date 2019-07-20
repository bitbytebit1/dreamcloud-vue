<template>
  <v-flex xs12>
    <!-- TABLE HEADER BUTTONS -->
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
            <v-tooltip top>
              <v-btn 
                slot="activator" 
                icon 
                @click="bSelect = !bSelect"
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

            <!-- FILTER BUTTON -->
            <v-tooltip top>
              <v-btn 
                slot="activator" 
                icon 
                @click="search.length > 0 ? search='' : $refs.search.focus()"
              >
                <v-icon>{{ search.length > 0 ? 'clear': 'filter_list' }}</v-icon>
              </v-btn>
              <span>Filter</span>
            </v-tooltip>
          </v-flex>
          <!-- FILTER -->
          <v-flex 
            xs4
            lg8
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
            xs12 
            lg12 
            class="text-xs-left"
          >
            <!-- SELECT ALL -->
            <v-tooltip 
              slot="activator" 
              top
            >
              <v-btn 
                slot="activator" 
                icon 
                @click="(bSelectAll = !bSelectAll, bSelectAll ? selected = Object.assign([], sorted) : selected = [])"
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

            <!-- v-if="auth_state"  -->
            <add-to-playlist 
              key="multi" 
              :disabled="selected.length == 0" 
              :song="selected"
            />
            
            <v-flex d-inline-flex>{{ selected.length }} of {{ filterLength }}</v-flex>
            
          </v-flex>
        </v-layout>
      </v-card-title>
      <!-- V-DATA-ITERATOR -->
      <v-container 
        grid-list-lg 
        class="pa-0" 
        fluid
      >
        <v-data-iterator
          ref="dItera"
          :headers="headers"
          :items="songs"
          :pagination.sync="pagination"
          :rows-per-page-items='[24, 50, 100, { text: "All", value: -1 }]'
          :search="search"
          :hide-actions="!full"
          content-class="pa-0 ma-0"
          content-tag='v-layout'
          row
          wrap
        >
          <!-- NO DATA -->
          <template slot="no-data">
            <v-layout 
              row 
              wrap 
              class="ma-0 pa-0"
            >
              <v-flex 
                v-for="n in 36" 
                :key="n" 
                xs12
                sm6
                md4
                lg2
                xl2
                class="ma-0"
                @contextmenu="$event.preventDefault()"
              >
                <v-card class="dc-crd ma-0 pa-0 pointer"> 
                  <!-- IMAGE -->
                  <v-img
                    :aspect-ratio="aspect || 1"
                    class="fillPlace"
                  >
                    <v-layout
                      slot="placeholder"
                      fill-height
                      align-center
                      justify-center
                      ma-0
                      class="grey--text"
                    />
                  </v-img>
                  <v-card-title class="pa-0">
                    <!-- TITLE -->
                    <v-flex 
                      xs10 
                      class="dumTitle fillPlace pa-0 pt-1"
                    />
                    <!-- ARTIST -->
                    <!-- <v-flex xs9 class="dumArtist fillPlace pa-0 pt-1" v-if="$route.name !== 'artist'"> -->
                    <!-- </v-flex> -->
                    <!-- DATE -->
                    <v-flex 
                      xs4 
                      class="dumDate fillPlace pa-0 pt-1"
                    />
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
            sm4
            md4
            lg2
            @click.stop="
              !props.item.trackID 
                ? $router.push({name: 'artist', params: {source: props.item.source, artist: props.item.title, artistID: props.item.artistID }}) 
                : !props.item.listID 
                  ? !bSelect 
                    ? play(props.index, !showVideo, isPlaying(props.item.trackID))
                    : checkItem(props.item)
            // nasty ternary, if playlist push
            : $router.push({name: 'channelPlaylist', params: {listID: props.item.listID, artistID: props.item.artistID, title: props.item.title, source: props.item.source}})"
          >
            <v-card 
              class="dc-crd ma-0 pa-0 pointer outline"
              @contextmenu="props.item.trackID ? $emit('conmen', [$event, bSelect ? selected : [props.item]]) : null"
            >
              <!-- IMAGE -->
              <v-img
                v-lazy:background-image="props.item.posterLarge"
                :aspect-ratio="aspect"
                :key="props.item.trackID"
                class="fillPlace noSel"
              >
                <!-- <v-expand-transition> -->
                <div
                  v-if="props.item.trackID && isPlaying(props.item.trackID)"
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
                <!-- </v-expand-transition> -->
              </v-img>
              <!-- TITLE -->
              <v-card-title class="pa-0">
                <v-layout 
                  row 
                  wrap
                >
                  <v-flex xs10>
                    <!-- CHECK BOX -->
                    <v-flex 
                      v-if="bSelect" 
                      class="chkbx pa-1" 
                      @click.stop
                    >
                      <v-checkbox 
                        v-model="selected" 
                        :value="props.item" 
                        hide-details 
                        color='primary'
                      />
                    </v-flex>
                    <!-- TITLE -->
                    <v-flex 
                      class="text-xs-left body-2 grd-txt pa-0 pt-1 wordbreak" 
                      v-text="props.item.title"
                    />
                    <!-- ARTIST -->
                    <v-flex 
                      v-if="$route.name !== 'artist' && props.item.trackID || props.item.listID" 
                      class="text-xs-left pa-0 pt-1 wordbreak" 
                      @click.stop="bSelect ? checkItem(props.item) : $router.push({name: 'artist', params: {source: props.item.source, artist: props.item.artist, artistID: props.item.artistID}})"
                    >
                      <router-link 
                        :to="{name: 'artist', params: {source: props.item.source, artist: props.item.artist, artistID: props.item.artistID}}"
                        class="noDeco artist" 
                      >
                        {{ props.item.artist }}
                      </router-link>
                    </v-flex>
                    <!-- DATE -->
                    <v-flex 
                      v-if="$route.params.artistID || showUploaded" 
                      class="text-xs-left grey--text grd-txt pa-0 pt-1"
                    >
                      {{ props.item.uploaded ? $DCAPI.calcDate(!1, props.item.uploaded) : '' }}{{ props.item.duration ? ' • ' + props.item.duration : '' }}
                    </v-flex>
                  </v-flex>
                  <!-- SONG ACTIONS DROPDOWN MENU -->
                  <v-flex 
                    xs2 
                    class="ma-0 pa-0 pt-2" 
                    @click.stop
                  >
                    <!-- <v-tooltip 
                      top
                    > -->
                    <v-btn 
                      icon 
                      small 
                      class="men fl-r ma-0 pa-0 mt-1" 
                      @click="$emit('conmen', [$event, bSelect ? selected : [props.item]])"
                    >
                      <v-icon>more_vert</v-icon>
                    </v-btn>
                    <!-- <span>{{ $vuetify.breakpoint.smAndDown ? 'Long press menu' : 'Right click menu' }}</span> -->
                    <!-- </v-tooltip> -->
                  </v-flex>
                  
                </v-layout>
              </v-card-title>
              
            </v-card>
            <!-- </v-hover> -->
          </v-flex>
        </v-data-iterator>
      </v-container>
    </v-card>
  </v-flex>
</template>
<script>
import shuffleButton from '@/components/buttons/shuffle-button'
import addToPlaylist from '@/components/buttons/add-to-playlist'
import deleteButton from '@/components/buttons/delete-button'
import downloadButton from '@/components/buttons/download-button'
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
export default {

  name: 'Grid',
  props: {
    songs: {
      type: Array,
      default() {
        return []
      }
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
    'add-to-playlist': addToPlaylist,
    'delete-button': deleteButton,
    'download-button': downloadButton,
    'shuffleButton': shuffleButton
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
    ...mapState({
      view_mode: state => state.user.view_mode,
      index: state => state.player.current_index,
    }),
    ...mapGetters({
      current_trackID: 'current_trackID',
      showVideo: 'showVideo',
      // index: 'index',
      hash: 'hash',
      current_song: 'current_song',
      isYT: 'isYT'
    }),
    aspect () {
      return (this.$route.name === 'artist' ||  this.$route.name === 'related') && this.$route.params.source !== 'YouTube'  ? 1 : 16/9
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
        var b = Object.assign([], this.$refs.dItera.filteredItems.length ? this.$refs.dItera.filteredItems : this.songs)
        // eslint-disable-next-line
        this.$refs.dItera.pagination.rowsPerPage = a
        return b
      } else {
        return Object.assign([], this.$refs.dItera.filteredItems.length ? this.$refs.dItera.filteredItems : this.songs)
      }
    }
  },
  methods: {
    cardColor (props) {
      if (this.bSelect) {
        return this.selected.some(el => el === props.item) ? 'primary' : ''
      } else {
        return this.isPlaying(props.item.trackID) ? 'primary white--text' : ''
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
    isPlaying (trackID) {
      return trackID === this.current_trackID
      // return trackID === this.current_song.trackID
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
/* .outline{
  outline-style: auto;
  outline-width: 1px;
} */
.opaq{
  opacity: 1;
}
.d-flex.v-card--reveal {
  align-items: center;
  bottom: 0;
  /* right: 0; */
  justify-content: center;
  /* opacity: .6; */
  position: absolute;
  width: 100%;
}
.v-card--reveal div.playBtn{
  bottom: 0;
  right: 0;
  position: absolute;
}
  @media only screen and (max-width: 1262px){
    .dc-crd .men {
      display:flex !important;
    }
  }
  @media only screen and (min-width: 1263px){
    .dc-crd:hover .men {
      /* transition: opacity 0.2s 1s ease; Mouse enter: delay */
      display:flex !important;
    }
    .men{
      /* transition: 1s 3s; */
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
.dc-crd .v-responsive {
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
