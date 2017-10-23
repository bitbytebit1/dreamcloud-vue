<template>
  <v-flex xs12>
    <playlist :view-type="{full: true, list: false}" :songs="aSongs"></playlist>  
  </v-flex>
</template>
<script>
/* eslint-disable */
import {DCAPIClass} from '@/DCAPIs/DCAPI.js'
import { DCFB } from '@/DCAPIs/DCFB.js'
import playlist from '@/components/playlist/playlist'
export default {
  name: 'home', 
  components: {
    'playlist': playlist
  },  
  data: function () {
    return {
      aSongs: []
    }
  },
  created: function () {
    var results = [], idx = 0;
    for(var sub in this.subscriptions){
      this.$DCAPI.searchInt(0 , 0, [this.subscriptions[sub].source], this.subscriptions[sub].id, 
      (songs) =>{
        this.aSongs = this.aSongs.concat(songs)
      }, false, 8)
    }
    
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
