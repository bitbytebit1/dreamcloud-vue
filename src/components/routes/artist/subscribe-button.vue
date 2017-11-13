<template>
    <v-btn v-if="subscribed.length" @click="unsubscribe" color="teal">Subscribed</v-btn>
    <v-btn v-else @click="subscribe">Subscribe</v-btn>
</template>
<script>
import {DCFB} from '@/DCAPIs/DCFB.js'
export default {
  name: 'subscribe-button',
  props: ['source', 'artist', 'artistID', 'img'],
  methods: {
    subscribe: function () {
      DCFB.subscriptionAdd(this.artist, this.source, this.artistID, this.img)
    },
    unsubscribe: function () {
      DCFB.subscriptionDelete(this.artistID)
    }
  },
  firebase: function () {
    return {
      subscribed: DCFB.subscriptions.child(this.artistID)
    }
  }
}
</script>

<style>
</style>
