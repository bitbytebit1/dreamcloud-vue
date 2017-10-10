<template>
 <tr style="bgcolor:#eee">
  <td v-on:click="play">
    <div class="song-title" style="text-align:left; margin-left:30px; margin-top:10px;">
      <p v-bind:class="{ active: isPlaying }">{{song.title}}</p>
    </div>
  </td>
  <td v-on:click="play">
    <img v-lazy="song.posterLarge" class="poster img-responsive" alt="" style="width: 30px; height: 30px;">
  </td>
  <td>
    <a class="artist" :href="artistID">{{song.artist}}</a>
  </td>
  <td>
    <span class="song-date">{{date}}</span>
  </td>
  <td>
    <span class="song-duration">{{song.duration}}</span>
  </td>
 </tr>
</template>

<script>

export default {
  name: 'playlistItemList',
  props: ['song', 'index'],
  data () {
    return {
      msg: 'Welcome to the real PlaylistItemList'
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
    },
    isPlaying: function () {
      return this.$route.path === this.$store.getters.hash && this.index === this.$store.getters.index
    }
  },
  methods: {
    play: function () {
      this.$parent.play(this.index)
    },
    share: function () {
      if (this.$UTILS.isMobile) {
        this.$parent.setIframeSrc('')
        this.$parent.setIframeSrc('whatsapp://send?text=' + encodeURI('http://dc42.netlify.com/#/t/' + this.song.source + '/' + this.song.title + '/' + this.song.title + '/' + this.song.trackID))
      } else {
        this.$UTILS.copyToClipboard('dc42.netlify.com/#/t/' + this.song.source + '/' + encodeURIComponent(this.song.artist) + '/' + encodeURIComponent(this.song.title) + '/' + this.song.trackID)
      }
    }
  }
}
</script>

<style>
.active{
  color: Tomato;
}
</style>
