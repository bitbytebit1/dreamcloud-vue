<template>
  <v-flex xs12>
    <v-card>
      <v-card-title class="ma-0 pa-0">
        <v-flex xs12>
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
        class="pa-0" 
        fluid
      >
        <v-data-iterator
          v-if="$store.getters.auth_state"
          :items="aSubs"
          :search="search"
          :rows-per-page-items="rowsPerPageItems"
          :custom-filter="(items, search, filter) => { search = search.toString().toLowerCase() ; return items.filter(row => filter(row['artist'], search)) }"
          :pagination.sync="pagination"
          content-tag="v-layout"
          row
          wrap
        >
          <v-flex
            slot="item"
            slot-scope="props"
            xs12
            sm6
            md4
            lg12
            class="artist-card"
          >
            <!-- <v-card :to="{name: 'userPlaylist', params: {user: $route.params['user'], playlist: $route.params['playlist'], name: $route.params['name'] }}" class="pointer"> -->
            <v-card 
              :to="{name: 'artist', params: {source: props.item.source, artist: props.item.artist, artistID: props.item.artistID }}" 
              class="pointer dc-crd"
            >
              <v-layout row>
                <v-flex xs2>
                  <v-img
                    :src="props.item.img"
                    :lazy-src="props.item.img"
                    class="fillPlace"
                  >
                    <v-layout
                      slot="placeholder"
                      fill-height
                      align-center
                      justify-center
                      ma-0
                      class="grey--text"
                    />
                  </v-img>
                  <!-- <v-card-media
                    v-lazy:background-image="props.item.img"
                    :key="props.item.img"
                    height="200px"
                  ></v-card-media> -->
                  <!-- <v-badge right  color="red">
                    <span slot="badge">{{props.item.newItemCount}}</span>
                  </v-badge> -->
                </v-flex>
                <v-flex xs8>
                  <div class="h200 text-xs-left pl-4 pr-4">
                    <div class="headline">{{ props.item.artist }}</div>
                    <div class="grey--text">Uploads {{ props.item.numberOfSongs }}</div>
                    <div class="">{{ props.item.description }}</div>
                    <!-- <div>{{props.item.numberOfSongs}}</div> -->
                  </div>
                </v-flex>
              </v-layout>

            </v-card>
          </v-flex>
        </v-data-iterator>
      </v-container>
    </v-card>
    <!-- </v-container> -->
  </v-flex>
</template>
<script>
// /* eslint-disable */
// import deleteButton from '@/components/buttons/delete-button'
export default {
  name: 'UserSubOverview',
  props: {
    aSubs: {
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
      rowsPerPageItems: [24, 50, 100, {"text":"All", "value": -1}],
      pagination: {
        rowsPerPage: 24
      }
    }
  }
}
</script>

<style>
.h200{
  height: 200px;
}
/* .artist-card{ */
  /* min-width: 303px; */
/* } */
</style>
