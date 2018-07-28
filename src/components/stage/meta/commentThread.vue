<template>
  <v-flex class="ma-0 pa-0" >
    <v-layout row wrap class="ma-0 pa-0">
      <v-flex xs1 sm1 style="min-width:64px">
      </v-flex>
      <v-flex xs11 @click="show = !show" class="pointer body-1">
        {{show ? `Hide ${totalReplyCount} replies` : `Show ${totalReplyCount} replies`}} 
        <v-icon size="18">{{show ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</v-icon>
        <orbit v-if="bLoading" class="my-3 ml-4"></orbit>
      </v-flex>
    </v-layout>

    <v-data-iterator
      content-tag="v-layout"
      row
      wrap
      :items="aComments"
      hide-actions
      no-data-text=""
      v-if="show"
    >
      <v-flex
        slot="item"
        slot-scope="props"
        offset-xs1
        xs11
        class="pr-1 py-1"
        v-if="show"
      >
        <v-card class="py-2" flat>
            <v-layout row>
              <v-flex xs1 sm1 style="min-width:64px">
                <v-card-media contain class="pl-2">
                  <router-link class="body-1 grey--text noDeco" :to="{name: 'artist', params: {source: source, artist: props.item.artist, artistID: props.item.artistID}}">
                    <v-avatar size="40" color="grey lighten-4">
                      <img :src="props.item.artistIMG" alt="avatar">
                    </v-avatar>
                  </router-link>
                </v-card-media>
              </v-flex>
              <v-flex xs11>
                <div>
                  <div class="body-1 grey--text">
                    <router-link class="body-1 grey--text noDeco" :to="{name: 'artist', params: {source: source, artist: props.item.artist, artistID: props.item.artistID}}">
                      <strong>{{props.item.artist}}</strong> 
                    </router-link>
                  <span>{{' ' + $DCAPI.calcDate('', props.item.commentCreated)}}</span></div>
                  <div class="body-1 preline" v-html="timeToSeconds(props.item.comment)"></div>
                </div>
              </v-flex>
            </v-layout>
          <!-- </v-container> -->
        </v-card>
        <v-divider v-if="props.index !== aComments.length -1"></v-divider>
      </v-flex>
      <!-- <v-flex slot="footer" v-if="aComments.length && $DCAPI.YTCommentNext">
        <v-btn :loading="bLoading" small block color="transparent" @click="getMore">
          SHOW MORE
        </v-btn>
      </v-flex> -->

    </v-data-iterator>
  </v-flex>
</template>
<script>
import orbit from '@/components/misc/orbit'
/* eslint-disable */
export default {
  name: 'songCommentsThread',
  watch: {
    'show': 'queryComments'
  },
  components: {
    'orbit': orbit
  },
  props: {
    totalReplyCount: {
      type: [String, Number],
      default: ''
    },
    commentThread: {
      type: [String, Number],
      default: ''
    },
    source: {
      type: [String],
      default: ''
    }
  },
  data () {
    return {
      show: false,
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
      if (this.show && ! this.aComments.length) {
        this.aComments = []
        this.iPage = 0
        this.getComments()
      } else {
        // console.log('comment reply no go')
      }
    },
    getComments () {
      this.bLoading = true
      let f = (nextPage) => {
        return this.$DCAPI.getSongComments(this.commentThread, this.source, 50, nextPage, (resp) => {
          this.bLoading = false
          if (resp.data.length) {
            this.aComments = this.aComments.concat(resp.data) 
            if (resp.nextPage) {
              f(resp.nextPage)
            }
          }
        })
      }
      f('')
    },
    getMore () {
      this.iPage += 1
      this.getComments()
    }
  }
}
</script>

<style>

</style>
