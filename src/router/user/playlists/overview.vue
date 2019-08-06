<template>
  <v-flex 
    flexbox 
    xs12 
    lg10 
    class="ma-0 pa-0"
  >
    <div class="headline fwl text-xs-left pl-2 pt-2">Playlists</div>
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
          id="flr-txt"
          ref="search"
          v-model="search"
          clearable
          color="primary"
          onfocus="this.placeholder = ''"
          onblur="this.placeholder = 'Filter'"
          single-line
          hide-details
          class="px-1"
          @focus="filterHasFocus = true"
          @blur="filterHasFocus = false"
          @keyup.enter="$UTILS.closeSoftMobi()"
        />
      </v-flex>
      <v-data-iterator
        v-if="$store.state.user.auth_state"
        :items="aPlaylist"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :custom-filter="(items, search, filter) => { search = search.toString().toLowerCase() ; return items.filter(row => filter(row['name_lower'], search)) }"
        content-tag="v-layout"
        row
        wrap
        pagination.sync="pagination"
        hide-actions
      >
        <v-flex   
          slot="item"
          slot-scope="props"
          xs4
          md3
          lg2
        >
          <!-- {{props.item['.key']}} -->
          <!-- {{props.item.name_lower}} -->
          <!-- {{props.item.songs[Object.keys(props.item.songs)[0]].poster}} -->
          <!-- Object.keys(aPlaylist[props.index].songs)[0] -->
          <v-card 
            :to="{name: 'userPlaylist', params: {user: user, playlist: props.item['.key'], name: props.item.name}}"
            height="100%" 
            width="100%" 
            class="pointer"
          >
            <!-- IMAGE -->
            <v-img
              :src="props.item.songs[Object.keys(props.item.songs)[0]].posterLarge"
              aspect-ratio="1"
              class="fillPlace"
            />
            <!-- <v-avatar
              :size="((!$store.state.user.drawLeft && !$UTILS.isMobile ? 21 : 0) + 95 + (!$store.state.user.drawRight && !$UTILS.isMobile ? 21 : 0)) + 'px'"
              class="mt-2"
            > -->
            <!-- <img
                :src="props.item.songs[Object.keys(props.item.songs)[0]].poster"
                alt=""
              > -->
            <!-- <v-img
                :src="props.item.songs[Object.keys(props.item.songs)[0]].poster"
                aspect-ratio="1"
                class="fillPlace"
              />
            </v-avatar> -->
            <v-card-text class="text-xs-center"><div class="ma-0 pa-0">{{ props.item.name }}</div><div class="grey--text ma-0 pa-0">{{ Object.keys(props.item.songs).length }}</div></v-card-text>
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
  name: 'PlaylistOverview',
  props: {
    user: {
      type: String,
      default: ''
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
    this.bind()
  },
  methods: {
    bind () {
      // very likely that it will be faster to query the first song of every playlist 
      // instead of getting all songs from all playlists
      this.$bindAsArray('aPlaylist', this.$DCFB.playlistGetAll(this.user).orderByChild('name_lower'))
    }
  }
}
</script>

<style>
.sl{
  color: white;
  /* text-shadow: 0px 0px 5px black; */
  /* background: rgba(1, 1, 1, .5); */
  position: absolute;
  bottom: 0px;
  right: 0px;
}
</style>
