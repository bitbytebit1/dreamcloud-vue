<template>
	<v-flex xs12 lg10 flexbox :key="this.$route.params.playlist">
		<h3 class="text-xs-left heading">{{title}}</h3>
		<!-- <loading v-if="!aSongs.length"></loading> -->
		<!-- show all items since it's a user playlist -->
		<playlist :showUploaded="true" :songs="aSongs" rowsPerPage='250'></playlist>
	</v-flex>
</template>
<script>
import loading from '@/components/misc/loading'

export default {
  name: 'channel-playlist',
  props: ['listID', 'artistID', 'title', 'source'],
  components: {
    'loading': loading
  },
  created () {
    this.getPlaylistItems()
    // this.bind(this.user, this.playlist)
  },
  data () {
    return {
      aSongs: []
    }
  },
  methods: {
    getPlaylistItems () {
      this.$DCAPI.getChannelPlaylistItems(this.listID, this.source, 50, (data) => {
        this.aSongs = data
      })
    }
  }
  // firebase () {
  //   return {
  //     aSongs: this.$DCFB.playlistGet(this.$route.params.user, this.$route.params.playlist)
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
