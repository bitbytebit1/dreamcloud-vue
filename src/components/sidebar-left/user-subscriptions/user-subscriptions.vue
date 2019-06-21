<template>
  <v-list>
    <!-- <v-list-tile v-if="loggedIn"  @click="closeLeftOnMobile"> -->

    <v-subheader 
      class="pointer" 
      @click="closeLeftOnMobile();$router.push({name: 'userSubOverview', params: {user: uid}})"
    >
      Subscriptions
      <!-- Show more button -->
      <v-btn 
        v-if="bUIShowMore" 
        icon 
        class="ar17" 
        @click.stop="(bShowMore = !bShowMore, pagination.rowsPerPage = bShowMore ? -1 : 7)"
      >
        <v-icon>{{ bShowMore ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
      </v-btn>
    </v-subheader>

    <!-- filter -->
    <v-list-tile 
       
      @click.stop="$refs.search.focus()"
    >
      <v-list-tile-action @click="search.length > 0 ? search='' : ''">
        <!-- icon -->
        <v-icon :color="filterHasFocus ? 'primary' : ''">{{ filterLeng > 0 ? 'clear' : 'filter_list' }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <!-- text -->
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
    <v-data-iterator
      v-if="$store.getters.auth_state"
      :items="subscriptions"
      :search="search"
      :rows-per-page-items="rowsPerPageItems"
      :custom-filter="(items, search, filter) => { search = search.toString().toLowerCase() ; return items.filter(row => filter([row['source'], row['name_lower']], search)) }"
      :pagination.sync="pagination"
      hide-actions
      no-data-text="Subscribe to some people"
      no-results-text="No matching subscriptions"
    >
      <v-flex 
        v-if="bUIShowMore" 
        slot="footer"
      >
        <v-btn 
          small 
          block 
          color="transparent" 
          @click="(bShowMore = !bShowMore, pagination.rowsPerPage = bShowMore ? -1 : 7)"
        >
          {{ bShowMore ? 'SHOW LESS' : 'SHOW MORE' }}
        </v-btn>
      </v-flex>
      <v-list-tile
        id="subscription"
        slot="item"
        slot-scope="props"
        :class="isPlaying(props.item['source'], props.item['name'], props.item['id'])"
        :active-class="isPlaying(props.item['source'], props.item['name'], props.item['id']) || 'secondary white--text'"
        :to="{path: '/a/' + props.item['source'] + '/' + encodeURIComponent(props.item['name']) + '/' + props.item['id']}"
        :key="props.item['.key']"
        @click="closeLeftOnMobile"
      >
        <v-list-tile-action color="green">
          <v-avatar 
            slot='activator' 
            size='35px'
          >
            <img 
              :src="props.item['img']" 
              :class="['sub-' + props.item['source']]"
            >
          </v-avatar>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ props.item['name'] }}</v-list-tile-title>
        </v-list-tile-content>
        <delete-button 
          :id="props.item['id']" 
          class="delete" 
          @delete="subscriptionDelete"
        />
      </v-list-tile>
    </v-data-iterator>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex'
import deleteButton from '@/components/buttons/delete-button'
export default {
  name: 'UserPlaylists',
  components: {
    'delete-button': deleteButton
  },
  data () {
    return {
      bShowMore: true,
      filterHasFocus: false,
      search: '',
      active: false,
      rowsPerPageItems: [7, { 'text': 'All', 'value': -1 }],
      pagination: {
        rowsPerPage: -1
      }
    }
  },
  watch: {
    auth_state: {
      immediate: true,
      handler: 'bind'
    }
  },
  computed: {
    ...mapGetters({
      auth_state: 'auth_state',
      uid: 'uid'
    }),
    bUIShowMore () {
      return this.$store.getters.auth_state && this.subscriptions.length > 5
    },
    filterLeng () {
      return this.search.length > 0
    }
  },
  methods: {
    bind () {
      if (this.auth_state) {
        this.$bindAsArray('subscriptions', this.$DCFB.subscriptions.orderByChild('name_lower'))
      }
    },
    isPlaying (s, n, id) {
      return this.$store.getters.hash === '/a/' + s + '/' + encodeURIComponent(n) + '/' + id ? 'primary white--text' : ''
    },
    subscriptionDelete (subID) {
      this.$DCFB.subscriptionDelete(subID)
    },
    closeLeftOnMobile () {
      this.$emit('closeLeft')
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
