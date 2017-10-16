<template>
  <div class="login">
    <h3>Sign In</h3>
    <form target="remember" method="post" action="/content/blank">
      <input autocomplete="on" type="text" v-model="email" placeholder="Email"><br>
      <input autocomplete="on" v-on:keyup.enter="signIn" type="password" v-model="password" placeholder="Password"><br>
      <button type="submit" v-on:click="signIn">Connection</button>
    </form>
    <p>You don't have an account ? You can <router-link to="/sign-up">create one</router-link></p>
    <iframe id="remember" name="remember" class="hidden" src=""></iframe>

  </div>
</template>

<script>
  import firebase from 'firebase'

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
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
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