<template>
  <div>
    <h1>/u/{{user}}</h1>
    <h2>{{aPlaylist}}</h2>
    <gridComp :data="aPlaylist" :columns="['Name']" filter-key="searchQuery"></gridComp>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
