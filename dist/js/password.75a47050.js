(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["password"],{"0ac7":function(e,t,a){},"694d":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{attrs:{fluid:""}},[a("v-layout",{attrs:{row:"",wrap:"","justify-center":"","align-center":""}},[a("v-flex",{attrs:{xs12:"",sm12:"",lg12:"",flexbox:""}},[a("h3",[e._v("Reset your password")])]),a("br"),a("v-flex",{attrs:{xs12:"",sm6:"",lg4:"",flexbox:""}},[a("v-text-field",{attrs:{rules:[function(){return e.validateEmail()||"Please enter a valid email"}],required:"",label:"Email Address","validate-on-blur":""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),a("v-btn",{on:{click:function(t){return t.preventDefault(),e.reset(t)}}},[e._v("\n        Reset\n      ")])],1)],1)],1)},n=[],i={name:"Login",data(){return{email:""}},computed:{toolTipClass(){return this.toolTipShow?"":"hidden"}},methods:{validateEmail(){return!!this.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)},reset(){this.validateEmail()&&this.$DCFB.fb.auth().sendPasswordResetEmail(this.email).then(()=>{this.$store.dispatch("snack",{b:!0,c:"green",s:"Check your email =3"})},()=>{this.$store.dispatch("snack",{b:!0,c:"red",s:"Sorry, no user with that account found"})})}}},r=i,l=(a("e71a"),a("2877")),o=a("6544"),c=a.n(o),u=a("8336"),d=a("a523"),f=a("0e8f"),h=a("a722"),m=a("2677"),v=Object(l["a"])(r,s,n,!1,null,"7bbcaef4",null);t["default"]=v.exports;c()(v,{VBtn:u["a"],VContainer:d["a"],VFlex:f["a"],VLayout:h["a"],VTextField:m["a"]})},e71a:function(e,t,a){"use strict";var s=a("0ac7"),n=a.n(s);n.a}}]);