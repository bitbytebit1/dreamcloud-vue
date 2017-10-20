<template>
  <v-flex xs12>
    <v-flex xs10 offset-xs1>
      <h5 class="text-xs-left">{{ name }}</h5>
      <playlist :view-type="{full: false, list: true}" :songs="aSongs"></playlist>  
    </v-flex>
  </v-flex>
</template>
<script>
/* eslint-disable */
import {DCAPIClass} from '@/DCAPIs/DCAPI.js'
// (sQuery, iPage, aSource, sArtist, hCallback, bRelated, iLimit = 48)
// var dcapi = 
export default {
  props: ['id', 'name', 'source'],
  name: 'home',
  data: function () {
    return {
      aSongs: [],
      dcAPI: new DCAPIClass()
    }
  },
  created: function () {
    let wasd = this
    this.dcAPI.searchInt(0, 0, [this.source], this.id, function(songs){wasd.aSongs = songs}, false, 4)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
