<template>
  <v-container fluid>
    <v-layout row wrap justify-center align-center>
      <v-flex xs12 sm12 lg12 flexbox>
        <h3>Reset your password</h3>
      </v-flex>
      <br />
      <v-flex xs12 sm6 lg4 flexbox>
        <v-text-field required label="Email Address" v-model="email" :rules="[() =>  validateEmail() || 'Please enter a valid email']" validate-on-blur></v-text-field>
        <v-btn @click.prevent="reset">
          Reset
        </v-btn>
        <v-alert :color="alertColor" icon="check_circle" v-model="alertShow">
          {{alertMsg}}
        </v-alert>        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// /* eslint-disable */
export default {
  name: 'login',
  data () {
    return {
      email: '',
      alertShow: false,
      alertMsg: '',
      alertColor: ''
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
          (resp) => {
            this.alertColor = 'green'
            this.alertMsg = 'Check your email =3'
            this.alertShow = true
          },
          (err) => {
            this.alertColor = 'red'
            this.alertMsg = 'Sorry, no user with that account found'
            this.alertShow = true
            err++
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