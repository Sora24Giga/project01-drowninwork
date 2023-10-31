import './assets/input.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'
import './assets/newNprogress.css'
import '@/services/AxiosInterceptorSetup'
import Notifications from '@kyvg/vue3-notification'

import { faFilePdf, faFile, faFileExcel, faFileWord, faFilePowerpoint, faFileZipper } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faFilePdf, faFile, faFileExcel, faFileWord, faFilePowerpoint, faFileZipper)
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)
app.use(Notifications)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(PrimeVue)
app.use(createPinia())
app.use(router)

app.mount('#app')
