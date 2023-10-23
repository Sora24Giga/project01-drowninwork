import './assets/output.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'
import './assets/newNprogress.css'
import { useStudentStore } from './stores/student'
import StudentService from './services/StudentService'
import '@/services/AxiosInterceptorSetup'

import { faFilePdf, faFile, faFileExcel, faFileWord, faFilePowerpoint, faFileZipper } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faFilePdf, faFile, faFileExcel, faFileWord, faFilePowerpoint, faFileZipper)
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(PrimeVue)
app.use(createPinia())
app.use(router)

const studentStore = useStudentStore()
StudentService.getStudentList()
  .then((response) => {
    studentStore.setStudentList(response.data)
  })
  .catch((error) => {
    console.log(error)
    if (error.response && error.response.status === 404) {
      router.push({ name: '404-resource', params: { resource: 'page' } })
    } else {
      router.push({ name: 'network-error' })
    }
  })

app.mount('#app')
