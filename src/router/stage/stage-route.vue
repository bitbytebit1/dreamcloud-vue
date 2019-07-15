<template>
  <div/>
</template>
<script>
export default {
  name: 'Stage',
  deactivated () {
    this.$store.commit('bShowStage', false)
    if (this.$store.getters.showPopupSetting && this.$store.state.player.current_index > -1) {
      this.$store.commit('show_pop', true)
    }
  },
  activated () {
    this.$store.commit('bShowStage', true)
    this.$store.commit('show_pop', false)
  },
}
</script>

<style>
</style>
