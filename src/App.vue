<template>
  <div id="app">
    <navbar></navbar>
    <main>
      <router-view></router-view>
    </main>
    <dcAudio :song="aSong"></dcAudio>
    <!-- <wavesurfer-container layout="modal"></wavesurfer-container> -->
  </div>
</template>

<script>
  import navbar from './components/navbar'
  import dcAudio from './components/dcAudio'
  // import wavesurfercomp from '@/components/wavesurfer'
  export default {
    name: 'app',
    components: {
      'navbar': navbar,
      'dcAudio': dcAudio
      // 'wavesurfer-container': wavesurfercomp
    },
    data () {
      return {
        aSongs: [],
        aSong: []
      }
    }
  }
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 64px;
}
</style>
