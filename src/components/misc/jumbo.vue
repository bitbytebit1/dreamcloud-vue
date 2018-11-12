<template>
  <v-flex xs12>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <loading/>
          <h1 class="display-2 fwl">{{ error }}</h1>
          <div class="subheading my-2 text-xs-center">{{ title }}</div>
          <v-divider class="my-3"/>
          <div class="title mb-3 text-xs-center">{{ subheading }}</div>
          <v-btn 
            v-if="discover" 
            :to="{name: 'explore'}" 
            color="primary white--text"
          >discover new music<v-icon right>explore</v-icon></v-btn> 
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>

<script>
import loading from '@/components/misc/orbit'
export default {
  name: 'Jumbo',
  components: {
    'loading': loading 
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
    discover: {
      type: Boolean,
      default: true
    },
    error: {
      type: String,
      default: 'Oops'
    }
  }
}
</script>

