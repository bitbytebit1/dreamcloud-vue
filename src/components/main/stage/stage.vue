<template>
  <v-flex d-flex xs12 v-if="$store.getters.index !== -1">
    <video-stage></video-stage>
    <audio-stage></audio-stage>
    </v-layout>
  </v-flex>
  <v-flex offset-xs1 xs10 v-else class="mt-3">
    <div class="grey darken-2 white--text">
      <v-container fill-height>
        <v-layout align-center>
          <v-flex text-xs-center>
            <div class="display-2">Nothing playing</div>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <div class="display-1">¯\_(ツ)_/¯</div>
  </v-flex>
</template>
<script>
/* eslint-disable */
export default {
  name: 'stage'
}
</script>