<template>
  <v-flex xl12 flexbox>
    <p>Let's create a new account !</p>
    <input v-model="email" type="text" placeholder="Email"><br>
    <input v-model="password" type="password" placeholder="Password"><br>
    <button v-on:click="signUp">Sign Up</button>
    <span>or go back to <router-link to="/login">login</router-link>.</span>
  </v-flex>
</template>

<script>
  /* eslint-disable */
  import {fb, DCFB} from '@/DCAPIs/DCFB.js'
  export default {
    name: 'signUp',
  data () {
    return {
      email: '',
      password: ''
    }
  },
    methods: {
      signUp: function () {
        fb.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            DCFB.setUpUserAccount(user.uid)
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
  button {
    margin-top: 10px;
    width: 10%;
    cursor: pointer;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
</style>