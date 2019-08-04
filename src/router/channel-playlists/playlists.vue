<template>
  <v-flex 
    xs12 
    lg12
  >
    <v-card flat>
      <v-card-title class="ma-0 pa-0">
        <v-flex xs12 >
          <!-- filter -->
          <v-text-field
            id="flr-txt"
            ref="search"
            v-model="search"
            color="primary"
            label="Filter"
            class="mr-4 ml-4 mb-3"
            clearable
            single-line
            hide-details
            @focus="filterHasFocus = true"
            @blur="filterHasFocus = false"
            @keyup.enter="$UTILS.closeSoftMobi()"
          />
        </v-flex>
      </v-card-title>
      <v-container 
        grid-list-lg 
        class="pa-2" 
        fluid
      >
        <v-data-iterator
          :items="aPlaylist"
          :search="search"
          :rows-per-page-items="rowsPerPageItems"
          :custom-filter="(items, search, filter) => { search = search.toString().toLowerCase() ; return items.filter(row => filter(row['title'], search)) }"
          content-tag="v-layout"
          row
          wrap
          class=""
          pagination.sync="pagination"
        >
          <v-flex
            v-if="props.item.numberOfSongs"
            slot="item"
            slot-scope="props"
            xs12
            sm6
            md4
            lg2
          >
            <!-- {{props.item['.key']}} -->
            <!-- {{props.item.name_lower}} -->
            <!-- {{props.item.songs[Object.keys(props.item.songs)[0]].poster}} -->
            <!-- Object.keys(aPlaylist[props.index].songs)[0] -->
            <v-card 
              :to="{name: 'channelPlaylist', params: {listID: props.item.listID, artistID: props.item.artistID, title: props.item.title, source: props.item.source}}" 
              class="pointer dc-crd"
            >
              <v-img
                :aspect-ratio="props.item.source === 'YouTube' ? 16/9 : 1"
                :src="props.item.img"
              >
                <span class="songLeng">{{ props.item.numberOfSongs }}</span>
              </v-img>
              <v-card-text class="text-xs-center subheading">{{ props.item.title }}</v-card-text>
            </v-card>
          </v-flex>
        </v-data-iterator>
      </v-container>
    </v-card>
  </v-flex>
</template>
<script>
// /* eslint-disable */
// import deleteButton from '@/components/buttons/delete-button'
export default {
  name: 'PlaylistOverview',
  props: {
    aPlaylist: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      filterHasFocus: false,
      search: '',
      active: true,
      rowsPerPageItems: [{ text: 'All', value: -1 }],
      pagination: {
        rowsPerPage: 'All'
      }
    }
  },
  created () {
    // this.bind()
  }
}
</script>

<style>
.songLeng{
  color: white;
  text-shadow: 0px 0px 5px black;
  background: rgba(1, 1, 1, .5);
  position: absolute;
  bottom: 0px;
  right: 0px;
}
</style>
