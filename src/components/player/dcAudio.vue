<template>
  <div class="dc-audio-container">
    <audio controls id="dc-audio">
    </audio>
  </div>
</template>

<script>
export default {
  name: 'dcAudio',
  data () {
    return {
      msg: 'Welcome the real Trinity'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #dc-audio{
    bottom: 0px;
    margin-top: 64px;
    position: fixed;
    z-index: 1000;
    width: 100%;
  }

</style>
