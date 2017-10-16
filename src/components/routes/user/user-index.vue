<template>
  <div class="container">
  <div class="row">
      <h1>/u/{{user}}</h1>
      <h2>{{aPlaylist}}</h2>
    </div>
  </div>
</template>
<script>
export default {
  name: 'userPlaylist',
  props: ['user'],
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
      this.searchResults = []
      this.$DCUser.getUserIndex(sUser, (d) => {
        this.loading = false
        d = d.data
        for (var i in d) {
          this.aPlaylist.push(d[i])
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
