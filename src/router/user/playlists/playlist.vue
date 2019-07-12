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
      rows-per-page='40' 
      @conmen="$emit('conmen', $event)"
    />
  </v-flex>
</template>
<script>

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
  // created () {
  //   this.bind(this.$route.params.user, this.$route.params.playlist)
  // },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.bind(to.params.user, to.params.playlist)
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.bind(to.params.user, to.params.playlist)
    next();
  },
  data () {
    return {
      aSongs: [],
      oldPlaylist:' '
    }
  },
  methods: {
    bind (user, playlist) {
      if (this.oldPlaylist == playlist) {
        return
      }
      this.oldPlaylist = playlist
      this.$bindAsArray('aSongs', this.$DCFB.playlistGet(user, playlist), null)
    }
  }
}
</script>
