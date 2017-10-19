<template>
    <v-btn @click="subscribe">Subscribe</v-btn>
</template>
<script>
/* eslint-disable */
import { DCFB } from '@/DCAPIs/DCFB.js'
export default {
  name: 'subscribe-button',
  props: ['source', 'artist', 'artistID', 'img'],  
  methods: {
    subscribe: function () {
      DCFB.addSubscription(this.artist, this.source, this.artistID, this.img)
    }
  }
}
</script>

<style>
</style>
