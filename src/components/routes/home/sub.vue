<template>
  <v-flex xs12 class="mt-3">
    <v-flex xs12 lg12 >
      <v-layout row wrap>
        <v-flex xs12 lg1  >
          <v-avatar size='45px' slot='activator'>
            <img :src='img'/>
          </v-avatar>
        </v-flex>
        <v-flex lg11>
          <h5 class="text-xs-left mt-2">{{ name }}</h5>
        </v-flex>
        <v-flex xs12 v-if="loading">
          <infinite-loading spinner="waveDots"></infinite-loading>
        </v-flex>
      </v-layout>
      <playlist :view-type="{full: false, list: false}" :songs="aSongs"></playlist>  
    </v-flex>
  </v-flex>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading'
export default {
  props: ['id', 'name', 'source', 'img'],
  name: 'home',
  components: {
    'infinite-loading': InfiniteLoading
  },
  data: function () {
    return {
      aSongs: [],
      loading: false
    }
  },
  created: function () {
    this.loading = true
    this.$DCAPI.searchInt(0, 0, [this.source], this.id, (songs) => {
      this.aSongs = songs
      this.loading = !1
    }, false, 8)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
