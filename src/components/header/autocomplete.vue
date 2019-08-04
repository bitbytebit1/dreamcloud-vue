<template>
  <v-autocomplete
    ref="auto"
    :loading="loading"
    :items="items"
    :search-input.sync="search"
    v-model="select"
    append-icon=""
    color="primary"
    clearable
    hide-no-data
    hide-details
    flat
    solo
    onfocus="this.placeholder = ''"
    onblur="(this.placeholder = 'Search')"
    placeholder="Search"
    @blur="(select = search, $refs.auto.$children[0].isContentActive = false)"
    @keyup.enter='enter'
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
      justClicked: false,
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
      this.$refs.auto.$children[0].isContentActive = false
      this.justClicked = true
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
      // this line bc querySelection fires on click for some reason?
      if (this.justClicked) {
        this.justClicked = false
        return 
      }
      // reactivate dropdown on search change
      if (this.$refs.auto.$children[0].isContentActive == false) {
        this.$refs.auto.$children[0].isContentActive = true
      }
      this.loading = true
      this.items = [v]
      this.$jsonp(`https://suggestqueries.google.com/complete/search?callback=?&hl=en&ds=yt&jsonp=suggestCallBack&client=youtube&q=${v}`, {callbackName: 'suggestCallBack'})
        .then(json => {
          this.items = this.items.concat(json[1].map(v => v[0]))
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style>
.theme--dark ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: whitesmoke !important;
}
</style>
