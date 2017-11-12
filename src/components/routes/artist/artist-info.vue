<template>
  <!-- <div class='row'> -->
  <v-container grid-list-md text-xs-center>
    <v-layout align-center row wrap slot='header'>
      
      <v-flex xs12 lg2 >
        <v-avatar size='' slot='activator'>
          <img :src='info.img' class='img-fluid' style='display:inline-block; margin:20px;'/>
        </v-avatar>
      </v-flex>
      
      <v-flex xs4 lg4 class='headline text-xs-left'>
        <strong>{{ artist }}</strong>
      </v-flex>
      
      <v-flex lg6>
      </v-flex>

      <v-flex lg2>
        <subscribe-button :artistID="artistID" :source="source" :artist="artist" :img="info.img"></subscribe-button>
      </v-flex>
      <v-flex xs11 lg8 class='text-xs-left'>
        {{ info.description }}
      </v-flex>

    </v-layout>
  </v-container>

    <!-- <div style='display:inline-block;width:40%'>
      <span class='lead text-left' style='text-decoration: underline;'>{{ artist }}</span>
      <img :src='info.img' class='img-fluid' style='display:inline-block; margin:20px;'/>
      <br />
      <span class='lead' v-if='info.last_modified'>{{ info.created }}</span>
      <span class='lead' v-if='info.last_modified'>{{ info.last_modified }}</span>
      <span class='lead' v-if='info.followers_count'>{{ info.followers_count }}</span>
      <span class='lead' v-if='info.track_count'>{{ info.track_count }}</span>
      <span class='lead' v-if='info.description' style='align: left;'>{{ info.description }}</span>
      <subscribe-button></subscribe-button>
    </div>
    </div>
  </div> -->
</template>
<script>
import subscribeButton from '@/components/routes/artist/subscribe-button'
export default {
  name: 'artist-info',
  props: ['artistID', 'source', 'artist'],
  components: {
    'subscribe-button': subscribeButton
  },
  data () {
    return {
      info: {
        description: '',
        img: '',
        title: '',
        last_modified: ''
      }
    }
  },
  mounted: function () {
    this.$DCAPI.getArtistInfo(this.artistID, this.source).then(response => {
      if (this.source.toLowerCase().indexOf('youtube') > -1) {
        this.info.img = response.data.items[0].snippet.thumbnails.default.url
        this.info.title = response.data.items[0].snippet.title
        this.info.description = response.data.items[0].snippet.description
        this.info.created = response.data.items[0].snippet.publishedAt
      } else if (this.source.toLowerCase().indexOf('soundcloud') > -1) {
        this.info.img = response.data.avatar_url
        this.info.title = response.data.username
        this.info.description = ''
        this.info.created = ''
        this.info.last_modified = response.data.last_modified
        this.info.followers_count = response.data.followers_count
        this.info.track_count = response.data.track_count
      } else if (this.source.toLowerCase().indexOf('mixcloud') > -1) {
        this.info.img = response.data.pictures.medium
        this.info.title = response.data.username
        this.info.description = response.biog
        this.info.created = response.data.created
        this.info.track_count = response.data.cloudcast_count
        this.info.last_modified = response.data.updated_time
        this.info.followers_count = response.data.followers_count
      }
    })
  }
}
</script>

<style>

</style>
