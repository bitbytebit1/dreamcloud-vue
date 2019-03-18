<template>
  <v-flex 
    xs12 
    lg10 
    class="pt-3"
  >
    <v-tabs
      v-model="tab"
      slider-color="primary"
    >
      <v-tab ripple>
        All
      </v-tab>
      <v-tab ripple>
        SoundCloud
      </v-tab>
      <v-tab ripple>
        YouTube
      </v-tab>
    </v-tabs>
    <playlist 
      :show-uploaded="!0" 
      :sort-by="null" 
      :songs="songs" 
      :rows-per-page="-1"
      @conmen="$emit('conmen', $event)"
    />
  </v-flex>
</template>
<script>
// /* eslint-disable */
export default {
  name: 'Trending',
  data () {
    return {
      tab: 0,
      yt: [],
      sc: []
    }
  },
  methods: {
    getYT () {
      this.$DCAPI.getTrendingYT().then((resp) => {
        this.yt = resp.data
        // if (resp.nextPage) {
        //   this.$DCAPI.getTrendingYT(resp.nextPage).then((resp2) => {
        //     this.yt.push(...resp2.data)
        //   })
        // }
      })
    },
    getSC () {
      this.$DCAPI.getTrendingSC().then((resp) => {
        this.sc = resp.data
      })
    }
  },
  computed: {
    songs () {
      if (this.tab == 0) {
        return this.all
      }
      if (this.tab == 1) {
        return this.sc
      }
      if (this.tab == 2) {
        return this.yt
      }
    },
    all () {
      var ret = [...this.sc]
      for (let i = 0; i < this.yt.length - 1; i++) {
        ret.splice(i + 1, 0, this.yt[i])
      }
      return ret
    }
  },
  created () {
    this.getYT()
    this.getSC()
  }
}
</script>

<style>
</style>
