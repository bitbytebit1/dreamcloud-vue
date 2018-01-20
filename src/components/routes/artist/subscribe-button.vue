<template>
    <v-btn small v-if="subscribed.length" @click="unsubscribe"  class="ma-0 pa-0" color="teal white--text">Subscribed</v-btn>
    <v-btn v-else small @click="subscribe"  class="ma-0 pa-0">Subscribe</v-btn>
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
