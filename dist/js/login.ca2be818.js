(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"28c5":function(t,n,e){"use strict";e.r(n);var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-container",{attrs:{fluid:""}},[e("v-layout",{attrs:{row:"",wrap:"","justify-center":"","align-center":""}},[e("v-flex",{attrs:{xs12:"",lg5:"",flexbox:""}},[e("v-flex",{attrs:{xs12:""}},[e("h3",[t._v("Sign in with")])]),e("v-flex",{attrs:{xs10:"","offset-xs1":"","offset-lg2":"",lg8:""}},[t.bShowInput?e("form",{attrs:{target:"remember",method:"post",action:"/content/blank"},on:{submit:function(t){t.preventDefault()}}},[e("v-text-field",{attrs:{label:"Email","single-line":"",autocomplete:"on"},on:{keyup:function(n){return!n.type.indexOf("key")&&t._k(n.keyCode,"enter",13,n.key,"Enter")?null:t.signIn(n)}},model:{value:t.email,callback:function(n){t.email=n},expression:"email"}}),e("v-text-field",{attrs:{label:"Password","single-line":"",autocomplete:"on",type:"password"},on:{keyup:function(n){return!n.type.indexOf("key")&&t._k(n.keyCode,"enter",13,n.key,"Enter")?null:t.signIn(n)}},model:{value:t.password,callback:function(n){t.password=n},expression:"password"}}),e("h4",[t._v("Don't have an account yet? You can create one "),e("router-link",{attrs:{to:"/sign-up"}},[t._v("here")]),t._v(".")],1),e("h4",[e("router-link",{attrs:{to:"/password-reset"}},[t._v("Forgot your password?")])],1),e("br")],1):t._e()]),e("div",{staticClass:"text-xs-center"},[e("v-btn",{staticClass:"red",attrs:{loading:t.loading3,disabled:t.loading3,round:"",dark:""},on:{click:function(n){return n.preventDefault(),t.signInGoogle(n)}}},[t._v("Google\n          "),e("v-icon",{attrs:{right:""}},[t._v("lock")])],1)],1),e("div",{staticClass:"text-xs-center"},[e("v-btn",{attrs:{loading:t.loading1,disabled:t.loading1,color:"primary white--text",round:"",type:"submit"},on:{click:t.emailSignInClick}},[t._v("\n          Email\n          "),e("v-icon",{attrs:{right:""}},[t._v("lock")])],1)],1),e("div",{staticClass:"text-xs-center"},[e("v-btn",{staticClass:"blue darken-4",attrs:{loading:t.loading4,disabled:t.loading4,round:"",dark:""},on:{click:function(n){return n.preventDefault(),t.signInFB(n)}}},[t._v("Facebook\n          "),e("v-icon",{attrs:{right:""}},[t._v("lock")])],1)],1),e("div",{staticClass:"text-xs-center"},[e("v-btn",{staticClass:"grey darken-4",attrs:{loading:t.loading2,disabled:t.loading2,round:"",dark:""},on:{click:function(n){return n.preventDefault(),t.signInGitHub(n)}}},[t._v("GitHub\n          "),e("v-icon",{attrs:{right:""}},[t._v("lock")])],1)],1),e("iframe",{staticClass:"hidden",attrs:{id:"remember",name:"remember",src:""}})],1)],1)],1)},a=[],o=(e("a481"),{name:"Login",data:function(){return{bShowInput:!1,email:"",password:"",loading1:!1,loading2:!1,loading3:!1,loading4:!1}},methods:{emailSignInClick:function(){this.bShowInput&&this.signIn(),this.bShowInput=!0},signIn:function(){var t=this;this.loading1=!0,this.$DCFB.fb.auth().signInWithEmailAndPassword(this.email,this.password).then(function(n){t.$store.commit("authChange",!0),t.$DCFB.init(n.uid),t.loading1=!1,t.$router.replace("home")},function(n){t.$store.commit("authChange",!1),t.$store.dispatch("snack",{b:!0,c:"red",s:"Error upgrading anonymous account.\n"+n}),t.loading1=!1})},signInGitHub:function(){var t=this;this.loading2=!0,this.$DCFB.fb.auth().signInWithPopup(new this.$DCFB.fbb.auth.GithubAuthProvider).then(function(n){t.$store.commit("authChange",!0),t.$DCFB.init(n.uid),t.loading2=!1,t.$router.replace("home")}).catch(function(n){t.$store.dispatch("snack",{b:!0,c:"red",s:"Oops.\n"+n.message}),t.loading2=!1})},signInFB:function(){var t=this;this.loading4=!0,this.$DCFB.fb.auth().signInWithPopup(new this.$DCFB.fbb.auth.FacebookAuthProvider).then(function(n){t.$store.commit("authChange",!0),t.$DCFB.init(n.uid),t.loading4=!1,t.$router.replace("home")}).catch(function(n){t.$store.dispatch("snack",{b:!0,c:"red",s:"Oops.\n"+n.message}),t.loading2=!1})},signInGoogle:function(){var t=this,n=function(){t.$DCFB.fb.auth().signInWithPopup(new t.$DCFB.fbb.auth.GoogleAuthProvider).then(function(n){t.$DCFB.init(n.uid),t.$store.commit("authChange",!0),t.loading3=!1,t.$router.replace("home")}).catch(function(n){t.$store.dispatch("snack",{b:!0,c:"red",s:"Oops.\n"+n.message}),t.loading3=!1})};this.loading3=!0,this.$store.getters.isAnon?(this.$store.commit("authChange",!1),this.$nextTick(function(){t.$DCFB.fb.auth().signOut().then(n)})):n()}}}),s=o,r=(e("a754"),e("2877")),l=e("6544"),c=e.n(l),u=e("8336"),d=e("a5238"),h=e("0e8f"),g=e("132d"),f=e("a722"),p=e("2677"),b=Object(r["a"])(s,i,a,!1,null,"086dcb9a",null);n["default"]=b.exports;c()(b,{VBtn:u["a"],VContainer:d["a"],VFlex:h["a"],VIcon:g["a"],VLayout:f["a"],VTextField:p["a"]})},a754:function(t,n,e){"use strict";var i=e("bf84"),a=e.n(i);a.a},bf84:function(t,n,e){}}]);