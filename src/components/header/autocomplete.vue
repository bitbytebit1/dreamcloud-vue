<template>
  <v-autocomplete
    ref="auto"
    :loading="loading"
    :items="items"
    :search-input.sync="search"
    v-model="select"
    class="autoSearch mx-3"
    color="primary"
    label="Search"
    append-icon=""
    single-line
    hide-no-data
    hide-details
    flat
    solo
    clearable
    @keyup.enter='enter'
  >
    <template 
      slot="item" 
      slot-scope="data">
      <v-list-tile-content 
        @click="clicked(data.item)" 
        v-text="data.item"/>
    </template>
  </v-autocomplete>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      items: [],
      search: null,
      select: null
    }
  },
  watch: {
    search (val) {
      val && this.querySelections(val)
    }
  },
  methods: {
    clicked (v) {
      this.emit(v)
    },
    enter () {
      // oh why why why
      this.$refs.auto.$children[0].isActive = false
      this.emit(this.search)
    },
    emit (v) {
      this.$emit('search', v)
    },
    querySelections (v) {
      this.loading = true
      this.$jsonp(`https://suggestqueries.google.com/complete/search?callback=?&hl=en&ds=yt&jsonp=suggestCallBack&client=youtube&q=${v}`, {callbackName: 'suggestCallBack'})
        .then(json => {
          this.items = json[1].map(v => v[0])
          this.items.unshift(v)
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style>
/* .list__tile__mask { */
  /* color : inherit !important; */
  /* background : 0 !important; */
/* } */
@media only screen and (min-width: 600px){
  .autoSearch{
    /* margin-top: 8px!important; */
  }
}
@media only screen and (max-width: 599px){
  .autoSearch{
    /* margin-top: 4px!important; */
  }
}

</style>
