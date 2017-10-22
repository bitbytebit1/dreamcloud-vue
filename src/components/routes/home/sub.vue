<template>
  <v-flex xs12 class="mt-3">
    <v-flex xs12>
      <v-layout row wrap>
        <v-flex xs12 lg2  >
          <v-avatar size='45px' slot='activator'>
            <img :src='img'/>
          </v-avatar>
        </v-flex>
        <v-flex lg2>
          <h5 class="text-xs-center mt-2">{{ name }}</h5>
        </v-flex>
      </v-layout>
      <playlist :view-type="{full: false, list: false}" :songs="aSongs"></playlist>  
    </v-flex>
  </v-flex>
</template>
<script>
/* eslint-disable */
import {DCAPIClass} from '@/DCAPIs/DCAPI.js'
// (sQuery, iPage, aSource, sArtist, hCallback, bRelated, iLimit = 48)
// var dcapi = 
export default {
  props: ['id', 'name', 'source', 'img'],
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
