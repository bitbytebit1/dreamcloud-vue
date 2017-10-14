<template>
  <div class="row">
    <img :src="info.img" class="img-fluid" style="display:inline-block; margin:20px;"/>
    <div style="display:inline-block;width:40%">
      <span class="lead text-left" style="text-decoration: underline;">{{ artist }}</span>
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
    this.$DCAPI.getArtistInfo(this.artistID, this.source)
    .then((response) => {
      if (this.source.toLowerCase().indexOf('youtube') > -1) {
        this.info.img = response.data.items[0].snippet.thumbnails.default.url
        this.info.title = response.data.items[0].snippet.title
        this.info.description = response.data.items[0].snippet.description
        this.info.created = response.data.items[0].snippet.publishedAt
      } else if (this.source.toLowerCase().indexOf('soundcloud') > -1) {
        this.info.img = response.data.avatar_url
        this.info.title = response.data.username
        this.info.description = ''
        this.info.created = ''
        this.info.last_modified = response.data.last_modified
        this.info.followers_count = response.data.followers_count
        this.info.track_count = response.data.track_count
      }
    })
  }
}
</script>

<style>
</style>
