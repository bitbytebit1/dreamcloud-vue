<template>
  <v-flex justify-center align-center class="loading-flex mt-3">
    <div class="half-circle-spinner">
      <div class="circle circle-1" :style="circle1Style"></div>
      <div class="circle circle-2" :style="circle2Style"></div>
    </div>
  </v-flex>
</template>

<script>
export default {
  name: 'loading',
  computed: {
    circle1Style () {
      return Object.assign({
        borderTopColor: this.$vuetify.theme.primary
      }, this.circleStyle)
    },
    circle2Style () {
      return Object.assign({
        borderBottomColor: this.$vuetify.theme.primary
      }, this.circleStyle)
    }
  }
}
</script>

<style>
.loading-flex{
  display:flex;
}
.half-circle-spinner, .half-circle-spinner * {
  box-sizing: border-box;
}

.half-circle-spinner {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  position: relative;
}

.half-circle-spinner .circle {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: calc(60px / 10) solid transparent;
}

.half-circle-spinner .circle.circle-1 {
  border-top-color: teal;
  animation: half-circle-spinner-animation 1s infinite;
}

.half-circle-spinner .circle.circle-2 {
  border-bottom-color: teal;
  animation: half-circle-spinner-animation 1s infinite alternate;
}

@keyframes half-circle-spinner-animation {
  0% {
    transform: rotate(0deg);

  }
  100%{
    transform: rotate(360deg);
  }
}
</style>
