(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["subsAll"],{"2c64":function(t,s,a){"use strict";var i=a("9f78"),e=a.n(i);e.a},"673e":function(t,s,a){"use strict";a("386b")("sub",function(t){return function(){return t(this,"sub","","")}})},"9f78":function(t,s,a){},d33b:function(t,s,a){"use strict";a.r(s);var i=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("v-flex",{key:t.$route.params.playlist,attrs:{xs12:"",lg10:"",flexbox:""}},[t.bLoading||t.aPlaylists2.length?a("div",{staticClass:"headline fwl text-xs-left pl-2 pt-2"},[t._v("Latest from your subscriptions")]):t._e(),t.bLoading||t.aPlaylists2.length?a("playlist",{attrs:{songs:t.aPlaylists,"show-uploaded":!0,"sort-by":"uploaded","rows-per-page":"50"}}):a("jumbo",{attrs:{title:"We wanted grab the latest songs from your subscriptions",subheading:"But you haven't subscribed to anyone yet"}})],1)},e=[],n=(a("55dd"),a("673e"),a("be94")),o=a("2f62"),l=a("a1b2"),u={name:"SubsAll",props:{user:{type:String,default:""}},components:{jumbo:l["a"]},watch:{auth_state:{immediate:!0,handler:"bind"}},data:function(){return{bLoading:!0,bFailed:!1,bLoadedSubs:0,aPlaylists:[],aPlaylists2:[],subscriptions:[]}},computed:Object(n["a"])({},Object(o["b"])({auth_state:"auth_state"})),methods:{bind:function(){this.auth_state&&(this.bLoading=!0,this.$store.dispatch("loadIndeterm",!0),this.$bindAsArray("subscriptions",this.$DCFB.subscriptionGet(this.user),null,this.getAllSubs))},getAllSubs:function(){var t=this;if(!this.subscriptions.length)return this.bLoading=!1,void(this.bFailed=!0);this.bLoadedSubs=0;var s=!1;for(var a in setTimeout(function(){s=!0,t.aPlaylists=t.aPlaylists2,t.$store.commit("loadValue",0),t.$store.dispatch("loadIndeterm",!1)},3e3),this.subscriptions)this.$DCAPI.searchInt(0,0,[this.subscriptions[a].source],this.subscriptions[a].id,function(a){t.bLoadedSubs+=1,!s&&t.$store.commit("loadValue",100/t.subscriptions.length*t.bLoadedSubs),t.aPlaylists2=t.aPlaylists2.concat(a),t.aPlaylists2.sort(t.$DCAPI.sortDate),(t.subscriptions.length===t.bLoadedSubs||s)&&(!s&&t.$store.commit("loadValue",0),t.aPlaylists=t.aPlaylists2)},!1,5)}}},r=u,b=(a("2c64"),a("2877")),d=a("6544"),c=a.n(d),h=a("0e8f"),p=Object(b["a"])(r,i,e,!1,null,null,null);p.options.__file="all.vue";s["default"]=p.exports;c()(p,{VFlex:h["a"]})}}]);