<template>
  <v-container fluid>
    <v-layout 
      row 
      wrap 
      justify-center 
      align-center>
      <v-flex 
        xs12 
        lg5 
        flexbox>
        <v-flex xs12>
          <h3>Sign in with</h3>
        </v-flex>
        <v-flex 
          xs10 
          offset-xs1 
          offset-lg2 
          lg8>
          <form 
            v-if="bShowInput" 
            target="remember" 
            method="post" 
            action="/content/blank" 
            @submit.prevent>
            <v-text-field
              v-model="email"
              label="Email"
              single-line
              autocomplete="on"
              @keyup.enter="signIn"
            />  
            <v-text-field
              v-model="password"
              label="Password"
              single-line 
              autocomplete="on"
              type="password"
              @keyup.enter="signIn"
            />
            <h4>Don't have an account yet? You can create one <router-link to="/sign-up">here</router-link>.</h4>
            <h4><router-link to="/password-reset">Forgot your password?</router-link></h4>
            <br >
          </form>
        </v-flex>
        <div class="text-xs-center">
          <v-btn 
            :loading="loading3" 
            :disabled="loading3" 
            round 
            class="red" 
            dark 
            @click.prevent="signInGoogle">Google
            <v-icon right>lock</v-icon>
          </v-btn>
        </div>
        <div class="text-xs-center">
          <v-btn 
            :loading="loading1" 
            :disabled="loading1" 
            color="primary white--text" 
            round 
            type="submit" 
            @click="emailSignInClick">
            Email
            <v-icon right>lock</v-icon>
          </v-btn>
        </div>
        <div class="text-xs-center">
          <v-btn 
            :loading="loading4" 
            :disabled="loading4" 
            round 
            class="blue darken-4" 
            dark 
            @click.prevent="signInFB">Facebook
            <v-icon right>lock</v-icon>
          </v-btn>
        </div>
        <div class="text-xs-center">
          <v-btn 
            :loading="loading2" 
            :disabled="loading2" 
            round 
            class="grey darken-4" 
            dark 
            @click.prevent="signInGitHub">GitHub
            <v-icon right>lock</v-icon>
          </v-btn>
        </div>

        <iframe 
          id="remember" 
          name="remember" 
          class="hidden" 
          src=""/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        bShowInput: false,
        email: '',
        password: '',
        loading1: false,
        loading2: false,
        loading3: false,
        loading4: false
      }
    },
    methods: {
      emailSignInClick () {
        if (this.bShowInput) {
          this.signIn()
        }
        this.bShowInput = true
      },
      signIn () {
        this.loading1 = true
        // (Anonymous user is signed in at this point.)
        // 1. Create the email and password credential, to upgrade the anonymous user.
        // var credential = this.$DCFB.fb.auth.EmailAuthProvider.credential(this.email, this.password)
        // 2. Links the credential to the currently signed in user
        // (the anonymous user).
        // this.$DCFB.fb.auth().currentUser.linkWithCredential(credential).then((user) => {
        //   console.log('Anonymous account successfully upgraded', user)
        //   this.$store.commit('authChange', true)
        //   this.$DCFB.init(user.uid)
        //   this.loading1 = false
        //   this.$router.replace('home')
        // }, (error) => {
        //   console.log('Error upgrading anonymous account', error)
        //   this.$store.commit('authChange', false)
        //   alert('Error upgrading anonymous account. ' + error)
        //   this.loading1 = false
        // })
        this.$DCFB.fb.auth().signInWithEmailAndPassword(this.email, this.password).then(
          user => {
            this.$store.commit('authChange', true)
            this.$DCFB.init(user.uid)
            this.loading1 = false
            this.$router.replace('home')
          },
          err => {
            this.$store.commit('authChange', false)
            alert('Error upgrading anonymous account. ' + err)
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
      signInFB () {
        this.loading4 = true
        this.$DCFB.fb.auth().signInWithPopup(new this.$DCFB.fbb.auth.FacebookAuthProvider())
          .then(
            user => {
              this.$store.commit('authChange', true)
              this.$DCFB.init(user.uid)
              this.loading4 = false
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
        const func = () => {
          this.$DCFB.fb.auth().signInWithPopup(new this.$DCFB.fbb.auth.GoogleAuthProvider())
            .then(
              user => {
                // console.log(user)
                this.$DCFB.init(user.uid)
                this.$store.commit('authChange', true)
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
        this.loading3 = true
        if (this.$store.getters.isAnon) {
          // console.log('Logging in with Gmail but already anon')
          this.$store.commit('authChange', false)
          this.$nextTick(() => {
            this.$DCFB.fb.auth().signOut().then(func)
          })
        } else {
          func()
        }
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