import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import App from './App.vue'

import VueClipboard from 'vue-clipboard2'

import LocaleEn from '@/locales/en.js'
import LocalePl from '@/locales/pl.js'
import LocaleRu from '@/locales/ru.js'

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

const app = createApp(App)
app.use(i18n)
app.use(VueClipboard)

app.mount('#app')
