<template>
  <v-btn 
    :color="btnColor"
    class="ma-0 mb-1"  
    round
    small
    outline
    content-class="ma-0" 
    @click.prevent="toggleSub"
  >{{ subbed ? 'Subscribed' : 'Subscribe' }}</v-btn>
</template>
<script>
export default {
  name: 'SubscribeButton',
  // props: ['source', 'artist', 'artistID', 'img'],
  props: {
    artistID: {
      type: [String, Number],
      default: ''
    },
    source: {
      type: String,
      default: ''
    },
    artist: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    }
  },
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
