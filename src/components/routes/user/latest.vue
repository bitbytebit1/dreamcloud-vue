<template>
  <v-flex xs12>
    <loading :show="loading" spinner="waveDots"></loading>
    <playlist :view-type="{full: true, list: false}" :songs="aSongsSortedByDate"></playlist>  
  </v-flex>
</template>
<script>
/* eslint-disable */
import axios from 'axios'
import {DCAPIClass} from '@/DCAPIs/DCAPI.js'
import { DCFB } from '@/DCAPIs/DCFB.js'
import playlist from '@/components/playlist/playlist'
import subscriptionAll from '@/components/routes/home/sub2'
import loading from '@/components/misc/loading'
export default {
  name: 'home', 
  components: {
    'playlist': playlist,
    'loading': loading
  },  
  data: function () {
    return {
      aSongs: [],
      loading: true
    }
  },
  computed: {
    aSongsSortedByDate: function () {
      console.log('11')
      return this.aSongs.sort(this.$DCAPI.sortDate)
    }
  },  
  created: function () {
    var results = [], idx = 0;
    for(var sub in this.subscriptions){
      results.push(this.$DCAPI.searchInt(0 , 0, [this.subscriptions[sub].source], this.subscriptions[sub].id, 
      (songs) =>{
        this.aSongs = this.aSongs.concat(songs)
      }, false, 8).then(() =>{
        // console.log('done')
        this.loading = false
      }))
    }
    axios.all(results).then(() => {
      console.log('all done')
      // this.aSongs.sort(this.$DCAPI.sortDate)
    })
    
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
