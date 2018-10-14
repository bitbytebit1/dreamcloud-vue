<template>
  <!-- V LIST MAIN -->
  <v-list>
    <!-- HEADER PLAYLIST -->
    <v-subheader 
      class="pointer" 
      @click="closeLeftOnMobile();$router.push({name: 'playlistOverview', params: {user: uid}})">
      <div>
        Playlists
      </div>
      <v-btn 
        v-if="bUIShowMore" 
        icon 
        class="ar17" 
        @click.stop="(bShowMore = !bShowMore, pagination.rowsPerPage = bShowMore ? -1 : 7)">
        <v-icon>{{ bShowMore ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
      </v-btn>
    </v-subheader>

    <!-- ALL -->
    <v-list-tile 
      v-if="playlists.length" 
      :to="{name:'playlistsAll', params: {user: uid}}" 
      active-class="secondary white--text" 
      ripple 
      @click.stop="closeLeftOnMobile">
      <v-list-tile-action>
        <v-icon>music_note</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>All</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>


    <!-- FILTER -->
    <v-list-tile 
      ripple 
      @click.stop="$refs.search.focus()">
      <v-list-tile-action @click="search.length > 0 ? search='' : ''">
        <!-- ICON -->
        <v-icon :color="filterHasFocus ? 'primary' : ''">{{ filterLeng > 0 ? 'clear' : 'filter_list' }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <!-- TEXT FIELD -->
        <v-text-field
          ref="search"
          v-model="search"
          color="primary"
          label="Filter"
          class="filter ma-0 pa-0"
          single-line
          hide-details
          @focus="filterHasFocus = true"
          @blur="filterHasFocus = false"
          @keyup.enter="$UTILS.closeSoftMobi()"
        />
      </v-list-tile-content>
    </v-list-tile>
    <!-- DATA ITERATOR -->
    <v-data-iterator
      v-if="$store.getters.auth_state"
      :items="playlists"
      :search="search"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      :custom-filter="(items, search, filter) => { search = search.toString().toLowerCase() ; return items.filter(row => filter(row['name_lower'], search)) }"
      hide-actions
      no-data-text="Add some playlists"
      no-results-text="No matching playlists"
    >
      <!-- FOOTER -->
      <v-flex 
        v-if="bUIShowMore" 
        slot="footer">
        <v-btn 
          small 
          block 
          color="transparent" 
          @click="(bShowMore = !bShowMore, pagination.rowsPerPage = bShowMore ? -1 : 7)">
          {{ bShowMore ? 'SHOW LESS' : 'SHOW MORE' }}
        </v-btn>
      </v-flex>

      <!-- LIST ITEM -->
      <v-list-tile
        id='playlist'
        slot="item"
        slot-scope="props" 
        :class="isPlaying(uid, props.item['.key'], props.item['name'])"
        :active-class="isPlaying(uid, props.item['.key'], props.item['name']) || 'secondary white--text'"
        :to="{path: '/u/' + uid + '/' + props.item['.key'] + '/' + encodeURIComponent(props.item['name'])}"
        :key="props.item['.key']" 
        ripple
        @click.stop="closeLeftOnMobile"
      >
        <!-- ICON -->
        <v-list-tile-action>
          <v-icon :color="isPlaying(uid, props.item['.key'], props.item['name']) ? 'white': ''">music_note</v-icon>
        </v-list-tile-action>

        <!-- NAME -->
        <v-list-tile-content>
          <v-list-tile-title>{{ props.item['name'] }}</v-list-tile-title>
        </v-list-tile-content>

        <!-- DELETE BUTTON -->
        <span class="delete">
          <delete-button 
            :id="props.item['.key']" 
            @delete="playlistDelete"/>
        </span>
      </v-list-tile>
    </v-data-iterator>
  </v-list>
</template>
<script>

// /* eslint-disable */
import deleteButton from '@/components/buttons/delete-button'
import { mapGetters } from 'vuex'
export default {
  name: 'UserPlaylists',
  components: {
    'delete-button': deleteButton
  },
  watch: {
    auth_state: {
      immediate: true,
      handler: 'bind'
    }
  },
  data () {
    return {
      playlists: [],
      bShowMore: false,
      filterHasFocus: false,
      search: '',
      active: false,
      rowsPerPageItems: [7, { 'text': 'All', 'value': -1 }],
      pagination: {
        rowsPerPage: 7
      }
    }
  },
  computed: {
    ...mapGetters({
      auth_state: 'auth_state',
      uid: 'uid'
    }),
    bUIShowMore () {
      return this.$store.getters.auth_state && this.playlists.length > 7
    },
    filterLeng () {
      return this.search.length > 0
    }
  },
  methods: {
    bind () {
      if (this.auth_state) {
        this.$bindAsArray('playlists', this.$DCFB.playlistsRefs.orderByChild('name_lower'))
      }
    },
    isPlaying (s, n, id) {
      // console.log(this.$store.getters.hash, '=', '/u/' + s + '/' + n + '/' + encodeURIComponent(id), this.$store.getters.hash === '/u/' + s + '/' + n + '/' + encodeURIComponent(id))
      return this.$store.getters.hash === '/u/' + s + '/' + n + '/' + encodeURIComponent(id) ? 'primary white--text' : ''
    },
    closeLeftOnMobile () {
      this.$emit('closeLeft')
    },
    playlistDelete (playlistID) {
      this.$DCFB.playlistDelete(playlistID)
    }
  }
}
</script>

<style>
.filter label, .filter input{
  font-size: 13px;
}
.delete {
  display: none!important
}

.router-link-exact-active .delete, #playlist:hover .delete {
  display: inherit!important
}
</style>
