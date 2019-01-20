<template>
  <v-snackbar
    :value="$store.getters.snackb"
    :color="$store.getters.snackc"
    top
    auto-height
  >
    {{ $store.getters.snacks }}
    <v-btn
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
