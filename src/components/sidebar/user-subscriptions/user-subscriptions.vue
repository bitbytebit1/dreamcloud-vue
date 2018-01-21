<template>
    <v-list-group :value="active" prepend-icon="people" no-action>
      <v-list-tile ripple slot="activator">
        <v-list-tile-content>
          <v-list-tile-title>Subscriptions</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
        
      <v-list-tile ripple @click="closeLeftOnMobile" :to="{path: '/subs/all'}">
        <v-list-tile-action>
          <v-icon>toc</v-icon>
        </v-list-tile-action>
        
        <v-list-tile-content>
          <v-list-tile-title>All</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile 
        v-for="subItem in subscriptions"
        @click="closeLeftOnMobile"
        id="subscription"
        :class="isPlaying(subItem['source'], subItem['name'], subItem['id'])"
        :active-class="isPlaying(subItem['source'], subItem['name'], subItem['id']) || 'cyan white--text'"
        :to="{path: '/a/'  + subItem['source'] +  '/' + encodeURIComponent(subItem['name']) +  '/' + subItem['id']}"
        v-bind:key="subItem['.key']"
        ripple
      >
        <v-list-tile-action color="green">
          <v-avatar size='32px' slot='activator'>
            <img :src="subItem['img']"/>
          </v-avatar>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ subItem['name'] }}</v-list-tile-title>
        </v-list-tile-content>
        <delete-button @delete="subscriptionDelete" :id="subItem['id']" class="delete"></delete-button>
      </v-list-tile>
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
      active: true
    }
  },
  methods: {
    isPlaying (s, n, id) {
      return this.$store.getters.hash === '/a/' + s + '/' + encodeURIComponent(n) + '/' + id ? 'teal white--text' : ''
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
.delete {
  display: none!important
}
.router-link-exact-active .delete, #subscription:hover .delete {
  display: inherit!important
}
</style>
