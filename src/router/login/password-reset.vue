<template>
  <v-container fluid>
    <v-layout 
      row 
      wrap 
      justify-center 
      align-center
    >
      <v-flex 
        xs12 
        sm12 
        lg12 
        flexbox
      >
        <h3>Reset your password</h3>
      </v-flex>
      <br >
      <v-flex 
        xs12 
        sm6 
        lg4 
        flexbox
      >
        <v-text-field 
          v-model="email" 
          :rules="[() => validateEmail() || 'Please enter a valid email']" 
          required 
          label="Email Address" 
          validate-on-blur
        />
        <v-btn @click.prevent="reset">
          Reset
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// /* eslint-disable */
export default {
  name: 'Login',
  data () {
    return {
      email: '',
    }
  },
  computed: {
    toolTipClass () {
      return this.toolTipShow ? '' : 'hidden'
    }
  },
  methods: {
    validateEmail () {
      return !!this.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
    },
    reset () {
      if (this.validateEmail()) {
        this.$DCFB.fb.auth().sendPasswordResetEmail(this.email).then(
          () => {
            this.$store.dispatch('snack', { b: true, c:'green', s:'Check your email =3' })
          },
          () => {
            this.$store.dispatch('snack', { b: true, c:'red', s:'Sorry, no user with that account found' })
          }
        )
      }
    }
  }
}
</script>

<style scoped>
  /* "scoped" attribute limit the CSS to this component only */

  .hidden {
    display: none;
  }
</style>