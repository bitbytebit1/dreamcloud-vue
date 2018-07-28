<template>
  <!-- <v-container grid-list-md text-xs-center :class="$vuetify.breakpoint.name === 'xs'? 'ma-0 pa-0 pt-1' : ''"> -->
  <v-layout row wrap id="artistInfo" class="ma-0 pa-0 pb-2">
    <!-- <v-btn color="success" @click.stop='$UTILS.copyToClipboard(debugLink)'>Copy</v-btn> -->
    <!-- LEFT COLUMN -->
    <v-flex xs12 lg1 style="min-width:180px">
      <!-- AVATAR -->
      <v-flex xl12 class="pt-2">
        <v-avatar size='100px' v-lazy:background-image='info.img'>
          <!-- <img :src='info.img' style='display:inline-block;'/> -->
        </v-avatar>
      </v-flex>
      <!-- SUBSCRIBE BUTTON -->
      <v-flex xl12 class="mt-4 pt-2">
        <subscribe-button :artistID="artistID" :source="source" :artist="artist" :img="info.img"></subscribe-button>
      </v-flex>
    </v-flex>

    <!-- RIGHT COLUMN -->
    <v-flex xs12 lg10 id="artist-right">
      <!-- ARTIST NAME -->
      <v-flex xs12 lg10 :class="$vuetify.breakpoint.name === 'xs'? 'headline fwl' : 'headline fwl text-xs-left pl-2 pt-2'">
        {{ artist }}
      </v-flex>
      <v-layout row wrap align-content-start>
        <!-- META -->
        <!-- {{ descHeight }} -->
        <v-flex xs12 :class="$vuetify.breakpoint.name === 'xs'? 'headline' : 'headline text-xs-left'">
          <v-layout row wrap align-content-start>
            <div xs4 class="text-xs-left fl-r pr-3" style="" v-for="item in items" v-if="item.data" :key="item.name">
              <v-tooltip right>
                <div slot="activator">
                  <v-btn icon disabled>
                    <v-icon>
                      {{item.icon}}
                    </v-icon>
                  </v-btn>
                  <span class="body-2 grey--text">
                    {{item.data}}
                  </span>
                </div>
                <span>{{item.name}}</span>
              </v-tooltip>
            </div>
          </v-layout>
        </v-flex>
        <!-- DESCRIPTION -->
        <v-flex xs12 id="desc" class='text-xs-left preline wordbreak ma-0 pa-0'  style="width: 100%">
          <div v-if="info.description" id="descCont" :class="descClass" class="subheading fwl text-xs-left preline wordbreak">{{ info.description }}</div>
        </v-flex>
        <!-- SHOW MORE -->
        <v-flex xs12 class="text-xs-left">
          <v-btn v-show="descHeight > 63" flat small block class="text-xs-left" @click="bHide = !bHide">{{bHide ? 'SHOW MORE': 'SHOW LESS' }}</v-btn> 
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
  <!-- </v-container> -->
</template>
<script>
import subscribeButton from '@/components/buttons/subscribe-button'
export default {
  name: 'artist-info',
  props: ['artistID', 'source', 'artist'],
  components: {
    'subscribe-button': subscribeButton
  },
  data () {
    return {
      bHide: false,
      descHeight: 0,
      info: {
        created: '',
        description: '',
        img: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
        followers_count: '',
        last_modified: '',
        title: '',
        track_count: ''
      }
    }
  },
  computed: {
    debugLink () {
      return '{ artist: "' + this.artist + '", source: "' + this.source + '", artistID: "' + this.artistID + '", img: "' + this.info.img + '" },\n\n'
    },
    descClass () {
      return this.bHide ? 'chop' : ''
    },
    items () {
      return [
        { icon: 'music_note', name: 'Tracks', data: this.info.track_count },
        { icon: 'star', name: 'Followers', data: this.info.followers_count },
        { icon: 'update', name: 'Last updated', data: this.info.last_modified ? this.$DCAPI.calcDate(new Date(), this.info.last_modified) : '' },
        { icon: 'date_range', name: 'Created', data: this.info.created ? this.$DCAPI.calcDate(new Date(), this.info.created) : '' }
      ]
    }
  },
  methods: {
    getDescHeight () {
      return document.getElementById('desc').clientHeight
    }
  },
  mounted () {
    this.$DCAPI.getArtistInfo(this.artistID, this.source).then((response) => {
      if (this.source.toLowerCase().indexOf('youtube') > -1) {
        this.info.created = response.data.items[0].snippet.publishedAt
        this.info.description = response.data.items[0].snippet.description
        this.info.img = response.data.items[0].snippet.thumbnails.high.url
        this.info.title = response.data.items[0].snippet.title
        this.info.followers_count = response.data.items[0].statistics.subscriberCount
        this.info.track_count = response.data.items[0].statistics.videoCount
      } else if (this.source.toLowerCase().indexOf('soundcloud') > -1) {
        this.info.created = ''
        this.info.description = ''
        this.info.img = response.data.avatar_url.replace('large', 't500x500')
        this.info.followers_count = response.data.followers_count
        this.info.last_modified = response.data.last_modified
        this.info.title = response.data.username
        this.info.track_count = response.data.track_count
      } else if (this.source.toLowerCase().indexOf('mixcloud') > -1) {
        this.info.created = response.data.created
        this.info.description = response.biog
        this.info.img = response.data.pictures.medium
        this.info.followers_count = response.data.followers_count
        this.info.last_modified = response.data.updated_time
        this.info.title = response.data.username
        this.info.track_count = response.data.cloudcast_count
      } else if (this.source.toLowerCase().indexOf('bandcamp') > -1) {
        this.info.created = response.data.created
        this.info.img = response.data.img
        this.info.last_modified = response.data.last
        this.info.track_count = response.data.tracks
      }
      this.$nextTick(() => {
        // console.log(this.getDescHeight())
        this.descHeight = this.getDescHeight()
        if (this.descHeight > 50) {
          this.bHide = true
        }
      })
    })
  }
}
</script>

<style>
.chop{
  height: 45px;
  overflow:hidden;
}
  @media only screen and (min-width: 600px){
    #artist-right{
      min-height: 165px;
    }
  }
  @media only screen and (max-width: 599px){
    #artist-right{
      min-height: 60px;
    }
  }
#artistInfo{
  padding-bottom: 23px;
}
</style>
