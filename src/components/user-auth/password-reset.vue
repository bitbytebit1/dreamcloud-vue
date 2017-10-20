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
/* eslint-disable */
import { fb } from '@/DCAPIs/DCFB.js'
export default {
  name: 'login',
  data: function () {
    return {
      email: '',
      alertShow: false,
      alertMsg: '',
      alertColor: ''
    }
  },
  computed: {
    toolTipClass: function () {
      return this.toolTipShow ? '' : 'hidden'
    }
  },
  methods: {
    validateEmail: function () {
      return !!this.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
    },
    reset: function () {
      if (this.validateEmail()) {
        fb.auth().sendPasswordResetEmail(this.email).then(
          (resp) => {
            this.alertColor = 'green'
            this.alertMsg = 'Check your email =3'
            this.alertShow = true
          },
          (err) => {
            this.alertColor = 'red'
            this.alertMsg = 'Sorry, no user with that account found'
            this.alertShow = true
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