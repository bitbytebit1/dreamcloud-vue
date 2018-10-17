<template>
  <v-flex 
    xs12 
    lg10 
    flexbox>
    <!-- <loading v-if="loading"></loading> --> 
    <playlist 
      v-if="!loading && !bFailed" 
      :show-uploaded="!0" 
      :songs="searchResults" 
      rows-per-page='50'/> 
    <infinite-loading 
      v-if="!loading" 
      ref="infiniteLoading" 
      :distance="210" 
      spinner="waveDots" 
      @infinite="infiniteHandler">
      <span slot="no-more"/>
      <span slot="no-results"/>
    </infinite-loading>
    <jumbo 
      v-if="bFailed" 
      :subheading="`Couldn't find '${$route.params.query}' on ${$route.params.source}`" 
      error="No hits Boss"
    />
  </v-flex>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import loading from '@/components/misc/loading'
import jumbo from '@/components/misc/jumbo'

export default {
  name: 'Searchpage',
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
      loading: false,
      searchResults: [],
      iPage: 0,
      bFailed: false
    }
  },
  components: {
    'infinite-loading': InfiniteLoading,
    'loading': loading,
    'jumbo': jumbo
  },
  computed: {
    splitSource () {
      return this.source.split('-')
    }
  },
  watch: {
    '$route.params': {
      immediate: true,
      handler: 'searchInt'
    }
  },
  methods: {
    infiniteHandler ($state) {
      this.search(++this.iPage).then(function () {
        $state.loaded()
      })
    },
    searchInt () {
      this.$store.dispatch('loadIndeterm', true)
      this.bFailed = false
      this.search(0)
    },
    search (iPage) {

      this.searchResults = !iPage ? [] : this.searchResults

      return this.$DCAPI.searchInt(this.$route.params.query, iPage, this.splitSource, '', (d) => {
        this.loading = false
        if (iPage === 0) {
          this.$store.dispatch('loadIndeterm', false)
        }
        // If no results stop infinite loading
        if (!d.length) {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
          this.bFailed = true
        } else {
          this.searchResults.push(...d)
        }
      }, '')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
