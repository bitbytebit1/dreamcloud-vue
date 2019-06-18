<template>
  <v-flex 
    flexbox 
    xs12 
    lg10 
    class="ma-0 pa-0"
  >
    <div class="headline fwl text-xs-left pl-2 pt-2">Subscriptions</div>
    <v-container 
      fluid 
      grid-list-md 
      class="ma-0 pa-0"
    >
      <v-layout 
        row 
        wrap
        class="ma-0 pa-0"
      >
        <v-flex 
          xs12 
          class="mb-3"
        >
          <!-- filter -->
          <v-text-field
            ref="search"
            v-model="search"
            color="primary"
            label="Filter"
            single-line
            hide-details
            class="px-1"
            @keyup.enter="$UTILS.closeSoftMobi()"
          />
        </v-flex>
        <v-data-iterator
          v-if="$store.getters.auth_state"
          :items="subscriptions"
          :search="search"
          :rows-per-page-items="rowsPerPageItems"
          :custom-filter="(items, search, filter) => { search = search.toString().toLowerCase() ; return items.filter(row => filter([row['source'], row['name_lower']], search)) }"
          content-tag="v-layout"
          row
          wrap
          justify-space-around
          align-space-around 
          hide-actions
        >
          <v-flex
            slot="item"
            slot-scope="props"
            xs4
            md3
            lg2
            style="width:100%;"
          >
            <!-- <v-card :to="{name: 'userPlaylist', params: {user: $route.params['user'], playlist: $route.params['playlist'], name: $route.params['name'] }}" class="pointer"> -->
            <v-card 
              :to="{name: 'artist', params: {source: props.item.source, artist: props.item.name, artistID: props.item.id }}" 
              :key="props.item.name_lower" 
              class="pointer"
            >
              <v-avatar
                :size="((!$store.getters.drawLeft && !$UTILS.isMobile ? 21 : 0) + 95 + (!$store.getters.drawRight && !$UTILS.isMobile ? 21 : 0)) + 'px'"
                class="mt-2"
              >
                <img
                  :src="props.item.img"
                  alt=""
                >
              </v-avatar>
              <v-card-text class="text-xs-center">{{ props.item.name }}
                <div class="grey--text">{{ props.item.source }}</div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-data-iterator>
      
      </v-layout>
    </v-container>
  </v-flex>
</template>
<script>
// /* eslint-disable */
// import deleteButton from '@/components/buttons/delete-button'
export default {
  name: 'UserSubOverview',
  props: {
    user: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      search: '',
      active: true,
      rowsPerPageItems: [{ text: 'All', value: -1 }],
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
  min-width: 150px;
}
</style>
