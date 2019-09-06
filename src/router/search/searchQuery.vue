<template>
  <v-flex 
    xs12 
    lg10 
    flexbox
    mt-3
  >
    <!-- <loading v-if="loading"></loading> --> 
    <playlist 
      v-if="!loading && !bFailed"
      :show-uploaded="!0" 
      :songs="searchResults" 
      rows-per-page='-1' 
      @conmen="$emit('conmen', $event)"
    /> 
    <infinite-loading 
      v-if="!loading" 
      ref="infiniteLoading" 
      :distance="800" 
      spinner="waveDots" 
      @infinite="infiniteHandler"
    >
      <span slot="no-more"/>
      <span slot="no-results"/>
    </infinite-loading>
    <jumbo 
      v-if="bFailed || !$route.params.source" 
      :subheading="`Couldn't find '${$route.params.query}' on ${$route.params.source}`" 
      error="Try again"
    />
  </v-flex>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import loading from '@/components/misc/loading'
import jumbo from '@/components/misc/jumbo'

export default {
  name: 'SearchQuery',
  // props: ['query', 'source'],
  props: {
    query: {
      type: String,
      default: ''
    },
    source: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: true,
      searchResults: [],
      iPage: 0,
      oldQ: '',
      bFailed: false,
      infState: ''
    }
  },
  components: {
    'infinite-loading': InfiniteLoading,
    'loading': loading,
    'jumbo': jumbo
  },
  beforeRouteUpdate (to, from, next) {
    this.searchInt(to.params.query, to.params.source)
    next();
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.searchInt(to.params.query, to.params.source)
    })
  },
  methods: {
    infiniteHandler ($state) {
      this.infState = $state
      this.search(this.query, this.source, ++this.iPage).then(function () {
        $state.loaded()
      })
    },
    searchInt (query, source) {
      if (this.oldQ != query + source) {
        this.bFailed = false
        this.search(query, source, 0)
      }
    },
    search (query, source, iPage) {
      
      this.searchResults = !iPage ? [] : this.searchResults
      this.oldQ = query + source
      return this.$DCAPI.searchInt(query, iPage, source.split('-'), '', (d) => {
        // If no results stop infinite loading
        if (!d.length && !this.searchResults.length) {
          this.infState.complete()
          this.bFailed = true
        }else if (!d.length){
          this.infState.complete()
        } else {
          this.searchResults.push(...d)
          this.loading = false
        }
      }, '')
    }
  }
}
</script>
