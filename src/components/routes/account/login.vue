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
            <v-btn round type="submit" v-on:click="signIn">Sign In</v-btn>
            <br />
          </form>
        </v-flex>
        
                    <div class="text-xs-center">
                      <v-btn round class="red" dark :disabled="loading" :loading="loading" @click.prevent="onSigninGoogle">Login with Google
                        <v-icon right dark>lock_open</v-icon>
                        <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                      </v-btn>
                    </div>
                    <div class="text-xs-center">
                      <v-btn round primary dark :disabled="loading" :loading="loading" @click.prevent="onSigninFacebook">Login with Facebook
                        <v-icon right dark>lock_open</v-icon>
                        <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                      </v-btn>
                    </div>
                    <div class="text-xs-center">
                      <v-btn round dark :disabled="loading" :loading="loading" @click.prevent="onSigninGithub">Login with Github
                        <v-icon right dark>lock_open</v-icon>
                        <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                      </v-btn>
                    </div>
                    <div class="text-xs-center">
                      <v-btn round info dark :disabled="loading" :loading="loading" @click.prevent="onSigninTwitter">Login with Twitter
                        <v-icon right dark>lock_open</v-icon>
                        <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                      </v-btn>
                    </div>
        
        <h5>Don't have an account yet? You can create one <router-link to="/sign-up">here</router-link>.</h5>
        <h5><router-link to="/password-reset">Forgot your password?</router-link></h5>
        <iframe id="remember" name="remember" class="hidden" src=""></iframe>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signIn () {
        this.$DCFB.fb.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$DCFB.init(user.uid)
            this.$router.replace('home')
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
    /* margin: 10px 0; */
    /* width: 20%; */
    padding: 15px;
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