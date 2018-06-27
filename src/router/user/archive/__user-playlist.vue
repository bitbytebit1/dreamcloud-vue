<template>
	<div>
		<h1>/u/{{user}}/{{playlist}}</h1>
		<playlist :songs="aSongs"></playlist>
	</div>
</template>
<script>
export default {
  name: 'userPlaylist',
  props: ['user', 'playlist'],
  data () {
    return {
      aSongs: []
    }
  },
  created () {
    this.search(this.user, this.playlist)
  },
  watch: {
    '$route.params.user': '_search',
    '$route.params.playlist': '_search'
  },
  methods: {
    _search () {
      console.log('searching')
      this.search(this.$route.params.user, this.$route.params.playlist)
    },
    search (sUser, sPlaylist) {
      sUser = sUser || this.user
      sPlaylist = sPlaylist || this.playlist
      this.error = this.post = null
      this.loading = true
      this.searchResults = []
      this.$DCUser.getUserPlaylist(sUser, sPlaylist, (d) => {
        this.loading = false
        d = d.data
        for (var i in d) {
          this.aSongs.push(d[i])
        }
      }, '')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
