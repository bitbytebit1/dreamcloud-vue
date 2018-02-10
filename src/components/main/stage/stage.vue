<template>
  <v-flex d-flex xs12 v-if="$store.getters.index !== -1">
    <video-stage></video-stage>
    <audio-stage></audio-stage>
    </v-layout>
  </v-flex>
  <v-flex offset-xs1 xs10 v-else class="mt-3">
    <v-jumbotron color="grey darken-3 elevation-24" dark>
      <v-container fill-height>
        <v-layout align-center>
          <v-flex text-xs-center>
            <h3 class="display-3">Nothing playing</h3>
            <h2>¯\_(ツ)_/¯</h2>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
  </v-flex>
</template>
<script>
/* eslint-disable */
export default {
  name: 'stage'
}
</script>