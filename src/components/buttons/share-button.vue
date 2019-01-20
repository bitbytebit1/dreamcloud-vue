<template>
  <v-list-tile 
    v-if="inList" 
    ripple 
    @click.stop="share"
  >
    <v-list-tile-title>Copy to clipboard</v-list-tile-title>
    <v-list-tile-action>
      <v-btn 
        :color="color" 
        icon
      >
        <v-icon>share</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>

  <v-tooltip 
    v-else 
    top
  >
    <v-btn 
      slot="activator" 
      :color="color" 
      icon 
      @click.stop="share"
    >
      <v-icon>share</v-icon>
    </v-btn>
    <span>Share link</span>
  </v-tooltip>
</template>
<script>
// /* eslint-disable */
import deleteButton from '@/components/buttons/delete-button'
export default {
  name: 'ShareButton',
  props: {
    url: {
      type: String,
      default: ''
    },
    song: {
      type: [Object, Array],
      default() {
        return []
      }
    },
    inList: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      color: ''
    }
  },
  components: {
    'delete-button': deleteButton
  },
  methods: {
    share () {
      this.color = 'primary'
      if(this.$UTILS.share(this.url, this.song)) {
        this.$store.commit('snack', { b: true, c:'primary', s:'Link copied to clipboard' })
      } else {
        this.$store.commit('snack', { b: true, c:'primary', s:'Opening share menu' })
      }
      setTimeout(() => {
        this.color = ''
      }, 2000)
    }
  }
}
</script>

<style>
</style>
