<template>
  <v-container fluid grid-list-md justify-start>
      <v-flex xs12 class="mr-4 ml-4 mb-3">
      <!-- filter -->
      <v-text-field
        @focus="filterHasFocus = true"
        @blur="filterHasFocus = false"
        color="primary"
        id="flr-txt"
        label="Filter"
        single-line
        hide-details
        v-model="search"
        v-on:keyup.enter="$UTILS.closeSoftMobi()"
        ref="search"
      ></v-text-field>
      </v-flex>
    <v-data-iterator
      v-if="$store.getters.auth_state"
      content-tag="v-layout"
      row
      wrap
      class="mr-4 ml-4 mb-3"
      :items="subscriptions"
      :search="search"
      :rows-per-page-items="rowsPerPageItems"
      pagination.sync="pagination"
      hide-actions
    >
      <!-- <router-link> -->
      <v-flex
        slot="item"
        slot-scope="props"
        xs12
        sm6
        md4
        lg3
        class="artist-card"
      >
        <!-- <v-card :to="{name: 'userPlaylist', params: {user: $route.params['user'], playlist: $route.params['playlist'], name: $route.params['name'] }}" class="pointer"> -->
        <v-card :to="{name: 'artist', params: {source: props.item.source, artist: props.item.name, artistID: props.item.id }}" class="pointer" >
          <v-avatar
            class="mt-2"
            size="95px"
          >
            <img
              :src="props.item.img"
              alt=""
            >
          </v-avatar>
          <!-- <v-card-media :src="props.item.img" height="200px"></v-card-media> -->
          <v-card-text class="text-xs-center">{{ props.item.name }}</v-card-text>
        </v-card>
      </v-flex>
      <!-- </router-link> -->
    </v-data-iterator>
  </v-container>
</template>
<script>
/* eslint-disable */
// import deleteButton from '@/components/misc/delete-button'
export default {
  name: 'userSubOverview',
  props: ['user'],
  data () {
    return {
      filterHasFocus: false,
      search: '',
      active: true,
      rowsPerPageItems: [{ text: "All", value: -1 }],
      pagination: {
        rowsPerPage: 'All'
      }
    }
  },
  firebase () {
    return {
      subscriptions: this.$DCFB.subscriptionGet(this.user).orderByChild('name_lower')
    }
  }
}
</script>

<style>
.artist-card{
  min-width: 303px;
}
</style>
