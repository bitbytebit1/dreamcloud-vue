<template>
  <div id="wavesurfer-container">
    <div class="player-template-rootnode">
      <div class="meta-artist">
        <span class="the-artist"/>
        <span class="the-name"/>
      </div>

      <div id="waveform"/>

      <div class="controls">
        <div 
          v-if="layout == 'modal'" 
          class="play-pause-btn play" 
          @click="togglePlayPause($event)"
        >
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle-thin fa-stack-2x"/>
            <i 
              class="fa fa-play" 
              aria-hidden="true"
            />
          </span>
        </div>
        <div 
          class="btn-prev" 
          @click="playPrev()"
        >
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle-thin fa-stack-2x"/>
            <i 
              class="fa fa-backward" 
              aria-hidden="true"
            />
          </span>
        </div>
        <div 
          class="btn-next" 
          @click="playNext()"
        >
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle-thin fa-stack-2x"/>
            <i 
              class="fa fa-forward" 
              aria-hidden="true"
            />
          </span>
        </div>
      </div>

      <!-- <div class="playlist" v-for="source in sources">
          <div class="demo-song" v-bind:class="{active: source.isActive}">
              <div class="demo-title"><b>{{source.title}}</b></div>
              <div class="artist-name">{{source.name}}</div>
              <div class="demo-src">{{source.src}}</div>
              <div class="demo-desc"></div>
          </div>
      </div> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
// https://codepen.io/arturiaweb/pen/Pjaeoy
import WaveSurfer from "wavesurfer"
export default {
  name: 'wavesurfer-container',
  props: ['layout'],
  data () {
    return {
      msg: 'Welcome to the real Trinity',
      sources: []
    }
  },
  methods:{
      initWaveSurf : function(self){
          this.wavesurfer = WaveSurfer.create({
              container: '#waveform',
              barWidth: 1,
              height:120,
              waveColor: '#262626',
              progressColor: '#2ddcb4'
          });
          this.wavesurfer.load(this.sources[0].src);
          this.indexPlaying = 0;
      },
      addWaveSurfListeners: function(){
          var me = this;
          this.wavesurfer.on('ready', function () {
              console.log('wavesurfer ready to surf');
              me.wavesurfer.play();
          });
          this.wavesurfer.on('finish', function () {
              console.log('wavesurfer finished a run');
              me.playNext();
          });
      },
      getSurfer : function(){
          return this.wavesurfer;
      },
      play: function(){
          console.log('play methode raised in component');
          this.wavesurfer.play();
      },
      pause: function(){
          console.log('pause methode raised in component');
          this.wavesurfer.pause();
      },
      playNext: function(){
          if(this.indexPlaying < this.sources.length - 1){
              this.indexPlaying += 1;
              this.wavesurfer.load(this.sources[this.indexPlaying].src);
          }else{
              this.indexPlaying = 0;
              this.wavesurfer.load(this.sources[0].src);
          }
          console.log('try play but maybe didn t finish to load?');
          //this.play();
      },
      playPrev: function(){
          if(this.indexPlaying > 0){
              this.indexPlaying -= 1;
              this.wavesurfer.load(this.sources[this.indexPlaying].src);
          }else{
              this.indexPlaying = 0;
              this.wavesurfer.load(this.sources[0].src);
          }
          console.log('try play but maybe didn t finish to load?');
          //this.play();
      },
      togglePlayPause: function(event){
          console.log('titi');
          if($(event.currentTarget).hasClass('play')){
              console.log('play');
              this.play();
              $(event.currentTarget).removeClass('play');
              $(event.currentTarget).addClass('pause');
          }else{
              console.log('pause');
              this.pause();
              $(event.currentTarget).removeClass('pause');
              $(event.currentTarget).addClass('play');
          }
      }
  },
  mounted: function() {
      console.log("wavesurferlayer component mounted");
      console.log(this);
      this.initWaveSurf(this);
      this.addWaveSurfListeners();
  }
}
</script>



    <!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .fa-circle-thin:before {
      content: "\f1db";
  }
  .btn-prev, .btn-next, .play-pause-btn {
      display: inline-block;
  }
  .fa-backward{
      margin-left: 0.4em;
      margin-top: 0.1em;
  }
  .fa-forward{
      margin-left: 0.6em;
      margin-top: 0.1em;
  }
  .fa-play{
      margin-left: 0.7em;
      margin-top: 0.1em;
  }
  .playlist{
      .demo-song{
          background-color: #444444;
          color: #fff;
          padding:1em;
      }
      .demo-song.active{
          background-color: #222222;
      }
  }
</style>