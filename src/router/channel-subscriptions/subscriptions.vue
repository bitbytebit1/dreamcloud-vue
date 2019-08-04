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
          v-if="$store.state.user.auth_state"
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
                </v-flex>
                <v-flex xs10>
                  <div class=" text-xs-left">
                    <div>
                      <div 
                        class="subheading"
                      >{{ props.item.artist }} </div>
                      <subscribe-button 
                        :artistID="props.item.artistID" 
                        :source="props.item.source" 
                        :artist="props.item.artist" 
                        :img="props.item.img"
                      />
                    </div>
                    
                    <div>Uploads {{ props.item.numberOfSongs }}</div>

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
import subscribeButton from '@/components/buttons/subscribe-button'
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
  components: {
    'subscribeButton': subscribeButton
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
.artist-card{
  min-width: 200px;
}
</style>
