<template>
  <v-autocomplete
    ref="auto"
    :loading="loading"
    :items="items"
    :search-input.sync="search"
    v-model="select"
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
    @blur="select = search"
  >
    <template 
      slot="item" 
      slot-scope="data"
    >
      <v-list-tile-content 
        @click="clicked(data.item)" 
        v-text="data.item"
      />
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
      // closes auto complete menu
      this.$refs.auto.$children[0].isContentActive = false
      this.emit(this.search)
    },
    emit (v) {
      this.$emit('search', v)
    },
    querySelections (v) {
      if (this.$refs.auto.$children[0].isContentActive == false) {
        // console.log('resetting isContentActive due to input change')
        this.$refs.auto.$children[0].isContentActive = true
      }
      this.loading = true
      this.items = [v]
      this.$jsonp(`https://suggestqueries.google.com/complete/search?callback=?&hl=en&ds=yt&jsonp=suggestCallBack&client=youtube&q=${v}`, {callbackName: 'suggestCallBack'})
        .then(json => {
          this.items = this.items.concat(json[1].map(v => v[0]))
          // this.items.unshift(v)
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style>
</style>
