<template>
  <div class="artist-info">
      <div class="row">
        <div class="pull-left">

          <img :src="info.img"/>
          <h2>{{ artist }}</h2>
          <h4 v-if="info.last_modified">{{ info.created }}</h4>
          <h4 v-if="info.last_modified">{{ info.last_modified }}</h4>
          <h4 v-if="info.followers_count">{{ info.followers_count }}</h4>
          <h4 v-if="info.track_count">{{ info.track_count }}</h4>

      </div>
      <div v-if="info.description">
        <p>
          <h4>{{ info.description }}</h4>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'artist-info',
  props: ['artistID', 'source', 'artist'],
  data () {
    return {
      msg: 'Welcome to the real Trinity',
      info: {
        description: '',
        img: '',
        title: '',
        last_modified: ''
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
        self.info.img = response.data.avatar_url
        self.info.title = response.data.username
        self.info.description = ''
        self.info.created = ''
        self.info.last_modified = response.data.last_modified
        self.info.followers_count = response.data.followers_count
        self.info.track_count = response.data.track_count
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
p{
  display: inline-block;
}
</style>
