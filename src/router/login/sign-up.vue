<template>
  <v-container fluid>
    <v-layout row wrap justify-center align-center>
      <v-flex xs12 lg5>
        <v-flex xs12>
          <h3>Create account</h3>
        </v-flex>
        <v-flex xs10 offset-xs1 offset-lg2 lg8>
          <v-text-field
            label="Email"
            single-line
            v-model="email"
            autocomplete="on"
            v-on:keyup.enter="signIn"
          ></v-text-field>  
          <v-text-field
            label="Password"
            single-line
            v-model="password" 
            autocomplete="on"
            v-on:keyup.enter="signIn"
            type="password"
          ></v-text-field>    
          <v-btn v-on:click="signUp">Sign Up</v-btn>
          <h5>or go back to <router-link to="/login">login</router-link>.</h5>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  // /* eslint-disable */
  export default {
    name: 'signUp',
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signUp () {
        this.$DCFB.fb.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('user')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        )
      }
    }
  }
</script>

<style scoped>
  .sign-up{
    width: 100%;
  }
  .signUp {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
</style>