<template>
	<!-- <v-container grid-list-md text-xs-center :class="$vuetify.breakpoint.name === 'xs'? 'ma-0 pa-0 pt-1' : ''"> -->
	<v-layout row wrap style="min-height:145px">

		<!-- LEFT COLUMN -->
		<v-flex xs12 lg2 >
			<!-- AVATAR -->
			<v-flex xl12>
				<v-avatar size='100px' slot='activator'>
					<img :src='info.img' class='img-fluid' style='display:inline-block;'/>
				</v-avatar>
			</v-flex>
			<!-- SUBSCRIBE BUTTON -->
			<v-flex xl12 class="mt-2">
				<subscribe-button v-if="$store.getters.auth_state" :artistID="artistID" :source="source" :artist="artist" :img="info.img"></subscribe-button>
			</v-flex>
		</v-flex>

		<!-- RIGHT COLUMN -->
		<v-flex xs12 lg10>
			<v-layout row wrap align-content-start>
				<!-- ARTIST NAME -->
				<v-flex xs12 :class="$vuetify.breakpoint.name === 'xs'? 'headline' : 'headline text-xs-left'">
					<strong>{{ artist }}</strong>
				</v-flex>
				<!-- META -->
				<v-flex xs12 lg2 :class="$vuetify.breakpoint.name === 'xs'? 'headline' : 'headline text-xs-left'">
					<v-flex xs12 class="text-xs-left" style="left:-9px;position:relative;height:31px;" v-for="item in items" v-if="item.data" :key="item.name">
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
					</v-flex>
				</v-flex>
				<!-- DESCRIPTION -->
				<v-flex xs12 lg10 class='text-xs-left preline wordbreak ma-0 pa-0 px-2' v-if="info.description">
					{{ info.description }}
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
        { icon: 'update', name: 'Last updated', data: this.info.last_modified ? this.$DCAPI.calcDate(new Date(), this.info.last_modified) : '' },
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
    })
  }
}
</script>

<style>

</style>
