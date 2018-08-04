<template>
  <div id="app">
    <v-ons-page>
      <v-ons-toolbar>
        <div class="center">PromotImg</div>
      </v-ons-toolbar>
      <Promotimg />
    </v-ons-page>
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
  margin-top: 60px;
}
</style>
