<template>
  <v-snackbar
    :value="$store.getters.snackb"
    :color="$store.getters.snackc"
    :bottom="!$vuetify.breakpoint.smAndDown"
    :top="$vuetify.breakpoint.smAndDown"
    class="pb-5"
  >
    {{ $store.getters.snacks }}
    <v-btn
      v-if="$store.getters.snackul"
      dark
      flat
      @click="$store.dispatch('snacku')"
    >
      Undo
    </v-btn>
    <v-btn
      v-else
      dark
      flat
      @click="$store.commit('snackb', false)"
    >
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>
<script>
export default {
  computed: {
    // snackb() {
    //   return this.$store.getters.snackb
    // }
    snackb: {
      // getter
      get () {
        return this.$store.getters.snackb
      },
      // setter
      set (nV) {
        return this.$store.commit('snackb', nV)
      }
    }
  }
}
</script>
