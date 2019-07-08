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
  created () {
    this.bind(this.$route.params);
  },
  beforeRouteUpdate (to, from, next) {
    this.bind(to.params);
    next();
  },
  data () {
    return {
      aSongs: []
    }
  },
  methods: {
    bind (params) {
      this.$bindAsArray('aSongs', this.$DCFB.playlistGet(params.user, params.playlist), null)
    }
  }
}
</script>
