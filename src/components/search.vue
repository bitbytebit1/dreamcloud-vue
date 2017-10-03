<template>
  <div id="search-buttons">
    <input v-on:keyup='search' v-model='sQuery' class='form-control ui-autocomplete-input' placeholder='Search'>
    <button v-on:click="btnclick('all')" type='button' class='btn btn-primary'>
      <!-- <input type='checkbox'> -->
      <img src='./img/all.png'>
    </button>
  <button v-on:click="btnclick('mixcloud')" type='button' class='btn btn-primary'>
      <!-- <input type='checkbox'> -->
      <img src='./img/mc.png'>
    </button>
    <button v-on:click="btnclick('soundcloud')" type='button' class='btn btn-primary'>
      <!-- <input type='checkbox'> -->
      <img src='./img/sc.png'>
    </button>
    <button v-on:click="btnclick('youtube')" type='button' class='btn btn-primary'>
      <!-- <input type='checkbox'> -->
      <img src='./img/yt.png'>
    </button>
    <button v-on:click="btnclick('vimeo')" type='button' class='btn btn-primary'>
      <!-- <input type='checkbox'> -->
      <img src='./img/vm.png'>
    </button>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      sQuery: '',
      source: ''
    }
  },
  methods: {
    __search: function (sQuery, sSource = 'youtube') {
      this.$router.push({name: 'searchPage', params: {query: this.sQuery, source: sSource}})
    },
    search: function () {
      this.__search(this.query)
    },
    btnclick: function (sSource) {
      this.__search(this.query, sSource)
    }
  }
}

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.navbar-form button img{
  height: 25px;
}
</style>
