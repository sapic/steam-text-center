<template>
  <div id="app">
    <MainWrapper />
  </div>
</template>

<script>
import MainWrapper from './components/Main.vue'

export default {
  name: 'App',
  components: { MainWrapper },
  mounted () {
    var lang = navigator.languages
      ? navigator.languages[0]
      : navigator.language || navigator.userLanguage
    var accepted = ['pl', 'en']
    lang = lang.substring(0, 2)
    this.$i18n.locale = accepted.indexOf(lang) !== -1 ? lang : 'en'
  },
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app,
#preloader {
  background: #121111;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
}
</style>
