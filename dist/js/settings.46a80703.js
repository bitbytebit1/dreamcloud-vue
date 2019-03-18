(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["settings"],{"03a6":function(t,e,i){"use strict";var a=i("d471"),n=i.n(a);n.a},a71d:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.$store.getters.auth_state?i("v-flex",{staticClass:"ma-0",attrs:{xs10:"","offset-xs1":"",lg10:"","offset-lg1":""}},[i("div",{staticClass:"headline fwl text-xs-left pl-2 pt-2 pb-2"},[t._v("Settings")]),i("extra"),i("br"),i("account"),i("br"),i("ui"),i("br"),i("localStorage"),i("br"),i("hotkeys"),i("br"),i("theme"),i("br")],1):t._e()},n=[],s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ma-0 pa-0"},[i("h3",{staticClass:"text-xs-left pa-3"},[t._v("UI")]),i("v-divider",{staticClass:"primary"}),i("v-list",{attrs:{subheader:""}},[i("v-list-tile",{attrs:{ripple:""},on:{click:function(e){t.showVideo=!t.showVideo}}},[i("v-list-tile-content",[t._v("\n        Go to current tab on song click\n      ")]),i("v-list-tile-action",[i("v-switch",{staticClass:"fl-r pa-0 ma-0",attrs:{"hide-details":"",height:"20",color:"primary"},model:{value:t.showVideo,callback:function(e){t.showVideo=e},expression:"showVideo"}})],1)],1),i("v-divider")],1)],1)},o=[],l=i("cebc"),r=i("8a7b"),c=i("2f62"),d={watch:{showVideo:{immediate:!1,handler:"hShowVideo"},showWatchB:{immediate:!1,handler:"hShowWatchB"}},name:"theme",components:{"delete-button":r["a"]},data:function(){return{showVideo:this.$store.getters.showVideo,showWatchB:this.$store.getters.showWatchB}},methods:{hShowWatchB:function(t){this.showWatchB=t,this.settingChanged("Show Watch Button",this.showWatchB)},hShowVideo:function(t){this.showWshowVideoatchB=t,this.settingChanged("Show Video",this.showVideo)},settingChanged:function(t,e){this.$DCFB.settingChange(t,e),this.$store.commit("changeSetting",{setting:t,value:e})}},created:function(){},computed:Object(l["a"])({},Object(c["b"])({auth_state:"auth_state"}))},h=d,u=i("2877"),v=i("6544"),g=i.n(v),m=i("ce7e"),p=i("8860"),f=i("ba95"),b=i("40fe"),C=i("5d23"),y=i("b73d"),k=Object(u["a"])(h,s,o,!1,null,null,null),_=k.exports;g()(k,{VDivider:m["a"],VList:p["a"],VListTile:f["a"],VListTileAction:b["a"],VListTileContent:C["a"],VSwitch:y["a"]});var V=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ma-0 pa-0"},[i("h3",{staticClass:"text-xs-left pa-3"},[t._v("Theme")]),i("v-divider",{staticClass:"primary"}),i("v-list",{attrs:{subheader:""}},[i("v-list-tile",{attrs:{ripple:""},on:{click:function(e){return t.$refs.inColor1.click()}}},[i("v-list-tile-content",[t._v("\n        Primary colour\n      ")]),i("v-list-tile-action",[i("input",{ref:"inColor1",staticClass:"fl-r",attrs:{height:"1",type:"color"},domProps:{value:t.$vuetify.theme.primary},on:{input:t.setPrimary,change:t.setPrimary}})])],1),i("v-divider"),i("v-list-tile",{attrs:{ripple:""},on:{click:function(e){return t.$refs.inColor2.click()}}},[i("v-list-tile-content",[t._v("\n        Header/Footer colour\n      ")]),i("v-list-tile-action",[i("input",{ref:"inColor2",staticClass:"fl-r",attrs:{height:"1",type:"color",value:""},on:{input:t.setHeadFoot,change:t.setHeadFoot}})])],1),i("v-divider"),i("v-list-tile",{attrs:{ripple:""},on:{click:function(e){return t.$refs.inColor3.click()}}},[i("v-list-tile-content",[t._v("\n        Sidebars\n      ")]),i("v-list-tile-action",[i("input",{ref:"inColor3",staticClass:"fl-r",attrs:{height:"1",type:"color",value:""},on:{input:t.setSide,change:t.setSide}})])],1),i("v-divider"),i("v-list-tile",{attrs:{ripple:""},on:{click:function(e){return t.$refs.inColor4.click()}}},[i("v-list-tile-content",[t._v("\n        Outer body\n      ")]),i("v-list-tile-action",[i("input",{ref:"inColor4",staticClass:"fl-r",attrs:{height:"1",type:"color",value:""},on:{input:t.setApp,change:t.setApp}})])],1),i("v-divider"),i("v-list-tile",{attrs:{ripple:""},on:{click:function(e){return t.$refs.inColor5.click()}}},[i("v-list-tile-content",[t._v("\n        Inner body\n      ")]),i("v-list-tile-action",[i("input",{ref:"inColor5",staticClass:"fl-r",attrs:{height:"1",type:"color",value:""},on:{input:t.setCard,change:t.setCard}})])],1),i("v-divider"),i("v-list-tile",{attrs:{ripple:""},on:{click:function(e){!t.blackState&&t.nightMode()}}},[i("v-list-tile-content",[t._v("\n        Night Mode\n      ")]),i("v-list-tile-action",[i("v-switch",{staticClass:"fl-r pa-0 ma-0",attrs:{disabled:t.blackState,"hide-details":"",height:"20",color:"primary"},on:{change:function(e){!t.blackState&&t.nightMode()}},model:{value:t.nightState,callback:function(e){t.nightState=e},expression:"nightState"}})],1)],1),i("v-divider"),i("v-list-tile",{attrs:{ripple:""},on:{click:t.blackMode}},[i("v-list-tile-content",[t._v("\n        Black\n      ")]),i("v-list-tile-action",[i("v-switch",{staticClass:"fl-r pa-0 ma-0",attrs:{"hide-details":"",height:"20",color:"primary"},on:{change:t.blackMode},model:{value:t.blackState,callback:function(e){t.blackState=e},expression:"blackState"}})],1)],1),i("v-divider"),i("v-list-tile",{attrs:{ripple:""},on:{click:t.randomTheme}},[i("v-list-tile-content",[t._v("\n        Random\n      ")]),i("v-list-tile-action",[i("v-btn",{ref:"randomTheme",staticClass:"fl-r pa-0 ma-0",attrs:{small:"",icon:""},on:{click:t.randomTheme}},[i("v-icon",[t._v("cached")])],1)],1)],1),i("v-divider"),i("v-list-tile",{attrs:{ripple:""},on:{click:t.resetTheme}},[i("v-list-tile-content",[t._v("\n        Reset\n      ")]),i("v-list-tile-action",[i("v-btn",{ref:"resetTheme",staticClass:"fl-r pa-0 ma-0",attrs:{small:"",icon:""}},[i("v-icon",[t._v("restore")])],1)],1)],1),i("v-divider")],1)],1)},S=[],w=i("7618"),T=(i("6b54"),{name:"theme",components:{"delete-button":r["a"]},data:function(){return{nightState:this.$store.getters.nightMode,blackState:this.$store.getters.black}},methods:{rgb2html:function(t,e,i){var a=(t<<16|e<<8|i).toString(16).toUpperCase();return"#"+a},blackMode:function(){this.settingChanged("Black",this.blackState=!this.blackState),!this.nightState&&this.blackState&&this.settingChanged("Night Mode",this.nightState=!this.nightState)},nightMode:function(){this.settingChanged("Night Mode",this.nightState=!this.nightState)},randomColor:function(){return Math.round(127*Math.random())+127},setTheme:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=(arguments.length>2&&void 0!==arguments[2]&&arguments[2],arguments.length>3&&void 0!==arguments[3]?arguments[3]:"");this.setApp(t),this.setSide(e),this.setHeadFoot(base),this.setPrimary(i)},setCard:function(t){t=t.target.value,this.createClass(".v-card:not(.primary)","background-color: ".concat(t," !important;")),this.createClass(".v-tabs__bar","background-color: ".concat(t," !important;")),this.createClass(".v-datatable__actions","background-color: ".concat(t," !important;")),this.createClass(".v-table","background-color: ".concat(t," !important;"))},createClass:function(t,e){document.getElementById(t)&&document.getElementById(t).remove();var i=document.createElement("style");i.id=t,i.type="text/css",i.innerHTML="".concat(t," { ").concat(e," }"),document.getElementsByTagName("head")[0].appendChild(i)},deleteClass:function(t){document.getElementById(t).remove()},randomTheme:function(){var t=this.randomColor(),e=this.randomColor(),i=this.randomColor(),a=(this.randomColor(),this.randomColor(),this.randomColor(),this.randomColor(),this.randomColor(),this.randomColor(),.26*Math.random()+.14),n=t+a*(255-t),s=e+a*(255-e),o=i+a*(255-i),l=a+.15,r=t+l*(255-t),c=e+l*(255-e),d=i+l*(255-i),h="rgb("+t+","+e+","+i+")",u="rgb("+n+","+s+","+o+")",v="rgb("+r+","+c+","+d+")",g=this.rgb2html(Math.floor(255*Math.random()),Math.floor(255*Math.random()),Math.floor(255*Math.random()));this.setPrimary(g),this.setHeadFoot(h),this.setSide(u),this.setApp(v)},resetTheme:function(){this.$vuetify.theme.primary="#009688",document.getElementById("navbar").style.backgroundColor="",document.getElementById("foot").style.backgroundColor="",document.getElementById("sideleft").style.backgroundColor="",document.getElementById("right-draw").style.backgroundColor="",document.getElementById("app").style.backgroundColor="",this.deleteClass(".v-card:not(.primary)"),this.deleteClass(".v-tabs__bar"),this.deleteClass(".v-datatable__actions"),this.deleteClass(".v-table")},setPrimary:function(t){t="object"===Object(w["a"])(t)?t.target.value:t,this.$vuetify.theme.primary=t,this.settingChanged("themePrimary",t)},setHeadFoot:function(t){t="object"===Object(w["a"])(t)?t.target.value:t,document.getElementById("navbar").style.backgroundColor=t,document.getElementById("foot").style.backgroundColor=t,this.settingChanged("themeHeadFoot",t)},setSide:function(t){t="object"===Object(w["a"])(t)?t.target.value:t,document.getElementById("sideleft").style.backgroundColor=t,document.getElementById("right-draw").style.backgroundColor=t,this.settingChanged("themeSide",t)},setApp:function(t){t="object"===Object(w["a"])(t)?t.target.value:t,document.getElementById("app").style.backgroundColor=t,this.settingChanged("themeApp",t)},settingChanged:function(t,e){this.$DCFB.settingChange(t,e),this.$store.commit("changeSetting",{setting:t,value:e})}},computed:{x3:function(){}}}),x=T,B=(i("dbec"),i("8336")),L=i("132d"),$=Object(u["a"])(x,V,S,!1,null,null,null),A=$.exports;g()($,{VBtn:B["a"],VDivider:m["a"],VIcon:L["a"],VList:p["a"],VListTile:f["a"],VListTileAction:b["a"],VListTileContent:C["a"],VSwitch:y["a"]});var E=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ma-0 pa-0"},[i("h3",{staticClass:"text-xs-left pa-3"},[t._v("Local Storage")]),i("v-divider",{staticClass:"primary"}),i("v-list",{attrs:{subheader:""}},[i("v-list-tile",{attrs:{ripple:""},on:{click:function(){}}},[i("v-list-tile-content",[t._v("\n        Usage\n      ")]),i("v-list-tile-action",[t._v("\n        "+t._s(t.usage)+t._s(t.quota)+"\n      ")])],1),i("v-divider"),i("v-list-tile",{attrs:{ripple:""},on:{click:t.clearStorage}},[i("v-list-tile-content",[t._v("\n        Clear storage\n      ")]),i("v-list-tile-action",{staticClass:"text-xs-right"},[i("v-btn",{attrs:{icon:""}},[i("v-icon",[t._v("delete")])],1)],1)],1),i("v-divider")],1)],1)},M=[],I=i("795b"),j=i.n(I),O=(i("5df3"),i("ac6a"),{name:"localStorage",data:function(){return{percentage:0,quota:" of 0",usage:0}},created:function(){this.get_storage_estimate()},methods:{clearStorage:function(){var t=this,e="dreamcloud-precache-https://alphacloud.netlify.com/";caches.keys().then(function(i){return j.a.all(i.map(function(t){if(-1===e.indexOf(t))return caches.delete(t)})).then(function(){t.quota="",t.usage="Restart your browser to see current usage"})})},get_storage_estimate:function(){var t=this;this.get_storage_estimate_wrap().then(function(e){t.usage=t.$UTILS.formatBytes(e.usage),t.quota=" of "+t.$UTILS.formatBytes(e.quota)})},get_storage_estimate_wrap:function(){return"storage"in navigator&&"estimate"in navigator.storage?navigator.storage.estimate():"webkitTemporaryStorage"in navigator&&"queryUsageAndQuota"in navigator.webkitTemporaryStorage?new j.a(function(t,e){navigator.webkitTemporaryStorage.queryUsageAndQuota(function(e,i){t({usage:e,quota:i})},e)}):void 0}}}),F=O,D=Object(u["a"])(F,E,M,!1,null,null,null),W=D.exports;g()(D,{VBtn:B["a"],VDivider:m["a"],VIcon:L["a"],VList:p["a"],VListTile:f["a"],VListTileAction:b["a"],VListTileContent:C["a"]});var H=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ma-0 pa-0"},[i("h3",{staticClass:"text-xs-left pa-3"},[t._v("Hotkeys")]),i("v-divider",{staticClass:"primary"}),i("v-list",{attrs:{subheader:""}},[t._l(t.items,function(e,a){return[i("v-list-tile",{key:e.key,attrs:{ripple:""},on:{click:function(){}}},[i("v-list-tile-content",[t._v("\n          "+t._s(e.title)+"\n        ")]),i("v-list-tile-action",[t._v("\n          "+t._s(e.key)+"\n        ")])],1),i("v-divider",{key:a})]})],2)],1)},P=[],q={name:"hotkeys",data:function(){return{items:[{key:"Alt + Left",title:"Next song"},{key:"Alt + Right",title:"Previous song  "},{key:"Left",title:"Shuttle back 10 seconds"},{key:"Right",title:"Shuttle forward 10 seconds"},{key:"C",title:"Toggle current tab"},{key:"F",title:"Toggle fullscreen"},{key:"M",title:"Toggle mute"},{key:"Space",title:"Toggle play"},{key:"W",title:"Toggle widescreen"},{key:"Alt + Down",title:"Volume down"},{key:"Alt + Up",title:"Volume up"}]}}},U=q,N=Object(u["a"])(U,H,P,!1,null,null,null),R=N.exports;g()(N,{VDivider:m["a"],VList:p["a"],VListTile:f["a"],VListTileAction:b["a"],VListTileContent:C["a"]});var J=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ma-0 pa-0"},[i("h3",{staticClass:"text-xs-left pa-3"},[t._v("Account")]),i("v-divider",{staticClass:"primary"}),i("v-list",{attrs:{subheader:""}},[t.isAnon?i("v-list-tile",{attrs:{to:{name:"login"},ripple:""}},[i("v-list-tile-content",[t._v("\n        Login\n      ")]),i("v-list-tile-action",[i("v-btn",{attrs:{icon:""}},[i("v-icon",[t._v("face")])],1)],1)],1):t._e(),t.isAnon?t._e():i("v-list-tile",{attrs:{ripple:""},on:{click:t.logout}},[i("v-list-tile-content",[t._v("\n        Logout\n      ")]),i("v-list-tile-action",[i("v-btn",{attrs:{icon:""}},[i("v-icon",[t._v("pool")])],1)],1)],1),i("v-divider")],1)],1)},Q=[],G=(i("a481"),{name:"account",computed:Object(l["a"])({},Object(c["b"])({isAnon:"isAnon",uid:"uid"})),methods:{logout:function(){var t=this;this.$DCFB.fb.auth().signOut().then(function(){t.$router.replace("login")})}}}),z=G,K=Object(u["a"])(z,J,Q,!1,null,null,null),X=K.exports;g()(K,{VBtn:B["a"],VDivider:m["a"],VIcon:L["a"],VList:p["a"],VListTile:f["a"],VListTileAction:b["a"],VListTileContent:C["a"]});var Y=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ma-0 pa-0"},[i("h3",{staticClass:"text-xs-left pa-3"},[t._v("Extra")]),i("v-divider",{staticClass:"primary"}),i("v-list",{attrs:{subheader:""}},[i("v-list-tile",{attrs:{to:{name:"about"},ripple:""}},[i("v-list-tile-content",[t._v("\n        About\n      ")]),i("v-list-tile-action",[i("v-btn",{attrs:{icon:""}},[i("v-icon",[t._v("assistant")])],1)],1)],1),i("v-divider"),i("v-list-tile",{attrs:{to:{name:"tos"},ripple:""}},[i("v-list-tile-content",[t._v("\n        Terms of service\n      ")]),i("v-list-tile-action",[i("v-btn",{attrs:{icon:""}},[i("v-icon",[t._v("forum")])],1)],1)],1),i("v-divider")],1)],1)},Z=[],tt={name:"Extra"},et=tt,it=Object(u["a"])(et,Y,Z,!1,null,null,null),at=it.exports;g()(it,{VBtn:B["a"],VDivider:m["a"],VIcon:L["a"],VList:p["a"],VListTile:f["a"],VListTileAction:b["a"],VListTileContent:C["a"]});var nt={name:"Settings",components:{extra:at,account:X,hotkeys:R,theme:A,localStorage:W,ui:_},data:function(){return{nightState:this.$store.getters.nightModem,updated:""}}},st=nt,ot=(i("03a6"),i("0e8f")),lt=Object(u["a"])(st,a,n,!1,null,null,null);e["default"]=lt.exports;g()(lt,{VFlex:ot["a"]})},ae91:function(t,e,i){},d471:function(t,e,i){},dbec:function(t,e,i){"use strict";var a=i("ae91"),n=i.n(a);n.a}}]);