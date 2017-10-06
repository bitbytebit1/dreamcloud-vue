<template>
  <div>
  <div class="song-container col-lg-3 col-sm-4 col-xs-12">
    <div v-on:click="play">
      <img v-lazy="song.poster" class="poster img-responsive" alt="">
    </div>

    <div class="col-xs-12 caption caption-text">
      <div class="song-title" style="">{{song.title}}</div>
      <span class="song-duration">{{song.duration}}</span>
      <span class="song-date">{{date}}</span>
      <div>
          <a class="artist" :href="artistID">{{song.artist}}</a>
          <span id="unfollow-button" style="margin-left:10px" class="">
            <i class="glyphicon glyphicon-remove"></i></span>
          <span id="save-song"><i class="glyphicon glyphicon-star-empty"></i></span>
      </div>
      <div class="btn-group">
        <button type="button" v-on:click="share" class="btn btn-primary">Share</button>
      </div>
    </div>
  </div>
  <div v-if="index >= 2 && (index + 1) % 3 == 0" class=" clearfix visible-md-block"></div>
  <div v-if="index >= 3 && (index + 1) % 4 == 0" class="clearfix visible-lg-block"></div>
  </div>
</template>
<script>
export default {
  name: 'playlistItem',
  props: ['song', 'index'],
  data () {
    return {
      msg: 'Welcome to the real PlaylistItem'
    }
  },
  computed: {
    artistID: function () {
      return '#/a/' + this.song.source + '/' + this.song.artist + '/' + this.song.artistID
    },
    img: function () {
      return this.song.posterLarge
    },
    date: function () {
      return this.$DCAPI.calcDate(new Date(), this.song.created)
    }
  },
  methods: {
    play: function () {
      this.$parent.play(this.index)
    },
    share: function () {
      console.log('dc42.netlify.com/#/a/' + this.song.source + '/' + this.song.artist + '/' + this.song.artistID + '/' + this.song.trackID)
      this.$parent.setIframeSrc('whatsapp://send?text=http://dream.tribe.nu/r3/?url=' + encodeURIComponent(this.song.mp32))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
