<template>
  <v-flex 
    :key="this.$route.params.playlist" 
    xs12 
    lg10 
    flexbox
  >
    <div class="headline fwl text-xs-center pb-2">{{ title }}</div>

    <!-- show all items since it's a user playlist -->
    <playlist 
      :show-uploaded="true"
      :songs="aSongs" 
      rows-per-page='250' 
      @conmen="$emit('conmen', $event)"
    />
  </v-flex>
</template>
<script>
export default {
  name: 'ChannelPlaylist',
  // props: ['listID', 'artistID', 'title', 'source'],
  props: {
    listID: {
      type: String,
      default: ''
    },
    artistID: {
      type: [String, Number],
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    source: {
      type: String,
      default: ''
    }
  },
  watch: {
    'listID': {
      handler: 'getPlaylistItems',
      immediate: true
    }
  },
  data () {
    return {
      aSongs: []
    }
  },
  methods: {
    getPlaylistItems () {
      let f = (sToken) => {
        let sanity = this.listID
        this.$store.dispatch('loadIndeterm', true)
        this.$DCAPI.getChannelPlaylistItems(this.listID, this.source, 50, sToken, (resp) => {
          if (sanity === this.listID) {
            this.aSongs.push(...resp.data)
            this.$store.dispatch('loadIndeterm', false)
            // this.aSongs = this.aSongs.concat(resp.data)
            if (resp.nextPage) {
              f(resp.nextPage)
            }
          }
        })
      }
      // this.$store.dispatch('loadIndeterm', true)
      this.aSongs = []
      f('')
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
