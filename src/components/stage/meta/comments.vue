<template>
  <v-flex 
    xs12 
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
        @click="props.item.show = !props.item.show"
      >
        <v-card 
          :class="props.item.totalReplyCount ? 'pointer' : ''" 
          hover
          class="py-2"
        >
          <v-layout row>
            <v-flex 
              class="comAv pr-3" 
              shrink
            >
              <!-- IMAGE -->
              <router-link 
                :to="{name: 'artist', params: {source: source, artist: props.item.artist, artistID: props.item.artistID}}" 
                class="body-1 grey--text noDeco"
                @click.native.stop
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
            <v-flex 
              xs10 
            >
              <div>
                <div class="body-1 grey--text py-1">
                  <!-- ARTIST -->
                  <router-link 
                    :to="{name: 'artist', params: {source: source, artist: props.item.artist, artistID: props.item.artistID}}" 
                    class="body-1 grey--text noDeco"
                    @click.native.stop.prevent
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
            :show-thread="props.item.show"
            @show="props.item.show = $event"
          />
        </v-card>
        <v-divider v-if="props.index != aComments.length - 1"/>
      </v-flex>
      <v-flex 
        v-if="aComments.length && $DCAPI.YTCommentNext && source.toLowerCase() != 'soundcloud'"
        slot="footer" 
        xs12
      >
        <!-- <v-btn 
          :loading="bLoading"  
          block 
          color="transparent" 
          @click="getMore"
        >
          SHOW MORE
        </v-btn> -->
        <infinite-loading 
          ref="infiniteLoading" 
          :distance="210" 
          spinner="waveDots" 
          @infinite="infiniteHandler"
        >
          <span slot="no-more"/>
          <span slot="no-results"/>
        </infinite-loading>
      </v-flex>
    </v-data-iterator>
    <v-layout 
      v-else
      row
      wrap
    >
      <v-flex xs12>
        <v-card >
          <v-card-title>
            {{ noComments ? 'No comments available' : 'Loading comments' }}
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-flex>
</template>
<script>
import commentThread from '@/components/stage/meta/commentThread'
import InfiniteLoading from 'vue-infinite-loading'

// /* eslint-disable */
export default {
  name: 'SongComments',
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
    commentClick(d){
      console.log('show event', d)
    },
    reset () {
      this.aComments = []
      this.iPage = 0
      this.show = false
      this.noComments = false
      this.getComments()
    },
    infiniteHandler ($state) {
      this.infState = $state
      this.getMore()
    },
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
    getComments () {
      this.bLoading = true
      return this.$DCAPI.getSongCommentsThreads(this.trackID, this.iPage, this.source, 50, (dat) => {
        if (this.infState) {
          this.infState.loaded()
        }
        if (dat.length) {
          // alert('loaded')
          this.bLoading = false
          this.aComments = this.aComments.concat(dat)
          this.show = true
        } else {
          this.noComments = true
          if (this.infState) this.infState.complete()
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
.py-2.v-card--hover {
  cursor: initial;
}
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
