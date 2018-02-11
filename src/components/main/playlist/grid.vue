<template>
  <v-flex xs12>
    <!-- table header buttons -->
    <v-card class="elevation-8">
      <v-card-title class="ma-0 pa-0">
        <v-layout row wrap>
          <!-- header buttons -->
          <v-flex xs6 lg2 class="text-xs-left mt-2">
            <!-- enable check boxes -->
            <v-btn v-if="auth_state" @click="bSelect = !bSelect" icon>
              <v-icon :color="bSelect ? 'primary' : ''">check_box</v-icon>
            </v-btn>
            <!-- toggle view -->
            <v-btn icon @click="$emit('toggleView')">
              <v-icon>{{view_mode ? 'view_module' : 'view_list'}}</v-icon>
            </v-btn>
            <!-- focus search bar button -->
            <v-btn icon @click="$refs.search.focus()" v-if="!search.length">
              <v-icon :color="filterHasFocus ? 'primary' : ''">filter_list</v-icon>
            </v-btn>
            <v-btn icon v-else @click="search=''">
              <v-icon color="primary">
                clear
              </v-icon>
            </v-btn>
          </v-flex>
          <!-- filter -->
          <v-flex xs5 offset-lg0 lg10 class="pr-4">
            <v-text-field
              @focus="filterHasFocus = true"
              @blur="filterHasFocus = false"
              color="primary"
              :class="$vuetify.breakpoint.smAndUp ? 'ma-0' : ''"
              id="flr-txt"
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
            <add-to-playlist key="multi" :disabled="selected.length == 0" v-if="auth_state" :song="selected"></add-to-playlist>

            <delete-button :disabled="selected.length == 0" v-if="$route.params.playlist" @delete="removeList"></delete-button>

            <download-button :dis="selected.length == 0" :links="selected"></download-button>
            
            <v-flex d-inline-flex>{{selected.length}} of {{filterLength}}</v-flex>
          </v-flex>
        </v-layout>
      </v-card-title>
      <!-- v-data-iterator -->
      <v-data-iterator
        class="mt-2"
        ref="dItera"
        content-tag='v-layout'
        row
        wrap
        :headers="headers"
        :items="songs"
        :pagination.sync="pagination"
        :rows-per-page-items='[24, 50, 100, { text: "All", value: -1 }]'
        :search="search"
        :select-all="bSelect"
        >
        <!-- no data -->
        <v-flex slot="no-data">No matching records</v-flex>

        <!-- item slot -->
        <v-flex 
          slot='item'
          slot-scope='props'
          xs6
          lg3
          @click.stop="!bSelect ? play(props.index) : ''"
        >
          <v-card class="dc-crd ma-0 pa-0 pointer" :color="cardColor(props)">

            <v-flex @click.stop v-if="bSelect">
              <v-checkbox hide-details v-model="selected" :value="props.item"></v-checkbox>
            </v-flex>
            <!-- image -->
            <v-card-media v-lazy:background-image="props.item.poster" height="150px">
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <!-- duration -->
                    <span class="card-duration" v-text="props.item.duration"/>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-media>
            <v-card-title primary-title>
              <div class="text-xs-left">
                <!-- title -->
                <div class="subheading primary-title">{{ props.item.title }}</div>
                <!-- artist -->
                <div v-if="!$route.params.artistID" class="artist" @click.stop="$router.push({name: 'artist', params: {source: props.item.source, artist: props.item.artist, artistID: props.item.artistID}})">{{ props.item.artist }}</div>
                <!-- check_box -->
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-data-iterator>
    </v-card>
  </v-flex>
</template>
<script>

import addToPlaylist from '@/components/misc/add-to-playlist.vue'
import deleteButton from '@/components/misc/delete-button'
import shareButton from '@/components/misc/share-button'
import downloadButton from '@/components/misc/download-button'
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
      auth_state: 'auth_state',
      index: 'index',
      hash: 'hash',
      current_song: 'current_song',
      view_mode: 'view_mode'
    }),
    filterLength () {
      return this.search.length && this.$refs.dItera.filteredItems.length ? this.$refs.dItera.filteredItems.length : this.songs.length - 1
    },
    sorted () {
      //  returns the full sorted array for use with click
      if (this.$refs.dItera.pagination.rowsPerPage !== -1 && this.songs.length > this.$refs.dItera.pagination.rowsPerPage) {
        var a = this.$refs.dItera.pagination.rowsPerPage
        this.$refs.dItera.pagination.rowsPerPage = -1
        var b = this.$refs.dItera.filteredItems.length ? this.$refs.dItera.filteredItems : this.songs
        this.$refs.dItera.pagination.rowsPerPage = a
        return b
      } else {
        return this.$refs.dItera.filteredItems.length ? this.$refs.dItera.filteredItems : this.songs
      }
    }
  },
  methods: {
    removeList () {
      for (const i in this.selected) {
        this.remove(this.selected[i].key)
      }
    },
    remove (key) {
      this.$DCFB.playlistSongDelete(this.$route.params.playlist, key)
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
    cardColor (prop) {
      if (this.bSelect) {
        return prop.selected ? 'primary' : ''
      } else {
        return this.isPlaying(prop.item.mp32)
      }
    },
    play (index) {
      // Fix for mobile on first play
      if (this.$store.getters.index === -1 && this.$UTILS.isMobile) this.$DCPlayer.eAudio.play()
      // If not first page fix index
      index = this.pagination.page === 1 ? index : (this.pagination.rowsPerPage * (this.pagination.page - 1)) + index
      this.$store.commit('setNPlay', {songs: this.sorted, current: index, path: this.$route.path})
      this.$DCPlayer.setNPlay(this.sorted, index)
      this.$router.push({name: 'stage'})
    },
    isPlaying (link) {
      return this.$route.path === this.hash && link === this.current_song.mp32 ? 'primary' : ''
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
.card__media[lazy=loading] {
  background: center center / cover no-repeat;
}
.card__media[lazy=loaded] {
  background: center center / cover no-repeat;
}
.menu{
  width: 45px;
}
.card-duration{
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
.dc-crd .subheading, .dc-crd .artist{
  word-break: break-word;
}

@-moz-document url-prefix() {
  .dc-crd .subheading, .dc-crd .artist{
    /* white-space: pre-wrap; */
    /* word-break: break-all; */
  }
}
.artist{
  color: grey;
}

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

.orbit-spinner, .orbit-spinner * {
  box-sizing: border-box;
}

.orbit-spinner {
  height: 55px;
  width: 55px;
  border-radius: 50%;
  perspective: 800px;
}

.orbit-spinner .orbit {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.orbit-spinner .orbit:nth-child(1) {
  left: 0%;
  top: 0%;
  animation: orbit-spinner-orbit-one-animation 1200ms linear infinite;
  border-bottom: 3px solid primary;
}

.orbit-spinner .orbit:nth-child(2) {
  right: 0%;
  top: 0%;
  animation: orbit-spinner-orbit-two-animation 1200ms linear infinite;
  border-right: 3px solid primary;
}

.orbit-spinner .orbit:nth-child(3) {
  right: 0%;
  bottom: 0%;
  animation: orbit-spinner-orbit-three-animation 1200ms linear infinite;
  border-top: 3px solid primary;
}

@keyframes orbit-spinner-orbit-one-animation {
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes orbit-spinner-orbit-two-animation {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes orbit-spinner-orbit-three-animation {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}
</style>
