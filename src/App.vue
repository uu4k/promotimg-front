<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-brand href="#">Promotimg</b-navbar-brand>
    </b-navbar>

    <Promotimg />
  </div>
</template>

<script>
import Promotimg from '@/components/Promotimg'

export default {
  name: 'App',
  components: {
    Promotimg,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
