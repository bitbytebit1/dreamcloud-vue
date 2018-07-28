<template>
  <v-flex xs12 class="" :key="String(trackID)">
    <infinite-loading @infinite="infiniteHandler" :distance="0"><span slot="no-results"></span></infinite-loading>
    <v-data-iterator
      v-if="show"
      content-tag="v-layout"
      row
      wrap
      :items="aComments"
      hide-actions
      no-data-text=""
    >
      <v-flex
        slot="item"
        slot-scope="props"
        xs12
      >
        <v-card class="py-2">
          <!-- <v-container fluid grid-list-lg class="ma-0 pa-0 py-2"> -->
            <v-layout row>
              <v-flex xs1 sm1 style="min-width:64px">
                <!-- IMAGE -->
                <v-card-media contain class="pl-2">
                  <router-link class="body-1 grey--text noDeco" :to="{name: 'artist', params: {source: source, artist: props.item.artist, artistID: props.item.artistID}}">
                    <v-avatar
                      size="40"
                      color="grey lighten-4"
                      class="mt-1">
                      <img :src="props.item.artistIMG" alt="avatar">
                    </v-avatar>
                  </router-link>
                </v-card-media>
              </v-flex>
              <v-flex xs11>
                <div>
                  <div class="body-1 grey--text py-1">
                    <!-- ARTIST -->
                    <router-link class="body-1 grey--text noDeco" :to="{name: 'artist', params: {source: source, artist: props.item.artist, artistID: props.item.artistID}}">
                      <strong>{{props.item.artist}}</strong> 
                    </router-link>
                    <!-- CREATED -->
                  <span>{{' ' + $DCAPI.calcDate('', props.item.commentCreated)}}</span></div>
                  <!-- COMMENT -->
                  <div class="body-1 preline py-1" v-html="timeToSeconds(props.item.comment)"></div>
                </div>
              </v-flex>
            </v-layout>
            <!-- COMMENT REPLIES -->
            <commentThread v-if="props.item.totalReplyCount" :totalReplyCount="props.item.totalReplyCount" :commentThread="props.item.commentID" :source="source"></commentThread>
          <!-- </v-container> -->

        </v-card>
        <v-divider v-if="props.index !== aComments.length -1"></v-divider>
      </v-flex>
      <v-flex slot="footer" v-if="aComments.length && $DCAPI.YTCommentNext && !source.toLowerCase() === 'soundcloud'">
        <v-btn :loading="bLoading" small block color="transparent" @click="getMore">
          SHOW MORE
        </v-btn>
      </v-flex>
    </v-data-iterator>
  </v-flex>
</template>
<script>
import commentThread from '@/components/stage/meta/commentThread'
import InfiniteLoading from 'vue-infinite-loading'

/* eslint-disable */
export default {
  name: 'songComments',
  watch: {
    'trackID': 'reset'
  },
  props: {
    trackID: {
      type: [String, Number],
      default: ''
    },
    source: {
      type: [String],
      default: ''
    }
  },
  components: {
    'commentThread': commentThread,
    'infinite-loading': InfiniteLoading
  },
  data () {
    return {
      show: false,
      infState: '',
      aComments: [],
      iPage: 0,
      bLoading: false
    }
  },
  methods: {
    reset () {
      this.aComments = []
      this.iPage = 0
      this.show = false
    },
    infiniteHandler ($state) {
      this.infState = $state
      this.queryComments()
      // $state.complete()
    },
    timeToSeconds (value) {
      if (!value) {
        return ''
      }
      if (this.$store.getters.ytUseVideo) {
        return (value.replace(/(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)([0-5]?\d)/g,
        `<span class="underline pointer" onClick="window.dcYT.seekTo('$&'.split(':').reduce((acc,time) => (60 * acc) + +time));">$&</span>`))
      } else {
        return (value.replace(/(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)([0-5]?\d)/g,
        `<span class="underline pointer" onClick="document.getElementById('dc-audio').currentTime = '$&'.split(':').reduce((acc,time) => (60 * acc) + +time)">$&</span>`))
      }
    },
    queryComments () {
      this.aComments = []
      this.iPage = 0
      this.getComments()
    },
    getComments () {
      this.bLoading = true
      return this.$DCAPI.getSongCommentsThreads(this.trackID, this.iPage, this.source, 50, (dat) => {
        this.show = true
        this.infState.complete()
        // alert('loaded')
        this.bLoading = false
        this.aComments = this.aComments.concat(dat)
      })
    },
    getMore () {
      this.iPage += 1
      this.getComments()
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style>

</style>
