<template>
    <v-btn @click="subscribe">Subscribe</v-btn>
</template>
<script>
/* eslint-disable */
import { DCFB } from '@/DCAPIs/DCFB.js'
export default {
  name: 'subscribe-button',
  methods: {
    subscribe: function () {
      DCFB.addSubscription(this.$parent.artist, this.$parent.source, this.$parent.artistID)
    }
  }
}
</script>

<style>
</style>
