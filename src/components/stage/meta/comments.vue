<template>
  <v-flex 
    xs12 
    class=""
  >
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
        slot="item"
        slot-scope="props"
        xs12
      >
        <v-card class="py-2">
          <v-layout row>
            <v-flex class="comAv">
              <!-- IMAGE -->
              <router-link 
                :to="{name: 'artist', params: {source: source, artist: props.item.artist, artistID: props.item.artistID}}" 
                class="body-1 grey--text noDeco"
              >
                <v-avatar
                  class="mt-1 comAv"
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
                <!-- COMMENT -->
                <div 
                  class="body-1 preline py-1" 
                  v-html="timeToSeconds(props.item.comment)"
                />
              </div>
            </v-flex>
          </v-layout>
          <!-- COMMENT REPLIES -->
          <commentThread 
            v-if="props.item.totalReplyCount" 
            :total-reply-count="props.item.totalReplyCount" 
            :comment-thread="props.item.commentID" 
            :source="source"
          />
        </v-card>
        <v-divider v-if="props.index !== aComments.length -1"/>
      </v-flex>
      <v-flex 
        v-if="aComments.length && $DCAPI.YTCommentNext && !source.toLowerCase() === 'soundcloud'" 
        slot="footer"
      >
        <v-btn 
          :loading="bLoading" 
          small 
          block 
          color="transparent" 
          class="comMor" 
          @click="getMore"
        >
          SHOW MORE
        </v-btn>
      </v-flex>
    </v-data-iterator>
    <v-layout 
      v-if="noComments" 
      row
      wrap
    >
      <v-flex xs12>
        <v-card >
          <v-card-title>
            No comments available
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-flex>
</template>
<script>
import commentThread from '@/components/stage/meta/commentThread'
import InfiniteLoading from 'vue-infinite-loading'

/* eslint-disable */
export default {
  name: 'songComments',
  watch: {
    'trackID': {
      immediate: true,
      handler: 'reset'
    }
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
      bLoading: false,
      noComments: false
    }
  },
  methods: {
    reset () {
      this.aComments = []
      this.iPage = 0
      this.show = false
      this.noComments = false
      this.getComments()
    },
    infiniteHandler ($state) {
      this.infState = $state
      this.queryComments()
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
    getComments () {
      this.bLoading = true
      return this.$DCAPI.getSongCommentsThreads(this.trackID, this.iPage, this.source, 50, (dat) => {
        if (this.infState) {
          this.infState.complete()
        }
        if (dat.length) {
          // alert('loaded')
          this.bLoading = false
          this.aComments = this.aComments.concat(dat)
          this.show = true
        } else {
          this.noComments = true
        }
      })
    },
    getMore () {
      this.iPage += 1
      this.getComments()
    }
  }
}
</script>

<style>

@media only screen and (max-width: 599px){
  .comAv{
    margin-left: 4px;
    margin-right: 4px;
  }
}
@media only screen and (min-width: 600px){
  .comAv{
    margin-left: 10px
  }
}

</style>
