<template>
  <div class="ma-0 pa-0">
    <h3 class="text-xs-left pa-3">Extra</h3>
    <v-divider class="primary"/>
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
            <v-icon>assistant</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>

      <!-- <v-list-tile
        :to="{name: 'explore'}"
        ripple
      >
        <v-list-tile-content>
          Explore
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon>
            <v-icon>public</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider></v-divider> -->
      
      <v-list-tile
        :to="{name: 'tos'}"
        ripple
      >
        <v-list-tile-content>
          Terms of service
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon>
            <v-icon>forum</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>
    </v-list>
  </div>
</template>
<script>
export default {
  name: 'Extra'
}
</script>
