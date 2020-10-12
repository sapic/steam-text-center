import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import store from './store'

import VueI18n from 'vue-i18n'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false

Vue.use(VueI18n)
Vue.use(VueClipboard)

const i18n = new VueI18n({
  locale: 'en'
})

new Vue({
  // router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
