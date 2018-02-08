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
            <v-btn color="primary white--text" :loading="loading1" :disabled="loading1" round type="submit" v-on:click="signIn">
              Sign In
              <v-icon right dark>lock_open</v-icon>
            </v-btn>
            <br />
          </form>
        </v-flex>
        <div class="text-xs-center">
          <v-btn :loading="loading2" :disabled="loading2" round class="grey darken-4" dark @click.prevent="signInGitHub">Sign in with GitHub
            <v-icon right dark>lock_open</v-icon>
          </v-btn>
        </div>
        <div class="text-xs-center">
          <v-btn :loading="loading3" :disabled="loading3" round class="red" dark @click.prevent="signInGoogle">Sign in with Google
            <v-icon right dark>lock_open</v-icon>
          </v-btn>
        </div>
<!--         

                    <div class="text-xs-center">
                      <v-btn round color="blue" dark @click.prevent="onSigninFacebook">Login with Facebook
                        <v-icon right dark>lock_open</v-icon>
                      </v-btn>
                    </div>
                    <div class="text-xs-center">
                      <v-btn round dark @click.prevent="onSigninGithub">Login with Github
                        <v-icon right dark>lock_open</v-icon>
                      </v-btn>
                    </div>
                    <div class="text-xs-center">
                      <v-btn round color="light-blue" @click.prevent="onSigninTwitter">Login with Twitter
                        <v-icon right dark>lock_open</v-icon>
                      </v-btn>
                    </div> -->
        
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
        password: '',
        loading1: false,
        loading2: false,
        loading3: false
      }
    },
    methods: {
      signIn () {
        this.loading1 = true
        this.$DCFB.fb.auth().signInWithEmailAndPassword(this.email, this.password).then(
          user => {
            this.$store.commit('authChange', true)
            this.$DCFB.init(user.uid)
            this.loading1 = false
            this.$router.replace('home')
          },
          err => {
            this.$store.commit('authChange', false)
            alert('Oops. ' + err.message)
            this.loading1 = false
          }
        )
      },
      signInGitHub () {
        this.loading2 = true
        this.$DCFB.fb.auth().signInWithPopup(new this.$DCFB.fbb.auth.GithubAuthProvider())
          .then(
            user => {
              this.$store.commit('authChange', true)
              this.$DCFB.init(user.uid)
              this.loading2 = false
              this.$router.replace('home')
            }
          )
          .catch(
            err => {
              alert('Oops. ' + err.message)
              this.loading2 = false
            }
          )
      },
      signInGoogle () {
        this.loading3 = true
        this.$DCFB.fb.auth().signInWithPopup(new this.$DCFB.fbb.auth.GoogleAuthProvider())
          .then(
            user => {
              this.$store.commit('authChange', true)
              this.$DCFB.init(user.uid)
              this.loading3 = false
              this.$router.replace('home')
            }
          )
          .catch(
            err => {
              alert('Oops. ' + err.message)
              this.loading3 = false
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