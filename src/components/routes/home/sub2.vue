<template>
  <v-flex xs12>
    <playlist-item-list
      v-bind:songs="aSongs"
    >
    </playlist-item-list>
  </v-flex>
</template>
<script>
/* eslint-disable */
import {DCAPIClass} from '@/DCAPIs/DCAPI.js'
// (sQuery, iPage, aSource, sArtist, hCallback, bRelated, iLimit = 48)
// var dcapi = 
import { DCFB } from '@/DCAPIs/DCFB.js'
import playlistItemList from '@/components/playlist/playlist-item-list.vue'
export default {
  name: 'home', 
  components: {
    'playlist-item-list': playlistItemList
  },  
  data: function () {
    return {
      aSongs: []
      // dcAPI: new DCAPIClass()
    }
  },
  created: function () {
    // let wasd = this
    // console.log(this.subscriptions)
    var results = [], idx = 0;
    for(var sub in this.subscriptions){
      // console.log(this.subscriptions[sub])
      // idx = apis.push(new DCAPIClass()) - 1
      // console.log('Searching', this.subscriptions[sub].source, 'for', this.subscriptions[sub].name)
      this.$DCAPI.searchInt(0 , 0, [this.subscriptions[sub].source], this.subscriptions[sub].id, 
      (songs) =>{
        
        this.aSongs = this.aSongs.concat(songs)
      }, false, 10)
    }
    console.log(this.aSongs)
    
  },
  firebase: function () {
    return {
      subscriptions: DCFB.subscriptions
    }
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
