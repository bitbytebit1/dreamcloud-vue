<template>
  <v-layout 
    justify-center 
    row 
    wrap
  >
    <v-flex 
      xs12 
      lg10
    >
      <orbit 
        justify-center
      />
      <h1 class="display-2 fwl">{{ error }}</h1>
      <div class="subheading my-2 text-xs-center">{{ title }}</div>
      <v-divider class="my-3"/>
      <div class="title mb-3 text-xs-center">{{ subheading }}</div>
  </v-flex></v-layout>

</template>

<script>
import orbit from '@/components/misc/orbit'
export default {
  name: 'Jumbo',
  components: {
    'orbit': orbit 
  },
  props: {
    subheading: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: 'Oops'
    }
  }
}
</script>

