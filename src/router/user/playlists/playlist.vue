<template>
  <v-flex 
    xs12 
    lg10 
    flexbox
  >
    <div class="headline fwl text-xs-left pl-2 pt-2">{{ name }}</div>
    <playlist 
      :show-uploaded="true" 
      :songs="aSongs" 
      rows-per-page='250'
    />
  </v-flex>
</template>
<script>
import loading from '@/components/misc/loading'

export default {
  name: 'UserPlaylist',
  // props: ['user', 'playlist', 'name'],
  props: {
    user: {
      type: String,
      default: ''
    },
    playlist: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  watch: {
    '$route.params': {
      immediate: true,
      handler: 'bind'
    }
  },
  components: {
    'loading': loading
  },
  data () {
    return {
      aSongs: []
    }
  },
  methods: {
    bind () {
      this.$store.dispatch('loadIndeterm', true)
      this.$bindAsArray('aSongs', this.$DCFB.playlistGet(this.$route.params.user, this.$route.params.playlist), null, () => {
        this.$store.dispatch('loadIndeterm', false)
      })
    }
  }
}
</script>
