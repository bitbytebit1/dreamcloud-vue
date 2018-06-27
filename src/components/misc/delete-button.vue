<template>
	<v-btn v-bind="$props" class="del-btn" @click.stop="emitDelete" @mouseleave="clicks = clickedTwice ? 2 : 0" :color="color" icon>
		<v-icon :color="clickedOnce  ? 'white': ''">{{dlIcn}}</v-icon>
	</v-btn>
</template>
<script>
export default {
  name: 'delete-button',
  props: ['id', 'disabled', 'colour'],
  data () {
    return {
      clicks: 0
    }
  },
  computed: {
    dlIcn () {
      return this.clickedOnce ? 'delete' : this.clickedTwice ? 'delete_forever' : 'delete'
    },
    color () {
      return this.clickedOnce ? 'red lighten-1' : this.clickedTwice ? 'green lighten-1' : this.colour
    },
    clickedOnce () {
      return this.clicks === 1
    },
    clickedTwice () {
      return this.clicks === 2
    }
  },
  methods: {
    emitDelete () {
      this.clicks++
      if (this.clicks === 2) {
        setTimeout(() => {
          this.clicks = 0
        }, 2000)
        this.$emit('delete', this.id)
      }
    }
  }
}
</script>

<style>
.del-btn{
  min-width: 36px!important
}
</style>