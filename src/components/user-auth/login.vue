<template>
  <v-container fluid>
    <v-layout row wrap justify-center align-center>
      <v-flex xs12 lg6>
        <v-flex xs12>
          <h3>Sign In</h3>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3>
          <form target="remember" method="post" action="/content/blank">
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
            <v-btn type="submit" v-on:click="signIn">Sign In</v-btn>
          </form>
        </v-flex>
        <h5>You don't have an account? You can <router-link to="/sign-up">create one</router-link></h5>
        <h5><router-link to="/password-reset">Forgot your password?</router-link></h5>
        <iframe id="remember" name="remember" class="hidden" src=""></iframe>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {fb, DCFB} from '@/DCAPIs/DCFB.js'
  export default {
    name: 'login',
    data: function () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signIn: function () {
        fb.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            DCFB.init(user.uid)
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

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
  .hidden{
    display: none
  }
  .login {
    margin-top: 40px;
    width: 100%;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
  }
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>