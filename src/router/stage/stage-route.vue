<template>
  <div/>
</template>
<script>
export default {
  name: 'Stage',
  // deactivated () {
  //   this.$store.commit('bShowStage', false)
  //   if (this.$store.getters.showPopupSetting && this.$store.state.player.current_index > -1) {
  //     this.$store.commit('show_pop', true)
  //   }
  // },
  // activated () {
  //   this.$store.commit('bShowStage', true)
  //   this.$store.commit('show_pop', false)
  // },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('bShowStage', false)
    if (this.$store.getters.showPopupSetting && this.$store.getters.current_index > -1) {
      this.$store.commit('show_pop', true)
    }   
    next()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.commit('bShowStage', true)
      vm.$store.commit('show_pop', false)
    })
  },
}
</script>

<style>
</style>
