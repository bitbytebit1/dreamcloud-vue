<template>
  <v-flex xs12 class="mr-3 mt-2" :class="String(trackID)">
    <v-data-iterator
      content-tag="v-layout"
      row
      wrap
      :items="aComments"
      hide-actions
      no-data-text=""
    >

      <v-flex
        slot="item"
        slot-scope="props"
        xs12
      >
        <v-list three-line>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="props.item.artistIMG">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="props.item.comment"></v-list-tile-title>
              <v-list-tile-sub-title v-html="props.item.artist"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="props.index !== aComments.length -1"></v-divider>
        </v-list>
      </v-flex>
    </v-data-iterator>
  </v-flex>
</template>
<script>
/* eslint-disable */
import deleteButton from '@/components/misc/delete-button'
export default {
  name: 'songComments',
  watch: {
    'trackID': 'getComments'
  },
  props: {
    trackID: {
      type: [String, Number],
      default: ''
    },
    source: {
      type: [String],
      default: ''
    }
  },
  components: {
    'delete-button': deleteButton
  },
  data () {
    return {
      aComments: [],
      iPage: 0
    }
  },
  methods: {
    getComments () {
      return this.$DCAPI.getSongComments(this.trackID, this.iPage, this.source, 50, (dat) => {
        this.aComments = dat
      })
    },
    getMore () {
      this.iPage += 1
      this.getComments()
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style>
</style>
