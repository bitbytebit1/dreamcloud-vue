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
      <v-flex 
        xs12 
        class="mb-3"
      >
        <!-- filter -->
        <v-text-field
          ref="search"
          v-model="search"
          clearable
          color="primary"
          label="Filter"
          single-line
          hide-details
          class="px-1"
          @keyup.enter="$UTILS.closeSoftMobi()"
        />
      </v-flex>
      <v-data-iterator
        v-if="$store.state.user.auth_state"
        :items="subscriptions"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :custom-filter="(items, search, filter) => { search = search.toString().toLowerCase() ; return items.filter(row => filter([row['source'], row['name_lower']], search)) }"
        content-tag="v-layout"
        row
        wrap
        hide-actions
      >
        <v-flex
          slot="item"
          slot-scope="props"
          xs4
          md3
          lg2
        >
          <!-- <v-card :to="{name: 'userPlaylist', params: {user: $route.params['user'], playlist: $route.params['playlist'], name: $route.params['name'] }}" class="pointer"> -->
          <v-card 
            :to="{name: 'artist', params: {source: props.item.source, artist: props.item.name, artistID: props.item.id }}"
            :key="props.item.name_lower" 
            class="pointer"
            height="100%" 
            width="100%"
          >
            <!-- :size="((!$store.state.user.drawLeft && !$UTILS.isMobile ? 21 : 0) + 70 + (!$store.state.user.drawRight && !$UTILS.isMobile ? 21 : 0)) + 'px'" -->
            <!-- <v-avatar
                width="100%"
                class="mt-2"
              > -->
            <v-img
              :src="props.item.img"
              :aspect-ratio="1"
            />
            <!-- </v-avatar> -->
            <v-card-text class="text-xs-center wordbreak">{{ props.item.name }}
              <div class="grey--text">{{ props.item.source }}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-data-iterator>
      
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
