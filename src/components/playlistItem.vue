<template>
  <div>
  <div class="song-container col-lg-3 col-sm-4 col-xs-12">
    <div style="position:absolute" :id="song.trackID" class="btn-group dc-controls">
    <button style="margin-top:1px" type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <i class="glyphicon glyphicon-cog"></i>
    </button>
    <ul class="dropdown-menu">
        <li><a type="a" id="add">
            <i class="glyphicon glyphicon-plus"></i>
        </a></li>
        <li><a type="a" href="" id="play">
            <i class="glyphicon glyphicon-play"></i>
        </a></li>
        <li><a type="a" id="dl" class=" dl">
          <i class="glyphicon glyphicon-download-alt"></i>
        </a></li>
        <li><a type="a" id="watch">
          <i class="glyphicon glyphicon-eye-open"></i></a>
        </li>
        <li><a :href="song.mp32" id="source" target="_blank" class="">
          <img target="_blank" :href="song.mp32" id="favicon" :src="song.source">
        </a></li>
      </ul>
    </div>

    <div v-on:click="play(index)">
      <img v-lazy="song.poster" class="poster img-responsive" alt="">
    </div>

    <div class="col-xs-12 caption caption-text">
      <div class="song-title" style="">{{song.title}}</div>
      <span class="song-duration">{{song.duration}}</span>
      <span class="song-date">{{song.created}}</span>
      <div>
          <a class="artist" :href="artistID">{{song.artist}}</a>
          <span id="unfollow-button" style="margin-left:10px" class="">
            <i class="glyphicon glyphicon-remove"></i></span>
          <span id="save-song"><i class="glyphicon glyphicon-star-empty"></i></span>
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
      return '#/a/' + this.song.source + '/' + this.song.artistID
    },
    img: function () {
      return this.song.posterLarge
    }
  },
  methods: {
    play: function (index) {
      this.$parent.play(index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
