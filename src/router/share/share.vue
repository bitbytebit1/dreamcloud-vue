<template>
  <div/>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Share',
  methods: {
    getYTID (link) {
      // http://localhost:8080/?text=https%3A%2F%2Fyoutu.be%2FNMswKw7nsws#/share
      function youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^\#\&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
      }
      return new Promise((resolve) => {
        resolve(youtube_parser(link))
      })
    },
  },
  mounted () {
    var urlParams = new URLSearchParams(window.location.search);
    let url = decodeURIComponent(urlParams.get('text'))
    if (url.indexOf('youtu.be') > -1) {
      this.getYTID(url).then(trackID => {
        // this.$store.commit('ytUseVideo', true) // would be awesome, only if youtube autoplayed on mobile
        this.$router.push({name: 'auto', params: { artist: 'N/A',  trackID: trackID,  source: 'YouTube' }})
      })
    } 
    else if (url.indexOf('soundcloud.com') > -1) {
      url = url.split('\n')[1]
      this.$DCAPI.getSCID(url).then(d => {
        this.$router.push({name: 'auto', params: { artist: d[1].user.username,  trackID: d[0],  source: 'SoundCloud' }})
      })
    }
    // else if (url.indexOf('bandcamp') > -1) {
    // } else if (url.indexOf('mixcloud') > -1) {
    // } else if (url.indexOf('vimeo') > -1) {
    // }
    // this.$
  }
}
</script>

<style>
</style>
