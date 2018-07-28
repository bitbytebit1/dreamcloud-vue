<template>
  <v-btn small @click.prevent="toggleSub" class="ma-0 pa-0" :color="btnColor">{{subbed ? 'Subscribed' : 'Subscribe' }}</v-btn>
</template>
<script>
export default {
  name: 'subscribe-button',
  props: ['source', 'artist', 'artistID', 'img'],
  watch: {
    'artistID': {
      immediate: true,
      handler: 'bind'
    }
  },
  data () {
    return {
      subscribed: []
    }
  },
  computed: {
    subbed () {
      return this.subscribed.length
    },
    btnColor () {
      return this.subbed ? '' : 'primary white--text'
    }
  },
  methods: {
    toggleSub () {
      if (this.subscribed.length) {
        this.unsubscribe()
      } else {
        this.subscribe()
      }
    },
    bind () {
      if (this.artistID && this.$store.getters.auth_state) {
        this.$bindAsArray('subscribed', this.$DCFB.subscriptions.child(this.artistID))
      }
    },
    subscribe () {
      this.$DCFB.subscriptionAdd(this.artist, this.source, this.artistID, this.img)
    },
    unsubscribe () {
      this.$DCFB.subscriptionDelete(this.artistID)
    }
  }
}
</script>

<style>
</style>
