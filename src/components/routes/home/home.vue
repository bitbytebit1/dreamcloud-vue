<template>
  <v-flex xs12>
    <loading :show="loading" spinner="waveDots"></loading>
    <playlist rowsPerPage="50" :view-type="{full: true, list: true}" :songs="aSongs"></playlist>  
  </v-flex>
</template>
<script>
/* eslint-disable */
import axios from 'axios'
import {DCAPIClass} from '@/DCAPIs/DCAPI.js'
import playlist from '@/components/playlist/playlist'
import loading from '@/components/misc/loading'
export default {
  name: 'home', 
  components: {
    'playlist': playlist,
    'loading': loading
  },  
  data () {
    return {
      aSongs: [],
      loading: true
    }
  },
  computed: {
    // aSongsSortedByDate () {
      // return this.aSongs.sort(this.$DCAPI.sortDate)
    // }
  },  
  created () {
    var results = [], idx = 0;
    for(var sub in this.subscriptions){
      results.push(this.$DCAPI.searchInt(0 , 0, [this.subscriptions[sub].source], this.subscriptions[sub].id, 
      (songs) =>{
        this.aSongs = this.aSongs.concat(songs)
      }, false, 15).then(() =>{
        // console.log('done')
        this.loading = false
      }))
    }
    axios.all(results).then(() => {
      // console.log('all done')
      // this.aSongs.sort(this.$DCAPI.sortDate)
    })
    
  },
  firebase () {
    return {
      subscriptions: this.$DCFB.subscriptions
    }
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
