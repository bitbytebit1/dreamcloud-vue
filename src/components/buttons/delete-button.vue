<template>
  <v-list-tile 
    v-if="inList" 
    ripple 
    @click.stop="emitDelete" 
    @mouseleave="clicks = clickedTwice ? 2 : 0"
  >
    <v-list-tile-title>Delete</v-list-tile-title>
    <v-list-tile-action>
      <v-btn 
        :color="color" 
        icon
      >
        <v-icon :color="clickedOnce ? 'whit1e': ''">{{ dlIcn }}</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
  <v-tooltip 
    v-else 
    top
  >
    <v-btn 
      slot="activator" 
      v-bind="$props" 
      :color="color" 
      class="del-btn" 
      icon 
      @click.stop="emitDelete" 
      @mouseleave="clicks = clickedTwice ? 2 : 0"
    >
      <v-icon :color="clickedOnce ? 'white': ''">{{ dlIcn }}</v-icon>
    </v-btn>
    <span>Delete</span>
  </v-tooltip>


</template>
<script>
export default {
  name: 'DeleteButton',
  props: {
    id: {
      type: [String, Number],
      default: ''
    },
    inList: {
      type: Boolean,
      default: false
    }
  },
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
        this.$store.dispatch('snack', { b: true, c:'red', s:'Delete' })
      }
    }
  }
}
</script>

<style>

</style>