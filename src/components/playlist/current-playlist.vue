<template>
    <v-container grid-list-sm>
        <v-layout xs12 row wrap>
            <v-flex xs12 flexbox @click="play" 
            v-for="(song, index) in $store.getters.current_Playlist"
            v-bind:song="song"
            v-bind:index="index"
            v-bind:key="index">
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

        </v-layout>
    </v-container>
</template>

<script>
export default {
  name: 'current-playlist',
  data () {
    return {
      msg: 'Welcome to the real Trinity'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
