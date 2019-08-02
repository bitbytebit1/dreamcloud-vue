<template>
  <div/>
</template>
<script>
/* eslint-disable */

export default {
  name: 'Share',
  methods: {
    getYouTubeId (link) {
      function youtube_parser(url){
          var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
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
      this.getYouTubeId(url).then((trackID) => {
        this.$router.push({name: 'auto', params: { artist: 'share',  trackID: trackID,  source: 'YouTube' }})
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
