<template>
  <div class="ma-0 pa-0">
    <h3 class="text-xs-left pa-3">Theme</h3>
    <v-divider class="primary"/>

    <v-list subheader>
      <v-list-tile
        ripple
        @click="blackState ? '' : nightMode()"
      >
        <v-list-tile-content>
          Night
        </v-list-tile-content>
        <!-- ~~~~~~~~~~~~~~~~~~ -->
        <v-list-tile-action>
          <v-switch 
            :disabled="blackState" 
            v-model="nightState" 
            hide-details 
            height="20" 
            color="primary" 
            class="fl-r pa-0 ma-0" 
            @change="blackState ? '' : nightMode()"
          />
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>
      <v-list-tile
        ripple
        @click="blackMode"
      >
        <v-list-tile-content>
          Black
        </v-list-tile-content>
        <!-- ~~~~~~~~~~~~~~~~~~ -->
        <v-list-tile-action>
          <v-switch 
            v-model="blackState" 
            hide-details 
            height="20" 
            color="primary" 
            class="fl-r pa-0 ma-0" 
            @change="blackMode"
          />
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>
      <v-list-tile
        ripple
        @click="$refs.inColor1.click()"
      >
        <v-list-tile-content>
          Primary colour
        </v-list-tile-content>
        <!-- ~~~~~~~~~~~~~~~~~~ -->
        <v-list-tile-action>
          <input 
            ref="inColor1" 
            :value="$vuetify.theme.primary" 
            height="1" 
            class="fl-r" 
            type="color" 
            @input="setPrimary" 
            @change="setPrimary"
          >
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>
          
      <v-list-tile
        ripple
        @click="$refs.inColor2.click()"
      >
        <v-list-tile-content>
          Header/Footer colour
        </v-list-tile-content>
        <!-- ~~~~~~~~~~~~~~~~~~ -->
        <v-list-tile-action>
          <input 
            ref="inColor2" 
            height="1" 
            class="fl-r" 
            type="color" 
            value="" 
            @input="setHeadFoot" 
            @change="setHeadFoot"
          >
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>
          
      <v-list-tile
        ripple
        @click="$refs.inColor3.click()"
      >
        <v-list-tile-content>
          Sidebars
        </v-list-tile-content>
        <!-- ~~~~~~~~~~~~~~~~~~ -->
        <v-list-tile-action>
          <input 
            ref="inColor3" 
            height="1" 
            class="fl-r" 
            type="color" 
            value="" 
            @input="setSide" 
            @change="setSide"
          >
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>
          
      <v-list-tile
        ripple
        @click="$refs.inColor4.click()"
      >
        <v-list-tile-content>
          Outer body
        </v-list-tile-content>
        <!-- ~~~~~~~~~~~~~~~~~~ -->
        <v-list-tile-action>
          <input 
            ref="inColor4" 
            height="1" 
            class="fl-r" 
            type="color" 
            value="" 
            @input="setApp" 
            @change="setApp"
          >
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>

          
      <v-list-tile
        ripple
        @click="$refs.inColor5.click()"
      >
        <v-list-tile-content>
          Inner body
        </v-list-tile-content>
        <!-- ~~~~~~~~~~~~~~~~~~ -->
        <v-list-tile-action>
          <input 
            ref="inColor5" 
            height="1" 
            class="fl-r" 
            type="color" 
            value="" 
            @input="setCard" 
            @change="setCard"
          >
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>
      <v-list-tile
        ripple
        @click="randomTheme"
      >
        <v-list-tile-content>
          Random
        </v-list-tile-content>
        <!-- ~~~~~~~~~~~~~~~~~~ -->
        <v-list-tile-action>
          <v-btn 
            ref="randomTheme" 
            small 
            icon 
            class="fl-r pa-0 ma-0" 
            @click="randomTheme"
          >
            <v-icon>cached</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>
          
          
      <v-list-tile
        ripple
        @click="resetTheme"
      >
        <v-list-tile-content>
          Reset
        </v-list-tile-content>
        <!-- ~~~~~~~~~~~~~~~~~~ -->
        <v-list-tile-action>
          <v-btn 
            ref="resetTheme" 
            small 
            icon 
            class="fl-r pa-0 ma-0"
          >
            <v-icon>restore</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>
    </v-list>

  </div>
</template>
<script>
/* eslint-disable */
import deleteButton from '@/components/buttons/delete-button'
export default {
  name: 'theme',
  components: {
    'delete-button': deleteButton
  },
  data () {
    return {
      nightState: this.$store.getters.nightMode,
      blackState: this.$store.getters.black
    }
  },
  methods: {
    rgb2html (r, g, b) {
      var rgb = (r << 16 | g << 8 | b).toString(16).toUpperCase()
      // var rgb = b | (g << 8) | (r << 16)
      return '#' + rgb
    },
    blackMode () {
      // console.log('black')
      this.settingChanged('Black', this.blackState = ! this.blackState)
      if (!this.nightState && this.blackState) {
        this.settingChanged('Night Mode', this.nightState = !this.nightState)
      }
    },
    nightMode () {
      // console.log('night')
      this.settingChanged('Night Mode', this.nightState = !this.nightState)
    },
    randomColor (){
        return (Math.round(Math.random()* 127) + 127)
        // return Math.floor(Math.random() * 255)
    },
    setTheme (app = '', sidebar = '', head = '', primary = '') {
      this.setApp(app)
      this.setSide(sidebar)
      this.setHeadFoot(base)
      this.setPrimary(primary)
      // this.settingChanged('Theme', {app: app, sidebar: sidebar, head: head, primary: primary})
    },
    setCard (sColor) {
      sColor = sColor.target.value
      this.createClass('.v-card:not(.primary)', `background-color: ${sColor} !important;`)
      this.createClass('.v-tabs__bar', `background-color: ${sColor} !important;`)
      this.createClass('.v-datatable__actions', `background-color: ${sColor} !important;`)
      this.createClass('.v-table', `background-color: ${sColor} !important;`)
    },
    createClass(name, rules){
      if (document.getElementById(name)) {
        document.getElementById(name).remove()
      }
      var style = document.createElement('style')
      style.id = name
      style.type = 'text/css';
      style.innerHTML = `${name} { ${rules} }`
      document.getElementsByTagName('head')[0].appendChild(style)
    },
    deleteClass (name) {
      document.getElementById(name).remove()
    },
    randomTheme () {
      var r1 = this.randomColor()
      var g1 = this.randomColor()
      var b1 = this.randomColor()
      var r2 = this.randomColor()
      var g2 = this.randomColor()
      var b2 = this.randomColor()
      var r3 = this.randomColor()
      var g3 = this.randomColor()
      var b3 = this.randomColor()
      // var base = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')'
      // var sidebar = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')'
      // var app = 'rgb(' + r3 + ',' + g3 + ',' + b3 + ')'
      // var primary = this.rgb2html(r3, g3, b3)

      // tint 1
      var tintFactor1 = Math.random() * (0.40 - 0.14) + 0.14
      var rt1 = r1 + (tintFactor1 * (255 - r1))
      var gt1 = g1 + (tintFactor1 * (255 - g1))
      var bt1 = b1 + (tintFactor1 * (255 - b1))
      
      // tint 2
      var tintFactor2 = tintFactor1 + 0.15
      var rt2 = r1 + (tintFactor2 * (255 - r1))
      var gt2 = g1 + (tintFactor2 * (255 - g1))
      var bt2 = b1 + (tintFactor2 * (255 - b1))
      
      // tint 3
      var tintFactor3 = tintFactor1 - 0.14
      var rt3 = r1 + (tintFactor3 * (255 - r1))
      var gt3 = g1 + (tintFactor3 * (255 - g1))
      var bt3 = b1 + (tintFactor3 * (255 - b1))
      

      var base = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')'
      var sidebar = 'rgb(' + rt1 + ',' + gt1 + ',' + bt1 + ')'
      var app = 'rgb(' + rt2 + ',' + gt2 + ',' + bt2 + ')'
      // var primary = this.rgb2html(rt1, gt1, bt1)

      var primary = this.rgb2html(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255))

      this.setPrimary(primary)
      this.setHeadFoot(base)
      this.setSide(sidebar)
      this.setApp(app)
    },
    resetTheme () {
      this.$vuetify.theme.primary = '#009688'
      document.getElementById('navbar').style.backgroundColor = ''
      document.getElementById('foot').style.backgroundColor = ''
      document.getElementById('sideleft').style.backgroundColor = ''
      document.getElementById('right-draw').style.backgroundColor = ''
      document.getElementById('app').style.backgroundColor = ''
      this.deleteClass('.v-card:not(.primary)')
      this.deleteClass('.v-tabs__bar')
      this.deleteClass('.v-datatable__actions')
      this.deleteClass('.v-table')
    },
    setPrimary (sColor) {
      sColor = typeof sColor === 'object' ? sColor.target.value : sColor
      this.$vuetify.theme.primary = sColor
      this.settingChanged('themePrimary', sColor)
    },
    setHeadFoot (sColor) {
      sColor = typeof sColor === 'object' ? sColor.target.value : sColor
      document.getElementById('navbar').style.backgroundColor = sColor
      document.getElementById('foot').style.backgroundColor = sColor
      this.settingChanged('themeHeadFoot', sColor)
    },
    setSide (sColor) {
      sColor = typeof sColor === 'object' ? sColor.target.value : sColor
      document.getElementById('sideleft').style.backgroundColor = sColor
      document.getElementById('right-draw').style.backgroundColor = sColor
      this.settingChanged('themeSide', sColor)
    },
    setApp (sColor) {
      sColor = typeof sColor === 'object' ? sColor.target.value : sColor
      document.getElementById('app').style.backgroundColor = sColor
      this.settingChanged('themeApp', sColor)
    },
    settingChanged (name, value) {
      this.$DCFB.settingChange(name, value)
      this.$store.commit('changeSetting', { 'setting': name, 'value': value })
    }
  },
  computed: {
    x3 () {
    }
  }
}
</script>

<style>
.setting-switch .v-input__slot{
  margin: 0;
}
.setting-switch .v-input--selection-controls__input{
  margin: 0;
}
.setting-row{
  height: 29px;
}
</style>
