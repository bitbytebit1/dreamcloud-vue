<template>
  <v-flex xs12 class="mt-3">
    <v-flex xs12 lg12 >
      <v-layout row wrap>
        <v-flex xs12 lg1>
          <v-avatar size='45px' slot='activator'>
            <img :src='img'/>
          </v-avatar>
        </v-flex>
        
        <v-flex lg11>
          <h5 class="text-xs-left mt-2">{{ name }}</h5>
        </v-flex>
        
      </v-layout>
      <loading :show="loading"></loading>
      <playlist :view-type="{full: false, list: false}" :songs="aSongs"></playlist>  
    </v-flex>
  </v-flex>
</template>
<script>
import loading from '@/components/misc/loading'
import playlist from '@/components/playlist/playlist'
export default {
  props: ['id', 'name', 'source', 'img'],
  name: 'home',
  components: {
    'loading': loading,
    'playlist': playlist
  },
  data () {
    return {
      aSongs: [],
      loading: true
    }
  },
  created () {
    this.$DCAPI.searchInt(0, 0, [this.source], this.id, (songs) => {
      this.aSongs = songs.slice(0, 4)
      this.loading = !1
    }, false, 4)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
