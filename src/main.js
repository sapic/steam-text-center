import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
// import router from './router'
// import store from './store'

// import VueI18n from 'vue-i18n'
// import VueClipboard from 'vue-clipboard2'

import LocaleEn from '@/locales/en.js'
import LocalePl from '@/locales/pl.js'
import LocaleRu from '@/locales/ru.js'

// Vue.config.productionTip = false

// Vue.use(VueI18n)
// Vue.use(VueClipboard)
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'en',
  messages: {
    en: LocaleEn,
    pl: LocalePl,
    ru: LocaleRu,
  },
})

// const i18n = new VueI18n({
//   locale: 'en',
//   messages: {
//     en: LocaleEn,
//     pl: LocalePl,
//     ru: LocaleRu,
//   },
// })

const app = createApp(App)
app.use(i18n)

app.mount('#app')

// new Vue({
//   // router,
//   i18n,
//   store,
//   render: h => h(App),
// }).$mount('#app')
