<template>
  <div id="app">
    <navbar></navbar>
    <div id="master" class='container-fluid'>
      <main>
        <router-view></router-view>
      </main>  
    </div>
    <dcAudio :song="aSong"></dcAudio>
  </div>
</template>

<script>
  import navbar from './components/navbar/navbar'
  import dcAudio from './components/dcAudio'
  export default {
    name: 'app',
    components: {
      'navbar': navbar,
      'dcAudio': dcAudio
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
  margin-bottom: 60px;
}
</style>
