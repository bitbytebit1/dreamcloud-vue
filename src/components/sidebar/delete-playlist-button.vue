<template>
    <v-tooltip color="red darken-1" :content-class="toolTipClass" v-model="show" top>
      <v-btn icon slot="activator" @click.prevent="deletePlaylist">
        <v-icon color="grey lighten-1">delete</v-icon>
      </v-btn>
      <span>Click again to delete</span>
    </v-tooltip>
</template>
<script>
/* eslint-disable */
import { DCFB } from '@/DCAPIs/DCFB.js'

export default {
  name: 'delete-playlist-button',
  props: ['playlistId'],
  watch: {
    'show': 'resetCounter'
  },
  data() {
    return {
      show: false,
      clicks: 0
    }
  },
  computed: {
    toolTipClass: function () {
      return this.clicks > 0 ? '' : 'hidden'
    },
  },
  methods: {
    resetCounter: function () {
      if(!this.show){
        this.clicks = 0
      }
    },
    deletePlaylist: function () {
      this.clicks++ 
      if(this.clicks == 2){
        DCFB.deletePlaylist(this.playlistId)
      }
    }
  }
}
</script>

<style>
.hidden{
   display: none
}
</style>
