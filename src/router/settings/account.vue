<template>
  <div class="ma-0 pa-0">
    <h3 class="text-xs-left pa-3">Account</h3>
    <v-divider class="primary"></v-divider>
    <v-list subheader>
      <v-list-tile
        :to="{name: 'about'}"
        ripple
      >
        <v-list-tile-content>
          About
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon>
            <v-icon color="primary">face</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>

      <v-divider></v-divider>
      <v-list-tile
        :to="{name: 'login'}"
        ripple
      >
        <v-list-tile-content>
          {{isAnon ? 'Login' : 'Change account'}}
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon>
            <v-icon color="primary">{{isAnon ? 'face' : 'swap_horiz'}}</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider v-if="isAnon"></v-divider>

      <v-divider v-if="!isAnon"></v-divider>
      <v-list-tile
        @click="logout"
        v-if="!isAnon"
        ripple
      >
        <v-list-tile-content>
          Logout
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon>
            <v-icon color="primary">pool</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </div>
</template>
<script>
/* eslint-disable */
import deleteButton from '@/components/buttons/delete-button'
import { mapGetters } from 'vuex'

export default {
  name: 'account',
  computed: {
    ...mapGetters({
      isAnon: 'isAnon'
    })
  },
  methods: {
    logout () {
      this.$DCFB.fb.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>

<style>
</style>
