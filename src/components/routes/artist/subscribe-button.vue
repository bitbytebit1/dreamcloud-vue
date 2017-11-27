<template>
    <v-btn v-if="subscribed.length" @click="unsubscribe" color="teal">Subscribed</v-btn>
    <v-btn v-else @click="subscribe">Subscribe</v-btn>
</template>
<script>
export default {
  name: 'subscribe-button',
  props: ['source', 'artist', 'artistID', 'img'],
  methods: {
    subscribe () {
      this.$DCFB.subscriptionAdd(this.artist, this.source, this.artistID, this.img)
    },
    unsubscribe () {
      this.$DCFB.subscriptionDelete(this.artistID)
    }
  },
  firebase () {
    return {
      subscribed: this.$DCFB.subscriptions.child(this.artistID)
    }
  }
}
</script>

<style>
</style>
