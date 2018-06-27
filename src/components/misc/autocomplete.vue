<template>
	<v-select
		class="vselect pt-4"
		label="Dream"
		autocomplete
		:loading="loading"
		:items="items"
		:search-input.sync="search"
		v-model="select"
		v-on:keyup.enter='onEnter'
		append-icon
		single-line
	>
		<template slot="item" slot-scope="data">
			<v-list-tile-content @click="_emit(data.item)" v-text="data.item"></v-list-tile-content>
		</template>
	</v-select>
</template>
<script>
export default {
  props: ['sQuery'],
  data () {
    return {
      loading: false,
      items: [],
      search: null,
      select: []
    }
  },
  watch: {
    search (val) {
      val && this.querySelections(val)
    }
  },
  methods: {
    _emit (v) {
      // Updated vSelect
      this.$emit('update:sQuery', v)
      // Run search
      this.$emit('search', value)
    },
    onEnter () {
      this._emit(this.select)
    },
    querySelections (v) {
      if (!this.$UTILS.isMobile) {
        this._emit(v)
      }
      this.$emit('update:sQuery', v)
      // this.debounce(() =>{
      this.loading = true
      this.$jsonp(`https://suggestqueries.google.com/complete/search?callback=?&hl=en&ds=yt&jsonp=suggestCallBack&client=youtube&q=${v}`, {callbackName: 'suggestCallBack'})
        .then(json => {
          this.items = json[1].map(v => v[0])
          this.items.unshift(v)
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      // }, 250)
    }
  }
}
</script>
<style>
.list__tile__mask {
  color : inherit !important;
  background : 0 !important;
}
@media only screen and (min-width: 600px){
  .vselect{
    width: 380px!important;
  }
}
@media only screen and (max-width: 599px){
  .vselect{
    width: 175px!important;
  }
}

</style>
