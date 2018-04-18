<template>
    <v-list-group :value="active" prepend-icon="people" no-action>
      <!-- head -->
      <v-list-tile ripple slot="activator">
        <v-list-tile-content>
          <v-list-tile-title>Subscriptions</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <!-- all -->
      <v-list-tile ripple @click="closeLeftOnMobile" :to="{name:'subsAll', params: {user: UID}}">
        <v-list-tile-action>
          <v-icon>music_note</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>All</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      
      <!-- overview -->
      <!-- <v-list-tile ripple @click="closeLeftOnMobile" :to="{name:'userSubOverview', params: {user: UID}}">
        <v-list-tile-action>
          <v-icon>view_module</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Overview</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile> -->

      <!-- filter -->
      <v-list-tile ripple @click.stop="$refs.search.focus()">
        <v-list-tile-action @click="search.length > 0 ? search='' : ''">
          <!-- icon -->
          <v-icon>{{search.length > 0 ? 'clear' : 'filter_list'}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <!-- text -->
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
      :items="subscriptions"
      :search="search"
      :rows-per-page-items="rowsPerPageItems"
      :custom-filter="(items, search, filter) => { search = search.toString().toLowerCase() ; return items.filter(row => filter(row['name_lower'], search)) }"
      pagination.sync="pagination"
      hide-actions
      no-data-text=""
    >
      <v-list-tile
        slot="item"
        slot-scope="props"
        @click="closeLeftOnMobile"
        id="subscription"
        :class="isPlaying(props.item['source'], props.item['name'], props.item['id'])"
        :active-class="isPlaying(props.item['source'], props.item['name'], props.item['id']) || 'cyan white--text'"
        :to="{path: '/a/'  + props.item['source'] +  '/' + encodeURIComponent(props.item['name']) +  '/' + props.item['id']}"
        v-bind:key="props.item['.key']"
        ripple
      >
        <v-list-tile-action color="green">
          <v-avatar size='32px' slot='activator' >
            <img :src="props.item['img']" :class="['sub-' + props.item['source']]">
          </v-avatar>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ props.item['name'] }}</v-list-tile-title>
        </v-list-tile-content>
        <delete-button @delete="subscriptionDelete" :id="props.item['id']" class="delete"></delete-button>
      </v-list-tile>
    </v-data-iterator>
    </v-list-group>
</template>

<script>
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
  methods: {
    isPlaying (s, n, id) {
      return this.$store.getters.hash === '/a/' + s + '/' + encodeURIComponent(n) + '/' + id ? 'primary white--text' : ''
    },
    subscriptionDelete (subID) {
      this.$DCFB.subscriptionDelete(subID)
    },
    closeLeftOnMobile () {
      this.$emit('closeLeft')
    }
  },
  firebase () {
    return {
      subscriptions: this.$DCFB.subscriptions.orderByChild('name_lower')
    }
  }
}
</script>

<style>
.filter label, .filter input{
  font-size: 13px;
}
#subscription:hover .sub-MixCloud{
  box-shadow: 0 0 0 3px rgba(39, 58, 75, 1);
}
#subscription:hover .sub-SoundCloud{
  box-shadow: 0 0 0 3px rgba(255, 119, 0, 1);
}
#subscription:hover .sub-YouTube{
  box-shadow: 0 0 0 3px rgba(255, 0, 0, 1);
}
#subscription:hover .sub-Vimeo{
  box-shadow: 0 0 0 3px rgba(26, 183, 234, 1);
}
#subscription:hover .sub-Bandcamp{
  box-shadow: 0 0 0 3px rgba(98, 154, 169, 1);
}
.delete {
  display: none!important
}
.router-link-exact-active .delete, #subscription:hover .delete {
  display: inherit!important
}
</style>
