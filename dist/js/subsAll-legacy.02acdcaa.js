(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["subsAll"],{d33b:function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=this,e=s.$createElement,i=s._self._c||e;return i("v-flex",{staticClass:"mb-5",attrs:{xs12:"",lg10:""}},[s.subscriptions.length?i("v-flex",{attrs:{xs12:"","py-3":""}},[s.subscriptions.length>0?i("span",[i("v-chip",{on:{click:function(t){s.bTog=!s.bTog}}},[s._v(s._s(s.bTog?"Hide":"Show"))]),i("v-chip",{class:s.chips.length==s.subscriptions.length?"primary white--text":"",on:{click:function(t){s.chips.length!=s.subscriptions.length?s.chips=s.subscriptions:s.chips=[]}}},[s._v("All")]),i("v-chip",{class:s.bShuf?"primary white--text":"",on:{click:function(t){s.chips=s.shuffle(s.subscriptions)}}},[s._v("Random")]),i("v-chip",{on:{click:function(t){s.chips=[]}}},[s._v("Clear")])],1):s._e(),s.bTog?i("v-text-field",{ref:"search",staticClass:"filter ma-0 pa-0 px-5",attrs:{"append-icon-cb":function(){t.search="",s.$refs.search.focus()},"append-icon":this.slen?"close":"",color:"primary",placeholder:"Filter",onfocus:"this.placeholder = ''",onblur:"this.placeholder = 'Filter'","single-line":"","hide-details":""},on:{keyup:function(t){return!t.type.indexOf("key")&&s._k(t.keyCode,"enter",13,t.key,"Enter")?null:s.$UTILS.closeSoftMobi()}},model:{value:s.search,callback:function(t){s.search=t},expression:"search"}}):s._e(),i("br"),s._l(s.cFiltered,function(t,e){return i("v-chip",{directives:[{name:"show",rawName:"v-show",value:s.bTog,expression:"bTog"}],key:e,staticClass:"noSel",class:s.someChips(t),on:{mousedown:function(i){return s.hai(t,e)}}},[i("v-avatar",{attrs:{outclass:"accent white--text"}},[i("img",{attrs:{src:t.img}})]),s._v(s._s(t.name)+"\n    ")],1)}),s.bTog&&s.cFiltered.length>50?i("div",[i("v-chip",{on:{click:function(t){s.bTog=!s.bTog}}},[s._v(s._s(s.bTog?"Hide":"Show"))]),i("v-chip",{class:s.chips.length==s.subscriptions.length?"primary white--text":"",on:{click:function(t){s.chips.length!=s.subscriptions.length?s.chips=s.subscriptions:s.chips=[]}}},[s._v("All")]),i("v-chip",{class:s.bShuf?"primary white--text":"",on:{click:function(t){s.chips=s.shuffle(s.subscriptions)}}},[s._v("Random")]),i("v-chip",{on:{click:function(t){s.chips=[]}}},[s._v("Clear")])],1):s._e()],2):s._e(),i("playlist",{staticClass:"pt-2",attrs:{songs:s.aFiltered,"show-uploaded":!0,infinite:"","sort-by":"uploaded"},on:{conmen:function(t){return s.$emit("conmen",t)}}}),!s.bLoading&&s.subscriptions.length>0?i("jumbo",{attrs:{title:"We wanted grab the latest songs from your subscriptions",subheading:"But you haven't subscribed to anyone yet"}}):s._e()],1)},n=[],r=e("2f62"),o=e("a1b2");function c(t,s){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);s&&(i=i.filter(function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable})),e.push.apply(e,i)}return e}function a(t){for(var s=1;s<arguments.length;s++){var e=null!=arguments[s]?arguments[s]:{};s%2?c(e,!0).forEach(function(s){l(t,s,e[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):c(e).forEach(function(s){Object.defineProperty(t,s,Object.getOwnPropertyDescriptor(e,s))})}return t}function l(t,s,e){return s in t?Object.defineProperty(t,s,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[s]=e,t}var u={name:"SubsAll",props:{user:{type:String,default:""}},components:{jumbo:o["a"]},watch:{auth_state:{immediate:!0,handler:"bind"}},data:function(){return{search:"",bShuf:!1,aShuf:[],bLoading:!0,bFailed:!1,bLoadedSubs:0,aPlaylists:[],aPlaylists2:[],subscriptions:[],chips:[],chipsToGo:[],bTog:!0}},computed:a({},Object(r["c"])({auth_state:function(t){return t.user.auth_state}}),{},Object(r["b"])(["textColor"]),{aFiltered:function(){var t=this;return this.chips.length?this.aPlaylists.filter(function(s){return t.chips.some(function(t){return t.id==s.artistID})}):[]},slen:function(){return this.search.length},cFiltered:function(){var t=this.search.toLowerCase();return this.slen?this.subscriptions.filter(function(s){return Object.values(s).some(function(s){return!!s&&s.toString().toLowerCase().indexOf(t)>-1})}):this.subscriptions}}),methods:{shuffle:function(t){for(var s=[],e=Math.floor(Math.random()*(t.length/2)+1),i=0;i<e;i++){var n=i+Math.floor(Math.random()*(t.length-i));s[i]=t[n]}return s},someChips:function(t){return!!this.chips.some(function(s){return s[".key"]==t[".key"]})&&"primary ".concat(this.textColor)},hai:function(t){this.someChips(t)?1==this.chips.length?this.chips=[]:this.chips=this.chips.filter(function(s){return s!==t}):this.chips.push(t)},bind:function(){var t=this;this.auth_state&&(this.bLoading=!0,this.$bindAsArray("subscriptions",this.$DCFB.subscriptionGet(this.user).orderByChild("name_lower"),null,function(){t.getAllSubs()}))},getAllSubs:function(){var t=this;if(!this.subscriptions.length)return this.bLoading=!1,void(this.bFailed=!0);this.bLoadedSubs=0;var s=!1;for(var e in setTimeout(function(){s=!0,t.aPlaylists=t.aPlaylists2},1e3),this.subscriptions)this.$DCAPI.searchInt(0,0,[this.subscriptions[e].source],this.subscriptions[e].id,function(e){t.bLoadedSubs+=1,t.aPlaylists2=t.aPlaylists2.concat(e),t.aPlaylists2.sort(t.$DCAPI.sortDate),(t.subscriptions.length===t.bLoadedSubs||s)&&(t.aPlaylists=t.aPlaylists2)},!1,50)}}},h=u,p=e("2877"),b=e("6544"),f=e.n(b),d=e("8212"),g=e("cc20"),v=e("0e8f"),y=e("2677"),m=Object(p["a"])(h,i,n,!1,null,null,null);s["default"]=m.exports;f()(m,{VAvatar:d["a"],VChip:g["a"],VFlex:v["a"],VTextField:y["a"]})}}]);