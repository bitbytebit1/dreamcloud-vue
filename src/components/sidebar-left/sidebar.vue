<template>
	<div class="mb-1">
		<v-list dense class="pa-0">

			<!-- Change to for loop to save the whales... I mean internet -->

			<!-- home -->
			<v-list-tile v-if="loggedIn" ripple @click="closeLeft" :to="{name: 'home', params: {user: $DCFB.UID}}">
				<v-list-tile-action>
					<v-icon>dashboard</v-icon>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title>Home</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>

			<!-- Subscriptions all -->
			<v-list-tile v-if="loggedIn" ripple @click="closeLeft" :to="{name:'subsAll', params: {user: $DCFB.UID}}">
				<v-list-tile-action>
					<v-icon>whatshot</v-icon>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title>Trending</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>

			<!-- Subscriptions Overview -->
			<!-- <v-list-tile v-if="loggedIn" ripple @click="closeLeftOnMobile" :to="{name:'userSubOverview', params: {user: $DCFB.UID}}">
        <v-list-tile-action>
          <v-icon>view_module</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Subscriptions</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile> -->

			<!-- Playlist Overview -->
			<!-- <v-list-tile v-if="loggedIn" ripple @click="closeLeftOnMobile" :to="{name:'playlistOverview', params: {user: $DCFB.UID}}">
        <v-list-tile-action>
          <v-icon>view_module</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Playlists</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile> -->

			<!-- history -->
			<v-list-tile ripple class="history-link" @click="closeLeft" v-if="loggedIn" :to="{name:'history', params: {user: $DCFB.UID}}">
				<v-list-tile-action>
					<v-icon>history</v-icon>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title>History</v-list-tile-title>
				</v-list-tile-content>
				<span class="delete">
					<delete-button @delete="clearHistory"></delete-button>
				</span>
			</v-list-tile>

			<!-- about -->
			<v-list-tile v-if="!loggedIn" ripple @click="closeLeft" :to="{name: 'about'}">
				<v-list-tile-action>
					<v-icon>info</v-icon>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title>About</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>

			<!-- login -->
			<v-list-tile v-if="!loggedIn" ripple @click="closeLeft" :to="{path: '/login'}">
				<v-list-tile-action>
					<v-icon>person</v-icon>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title>Login</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
      
			<!-- settings -->
			<v-list-tile ripple @click="closeLeft" v-if="loggedIn" :to="{path: '/settings'}">
				<v-list-tile-action>
					<v-icon>settings</v-icon>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title>Settings</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
		</v-list>
    
		<!-- Playists -->
		<v-list dense class="pa-0">
			<user-playlists @closeLeft="closeLeft" v-if="loggedIn"></user-playlists>
		</v-list>
    
		<!-- Subscriptions -->
		<v-list dense class="pa-0">
			<user-subscriptions @closeLeft="closeLeft" v-if="loggedIn"></user-subscriptions>
		</v-list>

		<!-- tos -->
		<v-list dense class="pa-0 mb-5">
			<v-list-tile ripple @click="closeLeft" v-if="!loggedIn" :to="{path: '/tos'}">
				<v-list-tile-action>
					<v-icon>forum</v-icon>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title>Terms of Use</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
		</v-list>
	</div>
</template>
<script>
import userPlaylists from '@/components/sidebar-left/user-playlists/user-playlists'
import userSubscriptions from '@/components/sidebar-left/user-subscriptions/user-subscriptions'
import deleteButton from '@/components/misc/delete-button'
export default {
  name: 'sidebar',
  components: {
    'user-playlists': userPlaylists,
    'user-subscriptions': userSubscriptions,
    'delete-button': deleteButton
  },
  data () {
    return {
      userDrawer: false
    }
  },
  methods: {
    closeLeft () {
      this.$emit('closeLeft', 'left')
    },
    clearHistory () {
      this.$DCFB.historyClear()
    }
  },
  computed: {
    loginPath () {
      return '/' + this.loginText.toLowerCase()
    },
    loginText () {
      return this.loggedIn ? 'User' : 'Login'
    },
    loggedIn () {
      return this.$store.getters.auth_state
    }
  },
  mounted () {

  }
}
</script>

<style>
.ar17{
  position:absolute !important;
  right:1px;
}
.list__tile--active .delete, .history-link:hover .delete {
  display: inherit!important
}
</style>
