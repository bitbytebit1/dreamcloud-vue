<template>
  <v-flex class="ma-0 pa-0" >
    <v-layout 
      row 
      wrap 
      class="ma-0 pa-0"
    >
      <v-flex 
        xs12 
        class="pointer body-1 comMor" 
        @click="show = !show"
      >
        {{ (show ? 'Hide' : 'Show') + ` ${totalReplyCount} replies` }} 
        <v-icon size="18">{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
        <orbit 
          v-if="bLoading" 
          class="my-3 ml-4"
        />
      </v-flex>
    </v-layout>

    <v-data-iterator
      v-if="show"
      :items="aComments"
      content-tag="v-layout"
      row
      wrap
      hide-actions
      no-data-text=""
    >
      <v-flex
        v-if="show"
        slot="item"
        slot-scope="props"
        offset-xs1
        xs11
        class="pr-1 py-1"
      >
        <v-card 
          class="py-2" 
          flat
        >
          <v-layout row>
            <v-flex 
              xs1 
              sm1 
              style="min-width:54px"
            >
              <router-link 
                :to="{name: 'artist', params: {source: source, artist: props.item.artist, artistID: props.item.artistID}}" 
                class="body-1 grey--text noDeco pl-2"
              >
                <v-avatar 
                  size="40" 
                  color="grey lighten-4"
                >
                  <img 
                    :src="props.item.artistIMG" 
                    alt="avatar"
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
                  class="body-1 preline py-1" 
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
    },
    extShow: {
      type: [Boolean],
      default: false
    }
  },
  watch: {
    extShow: function (ny){
      console.log(ny)
      this.show = ny
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
      if (this.$store.getters.ytUseVideo && this.$store.getters.isYT) {
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
.comMor{
  position: relative;
  left: 75px !important;
}
</style>
