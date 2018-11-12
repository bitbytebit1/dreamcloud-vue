<template>
  <v-flex 
    xs10 
    xl8
  >
    <h1 class="display-1 fwl">Index for user {{ $route.params.user.substring(0,6) }}</h1>
    <v-container grid-list-lg>
        
      <v-layout 
        row 
        wrap
      >
        <v-flex 
          v-for="item in items" 
          :key="item.index" 
          xs12
        >
          <v-card 
            :to="item.route" 
            color="" 
            class=""
          >
            <v-container 
              fluid 
              grid-list-lg
            >
              <v-layout row>
                <v-flex xs7>
                  <div>
                    <div class="headline">{{ item.text }}</div>
                  </div>
                </v-flex>
                <v-flex xs5>
                  <v-icon large>{{ item.icon }}</v-icon>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  name: 'UserOverview',
  // mixins: [DCFB],
  computed: {
    items () {
      return [
        { 
          text: 'Library',
          route: {name: 'playlistsAll', params: {user: this.$route.params.user}},
          icon: 'account_balance'
        },
        { 
          text: 'Home',
          route: {name: 'historyRecommended', params: {user: this.$route.params.user}},
          icon: 'home'
        },
        { 
          text: 'Playlists',
          route: {name: 'playlistOverview', params: {user: this.$route.params.user}},
          icon: 'list'
        },
        { 
          text: 'Subscriptions',
          route: {name: 'userSubOverview', params: {user: this.$route.params.user}},
          icon: 'people'
        },
        { 
          text: 'Latest from subscriptions',
          route: {name: 'subsAll', params: {user: this.$route.params.user}},
          icon: 'loyalty'
        }
      ]
    }
  }
}
</script>