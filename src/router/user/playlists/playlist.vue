<template>
  <v-flex xs12 lg10 flexbox :key="this.$route.params.playlist">
    <div class="headline fwl text-xs-left pl-2 pt-2">{{name}}</div>
    <!-- <loading v-if="!aSongs.length"></loading> -->
    <!-- show all items since it's a user playlist -->
    <playlist :showUploaded="true" :songs="aSongs" rowsPerPage='250'></playlist>
  </v-flex>
</template>
<script>
import loading from '@/components/misc/loading'

export default {
  name: 'userPlaylist',
  props: ['user', 'playlist', 'name'],
  watch: {
    '$route.params': 'bind'
  },
  components: {
    'loading': loading
  },
  created () {
    this.bind(this.user, this.playlist)
  },
  data () {
    return {
      aSongs: []
    }
  },
  methods: {
    bind (usr, plylist) {
      // this.$unbind('aSongs')
      this.$store.dispatch('loadIndeterm', true)
      this.$bindAsArray('aSongs', this.$DCFB.playlistGet(this.$route.params.user, this.$route.params.playlist), null, () => {
        this.$store.dispatch('loadIndeterm', false)
      })
    }
  }
  // firebase () {
  //   return {
  //     aSongs: this.$DCFB.playlistGet(this.$route.params.user, this.$route.params.playlist)
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
