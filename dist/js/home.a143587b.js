(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"73cf":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-flex",{attrs:{xs12:"",lg10:""}},[n("div",{staticClass:"headline fwl text-xs-left pl-2 pt-2"},[e._v("Recommended")]),n("playlist",{attrs:{"show-uploaded":!0,songs:e.aRecommended,infinite:""},on:{conmen:function(t){return e.$emit("conmen",t)}}})],1)},i=[],s=n("bc3a"),a=n.n(s),o=n("a1b2"),c=n("2f62");function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(n,!0).forEach(function(t){l(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d={name:"Home",components:{jumbo:o["a"]},data(){return{iLimit:this.$vuetify.breakpoint.xsOnly?3:10,sLastTrack:"",aRecommended:[],aHistory:[],bLoaded:!1}},watch:{auth_state:{immediate:!0,handler:"bind"}},activated(){this.bind()},methods:{bind(){this.auth_state&&this.$bindAsArray("aHistory",this.$DCFB.fbhistory.limitToLast(10),null,()=>{this.aHistory[0].trackID!=this.sLastTrack?(this.aRecommended=[],this.getRecommended(),console.log("getting history")):console.log("NOT getting history")})},getRecommended(){if(!this.aHistory.length)return void this.$DCAPI.searchInt(" ",0,["YouTube"],!1,e=>{e.length&&this.aRecommended.push(...this.$DCAPI.uniqueArray(e))},!1,50);var e=[];const t=this.$DCAPI.uniqueArray(this.aHistory.reverse()).slice(0,this.iLimit);let n=[];for(var r=0;r<t.length-1;r++)e.push(this.$DCAPI.searchInt("",0,[t[r].source],t[r].trackID,e=>{e.length&&(n=this.$DCAPI.uniqueArray([...n,...e]),this.aRecommended.push(...n))},!0,25));n=[],a.a.all(e).then(()=>{this.aRecommended=this.$DCAPI.uniqueArray(this.aRecommended),this.sLastTrack=this.aRecommended[0].trackID})}},computed:u({},Object(c["c"])({auth_state:e=>e.user.auth_state}))},m=d,p=n("2877"),b=n("6544"),f=n.n(b),y=n("0e8f"),g=Object(p["a"])(m,r,i,!1,null,null,null);t["default"]=g.exports;f()(g,{VFlex:y["a"]})}}]);