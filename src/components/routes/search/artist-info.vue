<template>
  <div class="artist-info">
      <div class="row">
        <div class="pull-left">
          <img :src="info.img"/>
          <h2>{{ info.title }}</h2>
          <h4>{{ info.created }}</h4>
      </div>
      <h4>{{ info.description }}</h4>
    </div>
  </div>
</template>
<script>
export default {
  name: 'artist-info',
  props: ['artistID', 'source'],
  data () {
    return {
      msg: 'Welcome to the real Trinity',
      info: {
        img: '',
        title: ''
      }
    }
  },
  mounted: function () {
    // console.log('1', this.artistID)
    var self = this
    this.$DCAPI.getArtistInfo(this.artistID, self.source)
    .then(function (response) {
      if (self.source.toLowerCase().indexOf('youtube') > -1) {
        self.info.img = response.data.items[0].snippet.thumbnails.default.url
        self.info.title = response.data.items[0].snippet.title
        self.info.description = response.data.items[0].snippet.description
        self.info.created = response.data.items[0].snippet.publishedAt
      } else if (self.source.toLowerCase().indexOf('soundcloud') > -1) {
        console.log(response)
      }
    })
  }
}
</script>

<style>
.artist-info img{
  margin-left: 30px;
  display: inline-block;
}
.artist-info h2,h4{
  margin-left: 20px;
  display: inline-block;
}
</style>
