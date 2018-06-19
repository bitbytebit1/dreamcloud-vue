<template>
  <v-autocomplete
    :loading="loading"
    :items="items"
    :search-input.sync="search"
    v-model="select"
    v-on:keyup.enter='enter'
    color="primary"
    label="Dream"
    style="width:200px"
    append-icon=""
    single-line
    hide-no-data
    combobox
  >
    <template slot="item" slot-scope="data">
      <v-list-tile-content @click="clicked(data.item)" v-text="data.item"></v-list-tile-content>
    </template>
  </v-autocomplete>
</template>
<script>
export default {
  props: ['sQuery'],
  data () {
    return {
      loading: false,
      items: [],
      search: null,
      select: ''
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
/* @media only screen and (min-width: 600px){
  .vselect{
    width: 380px!important;
  }
}
@media only screen and (max-width: 599px){
  .vselect{
    width: 175px!important;
  }
} */

</style>
