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
      :distance="210" 
      spinner="waveDots" 
      @infinite="infiniteHandler"
    >
      <span slot="no-more"/>
      <span slot="no-results"/>
    </infinite-loading>
    <jumbo 
      v-if="bFailed && !!$route.params.source" 
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
        if (!d.length && !this.searchResults.length) {
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
