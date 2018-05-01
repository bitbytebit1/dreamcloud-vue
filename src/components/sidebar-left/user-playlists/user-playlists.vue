<template>
    <v-list-group :value="active" prepend-icon="library_music" no-action>
      <v-list-tile ripple slot="activator">
        <v-list-tile-content>
          <v-list-tile-title>Playlists</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile active-class="cyan white--text" ripple @click.stop="closeLeftOnMobile" :to="{name:'playlistsAll', params: {user: UID}}">
        <v-list-tile-action>
          <v-icon>toc</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>All</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <!-- overview -->
      <v-list-tile ripple @click="closeLeftOnMobile" :to="{name:'playlistOverview', params: {user: UID}}">
        <v-list-tile-action>
          <v-icon>view_module</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Overview</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile ripple @click.stop="$refs.search.focus()">
        <v-list-tile-action @click="search.length > 0 ? search='' : ''">
          <v-icon :color="filterHasFocus ? 'primary' : ''">{{filterLeng > 0 ? 'clear' : 'filter_list'}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <!-- filter -->
          <v-text-field
            @focus="filterHasFocus = true"
            @blur="filterHasFocus = false"
            color="primary"
            label="Filter"
            class="filter"
            single-line
            hide-details
            v-model="search"
            v-on:keyup.enter="$UTILS.closeSoftMobi()"
            style="top:-10px"
            ref="search"
          ></v-text-field>
        </v-list-tile-content>
      </v-list-tile>
    <v-data-iterator
      v-if="$store.getters.auth_state"
      :items="playlistRefs"
      :search="search"
      :rows-per-page-items="rowsPerPageItems"
      pagination.sync="pagination"
      :custom-filter="(items, search, filter) => { search = search.toString().toLowerCase() ; return items.filter(row => filter(row['name_lower'], search)) }"
      hide-actions
      no-data-text=""
    >
      <v-list-tile
        slot="item"
        slot-scope="props"
        @click.stop="closeLeftOnMobile" 
        id='playlist'
        :class="isPlaying(UID, props.item['.key'], props.item['name'])"
        :active-class="isPlaying(UID, props.item['.key'], props.item['name']) || 'cyan white--text'"
        :to="{path: '/u/' + UID + '/' + props.item['.key'] +  '/' +  encodeURIComponent(props.item['name'])}" 
        v-bind:key="props.item['.key']"
        ripple
      >
        <v-list-tile-action>
          <v-icon :color="isPlaying(UID, props.item['.key'], props.item['name']) ? 'white': ''">music_note</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ props.item['name'] }}</v-list-tile-title>
        </v-list-tile-content>
        <span class="delete">
          <delete-button @delete="playlistDelete" :id="props.item['.key']"></delete-button>
        </span>
      </v-list-tile>
    </v-data-iterator>
    </v-list-group>
</template>
<script>

// /* eslint-disable */
import deleteButton from '@/components/misc/delete-button'
export default {
  name: 'user-playlists',
  components: {
    'delete-button': deleteButton
  },
  data () {
    return {
      UID: this.$DCFB.UID,
      filterHasFocus: false,
      search: '',
      active: false,
      rowsPerPageItems: [{ value: -1 }],
      pagination: {
        rowsPerPage: 'All'
      }
    }
  },
  computed: {
    filterLeng () {
      return this.search.length > 0
    }
  },
  methods: {
    isPlaying (s, n, id) {
      return this.$store.getters.hash === '/u/' + s + '/' + n + '/' + encodeURIComponent(id) ? 'primary white--text' : ''
    },
    closeLeftOnMobile () {
      this.$emit('closeLeft')
    },
    playlistDelete (playlistID) {
      this.$DCFB.playlistDelete(playlistID)
    }
  },
  firebase () {
    return {
      playlistRefs: this.$DCFB.playlistsRefs.orderByChild('name_lower')
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
