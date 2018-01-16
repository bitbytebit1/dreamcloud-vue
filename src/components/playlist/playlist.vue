<template>
  <v-flex flexbox>
      <!-- <div class="well"> && !$UTILS.isMobile -->
        <!-- <button class="btn btn-primary" @click='sort'>Sort Date</button>   -->
        <!-- <button class="btn btn-primary" @click='toggleView'>Toggle Playlist View</button> -->
      <!-- </div> -->
      <v-container v-if="!list" fluid v-bind="{ [`grid-list-${_size}`]: true }">
        <v-layout row wrap>
            <v-flex lg10>
              <v-text-field
              color="teal"
              :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : ''"
              label="Filter"
              single-line
              hide-details
              v-on:keyup.enter="$UTILS.closeSoftMobi()"
              ref="search"
              ></v-text-field>
            </v-flex>
            <v-flex lg2 :class="$vuetify.breakpoint.name === 'xs' ? '' : 'pt-2'">
              <v-btn icon>
                <v-icon>filter_list</v-icon>
              </v-btn> 
              <v-btn icon @click="toggleView">
                <v-icon>view_headline</v-icon>
              </v-btn>
            </v-flex>
          <!-- <v-flex> -->
            <column
              v-for="(song, index) in songs"
              :song="song"
              :index="index"
              :key="index" 
            >
            </column>
          <!-- </v-flex> -->
        </v-layout>
      </v-container>
        <v-container v-if="list && !$UTILS.isMobile">
          <list :rowsPerPage="rowsPerPage" :sortBy="sortBy" @toggleView="toggleView" :songs="songs"></list>
      </v-container>
      <list :rowsPerPage="rowsPerPage" @toggleView="toggleView" v-if="list && $UTILS.isMobile" :songs="songs"></list>

  </v-flex>
</template>
<script>
import column from './column.vue'
import list from './list.vue'

export default {
  name: 'playlist',
  props: {
    songs: {
      type: [Array],
      required: true
    },
    viewType: {
      type: [Object],
      default () {
        return { full: true, list: !0 }
      }
    },
    rowsPerPage: {
      type: [Number, String],
      default: 10
    },
    sortBy: {
      type: [String],
      default: ''
    }
  },
  components: {
    'column': column,
    'list': list
  },
  data () {
    return {
      showScrollToTop: false,
      list: this.viewType.list,
      fixd: this.songs
    }
  },
  computed: {
    _size () {
      // returns xs to xl depending on view port.
      // used to set padding around elements.
      return this.$vuetify.breakpoint.name
    },
    fixedSongs () {
      for (let song in this.songs) {
        if (!(this.fixd[song].uploaded instanceof Date)) {
          this.fixd[song].uploaded = new Date(this.fixd[song].uploaded)
        } else {
          break
        }
      }
      return this.fixd
    }
  },
  methods: {
    play (index) {
      this.$store.commit('setNPlay', {songs: this.songs, current: index, path: this.$route.path})
      return this.$DCPlayer.setNPlay(this.songs, index)
    },
    sort () {
      this.songs.sort(this.$DCAPI.sortDate)
    },
    toggleView () {
      this.list = !this.list
    }
  }
}
</script>

<style>
#search-results{
  margin-bottom: 10px
}
</style>
