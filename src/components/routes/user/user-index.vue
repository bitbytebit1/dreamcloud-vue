<template>
  <div class="container">
  <div class="row">
      <h1>/u/{{user}}</h1>
      <h2>{{aPlaylist}}</h2>
      <gridComp style="width:100%" class="text-center" :data="['aDrive', 'aTest', 'wasd', 'waasd']" :columns="['Name']"></gridComp>
    </div>
  </div>
</template>
<script>
import gridComp from '../../grid-comp.vue'
export default {
  name: 'userPlaylist',
  props: ['user'],
  components: {
    'gridComp': gridComp
  },
  data () {
    return {
      aPlaylist: [],
      searchQuery: ''
    }
  },
  created: function () {
    this.search(this.user)
  },
  watch: {
    '$route.params.user': '_search'
  },
  methods: {
    _search: function () {
      this.search(this.$route.params.user)
    },
    search: function (sUser) {
      sUser = sUser || this.user
      this.loading = true
      let self = this
      self.searchResults = []
      this.$DCUser.getUserIndex(sUser, function (d) {
        self.loading = false
        d = d.data
        for (var i in d) {
          self.aPlaylist.push(d[i])
        }
      }, '')
    }
  }
}
</script>
.gridComp{
  text-align: centre;
}
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
