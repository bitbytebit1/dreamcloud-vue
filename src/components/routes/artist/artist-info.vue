<template>
  <v-container grid-list-md text-xs-center :class="$vuetify.breakpoint.name === 'xs'? 'ma-0 pa-0 pt-1' : ''">
    <v-layout align-center row wrap slot='header'>

      <!-- Left column -->
      <v-flex xs12 lg2 >
        <!-- Avatar -->
        <v-flex xl12>
          <v-avatar size='100px' slot='activator'>
            <img :src='info.img' class='img-fluid' style='display:inline-block;'/>
          </v-avatar>
        </v-flex>
        <!-- Subscribe Button -->
        <v-flex xl12>
          <subscribe-button v-if="$store.getters.auth_state" :artistID="artistID" :source="source" :artist="artist" :img="info.img"></subscribe-button>
        </v-flex>
      </v-flex>

      <!-- Right column -->
      <v-flex xs12 lg10>
        <!-- Artist Name -->
        <v-flex xs12 lg12 :class="$vuetify.breakpoint.name === 'xs'? 'headline' : 'headline text-xs-left'">
          <strong>{{ artist }}</strong>
        </v-flex>
        <v-flex style="min-height:65px;" xs12 lg10 :class="$vuetify.breakpoint.name === 'xs'? 'headline' : 'headline text-xs-left'">
          <!-- Meta -->
          <v-flex d-flex>
            <v-tooltip bottom v-for="item in items" v-if="item.data" :key="item.name">
              <v-btn icon disabled slot="activator">
                <v-icon>
                  {{item.icon}}
                </v-icon>
                {{item.data}}
              </v-btn>
              <span>{{item.name}}</span>
            </v-tooltip>
        <!-- <div style="float:left;position:absolute;margin-left:-10px;margin-top:40px">
          <v-chip outline selected><v-icon color="white">music_note</v-icon></v-chip>
          <v-chip outline><v-icon color="white">list</v-icon></v-chip>
        </div> -->
          </v-flex>
        </v-flex>
      </v-flex>
      <!-- Description -->
      <v-flex xs12 offset-xs0 class='text-xs-left pl-3 pr-3' v-if="info.description">
        <p>{{ info.description }}</p>
      </v-flex>
    </v-layout>
  </v-container>
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
        this.info.img = response.data.items[0].snippet.thumbnails.default.url
        this.info.title = response.data.items[0].snippet.title
      } else if (this.source.toLowerCase().indexOf('soundcloud') > -1) {
        this.info.created = ''
        this.info.description = ''
        this.info.img = response.data.avatar_url
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
        console.log(this.response)
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
