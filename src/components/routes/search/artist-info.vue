<template>
  <div class="artist-info">
    <img :src="info.img" class="media-object dp img-circle" style="display:inline-block"/>
    <div style="display:inline-block">
      <span class="lead text-left">{{ artist }}</span>
      <br />
      <span class="lead" v-if="info.last_modified">{{ info.created }}</span>
      <span class="lead" v-if="info.last_modified">{{ info.last_modified }}</span>
      <span class="lead" v-if="info.followers_count">{{ info.followers_count }}</span>
      <span class="lead" v-if="info.track_count">{{ info.track_count }}</span>
      <span class="lead" v-if="info.description" style="align: left;">{{ info.description }}</span>
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
}
.artist-info h2,h4{
  margin-left: 20px;
  display: inline-block;
}
p{
  display: inline-block;
}
.media{
  box-shadow:0px 0px 4px -2px #000;
  margin:10px 0;
  padding:20px;
}
.dp{
 border:4px solid #eee;
 transition: all 0.2s ease-in-out;
}
.dp:hover{
 border:0px solid #eee;
  /*transform:rotate(360deg);
  -ms-transform:rotate(360deg);
  -webkit-transform:rotate(360deg);
  -webkit-font-smoothing:antialiased;*/
}
</style>
