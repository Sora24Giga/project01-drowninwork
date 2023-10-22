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

const app = createApp(App)
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
