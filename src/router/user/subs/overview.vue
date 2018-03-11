<template>
  <v-container fluid v-bind="{ [`grid-list-sm`]: true }">
    <v-data-iterator
      v-if="$store.getters.auth_state"
      content-tag="v-layout"
      row
      wrap
      class="mr-5 ml-5 mb-3"
      :items="subscriptions"
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
      >
        <!-- <v-card :to="{name: 'userPlaylist', params: {user: $route.params['user'], playlist: $route.params['playlist'], name: $route.params['name'] }}" class="pointer"> -->
        <v-card :to="{name: 'artist', params: {source: props.item.source, artist: props.item.name, artistID: props.item.id }}" class="pointer">
          <v-avatar
            class="mt-2"
            size="75px"
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
  // components: {
    // 'delete-button': deleteButton
  // },
  data () {
    return {
      // UID: this.$DCFB.UID,
      active: true,
      rowsPerPageItems: [{ text: "All", value: -1 }],
      pagination: {
        rowsPerPage: 'All'
      }
    }
  },
  methods: {
    x2 () {

    }
  },
  computed: {
    x3 () {
      
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
</style>
