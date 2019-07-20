(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"14b7":function(e,t,a){},"3c70":function(e,t,a){e.exports=a.p+"img/logo-blue.17e91fdf.png"},"5df1":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-flex",{staticClass:"ma-0 pa-0",attrs:{xs12:"",lg11:""}},[i("v-container",{attrs:{"grid-list-md":""}},[i("v-layout",{attrs:{row:"",wrap:"","justify-center":""}},[i("v-flex",{staticStyle:{height:"250px"},attrs:{xs12:""}},[i("img",{attrs:{height:"250",src:a("3c70")}})]),i("v-flex",{attrs:{xs12:"",lg12:""}},[i("autocomplete",{ref:"auto",on:{search:function(t){return e.$router.push({name:"searchQuery",params:{query:t,source:"all"}})}}})],1),i("v-dialog",{attrs:{width:"500"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[i("v-card",[i("v-card-title",{attrs:{"primary-title":""}},[i("div",{staticClass:"headline"},[e._v(e._s(e.items[e.cardIndex].headline))])]),i("v-divider"),i("v-card-text",{staticClass:"preline wordbreak",staticStyle:{height:"300px"}},[e._v(e._s(e.items[e.cardIndex].moreText))]),i("v-divider"),i("v-card-actions",[i("v-btn",{attrs:{color:"primary"},nativeOn:{click:function(t){e.dialog=!1}}},[e._v("Close")])],1)],1)],1),e._l(e.items,function(t,a){return i("v-flex",{key:a,staticClass:"pointer",attrs:{xs6:"",sm4:"",md3:"",lg2:""}},[i("v-card",{staticClass:"ma-0 elevation-5",attrs:{height:"100%",width:"100%"},on:{click:function(i){t.hasOwnProperty("cb")?t.cb.f():(e.cardIndex=a,e.dialog=!0)}}},[i("v-container",{staticClass:"ma-0 pa-0",attrs:{fluid:"","grid-list-xs":""}},[i("v-layout",{staticClass:"ma-0 pa-0",attrs:{row:"",wrap:""}},[i("v-flex",{attrs:{xs12:""}},[i("v-img",{attrs:{src:t.img,height:"150",contain:""}})],1),i("v-flex",{staticClass:"text-xs-left",attrs:{xs12:""}},[i("div",{staticClass:"h85px"},[i("div",{staticClass:"title font-weight-thin"},[e._v(e._s(t.headline))]),i("div",{staticClass:"grey--text preline"},[e._v(e._s(t.description))])])]),t.cb?i("v-flex",{attrs:{xs12:""}},[i("v-btn",{staticClass:"ma-0",class:e.$store.getters.textColor,attrs:{small:"",outline:"",block:"",color:"primary",dark:""},on:{click:function(e){return e.stopPropagation(),t.cb.f(e)}}},[i("span",{class:e.$store.getters.textColor},[e._v(e._s(t.cb.t))])])],1):e._e(),i("v-flex",{attrs:{xs12:""}},[i("v-btn",{staticClass:"ma-0",attrs:{small:"",outline:"",block:"",color:"primary",dark:""},on:{click:function(t){t.stopPropagation(),e.cardIndex=a,e.dialog=!0}}},[i("span",{class:e.$store.getters.textColor},[e._v("Read more")])])],1)],1)],1)],1),i("v-divider")],1)})],2)],1)],1)},o=[],s=a("b3af"),r={name:"About",components:{autocomplete:s["a"]},data(){return{cardIndex:0,dialog:!1,items:[{headline:"Search",description:"Bandcamp, Mixcloud, Soundcloud, YouTube and Vimeo",moreText:"Access the offical APIs provided by Mixcloud, Sound1cloud, YouTube and Vimeo to get your search results.",img:"./img/about/analytics.png",cb:{f:()=>{this.$refs.auto.$el.querySelector(".v-select__slot").click(),this.$refs.auto.$el.querySelector("input").focus()},t:"Search"},bShow:!1},{headline:"Subscriptions",description:"Keep an eye on your subscriptions\n\n",moreText:"Soon you'll be able to save and share your own favourite custom streams, artists can use this to show case all their work with one link.",img:"./img/about/star.png",cb:{f:()=>{this.$router.push({name:"userSubOverview",params:{user:this.$store.getters.uid}})},t:"Manage subscriptions"}},{headline:"Playlists",description:"Organise all your music in one place\n\n",moreText:"Save playlists from all your favourite channels across the internet. Instantly synced across all your devices.",img:"./img/about/turntable.png",cb:{f:()=>{this.$router.push({name:"playlistOverview",params:{user:this.$store.getters.uid}})},t:"View playlists"}},{headline:"Stay up to date",description:"Customizable home feeds from your favourite artists",moreText:"Create your own custom stream with the latest music from your favourite artists.",img:"./img/about/satellite.png",cb:{f:()=>{this.$router.push({name:"subsAll",params:{user:this.$store.getters.uid}})},t:"View subscriptions"}},{headline:"Vibrant Community",description:"Join our discord server and contribute to the development",moreText:"You're formally invited to come and tell me what you don't like.\n=]",img:"./img/about/discord.png",cb:{f:()=>{window.open("https://discord.gg/RzP7dwA","_blank")},t:"Join Discord"}},{headline:"One click download",description:"Batch download mp4 or mp3 with one smooth click",moreText:"Ok, maybe two clicks since we disable show options on hover, riot on discord and maybe we'll bring it back.",img:"./img/about/cloud.png"},{headline:"Always offline",description:"Everything cached locally for speed",moreText:"We believe in progress web apps, this website will locally cache itself. We are limited to a small portion of your local disk via the web browser, this space is only borrowed and will be used by your os if necessary.\n\n          Songs are cached for 2 weeks.\n          Searches are cached for 1 hour.\n          Playlists and subscriptions are cached forever.",img:"./img/about/dart.png"},{headline:"Unlimited use",description:"100% free with no limitations",moreText:"Dreamcloud currently costs next to nothing to run so we have no need to sell adverts.",img:"./img/about/pacman.png"},{headline:"Save energy",description:"Save data and battery life in audio mode",moreText:"The current mobile version defaults to audio only for youtube and vimeo saving bandwidth.\nIn future we're going to offer a very light weight version with restricted features for lower end mobiles.",img:"./img/about/energy.png"},{headline:"Cross platoform library",description:"Android, iOS, MacOSX, Windows and Linux",moreText:'We are working on a stand alone desktop app for Windows and Linux using Electron.\nIt\'s very easy install Dreamcloud to your home screen on mobiles\nAndroid: Open chrome then tap the hamburger menu, then tap "Add to homescreen".\niOS: Open safari then tape the share menu, then tap "Add to homescreen"',img:"./img/about/mobile.png"},{headline:"Share with friends",description:"One click sharing on desktop and mobile",moreText:"On desktop a link is copied to your keyboard.\nOn mobile the native share menu is opened.",img:"./img/about/share.png"},{headline:"Privacy",description:"Use a proxy or vpn",moreText:"If this is important to you shoot us a message",img:"./img/about/webcam.png"}]}}},n=r,l=(a("80e3"),a("2877")),c=a("6544"),d=a.n(c),u=a("8336"),m=a("b0af"),p=a("99d9"),h=a("12b2"),g=a("a523"),b=a("169a"),v=a("ce7e"),f=a("0e8f"),y=a("adda"),w=a("a722"),x=Object(l["a"])(n,i,o,!1,null,null,null);t["default"]=x.exports;d()(x,{VBtn:u["a"],VCard:m["a"],VCardActions:p["a"],VCardText:p["b"],VCardTitle:h["a"],VContainer:g["a"],VDialog:b["a"],VDivider:v["a"],VFlex:f["a"],VImg:y["a"],VLayout:w["a"]})},"80e3":function(e,t,a){"use strict";var i=a("14b7"),o=a.n(i);o.a}}]);