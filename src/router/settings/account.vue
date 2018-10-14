<template>
  <div class="ma-0 pa-0">
    <h3 class="text-xs-left pa-3">Account</h3>
    <v-divider class="primary"/>
    <v-list subheader>
      <!-- Login + Switch Account -->

      <v-list-tile
        :to="{name: 'userOverview', params: {user: uid}}"
      >
        <v-list-tile-content>
          Profile
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon>
            <v-icon>explore</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>

      <v-list-tile
        v-if="isAnon"
        :to="{name: 'login'}"
        ripple
      >
        <v-list-tile-content>
          Login
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon>
            <v-icon>face</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>

      <v-list-tile
        v-if="!isAnon"
        ripple
        @click="logout"
      >
        <v-list-tile-content>
          Logout
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon>
            <v-icon>pool</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>
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
      isAnon: 'isAnon',
      uid: 'uid'
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
