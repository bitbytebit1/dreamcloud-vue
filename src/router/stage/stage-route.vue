<template>
  <div/>
</template>
<script>
export default {
  name: 'Stage',
  activated () {
    this.$store.commit('bShowStage', true)
  },
  deactivated() {
    this.$store.commit('bShowStage', false)
  }
}
</script>

<style>
</style>
