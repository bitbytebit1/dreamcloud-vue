<template>
  <v-layout 
    row 
    wrap 
    justify-left
  >
    <v-flex 
      xs6 
      lg2 
      class="ma-0 pa-0"
    >
      <v-btn 
        icon 
        class="primary" 
        outline
      >
        <v-icon>
          skip_previous
        </v-icon>
      </v-btn>
      <v-btn 
        icon 
        class="primary" 
        outline
      >
        <v-icon>
          play_arrow
        </v-icon>
      </v-btn>
      <v-btn 
        icon 
        class="primary" 
        outline
      >
        <v-icon>
          skip_next
        </v-icon>
      </v-btn>
    </v-flex>
    <v-flex 
      xs4 
      xl9 
      class="ma-0 pa-0"
    >
      <v-slider 
        class="pt-2" 
        hide-details 
        color= "primary"
      />
    </v-flex>
    <v-flex 
      xs1 
      lg10
    >
      <v-btn 
        icon 
        class="primary" 
        outline
      >
        <v-icon>
          people
        </v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
/* eslint-disable */
import deleteButton from '@/components/buttons/delete-button'
export default {
  name: 'dc-audio-flex',
  components: {
    'delete-button': deleteButton
  }
}
</script>

<style>
</style>
