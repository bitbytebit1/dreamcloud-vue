(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["signUp"],{"3d16":function(e,t,s){"use strict";var n=s("fc1e"),a=s.n(n);a.a},5274:function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-container",{attrs:{fluid:""}},[s("v-layout",{attrs:{row:"",wrap:"","justify-center":"","align-center":""}},[s("v-flex",{attrs:{xs12:"",lg5:""}},[s("v-flex",{attrs:{xs12:""}},[s("h3",[e._v("Create account")])]),s("v-flex",{attrs:{xs10:"","offset-xs1":"","offset-lg2":"",lg8:""}},[s("v-text-field",{attrs:{label:"Email","single-line":"",autocomplete:"on"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.signUp(t)}},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),s("v-text-field",{attrs:{type:e.showPassword?"text":"password","append-icon":e.showPassword?"visibility":"visibility_off",label:"Password","single-line":"",autocomplete:"on"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.signUp(t)},"click:append":function(t){e.showPassword=!e.showPassword}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),s("v-btn",{on:{click:e.signUp}},[e._v("Sign Up")]),s("h5",[e._v("or go back to "),s("router-link",{attrs:{to:"/login"}},[e._v("login")]),e._v(".")],1)],1)],1)],1)],1)},a=[],o={name:"SignUp",data(){return{email:"",password:"",showPassword:!1}},methods:{signUp(){this.$DCFB.fb.auth().createUserWithEmailAndPassword(this.email,this.password).then(()=>{this.$store.dispatch("snack",{b:!0,c:"green",s:"Logged in"}),this.$router.replace("user")},e=>{this.$store.dispatch("snack",{b:!0,c:"red",s:"Oops. "+e.message})})}}},i=o,r=(s("3d16"),s("2877")),l=s("6544"),c=s.n(l),d=s("8336"),p=s("a523"),u=s("0e8f"),f=s("a722"),w=s("2677"),h=Object(r["a"])(i,n,a,!1,null,"79951902",null);t["default"]=h.exports;c()(h,{VBtn:d["a"],VContainer:p["a"],VFlex:u["a"],VLayout:f["a"],VTextField:w["a"]})},fc1e:function(e,t,s){}}]);