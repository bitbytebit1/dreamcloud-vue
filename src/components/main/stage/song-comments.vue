<template>
  <v-flex xs12 class="mr-3 mt-2" :key="String(trackID)">
    <v-data-iterator
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
        <v-card>
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs2 sm1>
                <v-card-media
                  contain
                >
                  <router-link class="body-1 grey--text noDeco" :to="{name: 'artist', params: {source: source, artist: props.item.artist, artistID: props.item.artistID}}">
                    <v-avatar
                      size="40"
                      color="grey lighten-4"
                    >
                      <img :src="props.item.artistIMG" alt="avatar">
                    </v-avatar>
                  </router-link>
                </v-card-media>
              </v-flex>
              <v-flex xs10 sm11>
                <div>
                  <div class="body-1 grey--text">
                    <router-link class="body-1 grey--text noDeco" :to="{name: 'artist', params: {source: source, artist: props.item.artist, artistID: props.item.artistID}}">
                      <strong>{{props.item.artist}}</strong> 
                    </router-link>
                    <span>{{' ' + $DCAPI.calcDate('', props.item.commentCreated)}}</span></div>
                  <div class="subheading preline" v-html="timeToSeconds(props.item.comment)"></div>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-divider v-if="props.index !== aComments.length -1"></v-divider>
      </v-flex>
      <v-flex slot="footer" v-if="aComments.length && $DCAPI.YTCommentNext">
        <v-btn :loading="bLoading" small block color="transparent" @click="getMore">
          SHOW MORE
        </v-btn>
      </v-flex>

    </v-data-iterator>
  </v-flex>
</template>
<script>
/* eslint-disable */
import deleteButton from '@/components/misc/delete-button'
export default {
  name: 'songComments',
  watch: {
    'trackID': 'queryComments'
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
    'delete-button': deleteButton
  },
  data () {
    return {
      aComments: [],
      iPage: 0,
      bLoading: false
    }
  },
  methods: {
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
      return this.$DCAPI.getSongComments(this.trackID, this.iPage, this.source, 50, (dat) => {
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
.preline{
  white-space: pre-line;
}
</style>
