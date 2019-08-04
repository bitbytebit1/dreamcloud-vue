<template>
  <v-flex 
    class="ma-0 pa-0" 
    @click="$emit('show', showThread)"
  >
    <v-layout 
      row 
      wrap 
      class="ma-0 pa-0"
    >
      <v-flex 
        shrink 
        class="pointer body-1 comMor noSel primary--text" 
      >
        {{ (showThread ? 'Hide' : 'Show') + ` ${totalReplyCount} replies` }} 
        <v-icon size="18">{{ showThread ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
        <orbit 
          v-if="bLoading" 
          class="my-3 ml-4"
        />
      </v-flex>
    </v-layout>
    <v-data-iterator
      v-if="showThread"
      :items="aComments"
      content-tag="v-layout"
      row
      wrap
      hide-actions
      no-data-text=""
    >
      <v-flex
        v-if="showThread"
        slot="item"
        slot-scope="props"
        xs12
        class="comThr"
      >
        <v-card 
          class="py-2" 
          flat
        >
          <v-layout row>
            <v-flex 
              pt-2
              mr-3
              shrink
            >
              <router-link 
                :to="{name: 'artist', params: {source: source, artist: props.item.artist, artistID: props.item.artistID}}" 
                class="body-1 grey--text noDeco"
                @click.stop
              >
                <v-avatar 
                  size="40" 
                  color="grey lighten-4"
                >
                  <img 
                    :src="props.item.artistIMG" 
                  >
                </v-avatar>
              </router-link>
            </v-flex>
            <v-flex xs11>
              <div>
                <div class="body-1 grey--text py-1">
                  <!-- ARTIST -->
                  <router-link 
                    :to="{name: 'artist', params: {source: source, artist: props.item.artist, artistID: props.item.artistID}}" 
                    class="body-1 grey--text noDeco"
                  >
                    <strong>{{ props.item.artist }}</strong> 
                  </router-link>
                <!-- CREATED -->
                <span>{{ ' ' + $DCAPI.calcDate('', props.item.commentCreated) }}</span></div>
                <div 
                  class="body-1 preline py-1 pr-1" 
                  v-html="timeToSeconds(props.item.comment)"
                />
              </div>
            </v-flex>
          </v-layout>
          <!-- </v-container> -->
        </v-card>
        <v-divider v-if="props.index !== aComments.length -1"/>
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
    'showThread': 'queryComments'
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
    },
    showThread: {
      type: [Boolean],
      default: false
    }
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
      if (this.$store.getters.ytUseVideo && this.$store.getters.isYT) {
        return (value.replace(/(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)([0-5]?\d)/g,
        `<span class="underline pointer" onClick="window.dcYT.seekTo('$&'.split(':').reduce((acc,time) => (60 * acc) + +time));return false">$&</span>`))
      } else {
        return (value.replace(/(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)([0-5]?\d)/g,
        `<span class="underline pointer" onClick="document.getElementById('dc-audio').currentTime = '$&'.split(':').reduce((acc,time) => (60 * acc) + +time);return false">$&</span>`))
      }
    },
    queryComments () {
      if (this.showThread && ! this.aComments.length) {
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
  @media only screen and (min-width: 600px){
    .comMor{
      position: relative;
      left: 67px !important;
    }
  }
  @media only screen and (max-width: 599px){
    .comMor{
      position: relative;
      left: 56px !important;
    }
    .comThr{
      position: relative;
      left: 21px !important;
      margin-right: 21px;
      padding-right: 21px;
    }
  }
</style>
