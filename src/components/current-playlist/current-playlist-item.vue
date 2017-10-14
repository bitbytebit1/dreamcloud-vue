<template>
  <v-flex xs12 flexbox @click.stop="play" :id="[`${index}`]">
      <v-card>
          <v-card-media
          v-lazy:background-image="song.posterLarge"
          height="220px"
          >
          <v-container grid-list-xs fill-height fluid>
              <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                  <span class="headline white--text" v-text="song.title"></span>
                  <div class="artist white--text" v-text="song.artist"></div>
              </v-flex>
              </v-layout>
          </v-container>
          </v-card-media>
      </v-card>
  </v-flex>
</template>
<script>

export default {
  props: ['song', 'index'],
  name: 'current-playlist-item',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    play: function () {
      this.$parent.play(this.index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
