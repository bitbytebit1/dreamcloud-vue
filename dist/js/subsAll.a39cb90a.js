(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["subsAll"],{"673e":function(t,s,i){"use strict";i("386b")("sub",function(t){return function(){return t(this,"sub","","")}})},d33b:function(t,s,i){"use strict";i.r(s);var e=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("v-flex",{staticClass:"mb-5",attrs:{xs12:"",lg10:""}},[i("v-combobox",{attrs:{items:t.subscriptions,label:"Subscriptions","item-text":"name","item-value":"id","small-chips":"",clearable:"","single-line":"","prepend-icon":"filter_list","append-icon":"","append-cb":"",multiple:""},scopedSlots:t._u([{key:"selection",fn:function(s){return[i("v-chip",{key:JSON.stringify(s.item),staticClass:"v-chip--select-multi primary v-chip--removable ",attrs:{selected:s.selected,disabled:s.disabled,small:"",close:""},on:{click:function(t){t.stopPropagation(),s.parent.selectedIndex=s.index},input:function(t){return s.parent.selectItem(s.item)}}},[i("v-avatar",{staticClass:"accent white--text"},[i("img",{attrs:{src:s.item.img}})]),t._v("\n        "+t._s(s.item.name)+"\n      ")],1)]}}]),model:{value:t.chips,callback:function(s){t.chips=s},expression:"chips"}}),t.subscriptions.length?i("v-flex",{attrs:{xs12:""}},[i("div",[i("v-btn",{staticClass:"text-xs-center",attrs:{block:""},on:{click:function(s){t.chipsToGo=[],t.chips=[]}}},[t._v("\n        Clear\n      ")])],1),t.subscriptions.length>0?i("v-chip",{on:{click:function(s){t.chipsToGo.length!=t.subscriptions.length?t.chipsToGo=t.subscriptions:t.chipsToGo=[]}}},[t._v("All")]):t._e(),t._l(t.subscriptions,function(s,e){return i("v-chip",{key:e,staticClass:"noSel",class:t.someChips(s),on:{mousedown:function(i){return t.hai(s,e)}}},[i("v-avatar",{staticClass:"accent white--text"},[i("img",{attrs:{src:s.img}})]),t._v("\n      "+t._s(s.name)+"\n    ")],1)}),i("div",[i("v-btn",{staticClass:"text-xs-center",class:t.chipsToGo.length?"primary":"",attrs:{block:""},on:{click:function(s){t.chips=t.chipsToGo}}},[t._v("\n        Go\n      ")])],1)],2):t._e(),t.aFiltered.length?i("playlist",{attrs:{songs:t.aFiltered,"show-uploaded":!0,"sort-by":"uploaded","rows-per-page":"50"},on:{conmen:function(s){return t.$emit("conmen",s)}}}):t._e(),!t.bLoading&&t.subscriptions.length>0?i("jumbo",{attrs:{title:"We wanted grab the latest songs from your subscriptions",subheading:"But you haven't subscribed to anyone yet"}}):t._e()],1)},n=[],o=(i("55dd"),i("673e"),i("cebc")),a=i("2f62"),c=i("a1b2"),l={name:"SubsAll",props:{user:{type:String,default:""}},components:{jumbo:c["a"]},watch:{auth_state:{immediate:!0,handler:"bind"}},data:function(){return{bLoading:!0,bFailed:!1,bLoadedSubs:0,aPlaylists:[],aPlaylists2:[],subscriptions:[],chips:[],chipsToGo:[]}},computed:Object(o["a"])({},Object(a["b"])({auth_state:"auth_state"}),{aFiltered:function(){var t=this;return this.chips.length?this.aPlaylists.filter(function(s){return t.chips.some(function(t){return t.id==s.artistID})}):[]}}),methods:{someChips:function(t){return!!this.chipsToGo.some(function(s){return s[".key"]==t[".key"]})&&"primary"},hai:function(t){this.someChips(t)?1==this.chipsToGo.length?this.chipsToGo=[]:(this.chips=this.chips.filter(function(s){return s!==t}),this.chipsToGo=this.chipsToGo.filter(function(s){return s!==t})):this.chipsToGo.push(t)},bind:function(){this.auth_state&&(this.bLoading=!0,this.$store.dispatch("loadIndeterm",!0),this.$bindAsArray("subscriptions",this.$DCFB.subscriptionGet(this.user).orderByChild("name"),null,this.getAllSubs))},getAllSubs:function(){var t=this;if(!this.subscriptions.length)return this.bLoading=!1,void(this.bFailed=!0);this.bLoadedSubs=0;var s=!1;for(var i in setTimeout(function(){s=!0,t.aPlaylists=t.aPlaylists2,t.$store.commit("loadValue",0),t.$store.dispatch("loadIndeterm",!1)},1e3),this.subscriptions)this.$DCAPI.searchInt(0,0,[this.subscriptions[i].source],this.subscriptions[i].id,function(i){t.bLoadedSubs+=1,!s&&t.$store.commit("loadValue",100/t.subscriptions.length*t.bLoadedSubs),t.aPlaylists2=t.aPlaylists2.concat(i),t.aPlaylists2.sort(t.$DCAPI.sortDate),(t.subscriptions.length===t.bLoadedSubs||s)&&(!s&&t.$store.commit("loadValue",0),t.aPlaylists=t.aPlaylists2)},!1,50)}}},r=l,u=i("2877"),h=i("6544"),p=i.n(h),b=i("8212"),d=i("8336"),m=i("cc20"),f=i("2b5d"),v=i("0e8f"),g=Object(u["a"])(r,e,n,!1,null,null,null);s["default"]=g.exports;p()(g,{VAvatar:b["a"],VBtn:d["a"],VChip:m["a"],VCombobox:f["a"],VFlex:v["a"]})}}]);