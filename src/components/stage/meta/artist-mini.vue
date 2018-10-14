<template>
  <v-flex 
    xs3 
    lg1 
    alignCenter 
    class="mt-3">
    <!-- Left column -->
    <v-flex xs12 >
      <!-- Avatar -->
      <router-link :to="{name: 'artist', params: {source: source, artist: artist, artistID: artistID}}">
        <v-flex xs12>
          <v-avatar 
            slot='activator' 
            class="pointer" 
            size='55px'>
            <img 
              :src='info.img' 
              class='img-fluid' 
              style='display:inline-block;'>
          </v-avatar>
        </v-flex>
      </router-link>
      <!-- Subscribe Button -->
      <v-flex 
        xl12 
        class="mt-2">
        <subscribe-button 
          v-if="$store.getters.auth_state" 
          :artistID="artistID" 
          :source="source" 
          :artist="artist" 
          :img="info.img"/>
      </v-flex>
    </v-flex>
  </v-flex>
</template>
<script>
import subscribeButton from '@/components/buttons/subscribe-button'
export default {
  name: 'ArtistMini',
  props: {
    artistID: {
      type: [String, Number],
      default: ''
    },
    source: {
      type: String,
      default: ''
    },
    artist: {
      type: String,
      default: ''
    }
  },
  components: {
    'subscribe-button': subscribeButton
  },
  data () {
    return {
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
  methods: {
    avatarClicked () {
      this.$router.push({name: 'artist', params: {source: this.source, artist: this.artist, artistID: this.artistID}})
    }
  },
  computed: {
    items () {
      return [
        { icon: 'music_note', name: 'Tracks', data: this.info.track_count },
        { icon: 'star', name: 'Followers', data: this.info.followers_count },
        { icon: 'updated', name: 'Last updated', data: this.info.last_modified ? this.$DCAPI.calcDate(new Date(), this.info.last_modified) : '' },
        { icon: 'date_range', name: 'Created', data: this.info.created ? this.$DCAPI.calcDate(new Date(), this.info.created) : '' }
      ]
    }
  },
  mounted () {
    this.$DCAPI.getArtistInfo(this.artistID, this.source).then((response) => {
      if (this.source.toLowerCase().indexOf('youtube') > -1) {
        this.info.created = response.data.items[0].snippet.publishedAt
        this.info.description = response.data.items[0].snippet.description
        this.info.img = response.data.items[0].snippet.thumbnails.high.url
        this.info.title = response.data.items[0].snippet.title
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
        // console.log(this.response)
        this.info.created = response.data.created
        this.info.img = response.data.img
        this.info.last_modified = response.data.last
        this.info.track_count = response.data.tracks
      }
    })
  }
}
</script>

<style>

</style>
