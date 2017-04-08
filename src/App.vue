<template>
  <div>
    <section id="header">
      <header-component></header-component>
    </section>

    <section id="app">
      <router-view></router-view>
    </section>

    <section id="footer" class="u-full-width">
      <a href="https://github.com/sm4/promo-codes-gui"><span class="fa fa-github fa-lg"
                                                             aria-hidden="true"></span></a>
      |
      <span>&copy; 2017 sm4</span>
    </section>

  </div>
</template>

<script>
  import HeaderComponent from './components/Header.vue'

  export default {
    name: 'app',
    components: {
      HeaderComponent
    }
  }
</script>

<style>
</style>
