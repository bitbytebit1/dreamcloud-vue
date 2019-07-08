<template>
  <v-flex 
    xs12 
    lg10 
    flexbox
    mt-3
  >
    <playlist 
      v-if="!loading && !bFailed"
      :show-uploaded="!0" 
      :songs="searchResults" 
      rows-per-page='250' 
      @conmen="$emit('conmen', $event)"
    /> 
    <!-- <infinite-loading 
      v-if="!loading" 
      ref="infiniteLoading" 
      :distance="210" 
      spinner="waveDots" 
      @infinite="infiniteHandler"
    >
      <span slot="no-more"/>
      <span slot="no-results"/>
    </infinite-loading> -->
    <jumbo 
      v-if="bFailed || !$route.params.source" 
      :subheading="`Couldn't find ${query} on ${source}`" 
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
      loading: false,
      searchResults: [],
      iPage: 0,
      oldQ: 'zz',
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
  created () {
    this.searchInt(this.$route.params);
  },
  beforeRouteUpdate (to, from, next) {
    this.searchInt(to.params);
    next();
  },
  methods: {
    // infiniteHandler ($state) {
    //   this.search(++this.iPage).then(function () {
    //     $state.loaded()
    //   })
    // },
    searchInt (params) {
      console.log('bind artist')
      if (this.oldQ != this.query + this.source) {
        // alert(1)
        // this.$store.dispatch('loadIndeterm', true)
        this.bFailed = false
        this.search(params, 0)
      }
    },
    search (params, iPage) {
      this.searchResults = !iPage ? [] : this.searchResults
      this.oldQ = this.query + this.source
      return this.$DCAPI.searchInt(params.query, iPage, this.splitSource, '', (d) => {
        this.loading = false
        if (iPage === 0) {
          this.$store.dispatch('loadIndeterm', false)
        }
        // If no results stop infinite loading
        if (!d.length && !this.searchResults.length) {
          // this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
          this.bFailed = true
        } else {
          this.searchResults.push(...d)
        }
      }, '', 50, true)
    }
  }
}
</script>
